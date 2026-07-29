"use client";

import Link from "next/link";
import { FaArrowRight, FaHandHoldingHeart } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Csr({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.csrPage;
  const cta = page.donateCta;
  const ctaHref = withTheme(cta.buttonHref || "/contact", theme);

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
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
              <FaHandHoldingHeart />
              {page.pretitle}
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
              {cta.buttonLabel}
              <FaArrowRight className="text-[11px]" />
            </Link>

            {page.impactStats.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
                {page.impactStats.slice(0, 4).map((item) => (
                  <div key={item.label}>
                    <p className="text-xl font-bold text-[var(--snifty-red,#e11d2e)] md:text-2xl">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-white/55">
                      {item.label}
                    </p>
                  </div>
                ))}
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
                  Community
                </p>
                <p className="t3-serif mt-1 text-lg font-bold text-white">
                  Impact that stays practical
                </p>
              </div>
            </RevealUp>
          )}
        </div>
      </section>

      {/* Impact strip */}
      {page.impactStats.length > 0 && (
        <section className="border-b border-[#eef0f3] bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                Impact
              </p>
              <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                Numbers that stay practical
              </h2>
            </RevealBlur>

            <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {page.impactStats.map((item) => (
                <StaggerItem key={item.label}>
                  <article className="rounded-xl border border-[#eef0f3] bg-white p-6 text-center shadow-[0_8px_24px_rgba(11,31,51,0.04)]">
                    <p className="text-3xl font-bold text-[var(--snifty-red,#e11d2e)] md:text-[2.35rem]">
                      {item.stat}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#0b1f33]">
                      {item.label}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Programs — stacked feature rows */}
      {page.programs.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                Programs
              </p>
              <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                How we give back
              </h2>
            </RevealBlur>

            <div className="space-y-6 md:space-y-8">
              {page.programs.map((program, i) => {
                const reverse = i % 2 === 1;
                return (
                  <RevealUp key={program.title}>
                    <article
                      className={`grid overflow-hidden rounded-2xl border border-[#eef0f3] bg-[#f7f8fa] md:grid-cols-2 ${
                        reverse ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="relative aspect-[16/11] bg-[#eef1f5] md:aspect-auto md:min-h-[280px]">
                        <MediaImage
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          themeId={theme}
                        />
                        <div className="absolute inset-y-0 left-0 w-1 bg-[var(--snifty-red,#e11d2e)]" />
                      </div>
                      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                          {String(i + 1).padStart(2, "0")} · Program
                        </p>
                        <h3 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33]">
                          {program.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#5b6572] md:text-base">
                          {program.desc}
                        </p>
                        {program.amount && (
                          <p className="mt-5 inline-flex w-fit rounded-full bg-[var(--snifty-navy,#0b1f33)] px-4 py-2 text-xs font-bold text-white">
                            {program.amount}
                          </p>
                        )}
                      </div>
                    </article>
                  </RevealUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Donate CTA */}
      <section className="px-4 pb-7 pt-2 md:px-8 md:pb-8 lg:px-10">
        <div className="mx-auto overflow-hidden rounded-2xl bg-[var(--snifty-navy,#0b1f33)]">
          <div className="grid items-center md:grid-cols-[1.2fr_0.8fr]">
            <div className="px-6 py-8 text-white md:px-10 md:py-10 lg:px-14">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                Get involved
              </p>
              <h2 className="t3-serif mt-3 text-2xl font-bold md:text-3xl">
                {cta.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                {cta.desc}
              </p>
              <Link
                href={ctaHref}
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {cta.buttonLabel}
                <FaArrowRight className="text-[11px]" />
              </Link>
            </div>
            {page.sideImage && (
              <div className="relative min-h-[200px] md:min-h-[280px]">
                <MediaImage
                  src={page.sideImage}
                  alt={page.sideImageTitle || cta.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  themeId={theme}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
