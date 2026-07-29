"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaCar,
  FaExpand,
  FaRulerCombined,
} from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { PropertyListing, ResolvedSiteData, ThemeId } from "@/lib/types";

function featureIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("bed")) return FaBed;
  if (key.includes("bath")) return FaBath;
  if (key.includes("park")) return FaCar;
  if (key.includes("area") || key.includes("sq")) return FaRulerCombined;
  return FaExpand;
}

export default function Properties({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const { properties } = data;
  const slides = properties.listings ?? [];
  const cta = properties.buttons?.[0];
  const listRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(slides.map((s) => s.category).filter(Boolean) as string[])
    );
    return ["All", ...cats];
  }, [slides]);

  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(0);

  const filtered =
    filter === "All"
      ? slides
      : slides.filter((s) => s.category === filter);

  const featured: PropertyListing | undefined =
    filtered[Math.min(active, Math.max(filtered.length - 1, 0))] ?? filtered[0];

  const contactHref = withTheme(cta?.href || "/contact", theme);

  // Nested overflow-y fails under parent overflow-x-clip — capture wheel on the list
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!el) return;
      const canScroll = el.scrollHeight > el.clientHeight;
      if (!canScroll) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const delta = e.deltaY;
      const atTop = scrollTop <= 0 && delta < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && delta > 0;

      if (atTop || atBottom) return;

      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += delta;
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [filtered.length]);

  return (
    <div className="bg-white text-[#0b1f33]">
     <section className="bg-[var(--snifty-navy,#0b1f33)] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
  <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
    <RevealBlur className="max-w-2xl flex flex-col items-center">
      <Breadcrumb
        items={properties.breadcrumb}
        theme={theme}
        variant="light"
        className="mb-6"
      />
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
        {properties.subtitle || "Properties"}
      </p>
      <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] md:text-[2.75rem] lg:text-[3.1rem]">
        {properties.sectionTitle || "Featured Properties"}
      </h1>
      {properties.description && (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          {properties.description}
        </p>
      )}
      <p className="mt-6 text-sm text-white/50">
        <span className="font-bold text-[var(--snifty-red,#e11d2e)]">
          {slides.length}
        </span>{" "}
        homes ready to explore
      </p>
    </RevealBlur>
  </div>
</section>

      <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {categories.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat);
                    setActive(0);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === cat
                      ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                      : "bg-white text-[#0b1f33] ring-1 ring-[#e8ecf1] hover:ring-[var(--snifty-red,#e11d2e)]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#5b6572]">
              No properties available.
            </p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
              {featured && (
                <RevealUp key={`${featured.title}-${active}`}>
                  <article className="overflow-hidden rounded-2xl border border-[#e8ecf1] bg-white shadow-[0_16px_40px_rgba(11,31,51,0.06)]">
                    <div className="relative aspect-[16/11] bg-[#eef1f5] md:aspect-[5/3]">
                      <MediaImage
                        src={featured.image}
                        alt={featured.alt || featured.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        themeId={theme}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/85 via-transparent to-transparent" />
                      {featured.category && (
                        <span className="absolute left-4 top-4 rounded-md bg-[var(--snifty-red,#e11d2e)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          {featured.category}
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                          {featured.subtitle}
                        </p>
                        <h2 className="t3-serif mt-1 text-2xl font-bold text-white md:text-[1.85rem]">
                          {featured.title}
                        </h2>
                        <p className="mt-2 text-lg font-bold text-white">
                          {featured.price}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 md:p-7">
                      {featured.description && (
                        <p className="text-sm leading-relaxed text-[#5b6572]">
                          {featured.description}
                        </p>
                      )}
                      {(featured.features?.length ?? 0) > 0 && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {featured.features.slice(0, 4).map((f) => {
                            const Icon = featureIcon(f.label);
                            return (
                              <span
                                key={f.label}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#f7f8fa] px-3 py-2 text-xs font-semibold text-[#0b1f33]"
                              >
                                <Icon className="text-[var(--snifty-red,#e11d2e)]" />
                                {f.value || f.label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <Link
                        href={withTheme(
                          featured.button?.href === "#"
                            ? "/contact"
                            : featured.button?.href || "/contact",
                          theme
                        )}
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-navy,#0b1f33)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
                      >
                        {featured.button?.label || "View details"}
                        <FaArrowRight className="text-[11px]" />
                      </Link>
                    </div>
                  </article>
                </RevealUp>
              )}

              <div
                ref={listRef}
                tabIndex={0}
                className="flex max-h-[min(640px,70vh)] flex-col gap-3 overflow-y-auto overscroll-contain scroll-smooth rounded-xl border border-[#e8ecf1] bg-white/60 p-3 [-webkit-overflow-scrolling:touch] focus:outline-none focus:ring-2 focus:ring-[var(--snifty-red,#e11d2e)]/30 lg:sticky lg:top-6"
                style={{ touchAction: "pan-y" }}
              >
                {filtered.map((item, i) => {
                  const selected =
                    featured?.title === item.title &&
                    featured?.image === item.image;
                  return (
                    <button
                      key={`${item.title}-${i}`}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`flex shrink-0 gap-3 rounded-xl border p-3 text-left transition ${
                        selected
                          ? "border-[var(--snifty-red,#e11d2e)] bg-white shadow-[0_10px_24px_rgba(225,29,46,0.1)]"
                          : "border-[#e8ecf1] bg-white hover:bg-[#f7f8fa]"
                      }`}
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#eef1f5]">
                        <MediaImage
                          src={item.image}
                          alt={item.alt || item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                          themeId={theme}
                        />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--snifty-red,#e11d2e)]">
                          {item.subtitle}
                        </p>
                        <p className="t3-serif mt-1 line-clamp-1 text-sm font-bold text-[#0b1f33]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0b1f33]/70">
                          {item.price}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {slides.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                Browse all
              </p>
              <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                Full listing
              </h2>
            </RevealBlur>

            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {slides.map((item, i) => (
                <StaggerItem key={`grid-${item.title}-${i}`}>
                  <Link
                    href={withTheme(
                      item.button?.href === "#"
                        ? "/contact"
                        : item.button?.href || "/contact",
                      theme
                    )}
                    className="group block overflow-hidden rounded-xl border border-[#eef0f3] bg-white transition hover:-translate-y-1 hover:border-[var(--snifty-red,#e11d2e)]/30 hover:shadow-[0_14px_36px_rgba(225,29,46,0.1)]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#eef1f5]">
                      <MediaImage
                        src={item.image}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        themeId={theme}
                      />
                      {item.category && (
                        <span className="absolute left-3 top-3 rounded-md bg-[var(--snifty-navy,#0b1f33)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--snifty-red,#e11d2e)]">
                        {item.subtitle}
                      </p>
                      <h3 className="t3-serif mt-1 text-lg font-bold text-[#0b1f33]">
                        {item.title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-bold">{item.price}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--snifty-red,#e11d2e)]">
                          View
                          <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            {cta && (
              <div className="mt-12 flex justify-center">
                <Link
                  href={contactHref}
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-8 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  {cta.label}
                  <FaArrowRight className="text-[11px]" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
