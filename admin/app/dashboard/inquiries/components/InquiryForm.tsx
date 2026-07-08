"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayout, FormSection, FormInput, FormTextarea } from "@/components/dashboard/shared/FormLayout";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  productInterested: z.string().optional(),
  message: z.string().min(5, "Message is too short"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  onSubmit: (data: InquiryFormValues) => void;
  isSubmitting: boolean;
}

export function InquiryForm({ onSubmit, isSubmitting }: InquiryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      productInterested: "",
      message: "",
    },
  });

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel="Inject into Pipeline">
      <FormSection title="Lead Identity">
        <FormInput
          label="Lead Name"
          placeholder="e.g. John Doe"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormInput
          label="Organization"
          placeholder="e.g. Acme Corp"
          error={errors.company?.message}
          {...register("company")}
        />
        <FormInput
          label="Email Interface"
          placeholder="john@acme.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          label="Comms Signal"
          placeholder="+123..."
          error={errors.phone?.message}
          {...register("phone")}
        />
      </FormSection>

      <FormSection title="Interest Vectors">
        <div className="md:col-span-2">
            <FormInput
            label="Interest Focus"
            placeholder="e.g. Heavy Duty Triple Wall Corrugated"
            error={errors.productInterested?.message}
            {...register("productInterested")}
            />
        </div>
        <div className="md:col-span-2">
            <FormTextarea
            label="Mission Message"
            placeholder="Primary inquiry payload..."
            error={errors.message?.message}
            {...register("message")}
            />
        </div>
      </FormSection>
    </FormLayout>
  );
}
