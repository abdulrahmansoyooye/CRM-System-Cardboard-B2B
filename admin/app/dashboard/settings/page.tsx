'use client'
import { Save, Upload, Plus, Bell, Shield, User, Globe, Edit2,Palette, Database, Trash2, Eye, EyeOff, Check, AlertCircle, Key, Mail, ShieldCheck, UserCheck, UserMinus, HardDrive } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings, createSettings } from "@/services/setting.service";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/user.service";
import Skeleton from "@/components/Skeleton";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

interface TUser {
  _id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

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
          {isLoading ? <Skeleton className="h-125 w-full" /> : (
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
                    <div className="h-125 w-full bg-slate-50 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[50px] group overflow-hidden relative cursor-pointer hover:border-accent-400 hover:bg-accent-50/30 transition-all">
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

              {activeTab === "team" && <TeamTab />}

            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamTab() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const users: TUser[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
  });

  const openFormModal = (user?: TUser) => {
    openModal({
      title: user ? "Modify Credentials" : "Provision New Operator",
      subtitle: user ? `Updating permissions for ${user.name}` : "Grant system access to a new team member",
      size: "md",
      view: (
        <UserForm 
          initialData={user} 
          onSubmit={(data) => user ? updateMutation.mutate({ id: user._id, data }) : createMutation.mutate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string, name: string) => {
    openModal({
      title: "Revoke Access",
      subtitle: `Decommissioning user: ${name}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <UserMinus className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4 font-display">
            Are you sure you want to permanently remove this operator? This will immediately terminate all active sessions and API permissions.
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Abort</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              Terminate
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="premium-card p-8 space-y-8 min-h-[500px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Security Personnel</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage administrative roles and system permissions</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-3 px-6 shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4" /> Add Operator
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full" />) : (
          users.map((user) => (
            <div key={user._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 group hover:border-brand-500/30 transition-all duration-300">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-950/20 shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-xl font-black">{user.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-display font-black text-slate-900 truncate">{user.name}</h3>
                    <span className={cn("px-3 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border", 
                      user.role === 'super_admin' ? "bg-brand-50 text-brand-600 border-brand-100" : "bg-slate-100 text-slate-500 border-slate-200"
                    )}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 opacity-40" /> {user.email}</span>
                    <span className={cn("flex items-center gap-1.5", user.isActive ? "text-emerald-500" : "text-slate-300")}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", user.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
                      {user.isActive ? "Connected" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200/50">
                 <button onClick={() => openFormModal(user)} className="p-3 rounded-xl bg-white text-slate-400 hover:bg-slate-950 hover:text-white transition-all shadow-sm"><Edit2 className="w-4 h-4" /></button>
                 <button onClick={() => openDeleteModal(user._id, user.name)} className="p-3 rounded-xl bg-white text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function UserForm({ initialData, onSubmit, isSubmitting }: { initialData?: TUser, onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    role: initialData?.role || "admin",
    isActive: initialData?.isActive ?? true,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Operator Identity</label>
        <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full glass-input py-4 text-lg font-bold" placeholder="Full legal name" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Comm Channel (Email)</label>
        <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full glass-input" placeholder="operator@cardbox.demo" />
      </div>
      {!initialData && (
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Access Credential (Password)</label>
          <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full glass-input" placeholder="••••••••" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Clearance Level</label>
          <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value as any})} className="w-full glass-input">
            <option value="super_admin">Super Admin (L1)</option>
            <option value="admin">Admin (L2)</option>
            <option value="content_manager">Content Manager</option>
            <option value="hr_manager">HR Manager</option>
            <option value="sales_manager">Sales Manager</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Network Status</label>
          <select value={formData.isActive ? "true" : "false"} onChange={(e) => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full glass-input">
            <option value="true">Authorized (Active)</option>
            <option value="false">Decommissioned (Inactive)</option>
          </select>
        </div>
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full btn-primary justify-center py-5 font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/40">
        {isSubmitting ? "Syncing..." : initialData ? "Update Clearance" : "Provision Operator"}
      </button>
    </form>
  );
}
