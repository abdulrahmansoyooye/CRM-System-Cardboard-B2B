'use client'
import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobs, createJob, updateJob, deleteJob } from "@/services/job.service";
import { Plus, Edit2, Trash2, MapPin, Briefcase, Users, Building, ArrowUpRight, Search, Eye, CheckCircle2, XCircle, DollarSign, Clock, ShieldCheck } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

type JobStatus = "open" | "closed";
type JobType = "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";

interface Job {
  _id: string;
  title: string;
  department?: string;
  experience?: string;
  location?: string;
  type: JobType;
  salary?: string;
  description?: string;
  status: JobStatus;
  createdAt: string;
}

export default function JobsPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | JobType>("All");

  const jobs: Job[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch = j.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          j.department?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchType = filterType === "All" || j.type === filterType;
      return matchSearch && matchType;
    });
  }, [jobs, debouncedSearch, filterType]);

  const openFormModal = (job?: Job) => {
    openModal({
      title: job ? "Update Position" : "Provision New Slot",
      subtitle: job ? `Refining ${job.title}` : "Deploy a new recruitment mission for the industrial sector",
      size: "lg",
      view: (
        <JobForm 
          initialData={job} 
          onSubmit={(data) => job ? updateMutation.mutate({ id: job._id, data }) : createMutation.mutate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string, title: string) => {
    openModal({
      title: "Archive Position",
      subtitle: `System decommissioning: ${title}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4 font-display">
            Are you sure you want to permanently close this talent acquisition funnel? Existing applicant links will be severed.
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Abort</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              Confirm Closure
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Talent Acquisition</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Career Openings</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage global recruitment and industrial operations hiring</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-4 px-8 shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4" /> New Position
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          [
            { label: "Active Roles", value: jobs.filter(j => j.status === "open").length, icon: Briefcase, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Applicants", value: "48", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Locations", value: [...new Set(jobs.map(j => j.location))].length || 0, icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Growth Index", value: "+18%", icon: ArrowUpRight, color: "text-sky-600", bg: "bg-sky-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between group cursor-pointer hover:border-brand-100 transition-all">
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
          <input type="text" placeholder="Search by title or department..." className="w-full glass-input pl-14 py-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          {(["All", "Full-Time", "Part-Time", "Shift Basis", "Contract"] as const).map((t) => (
            <button key={t} onClick={() => setFilterType(t)} className={cn("px-6 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap uppercase tracking-widest", filterType === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-64" />) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="premium-card group overflow-hidden border-transparent hover:border-brand-500/30">
               <div className="p-7 space-y-5">
                  <div className="flex items-center justify-between">
                     <span className={cn("status-badge px-3 py-1 text-[10px] font-black uppercase tracking-widest", job.status === "open" ? "badge-success" : "badge-neutral")}>
                       {job.status}
                     </span>
                     <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest">{job.type}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-black text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Building className="w-3 h-3" /> {job.department || "Operations"}
                    </p>
                    <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {job.description || "No specific mission parameters defined for this role yet."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <MapPin className="w-4 h-4 text-slate-300" /> {job.location || "On-site"}
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                        <DollarSign className="w-4 h-4" /> {job.salary || "Competitive"}
                     </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                     <button onClick={() => openFormModal(job)} className="flex-1 py-3.5 rounded-xl bg-slate-950 text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
                       <Edit2 className="w-3.5 h-3.5" /> Modify Opening
                     </button>
                     <button onClick={() => openDeleteModal(job._id, job.title)} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                       <Trash2 className="w-4.5 h-4.5" />
                     </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function JobForm({ initialData, onSubmit, isSubmitting }: { initialData?: Job, onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    department: initialData?.department || "Operations",
    experience: initialData?.experience || "",
    location: initialData?.location || "Sector 4 Plant",
    type: initialData?.type || "Full-Time",
    salary: initialData?.salary || "",
    description: initialData?.description || "",
    status: initialData?.status || "open",
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Position Title</label>
          <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full glass-input" placeholder="e.g. Lead Industrial Automation Engineer" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Functional Vector</label>
          <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full glass-input">
            {["Operations", "Engineering", "Logistics", "Sales", "Marketing", "HR", "IT"].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Designation</label>
          <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as JobType})} className="w-full glass-input">
            {["Full-Time", "Part-Time", "Shift Basis", "Contract"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Location Pipeline</label>
          <input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full glass-input" placeholder="e.g. Dubai, UAE" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Experience Index</label>
          <input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full glass-input" placeholder="e.g. 5+ Years" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Budget Allocation</label>
          <input value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} className="w-full glass-input" placeholder="e.g. $8k - $12k / mo" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Active Funnel</label>
          <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as JobStatus})} className="w-full glass-input">
            <option value="open">Open - Accepting Transmissions</option>
            <option value="closed">Closed - Funnel Decommissioned</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Mission Specifics</label>
        <textarea rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full glass-input resize-none py-4 leading-relaxed" placeholder="Outline the primary talent requirements and daily industrial operations..." />
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full btn-primary justify-center py-5 font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/40">
        {isSubmitting ? "Syncing Logic..." : initialData ? "Update Mission Parameters" : "Deploy Career Opening"}
      </button>
    </form>
  );
}
