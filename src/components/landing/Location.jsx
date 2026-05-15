import React from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Navigation, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

/** @type {[number, number]} */
const TASHKENT = [41.2995, 69.2401];

const pinIcon = new L.DivIcon({
  className: '',
  html: `
    <div style="position:relative;width:40px;height:40px">
      <div style="
        position:absolute;inset:0;
        background:rgba(139,53,255,0.25);
        border-radius:50%;
        animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;
      "></div>
      <div style="
        position:relative;
        width:40px;height:40px;
        background:rgb(139,53,255);
        border:3px solid white;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 4px 20px rgba(139,53,255,0.5);
        display:flex;align-items:center;justify-content:center;
      ">
        <svg style="transform:rotate(45deg);color:white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -44],
});

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
            <MapContainer
              center={TASHKENT}
              zoom={14}
              style={{ height: '420px', width: '100%' }}
              scrollWheelZoom={false}
              zoomControl={true}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <Marker position={TASHKENT} icon={pinIcon}>
                <Popup>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', minWidth: '140px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Axiora</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{t.location.desc}</div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>

            {/* Info card overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[300px] z-[1000]">
              <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-background/85">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Navigation className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-foreground">{t.location.office}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{t.location.desc}</p>
                  <a
                    href={`https://maps.google.com/?q=${TASHKENT[0]},${TASHKENT[1]}`}
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
