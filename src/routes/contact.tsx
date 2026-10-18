import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Mail, Phone, MessageCircle, Send, Linkedin, Instagram, Facebook, Youtube, CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/site/motion-utils";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { submitLead } from "@/lib/lead";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tech Thrust Digital Solutions FZC" },
      { name: "description", content: "Talk to TechThrust. Based in Ajman Free Zone, UAE. Serving clients globally." },
      { property: "og:title", content: "Contact TechThrust" },
      { property: "og:description", content: "Let's build something great together." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(2000),
});

const services = [
  "Web Development",
  "Digital Marketing",
  "AI Voice Agent",
  "AI Automation",
  "Full Suite",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Please check the form");
      return;
    }
    void submitLead({ ...result.data, source: "contact-form" });
    setSubmitted(true);
    toast.success("Thanks — we'll get back to you within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="overflow-hidden">
      <Toaster />
      <section className="relative pt-40 pb-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.18), transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// CONTACT</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-4xl">
              Let's Build Something <span className="text-gradient">Great Together.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Tell us about your goals. A senior strategist will respond within one business day.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.3fr_1fr] gap-8">
          {/* Form */}
          <FadeUp>
            <form onSubmit={onSubmit} className="gradient-border-card p-8 md:p-10 space-y-5" noValidate>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name *" name="name" placeholder="Full name" />
                <Field label="Company" name="company" placeholder="Company (optional)" />
                <Field label="Email *" name="email" type="email" placeholder="you@company.com" />
                <Field label="Phone" name="phone" placeholder="+971 ..." />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Service Interested In *</label>
                <select
                  name="service"
                  defaultValue=""
                  required
                  className="w-full glass px-4 py-3 text-sm focus:outline-none focus:border-cyan/60"
                >
                  <option value="" disabled className="bg-background">Select a service</option>
                  {services.map((s) => <option key={s} value={s} className="bg-background">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your project, goals & timeline"
                  className="w-full glass px-4 py-3 text-sm focus:outline-none focus:border-cyan/60 resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-6 py-3 text-sm"
              >
                {submitted ? (<><CheckCircle2 className="h-4 w-4" /> Sent</>) : (<>Send Message <Send className="h-4 w-4" /></>)}
              </button>
            </form>
          </FadeUp>

          {/* Details */}
          <FadeUp delay={150}>
            <div className="space-y-5">
              <div className="gradient-border-card p-7">
                <h3 className="font-display text-xl font-bold">Visit / Reach Us</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3"><MapPin className="h-5 w-5 text-cyan shrink-0 mt-0.5" /><span>C1 – F1 – SF11641<br />Ajman Free Zone, UAE</span></li>
                  <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-cyan" /><a href="mailto:info@tech-thrust.com" className="hover:text-cyan">info@tech-thrust.com</a></li>
                  <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan" /><a href="tel:+971585203369" className="hover:text-cyan">+971 585203369</a></li>
                </ul>
              </div>

              <a
                href="https://wa.me/971585203369"
                target="_blank" rel="noopener noreferrer"
                className="gradient-border-yellow p-7 flex items-center gap-4 hover:bg-yellow/5 transition"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white"><MessageCircle className="h-6 w-6" /></span>
                <div>
                  <div className="font-display text-lg font-bold">WhatsApp Quick Connect</div>
                  <div className="text-sm text-muted-foreground">Chat with a strategist now</div>
                </div>
              </a>

              <div className="gradient-border-card p-7">
                <h3 className="font-display text-xl font-bold">Follow Us</h3>
                <div className="mt-4 flex gap-3">
                  {[Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full glass hover:border-cyan/50 hover:text-cyan transition" aria-label="social">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="gradient-border-card overflow-hidden">
                <iframe
                  title="Office location"
                  src="https://www.google.com/maps?q=Ajman+Free+Zone,+UAE&output=embed"
                  className="w-full h-64 border-0 grayscale contrast-125 opacity-90"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full glass px-4 py-3 text-sm focus:outline-none focus:border-cyan/60 placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
