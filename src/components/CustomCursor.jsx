import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'var(--color-neon-blue)' : 'white',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
