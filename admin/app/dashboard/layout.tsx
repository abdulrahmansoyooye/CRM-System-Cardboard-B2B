"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import GlobalModal from "@/components/GlobalModal";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fbfbfc]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar with Mobile Trigger */}
        <div className="flex items-center glass-header px-4 lg:px-8">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-500 mr-2"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <Topbar />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-4 py-6 lg:px-10 lg:py-8 overflow-y-auto overflow-x-hidden scroll-smooth text-slate-900">
          <div className="max-w-7xl mx-auto w-full animate-enter">
            {children}
          </div>
        </main>
      </div>
      <GlobalModal />
    </div>
  );
}
