"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { PropertyListing, ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

function featureValue(item: PropertyListing, keys: string[]) {
  const hit = item.features?.find((f) =>
    keys.some((k) => f.label.toLowerCase().includes(k))
  );
  return hit?.value;
}

function PropertyCard({ item }: { item: PropertyListing }) {
  const beds = featureValue(item, ["bed"]);
  const baths = featureValue(item, ["bath"]);
  const area = featureValue(item, ["area", "sq"]);
  const href =
    item.button?.href === "#"
      ? "/properties"
      : item.button?.href || item.link || "/properties";

  const specs = [
    beds ? `${beds} BD` : null,
    baths ? `${baths} BA` : null,
    area ? `${area.replace(/\s*sq\.?ft\.?/i, "").trim()} SF` : null,
  ].filter(Boolean);

  return (
    <Link
      href={withTheme(href, THEME)}
      className="group relative block h-full overflow-hidden rounded-lg"
    >
      <MediaImage
        src={item.image}
        alt={item.alt || item.title}
        fill
        className="object-cover transition duration-700 ease-out group-hover:scale-110"
        sizes="280px"
        themeId={THEME}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/55 via-transparent to-transparent transition duration-500 md:from-[#0b1f33]/25 md:group-hover:from-[#0b1f33]/80 md:group-hover:via-[#0b1f33]/35" />

      <div className="absolute inset-x-0 bottom-0 translate-y-0 opacity-100 transition duration-500 ease-out md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <div className="px-4 pb-3 pt-12">
          <h3 className="t3-serif text-base font-bold text-white md:text-lg">
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-bold text-white">{item.price}</p>
          {specs.length > 0 && (
            <p className="mt-1.5 text-[11px] font-medium tracking-wide text-white/85">
              {specs.join(" | ")}
            </p>
          )}
        </div>

        <div className="bg-[var(--snifty-navy,#0b1f33)] px-4 py-3">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--snifty-red,#e11d2e)] px-3 py-2 text-xs font-bold text-white transition group-hover:brightness-110">
            {item.button?.label || "View Details"}
            <FaChevronRight className="text-[10px]" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

function matchesCategory(item: PropertyListing, filter: string) {
  const cat = (item.category || "").trim().toLowerCase();
  const target = filter.trim().toLowerCase();
  if (!cat) return false;
  if (cat === target) return true;
  if (target === "for buy" && cat === "for sale") return true;
  if (target === "for sell" && cat === "for sale") return true;
  return false;
}

export default function Properties({ data }: { data: ResolvedSiteData }) {
  const { properties } = data;
  const slides = properties.listings ?? [];
  const [filter, setFilter] = useState("All");
  const scroller = useRef<HTMLDivElement>(null);

  const tabs = useMemo(() => {
    const cats = Array.from(
      new Set(
        slides
          .map((s) => s.category?.trim())
          .filter((c): c is string => Boolean(c))
      )
    );
    return ["All", ...cats];
  }, [slides]);

  const filtered = useMemo(() => {
    if (filter === "All") return slides;
    return slides.filter((s) => matchesCategory(s, filter));
  }, [filter, slides]);

  function scroll(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 16 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
            {properties.subtitle || properties.sectionTitle}
          </p>
          <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl lg:text-[2.1rem]">
            {properties.sectionTitle || properties.title}
          </h2>
        </RevealBlur>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === tab
                  ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                  : "bg-white text-[#5b6572] hover:text-[#0b1f33]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#5b6572]">
              No properties found for “{filter}”.
            </p>
          ) : (
            <>
              <div
                key={filter}
                ref={scroller}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {filtered.map((item) => (
                  <div
                    key={`${filter}-${item.title}`}
                    data-slide
                    className="h-[340px] w-[78vw] max-w-[260px] shrink-0 snap-start sm:w-[240px] md:h-[360px] md:w-[250px]"
                  >
                    <PropertyCard item={item} />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Previous properties"
                  onClick={() => scroll(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.28)] transition hover:bg-[var(--snifty-red,#e11d2e)]"
                >
                  <FaChevronLeft className="text-sm" />
                </button>
                <button
                  type="button"
                  aria-label="Next properties"
                  onClick={() => scroll(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.28)] transition hover:bg-[var(--snifty-red,#e11d2e)]"
                >
                  <FaChevronRight className="text-sm" />
                </button>
                <Link
                  href={withTheme("/properties", THEME)}
                  className="ml-1 inline-flex items-center gap-2 text-sm font-bold text-[var(--snifty-navy,#0b1f33)] underline underline-offset-4 transition hover:text-[var(--snifty-red,#e11d2e)]"
                >
                  See all properties
                  <FaChevronRight className="text-[10px]" aria-hidden />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
