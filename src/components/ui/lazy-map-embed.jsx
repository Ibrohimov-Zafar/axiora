import React, { useEffect, useRef, useState } from 'react';

export default function LazyMapEmbed({ src, title, className = 'block w-full h-[280px] md:h-[450px]' }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title}
          className="block h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-secondary/40 text-sm text-muted-foreground">
          Xarita yuklanmoqda...
        </div>
      )}
    </div>
  );
}
