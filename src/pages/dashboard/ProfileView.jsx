import { RefreshCw, ShieldCheck, Calendar, Clock, Terminal, Fingerprint, Database, ChevronRight, Activity, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileView({ onboarding, assessment }) {
  const navigate = useNavigate();

  return (
    <div className="font-mono text-white pb-20 selection:bg-blue-500/30">

      {/* === TOP HUD: OPERATOR IDENTITY === */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-black/40 backdrop-blur-xl mb-1">
        <div className="lg:col-span-8 p-12 flex items-center gap-10 border-r border-white/10 relative overflow-hidden">
          {/* Background Grid Accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />

          <div className="relative">
            <div className="w-32 h-32 bg-blue-600/5 border border-blue-500/30 flex items-center justify-center text-6xl font-black text-white shadow-[0_0_50px_rgba(59,130,246,0.1)] relative z-10">
                {onboarding?.full_name?.charAt(0) || "U"}
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white">
                <Fingerprint size={16} />
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div>
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.5em] block mb-2">Verified Profile
</span>
                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
                    {onboarding?.full_name || "Your Profile\n"}
                </h2>
            </div>
            <div className="flex gap-6 items-center text-[10px] font-black text-slate-700 uppercase tracking-widest">
                <span className="flex items-center gap-2 italic text-emerald-500"><Activity size={10} /> Status: Active
</span>
                <span className="flex items-center gap-2 italic text-yellow-500"><ShieldCheck size={10} /> Account: Standard
</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-12 flex flex-col justify-center items-center bg-white/[0.01]">
          <button
            onClick={() => navigate("/assessment")}
            className="group w-full flex items-center justify-between px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="flex flex-col items-start">
                <span className="text-[11px] font-black uppercase tracking-widest">Update My Career Data
</span>
                <span className="text-[8px] font-black opacity-60 uppercase tracking-widest">Run the career assessment again
</span>
            </div>
            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {/* === TELEMETRY GRID: HARDWARE SPECS === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-1">
        <NodeTile label="College / University" value={onboarding?.college || "Not provided"} icon={<Box size={14} />} />
        <NodeTile label="Current Year" value={onboarding?.year ? `${onboarding.year}` : "N/A"} icon={<Calendar size={14} />} />
        <NodeTile label="Daily Study Time" value={`${onboarding?.daily_hours || "0"} hours per day`}
 icon={<Clock size={14} />} />
      </div>

      {/* === ARTIFACTS & SYSTEM REGISTRY === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">

        {/* Left: Logic Ingestion History */}
        <div className="lg:col-span-8 p-12 bg-white/[0.01] border border-white/10 space-y-12 relative">
            <div className="flex items-center gap-3 text-white border-b border-white/5 pb-6">
              <Terminal size={16} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Your Career Inputs</span>
            </div>

            <div className="grid grid-cols-1 gap-12">
                <LogEntry
                    label="Your Skills"
                    content={assessment?.skill_summary || "Not submitted yet"}
                />
                <LogEntry
                    label="Your Interests"
                    content={assessment?.interests || "Not submitted yet"}
                />
            </div>
        </div>

        {/* Right: Registry Links */}
        <div className="lg:col-span-4 p-12 bg-black border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 text-white mb-10 pb-4 border-b border-white/10">
                    <Database size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Connected Accounts
</span>
                </div>
                <div className="space-y-6">
                    <RegistryRow label="Assessment Status
" val={assessment ? "Verified" : "Not completed"} active={!!assessment} />
                    <RegistryRow label="GitHub" val={assessment?.github_username || "None"} active={!!assessment?.github_username} />
                    <RegistryRow label="LeetCode" val={assessment?.leetcode_username || "None"} active={!!assessment?.leetcode_username} />
                </div>
            </div>

            <div className="relative z-10 pt-20">
                <div className="p-4 bg-blue-600/5 border border-blue-500/10 flex items-center gap-4">
                    <Activity size={14} className="text-blue-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-700 italic leading-loose">
                        Your data is securely stored and used only to personalize your career roadmap.

                    </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

/* --- TACTICAL COMPONENTS --- */

function NodeTile({ label, value, icon }) {
  return (
    <div className="p-10 bg-white/[0.01] border border-white/10 hover:bg-white/[0.03] transition-all group">
      <div className="flex items-center gap-3 text-slate-700 mb-6 uppercase tracking-[0.4em] text-[9px] font-black group-hover:text-blue-500 transition-colors">
        {icon} {label}
      </div>
      <p className="text-2xl font-black uppercase tracking-tighter text-white truncate italic">{value}</p>
    </div>
  );
}

function LogEntry({ label, content }) {
    return (
        <div className="space-y-4">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] block">{label}</span>
            <div className="text-[11px] text-slate-400 font-black uppercase tracking-widest leading-loose bg-white/[0.02] p-8 border border-white/5 relative group">
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-all" />
                {`> ${content}`}
            </div>
        </div>
    );
}

function RegistryRow({ label, val, active }) {
    return (
        <div className="flex justify-between items-center group">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                {label}
            </span>
            <div className="h-[1px] flex-1 mx-4 bg-white/5" />
            <span className={`text-[10px] font-black uppercase tracking-tighter ${active ? 'text-blue-500' : 'text-red-500/50'}`}>
                {val}
            </span>
        </div>
    );
}