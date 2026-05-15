import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Globe } from 'lucide-react';

export default function DashSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-xl text-foreground">Sozlamalar</h2>
        <p className="text-sm text-muted-foreground font-body mt-0.5">Admin panel sozlamalari</p>
      </motion.div>

      {[
        { icon: User, title: 'Profil', desc: 'Ism va kontakt ma\'lumotlari' },
        { icon: Lock, title: 'Xavfsizlik', desc: 'Parol va ikki bosqichli tasdiqlash' },
        { icon: Bell, title: 'Bildirishnomalar', desc: 'Xabar va ogohlantirish sozlamalari' },
        { icon: Globe, title: 'Til', desc: "Interfeys tili — O'zbek / English" },
      ].map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.07 }}
          className="flex items-center gap-4 p-5 rounded-2xl border border-border/60 bg-card/90 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-heading font-semibold text-sm text-foreground">{s.title}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
