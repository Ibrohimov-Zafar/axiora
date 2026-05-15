import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const messages = [
  { name: 'Alisher T.', text: "Loyiha haqida ma'lumot olmoqchi edim, imkoniyat bormi?", time: '5 daqiqa oldin', read: false },
  { name: 'Nodira K.', text: "Hamkorlik bo'yicha taklifim bor, gaplashsak bo'ladimi?", time: '1 soat oldin', read: false },
  { name: 'Bobur A.', text: "Narxlar ro'yxatini jo'nata olasizmi?", time: '3 soat oldin', read: false },
  { name: 'Sarvar M.', text: 'Loyihamizga katta rahmat, natija juda yaxshi!', time: 'Kecha', read: true },
  { name: 'Dilnoza R.', text: 'Keyingi bosqich qachon boshlanadi?', time: 'Kecha', read: true },
  { name: 'Javlon U.', text: 'Texnik qo\'llab-quvvatlash kerak edi.', time: '2 kun oldin', read: true },
];

export default function Messages() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-xl text-foreground">Xabarlar</h2>
        <p className="text-sm text-muted-foreground font-body mt-0.5">3 ta o'qilmagan xabar</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border/60 bg-card/90 shadow-sm overflow-hidden">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 px-5 py-4 border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer ${!msg.read ? 'bg-primary/[0.03]' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-heading font-semibold text-sm text-primary">{msg.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading font-semibold text-sm text-foreground">{msg.name}</span>
                <span className="text-[10px] text-muted-foreground/60 font-body shrink-0">{msg.time}</span>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">{msg.text}</p>
            </div>
            {!msg.read && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
