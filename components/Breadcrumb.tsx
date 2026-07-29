import Link from "next/link";
import { withTheme } from "@/lib/theme";
import type { LinkItem, ThemeId } from "@/lib/types";

export default function Breadcrumb({
  items,
  theme,
  variant = "dark",
  className = "",
}: {
  items?: LinkItem[];
  theme: ThemeId;
  /** dark = on white pages; light = on dark banners */
  variant?: "dark" | "light";
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  const isT2 = theme === "template-2";
  const muted = variant === "light" ? "text-white/50" : "text-[#141414]/45";
  const link =
    variant === "light"
      ? "text-white/70 hover:text-white"
      : isT2
        ? "text-[#141414]/55 hover:text-[var(--reroom-accent,#ff6b00)]"
        : "text-[#141414]/55 hover:text-[#141414]";
  const current =
    variant === "light"
      ? "text-white"
      : isT2
        ? "text-[var(--reroom-accent,#ff6b00)]"
        : "text-[#141414]";
  const sep = variant === "light" ? "text-white/35" : "text-[#141414]/25";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs font-medium tracking-[0.04em] ${muted} ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${item.href}-${i}`}
              className="inline-flex items-center gap-2"
            >
              {i > 0 && (
                <span className={sep} aria-hidden>
                  /
                </span>
              )}
              {isLast ? (
                <span className={current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={withTheme(item.href, theme)}
                  className={`transition ${link}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
