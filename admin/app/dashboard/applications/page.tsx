"use client";

import { useState } from "react";
import { Search, Eye, Download, CheckCircle2, XCircle, Clock, Users, Mail, Phone, Calendar, FileText, Trash2, MoreHorizontal, User, ShieldCheck, ArrowUpRight } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import { clsx } from "clsx";

type AppStatus = "New" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";

interface Application {
  id: string;
  name: string;
  job: string;
  email: string;
  phone: string;
  applied: string;
  status: AppStatus;
  coverLetter?: string;
}

const INITIAL_APPS: Application[] = [
  { id: "APP-001", name: "Mohammed Al-Rashid", job: "Production Shift Manager", email: "m.rashid@email.com", phone: "+971-50-1234567", applied: "Mar 12, 2026", status: "New", coverLetter: "I have 8 years of hands-on experience managing production shifts in corrugated manufacturing..." },
  { id: "APP-002", name: "Amina Sulaiman", job: "Quality Assurance Analyst", email: "amina.s@mail.com", phone: "+971-55-9876543", applied: "Mar 11, 2026", status: "Reviewed" },
  { id: "APP-003", name: "Raj Kumar Patel", job: "Export Sales Executive", email: "raj.patel@corp.in", phone: "+91-98-1234567", applied: "Mar 10, 2026", status: "Shortlisted", coverLetter: "With 5 years in B2B export sales across 12 countries, I am confident I can expand Cardbox's international reach..." },
  { id: "APP-004", name: "Sarah Thompson", job: "Maintenance Engineer (Corrugator)", email: "s.thompson@eng.com", phone: "+44-73-1234567", applied: "Mar 9, 2026", status: "Rejected" },
  { id: "APP-005", name: "Li Wei Zhang", job: "Export Sales Executive", email: "li.zhang@trade.cn", phone: "+86-138-1234567", applied: "Mar 8, 2026", status: "New" },
  { id: "APP-006", name: "Carlos Mendez", job: "Fleet Logistics Coordinator", email: "c.mendez@fleet.mx", phone: "+52-55-1234567", applied: "Mar 7, 2026", status: "Hired", coverLetter: "I have coordinated fleet operations for over 200 vehicles across 3 facilities..." },
];

const STATUS_VALUES: AppStatus[] = ["New", "Reviewed", "Shortlisted", "Rejected", "Hired"];

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>(INITIAL_APPS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | AppStatus>("All");
  
  const [viewApp, setViewApp] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = apps.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.job.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Incoming", value: apps.filter(a => a.status === "New").length, icon: Clock, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Reviewed", value: apps.filter(a => a.status === "Reviewed").length, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Shortlisted", value: apps.filter(a => a.status === "Shortlisted").length, icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Hired", value: apps.filter(a => a.status === "Hired").length, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const updateStatus = (id: string, s: AppStatus) => {
    setApps(apps.map(a => a.id === id ? { ...a, status: s } : a));
    if (viewApp?.id === id) setViewApp({ ...viewApp, status: s });
  };

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Talent Pipeline</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Job Applications</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Review and manage candidate applications across departments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5 shadow-none"><Download className="w-4 h-4" /><span className="text-xs hidden sm:inline uppercase font-black tracking-widest">Export Archive</span></button>
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
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(["All", ...STATUS_VALUES] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterStatus(t)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap",
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
            placeholder="Search by name or position..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="premium-card overflow-hidden pb-10">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</th>
              <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Applied For</th>
              <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
              <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-7 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((app) => (
              <tr key={app.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setViewApp(app)}>
                <td className="px-7 py-5">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-slate-900/10">
                        {app.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{app.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold tracking-tight uppercase">{app.id}</span>
                      </div>
                   </div>
                </td>
                <td className="px-7 py-5">
                   <span className="text-xs font-bold text-slate-600 block max-w-[200px] truncate">{app.job}</span>
                   <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Applied {app.applied}</span>
                </td>
                <td className="px-7 py-5">
                   <p className="text-xs font-bold text-slate-700">{app.email}</p>
                   <p className="text-[10px] text-slate-400">{app.phone}</p>
                </td>
                <td className="px-7 py-5">
                   <div className={clsx(
                      "status-badge",
                      app.status === "New" ? "badge-success" : 
                      app.status === "Hired" ? "badge-success" :
                      app.status === "Rejected" ? "badge-error" : 
                      app.status === "Shortlisted" ? "badge-warning" : "badge-neutral"
                    )}>
                      {app.status}
                    </div>
                </td>
                <td className="px-7 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewApp(app)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><Eye className="w-4.5 h-4.5" /></button>
                      <button className="p-2.5 rounded-xl hover:bg-blue-50 text-sky-500 transition-colors"><Download className="w-4.5 h-4.5" /></button>
                      <button onClick={() => setDeleteTarget(app.id)} className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-400 transition-colors"><XCircle className="w-4.5 h-4.5" /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: View Application */}
      <Modal isOpen={!!viewApp} onClose={() => setViewApp(null)} title={viewApp?.name ?? ""} subtitle={`Application for ${viewApp?.job}`} size="lg">
        {viewApp && (
          <div className="space-y-8 py-4">
             <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
                   <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-2xl font-black">{viewApp.name[0]}</div>
                         <div>
                            <h3 className="text-2xl font-display font-black text-slate-900">{viewApp.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-xs font-bold text-slate-400">{viewApp.email}</span>
                               <span className="w-1 h-1 rounded-full bg-slate-200" />
                               <span className="text-xs font-bold text-slate-400">{viewApp.phone}</span>
                            </div>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Applying For</p>
                           <p className="text-sm font-bold text-slate-900">{viewApp.job}</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Application ID</p>
                           <p className="text-sm font-bold text-slate-900 font-mono uppercase">{viewApp.id}</p>
                        </div>
                      </div>
                   </div>

                   {viewApp.coverLetter && (
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 ml-2">Cover Letter Statement</label>
                        <div className="bg-brand-50/30 p-8 rounded-[40px] border border-brand-100 text-slate-600 font-medium leading-relaxed italic relative">
                           <FileText className="absolute top-6 right-8 w-6 h-6 opacity-10" />
                           "{viewApp.coverLetter}"
                        </div>
                      </div>
                   )}
                </div>

                <div className="w-full md:w-64 space-y-6">
                   <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">Pipeline Status</label>
                      <div className="space-y-2">
                        {STATUS_VALUES.map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(viewApp.id, s)}
                            className={clsx(
                              "w-full px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-between",
                              viewApp.status === s ? "bg-slate-900 text-white shadow-xl translate-x-2" : "bg-white border border-slate-100 text-slate-400 hover:border-slate-300"
                            )}
                          >
                             {s}
                             {viewApp.status === s && <CheckCircle2 className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="pt-6 border-t border-slate-100">
                      <button onClick={() => updateStatus(viewApp.id, "Hired")} className="w-full btn-primary justify-center shadow-emerald-500/10 py-4 mb-3">
                        Onboard Candidate
                      </button>
                      <button onClick={() => setDeleteTarget(viewApp.id)} className="w-full py-3.5 text-xs font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all">
                        Reject Profile
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </Modal>

      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { setApps(apps.filter(a => a.id !== deleteTarget)); setDeleteTarget(null); setViewApp(null); }}
        title="Remove Candidate"
        message="This will permanently delete the application profile and all associated files. Proceed?"
      />
    </div>
  );
}
