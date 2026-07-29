"use client";

import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData } from "@/lib/types";

export default function FeaturedDevelopers({ data }: { data: ResolvedSiteData }) {
  const section = data.featuredDevelopers;
  const items = section?.items ?? [];

  if (!section || items.length === 0) return null;

  const loopItems = [...items, ...items];

  return (
    <section className="overflow-hidden bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <h2 className="mx-auto max-w-3xl text-center text-[1.15rem] font-semibold uppercase tracking-[0.08em] text-[#141414] sm:text-[1.35rem] md:text-[1.5rem]">
          {section.title}
        </h2>
      </div>

      <div className="relative mt-8 md:mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-1 w-12 bg-linear-to-r from-white to-transparent sm:w-16 md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-1 w-12 bg-linear-to-l from-white to-transparent sm:w-16 md:w-24" />

        <div className="partners-marquee flex w-max gap-3 px-4 sm:gap-4 md:gap-5">
          {loopItems.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex h-28 w-40 shrink-0 items-center justify-center rounded-xl border border-[#141414]/10 bg-white px-4 py-3 sm:h-32 sm:w-44 md:h-36 md:w-48"
            >
              <div className="relative h-full w-full">
                <MediaImage
                  themeId={data.themeId}
                  src={item.image}
                  alt={item.alt || item.name}
                  fill
                  className="object-contain"
                  sizes="192px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
