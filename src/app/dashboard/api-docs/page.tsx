"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Copy, 
  ChevronRight, 
  Database, 
  Key, 
  Globe, 
  Zap,
  Play,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSystem } from '@/context/SystemContext';

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/v1/profile',
    description: 'Retrieve the core identity profile of the System Architect.',
    response: {
      status: 200,
      data: {
        name: "Mohith",
        role: "System Architect",
        location: "Distributed",
        expertise: ["Backend Architecture", "Microservices", "Security"]
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/services',
    description: 'Fetch the catalog of managed service endpoints (Skills).',
    response: {
      status: 200,
      data: [
        { id: "node-01", name: "Node.js", version: "20.x", status: "HEALTHY" },
        { id: "python-01", name: "Python", version: "3.12", status: "HEALTHY" },
        { id: "go-01", name: "Golang", version: "1.22", status: "HEALTHY" }
      ]
    }
  },
  {
    method: 'POST',
    path: '/api/v1/contact',
    description: 'Initialize a secure communication protocol.',
    parameters: [
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'message', type: 'string', required: true }
    ],
    response: {
      status: 202,
      message: "Protocol Accepted. Message queued for delivery."
    }
  }
];

export default function ApiDocsPage() {
  const { isChaosMode, chaosLevel, addNotification } = useSystem();
  const [requestCount, setRequestCount] = useState(0);

  const handleTest = () => {
    if (requestCount >= 5 && !isChaosMode) {
      addNotification("RATE_LIMIT_EXCEEDED: 429 Too Many Requests", "warning");
      return;
    }

    setIsLoading(true);
    setShowResponse(false);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (isChaosMode && chaosLevel > 0.6) {
        addNotification("SERVICE_UNAVAILABLE: 503 Backend Fetch Failed", "error");
        return;
      }

      setShowResponse(true);
      setRequestCount(prev => prev + 1);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Documentation Column */}
      <div className="flex-1 space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Data Protocol</h1>
          <p className="text-emerald-500/60 text-sm italic">Connect to the portfolio data layer via standard RESTful endpoints.</p>
        </div>

        <section className="space-y-8">
          <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <Key className="w-5 h-5 text-emerald-500" />
            <div className="text-xs text-emerald-100/60">
              <span className="font-bold text-emerald-400 uppercase tracking-widest block mb-1">Authentication</span>
              All requests require a Bearer Token for production access. For this playground, <span className="text-emerald-400">PUBLIC_ACCESS</span> is enabled.
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.3em]">Endpoints</h2>
            {ENDPOINTS.map((endpoint) => (
              <button
                key={endpoint.path}
                onClick={() => {
                  setSelectedEndpoint(endpoint);
                  setShowResponse(false);
                }}
                className={cn(
                  "w-full flex flex-col text-left p-6 rounded-xl border transition-all group",
                  selectedEndpoint.path === endpoint.path 
                    ? "bg-emerald-900/10 border-emerald-500/30" 
                    : "bg-black/40 border-emerald-900/20 hover:border-emerald-500/20"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded",
                    endpoint.method === 'GET' ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"
                  )}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-emerald-100/80">{endpoint.path}</code>
                </div>
                <p className="text-xs text-emerald-500/60 leading-relaxed">
                  {endpoint.description}
                </p>
                {endpoint.parameters && (
                  <div className="mt-4 pt-4 border-t border-emerald-900/20 grid grid-cols-3 gap-2">
                    {endpoint.parameters.map((p) => (
                      <div key={p.name} className="text-[9px] font-mono">
                        <span className="text-emerald-400">{p.name}</span>
                        <span className="text-emerald-900">:{p.type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Code / Playground Column */}
      <div className="lg:w-[450px] space-y-6">
        <div className="bg-[#0a0a0a] border border-emerald-900/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-emerald-900/10 px-6 py-3 border-b border-emerald-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-500/50" />
              <span className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest font-mono">Request Preview</span>
            </div>
            <button className="p-1 hover:bg-emerald-500/10 rounded transition-colors">
              <Copy className="w-3.5 h-3.5 text-emerald-900" />
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] text-emerald-900 uppercase font-bold tracking-widest">HTTP Request</div>
              <pre className="text-xs font-mono text-emerald-400 leading-relaxed overflow-x-auto">
                {selectedEndpoint.method} {selectedEndpoint.path} HTTP/1.1{"\n"}
                Host: api.buildbymohith.in{"\n"}
                Authorization: Bearer PUBLIC_ACCESS{"\n"}
                Content-Type: application/json
              </pre>
            </div>

            <button
              onClick={handleTest}
              disabled={isLoading}
              className="w-full py-3 bg-emerald-500 text-black rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Zap className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Test Endpoint
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/5"
            >
              <div className="bg-emerald-500/10 px-6 py-3 border-b border-emerald-500/20 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Response Protocol // 200 OK</span>
              </div>
              <pre className="p-6 text-[11px] font-mono text-emerald-100/70 overflow-x-auto max-h-[300px] custom-scrollbar">
                {JSON.stringify(selectedEndpoint.response, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {!showResponse && !isLoading && (
          <div className="p-12 border border-dashed border-emerald-900/20 rounded-2xl flex flex-col items-center justify-center text-center opacity-40">
            <Globe className="w-8 h-8 text-emerald-900 mb-4" />
            <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-900">Waiting for Request...</div>
          </div>
        )}
      </div>
    </div>
  );
}
