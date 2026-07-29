"use client";

import Link from "next/link";
import { FaTrophy } from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

/** Awards strip — home page only, placed above the footer */
export default function Awards({ data }: { data: ResolvedSiteData }) {
  const { awardsPage } = data;
  const awards = awardsPage.awardItems.slice(0, 4);

  if (awards.length === 0) return null;

  return (
    <section className="bg-[var(--snifty-navy,#0b1f33)] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <RevealBlur className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FaTrophy className="text-[var(--snifty-red,#e11d2e)]" />
              <div>
                {awardsPage.pretitle && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                    {awardsPage.pretitle}
                  </p>
                )}
                <h2 className="t3-serif text-lg font-bold md:text-xl">
                  {awardsPage.title}
                </h2>
              </div>
            </div>
            <Link
              href={withTheme("/awards", THEME)}
              className="text-sm font-semibold text-[var(--snifty-red,#e11d2e)] transition hover:text-white"
            >
              View all awards →
            </Link>
          </RevealBlur>

          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((award) => (
              <StaggerItem key={`${award.year}-${award.title}`}>
                <article className="flex h-full gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 transition hover:border-[var(--snifty-red,#e11d2e)]/40 hover:bg-white/[0.07]">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <MediaImage
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                      themeId={THEME}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--snifty-red,#e11d2e)]">
                      {award.year}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-white">
                      {award.title}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-white/50">
                      {award.org}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
