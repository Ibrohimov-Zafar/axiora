import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

router.post('/', rateLimit({ max: 5 }), (req, res) => {
  const { name, phone, company, message } = req.body || {};

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Ism, telefon va xabar majburiy' });
  }

  const result = db.prepare(`
    INSERT INTO contact_messages (name, phone, company, message)
    VALUES (?, ?, ?, ?)
  `).run(name.trim(), phone.trim(), company?.trim() || null, message.trim());

  res.status(201).json({ id: result.lastInsertRowid, success: true });
});

router.get('/', requireAuth, (req, res) => {
  const { unread } = req.query;
  let sql = 'SELECT * FROM contact_messages';
  const params = [];

  if (unread === 'true') {
    sql += ' WHERE read = 0';
  }

  sql += ' ORDER BY created_at DESC';
  const messages = db.prepare(sql).all(...params);
  res.json(messages.map(formatMessage));
});

router.patch('/:id/read', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare('UPDATE contact_messages SET read = 1 WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Xabar topilmadi' });
  }
  const message = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(id);
  res.json(formatMessage(message));
});

router.delete('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Xabar topilmadi' });
  }
  res.json({ success: true });
});

function formatMessage(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    company: row.company,
    text: row.message,
    message: row.message,
    read: Boolean(row.read),
    created_at: row.created_at,
  };
}

export default router;
