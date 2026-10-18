import { createFileRoute } from "@tanstack/react-router";
import { EndSensitivity, GoogleGenAI, Modality, StartSensitivity } from "@google/genai";
import { LIVE_MODEL, SYSTEM_PROMPT, TOOL_DECLARATIONS } from "@/lib/voice/agent-config";

// Mints a short-lived, single-use token so the browser can talk to Gemini Live
// directly without ever seeing GEMINI_API_KEY.
export const Route = createFileRoute("/api/live-token")({
  server: {
    handlers: {
      POST: async () => {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "GEMINI_API_KEY is not configured on the server" }, { status: 500 });
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
                  systemInstruction: SYSTEM_PROMPT,
                  tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
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
          return Response.json({ token: token.name, model: LIVE_MODEL });
        } catch (e) {
          console.error("live-token error", e);
          return Response.json({ error: "Could not create session token" }, { status: 502 });
        }
      },
    },
  },
});
