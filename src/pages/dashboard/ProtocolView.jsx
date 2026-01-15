import { motion } from "framer-motion";
import { Terminal, Shield, Activity, Target, Cpu, ChevronRight } from "lucide-react";

export default function ProtocolView({ state }) {
  return (
    <div className="font-mono text-white pb-20 selection:bg-blue-500/30">

      {/* === TOP HUD: SYSTEM NAVIGATION === */}
      <div className="flex justify-between items-center mb-16 opacity-50 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <Terminal size={12} />
          <span className="text-[9px] font-black uppercase tracking-[0.5em]">
            Your profile → {state?.current_career || "Career being prepared"}

          </span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-widest tabular-nums">
          Account Status: <span className="text-emerald-500">Active</span>
        </div>
      </div>

      <div className="space-y-1">

        {/* === SECTION 01: MISSION DIRECTIVE === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-white/[0.01]">
          <div className="lg:col-span-4 p-8 border-r border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8">
              Your career goal

            </span>
            <div className="space-y-2">
              <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Target role</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">
                {state?.current_career || "Being analysed"}
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8 p-12 flex flex-col justify-center">
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-2xl font-black uppercase tracking-widest italic border-l-2 border-white/5 pl-8">
              {state?.career_explanation}

            </p>
          </div>
        </div>

        {/* === SECTION 02: COMPETENCY MATRIX === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mt-1">
          {/* Missing Gaps */}
          <div className="lg:col-span-6 bg-white/[0.01] border border-white/10 p-10 group transition-all hover:bg-red-500/[0.02]">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/50">Skills you need to learn
</span>
              <Shield size={14} className="text-red-500/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {state?.missing_skills?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 group/item">
                  <div className="w-1 h-1 bg-red-500/40" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/item:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Assets */}
          <div className="lg:col-span-6 bg-white/[0.01] border border-white/10 p-10 group transition-all hover:bg-emerald-500/[0.02]">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/50">Skills you already have
</span>
              <Activity size={14} className="text-emerald-500/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {state?.current_skills?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 group/item">
                  <div className="w-1 h-1 bg-emerald-500/40 shadow-[0_0_8px_#10b981]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/item:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === SECTION 03: SYSTEM TELEMETRY === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 bg-black/40 mt-1">
          <TelemetryBlock label="Career engine" val="Active" />
<TelemetryBlock label="Data security" val="Protected" />
<TelemetryBlock label="Profile status" val="Up to date" />
<TelemetryBlock label="Learning system" val="Ready" />

        </div>
      </div>

      {/* FOOTER ACCENT */}
      <div className="mt-12 flex items-center gap-4 opacity-20">
        <div className="h-[1px] flex-1 bg-white/10" />
        <span className="text-[8px] font-black uppercase tracking-[1em]">Your career profile is ready
</span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>
    </div>
  );
}

/* --- TACTICAL COMPONENTS --- */

function TelemetryBlock({ label, val }) {
  return (
    <div className="p-8 border-r border-white/10 last:border-0 flex flex-col gap-2 group hover:bg-blue-500/[0.02] transition-colors">
      <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{label}</span>
      <span className="text-[10px] font-black text-white/60 group-hover:text-blue-500 transition-colors uppercase tracking-tighter">
        {val}
      </span>
    </div>
  );
}