import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Check, Globe, Layers, Megaphone, Mic, Minus, Plus, Rocket, Search, Share2, ShoppingBag, ShoppingCart, Smartphone, Target, Trash2, Zap } from "lucide-react";
import { FadeUp } from "@/components/site/motion-utils";
import { PRODUCTS, productById, type Category } from "@/lib/shop/catalog";
import { cart, useCart } from "@/lib/shop/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Build Your TechThrust Package" },
      { name: "description", content: "Pick the TechThrust services you need, add them to your cart and request a tailored quote." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const ICONS: Record<string, typeof Bot> = { globe: Globe, bag: ShoppingBag, phone: Smartphone, layers: Layers, search: Search, target: Target, megaphone: Megaphone, share: Share2, mic: Mic, zap: Zap, rocket: Rocket };
const FILTERS: ("All" | Category)[] = ["All", "Web & App", "Marketing", "AI"];

function ShopPage() {
  const router = useRouter();
  const lines = useCart();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [flash, setFlash] = useState<string | null>(null);
  const shown = PRODUCTS.filter((p) => filter === "All" || p.category === filter);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  const add = (id: string) => {
    cart.add(id);
    setFlash(id);
    setTimeout(() => setFlash((f) => (f === id ? null : f)), 1400);
  };

  return (
    <div className="overflow-hidden">
      <section className="relative pt-40 pb-12">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.18), transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// SHOP</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-4xl">
              Build Your <span className="text-gradient">Growth Package.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Add the services you need to your cart, then send it to us as a quote request. Every package is scoped to your goals — no fixed prices.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_22rem] gap-8 items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-5 py-2 text-sm transition ${filter === f ? "btn-glow" : "glass hover:border-cyan/50"}`}>{f}</button>
              ))}
            </div>
            <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {shown.map((p) => {
                const Icon = ICONS[p.icon] ?? Bot;
                const inCart = lines.find((l) => l.id === p.id);
                return (
                  <div key={p.id} data-product={p.id} className="gradient-border-card p-6 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan"><Icon className="h-5 w-5" /></span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                    <ul className="mt-4 space-y-1.5 text-sm">
                      {p.includes.map((i) => <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-cyan shrink-0 mt-0.5" />{i}</li>)}
                    </ul>
                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-yellow">Custom quote</span>
                      <button onClick={() => add(p.id)} aria-label={`Add ${p.name} to cart`} className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-4 py-2 text-sm">
                        {flash === p.id ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> {inCart ? `In cart (${inCart.qty})` : "Add to cart"}</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside id="cart" className="gradient-border-card p-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-cyan" /> Your cart</h2>
              <span className="font-mono text-xs text-muted-foreground">{count} item{count === 1 ? "" : "s"}</span>
            </div>

            {lines.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">Your cart is empty. Add a service to get started.</p>
            ) : (
              <ul className="mt-5 space-y-4">
                {lines.map((l) => {
                  const p = productById(l.id)!;
                  return (
                    <li key={l.id} className="flex items-center justify-between gap-3 text-sm">
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.category}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button aria-label="Decrease" onClick={() => cart.setQty(l.id, l.qty - 1)} className="h-7 w-7 rounded-full glass flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                        <span className="w-5 text-center tabular-nums">{l.qty}</span>
                        <button aria-label="Increase" onClick={() => cart.setQty(l.id, l.qty + 1)} className="h-7 w-7 rounded-full glass flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                        <button aria-label={`Remove ${p.name}`} onClick={() => cart.remove(l.id)} className="ml-1 text-muted-foreground hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-semibold text-yellow">Custom quote</span></div>
              <button
                disabled={lines.length === 0}
                onClick={() => router.navigate({ to: "/contact" })}
                className="mt-4 w-full rounded-full btn-glow btn-glow-hover px-5 py-3 text-sm disabled:opacity-40 disabled:pointer-events-none"
              >
                Request a quote
              </button>
              {lines.length > 0 && <button onClick={() => cart.clear()} className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground">Clear cart</button>}
              <p className="mt-4 text-[11px] leading-snug text-muted-foreground">No payment is taken here. Your selection is sent to our team as a quote request. <Link to="/contact" className="text-cyan">Contact us</Link></p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
