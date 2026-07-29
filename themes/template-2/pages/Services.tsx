"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

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
    : (data.servicePage.productSlides ?? []);
  const steps = data.faq.faqItems.slice(0, 4);
  const ctaHref = withTheme("/contact", theme);

  return (
    <div className="bg-white text-[#141414]">
      {/* Hero */}
      <section className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <RevealBlur>
            <Breadcrumb items={page.breadcrumb} theme={theme} className="mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.pretitle}
            </p>
            <h1 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
              {page.title}
            </h1>
            <span className="mt-3 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)]" />
            {page.desc && (
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#141414]/55 md:text-base">
                {page.desc}
              </p>
            )}
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Start a project
              <FaArrowRight className="text-xs" />
            </Link>
          </RevealBlur>

          {page.sideImage && (
            <RevealBlur delay={0.08} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed] lg:aspect-[5/4]">
                <MediaImage
                  src={page.sideImage}
                  alt={page.sideImageTitle || page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  themeId={theme}
                  priority
                />
              </div>
            </RevealBlur>
          )}
        </div>
      </section>

      {/* Services list */}
      <section className="border-t border-[#141414]/10 bg-[#faf9f7] px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <RevealBlur className="mb-10 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.subtitle || "What we provide"}
            </p>
            <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
              {page.productSectionTitle || "Core service options"}
            </h2>
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                {page.desc2}
              </p>
            )}
          </RevealBlur>

          <Stagger className="space-y-5">
            {slides.map((slide, i) => {
              const features = slide.productFeatures?.slice(0, 4) ?? [];
              const reverse = i % 2 === 1;

              return (
                <StaggerItem key={`${slide.productTitle}-${i}`}>
                  <article
                    className={`grid overflow-hidden bg-white md:grid-cols-2 ${
                      reverse ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/11] bg-[#eeeae4] md:aspect-auto md:min-h-[280px]">
                      <MediaImage
                        src={slide.image}
                        alt={slide.alt || slide.productTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        themeId={theme}
                      />
                    </div>

                    <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-bold tabular-nums text-[var(--reroom-accent,#ff6b00)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {slide.productSubtitle && (
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#141414]/35">
                            {slide.productSubtitle}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">
                        {slide.productTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                        {slide.productInfoDesc}
                      </p>

                      {features.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {features.map((f) => (
                            <li
                              key={`${f.label}-${f.price}`}
                              className="border border-[#141414]/10 px-3 py-1.5 text-xs font-semibold text-[#141414]/70"
                            >
                              {f.label}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        href={ctaHref}
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
                      >
                        Enquire
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

      {/* Process */}
      {steps.length > 0 && (
        <section className="bg-[#141414] px-4 py-12 text-white md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                Process
              </p>
              <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                How we work with you
              </h2>
            </RevealBlur>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <article
                  key={step.question}
                  className="border-t border-white/15 pt-5"
                >
                  <p className="text-sm font-bold text-[var(--reroom-accent,#ff6b00)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-bold leading-snug">
                    {step.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {step.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-[#141414]/10 bg-[#faf9f7] px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              Next step
            </p>
            <h2 className="mt-2 text-[1.5rem] font-bold tracking-[-0.02em] md:text-[1.85rem]">
              Ready to talk through your project?
            </h2>
            <p className="mt-2 text-sm text-[#141414]/55">
              Share your brief and we will map the right service path for you.
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center gap-2 bg-[#141414] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--reroom-accent,#ff6b00)]"
          >
            Contact us
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
}
