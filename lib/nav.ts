import type { LinkItem } from "@/lib/types";

/** Flatten dropdown parents into leaf links (footer, compact navs). */
export function flattenMenuLinks(menu: LinkItem[]): LinkItem[] {
  return menu.flatMap((item) =>
    item.children && item.children.length > 0 ? item.children : [item]
  );
}
