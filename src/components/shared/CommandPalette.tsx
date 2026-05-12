"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  LayoutDashboard, 
  Code2, 
  Briefcase, 
  Package, 
  LineChart, 
  History,
  Command,
  X,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const SEARCH_ITEMS = [
  { id: 'dashboard', name: 'System Overview', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
  { id: 'about', name: 'Architecture Evolution', path: '/dashboard/about', icon: History, category: 'Navigation' },
  { id: 'skills', name: 'Service Catalog', path: '/dashboard/skills', icon: Code2, category: 'Navigation' },
  { id: 'experience', name: 'Deployment History', path: '/dashboard/experience', icon: Briefcase, category: 'Navigation' },
  { id: 'projects', name: 'Repository Hub', path: '/dashboard/projects', icon: Package, category: 'Navigation' },
  { id: 'analytics', name: 'Telemetry Dashboard', path: '/dashboard/analytics', icon: LineChart, category: 'Navigation' },
  { id: 'security', name: 'Security Sentinel', path: '/dashboard/security', icon: Shield, category: 'Navigation' },
  { id: 'api-docs', name: 'API Documentation', path: '/dashboard/api-docs', icon: Terminal, category: 'Navigation' },
  { id: 'versions', name: 'Version Control', path: '/dashboard/versions', icon: History, category: 'Navigation' },
  { id: 'contact', name: 'Contact Protocol', path: '/dashboard/contact', icon: Terminal, category: 'Navigation' },
  
  // Dynamic Content (Mocked index)
  { id: 'skill-node', name: 'Node.js Managed Service', path: '/dashboard/skills', icon: Code2, category: 'Services' },
  { id: 'skill-python', name: 'Python Analytics Service', path: '/dashboard/skills', icon: Code2, category: 'Services' },
  { id: 'project-chat', name: 'Scalable Chat Backend', path: '/dashboard/projects', icon: Package, category: 'Repositories' },
  { id: 'exp-intern', name: 'Backend Internship v2.0', path: '/dashboard/experience', icon: Briefcase, category: 'Deployments' },
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredItems = SEARCH_ITEMS.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: typeof SEARCH_ITEMS[0]) => {
    setIsOpen(false);
    setQuery('');
    router.push(item.path);
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        }
        if (e.key === 'Enter' && filteredItems[selectedIndex]) {
          e.preventDefault();
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="relative border-b border-emerald-900/20">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500/40" />
              <input
                autoFocus
                placeholder="Search system nodes, protocols, and history..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent pl-16 pr-6 py-6 text-lg text-emerald-100 placeholder:text-emerald-900 focus:outline-none"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-emerald-900/20 border border-emerald-500/20 rounded text-[10px] text-emerald-500/40 uppercase font-bold tracking-widest">ESC</span>
                <span className="text-emerald-900">to exit</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={cn(
                        "w-full flex items-center justify-between gap-4 p-4 rounded-xl transition-all group",
                        selectedIndex === i 
                          ? "bg-emerald-500/10 border-emerald-500/20" 
                          : "bg-transparent border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center border transition-colors",
                          selectedIndex === i 
                            ? "bg-emerald-500 border-emerald-400 text-black" 
                            : "bg-emerald-900/10 border-emerald-900/50 text-emerald-500/40"
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white mb-0.5 group-hover:text-emerald-400 transition-colors">{item.name}</div>
                          <div className="text-[10px] text-emerald-500/40 uppercase tracking-widest">{item.category}</div>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-all",
                        selectedIndex === i ? "text-emerald-400 translate-x-0" : "text-emerald-900 -translate-x-2 opacity-0"
                      )} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Terminal className="w-12 h-12 text-emerald-900 mx-auto mb-4" />
                  <div className="text-emerald-500/40 text-sm">No system nodes found matching "{query}"</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-emerald-900/5 px-6 py-4 border-t border-emerald-900/20 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="px-1 py-0.5 bg-emerald-900/30 border border-emerald-500/20 rounded text-[8px] text-emerald-500/60 font-bold uppercase">↑↓</span>
                  </div>
                  <span className="text-[10px] text-emerald-900 uppercase font-bold tracking-widest">Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="px-1 py-0.5 bg-emerald-900/30 border border-emerald-500/20 rounded text-[8px] text-emerald-500/60 font-bold uppercase">Enter</span>
                  </div>
                  <span className="text-[10px] text-emerald-900 uppercase font-bold tracking-widest">Select</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-500/20">
                <Command className="w-3 h-3" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">System_Omnisearch_v1.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
