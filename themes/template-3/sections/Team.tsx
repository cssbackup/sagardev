"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, TeamItem } from "@/lib/types";

const THEME = "template-3" as const;

function AgentCard({ person }: { person: TeamItem }) {
  return (
    <article
      data-slide
      className="group w-[78vw] max-w-[270px] shrink-0 snap-start sm:w-[240px] md:w-[250px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#eef1f5]">
        <MediaImage
          themeId={THEME}
          src={person.image}
          alt={person.name}
          fill
          className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
          sizes="270px"
        />
      </div>
      <div className="mt-3 text-left">
        <h3 className="t3-serif text-base font-bold text-[#0b1f33] md:text-lg">
          {person.name}
        </h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--snifty-red,#e11d2e)]">
          {person.role}
        </p>
        {person.bio && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5b6572]">
            {person.bio}
          </p>
        )}
      </div>
    </article>
  );
}

/** Meet Our Agents — portrait slider */
export default function Team({ data }: { data: ResolvedSiteData }) {
  const { team } = data;
  const people = team.teamItems;
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const step = slide ? slide.offsetWidth + 16 : 270;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  if (people.length === 0) return null;

  return (
    <section className="bg-[#f7f8fa] px-4 py-7 text-[#0b1f33] md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl text-left">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              {team.pretitle === "Team" ? "Meet our agents" : team.pretitle}
            </p>
            <h2 className="t3-serif mt-2.5 text-2xl font-bold md:text-3xl lg:text-[2.15rem]">
              {team.title === "Our people"
                ? "Advisors you can rely on"
                : team.title}
            </h2>
            {team.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#5b6572] md:text-base">
                {team.desc}
              </p>
            )}
          </div>

          <Link
            href={withTheme("/contact", THEME)}
            className="inline-flex w-fit items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Talk to an agent
            <FaArrowRight className="text-[10px]" />
          </Link>
        </RevealBlur>

        <div className="relative mt-8">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {people.map((person) => (
              <AgentCard key={person.name} person={person} />
            ))}
          </div>

          {people.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous agents"
                onClick={() => scroll(-1)}
                className="absolute left-2 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.28)] transition hover:bg-[var(--snifty-red,#e11d2e)] md:left-3"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                type="button"
                aria-label="Next agents"
                onClick={() => scroll(1)}
                className="absolute right-2 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-white shadow-[0_8px_20px_rgba(11,31,51,0.28)] transition hover:bg-[var(--snifty-red,#e11d2e)] md:right-3"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
