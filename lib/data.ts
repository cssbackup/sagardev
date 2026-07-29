import siteDataJson from "@/data/siteData.json";
import type {
  CategoryId,
  CategorySectionBag,
  ResolvedSiteData,
  SiteData,
  TemplateComponentMap,
  ThemeId,
} from "@/lib/types";
import { ACTIVE_CATEGORY, ACTIVE_THEME, CATEGORIES } from "@/lib/types";

export const siteData = siteDataJson as unknown as SiteData;

export function getActiveTheme(override?: ThemeId): ThemeId {
  return override ?? ACTIVE_THEME;
}

export function resolveCategory(categoryParam?: string | null): CategoryId {
  if (categoryParam && CATEGORIES.includes(categoryParam as CategoryId)) {
    return categoryParam as CategoryId;
  }
  return ACTIVE_CATEGORY;
}

export function getTemplate(themeId: ThemeId) {
  const template = siteData.templates.find((t) => t.id === themeId);
  if (!template) {
    return siteData.templates[0];
  }
  return template;
}

function resolveSectionVariant<T>(
  section: CategorySectionBag<T> | undefined,
  variantKey: string | undefined,
  fallback?: T
): T {
  const variants = section?.variants ?? {};
  const resolved =
    (variantKey ? variants[variantKey] : undefined) ??
    Object.values(variants)[0] ??
    fallback;

  if (resolved === undefined) {
    throw new Error("Missing section variant data");
  }

  return resolved;
}

/** Merge template + category + common into one view model for UI components */
export function resolveSiteData(
  themeId: ThemeId = ACTIVE_THEME,
  categoryId: CategoryId = ACTIVE_CATEGORY
): ResolvedSiteData {
  const template = getTemplate(themeId);
  const category = siteData.categories[categoryId] ?? siteData.categories.Realestate;
  const { common } = siteData;
  const { sections } = category;
  const componentMap: TemplateComponentMap | undefined =
    category.templateComponents?.[themeId];

  return {
    themeId,
    categoryId,
    template,
    variables: template.variables,
    topbar: resolveSectionVariant(
      sections.Topbar,
      componentMap?.Topbar,
      common.Topbar
    ),
    header: resolveSectionVariant(sections.Header, componentMap?.Header),
    banner: resolveSectionVariant(sections.Banner, componentMap?.Banner),
    about: resolveSectionVariant(sections.About, componentMap?.About),
    properties: resolveSectionVariant(
      sections.Properties,
      componentMap?.Properties
    ),
    whyChooseUs: resolveSectionVariant(
      sections.WhyChooseUs,
      componentMap?.WhyChooseUs
    ),
    gallery: resolveSectionVariant(sections.Gallery, componentMap?.Gallery),
    formDetail: resolveSectionVariant(
      sections.FormDetail,
      componentMap?.FormDetail
    ),
    faq: resolveSectionVariant(sections.FAQ, componentMap?.FAQ),
    citiesWeServe: resolveSectionVariant(
      sections.CitiesWeServe,
      componentMap?.CitiesWeServe
    ),
    investmentOpportunities: resolveSectionVariant(
      sections.InvestmentOpportunities,
      componentMap?.InvestmentOpportunities
    ),
    latestProjects: resolveSectionVariant(
      sections.LatestProjects,
      componentMap?.LatestProjects
    ),
    featuredDevelopers: resolveSectionVariant(
      sections.FeaturedDevelopers,
      componentMap?.FeaturedDevelopers
    ),
    propertyProcess: resolveSectionVariant(
      sections.PropertyProcess,
      componentMap?.PropertyProcess
    ),
    companyStatistics: resolveSectionVariant(
      sections.CompanyStatistics,
      componentMap?.CompanyStatistics
    ),
    footer: resolveSectionVariant(
      sections.Footer,
      componentMap?.Footer,
      common.Footer
    ),
    testimonial: resolveSectionVariant(
      sections.Testimonial,
      componentMap?.Testimonial,
      common.Testimonial
    ),
    team: common.Team,
    galleryPage: common.GalleryPage,
    awardsPage: common.AwardsPage,
    careerPage: common.CareerPage,
    csrPage: common.CsrPage,
    missionPage: common.MissionPage,
    aboutPage: common.AboutPage,
    customPage: common.CustomPage,
    servicePage: common.ServicePage,
    contactPage: common.ContactPage,
    quotePage: common.QuotePage,
    enquiryPage: common.EnquiryPage,
    privacyPage: common.PrivacyPage,
    termsPage: common.TermsPage,
    cookiePolicyPage: common.CookiePolicyPage,
    refundPolicyPage: common.RefundPolicyPage,
    sitemapPage: common.SitemapPage,
    projectsPage: common.ProjectsPage,
  };
}
