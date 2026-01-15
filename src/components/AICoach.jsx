import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Send, Brain, Cpu, ShieldCheck,
  ChevronRight, Activity, Command, Zap
} from "lucide-react";

export default function AICoachView({ onboarding, state, assessment }) {
  const [messages, setMessages] = useState([
    { role: "kernel", content: "NEURAL_LINK_ESTABLISHED. DATA_INGESTION_COMPLETE. READY_FOR_MISSION_DEBRIEF." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "operator", content: input.toUpperCase() };
    setMessages(prev => [...prev, userMsg]);

    // Simulated AI Processing
    setTimeout(() => {
        const kernelMsg = {
            role: "kernel",
            content: `INFERENCE_COMPLETE. BASED_ON_YOUR_GITHUB_STATS_AND_TARGET_ROLE_AS_${state?.current_career || 'ENGINEER'}, I_RECOMMEND_FOCUSING_ON_MODULAR_ARCHITECTURE_LOGIC.`
        };
        setMessages(prev => [...prev, kernelMsg]);
    }, 800);
    setInput("");
  };

  return (
    <div className="h-[82vh] flex flex-col font-mono animate-in fade-in zoom-in-95 duration-500 overflow-hidden">

      {/* --- TERMINAL TOP BAR --- */}
      <div className="border border-white/10 bg-black/40 p-5 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] animate-pulse" />
            <div className="flex flex-col">
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-2">
                    <Brain size={14} className="text-blue-500" /> KERNEL_COACH_v2.0
                </h2>
            </div>
        </div>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <span className="text-slate-700">Status:</span>
                <span className="text-emerald-500">Encrypted_AES_256</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-slate-700">Link:</span>
                <span className="text-blue-500">Live_Telemetry</span>
            </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-1 mt-1 overflow-hidden">

        {/* --- LEFT SIDEBAR: MISSION CONTEXT --- */}
        <div className="lg:col-span-3 border border-white/10 bg-black/20 p-8 hidden lg:flex flex-col justify-between backdrop-blur-sm">
            <div className="space-y-10">
                <div>
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest block mb-6">Active_Protocol</span>
                    <ContextItem label="Target_Role" val={state?.current_career || "ARCHITECT"} />
                    <ContextItem label="Primary_Lang" val={assessment?.top_lang || "NOT_SET"} />
                    <ContextItem label="Node_ID" val={assessment?.github_username || "ANONYMOUS"} />
                </div>

                <div className="space-y-4">
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest block">System_Checks</span>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-500/60 font-black">
                        <ShieldCheck size={12} /> IDENTITY_VERIFIED
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-blue-500/60 font-black">
                        <Zap size={12} /> LOGIC_STABLE
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                <p className="text-[8px] font-black text-slate-600 uppercase leading-loose tracking-widest">
                    Kernel intelligence is synchronized with your GitHub artifacts and LeetCode solve-matrix.
                </p>
            </div>
        </div>

        {/* --- MAIN CHAT: THE NEURAL LOG --- */}
        <div className="lg:col-span-9 border border-white/10 bg-black/40 flex flex-col relative overflow-hidden backdrop-blur-xl">
            {/* Scanned Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />

            <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto no-scrollbar space-y-10 relative z-10">
                <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: msg.role === 'kernel' ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex flex-col ${msg.role === 'operator' ? 'items-end' : 'items-start'}`}
                        >
                            <div className="flex items-center gap-2 mb-2 text-[8px] font-black text-slate-700 uppercase tracking-[0.3em]">
                                {msg.role === 'kernel' ? <Cpu size={10} /> : <Command size={10} />}
                                {msg.role === 'kernel' ? 'Kernel_Response' : 'Operator_Inference'}
                            </div>
                            <div className={`max-w-[85%] p-6 text-[11px] font-black uppercase tracking-widest border leading-relaxed ${
                                msg.role === 'kernel' 
                                ? 'bg-blue-600/5 border-blue-500/20 text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.02)]' 
                                : 'bg-white/[0.02] border-white/10 text-white'
                            }`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* --- COMMAND INPUT: NO WHITE BOXES --- */}
            <div className="p-8 border-t border-white/10 bg-black/60 flex gap-6 items-center">
                <ChevronRight size={20} className="text-blue-500 animate-pulse" />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="TYPE_SYSTEM_COMMAND_HERE..."
                    className="flex-1 bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-[0.25em] text-white placeholder:text-slate-800"
                />
                <button
                    onClick={handleSend}
                    className="flex items-center gap-3 px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5"
                >
                    Execute <Send size={12} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function ContextItem({ label, val }) {
    return (
        <div className="border-b border-white/5 pb-3 mb-4">
            <span className="block text-[8px] font-black text-slate-700 uppercase mb-1">{label}</span>
            <span className="text-[10px] font-black text-white uppercase truncate block tracking-tighter">{val}</span>
        </div>
    );
}