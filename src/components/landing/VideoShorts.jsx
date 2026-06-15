import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import {
  MEMBER_PHOTOS,
  MEMBER_VIDEOS,
  getCarouselVideoUrl,
  getFullVideoUrl,
} from '@/lib/teamMedia';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AUTO_SCROLL_SPEED = 1.1;
const DRAG_THRESHOLD = 6;

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
      onClick={onClick}
      className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/10 text-left shadow-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-[200px]"
    >
      <div ref={containerRef} className="relative aspect-[9/16] w-full bg-secondary/30">
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${isReady ? 'opacity-0' : 'opacity-100'}`}
        />
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
  const { t } = useI18n();
  const [active, setActive] = useState(null);

  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const items = t.team.members.map((member, i) => ({
    member,
    idx: i,
    src: getCarouselVideoUrl(MEMBER_VIDEOS[i]),
    poster: MEMBER_PHOTOS[i],
    fullSrc: getFullVideoUrl(MEMBER_VIDEOS[i]),
  }));

  const marqueeItems = [...items, ...items];

  const normalizeScroll = useCallback((el) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (el.scrollLeft < 0) el.scrollLeft += half;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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
  }, [normalizeScroll]);

  const handlePointerDown = (e) => {
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
    track.releasePointerCapture(e.pointerId);
  };

  const handleCardClick = (item) => {
    if (dragMoved.current) return;
    setActive(item);
  };

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
          className="flex cursor-grab gap-3 overflow-x-auto active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:gap-4"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {marqueeItems.map((item, i) => (
            <ShortsVideoCard
              key={`${item.idx}-${i}`}
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
              <video
                key={`shorts-modal-${active.idx}`}
                src={active.fullSrc}
                poster={active.poster}
                className="aspect-[9/16] w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
                preload="auto"
              />
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
