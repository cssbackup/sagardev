import Legal from "@/themes/template-2/pages/Legal";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Terms({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  return <Legal data={data} theme={theme} page={data.termsPage} />;
}
