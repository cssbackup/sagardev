"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { RevealBlur, RevealUp } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

export default function FAQ({ data }: { data: ResolvedSiteData }) {
  const { faq, banner } = data;
  const [open, setOpen] = useState(0);
  const cta = banner.buttons?.[0];

  const titleWords = faq.title.split(" ");
  const highlightIdx = titleWords.length > 1 ? 1 : 0;

  return (
    <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <RevealBlur className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
            {faq.pretitle}
          </p>
          <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl lg:text-[2.15rem]">
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`}>
                {i > 0 ? " " : ""}
                {i === highlightIdx ? (
                  <span className="text-[var(--snifty-red,#e11d2e)]">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>
        </RevealBlur>

        <div className="mt-10 space-y-3">
          {faq.faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <RevealUp key={item.question} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-[var(--snifty-red,#e11d2e)]/35 shadow-[0_12px_30px_rgba(225,29,46,0.08)]"
                      : "border-[#e8ecf1] shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="t3-serif text-[15px] font-bold text-[#0b1f33] md:text-base">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                          : "bg-[#f0f2f5] text-[#0b1f33]"
                      }`}
                    >
                      <FaChevronDown
                        className={`text-xs transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-[#eef0f3] px-5 pb-5 pt-4 text-sm leading-relaxed text-[#5b6572] md:px-6 md:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealUp>
            );
          })}
        </div>

        <RevealUp className="mt-10 text-center" delay={0.15}>
          <p className="text-sm font-medium text-[#0b1f33]">
            Still have questions?
          </p>
          <Link
            href={withTheme(cta?.href || "/contact", THEME)}
            className="mt-4 inline-flex rounded-full bg-[var(--snifty-red,#e11d2e)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            {cta?.label || "Contact Us"}
          </Link>
        </RevealUp>
      </div>
    </section>
  );
}
