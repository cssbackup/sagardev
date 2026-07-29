"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
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
  const blogPosts = data.gallery.galleryItems.slice(0, 3);
  const blogLink = data.gallery.buttons?.[0];

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

  return (
    <div className="bg-white text-[#141414]">
      {/* Hero */}
      <section className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <RevealBlur>
            <Breadcrumb items={page.breadcrumb} theme={theme} className="mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.pretitle || "About us"}
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
              {page.ctaButton?.label || "Contact us"}
              <FaArrowRight className="text-xs" />
            </Link>
          </RevealBlur>

          <RevealBlur delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed]">
              <MediaImage
                src={heroImage}
                alt={page.sideImageTitle || page.title}
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

      {/* Story / philosophy */}
      <section className="border-t border-[#141414]/10 bg-[#faf9f7] px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <RevealBlur>
            <div className="relative aspect-[16/11] overflow-hidden bg-[#eeeae4]">
              <MediaImage
                src={storyImage}
                alt={about.backgroundImageTitle || page.storyLabel || "Our story"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                themeId={theme}
              />
            </div>
          </RevealBlur>

          <RevealBlur delay={0.06}>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.storyLabel || page.subtitle || "Our approach"}
            </p>
            <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
              {page.philosophyTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/55 md:text-base">
              {page.philosophyDesc}
            </p>
          </RevealBlur>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="bg-white px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Stagger className="grid grid-cols-2 gap-8 border-y border-[#141414]/10 py-10 lg:grid-cols-4 lg:gap-10">
              {stats.map((item) => (
                <StaggerItem key={item.title} className="text-center lg:text-left">
                  <p className="text-[2rem] font-bold tracking-tight text-[var(--reroom-accent,#ff6b00)] md:text-[2.35rem]">
                    {item.stat}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-snug">
                    {item.title}
                  </p>
                  {item.desc && (
                    <p className="mt-1.5 text-sm text-[#141414]/50 line-clamp-2">
                      {item.desc}
                    </p>
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Mission */}
      {(page.missionTitle || missionPoints.length > 0) && (
        <section className="bg-[#141414] px-4 py-12 text-white md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {page.missionPretitle || "Our mission"}
              </p>
              <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                {page.missionTitle}
              </h2>
              {page.missionDesc && (
                <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
                  {page.missionDesc}
                </p>
              )}
            </RevealBlur>

            {missionPoints.length > 0 && (
              <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
                {missionPoints.map((point, i) => (
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
            )}

            {page.missionButton && (
              <Link
                href={withTheme(page.missionButton.href || "/mission", theme)}
                className="mt-10 inline-flex items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {page.missionButton.label || "Learn more"}
                <FaArrowRight className="text-xs" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {quotes.length > 0 && (
        <section className="bg-white px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="mb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {data.testimonial.pretitle || "Clients"}
              </p>
              <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                {data.testimonial.title || "What people say"}
              </h2>
            </RevealBlur>

            <div className="grid gap-6 md:grid-cols-3">
              {quotes.map((item) => (
                <article
                  key={item.name}
                  className="flex h-full flex-col border border-[#141414]/10 bg-[#faf9f7] p-6"
                >
                  <p className="text-sm leading-relaxed text-[#141414]/65">
                    “{item.quote}”
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-[#eeeae4]">
                      <MediaImage
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="44px"
                        themeId={theme}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-[#141414]/45">{item.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog preview */}
      {blogPosts.length > 0 && (
        <section className="border-t border-[#141414]/10 bg-[#faf9f7] px-4 py-12 md:px-8 md:py-14 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                  {data.gallery.pretitle || "Blog"}
                </p>
                <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
                  {data.gallery.title}
                </h2>
                {data.gallery.desc && (
                  <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                    {data.gallery.desc}
                  </p>
                )}
              </div>
              <Link
                href={withTheme(blogLink?.href || "/blog", theme)}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)] transition hover:brightness-110"
              >
                View blogs
                <FaArrowRight className="text-xs" />
              </Link>
            </RevealBlur>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((item) => (
                <article key={item.title} className="group">
                  <Link
                    href={withTheme(item.href || "/blog", theme)}
                    className="block"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#eeeae4]">
                      <MediaImage
                        src={item.image}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        themeId={theme}
                      />
                    </div>
                    <div className="mt-4">
                      {item.date && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
                          {item.date}
                        </p>
                      )}
                      <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-[var(--reroom-accent,#ff6b00)]">
                        {item.title}
                      </h3>
                      {item.alt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/50">
                          {item.alt}
                        </p>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 pb-14 md:px-8 md:pb-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-[#141414]/10 bg-[#faf9f7] px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.ctaPretitle || "Next step"}
            </p>
            <h2 className="mt-2 text-[1.5rem] font-bold tracking-[-0.02em] md:text-[1.85rem]">
              {page.ctaTitle || "Ready to talk?"}
            </h2>
            {page.ctaDesc && (
              <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                {page.ctaDesc}
              </p>
            )}
          </div>
          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center gap-2 bg-[#141414] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--reroom-accent,#ff6b00)]"
          >
            {page.ctaButton?.label || "Contact us"}
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
}
