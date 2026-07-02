import { api } from '@/api/client';

const SECTION_LABELS = {
  '#hero': 'Bosh sahifa (Hero)',
  '#about': 'Biz haqimizda',
  '#portfolio': 'Portfolio',
  '#process': 'Jarayon',
  '#team': 'Jamoa',
  '#faq': 'FAQ',
  '#contact': 'Aloqa',
  '#location': 'Manzil',
  '#results': 'Natijalar',
  '#metrics': 'Ko\'rsatkichlar',
  '#testimonials': 'Fikrlar',
};

export function getPageLabel(path, hash = '') {
  if (path === '/login') return 'Kirish sahifasi';
  if (path !== '/') return path;
  if (hash && SECTION_LABELS[hash]) return SECTION_LABELS[hash];
  if (hash) return hash;
  return 'Bosh sahifa';
}

export function parseReferrer(referrer) {
  if (!referrer) return { label: "To'g'ridan-to'g'ri", type: 'direct' };
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, '');
    if (host.includes('google')) return { label: 'Google qidiruv', type: 'search' };
    if (host.includes('yandex')) return { label: 'Yandex', type: 'search' };
    if (host.includes('facebook') || host.includes('fb.')) return { label: 'Facebook', type: 'social' };
    if (host.includes('instagram')) return { label: 'Instagram', type: 'social' };
    if (host.includes('telegram') || host.includes('t.me')) return { label: 'Telegram', type: 'social' };
    if (host.includes('linkedin')) return { label: 'LinkedIn', type: 'social' };
    if (host.includes('twitter') || host === 'x.com') return { label: 'X (Twitter)', type: 'social' };
    return { label: host, type: 'referral' };
  } catch {
    return { label: referrer.slice(0, 48), type: 'referral' };
  }
}

function parseDevice(ua) {
  const s = ua || '';
  if (/mobile|android|iphone|ipad/i.test(s)) return 'Mobil';
  if (/tablet|ipad/i.test(s)) return 'Planshet';
  return 'Kompyuter';
}

function parseBrowser(ua) {
  const s = ua || '';
  if (s.includes('Edg/')) return 'Edge';
  if (s.includes('Chrome/') && !s.includes('Edg/')) return 'Chrome';
  if (s.includes('Firefox/')) return 'Firefox';
  if (s.includes('Safari/') && !s.includes('Chrome/')) return 'Safari';
  if (s.includes('Opera') || s.includes('OPR/')) return 'Opera';
  return 'Boshqa';
}

async function fetchGeo() {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('geo fail');
    const data = await res.json();
    return {
      ip: data.ip || "Noma'lum",
      country: data.country_name || "Noma'lum",
      city: data.city || "Noma'lum",
    };
  } catch {
    try {
      const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('ip fail');
      const { ip } = await res.json();
      return { ip: ip || "Noma'lum", country: "Noma'lum", city: "Noma'lum" };
    } catch {
      return { ip: "Noma'lum", country: "Noma'lum", city: "Noma'lum" };
    }
  }
}

let cachedGeo = null;
let lastVisitKey = '';
let lastVisitTime = 0;

export async function recordVisit({ path, hash = '' }) {
  if (typeof window === 'undefined') return;
  if (path.startsWith('/dashboard')) return;

  const ua = navigator.userAgent;
  const ref = parseReferrer(document.referrer);
  const page = getPageLabel(path, hash);

  if (!cachedGeo) {
    cachedGeo = await fetchGeo();
  }

  const dupKey = `${cachedGeo.ip}|${path}|${hash}|${ref.label}`;
  const sameMinute = Date.now() - lastVisitTime < 60_000;
  if (dupKey === lastVisitKey && sameMinute) return;

  lastVisitKey = dupKey;
  lastVisitTime = Date.now();

  try {
    await api.recordVisit({
      page,
      path,
      hash: hash || '',
      referrer: ref.label,
      referrer_type: ref.type,
      device: parseDevice(ua),
      browser: parseBrowser(ua),
      ua,
      ip: cachedGeo.ip,
      country: cachedGeo.country,
      city: cachedGeo.city,
    });
  } catch {
    // Tashrif yozuvi muvaffaqiyatsiz bo'lsa, foydalanuvchiga ko'rsatilmaydi
  }
}

export function formatVisitTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 60_000) return 'Hozirgina';
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)} daqiqa oldin`;
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)} soat oldin`;
  return d.toLocaleString('uz-UZ', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function getVisitStats(visits) {
  const today = new Date().toDateString();
  const todayVisits = visits.filter((v) => new Date(v.timestamp || v.created_at).toDateString() === today);
  const uniqueIps = new Set(visits.map((v) => v.ip)).size;

  const pageCounts = {};
  const refCounts = {};
  visits.forEach((v) => {
    pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    refCounts[v.referrer] = (refCounts[v.referrer] || 0) + 1;
  });

  const topPage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0];
  const topRef = Object.entries(refCounts).sort((a, b) => b[1] - a[1])[0];

  const deviceCounts = { Mobil: 0, Kompyuter: 0, Planshet: 0 };
  visits.forEach((v) => {
    if (deviceCounts[v.device] !== undefined) deviceCounts[v.device]++;
  });

  return {
    total: visits.length,
    today: todayVisits.length,
    uniqueIps,
    topPage: topPage ? topPage[0] : '—',
    topPageCount: topPage ? topPage[1] : 0,
    topReferrer: topRef ? topRef[0] : '—',
    topReferrerCount: topRef ? topRef[1] : 0,
    deviceCounts,
  };
}
