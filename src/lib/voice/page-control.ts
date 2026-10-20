// Generic, site-independent page control used by the agent on both the TechThrust site and the Shopify widget:
// smooth scrolling, clicking visible buttons/links by label, and browser back/forward.
type Args = Record<string, unknown>;

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Eased, cancellable scrolling at a readable speed. Any wheel/touch/key/mouse input by the visitor stops it.
let scrollRaf = 0;
// px per second, with a cap on total time so very long pages still finish in a reasonable time
const SPEEDS: Record<string, { pxPerSec: number; maxSec: number }> = {
  slow: { pxPerSec: 220, maxSec: 35 },
  normal: { pxPerSec: 600, maxSec: 14 },
  fast: { pxPerSec: 1500, maxSec: 6 },
};

function animateScroll(targetY: number, speed: string) {
  cancelAnimationFrame(scrollRaf);
  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const to = Math.max(0, Math.min(maxY, targetY));
  const dist = to - startY;
  if (Math.abs(dist) < 2) return;
  const sp = SPEEDS[speed] ?? SPEEDS.normal;
  const dur = Math.max(500, Math.min(sp.maxSec, Math.abs(dist) / sp.pxPerSec) * 1000);
  const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
  const cleanup = () => events.forEach((e) => window.removeEventListener(e, cancel));
  const cancel = () => { cancelAnimationFrame(scrollRaf); cleanup(); };
  events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));
  const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2; // gentle sine in-out
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo({ top: startY + dist * ease(p), behavior: "instant" });
    if (p < 1) scrollRaf = requestAnimationFrame(step);
    else cleanup();
  };
  scrollRaf = requestAnimationFrame(step);
}

// --- Generic page control: find and click visible buttons/links by their label ---
const CLICKABLE = 'a[href], button, [role="button"], [role="tab"], summary, input[type="button"], input[type="submit"]';

export const labelOf = (el: Element) =>
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

export const clickableLabels = () => visibleClickables().map(labelOf).slice(0, 40);

export function scrollPage(args: Args): Args {
      const t = String(args.section_text ?? "").toLowerCase();
      const speed = ["slow", "normal", "fast"].includes(String(args.speed)) ? String(args.speed) : "normal";
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      if (["down", "next", "further"].includes(t)) animateScroll(window.scrollY + window.innerHeight * 0.8, speed);
      else if (["up", "previous", "back"].includes(t)) animateScroll(window.scrollY - window.innerHeight * 0.8, speed);
      else if (["top", "start", "beginning"].includes(t)) animateScroll(0, speed);
      else if (["bottom", "end", "footer"].includes(t)) animateScroll(maxY, speed);
      else {
        const h = [...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")].find((e) =>
          e.textContent?.toLowerCase().includes(t),
        );
        if (!h) return { ok: false, error: "section not found" };
        animateScroll(h.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3, speed);
      }
      return { ok: true, scrolling: true, speed, note: "Scrolling is animated and takes a few seconds; the visitor can stop it by scrolling themselves." };
}

export async function clickElement(args: Args): Promise<Args> {
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

export async function goBack(): Promise<Args> {
      history.back();
      await sleep(500);
      return { ok: true, path: location.pathname };
}

export async function goForward(): Promise<Args> {
      history.forward();
      await sleep(500);
      return { ok: true, path: location.pathname };
}
