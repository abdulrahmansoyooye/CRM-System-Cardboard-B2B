'use client'
import React, { useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/services/category.service";
import { Plus, Search, Edit2, Trash2, Layers, CheckCircle2, AlertCircle, Image as ImageIcon, ArrowUpRight, Clock } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  isActive: boolean;
  createdAt: string;
  products?: any[]; // Populated virtual
}

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<"All" | "Active" | "Inactive">("All");

  const categories: Category[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchSearch = c.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = filterActive === "All" || (filterActive === "Active" ? c.isActive : !c.isActive);
      return matchSearch && matchStatus;
    });
  }, [categories, debouncedSearch, filterActive]);

  const openFormModal = (category?: Category) => {
    openModal({
      title: category ? "Modify Taxonomy" : "Define New Category",
      subtitle: category ? `Updating logic for ${category.name}` : "Classify products into a new industrial vertical",
      size: "md",
      view: (
        <CategoryForm 
          initialData={category} 
          onSubmit={(data) => category ? updateMutation.mutate({ id: category._id, data }) : createMutation.mutate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string, name: string) => {
    openModal({
      title: "Decommission Category",
      subtitle: `System purging: ${name}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4 font-display">
            Are you sure you want to permanently remove this category? Products mapped to this ID will lose their taxonomy signal.
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Abort</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              Confirm Purge
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Product Architecture</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Taxonomy Control</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage global product categories and classification logic</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-4 px-8 shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4" /> New Category
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          [
            { label: "Total Classes", value: categories.length, icon: Layers, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Active Nodes", value: categories.filter(c => c.isActive).length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Inventory Map", value: "100%", icon: ArrowUpRight, color: "text-sky-600", bg: "bg-sky-50" },
            { label: "Last Sync", value: "2h ago", icon: Clock, color: "text-slate-400", bg: "bg-slate-50" },
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
          <input type="text" placeholder="Search categories by designation..." className="w-full glass-input pl-14 py-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          {(["All", "Active", "Inactive"] as const).map((s) => (
            <button key={s} onClick={() => setFilterActive(s)} className={cn("px-6 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap uppercase tracking-widest", filterActive === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-64" />) : (
          filteredCategories.map((cat) => (
            <div key={cat._id} className="premium-card group overflow-hidden border-transparent hover:border-brand-500/30 flex flex-col">
              <div className="h-32 bg-slate-100 relative overflow-hidden shrink-0">
                {cat.coverImage ? (
                  <img src={cat.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={cn("status-badge px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-xl", cat.isActive ? "badge-success" : "badge-neutral")}>
                    {cat.isActive ? "Active" : "Archived"}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 mb-2 truncate group-hover:text-brand-600 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {cat.description || "No classification parameters defined for this taxonomic node."}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest leading-tight">SKU Volume</span>
                    <span className="text-sm font-bold text-slate-700">{cat.products?.length || 0} Products</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openFormModal(cat)} className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => openDeleteModal(cat._id, cat.name)} className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
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

function CategoryForm({ initialData, onSubmit, isSubmitting }: { initialData?: Category, onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    coverImage: initialData?.coverImage || "",
    isActive: initialData?.isActive ?? true,
  });

  // Auto-generate slug from name
  React.useEffect(() => {
    if (!initialData && formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      }));
    }
  }, [formData.name, initialData]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Category Designation</label>
        <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full glass-input py-4 text-lg font-bold" placeholder="e.g. Heavy Duty Corrugated" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Taxonomic Slug</label>
          <input required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full glass-input font-mono text-xs" placeholder="heavy-duty-cartons" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Network Status</label>
          <select value={formData.isActive ? "true" : "false"} onChange={(e) => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full glass-input">
            <option value="true">Active Pipeline</option>
            <option value="false">Static/Archived</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Cover Asset URL</label>
        <input value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} className="w-full glass-input" placeholder="https://cdn.cardbox.demo/image.webp" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Functional Description</label>
        <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full glass-input resize-none py-4 leading-relaxed" placeholder="Define the primary use-case and technical limits for this category..." />
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full btn-primary justify-center py-5 font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/40">
        {isSubmitting ? "Syncing Logic..." : initialData ? "Confirm Taxonomic Revisions" : "Establish Category"}
      </button>
    </form>
  );
}
