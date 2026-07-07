"use client";

import React, { useMemo } from "react";
import {
  Package, BookOpen, Briefcase, MessageSquare,
  TrendingUp, ArrowUpRight, Clock, Plus,
  BarChart3, Zap, DollarSign, Users, ShieldCheck, Globe
} from "lucide-react";
import Link from "next/link";
import { useDashboardQuery } from "@/lib/hooks/useDashboardQuery";
import { getInquiries } from "@/services/inquiry.service";
import { getProducts } from "@/services/product.service";
import { getJobs } from "@/services/job.service";
import { getBlogs } from "@/services/blog.service";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  // Queries for dynamic stats
  const { data: inquiriesData, isLoading: leadsLoading } = useDashboardQuery(["inquiries"], getInquiries);
  const { data: productsData, isLoading: prodsLoading } = useDashboardQuery(["products"], getProducts);
  const { data: jobsData, isLoading: jobsLoading } = useDashboardQuery(["jobs"], getJobs);
  const { data: blogsData, isLoading: blogsLoading } = useDashboardQuery(["blogs"], getBlogs);

  const stats = useMemo(() => {
    const inquiries = Array.isArray(inquiriesData?.data) ? inquiriesData.data : [];
    const products = Array.isArray(productsData?.data) ? productsData.data : [];
    const jobs = Array.isArray(jobsData?.data) ? jobsData.data : [];
    const blogs = Array.isArray(blogsData?.data) ? blogsData.data : [];

    return [
      { label: "Active Lead Pipeline", value: inquiries.length, change: "+12.5%", icon: Zap, color: "text-accent-500", bg: "bg-accent-50", href: "/dashboard/inquiries" },
      { label: "Live Product Specs", value: products.length, change: "+3 SKUs", icon: Package, color: "text-blue-500", bg: "bg-blue-50", href: "/dashboard/products" },
      { label: "Growth Index (Jobs)", value: jobs.length, change: "Active", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-50", href: "/dashboard/jobs" },
      { label: "Strategic Intel", value: blogs.length, change: "Published", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50", href: "/dashboard/blog" },
    ];
  }, [inquiriesData, productsData, jobsData, blogsData]);

  const recentInquiries = useMemo(() => {
     const inqs = Array.isArray(inquiriesData?.data) ? inquiriesData.data : [];
     return inqs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  }, [inquiriesData]);

  const isLoading = leadsLoading || prodsLoading || jobsLoading || blogsLoading;

  return (
    <div className="space-y-8 animate-enter">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
            Industrial Backend Operational
          </div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">
            Control Center
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} — Mission Logs Synchronized
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/settings?tab=team" className="btn-secondary py-3 px-6 border-slate-200">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline text-[10px] uppercase font-black tracking-widest">Operators</span>
          </Link>
          <Link href="/dashboard/products" className="btn-primary py-3 px-8 shadow-xl shadow-brand-500/20">
            <Plus className="w-4 h-4" />
            <span className="text-[10px] uppercase font-black tracking-widest">Deploy Mission</span>
          </Link>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="premium-card p-6 flex items-center justify-between group cursor-pointer border-transparent hover:border-slate-200 transition-all duration-500">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900 group-hover:text-accent-500 transition-colors">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
              <div className="flex items-center gap-1 mt-3">
                <div className="flex items-center text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {s.change}
                </div>
              </div>
            </div>
            <div className={cn("w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:-rotate-12 duration-500", s.bg, s.color)}>
              <s.icon className="w-6 h-6" />
            </div>
          </Link>
        ))}
      </div>

      {/* Analytics & Activity Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-8 space-y-8">
          {/* Revenue Mocker Section */}
          <div className="premium-card p-8 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 blur-[100px] rounded-full" />
             <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-6 flex-1">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-400 mb-2">Market Velocity</p>
                      <h2 className="text-3xl font-display font-black tracking-tight">$1,284,500.00</h2>
                      <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Total Pipeline Valuation (Gross)</p>
                   </div>
                   <div className="flex gap-8">
                      <div>
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Orders Won</p>
                         <p className="text-lg font-black text-emerald-400">84%</p>
                      </div>
                      <div className="w-px h-10 bg-slate-800" />
                      <div>
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Retention</p>
                         <p className="text-lg font-black text-blue-400">92%</p>
                      </div>
                      <div className="hidden sm:block w-px h-10 bg-slate-800" />
                      <div className="hidden sm:block">
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Growth</p>
                         <p className="text-lg font-black text-amber-400">+14.2%</p>
                      </div>
                   </div>
                </div>
                <div className="flex-1 max-w-sm">
                   <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50">Engagement Index</h4>
                         <BarChart3 className="w-4 h-4 text-accent-500" />
                      </div>
                      <div className="flex items-end justify-between gap-1 h-20">
                         {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                           <div key={i} className="flex-1 bg-accent-500/20 rounded-t-lg relative group/bar hover:bg-accent-500 transition-all duration-300" style={{ height: `${h}%` }}>
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-black bg-white text-slate-900 px-1.5 py-0.5 rounded-md">
                                 {h}%
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Core Modules Quick Interface */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Lead Control", icon: MessageSquare, href: "/dashboard/inquiries", color: "text-accent-500 bg-accent-50 hover:bg-accent-100 border-accent-100" },
              { label: "Product Node", icon: Package, href: "/dashboard/products", color: "text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100" },
              { label: "Talent Feed", icon: Briefcase, href: "/dashboard/jobs", color: "text-emerald-500 bg-emerald-50 hover:bg-emerald-100 border-emerald-100" },
              { label: "Intel Stream", icon: BookOpen, href: "/dashboard/blog", color: "text-purple-500 bg-purple-50 hover:bg-purple-100 border-purple-100" },
            ].map((action) => (
              <Link key={action.label} href={action.href} className={cn("premium-card p-6 flex flex-col items-center gap-4 cursor-pointer text-center transition-all border group", action.color)}>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                    <action.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest truncate w-full">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Status Sidebar */}
        <div className="xl:col-span-4 space-y-8">
           {/* Recent Intelligence Pipeline */}
           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Recent Inquiries</h2>
                 <Link href="/dashboard/inquiries" className="text-[10px] font-black uppercase tracking-widest text-accent-500 hover:accent-600 flex items-center gap-1">
                    ALL <ArrowUpRight className="w-4 h-4" />
                 </Link>
              </div>
              <div className="premium-card divide-y divide-slate-50 overflow-hidden">
                 {leadsLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-20 bg-slate-50 animate-pulse" />) : (
                    recentInquiries.length > 0 ? recentInquiries.map((inq: any) => (
                        <Link key={inq._id} href="/dashboard/inquiries" className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                           <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
                                    {(inq.company || inq.name).charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-black text-slate-900 truncate group-hover:text-accent-500 transition-colors uppercase tracking-tight">{inq.company || inq.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold truncate uppercase tracking-widest">{inq.productInterested || "Generic Inquiry"}</p>
                                </div>
                           </div>
                           <div className="ml-4 shrink-0 flex flex-col items-end">
                                <span className={cn("status-badge text-[9px] px-2 py-0.5", 
                                    inq.status === 'new' ? 'badge-success' : 'badge-neutral'
                                )}>
                                    {inq.status}
                                </span>
                                <span className="text-[9px] text-slate-300 font-black mt-1 uppercase tracking-tighter">
                                    {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                           </div>
                        </Link>
                    )) : (
                        <div className="p-10 text-center">
                            <MessageSquare className="w-8 h-8 text-slate-100 mx-auto mb-2" />
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No recent data</p>
                        </div>
                    )
                 )}
              </div>
           </div>

           {/* System Activity Hub */}
           <div className="space-y-4">
              <h2 className="text-xl font-display font-black text-slate-900 px-1 tracking-tight">System Logs</h2>
              <div className="premium-card p-6 space-y-6">
                 {[
                    { icon: Package, text: "Product specs updated in cluster Alpha", time: "2m ago", color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: ShieldCheck, text: "Operator L2 access provisioned", time: "15m ago", color: "text-indigo-500", bg: "bg-indigo-50" },
                    { icon: Zap, text: "High priority lead injected via site node", time: "1h ago", color: "text-accent-500", bg: "bg-accent-50" },
                    { icon: Clock, text: "Auto-backup protocol completed", time: "3h ago", color: "text-slate-400", bg: "bg-slate-50" },
                 ].map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-transparent group-hover:scale-110 transition-all", log.bg, log.color)}>
                            <log.icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-slate-700 leading-snug group-hover:text-slate-950 transition-colors uppercase tracking-tight">{log.text}</p>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mt-1">{log.time}</p>
                        </div>
                    </div>
                 ))}
                 <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border border-dashed border-slate-200 rounded-2xl hover:border-slate-300 hover:text-slate-600 transition-all">
                    View Complete Audit Log
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
