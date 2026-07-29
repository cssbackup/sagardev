import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { slugify } from "@/lib/slugs";
import { withTheme } from "@/lib/theme";
import type { GalleryItem, ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowLeft, FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

function findPost(items: GalleryItem[], slug: string) {
  return items.find((item) => (item.slug || slugify(item.title)) === slug);
}

function postHref(item: GalleryItem) {
  return item.href || `/blog/${item.slug || slugify(item.title)}`;
}

export default function BlogDetail({
  data,
  theme,
  slug,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
  slug: string;
}) {
  const page = data.customPage;
  const chrome = page.detail;
  const posts = data.gallery.galleryItems;
  const post = findPost(posts, slug);
  const readLabel = page.readMoreLabel || "Read article";

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-[#141414]">
          {chrome?.notFoundTitle || "Article not found"}
        </h1>
        <Link
          href={withTheme("/blog", theme)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c44536]"
        >
          <FaArrowLeft className="text-[10px]" />{" "}
          {chrome?.backLabel || "Back to blog"}
        </Link>
      </div>
    );
  }

  const parentLabel = chrome?.breadcrumbParentLabel || page.pretitle || "Blog";
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: parentLabel, href: "/blog" },
    { label: post.title, href: `/blog/${slug}` },
  ];

  const paragraphs = (post.body || post.alt || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const related = posts
    .filter((item) => (item.slug || slugify(item.title)) !== slug)
    .slice(0, 3);

  return (
    <div className="bg-white">
      <article className="px-4 pb-10 pt-8 md:px-8 md:pb-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={breadcrumb} theme={theme} />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-8 xl:gap-10">
            {/* Left — content */}
            <div className="order-2 lg:order-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {chrome?.eyebrow || page.pretitle || "Blog"}
              </p>

              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-[#141414] md:text-[2.5rem]">
                {post.title}
              </h1>

              {post.date && (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#141414]/55">
                  <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                  {post.date}
                </p>
              )}

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#141414]/70 md:text-base">
                {paragraphs.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={withTheme("/contact", theme)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                >
                  {chrome?.primaryCtaLabel || "Talk to an advisor"}
                  <FaArrowRight className="text-[10px]" />
                </Link>
                <Link
                  href={withTheme("/blog", theme)}
                  className="inline-flex items-center rounded-full gap-2 border border-[#141414]/20 px-6 py-3 text-sm font-semibold text-[#141414] transition hover:bg-[#faf8f4]"
                >
                  <FaArrowLeft className="text-[10px]" />{" "}
                  {chrome?.secondaryCtaLabel || page.listLabel || "All articles"}
                </Link>
              </div>
            </div>

            {/* Right — image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-2xl bg-[#f3efe8] lg:ml-auto">
                <MediaImage
                  themeId={theme}
                  src={post.image}
                  alt={post.alt || post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
              </div>
            </div>
          </div>
        </div>
      </article>

     
    </div>
  );
}
