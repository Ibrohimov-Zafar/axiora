import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Partners from '@/components/landing/Partners';
import Results from '@/components/landing/Results';
import About from '@/components/landing/About';
import Portfolio from '@/components/landing/Portfolio';
import Metrics from '@/components/landing/Metrics';
import Team from '@/components/landing/Team';
import Testimonials from '@/components/landing/Testimonials';
import Process from '@/components/landing/Process';
import Location from '@/components/landing/Location';
import FAQ from '@/components/landing/FAQ';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Results />
        <About />
        <Portfolio />
        <Metrics />
        <Team />
        <Testimonials />
        <Process />
        <Location />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}