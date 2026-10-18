import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChevronRight } from "lucide-react";
import type { Visual } from "@/lib/presentation/slides";

const CYAN = "#00d4ff";
const GRID = "rgba(255,255,255,0.08)";
const TICK = { fill: "rgba(255,255,255,0.65)", fontSize: 12 };
const TIP = { background: "#0b1220", border: "1px solid rgba(0,212,255,0.4)", borderRadius: 8, color: "#fff" };

function ChartCard({ title, source, children }: { title: string; source: string; children: React.ReactNode }) {
  return (
    <div className="glass p-4">
      <div className="font-display text-sm font-semibold">{title}</div>
      <div className="mt-2 h-44">{children}</div>
      <div className="mt-2 text-[11px] leading-snug text-muted-foreground">Source: {source}</div>
    </div>
  );
}

export default function SlideVisual({ v }: { v: Visual }) {
  if (v.type === "bars")
    return (
      <ChartCard title={v.title} source={v.source}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={v.data} margin={{ top: 18, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="label" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis tick={TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TIP} cursor={{ fill: "rgba(255,255,255,0.05)" }} formatter={(x) => [`${x} ${v.unit}`, ""]} />
            <Bar dataKey="value" fill={CYAN} radius={[6, 6, 0, 0]} isAnimationActive>
              <LabelList dataKey="value" position="top" fill="#fff" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    );

  if (v.type === "area")
    return (
      <ChartCard title={v.title} source={v.source}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={v.data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CYAN} stopOpacity={0.5} />
                <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="label" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis tick={TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TIP} formatter={(x) => [`${x} ${v.unit}`, ""]} />
            <Area type="monotone" dataKey="value" stroke={CYAN} strokeWidth={2.5} fill="url(#areaFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    );

  if (v.type === "compare")
    return (
      <div className="glass overflow-hidden text-sm">
        <div className="grid grid-cols-[1.1fr_1fr_1.3fr] bg-white/5 font-mono text-[11px] uppercase tracking-widest">
          {v.head.map((h, i) => <div key={i} className={`px-4 py-3 ${i === 2 ? "text-cyan" : "text-muted-foreground"}`}>{h}</div>)}
        </div>
        {v.rows.map((r) => (
          <div key={r[0]} className="grid grid-cols-[1.1fr_1fr_1.3fr] border-t border-white/10">
            <div className="px-4 py-3 text-muted-foreground">{r[0]}</div>
            <div className="px-4 py-3 text-muted-foreground/80">{r[1]}</div>
            <div className="px-4 py-3 font-semibold">{r[2]}</div>
          </div>
        ))}
      </div>
    );

  if (v.type === "flow")
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {v.steps.map((s, i) => (
          <div key={s.label} className="glass p-4 relative">
            <div className="font-mono text-[11px] text-cyan">STEP {String(i + 1).padStart(2, "0")}</div>
            <div className="mt-1 font-display text-lg font-bold">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
            {i < v.steps.length - 1 && <ChevronRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan z-10" />}
          </div>
        ))}
      </div>
    );

  return (
    <div className="flex flex-wrap gap-2">
      {v.items.map((m) => <span key={m} className="glass px-4 py-2 text-sm font-semibold">{m}</span>)}
    </div>
  );
}
