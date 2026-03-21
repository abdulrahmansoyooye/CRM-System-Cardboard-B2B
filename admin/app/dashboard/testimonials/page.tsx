"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Star, Globe, Archive, Search, MessageSquare, Quote, CheckCircle2, Award, Users, MoreHorizontal, User } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import { clsx } from "clsx";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  rating: number;
  status: "Published" | "Draft";
  text: string;
  role: string;
}

const INITIAL: Testimonial[] = [
  { id: 1, name: "David Wilson", company: "GlobalPack Ltd", role: "Head of Logistics", rating: 5, status: "Published", text: "Exceptional quality and fast turnaround on our export packaging needs. We saw a 23% reduction in damage rates." },
  { id: 2, name: "Elena Marchetti", company: "FreshExport Co.", role: "Operations Director", rating: 5, status: "Published", text: "The strength of their corrugated boxes reduced our transit damage by 18%. Outstanding service." },
  { id: 3, name: "Kenji Watanabe", company: "AutoParts Inc.", role: "Supply Chain Manager", rating: 4, status: "Published", text: "Very precise die-cutting. Exactly to our engineering specs. Delivery was always on time." },
  { id: 4, name: "Priya Sharma", company: "PharmaCold Ltd.", role: "Procurement Lead", rating: 5, status: "Draft", text: "Compliant and highly durable boxes for our cold chain exports. Will continue the partnership." },
];

const emptyForm = { name: "", company: "", role: "", rating: 5, status: "Draft" as "Published" | "Draft", text: "" };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Draft">("All");

  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = testimonials.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (editItem) {
      setTestimonials((prev) => prev.map((t) => t.id === editItem.id ? { ...t, ...form } : t));
      setEditItem(null);
    } else {
      const newId = Math.max(...testimonials.map((t) => t.id)) + 1;
      setTestimonials((prev) => [...prev, { id: newId, ...form }]);
      setAddOpen(false);
    }
  };

  const stats = [
    { label: "Published", value: testimonials.filter(t => t.status === "Published").length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg Rating", value: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1), icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Partners", value: [...new Set(testimonials.map(t => t.company))].length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Trust Score", value: "98%", icon: CheckCircle2, color: "text-brand-600", bg: "bg-brand-50" },
  ];

  const FormContent = () => (
    <div className="space-y-5 py-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Client Name</label>
        <input className="glass-input w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Company</label>
            <input className="glass-input w-full" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Job Title</label>
            <input className="glass-input w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Director" />
         </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Feedback Statement</label>
        <textarea rows={4} className="glass-input w-full resize-none" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="What did they say about Cardbox?" />
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setForm({ ...form, rating: s })}>
              <Star className={clsx("w-8 h-8 transition-all", s <= form.rating ? "text-amber-400 fill-amber-400" : "text-slate-100")} />
            </button>
          ))}
        </div>
        <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
          {(["Draft", "Published"] as const).map(s => (
            <button key={s} onClick={() => setForm({...form, status: s})} className={clsx("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", form.status === s ? "bg-slate-900 text-white" : "text-slate-400")}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Social Proof Management</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Client Testimonials</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage public endorsements and corporate trust signals</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setAddOpen(true); }} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
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
          {(["All", "Published", "Draft"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterStatus(t)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all",
                filterStatus === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
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
            placeholder="Search authors or companies..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        {filtered.map((t) => (
          <div key={t.id} className="premium-card p-8 group relative overflow-hidden hover:border-accent-500/20 transition-all">
             <Quote className="absolute -top-4 -right-4 w-32 h-32 text-slate-50 opacity-10 group-hover:scale-110 transition-transform" />
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={clsx("w-4 h-4", s <= t.rating ? "text-amber-400 fill-amber-400" : "text-slate-100")} />
                      ))}
                   </div>
                   <div className={clsx("status-badge", t.status === "Published" ? "badge-success" : "badge-neutral")}>
                      {t.status}
                   </div>
                </div>

                <p className="text-lg font-medium text-slate-700 leading-relaxed mb-8 italic">"{t.text}"</p>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg">
                        {t.name[0]}
                      </div>
                      <div>
                         <p className="font-display font-black text-slate-900">{t.name}</p>
                         <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">{t.role} · <span className="text-accent-500">{t.company}</span></p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditItem(t); setForm(t); }} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Edit2 className="w-4.5 h-4.5" />
                      </button>
                      <button onClick={() => { setDeleteTarget(t.id); }} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm">
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      <Modal isOpen={addOpen || !!editItem} onClose={() => { setAddOpen(false); setEditItem(null); }} title={addOpen ? "Register Testimonial" : "Edit Social Proof"} size="md">
        <FormContent />
        <div className="p-4 pt-0">
           <button onClick={handleSave} className="w-full btn-primary justify-center shadow-accent-500/20 py-4 font-black">
              {addOpen ? "Publish Endorsement" : "Save Changes"}
           </button>
        </div>
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { setTestimonials(testimonials.filter(t => t.id !== deleteTarget)); setDeleteTarget(null); }} title="Delete Testimonial" message="This will remove the endorsement from all public channels. Proceed?" />
    </div>
  );
}
