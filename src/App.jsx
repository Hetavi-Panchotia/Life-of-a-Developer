import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Learning from './components/Learning';
import RealityHits from './components/RealityHits';
import Debugging from './components/Debugging';
import Deadline from './components/Deadline';
import Coffee from './components/Coffee';
import Success from './components/Success';
import Loop from './components/Loop';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const sections = gsap.utils.toArray('section');
    
    // Simple reveal animation for each section
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Special background color transitions
    ScrollTrigger.create({
      trigger: '#javascript',
      start: 'top center',
      onEnter: () => gsap.to('body', { backgroundColor: '#000', duration: 1 }),
      onLeaveBack: () => gsap.to('body', { backgroundColor: '#0a0a0a', duration: 1 }),
    });

    ScrollTrigger.create({
      trigger: '#debugging',
      start: 'top center',
      onEnter: () => gsap.to('body', { backgroundColor: '#050505', duration: 1 }),
    });

    ScrollTrigger.create({
      trigger: '#deadline',
      start: 'top center',
      onEnter: () => gsap.to('body', { backgroundColor: '#1a0000', duration: 1 }),
      onLeaveBack: () => gsap.to('body', { backgroundColor: '#050505', duration: 1 }),
    });

    ScrollTrigger.create({
        trigger: '#success',
        start: 'top center',
        onEnter: () => gsap.to('body', { backgroundColor: '#001a00', duration: 1 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: '#1a0000', duration: 1 }),
      });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <main ref={mainRef} className="relative w-full">
          <CustomCursor />
          
          <Hero />
          <Learning />
          <RealityHits />
          <Debugging />
          <Deadline />
          <Coffee />
          <Success />
          <Loop />

          {/* Footer / Info */}
          <footer className="py-10 text-center text-white/20 text-xs font-mono">
            &copy; 2026 Developer Life. Built with React, GSAP, and excessive Caffeine.
          </footer>
        </main>
      )}
    </>
  );
}

export default App;
