"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getIndustries, createIndustry, updateIndustry, deleteIndustry } from "@/services/industry.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { IndustryForm } from "./components/IndustryForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, Building2, CheckCircle2, AlertCircle, Edit2, Trash2, ArrowUpRight } from "lucide-react";
import { Industry } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export default function IndustriesPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["industries"], getIndustries);

  const industries = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []), [apiData]);

  // Mutations
  const createMutation = useDashboardMutation(
    createIndustry,
    "Sector established successfully",
    [["industries"]]
  );

  const updateMutation = useDashboardMutation(
    ({ id, data }: { id: string; data: any }) => updateIndustry(id, data),
    "Sector documentation updated",
    [["industries"]]
  );

  const deleteMutation = useDashboardMutation(
    deleteIndustry,
    "Sector decommissioned successfully",
    [["industries"]]
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

  const openFormModal = (industry?: Industry) => {
    openModal({
      title: industry ? "Refine Sector Intel" : "Establish New Sector",
      subtitle: industry ? `Updating strategic documentation for ${industry.name}` : "Define a new target market for industrial packaging solutions",
      size: "lg",
      view: (
        <IndustryForm
          initialData={industry}
          onSubmit={(data) => (industry ? handleUpdate(industry._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (industry: Industry) => {
    openModal({
      title: "Archive Sector",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Decommission Sector?"
          message={`Are you sure you want to permanently remove "${industry.name}"? This will unmap all associated mission protocols.`}
          confirmText="Confirm Archive"
          onConfirm={() => handleDelete(industry._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Sector Designation",
      accessorKey: "name",
      sortable: true,
      cell: (i: Industry) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-950/10 group-hover:scale-105 transition-all shrink-0">
            <span className="text-lg font-black">{i.name[0]}</span>
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">{i.name}</h4>
            <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-widest mt-0.5 block">ID-{i._id.slice(-8).toUpperCase()}</span>
          </div>
        </div>
      ),
    },
    {
        header: "Associated Assets",
        accessorKey: "relatedProducts",
        cell: (i: Industry) => (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-700">{(i as any).relatedProducts?.length || 0} Products</span>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Mapping</span>
          </div>
        ),
    },
    {
      header: "Strategic Status",
      accessorKey: "isActive",
      cell: (i: Industry) => (
        <span className={cn("status-badge", i.isActive ? "badge-success" : "badge-neutral")}>
          <div className={cn("w-1.5 h-1.5 rounded-full", i.isActive ? "bg-emerald-500" : "bg-slate-400")} />
          {i.isActive ? "Active Protocol" : "Draft Status"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (i: Industry) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(i)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(i)}
            className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Market Management</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Industries Served</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage industrial sectors and their specific strategic packaging logic.</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> ESTABLISH SECTOR
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Mapped Sectors", value: industries.length, icon: Building2, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Active Pipelines", value: industries.filter((i: any) => i.isActive).length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Internal Drafts", value: industries.filter((i: any) => !i.isActive).length, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Market Integration", value: "98.2%", icon: ArrowUpRight, color: "text-sky-600", bg: "bg-sky-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 transition-all group-hover:rotate-12", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable
        data={industries}
        columns={columns}
        isLoading={isLoading}
        searchKey="name"
        searchPlaceholder="Scan industrial sectors by designation..."
        emptyTitle="Market Map Inactive"
        emptySubtitle="No industrial sectors found. Click 'Establish Sector' to start documentation."
      />
    </div>
  );
}
