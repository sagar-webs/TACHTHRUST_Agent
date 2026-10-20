import { clickElement, clickableLabels, goBack, goForward, scrollPage } from "@/lib/voice/page-control";

type Args = Record<string, unknown>;
type Shopify = { currency?: { active?: string } };

export type CartSummary = { item_count: number; total: string; items: { variant_id: number; title: string; quantity: number; line_total: string }[] };
export type StoreHooks = {
  /** Called right before the page navigates away (the widget reconnects on the next page). */
  beforeNavigate: (path: string) => void;
  onCart: (cart: CartSummary, added?: string) => void;
};

const currency = () => (window as unknown as { Shopify?: Shopify }).Shopify?.currency?.active || "USD";
const fmt = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: currency() }).format(n);
const fromCents = (c: number) => fmt(c / 100);
const fromDecimal = (v: string | number) => fmt(Number(v));
const stripHtml = (h: string) => h.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

async function getJson(url: string, init?: RequestInit) {
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...init });
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("json") && !type.includes("javascript")) throw new Error(`unexpected response (${res.status})`);
  const body = await res.json();
  if (!res.ok) throw Object.assign(new Error(body?.description || body?.message || `HTTP ${res.status}`), { body });
  return body;
}

async function cartSummary(): Promise<CartSummary> {
  const c = await getJson("/cart.js");
  return {
    item_count: c.item_count,
    total: fromCents(c.total_price),
    items: (c.items ?? []).map((i: Record<string, unknown>) => ({
      variant_id: i.variant_id as number,
      title: [i.product_title, i.variant_title].filter(Boolean).join(" - "),
      quantity: i.quantity as number,
      line_total: fromCents(i.final_line_price as number),
    })),
  };
}

type Found = { handle: string; title: string; price: string; available: boolean; type?: string };

async function searchProducts(query: string): Promise<Found[]> {
  try {
    const d = await getJson(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`);
    const list = d?.resources?.results?.products ?? d?.resource_results?.results?.products ?? [];
    if (list.length) {
      return list.map((p: Record<string, unknown>) => ({ handle: p.handle as string, title: p.title as string, price: fromDecimal(p.price as string), available: !!p.available, type: p.type as string }));
    }
  } catch { /* fall back to the product feed below */ }
  const d = await getJson("/products.json?limit=250");
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return (d.products ?? [])
    .map((p: Record<string, unknown>) => {
      const hay = `${p.title} ${p.product_type} ${(p.tags as string[] | string) ?? ""} ${p.vendor}`.toLowerCase();
      return { p, score: words.filter((w) => hay.includes(w)).length };
    })
    .filter((x: { score: number }) => x.score > 0)
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 5)
    .map(({ p }: { p: Record<string, unknown> }) => {
      const v = (p.variants as Record<string, unknown>[])?.[0] ?? {};
      return { handle: p.handle as string, title: p.title as string, price: fromDecimal(v.price as string), available: (p.variants as { available?: boolean }[]).some((x) => x.available), type: p.product_type as string };
    });
}

const safePath = (p: string) => p.startsWith("/") && !p.startsWith("//") && !p.includes("\\") && !/[\s<>]/.test(p);

export async function runStoreTool(name: string, args: Args, hooks: StoreHooks): Promise<Args> {
  try {
    switch (name) {
      case "search_products": {
        const products = await searchProducts(String(args.query ?? ""));
        return products.length ? { ok: true, products } : { ok: true, products: [], note: "No matching products. Try other words or browse a collection." };
      }
      case "get_product": {
        const p = await getJson(`/products/${encodeURIComponent(String(args.handle ?? ""))}.js`);
        return {
          ok: true,
          title: p.title,
          handle: p.handle,
          description: stripHtml(p.description ?? "").slice(0, 500),
          options: (p.options ?? []).map((o: { name?: string } | string) => (typeof o === "string" ? o : o.name)),
          variants: (p.variants ?? []).slice(0, 25).map((v: Record<string, unknown>) => ({ variant_id: v.id, title: v.title, price: fromCents(v.price as number), available: v.available })),
        };
      }
      case "show_product":
      case "go_to":
      case "go_to_checkout": {
        const path = name === "show_product" ? `/products/${encodeURIComponent(String(args.handle ?? ""))}` : name === "go_to_checkout" ? "/checkout" : String(args.path ?? "");
        if (!safePath(path) || (name === "go_to" && path.startsWith("/checkout"))) return { ok: false, error: name === "go_to" && path.startsWith("/checkout") ? "Use go_to_checkout after the visitor confirms." : "Invalid path." };
        hooks.beforeNavigate(path);
        setTimeout(() => location.assign(path), 1500); // let the assistant finish its short sentence first
        return { ok: true, path, note: "Navigating now. Say one very short sentence; the conversation continues on the new page." };
      }
      case "add_to_cart": {
        const id = Number(args.variant_id);
        const qty = Math.max(1, Math.min(20, Math.floor(Number(args.quantity) || 1)));
        if (!id) return { ok: false, error: "variant_id is required (get it from get_product)." };
        const added = await getJson("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ items: [{ id, quantity: qty }] }) });
        const cart = await cartSummary();
        const label = added?.items?.[0]?.title ?? "item";
        hooks.onCart(cart, `${label} x${qty}`);
        return { ok: true, added: label, quantity: qty, cart };
      }
      case "update_cart_item": {
        await getJson("/cart/change.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: Number(args.variant_id), quantity: Math.max(0, Math.floor(Number(args.quantity) || 0)) }) });
        const cart = await cartSummary();
        hooks.onCart(cart);
        return { ok: true, cart };
      }
      case "view_cart": {
        const cart = await cartSummary();
        return { ok: true, cart, empty: cart.item_count === 0 };
      }
      case "click_element": {
        hooks.beforeNavigate(location.pathname); // a click may navigate; the widget reconnects if so
        return await clickElement(args);
      }
      case "scroll_to": return scrollPage(args);
      case "go_back": hooks.beforeNavigate(location.pathname); return await goBack();
      case "go_forward": hooks.beforeNavigate(location.pathname); return await goForward();
      case "get_page_context":
        return { ok: true, path: location.pathname, title: document.title, headings: [...document.querySelectorAll("h1, h2")].map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 10), clickable: clickableLabels() };
      default:
        return { ok: false, error: `unknown tool ${name}` };
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
