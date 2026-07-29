"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaLocationDot,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { CityItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

export default function Cities({ data }: { data: ResolvedSiteData }) {
  const { citiesWeServe } = data;
  const cities = citiesWeServe.cities;
  const [activeName, setActiveName] = useState(cities[0]?.name ?? "");

  const active: CityItem | undefined = useMemo(
    () => cities.find((c) => c.name === activeName) ?? cities[0],
    [activeName, cities]
  );

  const cta = citiesWeServe.button;

  if (!active) return null;

  return (
    <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
            {citiesWeServe.pretitle}
          </p>
          <h2 className="t3-serif mt-3 text-2xl font-bold leading-snug text-[#0b1f33] md:text-3xl lg:text-[2.15rem]">
            {citiesWeServe.title}
          </h2>
          {citiesWeServe.desc && (
            <p className="mt-3 text-sm leading-relaxed text-[#5b6572] md:text-base">
              {citiesWeServe.desc}
            </p>
          )}
        </RevealBlur>

        {/* City tabs */}
        <RevealUp className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:mt-10">
          {cities.map((city) => {
            const isActive = city.name === active.name;
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => setActiveName(city.name)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition md:px-5 ${
                  isActive
                    ? "bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.2)]"
                    : "bg-[#eef1f5] text-[#6b7a8d] hover:bg-[#e4e8ee] hover:text-[#0b1f33]"
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </RevealUp>

        {/* Active city detail — animate from below on tab change */}
        <RevealUp key={active.name} className="mt-10 md:mt-12" delay={0.05}>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              {(active.region || active.name) && (
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                  <FaLocationDot className="text-sm" aria-hidden />
                  {active.region || active.name}
                </p>
              )}

              <h3 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl lg:text-[2.35rem]">
                {active.name}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5b6572] md:text-[15px]">
                {active.desc || citiesWeServe.desc}
              </p>

              <div className="mt-7 flex items-stretch gap-6 border-t border-[#e8ecf1] pt-6">
                <div>
                  <p className="text-lg font-bold text-[#0b1f33]">
                    {active.listingsLabel?.replace(/\D/g, "") || "48"}+
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a93a0]">
                    Listings
                  </p>
                </div>
                <div className="w-px bg-[#e0e5eb]" aria-hidden />
                <div>
                  <p className="text-lg font-bold text-[#0b1f33]">
                    {active.region || "Local"}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a93a0]">
                    Region
                  </p>
                </div>
              </div>

              <Link
                href={withTheme(active.href || cta?.href || "/properties", THEME)}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[var(--snifty-navy,#0b1f33)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {cta?.label || "View Project Details"}
                <FaArrowRight className="text-[11px]" aria-hidden />
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:aspect-[5/4] lg:min-h-[380px]">
              <MediaImage
                src={active.image}
                alt={active.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                themeId={THEME}
              />
              <Link
                href={withTheme(active.href || cta?.href || "/properties", THEME)}
                aria-label={`Open ${active.name}`}
                className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-[var(--snifty-red,#e11d2e)]"
              >
                <FaArrowUpRightFromSquare className="text-sm" />
              </Link>
            </div>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}
