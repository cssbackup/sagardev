"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { PropertyCategoryCard, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function CategoryCard({
  item,
  index,
  fallbackHref,
}: {
  item: PropertyCategoryCard;
  index: number;
  fallbackHref: string;
}) {
  const href = item.href || fallbackHref;

  return (
    <article
      data-slide
      className="w-[75vw] max-w-[280px] shrink-0 snap-start sm:w-[260px]"
    >
      <Link
        href={withTheme(href === "#" ? "/properties" : href, THEME)}
        className="group relative block aspect-[3/4] overflow-hidden bg-[#2a2a2a]"
      >
        <MediaImage
          themeId={THEME}
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="280px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--reroom-accent,#ff6b00)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-xl font-bold tracking-[-0.02em]">
            {item.category || item.title}
          </h3>
          {item.desc && (
            <p className="mt-2 line-clamp-2 text-sm text-white/60">{item.desc}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
            Explore
            <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Manual snap slider — same approach as template-1 */
export default function PropertyCategories({ data }: { data: ResolvedSiteData }) {
  const { about, properties } = data;
  const intro = about.desc2;
  const cards = properties.categories;
  const fallbackHref = properties.buttons[0]?.href || "/properties";
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (!intro && cards.length === 0) return null;

  return (
    <section className="bg-[#141414] py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              Browse by intent
            </p>
            {intro && (
              <p className="mt-3 text-lg font-semibold leading-snug tracking-[-0.02em] md:text-xl">
                {intro}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {cards.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous categories"
                  onClick={() => scrollBySlide(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
                >
                  <FaArrowLeft className="text-xs" />
                </button>
                <button
                  type="button"
                  aria-label="Next categories"
                  onClick={() => scrollBySlide(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
                >
                  <FaArrowRight className="text-xs" />
                </button>
              </>
            )}
            <Link
              href={withTheme("/properties", THEME)}
              className="ml-1 inline-flex items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
            >
              View all homes
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </RevealBlur>
      </div>

      {cards.length > 0 && (
        <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((item, i) => (
              <CategoryCard
                key={item.title}
                item={item}
                index={i}
                fallbackHref={fallbackHref}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
