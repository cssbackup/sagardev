"use client";

import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import Carousel from "@/themes/template-1/components/Carousel";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaQuoteLeft, FaRegCalendarAlt } from "react-icons/fa";
import { slugify } from "@/lib/slugs";

export default function AboutContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.aboutPage;
  const about = data.about;
  const { whyChooseUs, testimonial, gallery } = data;
  const cta = about.buttons[0];
  const galleryPreview = gallery.galleryItems.slice(0, 3);
  const quotes = testimonial.testimonialItems;

  return (
    <div className="bg-white">

    

      {/* Story + philosophy */}
      <section className="border-b border-[#141414]/10 px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex justify-center md:mb-8">
            <Breadcrumb items={page.breadcrumb} theme={theme} />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {about.pretitle}
            </p>
            <h2 className="mt-1 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
              {page.storyLabel || page.subtitle}
            </h2>
          </div>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-between rounded-[1.25rem] border border-[#141414]/8 bg-[#faf8f4] p-7 md:p-9 lg:min-h-[420px]">
              <div>
                <h3 className="text-2xl font-semibold leading-snug text-[#141414] md:text-[1.85rem]">
                  {about.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#c44536]">{about.subtitle}</p>
                <p className="mt-6 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                  {about.desc}
                </p>
                {about.desc2 && (
                  <p className="mt-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                    {about.desc2}
                  </p>
                )}
              </div>
              {cta && (
                <Link
                  href={withTheme(cta.href === "#" ? "/contact" : cta.href, theme)}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
                >
                  {cta.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
            </div>

            <div className="flex flex-col overflow-hidden rounded-[1.25rem] border border-[#141414]/8 bg-white lg:min-h-[420px]">
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                  {page.subtitle}
                </p>
                <h3 className="mt-1 text-2xl font-semibold leading-snug text-[#141414] md:text-[1.85rem]">
                  {page.philosophyTitle || about.philosophyTitle}
                </h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                  {page.philosophyDesc || about.philosophyDesc}
                </p>
              </div>
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:aspect-[16/9] lg:min-h-[200px] lg:flex-1 lg:aspect-auto">
                <MediaImage
                  themeId={theme}
                  src={about.backgroundImage}
                  alt={about.backgroundImageTitle || about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission teaser → /mission via Learn more button (not in header) */}
      {(page.missionTitle || page.missionDesc) && (
        <section className="border-b border-[#141414]/10 bg-[#141414] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                {page.missionPretitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
                    {page.missionPretitle}
                  </p>
                )}
                {page.missionTitle && (
                  <h2 className="mt-1 max-w-xl text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
                    {page.missionTitle}
                  </h2>
                )}
                {page.missionDesc && (
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                    {page.missionDesc}
                  </p>
                )}

                {page.missionPoints && page.missionPoints.length > 0 && (
                  <div className="mt-10 grid gap-5 sm:grid-cols-3">
                    {page.missionPoints.map((point, i) => (
                      <div
                        key={point.title}
                        className="border-t border-white/15 pt-5"
                      >
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#c44536]">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-white">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/55">
                          {point.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {page.missionButton && (
                  <Link
                    href={withTheme(page.missionButton.href, theme)}
                    className="mt-10 inline-flex items-center gap-2 border border-white/25 bg-white px-6 py-3 text-sm font-medium text-[#141414] transition hover:bg-[#faf8f4]"
                  >
                    {page.missionButton.label}
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                )}
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-[#2a2a2a] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]">
                <MediaImage
                  themeId={theme}
                  src={page.sideImage || about.sideImage}
                  alt={page.sideImageTitle || page.missionTitle || page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}





 

      {(page.ctaPretitle || page.ctaTitle || page.ctaButton) && (
        <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.25rem] bg-[#141414] px-6 py-8 md:rounded-[1.5rem] md:px-12 md:py-10 lg:px-16">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                {page.ctaPretitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                    {page.ctaPretitle}
                  </p>
                )}
                {page.ctaTitle && (
                  <h2 className="mt-1 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {page.ctaTitle}
                  </h2>
                )}
                {page.ctaDesc && (
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
                    {page.ctaDesc}
                  </p>
                )}
              </div>
              {page.ctaButton && (
                <Link
                  href={withTheme(page.ctaButton.href, theme)}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#141414] transition hover:bg-white/90"
                >
                  {page.ctaButton.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
