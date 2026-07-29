import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { LegalPageData, ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";

export default function LegalPageContent({
  data,
  theme,
  page,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
  page: LegalPageData;
}) {
  const contact = data.footer.footerContact;
  const cta = data.contactPage;
  const aboutCta = data.aboutPage.ctaButton;

  return (
    <div className="bg-white">
      <section className="border-b border-[#141414]/10 px-4 pb-7 pt-8 md:px-8 md:pb-8 md:pt-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Breadcrumb items={page.breadcrumb} theme={theme} />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
            {page.pretitle}
          </p>
          <h1 className="mt-4 text-[2rem] font-semibold sm:text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem]">
            {page.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#141414]/70 md:text-lg">
            {page.desc}
          </p>
          {page.updatedAt && (
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[#141414]/45">
              {page.updatedAt}
            </p>
          )}
        </div>
      </section>

      <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-10">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="border-b border-[#141414]/8 pb-10 last:border-b-0 last:pb-0"
            >
              <h2 className="text-xl font-semibold text-[#141414] md:text-2xl">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {section.desc}
              </p>
            </article>
          ))}

          <div className="rounded-[1.25rem] border border-[#141414]/8 bg-[#faf8f4] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {cta.pretitle}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#141414]">{cta.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#141414]/65">
              {contact.email} · {contact.phone} · {contact.location}
            </p>
            <Link
              href={withTheme(aboutCta?.href || "/contact", theme)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              {aboutCta?.label || cta.formSubmitLabel}
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
