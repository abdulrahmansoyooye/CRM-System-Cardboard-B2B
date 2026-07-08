"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/services/testimonial.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { TestimonialForm } from "./components/TestimonialForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, MessageSquare, Star, Globe, Clock, User, Building, Quote, Edit2, Trash2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestimonialsPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["testimonials"], getTestimonials);

  const testimonials = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []), [apiData]);

  // Mutations
  const createMutation = useDashboardMutation(
    createTestimonial,
    "Endorsement synchronized successfully",
    [["testimonials"]],
    ["testimonials"]
  );

  const updateMutation = useDashboardMutation(
    ({ id, data }: { id: string; data: any }) => updateTestimonial(id, data),
    "Statement updated",
    [["testimonials"]],
    ["testimonials"]
  );

  const deleteMutation = useDashboardMutation(
    deleteTestimonial,
    "Social proof decommissioned",
    [["testimonials"]],
    ["testimonials"]
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

  const openFormModal = (testimonial?: any) => {
    openModal({
      title: testimonial ? "Refine Endorsement" : "Register Social Proof",
      subtitle: testimonial ? `Updating strategic testimony from ${testimonial.clientName}` : "Commit a new industrial endorsement to the platform archive",
      size: "lg",
      view: (
        <TestimonialForm
          initialData={testimonial}
          onSubmit={(data) => (testimonial ? handleUpdate(testimonial._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (testimonial: any) => {
    openModal({
      title: "Purge Social Proof",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Delete Statement?"
          message={`Are you sure you want to permanently remove this endorsement from "${testimonial.clientName}"? This action cannot be undone.`}
          confirmText="Confirm Purge"
          onConfirm={() => handleDelete(testimonial._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Client Data",
      accessorKey: "clientName",
      sortable: true,
      cell: (t: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all shrink-0 border border-slate-100/50 shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">{t.clientName}</h4>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Building className="w-3 h-3" /> {t.company || "Ind."}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-2.5 h-2.5", i < (t.rating || 5) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200")} />
                    ))}
                </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Feedback Snapshot",
      accessorKey: "feedback",
      cell: (t: any) => (
        <div className="flex items-start gap-2 max-w-sm">
            <Quote className="w-3.5 h-3.5 text-slate-200 mt-1 shrink-0" />
            <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed italic">
                {t.feedback}
            </p>
        </div>
      ),
    },
    {
      header: "Protocol Status",
      accessorKey: "isPublished",
      cell: (t: any) => (
        <span className={cn("status-badge", t.isPublished ? "badge-success" : "badge-neutral")}>
          {t.isPublished ? <Globe className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
          {t.isPublished ? "Public" : "Archived"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (t: any) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(t)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(t)}
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Social Proof Matrix</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Client Testimonials</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage public endorsements and industrial credibility across the platform.</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> REGISTER PROOF
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Endorsements", value: testimonials.length, icon: MessageSquare, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Public Interface", value: testimonials.filter((t: any) => t.isPublished).length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Engagement Index", value: (testimonials.reduce((sum: number, t: any) => sum + (t.rating || 0), 0) / (testimonials.length || 1)).toFixed(1), icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Credibility Rate", value: "92%", icon: ArrowUpRight, color: "text-blue-600", bg: "bg-blue-50" },
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
        data={testimonials}
        columns={columns}
        isLoading={isLoading}
        searchKey="clientName"
        searchPlaceholder="Identify endorsement by client or organization..."
        emptyTitle="No Credibility Records"
        emptySubtitle="Testimonial archive is currently empty. Start by registering new client endorsements."
      />
    </div>
  );
}
