"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Package, BookOpen, Briefcase, MessageSquare, BarChart2, Settings, ArrowRight, Command } from "lucide-react";
import { useRouter } from "next/navigation";

const COMMANDS = [
  { label: "Overview Dashboard", href: "/dashboard", icon: BarChart2, group: "Navigate" },
  { label: "Product Catalog", href: "/dashboard/products", icon: Package, group: "Navigate" },
  { label: "Blog Management", href: "/dashboard/blog", icon: BookOpen, group: "Navigate" },
  { label: "Client Inquiries", href: "/dashboard/inquiries", icon: MessageSquare, group: "Navigate" },
  { label: "Open Positions", href: "/dashboard/jobs", icon: Briefcase, group: "Navigate" },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2, group: "Navigate" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, group: "Navigate" },
];

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[activeIdx]) {
        router.push(filtered[activeIdx].href);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, activeIdx, onClose, router]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-200">
        {/* Input */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 gap-4">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, actions..."
            className="flex-1 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-black text-slate-300 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm font-bold text-slate-400">No results found</p>
              <p className="text-xs text-slate-300 mt-1">Try a different keyword</p>
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.href}
                onClick={() => { router.push(cmd.href); onClose(); }}
                onMouseEnter={() => setActiveIdx(i)}
                className={`w-full flex items-center gap-4 px-5 py-3 transition-colors text-left ${i === activeIdx ? "bg-slate-50" : ""}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${i === activeIdx ? "bg-accent-50 text-accent-500" : "bg-slate-100 text-slate-400"}`}>
                  <cmd.icon className="w-4 h-4" />
                </div>
                <span className={`flex-1 text-sm font-semibold ${i === activeIdx ? "text-slate-900" : "text-slate-600"}`}>{cmd.label}</span>
                {i === activeIdx && <ArrowRight className="w-4 h-4 text-slate-300" />}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-50 flex items-center gap-6">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
            <Command className="w-3 h-3" /> Palette
          </span>
          <div className="flex items-center gap-4 ml-auto">
            {[["↑↓", "Navigate"], ["↵", "Open"], ["ESC", "Close"]].map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
                <kbd className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 font-black">{key}</kbd>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
