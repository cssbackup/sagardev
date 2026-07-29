"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

export default function Newsletter({ data }: { data: ResolvedSiteData }) {
  const { formDetail, about, footer } = data;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const bg =
    formDetail.backgroundImage ||
    about.backgroundImage ||
    data.banner.backgroundImage;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src={bg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          themeId={THEME}
        />
        <div className="absolute inset-0 bg-[var(--snifty-navy,#0b1f33)]/85" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <RevealBlur className="mx-auto w-full max-w-xl text-center">
          <h2 className="t3-serif text-2xl font-bold text-white md:text-3xl lg:text-[2.15rem]">
            {formDetail.title || "Ready to find your dream home?"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            {formDetail.desc || about.desc}
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                footer.newsletterPlaceholder ||
                formDetail.formFields.find((f) => f.type === "email")?.placeholder ||
                "Enter your email"
              }
              className="min-h-[48px] flex-1 rounded-md border-0 bg-white px-4 text-sm text-[#0b1f33] outline-none"
            />
            <button
              type="submit"
              className="min-h-[48px] rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 text-sm font-bold text-white transition hover:brightness-110"
            >
              {sent
                ? "Sent"
                : footer.newsletterButtonLabel || formDetail.formSubmitLabel || "Submit"}
            </button>
          </form>
        </RevealBlur>
      </div>
    </section>
  );
}
