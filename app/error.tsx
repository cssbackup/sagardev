"use client";

import { resolveSiteData } from "@/lib/data";
import { getThemePack } from "@/themes";

const SERVER_ERROR_INFO = {
  code: "500",
  title: "Server Error",
  description: "Something went wrong on our end. Please try again.",
  cta: "Go Home",
};

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const data = resolveSiteData();
  const theme = data.themeId;
  const pack = getThemePack(theme);
  const { Header, Footer, pages } = pack;
  const ErrorPage = pages.Error;

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} />
      <ErrorPage theme={theme} info={SERVER_ERROR_INFO} onRetry={reset} />
      <Footer data={data} />
    </div>
  );
}
