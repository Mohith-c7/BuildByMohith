"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Scene } from '@/components/canvas/Scene';
import { Shield, Zap, Database, Server, Cpu } from 'lucide-react';

const EVOLUTION_LOG = [
  {
    version: 'v1.0-LEGACY',
    period: '2022',
    title: 'Foundational Services',
    description: 'Initial deployment of core programming logic. Focus on algorithmic efficiency and data structures.',
    tech: ['C++', 'Python', 'Basic Web']
  },
  {
    version: 'v2.0-STABLE',
    period: '2023',
    title: 'Distributed Systems Pivot',
    description: 'Transitioned to backend-first architecture. Implemented first microservices and authentication layers.',
    tech: ['Node.js', 'PostgreSQL', 'Docker']
  },
  {
    version: 'v3.5-BETA',
    period: '2024',
    title: 'Enterprise Scalability',
    description: 'Optimized high-traffic endpoints. Integrated Redis caching and real-time WebSocket telemetry.',
    tech: ['Go', 'Redis', 'Kubernetes', 'gRPC']
  },
  {
    version: 'v4.0-CURRENT',
    period: 'Present',
    title: 'System Architect Phase',
    description: 'Designing production-grade distributed systems with a focus on security and high availability.',
    tech: ['Microservices', 'System Design', 'Security']
  }
];

export default function AboutPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: System Architect Bio */}
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center">
              <Cpu className="text-emerald-500" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">System Architect</h1>
          </div>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-emerald-100/70 text-lg leading-relaxed">
              I specialize in designing and building backend systems that scale. My approach combines 
              system-level thinking with a deep understanding of distributed architectures and security.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.3em]">Core Competencies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'System Design', icon: Server, desc: 'Scalable distributed architectures' },
              { title: 'Backend Dev', icon: Zap, desc: 'High-performance API endpoints' },
              { title: 'Security', icon: Shield, desc: 'Identity & access management' },
              { title: 'Databases', icon: Database, desc: 'Schema optimization & indexing' },
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-emerald-900/5 border border-emerald-900/30 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <skill.icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-white font-bold text-sm">{skill.title}</span>
                </div>
                <p className="text-[11px] text-emerald-500/60 leading-relaxed">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Evolution Log */}
      <div className="space-y-8">
        <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.3em] mb-4 text-right">Evolution Log</h2>
        <div className="relative border-l border-emerald-900/30 ml-4 space-y-12 pb-8">
          {EVOLUTION_LOG.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              className="relative pl-8"
            >
              {/* Timeline Indicator */}
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-500/50 uppercase">{log.version} // {log.period}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{log.title}</h3>
                <p className="text-xs text-emerald-100/60 leading-relaxed max-w-md">
                  {log.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {log.tech.map((t, j) => (
                    <span key={j} className="text-[9px] px-2 py-0.5 bg-emerald-500/5 border border-emerald-500/10 text-emerald-500/70 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
