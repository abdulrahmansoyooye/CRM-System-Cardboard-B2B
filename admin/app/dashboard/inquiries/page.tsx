'use client'
import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInquiries, createInquiry, updateInquiry, deleteInquiry } from "@/services/inquiry.service";
import { Plus, Search, Trash2, Eye, Mail, Phone, Calendar, ArrowUpRight, MessageSquare, Download, User, Building, CheckCircle2, Clock } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

type InquiryStatus = "new" | "contacted" | "quoted" | "closed";

interface Inquiry {
  _id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  productInterested?: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
  message?: string;
}

const statusConfig: Record<InquiryStatus, { label: string, color: string, bg: string }> = {
  new: { label: "Incoming", color: "text-brand-600", bg: "bg-brand-50" },
  contacted: { label: "In Contact", color: "text-blue-600", bg: "bg-blue-50" },
  quoted: { label: "Proposal Sent", color: "text-amber-600", bg: "bg-amber-50" },
  closed: { label: "Project Won", color: "text-emerald-600", bg: "bg-emerald-50" },
};

export default function InquiriesPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: getInquiries,
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | InquiryStatus>("All");

  const inquiries: Inquiry[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      // Keep view open if we're just updating status
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchSearch = inq.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          inq.company?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = filterStatus === "All" || inq.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [inquiries, debouncedSearch, filterStatus]);

  const openFormModal = () => {
    openModal({
      title: "New Pipeline Lead",
      subtitle: "Capture incoming industrial inquiry manually",
      size: "md",
      view: (
        <InquiryForm 
          onSubmit={(data) => createMutation.mutate(data)}
          isSubmitting={createMutation.isPending}
        />
      )
    });
  };

  const openViewModal = (inquiry: Inquiry) => {
    openModal({
      title: "Lead Intelligence",
      subtitle: `System ID: ${inquiry._id}`,
      size: "lg",
      view: (
        <InquiryDetailView 
          inquiry={inquiry} 
          onUpdateStatus={(status) => updateMutation.mutate({ id: inquiry._id, data: { status } })}
          onDelete={() => openDeleteModal(inquiry._id, inquiry.company || inquiry.name)}
        />
      )
    });
  };

  const openDeleteModal = (id: string, name: string) => {
    openModal({
      title: "Purge Lead Data",
      subtitle: `Decommissioning inquiry: ${name}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4 font-display">
            Are you sure you want to permanently delete this lead? This will erase all mission logs and deal history from the pipeline.
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Abort</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              {deleteMutation.isPending ? "Purging..." : "Confirm Delete"}
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">CRM Pipeline</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Client Inquiries</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Real-time leads and industrial project opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-3 px-6"><Download className="w-4 h-4" /> <span className="text-xs uppercase font-black tracking-widest">Export CSV</span></button>
          <button onClick={openFormModal} className="btn-primary py-3 px-8 shadow-xl shadow-brand-500/20"><Plus className="w-4 h-4" /> New Inquiry</button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          [
            { label: "New Leads", value: inquiries.filter(i => i.status === "new").length, icon: MessageSquare, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Conversion", value: "85.2%", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Proposals", value: inquiries.filter(i => i.status === "quoted").length, icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Avg. Response", value: "4.2h", icon: Clock, color: "text-sky-600", bg: "bg-sky-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:rotate-12", s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search leads by name or company..." className="w-full glass-input pl-14 py-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          {(["All", "new", "contacted", "quoted", "closed"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-6 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap uppercase tracking-widest", filterStatus === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}>
              {s === "All" ? "All Tracks" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {isLoading ? Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full" />) : (
          filteredInquiries.map((inq) => (
            <div key={inq._id} onClick={() => openViewModal(inq)} className="premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group hover:border-brand-500 transition-all duration-300">
              <div className="flex items-start gap-6">
                 <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-950/20 shrink-0 group-hover:scale-105 transition-transform">
                   <Building className="w-7 h-7 opacity-80" />
                 </div>
                 <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-xl font-display font-black text-slate-900 truncate">{inq.company || inq.name}</h3>
                      <span className={cn("status-badge px-3 py-1", statusConfig[inq.status].bg, statusConfig[inq.status].color)}>
                        {statusConfig[inq.status].label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                         <User className="w-4 h-4 text-slate-300" />
                         {inq.name}
                       </div>
                       <div className="flex items-center gap-2 text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-lg">
                         <ArrowUpRight className="w-4 h-4" />
                         {inq.productInterested || "General Scope"}
                       </div>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                  <div className="hidden lg:flex flex-col items-end">
                     <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Received</span>
                     <span className="text-sm font-bold text-slate-700">{new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all"><Eye className="w-5 h-5" /></button>
                     <button onClick={(e) => { e.stopPropagation(); openDeleteModal(inq._id, inq.company || inq.name); }} className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-rose-500 group-hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function InquiryForm({ onSubmit, isSubmitting }: { onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productInterested: "",
    message: "",
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Lead Name</label>
          <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full glass-input" placeholder="e.g. John Doe" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Organization</label>
          <input value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full glass-input" placeholder="e.g. Acme Corp" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Email Interface</label>
          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full glass-input" placeholder="john@acme.com" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Comms Signal</label>
          <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full glass-input" placeholder="+123..." />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Interest Vectors</label>
        <input value={formData.productInterested} onChange={(e) => setFormData({...formData, productInterested: e.target.value})} className="w-full glass-input" placeholder="e.g. Heavy Duty Triple Wall Corrugated" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Mission Message</label>
        <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full glass-input resize-none" placeholder="Primary inquiry payload..." />
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full btn-primary justify-center py-5 font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/40">
        {isSubmitting ? "Provisioning..." : "Inject into Pipeline"}
      </button>
    </form>
  );
}

function InquiryDetailView({ inquiry, onUpdateStatus, onDelete }: { inquiry: Inquiry, onUpdateStatus: (status: InquiryStatus) => void, onDelete: () => void }) {
  return (
    <div className="space-y-8 py-2">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="premium-card p-6 border-slate-100 bg-slate-50/50">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block underline decoration-brand-500 decoration-2 underline-offset-4">Identity Matrix</span>
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <User className="w-5 h-5 text-slate-300" />
                   <span className="text-sm font-bold text-slate-900">{inquiry.name}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-slate-300" />
                   <a href={`mailto:${inquiry.email}`} className="text-sm font-black text-brand-600 hover:underline">{inquiry.email}</a>
                 </div>
                 <div className="flex items-center gap-3">
                   <Phone className="w-5 h-5 text-slate-300" />
                   <span className="text-sm font-bold text-slate-700">{inquiry.phone || "--"}</span>
                 </div>
               </div>
             </div>
             <div className="premium-card p-6 border-slate-100 bg-slate-50/50">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block underline decoration-brand-500 decoration-2 underline-offset-4">Mission Context</span>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-slate-300" />
                    <span className="text-sm font-bold text-slate-900">{inquiry.company || "Direct Individual"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="w-5 h-5 text-slate-300" />
                    <span className="text-sm font-black text-blue-600">{inquiry.productInterested || "Generic Inquiry"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-300" />
                    <span className="text-sm font-bold text-slate-600">Captured {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>
             </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Original Signal</span>
            <div className="bg-slate-900 text-slate-300 p-8 rounded-[32px] font-medium leading-relaxed italic text-sm border-l-4 border-brand-500 shadow-2xl">
              "{inquiry.message || "No message payload received."}"
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="premium-card p-6 bg-slate-50/50 border-slate-100">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Deployment Status</span>
             <div className="space-y-3">
                {(["new", "contacted", "quoted", "closed"] as InquiryStatus[]).map((s) => (
                  <button 
                    key={s} 
                    onClick={() => onUpdateStatus(s)}
                    className={cn(
                      "w-full px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between group",
                      inquiry.status === s ? "bg-slate-950 text-white shadow-xl shadow-slate-950/20" : "bg-white border border-slate-100 text-slate-400 hover:border-brand-500 hover:text-brand-600"
                    )}
                  >
                    {statusConfig[s].label}
                    {inquiry.status === s && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <a href={`mailto:${inquiry.email}`} className="btn-primary justify-center py-4 shadow-xl shadow-brand-500/20 font-black uppercase text-[10px] tracking-widest">
               Transmit Response
             </a>
             <button onClick={onDelete} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
               Purge Intelligence
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
