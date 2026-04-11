"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { Industry } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const industrySchema = z.object({
  name: z.string().min(3, "Sector name must be at least 3 characters"),
  slug: z.string().min(1, "Mission slug is required"),
  overview: z.string().min(10, "Overview must be at least 10 characters"),
  isActive: z.boolean().default(true),
});

type IndustryFormValues = z.infer<typeof industrySchema>;

interface IndustryFormProps {
  initialData?: Industry;
  onSubmit: (data: IndustryFormValues) => void;
  isSubmitting: boolean;
}

export function IndustryForm({ initialData, onSubmit, isSubmitting }: IndustryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IndustryFormValues>({
    resolver: zodResolver(industrySchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      overview: (initialData as any)?.overview || "",
      isActive: initialData?.isActive ?? true,
    },
  });

  const name = watch("name");
  const isActive = watch("isActive");

  React.useEffect(() => {
    if (!initialData && name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [name, initialData, setValue]);

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Documentation" : "Establish Sector"}>
      <FormSection title="Sector Identification">
        <FormInput
          label="Sector Designation"
          placeholder="e.g. Pharmaceutical Packaging"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormInput
          label="Mission Slug"
          placeholder="pharma-logistics"
          error={errors.slug?.message}
          {...register("slug")}
        />
      </FormSection>

      <FormSection title="Strategic Overview">
        <div className="md:col-span-2">
            <FormTextarea
            label="Sector Intelligence Overview"
            placeholder="Describe the industrial scope and primary packaging logic for this sector..."
            error={errors.overview?.message}
            {...register("overview")}
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
            <span className="text-xs font-black uppercase tracking-widest text-slate-700">Active Pipeline Status</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available for product mapping</span>
          </div>
        </label>
      </div>
    </FormLayout>
  );
}
