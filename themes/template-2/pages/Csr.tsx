"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
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
    <div className="bg-white text-[#141414]">
      {/* Hero */}
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
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              {cta.buttonLabel}
              <FaArrowRight className="text-xs" />
            </Link>
          </RevealBlur>

          <RevealBlur delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed]">
              <MediaImage
                src={page.sideImage}
                alt={page.sideImageTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                themeId={theme}
                priority
              />
            </div>
          </RevealBlur>
        </div>
      </section>

      {/* Impact stats */}
      {page.impactStats.length > 0 && (
        <section className="border-t border-[#141414]/10 bg-[#faf9f7] px-4 py-12 md:px-8 md:py-14 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-8 max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                Impact
              </p>
              <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                Numbers that stay practical.
              </h2>
            </RevealBlur>

            <Stagger className="grid grid-cols-2 gap-8 border-t border-[#141414]/10 pt-10 lg:grid-cols-4">
              {page.impactStats.map((item) => (
                <StaggerItem key={item.label}>
                  <p className="text-[2rem] font-bold tracking-tight text-[var(--reroom-accent,#ff6b00)] md:text-[2.35rem]">
                    {item.stat}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-snug">
                    {item.label}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Programs */}
      {page.programs.length > 0 && (
        <section className="px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-10 max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                Programs
              </p>
              <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                Where support goes
              </h2>
            </RevealBlur>

            <Stagger className="space-y-5">
              {page.programs.map((program, i) => {
                const reverse = i % 2 === 1;
                return (
                  <StaggerItem key={program.title}>
                    <article
                      className={`grid overflow-hidden bg-[#faf9f7] md:grid-cols-2 ${
                        reverse ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="relative aspect-[16/11] bg-[#eeeae4] md:aspect-auto md:min-h-[260px]">
                        <MediaImage
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          themeId={theme}
                        />
                      </div>
                      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
                          {program.amount}
                        </p>
                        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
                          {program.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                          {program.desc}
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
      <section className="px-4 pb-14 md:px-8 md:pb-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-[#141414]/10 bg-[#141414] px-6 py-8 text-white md:flex-row md:items-center md:px-10 md:py-10">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              Get involved
            </p>
            <h2 className="mt-2 text-[1.5rem] font-bold tracking-[-0.02em] md:text-[1.85rem]">
              {cta.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {cta.desc}
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            {cta.buttonLabel}
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
}
