import { Router } from 'express';
import db from '../db.js';
import { requireAuth, verifyToken } from '../middleware/auth.js';

const router = Router();

function formatPartner(row) {
  return {
    id: row.id,
    name: row.name,
    logo_url: row.logo_url,
    website_url: row.website_url,
    is_active: Boolean(row.is_active),
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

router.get('/', (req, res, next) => {
  try {
    let showAll = false;
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      try {
        verifyToken(header.slice(7));
        showAll = true;
      } catch {
        // noto'g'ri token — faqat faol hamkorlar
      }
    }

    let sql = 'SELECT * FROM partners';
    if (!showAll) {
      sql += ' WHERE is_active = 1';
    }
    sql += ' ORDER BY sort_order ASC, id ASC';
    const rows = db.prepare(sql).all();
    res.json(rows.map(formatPartner));
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, (req, res) => {
  const { name, logo_url, website_url, is_active, sort_order } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'Hamkor nomi majburiy' });
  }

  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) as m FROM partners').get().m;
  const order = sort_order ?? maxOrder + 1;

  const insert = db.prepare(`
    INSERT INTO partners (name, logo_url, website_url, is_active, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    name,
    logo_url || null,
    website_url || null,
    is_active === false ? 0 : 1,
    order,
  );

  const row = db.prepare('SELECT * FROM partners WHERE id = ?').get(insert.lastInsertRowid);
  res.status(201).json(formatPartner(row));
});

router.patch('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM partners WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Hamkor topilmadi' });
  }

  const fields = ['name', 'logo_url', 'website_url', 'sort_order'];
  const updates = [];
  const values = [];

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field] || null);
    }
  }

  if (req.body.is_active !== undefined) {
    updates.push('is_active = ?');
    values.push(req.body.is_active ? 1 : 0);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'Yangilash uchun maydon yo\'q' });
  }

  updates.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE partners SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  const row = db.prepare('SELECT * FROM partners WHERE id = ?').get(id);
  res.json(formatPartner(row));
});

router.delete('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM partners WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Hamkor topilmadi' });
  }
  res.json({ success: true });
});

export default router;
