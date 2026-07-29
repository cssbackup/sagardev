"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { LegalPageData, ResolvedSiteData, ThemeId } from "@/lib/types";

function LegalPage({
  data,
  theme,
  page,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
  page: LegalPageData;
}) {
  const contact = data.footer.footerContact;

  return (
    <div className="bg-white text-[#0b1f33]">
      <section className="bg-[var(--snifty-navy,#0b1f33)] px-4 py-7 text-white md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <RevealBlur>
            <Breadcrumb
              items={page.breadcrumb}
              theme={theme}
              variant="light"
              className="mb-6"
            />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
              {page.pretitle}
            </p>
            <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] md:text-[2.75rem]">
              {page.title}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc}
            </p>
            {page.updatedAt && (
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                Last updated · {page.updatedAt}
              </p>
            )}
          </RevealBlur>
        </div>
      </section>

      <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-4">
          {page.sections.map((section, i) => (
            <article
              key={section.title}
              className="rounded-xl border border-[#eef0f3] bg-white p-6 shadow-[0_8px_24px_rgba(11,31,51,0.04)] md:p-7"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="t3-serif mt-2 text-xl font-bold text-[#0b1f33] md:text-[1.35rem]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5b6572] md:text-base">
                {section.desc}
              </p>
            </article>
          ))}

          <div className="overflow-hidden rounded-2xl bg-[var(--snifty-navy,#0b1f33)] p-6 text-white md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              Questions?
            </p>
            <h3 className="t3-serif mt-2 text-2xl font-bold">Talk to our team</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Reach us at {contact.email} or {contact.phone}. Office:{" "}
              {contact.location}.
            </p>
            <Link
              href={withTheme("/contact", theme)}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Contact us
              <FaArrowRight className="text-[11px]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Privacy({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  return <LegalPage data={data} theme={theme} page={data.privacyPage} />;
}
