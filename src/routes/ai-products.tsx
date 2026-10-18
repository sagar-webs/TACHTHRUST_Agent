import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, PhoneIncoming, CalendarCheck, MessageSquare, RotateCcw, CheckCircle2, Clock, BarChart3, Mic, Settings, ClipboardList, Mail, FileText, ShoppingBag, Search, Briefcase, Workflow, Layers } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeUp } from "@/components/site/motion-utils";

export const Route = createFileRoute("/ai-products")({
  head: () => ({
    meta: [
      { title: "AI Products — Voice Agents & Business Automation | TechThrust" },
      { name: "description", content: "Deploy AI voice agents and intelligent automation systems that handle real business tasks — at scale, around the clock." },
      { property: "og:title", content: "AI Voice Agents & Business Automation — TechThrust" },
      { property: "og:description", content: "Autonomous AI that powers your business 24/7." },
      { property: "og:url", content: "/ai-products" },
    ],
    links: [{ rel: "canonical", href: "/ai-products" }],
  }),
  component: AIPage,
});

const voiceCaps = [
  { icon: Phone, label: "Outbound Sales Calling" },
  { icon: PhoneIncoming, label: "Inbound Call Handling" },
  { icon: CalendarCheck, label: "Appointment Booking & Scheduling" },
  { icon: MessageSquare, label: "Customer Feedback Collection" },
  { icon: RotateCcw, label: "Customer Retention Campaigns" },
  { icon: CheckCircle2, label: "Lead Qualification" },
  { icon: Clock, label: "After-Hours Auto Response" },
  { icon: BarChart3, label: "Call Analytics & Reporting" },
];

const autoCaps = [
  { icon: ClipboardList, label: "CRM Data Entry & Updates" },
  { icon: Mail, label: "Automated Email & WhatsApp Campaigns" },
  { icon: FileText, label: "Report Generation & Summarization" },
  { icon: ShoppingBag, label: "E-commerce Order & Inventory Automation" },
  { icon: Search, label: "Lead Scraping & Enrichment" },
  { icon: Briefcase, label: "HR & Onboarding Workflows" },
  { icon: Phone, label: "Multi-channel Customer Engagement" },
  { icon: Workflow, label: "Any Custom Business Process" },
];

const industries = ["Real Estate", "Healthcare", "E-commerce", "Finance", "Education", "Hospitality", "Retail"];

const faqs = [
  { q: "How long does it take to deploy an AI voice agent?", a: "Most agents are configured, voice-trained, and live within 2–3 weeks. Complex multi-flow agents with deep CRM integration typically take 4–6 weeks." },
  { q: "What languages do the AI voice agents support?", a: "Our agents are multilingual — including English (US, UK, AU), Arabic, Hindi, Spanish, French, and German — with regionally accurate voice models." },
  { q: "Can the agents integrate with our existing CRM and tools?", a: "Yes. We integrate natively with Salesforce, HubSpot, Zoho, Pipedrive, custom CRMs, calendars (Google/Outlook), WhatsApp Business, and most major telephony providers." },
  { q: "How customizable are the AI workflows?", a: "Fully. Every agent is built around your scripts, business rules, escalation paths, and tone. We tune them continuously based on live call data." },
  { q: "Which industries see the most impact?", a: "Real estate, healthcare, finance, e-commerce, hospitality and education see the strongest ROI — but the playbook works for any business with repeatable conversation patterns." },
  { q: "Is it compliant and secure?", a: "Yes. We support call recording opt-in, GDPR/CCPA-aware data handling, regional data residency, and encrypted storage. Compliance is configured per market." },
];

function AIPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,77,255,0.25), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.18), transparent 60%)" }} />
          <svg className="absolute inset-x-0 bottom-0 w-full opacity-30" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
            <path d="M0,100 Q150,40 300,100 T600,100 T900,100 T1200,100" fill="none" stroke="#00D4FF" strokeWidth="1.5">
              <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="M0,100 Q150,40 300,100 T600,100 T900,100 T1200,100;M0,100 Q150,160 300,100 T600,100 T900,100 T1200,100;M0,100 Q150,40 300,100 T600,100 T900,100 T1200,100" />
            </path>
            <path d="M0,120 Q150,60 300,120 T600,120 T900,120 T1200,120" fill="none" stroke="#ffde32" strokeWidth="1" opacity="0.6">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,120 Q150,180 300,120 T600,120 T900,120 T1200,120;M0,120 Q150,60 300,120 T600,120 T900,120 T1200,120;M0,120 Q150,180 300,120 T600,120 T900,120 T1200,120" />
            </path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// AI PRODUCTS</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-5xl">
              Autonomous AI That <span className="text-gradient">Powers Your Business 24/7</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Deploy AI voice agents and intelligent automation systems that handle real business tasks — at scale, around the clock.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-6 py-3 text-sm">
                Deploy a Voice Agent <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-cyan/60 text-cyan px-6 py-3 text-sm font-semibold hover:bg-cyan/10">
                Automate Your Business <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://velynora.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#ff7a18] to-[#ff4d00] echo-wave"
              >
                VELYNORA
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* AI Voice Agents */}
      <section className="py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6 text-cyan" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">// AI VOICE CALLING AGENTS</span>
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold max-w-4xl">Human-sounding agents that <span className="text-gradient">never miss a call.</span></h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-3xl">
              Human-sounding AI agents that pick up your phones, run outbound campaigns, qualify leads, and book meetings — without scripts feeling robotic and without a single missed call.
            </p>
          </FadeUp>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {voiceCaps.map((c, i) => (
              <FadeUp key={c.label} delay={i * 60}>
                <div className="gradient-border-card p-5 h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><c.icon className="h-5 w-5" /></span>
                  <div className="mt-3 font-semibold">{c.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* How it works */}
          <FadeUp delay={150}>
            <div className="mt-12 gradient-border-card p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-cyan">// HOW IT WORKS</div>
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {["Configure Agent", "Connect Phone System", "Go Live"].map((s, i, arr) => (
                  <div key={s} className="flex items-center gap-4">
                    <div className="flex-1 glass p-5">
                      <div className="font-mono text-xs text-yellow">STEP {i + 1}</div>
                      <div className="mt-1 font-display text-lg font-bold">{s}</div>
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="h-5 w-5 text-cyan shrink-0 hidden md:block" />}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="mt-10">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Industries that benefit</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {industries.map((i) => (
                  <span key={i} className="px-4 py-2 rounded-full glass border border-cyan/20 text-sm hover:border-cyan/50 transition">{i}</span>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={250}>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm">
              Deploy a Voice Agent <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* AI Automation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-yellow" />
              <span className="font-mono text-xs uppercase tracking-widest text-yellow">// AI BUSINESS AUTOMATION AGENTS</span>
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold max-w-4xl">Custom AI agents for <span className="text-gradient">any business workflow.</span></h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-3xl">Custom AI agents for internal and external business workflows — from CRM updates to multi-channel customer engagement.</p>
          </FadeUp>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {autoCaps.map((c, i) => (
              <FadeUp key={c.label} delay={i * 60}>
                <div className="gradient-border-yellow p-5 h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow/10 text-yellow"><c.icon className="h-5 w-5" /></span>
                  <div className="mt-3 font-semibold">{c.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm">
                Automate Your Business <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://velynora.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#ff7a18] to-[#ff4d00] echo-wave"
              >
                VELYNORA
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// FAQ</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Frequently <span className="text-gradient">Asked Questions</span></h2>
          </FadeUp>
          <FadeUp delay={100}>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass px-6 border-glass-border">
                  <AccordionTrigger className="text-left font-display text-lg hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="gradient-border-card p-12 text-center">
              <Layers className="h-10 w-10 text-cyan mx-auto" />
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">Let's Build Your <span className="text-gradient">AI Stack</span></h2>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-7 py-3 text-sm">
                Talk to an AI Specialist <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
