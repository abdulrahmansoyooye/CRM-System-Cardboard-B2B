'use client'
import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/blog.service";
import { Plus, Edit2, Trash2, Globe, FileText, Search, Eye, EyeOff, Tag, Clock, Newspaper, ArrowUpRight, MessageSquare } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useModal } from "@/lib/store/useModalStore";
import { cn } from "@/lib/utils";

type BlogStatus = "draft" | "published";

interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  tags?: string[];
  status: BlogStatus;
  createdAt: string;
}

export default function BlogPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | BlogStatus>("All");

  const articles: Article[] = Array.isArray(apiData?.data) ? apiData.data : [];

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      closeModal();
    },
  });

  const debouncedSearch = useDebounce(search, 400);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchSearch = art.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          art.category?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = filterStatus === "All" || art.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [articles, debouncedSearch, filterStatus]);

  const openFormModal = (article?: Article) => {
    openModal({
      title: article ? "Refine Publication" : "Author New Insight",
      subtitle: article ? `Editing ${article.title}` : "Create industrial-grade content for the Cardbox ecosystem",
      size: "lg",
      view: (
        <BlogForm 
          initialData={article} 
          onSubmit={(data) => article ? updateMutation.mutate({ id: article._id, data }) : createMutation.mutate(data)}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )
    });
  };

  const openDeleteModal = (id: string, title: string) => {
    openModal({
      title: "Purge Article",
      subtitle: `System decommissioning: ${title}`,
      size: "sm",
      view: (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 font-medium tracking-tight px-4 font-display">
            Are you sure you want to permanently delete this publication? This will redirect all slug references to 404 territory.
          </p>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Abort</button>
            <button 
              onClick={() => deleteMutation.mutate(id)} 
              className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              Confirm Purge
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Editorial Control</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Industrial Insights</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage thought leadership, news, and manufacturing reports</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-4 px-8 shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : (
          [
            { label: "Live Articles", value: articles.filter(a => a.status === "published").length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Draft Ops", value: articles.filter(a => a.status === "draft").length, icon: FileText, color: "text-slate-400", bg: "bg-slate-50" },
            { label: "Total Reach", value: "14.2k", icon: ArrowUpRight, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Categories", value: [...new Set(articles.map(a => a.category))].length, icon: Tag, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:rotate-12", s.bg, s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search articles by title or keyword..." className="w-full glass-input pl-14 py-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {(["All", "published", "draft"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-6 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap uppercase tracking-widest", filterStatus === s ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64" />) : (
          filteredArticles.map((art) => (
            <div key={art._id} className="premium-card group overflow-hidden border-transparent hover:border-brand-500/30 flex flex-col">
               <div className="p-7 space-y-5 flex-1">
                  <div className="flex items-center justify-between mb-4">
                     <span className={cn("status-badge px-3 py-1 text-[10px] font-black uppercase tracking-widest", art.status === "published" ? "badge-success" : "badge-neutral")}>
                       {art.status}
                     </span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-1 rounded-md">{art.category}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-tight">{art.title}</h3>
                    <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-4">
                      {art.excerpt || "No overview documentation available for this publication."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <Clock className="w-3.5 h-3.5" /> Published {new Date(art.createdAt).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <Tag className="w-3.5 h-3.5" /> {art.tags?.slice(0, 2).join(", ") || "No Tags"}
                     </div>
                  </div>
               </div>
               <div className="px-7 pb-7 pt-2 flex gap-2">
                  <button onClick={() => openFormModal(art)} className="flex-1 py-3.5 rounded-2xl bg-slate-950 text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                    <Edit2 className="w-3.5 h-3.5" /> Edit Article
                  </button>
                  <button onClick={() => openDeleteModal(art._id, art.title)} className="p-3.5 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95">
                    <Trash2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BlogForm({ initialData, onSubmit, isSubmitting }: { initialData?: Article, onSubmit: (data: any) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Industrial",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    status: initialData?.status || "draft",
    tags: initialData?.tags?.join(", ") || "",
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialData && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      }));
    }
  }, [formData.title, initialData]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...formData, tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean) }); }} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Article Title</label>
          <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full glass-input" placeholder="e.g. Sustainable Packaging 4.0" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Functional Category</label>
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full glass-input">
            {["Industrial", "Sustainability", "Design", "News", "Logistics", "Operations"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Mission Slug</label>
          <input required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full glass-input font-mono text-xs" placeholder="impact-report-2026" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Publication Status</label>
          <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as BlogStatus})} className="w-full glass-input">
            <option value="draft">Internal Draft</option>
            <option value="published">Public Publication</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Tags (Comma-separated)</label>
        <input value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full glass-input" placeholder="automation, green-tech, supply-chain" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Executive Summary</label>
        <textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full glass-input resize-none py-3" placeholder="Brief overview for preview intelligence..." />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Article Payload</label>
        <textarea rows={10} required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full glass-input resize-none py-4 leading-relaxed custom-scrollbar" placeholder="Enter full editorial content here..." />
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full btn-primary justify-center py-5 font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-500/40">
        {isSubmitting ? "Syncing Logic..." : initialData ? "Confirm Revisions" : "Authorize Publication"}
      </button>
    </form>
  );
}
