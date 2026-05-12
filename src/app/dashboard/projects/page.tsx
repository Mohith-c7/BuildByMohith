"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitBranch, AlertCircle, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MetricOverlay } from '@/components/shared/MetricOverlay';

const PROJECTS = [
  {
    name: "scalable-chat-backend",
    description: "Real-time chat system handling 10K+ concurrent users with distributed state management.",
    tech: ["Node.js", "Socket.io", "Redis", "Docker"],
    stats: { stars: 234, forks: 45, issues: 12 },
    status: "PROD",
    links: { github: "#", demo: "#" }
  },
  {
    name: "api-rate-limiter",
    description: "Distributed rate limiting middleware for high-throughput microservices using token bucket algorithm.",
    tech: ["Go", "Redis", "gRPC"],
    stats: { stars: 89, forks: 12, issues: 3 },
    status: "BETA",
    links: { github: "#" }
  },
  {
    name: "sec-auth-service",
    description: "Secure identity provider with multi-factor authentication and role-based access control.",
    tech: ["Python", "OAuth2", "PostgreSQL"],
    stats: { stars: 156, forks: 28, issues: 5 },
    status: "STABLE",
    links: { github: "#", demo: "#" }
  },
  {
    name: "infra-monitor",
    description: "Real-time infrastructure health monitoring system with automated alerting protocols.",
    tech: ["Kubernetes", "Prometheus", "Grafana"],
    stats: { stars: 312, forks: 56, issues: 8 },
    status: "PROD",
    links: { github: "#" }
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Project Repositories</h1>
        <p className="text-emerald-500/60 text-sm">Managed code repositories with live telemetry and deployment status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <MetricOverlay key={project.name} label={project.name.toUpperCase()}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-black/40 border border-emerald-900/30 rounded-2xl p-6 hover:border-emerald-500/40 transition-all flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    <Package className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{project.name}</h2>
                </div>
                <span className={cn(
                  "text-[9px] font-bold px-2 py-1 rounded tracking-widest",
                  project.status === 'PROD' ? "bg-emerald-500/20 text-emerald-400" :
                  project.status === 'STABLE' ? "bg-blue-500/20 text-blue-400" :
                  "bg-amber-500/20 text-amber-400"
                )}>
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-emerald-100/60 mb-8 flex-1 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 bg-emerald-900/30 border border-emerald-500/10 text-emerald-500/70 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-emerald-900/20">
                <div className="flex items-center gap-4 text-[10px] text-emerald-500/40 font-mono">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.stats.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    {project.stats.forks}
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {project.stats.issues}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href={project.links.github} className="p-2 bg-emerald-500/5 hover:bg-emerald-500/20 rounded-lg transition-colors border border-emerald-500/10">
                    <Github className="w-4 h-4 text-emerald-500" />
                  </a>
                  {project.links.demo && (
                    <a href={project.links.demo} className="p-2 bg-emerald-500/5 hover:bg-emerald-500/20 rounded-lg transition-colors border border-emerald-500/10">
                      <ExternalLink className="w-4 h-4 text-emerald-500" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </MetricOverlay>
        ))}
      </div>
    </div>
  );
}
