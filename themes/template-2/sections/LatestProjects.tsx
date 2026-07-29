"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

/** Staggered masonry — not t1 project carousel */
export default function LatestProjects({ data }: { data: ResolvedSiteData }) {
  const section = data.latestProjects;
  const items = section.projectItems;
  const cta = section.button;

  if (items.length === 0) return null;

  return (
    <section className="bg-white px-5 py-16 text-[#0e0e0e] md:px-10 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="mb-12 max-w-xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--reroom-accent,#ff6b00)]">
            {section.pretitle}
          </p>
          <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold tracking-[-0.03em]">
            {section.title}
          </h2>
          {section.desc && (
            <p className="mt-4 text-sm leading-relaxed text-[#0e0e0e]/50">
              {section.desc}
            </p>
          )}
        </RevealBlur>

        <Stagger className="columns-1 gap-4 sm:columns-2 lg:gap-5">
          {items.map((item, i) => (
            <StaggerItem key={`${item.title}-${i}`} className="mb-4 break-inside-avoid lg:mb-5">
              <Link
                href={withTheme(item.href || cta?.href || "/gallery", THEME)}
                className="group block"
              >
                <div
                  className={`relative overflow-hidden bg-[#ececec] ${
                    i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[16/10]"
                  }`}
                >
                  <MediaImage
                    themeId={THEME}
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {item.status && (
                    <span className="absolute left-0 top-0 bg-[#0e0e0e] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                      {item.status}
                    </span>
                  )}
                </div>
                <div className="pt-4">
                  {item.location && (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--reroom-accent,#ff6b00)]">
                      {item.location}
                    </p>
                  )}
                  <h3 className="mt-1 text-lg font-semibold transition group-hover:text-[var(--reroom-accent,#ff6b00)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#0e0e0e]/50">{item.desc}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {cta && (
          <div className="mt-10">
            <Link
              href={withTheme(cta.href, THEME)}
              className="inline-flex items-center gap-2 border border-[#0e0e0e] px-6 py-3 text-sm font-semibold transition hover:bg-[#0e0e0e] hover:text-white"
            >
              {cta.label}
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
