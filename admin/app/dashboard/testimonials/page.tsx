"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Quote, Star, User, Building, Trash, Search, Eye, CheckCircle2, MoreHorizontal, ShieldCheck, Globe, Clock, MessageSquare, Briefcase } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/services/testimonial.service";
import { clsx } from "clsx";

interface Testimonial {
  _id: string;
  clientName: string;
  company?: string;
  feedback: string;
  rating?: number;
  isPublished?: boolean;
  createdAt: string;
}

const emptyForm = { 
  clientName: "", 
  company: "", 
  feedback: "", 
  rating: 5, 
  isPublished: false 
};

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Published" | "Hidden">("All");

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setTestimonials(apiData.data);
    }
  }, [apiData]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setAddOpen(false);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditTarget(null);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setDeleteTarget(null);
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleSave = () => {
    setIsSaving(true);
    if (editTarget) {
      updateMutation.mutate({ id: editTarget._id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const togglePublish = (t: Testimonial) => {
    updateMutation.mutate({ id: t._id, data: { isPublished: !t.isPublished } });
  };

  const filtered = testimonials.filter(t => {
    const matchSearch = t.clientName.toLowerCase().includes(search.toLowerCase()) || (t.company?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchFilter = filterType === "All" || (filterType === "Published" ? t.isPublished : !t.isPublished);
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: "Total Reviews", value: testimonials.length, icon: MessageSquare, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Published", value: testimonials.filter(t => t.isPublished).length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg Rating", value: (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / (testimonials.length || 1)).toFixed(1), icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Feedback Rate", value: "92%", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch testimonials. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Social Proof</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Client Testimonials</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage public endorsements and industrial credibility</p>
        </div>
        <button onClick={() => { resetForm(); setAddOpen(true); }} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : stats.map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
            </div>
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {(["All", "Published", "Hidden"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap",
                filterType === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search by client or company..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64 w-full" />) : filtered.map((t) => (
          <div key={t._id} className="premium-card p-8 group hover:border-accent-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                       <User className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-display font-black text-slate-900 group-hover:text-accent-500 transition-colors uppercase tracking-tight">{t.clientName}</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.company || "Independent Reviewer"}</p>
                    </div>
                 </div>
                 <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={clsx("w-3.5 h-3.5", i < (t.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200")} />
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <Quote className="absolute -top-4 -left-4 w-10 h-10 text-slate-900/5 rotate-12" />
                 <p className="text-slate-600 font-medium leading-relaxed italic mb-8">"{t.feedback}"</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
               <div className="flex items-center gap-3">
                 <span className={clsx(
                    "status-badge",
                    t.isPublished ? "badge-success" : "badge-neutral"
                  )}>
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {t.isPublished ? "Public" : "Hidden"}
                 </span>
                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(t.createdAt).toLocaleDateString()}</span>
               </div>
               <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditTarget(t); setForm({ ...t, company: t.company || "", rating: t.rating || 5 }); }} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => togglePublish(t)} className={clsx("p-2.5 bg-white border border-slate-100 rounded-xl transition-all shadow-sm", t.isPublished ? "text-slate-400 hover:bg-amber-50 hover:text-amber-500" : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-500")}>
                    {t.isPublished ? <XCircle className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setDeleteTarget(t._id)} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={addOpen || !!editTarget} onClose={() => { setAddOpen(false); setEditTarget(null); resetForm(); }} title={addOpen ? "Register Endorsement" : "Refine Review"} size="md">
        <div className="space-y-5 py-4">
           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Client Name</label>
                <input value={form.clientName} onChange={(e) => setForm({...form, clientName: e.target.value})} className="w-full glass-input" placeholder="e.g. John Doe" />
             </div>
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Company</label>
                <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} className="w-full glass-input" placeholder="e.g. Apex Corp" />
             </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Engagement Rating</label>
                 <select value={form.rating} onChange={(e) => setForm({...form, rating: Number(e.target.value)})} className="w-full glass-input">
                   {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} Stars</option>)}
                 </select>
              </div>
              <div className="flex flex-col">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Visibility</label>
                 <button 
                  onClick={() => setForm({...form, isPublished: !form.isPublished})}
                  className={clsx(
                    "w-full px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                    form.isPublished ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-400 border border-slate-100"
                  )}
                 >
                   {form.isPublished ? "Published Site-Wide" : "Currently Private"}
                 </button>
              </div>
           </div>
           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Endorsement Text</label>
              <textarea value={form.feedback} onChange={(e) => setForm({...form, feedback: e.target.value})} rows={5} className="w-full glass-input resize-none" placeholder="Paste the client's official statement here..." />
           </div>
           <div className="pt-4">
              <button disabled={isSaving} onClick={handleSave} className="w-full btn-primary justify-center shadow-accent-500/20 py-4 font-black">
                {isSaving ? "Syncing..." : addOpen ? "Commit Endorsement" : "Update Statement"}
              </button>
           </div>
        </div>
      </Modal>

      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { deleteMutation.mutate(deleteTarget!); }}
        title="Remove Social Proof"
        message="This will permanently delete the testimonial. This cannot be undone."
        danger
      />
    </div>
  );
}

// Helper XCircle icon for consistency
function XCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  );
}
