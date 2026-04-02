'use client'
import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getIndustries, createIndustry, updateIndustry, deleteIndustry } from "@/services/industry.service";
import { Plus, Search, Edit2, Trash2, Building2, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

interface Industry {
  _id: string;
  name: string;
  slug: string;
  overview?: string;
  relatedProducts?: any[];
  images?: string[];
  isActive: boolean;
  updatedAt: string;
}

export default function IndustriesPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["industries"],
    queryFn: getIndustries,
  });

  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<"All" | "Active" | "Inactive">("All");

  const industries: Industry[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createIndustry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateIndustry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIndustry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const filteredIndustries = useMemo(() => {
    return industries.filter((i) => {
      const matchSearch = i.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = filterActive === "All" || (filterActive === "Active" ? i.isActive : !i.isActive);
      return matchSearch && matchStatus;
    });
  }, [industries, debouncedSearch, filterActive]);

  const openFormModal = (industry?: Industry) => {
    openModal({
      title: industry ? "Edit Industrial Sector" : "Provision New Sector",
      subtitle: industry ? `Updating ${industry.name}` : "Define a new target market for industrial solutions",
      size: "md",
      view: (
        <IndustryForm 
          initialData={industry} 
          onSubmit={(data) => industry ? updateMutation.mutate({ id: industry._id, data }) : createMutation.mutate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string, name: string) => {
    openModal({
      title: "Archive Sector",
      subtitle: `System decommissioning: ${name}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4">
            Are you sure you want to permanently remove this industrial sector? This will unmap all associated mission protocols.
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Abort</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              {deleteMutation.isPending ? "Syncing..." : "Confirm Deletion"}
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Market Management</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Industries Served</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage industrial sectors and their specific packaging logic</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-4 px-8 shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4" /> Add Sector
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          [
            { label: "Total Sectors", value: industries.length, icon: Building2, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Active Pipelines", value: industries.filter(i => i.isActive).length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Draft Ops", value: industries.filter(i => !i.isActive).length, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Integration Rate", value: "98.2%", icon: Plus, color: "text-sky-600", bg: "bg-sky-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-7 group hover:translate-y-[-4px] transition-all duration-300">
               <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", s.bg, s.color)}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Live</div>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
               <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
            </div>
          ))
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search industrial sectors..." className="w-full glass-input pl-14 py-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(["All", "Active", "Inactive"] as const).map((s) => (
            <button key={s} onClick={() => setFilterActive(s)} className={cn("px-6 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap", filterActive === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}>{s}</button>
          ))}
        </div>
      </div>

      {/* Grid Layout for Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-64" />) : (
          filteredIndustries.map((ind) => (
            <div key={ind._id} className="premium-card p-1 overflow-hidden group cursor-pointer border-transparent hover:border-brand-500 group">
              <div className="p-7 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-950/20 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-xl font-black">{ind.name[0]}</span>
                  </div>
                  <div className={cn("status-badge", ind.isActive ? "badge-success" : "badge-neutral")}>
                    {ind.isActive ? "Active Pipeline" : "Deactivated"}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 mb-2 truncate">{ind.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
                    {ind.overview || "No overview documentation available for this mission sector."}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Associated SKUs</span>
                      <span className="text-sm font-bold text-slate-700">{ind.relatedProducts?.length || 0} Products</span>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => openFormModal(ind)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => openDeleteModal(ind._id, ind.name)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function IndustryForm({ initialData, onSubmit, isSubmitting }: { initialData?: Industry, onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    overview: initialData?.overview || "",
    isActive: initialData?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onSubmit({ ...formData, slug });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Sector Designation</label>
        <input 
          required
          className="w-full glass-input py-4 text-lg font-bold" 
          placeholder="e.g. Pharmaceutical Packaging" 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Mission Pipeline Overview</label>
        <textarea 
          rows={5}
          className="w-full glass-input resize-none py-4 leading-relaxed" 
          placeholder="Describe the industrial scope and primary packaging logic for this sector..." 
          value={formData.overview} 
          onChange={(e) => setFormData({ ...formData, overview: e.target.value })} 
        />
      </div>
      <div className="flex items-center gap-4 py-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
            className={cn("w-12 h-6 rounded-full transition-all relative border border-slate-200", formData.isActive ? "bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all", formData.isActive ? "left-6.5" : "left-0.5")} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">Active Protocol Status</span>
        </label>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full btn-primary justify-center py-5 font-black mt-4 shadow-2xl shadow-brand-500/40 text-sm tracking-widest uppercase"
      >
        {isSubmitting ? "Syncing Logic..." : initialData ? "Update Documentation" : "Establish Sector"}
      </button>
    </form>
  );
}
