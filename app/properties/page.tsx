import { Suspense } from "react";
import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import { getThemePack } from "@/themes";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);
  const pack = getThemePack(theme);
  const { Header, Footer, pages } = pack;
  const Properties = pages.Properties;

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} variant="solid" />
      <main>
        <Suspense
          fallback={
            <div className="px-4 py-16 text-sm text-[#141414]/55">Loading listings…</div>
          }
        >
          <Properties data={data} theme={theme} />
        </Suspense>
      </main>
      <Footer data={data} />
    </div>
  );
}
