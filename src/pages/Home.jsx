import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';

const VideoShorts = lazy(() => import('@/components/landing/VideoShorts'));
const Partners = lazy(() => import('@/components/landing/Partners'));
const Results = lazy(() => import('@/components/landing/Results'));
const About = lazy(() => import('@/components/landing/About'));
const Metrics = lazy(() => import('@/components/landing/Metrics'));
const Team = lazy(() => import('@/components/landing/Team'));
const Testimonials = lazy(() => import('@/components/landing/Testimonials'));
const Process = lazy(() => import('@/components/landing/Process'));
const Location = lazy(() => import('@/components/landing/Location'));
const FAQ = lazy(() => import('@/components/landing/FAQ'));
const Contact = lazy(() => import('@/components/landing/Contact'));
const Footer = lazy(() => import('@/components/landing/Footer'));

function SectionFallback() {
  return <div className="min-h-[120px]" aria-hidden />;
}

function LazySection({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="perf-section">
      {visible ? (
        <Suspense fallback={<SectionFallback />}>{children}</Suspense>
      ) : (
        <SectionFallback />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LazySection>
          <VideoShorts />
        </LazySection>
        <LazySection>
          <Partners />
        </LazySection>
        <LazySection>
          <Results />
        </LazySection>
        <LazySection>
          <About />
        </LazySection>
        <LazySection>
          <Metrics />
        </LazySection>
        <LazySection>
          <Team />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
        <LazySection>
          <Process />
        </LazySection>
        <LazySection>
          <Location />
        </LazySection>
        <LazySection>
          <FAQ />
        </LazySection>
        <LazySection>
          <Contact />
        </LazySection>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
