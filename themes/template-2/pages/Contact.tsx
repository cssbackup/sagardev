"use client";

import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Contact({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const contact = data.footer.footerContact;
  const phone = contact.phone || data.topbar.phone;
  const email = contact.email || data.topbar.email;
  const location = contact.location;

  const mainImage =
    data.contactPage.sideImage ||
    data.about.sideImage ||
    data.properties.listings?.[0]?.image ||
    "";
  const smallImage =
    data.about.backgroundImage ||
    data.properties.listings?.[1]?.image ||
    data.template.image ||
    mainImage;

  const socialLinks = data.footer.socialLinks?.length
    ? data.footer.socialLinks
    : data.topbar.socialLinks;

  const findHref = (keys: string[]) =>
    socialLinks.find((s) => keys.some((k) => s.label.toLowerCase().includes(k)))
      ?.href || "#";

  const social = [
    { label: "facebook", href: findHref(["facebook"]), Icon: FaFacebookF },
    { label: "x", href: findHref(["twitter", "x"]), Icon: FaXTwitter },
    { label: "instagram", href: findHref(["instagram"]), Icon: FaInstagram },
  ];
  const submitLabel = data.contactPage.formSubmitLabel || "Submit";

  return (
    <div className="bg-white">
      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
            <div
              className="absolute -bottom-4 -left-4 z-0 h-28 w-28 border border-[var(--reroom-accent,#ff6b00)] md:h-32 md:w-32"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, var(--reroom-accent,#ff6b00) 1px, transparent 1px), linear-gradient(-45deg, var(--reroom-accent,#ff6b00) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
                backgroundPosition: "0 0, 0 7px",
              }}
              aria-hidden
            />

            <div className="relative z-10 ml-5 mt-6 aspect-square overflow-hidden bg-[#f3f1ed] md:ml-8 md:mt-8">
              <MediaImage
                src={mainImage}
                alt="Project detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 36vw"
                themeId={theme}
              />
            </div>

            <div className="absolute left-0 top-0 z-20 h-24 w-24 overflow-hidden bg-[#e8e6e1] shadow-md md:h-28 md:w-28">
              <MediaImage
                src={smallImage}
                alt="Workshop"
                fill
                className="object-cover"
                sizes="112px"
                themeId={theme}
              />
            </div>
          </div>

          <div className="lg:pl-4">
            <Breadcrumb
              items={data.contactPage.breadcrumb}
              theme={theme}
              className="mb-4"
            />
            <h1 className="text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#141414] md:text-[2.4rem] lg:text-[2.65rem]">
              We are here to help
            </h1>
            <span className="mt-4 block h-[2px] w-12 bg-[var(--reroom-accent,#ff6b00)]" />

            <div className="mt-5 space-y-1 text-[0.95rem] leading-[1.65] text-[#5c5c5c] md:text-base">
              {location.split(",").length >= 2 ? (
                <>
                  <p>{location.split(",").slice(0, -1).join(",").trim()},</p>
                  <p>{location.split(",").slice(-1)[0].trim()}</p>
                </>
              ) : (
                <p>{location}</p>
              )}
              <p className="pt-2">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="transition hover:text-[var(--reroom-accent,#ff6b00)]"
                >
                  {phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="transition hover:text-[var(--reroom-accent,#ff6b00)]"
                >
                  {email}
                </a>
              </p>
            </div>

            <div className="mt-6 flex items-center gap-5 text-xl text-[var(--reroom-accent,#ff6b00)]">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="transition hover:opacity-70"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1a1a1a] px-4 py-12 text-white md:px-8 md:py-14 lg:px-10 lg:py-16">
        <div
          className="pointer-events-none absolute right-0 top-0 h-28 w-40 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,255,255,0.2) 6px, rgba(255,255,255,0.2) 7px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-0">
          <div
            className="pointer-events-none absolute left-1/2 top-[12%] hidden h-[76%] w-px -translate-x-1/2 bg-white/70 lg:block"
            style={{ transform: "translateX(-50%) rotate(18deg)" }}
            aria-hidden
          />

          <div className="lg:pr-16">
            <h2 className="max-w-md text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] md:text-[2.2rem]">
              Let&apos;s talk about your project
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Fill out the form, or call us to set up a meeting at{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="underline decoration-white/50 underline-offset-4 transition hover:text-[var(--reroom-accent,#ff6b00)] hover:decoration-[var(--reroom-accent,#ff6b00)]"
              >
                {phone}
              </a>
            </p>
          </div>

          <div className="lg:pl-16">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <UnderlineField id="c-name" label="Full name" />
              <UnderlineField id="c-phone" label="Phone number" type="tel" />
              <UnderlineField id="c-email" label="Email" type="email" />
              <UnderlineField id="c-message" label="Message" textarea />

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-[var(--reroom-accent,#ff6b00)] px-8 py-3 text-sm font-bold text-white transition hover:brightness-110"
                >
                  {submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function UnderlineField({
  id,
  label,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const line =
    "w-full border-0 border-b border-white/35 bg-transparent px-0 pb-2 pt-1 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[var(--reroom-accent,#ff6b00)]";

  return (
    <div>
      <label htmlFor={id} className="text-sm text-white/85">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={label}
          rows={2}
          className={`${line} mt-2 resize-y`}
        />
      ) : (
        <input id={id} name={label} type={type} className={`${line} mt-2`} />
      )}
    </div>
  );
}
