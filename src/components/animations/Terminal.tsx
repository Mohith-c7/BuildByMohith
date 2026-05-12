"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  lines: string[];
  onComplete?: () => void;
  typingSpeed?: number;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  lines, 
  onComplete, 
  typingSpeed = 100 
}) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, lines[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (currentIndex === lines.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, lines, onComplete, typingSpeed]);

  return (
    <div className="font-mono text-xs sm:text-sm bg-black p-4 rounded border border-emerald-900/30 overflow-hidden">
      {visibleLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex gap-2"
        >
          <span className="text-emerald-500/50">{">"}</span>
          <span className="text-emerald-400">{line}</span>
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-2 h-4 bg-emerald-500 inline-block align-middle"
      />
    </div>
  );
};
