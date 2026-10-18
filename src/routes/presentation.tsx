import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Square, Sparkles } from "lucide-react";
import { SLIDES } from "@/lib/presentation/slides";
import SlideVisual from "@/components/site/SlideVisual";
import { useVoiceUi, voiceUi } from "@/lib/voice/ui-store";

export const Route = createFileRoute("/presentation")({
  head: () => ({
    meta: [
      { title: "Presentation — TechThrust Services Overview" },
      { name: "description", content: "A narrated walkthrough of everything TechThrust offers." },
    ],
    links: [{ rel: "canonical", href: "/presentation" }],
  }),
  component: PresentationPage,
});

function PresentationPage() {
  const { presentation } = useVoiceUi();
  const i = presentation.index;
  const slide = SLIDES[i];
  const go = (n: number) => voiceUi.set({ presentation: { ...voiceUi.get().presentation, index: Math.max(0, Math.min(SLIDES.length - 1, n)) } });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(voiceUi.get().presentation.index + 1);
      if (e.key === "ArrowLeft") go(voiceUi.get().presentation.index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan">// PRESENTATION · {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
          {presentation.active ? (
            <button onClick={() => voiceUi.set({ presentation: { ...presentation, active: false } })} className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2 text-sm hover:bg-white/5">
              <Square className="h-3.5 w-3.5" /> Stop narration
            </button>
          ) : (
            <button onClick={() => voiceUi.set({ presentRequest: Date.now() })} className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover animate-pulse-glow px-5 py-2 text-sm">
              <Play className="h-4 w-4" /> Start AI narration
            </button>
          )}
        </div>

        <div key={slide.id} className="mt-6 gradient-border-card p-8 md:p-14 min-h-[28rem] relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(0,212,255,0.16), transparent 60%)" }} />
          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">// {slide.kicker}</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05] text-gradient">{slide.title}</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl">{slide.tagline}</p>
            <div className={`mt-8 grid gap-8 ${slide.visuals ? "lg:grid-cols-[1fr_1.2fr] items-start" : ""}`}>
              <ul className={`grid gap-y-3 text-base ${slide.visuals ? "" : "md:grid-cols-2 gap-x-8"}`}>
                {slide.bullets.map((b) => (
                  <li key={b} className="flex gap-3"><Sparkles className="h-5 w-5 text-cyan shrink-0 mt-0.5" />{b}</li>
                ))}
              </ul>
              {slide.visuals && (
                <div className="space-y-4">
                  {slide.visuals.map((v, n) => <SlideVisual key={n} v={v} />)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide" className="flex h-11 w-11 items-center justify-center rounded-full glass disabled:opacity-40 hover:border-cyan/50"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex flex-wrap justify-center gap-2">
            {SLIDES.map((s, n) => (
              <button key={s.id} aria-label={`Slide ${n + 1}: ${s.title}`} onClick={() => go(n)} className={`h-2.5 rounded-full transition-all ${n === i ? "w-8 bg-cyan" : "w-2.5 bg-white/25 hover:bg-white/50"}`} />
            ))}
          </div>
          <button onClick={() => go(i + 1)} disabled={i === SLIDES.length - 1} aria-label="Next slide" className="flex h-11 w-11 items-center justify-center rounded-full glass disabled:opacity-40 hover:border-cyan/50"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  );
}
