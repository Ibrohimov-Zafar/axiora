import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';
import './seed.js';

import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import projectsRoutes from './routes/projects.js';
import teamRoutes from './routes/team.js';
import visitsRoutes from './routes/visits.js';
import statsRoutes from './routes/stats.js';
import shortsRoutes from './routes/shorts.js';
import partnersRoutes from './routes/partners.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const app = express();

app.set('trust proxy', true);

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').flatMap((s) => {
      const trimmed = s.trim();
      return trimmed ? [trimmed] : [];
    })
  : null;
app.use(cors(corsOrigins ? { origin: corsOrigins } : undefined));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/messages', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/visits', visitsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/shorts', shortsRoutes);
app.use('/api/partners', partnersRoutes);

// Topilmagan API yo'llari
app.use('/api', (req, res) => {
  res.status(404).json({ error: `API topilmadi: ${req.method} ${req.originalUrl}` });
});

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath, {
  setHeaders(res, filePath) {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  },
}));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next();
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Server xatosi' });
});

app.listen(PORT, () => {
  console.log(`Axiora API http://localhost:${PORT}`);
});
