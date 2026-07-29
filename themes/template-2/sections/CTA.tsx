"use client";

import { useState } from "react";
import { RevealBlur } from "@/lib/motion";
import type { FormField, ResolvedSiteData } from "@/lib/types";

/** Centered strip CTA — not t1 rounded dark card with side form */
export default function CTA({ data }: { data: ResolvedSiteData }) {
  const { formDetail, footer, topbar } = data;
  const phone = footer.footerContact.phone || topbar.phone;
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!formDetail.title) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="book-a-visit"
      className="scroll-mt-24 border-t border-[var(--reroom-accent,#ff6b00)] bg-[var(--reroom-accent,#ff6b00)] px-5 py-16 text-[#0e0e0e] md:px-10 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <RevealBlur className="text-center">
          {formDetail.pretitle && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0e0e0e]/55">
              {formDetail.pretitle}
            </p>
          )}
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em]">
            {formDetail.title}
          </h2>
          {formDetail.desc && (
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#0e0e0e]/65">
              {formDetail.desc}{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="font-semibold underline underline-offset-2"
              >
                {phone}
              </a>
            </p>
          )}
        </RevealBlur>

        <RevealBlur delay={0.08} className="mt-10">
          {submitted ? (
            <p className="text-center text-sm font-medium">
              Thanks — an advisor will reach out shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formDetail.formFields.map((field) => (
                <Field
                  key={field.label}
                  field={field}
                  value={values[field.label] ?? ""}
                  onChange={(v) =>
                    setValues((prev) => ({ ...prev, [field.label]: v }))
                  }
                />
              ))}
              <button
                type="submit"
                className="w-full bg-[#0e0e0e] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0e0e0e]/90"
              >
                {formDetail.formSubmitLabel}
              </button>
            </form>
          )}
        </RevealBlur>
      </div>
    </section>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `t2-cta-${field.label.toLowerCase().replace(/\s+/g, "-")}`;
  const cls =
    "w-full border-0 border-b border-[#0e0e0e]/25 bg-transparent px-0 py-3 text-sm text-[#0e0e0e] outline-none placeholder:text-[#0e0e0e]/40 focus:border-[#0e0e0e]";

  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || field.label}
        className={`${cls} resize-none`}
      />
    );
  }

  return (
    <input
      id={id}
      name={id}
      type={field.type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder || field.label}
      className={cls}
    />
  );
}
