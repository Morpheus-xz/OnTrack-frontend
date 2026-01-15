import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { supabase } from "../lib/supabase";
import {
  Github,
  Code2,
  Cpu,
  BrainCircuit,
  ChevronRight,
  Terminal,
  Activity,
  Fingerprint,
  Zap,
  Layers,
  ShieldCheck,
  Search
} from "lucide-react";

export default function Assessment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const [form, setForm] = useState({
    skill_summary: "",
    interests: "",
    github_username: "",
    leetcode_username: "",
  });

  // --- 🧊 LENIS SMOOTH SCROLL INITIALIZATION ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analysisLabels = [
  "Understanding what you enjoy working on…",
  "Reading your skills and experience…",
  "Understanding what you enjoy working on…",
  "Comparing with real hiring data…",
  "Building your personal career roadmap…"
];


  const submit = async () => {
    // 1. Validation check
    if (!form.skill_summary || !form.interests) return;
    setLoading(true);

    // 2. UI Loading Animation Interval
    let step = 0;
    const interval = setInterval(() => {
      if (step < analysisLabels.length - 1) {
        step++;
        setAnalysisStep(step);
      }
    }, 1500);

    try {
      // 3. Get User Session (Fixed Redeclaration)
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        alert("Session expired. Please login again.");
        navigate("/auth");
        return;
      }

      const currentUser = authData.user;

      // 4. Database Sync (Using the correctly named currentUser)
      // We delete existing records first to prevent duplicates for this user
      const { error: insertError } = await supabase
  .from("user_assessment")
  .upsert({
    user_id: currentUser.id,
    skill_summary: form.skill_summary,
    interests: form.interests,
    github_username: form.github_username || null,
    leetcode_username: form.leetcode_username || null,
  }, {
    onConflict: ["user_id"]
  });


      if (insertError) throw insertError;

      // 5. Trigger AI Backend
      // Ensure your backend is running on port 8000
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/run-ai/${currentUser.id}`, {
        method: "POST"
      });

      // 6. Cleanup and Navigation
      clearInterval(interval);
      navigate("/dashboard");
    } catch (error) {
      console.error("Assessment Error:", error);
      alert("System sync failed. Please check your connection.");
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center py-12 px-6 antialiased selection:bg-blue-500/30">

      {/* --- 📡 NEURAL SCAN OVERLAY --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#05060f]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-10"
          >
            <div className="relative mb-12">
               <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.5)] border border-white/20 overflow-hidden">
  <img
    src="/ontracklogo.png"
    alt="OnTrack"
    className="w-14 h-14 object-contain animate-pulse"
  />
</div>

               <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] border-t-2 border-b-2 border-blue-500 rounded-full"
               />
            </div>
            <div className="text-center space-y-4">
                <motion.h2
                key={analysisStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-mono font-black tracking-[0.5em] text-blue-500 uppercase"
                >
                {analysisLabels[analysisStep]}
                </motion.h2>
                <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="h-full bg-blue-600 shadow-[0_0_15px_#2563eb]"
                    />
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 🧭 BRAND ANCHOR --- */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-16 border-b border-white/5 pb-8">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">OT</div>
          <span className="text-xl font-black tracking-tighter uppercase">On<span className="text-blue-500">Track</span></span>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Current Step</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-500">Understanding You</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <Activity size={18} className="text-slate-500" />
            </div>
        </div>
      </header>

      {/* --- 🗄️ MAIN ASSESSMENT BENTO --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 relative"
      >
        {/* Decorative Grid Flair */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Search size={200} className="text-blue-500" />
        </div>

        {/* Left Info Column */}
        <div className="lg:col-span-4 p-12 lg:p-16 border-r border-white/5 bg-gradient-to-b from-blue-600/10 to-transparent flex flex-col justify-between">
          <div className="space-y-10">
            <div className="flex items-center gap-3 text-blue-500">
              <Zap size={20} fill="currentColor" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">Your career profile</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Tell us about<br />your skills
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              This information helps us understand your current level and your interests,
so we can recommend roles and learning paths that actually fit you.

            </p>
          </div>

          <div className="pt-16 space-y-5">
             {[
               { icon: <Cpu size={14} />, text: "Understanding your background" },
               { icon: <Activity size={14} />, text: "Matching you with real job roles" },
               { icon: <ShieldCheck size={14} />, text: "Your data is private and secure" }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.text}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-8 p-12 lg:p-20 space-y-16 bg-black/20">
          <div className="space-y-12">
            <DataField
              label="What you already know"

              icon={<Terminal size={18} />}
              name="skill_summary"
              value={form.skill_summary}
              onChange={handle}
              placeholder="For example: I know Python, some ML, basic React, built a few projects…"

              isTextArea
            />
            <DataField
              label="What you want to work on"

              icon={<BrainCircuit size={18} />}
              name="interests"
              value={form.interests}
              onChange={handle}
              placeholder="For example: iOS development, startups, data science, backend systems…"

              isTextArea
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <DataField
              label="GitHub username (optional)"

              icon={<Github size={18} />}
              name="github_username"
              value={form.github_username}
              onChange={handle}
              placeholder="e.g. xyz123"
            />
            <DataField
              label="LeetCode username (optional)"

              icon={<Code2 size={18} />}
              name="leetcode_username"
              value={form.leetcode_username}
              onChange={handle}
              placeholder="e.g. abc123"
            />
          </div>

          {/* Action Row */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">Analysis Status</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 animate-pulse">Ready to proceed</span>
             </div>

             <button
                onClick={submit}
                disabled={loading || !form.skill_summary || !form.interests}
                className="group relative flex items-center gap-6 px-14 py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-slate-700 transition-all rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 active:scale-95"
             >
                <span className="text-[11px] font-black uppercase tracking-[0.4em] relative z-10">Get my career roadmap

</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
             </button>
          </div>
        </div>
      </motion.div>

      {/* --- 📡 TELEMETRY FOOTER --- */}
      <footer className="w-full max-w-6xl mt-12 flex justify-between items-center px-4 opacity-40">
         <div className="flex gap-10">
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em] text-slate-500">Your data is private</span>
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em] text-slate-500">Used only to personalize your roadmap</span>
         </div>
         <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em] text-blue-500">© 2026 OnTrack</span>
      </footer>
    </div>
  );
}

// --- REFINED DATA FIELD COMPONENT ---

function DataField({ label, icon, isTextArea, ...props }) {
  return (
    <div className="group flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 group-focus-within:text-blue-500 group-focus-within:border-blue-500/50 transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 group-focus-within:text-blue-400 transition-all">
          {label}
        </span>
      </div>
      {isTextArea ? (
        <textarea
          {...props}
          className="w-full bg-white/[0.03] border border-white/10 p-8 rounded-3xl outline-none text-white font-mono text-[11px] tracking-widest placeholder:text-slate-800 focus:border-blue-500/50 focus:bg-white/[0.06] transition-all min-h-[160px] resize-none leading-relaxed shadow-inner"
        />
      ) : (
        <input
          {...props}
          autoComplete="off"
          className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 rounded-2xl outline-none text-white font-mono text-[11px] tracking-widest placeholder:text-slate-800 focus:border-blue-500/50 focus:bg-white/[0.06] transition-all shadow-inner"
        />
      )}
    </div>
  );
}