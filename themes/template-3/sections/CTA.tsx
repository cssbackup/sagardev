"use client";

import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

export default function CTA({ data }: { data: ResolvedSiteData }) {
  const { about, banner, properties } = data;
  const button = about.buttons?.[0] || banner.buttons?.[0];
  const image =
    about.sideImage ||
    properties.listings?.[1]?.image ||
    banner.bannerSlides?.[1]?.image ||
    "";

  return (
    <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[var(--snifty-navy,#0b1f33)]">
        <div className="grid items-center md:grid-cols-[1.2fr_1fr]">
          <RevealBlur className="px-6 py-8 md:px-10 md:py-10 lg:px-14">
            <h2 className="t3-serif max-w-md text-2xl font-bold text-white md:text-3xl">
              {about.subtitle || about.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              {about.desc2 || about.desc}
            </p>
            {button && (
              <Link
                href={withTheme(button.href || "/contact", THEME)}
                className="mt-6 inline-flex rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                {button.label}
              </Link>
            )}
          </RevealBlur>

          {image && (
            <div className="relative min-h-[220px] md:min-h-[320px]">
              <MediaImage
                src={image}
                alt={about.sideImageTitle || about.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                themeId={THEME}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
