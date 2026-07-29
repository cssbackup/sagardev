"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RevealBlur } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

/** Clean accordion — border list, no card shadows */
export default function FAQ({ data }: { data: ResolvedSiteData }) {
  const { faq } = data;
  const items = faq.faqItems;
  const [open, setOpen] = useState(0);

  if (items.length === 0) return null;

  return (
    <section className="bg-white px-4 py-14 text-[#141414] md:px-8 md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <RevealBlur className="mb-10">
          {faq.pretitle && (
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {faq.pretitle}
            </p>
          )}
          <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
            {faq.title}
          </h2>
        </RevealBlur>

        <div className="divide-y divide-[#141414]/10 border-y border-[#141414]/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 text-base font-bold md:text-lg">
                    {item.question}
                  </span>
                  <span className="text-[var(--reroom-accent,#ff6b00)]">
                    {isOpen ? (
                      <FaMinus className="text-xs" />
                    ) : (
                      <FaPlus className="text-xs" />
                    )}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-[#141414]/55">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
