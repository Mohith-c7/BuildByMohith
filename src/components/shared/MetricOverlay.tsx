"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { Cpu, Zap, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricOverlayProps {
  children: React.ReactNode;
  label: string;
}

export const MetricOverlay: React.FC<MetricOverlayProps> = ({ children, label }) => {
  const { showMetrics, isChaosMode } = useSystem();
  const [renderTime, setRenderTime] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    if (showMetrics || isChaosMode) {
      const baseTime = isChaosMode ? 500 : 10;
      const baseMem = isChaosMode ? 1024 : 2;
      setRenderTime(Math.floor(Math.random() * 100) + baseTime);
      setMemoryUsage(Math.floor(Math.random() * 50) + baseMem);
    }
  }, [showMetrics, isChaosMode]);

  return (
    <div className="relative group/metric h-full">
      {children}
      
      <AnimatePresence>
        {(showMetrics || isChaosMode) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: isChaosMode ? [0, -2, 2, 0] : 0 
            }}
            transition={isChaosMode ? { repeat: Infinity, duration: 0.1 } : {}}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-2 -right-2 z-30 pointer-events-none"
          >
            <div className={cn(
              "px-2 py-1 rounded text-[8px] font-bold font-mono shadow-lg border flex items-center gap-2 whitespace-nowrap transition-colors",
              isChaosMode 
                ? "bg-red-600 text-white border-red-400" 
                : "bg-emerald-500 text-black border-emerald-400"
            )}>
              <Zap className={cn("w-2 h-2", isChaosMode && "animate-ping")} />
              {isChaosMode ? "CRITICAL_LATENCY" : label}: {renderTime}ms | {memoryUsage}KB
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
