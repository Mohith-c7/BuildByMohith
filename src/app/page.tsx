"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_VERSION } from '@/lib/constants';
import { Terminal } from '@/components/animations/Terminal';
import { Scene } from '@/components/canvas/Scene';

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  const bootLines = [
    "Initializing profile-service... [OK]",
    "Loading projects-service... [OK]",
    "Connecting experience-service... [OK]",
    "Bootstrapping analytics-service... [OK]",
    "Verifying system integrity... [SECURE]",
    "Starting portfolio-core v4.0.0...",
    "Access granted. Welcome, Architect."
  ];

  return (
    <main className="min-h-screen bg-black text-emerald-500 font-mono flex flex-col items-center justify-center relative overflow-hidden">
      <Scene />
      
      <div className="w-full max-w-2xl z-10 p-4">
        <AnimatePresence mode="wait">
          {!isBooted ? (
            <motion.div
              key="boot"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-emerald-900/50 bg-black/80 backdrop-blur-md p-6 rounded-lg shadow-2xl shadow-emerald-900/20"
            >
              <div className="flex items-center justify-between mb-6 border-b border-emerald-900/30 pb-4">
                <div className="text-xs opacity-70 uppercase tracking-widest">
                  System Boot Sequence
                </div>
                <div className="text-xs font-bold text-emerald-400">
                  v{SYSTEM_VERSION}
                </div>
              </div>
              
              <Terminal 
                lines={bootLines} 
                onComplete={() => setTimeout(() => setIsBooted(true), 1000)}
                typingSpeed={60}
              />
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8 relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-32 h-32 rounded-full border-2 border-emerald-500 p-1 relative z-10"
                >
                  <div className="w-full h-full rounded-full bg-emerald-900/20 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for actual image */}
                    <span className="text-4xl font-bold text-emerald-500">M</span>
                  </div>
                </motion.div>
                <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl rounded-full -z-10 animate-pulse" />
              </div>

              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-bold text-white mb-2 tracking-tighter"
              >
                MOHITH
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-emerald-400 text-lg uppercase tracking-[0.2em]">
                  Backend Engineer // System Architect
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {["Microservices", "Scalability", "Security", "Distributed Systems"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/20 rounded text-[10px] text-emerald-300/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-emerald-500/60 text-sm max-w-md mx-auto mt-6 leading-relaxed">
                  Building production-grade systems that scale. Specialized in backend orchestration and secure infrastructure.
                </p>

                <div className="mt-12">
                  <button className="group relative px-12 py-4 bg-transparent text-emerald-400 font-bold uppercase tracking-widest text-sm overflow-hidden border border-emerald-500/30 hover:text-black transition-colors duration-300">
                    <span className="relative z-10">Access System Protocol</span>
                    <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-8 right-8 flex justify-between items-end"
      >
        <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40">
          <div className="flex flex-col">
            <span className="text-emerald-500">Internships</span>
            <span>4 Deployed</span>
          </div>
          <div className="flex flex-col">
            <span className="text-emerald-500">Experience</span>
            <span>2.5 Years</span>
          </div>
        </div>

        <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40 text-right">
          <div className="flex flex-col">
            <span className="text-emerald-500">Status</span>
            <span className="animate-pulse">Active_Node_01</span>
          </div>
          <div className="flex flex-col">
            <span className="text-emerald-500">Uptime</span>
            <span>99.9%</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
