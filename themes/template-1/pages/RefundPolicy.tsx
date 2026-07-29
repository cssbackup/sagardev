import Legal from "@/themes/template-1/pages/Legal";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function RefundPolicy({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  return <Legal data={data} theme={theme} page={data.refundPolicyPage} />;
}
