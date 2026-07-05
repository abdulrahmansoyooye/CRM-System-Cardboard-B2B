"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getInquiries, createInquiry, updateInquiry, deleteInquiry } from "@/services/inquiry.service";
import { Inquiry } from "@/types/dashboard";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { InquiryForm } from "./components/InquiryForm";
import { InquiryDetailView } from "./components/InquiryDetailView";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, MessageSquare, ArrowUpRight, Calendar, Clock, Download, Building, User, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string, color: string, bg: string }> = {
  new: { label: "Incoming Lead", color: "text-brand-600", bg: "bg-brand-50" },
  contacted: { label: "In Contact", color: "text-blue-600", bg: "bg-blue-50" },
  quoted: { label: "Proposal Sent", color: "text-amber-600", bg: "bg-amber-50" },
  closed: { label: "Project Won", color: "text-emerald-600", bg: "bg-emerald-50" },
};

export default function InquiriesPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["inquiries"], getInquiries);

  const inquiries = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []) as Inquiry[], [apiData]);

  // Mutations
  const createMutation = useDashboardMutation(
    createInquiry,
    "Inquiry injected into pipeline",
    [["inquiries"]]
  );

  const updateMutation = useDashboardMutation<{ id: string; data: any }>(
    ({ id, data }) => updateInquiry(id, data),
    "Lead intelligence recalibrated",
    [["inquiries"]]
  );

  const deleteMutation = useDashboardMutation<string>(
    deleteInquiry,
    "Lead purged from system",
    [["inquiries"]]
  );

  const handleCreate = async (formData: any) => {
    await createMutation.mutateAsync(formData);
    closeModal();
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateMutation.mutateAsync({ id, data: { status } });
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    closeModal();
  };

  const openFormModal = () => {
    openModal({
      title: "Manual Lead Entry",
      subtitle: "Inject an offline lead into the industrial pipeline",
      size: "lg",
      view: (
        <InquiryForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      ),
    });
  };

  const openViewModal = (inquiry: any) => {
    openModal({
      title: "Lead Intelligence",
      subtitle: `Analyzing mission parameters for ${inquiry.company || inquiry.name}`,
      size: "lg",
      view: (
        <InquiryDetailView
          inquiry={inquiry}
          statusConfig={statusConfig}
          onUpdateStatus={(status) => handleUpdateStatus(inquiry._id, status)}
          onDelete={() => openDeleteModal(inquiry)}
        />
      ),
    });
  };

  const openDeleteModal = (inquiry: any) => {
    openModal({
      title: "Purge Lead Intelligence",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Delete Inquiry?"
          message={`Are you sure you want to permanently decommission the lead for "${inquiry.company || inquiry.name}"? This action cannot be reversed.`}
          confirmText="Confirm Purge"
          onConfirm={() => handleDelete(inquiry._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Lead Designation",
      accessorKey: "company",
      sortable: true,
      cell: (inq: any) => (
        <div className="flex items-center gap-4 py-1" onClick={() => openViewModal(inq)}>
          <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-950/10 group-hover:scale-110 transition-all shrink-0">
            <Building className="w-6 h-6 opacity-80" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">{inq.company || inq.name}</h4>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inq.name}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">ID-{inq._id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Interaction Vector",
      accessorKey: "productInterested",
      cell: (inq: any) => (
        <div className="flex flex-col">
            <span className="text-xs font-black text-blue-600 bg-blue-50/50 border border-blue-100/50 px-2 py-1 rounded-lg w-fit">
                {inq.productInterested || "General Scope"}
            </span>
            <span className="text-[10px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Received {new Date(inq.createdAt).toLocaleDateString()}
            </span>
        </div>
      ),
    },
    {
      header: "Protocol Status",
      accessorKey: "status",
      cell: (inq: any) => (
        <span className={cn("status-badge", statusConfig[inq.status]?.bg, statusConfig[inq.status]?.color)}>
           <div className={cn("w-1.5 h-1.5 rounded-full", statusConfig[inq.status]?.color.replace('text', 'bg'))} />
           {statusConfig[inq.status]?.label || inq.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (inq: any) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openViewModal(inq)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Eye className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); openDeleteModal(inq); }}
            className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-4.5 h-4.5" />
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">CRM Intelligence</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Client Inquiries</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Real-time industrial lead tracking and pipeline management.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5 shadow-none border-slate-100">
            <Download className="w-4 h-4" />
            <span className="text-xs hidden sm:inline uppercase tracking-widest font-black">Export Leads</span>
          </button>
          <button onClick={openFormModal} className="btn-primary">
            <Plus className="w-4 h-4" /> NEW LEAD
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Incoming Loads", value: inquiries.filter((i: any) => i.status === "new").length, icon: MessageSquare, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Lead Conversion", value: "85.2%", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Proposals", value: inquiries.filter((i: any) => i.status === "quoted").length, icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Avg Response", value: "4.2h", icon: Clock, color: "text-sky-600", bg: "bg-sky-50" },
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

      {/* Table */}
      <DataTable
        data={inquiries}
        columns={columns}
        isLoading={isLoading}
        searchKey="company"
        searchPlaceholder="Identify leads by organization or ID..."
        emptyTitle="Pipeline Inactive"
        emptySubtitle="No industrial inquiries detected. New leads will automatically materialize here from public interfaces."
      />
    </div>
  );
}
