"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBuilding,
  FaHandshake,
  FaHouse,
  FaKey,
} from "react-icons/fa6";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;
const icons = [FaHouse, FaHandshake, FaKey, FaBuilding];

/** Home services strip — property highlights / about promise (not Why Choose Us). */
export default function Services({ data }: { data: ResolvedSiteData }) {
  const { about, properties } = data;
  const features = (properties.highlights ?? []).slice(0, 4);
  const cta = about.buttons?.[0] || properties.buttons?.[0];

  const items =
    features.length > 0
      ? features.map((f) => ({
          title: f.label,
          desc: f.value,
        }))
      : [
          {
            title: about.philosophyTitle || "Our promise",
            desc: about.philosophyDesc || about.desc,
          },
        ];

  return (
    <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
            {about.pretitle || "What we offer"}
          </p>
          <h2 className="t3-serif mt-2.5 text-2xl font-bold text-[#0b1f33] md:text-3xl">
            {about.philosophyTitle || about.subtitle || "Our promise"}
          </h2>
          {(about.philosophyDesc || about.desc) && (
            <p className="mt-3 text-sm leading-relaxed text-[#5b6572] md:text-base">
              {about.philosophyDesc || about.desc}
            </p>
          )}
        </RevealBlur>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={`${item.title}-${i}`}>
                <article className="group h-full rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-5 transition hover:border-[var(--snifty-red,#e11d2e)]/30 hover:bg-white hover:shadow-[0_12px_32px_rgba(225,29,46,0.1)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--snifty-red,#e11d2e)]/10 text-[var(--snifty-red,#e11d2e)]">
                    <Icon className="text-base" />
                  </span>
                  <h3 className="t3-serif mt-4 text-base font-bold text-[#0b1f33]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5b6572]">
                    {item.desc}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {cta && (
          <div className="mt-7 text-center">
            <Link
              href={withTheme(cta.href || "/services", THEME)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--snifty-red,#e11d2e)] transition hover:gap-3"
            >
              {cta.label || "View services"}
              <FaArrowRight className="text-[11px]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
