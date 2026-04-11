"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center gap-4">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${isDestructive ? 'bg-rose-50 text-rose-500' : 'bg-brand-50 text-brand-500'}`}>
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-display font-black text-slate-900">{title}</h3>
          <p className="text-sm text-slate-400 font-medium px-4">{message}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all shadow-xl disabled:opacity-50 ${
            isDestructive 
              ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20" 
              : "bg-brand-950 hover:bg-brand-900 shadow-brand-950/20"
          }`}
        >
          {isLoading ? "Processing..." : confirmText}
        </button>
      </div>
    </div>
  );
}
