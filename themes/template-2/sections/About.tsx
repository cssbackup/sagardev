"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

/** Clean split about — image + story + stats */
export default function About({ data }: { data: ResolvedSiteData }) {
  const { about, whyChooseUs, aboutPage } = data;
  const cta = about.buttons?.[0];
  const stats = whyChooseUs.whyChooseUsItems.slice(0, 4);
  const heading = about.title || aboutPage.title || "About us";
  const pretitle = about.pretitle || aboutPage.pretitle || "About";

  return (
    <section className="bg-white px-4 py-14 text-[#141414] md:px-8 md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <RevealBlur className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ed] sm:aspect-[5/6]">
            <MediaImage
              src={about.sideImage || about.backgroundImage}
              alt={about.sideImageTitle || about.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              themeId={THEME}
            />
          </div>
          {about.subtitle && (
            <p className="absolute bottom-0 left-0 max-w-[85%] bg-[var(--reroom-accent,#ff6b00)] px-5 py-3 text-sm font-bold text-white md:px-6 md:py-4">
              {about.subtitle}
            </p>
          )}
        </RevealBlur>

        <div>
          <RevealBlur>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {pretitle}
            </p>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
              {heading}
            </h2>
            <span className="mt-4 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)]" />
            <p className="mt-5 text-sm leading-relaxed text-[#141414]/55 md:text-[0.95rem]">
              {about.desc}
            </p>
            {about.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/55 md:text-[0.95rem]">
                {about.desc2}
              </p>
            )}
            {cta && (
              <Link
                href={withTheme(cta.href || "/about", THEME)}
                className="mt-7 inline-flex items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                {cta.label}
                <FaArrowRight className="text-xs" />
              </Link>
            )}
          </RevealBlur>

          {stats.length > 0 && (
            <Stagger className="mt-10 grid grid-cols-2 gap-6 border-t border-[#141414]/10 pt-8">
              {stats.map((item) => (
                <StaggerItem key={item.title}>
                  <p className="text-2xl font-bold tracking-tight text-[var(--reroom-accent,#ff6b00)] md:text-[1.75rem]">
                    {item.stat}
                  </p>
                  <p className="mt-1.5 text-sm font-bold leading-snug">
                    {item.title}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </section>
  );
}
