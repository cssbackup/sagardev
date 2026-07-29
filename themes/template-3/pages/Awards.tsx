"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Awards({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.awardsPage;
  const items = page.awardItems;
  const years = useMemo(
    () => Array.from(new Set(items.map((a) => a.year))).sort((a, b) => Number(b) - Number(a)),
    [items]
  );
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered =
    yearFilter === "all" ? items : items.filter((a) => a.year === yearFilter);

  const featured = filtered[Math.min(activeIdx, Math.max(filtered.length - 1, 0))] ?? filtered[0];
  const contactHref = withTheme("/contact", theme);
  const servicesHref = withTheme("/services", theme);

  return (
    <div className="bg-white text-[#0b1f33]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--snifty-navy,#0b1f33)]">
        <div
          className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border-[24px] border-[var(--snifty-red,#e11d2e)]/15 md:h-96 md:w-96"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 text-[10rem] font-bold leading-none text-white/[0.04] md:block lg:right-16 lg:text-[14rem]"
          aria-hidden
        >
          {items[0]?.year?.slice(0, 2) || "20"}
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-7 md:grid-cols-[1.2fr_0.8fr] md:items-end md:px-8 md:py-8 lg:gap-10 lg:px-10">
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
            <h1 className="t3-serif mt-3 max-w-xl text-[2.15rem] font-bold leading-[1.12] text-white md:text-[2.75rem] lg:text-[3.1rem]">
              {page.title}
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc}
            </p>
          </RevealBlur>

          <RevealUp className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-bold text-[var(--snifty-red,#e11d2e)] md:text-4xl">
                {items.length}
              </p>
              <p className="mt-1 text-sm text-white/60">Honors earned</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-bold text-white md:text-4xl">
                {years.length}
              </p>
              <p className="mt-1 text-sm text-white/60">Award years</p>
            </div>
            <div className="col-span-2 flex items-center gap-3 rounded-xl border border-[var(--snifty-red,#e11d2e)]/40 bg-[var(--snifty-red,#e11d2e)]/10 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--snifty-red,#e11d2e)] text-white">
                <FaTrophy />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Latest · {items[0]?.year}
                </p>
                <p className="line-clamp-1 text-xs text-white/65">
                  {items[0]?.title}
                </p>
              </div>
            </div>
          </RevealUp>
        </div>
      </section>

      {/* Year filters + featured spotlight */}
      {featured && (
        <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                  Recognition
                </p>
                <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                  Explore by year
                </h2>
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Filter awards by year"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={yearFilter === "all"}
                  onClick={() => {
                    setYearFilter("all");
                    setActiveIdx(0);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    yearFilter === "all"
                      ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                      : "bg-white text-[#0b1f33] ring-1 ring-[#e8ecf1] hover:ring-[var(--snifty-red,#e11d2e)]/40"
                  }`}
                >
                  All
                </button>
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    role="tab"
                    aria-selected={yearFilter === y}
                    onClick={() => {
                      setYearFilter(y);
                      setActiveIdx(0);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      yearFilter === y
                        ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                        : "bg-white text-[#0b1f33] ring-1 ring-[#e8ecf1] hover:ring-[var(--snifty-red,#e11d2e)]/40"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </RevealBlur>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
              {/* Featured panel */}
              <RevealUp key={`${featured.year}-${featured.title}`}>
                <article className="overflow-hidden rounded-2xl border border-[#e8ecf1] bg-white shadow-[0_16px_40px_rgba(11,31,51,0.06)]">
                  <div className="relative aspect-[16/10] bg-[#eef1f5] md:aspect-[2/1]">
                    <MediaImage
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      themeId={theme}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/85 via-[var(--snifty-navy,#0b1f33)]/20 to-transparent" />
                    <div className="absolute left-0 top-0 m-4 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
                      <FaTrophy className="text-[10px]" />
                      {featured.year}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                        {featured.org}
                      </p>
                      <h3 className="t3-serif mt-1 text-2xl font-bold text-white md:text-[1.85rem]">
                        {featured.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 md:p-7">
                    <p className="text-sm leading-relaxed text-[#5b6572] md:text-base">
                      {featured.desc}
                    </p>
                  </div>
                </article>
              </RevealUp>

              {/* Selectable list */}
              <div className="flex flex-col gap-3">
                {filtered.map((award, i) => {
                  const selected =
                    featured.title === award.title && featured.year === award.year;
                  return (
                    <button
                      key={`${award.year}-${award.title}`}
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      className={`flex gap-4 rounded-xl border p-3.5 text-left transition md:p-4 ${
                        selected
                          ? "border-[var(--snifty-red,#e11d2e)] bg-white shadow-[0_12px_28px_rgba(225,29,46,0.1)]"
                          : "border-[#e8ecf1] bg-white/80 hover:border-[#d5dae3] hover:bg-white"
                      }`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#eef1f5] md:h-[4.5rem] md:w-[4.5rem]">
                        <MediaImage
                          src={award.image}
                          alt={award.title}
                          fill
                          className="object-cover"
                          sizes="72px"
                          themeId={theme}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                          {award.year} · {award.org}
                        </p>
                        <p className="t3-serif mt-1 line-clamp-2 text-base font-bold text-[#0b1f33]">
                          {award.title}
                        </p>
                      </div>
                      <span
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          selected
                            ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                            : "bg-[#eef1f5] text-[#0b1f33]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <RevealBlur className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              Timeline
            </p>
            <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
              A record of trusted guidance
            </h2>
          </RevealBlur>

          <div className="relative mt-12">
            <div
              className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-[#e8ecf1] md:left-1/2 md:-translate-x-px"
              aria-hidden
            />

            <Stagger className="space-y-8 md:space-y-12">
              {items.map((award, i) => {
                const left = i % 2 === 0;
                return (
                  <StaggerItem key={`timeline-${award.year}-${award.title}`}>
                    <div
                      className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${
                        left ? "" : "md:[&>*:first-child]:order-2"
                      }`}
                    >
                      <div
                        className={`pl-12 md:pl-0 ${
                          left ? "md:pr-12 md:text-right" : "md:pl-12"
                        }`}
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                          {award.year}
                        </p>
                        <h3 className="t3-serif mt-2 text-xl font-bold text-[#0b1f33] md:text-2xl">
                          {award.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#0b1f33]/70">
                          {award.org}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[#5b6572]">
                          {award.desc}
                        </p>
                      </div>

                      <div
                        className={`pl-12 md:pl-0 ${
                          left ? "md:pl-12" : "md:pr-12"
                        }`}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#eef1f5]">
                          <MediaImage
                            src={award.image}
                            alt={award.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            themeId={theme}
                          />
                          <div className="absolute inset-y-0 left-0 w-1 bg-[var(--snifty-red,#e11d2e)]" />
                        </div>
                      </div>

                      {/* Timeline node */}
                      <span
                        className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--snifty-red,#e11d2e)] bg-white md:left-1/2 md:-translate-x-1/2"
                        aria-hidden
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--snifty-red,#e11d2e)]" />
                      </span>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-7 pt-2 md:px-8 md:pb-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-[var(--snifty-navy,#0b1f33)] px-6 py-8 text-white md:flex-row md:items-center md:px-10 md:py-10 lg:px-14">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              Work with us
            </p>
            <h2 className="t3-serif mt-2 text-2xl font-bold md:text-3xl">
              Experience the standard behind the awards
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Clear guidance, verified homes, and local advice — the same
              approach that earns recognition.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Contact us
              <FaArrowRight className="text-[11px]" />
            </Link>
            <Link
              href={servicesHref}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Our services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
