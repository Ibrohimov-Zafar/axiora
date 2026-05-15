import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { ArrowUpRight, Rocket, Globe, Layers, BarChart3 } from 'lucide-react';

const icons = [Rocket, Globe, Layers, BarChart3];

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-16 md:py-28 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.about.label}</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground leading-tight">
              {t.about.title}
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              {t.about.desc}
            </p>
            <div className="pt-4">
              <p className="font-heading font-semibold text-xl text-foreground italic border-l-2 border-primary pl-6">
                "{t.about.slogan}"
              </p>
            </div>
          </motion.div>

          {/* Right - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.about.cards.map((card, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}