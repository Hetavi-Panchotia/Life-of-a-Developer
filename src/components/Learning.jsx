import React from 'react';
import { motion } from 'framer-motion';

const Learning = () => {
  const cards = [
    { name: 'HTML', color: 'text-orange-500', glow: 'shadow-orange-500/50' },
    { name: 'CSS', color: 'text-blue-500', glow: 'shadow-blue-500/50' },
  ];

  return (
    <section id="learning" className="min-h-screen flex flex-col items-center justify-center relative bg-white/5 py-20 px-6">
      <div className="text-center mb-16 max-w-2xl">
        <h2 className="text-4xl md:text-6xl font-black mb-6">THE <span className="text-neon-green">HTML/CSS</span> ERA</h2>
        <p className="text-xl text-white/70 italic">
          "Wow, this is actually pretty easy! I'm basically a senior engineer already." 💅
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
            className={`glass p-12 rounded-3xl flex flex-col items-center justify-center gap-6 group cursor-pointer transition-shadow hover:shadow-2xl ${card.glow}`}
          >
            <div className={`text-7xl font-black ${card.color} group-hover:scale-110 transition-transform`}>
              {card.name}
            </div>
            <div className="text-white/40 font-mono text-sm leading-relaxed">
              &lt;{card.name.toLowerCase()}&gt;<br />
              &nbsp;&nbsp;center-everything: true;<br />
              &lt;/{card.name.toLowerCase()}&gt;
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center glass px-8 py-4 rounded-full border-neon-green/30 animate-pulse">
        <p className="text-neon-green font-mono">Current Confidence: 100% (Mistake #1)</p>
      </div>
    </section>
  );
};

export default Learning;
