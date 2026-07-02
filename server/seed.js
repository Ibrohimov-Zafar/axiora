import './loadEnv.js';
import bcrypt from 'bcryptjs';
import db from './db.js';

const projects = [
  { cat: 'SaaS', name: 'Bulutli SaaS Platforma', problem: "Qo'lda bajarilgan jarayonlar", solution: 'Avtomatlashtirilgan ish oqimi', result: '+220% samaradorlik', status: 'Tugallangan' },
  { cat: 'EdTech', name: "Onlayn Ta'lim Markazi", problem: 'Past faollik darajasi', solution: "O'yinlashtirilgan tajriba", result: "60K+ faol o'quvchi", status: 'Jarayonda' },
  { cat: 'E-commerce', name: 'Marketplace Tizimi', problem: "Tarqoq sotuvchilar", solution: 'Yagona platforma', result: '$2M+ aylanma', status: 'Tugallangan' },
  { cat: 'AI', name: 'AI Qaror Mexanizmi', problem: 'Sekin tahlil', solution: "Mashina o'rganishi", result: '10x tezroq insight', status: 'Tugallangan' },
  { cat: 'CRM', name: 'Korporativ CRM', problem: "Ma'lumot bo'linishi", solution: 'Yagona CRM tizim', result: '+45% mijoz ushlab qolish', status: 'Jarayonda' },
  { cat: 'ERP', name: 'ERP Yechim', problem: "Qo'lda boshqaruv", solution: 'Uchidan-uchiga avtomatlashtirish', result: '30% xarajat tejash', status: 'Rejalashtirilgan' },
];

const PHOTOS = [
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836628/ismoil_xidjbj.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/abdulaziz_rnwa2w.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/davronbek_f3n4xy.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836642/zafar_pfg6vk.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836635/faridun_katq6l.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836638/shaxzodbek_sg17eh.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836641/ahadjon_vhdpih.png',
];

const teamMembers = [
  { name: 'Ismoil Nishonov', role: 'COO', description: 'Operatsion boshqaruv va strategiya', is_lead: 1 },
  { name: 'Abdulaziz Mansurov', role: 'CPO', description: 'Mahsulot va foydalanuvchi tajribasi', is_lead: 1 },
  { name: 'Davron Uralov', role: 'CCO', description: "Kreativ yo'nalish va brending", is_lead: 0 },
  { name: 'Zafar Ibragimov', role: 'CTO', description: 'Texnik arxitektura', is_lead: 1 },
  { name: 'Faridun Bayonov', role: 'BDM', description: 'Biznes rivojlantirish', is_lead: 0 },
  { name: 'Shaxzod Nematov', role: 'HRD', description: 'Jamoa va kadrlar', is_lead: 0 },
  { name: 'Ahadjon Muxamedjonov', role: 'CMO', description: "Marketing va o'sish", is_lead: 0 },
];

function seedAdmin() {
  const username = process.env.ADMIN_USERNAME || '';
  const password = process.env.ADMIN_PASSWORD || '';
  const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get(username);
  if (existing) return;

  const passwordHash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(username, passwordHash);
  console.log(`Admin yaratildi: ${username}`);
}

function seedProjects() {
  const count = db.prepare('SELECT COUNT(*) as c FROM projects').get().c;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO projects (cat, name, problem, solution, result, status, sort_order)
    VALUES (@cat, @name, @problem, @solution, @result, @status, @sort_order)
  `);

  projects.forEach((p, i) => {
    insert.run({ ...p, sort_order: i });
  });
  console.log(`${projects.length} ta loyiha seed qilindi`);
}

function seedTeam() {
  const count = db.prepare('SELECT COUNT(*) as c FROM team_members').get().c;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO team_members (name, role, description, photo_url, is_lead, sort_order)
    VALUES (@name, @role, @description, @photo_url, @is_lead, @sort_order)
  `);

  teamMembers.forEach((m, i) => {
    insert.run({
      ...m,
      photo_url: PHOTOS[i] || null,
      sort_order: i,
    });
  });
  console.log(`${teamMembers.length} ta jamoa a'zosi seed qilindi`);
}

const SHORTS_VIDEOS = [
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385694/Ismoil_l77uzq.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781548211/IMG_9499_hkieor.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385710/2_tzezem.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385660/zafar_wcybb8.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385723/IMG_9470_1_arpoee.mov',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385684/IMG_9416_glelrs.mov',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385700/Ahadjon_1_xjp8sz.mp4',
];

const shortsSeed = [
  { name: 'Ismoil Nishonov', role: 'COO' },
  { name: 'Abdulaziz Mansurov', role: 'CPO' },
  { name: 'Davron Uralov', role: 'CCO' },
  { name: 'Zafar Ibragimov', role: 'CTO' },
  { name: 'Faridun Bayonov', role: 'BDM' },
  { name: 'Shaxzod Nematov', role: 'HRD' },
  { name: 'Ahadjon Muxamedjonov', role: 'CMO' },
];

function seedShorts() {
  const count = db.prepare('SELECT COUNT(*) as c FROM video_shorts').get().c;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO video_shorts (name, role, video_url, poster_url, sort_order)
    VALUES (@name, @role, @video_url, @poster_url, @sort_order)
  `);

  shortsSeed.forEach((s, i) => {
    insert.run({
      ...s,
      video_url: SHORTS_VIDEOS[i] || SHORTS_VIDEOS[0],
      poster_url: PHOTOS[i] || null,
      sort_order: i,
    });
  });
  console.log(`${shortsSeed.length} ta video short seed qilindi`);
}

seedAdmin();
seedProjects();
seedTeam();
seedShorts();
console.log('Seed tugallandi');
