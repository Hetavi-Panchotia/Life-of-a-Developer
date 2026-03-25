import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, RefreshCcw, Flame } from 'lucide-react';

const Debugging = () => {
  const [bugs, setBugs] = useState([]);
  const [isFixing, setIsFixing] = useState(false);

  const fixBug = () => {
    setIsFixing(true);
    // Simulate "fixing" a bug by creating 3 more
    setTimeout(() => {
      const newBugs = Array.from({ length: 3 }).map(() => ({
          id: Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        }));
      setBugs((prev) => [...prev, ...newBugs]);
      setIsFixing(false);
    }, 500);
  };

  return (
    <section id="debugging" className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="flex flex-wrap gap-4 p-4 font-mono text-[10px] text-error-red leading-none">
          {Array.from({ length: 500 }).map((_, i) => (
            <span key={i}>ERROR: line {i} duplicated</span>
          ))}
        </div>
      </div>

      <div className="z-10 text-center max-w-2xl bg-black/40 p-12 rounded-3xl border border-white/5 glass">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white flex items-center justify-center gap-4">
          <Bug className="text-error-red w-12 h-12 animate-pulse" />
          DEBUGGING HELL
          <Flame className="text-orange-500 w-12 h-12" />
        </h2>
        
        <p className="text-lg text-white/60 mb-12 italic">
          "99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code." 💀
        </p>

        <button
          onClick={fixBug}
          disabled={isFixing}
          className="group relative px-10 py-5 bg-error-red text-white text-xl font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden interactive"
        >
          <span className="relative z-10 flex items-center gap-3">
            {isFixing ? <RefreshCcw className="animate-spin" /> : "FIX BUG"}
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
        </button>
      </div>

      <AnimatePresence>
        {bugs.map((bug) => (
          <motion.div
            key={bug.id}
            initial={{ scale: 0, scaleY: 0 }}
            animate={{ scale: 1, scaleY: 1 }}
            style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
            className="absolute z-20 pointer-events-none"
          >
            <Bug className="text-error-red w-8 h-8 opacity-40 animate-bounce" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute top-20 right-20 text-right opacity-30 font-mono text-sm pointer-events-none">
        <div>Stack Trace:</div>
        <div className="text-error-red">Error: Infinite Loop detected</div>
        <div className="text-error-red">at solveEverything (App.js:420)</div>
        <div className="text-error-red">at hopeForTheBest (App.js:69)</div>
      </div>
    </section>
  );
};

export default Debugging;
