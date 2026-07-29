/**
 * Shared template types (base contract) + app addons for this real-estate theme.
 * Base section/builder types stay aligned with the shared type file; site/page
 * types below are addons so existing ResolvedSiteData usage keeps working.
 */

import type {
  Block,
  BlockSection,
  LayoutComponentProps,
} from "../components/sections/types/section";

export type {
  Block,
  BlockSection,
  SectionType,
  TextBlock,
  ImageBlock,
  VideoBlock,
  ButtonBlock,
  SliderBlock,
  CarouselBlock,
  CardBlock,
  ListBlock,
  MenuBlock,
  LogoBlock,
} from "../components/sections/types/section";

/* -------------------------------------------------------------------------- */
/* Shared section / builder types                                             */
/* -------------------------------------------------------------------------- */

export type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

/** App alias — same shape as MenuItem (nav, breadcrumbs, footer links). */
export type LinkItem = MenuItem;

export type SocialLinkData = {
  label: "facebook" | "instagram" | "twitter" | "linkedin";
  href: string;
};

export type TopbarData = {
  topbarBackgroundType?: "solid" | "gradient";
  topbarBackgroundColor?: string;
  topbarGradientColor?: string;
  topbarTextColor?: string;
  text?: string[];
  phone?: string;
  email?: string;
  location?: string;
  socialLinks?: SocialLinkData[] | LinkItem[];
};

/**
 * App topbar content from siteData — shared TopbarData fields plus required
 * contact/social values used by current themes.
 */
export type AppTopbarData = TopbarData & {
  text: string[];
  phone: string;
  email: string;
  location: string;
  socialLinks: LinkItem[];
};

export type ButtonData = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

/** App alias — same as ButtonData. */
export type ButtonItem = ButtonData;

export type BannerSlideData = {
  image: string;
  video?: string;
  alt?: string;
  title: string;
  desc?: string;
  button?: ButtonData;
};

/** App banner slide — alt/desc required by current site content. */
export type BannerSlide = BannerSlideData & {
  alt: string;
  desc: string;
};

export type ProductImageData = {
  image: string;
  alt: string;
};

export type ProductFeatureData = {
  label: string;
  price: string;
};

/** App alias. */
export type ProductFeature = ProductFeatureData;

export type ProductSlideData = {
  image: string;
  alt: string;
  link?: string;
  productTitle: string;
  productSubtitle: string;
  productInfoTitle: string;
  productInfoDesc: string;
  productFeatures: ProductFeatureData[];
  productTotalPrice: string;
  productShippingText: string;
  button?: ButtonData;
  slug?: string;
  body?: string;
};

/** App product slide — used by ServicePage (services), not property listings. */
export type ProductSlide = ProductSlideData & {
  category?: string;
};

export type ProductCardData = {
  title: string;
  category: string;
  desc: string;
  image: string;
  alt?: string;
  imageTitle?: string;
  link?: string;
};

/** App product card — alt + href used by current themes. */
export type ProductItem = ProductCardData & {
  alt: string;
  href?: string;
};

/** Real-estate listing feature (Bedrooms / Area / Parking). */
export type PropertyFeature = {
  label: string;
  value: string;
};

/** Filter chip driven entirely from JSON — no hardcoded Sale/Rent/types in UI. */
export type PropertyFilter = {
  label: string;
  value: string;
  /** Which listing field this chip matches: all | category | propertyType */
  field?: "all" | "category" | "propertyType" | string;
  /** Extra query/search values that should match this chip (e.g. floor → Builder Floor) */
  aliases?: string[];
};

/** Category cards (Sale / Rent / Apartment / …) linked from homepage & properties. */
export type PropertyCategoryCard = {
  title: string;
  category: string;
  desc: string;
  image: string;
  alt: string;
  href?: string;
};

/** Single property listing — real-estate naming (not product*). */
export type PropertyListing = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  infoTitle: string;
  description: string;
  features: PropertyFeature[];
  price: string;
  statusText: string;
  /** Intent: For Sale | For Rent (values come from JSON filters) */
  category?: string;
  /** Type: Apartment | Villa | … (values come from JSON) */
  propertyType?: string;
  /** City / area label for filters (e.g. Delhi, Gurugram) */
  location?: string;
  button?: ButtonData;
  slug?: string;
  body?: string;
  link?: string;
};

export type WhyChooseUsItemData = {
  title: string;
  desc: string;
  stat?: string;
};

export type GalleryItemData = {
  image: string;
  alt?: string;
  title?: string;
};

export type FormFieldData = {
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
};

/** App form field — type/placeholder required by current forms. */
export type FormField = {
  label: string;
  type: string;
  placeholder: string;
};

export type FaqItemData = {
  question: string;
  answer: string;
};

export type TestimonialItemData = {
  name: string;
  role: string;
  quote: string;
  image?: string;
  rating?: string;
};

export type FooterSocialData = {
  label: "facebook" | "instagram" | "twitter" | "linkedin";
  href: string;
};

export type FooterLinkData = {
  label: string;
  href: string;
};

export type FooterColumnData = {
  title: string;
  links: FooterLinkData[];
};

export type FooterContactData = {
  location: string;
  email: string;
  phone: string;
};

export type SectionData = {
  [field: string]: unknown;

  hiddenContentFields?: string[];
  topbarType?: "scroll" | "sticky";
  topbarBackgroundType?: "solid" | "gradient";
  topbarBackgroundColor?: string;
  topbarGradientColor?: string;
  topbarTextColor?: string;
  text?: string[];
  phone?: string;
  email?: string;
  location?: string;
  socialLinks?: SocialLinkData[];

  logo?: string;
  logoImage?: string;
  logoImageTitle?: string;
  menu?: MenuItem[];
  buttons?: ButtonData[];

  headerBackgroundType?: "solid" | "gradient";
  headerType?: "scroll" | "sticky";
  headerBackgroundColor?: string;
  headerGradientColor?: string;
  headerTextColor?: string;

  pretitle?: string;
  title?: string;
  subtitle?: string;

  backgroundImage?: string;
  backgroundImageTitle?: string;
  backgroundVideo?: string;
  bannerBackgroundMode?: "image" | "video" | "solid" | "gradient";
  bannerBackgroundColor?: string;
  bannerGradientColor?: string;
  bannerHeight?: number;
  bannerSlides?: BannerSlideData[];

  eyebrowColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  overlayColor?: string;

  desc?: string;
  desc2?: string;

  buttonBackground?: string;
  buttonColor?: string;

  length?: number;
  sideImage?: string;
  sideImageTitle?: string;
  philosophyTitle?: string;
  philosophyDesc?: string;

  productImages?: ProductImageData[];
  productTitle?: string;
  productSubtitle?: string;
  productInfoTitle?: string;
  productInfoDesc?: string;
  productFeatures?: ProductFeatureData[];
  productTotalPrice?: string;
  productShippingText?: string;
  productSlides?: ProductSlideData[];
  productSectionTitle?: string;
  productItems?: ProductCardData[];

  whyChooseUsItems?: WhyChooseUsItemData[];
  galleryItems?: GalleryItemData[];
  formFields?: FormFieldData[];
  formSubmitLabel?: string;
  faqItems?: FaqItemData[];
  testimonialItems?: TestimonialItemData[];

  footerBackgroundType?: "solid" | "gradient";
  footerBackgroundColor?: string;
  footerGradientColor?: string;
  footerTextColor?: string;
  footerMutedTextColor?: string;
  footerSocialLinks?: FooterSocialData[];
  footerColumns?: FooterColumnData[];
  footerContact?: FooterContactData;
  footerLegalLinks?: FooterLinkData[];
  whatsappLink?: string;
  callLink?: string;
  copyrightText?: string;
};

export type SectionProps = {
  data?: SectionData;
} & Partial<LayoutComponentProps> & {
    blocks?: Block[];
    section?: BlockSection;
  };

export type SectionItem = {
  id?: string;
  page?: string;
  type: string;
  variant: string;
  data: Record<string, SectionData>;
};

export type SelectedConfig = {
  templateId: string;
  sections: SectionItem[];
};

/* -------------------------------------------------------------------------- */
/* App addons — theme site model (existing code continues to use these)       */
/* -------------------------------------------------------------------------- */

export type SectionVariants = {
  Topbar: string;
  Header: string;
  Banner: string;
  About: string;
  Product: string;
  Properties: string;
  WhyChooseUs: string;
  Gallery: string;
  FormDetail: string;
  FAQ: string;
  Testimonial: string;
  Footer: string;
};

export type TemplateConfig = {
  id: ThemeId;
  title: string;
  image: string;
  variables: Record<string, string>;
  /** Optional legacy / editor metadata */
  numericId?: number;
  type?: string;
  previewimage?: string;
  preview_description?: string;
  prebuilt_pages?: number;
  sectionVariants?: SectionVariants;
};

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export type FooterContact = FooterContactData;

export type FooterData = {
  desc: string;
  footerColumns: FooterColumn[];
  footerContact: FooterContact;
  footerLegalLinks: LinkItem[];
  socialLinks: LinkItem[];
  copyrightText: string;
  officeLabel?: string;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonLabel?: string;
  disclaimerTitle?: string;
  disclaimerText?: string;
  legalTitle?: string;
  contactLabel?: string;
};

export type AboutPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  subtitle: string;
  sideImage: string;
  sideImageTitle: string;
  philosophyTitle: string;
  philosophyDesc: string;
  storyLabel?: string;
  missionPretitle?: string;
  missionTitle?: string;
  missionDesc?: string;
  missionPoints?: { title: string; desc: string }[];
  /** "Learn more" style button → dedicated /mission page (not in header) */
  missionButton?: ButtonItem;
  ctaPretitle?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaButton?: ButtonItem;
  breadcrumb?: LinkItem[];
};

/** Shared chrome for property / project / blog detail pages */
export type DetailChrome = {
  notFoundTitle?: string;
  backLabel?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  breadcrumbParentLabel?: string;
  eyebrow?: string;
};

export type CustomPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
  searchPlaceholder?: string;
  featuredLabel?: string;
  listLabel?: string;
  emptyMessage?: string;
  readMoreLabel?: string;
  ctaPretitle?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaButton?: ButtonItem;
  detail?: DetailChrome;
  breadcrumb?: LinkItem[];
};

export type ServicePageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  subtitle: string;
  productSectionTitle: string;
  viewAllLabel?: string;
  sideImage: string;
  sideImageTitle: string;
  productSlides: ProductSlide[];
  productItems: ProductItem[];
  breadcrumb?: LinkItem[];
};

export type ContactPageData = {
  pretitle: string;
  title: string;
  desc: string;
  sideImage: string;
  sideImageTitle: string;
  footerContact: FooterContact;
  formSubmitLabel: string;
  formFields: FormField[];
  reachPretitle?: string;
  reachTitle?: string;
  reachDesc?: string;
  formPretitle?: string;
  formTitle?: string;
  formDesc?: string;
  successTitle?: string;
  successDesc?: string;
  consentPrefix?: string;
  officeLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
  breadcrumb?: LinkItem[];
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: string;
};

export type TestimonialData = {
  pretitle: string;
  title: string;
  desc: string;
  testimonialItems: TestimonialItem[];
};

export type TeamItem = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export type TeamDepartment = {
  name: string;
  desc: string;
};

export type TeamData = {
  pretitle: string;
  title: string;
  desc: string;
  teamItems: TeamItem[];
};

export type GalleryPageItem = {
  image: string;
  alt: string;
  title: string;
  category: string;
};

export type GalleryPageData = {
  pretitle: string;
  title: string;
  desc: string;
  categories: string[];
  galleryItems: GalleryPageItem[];
  breadcrumb?: LinkItem[];
};

export type AwardItem = {
  year: string;
  title: string;
  org: string;
  desc: string;
  image: string;
};

export type AwardsPageData = {
  pretitle: string;
  title: string;
  desc: string;
  awardItems: AwardItem[];
  breadcrumb?: LinkItem[];
};

export type MissionPoint = {
  title: string;
  desc: string;
};

export type MissionPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2?: string;
  sideImage: string;
  sideImageTitle: string;
  pillarsPretitle?: string;
  pillarsTitle?: string;
  pillars: MissionPoint[];
  valuesPretitle?: string;
  valuesTitle?: string;
  values: MissionPoint[];
  ctaPretitle?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaButton?: ButtonItem;
  breadcrumb?: LinkItem[];
};

export type CityItem = {
  name: string;
  desc: string;
  image: string;
  alt: string;
  /** Used by section filters (e.g. Delhi, Gurugram) */
  region?: string;
  /** Project type filter (Residential, Commercial, …) */
  category?: string;
  /** Area / locality shown on cards */
  location?: string;
  listingsLabel?: string;
  href?: string;
};

export type CitiesWeServeData = {
  pretitle: string;
  title: string;
  desc: string;
  /** Filter chips; first is usually "All" */
  categories?: string[];
  cities: CityItem[];
  button?: ButtonItem;
};

export type InvestmentItem = {
  title: string;
  desc: string;
  image: string;
  alt: string;
  yieldLabel?: string;
  location?: string;
  href?: string;
};

export type InvestmentOpportunitiesData = {
  pretitle: string;
  title: string;
  desc: string;
  items: InvestmentItem[];
  button?: ButtonItem;
};

export type LatestProjectItem = {
  title: string;
  desc: string;
  image: string;
  alt: string;
  location?: string;
  status?: string;
  /** Project type: Residential | Commercial | Mixed Use | Plotted Development */
  category?: string;
  href?: string;
  slug?: string;
  body?: string;
  button?: ButtonItem;
};

export type LatestProjectsData = {
  pretitle: string;
  title: string;
  desc: string;
  projectItems: LatestProjectItem[];
  button?: ButtonItem;
  detail?: DetailChrome;
};

export type CareerBenefit = {
  title: string;
  desc: string;
};

export type CareerJob = {
  title: string;
  location: string;
  type: string;
  desc: string;
  href: string;
  buttonLabel?: string;
};

export type CareerPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
  benefits: CareerBenefit[];
  jobs: CareerJob[];
  applyLabel?: string;
  breadcrumb?: LinkItem[];
};

export type CsrStat = {
  stat: string;
  label: string;
};

export type CsrProgram = {
  title: string;
  desc: string;
  image: string;
  amount: string;
};

export type CsrDonateCta = {
  title: string;
  desc: string;
  buttonLabel: string;
  buttonHref: string;
};

export type CsrPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
  impactStats: CsrStat[];
  programs: CsrProgram[];
  donateCta: CsrDonateCta;
  breadcrumb?: LinkItem[];
};

export type HeaderSection = {
  logo: string;
  menu: LinkItem[];
  buttons: ButtonItem[];
};

export type SmartSearchTab = {
  label: string;
  value: string;
};

export type SmartSearchData = {
  enabled?: boolean;
  tabs?: SmartSearchTab[];
  locationLabel?: string;
  typeLabel?: string;
  budgetLabel?: string;
  locationPlaceholder?: string;
  typePlaceholder?: string;
  budgetPlaceholder?: string;
  submitLabel?: string;
};

export type BannerFeatureItem = {
  title: string;
  desc: string;
  icon?: string;
};

export type BannerSection = {
  backgroundImage: string;
  backgroundImageTitle: string;
  backgroundVideo?: string;
  bannerHeight: number;
  pretitle: string;
  title: string;
  desc: string;
  buttons: ButtonItem[];
  bannerSlides: BannerSlide[];
  smartSearch?: SmartSearchData;
  features?: BannerFeatureItem[];
};

export type FeaturedDeveloperItem = {
  name: string;
  desc: string;
  image: string;
  alt: string;
  projectsLabel?: string;
  href?: string;
};

export type FeaturedDevelopersData = {
  pretitle: string;
  title: string;
  desc: string;
  items: FeaturedDeveloperItem[];
  button?: ButtonItem;
};

export type PropertyProcessStep = {
  step?: string;
  title: string;
  desc: string;
};

export type PropertyProcessData = {
  pretitle: string;
  title: string;
  desc: string;
  steps: PropertyProcessStep[];
  button?: ButtonItem;
};

export type CompanyStatItem = {
  stat: string;
  label: string;
  desc?: string;
};

export type CompanyStatisticsData = {
  stats: CompanyStatItem[];
};

export type AboutSection = {
  pretitle: string;
  title: string;
  subtitle: string;
  desc: string;
  desc2: string;
  backgroundImage: string;
  backgroundImageTitle: string;
  sideImage: string;
  sideImageTitle: string;
  philosophyTitle: string;
  philosophyDesc: string;
  buttons: ButtonItem[];
};

export type PropertiesSection = {
  sectionTitle: string;
  title: string;
  subtitle: string;
  infoTitle: string;
  description: string;
  highlights: PropertyFeature[];
  statusText: string;
  listings: PropertyListing[];
  categories: PropertyCategoryCard[];
  filters: PropertyFilter[];
  /** Maps URL intent params (buy/rent/sale) → category filter values from JSON */
  intentMap?: Record<string, string>;
  buttons: ButtonItem[];
  detail?: DetailChrome;
  breadcrumb?: LinkItem[];
};

/** @deprecated Use PropertiesSection — kept only if legacy templates reference Product */
export type ProductSection = PropertiesSection;

export type WhyChooseUsSection = {
  pretitle: string;
  title: string;
  desc: string;
  whyChooseUsItems: WhyChooseUsItemData[];
};

export type GalleryItem = {
  image: string;
  alt: string;
  title: string;
  date?: string;
  href?: string;
  slug?: string;
  body?: string;
};

export type GallerySection = {
  pretitle: string;
  title: string;
  desc: string;
  galleryItems: GalleryItem[];
  buttons?: ButtonItem[];
};

export type FormDetailSection = {
  pretitle: string;
  title: string;
  desc: string;
  backgroundImage: string;
  backgroundImageTitle: string;
  formSubmitLabel: string;
  formFields: FormField[];
  successMessage?: string;
};

export type FAQSection = {
  pretitle: string;
  title: string;
  faqItems: FaqItemData[];
};

export type CategorySectionBag<T> = {
  variants: Record<string, T>;
};

export type CategorySections = {
  Topbar?: CategorySectionBag<AppTopbarData>;
  Header: CategorySectionBag<HeaderSection>;
  Banner: CategorySectionBag<BannerSection>;
  About: CategorySectionBag<AboutSection>;
  Properties: CategorySectionBag<PropertiesSection>;
  WhyChooseUs: CategorySectionBag<WhyChooseUsSection>;
  Gallery: CategorySectionBag<GallerySection>;
  FormDetail: CategorySectionBag<FormDetailSection>;
  FAQ: CategorySectionBag<FAQSection>;
  Testimonial?: CategorySectionBag<TestimonialData>;
  Footer?: CategorySectionBag<FooterData>;
  /** Homepage sections (not dedicated pages) */
  CitiesWeServe: CategorySectionBag<CitiesWeServeData>;
  InvestmentOpportunities: CategorySectionBag<InvestmentOpportunitiesData>;
  LatestProjects: CategorySectionBag<LatestProjectsData>;
  FeaturedDevelopers: CategorySectionBag<FeaturedDevelopersData>;
  PropertyProcess: CategorySectionBag<PropertyProcessData>;
  CompanyStatistics: CategorySectionBag<CompanyStatisticsData>;
};

export type TemplateComponentMap = Partial<
  Record<keyof CategorySections, string>
>;

export type CategoryId = "Realestate";

export type CategoryConfig = {
  templateComponents: Partial<Record<ThemeId, TemplateComponentMap>>;
  sections: CategorySections;
};

export type LegalSection = {
  title: string;
  desc: string;
};

export type LegalPageData = {
  pretitle: string;
  title: string;
  desc: string;
  updatedAt: string;
  sections: LegalSection[];
  breadcrumb?: LinkItem[];
};

export type SitemapGroup = {
  title: string;
  links: LinkItem[];
};

export type SitemapPageData = {
  pretitle: string;
  title: string;
  desc: string;
  groups: SitemapGroup[];
  breadcrumb?: LinkItem[];
};

export type ProjectsPageData = {
  pretitle: string;
  title: string;
  desc: string;
  filters?: string[];
  viewLabel?: string;
  emptyMessage?: string;
  breadcrumb?: LinkItem[];
};

export type CommonData = {
  Topbar: AppTopbarData;
  Footer: FooterData;
  AboutPage: AboutPageData;
  CustomPage: CustomPageData;
  ServicePage: ServicePageData;
  ContactPage: ContactPageData;
  PrivacyPage: LegalPageData;
  TermsPage: LegalPageData;
  CookiePolicyPage: LegalPageData;
  RefundPolicyPage: LegalPageData;
  SitemapPage: SitemapPageData;
  ProjectsPage: ProjectsPageData;
  Testimonial: TestimonialData;
  Team: TeamData;
  GalleryPage: GalleryPageData;
  AwardsPage: AwardsPageData;
  CareerPage: CareerPageData;
  CsrPage: CsrPageData;
  MissionPage: MissionPageData;
};

export type SiteData = {
  templates: TemplateConfig[];
  common: CommonData;
  categories: Record<CategoryId, CategoryConfig>;
};

/** Resolved view model passed into templates and page components */
export type ResolvedSiteData = {
  themeId: ThemeId;
  categoryId: CategoryId;
  template: TemplateConfig;
  variables: Record<string, string>;
  topbar: AppTopbarData;
  header: HeaderSection;
  banner: BannerSection;
  about: AboutSection;
  properties: PropertiesSection;
  whyChooseUs: WhyChooseUsSection;
  gallery: GallerySection;
  formDetail: FormDetailSection;
  faq: FAQSection;
  footer: FooterData;
  testimonial: TestimonialData;
  team: TeamData;
  galleryPage: GalleryPageData;
  awardsPage: AwardsPageData;
  careerPage: CareerPageData;
  csrPage: CsrPageData;
  missionPage: MissionPageData;
  citiesWeServe: CitiesWeServeData;
  investmentOpportunities: InvestmentOpportunitiesData;
  latestProjects: LatestProjectsData;
  featuredDevelopers: FeaturedDevelopersData;
  propertyProcess: PropertyProcessData;
  companyStatistics: CompanyStatisticsData;
  aboutPage: AboutPageData;
  customPage: CustomPageData;
  servicePage: ServicePageData;
  contactPage: ContactPageData;
  privacyPage: LegalPageData;
  termsPage: LegalPageData;
  cookiePolicyPage: LegalPageData;
  refundPolicyPage: LegalPageData;
  sitemapPage: SitemapPageData;
  projectsPage: ProjectsPageData;
};

export type ThemeId = "template-1" | "template-2" | "template-3";

export const THEMES: { id: ThemeId; name: string; description: string }[] = [
  {
    id: "template-1",
    name: "HAUS Group",
    description: "Syne · warm geometric real estate with blog",
  },
  {
    id: "template-2",
    name: "re/room",
    description: "Orange accent · Poppins · renovation layout",
  },
  {
    id: "template-3",
    name: "Snifty",
    description: "Volkhov Bold · red/navy real estate landing",
  },
];

export const CATEGORIES: CategoryId[] = ["Realestate"];

/** Change this to switch the default homepage theme */
export const ACTIVE_THEME: ThemeId = "template-1";

/** Change this to switch the default content category */
export const ACTIVE_CATEGORY: CategoryId = "Realestate";
