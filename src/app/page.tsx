import { SYSTEM_VERSION } from '@/lib/constants';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-emerald-500 font-mono p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl border border-emerald-900/50 bg-black/50 p-6 rounded-lg shadow-2xl shadow-emerald-900/20">
        <div className="flex items-center justify-between mb-8 border-b border-emerald-900/30 pb-4">
          <div className="text-sm opacity-70 uppercase tracking-widest">
            System Initialization
          </div>
          <div className="text-sm font-bold">
            v{SYSTEM_VERSION}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">[●]</span>
            <span>Initializing profile-service...</span>
            <span className="ml-auto text-emerald-400">HEALTHY</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">[●]</span>
            <span>Loading projects-service...</span>
            <span className="ml-auto text-emerald-400">HEALTHY</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">[●]</span>
            <span>Connecting experience-service...</span>
            <span className="ml-auto text-emerald-400">HEALTHY</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">[●]</span>
            <span>Bootstrapping analytics-service...</span>
            <span className="ml-auto text-emerald-400">HEALTHY</span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900/30 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">
            MOHITH
          </h1>
          <p className="text-emerald-400/70 mb-8 text-center max-w-md">
            Backend Engineer | System Architect | Security Specialist
            <br />
            > Building scalable distributed systems
          </p>
          
          <button className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40 uppercase tracking-widest text-sm">
            Access System
          </button>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex gap-8 text-[10px] uppercase tracking-widest opacity-40">
        <div>4 Internships</div>
        <div>12+ Projects</div>
        <div>6 Services Running</div>
        <div>99.9% Uptime</div>
      </div>
    </main>
  );
}
