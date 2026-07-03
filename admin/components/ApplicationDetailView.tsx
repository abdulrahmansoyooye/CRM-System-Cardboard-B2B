"use client";

import React from "react";
import { User, Mail, Phone,Trash2, Building, Calendar, CheckCircle2, FileText, Download, ShieldCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types/dashboard";

interface ApplicationDetailViewProps {
  application: Application;
  onUpdateStatus: (status: string) => void;
  onDelete: () => void;
  statusStyles: Record<ApplicationStatus, string>;
}

const ALL_STATUSES = ["New", "Reviewed", "Shortlisted", "Rejected", "Hired"];

export function ApplicationDetailView({ application, onUpdateStatus, onDelete, statusStyles }: ApplicationDetailViewProps) {
  return (
    <div className="space-y-8 py-2">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100/50">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-slate-900 text-white rounded-[28px] flex items-center justify-center text-3xl font-black shadow-2xl relative group overflow-hidden">
                  {application.name[0]}
                  <div className="absolute inset-0 bg-brand-500 opacity-0 group-hover:opacity-10 transition-opacity" />
               </div>
               <div>
                  <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">{application.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                     <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400"><Mail className="w-3.5 h-3.5" /> {application.email}</span>
                     <span className="w-1 h-1 rounded-full bg-slate-200" />
                     <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400"><Phone className="w-3.5 h-3.5" /> {application.phone || "No signal"}</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                     <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Applied For</p>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{application.jobId?.title || "General Operations"}</p>
                  </div>
               </div>
               <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                     <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Transmission Date</p>
                    <p className="text-sm font-bold text-slate-900">{new Date(application.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Intelligence Briefing (Notes)</span>
            <div className={cn(
                "p-8 rounded-[40px] border font-medium leading-relaxed italic text-sm relative group transition-all",
                application.notes ? "bg-amber-50/30 border-amber-100 text-slate-700" : "bg-slate-50 border-slate-100 text-slate-400"
            )}>
               <FileText className="absolute top-6 right-8 w-6 h-6 opacity-10 group-hover:rotate-12 transition-transform" />
               {application.notes ? `"${application.notes}"` : "No internal intelligence reports have been compiled for this candidate baseline yet."}
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 space-y-6">
          <div className="premium-card p-6 bg-slate-50 border-slate-100">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-4">Pipeline Status</label>
             <div className="space-y-2">
                {ALL_STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => onUpdateStatus(s)}
                    className={cn(
                      "w-full px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between",
                      application.status === s 
                        ? "bg-slate-950 text-white shadow-xl scale-105" 
                        : "bg-white border border-slate-100 text-slate-400 hover:border-brand-500 hover:text-brand-600"
                    )}
                  >
                     {s}
                     {application.status === s && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <button onClick={() => onUpdateStatus("Hired")} className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
               <ShieldCheck className="w-4 h-4" /> Onboard Candidate
             </button>
             <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-slate-100 text-slate-900 font-black uppercase text-[9px] tracking-widest hover:bg-slate-50 transition-all">
                    <Download className="w-3.5 h-3.5" /> Resume
                </button>
                <button onClick={onDelete} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose-50 text-rose-500 font-black uppercase text-[9px] tracking-widest hover:bg-rose-500 hover:text-white transition-all transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Purge
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
