"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
