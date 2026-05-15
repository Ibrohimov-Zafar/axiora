import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisit } from '@/lib/visitTracker';

export default function VisitTracker() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    recordVisit({ path: pathname, hash: hash || window.location.hash });
  }, [pathname, hash]);

  return null;
}
