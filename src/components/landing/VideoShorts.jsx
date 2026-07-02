import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getCarouselVideoUrl,
  getFullVideoUrl,
  getYoutubeEmbedId,
} from '@/lib/teamMedia';
import { api } from '@/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AUTO_SCROLL_SPEED = 1.1;
const DRAG_THRESHOLD = 8;

function ShortsVideoCard({ src, poster, member, onClick }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          const video = videoRef.current;
          if (video && video.readyState >= 2) {
            video.play().catch(() => {});
          }
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: '120px', threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setIsReady(true);
      video.play().catch(() => {});
    };

    video.addEventListener('canplay', onCanPlay);
    return () => video.removeEventListener('canplay', onCanPlay);
  }, [shouldLoad, src]);

  return (
    <button
      type="button"
      data-shorts-card
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/10 text-left shadow-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-[200px]"
    >
      <div ref={containerRef} className="relative aspect-[9/16] w-full bg-secondary/30">
        {poster && (
          <img
            src={poster}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${isReady ? 'opacity-0' : 'opacity-100'}`}
          />
        )}
        {shouldLoad && (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className={`absolute inset-0 h-full w-full object-cover ${isReady ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
          <span className="inline-block rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white drop-shadow-md">
            {member.role}
          </span>
          <p className="mt-2 line-clamp-2 font-heading text-sm font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {member.name}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function VideoShorts() {
  const [active, setActive] = useState(null);

  const { data: shorts = [], isLoading } = useQuery({
    queryKey: ['shorts'],
    queryFn: () => api.getShorts(),
    staleTime: 60_000,
  });

  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const items = shorts.map((s) => ({
    id: s.id,
    member: { name: s.name, role: s.role },
    src: getCarouselVideoUrl(s.video_url),
    poster: s.poster_url,
    fullSrc: getFullVideoUrl(s.video_url),
    youtubeId: getYoutubeEmbedId(s.youtube_url),
  }));

  const marqueeItems = items.length > 0 ? [...items, ...items] : [];

  const normalizeScroll = useCallback((el) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (el.scrollLeft < 0) el.scrollLeft += half;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    let rafId;
    const tick = () => {
      if (!isDragging.current) {
        track.scrollLeft += AUTO_SCROLL_SPEED;
        normalizeScroll(track);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [normalizeScroll, items.length]);

  const handlePointerDown = (e) => {
    if (e.target.closest('[data-shorts-card]')) return;

    const track = trackRef.current;
    if (!track) return;

    isDragging.current = true;
    dragMoved.current = false;
    dragStartX.current = e.clientX;
    scrollStart.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const track = trackRef.current;
    if (!track || !isDragging.current) return;

    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      dragMoved.current = true;
    }

    track.scrollLeft = scrollStart.current + delta;
    normalizeScroll(track);
  };

  const handlePointerUp = (e) => {
    const track = trackRef.current;
    if (!track) return;

    isDragging.current = false;
    if (track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    setTimeout(() => {
      dragMoved.current = false;
    }, 0);
  };

  const handleCardClick = (item) => {
    if (dragMoved.current) return;
    setActive(item);
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground font-body">
          Videolar yuklanmoqda...
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl"
      >
        <div
          ref={trackRef}
          className="flex cursor-grab gap-3 overflow-x-auto active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:gap-4 touch-pan-x"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {marqueeItems.map((item, i) => (
            <ShortsVideoCard
              key={`${item.id}-${i}`}
              src={item.src}
              poster={item.poster}
              member={item.member}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 transition-colors hover:bg-black/80"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              {active.youtubeId ? (
                <iframe
                  title={active.member.name}
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&playsinline=1`}
                  className="aspect-[9/16] w-full bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={`shorts-modal-${active.id}`}
                  src={active.fullSrc}
                  poster={active.poster}
                  className="aspect-[9/16] w-full bg-black object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                />
              )}
              <div className="border-t border-white/10 p-4">
                <span className="font-mono text-xs font-bold text-primary">{active.member.role}</span>
                <p className="mt-1 font-heading text-base font-semibold text-white">{active.member.name}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
