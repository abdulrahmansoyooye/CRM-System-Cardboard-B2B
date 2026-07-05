"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormSelect, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { IJob } from "@/types/index";
import { cn } from "@/lib/utils";

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["Full-Time", "Part-Time", "Shift Basis", "Contract"]),
  salary: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["open", "closed"]),
  experience: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface JobFormProps {
  initialData?: IJob;
  onSubmit: (data: JobFormValues) => void;
  isSubmitting: boolean;
}

export function JobForm({ initialData, onSubmit, isSubmitting }: JobFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initialData?.title || "",
      department: initialData?.department || "Operations",
      location: initialData?.location || "Sector 4 Plant",
      type: (initialData?.type || "Full-Time") as "Full-Time" | "Part-Time" | "Shift Basis" | "Contract",
      salary: initialData?.salary || "",
      description: initialData?.description || "",
      status: (initialData?.status || "open") as "open" | "closed",
      experience: initialData?.experience || "",
    },
  });

  const status = watch("status");

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Mission Parameters" : "Deploy Career Opening"}>
      <FormSection title="Position Identification">
        <FormInput
          label="Position Title"
          placeholder="e.g. Lead Industrial Automation Engineer"
          error={errors.title?.message}
          {...register("title")}
        />
        <FormSelect
          label="Functional Vector"
          error={errors.department?.message}
          {...register("department")}
        >
          {["Operations", "Engineering", "Logistics", "Sales", "Marketing", "HR", "IT"].map(d => <option key={d} value={d}>{d}</option>)}
        </FormSelect>
      </FormSection>

      <FormSection title="Logistics & Budget">
        <FormSelect
          label="Engagement Type"
          error={errors.type?.message}
          {...register("type")}
        >
          {["Full-Time", "Part-Time", "Shift Basis", "Contract"].map(t => <option key={t} value={t}>{t}</option>)}
        </FormSelect>
        <FormInput
          label="Location Pipeline"
          placeholder="e.g. Sector 4 Plant"
          error={errors.location?.message}
          {...register("location")}
        />
        <FormInput
          label="Budget Allocation"
          placeholder="e.g. $8k - $12k / mo"
          error={errors.salary?.message}
          {...register("salary")}
        />
        <FormInput
          label="Experience Index"
          placeholder="e.g. 5+ Years"
          error={errors.experience?.message}
          {...register("experience")}
        />
      </FormSection>

      <FormSection title="Mission Specifics">
        <div className="md:col-span-2">
            <FormTextarea
            label="Requirement Intelligence"
            placeholder="Outline the primary talent requirements and daily industrial operations..."
            error={errors.description?.message}
            {...register("description")}
            />
        </div>
      </FormSection>

      <div className="pb-4 border-t border-slate-100 pt-6">
        <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 w-fit">
            {(["open", "closed"] as const).map((s) => (
                <button
                    key={s}
                    type="button"
                    onClick={() => setValue("status", s)}
                    className={cn(
                        "px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        status === s 
                            ? (s === 'open' ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-900 text-white shadow-lg")
                            : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    {s === 'open' ? "Active Funnel" : "Decommissioned"}
                </button>
            ))}
        </div>
      </div>
    </FormLayout>
  );
}
