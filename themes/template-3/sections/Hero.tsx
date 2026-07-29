"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaLocationDot,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import type { BannerSlide, ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;
const SLIDE_MS = 5500;

const TABS = [
  { label: "All", value: "All" },
  { label: "For Buy", value: "For Sale" },
  { label: "For Sell", value: "For Sale" },
  { label: "For Rent", value: "For Rent" },
] as const;

export default function Hero({ data }: { data: ResolvedSiteData }) {
  const router = useRouter();
  const { banner, about, properties, citiesWeServe } = data;

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["label"]>("For Buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [category, setCategory] = useState("");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = useMemo((): BannerSlide[] => {
    const fromJson = (banner.bannerSlides ?? []).filter((s) => Boolean(s.image));
    if (fromJson.length > 0) return fromJson;

    const fallbackImage =
      banner.backgroundImage || data.template.image || about.sideImage || "";
    if (!fallbackImage) return [];

    return [
      {
        image: fallbackImage,
        alt: banner.backgroundImageTitle || banner.title || "Hero",
        title: banner.title || about.title,
        desc:
          banner.desc ||
          about.desc ||
          "Browse verified homes with clear pricing and guided site visits.",
      },
    ];
  }, [about.desc, about.sideImage, about.title, banner, data.template.image]);

  const slideCount = slides.length;
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    if (slideCount < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, slideCount]);

  useEffect(() => {
    if (index >= slideCount) setIndex(0);
  }, [index, slideCount]);

  const badge = (
    about.pretitle ||
    banner.pretitle ||
    data.topbar.text?.[0] ||
    "Find a modern home"
  ).toUpperCase();

  const cityOptions = useMemo(() => {
    const names = citiesWeServe.cities.map((c) => c.name);
    const regions = citiesWeServe.cities
      .map((c) => c.region)
      .filter(Boolean) as string[];
    return Array.from(new Set([...names, ...regions]));
  }, [citiesWeServe.cities]);

  const typeOptions = useMemo(() => {
    const fromFilters =
      properties.filters
        ?.filter((f) => f.field === "propertyType")
        .map((f) => f.label || f.value)
        .filter(Boolean) ?? [];
    if (fromFilters.length) return Array.from(new Set(fromFilters));
    const fromListings =
      properties.listings
        ?.map((s) => s.propertyType || s.subtitle)
        .filter(Boolean) ?? [];
    return Array.from(new Set(fromListings as string[]));
  }, [properties.filters, properties.listings]);

  const categoryOptions = useMemo(() => {
    const fromFilters =
      properties.filters
        ?.filter((f) => f.field === "category")
        .map((f) => f.value)
        .filter(Boolean) ?? [];
    if (fromFilters.length) return Array.from(new Set(fromFilters));
    const fromListings =
      properties.listings?.map((s) => s.category).filter(Boolean) ?? [];
    return Array.from(new Set(fromListings as string[]));
  }, [properties.filters, properties.listings]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const tab = TABS.find((t) => t.label === activeTab);
    const params = new URLSearchParams();
    params.set("theme", THEME);
    if (tab && tab.value !== "All") params.set("category", tab.value);
    if (location.trim()) params.set("q", location.trim());
    if (propertyType) params.set("type", propertyType);
    if (category) params.set("filter", category);
    router.push(`/properties?${params.toString()}`);
  }

  function goTo(next: number) {
    if (slideCount < 1) return;
    setIndex((next + slideCount) % slideCount);
  }

  return (
    <section className="relative isolate pb-10 md:pb-12 lg:pb-14">
      <div
        className="relative min-h-[520px] overflow-hidden md:min-h-[600px] lg:min-h-[680px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute inset-0">
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <div
                key={`${slide.image}-${i}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isActive}
              >
                <MediaImage
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  fill
                  priority={i === 0}
                  className={`object-cover object-[center_35%] ${isActive ? "t3-ken" : ""}`}
                  sizes="100vw"
                  themeId={THEME}
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/92 via-[#1a2332]/50 to-transparent md:via-[#1a2332]/35" />
          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#15202b]/65 to-transparent max-md:w-full max-md:from-[#15202b]/70" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 pb-40 pt-14 md:min-h-[600px] md:px-8 md:pb-44 md:pt-16 lg:min-h-[680px] lg:px-10 lg:pb-48">
          <div className="max-w-[34rem]">
            <p className="inline-block bg-[var(--snifty-red,#e11d2e)] px-3 py-[7px] text-[10px] font-bold uppercase tracking-[0.12em] text-white md:text-[11px]">
              {badge}
            </p>

            <div
              key={index}
              className="animate-[t3-hero-copy_500ms_ease-out]"
            >
              <h1 className="t3-serif mt-5 max-w-[14ch] text-[2.55rem] font-bold leading-[1.12] tracking-[-0.01em] text-white md:mt-6 md:text-[3.25rem] lg:text-[3.75rem]">
                {active?.title || banner.title}
              </h1>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
                {active?.desc || banner.desc}
              </p>
            </div>
          </div>
        </div>

        {slideCount > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 md:left-5 lg:left-8"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 md:right-5 lg:right-8"
            >
              <FaChevronRight className="text-xs" />
            </button>

            <div
              className="absolute bottom-32 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-36 lg:bottom-40"
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={i === index}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-7 bg-[var(--snifty-red,#e11d2e)]"
                      : "w-2 bg-white/55 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="relative z-20 -mt-36 px-4 pb-1 md:-mt-40 md:px-8 lg:-mt-44 lg:px-10">
        <div className="mx-auto mb-2 max-w-7xl md:mb-3">
          <div className="overflow-hidden rounded-t-[14px] rounded-b-[10px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
            <div className="flex gap-0 overflow-x-auto border-b border-[#eef0f3] px-2 sm:px-4">
              {TABS.map((tab) => {
                const isActive = tab.label === activeTab;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(tab.label)}
                    className={`relative shrink-0 px-4 py-3.5 text-[13px] font-bold tracking-wide transition sm:px-5 md:px-6 md:py-4 md:text-sm ${
                      isActive ? "text-[#1f2937]" : "text-[#6b7280] hover:text-[#1f2937]"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`absolute inset-x-4 bottom-0 h-[2.5px] bg-[var(--snifty-red,#e11d2e)] transition md:inset-x-5 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            <form
              onSubmit={onSearch}
              className="grid grid-cols-1 gap-3 p-3 sm:p-4 md:grid-cols-[1.35fr_1fr_1fr_auto] md:items-center md:gap-3 md:p-5"
            >
              <label className="relative flex min-h-[52px] items-center gap-2.5 rounded-md border border-[#e5e7eb] px-3.5 focus-within:border-[var(--snifty-red,#e11d2e)]">
                <FaLocationDot
                  className="shrink-0 text-[var(--snifty-red,#e11d2e)]"
                  aria-hidden
                />
                <input
                  type="text"
                  list="t3-hero-cities"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Type City Or Area"
                  className="w-full bg-transparent py-3 text-sm text-[#1f2937] outline-none placeholder:text-[#9ca3af]"
                />
                <datalist id="t3-hero-cities">
                  {cityOptions.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </label>

              <label className="relative flex min-h-[52px] items-center rounded-md border border-[#e5e7eb] focus-within:border-[var(--snifty-red,#e11d2e)]">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-3.5 pr-9 text-sm text-[#1f2937] outline-none"
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="pointer-events-none absolute right-3.5 text-[10px] text-[#6b7280]"
                  aria-hidden
                />
              </label>

              <label className="relative flex min-h-[52px] items-center rounded-md border border-[#e5e7eb] focus-within:border-[var(--snifty-red,#e11d2e)]">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-3.5 pr-9 text-sm text-[#1f2937] outline-none"
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="pointer-events-none absolute right-3.5 text-[10px] text-[#6b7280]"
                  aria-hidden
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-md bg-[var(--snifty-red,#e11d2e)] px-7 text-sm font-bold text-white transition hover:brightness-110 md:min-w-[140px]"
              >
                <FaMagnifyingGlass className="text-[13px]" aria-hidden />
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
