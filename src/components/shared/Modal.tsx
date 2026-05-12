"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]"
          >
            {/* Header */}
            <div className="bg-emerald-900/10 px-8 py-6 border-b border-emerald-900/30 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">{title}</h2>
                </div>
                {subtitle && <p className="text-[10px] text-emerald-500/50 uppercase tracking-[0.2em] font-mono">{subtitle}</p>}
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors text-emerald-900 hover:text-emerald-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>

            {/* Footer */}
            <div className="bg-emerald-900/5 px-8 py-4 border-t border-emerald-900/30 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-emerald-400 transition-all active:scale-95"
              >
                Close_Service
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
