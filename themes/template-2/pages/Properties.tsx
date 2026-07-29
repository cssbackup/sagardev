"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaCar,
  FaExpand,
  FaRulerCombined,
} from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
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

function PropertyCard({
  item,
  theme,
}: {
  item: PropertyListing;
  theme: ThemeId;
}) {
  const href =
    item.button?.href === "#"
      ? "/contact"
      : item.button?.href || "/contact";
  const features = item.features?.slice(0, 3) ?? [];

  return (
    <article className="group">
      <Link href={withTheme(href, theme)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ed]">
          <MediaImage
            themeId={theme}
            src={item.image}
            alt={item.alt || item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {item.category && (
            <span className="absolute left-0 top-0 bg-[var(--reroom-accent,#ff6b00)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              {item.category}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
            {item.subtitle}
          </p>
          <h2 className="mt-1.5 text-lg font-bold leading-snug">
            {item.title}
          </h2>
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

export default function Properties({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const properties = data.properties;
  const slides = properties.listings ?? [];
  const cta = properties.buttons?.[0];

  return (
    <div className="bg-white text-[#141414]">
      <section className="px-4 pt-10 md:px-8 md:pt-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <RevealBlur className="max-w-2xl">
            <Breadcrumb items={properties.breadcrumb} theme={theme} className="mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {properties.subtitle || "Properties"}
            </p>
            <h1 className="mt-2 text-[2.25rem] font-bold tracking-[-0.03em] md:text-[2.75rem]">
              {properties.sectionTitle || "Featured Properties"}
            </h1>
            <span className="mt-4 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)]" />
            {properties.description && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#141414]/55 md:text-base">
                {properties.description}
              </p>
            )}
          </RevealBlur>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          {slides.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#141414]/45">
              No properties available.
            </p>
          ) : (
            <Stagger className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {slides.map((slide, i) => (
                <StaggerItem key={`${slide.title}-${i}`}>
                  <PropertyCard item={slide} theme={theme} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {cta && (
            <div className="mt-14 flex justify-center">
              <Link
                href={withTheme(cta.href || "/contact", theme)}
                className="inline-flex items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-8 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {cta.label}
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
