"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, INITIAL_STATS } from '@/lib/constants';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            System Health Monitoring
          </h2>
          <div className="text-[10px] text-emerald-500/50 uppercase tracking-widest">
            Last Update: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(INITIAL_STATS).map(([key, value], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-emerald-900/5 border border-emerald-500/20 p-4 rounded-lg"
            >
              <div className="text-[10px] text-emerald-500/50 uppercase tracking-widest mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-2xl font-bold text-white">
                {typeof value === 'number' && key.includes('Percentage') ? `${value}%` : value}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Mesh */}
      <section>
        <h2 className="text-xl font-bold text-white tracking-tight mb-6">Active Services Mesh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-black/40 border border-emerald-900/30 p-5 rounded-lg hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-emerald-400 font-bold text-sm mb-1">{service.name}</div>
                  <div className="text-[10px] text-emerald-500/40 font-mono">v{service.version}</div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">{service.status}</span>
                </div>
              </div>
              
              <p className="text-xs text-emerald-100/60 mb-6 line-clamp-2">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-emerald-900/20 pt-4">
                <div>
                  <div className="text-[9px] text-emerald-500/40 uppercase mb-1">Latency</div>
                  <div className="text-xs font-mono text-emerald-300">{service.latency}ms</div>
                </div>
                <div>
                  <div className="text-[9px] text-emerald-500/40 uppercase mb-1">Uptime</div>
                  <div className="text-xs font-mono text-emerald-300">99.99%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
