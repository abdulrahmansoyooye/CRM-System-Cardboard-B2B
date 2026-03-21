"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Mail, Phone, Calendar, ArrowUpRight, MessageSquare, Download, MoreHorizontal, User, Building } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import { clsx } from "clsx";

type InquiryStatus = "New" | "Contacted" | "Quoted" | "Closed";

interface Inquiry {
  id: number;
  company: string;
  contact: string;
  email: string;
  phone: string;
  interest: string;
  value: string;
  status: InquiryStatus;
  date: string;
  notes?: string;
}

const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, company: "GLOBALPACK LTD.", contact: "David Wilson", email: "david@globalpack.com", phone: "+1 415-555-0123", interest: "Heavy Duty Master Cartons", value: "$12,400", status: "New", date: "Mar 13, 2026", notes: "Interested in 5k units. Packaging for industrial parts." },
  { id: 2, company: "FRESHCO LOGISTICS", contact: "Maria Garcia", email: "m.garcia@freshco.io", phone: "+1 202-555-0198", interest: "Export Packaging Grade A", value: "$8,500", status: "Contacted", date: "Mar 12, 2026", notes: "Sent catalog. Waiting for response." },
  { id: 3, company: "TECHNET SYSTEMS", contact: "James Smith", email: "js@technet.net", phone: "+1 312-555-0145", interest: "Custom Printed Boxes", value: "$15,200", status: "Quoted", date: "Mar 11, 2026", notes: "Final quote sent. 7-ply triple fluted spec." },
  { id: 4, company: "ELITE PACKAGING", contact: "Robert Brown", email: "rb@elite.com", phone: "+1 917-555-0167", interest: "Heavy Duty Master Cartons", value: "$22,000", status: "New", date: "Mar 10, 2026", notes: "Urgent request for 10k units." },
  { id: 5, company: "PRIME PARTS", contact: "Linda Johnson", email: "l.j@primep.com", phone: "+1 214-555-0111", interest: "Custom Printed Boxes", value: "$6,800", status: "Contacted", date: "Mar 09, 2026" },
  { id: 6, company: "AUTOCORE INC.", contact: "Tom Harris", email: "tom@autocore.com", phone: "+1 650-555-0182", interest: "Export Packaging Grade A", value: "$3,200", status: "Closed", date: "Mar 08, 2026" },
];

const statusStyles: Record<InquiryStatus, { bg: string, color: string }> = {
  New: { bg: "bg-brand-50", color: "text-brand-600" },
  Contacted: { bg: "bg-blue-50", color: "text-blue-600" },
  Quoted: { bg: "bg-amber-50", color: "text-amber-600" },
  Closed: { bg: "bg-emerald-50", color: "text-emerald-600" },
};

const emptyForm = { company: "", contact: "", email: "", phone: "", interest: "Heavy Duty Master Cartons", value: "", status: "New" as InquiryStatus, notes: "" };

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | InquiryStatus>("All");
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = inquiries.filter(i => {
    const matchSearch = i.company.toLowerCase().includes(search.toLowerCase()) || 
                       i.contact.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || i.status === filter;
    return matchSearch && matchFilter;
  });

  const handleSave = () => {
    const newInquiry: Inquiry = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    setInquiries([newInquiry, ...inquiries]);
    setIsAddOpen(false);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    if (selectedInquiry) {
      setInquiries(inquiries.filter(i => i.id !== selectedInquiry.id));
      setIsDeleteOpen(false);
      setIsViewOpen(false);
      setSelectedInquiry(null);
    }
  };

  const handleStatusChange = (status: InquiryStatus) => {
    if (selectedInquiry) {
      setInquiries(inquiries.map(i => i.id === selectedInquiry.id ? { ...i, status } : i));
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const stats = [
    { label: "Incoming", value: inquiries.filter(i => i.status === "New").length, icon: MessageSquare, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Contacted", value: inquiries.filter(i => i.status === "Contacted").length, icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Quoted", value: inquiries.filter(i => i.status === "Quoted").length, icon: Mail, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Conversion", value: "83%", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

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
          <button onClick={() => setIsAddOpen(true)} className="btn-primary">
            <Plus className="w-4 h-4" /> New Inquiry
          </button>
        </div>
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
          {(["All", "New", "Contacted", "Quoted", "Closed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all",
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
        {filtered.map((inquiry) => (
          <div key={inquiry.id} className="premium-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-accent-500/20">
            <div className="flex-1 min-w-0 flex items-start gap-5">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0 group-hover:scale-110 transition-transform">
                {inquiry.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">{inquiry.company}</h3>
                  <div className={clsx("status-badge", statusStyles[inquiry.status].bg, statusStyles[inquiry.status].color)}>
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {inquiry.status}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {inquiry.contact}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {inquiry.date}</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md"><ArrowUpRight className="w-3.5 h-3.5" /> {inquiry.value}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-col items-end mr-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Interest</p>
                <p className="text-xs font-bold text-slate-500">{inquiry.interest}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setSelectedInquiry(inquiry); setIsViewOpen(true); }}
                  className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm group/btn"
                >
                  <Eye className="w-4.5 h-4.5" />
                </button>
                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                  <Mail className="w-4.5 h-4.5" />
                </button>
                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                  <Phone className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => { setSelectedInquiry(inquiry); setIsDeleteOpen(true); }}
                  className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm"
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
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-1">{selectedInquiry.company}</h3>
                    <p className="text-slate-500 font-medium flex items-center gap-2 mb-4"><Building className="w-4 h-4 opacity-30" /> Industrial Partner</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Point of Contact</p>
                        <p className="font-bold text-slate-900">{selectedInquiry.contact}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Contract Date</p>
                        <p className="font-bold text-slate-900">{selectedInquiry.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Est. Deal Value</p>
                     <p className="text-2xl font-display font-black tracking-tight">{selectedInquiry.value}</p>
                  </div>
                  <div className="bg-accent-50 text-accent-700 p-6 rounded-3xl border border-accent-100">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Interest</p>
                     <p className="text-sm font-black truncate">{selectedInquiry.interest}</p>
                  </div>
                </div>

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
                          selectedInquiry.status === s ? "bg-slate-900 text-white" : "bg-white border border-slate-100 text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {s}
                        {selectedInquiry.status === s && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Next Step</p>
                    <p className="text-xs font-bold text-slate-900">Follow up with final pricing for 7-ply boxes.</p>
                  </div>
                  <button className="w-full btn-primary justify-center shadow-lg shadow-brand-950/20 py-3.5">
                    Process Transaction
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
                <input value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})} className="w-full glass-input" placeholder="e.g. David Wilson" />
             </div>
             <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Interest</label>
                <select value={form.interest} onChange={(e) => setForm({...form, interest: e.target.value})} className="w-full glass-input">
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
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Deal Value</label>
                <input value={form.value} onChange={(e) => setForm({...form, value: e.target.value})} className="w-full glass-input" placeholder="e.g. $10,000" />
             </div>
           </div>
           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} rows={3} className="w-full glass-input resize-none" placeholder="Requirements, timelines, or specifications..." />
           </div>
           <div className="pt-4">
              <button onClick={handleSave} className="w-full btn-primary justify-center shadow-accent-500/20 py-4">
                Add to Pipeline
              </button>
           </div>
        </div>
      </Modal>

      <ConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Remove from Pipeline"
        message={`Are you sure you want to delete ${selectedInquiry?.company}? This will remove all associated logs and deal history.`}
      />
    </div>
  );
}
