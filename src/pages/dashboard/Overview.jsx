import React, { useEffect, useRef, useState } from 'react';
import { FolderOpen, Users, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const stats = [
  { label: 'Jami loyihalar', value: '25', change: '+3', icon: FolderOpen, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Jamoa a\'zolari', value: '7', change: '+1', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Yangi xabarlar', value: '12', change: '+5', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'O\'sish', value: '300%', change: '+42%', icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
];

const chartData = [
  { month: 'Yan', loyihalar: 3, mijozlar: 2 },
  { month: 'Fev', loyihalar: 5, mijozlar: 4 },
  { month: 'Mar', loyihalar: 4, mijozlar: 5 },
  { month: 'Apr', loyihalar: 8, mijozlar: 6 },
  { month: 'May', loyihalar: 7, mijozlar: 8 },
  { month: 'Iyn', loyihalar: 10, mijozlar: 9 },
  { month: 'Iyl', loyihalar: 12, mijozlar: 11 },
];

const recentProjects = [
  { name: 'Bulutli SaaS Platforma', cat: 'SaaS', result: '+220% samaradorlik', status: 'Tugallangan' },
  { name: 'Onlayn Ta\'lim Markazi', cat: 'EdTech', result: '60K+ faol o\'quvchi', status: 'Jarayonda' },
  { name: 'Marketplace Tizimi', cat: 'E-commerce', result: '$2M+ aylanma', status: 'Tugallangan' },
];

const CHART_HEIGHT = 220;
const CHART_PRIMARY = '#a855f7';
const CHART_ACCENT = '#d8b4fe';
const CHART_MUTED = '#94a3b8';
const CHART_BORDER = 'rgba(148, 163, 184, 0.35)';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card shadow-lg px-3 py-2 text-xs font-body">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

function GrowthChart() {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const update = () => {
      const next = Math.floor(el.getBoundingClientRect().width);
      if (next > 0) setWidth(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden" style={{ height: CHART_HEIGHT }}>
      {width > 0 && (
        <AreaChart
          width={width}
          height={CHART_HEIGHT}
          data={chartData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_BORDER} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: CHART_MUTED }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: CHART_MUTED }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="loyihalar"
            name="Loyihalar"
            stroke={CHART_PRIMARY}
            strokeWidth={2}
            fill={CHART_PRIMARY}
            fillOpacity={0.15}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="mijozlar"
            name="Mijozlar"
            stroke={CHART_ACCENT}
            strokeWidth={2}
            fill={CHART_ACCENT}
            fillOpacity={0.12}
            isAnimationActive={false}
          />
        </AreaChart>
      )}
    </div>
  );
}

export default function Overview() {
  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      <div>
        <h2 className="font-heading font-bold text-xl text-foreground">
          Xush kelibsiz, <span className="text-primary">Admin</span> 👋
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-0.5">Bugungi holat</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="font-heading font-bold text-2xl text-foreground">{s.value}</div>
            <div className="flex items-center justify-between mt-0.5 gap-1">
              <span className="text-xs text-muted-foreground font-body leading-tight">{s.label}</span>
              <span className="text-[10px] font-medium text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-full shrink-0">{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-4 sm:p-6 overflow-hidden">
          <div className="mb-4 sm:mb-6">
            <h3 className="font-heading font-semibold text-foreground">O&apos;sish grafigi</h3>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Loyihalar va mijozlar dinamikasi</p>
          </div>
          <GrowthChart />
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-foreground">So&apos;nggi loyihalar</h3>
            <a href="/dashboard/projects" className="text-xs text-primary hover:underline font-body flex items-center gap-1">
              Barchasi <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {recentProjects.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
                <span className="text-[10px] font-heading font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 mt-0.5">{p.cat}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-body font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{p.result}</p>
                </div>
                <span className={`text-[10px] shrink-0 px-2 py-0.5 rounded-full font-body ${
                  p.status === 'Tugallangan' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                }`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
