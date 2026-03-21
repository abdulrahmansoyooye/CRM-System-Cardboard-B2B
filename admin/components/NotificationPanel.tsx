"use client";

import { X, Package, MessageSquare, Briefcase, BookOpen, CheckCheck, Bell } from "lucide-react";
import { useEffect } from "react";

const NOTIFICATIONS = [
  { id: 1, icon: MessageSquare, color: "text-accent-500 bg-accent-50", title: "New inquiry from EcomShip Global", time: "2 min ago", read: false },
  { id: 2, icon: Package, color: "text-blue-500 bg-blue-50", title: "Product '7-Ply Master Carton' stock updated", time: "15 min ago", read: false },
  { id: 3, icon: Briefcase, color: "text-emerald-500 bg-emerald-50", title: "3 new applicants for Ops Manager role", time: "1 hr ago", read: false },
  { id: 4, icon: BookOpen, color: "text-purple-500 bg-purple-50", title: "Blog post 'Industry 4.0' was published", time: "3 hr ago", read: true },
  { id: 5, icon: MessageSquare, color: "text-accent-500 bg-accent-50", title: "Inquiry from AutoParts Inc. marked Quoted", time: "Yesterday", read: true },
  { id: 6, icon: Package, color: "text-blue-500 bg-blue-50", title: "New product 'Bulk Pallet Boxes' created", time: "2 days ago", read: true },
];

export default function NotificationPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-slate-950/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-sm z-[95] bg-white shadow-2xl border-l border-slate-100 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-50 text-accent-500 rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">Notifications</h3>
              <p className="text-[10px] text-slate-400 font-bold">3 unread alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[10px] font-black uppercase tracking-widest text-accent-500 hover:text-accent-600 flex items-center gap-1 transition-colors">
              <CheckCheck className="w-3 h-3" /> Mark all read
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors ml-2">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {NOTIFICATIONS.map((n) => (
            <div key={n.id} className={`px-6 py-4 hover:bg-slate-50/60 transition-colors cursor-pointer relative ${!n.read ? "bg-accent-50/20" : ""}`}>
              {!n.read && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-500 rounded-full" />}
              <div className="flex gap-4 items-start">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                  <n.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={`text-[13px] leading-snug mb-1 ${!n.read ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                    {n.title}
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 shrink-0">
          <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-accent-500 transition-colors">
            View Full Activity Log
          </button>
        </div>
      </div>
    </>
  );
}
