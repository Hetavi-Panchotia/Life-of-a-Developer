import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, XCircle } from 'lucide-react';

const RealityHits = () => {
  const [errors, setErrors] = useState([]);

  const addError = () => {
    const newError = {
      id: Date.now(),
      msg: [
        'undefined is not a function',
        'cannot read property of null',
        'Stack Overflow: Recursion limit reached',
        'Fatal Error: Brain not found',
        'Unexpected token < in JSON',
      ][Math.floor(Math.random() * 5)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    };
    setErrors((prev) => [...prev, newError]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (errors.length < 10) addError();
    }, 2000);
    return () => clearInterval(interval);
  }, [errors]);

  return (
    <section id="javascript" className="min-h-screen relative flex flex-col items-center justify-center p-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />
      
      <div className="text-center z-10 shake">
        <h2 className="text-5xl md:text-7xl font-black mb-8 text-error-red animate-glitch transform -skew-x-12">
          THEN CAME <span className="text-white">JAVASCRIPT</span>
        </h2>
        <p className="text-xl md:text-2xl font-mono text-white/50 max-w-xl">
          Everything is fine. I am fine. This is fine. 🫠
        </p>
      </div>

      <AnimatePresence>
        {errors.map((err) => (
          <motion.div
            key={err.id}
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ left: `${err.x}%`, top: `${err.y}%` }}
            className="absolute glass p-4 rounded-xl border-error-red/50 shadow-error-red/20 shadow-lg flex items-center gap-3 interactive cursor-pointer group"
            onClick={() => setErrors(errors.filter(e => e.id !== err.id))}
          >
            <XCircle className="text-error-red w-5 h-5 group-hover:scale-125 transition-transform" />
            <span className="font-mono text-xs text-white whitespace-nowrap">{err.msg}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-error-red font-mono text-sm opacity-60">
        <AlertTriangle className="animate-pulse" />
        <span>Warnings: 12,042</span>
        <span>Errors: 1</span>
        <span className="animate-glitch">*Critical Failure Imminent*</span>
      </div>
    </section>
  );
};

export default RealityHits;
