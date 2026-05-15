import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Metrics() {
  const { t } = useI18n();

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] via-transparent to-primary/[0.04]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.metrics.label}</span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {t.metrics.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="relative inline-block">
                <span className="font-mono font-bold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-foreground to-muted-foreground/50 bg-clip-text text-transparent">
                  {item.value}
                </span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-body">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}