import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Awards({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.awardsPage;

  return (
    <div className="bg-white">
      <section className="px-4 pt-10 text-center md:px-8 md:pt-12 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={page.breadcrumb}
            theme={theme}
            className="mb-4 flex justify-center"
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff6b00]">
            {page.pretitle}
          </p>
          <h1 className="mt-3 text-[2.25rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
            {page.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#141414]/55 md:text-base">
            {page.desc}
          </p>
          <span className="mx-auto mt-5 block h-[3px] w-10 bg-[#ff6b00]" />
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {page.awardItems.map((award, i) => (
            <article
              key={`${award.title}-${award.year}`}
              className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#f3f1ed]">
                <MediaImage
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  themeId={theme}
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]">
                  {award.year} · {award.org}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#141414] md:text-[1.75rem]">
                  {award.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#141414]/55 md:text-base">
                  {award.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
