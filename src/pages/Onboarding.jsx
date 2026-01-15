import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  School,
  Calendar,
  Clock,
  Target,
  ChevronRight,
  Cpu,
  ArrowLeft
} from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);

  // 🔥 NEW
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    college: "",
    year: "",
    daily_hours: "",
    goal: "",
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 AUTH HANDSHAKE — fixes Google OAuth race condition
  useEffect(() => {
    const init = async () => {
      // Try fast local session
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        setAuthReady(true);
        return;
      }

      // Try server fetch
      const { data: auth } = await supabase.auth.getUser();
      if (auth.user) {
        setUser(auth.user);
        setAuthReady(true);
        return;
      }

      // Listen for delayed OAuth callback
      const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
        if (session?.user) {
          setUser(session.user);
          setAuthReady(true);
          sub.subscription.unsubscribe();
        }
      });
    };

    init();
  }, []);

  // ⛔ Block UI until auth is real
  if (!authReady) {
    return (
      <div className="h-screen flex items-center justify-center text-blue-500 font-mono tracking-widest">
        Signing you in…

      </div>
    );
  }

  const submit = async () => {
    if (!user) {
      alert("Session lost. Please login again.");
      navigate("/auth");
      return;
    }

    setIsSyncing(true);

    try {
      const { error } = await supabase
        .from("user_onboarding")
        .upsert({
          user_id: user.id,
          full_name: form.full_name,
          college: form.college,
          year: form.year,
          daily_hours: form.daily_hours,
          goal: form.goal,
        });

      if (error) throw error;

      navigate("/assessment");
    } catch (err) {
      console.error("ONBOARDING_SYNC_FAILED:", err);
      alert("Database sync failed. Check RLS policies.");
    } finally {
      setIsSyncing(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6 bg-transparent antialiased selection:bg-blue-500/30 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
      >

        {/* Progress */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full ${i <= step ? "bg-blue-500" : "bg-slate-800"}`}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-blue-500/60">
            Profile setup · {step} of 3

          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-8">
              <h1 className="text-4xl font-black text-white uppercase">Tell us about yourself</h1>
              <p className="text-slate-400 text-sm">
  This helps us personalize your learning plan.</p>


              <Input name="full_name" value={form.full_name} onChange={handle} label="Full Name" helper="This is just for personalization — it won’t be shown publicly." placeholder="e.g. John Doe"icon={<User size={16}/>} />
              <Input name="college" value={form.college} onChange={handle} label="Institution" helper="Where you are currently studying." placeholder="e.g. IIT Delhi, SRM University"icon={<School size={16}/>} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-8">
              <h1 className="text-4xl font-black text-white uppercase">Your study availability
</h1>
              <p className="text-slate-400 text-sm">
  We use this to create a realistic weekly plan.
</p>

              <Input name="year" value={form.year} onChange={handle} label="Current year of study" helper="We use this to match you with roles and study plans that fit your current stage." placeholder="e.g. First, Second"icon={<Calendar size={16}/>} />
              <Input name="daily_hours" value={form.daily_hours} onChange={handle} label="Hours you can study per day
" helper="Be realistic — we use this to build your learning plan." placeholder="e.g. 2, 4, 6" icon={<Clock size={16}/>} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-8">
              <h1 className="text-4xl font-black text-white uppercase">Your career goal</h1>
              <p className="text-slate-400 text-sm">
  This helps us recommend the right roadmap.
</p>

              <Input name="goal" value={form.goal} onChange={handle} helper="You can list more than one if you’re unsure — we’ll analyze all of them." label=" What role are you aiming for?
" placeholder="e.g. iOS Developer, AI Engineer"
 icon={<Target size={16}/>} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button onClick={prevStep} className="p-4 rounded-2xl bg-white/5 text-slate-400">
              <ArrowLeft size={20} />
            </button>
          )}

          <button
            onClick={step === 3 ? submit : nextStep}
            disabled={isSyncing}
            className="flex-1 py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest flex justify-center items-center gap-3"
          >
            {isSyncing ? <Cpu className="animate-spin" /> : step === 3 ? "Create my roadmap" : "Next"}
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Input({ label, helper, icon, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <span className="text-[10px] uppercase tracking-widest text-slate-600">
        {label}
      </span>

      {/* Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
          {icon}
        </div>

        <input
          {...props}
          className="w-full pl-12 py-4 rounded-xl bg-black/40 text-white outline-none placeholder-slate-500"
        />
      </div>

      {/* Helper text */}
      {helper && (
        <p className="text-[11px] text-slate-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}

