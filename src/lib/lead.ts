import { voiceUi } from "@/lib/voice/ui-store";

export type LeadPayload = { name: string; email: string; phone?: string; company?: string; service?: string; message?: string; source: string };

/** Sends the lead to the server and tells the voice agent so it can thank the visitor. */
export async function submitLead(payload: LeadPayload) {
  try {
    await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch (e) {
    console.error("lead submit failed", e);
  }
  voiceUi.set({ lead: { name: payload.name, ts: Date.now() } });
}
