import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="py-16 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.process.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.process.title}</h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical pulse line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <ol className="space-y-8 md:space-y-12">
            {t.process.steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-4 md:gap-8 group"
              >
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-2xl border border-border/30 bg-card flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-all duration-500">
                  <span className="font-mono font-bold text-2xl md:text-4xl text-muted-foreground/30 group-hover:text-primary transition-colors duration-500">
                    {step.num}
                  </span>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-4">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-body mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}