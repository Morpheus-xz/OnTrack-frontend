import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, AlertCircle, Bookmark } from "lucide-react";

export default function CoursesView({ user_id }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getResources() {
      const { data } = await supabase
        .from("user_resources")
        .select("*")
        .eq("user_id", user_id);
      setResources(data || []);
      setLoading(false);
    }
    getResources();
  }, [user_id]);

  if (loading) return <div className="text-[10px] font-mono font-black text-blue-500 animate-pulse uppercase tracking-[0.5em]">"Loading your learning plan…"
</div>;

  const grouped = {};
  resources.forEach((r) => {
    const key = r.skill.toLowerCase().trim();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="flex items-center gap-4 border-b border-white/5 pb-8">
        <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500">
          <BookOpen size={20} />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight">Your Learning Plan</h3>
<span className="text-[11px] text-slate-500">Courses selected to help you close your skill gaps</span>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(grouped).map(([skill, items]) => (
          <div key={skill} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 group hover:border-blue-500/20 transition-all">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3 text-blue-400">
  <AlertCircle size={18} />
  <h4 className="text-sm font-semibold capitalize">{skill}</h4>
</div>

              <Bookmark size={16} className="text-slate-700" />
            </div>

            <div className="space-y-4">
              {items.map((r) => (
                <a
                  key={r.id} href={r.link} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-blue-500/50 hover:bg-black/60 transition-all group/item shadow-inner"
                >
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-white block">{r.title}</span>

                    <div className="flex gap-4">
                       <span className="text-xs text-slate-400">{r.provider}</span>
<span className="text-xs text-blue-400">{r.level}</span>

                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-700 group-hover/item:text-blue-500 transition-all" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}