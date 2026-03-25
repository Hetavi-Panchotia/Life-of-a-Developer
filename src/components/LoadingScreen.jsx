import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef(null);
  const glitchRef = useRef(null);

  const messages = [
    "Initializing developer mindset...",
    "Installing bugs...",
    "Compiling dreams...",
    "Fixing 1 bug... creating 10 more...",
    "Running npm install (this may take forever)...",
    "Go grab coffee ☕",
    "99%... stuck forever",
    "Actually reading the docs (liar)...",
    "Ignoring console warnings...",
    "Works on my machine 👍",
    "Finalizing chaos...",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        if (prev === 98) return 98.1;
        if (prev >= 98 && prev < 99) return prev + 0.1;
        return prev + Math.random() * 15;
      });
    }, 300);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      startGlitchExit();
    }
  }, [progress]);

  const startGlitchExit = () => {
    setIsGlitching(true);
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Phase 1: Instability
    tl.to(containerRef.current, {
      x: () => (Math.random() - 0.5) * 10,
      y: () => (Math.random() - 0.5) * 10,
      opacity: 0.8,
      duration: 0.1,
      repeat: 3,
      ease: "rough({ template: none.out, strength: 2, points: 20, taper: 'none', randomize: true, clamp: false })"
    });

    // Phase 2: Glitch Distortion (RGB Split & Slices)
    tl.to(".glitch-slice", {
      display: "block",
      duration: 0
    }, 0.2);

    tl.to(".rgb-split", {
      opacity: 1,
      duration: 0.1,
      repeat: 5,
      yoyo: true
    }, 0.2);

    tl.to(containerRef.current, {
      skewX: 20,
      scaleY: 0.8,
      filter: "hue-rotate(90deg) contrast(200%)",
      duration: 0.1,
      repeat: 4,
      yoyo: true
    }, 0.3);

    // Phase 3: Breakdown Moment
    tl.to(glitchRef.current, {
      opacity: 1,
      backgroundColor: "white",
      duration: 0.05
    }, 0.7);

    tl.to(glitchRef.current, {
      opacity: 0,
      duration: 0.1
    }, 0.8);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black overflow-hidden font-mono">
      {/* Glitch Slices */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="glitch-slice absolute w-full h-[20%] bg-neon-blue/20 hidden"
            style={{ 
              top: `${i * 20}%`,
              left: (i % 2 === 0 ? '-100%' : '100%'),
              transform: `translateX(${i % 2 === 0 ? '100%' : '-100%'})`
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center p-6 text-neon-green">
        {/* RGB Split Layers */}
        <div className="rgb-split absolute inset-0 opacity-0 pointer-events-none mix-blend-screen overflow-hidden">
           <div className="absolute inset-0 bg-red-500/20 translate-x-2 translate-y-1" />
           <div className="absolute inset-0 bg-blue-500/20 -translate-x-2 -translate-y-1" />
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[length:100%_4px]" />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-2xl glass p-8 rounded-2xl border-neon-green/30 bg-black/60 relative"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-xs text-white/30 flex items-center gap-2 ml-4">
              <Terminal className="w-3 h-3" />
              <span>bash — developer-life.sh — {Math.floor(progress)}%</span>
            </div>
          </div>

          <div className="min-h-[120px] flex flex-col justify-center">
            <div className="flex items-start gap-3 text-lg md:text-2xl mb-2">
              <span className="text-white/40 font-bold ml-[-20px] mr-2 pr-2 select-none">$</span>
              <motion.div
                key={messageIndex}
                className="flex items-center gap-3"
              >
                {messages[messageIndex]}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-8 bg-neon-green ml-1"
                />
              </motion.div>
            </div>
          </div>

          <div className="mt-12 relative h-6 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-neon-blue to-neon-green rounded-full shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white mix-blend-difference">
              {Math.floor(progress)}%
            </div>
          </div>
        </motion.div>

        <button
          onClick={onComplete}
          className="mt-12 text-white/20 hover:text-white transition-colors text-sm z-20 interactive"
        >
          I'M IMPATIENT 😤
        </button>
      </div>

      {/* Final Flash/Blackout Layer */}
      <div ref={glitchRef} className="fixed inset-0 z-[10001] pointer-events-none opacity-0" />
    </div>
  );
};

export default LoadingScreen;
