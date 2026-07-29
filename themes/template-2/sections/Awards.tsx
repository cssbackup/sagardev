"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

/** Award plaques grid — not a list / timeline / slider */
export default function Awards({ data }: { data: ResolvedSiteData }) {
  const page = data.awardsPage;
  const awards = page.awardItems;

  if (awards.length === 0) return null;

  return (
    <section className="bg-[#faf9f7] px-4 py-14 text-[#141414] md:px-8 md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.pretitle}
            </p>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
              {page.title}
            </h2>
            {page.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                {page.desc}
              </p>
            )}
          </div>
          <Link
            href={withTheme("/awards", THEME)}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
          >
            All awards
            <FaArrowRight className="text-[10px]" />
          </Link>
        </RevealBlur>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {awards.map((award) => (
            <StaggerItem key={`${award.year}-${award.title}`}>
              <article className="group flex h-full gap-4 bg-white p-4 transition hover:shadow-[0_12px_40px_rgba(20,20,20,0.06)] md:gap-5 md:p-5">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#eeeae4] sm:h-28 sm:w-24">
                  <MediaImage
                    themeId={THEME}
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1 border-l border-[#141414]/8 pl-4 md:pl-5">
                  <p className="text-2xl font-bold tracking-tight text-[var(--reroom-accent,#ff6b00)]">
                    {award.year}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-snug md:text-lg">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#141414]/40">
                    {award.org}
                  </p>
                  {award.desc && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/55">
                      {award.desc}
                    </p>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
