import { PAGES } from "./agent-config";
import { cart } from "@/lib/shop/cart";
import { voiceUi, type Personalization, type Pitch } from "./ui-store";

type Args = Record<string, unknown>;
type Navigate = (path: string) => Promise<void>;
export type Hooks = { startPresentation: () => void; stopPresentation: () => void; resumePresentation: () => void };

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


// --- Generic page control: find and click visible buttons/links by their label ---
const CLICKABLE = 'a[href], button, [role="button"], [role="tab"], summary, input[type="button"], input[type="submit"]';

const labelOf = (el: Element) =>
  (el.getAttribute("aria-label") || (el as HTMLElement).innerText || el.getAttribute("title") || (el as HTMLInputElement).value || "")
    .replace(/\s+/g, " ").trim();

function visibleClickables(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(CLICKABLE)].filter((el) => {
    if (el.closest("[data-voice-agent]") || (el as HTMLButtonElement).disabled) return false;
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && st.visibility !== "hidden" && st.display !== "none" && labelOf(el).length > 0;
  });
}

function findClickable(text: string): HTMLElement | null {
  const t = text.trim().toLowerCase();
  const all = visibleClickables();
  return all.find((e) => labelOf(e).toLowerCase() === t) ?? all.find((e) => labelOf(e).toLowerCase().includes(t)) ?? null;
}

function highlight(el: HTMLElement) {
  const prev = el.style.outline;
  el.style.outline = "3px solid #00d4ff";
  el.style.outlineOffset = "3px";
  setTimeout(() => { el.style.outline = prev; el.style.outlineOffset = ""; }, 900);
}

const form = () => document.querySelector<HTMLFormElement>("main form");

export async function runTool(name: string, args: Args, navigate: Navigate, hooks?: Hooks): Promise<Args> {
  switch (name) {
    case "start_presentation": {
      hooks?.startPresentation();
      return { ok: true, note: "Presentation starting. The system will put each slide on screen and tell you what to say. Do not call any more tools for it." };
    }
    case "resume_presentation": {
      hooks?.resumePresentation();
      return { ok: true, note: "Resuming. The system will put the next slide on screen and tell you what to say. Say nothing about it now." };
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
      if (["down", "next", "further"].includes(t)) window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
      else if (["up", "previous", "back"].includes(t)) window.scrollBy({ top: -window.innerHeight * 0.8, behavior: "smooth" });
      else if (t === "top") window.scrollTo({ top: 0, behavior: "smooth" });
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
    case "add_to_cart": {
      const ok = cart.add(String(args.item_id ?? ""), Number(args.quantity) || 1);
      return ok ? { ok: true, cart: cart.summary() } : { ok: false, error: "unknown item_id" };
    }
    case "remove_from_cart": {
      cart.remove(String(args.item_id ?? ""));
      return { ok: true, cart: cart.summary() };
    }
    case "view_cart":
      return { ok: true, cart: cart.summary(), empty: cart.get().length === 0 };
    case "click_element": {
      const label = String(args.text ?? "");
      const el = findClickable(label);
      if (!el) return { ok: false, error: `no visible button or link matching "${label}"`, available: visibleClickables().map(labelOf).slice(0, 30) };
      const inForm = !!el.closest("form");
      const isSubmit = inForm && ((el as HTMLButtonElement).type === "submit" || /submit|send/i.test(labelOf(el)));
      if (isSubmit) return { ok: false, error: "That submits a form. Read the details back to the visitor and use submit_contact_form after they confirm." };
      const href = el.getAttribute("href");
      if (el instanceof HTMLAnchorElement && href && (el.origin !== location.origin || /^(mailto|tel):/.test(href))) {
        return { ok: false, error: "That is an external link (opens outside this site). Tell the visitor about it instead of clicking.", href };
      }
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      highlight(el);
      await sleep(450);
      el.click();
      await sleep(500);
      return { ok: true, clicked: labelOf(el), path: location.pathname };
    }
    case "go_back": {
      history.back();
      await sleep(500);
      return { ok: true, path: location.pathname };
    }
    case "go_forward": {
      history.forward();
      await sleep(500);
      return { ok: true, path: location.pathname };
    }
    case "get_page_context": {
      const headings = [...document.querySelectorAll("main h1, main h2")].map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 12);
      return { ok: true, path: location.pathname, headings, clickable: visibleClickables().map(labelOf).slice(0, 40) };
    }
    default:
      return { ok: false, error: `unknown tool ${name}` };
  }
}
