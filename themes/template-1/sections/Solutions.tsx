import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight, FaHome, FaKey } from "react-icons/fa";

const THEME = "template-1" as const;
const ICONS = [FaHome, FaKey];

export default function Solutions({ data }: { data: ResolvedSiteData }) {
  const { about, formDetail } = data;
  const primaryCta = about.buttons[0];

  const cards = [
    {
      step: "01",
      eyebrow: about.pretitle,
      title: about.philosophyTitle,
      desc: about.philosophyDesc,
      image: about.backgroundImage,
      href: primaryCta?.href || "/contact",
      cta: primaryCta?.label || formDetail.formSubmitLabel,
    },
    {
      step: "02",
      eyebrow: formDetail.pretitle,
      title: formDetail.title,
      desc: formDetail.desc,
      image: formDetail.backgroundImage,
      href: primaryCta?.href || "/contact",
      cta: formDetail.formSubmitLabel,
    },
  ].filter((card) => card.title && card.image);

  if (cards.length === 0) return null;

  return (
    <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          {about.pretitle && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {about.pretitle}
            </p>
          )}
          {about.subtitle && (
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {about.subtitle}
            </h2>
          )}
        </div>

        <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
          {cards.map((card, index) => {
            const Icon = ICONS[index % ICONS.length];
            const reverse = index % 2 === 1;

            return (
              <Link
                key={`${card.eyebrow}-${card.title}`}
                href={withTheme(card.href === "#" ? "/contact" : card.href, THEME)}
                className={`group grid overflow-hidden rounded-[1.25rem] border border-[#141414]/8 bg-[#faf8f4] transition duration-500 hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)] md:rounded-[1.5rem] md:grid-cols-2 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[320px] lg:min-h-[360px]">
                  <MediaImage
                    themeId={data.themeId}
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute left-5 top-5 bg-white/95 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#141414] shadow-sm md:left-6 md:top-6">
                    {card.step}
                  </span>
                </div>

                <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 lg:px-12">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#141414]/12 text-[#c44536] transition group-hover:border-[#c44536]/40">
                    <Icon className="text-base" aria-hidden />
                  </div>

                  {card.eyebrow && (
                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c44536]">
                      {card.eyebrow}
                    </p>
                  )}
                  <h3 className="mt-3 max-w-md text-2xl font-semibold leading-snug text-[#141414] md:text-[1.85rem] lg:text-[2rem]">
                    {card.title}
                  </h3>
                  {card.desc && (
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-[#141414]/65 md:text-[0.95rem]">
                      {card.desc}
                    </p>
                  )}

                  {card.cta && (
                    <span className="mt-8 inline-flex w-fit items-center gap-3 text-sm font-medium text-[#141414]">
                      <span className="bg-[#141414] px-5 py-2.5 text-white transition group-hover:bg-[#c44536]">
                        {card.cta}
                      </span>
                      <FaArrowRight className="text-xs transition duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
