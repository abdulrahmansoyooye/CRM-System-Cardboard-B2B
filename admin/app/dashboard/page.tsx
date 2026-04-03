"use client";

import {
  Package, BookOpen, Briefcase, MessageSquare,
  TrendingUp, ArrowUpRight, Clock, Plus,
  ChevronRight, Activity, Zap, Users, DollarSign, Eye, Edit2, BarChart3
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const STATS = [
  { label: "Active Pipeline", value: "41", change: "+12.5%", icon: Zap, color: "text-accent-500", bg: "bg-accent-50", href: "/dashboard/inquiries" },
  { label: "Live Products", value: "24", change: "+3 SKUs", icon: Package, color: "text-blue-500", bg: "bg-blue-50", href: "/dashboard/products" },
  { label: "Open Jobs", value: "6", change: "4 Active", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-50", href: "/dashboard/jobs" },
  { label: "Monthly Revenue", value: "$1.2M", change: "+8.4%", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-50", href: "/dashboard/analytics" },
];

const RECENT_INQUIRIES = [
  { id: "01", company: "GlobalPack Ltd", product: "Master Cartons", status: "New", value: "$12,400", contact: "D. Wilson" },
  { id: "02", company: "FreshExport Co", product: "Export Boxes", status: "Contacted", value: "$8,200", contact: "E. Marchetti" },
  { id: "03", company: "AutoParts Inc", product: "Custom Die-Cut", status: "Quoted", value: "$45,000", contact: "K. Watanabe" },
  { id: "04", company: "EcomShip Global", product: "Pallet Boxes", status: "New", value: "$89,000", contact: "A. Hassan" },
];

const BAR_DATA = [40, 65, 50, 80, 60, 95, 70, 88, 55, 72, 90, 82];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getStatusStyle = (status: string) => {
  if (status === "New") return "badge-success";
  if (status === "Quoted") return "badge-warning";
  if (status === "Closed") return "badge-neutral";
  return "badge-info";
};

export default function DashboardPage() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Systems Operational</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">
            Control Center
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Thursday, March 19, 2026 — Good evening, Admin</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/analytics" className="btn-secondary py-2.5">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Analytics</span>
          </Link>
          <Link href="/dashboard/products/" className="btn-primary py-2.5">
            <Plus className="w-4 h-4" />
            <span className="text-xs">Create New</span>
          </Link>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <Link key={s.label} href={s.href} className="premium-card p-6 flex items-center justify-between group cursor-pointer">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900 group-hover:text-accent-500 transition-colors">{s.value}</h3>
              <div className="flex items-center gap-1 mt-3">
                <div className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {s.change}
                </div>
              </div>
            </div>
            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <s.icon className="w-5 h-5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Charts + Pipeline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
        {/* Mini Bar Chart */}
        <div className="xl:col-span-8 space-y-5">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-display font-black text-slate-900">Revenue Trend</h2>
            <Link href="/dashboard/analytics" className="text-xs font-black uppercase tracking-widest text-accent-500 hover:text-accent-600 flex items-center gap-1 transition-all">
              Full Analytics <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="premium-card p-8">
            <div className="flex items-end justify-between gap-3" style={{ height: 160 }}>
              {BAR_DATA.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="relative w-full flex flex-col items-center">
                    {hoveredBar === i && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[9px] font-black px-2 py-1 rounded-lg whitespace-nowrap z-10">
                        ${h}k
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${hoveredBar === i ? "bg-accent-500" : "bg-slate-100 group-hover:bg-accent-300"}`}
                      style={{ height: `${h}%`, maxHeight: 130 }}
                    />
                  </div>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-wider">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "New Inquiry", icon: MessageSquare, href: "/dashboard/inquiries", color: "text-accent-500 bg-accent-50 hover:bg-accent-100" },
              { label: "Add Product", icon: Package, href: "/dashboard/products", color: "text-blue-500 bg-blue-50 hover:bg-blue-100" },
              { label: "Post Job", icon: Briefcase, href: "/dashboard/jobs", color: "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" },
              { label: "Write Blog", icon: BookOpen, href: "/dashboard/blog", color: "text-purple-500 bg-purple-50 hover:bg-purple-100" },
            ].map((action) => (
              <Link key={action.label} href={action.href} className={`premium-card p-5 flex flex-col items-center gap-3 cursor-pointer text-center transition-all ${action.color}`}>
                <action.icon className="w-6 h-6" />
                <span className="text-xs font-black uppercase tracking-wider">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 space-y-6">
          {/* Active Pipeline */}
          <div>
            <div className="flex items-center justify-between px-1 mb-4">
              <h2 className="text-xl font-display font-black text-slate-900">Active Pipeline</h2>
              <Link href="/dashboard/inquiries" className="text-xs font-black uppercase tracking-widest text-accent-500 hover:text-accent-600 flex items-center gap-1 transition-all">
                All <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="premium-card overflow-hidden">
              <div className="divide-y divide-slate-100">
                {RECENT_INQUIRIES.map((inq) => (
                  <Link key={inq.id} href="/dashboard/inquiries" className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0">
                        {inq.company.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[13px] font-bold text-slate-900 leading-tight group-hover:text-accent-500 transition-colors truncate">{inq.company}</h4>
                        <p className="text-[11px] text-slate-400 font-medium truncate">{inq.product}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-4">
                      <p className="text-xs font-black text-slate-900 mb-1">{inq.value}</p>
                      <span className={`status-badge ${getStatusStyle(inq.status)}`}>{inq.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div>
            <h2 className="text-xl font-display font-black text-slate-900 px-1 mb-4">Recent Activity</h2>
            <div className="premium-card p-5 space-y-5">
              {[
                { icon: Package, text: "Product '7-Ply Master' updated", time: "2m ago", color: "text-blue-500 bg-blue-50" },
                { icon: MessageSquare, text: "New inquiry from KraftCo", time: "15m ago", color: "text-accent-500 bg-accent-50" },
                { icon: BookOpen, text: "Blog 'Industry 4.0' published", time: "1h ago", color: "text-purple-500 bg-purple-50" },
                { icon: Briefcase, text: "New applicant for Ops Mgr", time: "3h ago", color: "text-emerald-500 bg-emerald-50" },
                { icon: Users, text: "Settings updated by admin", time: "5h ago", color: "text-slate-500 bg-slate-50" },
              ].map((act, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className={`w-9 h-9 rounded-xl ${act.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[12px] font-bold text-slate-700 leading-snug">{act.text}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      <Clock className="w-2.5 h-2.5" />
                      {act.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
