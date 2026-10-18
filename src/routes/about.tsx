import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Sparkles, Eye, Handshake, Target } from "lucide-react";
import { FadeUp } from "@/components/site/motion-utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tech Thrust Digital Solutions FZC" },
      { name: "description", content: "Registered in Ajman Free Zone, UAE. Serving ambitious brands across UAE & GCC, India, USA, UK, EU, and Australia." },
      { property: "og:title", content: "About TechThrust" },
      { property: "og:description", content: "An AI-native digital agency engineering growth for global brands." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const markets = ["UAE & GCC", "India", "USA & Canada", "United Kingdom", "European Union", "Australia"];

const differentiators = [
  { icon: Sparkles, title: "AI-Native, Not AI-Added", desc: "We were built on AI from day one — every workflow, deliverable and product carries it natively." },
  { icon: Target, title: "Outcomes Over Outputs", desc: "We measure success by your revenue, not our deliverables. Every engagement ties to a real business KPI." },
  { icon: Globe, title: "Global Operating Model", desc: "Distributed teams across UAE, India and partner geographies — operating in your timezone, in your market." },
  { icon: Handshake, title: "Partnership Mindset", desc: "We're operators, not vendors. Your strategy is our strategy; your numbers are our numbers." },
];

const values = [
  { label: "Innovation", text: "Pushing boundaries — never settling for what's done already." },
  { label: "Transparency", text: "Open dashboards, open numbers, open conversations." },
  { label: "Results", text: "If it doesn't move a KPI, it doesn't ship." },
  { label: "Partnership", text: "Long-term thinking. Your growth is our growth." },
];

function AboutPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.18), transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// ABOUT US</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-5xl">
              An AI-native agency <span className="text-gradient">engineering growth</span> for global brands.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Tech Thrust Digital Solutions FZC is registered in Ajman Free Zone, UAE — operating as an integrated digital-and-AI partner for ambitious companies worldwide.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Markets */}
      <section className="py-16 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan">// SERVING</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Six markets. One operating standard.</h2>
          </FadeUp>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {markets.map((m, i) => (
              <FadeUp key={m} delay={i * 60}>
                <div className="gradient-border-card p-5 text-center">
                  <Globe className="h-5 w-5 text-cyan mx-auto" />
                  <div className="mt-2 font-display font-bold">{m}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// WHAT MAKES US DIFFERENT</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Not another agency. <span className="text-gradient">A growth system.</span></h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {differentiators.map((d, i) => (
              <FadeUp key={d.title} delay={i * 100}>
                <div className="gradient-border-card p-7 h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><d.icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-display text-xl font-bold">{d.title}</h3>
                  <p className="mt-2 text-muted-foreground">{d.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Story section removed */}

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// VALUES</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">What we <span className="text-gradient">stand for</span></h2>
          </FadeUp>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <FadeUp key={v.label} delay={i * 80}>
                <div className="gradient-border-yellow p-7 h-full">
                  <Eye className="h-5 w-5 text-yellow" />
                  <h3 className="mt-3 font-display text-xl font-bold">{v.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="gradient-border-card p-12 text-center">
              <h2 className="font-display text-3xl md:text-5xl font-bold">Let's build the next chapter <span className="text-gradient">together.</span></h2>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-7 py-3 text-sm">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
