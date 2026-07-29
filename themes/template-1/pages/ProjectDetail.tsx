import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DetailImageSlider from "@/themes/template-1/components/DetailImageSlider";
import { slugify } from "@/lib/slugs";
import { withTheme } from "@/lib/theme";
import type { LatestProjectItem, ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaCar,
  FaChild,
  FaDumbbell,
  FaMapMarkerAlt,
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

function findProject(items: LatestProjectItem[], slug: string) {
  return items.find((item) => (item.slug || slugify(item.title)) === slug);
}

export default function ProjectDetail({
  data,
  theme,
  slug,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
  slug: string;
}) {
  const chrome = data.latestProjects.detail;
  const project = findProject(data.latestProjects.projectItems, slug);

  if (!project) {
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
            href={withTheme("/projects", theme)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c44536]"
          >
            <FaArrowLeft className="text-[10px]" /> {backLabel}
          </Link>
        ) : null}
      </div>
    );
  }

  const parentLabel = chrome?.breadcrumbParentLabel;
  const breadcrumb = [
    { label: "Home", href: "/" },
    ...(parentLabel ? [{ label: parentLabel, href: "/projects" }] : []),
    { label: project.title, href: `/projects/${slug}` },
  ];

  const primaryLabel = project.button?.label ?? chrome?.primaryCtaLabel;
  const primaryHref = project.button?.href;
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
                {project.status && (
                  <span className="bg-[#141414] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    {project.status}
                  </span>
                )}
                {project.location && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c44536]">
                    <FaMapMarkerAlt className="text-[10px]" aria-hidden />
                    {project.location}
                  </span>
                )}
              </div>

              <h1 className="mt-1 text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-[#141414] md:text-[2.5rem] lg:text-[2.75rem]">
                {project.title}
              </h1>

              {project.desc && project.body && project.desc !== project.body && (
                <p className="mt-1 text-base font-medium leading-relaxed text-[#141414]/80">
                  {project.desc}
                </p>
              )}

              <p className="mt-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {project.body || project.desc}
              </p>

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
                    href={withTheme("/projects", theme)}
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
                    src: project.image,
                    alt: project.alt || project.title,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
