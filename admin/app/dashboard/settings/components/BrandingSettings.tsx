"use client";

import React from "react";
import { FormSection, FormInput } from "@/components/dashboard/shared/FormLayout";
import { Upload, Palette, Plus } from "lucide-react";

interface BrandingSettingsProps {
  branding: any;
  setBranding: (branding: any) => void;
}

export function BrandingSettings({ branding, setBranding }: BrandingSettingsProps) {
  return (
    <div className="premium-card p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-accent-50 rounded-2xl flex items-center justify-center text-accent-600">
           <Palette className="w-6 h-6" />
        </div>
        <div>
           <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Branding & Logic</h2>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Configure system-wide visual identification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          label="Corporate Identity Alias"
          value={branding.companyName}
          onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
          placeholder="e.g. CARDBOX Manufacturing"
        />
        <FormInput
          label="Operational Tagline"
          value={branding.tagline}
          onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
          placeholder="e.g. Engineering Industrial Protection"
        />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Brand Signature (Logo)</label>
        <div className="flex items-center gap-8 p-6 bg-slate-50/50 rounded-[32px] border border-slate-100">
          <div className="w-24 h-24 bg-slate-900 rounded-[32px] flex items-center justify-center text-white font-black text-3xl shadow-2xl relative group overflow-hidden">
             CB
             <div className="absolute inset-0 bg-brand-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
          <div className="space-y-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100">
              <Upload className="w-4 h-4" /> Interface Stream
            </button>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">PNG, SVG or WebP preferred. Max payload 2MB.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Primary Color Matrix</label>
        <div className="flex gap-4 flex-wrap">
          {["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#1e293b"].map((c) => (
            <button 
                key={c} 
                style={{ background: c }} 
                className="w-12 h-12 rounded-2xl border-4 border-white shadow-xl hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-slate-100" 
            />
          ))}
          <button className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-slate-400 hover:text-slate-400 transition-all">
             <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
