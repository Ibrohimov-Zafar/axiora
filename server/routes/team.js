import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  const members = db.prepare('SELECT * FROM team_members ORDER BY sort_order ASC, id ASC').all();
  res.json(members.map(formatMember));
});

router.post('/', requireAuth, (req, res) => {
  const { name, role, description, photo_url, is_lead, linkedin, twitter, email, sort_order } = req.body || {};
  if (!name || !role || !description) {
    return res.status(400).json({ error: 'Ism, rol va tavsif majburiy' });
  }

  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) as m FROM team_members').get().m;
  const order = sort_order ?? maxOrder + 1;

  const insert = db.prepare(`
    INSERT INTO team_members (name, role, description, photo_url, is_lead, linkedin, twitter, email, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name,
    role,
    description,
    photo_url || null,
    is_lead ? 1 : 0,
    linkedin || null,
    twitter || null,
    email || null,
    order,
  );

  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(insert.lastInsertRowid);
  res.status(201).json(formatMember(member));
});

router.patch('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: "A'zo topilmadi" });
  }

  const fields = ['name', 'role', 'description', 'photo_url', 'linkedin', 'twitter', 'email', 'sort_order'];
  const updates = [];
  const values = [];

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (req.body.is_lead !== undefined) {
    updates.push('is_lead = ?');
    values.push(req.body.is_lead ? 1 : 0);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'Yangilash uchun maydon yo\'q' });
  }

  values.push(id);
  db.prepare(`UPDATE team_members SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id);
  res.json(formatMember(member));
});

router.delete('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM team_members WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "A'zo topilmadi" });
  }
  res.json({ success: true });
});

function formatMember(row) {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    desc: row.description,
    description: row.description,
    photo_url: row.photo_url,
    lead: Boolean(row.is_lead),
    is_lead: Boolean(row.is_lead),
    linkedin: row.linkedin,
    twitter: row.twitter,
    email: row.email,
    sort_order: row.sort_order,
    created_at: row.created_at,
  };
}

export default router;
