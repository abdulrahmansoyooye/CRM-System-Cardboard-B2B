"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Globe, FileText, Layout, Search, Eye, CheckCircle2, MoreHorizontal, User, ShieldCheck, Tag, Clock, Newspaper, ArrowUpRight } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/blog.service";
import { clsx } from "clsx";

interface Article {
  _id: string;
  title: string;
  category: string;
  status: "published" | "draft";
  content?: string;
  excerpt?: string;
  createdAt: string;
  tags?: string[];
  slug: string;
}

const emptyForm = { 
  title: "", 
  category: "Industrial", 
  status: "draft" as "published" | "draft", 
  content: "", 
  excerpt: "",
  tags: "", 
  slug: "" 
};

export default function BlogPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["blogs"], queryFn: getBlogs });

  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "published" | "draft">("All");

  const [addOpen, setAddOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setArticles(apiData.data);
    }
  }, [apiData]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setAddOpen(false);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setEditArticle(null);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setDeleteTarget(null);
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleSave = () => {
    setIsSaving(true);
    const tagsArr = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const slugValue = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const payload = { ...form, tags: tagsArr, slug: slugValue };
    
    if (editArticle) {
      updateMutation.mutate({ id: editArticle._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const toggleStatus = (a: Article) => {
    const newStatus = a.status === "published" ? "draft" : "published";
    updateMutation.mutate({ id: a._id, data: { status: newStatus } });
  };

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterType === "All" || a.status === filterType;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: "Total Articles", value: articles.length, icon: Newspaper, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Published", value: articles.filter(a => a.status === "published").length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Categories", value: [...new Set(articles.map(a => a.category))].length, icon: Tag, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Drafts", value: articles.filter(a => a.status === "draft").length, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch articles. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Editor-in-Chief</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Blog Articles</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Industrial insights, news, and manufacturing sustainability reports</p>
        </div>
        <button onClick={() => { resetForm(); setAddOpen(true); }} className="btn-primary">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : stats.map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
            </div>
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {(["All", "published", "draft"] as const).map((t) => (
             <button
                key={t}
                onClick={() => setFilterType(t)}
                className={clsx(
                  "px-5 py-2 text-xs font-bold rounded-xl transition-all capitalize",
                  filterType === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
                )}
             >
                {t}
             </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
           <input 
             type="text" 
             placeholder="Search title or category..." 
             className="w-full glass-input pl-12 py-3"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4 pb-20">
        {isLoading ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full" />) : filtered.map((art) => (
          <div key={art._id} className="premium-card group p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-accent-500/20 transition-all border-l-4 border-l-slate-200 has-[.published]:border-l-emerald-500">
             <div className="flex-1 min-w-0" onClick={() => { setEditArticle(art); setForm({ ...art, content: art.content ?? "", tags: art.tags?.join(", ") ?? "" }); }} style={{ cursor: "pointer" }}>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                   <span className={clsx("status-badge capitalize", art.status === "published" ? "badge-success published" : "badge-neutral")}>
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {art.status}
                   </span>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500">{art.category}</span>
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mb-2 group-hover:text-accent-500 transition-colors leading-tight">{art.title}</h3>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 capitalize whitespace-nowrap"><Clock className="w-3.5 h-3.5" /> Published {new Date(art.createdAt).toLocaleDateString()}</div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 capitalize whitespace-nowrap"><FileText className="w-3.5 h-3.5" /> {art.content?.split(' ').length || 0} Words</div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono truncate hidden lg:flex">Slug: {art.slug}</div>
                </div>
             </div>
             <div className="flex items-center gap-2 sm:border-l sm:border-slate-100 sm:pl-8">
                <button onClick={() => { setEditArticle(art); setForm({ ...art, content: art.content ?? "", tags: art.tags?.join(", ") ?? "", excerpt: art.excerpt ?? "" }); }} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Edit2 className="w-4.5 h-4.5" /></button>
                <button onClick={() => toggleStatus(art)} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                   {art.status === "published" ? <EyeOffIcon className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
                <button onClick={() => setDeleteTarget(art._id)} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"><Trash2 className="w-4.5 h-4.5" /></button>
             </div>
          </div>
        ))}
        {!isLoading && filtered.length === 0 && (
           <div className="py-20 text-center text-slate-300">
             <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-10" />
             <p className="font-black uppercase tracking-widest text-xs">No articles cataloged</p>
           </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      <Modal isOpen={addOpen || !!editArticle} onClose={() => { setAddOpen(false); setEditArticle(null); resetForm(); }} title={addOpen ? "Author New Insight" : "Refine Publication"} size="lg">
         <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Article Title</label>
                 <input className="w-full glass-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g. The Future of 7-Ply Sustainable Packaging" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Category</label>
                 <select className="w-full glass-input" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                    {["Industrial", "Sustainability", "Design", "News", "Logistics"].map(c => <option key={c}>{c}</option>)}
                 </select>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Custom Slug (Optional)</label>
                <input className="w-full glass-input font-mono text-xs" value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} placeholder="auto-generated-if-empty" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tags (Comma-separated)</label>
                <input className="w-full glass-input" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="industrial, sustainability" />
              </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Short Excerpt</label>
               <textarea rows={2} className="w-full glass-input resize-none" value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} placeholder="A brief summary for previews..." />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Article Core Content</label>
               <textarea rows={8} className="w-full glass-input resize-none" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} placeholder="Write your industrial insights here..." />
            </div>
            <div className="pt-4 flex gap-4">
               <button disabled={isSaving} onClick={handleSave} className="flex-1 btn-primary justify-center shadow-accent-500/20 py-4 font-black">
                  {isSaving ? "Syncing Logic..." : addOpen ? "Authorize Publication" : "Submit Revisions"}
               </button>
            </div>
         </div>
      </Modal>

      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget!)}
        title="Destroy Evidence"
        message="Permanently purging this article from the web? This will redirect all slug references to 404."
        danger
      />
    </div>
  );
}

// EyeOff icon helper
function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88 3.5 1 5.51a13.3 13.3 0 0 0 16.98 1.51"/><path d="m1 1 22 22"/><path d="M12.21 12.21A3 3 0 0 1 10 10"/><path d="M15 15a3 3 0 0 1-5.12-5.12"/><path d="M2 13a10.58 10.58 0 0 0 16.77 5.16"/><path d="m8.23 8.23a10.5 10.5 0 0 0 13.59 5"/><path d="M14.5 4.5 12 7"/></svg>
  );
}
