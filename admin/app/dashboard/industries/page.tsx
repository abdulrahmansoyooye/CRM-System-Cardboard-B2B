"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Link as LinkIcon, Image as ImageIcon, Building2, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import { clsx } from "clsx";

type IndustryStatus = "Active" | "Draft" | "Archived";

interface Industry {
  id: number;
  name: string;
  description: string;
  productsCount: number;
  status: IndustryStatus;
  updatedAt: string;
}

const INITIAL_INDUSTRIES: Industry[] = [
  { id: 1, name: "Fast-Moving Consumer Goods", description: "Standard packaging for high-volume retail products, food, and beverages.", productsCount: 12, status: "Active", updatedAt: "2024-03-15" },
  { id: 2, name: "Electronics & Appliances", description: "Anti-static and heavy-duty corrugated solutions for sensitive electronic equipment.", productsCount: 8, status: "Active", updatedAt: "2024-03-14" },
  { id: 3, name: "Fresh Produce Export", description: "Moisture-resistant packaging designed for air and sea freight of perishables.", productsCount: 6, status: "Active", updatedAt: "2024-03-12" },
  { id: 4, name: "Automotive Components", description: "High-strength boxes for heavy mechanical parts and industrial components.", productsCount: 15, status: "Active", updatedAt: "2024-03-10" },
  { id: 5, name: "E-commerce Logistics", description: "Optimized sizes for parcel shipping with focus on durability and Branding.", productsCount: 22, status: "Active", updatedAt: "2024-03-08" },
  { id: 6, name: "Pharmaceuticals", description: "Clean-room compatible and temperature-stabilizing packaging for medical goods.", productsCount: 4, status: "Draft", updatedAt: "2024-03-05" },
];

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>(INITIAL_INDUSTRIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<IndustryStatus | "All">("All");
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active" as IndustryStatus,
  });

  const filtered = industries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    const newIndustry: Industry = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      productsCount: 0,
      status: form.status,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setIndustries([newIndustry, ...industries]);
    setIsAddOpen(false);
    resetForm();
  };

  const handleUpdate = () => {
    if (!selectedIndustry) return;
    setIndustries(industries.map(i => 
      i.id === selectedIndustry.id ? { ...i, ...form, updatedAt: new Date().toISOString().split('T')[0] } : i
    ));
    setIsEditOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedIndustry) return;
    setIndustries(industries.filter(i => i.id !== selectedIndustry.id));
    setIsDeleteOpen(false);
  };

  const resetForm = () => {
    setForm({ name: "", description: "", status: "Active" });
    setSelectedIndustry(null);
  };

  const openEdit = (i: Industry) => {
    setSelectedIndustry(i);
    setForm({ name: i.name, description: i.description, status: i.status });
    setIsEditOpen(true);
  };

  const openView = (i: Industry) => {
    setSelectedIndustry(i);
    setIsViewOpen(true);
  };

  const openDelete = (i: Industry) => {
    setSelectedIndustry(i);
    setIsDeleteOpen(true);
  };

  const stats = [
    { label: "Total Sectors", value: industries.length, icon: Building2, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Active", value: industries.filter(i => i.status === "Active").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Drafts", value: industries.filter(i => i.status === "Draft").length, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Reach", value: "85%", icon: LinkIcon, color: "text-sky-600", bg: "bg-sky-50" },
  ];

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
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search industries..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
          {(["All", "Active", "Draft", "Archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all",
                statusFilter === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
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
            {filtered.map((ind) => (
              <tr key={ind.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-7 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{ind.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium tracking-tight">Updated {ind.updatedAt}</span>
                    </div>
                  </div>
                </td>
                <td className="px-7 py-5">
                  <p className="text-slate-500 line-clamp-1 max-w-xs">{ind.description}</p>
                </td>
                <td className="px-7 py-5">
                  <div className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-lg w-fit">
                    {ind.productsCount} SKUs
                  </div>
                </td>
                <td className="px-7 py-5">
                  <div className={clsx(
                    "status-badge",
                    ind.status === "Active" ? "badge-success" : 
                    ind.status === "Draft" ? "badge-warning" : "badge-neutral"
                  )}>
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {ind.status}
                  </div>
                </td>
                <td className="px-7 py-5">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openView(ind)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <button onClick={() => openEdit(ind)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => openDelete(ind)} className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={isAddOpen || isEditOpen} 
        onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }} 
        title={isAddOpen ? "Add New Sector" : "Edit Industrial Sector"}
        subtitle="Define industry requirements and scope"
        size="md"
      >
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Sector Name</label>
            <input 
              className="w-full glass-input" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Maritime Logistics" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Description</label>
            <textarea 
              rows={4} 
              className="w-full glass-input resize-none" 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Primary use cases and packaging standards..." 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Status</label>
            <select 
              className="w-full glass-input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as IndustryStatus })}
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              onClick={isAddOpen ? handleCreate : handleUpdate} 
              className="flex-1 btn-primary justify-center"
            >
              {isAddOpen ? "Create Sector" : "Save Changes"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Sector Overview" size="md">
        {selectedIndustry && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 text-2xl font-black">
                {selectedIndustry.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">{selectedIndustry.name}</h3>
                <div className={clsx(
                  "status-badge mt-1",
                  selectedIndustry.status === "Active" ? "badge-success" : "badge-neutral"
                )}>
                  {selectedIndustry.status}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Detailed Description</p>
                <p className="text-slate-600 leading-relaxed">{selectedIndustry.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Products</p>
                  <p className="text-2xl font-display font-black text-slate-900">{selectedIndustry.productsCount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Last Migration</p>
                  <p className="text-sm font-bold text-slate-900">{selectedIndustry.updatedAt}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Sector"
        message={`Are you sure you want to remove ${selectedIndustry?.name}? This action will unassign all linked products.`}
      />
    </div>
  );
}
