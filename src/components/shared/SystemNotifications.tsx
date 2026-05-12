"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SystemNotifications = () => {
  const { notifications } = useSystem();

  return (
    <div className="fixed bottom-24 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              "pointer-events-auto min-w-[280px] p-4 rounded-xl border shadow-2xl flex items-start gap-4 backdrop-blur-xl",
              n.type === 'info' && "bg-emerald-950/80 border-emerald-500/30 text-emerald-100",
              n.type === 'warning' && "bg-amber-950/80 border-amber-500/30 text-amber-100",
              n.type === 'error' && "bg-red-950/80 border-red-500/30 text-red-100"
            )}
          >
            <div className="mt-0.5">
              {n.type === 'info' && <Info className="w-4 h-4 text-emerald-400" />}
              {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {n.type === 'error' && <XCircle className="w-4 h-4 text-red-400" />}
            </div>
            
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">
                System Interrupt // {n.type}
              </div>
              <div className="text-xs font-mono font-medium leading-relaxed">
                {n.message}
              </div>
            </div>

            <div className="w-1 h-8 bg-current opacity-20 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
