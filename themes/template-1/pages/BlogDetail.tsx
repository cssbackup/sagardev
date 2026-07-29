import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { slugify } from "@/lib/slugs";
import { withTheme } from "@/lib/theme";
import type { GalleryItem, ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaRegCalendarAlt,
  FaRegUser,
  FaTag,
} from "react-icons/fa";

function findPost(items: GalleryItem[], slug: string) {
  return items.find((item) => (item.slug || slugify(item.title)) === slug);
}

function postHref(item: GalleryItem) {
  return item.href || `/blog/${item.slug || slugify(item.title)}`;
}

function bodyParagraphs(post: GalleryItem) {
  return (post.body || post.alt || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function takeawaysFromBody(paragraphs: string[]) {
  return paragraphs
    .flatMap((p) => p.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter((s) => s.length >= 36 && s.length <= 140)
    .slice(0, 4);
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
  const category = chrome?.eyebrow || page.pretitle || "Insights";
  const author = data.template.title;
  const paragraphs = bodyParagraphs(post);
  const takeaways = takeawaysFromBody(paragraphs);

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: parentLabel, href: "/blog" },
    { label: post.title, href: `/blog/${slug}` },
  ];

  const related = posts
    .filter((item) => (item.slug || slugify(item.title)) !== slug)
    .slice(0, 3);

  const ctaHref = page.ctaButton?.href || "/contact";
  const ctaLabel =
    chrome?.primaryCtaLabel || page.ctaButton?.label || "Talk to an advisor";

  return (
    <div className="bg-[#f7f7f7]">
      <header className="border-b border-[#141414]/6 bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-8 md:px-8 md:pb-12">
          <Breadcrumb items={breadcrumb} theme={theme} />

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {category}
          </p>

          <h1 className="mt-1 text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#141414] sm:text-[2.35rem] md:text-[2.75rem]">
            {post.title}
          </h1>

          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#141414]/55">
            <li className="inline-flex items-center gap-2">
              <FaRegUser className="text-[11px] text-[#c44536]" aria-hidden />
              <span>{author}</span>
            </li>
            {post.date && (
              <li className="inline-flex items-center gap-2">
                <FaRegCalendarAlt
                  className="text-[11px] text-[#c44536]"
                  aria-hidden
                />
                <time dateTime={post.date}>{post.date}</time>
              </li>
            )}
            <li className="inline-flex items-center gap-2">
              <FaTag className="text-[11px] text-[#c44536]" aria-hidden />
              <span>{category}</span>
            </li>
          </ul>
        </div>
      </header>

      <article className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#ebebeb] shadow-[0_24px_60px_rgba(20,20,20,0.1)] sm:aspect-[2/1]">
            <MediaImage
              themeId={theme}
              src={post.image}
              alt={post.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="mx-auto mt-8 max-w-2xl md:mt-10">
            <div className="space-y-5 text-[0.95rem] leading-[1.75] text-[#141414]/72 md:text-base md:leading-[1.8]">
              {paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            {takeaways.length >= 2 && (
              <section className="mt-10 rounded-2xl border border-[#141414]/8 bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#141414]/12" aria-hidden />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">
                    Key takeaways
                  </p>
                  <span className="h-px flex-1 bg-[#141414]/12" aria-hidden />
                </div>

                <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[#141414] md:text-2xl">
                  What to remember
                </h2>

                <ul className="mt-5 space-y-3.5">
                  {takeaways.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#141414]/75 md:text-[0.95rem]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c44536]/10 text-[#c44536]">
                        <FaCheck className="text-[9px]" aria-hidden />
                      </span>
                      <span>{item}.</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-[#141414]/8 pt-8">
              <Link
                href={withTheme(ctaHref, theme)}
                className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                {ctaLabel}
                <FaArrowRight className="text-[10px]" />
              </Link>
              <Link
                href={withTheme("/blog", theme)}
                className="inline-flex items-center gap-2 rounded-full border border-[#141414]/20 bg-white px-6 py-3 text-sm font-semibold text-[#141414] transition hover:bg-[#faf8f4]"
              >
                <FaArrowLeft className="text-[10px]" />{" "}
                {chrome?.secondaryCtaLabel || page.listLabel || "All articles"}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-[#141414]/6 bg-white px-4 py-10 md:px-8 md:py-12 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                  Keep reading
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#141414] md:text-[1.75rem]">
                  Related articles
                </h2>
              </div>
              <Link
                href={withTheme("/blog", theme)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
              >
                View all
                <FaArrowRight className="text-[9px]" />
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug || item.title}
                  href={withTheme(postHref(item), theme)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-[#f7f7f7] transition hover:border-[#141414]/15 hover:shadow-[0_18px_40px_rgba(20,20,20,0.06)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ebebeb]">
                    <MediaImage
                      themeId={theme}
                      src={item.image}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    {item.date && (
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c44536]">
                        {item.date}
                      </p>
                    )}
                    <h3 className="mt-1.5 text-base font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
                      {item.title}
                    </h3>
                    {(item.body || item.alt) && (
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#141414]/55">
                        {item.body || item.alt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
