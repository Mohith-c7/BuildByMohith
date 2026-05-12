"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Activity, Users, Clock, Zap, Globe, ShieldCheck } from 'lucide-react';

const REQUEST_DATA = [
  { time: '00:00', requests: 450, latency: 12 },
  { time: '04:00', requests: 300, latency: 15 },
  { time: '08:00', requests: 800, latency: 10 },
  { time: '12:00', requests: 1200, latency: 18 },
  { time: '16:00', requests: 950, latency: 14 },
  { time: '20:00', requests: 1500, latency: 22 },
  { time: '23:59', requests: 600, latency: 12 },
];

const GEOGRAPHIC_DATA = [
  { country: 'US', users: 450, color: '#10b981' },
  { country: 'IN', users: 380, color: '#059669' },
  { country: 'UK', users: 120, color: '#34d399' },
  { country: 'DE', users: 95, color: '#064e3b' },
  { country: 'Other', users: 202, color: '#065f46' },
];

export default function AnalyticsPage() {
  const [liveTraffic, setLiveTraffic] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTraffic(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Telemetry</h1>
        <p className="text-emerald-500/60 text-sm">Real-time performance monitoring and traffic analytics for the Portfolio OS.</p>
      </div>

      {/* Real-time Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Connections', value: liveTraffic, icon: Users, trend: '+12%' },
          { label: 'Avg Latency', value: '18ms', icon: Clock, trend: '-2ms' },
          { label: 'Request Rate', value: '1.2k/s', icon: Zap, trend: '+5%' },
          { label: 'System Uptime', value: '99.98%', icon: ShieldCheck, trend: 'Optimal' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-emerald-900/5 border border-emerald-900/20 p-5 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <stat.icon className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded">
                {stat.trend}
              </span>
            </div>
            <div className="text-[10px] text-emerald-500/40 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Rate Chart */}
        <div className="lg:col-span-2 bg-black/40 border border-emerald-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Request Throughput (24h)
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[10px] text-emerald-500/60">Requests</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REQUEST_DATA}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} opacity={0.1} />
                <XAxis 
                  dataKey="time" 
                  stroke="#064e3b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#064e3b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #064e3b', borderRadius: '8px', fontSize: '10px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-black/40 border border-emerald-900/30 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-8">
            <Globe className="w-4 h-4 text-emerald-500" />
            Global Traffic
          </h3>
          
          <div className="space-y-6">
            {GEOGRAPHIC_DATA.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-emerald-100/70 font-mono">{item.country}</span>
                  <span className="text-emerald-500">{item.users} users</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-900/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.users / 450) * 100}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-emerald-900/20">
            <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
              <div className="text-[10px] text-emerald-500/60 uppercase mb-2">System Status</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                All nodes operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
