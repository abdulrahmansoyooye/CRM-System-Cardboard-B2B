"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.email("Please enter a valid corporate email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials or unauthorized access.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-accent-100 selection:text-accent-900 overflow-hidden">
      <div className="w-full max-w-110 relative">
        {/* Decorative background orb */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Brand Logo & Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 mb-8 border border-slate-100 group transition-all duration-500"
          >
            <Box className="w-8 h-8 text-accent-500 transition-transform duration-500 group-hover:scale-110" />
          </motion.div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-4">
            Admin <span className="text-accent-500 italic">Portal</span>
          </h1>
          <p className="text-xs text-slate-400 font-black uppercase tracking-[0.25em]">
            INDUSTRIAL CORE GATEWAY • v2.4
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-4xl p-10 shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-slate-100 relative z-10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">
                  Corporate Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-accent-500" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="name@cardbox.com"
                    className={`w-full h-16 bg-slate-50/50 border-2 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:bg-white transition-all outline-none ${
                      errors.email ? "border-rose-400 focus:border-rose-500" : "border-slate-100 focus:border-accent-500/30"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs font-bold text-rose-500 mt-2 ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Secret Access Key
                  </label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-accent-500 hover:text-accent-600 transition-colors">
                    Reset
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-accent-500" />
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full h-16 bg-slate-50/50 border-2 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:bg-white transition-all outline-none ${
                      errors.password ? "border-rose-400 focus:border-rose-500" : "border-slate-100 focus:border-accent-500/30"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-xs font-bold text-rose-500 mt-2 ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-rose-50 border border-rose-100 p-5 rounded-2xl flex items-start gap-4 overflow-hidden"
                >
                  <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] text-white font-black">!</span>
                  </div>
                  <p className="text-xs font-bold text-rose-600 leading-relaxed uppercase tracking-tight">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="group relative w-full h-16 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl shadow-slate-950/20 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin text-accent-500" />
                ) : (
                  <>
                    <span>Authenticate Access</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-accent-600 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center flex items-center justify-center gap-3"
        >
          <ShieldCheck className="w-4 h-4 text-slate-300" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
            Secure Industrial Intelligence • AES-256
          </p>
        </motion.div>
      </div>
    </div>
  );
}
