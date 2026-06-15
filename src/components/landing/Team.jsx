import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { MEMBER_PHOTOS, MEMBER_VIDEOS, getFullVideoUrl } from '@/lib/teamMedia';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Linkedin, Twitter } from 'lucide-react';

export default function Team() {
  const { t } = useI18n();
  const [selected, setSelected] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const openModal = (member, idx, playVideo = false) => {
    setSelected({ ...member, idx });
    setVideoPlaying(playVideo);
  };

  const closeModal = () => {
    setSelected(null);
    setVideoPlaying(false);
  };

  return (
    <section id="team" className="relative py-16 md:py-28">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="font-heading text-xs tracking-[0.2em] text-primary">{t.team.label}</span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">{t.team.title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {t.team.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => openModal(member, i)}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-white/15 dark:border-border/30 dark:bg-white/5 dark:hover:bg-white/8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={MEMBER_PHOTOS[i]}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                      <Play className="ml-0.5 h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </div>

                <div className="relative p-3 sm:p-4">
                  <span className="font-mono text-xs font-semibold text-primary">{member.role}</span>
                  <h3 className="mt-0.5 font-heading text-sm font-semibold text-foreground">{member.name}</h3>
                  <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-muted-foreground">{member.desc}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-body text-xs text-primary/70 transition-colors group-hover:text-primary">
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
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/20 bg-white/95 shadow-2xl shadow-primary/10 backdrop-blur-2xl dark:border-border/50 dark:bg-card/95 sm:max-w-lg sm:rounded-3xl"
            >
              <div className="flex shrink-0 justify-center pb-1 pt-3 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-black/20 dark:bg-white/20" />
              </div>

              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/10 p-2 transition-colors hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>

              <div className="relative h-52 shrink-0 overflow-hidden bg-secondary sm:h-64">
                {videoPlaying ? (
                  <video
                    key={`modal-${selected.idx}`}
                    src={getFullVideoUrl(MEMBER_VIDEOS[selected.idx])}
                    className="h-full w-full bg-black object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <>
                    <img
                      src={MEMBER_PHOTOS[selected.idx]}
                      alt={selected.name}
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <button
                      onClick={() => setVideoPlaying(true)}
                      className="group/play absolute inset-0 flex items-center justify-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/80 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-primary sm:h-16 sm:w-16">
                        <Play className="ml-1 h-6 w-6 text-white sm:h-7 sm:w-7" />
                      </div>
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-3 overflow-y-auto p-4 sm:p-6">
                <div>
                  <span className="font-mono text-xs font-bold tracking-wider text-primary">{selected.role}</span>
                  <h3 className="mt-1 font-heading text-lg font-bold text-foreground sm:text-xl">{selected.name}</h3>
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{selected.desc}</p>

                <div className="flex items-center gap-2 pt-1">
                  <button className="rounded-xl bg-primary/10 p-2.5 transition-colors hover:bg-primary/20">
                    <Linkedin className="h-4 w-4 text-primary" />
                  </button>
                  <button className="rounded-xl bg-primary/10 p-2.5 transition-colors hover:bg-primary/20">
                    <Twitter className="h-4 w-4 text-primary" />
                  </button>
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="ml-auto flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-body text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Play className="h-3 w-3" />
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
