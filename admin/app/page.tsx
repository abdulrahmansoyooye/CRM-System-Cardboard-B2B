
import {  Box, Zap, Lock, ScanLine } from "lucide-react";


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


      
    </div>
  );
}
