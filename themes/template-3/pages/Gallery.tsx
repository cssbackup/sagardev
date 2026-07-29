"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaXmark } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import type { GalleryPageItem, ResolvedSiteData, ThemeId } from "@/lib/types";

function normalizeCategory(value: string) {
  return value.trim().toLowerCase();
}

function matchesCategory(item: GalleryPageItem, active: string) {
  const target = normalizeCategory(active);
  if (!target || target === "all") return true;
  return normalizeCategory(item.category || "") === target;
}

export default function Gallery({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.galleryPage;

  const categories = useMemo(() => {
    const fromPage = (page.categories ?? []).map((c) => c.trim()).filter(Boolean);
    const fromItems = Array.from(
      new Set(
        page.galleryItems
          .map((item) => item.category?.trim())
          .filter((c): c is string => Boolean(c))
      )
    );

    const merged = fromPage.length > 0 ? fromPage : ["All", ...fromItems];
    if (!merged.some((c) => normalizeCategory(c) === "all")) {
      return ["All", ...merged];
    }
    return merged;
  }, [page.categories, page.galleryItems]);

  const [active, setActive] = useState(categories[0] || "All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () => page.galleryItems.filter((item) => matchesCategory(item, active)),
    [page.galleryItems, active]
  );

  useEffect(() => {
    if (!categories.some((c) => normalizeCategory(c) === normalizeCategory(active))) {
      setActive(categories[0] || "All");
    }
  }, [categories, active]);

  useEffect(() => {
    setOpenIndex(null);
  }, [active]);

  const openItem: GalleryPageItem | null =
    openIndex !== null ? items[openIndex] ?? null : null;

  useEffect(() => {
    if (openIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight" && items.length > 0) {
        setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
      }
      if (e.key === "ArrowLeft" && items.length > 0) {
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + items.length) % items.length
        );
      }
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, items.length]);

  return (
    <div className="bg-white text-[#0b1f33]">
      <section className="bg-[var(--snifty-navy,#0b1f33)] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <RevealBlur className="flex max-w-2xl flex-col items-center">
            <Breadcrumb
              items={page.breadcrumb}
              theme={theme}
              variant="light"
              className="mb-6"
            />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
              {page.pretitle}
            </p>

            <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] md:text-[2.75rem] lg:text-[3.1rem]">
              {page.title}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc}
            </p>
          </RevealBlur>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive =
                normalizeCategory(cat) === normalizeCategory(active);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[var(--snifty-red,#e11d2e)] text-white shadow-md"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#5b6572]">
              No gallery items in this category.
            </p>
          ) : (
            <div
              key={active}
              className="grid auto-rows-[180px] gap-3 sm:auto-rows-[200px] sm:grid-cols-2 md:gap-4 lg:auto-rows-[220px] lg:grid-cols-4"
            >
              {items.map((item, i) => {
                const span =
                  i % 7 === 0
                    ? "sm:col-span-2 sm:row-span-2"
                    : i % 5 === 0
                      ? "lg:row-span-2"
                      : "";
                return (
                  <div
                    key={`${item.category}-${item.title}-${item.image}`}
                    className={span}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      className="group relative h-full min-h-[180px] w-full overflow-hidden rounded-xl bg-[#eef1f5] text-left"
                    >
                      <MediaImage
                        src={item.image}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 25vw"
                        themeId={theme}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/80 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        {item.category && (
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                            {item.category}
                          </p>
                        )}
                        <p className="t3-serif mt-1 text-base font-bold text-white">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {openItem && openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--snifty-navy,#0b1f33)]/92 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={openItem.title}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--snifty-red,#e11d2e)] md:right-8 md:top-8"
            onClick={() => setOpenIndex(null)}
          >
            <FaXmark />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--snifty-red,#e11d2e)] md:left-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(
                    (openIndex - 1 + items.length) % items.length
                  );
                }}
              >
                <FaArrowLeft />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--snifty-red,#e11d2e)] md:right-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex + 1) % items.length);
                }}
              >
                <FaArrowRight />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/40">
              <MediaImage
                src={openItem.image}
                alt={openItem.alt || openItem.title}
                fill
                className="object-contain"
                sizes="90vw"
                themeId={theme}
              />
            </div>
            <div className="mt-4 flex items-end justify-between gap-4 text-white">
              <div>
                {openItem.category && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                    {openItem.category}
                  </p>
                )}
                <p className="t3-serif mt-1 text-xl font-bold">{openItem.title}</p>
              </div>
              <p className="text-sm text-white/50">
                {openIndex + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
