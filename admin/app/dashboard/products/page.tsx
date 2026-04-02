'use client'
import React, { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { Download, Package, Plus, Star, Edit2, Search, ArrowUpDown, Eye, Trash2 } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

interface Product {
  _id: string;
  name: string;
  categoryId: any;
  moq: number;
  deliveryTimeline: string;
  isFeatured: boolean;
  isActive: boolean;
  shortDescription?: string;
  fullDescription?: string;
  materialDetails?: string;
  specifications?: string[];
  images?: string[];
}

interface Category {
  _id: string;
  name: string;
}

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: catData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [sortField, setSortField] = useState<"name" | "moq">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const products: Product[] = Array.isArray(apiData?.data) ? apiData.data : [];
  const categories: Category[] = Array.isArray(catData?.data) ? catData.data : [];

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const sortedProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchSearch = p.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchCat = filterCat === "All" || p.categoryId?._id === filterCat || p.categoryId === filterCat;
        return matchSearch && matchCat;
      })
      .sort((a, b) => {
        const valA = a[sortField] || "";
        const valB = b[sortField] || "";
        return sortAsc 
          ? String(valA).localeCompare(String(valB)) 
          : String(valB).localeCompare(String(valA));
      });
  }, [products, debouncedSearch, filterCat, sortField, sortAsc]);

  const handleCreate = (formData: any) => {
    createMutation.mutate(formData);
  };

  const handleUpdate = (id: string, formData: any) => {
    updateMutation.mutate({ id, data: formData });
  };

  const openFormModal = (product?: Product) => {
    openModal({
      title: product ? "Edit Product" : "Create Product",
      subtitle: product ? `Editing ${product.name}` : "Add a new SKU to the catalog",
      size: "lg",
      view: (
        <ProductForm 
          initialData={product} 
          categories={categories} 
          onSubmit={(data) => product ? handleUpdate(product._id, data) : handleCreate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string) => {
    openModal({
      title: "Confirm Deletion",
      subtitle: "This action cannot be undone",
      size: "sm",
      view: (
        <div className="space-y-6">
          <p className="text-slate-600">Are you sure you want to permanently delete this product from the mission pipeline?</p>
          <div className="flex gap-3">
            <button onClick={closeModal} className="flex-1 px-6 py-3 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-3 rounded-2xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete SKU"}
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Product Catalog</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">SKU Management</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Industrial-grade corrugated solutions and custom packaging SKUs</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5 shadow-none"><Download className="w-4 h-4" /><span className="text-xs hidden sm:inline uppercase tracking-widest font-black">Export Catalog</span></button>
          <button onClick={() => openFormModal()} className="btn-primary"><Plus className="w-4 h-4" /> New Product</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />)
        ) : (
          [
            { label: "Active SKUs", value: products.filter(p => p.isActive).length, icon: Package, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Featured", value: products.filter(p => p.isFeatured).length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "In-Progress", value: products.filter(p => !p.isActive).length, icon: Edit2, color: "text-slate-400", bg: "bg-slate-50" },
            { label: "Total SKUs", value: products.length, icon: ArrowUpDown, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${s.bg} ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters */}
      <div className="premium-card p-5 flex flex-col lg:flex-row gap-4 items-center bg-slate-50/40">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by SKU name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full glass-input pl-12 py-3" />
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          <button 
            onClick={() => setFilterCat("All")}
            className={cn("px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap", filterCat === "All" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}
          >
            All Categories
          </button>
          {categories.map((c) => (
             <button
                key={c._id}
                onClick={() => setFilterCat(c._id)}
                className={cn(
                  "px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap",
                  filterCat === c._id ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
                )}
             >
                {c.name}
             </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Name</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">MOQ</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                        <td colSpan={5} className="px-7 py-5"><Skeleton className="h-12 w-full" /></td>
                    </tr>
                  ))
              ) : (
                sortedProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-500 transition-colors shrink-0 shadow-sm">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{p.name}</span>
                            {p.isFeatured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                          </div>
                          <div className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest mt-0.5 truncate max-w-xs">{p._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-7 py-5">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100/50 uppercase">
                        {(p.categoryId as any)?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-7 py-5">
                      <span className="text-sm font-black text-slate-900 font-mono">{p.moq} Units</span>
                    </td>
                    <td className="px-7 py-5">
                      <span className={cn("status-badge", p.isActive ? "badge-success" : "badge-neutral")}>
                        {p.isActive ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="px-7 py-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openFormModal(p)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-500 transition-all"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => openDeleteModal(p._id)} className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductForm({ initialData, categories, onSubmit, isSubmitting }: { initialData?: Product, categories: Category[], onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    categoryId: (initialData?.categoryId as any)?._id || initialData?.categoryId || "",
    moq: initialData?.moq || 1,
    deliveryTimeline: initialData?.deliveryTimeline || "",
    isFeatured: initialData?.isFeatured || false,
    isActive: initialData?.isActive ?? true,
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    materialDetails: initialData?.materialDetails || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Product Name</label>
          <input 
            required
            className="w-full glass-input" 
            placeholder="e.g. 7-Ply Triple Fluted Box" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Category</label>
          <select 
            required
            className="w-full glass-input" 
            value={formData.categoryId} 
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Min. Order Qty</label>
          <input 
            type="number"
            required
            className="w-full glass-input" 
            value={formData.moq} 
            onChange={(e) => setFormData({ ...formData, moq: parseInt(e.target.value) })} 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Delivery Timeline</label>
          <input 
            required
            className="w-full glass-input" 
            placeholder="e.g. 7-10 Business Days" 
            value={formData.deliveryTimeline} 
            onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })} 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Short Description</label>
        <input 
          className="w-full glass-input" 
          placeholder="Brief overview of the SKU..." 
          value={formData.shortDescription} 
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} 
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Material Details</label>
        <textarea 
          rows={3}
          className="w-full glass-input resize-none" 
          placeholder="Specify material composition..." 
          value={formData.materialDetails} 
          onChange={(e) => setFormData({ ...formData, materialDetails: e.target.value })} 
        />
      </div>

      <div className="flex gap-6 pt-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
            className={cn("w-10 h-5 rounded-full transition-all relative border border-slate-200", formData.isFeatured ? "bg-amber-400 border-amber-500" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all", formData.isFeatured ? "left-5.5" : "left-1")} />
          </div>
          <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Featured Product</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
            className={cn("w-10 h-5 rounded-full transition-all relative border border-slate-200", formData.isActive ? "bg-emerald-500 border-emerald-600" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all", formData.isActive ? "left-5.5" : "left-1")} />
          </div>
          <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Active Status</span>
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full btn-primary justify-center py-4 font-black mt-4 shadow-xl shadow-brand-500/20"
      >
        {isSubmitting ? "Syncing to Blockchain..." : initialData ? "Update SKU Specification" : "Provision New SKU"}
      </button>
    </form>
  );
}

import { useMemo } from "react";
