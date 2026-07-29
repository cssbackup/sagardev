"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaHandshake,
  FaLocationDot,
  FaShieldHalved,
  FaStopwatch,
} from "react-icons/fa6";

const THEME = "template-1" as const;
const ease = [0.22, 1, 0.36, 1] as const;

const FEATURE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  location: FaLocationDot,
  verified: FaShieldHalved,
  support: FaHandshake,
  delivery: FaStopwatch,
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const wordContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const wordReveal = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.75, ease },
  },
};

function RevealWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      variants={wordContainer}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
        >
          <motion.span className="inline-block" variants={wordReveal}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero({ data }: { data: ResolvedSiteData }) {
  const { banner } = data;
  const brand = data.header.logo;
  const features = banner.features ?? [];
  const slides = useMemo(
    () =>
      banner.bannerSlides?.length
        ? banner.bannerSlides.slice(0, 3)
        : [
            {
              image: banner.backgroundImage || data.template.image,
              alt: banner.backgroundImageTitle || banner.title,
              title: banner.title,
              desc: banner.desc,
              button: banner.buttons[0],
            },
          ],
    [banner, data.template.image]
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide] ?? slides[0];
  const primary = currentSlide?.button ?? banner.buttons[0];
  const secondary = banner.buttons[1];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] w-full flex-col justify-between overflow-hidden bg-[#141414] md:min-h-[calc(100svh-4.25rem)]">
      {/* Background Media */}
      <motion.div
        key={currentSlide?.image}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.35, ease }}
      >
        <MediaImage
          themeId={data.themeId}
          src={
            currentSlide?.image || banner.backgroundImage || data.template.image
          }
          alt={
            currentSlide?.alt || banner.backgroundImageTitle || banner.title
          }
          fill
          priority={activeSlide === 0}
          loading={activeSlide === 0 ? "eager" : "lazy"}
          fetchPriority={activeSlide === 0 ? "high" : "auto"}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="absolute inset-x-0 bottom-0 z-1 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Main Content Area */}
      <motion.div
        className="relative z-2 flex w-full flex-1 flex-col justify-center px-4 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32 md:px-12 md:pt-20 lg:px-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            {brand && (
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-[11px]"
              >
                {brand}
              </motion.p>
            )}

            <RevealWords
              key={currentSlide?.title || banner.title}
              text={currentSlide?.title || banner.title}
              className="mt-1 text-[1.5rem] font-bold leading-[1.15] tracking-[-0.02em] text-white xs:text-[1.85rem] sm:mt-1 sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4rem]"
            />

            {(currentSlide?.desc || banner.desc) && (
              <motion.p
                variants={fadeUp}
                className="mt-1 max-w-xl text-[12px] leading-relaxed text-white/85 sm:mt-1 sm:text-sm md:text-base"
              >
                {currentSlide?.desc || banner.desc}
              </motion.p>
            )}

            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              {primary && (
                <Link
                  href={withTheme(primary.href, THEME)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#141414] transition hover:bg-white/90 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
                >
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link
                  href={withTheme(secondary.href, THEME)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/80 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-xs transition hover:bg-white/10 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
                >
                  {secondary.label}
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slider Controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setActiveSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            className="absolute left-3 top-[40%] z-3 hidden sm:flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 sm:left-5 sm:top-1/2 sm:h-11 sm:w-11"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-xs sm:text-sm" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-3 top-[40%] z-3 hidden sm:flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 sm:right-5 sm:top-1/2 sm:h-11 sm:w-11"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-xs sm:text-sm" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-[4.25rem] left-1/2 z-3 flex -translate-x-1/2 gap-1.5 sm:bottom-24 md:bottom-28">
            {slides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Bottom Feature Bar */}
      <div className="relative z-3 w-full border-t border-white/10 bg-zinc-900/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-3 px-4 py-3.5 sm:gap-6 sm:px-8 sm:py-5 md:grid-cols-4 md:gap-7 md:px-12 lg:px-16">
          {features.slice(0, 4).map((item) => {
            const Icon = FEATURE_ICONS[item.icon || ""] || FaLocationDot;

            return (
              <div
                key={item.title}
                className="flex items-center gap-2.5 sm:gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white sm:h-10 sm:w-10">
                  <Icon className="text-[11px] sm:text-[14px]" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-white sm:text-sm">
                    {item.title}
                  </p>
                  <p className="mt-0.5 hidden text-xs leading-snug text-white/60 sm:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}