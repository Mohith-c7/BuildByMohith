"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, AlertCircle, Clock, Zap, ChevronRight, Database, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/shared/Modal';

const EXPERIENCE = [
  {
    company: "FutureTech Solutions",
    role: "Backend Engineering Intern",
    period: "May 2024 - Present",
    status: "active",
    version: "v4.2.0-STABLE",
    metrics: [
      { label: "Latency Reduction", value: "40%", icon: Zap },
      { label: "Request Volume", value: "500K/day", icon: Rocket },
      { label: "Service Uptime", value: "99.99%", icon: CheckCircle2 },
    ],
    highlights: [
      "Architected a distributed microservices communication layer using gRPC.",
      "Optimized database queries resulting in 30% faster response times.",
      "Implemented automated CI/CD pipelines for 3 core services."
    ],
    stack: ["Go", "Kubernetes", "PostgreSQL", "gRPC"],
    specs: {
      architecture: "gRPC Microservices Mesh",
      database: "PostgreSQL with Sharding",
      security: "JWT + OAuth2 + mTLS",
      monitoring: "Prometheus & Grafana"
    }
  },
  {
    company: "CloudScale Systems",
    role: "Full Stack Intern",
    period: "Jan 2024 - April 2024",
    status: "completed",
    version: "v3.1.5-ARCHIVED",
    metrics: [
      { label: "Feature Delivery", value: "12 Deployments", icon: Rocket },
      { label: "Bug Resolution", value: "150+ Issues", icon: CheckCircle2 },
      { label: "System Load", value: "10K Users", icon: Zap },
    ],
    highlights: [
      "Developed a real-time analytics dashboard with WebSocket integration.",
      "Refactored legacy monolith into modular components.",
      "Ensured 100% test coverage for critical payment processing modules."
    ],
    stack: ["Node.js", "React", "MongoDB", "Redis"],
    specs: {
      architecture: "Monolith-to-Microservices",
      database: "MongoDB with Redis Caching",
      security: "Role-Based Access Control",
      monitoring: "Custom WebSocket Telemetry"
    }
  },
  {
    company: "DataDynamics Corp",
    role: "Software Developer Intern",
    period: "Summer 2023",
    status: "completed",
    version: "v2.0.0-ARCHIVED",
    metrics: [
      { label: "Data Processed", value: "2TB/Week", icon: Database },
      { label: "Pipeline Efficiency", value: "25% Increase", icon: Zap },
    ],
    highlights: [
      "Built automated data ingestion pipelines using Python and Airflow.",
      "Implemented a centralized logging system with ELK stack.",
      "Collaborated on designing a scalable schema for multi-tenant data storage."
    ],
    stack: ["Python", "Docker", "Elasticsearch", "SQL"],
    specs: {
      architecture: "Data Ingestion Pipeline",
      database: "Elasticsearch + SQL",
      security: "Encrypted Data at Rest",
      monitoring: "ELK Stack Dashboard"
    }
  }
];

export default function ExperiencePage() {
  const [selectedExp, setSelectedExp] = useState<typeof EXPERIENCE[0] | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Deployment History</h1>
          <p className="text-emerald-500/60 text-sm">Chronological log of professional system deployments and performance metrics.</p>
        </div>
      </div>

      <div className="relative space-y-12">
        {/* The Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-emerald-900/30 -z-10" />

        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex gap-8 group"
          >
            {/* Timeline Node */}
            <div className="relative mt-2">
              <div className={cn(
                "w-16 h-16 rounded-xl border flex items-center justify-center transition-all duration-500 bg-black group-hover:scale-110",
                exp.status === 'active' 
                  ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                  : "border-emerald-900/50"
              )}>
                <Rocket className={cn("w-6 h-6", exp.status === 'active' ? "text-emerald-400" : "text-emerald-900")} />
              </div>
              {exp.status === 'active' && (
                <div className="absolute -inset-1 bg-emerald-500/20 blur-lg rounded-xl -z-10 animate-pulse" />
              )}
            </div>

            {/* Content Card */}
            <div className="flex-1 space-y-6">
              <div className="bg-emerald-900/5 border border-emerald-900/20 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-white tracking-tight">{exp.company}</h2>
                      <span className={cn(
                        "text-[9px] font-bold uppercase px-2 py-0.5 rounded tracking-widest border",
                        exp.status === 'active' 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                          : "bg-emerald-900/20 text-emerald-500/40 border-emerald-900/50"
                      )}>
                        {exp.status}
                      </span>
                    </div>
                    <div className="text-emerald-400 text-sm font-medium">{exp.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-emerald-500/40 font-mono uppercase tracking-[0.2em] mb-1">DEPLOYMENT_ID: {exp.version}</div>
                    <div className="flex items-center gap-2 text-emerald-500/60 text-xs justify-end">
                      <Clock className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {exp.metrics.map((metric, j) => (
                    <div key={j} className="bg-black/40 border border-emerald-900/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className="w-3.5 h-3.5 text-emerald-500/60" />
                        <span className="text-[10px] text-emerald-500/40 uppercase tracking-wider">{metric.label}</span>
                      </div>
                      <div className="text-xl font-bold text-emerald-400 font-mono">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {exp.highlights.map((highlight, j) => (
                    <div key={j} className="flex gap-3 text-sm text-emerald-100/70 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack & Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-emerald-900/20">
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((t, j) => (
                      <span key={j} className="text-[10px] px-3 py-1 bg-emerald-900/30 border border-emerald-500/10 text-emerald-400/80 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSelectedExp(exp)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors group/btn"
                  >
                    View System Specs
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        title={selectedExp?.company || ""}
        subtitle={`System Specifications // ${selectedExp?.version}`}
      >
        {selectedExp && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Core Architecture", value: selectedExp.specs.architecture, icon: FileCode },
                { label: "Data Persistence", value: selectedExp.specs.database, icon: Database },
                { label: "Security Protocol", value: selectedExp.specs.security, icon: Rocket },
                { label: "Telemetry & Logs", value: selectedExp.specs.monitoring, icon: Zap },
              ].map((spec, i) => (
                <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <spec.icon className="w-4 h-4 text-emerald-500/60" />
                    <span className="text-[10px] text-emerald-500/40 uppercase tracking-widest">{spec.label}</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{spec.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest border-b border-emerald-900/30 pb-2">Technical Implementation Logs</h4>
              <div className="bg-black p-6 rounded-xl border border-emerald-900/20 font-mono text-[11px] text-emerald-100/60 leading-relaxed">
                {selectedExp.highlights.map((h, k) => (
                  <div key={k} className="mb-2 last:mb-0">
                    <span className="text-emerald-500 mr-2">[STABLE]</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
