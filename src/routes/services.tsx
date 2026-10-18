import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, ShoppingCart, FileCode, Smartphone, Palette, RefreshCcw, LayoutDashboard, Layers, Search, Megaphone, Youtube, Facebook, MousePointer, Hash, Share2, Sparkles, PenTool, Users, Bot, Rocket, Lightbulb, Wrench, TrendingUp, Cpu, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/site/motion-utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Full-Stack Digital Growth | TechThrust" },
      { name: "description", content: "Web & app development, performance marketing, and Startup-as-a-Service — TechThrust's integrated services for measurable growth." },
      { property: "og:title", content: "TechThrust Services — Web, Marketing & Startup-as-a-Service" },
      { property: "og:description", content: "Integrated digital services engineered for measurable growth." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const webApp = [
  { icon: Globe, title: "Corporate & Business Websites", desc: "Engineered to convert visitors into customers." },
  { icon: ShoppingCart, title: "E-commerce Platforms", desc: "Shopify, WooCommerce or custom — built to sell." },
  { icon: FileCode, title: "Landing Page Systems", desc: "High-converting funnels for paid traffic." },
  { icon: Layers, title: "Web Application Development", desc: "SaaS platforms & enterprise web apps." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native iOS & Android applications." },
  { icon: Palette, title: "UI/UX Design", desc: "Design systems that turn flows into experiences." },
  { icon: RefreshCcw, title: "Website Redesign & Upgrade", desc: "Modernize stacks without losing equity." },
  { icon: LayoutDashboard, title: "Enterprise Portals & Dashboards", desc: "Internal platforms built for scale." },
];

const marketing = [
  { icon: Search, title: "Search Engine Optimization (SEO)", desc: "On-page, Off-page & Technical." },
  { icon: Megaphone, title: "Search Engine Marketing (SEM)", desc: "Strategy & full-funnel campaigns." },
  { icon: MousePointer, title: "Google Ads", desc: "Search, Display & Shopping." },
  { icon: Youtube, title: "YouTube Ads", desc: "Brand & performance video campaigns." },
  { icon: Facebook, title: "META Campaigns", desc: "Facebook & Instagram performance ads." },
  { icon: Hash, title: "Pay-Per-Click (PPC) Management", desc: "Bid management & A/B testing." },
  { icon: Share2, title: "Social Media Marketing (SMM)", desc: "Organic & paid social growth." },
  { icon: Sparkles, title: "Social Media Optimization (SMO)", desc: "Profile, content & community optimization." },
  { icon: TrendingUp, title: "Paid Ads Strategy & Execution", desc: "Full-funnel media planning." },
  { icon: PenTool, title: "Content Marketing", desc: "Editorial & SEO content engines." },
  { icon: Users, title: "Influencer & Brand Campaigns", desc: "Creator partnerships at scale." },
];

const phases = [
  {
    no: "01", icon: Lightbulb, title: "Ideation & Strategic Blueprint",
    desc: "Every successful launch begins with clarity. We immerse ourselves in your product, market, and competitive landscape to build a strategic foundation that de-risks execution.",
    bullets: ["Market research & competitor analysis", "Business model validation & monetization mapping", "Brand positioning, messaging & identity", "Go-to-market strategy with defined KPIs", "Technology stack & architecture planning"],
  },
  {
    no: "02", icon: Wrench, title: "MVP Build & Digital Infrastructure",
    desc: "Speed matters. We design and engineer your digital presence — websites, apps, platforms — with growth built in from day one. No patchwork. No technical debt traps.",
    bullets: ["Corporate & business websites engineered to convert", "SaaS platforms, web apps & enterprise portals", "E-commerce storefronts on Shopify, WooCommerce or custom stacks", "Native iOS & Android mobile applications", "UI/UX design systems that turn flows into experiences", "SEO-technical infrastructure baked into the build"],
  },
  {
    no: "03", icon: TrendingUp, title: "Go-to-Market & Growth Engine",
    desc: "A great product without traction is just code. We architect and execute multi-channel marketing campaigns that drive qualified traffic, generate leads, and convert visitors into customers.",
    bullets: ["Search Engine Optimization (SEO) & Search Engine Marketing (SEM)", "Google Ads, YouTube Ads & META campaign management", "PPC optimization, A/B testing & bid management", "Social media marketing, content marketing & SMO", "Influencer collaborations & brand campaigns", "Landing page systems optimized for paid traffic"],
  },
  {
    no: "04", icon: Cpu, title: "Scale with AI Automation",
    desc: "Growth compounds when systems run themselves. We deploy AI voice agents and intelligent automation that handle sales, support, and operations — so your business scales without proportionally scaling headcount.",
    bullets: ["Human-sounding AI voice agents for sales & customer support", "Custom automation workflows for back-office operations", "Lead qualification & appointment booking on autopilot", "Predictive analytics & performance intelligence", "Continuous optimization based on real data loops"],
  },
];

function ServicesPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.18), transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// SERVICES</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-5xl">
              Full-Stack Digital Services for <span className="text-gradient">Measurable Growth</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Three integrated practices — engineering, marketing, and AI automation — operating as one growth ecosystem. We don't run isolated initiatives; we build the system that compounds.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* WEB & APP */}
      <section className="py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyan">01</span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">// WEB & APP DEVELOPMENT</span>
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Build Platforms That <span className="text-gradient">Perform</span></h2>
          </FadeUp>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {webApp.map((s, i) => (
              <FadeUp key={s.title} delay={i * 60}>
                <div className="gradient-border-card p-6 h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><s.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-display font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETING */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyan">02</span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">// DIGITAL MARKETING</span>
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Pipeline-Filling <span className="text-gradient">Performance Marketing</span></h2>
          </FadeUp>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {marketing.map((s, i) => (
              <FadeUp key={s.title} delay={i * 50}>
                <div className="gradient-border-yellow p-6 h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow/10 text-yellow"><s.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-display font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* STARTUP-AS-A-SERVICE */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,222,50,0.10), transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyan">03</span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">// STARTUP-AS-A-SERVICE</span>
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
              You have the vision. <span className="text-gradient">We build the machine.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-3xl">A complete, end-to-end growth ecosystem — from first idea to automated scale — all under one roof.</p>
          </FadeUp>

          <div className="mt-16 relative">
            <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-yellow to-transparent hidden md:block" />
            <div className="space-y-8">
              {phases.map((p, i) => (
                <FadeUp key={p.no} delay={i * 100}>
                  <div className="relative md:pl-24">
                    <div className="absolute left-0 top-0 hidden md:flex h-20 w-20 items-center justify-center rounded-full glass border-cyan/40">
                      <p.icon className="h-8 w-8 text-cyan" />
                    </div>
                    <div className="gradient-border-card p-8">
                      <div className="flex flex-wrap items-baseline gap-4">
                        <span className="font-display text-5xl font-bold text-gradient">{p.no}</span>
                        <div>
                          <div className="font-mono text-xs uppercase tracking-widest text-cyan">// Phase {p.no}</div>
                          <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold">{p.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">{p.desc}</p>
                      <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-cyan shrink-0" />{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <FadeUp delay={200}>
            <div className="mt-14 gradient-border-yellow p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,222,50,0.12), transparent 60%)" }} />
              <Rocket className="h-10 w-10 text-yellow mx-auto" />
              <h3 className="mt-4 font-display text-3xl md:text-5xl font-bold">"Walk in with an idea. <span className="text-gradient">Walk out with a business.</span>"</h3>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                TechThrust is your full-stack growth partner. We handle strategy, engineering, marketing, and AI automation — so you stay focused on the vision while we build the machine.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-7 py-3 text-sm">
                Start Your Launch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* AI tease */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyan">04</span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">// AI PRODUCTS</span>
            </div>
            <div className="mt-6 gradient-border-card p-10 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/30 to-yellow/20 border border-glass-border">
                <Bot className="h-8 w-8 text-cyan" />
              </span>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold">Autonomous AI That Powers Your Business 24/7</h3>
                <p className="mt-2 text-muted-foreground">Voice agents, business automation, and custom AI workflows — built for real revenue impact.</p>
              </div>
              <Link to="/ai-products" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm">
                Explore AI Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="gradient-border-card p-12 text-center">
              <h2 className="font-display text-3xl md:text-5xl font-bold">Ready to Build Something <span className="text-gradient">Extraordinary?</span></h2>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-7 py-3 text-sm">
                Book a Free Strategy Call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
