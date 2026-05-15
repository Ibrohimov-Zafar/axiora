const STORAGE_KEY = 'axiora_visits';
const MAX_VISITS = 500;

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

export function getVisits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveVisits(visits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visits.slice(0, MAX_VISITS)));
}

export function clearVisits() {
  localStorage.removeItem(STORAGE_KEY);
}

export function seedDemoVisits() {
  if (getVisits().length > 0) return;
  const now = Date.now();
  const demo = [
    { ip: '185.139.22.41', page: "Bosh sahifa (Hero)", path: '/', hash: '#hero', referrer: "To'g'ridan-to'g'ri", referrerType: 'direct', device: 'Mobil', browser: 'Chrome', country: "O'zbekiston", city: 'Toshkent', ua: 'demo' },
    { ip: '91.196.88.12', page: 'Portfolio', path: '/', hash: '#portfolio', referrer: 'Google qidiruv', referrerType: 'search', device: 'Kompyuter', browser: 'Chrome', country: "O'zbekiston", city: 'Samarqand', ua: 'demo' },
    { ip: '178.128.44.90', page: 'Aloqa', path: '/', hash: '#contact', referrer: 'Instagram', referrerType: 'social', device: 'Mobil', browser: 'Safari', country: 'Rossiya', city: 'Moskva', ua: 'demo' },
    { ip: '185.139.22.41', page: 'Jamoa', path: '/', hash: '#team', referrer: "To'g'ridan-to'g'ri", referrerType: 'direct', device: 'Mobil', browser: 'Chrome', country: "O'zbekiston", city: 'Toshkent', ua: 'demo' },
    { ip: '203.0.113.8', page: 'Kirish sahifasi', path: '/login', hash: '', referrer: 'Telegram', referrerType: 'social', device: 'Mobil', browser: 'Chrome', country: 'Qozog\'iston', city: 'Olmaota', ua: 'demo' },
    { ip: '198.51.100.22', page: 'Biz haqimizda', path: '/', hash: '#about', referrer: 'LinkedIn', referrerType: 'social', device: 'Kompyuter', browser: 'Firefox', country: 'AQSH', city: 'New York', ua: 'demo' },
  ];
  const visits = demo.map((row, i) => ({
    id: `demo-${i}`,
    ...row,
    timestamp: new Date(now - i * 47 * 60 * 1000).toISOString(),
  }));
  saveVisits(visits);
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

export async function recordVisit({ path, hash = '' }) {
  if (typeof window === 'undefined') return;
  if (path.startsWith('/dashboard')) return;

  const ua = navigator.userAgent;
  const ref = parseReferrer(document.referrer);
  const page = getPageLabel(path, hash);

  if (!cachedGeo) {
    cachedGeo = await fetchGeo();
  }

  const visit = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ip: cachedGeo.ip,
    country: cachedGeo.country,
    city: cachedGeo.city,
    page,
    path,
    hash: hash || '',
    referrer: ref.label,
    referrerType: ref.type,
    device: parseDevice(ua),
    browser: parseBrowser(ua),
    ua,
    timestamp: new Date().toISOString(),
  };

  const visits = getVisits();
  const dupKey = `${visit.ip}|${visit.path}|${visit.hash}|${visit.referrer}`;
  const last = visits[0];
  if (last) {
    const lastKey = `${last.ip}|${last.path}|${last.hash}|${last.referrer}`;
    const sameMinute = Date.now() - new Date(last.timestamp).getTime() < 60_000;
    if (dupKey === lastKey && sameMinute) return;
  }

  saveVisits([visit, ...visits]);
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
  const todayVisits = visits.filter((v) => new Date(v.timestamp).toDateString() === today);
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
