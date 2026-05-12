"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  RefreshCcw,
  Key
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'INQUIRY',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setResponse({
        status: 200,
        message: "Contact protocol initialized successfully.",
        timestamp: new Date().toISOString(),
        request_id: Math.random().toString(36).substring(7).toUpperCase(),
        data: {
          recipient: "MOHITH_ADMIN",
          priority: "HIGH"
        }
      });
    }, 2000);
  };

  const curlCommand = `curl -X POST https://api.buildbymohith.in/v1/contact \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "${formData.name || 'YOUR_NAME'}",
    "email": "${formData.email || 'YOUR_EMAIL'}",
    "message": "${formData.message || 'YOUR_MESSAGE'}"
  }'`;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded uppercase">POST</div>
          <h1 className="text-3xl font-mono text-white">/api/v1/contact</h1>
        </div>
        <p className="text-emerald-500/60 text-sm">Initialize a secure communication protocol with the system administrator.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* API Playground / Form */}
        <section className="bg-black/40 border border-emerald-900/30 rounded-xl overflow-hidden">
          <div className="bg-emerald-900/10 px-6 py-4 border-b border-emerald-900/30 flex items-center justify-between">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Interactive Playground</h2>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-emerald-500/40 uppercase tracking-widest mb-2 block">Sender_Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/60 border border-emerald-900/30 rounded px-4 py-3 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] text-emerald-500/40 uppercase tracking-widest mb-2 block">Sender_Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/60 border border-emerald-900/30 rounded px-4 py-3 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g. john@example.com"
                />
              </div>
              <div>
                <label className="text-[10px] text-emerald-500/40 uppercase tracking-widest mb-2 block">Request_Body</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full bg-black/60 border border-emerald-900/30 rounded px-4 py-3 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="Enter your message protocol here..."
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className={cn(
                "w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all",
                status === 'sending' 
                  ? "bg-emerald-900/20 text-emerald-500/50 cursor-not-allowed" 
                  : "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-[0.98]"
              )}
            >
              {status === 'sending' ? (
                <>
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Execute POST Request
                </>
              )}
            </button>
          </form>
        </section>

        {/* Documentation & Curl */}
        <div className="space-y-8">
          <section className="bg-emerald-900/5 border border-emerald-900/20 rounded-xl p-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Key className="w-3 h-3 text-emerald-500" />
              Request Headers
            </h3>
            <div className="space-y-4 font-mono text-[11px]">
              <div className="flex justify-between border-b border-emerald-900/10 pb-2">
                <span className="text-emerald-500/40">Content-Type</span>
                <span className="text-emerald-300">application/json</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/10 pb-2">
                <span className="text-emerald-500/40">Authorization</span>
                <span className="text-emerald-300">Bearer ************</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/10 pb-2">
                <span className="text-emerald-500/40">Rate-Limit</span>
                <span className="text-emerald-300">5 req/hour</span>
              </div>
            </div>
          </section>

          <section className="bg-black border border-emerald-900/30 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-emerald-900/10 border-b border-emerald-900/30 flex items-center justify-between">
              <span className="text-[9px] font-bold text-emerald-500/60 uppercase font-mono">Example Curl</span>
              <button 
                onClick={() => navigator.clipboard.writeText(curlCommand)}
                className="p-1 hover:bg-emerald-500/10 rounded transition-colors"
              >
                <Copy className="w-3 h-3 text-emerald-500/40" />
              </button>
            </div>
            <pre className="p-4 text-[10px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {curlCommand}
            </pre>
          </section>

          <AnimatePresence>
            {status === 'success' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">HTTP 200 OK</span>
                </div>
                <pre className="text-[10px] text-emerald-400/80 font-mono overflow-x-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
