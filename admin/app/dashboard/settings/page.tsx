"use client";

import React, { useState, useEffect } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getSettings, updateSettings, createSettings } from "@/services/setting.service";
import { Save, Palette, Globe, Database, Bell, Shield, User, Check, Eye, EyeOff, Key, Upload, Lock } from "lucide-react";
import { BrandingSettings } from "./components/BrandingSettings";
import { ContactSettings } from "./components/ContactSettings";
import { SEOSettings } from "./components/SEOSettings";
import { TeamSettings } from "./components/TeamSettings";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/Skeleton";

const TABS = [
  { id: "branding", label: "Branding", icon: Palette, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "contact", label: "Comms", icon: Globe, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "seo", label: "Indexing", icon: Database, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "notifications", label: "Signal Alerts", icon: Bell, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "security", label: "Encryption", icon: Shield, color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: "team", label: "Operators", icon: User, color: "text-slate-900", bg: "bg-slate-100" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("branding");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Settings State
  const [branding, setBranding] = useState({ companyName: "", tagline: "" });
  const [contact, setContact] = useState({ email: "", phone: "", address: "" });
  const [seo, setSeo] = useState({ metaDesc: "", linkedin: "", twitter: "", facebook: "" });
  const [notifs, setNotifs] = useState({ email: true, inquiries: true, jobs: true, blog: false, weekly: true });
  const [settingsId, setSettingsId] = useState<string | null>(null);

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["settings"], getSettings);

  useEffect(() => {
    if (apiData?.success && apiData.data?.[0]) {
      const s = apiData.data[0];
      setSettingsId(s._id);
      setBranding({ companyName: s.companyName || "CARDBOX Manufacturing", tagline: s.tagline || "" });
      setContact({ 
        email: s.contactEmail || "", 
        phone: s.contactPhone || "", 
        address: s.address || "" 
      });
      setSeo({ 
        metaDesc: s.defaultSEO?.metaDesc || "", 
        linkedin: s.socialLinks?.linkedin || "", 
        twitter: s.socialLinks?.twitter || "", 
        facebook: s.socialLinks?.facebook || "" 
      });
    }
  }, [apiData]);

  // Mutations
  const updateMutation = useDashboardMutation(
    (data: any) => settingsId ? updateSettings(settingsId, data) : createSettings(data),
    "System configuration synchronized",
    [["settings"]]
  );

  const handleSave = async () => {
    setIsSaving(true);
    const payload = {
      companyName: branding.companyName,
      tagline: branding.tagline,
      contactEmail: contact.email,
      contactPhone: contact.phone,
      address: contact.address,
      defaultSEO: { metaDesc: seo.metaDesc },
      socialLinks: { linkedin: seo.linkedin, twitter: seo.twitter, facebook: seo.facebook }
    };
    
    await updateMutation.mutateAsync(payload);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Platform Control</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Recalibrate system logic, operational branding, and security protocols.</p>
        </div>
        <div className="flex items-center gap-3">
             <button 
                onClick={handleSave} 
                disabled={isLoading || isSaving}
                className={cn(
                    "btn-primary transition-all shadow-2xl flex items-center gap-3 px-8 py-4",
                    saved ? "bg-emerald-500 shadow-emerald-500/20" : "bg-slate-950 shadow-slate-950/20"
                )}
            >
                {saved ? <Check className="w-4 h-4" /> : isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="uppercase tracking-widest text-xs font-black">
                    {saved ? "Synchronized" : isSaving ? "Syncing Logic" : "Commit Changes"}
                </span>
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Grid */}
        <div className="lg:w-72 shrink-0 w-full">
          <div className="premium-card p-3 space-y-1.5 bg-slate-50/50 border-slate-100">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between px-5 py-4 rounded-[24px] text-xs font-black transition-all group uppercase tracking-widest",
                  activeTab === tab.id 
                    ? "bg-white text-slate-900 shadow-xl shadow-slate-200/50 border border-slate-100" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                )}
              >
                <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-all", activeTab === tab.id ? tab.bg : "bg-transparent")}>
                        <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? tab.color : "text-slate-300 group-hover:text-slate-400")} />
                    </div>
                    {tab.label}
                </div>
                {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-accent-500 shadow-lg shadow-accent-500/50" />}
              </button>
            ))}
          </div>
          
          <div className="mt-6 p-6 premium-card bg-linear-to-br from-slate-900 to-slate-950 border-transparent text-white overflow-hidden relative group">
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
             <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-accent-400" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Master Override</h4>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest">Global system parameters are encrypted and requires L1 clearance to recalibrate.</p>
             </div>
          </div>
        </div>

        {/* Dynamic Section Injection */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {isLoading ? <div className="h-[600px] w-full bg-slate-50 animate-pulse rounded-[48px]" /> : (
            <>
              {activeTab === "branding" && <BrandingSettings branding={branding} setBranding={setBranding} />}
              {activeTab === "contact" && <ContactSettings contact={contact} setContact={setContact} />}
              {activeTab === "seo" && <SEOSettings seo={seo} setSeo={setSeo} />}
              {activeTab === "notifications" && <NotificationSettings notifs={notifs} setNotifs={setNotifs} />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "team" && <TeamSettings />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components for Notification and Security (Refactored for premium look)
function NotificationSettings({ notifs, setNotifs }: { notifs: any, setNotifs: (n: any) => void }) {
    const list = [
        { key: "email", label: "Email Bridge", desc: "Route critical system alerts to master email", icon: Globe },
        { key: "inquiries", label: "B2B Lead Injection", desc: "Notify upon every new lead materialized", icon: Database },
        { key: "jobs", label: "Talent Acquisition", desc: "Real-time alert for new mission applicants", icon: User },
        { key: "blog", label: "Intelligence Comments", desc: "Reader interaction and knowledge feedback", icon: Bell },
        { key: "weekly", label: "Operational Digest", desc: "Strategic summary report every Monday", icon: Shield },
    ];

    return (
        <div className="premium-card p-8 space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                    <Bell className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Signal Protocols</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Configure operational alert signals</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {list.map((n) => (
                   <div key={n.key} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[32px] border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/30 transition-all group">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-rose-500 shadow-sm transition-all">
                                <n.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-black text-slate-900 text-sm uppercase tracking-widest">{n.label}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{n.desc}</p>
                            </div>
                        </div>
                        <button
                          onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key as keyof typeof notifs] })}
                          className={cn(
                            "w-14 h-7 rounded-full relative transition-all duration-300 border",
                            notifs[n.key] ? "bg-rose-500 border-rose-600 shadow-lg shadow-rose-500/20" : "bg-slate-200 border-slate-300"
                          )}
                        >
                          <div className={cn("absolute top-1 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all duration-300", notifs[n.key] ? "left-8" : "left-1")} />
                        </button>
                   </div>
                ))}
            </div>
        </div>
    )
}

function SecuritySettings() {
    const [showKey, setShowKey] = useState(false);
    return (
        <div className="premium-card p-8 space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Shield className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Access Encryption</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Manage operator credentials and encryption</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Active Access Key</label>
                    <div className="relative group">
                        <input 
                            readOnly 
                            type={showKey ? "text" : "password"} 
                            value="************************" 
                            className="w-full glass-input py-4 pr-14 font-mono font-bold text-slate-900 cursor-default" 
                        />
                        <button 
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white transition-all"
                        >
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Recalibrate Password</label>
                        <input type="password" placeholder="NEW ENCRYPTION STRING" className="glass-input w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Validate Recalibration</label>
                        <input type="password" placeholder="RE-ENTER STRING" className="glass-input w-full" />
                    </div>
                </div>
                
                <button className="flex items-center justify-center gap-3 w-full py-5 rounded-[24px] bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-950 shadow-2xl shadow-slate-900/40 transition-all active:scale-95 mt-4">
                    <Key className="w-4 h-4" /> RECALIBRATE MASTER KEY
                </button>
            </div>

            <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between p-8 bg-linear-to-r from-slate-950 to-indigo-950 rounded-[40px] text-white overflow-hidden relative group">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                    <div className="relative z-10">
                        <h4 className="font-display font-black text-lg mb-1">Dual-Vector Auth</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Increase account shielding by 800%</p>
                    </div>
                    <button className="relative z-10 px-8 py-3 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-white/20 transition-all active:scale-95">
                        Initialize 2FA
                    </button>
                </div>
            </div>
        </div>
    )
}
