"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Link as LinkIcon, Image as ImageIcon, Building2, CheckCircle2, AlertCircle } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getIndustries, createIndustry, updateIndustry, deleteIndustry } from "@/services/industry.service";
import { clsx } from "clsx";

type IndustryStatus = "Active" | "Draft" | "Archived";

interface Industry {
  _id: string;
  name: string;
  slug?: string;
  overview?: string;
  description?: string;
  isActive?: boolean;
  status?: IndustryStatus;
  updatedAt: string;
  productsCount?: number;
}

export default function IndustriesPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["industries"], queryFn: getIndustries });

  const [industries, setIndustries] = useState<Industry[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<IndustryStatus | "All">("All");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({ name: "", description: "", status: "Active" as IndustryStatus });

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setIndustries(apiData.data.map((i: any) => ({
        ...i,
        status: i.isActive !== false ? "Active" : "Archived",
        description: i.overview || i.description || "",
        productsCount: i.relatedProducts?.length ?? 0,
      })));
    }
  }, [apiData]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createIndustry(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["industries"] }); setIsAddOpen(false); resetForm(); setIsSaving(false); },
    onError: () => setIsSaving(false),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateIndustry(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["industries"] }); setIsEditOpen(false); resetForm(); setIsSaving(false); },
    onError: () => setIsSaving(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteIndustry(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["industries"] }); setIsDeleteOpen(false); setSelectedIndustry(null); },
  });

  const filtered = industries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    setIsSaving(true);
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    createMutation.mutate({ name: form.name, slug, overview: form.description, isActive: form.status === "Active" });
  };

  const handleUpdate = () => {
    if (!selectedIndustry) return;
    setIsSaving(true);
    updateMutation.mutate({ id: selectedIndustry._id, data: { name: form.name, overview: form.description, isActive: form.status === "Active" } });
  };

  const handleDelete = () => {
    if (!selectedIndustry) return;
    deleteMutation.mutate(selectedIndustry._id);
  };

  const resetForm = () => { setForm({ name: "", description: "", status: "Active" }); setSelectedIndustry(null); };

  const openEdit = (i: Industry) => {
    setSelectedIndustry(i);
    setForm({ name: i.name, description: i.description || "", status: i.status || "Active" });
    setIsEditOpen(true);
  };

  const openView = (i: Industry) => { setSelectedIndustry(i); setIsViewOpen(true); };
  const openDelete = (i: Industry) => { setSelectedIndustry(i); setIsDeleteOpen(true); };

  const stats = [
    { label: "Total Sectors", value: industries.length, icon: Building2, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Active", value: industries.filter(i => i.status === "Active").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Drafts", value: industries.filter(i => i.status === "Draft").length, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Reach", value: "85%", icon: LinkIcon, color: "text-sky-600", bg: "bg-sky-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch industries. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  const FormContent = () => (
    <div className="space-y-5 py-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Sector Name</label>
        <input className="w-full glass-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Maritime Logistics" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Description</label>
        <textarea rows={4} className="w-full glass-input resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Primary use cases and packaging standards..." />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Status</label>
        <select className="w-full glass-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as IndustryStatus })}>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <div className="pt-4 flex gap-3">
        <button disabled={isSaving} onClick={isAddOpen ? handleCreate : handleUpdate} className="flex-1 btn-primary justify-center disabled:opacity-60">
          {isSaving ? "Saving..." : isAddOpen ? "Create Sector" : "Save Changes"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Market Management</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Industries Served</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage industry sectors and their packaging requirements</p>
        </div>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn-primary">
          <Plus className="w-4 h-4" /> Add New Sector
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          stats.map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input type="text" placeholder="Search industries..." className="w-full glass-input pl-12 py-3" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
          {(["All", "Active", "Draft", "Archived"] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={clsx("px-5 py-2 text-xs font-bold rounded-xl transition-all", statusFilter === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-7 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Name</th>
              <th className="px-7 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
              <th className="px-7 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Products</th>
              <th className="px-7 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-7 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? Array(4).fill(0).map((_, i) => (
              <tr key={i}><td colSpan={5} className="px-7 py-5"><Skeleton className="h-12 w-full" /></td></tr>
            )) : filtered.map((ind) => (
              <tr key={ind._id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-7 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 text-sm font-black">{ind.name[0]}</div>
                    <div>
                      <span className="font-bold text-slate-900 block">{ind.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium tracking-tight">Updated {new Date(ind.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </td>
                <td className="px-7 py-5"><p className="text-slate-500 line-clamp-1 max-w-xs">{ind.description}</p></td>
                <td className="px-7 py-5">
                  <div className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-lg w-fit">{ind.productsCount ?? 0} SKUs</div>
                </td>
                <td className="px-7 py-5">
                  <div className={clsx("status-badge", ind.status === "Active" ? "badge-success" : ind.status === "Draft" ? "badge-warning" : "badge-neutral")}>
                    <div className="w-1 h-1 rounded-full bg-current" />{ind.status}
                  </div>
                </td>
                <td className="px-7 py-5">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openView(ind)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"><ImageIcon className="w-4 h-4" /></button>
                    <button onClick={() => openEdit(ind)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => openDelete(ind)} className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && (
          <div className="px-7 py-16 text-center text-slate-400">
            <Building2 className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-bold">No industries found</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={isAddOpen || isEditOpen} onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }} title={isAddOpen ? "Add New Sector" : "Edit Industrial Sector"} subtitle="Define industry requirements and scope" size="md">
        <FormContent />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Sector Overview" size="md">
        {selectedIndustry && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 text-2xl font-black">{selectedIndustry.name[0]}</div>
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">{selectedIndustry.name}</h3>
                <div className={clsx("status-badge mt-1", selectedIndustry.status === "Active" ? "badge-success" : "badge-neutral")}>{selectedIndustry.status}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Detailed Description</p>
                <p className="text-slate-600 leading-relaxed">{selectedIndustry.description || "No description provided."}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Products</p>
                  <p className="text-2xl font-display font-black text-slate-900">{selectedIndustry.productsCount ?? 0}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Last Updated</p>
                  <p className="text-sm font-bold text-slate-900">{new Date(selectedIndustry.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} title="Delete Sector" message={`Are you sure you want to remove ${selectedIndustry?.name}? This action will unassign all linked products.`} danger />
    </div>
  );
}
