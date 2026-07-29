"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { GalleryItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function BlogCard({
  post,
  readLabel,
}: {
  post: GalleryItem;
  readLabel?: string;
}) {
  return (
    <article
      data-slide
      className="w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[280px]"
    >
      <Link
        href={withTheme(post.href || "/blog", THEME)}
        className="group block"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-[#f3f1ed]">
          <MediaImage
            themeId={THEME}
            src={post.image}
            alt={post.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="300px"
          />
        </div>
        <div className="mt-4">
          {post.date && (
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
              {post.date}
            </p>
          )}
          <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.01em] transition group-hover:text-[var(--reroom-accent,#ff6b00)]">
            {post.title}
          </h3>
          {post.alt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/50">
              {post.alt}
            </p>
          )}
          {readLabel && (
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold">
              {readLabel}
              <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}

/** Manual snap slider — same approach as template-1 */
export default function Blog({ data }: { data: ResolvedSiteData }) {
  const { gallery, customPage } = data;
  const posts = gallery.galleryItems;
  const viewAll = gallery.buttons?.[0];
  const readMore = gallery.buttons?.[1] || customPage.readMoreLabel;
  const readLabel = typeof readMore === "string" ? readMore : readMore?.label;
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-14 text-[#141414] md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {gallery.pretitle && (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {gallery.pretitle}
              </p>
            )}
            <h2 className="mt-2 text-[1.85rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.35rem]">
              {gallery.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous posts"
              onClick={() => scrollBySlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next posts"
              onClick={() => scrollBySlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowRight className="text-xs" />
            </button>
            {viewAll && (
              <Link
                href={withTheme(viewAll.href, THEME)}
                className="ml-1 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
              >
                {viewAll.label}
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
          </div>
        </RevealBlur>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <BlogCard key={post.title} post={post} readLabel={readLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
