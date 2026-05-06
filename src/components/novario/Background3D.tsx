import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Background3D() {
  const { scrollYProgress } = useScroll();
  
  // Create a set of random shapes
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      rotateZ: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {shapes.map((s) => {
        const yOffset = useTransform(scrollYProgress, [0, 1], [0, (s.id % 2 === 0 ? 1 : -1) * 200]);
        const rotation = useTransform(scrollYProgress, [0, 1], [s.rotateZ, s.rotateZ + 180]);
        
        return (
          <motion.div
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              y: yOffset,
              rotateZ: rotation,
              opacity: 0.03,
              background: 'linear-gradient(135deg, var(--primary), var(--gold))',
              borderRadius: s.id % 3 === 0 ? '50%' : s.id % 3 === 1 ? '0%' : '20%',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* 3D-like Mesh Gradient */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, var(--gold) 0%, transparent 40%)
          `,
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
