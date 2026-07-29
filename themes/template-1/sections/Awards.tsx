import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

export function TitleWithAccent({ title }: { title: string }) {
  const match = title.match(/^(.*?\bacross\s+)(.+)$/i);
  if (!match) return <>{title}</>;
  return (
    <>
      {match[1]}
      <span className="text-[#c44536]">{match[2]}</span>
    </>
  );
}

/** Homepage awards — badge + short label, no duplicate detail lists */
export default function Awards({ data }: { data: ResolvedSiteData }) {
  const page = data.awardsPage;
  const awards = page?.awardItems ?? [];

  if (!page || awards.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] px-4 py-8 md:px-8 md:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {page.pretitle && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c44536]">
              {page.pretitle}
            </p>
          )}
          <h2 className="mt-3 max-w-[22ch] text-[1.6rem] font-semibold leading-snug tracking-[-0.01em] text-[#141414] md:max-w-none md:text-[2rem]">
            <TitleWithAccent title={page.title} />
          </h2>
          {page.desc && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#141414]/60 md:text-base">
              {page.desc}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 md:gap-4 lg:grid-cols-5">
          {awards.map((award) => (
            <article
              key={`${award.year}-${award.title}`}
              className="flex flex-col items-center rounded-2xl border border-[#141414]/8 bg-white px-3 py-5 text-center transition hover:border-[#141414]/15 hover:shadow-[0_14px_30px_rgba(20,20,20,0.06)]"
            >
              <div className="relative h-16 w-14 md:h-16 md:w-16">
                <MediaImage
                  themeId={data.themeId}
                  src={award.image}
                  alt={`${award.title} — ${award.org}`}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c44536]">
                {award.year}
              </p>
              <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-[#141414] md:text-sm">
                {award.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-[11px] text-[#141414]/45">
                {award.org}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
          <Link
            href={withTheme("/awards", THEME)}
            className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#141414]/90"
          >
            View all awards
            <FaArrowRight className="text-[10px]" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
