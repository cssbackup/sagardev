"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { FormField, ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = field.label.toLowerCase().replace(/\s+/g, "-");
  const isTextarea = field.type === "textarea";

  return (
    <div className={isTextarea ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/50"
      >
        {field.label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 w-full resize-none border border-[#141414]/12 bg-[#faf8f4] px-3.5 py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#c44536] focus:bg-white"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 w-full border border-[#141414]/12 bg-[#faf8f4] px-3.5 py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#c44536] focus:bg-white"
        />
      )}
    </div>
  );
}

export default function ContactContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.contactPage;
  const contact = page.footerContact;
  const { footer } = data;
  const privacyLink = footer.footerLegalLinks.find((l) =>
    l.label.toLowerCase().includes("privacy")
  );

  const [values, setValues] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  }

  const infoCards = [
    {
      icon: FaMapMarkerAlt,
      label: page.officeLabel,
      value: contact.location,
      href: undefined as string | undefined,
    },
    {
      icon: FaPhoneAlt,
      label: page.phoneLabel,
      value: contact.phone,
      href: phoneHref,
    },
    {
      icon: FaEnvelope,
      label: page.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ].filter((item) => item.label && item.value);

  return (
    <div className="bg-white">
      <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={page.breadcrumb} theme={theme} />

          {/* Left sticky · natural heights (no equal stretch) */}
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left — sticky contact info (below form on mobile) */}
            <div className="order-2 rounded-2xl border border-[#141414]/10 bg-[#faf8f4] p-5 md:p-7 lg:sticky lg:top-28 lg:order-1 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {page.pretitle}
              </p>
              <h1 className="mt-2.5 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#141414] md:text-[2.1rem]">
                {page.title}
              </h1>
              <span className="mt-3 block h-[2px] w-10 bg-[#c44536]" />
              {page.desc && (
                <p className="mt-3 text-sm leading-relaxed text-[#141414]/65">
                  {page.desc}
                </p>
              )}

              {infoCards.length > 0 && (
                <ul className="mt-5 space-y-2.5 border-t border-[#141414]/10 pt-5">
                  {infoCards.map((item) => {
                    const Icon = item.icon;
                    const className =
                      "flex items-start gap-3 rounded-2xl border border-[#141414]/8 bg-white px-4 py-3 transition hover:border-[#c44536]/30";
                    const content = (
                      <>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#c44536]/10 text-[#c44536]">
                          <Icon className="text-xs" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#141414]/40">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-sm font-semibold leading-snug text-[#141414]">
                            {item.value}
                          </span>
                        </span>
                      </>
                    );

                    return (
                      <li key={item.label}>
                        {item.href ? (
                          <a href={item.href} className={className}>
                            {content}
                          </a>
                        ) : (
                          <div className={className}>{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {(page.reachDesc || page.formDesc) && (
                <p className="mt-5 border-t border-[#141414]/10 pt-4 text-sm leading-relaxed text-[#141414]/55">
                  {page.reachDesc || page.formDesc}
                </p>
              )}
            </div>

            {/* Right — form (first on mobile) */}
            <div className="order-1 rounded-2xl border border-[#141414]/10 bg-[#faf8f4] p-5 md:p-7 lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {page.formPretitle || "Write us"}
              </p>
              <h2 className="mt-2.5 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#141414] md:text-[2.1rem]">
                {page.formTitle}
              </h2>
              {page.formDesc && (
                <p className="mt-3 text-sm leading-relaxed text-[#141414]/65">
                  {page.formDesc}
                </p>
              )}

              <div className="mt-5 rounded-xl border border-[#141414]/8 bg-white p-4 md:p-5">
                {submitted ? (
                  <div className="py-6 text-center">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center bg-[#c44536] text-white">
                      <FaArrowRight className="text-sm" aria-hidden />
                    </span>
                    <p className="mt-4 text-lg font-semibold text-[#141414]">
                      {page.successTitle}
                    </p>
                    {page.successDesc && (
                      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#141414]/60">
                        {page.successDesc}
                      </p>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {page.formFields.map((field) => (
                        <Field
                          key={field.label}
                          field={field}
                          value={values[field.label] ?? ""}
                          onChange={(v) =>
                            setValues((prev) => ({
                              ...prev,
                              [field.label]: v,
                            }))
                          }
                        />
                      ))}
                    </div>

                    <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#141414]/55">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 border-[#141414]/25 accent-[#c44536]"
                      />
                      <span>
                        {page.consentPrefix}{" "}
                        <Link
                          href={withTheme(
                            privacyLink?.href || "/privacy",
                            theme
                          )}
                          className="underline underline-offset-2 transition hover:text-[#141414]"
                        >
                          {privacyLink?.label || data.privacyPage.title}
                        </Link>
                        .
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!agreed}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#141414] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {page.formSubmitLabel}
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
