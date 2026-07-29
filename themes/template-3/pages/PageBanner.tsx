import type { LinkItem, ThemeId } from "@/lib/types";
import { getThemeUI } from "@/lib/themeUI";
import Breadcrumb from "@/components/Breadcrumb";

const titleClass: Record<ThemeId, string> = {
  "template-1": "mt-2 text-3xl font-semibold text-white md:text-4xl lg:text-5xl",
  "template-2": "mt-2 text-3xl font-semibold text-white md:text-4xl lg:text-5xl",
  "template-3":
    "t3-serif mt-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl",
};

const eyebrowClass: Record<ThemeId, string> = {
  "template-1": "text-xs font-semibold uppercase tracking-[0.22em] text-[#c44536]",
  "template-2": "text-xs font-semibold uppercase tracking-[0.22em] text-[#ff6b00]",
  "template-3":
    "text-xs font-semibold uppercase tracking-[0.22em] text-[var(--snifty-red,#e11d2e)]",
};

export default function PageBanner({
  theme,
  title,
  eyebrow,
  breadcrumb,
}: {
  theme: ThemeId;
  title: string;
  eyebrow?: string;
  breadcrumb?: LinkItem[];
}) {
  const ui = getThemeUI(theme);

  return (
    <section className={ui.banner}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <Breadcrumb items={breadcrumb} theme={theme} variant="light" />
        {eyebrow && (
          <p className={`${breadcrumb?.length ? "mt-4" : ""} ${eyebrowClass[theme]}`}>
            {eyebrow}
          </p>
        )}
        <h1 className={titleClass[theme]}>{title}</h1>
      </div>
    </section>
  );
}
