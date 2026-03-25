import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Bug, AlertTriangle } from 'lucide-react';

const Loop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="loop" className="min-h-screen bg-black flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-error-red)_0%,_transparent_60%)] animate-pulse" />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center max-w-2xl"
      >
        <div className="flex justify-center mb-10">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative"
            >
                <RefreshCw className="w-32 h-32 text-orange-500" />
                <Bug className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-error-red" />
            </motion.div>
        </div>

        <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">
          THE <span className="text-orange-500">INFINITE</span> CYCLE
        </h2>
        
        <p className="text-xl md:text-2xl text-white/50 mb-12 italic font-mono">
          "A new bug has appeared in prod. It's Friday, 5 PM. The cycle begins anew." 💀
        </p>

        <button
          onClick={scrollToTop}
          className="group relative px-12 py-6 bg-white text-black text-2xl font-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] interactive"
        >
          RELIVE THE TRAUMA
          <div className="absolute inset-0 bg-orange-500 rounded-full scale-0 group-hover:scale-100 transition-transform -z-10 opacity-20" />
        </button>

        <div className="mt-20 flex items-center justify-center gap-4 text-xs font-mono text-white/20 uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4" />
            No developers were harmed in the making of this website. (Mostly).
            <AlertTriangle className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Repeating background text */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 overflow-hidden flex flex-wrap gap-4 p-4 font-black text-4xl leading-none select-none">
        {Array.from({ length: 100 }).map((_, i) => (
            <span key={i} className="text-white">IT NEVER ENDS</span>
        ))}
      </div>
    </section>
  );
};

export default Loop;
