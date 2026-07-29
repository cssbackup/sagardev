import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function SitemapPage({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.sitemapPage;

  return (
    <div className="bg-white">
      <section className="border-b border-[#141414]/10 px-4 pb-7 pt-8 md:px-8 md:pb-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Breadcrumb items={page.breadcrumb} theme={theme} />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {page.pretitle}
          </p>
          <h1 className="mt-4 text-[2rem] font-semibold sm:text-[2.5rem] leading-tight text-[#141414] md:text-[3.2rem]">
            {page.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#141414]/65">{page.desc}</p>
        </div>
      </section>

      <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {page.groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}-${link.label}`}>
                    <Link
                      href={withTheme(link.href, theme)}
                      className="text-sm text-[#141414]/75 transition hover:text-[#141414] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
