"use client";

import { useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type {
  FormField,
  QuotePageData,
  ResolvedSiteData,
  ThemeId,
} from "@/lib/types";
import { FaArrowRight, FaLock } from "react-icons/fa";

function fieldId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function LeadField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = fieldId(field.label);
  const isTextarea = field.type === "textarea";
  const isSelect = field.type === "select";
  const spanClass = field.fullWidth || isTextarea ? "sm:col-span-2" : "";

  const controlClass =
    "mt-2 w-full border border-[#141414]/12 bg-white px-3.5 py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#c44536]";

  return (
    <div className={spanClass}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#141414]"
      >
        {field.label}
        {field.required ? (
          <span className="ml-0.5 text-[#c44536]" aria-hidden>
            *
          </span>
        ) : null}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${controlClass} resize-none`}
        />
      ) : isSelect ? (
        <select
          id={id}
          name={id}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} ${!value ? "text-[#141414]/35" : ""}`}
        >
          <option value="">{field.placeholder}</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={field.type}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={controlClass}
        />
      )}
    </div>
  );
}

export default function LeadFormPage({
  data,
  theme,
  page,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
  page: QuotePageData;
}) {
  const { footer } = data;

  const privacyHref =
    footer.footerLegalLinks.find((l) =>
      l.label.toLowerCase().includes("privacy")
    )?.href || "/privacy";
  const termsHref =
    footer.footerLegalLinks.find((l) =>
      l.label.toLowerCase().includes("terms")
    )?.href || "/terms";

  const [values, setValues] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  }

  return (
    <div className="bg-white">
      <section className="relative isolate flex min-h-[240px] items-center justify-center overflow-hidden sm:min-h-[280px] md:min-h-[300px]">
        <MediaImage
          themeId={theme}
          src={page.bannerImage}
          alt={page.bannerImageAlt || page.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#141414]/55" />
        <div className="relative z-1 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-14 text-center sm:py-16">
          <Breadcrumb items={page.breadcrumb} theme={theme} variant="light" />
          <h1 className="mt-1 text-[2.4rem] font-semibold tracking-[-0.03em] text-white sm:text-[3rem] md:text-[3.5rem]">
            {page.title}
          </h1>
          {page.desc ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
              {page.desc}
            </p>
          ) : null}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {submitted ? (
            <div className="rounded-2xl border border-[#141414]/8 bg-[#f7f7f7] px-6 py-14 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#c44536] text-white">
                <FaArrowRight className="text-sm" aria-hidden />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-[#141414]">
                {page.successTitle || "Request sent"}
              </h2>
              {page.successDesc ? (
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#141414]/60">
                  {page.successDesc}
                </p>
              ) : null}
              <Link
                href={withTheme("/", theme)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#c44536] underline underline-offset-4"
              >
                Back to home
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {page.formFields.map((field) => (
                  <LeadField
                    key={field.label}
                    field={field}
                    value={values[field.label] || ""}
                    onChange={(next) =>
                      setValues((prev) => ({ ...prev, [field.label]: next }))
                    }
                  />
                ))}
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#141414]/70">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#c44536]"
                  required
                />
                <span>
                  {page.consentPrefix || "I agree to the"}{" "}
                  <Link
                    href={withTheme(privacyHref, theme)}
                    className="font-semibold text-[#c44536] underline underline-offset-2"
                  >
                    {page.privacyLabel || "Privacy Policy"}
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={withTheme(termsHref, theme)}
                    className="font-semibold text-[#c44536] underline underline-offset-2"
                  >
                    {page.termsLabel || "Terms & Conditions"}
                  </Link>
                  .
                </span>
              </label>

              <div className="flex flex-col items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!agreed}
                  className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-md bg-[#c44536] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a8382c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {page.formSubmitLabel}
                  <FaArrowRight className="text-[10px]" />
                </button>
                {page.secureNote ? (
                  <p className="inline-flex items-center gap-2 text-xs text-[#141414]/45">
                    <FaLock className="text-[10px]" aria-hidden />
                    {page.secureNote}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
