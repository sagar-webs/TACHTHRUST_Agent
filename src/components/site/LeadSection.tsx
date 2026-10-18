import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Play, Send, CheckCircle2, Presentation } from "lucide-react";
import { FadeUp } from "@/components/site/motion-utils";
import { SLIDES } from "@/lib/presentation/slides";
import { voiceUi } from "@/lib/voice/ui-store";
import { submitLead } from "@/lib/lead";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(40),
});

const inputCls = "w-full glass px-4 py-3 text-sm focus:outline-none focus:border-cyan/60";
const labelCls = "block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2";

export default function LeadSection() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const watch = async () => {
    await router.navigate({ to: "/presentation" });
    voiceUi.set({ presentRequest: Date.now() });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
    setBusy(true);
    await submitLead({ ...parsed.data, source: "home-lead-form" });
    setBusy(false);
    setSent(true);
    toast.success("Thank you! A TechThrust representative will contact you shortly.");
    form.reset();
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="lead" className="py-24 relative">
      <Toaster />
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <span className="font-mono text-xs uppercase tracking-widest text-cyan">// SEE IT. TALK TO US.</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold max-w-3xl">
            Get Your Free <span className="text-gradient">Growth Plan</span>
          </h2>
        </FadeUp>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <FadeUp>
            <div className="gradient-border-card p-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 0%, rgba(0,212,255,0.18), transparent 60%)" }} />
              <div className="relative flex flex-col h-full">
                <Presentation className="h-9 w-9 text-cyan" />
                <h3 className="mt-4 font-display text-2xl font-bold">The TechThrust Presentation</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Sit back while our AI consultant walks you through every service, slide by slide. Ask questions any time.
                </p>
                <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                  {SLIDES.map((s, i) => (
                    <li key={s.id} className="truncate"><span className="font-mono text-cyan mr-2">{String(i + 1).padStart(2, "0")}</span>{s.title}</li>
                  ))}
                </ol>
                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  <button onClick={watch} className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-6 py-3 text-sm">
                    <Play className="h-4 w-4" /> Start AI Presentation
                  </button>
                  <Link to="/presentation" className="inline-flex items-center rounded-full border border-glass-border px-6 py-3 text-sm hover:bg-white/5">Browse slides</Link>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <form onSubmit={onSubmit} noValidate className="gradient-border-card p-8 space-y-5">
              <h3 className="font-display text-2xl font-bold">Let us reach out to you</h3>
              <div>
                <label className={labelCls} htmlFor="lead-name">Name *</label>
                <input id="lead-name" name="name" autoComplete="name" placeholder="Full name" className={inputCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="lead-email">Email ID *</label>
                <input id="lead-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="lead-phone">Phone Number *</label>
                <input id="lead-phone" name="phone" type="tel" autoComplete="tel" placeholder="+971 ..." className={inputCls} />
              </div>
              <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm disabled:opacity-60">
                {sent ? <><CheckCircle2 className="h-4 w-4" /> Submitted</> : <>Submit <Send className="h-4 w-4" /></>}
              </button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
