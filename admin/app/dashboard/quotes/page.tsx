"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quoteService } from "@/services/quote.service";
import { 
  FileText, Search, Filter, Trash2, Eye, CheckCircle, Clock, XCircle,
  Truck, Package, StickyNote, UserPlus, Send
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import Skeleton from "@/components/Skeleton";
import Modal from "@/components/Modal";

const Button = ({ children, className, ...props }: any) => (
  <button 
    className={clsx("px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed", className)} 
    {...props}
  >
    {children}
  </button>
);

export default function QuoteRequestsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewQuote, setViewQuote] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => quoteService.getAll().then(res => res.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => quoteService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      if (viewQuote) setViewQuote(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quoteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      setDeleteTarget(null);
    },
  });

  const filtered = quotes.filter((q: any) => {
    const matchesSearch = q.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: string) => {
    updateMutation.mutate({ id, status });
  };

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <FileText className="w-8 h-8 text-accent-500" />
             Quote Requests
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Industrial Lead Registry & Telemetry</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="premium-card p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by client, email, or product ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold tracking-tight focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-4">
           <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
             {["all", "Pending", "Quoted", "Closed"].map((s) => (
               <button
                 key={s}
                 onClick={() => setStatusFilter(s)}
                 className={clsx(
                   "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                   statusFilter === s ? "bg-white text-slate-900 shadow-xl" : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 {s}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Request Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Scope</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Timeline</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}><td colSpan={5} className="px-8 py-6"><Skeleton className="h-12 w-full" /></td></tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-300">
                    <div className="flex flex-col items-center">
                       <Filter className="w-12 h-12 mb-4 opacity-10" />
                       <span className="font-black uppercase tracking-widest text-[10px]">No active quote requirements detected</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((quote: any) => (
                <tr key={quote._id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => setViewQuote(quote)}>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
                         {quote.name?.charAt(0)}
                       </div>
                       <div>
                         <span className="font-bold text-slate-900 block">{quote.name}</span>
                         <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter truncate max-w-37.5 block uppercase">{quote.email}</span>
                       </div>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <div>
                       <span className="text-xs font-black text-slate-700 block uppercase tracking-tight">{quote.productId?.name || "Corrugated Master Box"}</span>
                       <span className="text-[10px] font-black text-accent-500 uppercase tracking-widest">Qty: {quote.quantity || 5000}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-slate-300" />
                       <span className="text-xs font-bold text-slate-600">{new Date(quote.createdAt).toLocaleDateString()}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={clsx(
                       "status-badge",
                       quote.status === "Pending" && "badge-neutral",
                       quote.status === "Quoted" && "badge-blue",
                       quote.status === "Closed" && "badge-success"
                     )}>
                       {quote.status}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                     <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewQuote(quote)} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(quote._id)} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Detail Modal */}
      <Modal isOpen={!!viewQuote} onClose={() => setViewQuote(null)} title="Quote Scope Analysis" subtitle={`Registry ID: ${viewQuote?._id}`} size="lg">
        {viewQuote && (
          <div className="space-y-8 py-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="premium-card p-8 bg-slate-900 text-white border-none">
                   <h4 className="flex items-center gap-3 text-xs font-black tracking-widest uppercase mb-6 text-accent-500 font-mono">
                      <Package className="w-4 h-4" /> Production Unit
                   </h4>
                   <h5 className="text-2xl font-black tracking-tighter uppercase mb-2">{viewQuote.productId?.name || "Industrial Packaging"}</h5>
                   <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Quantity Requested: {viewQuote.quantity} Units</p>
                   
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm font-bold">
                         <Truck className="w-4 h-4 text-accent-500" /> 
                         <span className="text-white/60">Delivery:</span> <span>{viewQuote.deliveryLocation || "Sector 4 Cluster"}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-bold">
                         <UserPlus className="w-4 h-4 text-accent-500" /> 
                         <span className="text-white/60">Contact:</span> <span>{viewQuote.phone}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2">
                        <StickyNote className="w-3.5 h-3.5" /> Technical specs
                      </h4>
                      <p className="text-xs font-bold text-slate-900 leading-relaxed italic uppercase">
                        "{viewQuote.customizationDetails || "Standard corrugation protocol requested. No specific customization labels provided."}"
                      </p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => updateStatus(viewQuote._id, "Quoted")} className="btn-primary justify-center gap-3 py-4 text-[10px]">
                        <CheckCircle className="w-4 h-4" /> Mark as Quoted
                      </button>
                      <button onClick={() => updateStatus(viewQuote._id, "Closed")} className="btn-secondary justify-center gap-3 py-4 text-[10px]">
                        <XCircle className="w-4 h-4" /> Finalize Lead
                      </button>
                   </div>
                </div>
             </div>
             
             {/* Admin Notes Placeholder per PRD */}
             <div className="pt-8 border-t border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Internal Command Logs</h4>
                <div className="flex gap-4">
                   <textarea className="flex-1 bg-slate-50 border-none rounded-2xl p-6 text-xs font-bold uppercase tracking-tight italic resize-none" placeholder="Append technical notes or assignment logs..."></textarea>
                   <Button className="h-full bg-slate-900 hover:bg-accent-500 rounded-2xl px-8 transition-colors">Log Note</Button>
                </div>
             </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Destructive Protocol" size="sm">
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 mb-2 uppercase">Purge Visual Record?</h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-tight mb-8">This action is permanent and will remove the quote request from the core registry.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 bg-slate-100 text-slate-900 font-black text-xs tracking-widest uppercase hover:bg-slate-200 transition-all rounded-2xl">Cancel</button>
            <button onClick={() => deleteMutation.mutate(deleteTarget!)} className="flex-1 py-4 bg-rose-500 text-white font-black text-xs tracking-widest uppercase hover:bg-rose-600 transition-all rounded-2xl shadow-xl shadow-rose-500/20">Execute</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
