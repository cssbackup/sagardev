"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import { slugify } from "@/lib/slugs";
import type { LatestProjectItem, ResolvedSiteData } from "@/lib/types";
import { FaArrowRight, FaBuilding } from "react-icons/fa";

const THEME = "template-1" as const;
const MAX_CARDS = 4;

function projectDetailPath(
  name: string,
  projects: LatestProjectItem[],
  fallbackHref?: string
) {
  const slug = slugify(name);
  const exact = projects.find(
    (p) =>
      (p.slug || "") === slug ||
      slugify(p.title) === slug ||
      p.title.toLowerCase() === name.toLowerCase()
  );
  if (exact) return `/projects/${exact.slug || slugify(exact.title)}`;

  const soft = projects.find((p) => {
    const ps = slugify(p.title);
    return (
      ps.includes(slug) ||
      slug.includes(ps.replace(/-handover$/, "")) ||
      (p.slug || "").includes(slug) ||
      slug.includes(p.slug || "")
    );
  });
  if (soft) return `/projects/${soft.slug || slugify(soft.title)}`;

  if (fallbackHref?.startsWith("/projects/")) return fallbackHref;
  return `/projects/${slug}`;
}

export default function CitiesWeServe({ data }: { data: ResolvedSiteData }) {
  const section = data.citiesWeServe;
  const cities = section.cities;
  const projects = data.latestProjects.projectItems;
  const ctaHref = section.button ? withTheme(section.button.href, THEME) : null;
  const ctaLabel = section.button?.label;

  const filters = useMemo(() => {
    const fromSection = (section.categories || []).filter(Boolean);
    if (fromSection.length > 0) {
      return fromSection[0].toLowerCase() === "all"
        ? fromSection
        : ["All", ...fromSection];
    }
    const fromItems = Array.from(
      new Set(cities.map((c) => c.category).filter(Boolean) as string[])
    );
    return fromItems.length ? ["All", ...fromItems] : ["All"];
  }, [section.categories, cities]);

  const [activeFilter, setActiveFilter] = useState(filters[0] || "All");

  const filtered = useMemo(() => {
    return cities
      .filter((city) => {
        if (activeFilter === "All") return true;
        return (city.category || city.listingsLabel || "").toLowerCase() ===
          activeFilter.toLowerCase();
      })
      .slice(0, MAX_CARDS);
  }, [cities, activeFilter]);

  if (cities.length === 0) return null;

  return (
    <section className="bg-white py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {section.pretitle}
          </p>
          <h2 className="mt-1 text-[1.75rem] font-semibold leading-tight text-[#141414] sm:text-[2rem] md:text-[2.5rem]">
            {section.title}
          </h2>
          {section.desc && (
            <p className="mt-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {section.desc}
            </p>
          )}
        </div>

        {filters.length > 0 && (
          <div className="scrollbar-none mt-6 flex w-full max-w-full justify-start gap-2 overflow-x-auto pb-1 md:mt-8 md:justify-center [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-[#141414] text-white"
                    : "text-[#141414] hover:bg-[#141414]/5"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 md:mt-10">
          {filtered.length === 0 ? (
            null
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
              {filtered.map((city) => {
                const detailHref = withTheme(
                  projectDetailPath(city.name, projects, city.href),
                  THEME
                );
                const category = city.category || city.listingsLabel;

                return (
                  <Link
                    key={city.name}
                    href={detailHref}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f3efe8]">
                      <MediaImage
                        themeId={data.themeId}
                        src={city.image}
                        alt={city.alt}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        {category && (
                          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/85">
                            <FaBuilding className="text-[10px]" aria-hidden />
                            {category}
                          </p>
                        )}
                        <h3 className="mt-2 text-lg font-semibold leading-snug">
                          {city.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/80 line-clamp-1">
                          {city.desc}
                        </p>
                        {city.location && (
                          <p className="mt-1.5 text-xs text-white/65">
                            {city.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          {ctaHref && ctaLabel ? (
            <Link
              href={
                activeFilter === "All"
                  ? ctaHref
                  : withTheme(
                      `/projects?category=${encodeURIComponent(activeFilter)}`,
                      THEME
                    )
              }
              className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#141414]/90"
            >
              {ctaLabel}
              <FaArrowRight className="text-[10px]" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
