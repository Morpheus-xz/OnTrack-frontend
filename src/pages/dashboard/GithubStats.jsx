import { useEffect, useState } from "react";
import { Github, Terminal, Activity, GitBranch } from "lucide-react";

export default function GithubStats({ assessment }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = assessment?.github_username || assessment?.github_handle;

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const userResp = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResp.json();
        const reposResp = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        const reposData = await reposResp.json();

        let totalStars = 0;
        let languages = {};

        if (Array.isArray(reposData)) {
            reposData.forEach(repo => {
                totalStars += repo.stargazers_count;
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });
        }

        const topLang = Object.entries(languages).sort((a,b) => b[1] - a[1])[0]?.[0] || "NONE";

        setStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          top_lang: topLang,
          followers: userData.followers,
          bio: userData.bio,
          location: userData.location,
          created: userData.created_at?.slice(0, 10) || "----"
        });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    if (username) fetchGithubData();
  }, [username]);

  if (!username) return <StatusFrame message="NO GITHUB CONNECTED" />;
  if (loading) return <StatusFrame message="LOADING GITHUB DATA..." />;

  return (
    <div className="space-y-6 font-mono animate-in fade-in duration-500">

      {/* --- TELEMETRY HEADER --- */}
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Github Overview</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-700 shadow-[0_0_10px_#3b82f6]" />
            <span className="text-[9px] font-black text-green-700 uppercase tracking-[0.5em]">Connected to GitHub</span>
          </div>
        </div>
        <div className="text-right">
            <span className="block text-[10px] font-black text-slate-700 uppercase tracking-widest">Username</span>
            <span className="text-sm font-black text-blue-500 bold">{username}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-8 space-y-6">

            {/* PRIMARY INFLUENCE MODULE */}
            <div className="bg-white/[0.01] border border-white/5 p-12 flex justify-between items-end group hover:border-blue-500/20 transition-all duration-500 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px]" />

                <div className="relative z-10">
                    <span className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Total GitHub Stars</span>
                    <span className="text-9xl font-black text-white tracking-tighter leading-none group-hover:text-yellow-500 transition-colors duration-500">{stats.stars}</span>
                </div>
                <div className="text-right pb-2 relative z-10">
                    <span className="block text-[9px] font-black text-slate-700 uppercase tracking-widest mb-1">Followers</span>
                    <span className="text-2xl font-black text-white italic">+{stats.followers}</span>
                </div>
            </div>

            {/* THREE-GRID MODULES */}
            <div className="grid grid-cols-3 gap-6">
                <MetricModule label="Node_Init" title="Joined" val={stats.created} color="border-blue-500/50" accent="bg-blue-500" />
                <MetricModule label="Projects" title="Repositories" val={stats.repos} color="border-purple-500/50" accent="bg-purple-500" />
                <MetricModule label="Most Used" title="Primary_Lang" val={stats.top_lang} color="border-emerald-500/50" accent="bg-emerald-500" />
            </div>
        </div>

        {/* --- DIAGNOSTIC SIDEBAR --- */}
        <div className="lg:col-span-4 border border-white/5 bg-white/[0.01] p-10 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
            <Github size={120} className="absolute -bottom-10 -right-10 opacity-[0.03] text-blue-500" />

            <div>
                <div className="flex items-center gap-2 text-blue-500 mb-8 text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                    <Activity size={14} /> Profile Details
                </div>
                <div className="space-y-6">
                    <LogEntry label="Location" val={stats.location || "GLOBAL"} color="text-white" />
                    <LogEntry label="Profile Type" val="Public" color="text-slate-400" />
                    <LogEntry label=" Account Status" val="Active" color="text-emerald-500" />
                </div>
            </div>

            <div className="pt-10">
                <span className="block text-[9px] font-black text-slate-700 uppercase tracking-widest mb-4">Github Bio</span>
                <p className="text-[11px] text-slate-400 uppercase leading-relaxed font-black border-l-2 border-blue-500/30 pl-4">
                    {stats.bio || "No bio available on GitHub."}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

// Re-use components with updated props
function MetricModule({ label, title, val, color, accent }) {
    return (
        <div className={`bg-white/[0.01] border-l-4 ${color} border-y border-r border-white/5 p-8 group hover:bg-white/[0.03] transition-all`}>
            <span className="block text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] mb-6">{label}</span>
            <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</span>
            <span className="text-2xl font-black text-white leading-none truncate block uppercase tracking-tighter">{val}</span>
            <div className={`h-0.5 w-full mt-6 ${accent} opacity-20`} />
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