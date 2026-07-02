import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisit } from '@/lib/visitTracker';

export default function VisitTracker() {
  const { pathname } = useLocation();
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/dashboard')) return;
    recordVisit({ path: pathname, hash });
  }, [pathname, hash]);

  return null;
}
