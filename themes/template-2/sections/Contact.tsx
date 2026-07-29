"use client";

import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

export default function ContactSection({ data }: { data: ResolvedSiteData }) {
  const router = useRouter();
  const { formDetail, footer, topbar } = data;
  const phone = footer.footerContact.phone || topbar.phone;
  const fields = formDetail.formFields ?? [];

  const nameField = fields.find((f) => /name/i.test(f.label));
  const phoneField = fields.find((f) => /phone|tel/i.test(f.label));
  const emailField = fields.find((f) => /email|mail/i.test(f.label));
  const messageField = fields.find((f) =>
    /message|require|note|detail|project/i.test(f.label)
  );
  const used = new Set(
    [nameField, phoneField, emailField, messageField]
      .filter(Boolean)
      .map((f) => f!.label)
  );
  const rest = fields.filter((f) => !used.has(f.label));

  function goToContact(e: React.FormEvent) {
    e.preventDefault();
    router.push(withTheme("/contact", THEME));
  }

  return (
    <section className="relative bg-white px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
      <div
        className="pointer-events-none absolute inset-x-4 top-10 bottom-10 -z-0 opacity-80 md:inset-x-8 lg:inset-x-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,107,0,0.35) 8px, rgba(255,107,0,0.35) 9px)",
        }}
        aria-hidden
      />

      <RevealBlur className="relative z-10 mx-auto max-w-7xl rounded-[1.5rem] bg-[#141414] px-6 py-10 text-white md:px-10 md:py-12 lg:rounded-[1.75rem] lg:px-14 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <aside className="self-start lg:self-center">
            <h2 className="max-w-md text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] md:text-[2.5rem]">
              {formDetail.title}
            </h2>
            <span className="mt-4 block h-[3px] w-12 bg-[var(--reroom-accent,#ff6b00)]" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              {formDetail.desc}{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="font-semibold text-[var(--reroom-accent,#ff6b00)] transition hover:brightness-110"
              >
                {phone}
              </a>
              .
            </p>
          </aside>

          <div className="relative rounded-[1.25rem] bg-white p-6 text-[#141414] md:p-8 lg:p-9">
            <form className="space-y-4" onSubmit={goToContact}>
              {(nameField || phoneField) && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {nameField && (
                    <Field
                      id="t2-name"
                      label={nameField.label}
                      type={nameField.type}
                      placeholder={nameField.placeholder}
                    />
                  )}
                  {phoneField && (
                    <Field
                      id="t2-phone"
                      label={phoneField.label}
                      type={phoneField.type || "tel"}
                      placeholder={phoneField.placeholder}
                    />
                  )}
                </div>
              )}

              {emailField && (
                <Field
                  id="t2-email"
                  label={emailField.label}
                  type={emailField.type || "email"}
                  placeholder={emailField.placeholder}
                />
              )}

              {messageField && (
                <Field
                  id="t2-message"
                  label={messageField.label}
                  type="textarea"
                  placeholder={messageField.placeholder}
                  rows={5}
                />
              )}

              {rest.map((field) => (
                <Field
                  key={field.label}
                  id={`t2-${field.label.toLowerCase().replace(/\s+/g, "-")}`}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  rows={field.type === "textarea" ? 4 : undefined}
                />
              ))}

              <div className="relative pt-2">
                <button
                  type="submit"
                  className="absolute -bottom-4 -right-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--reroom-accent,#ff6b00)] text-white shadow-[0_8px_24px_rgba(255,107,0,0.45)] transition hover:brightness-110 md:h-16 md:w-16"
                  aria-label={formDetail.formSubmitLabel || "Send a message"}
                >
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </RevealBlur>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  rows,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  const isTextarea = type === "textarea";
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={label}
          rows={rows || 5}
          placeholder={placeholder || label}
          className="w-full resize-y rounded-lg border border-[#141414]/12 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#141414]/40 focus:border-[var(--reroom-accent,#ff6b00)]"
        />
      ) : (
        <input
          id={id}
          name={label}
          type={type || "text"}
          placeholder={placeholder || label}
          className="w-full rounded-lg border border-[#141414]/12 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#141414]/40 focus:border-[var(--reroom-accent,#ff6b00)]"
        />
      )}
    </div>
  );
}
