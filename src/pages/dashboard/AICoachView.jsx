import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Cpu, Activity, ChevronRight,
  Target, Command, Shield, Loader2,
  Crosshair, Fingerprint
} from "lucide-react";

export default function AICoachView() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [state, setState] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    async function initKernel() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      setUser(session.user);

      const { data: stateData } = await supabase
        .from("users_state")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      setState(stateData);

      setMessages([{
        role: "kernel",
        coord: "00.00, 00.00",
        text: `Hi! I’m your AI career coach. I’ll help you plan a clear path towards ${stateData?.current_career || "your next role"}.`,

        time: new Date().toLocaleTimeString([], { hour12: false })
      }]);
    }
    initKernel();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function executeCommand() {
    if (!input.trim() || loading || !user) return;
    const cmd = input.toUpperCase();
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    const coord = `${(Math.random() * 99).toFixed(2)}, ${(Math.random() * 99).toFixed(2)}`;

    setMessages(prev => [...prev, { role: "operator", text: cmd, time: timestamp, coord }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/coach/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cmd })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: "kernel",
        text: data.reply.toUpperCase(),
        time: new Date().toLocaleTimeString([], { hour12: false }),
        coord: `${(Math.random() * 99).toFixed(2)}, ${(Math.random() * 99).toFixed(2)}`
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "kernel", text: "SIGNAL_INTERRUPT: KERNEL_HANDSHAKE_FAILURE.", time: "FATAL", coord: "ERR" }]);
    }
    setLoading(false);
  }

  return (
    <div className="h-screen bg-black/20 backdrop-blur-3xl flex flex-col relative text-white antialiased overflow-hidden">






      {/* === TOP TELEMETRY: SYSTEM HUD === */}
      <div className="w-full flex justify-between items-center px-10 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl z-30">
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.6em]">AI Coach</span>
            <div className="flex items-center gap-3 text-blue-500">
                <Cpu size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Career Mentor
</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/10 pl-10">
            <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.6em]">Your goal
</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">{state?.current_career || 'ARCH_NULL'}</span>
          </div>
        </div>

        <div className="flex gap-12 items-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
            <span className="flex items-center gap-2 text-emerald-500/50"><Activity size={12} /> Online
</span>
            <span className="flex items-center gap-2"><Shield size={12} /> Signed in
</span>
        </div>
      </div>

      {/* === MAIN INTERFACE: VECTORED DATA STREAM === */}
      <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        {/* Background Coordinate Grid */}
        {/*<div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px]" />*/}

        <div className="px-10 py-10 space-y-12">
            <AnimatePresence mode="popLayout">
            {messages.map((m, i) => (
                <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-12 group"
                >
                {/* Coordinate Index */}
                <div className="w-32 flex flex-col gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">COORD_ID</span>
                    <span className="text-[10px] font-black tabular-nums text-blue-500">[{m.coord}]</span>
                </div>

                {/* Logic Stream */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                        <span className={`text-[9px] font-black uppercase tracking-[0.5em] ${m.role === 'kernel' ? 'text-blue-500' : 'text-slate-700'}`}>
                            {m.role === 'kernel' ? 'Coach' : 'You'}
                        </span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <span className="text-[8px] font-black text-slate-800 tabular-nums uppercase">{m.time}</span>
                    </div>
                    <p className={`text-[12px] font-black tracking-[0.15em] leading-[1.8] uppercase ${m.role === 'kernel' ? 'text-white' : 'text-slate-500 italic'}`}>
                        {`❯ ${m.text}`}
                    </p>
                </div>
                </motion.div>
            ))}
            </AnimatePresence>

            {loading && (
            <div className="flex items-center gap-4 pl-44 text-blue-500 text-[9px] font-black tracking-normal animate-pulse">
                <Loader2 size={12} className="animate-spin" /> Thinking…

            </div>
            )}
            <div ref={bottomRef} />
        </div>
      </div>

      {/* === COMMAND CLI: SURGICAL CROSSHAIR === */}
      <div className="p-10 bg-black z-30 relative">
        <div className="max-w-screen-xl mx-auto flex items-center border border-white/10 p-1 group transition-all focus-within:border-blue-500/50 bg-white/[0.01]">
          <div className="px-6 text-blue-500/50 group-focus-within:text-blue-500">
            <Crosshair size={20} className="group-focus-within:rotate-90 transition-transform duration-500" />
          </div>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && executeCommand()}
            placeholder="Ask me anything about your career, skills, or roadmap…
"
            className="flex-1 bg-transparent py-8 outline-none text-[13px] font-black text-white uppercase tracking-[0.4em] placeholder:text-slate-900"
          />
          <button
            onClick={executeCommand}
            disabled={loading}
            className="px-10 h-full flex items-center gap-4 text-blue-500 group-hover:text-white transition-colors border-l border-white/5"
          >
            <span className="text-[9px] font-black tracking-widest">Send
</span>
            <Command size={16} />
          </button>
        </div>
        <div className="mt-4 flex justify-between text-[7px] font-black text-slate-800 uppercase tracking-[2em]">
            <span>AI coach ready
</span>
            <span>Your chats are private
</span>
        </div>
      </div>
    </div>
  );
}