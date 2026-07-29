import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Csr({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.csrPage;
  return (
    <div className="bg-white px-4 py-7 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Breadcrumb items={page.breadcrumb} theme={theme} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c44536]">
          {page.pretitle}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-[#141414]/65">{page.desc}</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          {page.impactStats.map((s) => (
            <div key={s.label} className="rounded-xl bg-[#faf8f4] p-4 text-center">
              <p className="text-2xl font-bold text-[#c44536]">{s.stat}</p>
              <p className="mt-1 text-sm text-[#141414]/55">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 space-y-6">
          {page.programs.map((p) => (
            <article key={p.title}>
              <h2 className="text-lg font-semibold text-[#141414]">{p.title}</h2>
              <p className="mt-1 text-sm text-[#c44536]">{p.amount}</p>
              <p className="mt-2 text-sm text-[#141414]/65">{p.desc}</p>
            </article>
          ))}
        </div>
        <Link
          href={withTheme(page.donateCta.buttonHref, theme)}
          className="mt-10 inline-flex bg-[#141414] rounded-full px-6 py-3 text-sm font-semibold text-white"
        >
          {page.donateCta.buttonLabel}
        </Link>
      </div>
    </div>
  );
}
