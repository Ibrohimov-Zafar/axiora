import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, (_req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY sort_order ASC, id ASC').all();
  res.json(projects.map(formatProject));
});

router.post('/', requireAuth, (req, res) => {
  const { cat, name, problem, solution, result, status, sort_order } = req.body || {};
  if (!cat || !name || !problem || !solution || !result || !status) {
    return res.status(400).json({ error: 'Barcha majburiy maydonlarni to\'ldiring' });
  }

  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) as m FROM projects').get().m;
  const order = sort_order ?? maxOrder + 1;

  const insert = db.prepare(`
    INSERT INTO projects (cat, name, problem, solution, result, status, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(cat, name, problem, solution, result, status, order);

  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(insert.lastInsertRowid);
  res.status(201).json(formatProject(project));
});

router.patch('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Loyiha topilmadi' });
  }

  const fields = ['cat', 'name', 'problem', 'solution', 'result', 'status', 'sort_order'];
  const updates = [];
  const values = [];

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'Yangilash uchun maydon yo\'q' });
  }

  updates.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  res.json(formatProject(project));
});

router.delete('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Loyiha topilmadi' });
  }
  res.json({ success: true });
});

function formatProject(row) {
  return {
    id: row.id,
    cat: row.cat,
    name: row.name,
    problem: row.problem,
    solution: row.solution,
    result: row.result,
    status: row.status,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export default router;
