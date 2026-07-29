"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaHandshake,
  FaHouse,
  FaKey,
} from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

const icons = [FaHouse, FaHandshake, FaKey, FaBuilding];

export default function Services({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.servicePage;
  const slides = page.productSlides?.length
    ? page.productSlides
    : [];
  const cards = page.productItems;
  const reasons = data.whyChooseUs.whyChooseUsItems.slice(0, 4);
  const faqs = data.faq.faqItems.slice(0, 5);
  const [active, setActive] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);

  const activeSlide = slides[active] ?? slides[0];
  const contactHref = withTheme("/contact", theme);
  const propertiesHref = withTheme("/properties", theme);

  return (
    <div className="bg-white text-[#0b1f33]">
      {/* Hero */}
      <section className="bg-[var(--snifty-navy,#0b1f33)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-7 md:px-8 md:py-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
          <RevealBlur>
            <Breadcrumb
              items={page.breadcrumb}
              theme={theme}
              variant="light"
              className="mb-6"
            />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
              {page.pretitle}
            </p>
            <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] text-white md:text-[2.75rem] lg:text-[3.1rem]">
              {page.title}
            </h1>
            {page.desc && (
              <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
                {page.desc}
              </p>
            )}
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {page.desc2}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Get started
                <FaArrowRight className="text-[11px]" />
              </Link>
              <Link
                href={propertiesHref}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse homes
              </Link>
            </div>

            {slides.length > 0 && (
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-bold text-[var(--snifty-red,#e11d2e)]">
                    {slides.length}
                  </p>
                  <p className="mt-1 text-xs text-white/55">Services</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {cards.length || reasons.length}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {cards.length ? "Options" : "Reasons"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {faqs.length || "24/7"}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {faqs.length ? "FAQs" : "Support"}
                  </p>
                </div>
              </div>
            )}
          </RevealBlur>

          {page.sideImage && (
            <RevealUp className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#152a3d] sm:min-h-[340px] lg:min-h-[460px]">
              <MediaImage
                src={page.sideImage}
                alt={page.sideImageTitle || page.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                themeId={theme}
                priority
              />
              <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--snifty-red,#e11d2e)]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/90 to-transparent p-5 md:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                  {page.subtitle || "Services"}
                </p>
                <p className="t3-serif mt-1 text-lg font-bold text-white md:text-xl">
                  {page.productSectionTitle || "Built around your next step"}
                </p>
              </div>
            </RevealUp>
          )}
        </div>
      </section>

      {/* Interactive service explorer */}
      {slides.length > 0 && (
        <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                {page.subtitle || "What we provide"}
              </p>
              <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                {page.productSectionTitle || "Core service options"}
              </h2>
              <p className="mt-3 text-sm text-[#5b6572] md:text-base">
                Select a service to see how we support that stage of your move.
              </p>
            </RevealBlur>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-8">
              {/* Service index */}
              <div
                className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
                role="tablist"
                aria-label="Services"
              >
                {slides.map((slide, i) => {
                  const Icon = icons[i % icons.length];
                  const selected = active === i;
                  return (
                    <button
                      key={`${slide.productTitle}-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActive(i)}
                      className={`group flex min-w-[220px] shrink-0 items-start gap-4 rounded-xl border px-4 py-4 text-left transition lg:min-w-0 ${
                        selected
                          ? "border-[var(--snifty-red,#e11d2e)] bg-white shadow-[0_12px_32px_rgba(225,29,46,0.12)]"
                          : "border-[#e8ecf1] bg-white/70 hover:border-[#d5dae3] hover:bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition ${
                          selected
                            ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                            : "bg-[var(--snifty-red,#e11d2e)]/10 text-[var(--snifty-red,#e11d2e)]"
                        }`}
                      >
                        <Icon className="text-base" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {slide.productSubtitle && (
                            <span className="truncate text-[11px] font-medium uppercase tracking-[0.1em] text-[#5b6572]">
                              {slide.productSubtitle}
                            </span>
                          )}
                        </span>
                        <span className="t3-serif mt-1 block text-base font-bold text-[#0b1f33] md:text-lg">
                          {slide.productTitle}
                        </span>
                        <span className="mt-1 line-clamp-2 hidden text-sm leading-snug text-[#5b6572] lg:block">
                          {slide.productInfoDesc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active detail panel */}
              {activeSlide && (
                <RevealUp key={activeSlide.productTitle} className="min-h-0">
                  <article className="overflow-hidden rounded-2xl border border-[#e8ecf1] bg-white shadow-[0_16px_40px_rgba(11,31,51,0.06)]">
                    <div className="relative aspect-[16/9] bg-[#eef1f5] sm:aspect-[2/1]">
                      <MediaImage
                        src={activeSlide.image}
                        alt={activeSlide.alt || activeSlide.productTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        themeId={theme}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                          {String(active + 1).padStart(2, "0")} ·{" "}
                          {activeSlide.productSubtitle || "Service"}
                        </p>
                        <h3 className="t3-serif mt-1 text-2xl font-bold text-white md:text-[1.85rem]">
                          {activeSlide.productTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 md:p-7 lg:p-8">
                      <p className="text-sm leading-relaxed text-[#5b6572] md:text-base">
                        {activeSlide.productInfoDesc}
                      </p>

                      {(activeSlide.productFeatures?.length ?? 0) > 0 && (
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                          {activeSlide.productFeatures.map((f) => (
                            <li
                              key={`${f.label}-${f.price}`}
                              className="flex items-center gap-3 rounded-lg bg-[#f7f8fa] px-4 py-3"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--snifty-red,#e11d2e)] text-white">
                                <FaCheck className="text-[10px]" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-[#0b1f33]">
                                  {f.label}
                                </span>
                                {f.price && (
                                  <span className="text-xs text-[#5b6572]">
                                    Step {f.price}
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        href={contactHref}
                        className="mt-7 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-navy,#0b1f33)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
                      >
                        Enquire about {activeSlide.productTitle}
                        <FaArrowRight className="text-[11px]" />
                      </Link>
                    </div>
                  </article>
                </RevealUp>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Snapshot cards */}
      {cards.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                At a glance
              </p>
              <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                Services overview
              </h2>
            </RevealBlur>

            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((item, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <StaggerItem key={item.title}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#eef0f3] bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--snifty-red,#e11d2e)]/30 hover:shadow-[0_16px_40px_rgba(225,29,46,0.12)]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#eef1f5]">
                        <MediaImage
                          src={item.image}
                          alt={item.alt || item.title}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          themeId={theme}
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5 md:p-6">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--snifty-red,#e11d2e)]/10 text-[var(--snifty-red,#e11d2e)]">
                            <Icon className="text-sm" />
                          </span>
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                            {item.category}
                          </p>
                        </div>
                        <h3 className="t3-serif mt-3 text-lg font-bold text-[#0b1f33]">
                          {item.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5b6572]">
                          {item.desc}
                        </p>
                        <Link
                          href={contactHref}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--snifty-red,#e11d2e)] transition group-hover:gap-3"
                        >
                          Learn more
                          <FaArrowRight className="text-[10px]" />
                        </Link>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* Process / why */}
      {reasons.length > 0 && (
        <section className="bg-[var(--snifty-navy,#0b1f33)] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                {data.whyChooseUs.pretitle}
              </p>
              <h2 className="t3-serif mt-3 text-2xl font-bold md:text-3xl">
                {data.whyChooseUs.title}
              </h2>
              {data.whyChooseUs.desc && (
                <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">
                  {data.whyChooseUs.desc}
                </p>
              )}
            </RevealBlur>

            <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item, i) => (
                <article
                  key={item.title}
                  className="relative border-t border-white/10 px-0 py-6 sm:border-t-0 sm:px-5 sm:py-2 lg:px-6 first:sm:pl-0 last:sm:pr-0 sm:border-l sm:first:border-l-0"
                >
                  <p className="text-3xl font-bold tabular-nums text-[var(--snifty-red,#e11d2e)]">
                    {item.stat || String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="t3-serif mt-3 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <RevealBlur>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                {data.faq.pretitle}
              </p>
              <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                {data.faq.title}
              </h2>
              <Link
                href={contactHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--snifty-red,#e11d2e)] transition hover:gap-3"
              >
                Ask a question
                <FaArrowRight className="text-[11px]" />
              </Link>
            </RevealBlur>

            <div className="space-y-3">
              {faqs.map((item, i) => {
                const isOpen = faqOpen === i;
                return (
                  <div
                    key={item.question}
                    className={`overflow-hidden rounded-xl border transition ${
                      isOpen
                        ? "border-[var(--snifty-red,#e11d2e)]/35 bg-[#f7f8fa]"
                        : "border-[#e8ecf1] bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setFaqOpen(isOpen ? -1 : i)}
                    >
                      <span className="t3-serif text-[15px] font-bold text-[#0b1f33]">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                          isOpen
                            ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                            : "bg-[#eef1f5] text-[#0b1f33]"
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-[#e8ecf1] px-5 pb-5 pt-3 text-sm leading-relaxed text-[#5b6572]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 pb-7 pt-2 md:px-8 md:pb-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl bg-[var(--snifty-navy,#0b1f33)] md:flex-row">
          <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-14">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              Next step
            </p>
            <h2 className="t3-serif mt-3 max-w-md text-2xl font-bold text-white md:text-3xl">
              Ready to put the right service to work?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
              Tell us what you need — buying, renting, or selling — and we will
              guide the path forward.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Contact us
                <FaArrowRight className="text-[11px]" />
              </Link>
              <Link
                href={propertiesHref}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore homes
              </Link>
            </div>
          </div>
          {page.sideImage && (
            <div className="relative min-h-[200px] md:w-[42%] md:min-h-[280px]">
              <MediaImage
                src={page.sideImage}
                alt={page.sideImageTitle || page.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
                themeId={theme}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
