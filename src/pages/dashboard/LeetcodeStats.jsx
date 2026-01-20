import { useEffect, useState } from "react";
import { Code2, Terminal, Activity } from "lucide-react";

export default function LeetcodeStats({ assessment }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = assessment?.leetcode_username || assessment?.leetcode_handle;

  useEffect(() => {
    async function fetchLeetcodeData() {
      try {
        const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`).then(res => res.json());
        if (r.status === "success") setStats(r);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    if (username) fetchLeetcodeData();
  }, [username]);

  if (!username) return <StatusFrame message="No LeetCode profile connected" />;
  if (loading) return <StatusFrame message="Loading LeetCode data…" />;

  return (
    <div className="space-y-6 font-mono animate-in fade-in duration-500">

      {/* --- HEADER --- */}
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Leetcode Profile</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.5em]">Connected to Leetcode</span>
          </div>
        </div>
        <div className="text-right">
            <span className="block text-[10px] font-black text-slate-700 uppercase tracking-widest">Operator</span>
            <span className="text-sm font-black text-blue-500 uppercase">{username}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
            {/* LARGE METRIC */}
            <div className="bg-white/[0.01] border border-white/5 p-12 flex justify-between items-end group hover:border-blue-500/30 transition-all duration-500">
                <div>
                    <span className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Problems solved</span>
                    <span className="text-9xl font-black text-white tracking-tighter leading-none group-hover:text-blue-500 group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                        {stats.totalSolved}
                    </span>
                </div>
                <div className="text-right pb-2">
                    <span className="block text-[9px] font-black text-slate-700 uppercase tracking-widest mb-1">Global rank</span>
                    <span className="text-2xl font-black text-amber-500 italic">#{stats.ranking?.toLocaleString()}</span>
                </div>
            </div>

            {/* THREE-GRID DIFFICULTY */}
            <div className="grid grid-cols-3 gap-6">
                <MetricModule label="Easy" title="Easy" val={stats.easySolved} color="border-emerald-500/50" accent="bg-emerald-500" />
                <MetricModule label="Medium" title="Medium" val={stats.mediumSolved} color="border-amber-500/50" accent="bg-amber-500" />
                <MetricModule label="Hard" title="Hard" val={stats.hardSolved} color="border-red-500/50" accent="bg-red-500" />
            </div>
        </div>

        {/* LOG SIDEBAR */}
        <div className="lg:col-span-4 border border-white/5 bg-white/[0.01] p-10 flex flex-col justify-between backdrop-blur-sm">
            <div>
                <div className="flex items-center gap-2 text-blue-500 mb-8 text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                    <Terminal size={14} /> Profile details
                </div>
                <div className="space-y-6">
                    <LogEntry label="Contribution points" val={stats.contributionPoints} color="text-white" />
                    <LogEntry label="Reputation" val={stats.reputation} color="text-white" />
                    <LogEntry label="Profile status" val="99.9%" color="text-emerald-500" />
                </div>
            </div>
            <div className="pt-10 space-y-4">
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                   <p className="text-[8px] text-blue-400 font-black uppercase tracking-widest leading-loose">
                      This data helps us understand your problem-solving level and match you with the right career path.

                   </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function MetricModule({ label, title, val, color, accent }) {
    return (
        <div className={`bg-white/[0.01] border-l-4 ${color} border-y border-r border-white/5 p-8 group hover:bg-white/[0.03] transition-all`}>
            <span className="block text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] mb-6">{label}</span>
            <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</span>
            <span className="text-4xl font-black text-white leading-none">{val}</span>
            <div className={`h-0.5 w-full mt-6 ${accent} opacity-30`} />
        </div>
    );
}

function LogEntry({ label, val, color }) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
            <span className={`text-[10px] font-black ${color} uppercase`}>{val}</span>
        </div>
    );
}

function StatusFrame({ message }) {
    return <div className="h-[60vh] flex items-center justify-center text-[10px] font-black text-blue-500 tracking-[1em] animate-pulse uppercase">{message}</div>;
}