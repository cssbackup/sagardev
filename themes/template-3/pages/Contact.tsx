"use client";

import { useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { FormField, ResolvedSiteData, ThemeId } from "@/lib/types";

const socialIcon: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  x: <FaXTwitter />,
};

function getSocialIcon(label: string) {
  return socialIcon[label.toLowerCase()] ?? label.charAt(0).toUpperCase();
}

export default function Contact({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.contactPage;
  const contact = page.footerContact || data.footer.footerContact;
  const phone = contact.phone || data.topbar.phone;
  const email = contact.email || data.topbar.email;
  const location = contact.location;

  const socialLinks = data.footer.socialLinks?.length
    ? data.footer.socialLinks
    : data.topbar.socialLinks;

  const fields = page.formFields ?? [];
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const channels = [
    location
      ? {
          key: "office",
          label: page.officeLabel || "Office",
          value: location,
          href: undefined as string | undefined,
          Icon: FaLocationDot,
        }
      : null,
    phone
      ? {
          key: "phone",
          label: page.phoneLabel || "Phone",
          value: phone,
          href: `tel:${phone.replace(/\s/g, "")}`,
          Icon: FaPhone,
        }
      : null,
    email
      ? {
          key: "email",
          label: page.emailLabel || "Email",
          value: email,
          href: `mailto:${email}`,
          Icon: FaEnvelope,
        }
      : null,
  ].filter(Boolean) as {
    key: string;
    label: string;
    value: string;
    href?: string;
    Icon: typeof FaPhone;
  }[];

  return (
    <div className="bg-white text-[#0b1f33]">
      {/* Hero */}
      <section className="bg-[var(--snifty-navy,#0b1f33)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-7 md:px-8 md:py-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
          <RevealBlur>
            <Breadcrumb
              items={page.breadcrumb}
              theme={theme}
              variant="light"
              className="mb-6"
            />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--snifty-red,#e11d2e)]">
              {page.pretitle}
            </p>
            <h1 className="t3-serif mt-3 text-[2.15rem] font-bold leading-[1.12] text-white md:text-[2.75rem] lg:text-[3.1rem]">
              {page.title}
            </h1>
            {page.desc && (
              <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
                {page.desc}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
                >
                  <FaPhone className="text-xs" />
                  Call now
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <FaEnvelope className="text-xs" />
                  Email us
                </a>
              )}
            </div>

            {(phone || email || location) && (
              <div className="mt-10 space-y-2 border-t border-white/10 pt-6 text-sm text-white/70">
                {location && (
                  <p className="flex items-start gap-2">
                    <FaLocationDot className="mt-1 shrink-0 text-[var(--snifty-red,#e11d2e)]" />
                    {location}
                  </p>
                )}
                {phone && (
                  <p className="flex items-center gap-2">
                    <FaPhone className="shrink-0 text-[var(--snifty-red,#e11d2e)]" />
                    {phone}
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="shrink-0 text-[var(--snifty-red,#e11d2e)]" />
                    {email}
                  </p>
                )}
              </div>
            )}
          </RevealBlur>

          {page.sideImage && (
            <RevealUp className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#152a3d] sm:min-h-[340px] lg:min-h-[460px]">
              <MediaImage
                src={page.sideImage}
                alt={page.sideImageTitle || page.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                themeId={theme}
                priority
              />
              <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--snifty-red,#e11d2e)]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--snifty-navy,#0b1f33)]/90 to-transparent p-5 md:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                  Contact
                </p>
                <p className="t3-serif mt-1 text-lg font-bold text-white md:text-xl">
                  We reply quickly — usually same day
                </p>
              </div>
            </RevealUp>
          )}
        </div>
      </section>

      {/* Channels strip */}
      {channels.length > 0 && (
        <section className="border-b border-[#eef0f3] bg-white px-4 py-8 md:px-8 lg:px-10">
          <Stagger className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
            {channels.map((item) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--snifty-red,#e11d2e)]/10 text-[var(--snifty-red,#e11d2e)]">
                    <item.Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b6572]">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[#0b1f33]">
                      {item.value}
                    </span>
                  </span>
                </>
              );

              return (
                <StaggerItem key={item.key}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex h-full items-start gap-3 rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-4 transition hover:border-[var(--snifty-red,#e11d2e)]/35 hover:bg-white"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex h-full items-start gap-3 rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-4">
                      {content}
                    </div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* Form */}
      <section className="bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.25fr] lg:items-start lg:gap-10">
          <RevealBlur className="lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              {page.reachPretitle || "Reach us"}
            </p>
            <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
              {page.reachTitle || "Office & channels"}
            </h2>
            {page.reachDesc && (
              <p className="mt-3 text-sm leading-relaxed text-[#5b6572]">
                {page.reachDesc}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b6572]">
                  Follow
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={`${s.label}-${s.href}`}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--snifty-navy,#0b1f33)] text-sm text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
                    >
                      {getSocialIcon(s.label)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-xl border border-[#eef0f3] bg-white p-5">
              <p className="t3-serif text-lg font-bold text-[#0b1f33]">
                Prefer a visit?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6572]">
                Share your preferred area and timeline in the form — we will
                arrange the next step.
              </p>
              <a
                href="#contact-form"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--snifty-red,#e11d2e)] transition hover:gap-3"
              >
                Jump to form
                <FaArrowRight className="text-[11px]" />
              </a>
            </div>
          </RevealBlur>

          <RevealUp>
            <div
              id="contact-form"
              className="scroll-mt-28 rounded-2xl border border-[#eef0f3] bg-white p-6 shadow-[0_16px_40px_rgba(11,31,51,0.06)] md:p-8 lg:p-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                {page.formPretitle || "Write us"}
              </p>
              <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-[1.85rem]">
                {page.formTitle || "Send a message"}
              </h2>
              {page.formDesc && (
                <p className="mt-2 text-sm text-[#5b6572]">{page.formDesc}</p>
              )}

              {sent ? (
                <div className="mt-8 rounded-xl border border-[var(--snifty-red,#e11d2e)]/25 bg-[var(--snifty-red,#e11d2e)]/5 p-6 md:p-8">
                  <p className="t3-serif text-xl font-bold text-[#0b1f33] md:text-2xl">
                    {page.successTitle || "Message sent"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5b6572]">
                    {page.successDesc ||
                      "Thank you — your message has been sent. We'll be in touch soon."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--snifty-navy,#0b1f33)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
                  >
                    Send another message
                    <FaArrowRight className="text-[11px]" />
                  </button>
                </div>
              ) : (
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields.map((field) => (
                      <Field
                        key={field.label}
                        field={field}
                        wide={
                          field.type === "textarea" ||
                          /message|detail|require/i.test(field.label)
                        }
                      />
                    ))}
                  </div>

                  {page.consentPrefix && (
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-[#5b6572]">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 rounded border-[#d5dae3] accent-[var(--snifty-red,#e11d2e)]"
                      />
                      <span>
                        {page.consentPrefix}{" "}
                        <a
                          href={withTheme("/privacy", theme)}
                          className="font-semibold text-[var(--snifty-navy,#0b1f33)] underline underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto"
                  >
                    {page.formSubmitLabel || "Send Message"}
                    <FaArrowRight className="text-[11px]" />
                  </button>
                </form>
              )}
            </div>
          </RevealUp>
        </div>
      </section>
    </div>
  );
}

function Field({
  field,
  wide,
}: {
  field: FormField;
  wide?: boolean;
}) {
  const id = `t3-contact-${field.label.toLowerCase().replace(/\s+/g, "-")}`;
  const isTextarea = field.type === "textarea" || wide;
  const inputClass =
    "mt-1.5 w-full rounded-lg border border-[#e8ecf1] bg-[#f7f8fa] px-4 py-3 text-sm text-[#0b1f33] outline-none transition placeholder:text-[#5b6572]/60 focus:border-[var(--snifty-red,#e11d2e)] focus:bg-white focus:ring-2 focus:ring-[var(--snifty-red,#e11d2e)]/15";

  return (
    <div className={isTextarea ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="text-sm font-semibold text-[#0b1f33]">
        {field.label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={field.label}
          rows={5}
          required
          placeholder={field.placeholder}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={field.label}
          type={field.type || "text"}
          required
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
