import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DetailImageSlider from "@/themes/template-1/components/DetailImageSlider";
import { slugify } from "@/lib/slugs";
import { withTheme } from "@/lib/theme";
import type { PropertyListing, ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaCar,
  FaChild,
  FaDumbbell,
  FaParking,
  FaShieldAlt,
  FaSwimmingPool,
  FaTree,
  FaWifi,
} from "react-icons/fa";
import { MdElevator, MdLocalLaundryService, MdOutlinePark } from "react-icons/md";

const AMENITIES = [
  { label: "Swimming Pool", icon: FaSwimmingPool },
  { label: "Gym / Fitness", icon: FaDumbbell },
  { label: "Covered Parking", icon: FaParking },
  { label: "24×7 Security", icon: FaShieldAlt },
  { label: "Power Backup", icon: FaBolt },
  { label: "High-Speed Wi‑Fi", icon: FaWifi },
  { label: "Kids Play Area", icon: FaChild },
  { label: "Landscaped Garden", icon: FaTree },
  { label: "Clubhouse", icon: MdOutlinePark },
  { label: "Elevator", icon: MdElevator },
  { label: "Laundry", icon: MdLocalLaundryService },
  { label: "Visitor Parking", icon: FaCar },
] as const;

function findProperty(items: PropertyListing[], slug: string) {
  return items.find((item) => (item.slug || slugify(item.title)) === slug);
}

export default function PropertyDetail({
  data,
  theme,
  slug,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
  slug: string;
}) {
  const chrome = data.properties.detail;
  const property = findProperty(data.properties.listings ?? [], slug);

  if (!property) {
    const notFoundTitle = chrome?.notFoundTitle;
    const backLabel = chrome?.backLabel;
    if (!notFoundTitle) return null;
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-[#141414]">
          {notFoundTitle}
        </h1>
        {backLabel ? (
          <Link
            href={withTheme("/properties", theme)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c44536]"
          >
            <FaArrowLeft className="text-[10px]" /> {backLabel}
          </Link>
        ) : null}
      </div>
    );
  }

  const breadcrumb = [
    ...(data.properties.breadcrumb ?? []),
    { label: property.title, href: `/properties/${slug}` },
  ];

  const primaryLabel =
    property.button?.label ?? chrome?.primaryCtaLabel;
  const primaryHref = property.button?.href;
  const secondaryLabel = chrome?.secondaryCtaLabel;

  return (
    <div className="bg-white">
      <section className="px-4 pb-12 pt-8 md:px-8 md:pb-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={breadcrumb} theme={theme} />

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-8 xl:gap-10">
            {/* Left — content */}
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2">
                {property.statusText && (
                  <span className="bg-[#141414] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    {property.statusText}
                  </span>
                )}
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c44536]">
                  {property.category ? `${property.category} · ` : ""}{property.subtitle}
                </span>
              </div>

              <h1 className="mt-1 text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-[#141414] md:text-[2.5rem] lg:text-[2.75rem]">
                {property.title}
              </h1>
              <p className="mt-1 text-base font-medium text-[#141414]/80">
                {property.infoTitle}
              </p>
              <p className="mt-2 text-xl font-semibold text-[#141414]">
                {property.price}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {property.body || property.description}
              </p>

              {property.features?.length > 0 && (
                <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-[#141414]/10 py-6 sm:grid-cols-3">
                  {property.features.map((feature) => (
                    <div key={feature.label}>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#141414]/45">
                        {feature.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[#141414]">
                        {feature.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {primaryHref && primaryLabel ? (
                  <Link
                    href={withTheme(primaryHref, theme)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                  >
                    {primaryLabel}
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                ) : null}
                {secondaryLabel ? (
                  <Link
                    href={withTheme("/properties", theme)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#141414]/20 px-6 py-3 text-sm font-semibold text-[#141414] transition hover:bg-[#faf8f4]"
                  >
                    <FaArrowLeft className="text-[10px]" /> {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            </div>

            {/* Right — image */}
            <div className="order-1 lg:order-2">
              <DetailImageSlider
                theme={theme}
                slides={[
                  {
                    src: property.image,
                    alt: property.alt || property.title,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {property.features?.length ? (
        <section className="border-t border-[#141414]/8 bg-[#faf8f4] px-4 py-10 md:px-8 md:py-12 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 md:gap-4 lg:grid-cols-4">
              {property.features.slice(0, 8).map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#141414]/8 bg-white px-4 py-5 text-center"
                >
                  <span className="text-sm font-semibold text-[#141414]">
                    {feature.label}
                  </span>
                  <span className="text-sm font-semibold text-[#141414] opacity-70">
                    {feature.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
