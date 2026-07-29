"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

/** Dark yield board — row strips, not another card slider */
export default function Investment({ data }: { data: ResolvedSiteData }) {
  const section = data.investmentOpportunities;
  const items = section.items;
  const cta = section.button;
  const ctaHref = cta?.href || "/properties";

  if (items.length === 0) return null;

  return (
    <section className="bg-[#141414] px-4 py-14 text-white md:px-8 md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {section.pretitle}
            </p>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
              {section.title}
            </h2>
            {section.desc && (
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {section.desc}
              </p>
            )}
          </div>
          {cta && (
            <Link
              href={withTheme("/projects", THEME)}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
            >
              {cta.label}
              <FaArrowRight className="text-[10px]" />
            </Link>
          )}
        </RevealBlur>

        <Stagger className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item, i) => (
            <StaggerItem key={item.title}>
              <Link
                href={withTheme("/projects", THEME)}
                className="group grid items-center gap-4 py-6 transition hover:bg-white/[0.03] sm:grid-cols-[120px_1fr_auto] sm:gap-6 md:grid-cols-[140px_1fr_auto] md:gap-8 md:py-7"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#2a2a2a] sm:aspect-square">
                  <MediaImage
                    themeId={THEME}
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="140px"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-bold tabular-nums text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.location && (
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                        {item.location}
                      </span>
                    )}
                    {item.yieldLabel && (
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--reroom-accent,#ff6b00)]">
                        {item.yieldLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-[var(--reroom-accent,#ff6b00)] md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>

                <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition group-hover:border-[var(--reroom-accent,#ff6b00)] group-hover:text-[var(--reroom-accent,#ff6b00)] sm:inline-flex">
                  <FaArrowRight className="text-xs" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
