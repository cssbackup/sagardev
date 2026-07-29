"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function ServicesContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.servicePage;
  const slides = page.productSlides?.length
    ? page.productSlides
    : (data.servicePage.productSlides ?? []).slice(0, 4);
  const cards = page.productItems;
  const reasons = data.whyChooseUs.whyChooseUsItems.slice(0, 4);
  const contactHref = withTheme("/contact", theme);
  const propertiesHref = withTheme("/properties", theme);

  return (
    <div className="bg-white text-[#141414]">
      {/* Intro */}
      <section className="border-b border-[#141414]/10 px-4 pb-7 pt-8 md:px-8 md:pb-8 md:pt-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <RevealBlur>
            <Breadcrumb items={page.breadcrumb} theme={theme} className="mb-5" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {page.pretitle}
            </p>
            <h1 className="mt-4 max-w-xl text-[2rem] font-semibold sm:text-[2.35rem] leading-[1.08] tracking-[-0.02em] md:text-[3rem] lg:text-[3.25rem]">
              {page.title}
            </h1>
            <span className="mt-5 block h-[2px] w-10 bg-[#c44536]" />
            {page.desc && (
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#141414]/65 md:text-lg">
                {page.desc}
              </p>
            )}
            {page.desc2 && (
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#141414]/55">
                {page.desc2}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
              >
                Talk to an advisor
                <FaArrowRight className="text-[10px]" />
              </Link>
              <Link
                href={propertiesHref}
                className="inline-flex rounded-full items-center gap-2 border border-[#141414]/15 px-6 py-3 text-sm font-medium text-[#141414] transition hover:border-[#141414]/30 hover:bg-[#faf8f4]"
              >
                Explore homes
              </Link>
            </div>
          </RevealBlur>

          {page.sideImage && (
            <RevealUp delay={0.08} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#f3efe8] lg:aspect-[5/4]">
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
            </RevealUp>
          )}
        </div>
      </section>

    

      {/* Detailed service rows */}
      {slides.length > 0 && (
        <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10">
            {slides.map((slide, i) => {
              const reverse = i % 2 === 1;
              const features = slide.productFeatures?.slice(0, 4) ?? [];
              return (
                <RevealUp key={`${slide.productTitle}-${i}`}>
                  <article
                    className={`grid overflow-hidden rounded-[1.25rem] bg-[#faf8f4] md:grid-cols-2 ${
                      reverse ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/11] bg-[#f3efe8] md:aspect-auto md:min-h-[300px]">
                      <MediaImage
                        src={slide.image}
                        alt={slide.alt || slide.productTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        themeId={theme}
                      />
                    </div>
                    <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                        {String(i + 1).padStart(2, "0")}
                        {slide.productSubtitle ? ` · ${slide.productSubtitle}` : ""}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-[1.85rem]">
                        {slide.productTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#141414]/60 md:text-base">
                        {slide.productInfoDesc}
                      </p>
                      {features.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {features.map((f) => (
                            <li
                              key={`${f.label}-${f.price}`}
                              className="rounded-full border border-[#141414]/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#141414]/70"
                            >
                              {f.label}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={contactHref}
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
                      >
                        Enquire about this
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </article>
                </RevealUp>
              );
            })}
          </div>
        </section>
      )}

      {/* Why / process */}
      {reasons.length > 0 && (
        <section className="border-t border-[#141414]/10 bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {data.whyChooseUs.pretitle}
              </p>
              <h2 className="mt-3 text-[1.85rem] font-semibold md:text-[2.25rem]">
                {data.whyChooseUs.title}
              </h2>
            </RevealBlur>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.25rem] bg-[#faf8f4] p-6 md:p-7"
                >
                  {item.stat && (
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#c44536]">
                      {item.stat}
                    </p>
                  )}
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#141414]/60">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 pb-7 pt-2 md:px-8 md:pb-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[1.25rem] bg-[#141414] px-7 py-9 text-white md:flex-row md:items-center md:px-10 md:py-11">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c44536]">
              Next step
            </p>
            <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.02em] md:text-[1.85rem]">
              Ready to talk through your next move?
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Share what you need — buying, renting, or selling — and we will guide the right path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#c44536] px-6 py-3.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Contact us
              <FaArrowRight className="text-xs" />
            </Link>
            <Link
              href={propertiesHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Explore homes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
