"use client";

import React, { useState } from "react";
import { Package, Truck, Phone, MessageSquare, StickyNote, CheckCircle, XCircle, Clock, Hash, FileText, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteDetailViewProps {
  quote: any;
  onUpdateStatus: (status: string) => void;
  onDelete: () => void;
  onAddNote: (note: string) => void;
}

const ALL_STATUSES = ["Pending", "Quoted", "Closed"];

export function QuoteDetailView({ quote, onUpdateStatus, onDelete, onAddNote }: QuoteDetailViewProps) {
  const [note, setNote] = useState("");

  const handleAddNote = () => {
    if (!note.trim()) return;
    onAddNote(note);
    setNote("");
  };

  return (
    <div className="space-y-8 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Unit Analysis */}
        <div className="premium-card p-10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-transparent relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/10 blur-[80px] rounded-full group-hover:bg-accent-500/20 transition-all duration-700" />
           <div className="relative z-10 space-y-8">
              <div>
                <h4 className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase mb-6 text-accent-500 font-mono">
                    <Package className="w-4 h-4" /> Production Scope
                </h4>
                <h5 className="text-3xl font-display font-black tracking-tight uppercase leading-tight">{quote.productId?.name || "Industrial Packaging"}</h5>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-3 bg-white/5 inline-block px-3 py-1 rounded-lg">Target Quantity: {quote.quantity || 5000} Units</p>
              </div>

              <div className="space-y-5 pt-8 border-t border-white/10">
                 <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <User className="w-4.5 h-4.5 text-accent-400" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">Lead Personnel</p>
                        <p className="text-sm font-bold">{quote.name}</p>
                        <p className="text-[10px] text-white/50 font-mono tracking-tighter mt-1">{quote.email}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Truck className="w-4.5 h-4.5 text-accent-400" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">Logistics Endpoint</p>
                        <p className="text-sm font-bold">{quote.deliveryLocation || "Central Industrial Sector"}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-4.5 h-4.5 text-accent-400" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">Signal Hub (Phone)</p>
                        <p className="text-sm font-bold font-mono tracking-widest text-accent-200">{quote.phone || "Internal Link"}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Intelligence & Protocols */}
        <div className="space-y-6">
           <div className="p-8 bg-slate-50/50 rounded-[40px] border border-slate-100/50 group hover:bg-white hover:border-brand-500/20 transition-all duration-500">
              <h4 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 mb-4 group-hover:text-brand-600 transition-colors">
                <StickyNote className="w-4 h-4" /> Tactical specs
              </h4>
              <p className="text-xs font-bold text-slate-900 leading-relaxed italic uppercase py-2">
                "{quote.customizationDetails || "No specific customization protocols requested for this unit."}"
              </p>
           </div>
           
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block px-2">Pipeline Decision</label>
              <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={() => onUpdateStatus("Quoted")} 
                   className={cn(
                     "flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                     quote.status === 'Quoted' ? "bg-brand-950 text-white shadow-xl" : "bg-white border border-slate-100 text-slate-400 hover:border-brand-500"
                   )}
                 >
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Mark as Quoted
                 </button>
                 <button 
                   onClick={() => onUpdateStatus("Closed")} 
                   className={cn(
                     "flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                     quote.status === 'Closed' ? "bg-slate-900 text-white shadow-xl" : "bg-white border border-slate-100 text-slate-400 hover:border-rose-500"
                   )}
                 >
                    <XCircle className="w-4 h-4 text-rose-400" /> Finalize Lead
                 </button>
              </div>
           </div>

           <div className="flex flex-col gap-3">
              <button onClick={onDelete} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                Decommission Registry Record
              </button>
           </div>
        </div>
      </div>

      {/* Internal Command Hub */}
      <div className="pt-10 border-t border-slate-100">
         <div className="flex items-start justify-between mb-6 px-2">
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Internal Command Stream</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Append tactical notes to this mission log</p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                <Hash className="w-4 h-4" />
            </div>
         </div>
         <div className="flex gap-4 p-2 bg-slate-50 rounded-[36px] items-end border border-slate-100">
            <textarea 
               value={note}
               onChange={(e) => setNote(e.target.value)}
               className="flex-1 bg-transparent border-none focus:ring-0 p-8 text-sm font-bold text-slate-700 placeholder:text-slate-300 placeholder:uppercase placeholder:tracking-widest resize-none min-h-[140px]" 
               placeholder="IDENTIFY RELEVANT LOG DATA..."
            />
            <button 
               onClick={handleAddNote}
               className="mb-4 mr-4 w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20 hover:bg-accent-500 transition-all active:scale-90 shrink-0"
            >
                <Send className="w-5 h-5" />
            </button>
         </div>
         {quote.notes && (
             <div className="mt-8 p-8 bg-amber-50/20 rounded-[40px] border border-amber-100 text-slate-600 text-xs font-bold leading-relaxed uppercase tracking-tight italic relative">
                 <StickyNote className="absolute top-6 right-8 w-5 h-5 text-amber-300" />
                 {quote.notes}
             </div>
         )}
      </div>
    </div>
  );
}
