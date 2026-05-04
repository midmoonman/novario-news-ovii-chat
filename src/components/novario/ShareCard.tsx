import React, { useState, MouseEvent } from "react";
import { X, Share2, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function ShareCard({
  isOpen,
  onClose,
  title,
  image,
  category
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  category: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md flex flex-col items-center perspective-1000"
        style={{ perspective: 1000 }}
      >
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors z-50">
          <X className="w-5 h-5" />
        </button>

        {/* 3D Interactive Card */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
          className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 bg-black cursor-grab active:cursor-grabbing"
        >
          {/* Card Background Image (Blurred base) */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-125"
            style={{ backgroundImage: `url(${image})` }} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/50 to-black/90 mix-blend-overlay" />

          {/* Floating Image Layer */}
          <motion.div 
            style={{ transform: "translateZ(50px)" }}
            className="absolute top-8 left-8 right-8 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={image} alt="Story bg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>

          {/* Floating Content Layer */}
          <motion.div 
            style={{ transform: "translateZ(80px)" }}
            className="absolute bottom-8 left-8 right-8 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg">
              <Sparkles className="w-3 h-3 text-gold" /> {category}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight serif drop-shadow-xl text-balance">
              "{title}"
            </h2>
            
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/20 w-full">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shadow-lg border border-white/20">
                <span className="text-black font-black text-xl serif">N</span>
              </div>
              <div>
                <div className="text-white font-black tracking-wide text-sm drop-shadow-md">NOVARIO NEWS</div>
                <div className="text-white/60 text-xs font-medium">Read the full story</div>
              </div>
            </div>
          </motion.div>

          {/* Shimmer Effect overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 mix-blend-overlay" />
        </motion.div>
        
        <div className="mt-8 text-center space-y-4 w-full">
          <p className="text-sm text-white/70 font-medium">
            Screenshot to share on Instagram Story
          </p>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "Novario News", text: title, url: window.location.href });
              } else {
                alert("Native sharing not supported on this browser.");
              }
            }}
            className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl"
          >
            <Share2 className="w-5 h-5" /> Share Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
