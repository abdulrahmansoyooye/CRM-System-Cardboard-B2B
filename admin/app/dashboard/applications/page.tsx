"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getApplications, updateApplication, deleteApplication } from "@/services/application.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { ApplicationDetailView } from "./components/ApplicationDetailView";
import { useModal } from "@/lib/store/useModalStore";
import { Search, Eye, Download, Users, Mail, Phone, Calendar, Clock, ShieldCheck, User, Trash2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AppStatus = "New" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";

const statusStyles = {
  New: "badge-neutral",
  Reviewed: "badge-blue",
  Shortlisted: "badge-warning",
  Rejected: "badge-error",
  Hired: "badge-success",
};

export default function ApplicationsPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["applications"], getApplications);

  const apps = useMemo(() => {
    if (!Array.isArray(apiData?.data)) return [];
    return apiData.data.map((a: any) => ({
      ...a,
      status: a.status.charAt(0).toUpperCase() + a.status.slice(1) as AppStatus,
    }));
  }, [apiData]);

  // Mutations
  const updateMutation = useDashboardMutation(
    ({ id, data }: { id: string; data: any }) => updateApplication(id, data),
    "Application status updated",
    [["applications"]]
  );

  const deleteMutation = useDashboardMutation(
    deleteApplication,
    "Candidate profile decommissioned",
    [["applications"]]
  );

  const handleUpdateStatus = async (id: string, s: string) => {
    await updateMutation.mutateAsync({ id, data: { status: s.toLowerCase() } });
    // Re-open modal if it's still for the same app to reflect status change
    const updatedApp = apps.find(a => a._id === id);
    if (updatedApp) {
        openDetailModal({ ...updatedApp, status: s as AppStatus });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    closeModal();
  };

  const openDetailModal = (app: any) => {
    openModal({
      title: "Candidate Analysis",
      subtitle: `Analyzing mission potential for ${app.name}`,
      size: "lg",
      view: (
        <ApplicationDetailView
          application={app}
          onUpdateStatus={(s) => handleUpdateStatus(app._id, s)}
          onDelete={() => openDeleteModal(app)}
          statusStyles={statusStyles}
        />
      ),
    });
  };

  const openDeleteModal = (app: any) => {
    openModal({
      title: "Purge Candidate Record",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Delete Profile?"
          message={`Are you sure you want to permanently remove ${app.name} from the mission pipeline? This will incinerate all associated files.`}
          confirmText="Confirm Purge"
          onConfirm={() => handleDelete(app._id)}
          onCancel={() => openDetailModal(app)}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Candidate Signal",
      accessorKey: "name",
      cell: (app: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
            {app.name[0]}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight uppercase tracking-tight">{app.name}</h4>
            <span className="text-[10px] font-bold text-slate-400 truncate block max-w-40 uppercase tracking-widest">{app.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Target Sector",
      accessorKey: "jobId.title",
      cell: (app: any) => (
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-700 block uppercase tracking-tight">{app.jobId?.title || "Ops Intelligence"}</span>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-3 h-3" /> {new Date(app.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      header: "Transmission",
      accessorKey: "phone",
      cell: (app: any) => (
        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-tighter">
            {app.phone || "No signal"}
        </span>
      ),
    },
    {
      header: "Pipeline Status",
      accessorKey: "status",
      cell: (app: any) => (
        <span className={cn("status-badge text-[10px] font-black uppercase tracking-widest", statusStyles[app.status as AppStatus])}>
          {app.status === 'Hired' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
          {app.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (app: any) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => openDetailModal(app)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-600 transition-all">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={() => openDeleteModal(app)} className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all">
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2 underline decoration-accent-500/20 underline-offset-4">Human Capital Pipeline</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Talent Applications</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Audit and process candidate dossiers within the industrial cluster.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-3 px-6 shadow-none">
             <Download className="w-4 h-4" />
             <span className="text-[10px] uppercase font-black tracking-widest hidden sm:inline">Export Dossiers</span>
          </button>
        </div>
      </div>

      {/* Dynamic Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "New Signals", value: apps.filter(a => a.status === "New").length, icon: Clock, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Under Analysis", value: apps.filter(a => a.status === "Reviewed").length, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Shortlisted", value: apps.filter(a => a.status === "Shortlisted").length, icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Commissioned", value: apps.filter(a => a.status === "Hired").length, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 shadow-sm transition-all group-hover:scale-110", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Data Engine */}
      <DataTable
        data={apps}
        columns={columns}
        isLoading={isLoading}
        searchKey="name"
        searchPlaceholder="Identify candidate by name or dossiers index..."
        emptyTitle="Pipeline Empty"
        emptySubtitle="No candidate transmissions detected within the current cycle."
      />
    </div>
  );
}
