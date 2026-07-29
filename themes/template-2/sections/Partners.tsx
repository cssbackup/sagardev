"use client";

import { RevealBlur } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

/** Partner wordmarks — prefers award orgs from siteData */
export default function Partners({ data }: { data: ResolvedSiteData }) {
  const fromAwards = data.awardsPage.awardItems
    .map((a) => a.org)
    .filter(Boolean);
  const unique = Array.from(new Set(fromAwards));
  const partners =
    unique.length >= 3
      ? unique.slice(0, 6)
      : [
          ...unique,
          "Bosch",
          "Siemens",
          "Grohe",
          "Hansgrohe",
          "Villeroy & Boch",
        ].slice(0, 5);

  return (
    <section className="border-y border-[#141414]/8 bg-white px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
      <RevealBlur className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
        {partners.map((name) => (
          <span
            key={name}
            className="text-sm font-semibold tracking-[0.04em] text-[#141414]/35 transition hover:text-[#141414]/60 md:text-base"
          >
            {name}
          </span>
        ))}
      </RevealBlur>
    </section>
  );
}
