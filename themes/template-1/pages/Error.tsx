import Link from "next/link";
import type { ThemeId } from "@/lib/types";
import { withTheme } from "@/lib/theme";
import { getThemeUI } from "@/lib/themeUI";

type ErrorInfo = {
  code: string;
  title: string;
  description: string;
  cta: string;
};

export default function ErrorContent({
  theme,
  info,
  onRetry,
}: {
  theme: ThemeId;
  info: ErrorInfo;
  onRetry?: () => void;
}) {
  const ui = getThemeUI(theme);

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-[#faf8f4] px-4 py-16 md:py-20">
      <div className="max-w-lg text-center">
        <p className={`text-7xl font-extrabold md:text-8xl ${ui.accent}`}>{info.code}</p>
        <h1 className={`mt-4 text-3xl font-bold md:text-4xl ${ui.title}`}>{info.title}</h1>
        <p className={`mt-4 text-sm leading-relaxed md:text-base ${ui.muted}`}>{info.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={withTheme("/", theme)}
            className={`inline-flex px-6 py-3 text-sm font-semibold transition ${ui.btn}`}
          >
            {info.cta}
          </Link>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={`inline-flex px-6 py-3 text-sm font-semibold transition ${ui.btnSecondary}`}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
