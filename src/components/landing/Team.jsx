import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Linkedin, Twitter } from 'lucide-react';

// Team member photos from Unsplash (real diverse professional headshots)
const MEMBER_PHOTOS = [
    'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836628/ismoil_xidjbj.png',
    'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/abdulaziz_rnwa2w.png',
    'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/davronbek_f3n4xy.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836642/zafar_pfg6vk.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836635/faridun_katq6l.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836638/shaxzodbek_sg17eh.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836641/ahadjon_vhdpih.png',
];

// Each member's YouTube/video URL (placeholder — replace with real links)
const MEMBER_VIDEOS = [
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
];

export default function Team() {
  const { t } = useI18n();
  const [selected, setSelected] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const openModal = (member, idx) => {
    setSelected({ ...member, idx });
    setVideoPlaying(false);
  };

  const closeModal = () => {
    setSelected(null);
    setVideoPlaying(false);
  };

  return (
    <section id="team" className="py-16 md:py-28 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.team.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.team.title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {t.team.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => openModal(member, i)}
              className="group cursor-pointer relative"
            >
              {/* Glass card */}
              <div className="relative rounded-2xl border border-white/15 dark:border-border/30 bg-white/10 dark:bg-white/5 backdrop-blur-md hover:border-primary/40 hover:bg-white/15 dark:hover:bg-white/8 transition-all duration-500 overflow-hidden shadow-sm">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={MEMBER_PHOTOS[i]}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Photo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play hint */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Play className="w-3 h-3 text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="relative p-3 sm:p-4">
                  <span className="text-xs font-mono text-primary font-semibold">{member.role}</span>
                  <h3 className="font-heading font-semibold text-foreground text-sm mt-0.5">{member.name}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1 leading-relaxed line-clamp-2">{member.desc}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-primary/70 font-body group-hover:text-primary transition-colors">
                      {t.team.detail} →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail + Video Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/20 dark:border-border/50 bg-white/95 dark:bg-card/95 backdrop-blur-2xl shadow-2xl shadow-primary/10 max-h-[92vh] flex flex-col"
            >
              {/* Drag handle — mobile only */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-black/20 dark:bg-white/20" />
              </div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              {/* Video / Photo area */}
              <div className="relative h-52 sm:h-64 bg-secondary overflow-hidden shrink-0">
                {videoPlaying ? (
                  <iframe
                    src={MEMBER_VIDEOS[selected.idx] + '?autoplay=1'}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={selected.name}
                  />
                ) : (
                  <>
                    <img
                      src={MEMBER_PHOTOS[selected.idx]}
                      alt={selected.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <button
                      onClick={() => setVideoPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center group/play"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover/play:scale-110 group-hover/play:bg-primary transition-all duration-300">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1" />
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6 space-y-3 overflow-y-auto">
                <div>
                  <span className="text-xs font-mono text-primary font-bold tracking-wider">{selected.role}</span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mt-1">{selected.name}</h3>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed text-sm">{selected.desc}</p>

                <div className="flex items-center gap-2 pt-1">
                  <button className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-primary" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Twitter className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Video ko'rish
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}