import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(120).optional(),
  service: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().max(40).optional(),
});

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = schema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Invalid lead" }, { status: 400 });
        // TODO: forward to your CRM / email / webhook. For now the lead is only logged on the server.
        console.log("[lead]", JSON.stringify(parsed.data));
        return Response.json({ ok: true });
      },
    },
  },
});
