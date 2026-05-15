import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

export default function Portfolio() {
  const { t } = useI18n();

  return (
    <section id="portfolio" className="py-16 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.portfolio.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.portfolio.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.portfolio.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-2xl border border-border/60 bg-card/90 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-500 h-full flex flex-col">
                {/* Category badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] tracking-[0.15em] text-primary font-heading bg-primary/10 px-3 py-1 rounded-full">
                    {project.cat}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-5">{project.name}</h3>

                <div className="space-y-3 mt-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.1em] text-muted-foreground/60 font-heading block">{t.portfolio.problem}</span>
                      <span className="text-sm text-muted-foreground font-body">{project.problem}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lightbulb className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.1em] text-muted-foreground/60 font-heading block">{t.portfolio.solution}</span>
                      <span className="text-sm text-muted-foreground font-body">{project.solution}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.1em] text-muted-foreground/60 font-heading block">{t.portfolio.result}</span>
                      <span className="text-sm font-mono font-semibold text-primary">{project.result}</span>
                    </div>
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