"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  User, 
  Code2, 
  Briefcase, 
  LineChart, 
  Terminal as TerminalIcon,
  Settings,
  Activity
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'System Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Architecture', path: '/dashboard/about', icon: User },
  { name: 'Service Catalog', path: '/dashboard/skills', icon: Code2 },
  { name: 'Deployments', path: '/dashboard/experience', icon: Briefcase },
  { name: 'Telemetry', path: '/dashboard/analytics', icon: LineChart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-emerald-900/30 bg-black/50 backdrop-blur-xl flex flex-col z-20">
        <div className="p-6 border-b border-emerald-900/30">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <TerminalIcon className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-tight">PORTFOLIO_OS</span>
              <span className="text-[10px] text-emerald-500/50 font-mono">v4.0.0-STABLE</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-all group relative",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "text-emerald-500/40 group-hover:text-emerald-400")} />
                <span className="text-sm font-medium tracking-wide">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-emerald-900/30">
          <div className="bg-emerald-900/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest">CPU Usage</div>
              <div className="text-[10px] text-emerald-400 font-mono">12%</div>
            </div>
            <div className="w-full h-1 bg-emerald-900/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "12%" }}
                className="h-full bg-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest">Memory</div>
              <div className="text-[10px] text-emerald-400 font-mono">256MB</div>
            </div>
            <div className="w-full h-1 bg-emerald-900/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header/Status Bar */}
        <header className="h-16 border-b border-emerald-900/30 flex items-center justify-between px-8 bg-black/30 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-500/40">LOCATION:</span>
              <span className="text-emerald-400">/root/dashboard{pathname.replace('/dashboard', '')}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500/40" />
              <span className="text-[10px] text-emerald-500 uppercase tracking-[0.2em]">Network: Optimal</span>
            </div>
            <div className="w-px h-4 bg-emerald-900/30" />
            <button className="text-emerald-500/40 hover:text-emerald-400 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b11_1px,transparent_1px),linear-gradient(to_bottom,#064e3b11_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
