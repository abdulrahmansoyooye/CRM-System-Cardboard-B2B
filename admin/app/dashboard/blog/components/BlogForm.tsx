"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormSelect, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { IBlog } from "@/types/index";
import { cn } from "@/lib/utils";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  isPublished: z.boolean(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

interface BlogFormValues {
  title: string;
  category: string;
  content: string;
  isPublished: boolean;
  excerpt?: string;
  tags?: string[];
}

interface BlogFormProps {
  initialData?: IBlog;
  onSubmit: (data: BlogFormValues) => void;
  isSubmitting: boolean;
}

export function BlogForm({ initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "Industrial",
      content: initialData?.content || "",
      isPublished: !!initialData?.isPublished || initialData?.status === "published",
      excerpt: initialData?.excerpt || "",
      tags: initialData?.tags || [],
    },
  });

  const isPublished = watch("isPublished");

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Publication" : "Authorize Publication"}>
      <FormSection title="Content Identification">
        <FormInput
          label="Article Title"
          placeholder="e.g. Sustainable Packaging 4.0"
          error={errors.title?.message}
          {...register("title")}
        />
        <FormSelect
          label="Functional Category"
          error={errors.category?.message}
          {...register("category")}
        >
          {["Industrial", "Sustainability", "Design", "News", "Logistics", "Operations"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FormSelect>
      </FormSection>

      <FormSection title="Publication Metadata">
        <div className="md:col-span-2">
            <FormTextarea
            label="Executive Summary (Excerpt)"
            placeholder="Brief overview for preview intelligence..."
            error={errors.excerpt?.message}
            {...register("excerpt")}
            />
        </div>
      </FormSection>

      <FormSection title="Full Body Content">
        <div className="md:col-span-2">
            <FormTextarea
            label="Article Payload"
            placeholder="Enter full editorial content here..."
            className="min-h-[300px]"
            error={errors.content?.message}
            {...register("content")}
            />
        </div>
      </FormSection>

      <div className="flex items-center gap-4 py-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setValue("isPublished", !isPublished)}
            className={cn("w-12 h-6 rounded-full transition-all relative border border-slate-200", isPublished ? "bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all", isPublished ? "left-6.5" : "left-0.5")} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest text-slate-700">Published Status</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available on public interface</span>
          </div>
        </label>
      </div>
    </FormLayout>
  );
}
