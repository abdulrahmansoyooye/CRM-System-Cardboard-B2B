"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, MapPin, Briefcase, Users, Building, ArrowUpRight, Search, Eye, CheckCircle2, XCircle, MoreHorizontal, User, Clock, ShieldCheck, DollarSign } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobs, createJob, updateJob, deleteJob } from "@/services/job.service";
import { clsx } from "clsx";

type JobStatus = "Open" | "Closed" | "Draft";
type JobType = "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";

interface Job {
  _id: string;
  title: string;
  department?: string;
  location?: string;
  type?: JobType;
  status: JobStatus;
  appsCount?: number;
  salary?: string;
  description?: string;
  experience?: string;
  createdAt: string;
}

const emptyForm = { 
  title: "", 
  department: "Operations", 
  location: "Sector 4 Plant", 
  type: "Full-Time" as JobType, 
  salary: "", 
  status: "Open" as JobStatus, 
  description: "",
  experience: "2-4 years"
};

export default function JobsPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | JobStatus>("All");
  
  const [addOpen, setAddOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setJobs(apiData.data.map((j: any) => ({
        ...j,
        status: j.status === "open" ? "Open" : j.status === "closed" ? "Closed" : "Draft"
      })));
    }
  }, [apiData]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setAddOpen(false);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setEditJob(null);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setDeleteTarget(null);
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleSave = () => {
    setIsSaving(true);
    const payload = { ...form, status: form.status.toLowerCase() };
    if (editJob) {
      updateMutation.mutate({ id: editJob._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const toggleStatus = (job: Job) => {
    const newStatus = job.status === "Open" ? "closed" : "open";
    updateMutation.mutate({ id: job._id, data: { status: newStatus } });
  };

  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || (j.department?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchStatus = filterStatus === "All" || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: "Open Slots", value: jobs.filter(j => j.status === "Open").length, icon: Briefcase, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Active Apps", value: jobs.reduce((sum, j) => sum + (j.appsCount || 0), 0), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Locations", value: [...new Set(jobs.map(j => j.location))].length, icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Last Posted", value: jobs.length > 0 ? new Date(jobs[0].createdAt).toLocaleDateString() : "--", icon: Clock, color: "text-accent-600", bg: "bg-accent-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch job postings. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Talent Acquisition</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Career Openings</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage global recruitment and industrial operations hiring</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { resetForm(); setAddOpen(true); }} className="btn-primary">
            <Plus className="w-4 h-4" /> New Position
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
          {(["All", "Open", "Draft", "Closed"] as const).map((t) => (
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
            placeholder="Search roles or departments..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4 pb-20">
        {isLoading ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full" />) : filtered.map((job) => (
          <div key={job._id} className="premium-card group p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-accent-500/20 transition-all">
            <div className="flex-1 min-w-0" onClick={() => { setEditJob(job); setForm({ ...job, description: job.description || "", department: job.department || "Operations", location: job.location || "Sector 4 Plant", type: job.type || "Full-Time", salary: job.salary || "", experience: job.experience || "2-4 years" }); }} style={{ cursor: "pointer" }}>
               <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className={clsx(
                    "status-badge",
                    job.status === "Open" ? "badge-success" : 
                    job.status === "Draft" ? "badge-warning" : "badge-neutral"
                  )}>
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {job.status}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 font-mono">{job.department}</span>
               </div>
               <h3 className="text-xl font-display font-black text-slate-900 mb-2 group-hover:text-accent-500 transition-colors leading-tight">{job.title}</h3>
               
               <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none border-l pl-6 border-slate-100">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary || "Not Specified"}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-brand-600 uppercase tracking-widest leading-none border-l pl-6 border-slate-100">
                    <Users className="w-3.5 h-3.5" /> {job.appsCount || 0} APPLICANTS
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2 lg:border-l lg:border-slate-100 lg:pl-8">
              <button 
                onClick={() => { setEditJob(job); setForm({ ...job, description: job.description || "", department: job.department || "Operations", location: job.location || "Sector 4 Plant", type: job.type || "Full-Time", salary: job.salary || "", experience: job.experience || "2-4 years" }); }}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              >
                 <Edit2 className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => toggleStatus(job)}
                className={clsx(
                  "p-3 bg-white border border-slate-100 rounded-xl transition-all shadow-sm",
                  job.status === "Open" ? "text-slate-400 hover:bg-rose-50 hover:text-rose-500" : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-500"
                )}
              >
                 {job.status === "Open" ? <XCircle className="w-4.5 h-4.5" /> : <CheckCircle2 className="w-4.5 h-4.5" />}
              </button>
              <button 
                onClick={() => setDeleteTarget(job._id)}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
              >
                 <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}
        {!isLoading && filtered.length === 0 && (
          <div className="px-7 py-16 text-center text-slate-400">
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-bold">No active job positions found</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={addOpen || !!editJob} onClose={() => { setAddOpen(false); setEditJob(null); resetForm(); }} title={addOpen ? "Deploy New Slot" : "Adjust Position"} size="lg">
         <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Job Title</label>
              <input className="w-full glass-input py-4 text-lg font-bold" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g. Industrial Engineer" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Department</label>
                <select className="w-full glass-input" value={form.department} onChange={(e) => setForm({...form, department: e.target.value})}>
                  {["Operations", "Sales", "Engineering", "Marketing", "HR", "Logistics"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Location</label>
                <select className="w-full glass-input" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}>
                   {["Sector 4 Plant", "Corporate HQ", "Remote"].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Employment Type</label>
                  <select className="w-full glass-input" value={form.type} onChange={(e) => setForm({...form, type: e.target.value as JobType})}>
                    {["Full-Time", "Part-Time", "Shift Basis", "Contract"].map(t => <option key={t}>{t}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Salary Budget</label>
                  <input className="w-full glass-input" value={form.salary} onChange={(e) => setForm({...form, salary: e.target.value})} placeholder="e.g. $40k - $60k" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Required Experience</label>
               <input className="w-full glass-input" value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} placeholder="e.g. 2-4 years" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Job Overview</label>
               <textarea rows={4} className="w-full glass-input resize-none" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Describe the mission and daily duties..." />
            </div>
            <div className="pt-4 flex gap-4">
              <button disabled={isSaving} onClick={handleSave} className="flex-1 btn-primary justify-center shadow-brand-950/20 py-4 font-black">
                {isSaving ? "Syncing..." : addOpen ? "Post Position" : "Update Opening"}
              </button>
            </div>
         </div>
      </Modal>

      <ConfirmModal 
         isOpen={!!deleteTarget}
         onClose={() => setDeleteTarget(null)}
         onConfirm={() => { deleteMutation.mutate(deleteTarget!); }}
         title="Archive Position"
         message="Permanently removing this role will disconnect all existing applicant links. Continue?"
         danger
      />
    </div>
  );
}
