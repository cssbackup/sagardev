import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import { getThemePack } from "@/themes";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function QuoteRoutePage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);
  const pack = getThemePack(theme);
  const { Header, Footer, pages } = pack;
  const Quote = pages.Quote;
  if (!Quote) notFound();

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} variant="solid" />
      <main>
        <Quote data={data} theme={theme} />
      </main>
      <Footer data={data} />
    </div>
  );
}
