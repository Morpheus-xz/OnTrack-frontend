import { motion } from "framer-motion";
import { Layers, Zap, Target } from "lucide-react";

export default function RoadmapView({ state }) {
  if (!state?.learning_plan) return <div className="text-slate-500 font-mono text-[10px] uppercase">Your learning roadmap is being prepared…
</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="flex items-center gap-4 border-b border-white/5 pb-8">
        <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500">
          <Layers size={20} />
        </div>
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tighter">Your Learning Roadmap</h3>
          <span className="text-[9px] font-mono font-black text-slate-600 uppercase tracking-[0.3em]">A clear 12-week plan based on your goals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {state.learning_plan.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 transition-all overflow-hidden"
          >
            {/* Background Step Number */}
            <div className="absolute top-4 right-8 text-[80px] font-black text-white/[0.03] group-hover:text-blue-500/10 transition-colors pointer-events-none">
              {i + 1 < 10 ? `0${i + 1}` : i + 1}
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-blue-500/60">
                <Zap size={14} fill="currentColor" />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Step {i + 1}</span>
              </div>
              <p className="text-sm font-black uppercase tracking-widest leading-relaxed text-slate-200 max-w-[80%]">
                {step}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}