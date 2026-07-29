"use client";

import { useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { FormField, ResolvedSiteData } from "@/lib/types";

function Field({
  field,
  value,
  onChange,
  compact,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
}) {
  const id = `home-${field.label.toLowerCase().replace(/\s+/g, "-")}`;

  if (field.type === "textarea") {
    return (
      <div className="border-b border-white/25 py-3">
        <label htmlFor={id} className="block text-sm font-medium text-white">
          {field.label}
        </label>
        <input
          id={id}
          name={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>
    );
  }

  return (
    <div className={`border-b border-white/25 py-3 ${compact ? "" : ""}`}>
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {field.label}
      </label>
      <input
        id={id}
        name={id}
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="mt-2 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
      />
    </div>
  );
}

/** CTA — from FormDetail JSON */
export default function CTA({ data }: { data: ResolvedSiteData }) {
  const { formDetail } = data;
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!formDetail.title) return null;

  const fields = formDetail.formFields;
  const nameField = fields.find((f) => /name/i.test(f.label));
  const phoneField = fields.find((f) => /phone|tel|mobile/i.test(f.label));
  const otherFields = fields.filter(
    (f) => f !== nameField && f !== phoneField
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function renderField(field: FormField, compact?: boolean) {
    return (
      <Field
        key={field.label}
        field={field}
        value={values[field.label] ?? ""}
        onChange={(v) => setValues((prev) => ({ ...prev, [field.label]: v }))}
        compact={compact}
      />
    );
  }

  return (
    <section
      id="book-a-visit"
      className="scroll-mt-24 px-4 py-7 md:px-8 md:py-8 lg:px-10"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#141414] md:rounded-[2rem]">
        {formDetail.backgroundImage && (
          <div className="absolute inset-0 opacity-30">
            <MediaImage
              themeId={data.themeId}
              src={formDetail.backgroundImage}
              alt={formDetail.backgroundImageTitle || formDetail.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[#141414]/72" />

        <div className="relative grid items-center gap-10 px-6 py-10 sm:px-8 md:grid-cols-2 md:gap-12 md:px-12 md:py-14 lg:px-16 lg:py-16">
          {/* Left — copy */}
          <div className="flex flex-col justify-center">
            {formDetail.pretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {formDetail.pretitle}
              </p>
            )}
            <h2 className="mt-4 max-w-md text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.35rem] md:text-[2.75rem]">
              {formDetail.title}
            </h2>
            {formDetail.desc && (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-[15px]">
                {formDetail.desc}
              </p>
            )}
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <p className="text-sm text-white/75">
                {formDetail.successMessage ||
                  "Thank you — we received your request. An advisor will reach out shortly."}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                {nameField && phoneField ? (
                  <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                    {renderField(nameField, true)}
                    {renderField(phoneField, true)}
                  </div>
                ) : (
                  <>
                    {nameField && renderField(nameField)}
                    {phoneField && renderField(phoneField)}
                  </>
                )}

                {otherFields.map((field) => renderField(field))}

                <div className="mt-8">
                  <button
                    type="submit"
                    className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#141414] transition hover:bg-white/90"
                  >
                    {formDetail.formSubmitLabel || "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
