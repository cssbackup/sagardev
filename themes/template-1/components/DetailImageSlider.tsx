"use client";

import { useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { ThemeId } from "@/lib/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Slide = {
  src: string;
  alt: string;
};

export default function DetailImageSlider({
  theme,
  slides,
}: {
  theme: ThemeId;
  slides: Slide[];
}) {
  const uniqueSlides = slides.filter(
    (slide, index, items) =>
      slide.src && items.findIndex((item) => item.src === slide.src) === index
  );
  const [active, setActive] = useState(0);
  const current = uniqueSlides[active] ?? uniqueSlides[0];

  if (!current) return null;

  const previous = () =>
    setActive((index) => (index - 1 + uniqueSlides.length) % uniqueSlides.length);
  const next = () =>
    setActive((index) => (index + 1) % uniqueSlides.length);

  return (
    <div className="relative aspect-16/10 w-full max-w-160 overflow-hidden rounded-2xl bg-[#f3efe8] lg:ml-auto">
      <MediaImage
        key={current.src}
        themeId={theme}
        src={current.src}
        alt={current.alt}
        fill
        priority
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 1024px) 100vw, 640px"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />

      {uniqueSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
          >
            <FaChevronRight className="text-xs" />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {uniqueSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                className={`h-2 rounded-full transition ${
                  active === index ? "w-7 bg-white" : "w-2 bg-white/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
