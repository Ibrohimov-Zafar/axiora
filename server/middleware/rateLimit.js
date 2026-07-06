import { getClientIp } from '../lib/clientIp.js';

const buckets = new Map();

export function rateLimit({ windowMs = 60_000, max = 5 } = {}) {
  return (req, res, next) => {
    const key = getClientIp(req);
    const now = Date.now();
    let bucket = buckets.get(key);

    if (!bucket || now - bucket.start > windowMs) {
      bucket = { start: now, count: 0 };
      buckets.set(key, bucket);
    }

    bucket.count += 1;
    if (bucket.count > max) {
      return res.status(429).json({ error: "Juda ko'p so'rov. Biroz kuting." });
    }

    next();
  };
}
