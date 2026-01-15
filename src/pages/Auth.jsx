import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, Mail, Lock, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [awaitingVerification, setAwaitingVerification] = useState(false);

  // 🔥 FIXED ROUTING LOGIC
  async function routeUser(user) {
  // 1️⃣ Check onboarding
  const { data: onboarding, error: onboardingError } = await supabase
    .from("user_onboarding")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (onboardingError && onboardingError.code === "PGRST116") {
    navigate("/onboarding");
    return;
  }

  // 2️⃣ Check assessment
  const { data: assessment, error: assessmentError } = await supabase
    .from("user_assessment")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (assessmentError && assessmentError.code === "PGRST116") {
    navigate("/assessment");
    return;
  }

  // 3️⃣ Both exist → go dashboard
  navigate("/dashboard");
}


  useEffect(() => {
    async function bootstrap() {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        await routeUser(data.session.user);
      } else {
        setCheckingSession(false);
      }
    }

    bootstrap();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await routeUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function submit() {
    if (!email || !password) {
      setError("Identity credentials required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await routeUser(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setAwaitingVerification(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function googleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: { prompt: "select_account" },
        redirectTo: window.location.origin + "/auth",
      },
    });
  }

  // EMAIL VERIFICATION SCREEN
  if (awaitingVerification) {
    return (
      <div className="h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
          <Mail size={48} className="mx-auto text-blue-500 mb-6" />
          <h2 className="text-2xl font-black text-white mb-4">Verify your email</h2>
          <p className="text-slate-400 mb-6">
            We’ve sent a verification link to
            <span className="block text-blue-500 font-mono mt-2">{email}</span>
          </p>
          <p className="text-sm text-slate-500">
            Open your email, click the link, then return here to continue.
          </p>

          <button
            onClick={() => setAwaitingVerification(false)}
            className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-black uppercase tracking-widest"
          >
            I’ve Verified
          </button>
        </div>
      </div>
    );
  }

  if (checkingSession) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-blue-500 animate-spin" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
          Syncing Career Core...
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -inset-10 bg-blue-600/20 blur-3xl rounded-full" />

        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)]">
              <ShieldCheck size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-center text-3xl font-black tracking-tight mb-2">
            {mode === "login" ? "Access OnTrack" : "Create Your Core"}
          </h1>

          <p className="text-center text-slate-400 text-sm mb-8">
            {mode === "login"
              ? "Continue building your engineering trajectory."
              : "Initialize your personalized career engine."}
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:scale-[1.02] transition"
          >
            <img src="/google.png" className="w-5 h-5" alt="Google" />

            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-500" size={16} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-500" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_60px_rgba(37,99,235,0.5)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : mode === "login" ? "Authorize" : "Initialize"}
            <ChevronRight size={18} />
          </button>

          <div className="mt-8 text-center text-sm text-slate-400">
            {mode === "login" ? "No account?" : "Already onboarded?"}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="ml-2 text-blue-500 hover:text-blue-400"
            >
              {mode === "login" ? "Create one" : "Login"}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
