"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
  "GET /api/v1/profile 200 OK 45ms",
  "POST /api/v1/telemetry HEARTBEAT",
  "WAF: BLOCK origin=192.168.x.x",
  "mTLS Handshake: SUCCESS",
  "CACHE_HIT key=system_config",
  "DEPLOYMENT_ID: 8dc6e7f STABLE",
  "NODES_ACTIVE: 06",
  "LATENCY: 12ms",
];

export const SystemLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs(prev => [msg, ...prev.slice(0, 4)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-8 left-8 space-y-1 z-0 opacity-20 pointer-events-none">
      <AnimatePresence>
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest"
          >
            {`> ${log}`}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
