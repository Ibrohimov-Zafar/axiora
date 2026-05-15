import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

const projects = [
  { cat: 'SaaS', name: 'Bulutli SaaS Platforma', problem: "Qo'lda bajarilgan jarayonlar", solution: 'Avtomatlashtirilgan ish oqimi', result: '+220% samaradorlik', status: 'Tugallangan' },
  { cat: 'EdTech', name: "Onlayn Ta'lim Markazi", problem: 'Past faollik darajasi', solution: "O'yinlashtirilgan tajriba", result: "60K+ faol o'quvchi", status: 'Jarayonda' },
  { cat: 'E-commerce', name: 'Marketplace Tizimi', problem: "Tarqoq sotuvchilar", solution: 'Yagona platforma', result: '$2M+ aylanma', status: 'Tugallangan' },
  { cat: 'AI', name: 'AI Qaror Mexanizmi', problem: 'Sekin tahlil', solution: "Mashina o'rganishi", result: '10x tezroq insight', status: 'Tugallangan' },
  { cat: 'CRM', name: 'Korporativ CRM', problem: "Ma'lumot bo'linishi", solution: 'Yagona CRM tizim', result: '+45% mijoz ushlab qolish', status: 'Jarayonda' },
  { cat: 'ERP', name: 'ERP Yechim', problem: "Qo'lda boshqaruv", solution: 'Uchidan-uchiga avtomatlashtirish', result: '30% xarajat tejash', status: 'Rejalashtirilgan' },
];

const CATS = ['Barchasi', 'SaaS', 'EdTech', 'E-commerce', 'AI', 'CRM', 'ERP'];

const statusColor = {
  'Tugallangan': 'bg-green-500/10 text-green-500',
  'Jarayonda': 'bg-yellow-500/10 text-yellow-500',
  'Rejalashtirilgan': 'bg-blue-500/10 text-blue-500',
};

export default function Projects() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Barchasi');

  const filtered = projects.filter((p) => {
    const matchCat = cat === 'Barchasi' || p.cat === cat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Loyihalar</h2>
          <p className="text-sm text-muted-foreground font-body mt-0.5">{filtered.length} ta loyiha</p>
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-border/60 bg-background text-sm font-body placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </div>
      </motion.div>

      {/* Category filter */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
              cat === c ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border/60 bg-card/90 shadow-sm p-5 hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] tracking-wider font-heading font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{p.cat}</span>
              <span className={`text-[10px] font-body px-2.5 py-1 rounded-full ${statusColor[p.status]}`}>{p.status}</span>
            </div>
            <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">{p.name}</h3>
            <div className="space-y-2 mt-auto">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body">{p.problem}</p>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body">{p.solution}</p>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-border/30">
                <TrendingUp className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <p className="text-xs font-mono font-semibold text-green-500">{p.result}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
