"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowRight,
  FaBalanceScale,
  FaCheckDouble,
  FaHandshake,
  FaHome,
} from "react-icons/fa";

const VALUE_ICONS: IconType[] = [
  FaBalanceScale,
  FaCheckDouble,
  FaHandshake,
  FaHome,
];

export default function Mission({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.missionPage;
  const cta = page.ctaButton;

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-[#141414]/10 px-4 pb-7 pt-8 md:px-8 md:pb-8 md:pt-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={page.breadcrumb} theme={theme} />
            </div>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {page.pretitle}
            </p>
            <h1 className="mt-1 text-[2rem] font-semibold sm:text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem]">
              {page.title}
            </h1>
            <span className="mx-auto mt-6 block h-[2px] w-10 bg-[#c44536]" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#141414]/70 md:text-lg">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mx-auto mt-1 max-w-2xl text-sm leading-relaxed text-[#141414]/55 md:text-base">
                {page.desc2}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Image + pillars */}
      <section className="border-b border-[#141414]/10 bg-[#141414] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#2a2a2a] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[480px]">
              <MediaImage
                themeId={theme}
                src={page.sideImage}
                alt={page.sideImageTitle || page.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div>
              {page.pillarsPretitle && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
                  {page.pillarsPretitle}
                </p>
              )}
              {page.pillarsTitle && (
                <h2 className="mt-1 max-w-xl text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.5rem]">
                  {page.pillarsTitle}
                </h2>
              )}

              <div className="mt-10 grid gap-6 sm:grid-cols-1">
                {page.pillars.map((point, i) => (
                  <div key={point.title} className="border-t border-white/15 pt-5">
                    <p className="text-[11px] font-semibold tracking-[0.14em] text-[#c44536]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{point.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {page.values.length > 0 && (
        <section className="border-b border-[#141414]/10 bg-[#faf8f4] px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            {page.valuesPretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {page.valuesPretitle}
              </p>
            )}
            {page.valuesTitle && (
              <h2 className="mx-auto mt-1 max-w-2xl text-3xl font-semibold text-[#141414] md:text-4xl">
                {page.valuesTitle}
              </h2>
            )}

            <div className="mt-10 grid gap-px overflow-hidden border border-[#141414]/8 bg-[#141414]/8 sm:grid-cols-2">
              {page.values.map((item, i) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
                return (
                  <div key={item.title} className="bg-[#faf8f4] p-6 md:p-8">
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-[#141414]/15 bg-white text-[#c44536]">
                      <Icon className="text-base" aria-hidden />
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-[#141414]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#141414]/65">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {(page.ctaTitle || cta) && (
        <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            {page.ctaPretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {page.ctaPretitle}
              </p>
            )}
            {page.ctaTitle && (
              <h2 className="mt-1 text-3xl font-semibold text-[#141414] md:text-4xl">
                {page.ctaTitle}
              </h2>
            )}
            {page.ctaDesc && (
              <p className="mx-auto mt-1 max-w-xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {page.ctaDesc}
              </p>
            )}
            {cta && (
              <Link
                href={withTheme(cta.href, theme)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
              >
                {cta.label}
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
