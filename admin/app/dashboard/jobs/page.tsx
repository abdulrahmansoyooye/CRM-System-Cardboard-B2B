"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getJobs, createJob, updateJob, deleteJob } from "@/services/job.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { JobForm } from "./components/JobForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, Briefcase, Users, MapPin, Edit2, Trash2, Building, DollarSign, Clock, ArrowUpRight } from "lucide-react";
import { Job } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export default function JobsPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["jobs"], getJobs);

  const jobs = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []), [apiData]);

  // Mutations
  const createMutation = useDashboardMutation(
    createJob,
    "Career opening deployed successfully",
    [["jobs"]]
  );

  const updateMutation = useDashboardMutation(
    ({ id, data }: { id: string; data: any }) => updateJob(id, data),
    "Mission parameters updated",
    [["jobs"]]
  );

  const deleteMutation = useDashboardMutation(
    deleteJob,
    "Position archived successfully",
    [["jobs"]]
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

  const openFormModal = (job?: any) => {
    openModal({
      title: job ? "Refine Position Parameters" : "Provision New Opening",
      subtitle: job ? `Recalibrating requirements for ${job.title}` : "Establish a new talent acquisition funnel for industrial operations",
      size: "lg",
      view: (
        <JobForm
          initialData={job}
          onSubmit={(data) => (job ? handleUpdate(job._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (job: any) => {
    openModal({
      title: "Archive Position",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Decommission Opening?"
          message={`Are you sure you want to permanently remove "${job.title}"? This will terminate all active mission applicant links.`}
          confirmText="Confirm Archive"
          onConfirm={() => handleDelete(job._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Position Details",
      accessorKey: "title",
      sortable: true,
      cell: (j: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all shrink-0 border border-slate-100/50 shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="max-w-[300px]">
            <h4 className="font-black text-slate-900 leading-tight line-clamp-1">{j.title}</h4>
            <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1"><Building className="w-3 h-3" /> {j.department || "Operations"}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="text-brand-600">{j.type}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Logistics",
      accessorKey: "location",
      cell: (j: any) => (
        <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                {j.location || "Sector 4 Plant"}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">
                <DollarSign className="w-3 h-3" />
                {j.salary || "Competitive"}
            </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (j: any) => (
        <span className={cn("status-badge", j.status === "open" ? "badge-success" : "badge-neutral")}>
          <div className={cn("w-1.5 h-1.5 rounded-full", j.status === "open" ? "bg-emerald-500" : "bg-slate-400")} />
          {j.status === "open" ? "Active" : "Archived"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (j: any) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(j)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(j)}
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Talent Acquisition</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Career Openings</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage industrial recruitment pipelines and operational roles.</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> PROVISION OPENING
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Roles", value: jobs.filter((j: any) => j.status === "open").length, icon: Briefcase, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Lead Candidates", value: "48", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Deployment Zones", value: [...new Set(jobs.map((j: any) => j.location))].length || 0, icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Recruitment Velocity", value: "+18%", icon: ArrowUpRight, color: "text-sky-600", bg: "bg-sky-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 transition-all group-hover:-rotate-12", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable
        data={jobs}
        columns={columns}
        isLoading={isLoading}
        searchKey="title"
        searchPlaceholder="Filter mission roles by title or department..."
        emptyTitle="Talent Pool Stagnant"
        emptySubtitle="No career openings found. Authorized personnel can deploy a new position funnel."
      />
    </div>
  );
}
