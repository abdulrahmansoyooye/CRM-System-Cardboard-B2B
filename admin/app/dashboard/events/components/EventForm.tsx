"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { Event } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const eventSchema = z.object({
  title: z.string().min(3, "Event title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  eventDate: z.string().min(1, "Event date is required"),
  isFeatured: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  initialData?: any;
  onSubmit: (data: EventFormValues) => void;
  isSubmitting: boolean;
}

export function EventForm({ initialData, onSubmit, isSubmitting }: EventFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      eventDate: initialData?.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : "",
      isFeatured: initialData?.isFeatured || false,
    },
  });

  const isFeatured = watch("isFeatured");

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Event" : "Establish Event"}>
      <FormSection title="Operational Identification">
        <FormInput
          label="Event Title"
          placeholder="e.g. Annual Packaging Summit"
          error={errors.title?.message}
          {...register("title")}
        />
        <FormInput
          label="Event Baseline Date"
          type="date"
          error={errors.eventDate?.message}
          {...register("eventDate")}
        />
      </FormSection>

      <FormSection title="Mission Scope">
        <div className="md:col-span-2">
            <FormTextarea
            label="Event Intelligence Description"
            placeholder="Enter full event details and mission objectives here..."
            error={errors.description?.message}
            {...register("description")}
            />
        </div>
      </FormSection>

      <div className="flex items-center gap-4 py-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => setValue("isFeatured", !isFeatured)}
            className={cn("w-12 h-6 rounded-full transition-all relative border border-slate-200", isFeatured ? "bg-amber-400 border-amber-500 shadow-lg shadow-amber-500/20" : "bg-slate-100")}
          >
            <div className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all", isFeatured ? "left-6.5" : "left-0.5")} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest text-slate-700">Featured Engagement</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pin to highlight section</span>
          </div>
        </label>
      </div>
    </FormLayout>
  );
}
