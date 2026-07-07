"use client";

import { useCallback, useEffect, useRef, cloneElement, isValidElement, ReactElement } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function FocusTrap({ children }: { children: ReactElement }) {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [getFocusableElements]
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    const container = containerRef.current;

    const observer = new MutationObserver(() => {
      const focusable = getFocusableElements();
      if (
        focusable.length > 0 &&
        !focusable.includes(document.activeElement as HTMLElement)
      ) {
        focusable[0].focus();
      }
    });

    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    const timer = setTimeout(() => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [handleKeyDown, getFocusableElements]);

  if (!isValidElement(children)) return <>{children}</>;

  return cloneElement(children, { ref: containerRef } as Record<string, unknown>);
}
