import type { ThemeId } from "@/lib/types";

/** Resolve a JSON image path — supports full URLs (Unsplash, Pinterest) or public paths */
export function resolveMediaPath(
  src: string,
  themeId?: ThemeId
): string {
  if (!src) return src;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  if (src.startsWith("/")) return src;

  if (themeId) {
    return `/themes/${themeId}/${src}`;
  }

  return `/${src}`;
}
