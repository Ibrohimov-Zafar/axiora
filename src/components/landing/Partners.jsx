import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

const partners = ['UUEA', 'ROYAL LLC', 'One-Stop'];

export default function Partners() {
  const { t } = useI18n();

  return (
    <section className="py-20 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.2em] text-muted-foreground font-heading text-center mb-12"
        >
          {t.partners.title}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-8 py-4 rounded-xl border border-border/20 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
            >
              <span className="font-heading font-semibold text-lg md:text-xl text-muted-foreground/70 tracking-wide">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}