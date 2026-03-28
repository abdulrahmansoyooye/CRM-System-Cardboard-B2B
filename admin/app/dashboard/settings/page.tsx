"use client";

import { Save, Upload, Plus, Bell, Shield, User, Globe, Palette, Database, Trash2, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings, createSettings } from "@/services/setting.service";
import Skeleton from "@/components/Skeleton";

const TABS = [
  { id: "branding", label: "Branding", icon: Palette },
  { id: "contact", label: "Contact", icon: Globe },
  { id: "seo", label: "SEO", icon: Database },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "team", label: "Team", icon: User },
];

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  const [activeTab, setActiveTab] = useState("branding");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [branding, setBranding] = useState({ companyName: "CARDBOX Manufacturing", tagline: "Engineering Industrial Protection" });
  const [contact, setContact] = useState({ email: "sales@cardbox.demo", phone: "+971 4 123 4567", address: "Industrial Area 4, Street 12, P.O. Box 12345, Dubai, UAE" });
  const [seo, setSeo] = useState({ metaDesc: "Leading manufacturer of heavy-duty corrugated boxes, master cartons, and custom packaging solutions for industrial globally.", linkedin: "", twitter: "", facebook: "" });
  const [notifs, setNotifs] = useState({ email: true, inquiries: true, jobs: true, blog: false, weekly: true });
  
  // Real settings document ID from backend
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    if (apiData?.success && apiData.data?.[0]) {
      const s = apiData.data[0];
      setSettingsId(s._id);
      setBranding({ companyName: s.companyName || "CARDBOX Manufacturing", tagline: s.tagline || "Engineering Industrial Protection" });
      setContact({ 
        email: s.contactEmail || "sales@cardbox.demo", 
        phone: s.contactPhone || "+971 4 123 4567", 
        address: s.address || "Industrial Area 4, Street 12, P.O. Box 12345, Dubai, UAE" 
      });
      setSeo({ 
        metaDesc: s.defaultSEO?.metaDesc || "Leading manufacturer of heavy-duty corrugated boxes...", 
        linkedin: s.socialLinks?.linkedin || "", 
        twitter: s.socialLinks?.twitter || "", 
        facebook: s.socialLinks?.facebook || "" 
      });
    }
  }, [apiData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => {
      if (settingsId) return updateSettings(settingsId, data);
      return createSettings(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setSaved(true);
      setIsSaving(false);
      setTimeout(() => setSaved(false), 2000);
    },
    onError: () => setIsSaving(false),
  });

  const handleSave = () => {
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
    updateMutation.mutate(payload);
  };

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch system settings. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Configuration</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Configure your Cardbox admin platform</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isLoading || isSaving}
          className={`btn-primary transition-all shadow-lg ${saved ? "bg-emerald-500 shadow-emerald-500/20" : "shadow-accent-500/20"}`}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : isSaving ? "Syncing..." : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="premium-card p-2 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isLoading ? <Skeleton className="h-[500px] w-full" /> : (
            <>
              {activeTab === "branding" && (
                <div className="premium-card p-8 space-y-7">
                  <h2 className="text-lg font-black text-slate-900">Branding & Identity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Company Name</label>
                      <input type="text" value={branding.companyName} onChange={(e) => setBranding({ ...branding, companyName: e.target.value })} className="glass-input w-full" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Tagline</label>
                      <input type="text" value={branding.tagline} onChange={(e) => setBranding({ ...branding, tagline: e.target.value })} className="glass-input w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Logo</label>
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">CB</div>
                      <div className="space-y-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent-50 text-accent-600 font-bold text-sm rounded-xl hover:bg-accent-100 transition-colors">
                          <Upload className="w-4 h-4" /> Upload Logo
                        </button>
                        <p className="text-xs text-slate-400">PNG, SVG or WebP. Max 2MB.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Primary Color</label>
                    <div className="flex gap-3 flex-wrap">
                      {["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#1e293b"].map((c) => (
                        <button key={c} style={{ background: c }} className="w-10 h-10 rounded-xl border-2 border-white shadow-md hover:scale-110 transition-transform" />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="premium-card p-8 space-y-6">
                  <h2 className="text-lg font-black text-slate-900">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Primary Email</label>
                      <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="glass-input w-full" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Phone</label>
                      <input type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="glass-input w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Office Address</label>
                      <textarea rows={3} value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} className="glass-input w-full resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="premium-card p-8 space-y-6">
                  <h2 className="text-lg font-black text-slate-900">SEO & Social Media</h2>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Default Meta Description</label>
                    <textarea rows={3} value={seo.metaDesc} onChange={(e) => setSeo({ ...seo, metaDesc: e.target.value })} className="glass-input w-full resize-none" />
                    <p className="text-[10px] font-bold text-slate-300 mt-1.5 px-1">{seo.metaDesc.length}/160 characters</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Open Graph Image</label>
                    <div className="w-full h-36 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-accent-400 hover:bg-accent-50/30 cursor-pointer transition-all group">
                      <Upload className="w-6 h-6 mb-2 group-hover:text-accent-500" />
                      <span className="text-xs font-bold group-hover:text-accent-600">Drop OG Image here or click to upload</span>
                      <span className="text-[10px] text-slate-300 mt-1">1200×630px recommended</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Social Links</p>
                    {[{ n: "LinkedIn", key: "linkedin" }, { n: "Twitter / X", key: "twitter" }, { n: "Facebook", key: "facebook" }].map((s) => (
                      <div key={s.n} className="flex items-center gap-3">
                        <div className="w-24 text-sm font-bold text-slate-600">{s.n}</div>
                        <input type="text" value={seo[s.key as keyof typeof seo]} onChange={(e) => setSeo({ ...seo, [s.key]: e.target.value })} className="glass-input flex-1 py-3" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="premium-card p-8 space-y-6">
                  <h2 className="text-lg font-black text-slate-900">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { key: "email", label: "Email Notifications", desc: "Receive all alerts via email" },
                      { key: "inquiries", label: "New Inquiries", desc: "Get notified on every new B2B inquiry" },
                      { key: "jobs", label: "Job Applications", desc: "Alert when new applications arrive" },
                      { key: "blog", label: "Blog Comments", desc: "Receive reader comment alerts" },
                      { key: "weekly", label: "Weekly Digest", desc: "Summary report every Monday morning" },
                    ].map((n) => (
                      <div key={n.key} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{n.label}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{n.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key as keyof typeof notifs] })}
                          className={`w-12 h-6 rounded-full relative transition-all duration-200 ${notifs[n.key as keyof typeof notifs] ? "bg-accent-500" : "bg-slate-200"}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${notifs[n.key as keyof typeof notifs] ? "left-7" : "left-1"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="premium-card p-8 space-y-6">
                  <h2 className="text-lg font-black text-slate-900">Security Settings</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Current Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="glass-input w-full pr-12" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="glass-input w-full" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="glass-input w-full" />
                    </div>
                    <button className="btn-primary py-3">Update Password</button>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="font-black text-slate-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Authenticator App</p>
                        <p className="text-xs text-slate-400 mt-0.5">Use Google Authenticator or Authy</p>
                      </div>
                      <button className="btn-secondary py-2 px-4 text-xs">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div className="premium-card p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-slate-900">Team Members</h2>
                    <button className="btn-primary py-2.5 px-4 text-xs"><Plus className="w-4 h-4" /> Invite Member</button>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                    <p className="text-xs font-bold text-slate-400">Team management is currently read-only. Role assignments are managed via Auth Service.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
