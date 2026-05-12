"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

const COMMANDS: Record<string, string> = {
  help: 'Available commands: help, ls, whoami, clear, exit, system-status, rollback',
  ls: 'projects/  experience/  skills/  analytics/  versions/',
  whoami: 'SYSTEM: MOHITH_ADMIN v4.0.0-STABLE | Role: System Architect',
  'system-status': 'ALL SERVICES HEALTHY. Uptime: 99.98%. Nodes active: 06.',
  rollback: 'Navigate to /dashboard/versions to initialize system state rollback.',
};

export const TerminalCLI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(['Welcome to Portfolio_OS CLI.', 'Type "help" for a list of commands.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response = `Command not found: ${cmd}. Type "help" for options.`;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      setIsOpen(false);
      setInput('');
      return;
    }

    if (COMMANDS[cmd]) {
      response = COMMANDS[cmd];
    }

    setHistory([...history, `> ${input}`, response]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none"
        >
          <div className="w-full max-w-3xl h-[500px] bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl shadow-emerald-500/10 flex flex-col pointer-events-auto overflow-hidden">
            {/* Header */}
            <div className="bg-emerald-500/10 px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TerminalIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">System_CLI // Portfolio_OS</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-500/10 p-1 rounded transition-colors">
                <X className="w-4 h-4 text-emerald-500/50" />
              </button>
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-2 custom-scrollbar"
            >
              {history.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? "text-emerald-400" : "text-emerald-500/60"}>
                  {line}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex gap-2 text-emerald-400">
                <span>{">"}</span>
                <input 
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 lowercase"
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
