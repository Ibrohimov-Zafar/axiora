import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Login va parol kerak' });
  }

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: "Login yoki parol noto'g'ri" });
  }

  const token = signToken({ id: admin.id, username: admin.username });
  res.json({ token, username: admin.username });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.admin.id, username: req.admin.username });
});

export default router;
