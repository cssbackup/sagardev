import { notFound } from "next/navigation";
import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import { getThemePack } from "@/themes";
import PropertyDetail from "@/themes/template-1/pages/PropertyDetail";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const theme = resolveTheme(query.theme);
  const category = resolveCategory(query.category);
  const data = resolveSiteData(theme, category);
  const pack = getThemePack(theme);
  const { Header, Footer } = pack;

  if (!slug) notFound();

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} variant="solid" />
      <main>
        <PropertyDetail data={data} theme={theme} slug={slug} />
      </main>
      <Footer data={data} />
    </div>
  );
}
