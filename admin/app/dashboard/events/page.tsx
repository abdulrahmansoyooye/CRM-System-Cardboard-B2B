"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/services/event.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { EventForm } from "./components/EventForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, CalendarDays, Star, Edit2, Trash2, Clock, MapPin } from "lucide-react";
import { Event } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery<{ data: Event[] }>(["events"], getEvents);

  const events = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []) as Event[], [apiData]);

  // Mutations
  const createMutation = useDashboardMutation<any>(
    createEvent,
    "Event logic established",
    [["events"]]
  );

  const updateMutation = useDashboardMutation<{ id: string; data: any }>(
    ({ id, data }) => updateEvent(id, data),
    "Event updated successfully",
    [["events"]]
  );

  const deleteMutation = useDashboardMutation<string>(
    deleteEvent,
    "Event purged from archive",
    [["events"]]
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

  const openFormModal = (event?: any) => {
    openModal({
      title: event ? "Refine Event Logic" : "Establish New Event",
      subtitle: event ? `Updating specifications for ${event.title}` : "Create a new industrial event for the Cardbox ecosystem",
      size: "lg",
      view: (
        <EventForm
          initialData={event}
          onSubmit={(data) => (event ? handleUpdate(event._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (event: any) => {
    openModal({
      title: "Archive Event",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Decommission Event?"
          message={`Are you sure you want to permanently remove "${event.title}" from the mission timeline?`}
          confirmText="Confirm Archive"
          onConfirm={() => handleDelete(event._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Event Operation",
      accessorKey: "title",
      sortable: true,
      cell: (e: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-500 transition-all shrink-0 border border-slate-100/50 shadow-sm">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div className="max-w-[300px]">
            <h4 className="font-black text-slate-900 leading-tight line-clamp-1">{e.title}</h4>
            <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Industrial Hub</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="text-accent-500">ID-{e._id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Scheduled Date",
      accessorKey: "eventDate",
      sortable: true,
      cell: (e: any) => (
        <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 font-mono italic">
                {e.eventDate ? new Date(e.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBD"}
            </span>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> Scheduled Protocol
            </span>
        </div>
      ),
    },
    {
      header: "Engagement",
      accessorKey: "isFeatured",
      cell: (e: any) => (
        <span className={cn("status-badge", e.isFeatured ? "badge-success" : "badge-neutral")}>
          {e.isFeatured ? <Star className="w-3.5 h-3.5 fill-emerald-500" /> : <div className="w-3.5 h-3.5" />}
          {e.isFeatured ? "Featured" : "Standard"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (e: any) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(e)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(e)}
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Engagement Control</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Industrial Events</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage webinars, conferences, and industrial mission summits.</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> ESTABLISH EVENT
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Tracked Events", value: events.length, icon: CalendarDays, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "High Level Engagements", value: events.filter((e: any) => e.isFeatured).length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Active Pipelines", value: events.length, icon: CalendarDays, color: "text-emerald-600", bg: "bg-emerald-50" }, // Using CalendarDays instead of broken mock
          { label: "Market Interest", value: "84%", icon: Plus, color: "text-sky-600", bg: "bg-sky-50" }, // Mocked
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
        data={events}
        columns={columns}
        isLoading={isLoading}
        searchKey="title"
        searchPlaceholder="Identify event by title or ID..."
        emptyTitle="Event Horizon Empty"
        emptySubtitle="No industrial events synchronized. Start by establishing a new event baseline."
      />
    </div>
  );
}

// End of file
