"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/themes/template-1/components/Pagination";
import { withTheme } from "@/lib/theme";
import { slugify } from "@/lib/slugs";
import type { PropertyListing, ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

const ITEMS_PER_PAGE = 9;
const THEME = "template-1" as const;

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80";

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
] as const;

function parseMoney(value: string): number | null {
  const normalized = value.toLowerCase().replace(/,/g, "").trim();
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) return null;
  if (/\b(cr|crore)\b/.test(normalized)) return amount * 10_000_000;
  if (/\b(lakh|lac)\b/.test(normalized)) return amount * 100_000;
  return amount;
}

function featureValue(item: PropertyListing, label: string) {
  const hit = item.features?.find((f) =>
    f.label.toLowerCase().includes(label.toLowerCase())
  );
  return hit?.value || "";
}

function isForSale(item: PropertyListing) {
  return (item.category || "").toLowerCase().includes("sale");
}

function PropertyCard({
  property,
  theme,
}: {
  property: PropertyListing;
  theme: ThemeId;
}) {
  const detailHref = withTheme(
    `/properties/${property.slug || slugify(property.title)}`,
    theme
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]">
      <Link href={detailHref} className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          themeId={theme}
          src={property.image}
          alt={property.alt || property.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        {property.propertyType && (
          <span className="absolute right-3 top-3 rounded-full bg-[#141414]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {property.propertyType}
          </span>
        )}
        {property.statusText && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#141414]/85 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {property.statusText}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c44536]">
          {property.subtitle}
        </p>
        <Link href={detailHref}>
          <h3 className="mt-1.5 text-base font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
            {property.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-[#141414]/60">
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

export default function BuyPage({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const listings = useMemo(
    () => (data.properties.listings ?? []).filter(isForSale),
    [data.properties.listings]
  );

  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["value"]>(
    "default"
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [sortBy]);

  const filtered = useMemo(() => {
    const items = [...listings].sort((a, b) => {
      if (sortBy === "price-asc") {
        return (parseMoney(a.price) ?? 0) - (parseMoney(b.price) ?? 0);
      }
      if (sortBy === "price-desc") {
        return (parseMoney(b.price) ?? 0) - (parseMoney(a.price) ?? 0);
      }
      return 0;
    });
    return items;
  }, [listings, sortBy]);

  const featured = listings[0];
  const recent = listings.slice(0, 4);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Buy Property", href: "/buy" },
  ];

  return (
    <div className="bg-[#f7f7f7]">
      <section className="relative isolate flex min-h-[240px] items-center justify-center overflow-hidden sm:min-h-[260px] md:min-h-[280px]">
        <MediaImage
          themeId={theme}
          src={BANNER_IMAGE}
          alt="Buy property across Delhi NCR"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#141414]/55" />
        <div className="relative z-1 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-14 text-center sm:py-16 md:py-16">
          <Breadcrumb items={breadcrumb} theme={theme} variant="light" />
          <h1 className="mt-1 text-[2.4rem] font-semibold tracking-[-0.03em] text-white sm:mt-1 sm:text-[3rem] md:text-[3.5rem]">
            Buy Property
          </h1>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            {featured && (
              <div className="overflow-hidden rounded-2xl border border-[#141414]/8 bg-white shadow-[0_8px_24px_rgba(20,20,20,0.04)]">
                <p className="px-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#141414]">
                  Featured Property
                </p>
                <Link
                  href={withTheme(
                    `/properties/${featured.slug || slugify(featured.title)}`,
                    THEME
                  )}
                  className="group mt-3 block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaImage
                      themeId={theme}
                      src={featured.image}
                      alt={featured.alt || featured.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="300px"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#141414]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                      For Sale
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-base font-semibold text-[#c44536]">
                      {featured.price}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-[#141414]">
                      {featured.title}
                    </h3>
                    {featured.location && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#141414]/55">
                        <FaMapMarkerAlt className="text-[10px]" aria-hidden />
                        {featured.location}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}

            {recent.length > 0 && (
              <div className="rounded-2xl border border-[#141414]/8 bg-white p-4 shadow-[0_8px_24px_rgba(20,20,20,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#141414]">
                  Recent Property
                </p>
                <ul className="mt-4 space-y-4">
                  {recent.map((item) => (
                    <li key={item.slug || item.title}>
                      <Link
                        href={withTheme(
                          `/properties/${item.slug || slugify(item.title)}`,
                          THEME
                        )}
                        className="group flex gap-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f3efe8]">
                          <MediaImage
                            themeId={theme}
                            src={item.image}
                            alt={item.alt || item.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#141414] transition group-hover:text-[#c44536]">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-[#c44536]">
                            {item.price}
                          </p>
                          {featureValue(item, "Area") && (
                            <p className="mt-0.5 text-[11px] text-[#141414]/50">
                              {featureValue(item, "Area")}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#141414]/8 bg-white px-4 py-3">
              <p className="text-xs font-medium text-[#141414]/50">
                {filtered.length} properties for sale
              </p>

              <label className="flex items-center gap-2 text-xs font-medium text-[#141414]/55">
                Sort By:
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as (typeof SORT_OPTIONS)[number]["value"]
                    )
                  }
                  className="bg-transparent text-sm font-semibold text-[#c44536] outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {paged.length === 0 ? (
              <div className="rounded-2xl border border-[#141414]/8 bg-white px-6 py-16 text-center">
                <p className="text-sm text-[#141414]/60">
                  No properties available right now.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {paged.map((property) => (
                    <PropertyCard
                      key={property.slug || property.title}
                      property={property}
                      theme={theme}
                    />
                  ))}
                </div>

                <Pagination
                  page={Math.min(page, totalPages)}
                  totalPages={totalPages}
                  onChange={(next) => {
                    setPage(next);
                    window.scrollTo({ top: 360, behavior: "smooth" });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
