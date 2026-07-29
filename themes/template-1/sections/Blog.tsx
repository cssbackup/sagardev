"use client";

import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Carousel from "@/themes/template-1/components/Carousel";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

const THEME = "template-1" as const;

export default function Blog({ data }: { data: ResolvedSiteData }) {
  const { gallery, customPage } = data;
  const posts = gallery.galleryItems;
  const viewAll = gallery.buttons?.[0];
  const readMore = gallery.buttons?.[1] || customPage.readMoreLabel;

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          {gallery.pretitle && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {gallery.pretitle}
            </p>
          )}
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-[#141414] md:text-[2.9rem]">
            {gallery.title}
          </h2>
          {gallery.desc && (
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {gallery.desc}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <Carousel withNav prevLabel="Previous articles" nextLabel="Next articles">
          {posts.map((post, i) => {
            const href =
              post.href ||
              (post.slug ? `/blog/${post.slug}` : null) ||
              viewAll?.href ||
              "/blog";
            const readLabel =
              typeof readMore === "string" ? readMore : readMore?.label;

            return (
              <article
                key={`${post.title}-${i}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white"
              >
                <Link href={withTheme(href, THEME)} className="group flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <MediaImage
                      themeId={data.themeId}
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 78vw, 300px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                  {post.date && (
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#141414]/50">
                      <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                      {post.date}
                    </div>
                  )}
                  <h3 className="mt-2 text-base font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
                    {post.title}
                  </h3>
                  {post.alt && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#141414]/65">
                      {post.alt}
                    </p>
                  )}
                  {readLabel && (
                    <span className="mt-auto pt-3 inline-flex items-center gap-2 text-xs font-medium text-[#141414]">
                      {readLabel}
                      <FaArrowRight
                        className="text-[9px] transition duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  )}
                  </div>
                </Link>
              </article>
            );
          })}
        </Carousel>
      </div>

      {viewAll && (
        <div className="mt-8 flex justify-center px-4">
          <Link
            href={withTheme(viewAll.href, THEME)}
            className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#141414]/90"
          >
            {viewAll.label}
            <FaArrowRight className="text-[10px]" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
