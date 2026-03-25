import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PartyPopper, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Success = () => {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="success" className="min-h-screen bg-green-950/10 flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/5 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="z-10 text-center max-w-3xl"
      >
        <div className="flex justify-center mb-8">
            <div className="relative">
                <CheckCircle2 className="w-32 h-32 text-neon-green animate-pulse" />
                <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-12 h-12" />
                <PartyPopper className="absolute -bottom-4 -left-4 text-purple-400 w-12 h-12" />
            </div>
        </div>

        <h2 className="text-5xl md:text-8xl font-black mb-8 text-white tracking-tight">
          FINALLY IT <span className="text-neon-green text-glow">WORKS</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-white/60 mb-12 italic">
          "The code is elegant, the tests are passing, and the client is happy. Enjoy this moment of pure bliss... it lasts about 4 seconds." 🧘‍♂️✨
        </p>

        <div className="flex flex-wrap justify-center gap-6">
            <div className="glass px-8 py-4 rounded-2xl border-neon-green/30">
                <div className="text-sm font-mono opacity-50 mb-1">Status</div>
                <div className="text-2xl font-bold text-neon-green">DEPLOYED</div>
            </div>
            <div className="glass px-8 py-4 rounded-2xl border-neon-green/30">
                <div className="text-sm font-mono opacity-50 mb-1">Bugs</div>
                <div className="text-2xl font-bold text-neon-green">0 (allegedly)</div>
            </div>
        </div>
      </motion.div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <p className="text-sm font-bold tracking-widest text-white/40">KEEP SCROLLING</p>
      </div>
    </section>
  );
};

export default Success;
