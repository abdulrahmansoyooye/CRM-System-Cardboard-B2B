"use client";

import {
  BarChart3, TrendingUp, Users, Target,
  ArrowUpRight, ArrowDownRight, Download, Share2, Activity, Zap, Globe, Package, MessageSquare, Briefcase
} from "lucide-react";
import { useState } from "react";

const BAR_DATA = {
  "7D":  [30, 55, 40, 70, 50, 80, 60],
  "30D": [40, 65, 50, 80, 60, 95, 70, 88, 55, 72, 90, 82, 40, 65, 50, 80, 60, 95, 70, 88, 55, 72, 90, 82, 65, 50, 80, 60, 95, 70],
  "90D": [40, 65, 50, 80, 60, 95, 70, 88, 55, 72, 90, 82, 40, 65, 50, 80, 60, 95, 70, 88, 55, 72, 90, 82, 65, 50, 80, 60, 95, 70, 40, 55, 60, 80, 75, 90, 65, 70, 85, 95, 60, 70, 75, 55, 80, 65, 90, 70, 80, 75, 60, 65, 70, 85, 90, 95, 80, 55, 60, 70, 75, 90, 65, 80, 70, 55, 60, 75, 90, 85, 65, 70, 80, 95, 60, 55, 70, 65, 80, 75, 90, 60, 70, 85, 95, 80, 55, 65, 70, 75],
  "1Y":  [55, 70, 80, 65, 75, 90, 85, 60, 70, 95, 80, 75],
};

const LABELS = {
  "7D": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "30D": Array.from({ length: 30 }, (_, i) => `${i + 1}`),
  "90D": Array.from({ length: 90 }, (_, i) => `${i + 1}`),
  "1Y": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "90D" | "1Y">("30D");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const data = BAR_DATA[timeframe];
  const labels = LABELS[timeframe];
  // Show max 12 bars for readability
  const displayData = data.slice(0, Math.min(data.length, 12));
  const displayLabels = labels.slice(0, displayData.length);

  return (
    <div className="space-y-10 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Insight Engine</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Platform-wide metrics and business intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5"><Download className="w-4 h-4" /><span className="text-xs hidden sm:inline">Export Report</span></button>
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
            {(["7D", "30D", "90D", "1Y"] as const).map((t) => (
              <button key={t} onClick={() => setTimeframe(t)} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${timeframe === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Revenue", value: "$4.2M", change: "+14.2%", up: true, icon: Target, color: "text-accent-500", bg: "bg-accent-50" },
          { label: "Pipeline Velocity", value: "12 Days", change: "−2 Days", up: true, icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Lead Quality", value: "8.4/10", change: "+0.2", up: true, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Client Retention", value: "92%", change: "−2%", up: false, icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-7">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black ${s.up ? "text-emerald-500" : "text-rose-500"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
            <h3 className="text-3xl font-display font-black text-slate-950">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">
        {/* Main Revenue Chart */}
        <div className="xl:col-span-2 space-y-5">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-display font-black text-slate-900">Revenue Distribution</h2>
            <button className="p-2 text-slate-400 hover:text-slate-950 transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
          <div className="premium-card p-8">
            <div className="flex items-end justify-between gap-3" style={{ height: 220 }}>
              {displayData.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="relative w-full flex flex-col items-center">
                    {hoveredBar === i && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[9px] font-black px-2.5 py-1.5 rounded-xl whitespace-nowrap z-10 shadow-lg">
                        ${h}k
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${hoveredBar === i ? "bg-accent-500 shadow-lg shadow-accent-500/20" : "bg-slate-100 group-hover:bg-accent-200"}`}
                      style={{ height: `${h * 1.8}px` }}
                    />
                  </div>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-wider">{displayLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Share */}
        <div className="space-y-5">
          <h2 className="text-xl font-display font-black text-slate-900 px-2">Market Share</h2>
          <div className="premium-card p-7 space-y-6">
            {[
              { label: "Domestic Retail", value: 45, color: "bg-accent-500" },
              { label: "Export Industrial", value: 30, color: "bg-blue-500" },
              { label: "Custom Pharma", value: 15, color: "bg-emerald-500" },
              { label: "Other", value: 10, color: "bg-slate-200" },
            ].map((m) => (
              <div key={m.label} className="space-y-2.5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">{m.label}</span>
                  <span className="text-slate-900">{m.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} transition-all duration-1000 rounded-full`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}

            <div className="pt-5 border-t border-slate-100">
              <div className="bg-slate-950 rounded-2xl p-5 text-white relative overflow-hidden group">
                <Globe className="absolute -right-5 -bottom-5 w-20 h-20 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">Global Expansion</p>
                <h4 className="text-base font-display font-black mb-3">Export Potential</h4>
                <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Forecast Report <ArrowUpRight className="w-3 h-3 text-accent-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Top Products", icon: Package, color: "text-blue-500 bg-blue-50", items: ["Heavy Duty Master Cartons — $1.2M", "Export Packaging Grade A — $890k", "Die-Cut Corrugated — $450k", "Custom Printed Boxes — $320k"] },
          { title: "Lead Sources", icon: MessageSquare, color: "text-accent-500 bg-accent-50", items: ["Website form — 58%", "Trade shows — 22%", "Referrals — 12%", "Cold outreach — 8%"] },
          { title: "Hiring Activity", icon: Briefcase, color: "text-emerald-500 bg-emerald-50", items: ["45 total applications", "4 open positions", "Avg. 11 days to close", "83% offer acceptance"] },
        ].map((block) => (
          <div key={block.title} className="premium-card p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${block.color}`}>
                <block.icon className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900">{block.title}</h3>
            </div>
            <div className="space-y-3">
              {block.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[10px] font-black text-slate-300 mt-0.5 font-mono w-4 shrink-0">{i + 1}</span>
                  <p className="text-xs font-bold text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
