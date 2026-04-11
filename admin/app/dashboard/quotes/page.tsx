"use client";

import React, { useMemo, useState } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { quoteService } from "@/services/quote.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { QuoteDetailView } from "./components/QuoteDetailView";
import { useModal } from "@/lib/store/useModalStore";
import { FileText, Eye, Trash2, Package, Clock, Truck, CheckCircle, XCircle, BarChart3, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Quote } from "@/types/dashboard";

export default function QuoteRequestsPage() {
  const { openModal, closeModal } = useModal();
  const [filterStatus, setFilterStatus] = useState("all");

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery<{ data: Quote[] }>(["quotes"], () => quoteService.getAll());

  const quotes = useMemo(() => {
    const raw = (Array.isArray(apiData?.data) ? apiData.data : []) as Quote[];
    if (filterStatus === "all") return raw;
    return raw.filter((q: any) => q.status === filterStatus);
  }, [apiData, filterStatus]);

  // Mutations
  const updateMutation = useDashboardMutation(
    ({ id, status }: { id: string; status: string }) => quoteService.updateStatus(id, status),
    "Quote status recalibrated",
    [["quotes"]]
  );

  const deleteMutation = useDashboardMutation(
    (id: string) => quoteService.delete(id),
    "Registry entry decommissioned",
    [["quotes"]]
  );

  const addNoteMutation = useDashboardMutation(
    ({ id, note }: { id: string; note: string }) => quoteService.addNote(id, note),
    "Command log updated",
    [["quotes"]]
  );

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateMutation.mutateAsync({ id, status });
    const updated = quotes.find(q => q._id === id);
    if (updated) openDetailModal({ ...updated, status });
  };

  const handleAddNote = async (id: string, note: string) => {
    await addNoteMutation.mutateAsync({ id, note });
    const updated = quotes.find(q => q._id === id);
    if (updated) openDetailModal({ ...updated, notes: note });
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    closeModal();
  };

  const openDetailModal = (quote: any) => {
    openModal({
      title: "Tactical Lead Analysis",
      subtitle: `Registry Node: ${quote._id}`,
      size: "lg",
      view: (
        <QuoteDetailView
          quote={quote}
          onUpdateStatus={(s) => handleUpdateStatus(quote._id, s)}
          onDelete={() => openDeleteModal(quote)}
          onAddNote={(n) => handleAddNote(quote._id, n)}
        />
      ),
    });
  };

  const openDeleteModal = (quote: any) => {
    openModal({
      title: "Purge Mission Data",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Decommission Record?"
          message={`Are you sure you want to permanently remove this quote request from ${quote.name}? This will sever all platform intelligence for this lead.`}
          confirmText="Decommission"
          onConfirm={() => handleDelete(quote._id)}
          onCancel={() => openDetailModal(quote)}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Lead Data",
      accessorKey: "name",
      cell: (q: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-accent-500 group-hover:text-white group-hover:rotate-6 transition-all shadow-sm">
            {q.name[0]}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight uppercase tracking-tight">{q.name}</h4>
            <span className="text-[10px] font-bold text-slate-400 truncate block max-w-40 uppercase tracking-widest">{q.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Product Sector",
      accessorKey: "productId.name",
      cell: (q: any) => (
        <div className="space-y-1">
          <span className="text-xs font-black text-slate-700 block uppercase tracking-tight">{q.productId?.name || "Corrugated Units"}</span>
          <span className="text-[10px] text-accent-500 font-black uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Qty: {q.quantity || 1000}
          </span>
        </div>
      ),
    },
    {
        header: "Telemetry",
        accessorKey: "createdAt",
        cell: (q: any) => (
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 opacity-50" /> {new Date(q.createdAt).toLocaleDateString()}
            </span>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 opacity-30" /> {q.deliveryLocation || "Local Area"}
            </span>
          </div>
        ),
      },
    {
      header: "Status Vector",
      accessorKey: "status",
      cell: (q: any) => (
        <span className={cn("status-badge text-[10px] font-black uppercase tracking-widest", 
            q.status === 'Pending' ? "badge-neutral" : 
            q.status === 'Quoted' ? "badge-blue" : "badge-success"
        )}>
          {q.status === 'Pending' ? <Clock className="w-3.5 h-3.5" /> : q.status === 'Quoted' ? <FileText className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
          {q.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (q: any) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => openDetailModal(q)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openDeleteModal(q)} className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const stats = useMemo(() => {
    const raw = Array.isArray(apiData?.data) ? apiData.data : [];
    return [
      { label: "Detected Leads", value: raw.length, icon: FileText, color: "text-brand-600", bg: "bg-brand-50" },
      { label: "Active Pending", value: raw.filter((q: any) => q.status === "Pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
      { label: "Units Quoted", value: raw.filter((q: any) => q.status === "Quoted").length, icon: Zap, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Finalized Deals", value: raw.filter((q: any) => q.status === "Closed").length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];
  }, [apiData]);

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Lead Intelligence Registry</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Quote Requirements</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage and process high-value industrial quote requests.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex p-1.5 bg-slate-50 border border-slate-100 rounded-[20px] shadow-sm">
             {["all", "Pending", "Quoted", "Closed"].map((s) => (
               <button
                 key={s}
                 onClick={() => setFilterStatus(s)}
                 className={cn(
                   "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                   filterStatus === s ? "bg-white text-slate-900 shadow-xl" : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 {s}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 shadow-sm transition-all group-hover:rotate-12", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Registry Table */}
      <DataTable
        data={quotes}
        columns={columns}
        isLoading={isLoading}
        searchKey="name"
        searchPlaceholder="Identify quote by client name or intelligence index..."
        emptyTitle="Registry Node Clear"
        emptySubtitle="No active quote requirements detected within the current platform sector."
      />
    </div>
  );
}
