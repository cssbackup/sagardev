import { resolveSiteData } from "@/lib/data";
import { getThemePack } from "@/themes";

const NOT_FOUND_INFO = {
  code: "404",
  title: "Not Found",
  description: "Page not found",
  cta: "Go Home",
};

export default function NotFound() {
  const data = resolveSiteData();
  const theme = data.themeId;
  const pack = getThemePack(theme);
  const { Header, Footer, pages } = pack;
  const ErrorPage = pages.Error;

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} />
      <ErrorPage theme={theme} info={NOT_FOUND_INFO} />
      <Footer data={data} />
    </div>
  );
}
