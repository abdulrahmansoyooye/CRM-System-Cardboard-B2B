"use client";

import { Bell, Settings, Command, Search } from "lucide-react";
import { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";
import CommandPalette from "./CommandPalette";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();
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
      <div className="flex items-center justify-between w-full h-full px-8">
        {/* Search Bar / Command Trigger */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 max-w-sm hidden md:block"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCmdOpen(true)}
            className="w-full flex items-center gap-4 pl-5 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] hover:bg-white hover:border-accent-500/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-accent-500 transition-colors" />
            <span className="flex-1 text-left text-slate-400 font-bold tracking-tight">Search intelligence...</span>
            <div className="flex items-center gap-1 opacity-40 bg-slate-200/50 px-2 py-1 rounded-lg">
              <Command className="w-3 h-3 text-slate-900" />
              <span className="text-[10px] font-black text-slate-900">K</span>
            </div>
          </motion.button>
        </motion.div>

        <div className="lg:hidden font-display font-black tracking-tighter text-2xl text-slate-900">Cardbox</div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setNotifOpen(true)}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-accent-500 hover:border-accent-500/20 hover:shadow-lg transition-all relative"
          >
            <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-white ring-4 ring-accent-500/10" />
          </motion.button>

          <Link href="/dashboard/settings">
            <motion.div
              whileHover={{ y: -2, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-accent-500 hover:border-accent-500/20 hover:shadow-lg transition-all"
            >
              <Settings className="w-5 h-5" />
            </motion.div>
          </Link>

          <div className="h-6 w-px bg-slate-100 mx-2 hidden sm:block" />

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-1 py-1 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-xl shadow-slate-950/20 border-b-2 border-accent-500">
              {(session?.user?.name || session?.user?.email || "U").charAt(0).toUpperCase()}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {notifOpen && (
          <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
        )}
      </AnimatePresence>
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
