"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

/** Compact 3-up testimonials slider */
export default function Testimonials({ data }: { data: ResolvedSiteData }) {
  const { testimonial } = data;
  const quotes = testimonial.testimonialItems;
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const step = slide ? slide.offsetWidth + 16 : el.clientWidth / 3;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  if (quotes.length === 0) return null;

  return (
    <section className="bg-white px-4 py-7 text-[#0b1f33] md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              {testimonial.pretitle || "Client testimonials"}
            </p>
            <h2 className="t3-serif mt-2.5 text-2xl font-bold md:text-3xl">
              {testimonial.title}
            </h2>
          </div>

          {quotes.length > 3 && (
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonials"
                onClick={() => scroll(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                onClick={() => scroll(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          )}
        </RevealBlur>

        <div className="relative mt-8">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {quotes.map((item, i) => {
              const rating = Number.parseFloat(item.rating || "5") || 5;
              const stars = Math.min(5, Math.max(0, Math.round(rating)));

              return (
                <article
                  key={`${item.name}-${i}`}
                  data-slide
                  className="flex w-[85%] max-w-[340px] shrink-0 snap-start flex-col rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-5 sm:w-[calc(50%-8px)] sm:max-w-none lg:w-[calc(33.333%-11px)]"
                >
                  <div className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <FaStar
                        key={s}
                        className={`text-[10px] ${
                          s < stars
                            ? "text-[var(--snifty-red,#e11d2e)]"
                            : "text-[#d5dae3]"
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5b6572]">
                    “{item.quote}”
                  </p>

                  <div className="mt-5 flex items-center gap-3 border-t border-[#e8ecf1] pt-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#eef1f5]">
                      <MediaImage
                        themeId={THEME}
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#0b1f33]">
                        {item.name}
                      </p>
                      <p className="truncate text-xs text-[#5b6572]">{item.role}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {quotes.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous testimonials"
                onClick={() => scroll(-1)}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.2)] transition hover:bg-[var(--snifty-red,#e11d2e)] lg:hidden"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                onClick={() => scroll(1)}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.2)] transition hover:bg-[var(--snifty-red,#e11d2e)] lg:hidden"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
