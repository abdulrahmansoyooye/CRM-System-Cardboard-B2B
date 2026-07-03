"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { ICategory } from "@/types/index";
import { cn } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(2, "Designation is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  coverImage: z.string().url("Invalid URL").optional().or(z.literal("")),
  isActive: z.boolean(),
});

interface CategoryFormValues {
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  isActive: boolean;
}

interface CategoryFormProps {
  initialData?: ICategory;
  onSubmit: (data: CategoryFormValues) => void;
  isSubmitting: boolean;
}

export function CategoryForm({ initialData, onSubmit, isSubmitting }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      coverImage: initialData?.coverImage || "",
      isActive: initialData?.isActive ?? true,
    },
  });

  const categoryName = watch("name");
  const isActive = watch("isActive");

  // Auto-generate slug from name
  React.useEffect(() => {
    if (!initialData && categoryName) {
      const generatedSlug = categoryName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", generatedSlug);
    }
  }, [categoryName, initialData, setValue]);

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Confirm Revisions" : "Establish Category"}>
      <FormSection title="Taxonomic Identification">
        <FormInput
          label="Category Designation"
          placeholder="e.g. Heavy Duty Corrugated"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormInput
          label="System Slug"
          placeholder="heavy-duty-cartons"
          error={errors.slug?.message}
          {...register("slug")}
        />
      </FormSection>

      <FormSection title="Visual & Technical Specs">
        <div className="md:col-span-2">
            <FormInput
            label="Cover Asset URL (Remote Stream)"
            placeholder="https://cdn.cardbox.demo/image.webp"
            error={errors.coverImage?.message}
            {...register("coverImage")}
            />
        </div>
        <div className="md:col-span-2">
            <FormTextarea
            label="Functional Description"
            placeholder="Define the primary use-case and technical limits for this taxonomy node..."
            rows={4}
            error={errors.description?.message}
            {...register("description")}
            />
        </div>
      </FormSection>

      <div className="flex items-center gap-4 py-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setValue("isActive", !isActive)}
            className={cn("w-12 h-6 rounded-full transition-all relative border border-slate-200", isActive ? "bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all", isActive ? "left-6.5" : "left-0.5")} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest text-slate-700">Operational Status</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active in navigation clusters</span>
          </div>
        </label>
      </div>
    </FormLayout>
  );
}
