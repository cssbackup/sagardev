"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/themes/template-1/components/Pagination";
import { withTheme } from "@/lib/theme";
import type {
  LatestProjectItem,
  ResolvedSiteData,
  ThemeId,
} from "@/lib/types";
import { FaBuilding } from "react-icons/fa";

const ITEMS_PER_PAGE = 8;

const DEFAULT_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Mixed Use",
  "Plotted Development",
];

function ProjectCard({
  project,
  theme,
}: {
  project: LatestProjectItem;
  theme: ThemeId;
}) {
  const detailHref = withTheme(
    project.href || `/projects/${project.slug || project.title}`,
    theme
  );
  const category = project.category || project.status || "Project";

  return (
    <Link
      href={detailHref}
      className="group relative flex h-full w-full overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f3efe8]">
        <MediaImage
          themeId={theme}
          src={project.image}
          alt={project.alt || project.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/85">
            <FaBuilding className="text-[10px]" aria-hidden />
            {category}
          </p>
          <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-white/80 line-clamp-1">
            {project.desc}
          </p>
          {project.location && (
            <p className="mt-1.5 text-xs text-white/65">{project.location}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.projectsPage;
  const items = data.latestProjects.projectItems;
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get("category") || "All";

  const filters = useMemo(() => {
    if (page.filters?.length) {
      return page.filters[0].toLowerCase() === "all"
        ? page.filters
        : ["All", ...page.filters];
    }
    const fromItems = Array.from(
      new Set(items.map((i) => i.category).filter(Boolean) as string[])
    );
    return fromItems.length ? ["All", ...fromItems] : DEFAULT_CATEGORIES;
  }, [page.filters, items]);

  const resolvedFilter = filters.includes(categoryFromQuery)
    ? categoryFromQuery
    : "All";

  const [filter, setFilter] = useState(resolvedFilter);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilter(resolvedFilter);
  }, [resolvedFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const visible = useMemo(() => {
    return items.filter((item) => {
      if (filter === "All") return true;
      return (item.category || "").toLowerCase() === filter.toLowerCase();
    });
  }, [filter, items]);

  const totalPages = Math.max(1, Math.ceil(visible.length / ITEMS_PER_PAGE));
  const paged = visible.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function goToPage(nextPage: number) {
    setCurrentPage(nextPage);
    document
      .getElementById("listings")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white">
      <section className="px-4 pb-4 pt-6 md:px-8 md:pt-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Breadcrumb items={page.breadcrumb} theme={theme} />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {page.pretitle || "Our Portfolio"}
          </p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141414] sm:text-[2.35rem] md:text-[3rem]">
            {page.title || "Featured Projects"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
            {page.desc}
          </p>
        </div>
      </section>

      <section
        id="listings"
        className="scroll-mt-24 px-4 pb-10 pt-4 md:px-8 md:pb-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="scrollbar-none flex w-full items-center justify-center gap-2 overflow-x-auto py-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setFilter(chip)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === chip
                    ? "bg-[#141414] text-white"
                    : "text-[#141414] hover:bg-[#141414]/5"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-xs font-medium text-[#141414]/50">
            {visible.length} projects
          </p>

          {visible.length === 0 ? (
            <p className="mt-8 text-center text-sm text-[#141414]/60">
              {page.emptyMessage || "No projects match this category right now."}
            </p>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {paged.map((project) => (
                  <ProjectCard
                    key={project.slug || project.title}
                    project={project}
                    theme={theme}
                  />
                ))}
              </div>
              <Pagination
                page={Math.min(currentPage, totalPages)}
                totalPages={totalPages}
                onChange={goToPage}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
