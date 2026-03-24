"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-accent-100 selection:text-accent-900">
      <div className="w-full max-w-[440px]">
        {/* Brand Logo & Header */}
        <div className="text-center mb-10 animate-enter">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-[24px] shadow-xl shadow-slate-200/50 mb-6 border border-slate-100 group transition-all duration-500 hover:scale-110">
            <Box className="w-8 h-8 text-accent-500 transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-3">
            Admin <span className="text-accent-500">Portal</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Sign in to manage the Cardbox industrial ecosystem
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[32px] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 animate-enter delay-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Corporate Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 transition-colors group-focus-within:text-accent-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@cardbox.com"
                    className="w-full h-14 bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-accent-500/30 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Secret Access Key
                  </label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-accent-500 hover:text-accent-600 transition-colors">
                    Reset
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 transition-colors group-focus-within:text-accent-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-accent-500/30 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3 animate-shake">
                <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] text-white font-black">!</span>
                </div>
                <p className="text-xs font-bold text-rose-600 leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              className="group relative w-full h-16 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Authenticate Access</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center flex items-center justify-center gap-2 animate-enter delay-200">
          <ShieldCheck className="w-4 h-4 text-slate-300" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Encrypted Security • Industrial Intelligence V2.4
          </p>
        </div>
      </div>
    </div>
  );
}
