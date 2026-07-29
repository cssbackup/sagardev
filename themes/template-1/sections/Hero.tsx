"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { BannerFeatureItem, ResolvedSiteData } from "@/lib/types";
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

const DEFAULT_FEATURES: BannerFeatureItem[] = [
  {
    title: "Prime Locations",
    desc: "Carefully chosen neighborhoods",
    icon: "location",
  },
  {
    title: "Verified Properties",
    desc: "Legally verified & 100% transparent",
    icon: "verified",
  },
  {
    title: "End-to-End Support",
    desc: "From site visit to possession",
    icon: "support",
  },
  {
    title: "Timely Delivery",
    desc: "On-time commitments, every time",
    icon: "delivery",
  },
];

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
  hidden: { y: "110%" },
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
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
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
  const brand = data.header.logo || "HAUS Group";
  const features =
    banner.features?.length ? banner.features : DEFAULT_FEATURES;
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
              button: banner.buttons?.[0],
            },
          ],
    [banner, data.template.image]
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide] ?? slides[0];
  const primary = currentSlide?.button || banner.buttons?.[0];
  const secondary = banner.buttons?.[1];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative isolate h-[calc(100svh-4rem)] w-full overflow-hidden bg-[#141414] md:h-[calc(100svh-4.25rem)]">
      <motion.div
        key={currentSlide?.image}
        className="absolute inset-0"
        initial={{ opacity: 0.9 }}
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
          priority
          className="object-cover object-[55%_center] sm:object-center"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black/50 to-transparent" />

      <motion.div
        className="relative z-2 flex h-full w-full flex-col justify-center overflow-hidden px-5 pb-28 sm:justify-start sm:px-8 sm:pb-48 sm:pt-16 md:px-12 md:pb-52 md:pt-20 lg:px-16 lg:pt-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-[11px]"
            >
              {brand}
            </motion.p>

            <RevealWords
              key={currentSlide?.title || banner.title}
              text={currentSlide?.title || banner.title}
              className="mt-3 text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white min-[380px]:text-[1.85rem] sm:mt-4 sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]"
            />

            {(currentSlide?.desc || banner.desc) && (
              <motion.p
                variants={fadeUp}
                className="mt-3 max-w-70 text-[13px] leading-relaxed text-white/85 sm:mt-5 sm:max-w-lg sm:text-sm md:text-base"
              >
                {currentSlide?.desc || banner.desc}
              </motion.p>
            )}

            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              {primary && (
                <Link
                  href={withTheme(primary.href || "/contact", THEME)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-[#141414] transition hover:bg-white/90 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
                >
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link
                  href={withTheme(secondary.href || "/properties", THEME)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/80 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
                >
                  {secondary.label}
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setActiveSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            className="absolute left-2 top-[35%] z-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-3 sm:top-[42%] sm:h-9 sm:w-9 md:left-6 md:h-11 md:w-11"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-[35%] z-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-3 sm:top-[42%] sm:h-9 sm:w-9 md:right-6 md:h-11 md:w-11"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm" />
          </button>
          <div className="absolute bottom-22 left-1/2 z-5 flex -translate-x-1/2 gap-2 sm:bottom-40 md:bottom-44">
            {slides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition ${
                  activeSlide === index ? "w-8 bg-white" : "w-2 bg-white/45"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 z-4 border-t border-white/15 bg-black/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-2.5 px-4 py-3 sm:gap-6 sm:px-8 sm:py-7 md:grid-cols-4 md:gap-7 md:px-12 md:py-8 lg:px-16">
          {features.slice(0, 4).map((item) => {
            const Icon =
              FEATURE_ICONS[item.icon || ""] || FaLocationDot;

            return (
              <div key={item.title} className="flex items-center gap-2.5 sm:gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 text-white sm:h-11 sm:w-11">
                  <Icon className="text-[11px] sm:text-[15px]" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-white sm:text-[15px]">{item.title}</p>
                  <p className="mt-0.5 hidden text-xs leading-snug text-white/70 sm:mt-1 sm:block sm:text-[13px]">
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
