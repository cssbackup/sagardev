"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;
const ease = [0.22, 1, 0.36, 1] as const;

export default function IntroCategories({ data }: { data: ResolvedSiteData }) {
  const { properties } = data;
  const cards = properties.categories.slice(0, 3);
  const fallbackHref = properties.buttons[0]?.href || "/properties";

  if (cards.length === 0) return null;

  return (
    <section className="bg-white py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {cards.map((item, i) => {
            const href = item.href || fallbackHref;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className="h-full"
              >
                <Link
                  href={withTheme(href === "#" ? "/properties" : href, THEME)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#141414]/8 bg-white transition duration-300 hover:border-[#141414]/15 hover:shadow-[0_12px_28px_rgba(20,20,20,0.06)]"
                >
                  <div className="relative aspect-[2/1] overflow-hidden sm:aspect-[16/9]">
                    <MediaImage
                      themeId={data.themeId}
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#141414]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-3.5 py-3 sm:px-4 sm:py-3.5">
                    <h3 className="text-base font-semibold leading-snug tracking-[-0.02em] text-[#141414] transition group-hover:text-[#c44536]">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-[#141414]/55">
                      {item.desc}
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#141414] underline decoration-[#141414]/25 underline-offset-4 transition group-hover:decoration-[#c44536]">
                      Explore
                      <span
                        aria-hidden
                        className="inline-block transition duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
