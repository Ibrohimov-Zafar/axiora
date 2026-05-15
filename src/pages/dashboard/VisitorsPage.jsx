import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Globe, Users, Eye, MapPin, Search, RefreshCw, Trash2,
  Monitor, Smartphone, Tablet, ExternalLink, Filter,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  getVisits, getVisitStats, formatVisitTime, clearVisits, seedDemoVisits,
} from '@/lib/visitTracker';

const REFERRER_STYLES = {
  direct: 'bg-slate-500/10 text-slate-600 dark:text-slate-300',
  search: 'bg-blue-500/10 text-blue-600',
  social: 'bg-pink-500/10 text-pink-600',
  referral: 'bg-amber-500/10 text-amber-600',
};

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="font-heading font-bold text-2xl text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground font-body mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-primary font-medium mt-1 truncate">{sub}</p>}
    </div>
  );
}

export default function VisitorsPage() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState('');
  const [pageFilter, setPageFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const load = useCallback(() => {
    seedDemoVisits();
    setVisits(getVisits());
  }, []);

  useEffect(() => {
    load();
    const onStorage = (e) => {
      if (e.key === 'axiora_visits') load();
    };
    window.addEventListener('storage', onStorage);
    const interval = setInterval(load, 8000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, [load]);

  const stats = useMemo(() => getVisitStats(visits), [visits]);
  const pages = useMemo(() => [...new Set(visits.map((v) => v.page))], [visits]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return visits.filter((v) => {
      if (pageFilter !== 'all' && v.page !== pageFilter) return false;
      if (sourceFilter !== 'all' && v.referrerType !== sourceFilter) return false;
      if (!q) return true;
      return [v.ip, v.page, v.referrer, v.city, v.country, v.device, v.browser]
        .some((f) => String(f).toLowerCase().includes(q));
    });
  }, [visits, search, pageFilter, sourceFilter]);

  const handleClear = () => {
    if (window.confirm("Barcha tashrif yozuvlarini o'chirasizmi?")) {
      clearVisits();
      setVisits([]);
    }
  };

  const DeviceIcon = ({ device }) => {
    if (device === 'Mobil') return <Smartphone className="w-3.5 h-3.5" />;
    if (device === 'Planshet') return <Tablet className="w-3.5 h-3.5" />;
    return <Monitor className="w-3.5 h-3.5" />;
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Sayt tashriflari</h2>
          <p className="text-sm text-muted-foreground font-body mt-0.5">
            Kim tashrif buyurdi, qayerdan keldi va qaysi bo&apos;limni ko&apos;rdi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={load} className="rounded-xl font-body gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Yangilash
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear} className="rounded-xl font-body gap-2 text-destructive hover:text-destructive">
            <Trash2 className="w-3.5 h-3.5" />
            Tozalash
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Jami tashriflar" value={stats.total} />
        <StatCard icon={Users} label="Bugun" value={stats.today} />
        <StatCard icon={Globe} label="Noyob IP" value={stats.uniqueIps} />
        <StatCard icon={MapPin} label="Eng ko'p ko'rilgan" value={stats.topPageCount || '—'} sub={stats.topPage} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3">Qurilma turlari</h3>
          <div className="space-y-2">
            {Object.entries(stats.deviceCounts).map(([name, count]) => (
              <div key={name} className="flex items-center justify-between text-sm font-body">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DeviceIcon device={name} />
                  {name}
                </span>
                <span className="font-medium text-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3">Asosiy manba</h3>
          <p className="text-lg font-heading font-bold text-primary">{stats.topReferrer}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">{stats.topReferrerCount} ta tashrif</p>
          <p className="text-[10px] text-muted-foreground/70 font-body mt-3">
            Google, ijtimoiy tarmoq yoki to&apos;g&apos;ridan-to&apos;g&apos;ri kirish
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/60 space-y-3">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-foreground">
            <Filter className="w-4 h-4 text-primary" />
            Tashriflar jadvali
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="IP, sahifa, shahar qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl font-body"
              />
            </div>
            <select
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
              className="h-10 rounded-xl border border-input bg-background px-3 text-sm font-body text-foreground"
            >
              <option value="all">Barcha sahifalar</option>
              {pages.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="h-10 rounded-xl border border-input bg-background px-3 text-sm font-body text-foreground"
            >
              <option value="all">Barcha manbalar</option>
              <option value="direct">To&apos;g&apos;ridan-to&apos;g&apos;ri</option>
              <option value="search">Qidiruv</option>
              <option value="social">Ijtimoiy tarmoq</option>
              <option value="referral">Boshqa sayt</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body min-w-[720px]">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/30 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Vaqt</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">IP</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Joylashuv</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Sahifa / Bo&apos;lim</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Manba</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Qurilma</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    Tashriflar topilmadi. Saytga kirib ko&apos;ring — yozuvlar shu yerda paydo bo&apos;ladi.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.id} className="border-b border-border/30 hover:bg-secondary/20">
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatVisitTime(v.timestamp)}</td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md text-foreground">{v.ip}</code>
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      <span className="block">{v.city}</span>
                      <span className="text-[10px] text-muted-foreground">{v.country}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">{v.page}</span>
                      {v.hash && (
                        <span className="block text-[10px] text-muted-foreground font-mono">{v.path}{v.hash}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${REFERRER_STYLES[v.referrerType] || REFERRER_STYLES.referral}`}>
                        <ExternalLink className="w-3 h-3" />
                        {v.referrer}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <DeviceIcon device={v.device} />
                        {v.device} · {v.browser}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-border/40 text-xs text-muted-foreground font-body">
            {filtered.length} ta yozuv ko&apos;rsatilmoqda (jami {visits.length})
          </div>
        )}
      </div>

      <p className="text-[10px] text-muted-foreground/60 font-body text-center">
        IP va joylashuv brauzer orqali aniqlanadi. Haqiqiy analytics uchun server-side yechim tavsiya etiladi.
      </p>
    </div>
  );
}
