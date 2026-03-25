"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string; 
  confirmLabel?: string;
  danger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  danger = true,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button onClick={onClose} className="btn-secondary py-2.5 px-5">
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
              danger
                ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20"
                : "btn-primary"
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4 items-start py-2">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${danger ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-600 font-medium leading-relaxed pt-2">{message}</p>
      </div>
    </Modal>
  );
}
