"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { ProductForm } from "./components/ProductForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, Package, Star, Edit2, Trash2, Download } from "lucide-react";
import { Product, Category } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["products"], getProducts);
  const { data: catData } = useDashboardQuery(["categories"], getCategories);

  const products = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []), [apiData]);
  const categories = useMemo(() => (Array.isArray(catData?.data) ? catData.data : []), [catData]);

  // Mutations
  const createMutation = useDashboardMutation(
    createProduct,
    "Product provisioned successfully",
    [["products"]]
  );

  const updateMutation = useDashboardMutation(
    ({ id, data }: { id: string; data: any }) => updateProduct(id, data),
    "Product updated successfully",
    [["products"]]
  );

  const deleteMutation = useDashboardMutation(
    deleteProduct,
    "Product decommissioned successfully",
    [["products"]]
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

  const openFormModal = (product?: Product) => {
    openModal({
      title: product ? "Edit Product SKU" : "Provision New SKU",
      subtitle: product ? `Modify specifications for ${product.name}` : "Add a new industrial-grade corrugated solution to the catalog",
      size: "lg",
      view: (
        <ProductForm
          initialData={product}
          categories={categories}
          onSubmit={(data) => (product ? handleUpdate(product._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (product: Product) => {
    openModal({
      title: "Confirm Decommission",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Delete Product SKU?"
          message={`Are you sure you want to permanently remove ${product.name} from the mission pipeline? This action cannot be reversed.`}
          confirmText="Decommission SKU"
          onConfirm={() => handleDelete(product._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Product Name",
      accessorKey: "name",
      sortable: true,
      cell: (p: Product) => (
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-500 transition-colors shrink-0 border border-slate-100/50 shadow-sm">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">{p.name}</span>
              {p.isFeatured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
            </div>
            <div className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest mt-0.5 truncate max-w-[180px]">
              ID-{p._id.slice(-8).toUpperCase()}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "categoryId.name",
      cell: (p: Product) => (
        <span className="px-2.5 py-1 bg-blue-50/50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100/50 uppercase tracking-wider">
          {(p.categoryId as any)?.name || "Uncategorized"}
        </span>
      ),
    },
    {
      header: "MOQ",
      accessorKey: "moq",
      sortable: true,
      cell: (p: Product) => (
        <span className="text-sm font-black text-slate-900 font-mono italic">
          {p.moq.toLocaleString()} <span className="text-[10px] text-slate-400 not-italic uppercase tracking-widest ml-1">Units</span>
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: (p: Product) => (
        <span className={cn("status-badge", p.isActive ? "badge-success" : "badge-neutral")}>
          <div className={cn("w-1.5 h-1.5 rounded-full", p.isActive ? "bg-emerald-500" : "bg-slate-400")} />
          {p.isActive ? "Active" : "Draft"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (p: Product) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(p)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
            title="Edit SKU"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(p)}
            className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
            title="Delete SKU"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Industrial Assets</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">SKU Management</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage industrial corrugated solutions and custom packaging specifications.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5 shadow-none border-slate-100">
            <Download className="w-4 h-4" />
            <span className="text-xs hidden sm:inline uppercase tracking-widest font-black">Export Catalog</span>
          </button>
          <button onClick={() => openFormModal()} className="btn-primary">
            <Plus className="w-4 h-4" /> Provision SKU
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active SKUs", value: products.filter((p: any) => p.isActive).length, icon: Package, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Featured", value: products.filter((p: any) => p.isFeatured).length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Draft Process", value: products.filter((p: any) => !p.isActive).length, icon: Edit2, color: "text-slate-400", bg: "bg-slate-50" },
          { label: "Total Asset Count", value: products.length, icon: Package, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100/50", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <DataTable
        data={products}
        columns={columns}
        isLoading={isLoading}
        searchKey="name"
        searchPlaceholder="Filter SKUs by identifier..."
        emptyTitle="No SKUs deployed"
        emptySubtitle="Your industrial catalog is currently empty. Start by provisioning a new product SKU."
      />
    </div>
  );
}
