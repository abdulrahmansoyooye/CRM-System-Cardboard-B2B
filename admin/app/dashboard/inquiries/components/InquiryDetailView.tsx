"use client";

import React from "react";
import { User, Mail, Phone, Building, ArrowUpRight, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InquiryDetailViewProps {
  inquiry: any;
  onUpdateStatus: (status: string) => void;
  onDelete: () => void;
  statusConfig: any;
}

export function InquiryDetailView({ inquiry, onUpdateStatus, onDelete, statusConfig }: InquiryDetailViewProps) {
  return (
    <div className="space-y-8 py-2">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="premium-card p-6 border-slate-100 bg-slate-50/50">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block underline decoration-brand-500 decoration-2 underline-offset-4">Identity Matrix</span>
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <User className="w-5 h-5 text-slate-300" />
                   <span className="text-sm font-bold text-slate-900">{inquiry.name}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-slate-300" />
                   <a href={`mailto:${inquiry.email}`} className="text-sm font-black text-brand-600 hover:underline">{inquiry.email}</a>
                 </div>
                 <div className="flex items-center gap-3">
                   <Phone className="w-5 h-5 text-slate-300" />
                   <span className="text-sm font-bold text-slate-700">{inquiry.phone || "--"}</span>
                 </div>
               </div>
             </div>
             <div className="premium-card p-6 border-slate-100 bg-slate-50/50">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block underline decoration-brand-500 decoration-2 underline-offset-4">Mission Context</span>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-slate-300" />
                    <span className="text-sm font-bold text-slate-900">{inquiry.company || "Direct Individual"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="w-5 h-5 text-slate-300" />
                    <span className="text-sm font-black text-blue-600">{inquiry.productInterested || "Generic Inquiry"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-300" />
                    <span className="text-sm font-bold text-slate-600">Captured {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>
             </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Original Signal</span>
            <div className="bg-slate-900 text-slate-300 p-8 rounded-[32px] font-medium leading-relaxed italic text-sm border-l-4 border-brand-500 shadow-2xl">
              "{inquiry.message || inquiry.subject || "No message payload received."}"
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="premium-card p-6 bg-slate-50/50 border-slate-100">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Deployment Status</span>
             <div className="space-y-3">
                {(["new", "contacted", "quoted", "closed"] as string[]).map((s) => (
                  <button 
                    key={s} 
                    onClick={() => onUpdateStatus(s)}
                    className={cn(
                      "w-full px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between group",
                      inquiry.status === s ? "bg-slate-950 text-white shadow-xl shadow-slate-950/20" : "bg-white border border-slate-100 text-slate-400 hover:border-brand-500 hover:text-brand-600"
                    )}
                  >
                    {statusConfig[s]?.label || s}
                    {inquiry.status === s && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <a href={`mailto:${inquiry.email}`} className="flex items-center justify-center w-full py-4 rounded-2xl bg-brand-950 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-950/20 hover:bg-brand-900 transition-all">
               Transmit Response
             </a>
             <button onClick={onDelete} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-black">
               Purge Intelligence
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
