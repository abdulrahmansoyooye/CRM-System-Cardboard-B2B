"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useModal } from "@/lib/store/useModalStore";
import { AnimatePresence, motion } from "framer-motion";

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function GlobalModal() {
  const { isOpen, view, title, subtitle, size, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full ${sizeMap[size]} bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden`}
          >
            {/* Header */}
            <div className="px-8 py-7 flex items-start justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-10 border-b border-slate-50">
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-display font-black text-slate-900 tracking-tight"
                >
                  {title}
                </motion.h3>
                {subtitle && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1"
                  >
                    {subtitle}
                  </motion.p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8 overflow-y-auto flex-1 custom-scrollbar">
              {view}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
