"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormSelect } from "@/components/dashboard/shared/FormLayout";
import { Upload } from "lucide-react";

const assetSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(1, "Category is required"),
  url: z.string().url("Valid URL is required for now"), // Ideal: File upload
  type: z.string().optional(),
  size: z.string().optional(),
  dimensions: z.string().optional(),
});

type AssetFormValues = z.infer<typeof assetSchema>;

interface AssetFormProps {
  onSubmit: (data: AssetFormValues) => void;
  isSubmitting: boolean;
}

export function AssetForm({ onSubmit, isSubmitting }: AssetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: "",
      category: "Operations",
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
      type: "JPEG",
      size: "2.4 MB",
      dimensions: "1920x1080",
    },
  });

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel="Log Asset Record">
      <div className="border-4 border-dashed border-slate-100 rounded-4xl p-10 text-center hover:border-brand-500/20 hover:bg-brand-50/10 transition-all cursor-pointer group mb-4">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all">
          <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-500" />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Interface Stream</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Select media payload for ingestion</p>
      </div>

      <FormSection title="Asset Telemetry">
        <FormInput
          label="Asset Identifier"
          placeholder="e.g. Warehouse Operation Alpha"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormSelect
          label="Data Cluster"
          error={errors.category?.message}
          {...register("category")}
        >
          {["Operations", "Products", "Facilities", "Lab", "Corporate"].map(c => <option key={c} value={c}>{c}</option>)}
        </FormSelect>
        <div className="md:col-span-2">
            <FormInput
            label="Source URL (External Bridge)"
            placeholder="https://..."
            error={errors.url?.message}
            {...register("url")}
            />
        </div>
      </FormSection>

      <FormSection title="Specs (Auto-Detected)">
        <FormInput label="Encoded Type" {...register("type")} />
        <FormInput label="Payload Weight" {...register("size")} />
        <FormInput label="Resolution Matrix" {...register("dimensions")} />
      </FormSection>
    </FormLayout>
  );
}
