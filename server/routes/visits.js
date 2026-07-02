import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "Noma'lum";
}

router.post('/', rateLimit({ max: 30 }), (req, res) => {
  const {
    page, path, hash, referrer, referrer_type,
    device, browser, ua, country, city, ip,
  } = req.body || {};

  if (!page || !path) {
    return res.status(400).json({ error: 'page va path majburiy' });
  }

  const clientIp = ip || getClientIp(req);

  const insert = db.prepare(`
    INSERT INTO visits (ip, country, city, page, path, hash, referrer, referrer_type, device, browser, ua)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    clientIp,
    country || "Noma'lum",
    city || "Noma'lum",
    page,
    path,
    hash || '',
    referrer || "To'g'ridan-to'g'ri",
    referrer_type || 'direct',
    device || 'Kompyuter',
    browser || 'Boshqa',
    ua || '',
  );

  res.status(201).json({ id: insert.lastInsertRowid });
});

router.get('/', requireAuth, (req, res) => {
  const { search, page: pageFilter, source } = req.query;
  let sql = 'SELECT * FROM visits WHERE 1=1';
  const params = [];

  if (pageFilter && pageFilter !== 'all') {
    sql += ' AND page = ?';
    params.push(pageFilter);
  }

  if (source && source !== 'all') {
    sql += ' AND referrer_type = ?';
    params.push(source);
  }

  if (search?.trim()) {
    const q = `%${search.trim()}%`;
    sql += ` AND (
      ip LIKE ? OR page LIKE ? OR referrer LIKE ? OR
      city LIKE ? OR country LIKE ? OR device LIKE ? OR browser LIKE ?
    )`;
    params.push(q, q, q, q, q, q, q);
  }

  sql += ' ORDER BY created_at DESC LIMIT 500';
  const visits = db.prepare(sql).all(...params);
  res.json(visits.map(formatVisit));
});

router.delete('/', requireAuth, (_req, res) => {
  db.prepare('DELETE FROM visits').run();
  res.json({ success: true });
});

function formatVisit(row) {
  return {
    id: row.id,
    ip: row.ip,
    country: row.country,
    city: row.city,
    page: row.page,
    path: row.path,
    hash: row.hash,
    referrer: row.referrer,
    referrerType: row.referrer_type,
    referrer_type: row.referrer_type,
    device: row.device,
    browser: row.browser,
    ua: row.ua,
    timestamp: row.created_at,
    created_at: row.created_at,
  };
}

export default router;
