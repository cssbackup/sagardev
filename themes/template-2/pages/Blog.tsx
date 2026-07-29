"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
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

  return (
    <div className="bg-white text-[#141414]">
      <section className="border-b border-[#141414]/08 px-4 py-10 md:px-8 md:py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Breadcrumb items={page.breadcrumb} theme={theme} className="mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.pretitle || data.gallery.pretitle || "Blog"}
            </p>
            <h1 className="mt-3 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] md:text-[2.85rem]">
              {page.title || data.gallery.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#141414]/55 md:text-base">
              {page.desc || data.gallery.desc}
            </p>
          </div>

          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search articles</span>
            <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#141414]/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={page.searchPlaceholder || "Search articles…"}
              className="w-full border border-[#141414]/12 bg-[#faf9f7] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--reroom-accent,#ff6b00)]"
            />
          </label>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#141414]/50">
              {page.emptyMessage ||
                `No articles match “${query}”. Try another search.`}
            </p>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <article key={`${item.title}-${i}`} className="group">
                  <Link
                    href={withTheme(item.href || "/blog", theme)}
                    className="block"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#f3f1ed]">
                      <MediaImage
                        src={item.image}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        themeId={theme}
                      />
                    </div>
                    <div className="mt-4">
                      {item.date && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
                          {item.date}
                        </p>
                      )}
                      <h2 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-[var(--reroom-accent,#ff6b00)]">
                        {item.title}
                      </h2>
                      {item.alt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/50">
                          {item.alt}
                        </p>
                      )}
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold">
                        {readLabel}
                        <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-[#141414]/10 bg-[#faf9f7] px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {page.ctaPretitle || "Next step"}
              </p>
              <h3 className="mt-2 text-[1.35rem] font-bold tracking-[-0.02em] md:text-[1.6rem]">
                {page.ctaTitle || page.desc2 || "Have a project in mind?"}
              </h3>
              {page.ctaDesc && (
                <p className="mt-2 text-sm text-[#141414]/55">{page.ctaDesc}</p>
              )}
            </div>
            <Link
              href={withTheme(page.ctaButton?.href || "/contact", theme)}
              className="inline-flex shrink-0 items-center gap-2 bg-[#141414] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--reroom-accent,#ff6b00)]"
            >
              {page.ctaButton?.label || "Contact us"}
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
