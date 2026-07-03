import { create } from "zustand";
import { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  view: ReactNode | null;
  title: string;
  subtitle?: string;
  size: "sm" | "md" | "lg" | "xl";
  data: unknown;
  openModal: (options: {
    view: ReactNode;
    title: string;
    subtitle?: string;
    size?: "sm" | "md" | "lg" | "xl";
    data?: unknown;
  }) => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  view: null,
  title: "",
  subtitle: "",
  size: "md",
  data: null,
  openModal: ({ view, title, subtitle, size = "md", data }) =>
    set({ isOpen: true, view, title, subtitle, size, data }),
  closeModal: () => set({ isOpen: false, view: null, title: "", subtitle: "", data: null }),
}));
