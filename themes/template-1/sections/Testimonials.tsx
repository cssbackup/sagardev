"use client";

import { useRef, useState } from "react";
import MediaImage from "@/components/MediaImage";
import Carousel from "@/themes/template-1/components/Carousel";
import type { ResolvedSiteData } from "@/lib/types";
import type { Swiper as SwiperInstance } from "swiper";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials({ data }: { data: ResolvedSiteData }) {
  const { testimonial } = data;
  const quotes = testimonial.testimonialItems;
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);

  if (quotes.length === 0) return null;

  return (
    <section className="bg-white py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          {testimonial.pretitle && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {testimonial.pretitle}
            </p>
          )}
          <h2 className="mt-1 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
            {testimonial.title}
          </h2>
          {testimonial.desc && (
            <p className="mt-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {testimonial.desc}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <Carousel
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={setActive}
        >
          {quotes.map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              className={`flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition ${
                active === i
                  ? "border-[#c44536]/35 bg-[#faf8f4]"
                  : "border-[#141414]/8 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <FaQuoteLeft className="text-base text-[#c44536]/70" aria-hidden />
                {item.rating && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#c44536]">
                    <FaStar className="text-[9px]" aria-hidden />
                    {item.rating}
                  </span>
                )}
              </div>

              <p className="mt-1 flex-1 text-sm leading-relaxed text-[#141414]/75">
                {item.quote}
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-[#141414]/8 pt-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3efe8]">
                  <MediaImage
                    themeId={data.themeId}
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#141414]">{item.name}</p>
                  <p className="truncate text-xs text-[#141414]/55">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </Carousel>

        {quotes.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={active === i}
                onClick={() => swiperRef.current?.slideTo(i)}
                className={`h-2 rounded-full transition ${
                  active === i ? "w-6 bg-[#c44536]" : "w-2 bg-[#141414]/20 hover:bg-[#141414]/35"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
