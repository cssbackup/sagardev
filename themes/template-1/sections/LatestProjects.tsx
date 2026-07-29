"use client";

import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Carousel from "@/themes/template-1/components/Carousel";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

export default function LatestProjects({ data }: { data: ResolvedSiteData }) {
  const section = data.latestProjects;
  const items = section.projectItems;
  const ctaHref = section.button
    ? withTheme(section.button.href, THEME)
    : null;
  const ctaLabel = section.button?.label;

  if (items.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {section.pretitle}
          </p>
          <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
            {section.title}
          </h2>
          {section.desc && (
            <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {section.desc}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <Carousel withNav prevLabel="Previous projects" nextLabel="Next projects">
          {items.map((item, i) => (
            <Link
              key={`${item.title}-${i}`}
              href={withTheme(
                item.href || `/projects/${item.slug || item.title}`,
                THEME
              )}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 78vw, 300px"
                />
                {item.status && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#141414]">
                    {item.status}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                {item.location && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                    {item.location}
                  </p>
                )}
                <h3 className="mt-1 text-base font-semibold text-[#141414] transition group-hover:text-[#c44536]">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#141414]/65">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      {ctaHref && ctaLabel && (
        <div className="mt-8 flex justify-center px-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#141414]/90"
          >
            {ctaLabel}
            <FaArrowRight className="text-[10px]" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
