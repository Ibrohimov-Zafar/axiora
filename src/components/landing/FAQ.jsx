import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const { t } = useI18n();

  return (
    <section id="faq" className="py-28 relative">
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.faq.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.faq.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/60 rounded-xl bg-card/90 shadow-sm px-6 data-[state=open]:border-primary/60 data-[state=open]:shadow-md transition-colors"
              >
                <AccordionTrigger className="font-heading font-semibold text-foreground text-left hover:no-underline py-5 text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}