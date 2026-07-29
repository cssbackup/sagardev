"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBuilding,
  FaHandshake,
  FaHouse,
  FaKey,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;
const icons = [FaHouse, FaHandshake, FaKey, FaBuilding];

export default function WhyChooseUs({ data }: { data: ResolvedSiteData }) {
  const { whyChooseUs, about, properties } = data;
  const items = whyChooseUs.whyChooseUsItems.slice(0, 4);
  const bg =
    about.backgroundImage || properties.listings?.[0]?.image || "";
  const cta = about.buttons?.[0] || properties.buttons?.[0];

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Navy header band — compact, no empty tower of space */}
      <div className="relative bg-[var(--snifty-navy,#0b1f33)] px-4 pb-[4.5rem] pt-8 md:px-8 md:pb-20 md:pt-10 lg:px-10">
        {bg && (
          <div className="absolute inset-0 opacity-25">
            <MediaImage
              src={bg}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              themeId={THEME}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[var(--snifty-navy,#0b1f33)]/80" />

        <RevealBlur className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
            {whyChooseUs.pretitle}
          </p>
          <h2 className="t3-serif mt-2.5 text-2xl font-bold leading-snug text-white md:text-3xl lg:text-[2.15rem]">
            {whyChooseUs.title}
          </h2>
          {whyChooseUs.desc && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              {whyChooseUs.desc}
            </p>
          )}
        </RevealBlur>
      </div>

      {/* Cards overlap the navy / white edge */}
      <div className="relative z-10 -mt-14 px-4 pb-7 md:-mt-16 md:px-8 md:pb-8 lg:px-10">
        <Stagger className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={`${item.title}-${i}`}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#eef0f3] bg-white p-5 shadow-[0_12px_40px_rgba(11,31,51,0.1)] transition-shadow duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(225,29,46,0.28)] md:p-6">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-[var(--snifty-red,#e11d2e)] transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />

                  <div className="relative z-10 flex flex-1 flex-col">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[var(--snifty-red,#e11d2e)] text-[var(--snifty-red,#e11d2e)] transition-all duration-500 group-hover:border-white group-hover:text-white">
                      <Icon className="text-base" />
                    </span>
                    <h3 className="t3-serif mt-4 text-lg font-bold text-[#0b1f33] transition-colors duration-500 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5b6572] transition-colors duration-500 group-hover:text-white/85">
                      {item.desc}
                    </p>
                    <Link
                      href={withTheme(cta?.href || "/about", THEME)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--snifty-red,#e11d2e)] transition-all duration-500 group-hover:gap-3 group-hover:text-white"
                    >
                      Read More
                      <FaArrowRight className="text-[11px]" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
