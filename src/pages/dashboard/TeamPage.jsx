import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const PHOTOS = [
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836628/ismoil_xidjbj.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/abdulaziz_rnwa2w.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/davronbek_f3n4xy.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836642/zafar_pfg6vk.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836635/faridun_katq6l.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836638/shaxzodbek_sg17eh.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836641/ahadjon_vhdpih.png',
];

const members = [
  { name: 'Ismoil Nishonov', role: 'COO', desc: 'Operatsion boshqaruv va strategiya', lead: true },
  { name: 'Abdulaziz Mansurov', role: 'CPO', desc: 'Mahsulot va foydalanuvchi tajribasi', lead: true },
  { name: 'Davron Uralov', role: 'CCO', desc: 'Kreativ yo\'nalish va brending', lead: false },
  { name: 'Zafar Ibragimov', role: 'CTO', desc: 'Texnik arxitektura', lead: true },
  { name: 'Faridun Bayenov', role: 'BDM', desc: 'Biznes rivojlantirish', lead: false },
  { name: 'Shaxzod Negmatov', role: 'HRD', desc: 'Jamoa va kadrlar', lead: false },
  { name: 'Ahadjon Muxamedjonov', role: 'CMO', desc: 'Marketing va o\'sish', lead: false },
];

const roleColor = {
  COO: 'bg-purple-500/10 text-purple-500',
  CPO: 'bg-blue-500/10 text-blue-500',
  CCO: 'bg-pink-500/10 text-pink-500',
  CTO: 'bg-green-500/10 text-green-500',
  BDM: 'bg-orange-500/10 text-orange-500',
  HRD: 'bg-yellow-500/10 text-yellow-500',
  CMO: 'bg-accent/10 text-accent',
};

export default function TeamPage() {
  const leads = members.filter((m) => m.lead);
  const others = members.filter((m) => !m.lead);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-xl text-foreground">Jamoa</h2>
        <p className="text-sm text-muted-foreground font-body mt-0.5">{members.length} ta a'zo</p>
      </motion.div>

      {/* Team leads */}
      <div>
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Team Leads</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.map((m, i) => {
            const idx = members.indexOf(m);
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border/60 bg-card/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                <div className="h-100 overflow-hidden bg-secondary/30 relative">
                  <img src={PHOTOS[idx]} alt={m.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 right-3 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full ${roleColor[m.role] ?? 'bg-primary/10 text-primary'}`}>
                    {m.role}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-semibold text-foreground text-sm">{m.name}</h4>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{m.desc}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="p-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                      <Linkedin className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                      <Twitter className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Others */}
      <div>
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Qolgan a'zolar</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((m, i) => {
            const idx = members.indexOf(m);
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="rounded-2xl border border-border/60 bg-card/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                <div className="h-56 overflow-hidden bg-secondary/30 relative">
                  <img src={PHOTOS[idx]} alt={m.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-3">
                  <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full ${roleColor[m.role] ?? 'bg-primary/10 text-primary'}`}>{m.role}</span>
                  <h4 className="font-heading font-semibold text-foreground text-xs mt-1.5 leading-snug">{m.name}</h4>
                  <p className="text-[11px] text-muted-foreground font-body mt-0.5 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
