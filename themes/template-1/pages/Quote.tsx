"use client";

import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import LeadFormPage from "@/themes/template-1/pages/LeadFormPage";

export default function QuotePage({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  return <LeadFormPage data={data} theme={theme} page={data.quotePage} />;
}
