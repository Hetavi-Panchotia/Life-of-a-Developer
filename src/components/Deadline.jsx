import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, MessageSquare, AlertTriangle } from 'lucide-react';

const Deadline = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const msgInterval = setInterval(() => {
      const newMsg = {
        id: Date.now(),
        from: ['Project Manager', 'Client', 'Senior Dev', 'Tech Lead'][Math.floor(Math.random() * 4)],
        text: [
          'Can we change the entire architecture by tomorrow?',
          'The client wants it in blue now.',
          'Small tweak: make it responsive for smart watches.',
          'Is it done yet?',
          "Actually, we don't need this feature anymore.",
          'Just one more minor change...',
        ][Math.floor(Math.random() * 6)],
      };
      setMessages((prev) => [newMsg, ...prev].slice(0, 3));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(msgInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="deadline" className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none" />
      
      <div className="z-10 text-center w-full max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-2 rounded-full mb-8 font-bold border border-red-500/30 animate-bounce">
          <Bell className="w-4 h-4" />
          URGENT: DEADLINE INCOMING
        </div>

        <div className="text-[12vw] md:text-[8rem] font-black font-mono text-white tracking-tighter mb-8 leading-none">
          {formatTime(timeLeft)}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start w-full">
          <div className="glass p-8 rounded-3xl text-left border-red-500/20 shadow-red-500/10 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-neon-blue" />
              <h3 className="text-xl font-bold">Inbound Distractions</h3>
            </div>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <div className="text-xs font-bold text-neon-blue mb-1">{msg.from}</div>
                    <div className="text-sm italic text-white/80">"{msg.text}"</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl text-left border-orange-500/20">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-orange-500" />
              <h3 className="text-xl font-bold">Mental State</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2 font-mono">
                  <span>Anxiety Level</span>
                  <span className="text-orange-500">CRITICAL</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-orange-500 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 font-mono">
                  <span>Hope</span>
                  <span className="text-red-500">EMPTY</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[2%] h-full bg-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-[loading_60s_linear_infinite]" />
      <style>{`
        @keyframes loading {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </section>
  );
};

export default Deadline;
