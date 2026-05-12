"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { Activity, AlertTriangle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SystemOverlay = () => {
  const { isChaosMode, toggleChaosMode, systemHealth, showMetrics, toggleShowMetrics } = useSystem();

  return (
    <>
      {/* Floating Monitor Widget */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-colors duration-500",
            isChaosMode 
              ? "bg-red-950/40 border-red-500/50 shadow-red-500/10" 
              : "bg-emerald-950/40 border-emerald-500/30 shadow-emerald-500/10"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-emerald-500/40 uppercase tracking-widest mb-1">System Health</span>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isChaosMode ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                )} />
                <span className={cn(
                  "text-lg font-mono font-bold",
                  isChaosMode ? "text-red-400" : "text-emerald-400"
                )}>
                  {systemHealth}%
                </span>
              </div>
            </div>

            <div className="w-px h-10 bg-emerald-900/30 mx-2" />

            <div className="flex gap-2">
              <button
                onClick={toggleShowMetrics}
                title="Toggle Performance Metrics"
                className={cn(
                  "p-3 rounded-lg border transition-all active:scale-95 group",
                  showMetrics
                    ? "bg-emerald-500 text-black border-emerald-400"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                )}
              >
                <Activity className="w-5 h-5" />
              </button>

              <button
                onClick={toggleChaosMode}
                title="Toggle Chaos Protocol"
                className={cn(
                  "p-3 rounded-lg border transition-all active:scale-95 group",
                  isChaosMode
                    ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                )}
              >
                {isChaosMode ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <AlertTriangle className="w-5 h-5 group-hover:animate-bounce" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chaos Mode Visual Effects */}
      <AnimatePresence>
        {isChaosMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            {/* Red scanline/glitch overlay */}
            <div className="absolute inset-0 bg-red-500/5 animate-pulse mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_50%,transparent_50%)] bg-[size:100%_4px] opacity-20" />
            
            {/* Chaos Warning Toast */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-[0.3em] shadow-2xl shadow-red-500/50 flex items-center gap-3"
              >
                <Activity className="w-4 h-4 animate-ping" />
                Chaos Protocol Active
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
