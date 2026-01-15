import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import {
  Terminal as TerminalIcon, Activity, Zap, Cpu as CpuIcon,
  Globe, TrendingUp, Map, Box, Database, Fingerprint, BarChart3
} from "lucide-react";

export default function Landing() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const techNodes = ["DSA", "System Design", "Backend", "Frontend", "Cloud", "DevOps"];

  // --- LENIS INITIALIZATION ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-8 relative z-10">

      {/* 1. NAVIGATION BAR - UPDATED LINKS */}
      <nav className="relative z-50 flex justify-between items-center py-8">
        <div
  className="flex items-center gap-3 cursor-pointer"
  onClick={() => navigate("/")}
>
  <img
    src="/ontracklogo.png"
    className="w-10 h-10 object-contain drop-shadow-[0_0_20px_rgba(99,102,241,0.7)]"
  />
  <span className="text-2xl font-black tracking-tighter">
    ON<span className="text-blue-500">TRACK</span>
  </span>
</div>

        <div className="hidden md:flex gap-8 text-sm text-slate-400 font-medium uppercase tracking-widest">
          {/* Linked to Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-white transition bg-transparent border-none cursor-pointer uppercase tracking-widest text-[11px] font-black"
          >
            Dashboard
          </button>
          {/* Linked to Roadmap */}
          <button
            onClick={() => navigate("/roadmap")}
            className="hover:text-white transition bg-transparent border-none cursor-pointer uppercase tracking-widest text-[11px] font-black"
          >
            Roadmap
          </button>
          {/* Linked to AICoach */}
          <button
            onClick={() => navigate("/aicoach")}
            className="hover:text-white transition bg-transparent border-none cursor-pointer uppercase tracking-widest text-[11px] font-black"
          >
            AICoach
          </button>
        </div>
        <button
          onClick={() => navigate("/auth")}
          className="px-6 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
        >
          Sign In
        </button>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] gap-12">

        {/* Left: Branding & CTA */}
        <div className="w-full lg:w-1/2 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Activity size={12} /> AI Career Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl font-black leading-tight tracking-tighter pb-6"
          >
            Career Intelligence
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 bg-clip-text text-transparent inline-block py-2">
              Engineered For You
            </span>
          </motion.h1>

          <p className="mt-4 text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              OnTrack uses real skill data and <strong>real hiring signals</strong>.
              to create a living roadmap for your engineering career.
              <strong> No guesswork. No fake promises.</strong>
          </p>

          <div className="mt-12">
            <button
              onClick={() => navigate("/auth")}
              className="group relative px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all text-lg font-black shadow-[0_20px_60px_rgba(37,99,235,0.4)] overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">Initiate Analysis <Zap size={18} fill="currentColor"/></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>

        {/* Right: HIGH-FREQUENCY ROTATING CORE */}
        <div className="w-full lg:w-1/2 relative h-[650px] flex items-center justify-center">
          <div className="relative z-20 w-40 h-40 rounded-[3rem] bg-black flex items-center justify-center shadow-[0_0_180px_rgba(99,102,241,0.8)] border border-blue-500/40">
  <img
    src="ontracklogo.png "
    alt="OnTrack"
    className="w-24 h-24 object-contain z-10 drop-shadow-[0_0_40px_rgba(99,102,241,1)]"
  />
  <div className="absolute inset-0 rounded-[3rem] bg-indigo-500/20 animate-ping" />
</div>


          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
             <circle cx="50%" cy="50%" r="280" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="2 6" className="animate-spin-slow" />
             <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

             <motion.line
                x1="50%" y1="50%" x2="50%" y2="10%"
                stroke="rgba(59,130,246,0.3)" strokeWidth="2"
                className="origin-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
             />
          </svg>

          {techNodes.map((n, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                style={{ transform: `rotate(${i * (360 / techNodes.length)}deg) translateY(-280px)` }}
                className="pointer-events-auto"
              >
                <motion.div
                   animate={{ rotate: -360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   whileHover={{ scale: 1.1, backgroundColor: "#1e293b" }}
                   className="px-6 py-2 rounded-full bg-slate-900 border border-blue-500/30 text-[9px] font-black uppercase tracking-[0.2em] text-blue-300 shadow-2xl backdrop-blur-3xl flex items-center gap-2 group"
                >
                  <Activity size={10} className="group-hover:text-white transition-colors"/> {n}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. PROFESSIONAL CORE ARCHITECTURE */}
      <div className="pt-48 pb-32 border-t border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-10">
            <h2 className="text-6xl font-black tracking-tighter mb-12 leading-[0.9]">
              Professional <br /> <span className="text-blue-500">Core Architecture.</span>
            </h2>
            <div className="space-y-4">
              {[
                { icon: <CpuIcon size={20}/>, name: "SKILL PROFILER", desc: "Logic & DSA extraction from raw user aptitude." },
                { icon: <Globe size={20}/>, name: "MARKET PULSE", desc: "Real-time sync with hiring data from Tier-1 tech hubs." },
                { icon: <TrendingUp size={20}/>, name: "GAP ANALYZER", desc: "Automated deficiency reports based on role benchmarks." },
                { icon: <Map size={20}/>, name: "ROADMAP ARCHITECT", desc: "Build-to-hire plans with GitHub-bound artifacts." }
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-8 p-8 rounded-3xl bg-slate-900/20 border border-slate-800 hover:border-blue-500/40 transition-all cursor-default">
                  <div className="p-4 rounded-2xl bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-white">{item.name}</h4>
                    <p className="text-slate-500 font-light text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative p-8 rounded-3xl border border-slate-800 bg-black/60 font-mono text-xs shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <div className="flex justify-between items-center mb-6 text-slate-500 border-b border-slate-800 pb-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-500/40">OnTrack_Kernel_CLI</span>
                </div>
                <div className="space-y-3">
                    <p className="text-blue-400"> {">"} npm run initiate --target=CAREER_SUCCESS</p>
                    <p className="text-slate-400 font-bold tracking-tighter"> [OK] Latency: 14ms | Uptime: 99.9%</p>
                    <p className="text-green-500 font-bold"> [SUCCESS] Roadmap Architect Initialized.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-[8px] text-slate-600 uppercase">Employability Delta</span>
                        <span className="text-xl font-black text-white">+32.4%</span>
                    </div>
                    <Activity className="text-blue-500 animate-pulse" size={24}/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex flex-col items-center text-center">
                    <Box className="text-blue-400 mb-2" size={18}/>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-tight">Dockerized <br/> Environments</span>
                </div>
                <div className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 flex flex-col items-center text-center">
                    <Database className="text-indigo-400 mb-2" size={18}/>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-tight">PostgreSQL <br/> Integration</span>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col items-center text-center group hover:border-blue-500/20">
                    <Zap className="text-blue-500 mb-2" size={18}/>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-tight">Real-Time <br/> Telemetry</span>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col items-center text-center group hover:border-blue-500/20">
                    <Fingerprint className="text-blue-500 mb-2" size={18}/>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-tight">Artifact <br/> Verification</span>
                </div>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm relative overflow-hidden flex items-center justify-between group">
                <div className="flex flex-col relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Global Telemetry Sync</span>
                    </div>
                    <span className="text-sm font-bold text-slate-300">Tracking 4,200+ Market Signals</span>
                </div>
                <BarChart3 className="text-blue-500/20 absolute -right-4 -bottom-4 w-24 h-24" />
                <div className="flex gap-1 items-end h-8 relative z-10">
                    {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8].map((h, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 bg-blue-500/50 rounded-full"
                            style={{ height: `${h * 100}%` }}
                        />
                    ))}
                </div>
            </div>
          </div>
        </div>

        <footer className="mt-40 pt-20 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40 grayscale hover:opacity-100 transition-opacity">
           <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Optimized for Modern Engineering Roles</p>
           <div className="flex gap-12 text-sm font-black italic tracking-widest">
              <span>PYTHON</span> <span>NODEJS</span> <span>POSTGRES</span> <span>DOCKER</span> <span>GIT</span>
           </div>
        </footer>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 120s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}