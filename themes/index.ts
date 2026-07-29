import type { ThemeId } from "@/lib/types";
import { template1Pack, type ThemePack } from "@/themes/template-1/registry";
import { template2Pack } from "@/themes/template-2/registry";
import { template3Pack } from "@/themes/template-3/registry";

/**
 * Theme registry — each template owns its Home, Header, Footer, and pages.
 */
export const themePacks: Record<ThemeId, ThemePack> = {
  "template-1": template1Pack,
  "template-2": template2Pack,
  "template-3": template3Pack,
};

export function getThemePack(theme: ThemeId): ThemePack {
  return themePacks[theme] ?? themePacks["template-1"];
}

export { themeMap } from "@/themes/themeMap";
