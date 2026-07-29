"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCompass,
  FaHandshake,
  FaHouseCircleCheck,
  FaShieldHalved,
} from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

const pillarIcons = [FaCompass, FaHouseCircleCheck, FaHandshake];
const valueIcons = [FaShieldHalved, FaHouseCircleCheck, FaHandshake, FaCompass];

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
  const [activePillar, setActivePillar] = useState(0);
  const active = page.pillars[activePillar] ?? page.pillars[0];

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
            <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {page.desc2}
              </p>
            )}
            {cta && (
              <Link
                href={ctaHref}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {cta.label}
                <FaArrowRight className="text-[11px]" />
              </Link>
            )}

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-bold text-[var(--snifty-red,#e11d2e)]">
                  {page.pillars.length}
                </p>
                <p className="mt-1 text-xs text-white/55">Promises</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {page.values.length}
                </p>
                <p className="mt-1 text-xs text-white/55">Values</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="mt-1 text-xs text-white/55">Clear path</p>
              </div>
            </div>
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
                  Mission
                </p>
                <p className="t3-serif mt-1 text-lg font-bold text-white md:text-xl">
                  Move with confidence
                </p>
              </div>
            </RevealUp>
          )}
        </div>
      </section>

      {/* Pillars — interactive */}
      {page.pillars.length > 0 && (
        <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-2xl">
              {page.pillarsPretitle && (
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                  {page.pillarsPretitle}
                </p>
              )}
              {page.pillarsTitle && (
                <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                  {page.pillarsTitle}
                </h2>
              )}
            </RevealBlur>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.25fr] lg:gap-8">
              <div className="flex flex-col gap-3">
                {page.pillars.map((point, i) => {
                  const Icon = pillarIcons[i % pillarIcons.length];
                  const selected = activePillar === i;
                  return (
                    <button
                      key={point.title}
                      type="button"
                      onClick={() => setActivePillar(i)}
                      className={`flex items-start gap-4 rounded-xl border p-4 text-left transition md:p-5 ${
                        selected
                          ? "border-[var(--snifty-red,#e11d2e)] bg-white shadow-[0_12px_28px_rgba(225,29,46,0.1)]"
                          : "border-[#e8ecf1] bg-white/80 hover:border-[#d5dae3] hover:bg-white"
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
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="t3-serif mt-1 block text-lg font-bold text-[#0b1f33]">
                          {point.title}
                        </span>
                        <span className="mt-1 line-clamp-2 hidden text-sm text-[#5b6572] lg:block">
                          {point.desc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {active && (
                <RevealUp key={active.title}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8ecf1] bg-white shadow-[0_16px_40px_rgba(11,31,51,0.06)]">
                    <div className="border-b border-[#eef0f3] bg-[var(--snifty-navy,#0b1f33)] px-6 py-7 text-white md:px-8 md:py-8">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                        Promise {String(activePillar + 1).padStart(2, "0")}
                      </p>
                      <h3 className="t3-serif mt-2 text-2xl font-bold md:text-[1.85rem]">
                        {active.title}
                      </h3>
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <p className="text-sm leading-relaxed text-[#5b6572] md:text-base">
                        {active.desc}
                      </p>
                      <Link
                        href={ctaHref}
                        className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-bold text-[var(--snifty-red,#e11d2e)] transition hover:gap-3"
                      >
                        Talk to an advisor
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

      {/* Values */}
      {page.values.length > 0 && (
        <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mx-auto max-w-2xl text-center">
              {page.valuesPretitle && (
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                  {page.valuesPretitle}
                </p>
              )}
              {page.valuesTitle && (
                <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                  {page.valuesTitle}
                </h2>
              )}
            </RevealBlur>

            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {page.values.map((item, i) => {
                const Icon = valueIcons[i % valueIcons.length];
                return (
                  <StaggerItem key={item.title}>
                    <article className="group flex h-full gap-4 rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-6 transition hover:border-[var(--snifty-red,#e11d2e)]/30 hover:bg-white hover:shadow-[0_14px_36px_rgba(225,29,46,0.1)] md:gap-5 md:p-7">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--snifty-red,#e11d2e)] text-white">
                        <Icon className="text-lg" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="t3-serif mt-1 text-lg font-bold text-[#0b1f33]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5b6572]">
                          {item.desc}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      {(page.ctaTitle || cta) && (
        <section className="px-4 pb-7 pt-2 md:px-8 md:pb-8 lg:px-10">
          <div className="mx-auto overflow-hidden rounded-2xl bg-[var(--snifty-navy,#0b1f33)]">
            <div className="grid items-center md:grid-cols-[1.2fr_0.8fr]">
              <div className="px-6 py-8 text-white md:px-10 md:py-10 lg:px-14">
                {page.ctaPretitle && (
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                    {page.ctaPretitle}
                  </p>
                )}
                {page.ctaTitle && (
                  <h2 className="t3-serif mt-3 text-2xl font-bold md:text-3xl">
                    {page.ctaTitle}
                  </h2>
                )}
                {page.ctaDesc && (
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                    {page.ctaDesc}
                  </p>
                )}
                {cta && (
                  <Link
                    href={ctaHref}
                    className="mt-7 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
                  >
                    {cta.label}
                    <FaArrowRight className="text-[11px]" />
                  </Link>
                )}
              </div>
              {page.sideImage && (
                <div className="relative min-h-[200px] md:min-h-[280px]">
                  <MediaImage
                    src={page.sideImage}
                    alt={page.sideImageTitle || page.ctaTitle || page.title}
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
      )}
    </div>
  );
}
