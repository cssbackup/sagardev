"use client";

import Link from "next/link";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function About({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.aboutPage;
  const about = data.about;
  const stats = data.whyChooseUs.whyChooseUsItems.slice(0, 4);
  const quotes = data.testimonial.testimonialItems.slice(0, 3);
  const missionPoints = page.missionPoints ?? [];

  const heroImage =
    page.sideImage ||
    about.sideImage ||
    about.backgroundImage ||
    data.properties.listings?.[0]?.image ||
    "";
  const storyImage =
    about.backgroundImage ||
    data.properties.listings?.[1]?.image ||
    heroImage;

  const ctaHref = withTheme(page.ctaButton?.href || "/contact", theme);
  const missionHref = withTheme(page.missionButton?.href || "/mission", theme);

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
              {page.pretitle || "About us"}
            </p>
            <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] text-white md:text-[2.75rem] lg:text-[3.1rem]">
              {page.title}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {page.desc2}
              </p>
            )}
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              {page.ctaButton?.label || "Contact us"}
              <FaArrowRight className="text-[11px]" />
            </Link>
          </RevealBlur>

          {heroImage && (
            <RevealUp className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#152a3d] sm:min-h-[340px] lg:min-h-[460px]">
              <MediaImage
                src={heroImage}
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
                  {page.subtitle || "Our story"}
                </p>
                <p className="t3-serif mt-1 text-lg font-bold text-white md:text-xl">
                  {page.philosophyTitle || "Clear guidance, trusted homes"}
                </p>
              </div>
            </RevealUp>
          )}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <RevealBlur className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#eef1f5] sm:min-h-[320px] lg:min-h-full">
            <MediaImage
              src={storyImage}
              alt={about.backgroundImageTitle || page.storyLabel || "Our story"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              themeId={theme}
            />
            <div className="absolute inset-y-0 left-0 w-1 bg-[var(--snifty-red,#e11d2e)]" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/90 to-transparent p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                {page.storyLabel || page.subtitle || "Our approach"}
              </p>
            </div>
          </RevealBlur>

          <RevealUp className="flex flex-col justify-center rounded-2xl border border-[#eef0f3] bg-white p-7 md:p-9 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              {page.subtitle || "Our approach"}
            </p>
            <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
              {page.philosophyTitle}
            </h2>
            <div className="mt-6 border-l-4 border-[var(--snifty-red,#e11d2e)] pl-5">
              <p className="text-base leading-relaxed text-[#5b6572] md:text-lg">
                {page.philosophyDesc}
              </p>
            </div>
            {page.missionButton && (
              <Link
                href={missionHref}
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--snifty-red,#e11d2e)] transition hover:gap-3"
              >
                {page.missionButton.label}
                <FaArrowRight className="text-[11px]" />
              </Link>
            )}
          </RevealUp>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <StaggerItem key={item.title}>
                  <article className="rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-6 transition hover:border-[var(--snifty-red,#e11d2e)]/30 hover:bg-white hover:shadow-[0_12px_32px_rgba(225,29,46,0.08)]">
                    <p className="text-3xl font-bold text-[var(--snifty-red,#e11d2e)] md:text-[2.15rem]">
                      {item.stat}
                    </p>
                    <h3 className="t3-serif mt-3 text-base font-bold text-[#0b1f33]">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="mt-2 line-clamp-2 text-sm text-[#5b6572]">
                        {item.desc}
                      </p>
                    )}
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Mission */}
      {(page.missionTitle || missionPoints.length > 0) && (
        <section className="bg-[var(--snifty-navy,#0b1f33)] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                {page.missionPretitle || "Our mission"}
              </p>
              <h2 className="t3-serif mt-3 text-2xl font-bold md:text-3xl">
                {page.missionTitle}
              </h2>
              {page.missionDesc && (
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
                  {page.missionDesc}
                </p>
              )}
            </RevealBlur>

            {missionPoints.length > 0 && (
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {missionPoints.map((point, i) => (
                  <article
                    key={point.title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <p className="text-sm font-bold text-[var(--snifty-red,#e11d2e)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="t3-serif mt-3 text-lg font-bold">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {point.desc}
                    </p>
                  </article>
                ))}
              </div>
            )}

            {page.missionButton && (
              <Link
                href={missionHref}
                className="mt-10 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {page.missionButton.label}
                <FaArrowRight className="text-[11px]" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Quotes */}
      {quotes.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                {data.testimonial.pretitle || "Clients"}
              </p>
              <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                {data.testimonial.title}
              </h2>
            </RevealBlur>

            <Stagger className="grid gap-5 md:grid-cols-3">
              {quotes.map((q) => (
                <StaggerItem key={q.name}>
                  <blockquote className="flex h-full flex-col rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-6">
                    <FaQuoteLeft className="text-[var(--snifty-red,#e11d2e)]" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#5b6572]">
                      {q.quote}
                    </p>
                    <footer className="mt-5 border-t border-[#e8ecf1] pt-4">
                      <p className="text-sm font-bold text-[#0b1f33]">{q.name}</p>
                      <p className="text-xs text-[#5b6572]">{q.role}</p>
                    </footer>
                  </blockquote>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      {(page.ctaTitle || page.ctaButton) && (
        <section className="px-4 pb-7 pt-2 md:px-8 md:pb-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--snifty-navy,#0b1f33)] px-6 py-8 text-white md:flex-row md:items-center md:px-10 md:py-10 lg:px-14">
            <div className="max-w-xl">
              {page.ctaPretitle && (
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                  {page.ctaPretitle}
                </p>
              )}
              <h2 className="t3-serif mt-2 text-2xl font-bold md:text-3xl">
                {page.ctaTitle}
              </h2>
              {page.ctaDesc && (
                <p className="mt-3 text-sm text-white/65">{page.ctaDesc}</p>
              )}
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              {page.ctaButton?.label || "Contact us"}
              <FaArrowRight className="text-[11px]" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
