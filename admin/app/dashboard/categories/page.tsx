"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/services/category.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { CategoryForm } from "./components/CategoryForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, Layers, CheckCircle2, AlertCircle, Image as ImageIcon, ArrowUpRight, Clock, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["categories"], getCategories);

  const categories = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []), [apiData]);

  // Mutations
  const createMutation = useDashboardMutation(
    createCategory,
    "Taxonomic node established successfully",
    [["categories"]],
    ["categories"]
  );

  const updateMutation = useDashboardMutation(
    ({ id, data }: { id: string; data: any }) => updateCategory(id, data),
    "Category logic recalibrated",
    [["categories"]],
    ["categories"]
  );

  const deleteMutation = useDashboardMutation(
    deleteCategory,
    "Taxonomy signal decommissioned",
    [["categories"]],
    ["categories"]
  );

  const handleCreate = async (formData: any) => {
    await createMutation.mutateAsync(formData);
    closeModal();
  };

  const handleUpdate = async (id: string, formData: any) => {
    await updateMutation.mutateAsync({ id, data: formData });
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    closeModal();
  };

  const openFormModal = (category?: any) => {
    openModal({
      title: category ? "Modify Taxonomy" : "Define New Category",
      subtitle: category ? `Updating logic for ${category.name}` : "Classify products into a new industrial vertical",
      size: "md",
      view: (
        <CategoryForm
          initialData={category}
          onSubmit={(data) => (category ? handleUpdate(category._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (category: any) => {
    openModal({
      title: "Purge Taxonomic Node",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Delete Category?"
          message={`Are you sure you want to permanently remove "${category.name}"? Products mapped to this ID will lose their taxonomy signal.`}
          confirmText="Confirm Purge"
          onConfirm={() => handleDelete(category._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Taxonomy Label",
      accessorKey: "name",
      cell: (cat: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl border border-slate-100/50 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-all">
            {cat.coverImage ? (
                <img src={cat.coverImage} className="w-full h-full object-cover" alt={cat.name} />
            ) : (
                <ImageIcon className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">{cat.name}</h4>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mt-0.5">/{cat.slug}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Network Integrity",
      accessorKey: "isActive",
      cell: (cat: any) => (
        <span className={cn("status-badge px-3 py-1 text-[9px]", cat.isActive ? "badge-success" : "badge-neutral")}>
          {cat.isActive ? "Active Signal" : "Archived Node"}
        </span>
      ),
    },
    {
      header: "SKU Mapping",
      accessorKey: "products",
      cell: (cat: any) => (
        <div className="flex flex-col">
            <span className="text-sm font-black text-slate-700">{cat.products?.length || 0} Products</span>
            <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Inventory Linked</span>
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (cat: any) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(cat)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(cat)}
            className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Product Architecture</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Taxonomy Control</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage global product categories and classification logic.</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> ESTABLISH CATEGORY
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Classes", value: categories.length, icon: Layers, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Active Nodes", value: categories.filter((c: any) => c.isActive).length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Inventory Map", value: "100%", icon: ArrowUpRight, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Last Sync", value: "2h ago", icon: Clock, color: "text-slate-400", bg: "bg-slate-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 transition-all group-hover:scale-110", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Categories Table */}
      <DataTable
        data={categories}
        columns={columns}
        isLoading={isLoading}
        searchKey="name"
        searchPlaceholder="Identify taxonomy node by designation..."
        emptyTitle="No Nodes Defined"
        emptySubtitle="Category archive is currently empty. Start by establishing a new taxonomic vertical."
      />
    </div>
  );
}
