"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/free-mode";

type CarouselProps = {
  children: ReactNode;
  withNav?: boolean;
  /** Wider cards (default) or compact team avatars */
  density?: "cards" | "compact";
  spaceBetween?: number;
  className?: string;
  slideClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
  onSlideChange?: (index: number) => void;
  onSwiper?: (swiper: SwiperInstance) => void;
};

const CARD_BREAKPOINTS = {
  0: { slidesPerView: 1.15, spaceBetween: 14 },
  640: { slidesPerView: 2, spaceBetween: 16 },
  768: { slidesPerView: 3, spaceBetween: 18 },
  1024: { slidesPerView: 4, spaceBetween: 20 },
  1280: { slidesPerView: 4, spaceBetween: 20 },
} as const;

const COMPACT_BREAKPOINTS = {
  0: { slidesPerView: 1.5, spaceBetween: 14 },
  640: { slidesPerView: 3, spaceBetween: 16 },
  768: { slidesPerView: 4, spaceBetween: 18 },
  1024: { slidesPerView: 4, spaceBetween: 20 },
  1280: { slidesPerView: 5, spaceBetween: 20 },
} as const;

export default function Carousel({
  children,
  withNav = false,
  density = "cards",
  spaceBetween = 16,
  className = "",
  slideClassName = "",
  prevLabel = "Previous",
  nextLabel = "Next",
  onSlideChange,
  onSwiper,
}: CarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [lenisPrevent, setLenisPrevent] = useState(false);
  const slides = Children.toArray(children);
  const breakpoints = density === "compact" ? COMPACT_BREAKPOINTS : CARD_BREAKPOINTS;

  if (slides.length === 0) return null;

  // Lenis by default respects `data-lenis-prevent` on hover/interaction.
  // We only want to block smooth wheel while the user is actively dragging/swiping the carousel.
  useEffect(() => {
    if (!lenisPrevent) return;

    const endInteraction = () => setLenisPrevent(false);
    window.addEventListener("pointerup", endInteraction);
    window.addEventListener("pointercancel", endInteraction);
    return () => {
      window.removeEventListener("pointerup", endInteraction);
      window.removeEventListener("pointercancel", endInteraction);
    };
  }, [lenisPrevent]);

  return (
    <div
      className={`relative ${className}`}
      {...(lenisPrevent ? { "data-lenis-prevent": "" } : {})}
      onPointerDownCapture={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        setLenisPrevent(true);
      }}
    >
      <Swiper
        modules={[FreeMode]}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.55,
          momentumVelocityRatio: 0.55,
        }}
        grabCursor
        slidesPerView={density === "compact" ? 1.6 : 1.25}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        watchOverflow
        resistanceRatio={0.65}
        speed={450}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          onSwiper?.(swiper);
        }}
        onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
        className="overflow-hidden"
      >
        {slides.map((child, i) => (
          <SwiperSlide key={i} className={`h-auto! ${slideClassName}`}>
            <div className="h-full">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      {withNav && slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#141414]/10 bg-white/95 text-[#141414] shadow-[0_8px_24px_rgba(20,20,20,0.12)] transition hover:bg-[#141414] hover:text-white md:left-1 md:flex"
          >
            <FaArrowLeft className="text-xs" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#141414]/10 bg-white/95 text-[#141414] shadow-[0_8px_24px_rgba(20,20,20,0.12)] transition hover:bg-[#141414] hover:text-white md:right-1 md:flex"
          >
            <FaArrowRight className="text-xs" />
          </button>
        </>
      )}
    </div>
  );
}
