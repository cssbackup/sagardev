"use client";

import { useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/themes/template-1/components/Pagination";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { slugify } from "@/lib/slugs";

const ITEMS_PER_PAGE = 8;

export default function BlogContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.customPage;
  const { gallery } = data;
  const posts = gallery.galleryItems;
  const readMore =
    page.readMoreLabel || gallery.buttons?.[1]?.label || "Read article";
  const cta = page.ctaButton;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / ITEMS_PER_PAGE));
  const pagedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function goToPage(nextPage: number) {
    setCurrentPage(nextPage);
    document
      .getElementById("blog-posts")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white">
      <section
        id="blog-posts"
        className="scroll-mt-24 px-4 py-7 md:px-8 md:py-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={page.breadcrumb} theme={theme} />
            </div>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141414] sm:text-[2.35rem] md:text-[3rem]">
              {page.featuredLabel || "Featured Blogs"}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
              Practical guides and market notes for buyers, renters, and
              homeowners.
            </p>
          </div>

          {posts.length > 0 ? (
            <>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
                {pagedPosts.map((post, i) => (
                  <article
                    key={`${post.title}-${i}`}
                    className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white"
                  >
                    <Link
                      href={withTheme(
                        post.href || `/blog/${post.slug || slugify(post.title)}`,
                        theme
                      )}
                      className="group flex h-full flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <MediaImage
                          themeId={theme}
                          src={post.image}
                          alt={post.alt || post.title}
                          fill
                          priority={currentPage === 1 && i < 4}
                          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="300px"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-3.5">
                        {post.date && (
                          <div className="flex items-center gap-2 text-[11px] font-medium text-[#141414]/50">
                            <FaRegCalendarAlt
                              className="text-[#c44536]"
                              aria-hidden
                            />
                            {post.date}
                          </div>
                        )}
                        <h2 className="mt-2 text-[0.95rem] font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
                          {post.title}
                        </h2>
                        {post.alt && (
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#141414]/65">
                            {post.alt}
                          </p>
                        )}
                        {readMore && (
                          <span className="mt-auto inline-flex items-center gap-2 pt-3 text-xs font-medium text-[#141414]">
                            {readMore}
                            <FaArrowRight
                              className="text-[9px] transition duration-300 group-hover:translate-x-1"
                              aria-hidden
                            />
                          </span>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              <Pagination
                page={Math.min(currentPage, totalPages)}
                totalPages={totalPages}
                onChange={goToPage}
              />
            </>
          ) : (
            <p className="mt-10 text-center text-sm text-[#141414]/60">
              {page.emptyMessage || "No articles available right now."}
            </p>
          )}
        </div>
      </section>

      {(page.ctaPretitle || page.ctaTitle || cta) && (
        <section className="px-4 pb-10 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#141414] px-6 py-10 text-white md:px-10 md:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                {page.ctaPretitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                    {page.ctaPretitle}
                  </p>
                )}
                {page.ctaTitle && (
                  <h2 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
                    {page.ctaTitle}
                  </h2>
                )}
                {page.ctaDesc && (
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {page.ctaDesc}
                  </p>
                )}
              </div>
              {cta && (
                <Link
                  href={withTheme(cta.href, theme)}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#141414] transition hover:bg-white/90"
                >
                  {cta.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
