"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Fingerprint, 
  Activity, 
  Eye, 
  AlertTriangle,
  Server
} from 'lucide-react';
import { cn } from '@/lib/utils';

const THREAT_LOGS = [
  { id: 1, type: 'WAF', action: 'BLOCK', origin: '192.168.1.1', status: 'MALICIOUS_PAYLOAD' },
  { id: 2, type: 'AUTH', action: 'DENY', origin: '45.12.34.22', status: 'BRUTE_FORCE_ATTEMPT' },
  { id: 3, type: 'DDOS', action: 'MITIGATE', origin: 'DISTRIBUTED', status: 'RATE_LIMIT_EXCEEDED' },
  { id: 4, type: 'GEO', action: 'WATCH', origin: 'RU_NORTH', status: 'UNUSUAL_ACCESS_PATTERN' },
];

export default function SecurityPage() {
  const [logs, setLogs] = useState(THREAT_LOGS);
  const [securityScore, setSecurityScore] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        type: ['WAF', 'AUTH', 'DDOS'][Math.floor(Math.random() * 3)],
        action: 'BLOCK',
        origin: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.x.x`,
        status: 'ANOMALY_DETECTED'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Sentinel</h1>
          <p className="text-emerald-500/60 text-sm">Real-time threat detection and security protocol monitoring.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-emerald-900/5 px-8 py-4 rounded-2xl border border-emerald-900/20">
          <div className="text-center">
            <div className="text-[10px] text-emerald-500/40 uppercase tracking-widest mb-1">Global Health</div>
            <div className="text-2xl font-bold text-white font-mono">{securityScore}%</div>
          </div>
          <div className="w-px h-8 bg-emerald-900/30" />
          <ShieldCheck className="w-8 h-8 text-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Metrics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Active WAF Rules', value: '1,240', icon: Lock },
              { label: 'Auth Handshakes', value: '15.2k/h', icon: Fingerprint },
              { label: 'Blocked Origins', value: '458', icon: ShieldAlert },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-black/40 border border-emerald-900/20 rounded-xl"
              >
                <stat.icon className="w-5 h-5 text-emerald-500/40 mb-4" />
                <div className="text-[10px] text-emerald-500/30 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-black/40 border border-emerald-900/30 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 bg-emerald-900/10 border-b border-emerald-900/30 flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                Live Intrusion Logs
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] text-red-400 font-bold uppercase">Real-time Stream</span>
              </div>
            </div>
            
            <div className="divide-y divide-emerald-900/20">
              <AnimatePresence mode="popLayout">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 flex items-center justify-between gap-4 group hover:bg-emerald-500/5 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-[10px] font-bold text-red-400 font-mono w-12">{log.type}</div>
                      <div className="w-px h-4 bg-emerald-900/20" />
                      <div>
                        <div className="text-[11px] text-emerald-100/70 font-mono">{log.origin}</div>
                        <div className="text-[9px] text-emerald-500/40 uppercase tracking-widest">{log.status}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold px-2 py-1 bg-red-500/10 text-red-500 rounded border border-red-500/20">
                        {log.action}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Security Health & Protocols */}
        <div className="space-y-6">
          <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-500" />
              Security Protocol
            </h3>
            
            <div className="space-y-6">
              {[
                { name: 'mTLS Handshake', status: 'Enabled', active: true },
                { name: 'OAuth2 Rotation', status: 'Active', active: true },
                { name: 'SQLi Sanitization', status: 'Optimal', active: true },
                { name: 'Geo-Fencing', status: 'Enabled', active: true },
                { name: 'Rate Limiting', status: 'Enabled', active: true },
              ].map((protocol, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-emerald-100/60 font-medium">{protocol.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{protocol.status}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Active Alerts</span>
            </div>
            <p className="text-[11px] text-red-500/60 leading-relaxed mb-6">
              Critical vulnerability detected in Legacy v1.0 Service. Automatic isolation protocol initiated.
            </p>
            <button className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all">
              Initialize Quarantine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
