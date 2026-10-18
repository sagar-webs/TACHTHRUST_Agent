import { PAGES } from "./agent-config";
import { voiceUi, type Personalization, type Pitch } from "./ui-store";

type Args = Record<string, unknown>;
type Navigate = (path: string) => Promise<void>;
export type Hooks = { startPresentation: () => void; stopPresentation: () => void };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitFor<T>(get: () => T | null, ms = 3000): Promise<T | null> {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const v = get();
    if (v) return v;
    await sleep(100);
  }
  return null;
}

// Set a value the way React/native inputs expect, so listeners fire.
function setValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) {
  const proto = Object.getPrototypeOf(el);
  Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

const form = () => document.querySelector<HTMLFormElement>("main form");

export async function runTool(name: string, args: Args, navigate: Navigate, hooks?: Hooks): Promise<Args> {
  switch (name) {
    case "start_presentation": {
      hooks?.startPresentation();
      return { ok: true, note: "Presentation starting. The system will put each slide on screen and tell you what to say. Do not call any more tools for it." };
    }
    case "stop_presentation": {
      hooks?.stopPresentation();
      return { ok: true };
    }
    case "navigate_to": {
      const path = String(args.path ?? "");
      if (!(PAGES as readonly string[]).includes(path)) return { ok: false, error: "unknown page" };
      await navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return { ok: true, path };
    }
    case "scroll_to": {
      const t = String(args.section_text ?? "").toLowerCase();
      if (t === "top") window.scrollTo({ top: 0, behavior: "smooth" });
      else if (t === "bottom") window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      else {
        const h = [...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")].find((e) =>
          e.textContent?.toLowerCase().includes(t),
        );
        if (!h) return { ok: false, error: "section not found" };
        h.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return { ok: true };
    }
    case "show_pitch": {
      voiceUi.set({
        pitch: {
          title: String(args.title ?? ""),
          tagline: String(args.tagline ?? ""),
          bullets: Array.isArray(args.bullets) ? args.bullets.map(String).slice(0, 5) : [],
          cta: args.cta ? String(args.cta) : undefined,
        } satisfies Pitch,
      });
      return { ok: true };
    }
    case "personalize_site": {
      voiceUi.set({
        personalization: {
          business_name: args.business_name ? String(args.business_name) : undefined,
          industry: args.industry ? String(args.industry) : undefined,
          headline: String(args.headline ?? "").slice(0, 120),
          subheadline: args.subheadline ? String(args.subheadline).slice(0, 200) : undefined,
        } satisfies Personalization,
      });
      return { ok: true };
    }
    case "fill_contact_form": {
      if (location.pathname !== "/contact") await navigate("/contact");
      const f = await waitFor(form);
      if (!f) return { ok: false, error: "contact form not found" };
      const filled: string[] = [];
      for (const key of ["name", "company", "email", "phone", "service", "message"]) {
        const v = args[key];
        if (typeof v !== "string" || !v) continue;
        const el = f.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
        if (!el) continue;
        setValue(el, v);
        filled.push(key);
      }
      f.scrollIntoView({ behavior: "smooth", block: "center" });
      return { ok: true, filled };
    }
    case "submit_contact_form": {
      const f = form();
      if (!f) return { ok: false, error: "no form on this page" };
      f.requestSubmit();
      return { ok: true, note: "Submitted; validation errors, if any, are shown on screen." };
    }
    case "get_page_context": {
      const headings = [...document.querySelectorAll("main h1, main h2")].map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 12);
      return { ok: true, path: location.pathname, headings };
    }
    default:
      return { ok: false, error: `unknown tool ${name}` };
  }
}
