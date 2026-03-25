import React, { useState } from 'react';
import { Coffee as CoffeeIcon, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Coffee = () => {
  const [cups, setCups] = useState(0);
  const [energy, setEnergy] = useState(10);
  const [floatingIcons, setFloatingIcons] = useState([]);

  const drinkCoffee = () => {
    setCups(prev => prev + 1);
    setEnergy(prev => Math.min(prev + 15, 100));
    
    const id = Date.now();
    setFloatingIcons(prev => [...prev, { id, x: Math.random() * 40 - 20 }]);
    setTimeout(() => {
      setFloatingIcons(prev => prev.filter(icon => icon.id !== id));
    }, 1000);
  };

  return (
    <section id="coffee" className="min-h-screen bg-amber-950/20 flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-neon-purple)_0%,_transparent_70%)] opacity-10 pointer-events-none" />
      
      <div className="z-10 text-center max-w-4xl w-full">
        <h2 className="text-5xl md:text-7xl font-black mb-12 text-white flex items-center justify-center gap-6">
          FUELING THE <span className="text-amber-500">GRIND</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4 order-2 md:order-1">
                <BarChart3 className="text-amber-500 w-10 h-10" />
                <div className="text-sm font-mono opacity-60">Lines of code written</div>
                <div className="text-4xl font-black">2</div>
            </div>

            <div className="relative order-1 md:order-2">
                <button
                    onClick={drinkCoffee}
                    className="group relative w-48 h-48 bg-amber-800 rounded-full flex items-center justify-center border-8 border-amber-900/50 hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(146,64,14,0.3)] interactive"
                >
                    <CoffeeIcon className="w-20 h-20 text-white group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-4 -right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                        {cups}
                    </div>
                </button>
                
                <AnimatePresence>
                    {floatingIcons.map(icon => (
                        <motion.div
                            key={icon.id}
                            initial={{ y: 0, opacity: 1, scale: 0.5 }}
                            animate={{ y: -150, opacity: 0, scale: 1.5 }}
                            style={{ left: `calc(50% + ${icon.x}px)` }}
                            className="absolute pointer-events-none"
                        >
                            <Zap className="text-yellow-400 fill-yellow-400" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4 order-3">
                <TrendingUp className="text-green-500 w-10 h-10" />
                <div className="text-sm font-mono opacity-60">Hours wasted on CSS</div>
                <div className="text-4xl font-black">10</div>
            </div>
        </div>

        <div className="mt-16 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4 font-mono font-bold text-lg">
                <span className="flex items-center gap-2"><Zap className="text-yellow-400" /> Energy Level</span>
                <span className={energy > 80 ? "text-yellow-400 animate-pulse" : "text-white"}>{energy}%</span>
            </div>
            <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                <motion.div 
                    animate={{ width: `${energy}%` }}
                    className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                />
            </div>
            <p className="mt-6 text-white/40 italic text-sm">
                *Caution: Excessive caffeine may lead to "Works on my machine" syndrome*
            </p>
        </div>
      </div>
    </section>
  );
};

export default Coffee;
