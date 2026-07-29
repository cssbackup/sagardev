"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Mission({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.missionPage;
  const cta = page.ctaButton;
  const ctaHref = withTheme(cta?.href || "/contact", theme);

  return (
    <div className="bg-white text-[#141414]">
      {/* Intro */}
      <section className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <RevealBlur>
            <Breadcrumb items={page.breadcrumb} theme={theme} className="mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.pretitle}
            </p>
            <h1 className="mt-2 text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
              {page.title}
            </h1>
            <span className="mt-3 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)]" />
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#141414]/55 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#141414]/55 md:text-base">
                {page.desc2}
              </p>
            )}
          </RevealBlur>

          {page.sideImage && (
            <RevealBlur delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed]">
                <MediaImage
                  themeId={theme}
                  src={page.sideImage}
                  alt={page.sideImageTitle || page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </RevealBlur>
          )}
        </div>
      </section>

      {/* Pillars */}
      {page.pillars.length > 0 && (
        <section className="bg-[#141414] px-4 py-12 text-white md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-2xl">
              {page.pillarsPretitle && (
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                  {page.pillarsPretitle}
                </p>
              )}
              {page.pillarsTitle && (
                <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                  {page.pillarsTitle}
                </h2>
              )}
            </RevealBlur>

            <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
              {page.pillars.map((point, i) => (
                <StaggerItem
                  key={point.title}
                  className="border-t border-white/15 pt-5"
                >
                  <p className="text-sm font-bold text-[var(--reroom-accent,#ff6b00)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-bold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {point.desc}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Values */}
      {page.values.length > 0 && (
        <section className="bg-[#faf9f7] px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-2xl">
              {page.valuesPretitle && (
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                  {page.valuesPretitle}
                </p>
              )}
              {page.valuesTitle && (
                <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                  {page.valuesTitle}
                </h2>
              )}
            </RevealBlur>

            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {page.values.map((item) => (
                <StaggerItem
                  key={item.title}
                  className="border border-[#141414]/10 bg-white p-6 md:p-7"
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                    {item.desc}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      {(page.ctaTitle || cta) && (
        <section className="px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-[#141414]/10 bg-[#faf9f7] px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
            <div className="max-w-xl">
              {page.ctaPretitle && (
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                  {page.ctaPretitle}
                </p>
              )}
              {page.ctaTitle && (
                <h2 className="mt-2 text-[1.5rem] font-bold tracking-[-0.02em] md:text-[1.85rem]">
                  {page.ctaTitle}
                </h2>
              )}
              {page.ctaDesc && (
                <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                  {page.ctaDesc}
                </p>
              )}
            </div>
            {cta && (
              <Link
                href={ctaHref}
                className="inline-flex shrink-0 items-center gap-2 bg-[#141414] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--reroom-accent,#ff6b00)]"
              >
                {cta.label}
                <FaArrowRight className="text-xs" />
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
