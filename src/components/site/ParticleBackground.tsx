import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const mouse = { x: -1000, y: -1000 };
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.floor((w * h) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    const tick = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // gentle pull toward cursor
        const dxm = mouse.x - p.x, dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 240 && dm > 0) {
          p.x += (dxm / dm) * 0.25;
          p.y += (dym / dm) * 0.25;
        }

        ctx.fillStyle = "rgba(0,212,255,0.7)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2); ctx.fill();
      }

      // particle-particle constellation
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(0,212,255,${0.18 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // cursor connections — bright yellow lines to every nearby particle
      if (mouse.x > -500) {
        for (const p of particles) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 240) {
            ctx.strokeStyle = `rgba(255,222,50,${0.55 * (1 - d / 240)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
        // cursor glow
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
        grad.addColorStop(0, "rgba(255,222,50,0.35)");
        grad.addColorStop(1, "rgba(255,222,50,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
