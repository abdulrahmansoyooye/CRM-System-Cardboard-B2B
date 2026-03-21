"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, BookOpen, Briefcase,
  MessageSquare, Image as ImageIcon, Star, Settings,
  BarChart2, ChevronRight, ShieldCheck, UserCircle, X,
  Users, Building2, Trophy, FileText, LogOut
} from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";

const NAV = [
  {
    label: "Analyze",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Package, label: "Products", href: "/dashboard/products" },
      { icon: BookOpen, label: "Blog", href: "/dashboard/blog" },
      { icon: MessageSquare, label: "Inquiries", href: "/dashboard/inquiries" },
    ],
  },
  {
    label: "HR",
    items: [
      { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
      { icon: Users, label: "Applications", href: "/dashboard/applications" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: Star, label: "Testimonials", href: "/dashboard/testimonials" },
      { icon: ImageIcon, label: "Gallery", href: "/dashboard/gallery" },
      { icon: Building2, label: "Industries", href: "/dashboard/industries" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [role, setRole] = useState<"admin" | "editor">("admin");

  return (
    <aside className="sidebar-container relative">
      {/* Close button for Mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-10 right-4 p-2 text-slate-400 hover:text-slate-900"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Brand */}
      <div className="px-7 py-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-950 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl shadow-brand-950/20">
            C
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tight block leading-tight">Cardbox</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500">v2.0 Core</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-7 overflow-y-auto pb-6">
        {NAV.map((section) => (
          <div key={section.label}>
            <p className="px-4 mb-2.5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-300">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "nav-item",
                      isActive ? "nav-item-active" : "nav-item-inactive"
                    )}
                  >
                    <item.icon className={clsx("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                    <span className="flex-1 text-[13px]">{item.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Role Switcher & User */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setRole(role === "admin" ? "editor" : "admin")}
            className="flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-accent-500 transition-all group"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className={clsx("w-4 h-4", role === "admin" ? "text-accent-500" : "text-slate-400")} />
              <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 leading-none mb-1">Current Role</p>
                <p className="text-xs font-bold text-slate-900 capitalize">{role}</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-accent-50 transition-colors">
              <UserCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-500" />
            </div>
          </button>

          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-sm shrink-0">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Super Admin</p>
              <p className="text-[10px] font-semibold text-slate-400 truncate">admin@cardbox.io</p>
            </div>
            <button className="text-slate-300 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
