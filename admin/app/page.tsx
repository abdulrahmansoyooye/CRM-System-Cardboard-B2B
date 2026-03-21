import Link from "next/link";
import { ArrowRight, Box, Shield, Zap, Lock, ScanLine } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* Absolute decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-400/20 via-orange-500/5 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 relative flex-col items-start justify-center px-16 xl:px-24 border-r border-slate-200/50 bg-white/40 backdrop-blur-xl z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        
        <div className="relative z-10 w-full mb-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30 border border-orange-400/20">
              <Box className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-black text-3xl tracking-tight text-slate-900">CARDBOX</div>
              <div className="text-orange-500 text-xs font-black tracking-widest uppercase mt-0.5">Admin Platform V2</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight mb-8 text-slate-900">
            Enterprise<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Control Center
            </span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-md font-medium">
            Manage your industrial product catalog, inbound B2B inquiries, blog publications, and operational dashboards all from one highly secure terminal.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {[
              { label: "Product Catalog CMS", icon: Box },
              { label: "B2B Lead Pipeline", icon: Zap },
              { label: "HR & Applications", icon: ScanLine },
              { label: "Secure Operations", icon: Lock },
            ].map((m) => (
              <div key={m.label} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-default group">
                <m.icon className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                <span className="text-xs font-bold text-slate-700">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 z-20">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white p-10 xl:p-12 relative overflow-hidden">
            {/* Glossy top highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>

            <div className="flex justify-center mb-8 lg:hidden">
              <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Box className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-2.5 mb-8">
              <Shield className="w-5 h-5 text-orange-500" />
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorized Access Only</span>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 mb-10 font-medium text-sm">Sign in with your administrator credentials to proceed.</p>

            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="admin@cardbox.demo"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50 hover:bg-white transition-all shadow-inner placeholder:font-medium placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2 px-1">
                     <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <Link href="/forgot-password" className="text-[11px] font-bold tracking-wide text-orange-500 hover:text-orange-600 transition-colors">
                      Recover Access
                    </Link>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50 hover:bg-white transition-all shadow-inner placeholder:font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-2 px-1">
                <div className="relative flex items-center">
                  <input type="checkbox" id="remember" className="peer w-5 h-5 appearance-none rounded-md border-2 border-slate-200 checked:bg-orange-500 checked:border-orange-500 transition-colors cursor-pointer" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                </div>
                <label htmlFor="remember" className="text-sm font-bold text-slate-600 cursor-pointer select-none">
                  Keep me connected securely
                </label>
              </div>

              <Link href="/dashboard" className="block w-full pt-2">
                <button
                  type="button"
                  className="w-full bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/10 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  <span className="tracking-wide">Authenticate Session</span>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </Link>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl">
                 <Lock className="w-3.5 h-3.5 text-orange-400" />
                 <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                   Demo credentials active: admin@cardbox.demo
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
