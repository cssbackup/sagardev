"use client";

import { useEffect, useCallback, useState } from "react";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

export default function Gallery({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.galleryPage;
  const items = page.galleryItems;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [galleryPage, setGalleryPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const pagedItems = items.slice(
    (galleryPage - 1) * ITEMS_PER_PAGE,
    galleryPage * ITEMS_PER_PAGE
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % items.length));
  }, [items.length]);

  function goToGalleryPage(nextPage: number) {
    setGalleryPage(nextPage);
    document
      .getElementById("gallery-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (activeIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className="bg-white px-4 py-7 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Breadcrumb items={page.breadcrumb} theme={theme} />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c44536]">
            {page.pretitle}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#141414]/65">{page.desc}</p>
        </div>

        <div
          id="gallery-grid"
          className="mt-10 flex scroll-mt-24 flex-wrap justify-center gap-4 md:gap-5"
        >
          {pagedItems.map((item, i) => {
            const globalIndex = (galleryPage - 1) * ITEMS_PER_PAGE + i;
            return (
              <article
                key={`${item.title}-${globalIndex}`}
                className="w-full max-w-[260px]"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(globalIndex)}
                  className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f3efe8] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c44536] focus-visible:ring-offset-2"
                  aria-label={`View ${item.title}`}
                >
                  <MediaImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="260px"
                    themeId={theme}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
                </button>
                <h2 className="mt-2.5 text-sm font-semibold text-[#141414]">
                  {item.title}
                </h2>
              </article>
            );
          })}
        </div>

        <Pagination
          page={galleryPage}
          totalPages={totalPages}
          onChange={goToGalleryPage}
        />
      </div>

      {/* Lightbox */}
      {active && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 z-10 bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-6 md:top-6"
          >
            <FaTimes className="text-sm" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-6"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-6"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <div
            className="relative flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full max-h-[75vh] overflow-hidden bg-black/40">
              <MediaImage
                src={active.image}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
                themeId={theme}
                priority
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-white">
              <div>
                <p className="text-sm font-semibold md:text-base">{active.title}</p>
                {active.category && (
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">
                    {active.category}
                  </p>
                )}
              </div>
              <p className="shrink-0 text-xs text-white/50">
                {activeIndex + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
