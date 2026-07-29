"use client";

import MediaImage from "@/components/MediaImage";
import Carousel from "@/themes/template-1/components/Carousel";
import type { ResolvedSiteData } from "@/lib/types";

export default function Team({ data }: { data: ResolvedSiteData }) {
  const { team } = data;
  const people = team.teamItems;

  if (people.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          {team.pretitle && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {team.pretitle}
            </p>
          )}
          <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
            {team.title}
          </h2>
          {team.desc && (
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {team.desc}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <Carousel density="compact">
          {people.map((person) => (
            <article key={person.name} className="text-center">
              <div className="relative mx-auto aspect-square max-w-[220px] overflow-hidden rounded-2xl bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#141414]">{person.name}</h3>
              <p className="mt-1 text-xs font-medium text-[#c44536]">{person.role}</p>
              {person.bio && (
                <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#141414]/60 line-clamp-3">
                  {person.bio}
                </p>
              )}
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
