import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Megaphone, Bot, Zap, Target, Rocket, BarChart3, Mic, Settings, Clock, Brain, ShieldCheck, Sparkles, Star, MapPin, TrendingUp, Users, Layers, Award } from "lucide-react";
import ParticleBackground from "@/components/site/ParticleBackground";
import { Typewriter, Counter, FadeUp } from "@/components/site/motion-utils";
import whatWeDoImg from "@/assets/what-we-do.jpg";
import LeadSection from "@/components/site/LeadSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechThrust — Digital Systems That Generate Leads & Scale Businesses" },
      { name: "description", content: "AI voice agents, high-performance websites, apps & full-stack digital marketing — TechThrust engineers end-to-end growth for ambitious global brands." },
      { property: "og:title", content: "TechThrust — AI-Powered Digital Growth Agency" },
      { property: "og:description", content: "Websites, apps, marketing & AI voice agents for global brands." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const marqueeItems = [
  "Website Development", "Mobile App Development", "SEO & SEM", "Google Ads",
  "META Campaigns", "AI Voice Agents", "AI Business Automation", "YouTube Ads",
  "CRM Automation", "Web App Development",
];

const principles = [
  "Strategy before Technology",
  "Automation with Purpose",
  "Growth Through Innovation",
  "Decisions Backed by Data",
  "Built to Scale",
];

const growthEngine = [
  { icon: Layers, title: "Application Development", desc: "Web & mobile platforms engineered for scale.", step: "Attract" },
  { icon: Megaphone, title: "Digital Marketing", desc: "Multi-channel campaigns that drive qualified traffic.", step: "Capture" },
  { icon: Target, title: "Lead Generation", desc: "Funnels that turn attention into pipeline.", step: "Engage" },
  { icon: Settings, title: "Smart CRM", desc: "Automated workflows from inquiry to close.", step: "Convert" },
  { icon: Mic, title: "AI Calling Agents", desc: "Voice agents handling calls 24/7.", step: "Optimize" },
  { icon: BarChart3, title: "Insights & Reporting", desc: "Real-time intelligence for every decision.", step: "Scale" },
];

const voiceUseCases = [
  "Outbound Sales Campaigns", "Inbound Customer Support", "Appointment Booking & Confirmation",
  "Customer Feedback Collection", "Lead Qualification Calls", "Customer Retention Campaigns", "After-hours Call Handling",
];
const automationUseCases = [
  "Lead Generation Automation", "CRM & Pipeline Automation", "Email & WhatsApp Workflows",
  "Report Generation", "Internal Process Automation", "E-commerce Automation", "Multi-channel Customer Engagement",
];

const testimonials = [
  { quote: "TechThrust rebuilt our digital stack end-to-end. Inbound qualified leads grew 3.4x in six months and our AI agent now closes appointments while we sleep.", name: "Operations Director", role: "B2B SaaS, USA", rating: 5 },
  { quote: "Their performance marketing team treats every dirham like their own. We've never had this much visibility into what's actually working.", name: "Founder", role: "DTC Brand, UAE", rating: 5 },
  { quote: "We replaced an entire BPO contract with their AI voice agents. Response times went from hours to seconds, with better consistency.", name: "Head of CX", role: "FinTech, UK", rating: 5 },
];


function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20">
        <div className="absolute inset-0">
          <ParticleBackground />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(0,212,255,0.18), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,222,50,0.10), transparent 50%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <FadeUp>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan glass px-3 py-1.5">
                <Sparkles className="h-3 w-3" /> AI-Native Digital Agency · UAE
              </span>
            </FadeUp>
            <div className="mt-6">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]">
                <span className="block whitespace-nowrap">We Build Digital</span>
                <span className="block whitespace-nowrap">Systems That</span>
                <span className="block whitespace-nowrap text-gradient min-h-[1.1em]"><Typewriter words={["Generate Leads", "Scale Businesses", "Automate Growth", "Convert Users"]} /></span>
              </h1>
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              From AI-powered voice agents to high-performance websites and full-stack digital marketing — TechThrust engineers end-to-end digital growth for ambitious brands.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-cyan/60 text-cyan px-6 py-3 text-sm font-semibold hover:bg-cyan/10 transition">
                Explore Our Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-6 py-3 text-sm">
                Talk to an Expert <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-2 whitespace-nowrap"><Globe className="h-4 w-4 text-cyan shrink-0" /> 6 Target Markets</span>
              <span className="flex items-center gap-2 whitespace-nowrap"><Zap className="h-4 w-4 text-cyan shrink-0" /> AI-Powered Solutions</span>
              <span className="flex items-center gap-2 whitespace-nowrap"><TrendingUp className="h-4 w-4 text-cyan shrink-0" /> Full-Stack Digital</span>
              <span className="flex items-center gap-2 whitespace-nowrap"><Clock className="h-4 w-4 text-cyan shrink-0" /> 24/7 Support</span>
            </div>
          </div>

        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative py-6 border-y border-glass-border overflow-hidden bg-background/60">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 font-mono text-sm text-muted-foreground/70">
              {item} <span className="text-cyan mx-4">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* WHAT DO WE DO */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:items-stretch">
              <div className="lg:flex lg:flex-col lg:justify-between lg:h-full">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan">// WHAT WE DO</span>
                  <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">
                    Integrated Digital Systems Engineered for <span className="text-gradient">Measurable Growth</span>
                  </h2>
                </div>
                <p className="mt-6 lg:mt-0 text-muted-foreground text-lg">
                  In an increasingly competitive market, isolated digital efforts often result in fragmented experiences, inefficient spending, and unpredictable outcomes. At TechThrust, we design and deploy integrated growth ecosystems that combine digital infrastructure, performance marketing, and AI-powered automation. Every strategy is built around business objectives, customer insights, and clearly defined KPIs to deliver sustainable and measurable business impact.
                </p>
              </div>
              <div className="relative lg:flex lg:items-end lg:h-full">
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan/20 via-transparent to-yellow/20 blur-2xl rounded-3xl" />
                <div className="relative rounded-2xl overflow-hidden border border-glass-border glass w-full">
                  <img
                    src={whatWeDoImg}
                    alt="Integrated AI and digital marketing growth ecosystem"
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {[
              { label: "Mission", text: "To democratize access to intelligent technology, empowering every business to grow faster, operate smarter, and compete without limits.", icon: Rocket },
              { label: "Vision", text: "A world where every business, regardless of size or location, has access to the technology, intelligence, and systems needed to innovate, compete, and thrive.", icon: Brain },
            ].map((c, i) => (
              <FadeUp key={c.label} delay={i * 100}>
                <div className="gradient-border-card p-8 h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><c.icon className="h-5 w-5" /></span>
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan">// {c.label}</span>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed">{c.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {principles.map((p, i) => (
              <FadeUp key={p} delay={i * 80}>
                <div className="gradient-border-yellow p-5 h-full flex items-center gap-3">
                  <span className="font-mono text-xs text-yellow">0{i + 1}</span>
                  <span className="text-sm font-semibold">{p}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW — Three Pillars */}
      <section className="py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// OUR SERVICES</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Three Pillars of <span className="text-gradient">Digital Dominance</span></h2>
          </FadeUp>

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe, color: "from-cyan/30 to-cyan/0", title: "Web & App Development",
                desc: "We craft high-performance websites, web apps, and mobile applications engineered for speed, conversion, and scale.",
                bullets: ["Website Development & Upgrades", "Web Application Development", "Mobile App Development (iOS & Android)", "UI/UX Design", "E-commerce Platforms", "Enterprise Dashboards"],
                cta: "Explore Development",
              },
              {
                icon: Megaphone, color: "from-yellow/30 to-yellow/0", title: "Digital Marketing",
                desc: "Full-funnel performance marketing that fills your pipeline with qualified leads and measurable ROI.",
                bullets: ["SEO & Technical Optimization", "Google Ads & SEM", "META Campaigns (Facebook/Instagram)", "YouTube Advertising", "Pay-Per-Click Management", "Social Media Marketing", "Paid Ads Strategy & Execution"],
                cta: "Explore Marketing",
              },
              {
                icon: Bot, color: "from-cyan/30 to-yellow/20", title: "AI Products",
                desc: "Deploy intelligent AI agents that work around the clock — handling calls, booking appointments, and automating entire workflows.",
                bullets: ["AI Voice Calling Agents", "Outbound Sales Campaigns", "Inbound Call Handling", "AI Business Automation Agents", "Custom AI Workflows"],
                cta: "Explore AI Solutions",
              },
            ].map((s, i) => (
              <FadeUp key={s.title} delay={i * 120}>
                <div className="gradient-border-card p-8 h-full flex flex-col">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} border border-glass-border`}>
                    <s.icon className="h-7 w-7 text-cyan" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2 text-sm flex-1">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-muted-foreground"><span className="mt-1.5 h-1 w-1 rounded-full bg-cyan" />{b}</li>
                    ))}
                  </ul>
                  <Link to={i === 2 ? "/ai-products" : "/services"} className="mt-6 inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-3 transition-all">
                    {s.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* UNIQUE ADVANTAGE — Digital-AI Growth Engine */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.10), transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// UNIQUE ADVANTAGE</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">The TechThrust <span className="text-gradient">Digital-AI Growth Engine</span></h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-3xl">A unified system engineered to attract, engage, convert, and scale — through strategy, technology, and AI.</p>
          </FadeUp>

          {/* Horizontal process grid with animated snaking path */}
          <div className="mt-16 relative">
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="growthLine" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#ffde32" />
                </linearGradient>
              </defs>
              <path
                d="M 8 25 L 92 25 L 92 75 L 8 75"
                fill="none"
                stroke="url(#growthLine)"
                strokeWidth="0.4"
                strokeDasharray="2 2"
                opacity="0.4"
                vectorEffect="non-scaling-stroke"
              />
              <circle r="1.2" fill="#ffde32" style={{ filter: "drop-shadow(0 0 4px #ffde32)" }}>
                <animateMotion dur="8s" repeatCount="indefinite" path="M 8 25 L 92 25 L 92 75 L 8 75 L 8 25" />
              </circle>
            </svg>

            <div className="relative z-10 grid md:grid-cols-3 gap-6">
              {growthEngine.map((c, i) => {
                // Snake order: top row 1,2,3 left→right; bottom row 4,5,6 placed right→left so animated dot flows through them
                const isBottomRow = i >= 3;
                const order = isBottomRow ? 10 + (5 - i) : i; // bottom: i=3→12, i=4→11, i=5→10
                return (
                  <div key={c.title} style={{ order }} className="contents md:block">
                    <FadeUp delay={i * 80}>
                      <div className="gradient-border-card p-6 h-full relative">
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full glass border border-cyan/40 flex items-center justify-center text-yellow font-mono text-sm font-bold shadow-[0_0_18px_rgba(255,222,50,0.25)]">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex items-center gap-3 mb-3 mt-2">
                          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><c.icon className="h-5 w-5" /></span>
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-widest text-yellow">// {c.step}</div>
                            <h3 className="font-display text-lg font-bold leading-tight">{c.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{c.desc}</p>
                      </div>
                    </FadeUp>
                  </div>
                );
              })}
            </div>
          </div>

          <FadeUp>
            <p className="mt-12 max-w-4xl mx-auto text-center text-muted-foreground italic">
              Unlike traditional agencies that manage isolated activities, TechThrust connects every stage of the growth journey into a unified ecosystem. This ensures faster response times, better lead conversion, complete visibility, and measurable business outcomes.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* AI PRODUCTS SPOTLIGHT */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-500/20 via-cyan/15 to-transparent blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">// AI PRODUCTS</span>
              <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
                AI That Works <span className="text-gradient">24×7</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">The Future of Business is Autonomous.</p>
            </div>
          </FadeUp>

          <div className="mt-16 grid lg:grid-cols-2 gap-6">
            {[
              { icon: Mic, title: "AI Voice Agents — Your 24/7 Sales & Support Team",
                desc: "Deploy intelligent, human-sounding AI voice agents that handle inbound and outbound calls autonomously. No hold times, no fatigue, no off-hours.",
                tags: voiceUseCases, cta: "Deploy Your Voice Agent" },
              { icon: Settings, title: "AI Agents for Any Business Use Case",
                desc: "Custom-built AI agents that automate complex business workflows — from data processing and CRM updates to customer communication and decision support.",
                tags: automationUseCases, cta: "Build Your AI Agent" },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 150}>
                <div className="gradient-border-card p-8 h-full">
                  <c.icon
                    className={`h-14 w-14 text-yellow drop-shadow-[0_0_18px_rgba(255,222,50,0.55)] ${i === 0 ? "animate-float" : "animate-spin-slow"}`}
                  />
                  <h3 className="mt-6 font-display text-2xl font-bold">{c.title}</h3>
                  <p className="mt-3 text-muted-foreground">{c.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-full glass border border-cyan/20 text-foreground/90 hover:border-cyan/50 hover:bg-cyan/5 transition">→ {t}</span>
                    ))}
                  </div>
                  <Link to="/ai-products" className="mt-8 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-5 py-2.5 text-sm">
                    {c.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TECHTHRUST */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// WHY US</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Why Global Brands <span className="text-gradient">Choose Us</span></h2>
          </FadeUp>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Speed-First Execution", desc: "Ship in weeks, not quarters. Real velocity, never at the cost of quality." },
              { icon: Target, title: "ROI-Driven Strategy", desc: "Every initiative tied to KPIs. We optimize for outcomes, not vanity metrics." },
              { icon: Globe, title: "Global Market Expertise", desc: "Operating across UAE, USA, UK, EU, India & Australia with native fluency." },
              { icon: Bot, title: "AI-Native Agency", desc: "Built on AI from day one — we don't add AI, we engineer with it." },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 100}>
                <div className="gradient-border-card p-6 h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><c.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: 6, suffix: "+", label: "Target Markets" },
                { n: 3, label: "Core Service Pillars" },
                { n: 24, suffix: "/7", label: "AI Availability" },
                { n: 100, suffix: "%", label: "Custom Solutions" },
              ].map((s) => (
                <div key={s.label} className="glass p-6 text-center">
                  <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
                    <Counter to={s.n} suffix={s.suffix || ""} />
                  </div>
                  <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// PACKAGES</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Flexible Plans for <span className="text-gradient">Every Stage of Growth</span></h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl">Whether you're launching, scaling, or transforming — we have a structured engagement model for you. Contact us for custom pricing.</p>
          </FadeUp>
          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {[
              { name: "Starter", tagline: "Digital Foundation", best: "Startups & New Businesses",
                items: ["Professional Website Development", "Basic SEO Setup", "Google My Business Optimization", "Social Media Profile Setup", "1 Month Support"],
                cta: "Get Started", solid: false, popular: false },
              { name: "Growth", tagline: "Scale & Perform", best: "Growing Businesses",
                items: ["Custom Web or App Development", "Full SEO & SEM Campaign", "META + Google Ads Management", "Monthly Performance Reports", "CRM Integration", "AI Chatbot or Voice Agent (Basic)", "Dedicated Account Manager"],
                cta: "Start Growing", solid: true, popular: true },
              { name: "Enterprise", tagline: "Full Transformation", best: "Established Brands & Enterprises",
                items: ["Enterprise Web/App Platform", "Complete Digital Marketing Suite", "AI Voice Agent Deployment", "Custom AI Business Automation", "Advanced Analytics & Reporting", "Multi-channel Ad Management", "Priority Support & Strategy Calls"],
                cta: "Request Proposal", solid: false, popular: false },
            ].map((p, i) => (
              <FadeUp key={p.name} delay={i * 120}>
                <div className={`relative p-8 h-full ${p.popular ? "gradient-border-yellow" : "gradient-border-card"}`}>
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r from-cyan to-yellow text-background animate-pulse-glow">Most Popular</span>
                  )}
                  <div className="font-mono text-xs uppercase tracking-widest text-cyan">// {p.name}</div>
                  <h3 className="mt-2 font-display text-2xl font-bold">{p.tagline}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Best for: {p.best}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 mt-0.5 text-cyan shrink-0" />{it}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${p.solid ? "btn-glow btn-glow-hover" : "border border-cyan/50 text-cyan hover:bg-cyan/10"}`}>
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// TESTIMONIALS</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">What Our <span className="text-gradient">Clients Say</span></h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div className="gradient-border-card p-7 h-full flex flex-col">
                  <div className="flex gap-1 text-yellow">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4" fill="currentColor" />)}
                  </div>
                  <p className="mt-4 text-base leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="mt-6 pt-5 border-t border-glass-border">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
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
            <div className="gradient-border-card p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15), transparent 60%)" }} />
              <div className="relative">
                <Award className="h-10 w-10 text-cyan mx-auto" />
                <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">Ready to Build Something <span className="text-gradient">Extraordinary?</span></h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Let's engineer your next chapter of growth — together.</p>
                <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-7 py-3 text-sm">
                  Book a Free Strategy Call <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <LeadSection />
    </div>
  );
}
