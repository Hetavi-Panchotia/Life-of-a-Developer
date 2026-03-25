import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const FloatingElement = ({ children, speed, depth }) => {
  const ref = useRef(null);

  useEffect(() => {
    const move = () => {
      gsap.to(ref.current, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: 5 + Math.random() * 5,
        ease: "sine.inOut",
        onComplete: move
      });
    };
    move();
  }, []);

  return (
    <div 
      ref={ref} 
      className="absolute pointer-events-none select-none opacity-20 blur-[1px]"
      style={{ zIndex: depth }}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  const codeSnippets = [
    "<div>", "console.log()", "const", "function", "=>", "<html>", "body {", "import", "export", "</>", "git commit", "npm run dev"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".parallax-layer", {
        x: (i) => xPos * (i + 1) * 0.5,
        y: (i) => yPos * (i + 1) * 0.5,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const title = "I WILL BECOME A DEVELOPER";
  const words = title.split(" ");

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Cinematic Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,50,100,0.3)_0%,transparent_70%)]" />
      
      {/* Parallax Floating Code */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((code, i) => (
          <FloatingElement key={i} speed={1} depth={i % 3}>
            <div 
              className="parallax-layer text-neon-blue font-mono text-xl whitespace-nowrap"
              style={{ 
                left: `${Math.random() * 100}vw`, 
                top: `${Math.random() * 100}vh`,
                fontSize: `${Math.random() * 20 + 10}px` 
              }}
            >
              {code}
            </div>
          </FloatingElement>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="mb-4"
        >
          <span className="text-neon-blue font-mono tracking-widest text-sm bg-neon-blue/10 px-4 py-1 rounded-full border border-neon-blue/20">
             INITIALIZING TRANSFORMATION
          </span>
        </motion.div>

        <h1 
          ref={headingRef}
          className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-4 text-white hover:text-neon-blue transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5 + i * 0.1,
                ease: [0.6, 0.01, -0.05, 0.95]
              }}
              style={{
                textShadow: word === "DEVELOPER" ? "0 0 30px rgba(0, 243, 255, 0.5)" : "none",
                color: word === "DEVELOPER" ? "var(--color-neon-blue)" : "white"
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto italic leading-relaxed"
        >
          "This is where the dream begins... before the first semicolon breaks everything." ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-12 group cursor-pointer"
        >
          <button className="relative px-12 py-4 bg-transparent text-white font-bold text-lg rounded-full border border-white/20 overflow-hidden hover:border-neon-blue transition-colors">
             <span className="relative z-10">START THE JOURNEY</span>
             <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </motion.div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="text-[10px] tracking-[0.3em] font-bold text-white uppercase">SCROLL TO CODE</div>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 80] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>

      {/* Corner Details */}
      <div className="absolute top-10 left-10 text-[10px] text-white/20 font-mono tracking-widest hidden md:block">
        VER: 2026.STORY_MODE<br/>
        STATUS: READY_TO_CODE
      </div>
      <div className="absolute bottom-10 right-10 text-[10px] text-white/20 font-mono tracking-widest hidden md:block text-right">
        LOC: MOTIVATION_LEVEL_9000<br/>
        C-ID: {Math.random().toString(36).substring(7).toUpperCase()}
      </div>
    </section>
  );
};

export default Hero;
