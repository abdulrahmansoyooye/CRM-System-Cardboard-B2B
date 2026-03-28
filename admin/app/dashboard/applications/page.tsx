"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Download, CheckCircle2, XCircle, Clock, Users, Mail, Phone, Calendar, FileText, Trash2, MoreHorizontal, User, ShieldCheck, ArrowUpRight } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getApplications, updateApplication, deleteApplication } from "@/services/application.service";
import { clsx } from "clsx";

type AppStatus = "New" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";

interface Application {
  _id: string;
  name: string;
  jobId?: { title: string };
  email: string;
  phone?: string;
  status: AppStatus;
  notes?: string;
  createdAt: string;
  resumeFile?: string;
}

const statusStyles: Record<AppStatus, { bg: string, color: string }> = {
  New: { bg: "bg-brand-50", color: "text-brand-600" },
  Reviewed: { bg: "bg-blue-50", color: "text-blue-600" },
  Shortlisted: { bg: "bg-amber-50", color: "text-amber-600" },
  Rejected: { bg: "bg-rose-50", color: "text-rose-600" },
  Hired: { bg: "bg-emerald-50", color: "text-emerald-600" },
};

export default function ApplicationsPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["applications"], queryFn: getApplications });

  const [apps, setApps] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | AppStatus>("All");
  
  const [viewApp, setViewApp] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setApps(apiData.data.map((a: any) => ({
        ...a,
        status: a.status === "new" ? "New" : 
                a.status === "reviewed" ? "Reviewed" : 
                a.status === "shortlisted" ? "Shortlisted" : 
                a.status === "rejected" ? "Rejected" : "Hired"
      })));
    }
  }, [apiData]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setDeleteTarget(null);
      setViewApp(null);
    },
  });

  const updateStatus = (id: string, s: AppStatus) => {
    updateMutation.mutate({ id, data: { status: s.toLowerCase() } });
    if (viewApp?._id === id) setViewApp({ ...viewApp, status: s });
  };

  const filtered = apps.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || (a.jobId?.title.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Incoming", value: apps.filter(a => a.status === "New").length, icon: Clock, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Reviewed", value: apps.filter(a => a.status === "Reviewed").length, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Shortlisted", value: apps.filter(a => a.status === "Shortlisted").length, icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Hired", value: apps.filter(a => a.status === "Hired").length, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch applications. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

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
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : stats.map((s) => (
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
          {(["All", "New", "Reviewed", "Shortlisted", "Rejected", "Hired"] as const).map((t) => (
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
            {isLoading ? Array(4).fill(0).map((_, i) => (
               <tr key={i}><td colSpan={5} className="px-7 py-5"><Skeleton className="h-10 w-full" /></td></tr>
            )) : filtered.map((app) => (
              <tr key={app._id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setViewApp(app)}>
                <td className="px-7 py-5">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-slate-900/10">
                        {app.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{app.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold tracking-tight uppercase truncate max-w-[100px] block">{app._id}</span>
                      </div>
                   </div>
                </td>
                <td className="px-7 py-5">
                   <span className="text-xs font-bold text-slate-600 block max-w-[200px] truncate">{app.jobId?.title || "General Application"}</span>
                   <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                </td>
                <td className="px-7 py-5">
                   <p className="text-xs font-bold text-slate-700">{app.email}</p>
                   <p className="text-[10px] text-slate-400">{app.phone || "No Phone"}</p>
                </td>
                <td className="px-7 py-5">
                   <div className={clsx("status-badge", statusStyles[app.status].bg, statusStyles[app.status].color)}>
                      {app.status}
                    </div>
                </td>
                <td className="px-7 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewApp(app)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><Eye className="w-4.5 h-4.5" /></button>
                      <button className="p-2.5 rounded-xl hover:bg-blue-50 text-sky-500 transition-colors"><Download className="w-4.5 h-4.5" /></button>
                      <button onClick={() => setDeleteTarget(app._id)} className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-400 transition-colors"><XCircle className="w-4.5 h-4.5" /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && (
          <div className="px-7 py-16 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-bold">No applications found</p>
          </div>
        )}
      </div>

      {/* Modal: View Application */}
      <Modal isOpen={!!viewApp} onClose={() => setViewApp(null)} title={viewApp?.name ?? ""} subtitle={`Application for ${viewApp?.jobId?.title || "General"}`} size="lg">
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
                               <span className="text-xs font-bold text-slate-400">{viewApp.phone || "No phone provided"}</span>
                            </div>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Applying For</p>
                           <p className="text-sm font-bold text-slate-900">{viewApp.jobId?.title || "General"}</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Internal Reference</p>
                           <p className="text-sm font-bold text-slate-900 font-mono uppercase truncate">{viewApp._id}</p>
                        </div>
                      </div>
                   </div>

                   {viewApp.notes && (
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 ml-2">Internal Notes</label>
                        <div className="bg-brand-50/30 p-8 rounded-[40px] border border-brand-100 text-slate-600 font-medium leading-relaxed italic relative">
                           <FileText className="absolute top-6 right-8 w-6 h-6 opacity-10" />
                           "{viewApp.notes}"
                        </div>
                      </div>
                   )}
                   
                   {!viewApp.notes && (
                      <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200 text-center">
                        <p className="text-xs font-bold text-slate-400">No interior notes compiled for this candidate yet.</p>
                      </div>
                   )}
                </div>

                <div className="w-full md:w-64 space-y-6">
                   <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">Pipeline Status</label>
                      <div className="space-y-2">
                        {(["New", "Reviewed", "Shortlisted", "Rejected", "Hired"] as AppStatus[]).map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(viewApp._id, s)}
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
                      <button onClick={() => updateStatus(viewApp._id, "Hired")} className="w-full btn-primary justify-center shadow-emerald-500/10 py-4 mb-3">
                        Onboard Candidate
                      </button>
                      <button onClick={() => setDeleteTarget(viewApp._id)} className="w-full py-3.5 text-xs font-black text-rose-50 uppercase tracking-widest hover:bg-rose-50 text-rose-500 rounded-2xl transition-all">
                        Delete Profile
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
        onConfirm={() => { deleteMutation.mutate(deleteTarget!); }}
        title="Remove Candidate"
        message="This will permanently delete the application profile and all associated files. Proceed?"
        danger
      />
    </div>
  );
}
