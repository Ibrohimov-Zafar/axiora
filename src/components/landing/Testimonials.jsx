import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.testimonials.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.testimonials.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.testimonials.reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/90 shadow-sm h-full">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground font-body leading-relaxed text-base mb-6 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-heading font-semibold text-sm text-primary">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="font-heading font-semibold text-sm text-foreground block">{review.name}</span>
                    <span className="text-xs text-muted-foreground font-body">{review.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}