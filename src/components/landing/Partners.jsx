import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { api } from '@/api/client';
import { getOptimizedImageUrl } from '@/lib/teamMedia';
import { motion } from 'framer-motion';

export default function Partners() {
  const { t } = useI18n();

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.getPartners(),
    staleTime: 60_000,
  });

  if (partners.length === 0) return null;

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
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, i) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-8 py-5 rounded-xl border border-border/20 bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 min-w-[140px] min-h-[88px] flex items-center justify-center"
              >
                {partner.logo_url ? (
                  <img
                    src={getOptimizedImageUrl(partner.logo_url, 320)}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="font-heading font-semibold text-lg md:text-xl text-muted-foreground/70 tracking-wide text-center">
                    {partner.name}
                  </span>
                )}
              </motion.div>
            );

            if (partner.website_url) {
              return (
                <a
                  key={partner.id}
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                >
                  {content}
                </a>
              );
            }

            return <div key={partner.id}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
