"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/themes/template-1/sections/FAQ";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { TitleWithAccent } from "@/themes/template-1/sections/Awards";

const HIGHLIGHTS = [
  {
    title: "Verified listings first",
    desc: "Every shortlist we share is checked for ownership, pricing context, and visit readiness.",
  },
  {
    title: "Transparent advice",
    desc: "We compare corridors, amenities, and long-term value — not just the loudest brochure.",
  },
  {
    title: "Present till keys",
    desc: "From first enquiry to handover, advisors stay reachable with clear next steps.",
  },
];

export default function Awards({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.awardsPage;
  const awards = page.awardItems;
  const years = useMemo(
    () =>
      Array.from(new Set(awards.map((a) => a.year))).sort(
        (a, b) => Number(b) - Number(a)
      ),
    [awards]
  );
  const [activeYear, setActiveYear] = useState("All");

  const filtered = useMemo(() => {
    if (activeYear === "All") return awards;
    return awards.filter((a) => a.year === activeYear);
  }, [awards, activeYear]);

  const cta = data.aboutPage.ctaButton;
  const yearSpan =
    years.length > 1
      ? `${years[years.length - 1]} – ${years[0]}`
      : years[0] || "—";

  return (
    <div className="bg-white">
      <section className="border-b border-[#141414]/10 bg-[#faf8f4] px-4 pb-10 pt-8 md:px-8 md:pb-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={page.breadcrumb} theme={theme} />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c44536]">
              {page.pretitle}
            </p>
            <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141414] md:text-[3.1rem]">
              <TitleWithAccent title={page.title} />
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#141414]/65 md:text-lg">
              {page.desc}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:mx-auto sm:max-w-xl sm:grid-cols-3">
              {[
                { value: `${awards.length}+`, label: "Awards" },
                { value: `${years.length}`, label: "Years" },
                { value: yearSpan, label: "Timeline" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#141414]/10 bg-white px-3 py-4"
                >
                  <p className="break-words text-lg font-semibold tracking-tight text-[#141414] sm:text-xl md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#141414]/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c44536]">
                Our honors
              </p>
              <h2 className="mt-3 text-[1.75rem] font-semibold leading-snug text-[#141414] md:text-[2.25rem]">
                Awards that mark how we work
              </h2>
            </div>

            {years.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {["All", ...years].map((year) => {
                  const active = activeYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setActiveYear(year)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-[#141414] text-white"
                          : "border border-[#141414]/15 text-[#141414] hover:border-[#141414]/30"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-12 text-center text-sm text-[#141414]/55">
              No awards for this year.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((award) => (
                <article
                  key={`${award.year}-${award.title}`}
                  className="flex h-full flex-col rounded-2xl border border-[#141414]/10 bg-[#faf8f4] p-5 transition hover:border-[#141414]/18 hover:bg-white hover:shadow-[0_18px_40px_rgba(20,20,20,0.06)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative h-20 w-16 shrink-0">
                      <MediaImage
                        themeId={theme}
                        src={award.image}
                        alt={`${award.title} — ${award.org}`}
                        fill
                        className="object-contain"
                        sizes="72px"
                      />
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#c44536]">
                      {award.year}
                    </span>
                  </div>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/45">
                    {award.org}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-[#141414]">
                    {award.title}
                  </h3>
                  {award.desc && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#141414]/65">
                      {award.desc}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[#141414]/10 bg-[#141414] px-4 py-10 text-white md:px-8 md:py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c44536]">
                Why it matters
              </p>
              <h2 className="mt-3 max-w-md text-[1.75rem] font-semibold leading-snug md:text-[2.25rem]">
                Recognition that reflects how we work every day
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                Awards are a snapshot. The real measure is the clarity buyers and
                sellers feel from the first shortlist to the key handover.
              </p>
            </div>

            <ul className="space-y-6">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 border-t border-white/15 pt-6 first:border-t-0 first:pt-0"
                >
                  <FaCheckCircle
                    className="mt-1 shrink-0 text-[#c44536]"
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t border-[#141414]/8">
        <FAQ data={data} />
      </div>
    </div>
  );
}
