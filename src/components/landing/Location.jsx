import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Navigation, MapPin } from 'lucide-react';

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1252.0471508044245!2d69.24513586314492!3d41.31293851881912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b001cfd79fb%3A0xceadf5e5248f97ce!2sSQB%20Tower%20-%20Sanoat%20Qurilish%20Bank!5e0!3m2!1sen!2s!4v1782843891195!5m2!1sen!2s';

const MAPS_LINK =
  'https://www.google.com/maps/place/SQB+Tower+-+Sanoat+Qurilish+Bank/@41.3129385,69.2451359,17z';

export default function Location() {
  const { t } = useI18n();

  return (
    <section id="location" className="relative overflow-hidden py-16 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.location.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.location.title}</h2>
          <p className="text-muted-foreground font-body mt-4 max-w-lg mx-auto">{t.location.desc}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-border/30 shadow-2xl shadow-primary/10 dark:shadow-primary/5">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Axiora location — SQB Tower"
              className="block w-full"
            />

            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[300px] z-10">
              <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-background/85">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Navigation className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-foreground">{t.location.office}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{t.location.desc}</p>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <MapPin className="h-3 w-3" />
                    Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
