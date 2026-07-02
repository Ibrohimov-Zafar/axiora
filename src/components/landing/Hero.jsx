import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useIsDark } from '@/hooks/use-is-dark';
import { useIsMobile } from '@/hooks/use-mobile';
import { ModalPortal } from '@/components/ui/modal-portal';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FlowFieldBackground from '@/components/ui/flow-field-background';
import { getOptimizedImageUrl, getFullVideoUrl } from '@/lib/teamMedia';

const HERO_VIDEO_URL =
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781431444/ahad_cnlu0q.mp4';
const HERO_VIDEO_POSTER_URL =
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1781547631/ChatGPT_Image_Jun_15_2026_11_18_39_PM_znve50.png';

export default function Hero() {
  const { t } = useI18n();
  const isDark = useIsDark();
  const isMobile = useIsMobile();
  const [videoOpen, setVideoOpen] = useState(false);
  const [canvasActive, setCanvasActive] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const posterWidth = isMobile ? 480 : 800;
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-surface relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 min-h-[100dvh]">
        {!isDark && (
          <FlowFieldBackground
            color="#8b35ff"
            trailColor="250, 250, 250"
            trailOpacity={0.045}
            particleCount={820}
            speed={0.72}
            active={canvasActive}
            className="opacity-65"
          />
        )}
        {isDark && (
          <FlowFieldBackground
            color="#a855f7"
            trailColor="0, 0, 0"
            trailOpacity={0.08}
            particleCount={640}
            speed={0.8}
            active={canvasActive}
            className="opacity-75"
          />
        )}
        {!isDark && <div className="hero-light-ribbons absolute inset-0" />}
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/35 to-background/90 dark:from-background/10 dark:via-background/30 dark:to-background" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 sm:py-20 lg:py-24 flex flex-col items-center text-center gap-5 sm:gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-5 py-2.5 shadow-[0_16px_40px_rgba(124,58,237,0.10)] mobile-blur-md dark:border-primary/25 dark:bg-primary/5 dark:shadow-none"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-primary font-medium">{t.hero.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="font-heading font-bold tracking-tight">
            <span className="block text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05]">
              {t.hero.title1}
            </span>
            <span className="block text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-[1.05] mt-2">
              {t.hero.title2}
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl px-2 sm:px-0"
        >
          {t.hero.desc}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm sm:text-base px-6 py-4 sm:px-9 sm:py-6 rounded-full shadow-xl shadow-primary/30 group transition-all duration-300">
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#about">
            <Button
              variant="outline"
              className="border-black/10 bg-white/75 text-foreground font-body text-sm sm:text-base px-6 py-4 sm:px-9 sm:py-6 rounded-full shadow-lg shadow-black/5 mobile-blur-md hover:border-primary/40 hover:bg-primary/5 dark:border-border/40 dark:bg-white/5 dark:shadow-none transition-all duration-300"
            >
              {t.hero.cta2}
            </Button>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-2xl"
        >
          {[
            { value: '25+', label: t.results?.stats?.[0]?.label || 'Projects' },
            { value: '300%', label: t.results?.stats?.[2]?.label || 'Growth' },
            { value: '5+', label: t.results?.stats?.[3]?.label || 'Markets' },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-black/10 bg-white/70 px-2 sm:px-4 py-4 sm:py-5 text-center shadow-lg shadow-black/5 mobile-blur-md transition-all duration-300 hover:border-primary/30 dark:border-border/30 dark:bg-white/5 dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5" />
              <div className="relative">
                <div className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-foreground">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-body mt-1 leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── VIDEO SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-3xl mt-4"
        >
          <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white/80 shadow-2xl shadow-black/10 mobile-blur-md dark:border-border/30 dark:bg-white/[0.03] dark:shadow-primary/10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />
            <div className="relative aspect-video bg-black">
              <img
                src={getOptimizedImageUrl(HERO_VIDEO_POSTER_URL, posterWidth)}
                alt=""
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center bg-black/20 transition-colors hover:bg-black/35"
                aria-label={t.hero.videoPlaceholder}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-lg shadow-black/30 mobile-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
                  <Play className="ml-1 h-8 w-8 text-white" />
                </div>
                <span className="mt-4 font-body text-sm text-white/90 transition-colors group-hover:text-white">
                  {/* {t.hero.videoPlaceholder} */}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-primary transition-colors mt-2"
        >
          <ChevronDown className="w-5 h-5 max-md:animate-none animate-bounce" />
        </motion.a>
      </div>

      {/* Video modal */}
      <ModalPortal
        open={videoOpen}
        onClose={closeVideo}
        ariaLabel={t.hero.videoPlaceholder}
        overlayClassName="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 max-md:backdrop-blur-none md:backdrop-blur-sm p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl"
        >
          <button
            type="button"
            onClick={closeVideo}
            className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <video
            key="hero-modal-video"
            src={getFullVideoUrl(HERO_VIDEO_URL)}
            className="block w-full max-h-[80vh] bg-black object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        </motion.div>
      </ModalPortal>
    </section>
  );
}
