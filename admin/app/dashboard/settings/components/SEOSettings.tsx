"use client";

import React from "react";
import { FormInput, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { Database, Upload, Linkedin, Twitter, Facebook } from "lucide-react";

interface SEOSettingsProps {
  seo: any;
  setSeo: (seo: any) => void;
}

export function SEOSettings({ seo, setSeo }: SEOSettingsProps) {
  return (
    <div className="premium-card p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
           <Database className="w-6 h-6" />
        </div>
        <div>
           <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Intelligence Indexing</h2>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Configure SEO and social discovery vectors</p>
        </div>
      </div>

      <div className="space-y-4">
        <FormTextarea
          label="Global Meta Intelligence (Description)"
          rows={3}
          value={seo.metaDesc}
          onChange={(e) => setSeo({ ...seo, metaDesc: e.target.value })}
          placeholder="Detailed description for search clusters..."
        />
        <p className="text-[10px] font-black font-mono text-slate-300 mt-1 uppercase tracking-tighter text-right">
            {seo.metaDesc.length} / 160 BITS
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">OG Interface Signal (Image)</label>
        <div className="h-48 w-full bg-slate-50 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[40px] group overflow-hidden relative cursor-pointer hover:border-emerald-500/30 hover:bg-emerald-50/10 transition-all">
          <Upload className="w-8 h-8 mb-3 text-slate-300 group-hover:text-emerald-500 group-hover:scale-110 transition-all" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600">Sync with social cluster</span>
          <span className="text-[9px] text-slate-300 mt-1 font-bold">1200 × 630 PIXELS RECOMMENDED</span>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-slate-50">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 italic underline decoration-emerald-500/20 underline-offset-4 decoration-2">Social Network Nodes</p>
        <div className="grid grid-cols-1 gap-4">
            {[
                { n: "LinkedIn Matrix", key: "linkedin", icon: Linkedin },
                { n: "Twitter Protocol", key: "twitter", icon: Twitter },
                { n: "Facebook Node", key: "facebook", icon: Facebook }
            ].map((s) => (
                <div key={s.n} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-slate-900 group-hover:bg-white border border-slate-100/50 shadow-sm transition-all shrink-0">
                        <s.icon className="w-4.5 h-4.5" />
                    </div>
                    <input 
                        type="text" 
                        value={seo[s.key as keyof typeof seo]} 
                        onChange={(e) => setSeo({ ...seo, [s.key]: e.target.value })} 
                        className="glass-input flex-1 py-3 text-xs font-bold"
                        placeholder={`${s.n} URL`}
                    />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
