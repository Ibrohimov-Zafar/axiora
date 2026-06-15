import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { MEMBER_VIDEOS } from '@/lib/teamMedia';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AUTO_SCROLL_SPEED = 1.1;
const DRAG_THRESHOLD = 6;

function ShortsVideoCard({ src, member, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/10 text-left shadow-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-[200px]"
    >
      <div className="relative aspect-[9/16] w-full">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
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
    src: MEMBER_VIDEOS[i],
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

  const handleCardClick = (member, idx) => {
    if (dragMoved.current) return;
    setActive({ member, idx });
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
          {marqueeItems.map(({ member, idx, src }, i) => (
            <ShortsVideoCard
              key={`${idx}-${i}`}
              src={src}
              member={member}
              onClick={() => handleCardClick(member, idx)}
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
                src={MEMBER_VIDEOS[active.idx]}
                className="aspect-[9/16] w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
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
