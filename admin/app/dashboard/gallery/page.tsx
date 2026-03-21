"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon, Trash2, Search, Grid, List as ListIcon, Maximize2, MoreHorizontal, CheckCircle2, AlertCircle, X, Upload } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import { clsx } from "clsx";

interface Asset {
  id: number;
  name: string;
  category: string;
  size: string;
  date: string;
  dimensions: string;
  type: string;
}

const INITIAL_ASSETS: Asset[] = [
  { id: 1, name: "7-Ply Container Loading", category: "Operations", size: "2.4MB", date: "Mar 13", dimensions: "1920x1080", type: "JPEG" },
  { id: 2, name: "Custom Printed Sample - FreshCo", category: "Products", size: "1.8MB", date: "Mar 12", dimensions: "1200x800", type: "PNG" },
  { id: 3, name: "Production Line - Sector 4", category: "Facilities", size: "4.1MB", date: "Mar 12", dimensions: "2400x1600", type: "JPEG" },
  { id: 4, name: "Stacking Strength Test", category: "Lab", size: "3.2MB", date: "Mar 11", dimensions: "1080x1080", type: "PNG" },
  { id: 5, name: "Bulk Pallet Order Ready", category: "Operations", size: "2.9MB", date: "Mar 10", dimensions: "1920x1080", type: "JPEG" },
  { id: 6, name: "Office Mockup Design", category: "Products", size: "1.5MB", date: "Mar 09", dimensions: "800x600", type: "SVG" },
];

export default function GalleryPage() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filtered = assets.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (selectedAsset) {
      setAssets(assets.filter(a => a.id !== selectedAsset.id));
      setIsDeleteOpen(false);
      setIsPreviewOpen(false);
    }
  };

  const handleUpload = () => {
    // Mock upload
    const nextId = Math.max(...assets.map(a => a.id)) + 1;
    const newAsset: Asset = {
      id: nextId,
      name: "New Upload " + nextId,
      category: "Uncategorized",
      size: "0.5MB",
      date: "Today",
      dimensions: "1000x1000",
      type: "PNG"
    };
    setAssets([newAsset, ...assets]);
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Media Asset Library</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Gallery Manager</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Organize and manage visual assets across the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm mr-2">
            <button 
              onClick={() => setView("grid")}
              className={clsx(
                "p-2.5 rounded-xl transition-all",
                view === 'grid' ? 'bg-slate-900 shadow-lg text-white' : 'text-slate-400 hover:text-slate-900'
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={clsx(
                "p-2.5 rounded-xl transition-all",
                view === 'list' ? 'bg-slate-900 shadow-lg text-white' : 'text-slate-400 hover:text-slate-900'
              )}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => setIsUploadOpen(true)} className="btn-primary">
            <Upload className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Assets", value: assets.length, icon: ImageIcon, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Used Storage", value: "24.5", unit: "MB", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Latest Upload", value: "Mar 13", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Optimized", value: "98%", icon: Maximize2, color: "text-sky-600", bg: "bg-sky-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {s.value}<span className="text-sm ml-1 text-slate-400 font-black uppercase">{s.unit}</span>
              </h3>
            </div>
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search by name or category..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
          {(["All", "Operations", "Products", "Facilities", "Lab"] as const).map((cat) => (
             <button
                key={cat}
                onClick={() => setSearch(cat === "All" ? "" : cat)}
                className={clsx(
                  "px-5 py-2 text-xs font-bold rounded-xl transition-all",
                  (search === cat || (cat === "All" && search === "")) ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
                )}
             >
                {cat}
             </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
          {filtered.map((img) => (
            <div key={img.id} className="premium-card group overflow-hidden cursor-pointer" onClick={() => { setSelectedAsset(img); setIsPreviewOpen(true); }}>
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden group/img">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 transform scale-150 transition-transform group-hover/img:scale-100 opacity-20 group-hover/img:opacity-100">
                  <ImageIcon className="w-12 h-12" />
                </div>
                {/* Visual Label */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/80 backdrop-blur-md text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm border border-white/40">
                    {img.type}
                  </span>
                </div>
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:bg-accent-500 hover:text-white transition-all shadow-2xl transform translate-y-4 group-hover/img:translate-y-0">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500">{img.category}</span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">{img.size}</span>
                </div>
                <h4 className="font-bold text-slate-900 truncate mb-1 text-sm">{img.name}</h4>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{img.date}, 2026</span>
                  <span className="text-[9px] font-bold text-slate-300 font-mono">{img.dimensions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Specs</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Upload Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((img) => (
                <tr key={img.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => { setSelectedAsset(img); setIsPreviewOpen(true); }}>
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-slate-900/10">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">{img.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold tracking-tight uppercase">{img.type} | {img.size}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="status-badge badge-neutral">
                      {img.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dimensions</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">{img.dimensions}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500">{img.date}, 2026</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover/tr:opacity-100">
                      <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedAsset(img); setIsDeleteOpen(true); }} 
                        className="p-2.5 hover:bg-rose-50 rounded-xl text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Media Assets" subtitle="Accepts JPEG, PNG, WEBP and SVGs up to 10MB" size="md">
        <div className="space-y-6 py-6">
          <div className="border-4 border-dashed border-slate-100 rounded-[32px] p-12 text-center hover:border-accent-500/20 hover:bg-accent-50/10 transition-all cursor-pointer group">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-50 group-hover:scale-110 transition-all">
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-accent-500" />
            </div>
            <h3 className="text-lg font-display font-black text-slate-900 mb-2">Drag and drop assets here</h3>
            <p className="text-sm text-slate-400 mb-6">Or click to browse from your computer</p>
            <button onClick={handleUpload} className="btn-secondary mx-auto border-slate-200">Select Files</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Max Resolution</p>
                <p className="text-sm font-bold text-slate-900">4096 x 4096 px</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Limit</p>
                <p className="text-sm font-bold text-slate-900">10 Files at once</p>
             </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Asset Details" size="lg">
        {selectedAsset && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            <div className="aspect-square bg-slate-100 rounded-3xl flex items-center justify-center border border-slate-100 overflow-hidden relative group/prev">
                <ImageIcon className="w-24 h-24 text-slate-200 group-hover/prev:scale-125 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <span className="status-badge badge-neutral mb-3">{selectedAsset.category}</span>
                <h3 className="text-2xl font-display font-black text-slate-900 mb-2">{selectedAsset.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium capitalize">
                  Full resolution {selectedAsset.type.toLowerCase()} asset optimized for web delivery.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">File Format</p>
                  <p className="text-sm font-bold text-slate-900 uppercase">{selectedAsset.type}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">File Size</p>
                  <p className="text-sm font-bold text-slate-900 font-mono">{selectedAsset.size}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Dimensions</p>
                  <p className="text-sm font-bold text-slate-900 font-mono">{selectedAsset.dimensions}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Upload Date</p>
                  <p className="text-sm font-bold text-slate-900">{selectedAsset.date}, 2026</p>
                </div>
              </div>

              <div className="pt-8 flex gap-3">
                <button className="flex-1 btn-primary justify-center shadow-accent-500/20">Download Original</button>
                <button 
                  onClick={() => setIsDeleteOpen(true)}
                  className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5 active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Asset"
        message={`This will permanently remove ${selectedAsset?.name} from the library and all linked pages.`}
      />

    </div>
  );
}
