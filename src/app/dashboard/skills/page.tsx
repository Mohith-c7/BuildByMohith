"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Server, Database, Globe, Shield, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MetricOverlay } from '@/components/shared/MetricOverlay';

const SKILL_CATEGORIES = [
  { id: 'all', name: 'All Services', icon: Globe },
  { id: 'backend', name: 'Backend Services', icon: Server },
  { id: 'data', name: 'Data Services', icon: Database },
  { id: 'devops', name: 'DevOps & Infra', icon: TerminalIcon },
  { id: 'security', name: 'Security Services', icon: Shield },
];

const SKILLS = [
  { name: 'Node.js', category: 'backend', version: '20.x', health: 'expert', projects: 15, latency: '12ms' },
  { name: 'Python', category: 'backend', version: '3.12', health: 'advanced', projects: 8, latency: '45ms' },
  { name: 'Go (Golang)', category: 'backend', version: '1.22', health: 'intermediate', projects: 4, latency: '18ms' },
  { name: 'PostgreSQL', category: 'data', version: '16.0', health: 'expert', projects: 12, latency: '8ms' },
  { name: 'MongoDB', category: 'data', version: '7.0', health: 'advanced', projects: 6, latency: '22ms' },
  { name: 'Redis', category: 'data', version: '7.2', health: 'expert', projects: 10, latency: '2ms' },
  { name: 'Docker', category: 'devops', version: '24.x', health: 'expert', projects: 20, latency: 'N/A' },
  { name: 'Kubernetes', category: 'devops', version: '1.29', health: 'intermediate', projects: 3, latency: 'N/A' },
  { name: 'AWS', category: 'devops', version: 'v2', health: 'advanced', projects: 7, latency: 'N/A' },
  { name: 'JWT/OAuth2', category: 'security', version: 'v1.1', health: 'expert', projects: 15, latency: '15ms' },
  { name: 'Penetration Testing', category: 'security', version: 'v2.0', health: 'intermediate', projects: 2, latency: 'N/A' },
  { name: 'SSL/TLS', category: 'security', version: 'v1.3', health: 'advanced', projects: 10, latency: '5ms' },
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = SKILLS.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-emerald-900/5 p-6 rounded-xl border border-emerald-900/20">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Service Catalog</h1>
          <p className="text-emerald-500/60 text-sm">Skills categorized as managed service endpoints within the portfolio mesh.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/40" />
            <input 
              type="text" 
              placeholder="Filter services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border border-emerald-900/30 rounded-lg pl-10 pr-4 py-2 text-sm text-emerald-400 placeholder:text-emerald-900 focus:outline-none focus:border-emerald-500/50 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest",
              activeCategory === cat.id 
                ? "bg-emerald-500 text-black" 
                : "bg-emerald-900/10 text-emerald-500/60 hover:bg-emerald-900/20"
            )}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, i) => (
            <MetricOverlay key={skill.name} label={skill.name.toUpperCase()}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-black/40 border border-emerald-900/30 p-5 rounded-lg group hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                    {SKILL_CATEGORIES.find(c => c.id === skill.category)?.icon && (
                      React.createElement(SKILL_CATEGORIES.find(c => c.id === skill.category)!.icon, {
                        className: "w-5 h-5 text-emerald-500"
                      })
                    )}
                  </div>
                  <div className={cn(
                    "text-[9px] font-bold uppercase px-2 py-1 rounded tracking-tighter",
                    skill.health === 'expert' ? "bg-emerald-500/20 text-emerald-400" :
                    skill.health === 'advanced' ? "bg-blue-500/20 text-blue-400" :
                    "bg-amber-500/20 text-amber-400"
                  )}>
                    {skill.health}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                <div className="text-[10px] text-emerald-500/40 font-mono mb-6 uppercase tracking-widest">
                  ENDPOINT_VERSION: {skill.version}
                </div>

                <div className="space-y-3 pt-4 border-t border-emerald-900/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-emerald-500/30 uppercase">Latency</span>
                    <span className="text-xs font-mono text-emerald-400">{skill.latency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-emerald-500/30 uppercase">Deployment Count</span>
                    <span className="text-xs font-mono text-emerald-400">{skill.projects} Repos</span>
                  </div>
                </div>
              </motion.div>
            </MetricOverlay>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
