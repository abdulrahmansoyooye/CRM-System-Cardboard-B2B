"use client";

import React, { useMemo, useState } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getAssets, createAsset, deleteAsset } from "@/services/asset.service";
import { Gallery } from "@/types/dashboard";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { AssetForm } from "./components/AssetForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, Image as ImageIcon, Trash2, Search, Grid, List as ListIcon, Maximize2, Upload, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const { openModal, closeModal } = useModal();
  const [view, setView] = useState<"grid" | "list">("grid");

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["assets"], getAssets);

  const assets = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []) as unknown as Gallery[], [apiData]);

  // Mutations
  const createMutation = useDashboardMutation<any>(
    createAsset,
    "Media asset logged successfully",
    [["assets"]]
  );

  const deleteMutation = useDashboardMutation<string>(
    deleteAsset,
    "Asset purged from archive",
    [["assets"]]
  );

  const handleCreate = async (formData: any) => {
    await createMutation.mutateAsync(formData);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    closeModal();
  };

  const openFormModal = () => {
    openModal({
      title: "Log Media Asset",
      subtitle: "Capture and preserve industrial visual intelligence",
      size: "lg",
      view: (
        <AssetForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      ),
    });
  };

  const openPreviewModal = (asset: any) => {
    openModal({
      title: "Asset Telemetry",
      subtitle: `Analyzing visual data for ${asset.name}`,
      size: "lg",
      view: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
            <div className="aspect-square bg-slate-900 rounded-[32px] flex items-center justify-center border border-slate-800 overflow-hidden relative group/prev shadow-2xl">
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-slate-950 to-transparent">
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em]">Source ID: {asset._id}</span>
                </div>
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <span className="status-badge badge-neutral mb-3 uppercase tracking-widest">{asset.category}</span>
                <h3 className="text-2xl font-display font-black text-slate-900 mb-2">{asset.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  High-fidelity industrial visual asset preserved for multi-channel distribution. Fully responsive and optimized for the ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Encoded As</p>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">{asset.type || "JPEG"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Payload Weight</p>
                  <p className="text-sm font-bold text-slate-900 font-mono italic">{asset.size || "2.4 MB"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Resolution</p>
                  <p className="text-sm font-bold text-slate-900 font-mono tracking-tighter">{asset.dimensions || "1920x1080"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Registered</p>
                  <p className="text-sm font-bold text-slate-900">{new Date(asset.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-8 flex gap-3">
                <button className="flex-1 btn-primary justify-center shadow-accent-500/20 uppercase tracking-widest text-xs font-black">Download Original</button>
                <button 
                  onClick={() => openDeleteModal(asset)}
                  className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-lg active:scale-90 font-black"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
      ),
    });
  };

  const openDeleteModal = (asset: any) => {
    openModal({
      title: "Purge Visual Intelligence",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Decommission Asset?"
          message={`Warning: This will permanently remove the record for "${asset.name}" from the industrial database cluster. This action is irreversible.`}
          confirmText="Confirm Purge"
          onConfirm={() => handleDelete(asset._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Asset Identifier",
      accessorKey: "name",
      sortable: true,
      cell: (a: any) => (
        <div className="flex items-center gap-4 py-1" onClick={() => openPreviewModal(a)}>
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-all shadow-xl shadow-slate-900/10 overflow-hidden">
            {a.url ? <img src={a.url} alt={a.name} className="w-full h-full object-cover opacity-80" /> : <ImageIcon className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">{a.name}</h4>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-0.5 block">{a.type || "JPEG"} | {a.size || "2.4 MB"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (a: any) => (
        <span className="status-badge badge-neutral uppercase tracking-widest font-black">
          {a.category}
        </span>
      ),
    },
    {
      header: "Telemetry Stats",
      accessorKey: "dimensions",
      cell: (a: any) => (
        <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 font-mono tracking-tighter">{a.dimensions || "1920x1080"}</span>
            <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest flex items-center gap-1 mt-0.5">
                <Clock className="w-2.5 h-2.5" /> Registered {new Date(a.createdAt).toLocaleDateString()}
            </span>
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (a: any) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openPreviewModal(a)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Maximize2 className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => openDeleteModal(a)}
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Media Inventory</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Gallery Manager</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Organize and manage visual assets across the industrial platform ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mr-2">
            <button 
              onClick={() => setView("grid")}
              className={cn("p-2.5 rounded-xl transition-all", view === 'grid' ? 'bg-slate-950 shadow-xl text-white' : 'text-slate-400 hover:text-slate-900')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn("p-2.5 rounded-xl transition-all", view === 'list' ? 'bg-slate-950 shadow-xl text-white' : 'text-slate-400 hover:text-slate-900')}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          <button onClick={openFormModal} className="btn-primary">
            <Upload className="w-4 h-4" /> RECORD MEDIA
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Preserved Assets", value: assets.length, icon: ImageIcon, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Storage Load", value: (assets.length * 2.4).toFixed(1), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", unit: "MB" },
          { label: "Inlet Protocol", value: "Live", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Network Health", value: "98%", icon: Maximize2, color: "text-sky-600", bg: "bg-sky-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
                {s.unit && <span className="text-xs ml-1 text-slate-300 uppercase">{s.unit}</span>}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 transition-all group-hover:rotate-6", s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Content Area */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {isLoading ? Array(8).fill(0).map((_, i) => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[32px]" />) : (
            assets.map((asset: any) => (
              <div 
                key={asset._id} 
                className="premium-card group overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
                onClick={() => openPreviewModal(asset)}
              >
                <div className="aspect-ratio-4/3 bg-slate-900 relative overflow-hidden">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm border border-white/40">
                            {asset.type || "JPEG"}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                        <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold">
                            <Maximize2 className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-500">{asset.category}</span>
                        <span className="text-[9px] font-bold text-slate-300 font-mono italic">{asset.size || "2.4 MB"}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 truncate text-sm">{asset.name}</h4>
                </div>
              </div>
            ))
          )}
          {!isLoading && assets.length === 0 && (
            <div className="col-span-full py-20 text-center">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <ImageIcon className="w-8 h-8 text-slate-200" />
                 </div>
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">No Visual Records Found</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Initialize recording protocol to see assets</p>
            </div>
          )}
        </div>
      ) : (
        <DataTable
          data={assets}
          columns={columns}
          isLoading={isLoading}
          searchKey="title"
          searchPlaceholder="Scan media archive by identifier..."
          emptyTitle="Registry Archive Empty"
          emptySubtitle="No industrial visual assets preserved. Deploy a new media record."
        />
      )}
    </div>
  );
}
