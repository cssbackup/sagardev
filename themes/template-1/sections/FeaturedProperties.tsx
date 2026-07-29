"use client";

import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Carousel from "@/themes/template-1/components/Carousel";
import { withTheme } from "@/lib/theme";
import type { PropertyListing, ResolvedSiteData } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";
import { slugify } from "@/lib/slugs";

const THEME = "template-1" as const;

function FeaturedCard({
  property,
  themeId,
  priority = false,
}: {
  property: PropertyListing;
  themeId: ResolvedSiteData["themeId"];
  priority?: boolean;
}) {
  const badge = property.category ?? "Listing";
  const detailHref = withTheme(
    `/properties/${property.slug || slugify(property.title)}`,
    THEME
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]">
      <Link href={detailHref} className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          themeId={themeId}
          src={property.image}
          alt={property.alt || property.title}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 78vw, 300px"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#141414]">
          {badge}
        </span>
        {property.statusText && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#141414]/85 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {property.statusText}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#c44536]">
          {property.subtitle}
        </p>
        <Link href={detailHref}>
          <h3 className="mt-1.5 text-base font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
            {property.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-[#141414]/65 line-clamp-2">
          {property.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#141414]/8 pt-4">
          <p className="text-base font-semibold text-[#141414]">{property.price}</p>
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
          >
            View details
            <FaArrowRight className="text-[9px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProperties({ data }: { data: ResolvedSiteData }) {
  const properties = data.properties;
  const listings = properties.listings ?? [];

  if (listings.length === 0) return null;

  return (
    <section className="bg-white py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {properties.subtitle}
          </p>
          <h2 className="mt-1 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
            {properties.sectionTitle}
          </h2>
          {properties.description && (
            <p className="mt-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {properties.description}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <Carousel withNav prevLabel="Previous properties" nextLabel="Next properties">
          {listings.map((property, index) => (
            <FeaturedCard
              key={property.title}
              property={property}
              themeId={data.themeId}
              priority={index === 0}
            />
          ))}
        </Carousel>
      </div>

      <div className="mt-8 flex justify-center px-4">
        <Link
          href={withTheme("/properties", THEME)}
          className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#141414]/90"
        >
          See all properties
          <FaArrowRight className="text-[10px]" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
