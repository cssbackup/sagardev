"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBath,
  FaBed,
  FaCar,
  FaExpand,
  FaRulerCombined,
} from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { PropertyListing, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function featureIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("bed")) return FaBed;
  if (key.includes("bath")) return FaBath;
  if (key.includes("park")) return FaCar;
  if (key.includes("area") || key.includes("sq")) return FaRulerCombined;
  return FaExpand;
}

function PropertyCard({ item }: { item: PropertyListing }) {
  const href =
    item.button?.href === "#"
      ? "/properties"
      : item.button?.href || "/properties";
  const features = item.features?.slice(0, 3) ?? [];

  return (
    <article
      data-slide
      className="group w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[280px]"
    >
      <Link href={withTheme(href, THEME)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ed]">
          <MediaImage
            themeId={THEME}
            src={item.image}
            alt={item.alt || item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="300px"
          />
          <div className="absolute left-0 top-0 flex">
            {item.category && (
              <span className="bg-[var(--reroom-accent,#ff6b00)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {item.category}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
            {item.subtitle}
          </p>
          <h3 className="mt-1.5 text-lg font-bold leading-snug">
            {item.title}
          </h3>
          {features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {features.map((f) => {
                const Icon = featureIcon(f.label);
                return (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-1.5 text-xs text-[#141414]/55"
                  >
                    <Icon className="text-[var(--reroom-accent,#ff6b00)]" />
                    {f.value}
                  </span>
                );
              })}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-base font-bold">{item.price}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]">
              {item.button?.label || "View"}
              <FaArrowRight className="text-[10px]" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Manual snap slider — same approach as template-1 */
export default function FeaturedProperties({ data }: { data: ResolvedSiteData }) {
  const properties = data.properties;
  const listings = properties.listings ?? [];
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (listings.length === 0) return null;

  return (
    <section className="bg-white py-14 text-[#141414] md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {properties.subtitle || "Featured"}
            </p>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
              {properties.sectionTitle || "Featured Properties"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous properties"
              onClick={() => scrollBySlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next properties"
              onClick={() => scrollBySlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowRight className="text-xs" />
            </button>
            <Link
              href={withTheme("/properties", THEME)}
              className="ml-1 inline-flex items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
            >
              View all
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </RevealBlur>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {listings.map((item) => (
            <PropertyCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
