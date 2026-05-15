import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Users, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/60 bg-card/95 shadow-lg px-3 py-2 text-xs font-body backdrop-blur-sm">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-xl text-foreground">
          Xush kelibsiz, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin</span> 👋
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-0.5">Bugungi holat</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-border/60 bg-card/90 shadow-sm p-5"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="font-heading font-bold text-2xl text-foreground">{s.value}</div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs text-muted-foreground font-body">{s.label}</span>
              <span className="text-[10px] font-medium text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full">{s.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="lg:col-span-3 rounded-2xl border border-border/60 bg-card/90 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-semibold text-foreground">O'sish grafigi</h3>
              <p className="text-xs text-muted-foreground font-body mt-0.5">Loyihalar va mijozlar dinamikasi</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLoy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMij" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="loyihalar" name="Loyihalar" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorLoy)" />
              <Area type="monotone" dataKey="mijozlar" name="Mijozlar" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#colorMij)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="lg:col-span-2 rounded-2xl border border-border/60 bg-card/90 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-foreground">So'nggi loyihalar</h3>
            <a href="/dashboard/projects" className="text-xs text-primary hover:underline font-body flex items-center gap-1">
              Barchasi <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {recentProjects.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className="text-[10px] font-heading font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 mt-0.5">{p.cat}</span>
                <div className="min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{p.result}</p>
                </div>
                <span className={`text-[10px] shrink-0 px-2 py-0.5 rounded-full font-body ${
                  p.status === 'Tugallangan' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>{p.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
