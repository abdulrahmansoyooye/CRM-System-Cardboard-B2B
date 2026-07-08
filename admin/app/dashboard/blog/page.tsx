"use client";

import React, { useMemo } from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/blog.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { BlogForm } from "./components/BlogForm";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, Newspaper, Edit2, Trash2, Clock, Tag, ArrowUpRight } from "lucide-react";
import { Blog } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const { openModal, closeModal } = useModal();

  // Queries
  const { data: apiData, isLoading } = useDashboardQuery(["blogs"], getBlogs);

  const blogs = useMemo(() => (Array.isArray(apiData?.data) ? apiData.data : []) as unknown as Blog[], [apiData]);

  // Mutations
  const createMutation = useDashboardMutation<any>(
    createBlog,
    "Article published successfully",
    [["blogs"]]
  );

  const updateMutation = useDashboardMutation<{ id: string; data: any }>(
    ({ id, data }) => updateBlog(id, data),
    "Article updated successfully",
    [["blogs"]]
  );

  const deleteMutation = useDashboardMutation<string>(
    deleteBlog,
    "Article purged successfully",
    [["blogs"]]
  );

  const handleCreate = async (formData: any) => {
    const { isPublished, ...rest } = formData;
    await createMutation.mutateAsync({ ...rest, status: isPublished ? 'published' : 'draft' });
    closeModal();
  };

  const handleUpdate = async (id: string, formData: any) => {
    const { isPublished, ...rest } = formData;
    await updateMutation.mutateAsync({ id, data: { ...rest, status: isPublished ? 'published' : 'draft' } });
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    closeModal();
  };

  const openFormModal = (blog?: Blog) => {
    openModal({
      title: blog ? "Refine Publication" : "Author New Insight",
      subtitle: blog ? `Modify editorial content for ${blog.title}` : "Establish a new thought leadership piece for the industrial ecosystem",
      size: "lg",
      view: (
        <BlogForm
          initialData={blog}
          onSubmit={(data) => (blog ? handleUpdate(blog._id, data) : handleCreate(data))}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      ),
    });
  };

  const openDeleteModal = (blog: Blog) => {
    openModal({
      title: "Purge Publication",
      size: "sm",
      view: (
        <ConfirmDialog
          title="Delete Article?"
          message={`Are you sure you want to permanently remove "${blog.title}"? This will decommission the slug and lead to a 404 territory.`}
          confirmText="Confirm Purge"
          onConfirm={() => handleDelete(blog._id)}
          onCancel={closeModal}
          isLoading={deleteMutation.isPending}
        />
      ),
    });
  };

  const columns = [
    {
      header: "Article Details",
      accessorKey: "title",
      sortable: true,
      cell: (b: Blog) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-500 transition-all shrink-0 border border-slate-100/50 shadow-sm overflow-hidden">
            <Newspaper className="w-6 h-6" />
          </div>
          <div className="max-w-md">
            <h4 className="font-black text-slate-900 leading-tight line-clamp-1">{b.title}</h4>
            <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-tighter">/{b.slug}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{b.category}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (b: Blog) => {
        const isLive = b.isPublished || b.status === "published";
        return (
          <span className={cn("status-badge", isLive ? "badge-success" : "badge-neutral")}>
            <div className={cn("w-1.5 h-1.5 rounded-full", isLive ? "bg-emerald-500" : "bg-slate-400")} />
            {isLive ? "Live" : "Draft"}
          </span>
        );
      },
    },
    {
      header: "Published Date",
      accessorKey: "createdAt",
      sortable: true,
      cell: (b: Blog) => (
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            {new Date(b.createdAt || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      ),
    },

    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (b: Blog) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openFormModal(b)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-brand-950 transition-all font-bold"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteModal(b)}
            className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Editorial Hub</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Industrial Insights</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage thought leadership, news, and manufacturing reports for the ecosystem.</p>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> AUTHOR ARTICLE
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Publicized", value: blogs.filter((b: any) => (b as any).isPublished || (b as any).status === "published").length, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Drafts", value: blogs.filter((b: any) => !((b as any).isPublished || (b as any).status === "published")).length, icon: FileText, color: "text-slate-400", bg: "bg-slate-50" },
          { label: "Total Asset Reach", value: "14.2k", icon: ArrowUpRight, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Sectors Managed", value: [...new Set(blogs.map((b: any) => b.category))].length, icon: Tag, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">
                {isLoading ? <div className="h-9 w-12 bg-slate-100 animate-pulse rounded-lg" /> : s.value}
              </h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100/50 transition-all group-hover:scale-110", s.bg, s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable
        data={blogs}
        columns={columns}
        isLoading={isLoading}
        searchKey="title"
        searchPlaceholder="Scan publications by title or metadata..."
        emptyTitle="Editorial Archive Empty"
        emptySubtitle="No publications found. Authorized personnel can start drafting a new insight."
      />
    </div>
  );
}
