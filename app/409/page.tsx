import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import { getThemePack } from "@/themes";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

const CONFLICT_INFO = {
  code: "409",
  title: "Conflict",
  description:
    "The request could not be completed due to a conflict with the current state of the resource.",
  cta: "Go Home",
};

export default async function ConflictPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);
  const pack = getThemePack(theme);
  const { Header, Footer, pages } = pack;
  const ErrorPage = pages.Error;

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} variant="solid" />
      <main>
        <ErrorPage theme={theme} info={CONFLICT_INFO} />
      </main>
      <Footer data={data} />
    </div>
  );
}
