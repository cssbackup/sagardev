"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, TeamItem } from "@/lib/types";

const THEME = "template-2" as const;

function TeamCard({ person }: { person: TeamItem }) {
  return (
    <article
      data-slide
      className="group w-[72vw] max-w-[260px] shrink-0 snap-start sm:w-[240px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e6e1]">
        <MediaImage
          themeId={THEME}
          src={person.image}
          alt={person.name}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          sizes="260px"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold leading-snug">{person.name}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--reroom-accent,#ff6b00)]">
          {person.role}
        </p>
        {person.bio && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/55">
            {person.bio}
          </p>
        )}
      </div>
    </article>
  );
}

/** Manual snap slider — same approach as template-1 */
export default function Team({ data }: { data: ResolvedSiteData }) {
  const { team } = data;
  const people = team.teamItems;
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.7;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (people.length === 0) return null;

  return (
    <section className="bg-[#faf9f7] py-12 text-[#141414] md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {team.pretitle && (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {team.pretitle}
              </p>
            )}
            <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.02em] md:text-[2rem]">
              {team.title}
            </h2>
            <span className="mt-3 block h-[3px] w-8 bg-[var(--reroom-accent,#ff6b00)]" />
            {team.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                {team.desc}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous team members"
              onClick={() => scrollBySlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next team members"
              onClick={() => scrollBySlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowRight className="text-xs" />
            </button>
            <Link
              href={withTheme("/about", THEME)}
              className="ml-1 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
            >
              About us
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </RevealBlur>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {people.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
