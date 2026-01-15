import { motion } from "framer-motion";
import { Activity, Target, Zap, ShieldCheck, ChevronRight, Terminal } from "lucide-react";

export default function DashboardHome({ onboarding, state }) {
  const firstName = onboarding?.full_name?.split(" ")[0] || "OPERATOR";

  return (
    <div className="space-y-12 pb-20 font-mono animate-in fade-in duration-700 selection:bg-blue-500/30">

      {/* === TACTICAL SYSTEM BANNER === */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-3 text-green-500">
          <Activity size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em]">
            Online • {new Date().getFullYear()}

          </span>
        </div>
        <div className="text-[9px] font-black text-slate-700 uppercase tracking-widest">
          Session: {onboarding?.user_id?.slice(0, 8) || "AUTH_OK"}
        </div>
      </div>

      {/* === MONOLITHIC HERO === */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">You're all set
</span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
                Welcome, <br />
                <span className="text-blue-500">{firstName}.</span>
            </h1>
        </div>
        <p className="text-slate-500 max-w-xl text-[11px] font-black uppercase leading-relaxed tracking-widest italic border-l-2 border-blue-500/20 pl-6">
          We’ve analyzed your skills, interests, and goals.   <br />
          Here’s the career path that fits you best right now.
        </p>
      </motion.header>

      {/* === STRATEGIC BENTO GRID === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 border-t border-white/5 pt-1">

        {/* Career Core: Left Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 p-12 bg-white/[0.01] border border-white/5 relative overflow-hidden group hover:bg-white/[0.02] transition-all duration-500"
        >
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 text-blue-500 mb-12 border-b border-white/5 pb-4 w-fit pr-10">
                <Target size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Your recommended role
</span>
            </div>

            <div className="flex-1">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white group-hover:text-blue-400 transition-colors">
                    {state?.current_career || "INITIALIZING..."}
                </h2>

                <p className="text-slate-500 leading-relaxed text-xs uppercase tracking-widest max-w-xl font-black italic">
                    {state?.career_explanation || "We’re analyzing your profile to find the best match."}

                </p>
            </div>

            <Zap
                className="absolute -bottom-10 -right-10 text-blue-500/5 group-hover:text-blue-500/10 transition-all duration-700"
                size={300}
            />
          </div>
        </motion.div>

        {/* System Health: Right Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 p-10 bg-black border border-white/10 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden"
        >
          <div className="space-y-12">
            <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <Terminal size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Your Progress
              </span>
            </div>

            <div className="space-y-6">
              <StatusRow label="Career direction" val="On Track" />
              <StatusRow label="Learning plan" val="Ready" />
              <StatusRow label="Difficulty level" val="Balanced" />
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-700">
                <span>Career system</span>
                <span className="text-emerald-500">Running</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusRow({ label, val }) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] group-hover:text-slate-400 transition-colors">
        {label}
      </span>
      <div className="h-[1px] flex-1 mx-4 bg-white/5" />
      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
        {val}
      </span>
    </div>
  );
}