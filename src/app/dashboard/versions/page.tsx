"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, GitCommit, ChevronRight, Rocket, RotateCcw, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const VERSIONS = [
  {
    id: 'v4.0',
    name: 'v4.0.0-STABLE',
    status: 'current',
    date: 'Present',
    changelog: [
      "Full Microservices Architecture",
      "Real-time Telemetry Integration",
      "Terminal CLI & Chaos Engineering Mode",
      "Interactive 3D Service Mesh"
    ],
    summary: "The current state of the system. Fully optimized and distributed."
  },
  {
    id: 'v3.0',
    name: 'v3.0.0-LEGACY',
    status: 'archived',
    date: 'August 2023',
    changelog: [
      "Transitioned to Next.js App Router",
      "Added Redis Caching Layer",
      "Implemented first Backend Services",
      "Completed Internships 2 & 3"
    ],
    summary: "Major pivot to backend orchestration and infrastructure scalability."
  },
  {
    id: 'v2.0',
    name: 'v2.0.0-LEGACY',
    status: 'archived',
    date: 'January 2023',
    changelog: [
      "First Internship Deployment",
      "Basic Authentication Service",
      "Monolithic CRUD Architecture",
      "Initial Project Portfolio"
    ],
    summary: "The foundational stage where core full-stack principles were established."
  },
  {
    id: 'v1.0',
    name: 'v1.0.0-ORIGIN',
    status: 'archived',
    date: 'May 2022',
    changelog: [
      "Project Initialization",
      "Basic HTML/JS Logic",
      "Algorithmic Data Structures",
      "Freshman Year Sandbox"
    ],
    summary: "The origin point. A simple collection of academic logic and experiments."
  }
];

export default function VersionsPage() {
  const [selectedVersion, setSelectedVersion] = useState(VERSIONS[0]);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert(`System rollback to ${selectedVersion.name} initialized. (Simulation)`);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Version Control Hub</h1>
        <p className="text-emerald-500/60 text-sm">Time-travel through the evolution of the system architecture and career milestones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Version List */}
        <div className="space-y-4">
          <h2 className="text-[10px] text-emerald-500/40 uppercase tracking-[0.3em] font-bold mb-6">Commit History</h2>
          {VERSIONS.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVersion(v)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                selectedVersion.id === v.id 
                  ? "bg-emerald-500/10 border-emerald-500/50" 
                  : "bg-black/40 border-emerald-900/30 hover:border-emerald-500/30"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center border transition-colors",
                selectedVersion.id === v.id 
                  ? "bg-emerald-500 border-emerald-400 text-black" 
                  : "bg-emerald-900/10 border-emerald-900/50 text-emerald-500/40 group-hover:text-emerald-400"
              )}>
                <GitCommit className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white mb-0.5">{v.name}</div>
                <div className="text-[10px] text-emerald-500/40 font-mono">{v.date}</div>
              </div>
              {v.status === 'current' && (
                <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-bold rounded uppercase">Current</div>
              )}
            </button>
          ))}
        </div>

        {/* Version Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVersion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-emerald-900/5 border border-emerald-900/20 rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <History className="w-64 h-64 rotate-12" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <div className="text-[10px] text-emerald-500/40 font-mono uppercase tracking-[0.2em] mb-2">Build Snapshot</div>
                  <h2 className="text-4xl font-bold text-white tracking-tight">{selectedVersion.name}</h2>
                </div>
                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying || selectedVersion.status === 'current'}
                  className={cn(
                    "flex items-center gap-3 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all",
                    selectedVersion.status === 'current' 
                      ? "bg-emerald-900/20 text-emerald-500/30 cursor-not-allowed border border-emerald-500/10" 
                      : "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 shadow-xl shadow-emerald-500/20"
                  )}
                >
                  {isDeploying ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      Deploying Version...
                    </>
                  ) : selectedVersion.status === 'current' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Active Version
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Rollback to this state
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6">Build Summary</h3>
                  <p className="text-emerald-100/70 text-sm leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">
                    "{selectedVersion.summary}"
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6">Changelog</h3>
                  <ul className="space-y-4">
                    {selectedVersion.changelog.map((item, i) => (
                      <li key={i} className="flex gap-3 text-xs text-emerald-100/60 items-start">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Version Blueprint Visualization Placeholder */}
              <div className="mt-12 p-8 border border-emerald-500/10 rounded-xl bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <History className="w-8 h-8 text-emerald-500/20 mx-auto mb-3" />
                  <div className="text-[10px] text-emerald-500/40 uppercase tracking-[0.3em]">Architectural Blueprint Archived</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
