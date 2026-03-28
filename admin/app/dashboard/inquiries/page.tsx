"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Mail, Phone, Calendar, ArrowUpRight, MessageSquare, Download, MoreHorizontal, User, Building, CheckCircle2 } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInquiries, createInquiry, updateInquiry, deleteInquiry } from "@/services/inquiry.service";
import { clsx } from "clsx";

type InquiryStatus = "New" | "Contacted" | "Quoted" | "Closed";

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

const statusStyles: Record<InquiryStatus, { bg: string, color: string }> = {
  New: { bg: "bg-brand-50", color: "text-brand-600" },
  Contacted: { bg: "bg-blue-50", color: "text-blue-600" },
  Quoted: { bg: "bg-amber-50", color: "text-amber-600" },
  Closed: { bg: "bg-emerald-50", color: "text-emerald-600" },
};

export default function InquiriesPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["inquiries"], queryFn: getInquiries });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | InquiryStatus>("All");
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({ 
    name: "", 
    company: "", 
    email: "", 
    phone: "", 
    productInterested: "Heavy Duty Master Cartons", 
    status: "New" as InquiryStatus, 
    notes: "" 
  });

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setInquiries(apiData.data.map((i: any) => ({
        ...i,
        status: i.status === "new" ? "New" : 
                i.status === "contacted" ? "Contacted" : 
                i.status === "quoted" ? "Quoted" : "Closed"
      })));
    }
  }, [apiData]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createInquiry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      setIsAddOpen(false);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      setIsDeleteOpen(false);
      setIsViewOpen(false);
      setSelectedInquiry(null);
    },
  });

  const resetForm = () => {
    setForm({ 
      name: "", 
      company: "", 
      email: "", 
      phone: "", 
      productInterested: "Heavy Duty Master Cartons", 
      status: "New", 
      notes: "" 
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    const payload = { ...form, status: form.status.toLowerCase() };
    createMutation.mutate(payload);
  };

  const handleStatusChange = (status: InquiryStatus) => {
    if (selectedInquiry) {
      updateMutation.mutate({ id: selectedInquiry._id, data: { status: status.toLowerCase() } });
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const filtered = inquiries.filter(i => {
    const matchSearch = i.company?.toLowerCase().includes(search.toLowerCase()) || 
                       i.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || i.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: "Incoming", value: inquiries.filter(i => i.status === "New").length, icon: MessageSquare, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Contacted", value: inquiries.filter(i => i.status === "Contacted").length, icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Quoted", value: inquiries.filter(i => i.status === "Quoted").length, icon: Mail, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Conversion", value: "83%", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch inquiries. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">CRM Pipeline</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Client Inquiries</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">{inquiries.length} total leads in sales funnel</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5">
            <Download className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Export CSV</span>
          </button>
          <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn-primary">
            <Plus className="w-4 h-4" /> New Inquiry
          </button>
        </div>
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
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(["All", "New", "Contacted", "Quoted", "Closed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap",
                filter === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
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
            placeholder="Search company or contact..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4 pb-20">
        {isLoading ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-28 w-full" />) : filtered.map((inquiry) => (
          <div key={inquiry._id} className="premium-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-accent-500/20 transition-all">
            <div className="flex-1 min-w-0 flex items-start gap-5">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0 group-hover:scale-110 transition-transform">
                {inquiry.company ? inquiry.company[0] : inquiry.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">{inquiry.company || inquiry.name}</h3>
                  <div className={clsx("status-badge", statusStyles[inquiry.status].bg, statusStyles[inquiry.status].color)}>
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {inquiry.status}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {inquiry.name}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md"><ArrowUpRight className="w-3.5 h-3.5" /> {inquiry.productInterested || "Generic Inquiry"}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex bg-white p-1 rounded-xl border border-slate-100">
                <button 
                  onClick={() => { setSelectedInquiry(inquiry); setIsViewOpen(true); }}
                  className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <Eye className="w-4.5 h-4.5" />
                </button>
                <a href={`mailto:${inquiry.email}`} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Mail className="w-4.5 h-4.5" />
                </a>
                <button 
                  onClick={() => { setSelectedInquiry(inquiry); setIsDeleteOpen(true); }}
                  className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Details */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Inquiry Details" size="lg">
        {selectedInquiry && (
          <div className="space-y-8 py-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Company Information</label>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-1">{selectedInquiry.company || "Not Specified"}</h3>
                    <p className="text-slate-500 font-medium flex items-center gap-2 mb-4"><Building className="w-4 h-4 opacity-30" /> Industrial Partner</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Point of Contact</p>
                        <p className="font-bold text-slate-900">{selectedInquiry.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Received Date</p>
                        <p className="font-bold text-slate-900">{new Date(selectedInquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Contact Email</p>
                     <p className="text-sm font-bold tracking-tight">{selectedInquiry.email}</p>
                  </div>
                  <div className="bg-accent-50 text-accent-700 p-6 rounded-3xl border border-accent-100">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Interest</p>
                     <p className="text-sm font-black truncate">{selectedInquiry.productInterested || "Generic"}</p>
                  </div>
                </div>

                {selectedInquiry.message && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Original Message</label>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 text-slate-700 font-medium leading-relaxed italic">
                      "{selectedInquiry.message}"
                    </div>
                  </div>
                )}

                {selectedInquiry.notes && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Internal Notes</label>
                    <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 text-slate-700 font-medium leading-relaxed italic">
                      "{selectedInquiry.notes}"
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full md:w-64 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Inquiry Status</label>
                  <div className="space-y-2">
                    {(["New", "Contacted", "Quoted", "Closed"] as InquiryStatus[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(s)}
                        className={clsx(
                          "w-full px-5 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-between group",
                          selectedInquiry.status === s ? "bg-slate-900 text-white shadow-lg" : "bg-white border border-slate-100 text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {s}
                        {selectedInquiry.status === s && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a href={`mailto:${selectedInquiry.email}`} className="w-full btn-primary justify-center shadow-lg shadow-brand-950/20 py-3.5 mb-3">
                    Reply to Lead
                  </a>
                  <button onClick={() => { setIsDeleteOpen(true); setIsViewOpen(false); }} className="w-full text-center py-2 text-xs font-bold text-rose-500 hover:underline">
                    Delete Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Add Inquiry */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Pipeline Lead" subtitle="Capture incoming industrial request" size="md">
        <div className="space-y-5 py-4">
           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Company Name</label>
              <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} className="w-full glass-input" placeholder="e.g. Apex Manufacturing" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Contact Person</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full glass-input" placeholder="e.g. David Wilson" />
             </div>
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Interest</label>
                <select value={form.productInterested} onChange={(e) => setForm({...form, productInterested: e.target.value})} className="w-full glass-input">
                  <option>Heavy Duty Master Cartons</option>
                  <option>Export Packaging Grade A</option>
                  <option>Custom Printed Boxes</option>
                </select>
             </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Email</label>
                <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full glass-input" placeholder="name@company.com" />
             </div>
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full glass-input" placeholder="+971..." />
             </div>
           </div>
           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} rows={3} className="w-full glass-input resize-none" placeholder="Requirements, timelines, or specifications..." />
           </div>
           <div className="pt-4">
              <button disabled={isSaving} onClick={handleSave} className="w-full btn-primary justify-center shadow-accent-500/20 py-4">
                {isSaving ? "Creating..." : "Add to Pipeline"}
              </button>
           </div>
        </div>
      </Modal>

      <ConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => { deleteMutation.mutate(selectedInquiry!._id); }}
        title="Remove from Pipeline"
        message={`Are you sure you want to delete this lead? This will remove all associated logs and deal history.`}
        danger
      />
    </div>
  );
}
