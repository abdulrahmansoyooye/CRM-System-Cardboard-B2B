"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, BookOpen, Clock, Globe, Archive, Search, BarChart3, MoreHorizontal, CheckCircle2, AlertCircle, Share2, User } from "lucide-react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/blog.service";
import { clsx } from "clsx";

type PostStatus = "Published" | "Draft" | "Archived";

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author?: string;
  excerpt?: string;
  content?: string;
  status: PostStatus;
  views?: number;
  tags?: string[];
  createdAt: string;
}

const CATEGORIES = ["Trends", "Sustainability", "Logistics", "Technical", "Company News", "Case Studies"];

export default function BlogPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({ queryKey: ["blogs"], queryFn: getBlogs });

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | PostStatus>("All");
  
  const [addOpen, setAddOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [viewPost, setViewPost] = useState<Post | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({ 
    title: "", 
    category: "Trends", 
    author: "", 
    excerpt: "", 
    content: "",
    tags: "", 
    status: "Draft" as PostStatus 
  });

  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
      setPosts(apiData.data.map((p: any) => ({
        ...p,
        status: p.status === "published" ? "Published" : p.status === "archived" ? "Archived" : "Draft"
      })));
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
      setEditPost(null);
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
    setForm({ 
      title: "", 
      category: "Trends", 
      author: "", 
      excerpt: "", 
      content: "",
      tags: "", 
      status: "Draft" 
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = {
      ...form,
      slug,
      status: form.status.toLowerCase(),
      tags: form.tags.split(",").map(t => t.trim()).filter(t => t !== "")
    };

    if (editPost) {
      updateMutation.mutate({ id: editPost._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handlePublishToggle = (post: Post) => {
    const newStatus = post.status === "Published" ? "draft" : "published";
    updateMutation.mutate({ id: post._id, data: { status: newStatus } });
  };

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.author?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: "Published", value: posts.filter(p => p.status === "Published").length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Drafts", value: posts.filter(p => p.status === "Draft").length, icon: Edit2, color: "text-slate-400", bg: "bg-slate-50" },
    { label: "Total Reach", value: posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString(), icon: Eye, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Engagement", value: "88%", icon: BarChart3, color: "text-brand-600", bg: "bg-brand-50" },
  ];

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
        <h2 className="text-xl font-black mb-2">Sync Error</h2>
        <p className="text-sm font-medium opacity-80">Failed to fetch blog posts. Please ensure the backend server is running.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Content Strategy</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Blog Repository</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage articles, case studies, and corporate announcements</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5 shadow-none"><Share2 className="w-4 h-4" /><span className="text-xs hidden sm:inline uppercase font-black tracking-widest">Syndicate</span></button>
          <button onClick={() => { resetForm(); setAddOpen(true); }} className="btn-primary">
            <Plus className="w-4 h-4" /> New Article
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />) : stats.map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
            </div>
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full glass-input pl-12 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
          {(["All", "Published", "Draft", "Archived"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterStatus(t)}
              className={clsx(
                "px-5 py-2 text-xs font-bold rounded-xl transition-all",
                filterStatus === t ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4 pb-20">
        {isLoading ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-40 w-full" />) : filtered.map((post) => (
          <div key={post._id} className="premium-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-accent-500/20 transition-all">
            <div className="flex-1 min-w-0" onClick={() => { setViewPost(post); }} style={{ cursor: "pointer" }}>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={clsx(
                    "status-badge",
                    post.status === "Published" ? "badge-success" : 
                    post.status === "Draft" ? "badge-neutral" : "badge-warning"
                  )}>
                  <div className="w-1 h-1 rounded-full bg-current" />
                  {post.status}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 font-mono">{post.category}</span>
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 mb-2 group-hover:text-accent-500 transition-colors leading-tight">{post.title}</h3>
              <p className="text-sm text-slate-400 font-medium mb-4 line-clamp-1">{post.excerpt}</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[8px] font-black flex items-center justify-center">{post.author ? post.author[0] : "A"}</div>
                   <span className="text-xs font-bold text-slate-500">{post.author || "Admin"}</span>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase leading-none tracking-widest flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase leading-none tracking-widest flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {post.views || 0} Views</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:border-l lg:border-slate-100 lg:pl-8">
              <button 
                onClick={() => { 
                  setEditPost(post); 
                  setForm({ 
                    title: post.title, 
                    category: post.category, 
                    author: post.author || "", 
                    excerpt: post.excerpt || "", 
                    content: post.content || "",
                    tags: post.tags?.join(", ") || "", 
                    status: post.status 
                  }); 
                }}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              >
                <Edit2 className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => handlePublishToggle(post)}
                className={clsx(
                  "p-3 bg-white border border-slate-100 rounded-xl transition-all shadow-sm",
                  post.status === "Published" ? "text-slate-400 hover:bg-rose-50 hover:text-rose-500" : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-500"
                )}
              >
                {post.status === "Published" ? <Archive className="w-4.5 h-4.5" /> : <Globe className="w-4.5 h-4.5" />}
              </button>
              <button 
                onClick={() => { setDeleteTarget(post._id); }}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={addOpen || !!editPost} 
        onClose={() => { setAddOpen(false); setEditPost(null); resetForm(); }} 
        title={addOpen ? "New Article" : "Edit Post"}
        size="lg"
      >
        <div className="space-y-5 py-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Article Title</label>
            <input className="w-full glass-input py-4 text-lg font-bold" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g. Sustainable Packaging Innovations" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Author</label>
              <input className="w-full glass-input" value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Category</label>
              <select className="w-full glass-input" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Excerpt & SEO Meta</label>
            <textarea rows={2} className="w-full glass-input resize-none" value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} placeholder="Summarize for the landing page..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Content</label>
            <textarea rows={6} className="w-full glass-input resize-none" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} placeholder="Write the full article content here..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tags (comma separated)</label>
            <input className="w-full glass-input" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="packaging, trends, 2026" />
          </div>
          <div className="flex gap-4 pt-6">
            <button disabled={isSaving} onClick={handleSave} className="flex-1 btn-primary justify-center shadow-accent-500/20 py-4 font-black">
              {isSaving ? "Syncing..." : addOpen ? "Commit Changes" : "Save Revision"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { deleteMutation.mutate(deleteTarget!); }}
        title="Delete Article"
        message="This action will remove the article from the public site and all search indices. Proceed?"
        danger
      />
    </div>
  );
}
