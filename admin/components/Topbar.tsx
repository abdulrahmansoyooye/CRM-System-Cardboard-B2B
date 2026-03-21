"use client";

import { Bell, Settings, Command } from "lucide-react";
import { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";
import CommandPalette from "./CommandPalette";
import Link from "next/link";

export default function Topbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full h-full">
        {/* Search Bar / Command Trigger */}
        <div className="flex-1 max-w-sm hidden md:block">
          <button
            onClick={() => setCmdOpen(true)}
            className="w-full flex items-center gap-3 pl-4 pr-3 py-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl text-[13px] hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="flex-1 text-left text-slate-400 font-medium">Search records...</span>
            <div className="flex items-center gap-0.5 opacity-60">
              <Command className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] font-black text-slate-400">K</span>
            </div>
          </button>
        </div>

        <div className="lg:hidden font-display font-black tracking-tight text-slate-900 ml-2">Cardbox</div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            onClick={() => setNotifOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full border-2 border-white" />
          </button>

          <Link
            href="/dashboard/settings"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Settings className="w-4 h-4" />
          </Link>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-slate-950/20">
              SA
            </div>
          </div>
        </div>
      </div>

      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
