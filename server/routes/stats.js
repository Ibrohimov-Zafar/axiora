import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/overview', requireAuth, (_req, res) => {
  const projectCount = db.prepare('SELECT COUNT(*) as c FROM projects').get().c;
  const teamCount = db.prepare('SELECT COUNT(*) as c FROM team_members').get().c;
  const unreadMessages = db.prepare('SELECT COUNT(*) as c FROM contact_messages WHERE read = 0').get().c;
  const totalMessages = db.prepare('SELECT COUNT(*) as c FROM contact_messages').get().c;
  const totalVisits = db.prepare('SELECT COUNT(*) as c FROM visits').get().c;

  const today = new Date().toISOString().slice(0, 10);
  const todayVisits = db.prepare(`
    SELECT COUNT(*) as c FROM visits WHERE date(created_at) = date(?)
  `).get(today).c;

  const recentProjects = db.prepare(`
    SELECT cat, name, result, status FROM projects
    ORDER BY updated_at DESC LIMIT 3
  `).all();

  const monthlyData = db.prepare(`
    SELECT
      strftime('%m', created_at) as month_num,
      COUNT(*) as count
    FROM projects
    WHERE created_at >= date('now', '-7 months')
    GROUP BY strftime('%Y-%m', created_at)
    ORDER BY month_num ASC
  `).all();

  const monthNames = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
  const chartData = monthlyData.length > 0
    ? monthlyData.map((row) => ({
      month: monthNames[Number(row.month_num) - 1] || row.month_num,
      loyihalar: row.count,
      mijozlar: Math.max(1, Math.floor(row.count * 0.8)),
    }))
    : [
      { month: 'Yan', loyihalar: 3, mijozlar: 2 },
      { month: 'Fev', loyihalar: 5, mijozlar: 4 },
      { month: 'Mar', loyihalar: 4, mijozlar: 5 },
      { month: 'Apr', loyihalar: 8, mijozlar: 6 },
      { month: 'May', loyihalar: 7, mijozlar: 8 },
      { month: 'Iyn', loyihalar: 10, mijozlar: 9 },
      { month: 'Iyl', loyihalar: 12, mijozlar: 11 },
    ];

  res.json({
    stats: {
      projects: projectCount,
      team: teamCount,
      unreadMessages,
      totalMessages,
      visits: totalVisits,
      todayVisits,
    },
    recentProjects,
    chartData,
  });
});

export default router;
