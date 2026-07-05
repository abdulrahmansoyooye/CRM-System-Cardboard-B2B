"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollProgressOptions {
  offset?: ["start end" | "start start" | "end end" | "end start", "start end" | "start start" | "end end" | "end start"];
  inputRange?: [number, number];
  outputRange?: [number, number];
}

export function useScrollProgress(options: ScrollProgressOptions = {}): {
  ref: React.RefObject<null>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
} {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    options.inputRange || [0, 1],
    options.outputRange || [0, -100]
  );

  return { ref, y, scrollYProgress };
}
