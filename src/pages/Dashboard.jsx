import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import {
  User, LogOut, Map, BookOpen, MessageSquare,
  Terminal, Cpu, Activity, Box, LayoutDashboard,
  Github, Code2, Globe, ShieldCheck
} from "lucide-react";

// View Imports
import DashboardHome from "./dashboard/DashboardHome";
import RoadmapView from "./dashboard/RoadmapView";
import ProtocolView from "./dashboard/ProtocolView";
import CoursesView from "./dashboard/CoursesView";
import AICoachView from "./dashboard/AICoachView";
import ProfileView from "./dashboard/ProfileView";
import GithubStats from "./dashboard/GithubStats";
import LeetcodeStats from "./dashboard/LeetcodeStats";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState({ user: null, state: null, onboarding: null, assessment: null });
  const [loading, setLoading] = useState(true);

  // --- LENIS INITIALIZATION ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/auth");

      // FETCHING ALL THREE TABLES
      const [stateRes, onboardingRes, assessmentRes] = await Promise.all([
        supabase.from("users_state").select("*").eq("user_id", user.id).single(),
        supabase.from("user_onboarding").select("*").eq("user_id", user.id).single(),
        supabase.from("user_assessment").select("*").eq("user_id", user.id).single()
      ]);

      console.log("DB_STATE:", stateRes.data);
      console.log("DB_ONBOARDING:", onboardingRes.data);
      console.log("DB_ASSESSMENT:", assessmentRes.data);

      setData({
        user,
        state: stateRes.data,
        onboarding: onboardingRes.data,
        assessment: assessmentRes.data
      });

      // Delay to allow initialization sequence to play
      setTimeout(() => setLoading(false), 4000);
    }
    loadData();
  }, [navigate]);

  if (loading) return <LoadingProtocol />;

  return (
    <div className="min-h-screen bg-transparent text-white flex font-inter selection:bg-blue-500/30">
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col fixed h-screen z-50 p-8">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => navigate("/")}>
  <img
    src="/ontracklogo.png "
    alt="OnTrack Logo"
    className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
  />
  <span className="text-xl font-black uppercase tracking-tighter text-white">
    On<span className="text-blue-500">Track</span>
  </span>
</div>


        <nav className="flex-1 space-y-2">
          <NavBtn icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <NavBtn icon={<Map size={18} />} label="Roadmap" active={activeTab === "roadmap"} onClick={() => setActiveTab("roadmap")} />
          <NavBtn icon={<Box size={18} />} label="Dev Protocol" active={activeTab === "protocol"} onClick={() => setActiveTab("protocol")} />

          <div className="pt-4 pb-2 px-6 text-[8px] font-black uppercase tracking-[0.4em] text-slate-600">Technical Stats</div>
          <NavBtn icon={<Github size={18} />} label="GitHub Stats" active={activeTab === "github"} onClick={() => setActiveTab("github")} />
          <NavBtn icon={<Code2 size={18} />} label="LeetCode Stats" active={activeTab === "leetcode"} onClick={() => setActiveTab("leetcode")} />

          <div className="pt-4 pb-2 px-6 text-[8px] font-black uppercase tracking-[0.4em] text-slate-600">Learning</div>
          <NavBtn icon={<BookOpen size={18} />} label="Courses" active={activeTab === "courses"} onClick={() => setActiveTab("courses")} />
          <NavBtn icon={<MessageSquare size={18} />} label="AI Coach" active={activeTab === "coach"} onClick={() => setActiveTab("coach")} />
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-3">
          <NavBtn icon={<User size={18} />} label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
          <button onClick={() => { supabase.auth.signOut(); navigate("/"); }} className="w-full flex items-center gap-4 px-6 py-4 text-slate-500 hover:text-red-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-72 p-12 lg:p-20">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {activeTab === "dashboard" && <DashboardHome onboarding={data.onboarding} state={data.state} />}
            {activeTab === "roadmap" && <RoadmapView state={data.state} />}
            {activeTab === "protocol" && <ProtocolView state={data.state} />}
            {activeTab === "github" && <GithubStats assessment={data.assessment} />}
            {activeTab === "leetcode" && <LeetcodeStats assessment={data.assessment} />}
            {activeTab === "courses" && <CoursesView user_id={data.user.id} />}
            {activeTab === "coach" && <AICoachView onboarding={data.onboarding} state={data.state} assessment={data.assessment} />}

            {activeTab === "profile" && <ProfileView onboarding={data.onboarding} assessment={data.assessment} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all border ${active ? "bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-500/20 scale-[1.02]" : "bg-transparent border-transparent text-slate-500 hover:bg-white/5"}`}>
      {icon} <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function LoadingProtocol() {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const bootLogs = [
    "Loading your profile…",
    "Fetching your career data…",
    "Reading your skills and goals…",
    "Analyzing job market trends…",
    "Matching you with relevant roles…",
    "Identifying skill gaps…",
    "Finding learning resources…",
    "Building your personalized roadmap…",
    "Optimizing recommendations…",
    "Preparing your dashboard…",
    "Almost ready…"
  ];

  // --- SYNCED PROGRESS BAR LOGIC ---
  useEffect(() => {
    // We want to hit 100% in 4000ms (the time set in loadData)
    const totalDuration = 4000;
    const intervalTime = 40; // update every 40ms
    const increment = 100 / (totalDuration / intervalTime);

    const interval = setInterval(() => {
      setPercent(prev => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // --- SYNCED LOG ROTATION ---
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 550); // Slightly slower to match the 4s total duration
    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="h-screen bg-[#050A18] flex flex-col items-center justify-center font-mono relative overflow-hidden text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Central Core Icon */}
      <div className="relative mb-16">
        <div className="w-24 h-24 border border-blue-500/20 rounded-full flex items-center justify-center relative overflow-hidden">
            <img
  src="/ontracklogo.png"
  alt="OnTrack"
  className="w-12 h-12 object-contain z-10 animate-pulse drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
/>

            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-1/2 bg-blue-500/10 blur-xl"
            />
        </div>
        <div className="absolute -inset-4 bg-blue-500/5 blur-[40px] rounded-full animate-pulse" />
      </div>

      {/* Progress Telemetry */}
      <div className="w-full max-w-xs space-y-4 px-6 z-10">
        <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
                <Terminal size={10} className="text-blue-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol_Initialization</span>
            </div>
            {/* Using Math.floor to keep the UI surgical and clean */}
            <span className="text-[10px] font-black tabular-nums">{Math.floor(percent)}%</span>
        </div>

        {/* The Progress Bar Wrapper */}
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px] relative">
            <motion.div
                className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ ease: "linear" }} // Important: Linear ease makes it look like a real system load
            />
        </div>
      </div>

      {/* System Logs */}
      <div className="mt-12 h-10 flex items-center z-10">
        <AnimatePresence mode="wait">
            <motion.span
                key={logIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] text-center"
            >
                {bootLogs[logIndex]}
            </motion.span>
        </AnimatePresence>
      </div>

      {/* Ready Status */}
      <div className="absolute bottom-16 flex items-center gap-4 opacity-20">
        <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
        <span className="text-[8px] font-black text-white uppercase tracking-[0.8em]">Kernel_Link_Active</span>
      </div>
    </div>
  );
}