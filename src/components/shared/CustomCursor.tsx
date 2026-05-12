"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Reticle */}
      <motion.div
        className="absolute w-8 h-8 border border-emerald-500/30 rounded-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-25%",
          translateY: "-25%",
        }}
        animate={{
          rotate: isHovering ? 90 : 0,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.3)",
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "250%",
          translateY: "250%",
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
      />

      {/* Trailing Crosshair lines */}
      <motion.div 
        className="absolute w-[1px] h-3 bg-emerald-500/20"
        style={{ x: cursorX, y: cursorY, translateX: "400%", translateY: "0%" }}
      />
      <motion.div 
        className="absolute w-3 h-[1px] bg-emerald-500/20"
        style={{ x: cursorX, y: cursorY, translateX: "0%", translateY: "400%" }}
      />
    </div>
  );
};
