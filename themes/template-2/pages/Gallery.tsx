"use client";

import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import type { GalleryPageItem, ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Gallery({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.galleryPage;
  const [active, setActive] = useState(page.categories[0] || "All");
  const [openItem, setOpenItem] = useState<GalleryPageItem | null>(null);

  const items = useMemo(() => {
    if (active === "All") return page.galleryItems;
    return page.galleryItems.filter((item) => item.category === active);
  }, [page.galleryItems, active]);

  useEffect(() => {
    if (!openItem) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenItem(null);
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openItem]);

  return (
    <div className="bg-white text-[#141414]">
      <section className="px-4 pt-10 text-center md:px-8 md:pt-12 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={page.breadcrumb}
            theme={theme}
            className="mb-4 flex justify-center"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
            {page.pretitle}
          </p>
          <h1 className="mt-3 text-[2.25rem] font-bold tracking-[-0.03em] md:text-[2.75rem]">
            {page.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#141414]/55 md:text-base">
            {page.desc}
          </p>
          <span className="mx-auto mt-5 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)]" />
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-center gap-6">
          {page.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative pb-1 text-sm font-medium transition ${
                active === cat
                  ? "text-[var(--reroom-accent,#ff6b00)]"
                  : "text-[#141414]/45 hover:text-[#141414]"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[var(--reroom-accent,#ff6b00)]" />
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => (
            <button
              key={`${item.title}-${i}`}
              type="button"
              onClick={() => setOpenItem(item)}
              className="group text-left"
            >
              <div className="relative aspect-square overflow-hidden bg-[#f3f1ed]">
                <MediaImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  themeId={theme}
                />
              </div>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
                {item.category}
              </p>
              <h2 className="mt-1 text-base font-bold">{item.title}</h2>
            </button>
          ))}
        </div>
      </section>

      {openItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={openItem.title}
          onClick={() => setOpenItem(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenItem(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-white text-[#141414] transition hover:bg-[var(--reroom-accent,#ff6b00)] hover:text-white md:right-6 md:top-6"
          >
            <FaTimes />
          </button>

          <div
            className="relative flex max-h-full w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1a1a1a] md:aspect-[16/10]">
              <MediaImage
                src={openItem.image}
                alt={openItem.alt}
                fill
                className="object-contain"
                sizes="100vw"
                themeId={theme}
                priority
              />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
                {openItem.category}
              </p>
              <h3 className="mt-1 text-lg font-bold md:text-xl">
                {openItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
