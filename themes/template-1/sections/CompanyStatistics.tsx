"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ResolvedSiteData } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function CompanyStatistics({ data }: { data: ResolvedSiteData }) {
  const section = data.companyStatistics;
  const stats = section?.stats ?? [];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  if (!section || stats.length === 0) return null;

  return (
    <section
      ref={ref}
      className="bg-[#141414] px-4 py-10 text-white md:px-8 md:py-12 lg:px-10"
    >
      <motion.div
        className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {stats.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-[2.25rem] font-semibold leading-none tracking-tight text-white md:text-[3.25rem]">
              {item.stat}
            </p>
            <p className="mt-1 text-sm font-semibold text-white/90">{item.label}</p>
            {item.desc && (
              <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
