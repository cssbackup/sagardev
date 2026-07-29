"use client";

import { useEffect, useState } from "react";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

/** Auto quote only — no prev/next */
export default function Testimonials({ data }: { data: ResolvedSiteData }) {
  const { testimonial } = data;
  const all = testimonial.testimonialItems;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = all[index] ?? all[0];

  useEffect(() => {
    if (all.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % all.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [all.length, paused]);

  if (!item) return null;

  return (
    <section
      className="bg-[#faf9f7] px-4 py-14 text-[#141414] md:px-8 md:py-16 lg:px-10 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl text-center">
        <RevealBlur>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
            {testimonial.pretitle || "Clients"}
          </p>
          <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
            {testimonial.title}
          </h2>

          <blockquote
            key={item.quote}
            className="mt-10 text-[clamp(1.15rem,2.6vw,1.55rem)] font-medium leading-[1.5] tracking-[-0.02em]"
          >
            “{item.quote}”
          </blockquote>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#e8e6e1]">
              <MediaImage
                themeId={THEME}
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="mt-0.5 text-sm text-[#141414]/45">{item.role}</p>
            </div>
          </div>

          {all.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {all.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === index
                      ? "bg-[var(--reroom-accent,#ff6b00)]"
                      : "bg-[#141414]/20"
                  }`}
                />
              ))}
            </div>
          )}
        </RevealBlur>
      </div>
    </section>
  );
}
