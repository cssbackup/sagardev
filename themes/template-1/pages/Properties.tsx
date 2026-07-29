"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/themes/template-1/components/Pagination";
import { withTheme } from "@/lib/theme";
import type {
  PropertyFilter,
  PropertyListing,
  ResolvedSiteData,
  ThemeId,
} from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";
import { slugify } from "@/lib/slugs";
import Link from "next/link";

const ITEMS_PER_PAGE = 8;

function parseMoney(value: string): number | null {
  const normalized = value.toLowerCase().replace(/,/g, "").trim();
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;

  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) return null;
  if (/\b(cr|crore)\b/.test(normalized)) return amount * 10_000_000;
  if (/\b(lakh|lac)\b/.test(normalized)) return amount * 100_000;
  if (/\b(k|thousand)\b/.test(normalized)) return amount * 1_000;
  return amount;
}

function listingHaystack(item: PropertyListing) {
  return `${item.title} ${item.subtitle} ${item.infoTitle} ${item.description} ${item.alt} ${item.category ?? ""} ${item.propertyType ?? ""} ${item.location ?? ""}`.toLowerCase();
}

function filterMatchesQuery(filter: PropertyFilter, query: string) {
  if (!query) return false;
  const q = query.toLowerCase().trim();
  const candidates = [filter.value, ...(filter.aliases ?? [])].map((v) =>
    v.toLowerCase()
  );
  return candidates.some((c) => c === q || c.includes(q) || q.includes(c));
}

function matchesFilter(item: PropertyListing, filter: PropertyFilter) {
  const field = filter.field || "category";
  if (filter.value === "all" || field === "all") return true;

  const raw =
    field === "propertyType"
      ? (item.propertyType || "").toLowerCase()
      : (item.category || "").toLowerCase();
  if (!raw) return false;

  const candidates = [filter.value, ...(filter.aliases ?? [])].map((v) =>
    v.toLowerCase()
  );
  return candidates.some((c) => raw === c || raw.includes(c));
}

function findFilter(
  filters: PropertyFilter[],
  predicate: (f: PropertyFilter) => boolean
): PropertyFilter | undefined {
  return filters.find(predicate);
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
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]">
      <Link href={detailHref} className="relative aspect-4/3 overflow-hidden">
        <MediaImage
          themeId={theme}
          src={property.image}
          alt={property.alt || property.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes="300px"
        />
        {property.propertyType && (
          <span className="absolute right-3 top-3 rounded-full bg-[#141414]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            {property.propertyType}
          </span>
        )}
        {property.statusText && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#141414]/85 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {property.statusText}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#c44536]">
          {property.subtitle}
        </p>
        <Link href={detailHref}>
          <h3 className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
            {property.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-[#141414]/65 line-clamp-2">
          {property.description}
        </p>

        <div className="mt-3 flex items-end justify-between gap-3 border-t border-[#141414]/8 pt-3">
          <p className="text-[0.95rem] font-semibold text-[#141414]">{property.price}</p>
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

export default function PropertiesContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const properties = data.properties;
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "";
  const queryIntent = (searchParams.get("intent") || "").toLowerCase();
  const queryText = (searchParams.get("q") || "").trim().toLowerCase();
  const queryType = (searchParams.get("type") || "").trim();
  const queryCity = searchParams.get("city") || "";
  const queryBudget = searchParams.get("budget") || "";
  const maxBudget = useMemo(() => parseMoney(queryBudget), [queryBudget]);

  const listings = properties.listings ?? [];
  const filterChips = properties.filters?.length
    ? properties.filters
    : ([
        { label: "All properties", value: "all", field: "all" },
      ] as PropertyFilter[]);
  const intentMap = properties.intentMap ?? {};

  const cityFilters = useMemo(() => {
    const fromListings = listings
      .map((item) => (item.location || "").trim())
      .filter(Boolean);
    const fromCities = (data.citiesWeServe.cities || [])
      .map((city) => city.region)
      .filter(Boolean) as string[];
    return ["All", ...Array.from(new Set([...fromCities, ...fromListings]))];
  }, [listings, data.citiesWeServe.cities]);

  const resolvedFilter = useMemo(() => {
    if (queryCategory) {
      const byCategory = findFilter(
        filterChips,
        (f) => f.value === queryCategory || filterMatchesQuery(f, queryCategory)
      );
      if (byCategory) return byCategory.value;
    }

    if (queryIntent && intentMap[queryIntent]) {
      const mapped = intentMap[queryIntent];
      const byIntent = findFilter(filterChips, (f) => f.value === mapped);
      if (byIntent) return byIntent.value;
    }

    if (queryType) {
      const byType = findFilter(
        filterChips,
        (f) => f.field === "propertyType" && filterMatchesQuery(f, queryType)
      );
      if (byType) return byType.value;
    }

    return filterChips[0]?.value ?? "all";
  }, [filterChips, intentMap, queryCategory, queryIntent, queryType]);

  const resolvedCity = cityFilters.includes(queryCity) ? queryCity : "All";

  const [activeFilter, setActiveFilter] = useState(resolvedFilter);
  const [cityFilter, setCityFilter] = useState(resolvedCity);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setActiveFilter(resolvedFilter);
  }, [resolvedFilter]);

  useEffect(() => {
    setCityFilter(resolvedCity);
  }, [resolvedCity]);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, cityFilter, maxBudget, queryText]);

  const activeFilterDef = useMemo(
    () =>
      findFilter(filterChips, (f) => f.value === activeFilter) ??
      filterChips[0] ??
      ({ label: "All", value: "all", field: "all" } as PropertyFilter),
    [activeFilter, filterChips]
  );

  const filteredListings = useMemo(() => {
    const intentValue = queryIntent ? intentMap[queryIntent] : "";
    const intentFilter = intentValue
      ? findFilter(filterChips, (f) => f.value === intentValue)
      : undefined;
    const typeFilter = queryType
      ? findFilter(
          filterChips,
          (f) => f.field === "propertyType" && filterMatchesQuery(f, queryType)
        )
      : undefined;

    return listings.filter((item) => {
      if (!matchesFilter(item, activeFilterDef)) return false;

      if (
        intentFilter &&
        activeFilterDef.field !== "category" &&
        activeFilterDef.field !== "all" &&
        !matchesFilter(item, intentFilter)
      ) {
        return false;
      }

      if (
        typeFilter &&
        activeFilterDef.field !== "propertyType" &&
        !matchesFilter(item, typeFilter)
      ) {
        return false;
      }

      if (
        queryType &&
        !(item.propertyType || "")
          .toLowerCase()
          .includes(queryType.toLowerCase())
      ) {
        return false;
      }

      if (
        cityFilter !== "All" &&
        !(item.location || "").toLowerCase().includes(cityFilter.toLowerCase())
      ) {
        return false;
      }

      if (queryText && !listingHaystack(item).includes(queryText)) return false;

      if (maxBudget !== null) {
        const listingPrice = parseMoney(item.price);
        if (listingPrice !== null && listingPrice > maxBudget) return false;
      }

      return true;
    });
  }, [
    activeFilterDef,
    cityFilter,
    filterChips,
    intentMap,
    listings,
    maxBudget,
    queryIntent,
    queryText,
    queryType,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / ITEMS_PER_PAGE));
  const pagedListings = filteredListings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function goToPage(nextPage: number) {
    setPage(nextPage);
    document
      .getElementById("listings")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white">
      <section className="px-4 pb-4 pt-6 md:px-8 md:pt-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Breadcrumb items={properties.breadcrumb} theme={theme} />
          </div>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141414] sm:text-[2.35rem] md:text-[3rem]">
            Featured Properties
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
            Browse verified homes for sale and rent across Delhi NCR.
          </p>
        </div>
      </section>

      <section
        id="listings"
        className="scroll-mt-24 px-4 pb-10 pt-4 md:px-8 md:pb-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="scrollbar-none flex w-full items-center gap-2 overflow-x-auto py-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filterChips.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setActiveFilter(chip.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === chip.value
                    ? "bg-[#141414] text-white"
                    : "border border-[#141414]/10 text-[#141414]/70 hover:text-[#141414]"
                }`}
              >
                {chip.label}
              </button>
            ))}

            {cityFilters.length > 1 && (
              <>
                <span className="h-6 w-px shrink-0 bg-[#141414]/12" aria-hidden />
                <label className="flex shrink-0 items-center gap-2 rounded-full border border-[#141414]/10 px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c44536]">
                    City
                  </span>
                  <select
                    value={cityFilter}
                    onChange={(event) => setCityFilter(event.target.value)}
                    className="bg-transparent text-sm font-medium text-[#141414] outline-none"
                    aria-label="Filter properties by city"
                  >
                    {cityFilters.map((city) => (
                      <option key={city} value={city}>
                        {city === "All" ? "All cities" : city}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}

            <span className="ml-auto shrink-0 px-2 text-xs font-medium text-[#141414]/50">
              {filteredListings.length} results
            </span>
          </div>

          {filteredListings.length === 0 ? (
            <p className="mt-8 text-center text-sm text-[#141414]/60">
              No properties match this filter right now.
            </p>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pagedListings.map((property) => (
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
                onChange={goToPage}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
