import type { ReactNode } from "react";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { getThemePack } from "@/themes";

type Props = {
  theme: ThemeId;
  data: ResolvedSiteData;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  showBanner?: boolean;
};

/** Thin shared shell that delegates Header/Footer/Banner to the active theme pack */
export default function PageShell({
  theme,
  data,
  title,
  eyebrow,
  children,
  showBanner = true,
}: Props) {
  const pack = getThemePack(theme);
  const { Header, Footer, PageBanner } = pack;

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} variant="solid" />
      {showBanner && <PageBanner theme={theme} title={title} eyebrow={eyebrow} />}
      <main>{children}</main>
      <Footer data={data} />
    </div>
  );
}
