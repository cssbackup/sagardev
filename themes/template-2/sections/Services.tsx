"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import {
  FaBath,
  FaBuilding,
  FaKitchenSet,
  FaLaptop,
  FaTreeCity,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ProductSlide, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const icons = [FaKitchenSet, FaBath, FaTreeCity, FaBuilding, FaLaptop];

function ServiceCard({
  slide,
  index,
}: {
  slide: ProductSlide;
  index: number;
}) {
  const Icon = icons[index % icons.length];

  return (
    <article
      data-slide
      className="group relative flex w-[78vw] max-w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[#141414]/10 bg-white sm:w-[240px] lg:w-[220px]"
    >
      <div className="flex items-center justify-center gap-2.5 px-3 py-5">
        <Icon className="text-lg" aria-hidden />
        <h3 className="text-sm font-bold">{slide.productTitle}</h3>
      </div>

      <div className="relative aspect-square overflow-hidden bg-[#f3f1ed]">
        <MediaImage
          src={slide.image}
          alt={slide.alt || slide.productTitle}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="240px"
          themeId={THEME}
        />
      </div>

      <Link
        href={withTheme(slide.button?.href || "/contact", THEME)}
        className="absolute bottom-3 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--reroom-accent,#ff6b00)] text-white shadow-[0_6px_16px_rgba(255,107,0,0.4)] transition hover:brightness-110"
        aria-label={`Open ${slide.productTitle}`}
      >
        <FaPlus className="text-xs" />
      </Link>
    </article>
  );
}

/** Manual snap slider — same approach as template-1 */
export default function Services({ data }: { data: ResolvedSiteData }) {
  const slides = data.servicePage.productSlides ?? [];
  const trackRef = useRef<HTMLDivElement>(null);

  const rawTitle =
    data.servicePage.pretitle ||
    data.servicePage.subtitle ||
    "Our services";
  const title =
    rawTitle.toLowerCase() === "services" ? "Our services" : rawTitle;

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (slides.length === 0) return null;

  return (
    <section className="bg-white py-14 text-[#141414] md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <h2 className="text-[2rem] font-bold tracking-[-0.02em] md:text-[2.35rem]">
              {title}
            </h2>
            <span className="mx-auto mt-3 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)] sm:mx-0" />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous services"
              onClick={() => scrollBySlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next services"
              onClick={() => scrollBySlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </RevealBlur>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <ServiceCard
              key={slide.productTitle}
              slide={slide}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
