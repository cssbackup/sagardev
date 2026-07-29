"use client";

import { RevealBlur } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

/** Simple equal points — open spacing, no heavy boxes */
export default function WhyChooseUs({ data }: { data: ResolvedSiteData }) {
  const { whyChooseUs } = data;
  const items = whyChooseUs.whyChooseUsItems;

  if (!whyChooseUs.title && items.length === 0) return null;

  return (
    <section className="bg-white px-4 py-14 text-[#141414] md:px-8 md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="max-w-xl">
          {whyChooseUs.pretitle && (
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {whyChooseUs.pretitle}
            </p>
          )}
          <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
            {whyChooseUs.title}
          </h2>
          {whyChooseUs.desc && (
            <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
              {whyChooseUs.desc}
            </p>
          )}
        </RevealBlur>

        <div className="mt-10 grid gap-8 border-t border-[#141414]/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {items.map((item) => (
            <article key={item.title}>
              <p className="text-2xl font-bold tracking-tight text-[var(--reroom-accent,#ff6b00)]">
                {item.stat}
              </p>
              <h3 className="mt-3 text-base font-bold leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
