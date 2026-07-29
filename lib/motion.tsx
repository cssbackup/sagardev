"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.2 } as const;

/** Template-1 — soft rise */
export function RevealUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`motion-safe ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.45, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Template-2 — soft blur-in */
export function RevealBlur({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`motion-safe ${className}`}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Template-3 — opacity only */
export function RevealFade({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`motion-safe ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Template-4 — soft horizontal slide */
export function RevealSlide({
  children,
  className = "",
  delay = 0,
  from = "left",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right";
}) {
  return (
    <motion.div
      className={`motion-safe ${className}`}
      initial={{ opacity: 0, x: from === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.45, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Template-5 — subtle scale */
export function RevealScale({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`motion-safe ${className}`}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration: 0.4, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease },
  },
};

export function Stagger({
  children,
  className = "",
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={`motion-safe ${className}`}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

type TextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  mode?: string;
  once?: boolean;
  speed?: number;
  cursor?: boolean;
  cursorClass?: string;
  onDone?: () => void;
};

/** Plain text helpers — themes wrap these with their Reveal */
export function PlainText({
  text,
  as: Tag = "span",
  className = "",
}: TextProps) {
  return <Tag className={className}>{text}</Tag>;
}

export const FadeUp = RevealUp;
export const FadeScale = RevealScale;
export const SlideFromX = RevealSlide;
export const WipeWrite = RevealFade;
export const WriteFromX = PlainText;
export const Typewriter = PlainText;

export const motionTheme = {
  "template-1": { cursor: "bg-[#c44536]" },
  "template-2": { cursor: "bg-[#ff6b00]" },
  "template-3": { cursor: "bg-[#e11d2e]" },
} as const;

export { fadeUp };
