"use client";

import { useState } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import { FaMinus, FaPlus } from "react-icons/fa";

/** FAQ — from FAQ JSON */
export default function FAQ({ data }: { data: ResolvedSiteData }) {
  const { faq } = data;
  const items = faq.faqItems;
  const [open, setOpen] = useState(0);

  if (items.length === 0) return null;

  return (
    <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          {faq.pretitle && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {faq.pretitle}
            </p>
          )}
          <h2 className="mt-1 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
            {faq.title}
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl divide-y divide-[#141414]/10 md:mt-10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold leading-snug text-[#141414]">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-[#141414]/60">
                    {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-[#141414]/65">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
