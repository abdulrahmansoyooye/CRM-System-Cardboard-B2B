"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, BookOpen, Briefcase,
  MessageSquare, Image as ImageIcon, Star, Settings,
  BarChart2, ChevronRight, ShieldCheck, UserCircle, X,
  Users, Building2, LogOut
} from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { api } from "@/lib/api";

const NAV = [
  {
    label: "Analyze",
    roles: ["admin","super_admin", "sales"],
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    label: "Inventory",
    roles: ["admin", "super_admin", "content_manager"],
    items: [
      { icon: Package, label: "Products", href: "/dashboard/products" },
      { icon: Building2, label: "Industries", href: "/dashboard/industries" },
    ],
  },
  {
    label: "Leads",
    roles: ["admin", "super_admin", "sales_manager"],
    items: [
      { icon: MessageSquare, label: "Inquiries", href: "/dashboard/inquiries" },
      { icon: BarChart2, label: "Quotes", href: "/dashboard/quotes" },
    ],
  },
  {
    label: "HR",
    roles: ["admin", "super_admin", "hr_manager"],
    items: [
      { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
      { icon: Users, label: "Applications", href: "/dashboard/applications" },
    ],
  },
  {
    label: "Content",
    roles: ["admin", "super_admin", "content_manager"],
    items: [
      { icon: BookOpen, label: "Blog", href: "/dashboard/blog" },
      { icon: Star, label: "Testimonials", href: "/dashboard/testimonials" },
      { icon: ImageIcon, label: "Gallery", href: "/dashboard/gallery" },
    ],
  },
  {
    label: "System",
    roles: ["admin", "super_admin"],
    items: [
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
   {
    label: "Create Roles",
    roles: ["super_admin"],
    items: [
      { icon: UserCircle, label: "Create Roles", href: "/dashboard/create-roles" },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role || "editor";

  const handleLogout = async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Backend logout failed", err);
    } finally {
      await signOut({ callbackUrl: "/login" });
    }
  };

  const userInitial = session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U";
  const filteredNav = NAV.filter(section => section.roles.includes(userRole));

  return (
    <aside className="sidebar-container relative h-full flex flex-col bg-white border-r border-slate-100 shadow-[20px_0_40px_rgba(0,0,0,0.02)]">
      {/* Close button for Mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-8 right-4 p-2 text-slate-400 hover:text-slate-900 z-50 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Brand */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-8 py-10 shrink-0"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-slate-900/30 border-b-4 border-accent-500"
          >
            C
          </motion.div>
          <div>
            <span className="font-display font-black text-xl tracking-tight block leading-tight text-slate-900">Cardbox</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-500/80">CORE v2.0</span>
          </div>
        </div>
      </motion.div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto pb-10 scrollbar-hide">
        {filteredNav.map((section, sIdx) => (
          <motion.div 
            key={section.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIdx * 0.1 }}
          >
            <p className="px-5 mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="relative block"
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={clsx(
                        "flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold tracking-tight text-[13px] transition-all duration-300 relative group",
                        isActive 
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute left-0 w-1.5 h-6 bg-accent-500 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <item.icon className={clsx(
                        "w-4 h-4 transition-colors duration-300", 
                        isActive ? "text-accent-500" : "text-slate-400 group-hover:text-slate-900"
                      )} />
                      
                      <span className="flex-1">{item.label}</span>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-50 bg-slate-50/30 mt-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 px-4 py-3 bg-white/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-slate-900/10 shrink-0 border-b-2 border-accent-500"
            >
              {userInitial.toUpperCase()}
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate tracking-tight">{session?.user?.name || "Member"}</p>
              <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">{session?.user?.email || "No email provided"}</p>
              <p className="text-[9px] font-black text-accent-500 uppercase tracking-widest leading-none mt-1">{userRole}</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.2, color: "#f43f5e" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="text-slate-300 transition-all p-2 rounded-xl hover:bg-rose-50"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </aside>
  );
}
