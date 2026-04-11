"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormSelect, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { Product, Category } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  categoryId: z.string().min(1, "Category is required"),
  moq: z.number().min(1, "MOQ must be at least 1"),
  deliveryTimeline: z.string().min(1, "Delivery timeline is required"),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  materialDetails: z.string().optional(),
});

interface ProductFormValues {
  name: string;
  categoryId: string;
  moq: number;
  deliveryTimeline: string;
  isFeatured: boolean;
  isActive: boolean;
  shortDescription?: string;
  fullDescription?: string;
  materialDetails?: string;
}

interface ProductFormProps {
  initialData?: any;
  categories: Category[];
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting: boolean;
}

export function ProductForm({ initialData, categories, onSubmit, isSubmitting }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      categoryId: (initialData?.categoryId as any)?._id || initialData?.categoryId || "",
      moq: initialData?.moq || 1,
      deliveryTimeline: initialData?.deliveryTimeline || "",
      isFeatured: initialData?.isFeatured || false,
      isActive: initialData?.isActive ?? true,
      shortDescription: initialData?.shortDescription || "",
      fullDescription: initialData?.fullDescription || "",
      materialDetails: initialData?.materialDetails || "",
    },
  });

  const isFeatured = watch("isFeatured");
  const isActive = watch("isActive");

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Product" : "Create Product"}>
      <FormSection title="Basic Information">
        <FormInput
          label="Product Name"
          placeholder="e.g. 7-Ply Triple Fluted Box"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormSelect
          label="Category"
          error={errors.categoryId?.message}
          {...register("categoryId")}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </FormSelect>
        <FormInput
          label="Min. Order Qty"
          type="number"
          error={errors.moq?.message}
          {...register("moq", { valueAsNumber: true })}
        />
        <FormInput
          label="Delivery Timeline"
          placeholder="e.g. 7-10 Business Days"
          error={errors.deliveryTimeline?.message}
          {...register("deliveryTimeline")}
        />
      </FormSection>

      <FormSection title="Descriptions">
        <div className="md:col-span-2">
            <FormInput
            label="Short Description"
            placeholder="Brief overview of the SKU..."
            error={errors.shortDescription?.message}
            {...register("shortDescription")}
            />
        </div>
        <div className="md:col-span-2">
            <FormTextarea
            label="Material Details"
            placeholder="Specify material composition..."
            error={errors.materialDetails?.message}
            {...register("materialDetails")}
            />
        </div>
      </FormSection>

      <div className="flex gap-8 px-1">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setValue("isFeatured", !isFeatured)}
            className={cn("w-12 h-6 rounded-full transition-all relative border border-slate-200", isFeatured ? "bg-amber-400 border-amber-500 shadow-md shadow-amber-500/20" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all", isFeatured ? "left-6.5" : "left-1")} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Featured</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Display on landing</span>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setValue("isActive", !isActive)}
            className={cn("w-12 h-6 rounded-full transition-all relative border border-slate-200", isActive ? "bg-emerald-500 border-emerald-600 shadow-md shadow-emerald-500/20" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all", isActive ? "left-6.5" : "left-1")} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Active</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available to client</span>
          </div>
        </label>
      </div>
    </FormLayout>
  );
}
