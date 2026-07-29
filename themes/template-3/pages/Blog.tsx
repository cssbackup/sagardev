"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Blog({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.customPage;
  const items = data.gallery.galleryItems;
  const [query, setQuery] = useState("");
  const readLabel = page.readMoreLabel || "Read more";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.alt?.toLowerCase().includes(q) ||
        item.date?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const ctaHref = withTheme(page.ctaButton?.href || "/contact", theme);

  return (
    <div className="bg-white text-[#0b1f33]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--snifty-navy,#0b1f33)]">
        {page.sideImage && (
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <MediaImage
              src={page.sideImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              themeId={theme}
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[var(--snifty-navy,#0b1f33)]/80" />

        <div className="relative mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <RevealBlur className="mx-auto max-w-3xl text-center">
            <Breadcrumb
              items={page.breadcrumb}
              theme={theme}
              variant="light"
              className="mb-6 flex justify-center"
            />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
              {page.pretitle || data.gallery.pretitle || "Blog"}
            </p>
            <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] text-white md:text-[2.75rem] lg:text-[3.1rem]">
              {page.title || data.gallery.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc || data.gallery.desc}
            </p>

            <label className="relative mx-auto mt-8 block w-full max-w-md text-left">
              <span className="sr-only">Search articles</span>
              <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#0b1f33]/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={page.searchPlaceholder || "Search articles…"}
                className="w-full rounded-md border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-[#0b1f33] outline-none ring-2 ring-transparent transition focus:ring-[var(--snifty-red,#e11d2e)]"
              />
            </label>
          </RevealBlur>
        </div>
      </section>

      {/* Magazine layout */}
      <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#5b6572]">
              {page.emptyMessage ||
                `No articles match “${query}”. Try another search.`}
            </p>
          ) : (
            <>
              {featured && (
                <RevealBlur>
                  <Link
                    href={withTheme(featured.href || "/blog", theme)}
                    className="group grid overflow-hidden rounded-2xl border border-[#eef0f3] bg-[#f7f8fa] transition hover:border-[var(--snifty-red,#e11d2e)]/30 hover:shadow-[0_16px_40px_rgba(225,29,46,0.1)] lg:grid-cols-2"
                  >
                    <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[340px]">
                      <MediaImage
                        src={featured.image}
                        alt={featured.alt || featured.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        themeId={theme}
                        priority
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-[var(--snifty-red,#e11d2e)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                        {page.featuredLabel || "Featured"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                      {featured.date && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                          {featured.date}
                        </p>
                      )}
                      <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-[1.85rem]">
                        {featured.title}
                      </h2>
                      {featured.alt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5b6572]">
                          {featured.alt}
                        </p>
                      )}
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--snifty-red,#e11d2e)] transition group-hover:gap-3">
                        {readLabel}
                        <FaArrowRight className="text-[11px]" />
                      </span>
                    </div>
                  </Link>
                </RevealBlur>
              )}

              {rest.length > 0 && (
                <>
                  <div className="mb-6 mt-12 flex items-end justify-between gap-4">
                    <h3 className="t3-serif text-xl font-bold text-[#0b1f33] md:text-2xl">
                      {page.listLabel || "All articles"}
                    </h3>
                    <p className="text-sm text-[#5b6572]">
                      {rest.length} more
                    </p>
                  </div>

                  <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((item, i) => (
                      <StaggerItem key={`${item.title}-${i}`}>
                        <Link
                          href={withTheme(item.href || "/blog", theme)}
                          className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#eef0f3] bg-white transition hover:-translate-y-1 hover:border-[var(--snifty-red,#e11d2e)]/30 hover:shadow-[0_14px_36px_rgba(225,29,46,0.1)]"
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
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            {item.date && (
                              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--snifty-red,#e11d2e)]">
                                {item.date}
                              </p>
                            )}
                            <h3 className="t3-serif mt-2 text-lg font-bold leading-snug text-[#0b1f33]">
                              {item.title}
                            </h3>
                            {item.alt && (
                              <p className="mt-2 line-clamp-2 flex-1 text-sm text-[#5b6572]">
                                {item.alt}
                              </p>
                            )}
                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--snifty-red,#e11d2e)]">
                              {readLabel}
                              <FaArrowRight className="text-[10px]" />
                            </span>
                          </div>
                        </Link>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      {(page.ctaTitle || page.ctaButton) && (
        <section className="px-4 pb-7 md:px-8 md:pb-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--snifty-navy,#0b1f33)] px-6 py-8 text-white md:flex-row md:items-center md:px-10 md:py-10">
            <div className="max-w-xl">
              {page.ctaPretitle && (
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                  {page.ctaPretitle}
                </p>
              )}
              <h2 className="t3-serif mt-2 text-2xl font-bold md:text-3xl">
                {page.ctaTitle}
              </h2>
              {page.ctaDesc && (
                <p className="mt-3 text-sm text-white/65">{page.ctaDesc}</p>
              )}
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              {page.ctaButton?.label || "Contact us"}
              <FaArrowRight className="text-[11px]" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
