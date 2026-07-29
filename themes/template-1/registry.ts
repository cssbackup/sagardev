import type { ComponentType } from "react";
import type { LinkItem, ResolvedSiteData, ThemeId } from "@/lib/types";
import { themeShellClass } from "@/lib/theme";
import Home from "@/themes/template-1";
import Header from "@/themes/template-1/Header";
import Footer from "@/themes/template-1/Footer";
import PageBanner from "@/themes/template-1/pages/PageBanner";
import About from "@/themes/template-1/pages/About";
import Contact from "@/themes/template-1/pages/Contact";
import Properties from "@/themes/template-1/pages/Properties";
import Blog from "@/themes/template-1/pages/Blog";
import Services from "@/themes/template-1/pages/Services";
import Privacy from "@/themes/template-1/pages/Privacy";
import Terms from "@/themes/template-1/pages/Terms";
import ErrorPage from "@/themes/template-1/pages/Error";
import Gallery from "@/themes/template-1/pages/Gallery";
import Awards from "@/themes/template-1/pages/Awards";
import Career from "@/themes/template-1/pages/Career";
import Csr from "@/themes/template-1/pages/Csr";
import Mission from "@/themes/template-1/pages/Mission";
import Buy from "@/themes/template-1/pages/Buy";
import Projects from "@/themes/template-1/pages/Projects";
import CookiePolicy from "@/themes/template-1/pages/CookiePolicy";
import RefundPolicy from "@/themes/template-1/pages/RefundPolicy";
import Sitemap from "@/themes/template-1/pages/Sitemap";

type HeaderProps = { data: ResolvedSiteData; variant?: "overlay" | "solid" };
type FooterProps = { data: ResolvedSiteData };
type PageProps = { data: ResolvedSiteData; theme: ThemeId };
type ErrorProps = {
  theme: ThemeId;
  info: { code: string; title: string; description: string; cta: string };
  onRetry?: () => void;
};

export type ThemePack = {
  id: ThemeId;
  shellClass: string;
  Home: ComponentType<{ data: ResolvedSiteData }>;
  Header: ComponentType<HeaderProps>;
  Footer: ComponentType<FooterProps>;
  PageBanner: ComponentType<{
    theme: ThemeId;
    title: string;
    eyebrow?: string;
    breadcrumb?: LinkItem[];
  }>;
  pages: {
    About: ComponentType<PageProps>;
    Contact: ComponentType<PageProps>;
    Properties: ComponentType<PageProps>;
    Blog: ComponentType<PageProps>;
    Services: ComponentType<PageProps>;
    Privacy: ComponentType<PageProps>;
    Terms: ComponentType<PageProps>;
    Error: ComponentType<ErrorProps>;
    Gallery?: ComponentType<PageProps>;
    Awards?: ComponentType<PageProps>;
    Career?: ComponentType<PageProps>;
    Csr?: ComponentType<PageProps>;
    Mission?: ComponentType<PageProps>;
    Buy?: ComponentType<PageProps>;
    Projects?: ComponentType<PageProps>;
    CookiePolicy?: ComponentType<PageProps>;
    RefundPolicy?: ComponentType<PageProps>;
    Sitemap?: ComponentType<PageProps>;
  };
};

/**
 * Template-1 pack — homepage + chrome + all inner pages.
 */
export const template1Pack: ThemePack = {
  id: "template-1",
  shellClass: themeShellClass["template-1"],
  Home,
  Header,
  Footer,
  PageBanner,
  pages: {
    About,
    Contact,
    Properties,
    Blog,
    Services,
    Privacy,
    Terms,
    Error: ErrorPage,
    Gallery,
    Awards,
    Career,
    Csr,
    Mission,
    Buy,
    Projects,
    CookiePolicy,
    RefundPolicy,
    Sitemap,
  },
};
