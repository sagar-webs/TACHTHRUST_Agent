import { createFileRoute } from "@tanstack/react-router";
import { EndSensitivity, GoogleGenAI, Modality, StartSensitivity } from "@google/genai";
import { LIVE_MODEL, SYSTEM_PROMPT, TOOL_DECLARATIONS } from "@/lib/voice/agent-config";
import { SHOPIFY_PROMPT, SHOPIFY_TOOLS } from "@/lib/voice/shopify-config";

// Stores allowed to embed the shopping assistant. Override with SHOPIFY_ALLOWED_ORIGINS (comma-separated origins).
const DEFAULT_SHOPIFY_ORIGINS = ["https://vedxwa-3i.myshopify.com", ...(import.meta.env.DEV ? ["http://localhost:8080"] : [])];
const shopifyOrigins = () =>
  (process.env.SHOPIFY_ALLOWED_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean) ?? DEFAULT_SHOPIFY_ORIGINS);

const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  Vary: "Origin",
});

// Mints a short-lived, single-use token so the browser can talk to Gemini Live
// directly without ever seeing GEMINI_API_KEY. Prompt and tools are locked into the token.
export const Route = createFileRoute("/api/live-token")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => {
        const origin = request.headers.get("origin") ?? "";
        return shopifyOrigins().includes(origin) ? new Response(null, { status: 204, headers: cors(origin) }) : new Response(null, { status: 403 });
      },
      POST: async ({ request }) => {
        const isShopify = new URL(request.url).searchParams.get("agent") === "shopify";
        const origin = request.headers.get("origin") ?? "";
        if (isShopify && !shopifyOrigins().includes(origin)) {
          return Response.json({ error: "This store is not allowed to use the assistant" }, { status: 403 });
        }
        const headers = isShopify ? cors(origin) : undefined;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "GEMINI_API_KEY is not configured on the server" }, { status: 500, headers });
        }
        try {
          const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: "v1alpha" } });
          const now = Date.now();
          const token = await ai.authTokens.create({
            config: {
              uses: 1,
              expireTime: new Date(now + 30 * 60_000).toISOString(),
              newSessionExpireTime: new Date(now + 60_000).toISOString(),
              liveConnectConstraints: {
                model: LIVE_MODEL,
                config: {
                  responseModalities: [Modality.AUDIO],
                  systemInstruction: isShopify ? SHOPIFY_PROMPT : SYSTEM_PROMPT,
                  tools: [{ functionDeclarations: isShopify ? SHOPIFY_TOOLS : TOOL_DECLARATIONS }],
                  // Hear the visitor quickly (barge-in) but wait for them to finish their sentence.
                  realtimeInputConfig: {
                    automaticActivityDetection: {
                      startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
                      endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
                      prefixPaddingMs: 150,
                      silenceDurationMs: 900,
                    },
                  },
                  inputAudioTranscription: {},
                  outputAudioTranscription: {},
                },
              },
              httpOptions: { apiVersion: "v1alpha" },
            },
          });
          return Response.json({ token: token.name, model: LIVE_MODEL }, { headers });
        } catch (e) {
          console.error("live-token error", e);
          return Response.json({ error: "Could not create session token" }, { status: 502, headers });
        }
      },
    },
  },
});
