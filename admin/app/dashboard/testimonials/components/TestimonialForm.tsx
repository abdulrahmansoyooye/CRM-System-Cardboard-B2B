"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormSelect, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { cn } from "@/lib/utils";

const testimonialSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  company: z.string().optional(),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  isPublished: z.boolean(),
});

interface TestimonialFormValues {
  clientName: string;
  company?: string;
  feedback: string;
  rating: number;
  isPublished: boolean;
}

interface TestimonialFormProps {
  initialData?: any;
  onSubmit: (data: TestimonialFormValues) => void;
  isSubmitting: boolean;
}

export function TestimonialForm({ initialData, onSubmit, isSubmitting }: TestimonialFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      clientName: initialData?.clientName || "",
      company: initialData?.company || "",
      feedback: initialData?.feedback || "",
      rating: initialData?.rating || 5,
      isPublished: initialData?.isPublished || false,
    },
  });

  const rating = watch("rating");
  const isPublished = watch("isPublished");

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Statement" : "Commit Endorsement"}>
      <FormSection title="Source Identity">
        <FormInput
          label="Client Representative"
          placeholder="e.g. John Doe"
          error={errors.clientName?.message}
          {...register("clientName")}
        />
        <FormInput
          label="Organization"
          placeholder="e.g. Acme Industrial"
          error={errors.company?.message}
          {...register("company")}
        />
      </FormSection>

      <FormSection title="Endorsement Signal">
        <FormSelect
          label="Metric Rating"
          error={errors.rating?.message}
          {...register("rating", { valueAsNumber: true })}
        >
          {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} Stars</option>)}
        </FormSelect>
        <div className="md:col-span-2">
            <FormTextarea
            label="Formal Feedback Statement"
            placeholder="Paste the official client testimony here..."
            error={errors.feedback?.message}
            {...register("feedback")}
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
            <span className="text-xs font-black uppercase tracking-widest text-slate-700">Publication Status</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Display live on platform</span>
          </div>
        </label>
      </div>
    </FormLayout>
  );
}
