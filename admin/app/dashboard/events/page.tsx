'use client'
import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/services/event.service";
import { Plus, Edit2, Trash2, CalendarDays, Search, Star, Clock } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

interface Event {
  _id: string;
  title: string;
  description?: string;
  eventDate?: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function EventsPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const [search, setSearch] = useState("");

  const events: Event[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      return evt.title?.toLowerCase().includes(debouncedSearch.toLowerCase());
    });
  }, [events, debouncedSearch]);

  const openFormModal = (evt?: Event) => {
    openModal({
      title: evt ? "Edit Event" : "Create Event",
      subtitle: evt ? `Editing ${evt.title}` : "Create industrial event for the Cardbox ecosystem",
      size: "lg",
      view: (
        <EventForm 
          initialData={evt} 
          onSubmit={(data) => evt ? updateMutation.mutate({ id: evt._id, data }) : createMutation.mutate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string, title: string) => {
    openModal({
      title: "Delete Event",
      subtitle: `Deleting: ${title}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4 font-display">
            Are you sure you want to permanently delete this event?
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="space-y-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Event Management</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Events</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage events, webinars, and conferences</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-4 px-8 shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          [
            { label: "Total Events", value: events.length, icon: CalendarDays, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Featured", value: events.filter(e => e.isFeatured).length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:rotate-12", s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search events by title..." className="w-full glass-input pl-14 py-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64" />) : (
          filteredEvents.map((evt) => (
            <div key={evt._id} className="premium-card group overflow-hidden border-transparent hover:border-brand-500/30 flex flex-col">
               <div className="p-7 space-y-5 flex-1">
                  <div className="flex items-center justify-between mb-4">
                     {evt.isFeatured && <span className="status-badge px-3 py-1 text-[10px] font-black uppercase tracking-widest badge-success">Featured</span>}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-tight">{evt.title}</h3>
                    <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-4">
                      {evt.description || "No description provided."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <Clock className="w-3.5 h-3.5" /> Event Date: {evt.eventDate ? new Date(evt.eventDate).toLocaleDateString() : "TBD"}
                     </div>
                  </div>
               </div>
               <div className="px-7 pb-7 pt-2 flex gap-2">
                  <button onClick={() => openFormModal(evt)} className="flex-1 py-3.5 rounded-2xl bg-slate-950 text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                    <Edit2 className="w-3.5 h-3.5" /> Edit Event
                  </button>
                  <button onClick={() => openDeleteModal(evt._id, evt.title)} className="p-3.5 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95">
                    <Trash2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EventForm({ initialData, onSubmit, isSubmitting }: { initialData?: Event, onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    eventDate: initialData?.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : "",
    isFeatured: initialData?.isFeatured || false,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Event Title</label>
        <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full glass-input" placeholder="e.g. Annual Packaging Summit" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Event Date</label>
        <input type="date" value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} className="w-full glass-input" />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} />
          <span className="text-[12px] font-bold text-slate-600">Mark as Featured Event</span>
        </label>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Description</label>
        <textarea rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full glass-input resize-none py-3" placeholder="Enter event details here..." />
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full btn-primary justify-center py-5 font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/40">
        {isSubmitting ? "Saving..." : initialData ? "Confirm Revisions" : "Create Event"}
      </button>
    </form>
  );
}
