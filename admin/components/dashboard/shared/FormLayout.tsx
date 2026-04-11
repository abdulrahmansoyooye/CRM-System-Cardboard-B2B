"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FormLayoutProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function FormLayout({
  children,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Changes",
  secondaryAction,
  className,
}: FormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-8", className)}>
      <div className="grid grid-cols-1 gap-6">
        {children}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        {secondaryAction}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 btn-primary justify-center py-4 font-black shadow-xl shadow-brand-950/20"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synchronizing...</span>
            </div>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}

export function FormSection({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 px-1 border-l-2 border-accent-500/30 ml-1">
          {title}
        </h4>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

export function FormInput({ 
  label, 
  error, 
  className, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">
        {label}
      </label>
      <input
        {...props}
        className={cn(
          "w-full glass-input",
          error && "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500",
          className
        )}
      />
      {error && <p className="text-[10px] font-bold text-rose-500 px-1">{error}</p>}
    </div>
  );
}

export function FormSelect({ 
    label, 
    error, 
    children,
    className, 
    ...props 
  }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
    return (
      <div className={cn("space-y-2", className)}>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">
          {label}
        </label>
        <select
          {...props}
          className={cn(
            "w-full glass-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2364748b%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10",
            error && "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500",
            className
          )}
        >
          {children}
        </select>
        {error && <p className="text-[10px] font-bold text-rose-500 px-1">{error}</p>}
      </div>
    );
  }

export function FormTextarea({ 
  label, 
  error, 
  className, 
  ...props 
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">
        {label}
      </label>
      <textarea
        {...props}
        className={cn(
          "w-full glass-input min-h-[120px] resize-none",
          error && "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500",
          className
        )}
      />
      {error && <p className="text-[10px] font-bold text-rose-500 px-1">{error}</p>}
    </div>
  );
}
