import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisit } from '@/lib/visitTracker';

function scheduleVisit(payload) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile && typeof requestIdleCallback === 'function') {
    const id = requestIdleCallback(() => recordVisit(payload), { timeout: 5000 });
    return () => cancelIdleCallback(id);
  }

  if (isMobile) {
    const id = setTimeout(() => recordVisit(payload), 2000);
    return () => clearTimeout(id);
  }

  recordVisit(payload);
  return undefined;
}

export default function VisitTracker() {
  const { pathname } = useLocation();
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/dashboard')) return undefined;
    return scheduleVisit({ path: pathname, hash });
  }, [pathname, hash]);

  return null;
}
