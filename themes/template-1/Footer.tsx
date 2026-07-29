"use client";

import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaArrowRight, FaXTwitter } from "react-icons/fa6";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;

const socialIcon: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  x: <FaXTwitter />,
  youtube: <FaYoutube />,
};

function getSocialIcon(label: string) {
  return socialIcon[label.toLowerCase()] ?? label.charAt(0).toUpperCase();
}

export default function Footer({ data }: { data: ResolvedSiteData }) {
  const { footer, topbar, header } = data;
  const contact = footer.footerContact;
  const columns = footer.footerColumns;
  const socialLinks = footer.socialLinks?.length
    ? footer.socialLinks
    : topbar.socialLinks;

  return (
    <footer className="bg-[#141414] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-8 md:pt-12 lg:px-10">
        {/* Brand and newsletter */}
        <div className="grid gap-8 border-b border-white/10 pb-9 md:grid-cols-[1fr_1.05fr] md:items-end md:gap-14">
          <div>
            <Link
              href={withTheme("/", THEME)}
              className="inline-block text-xl font-bold tracking-[0.16em] text-white"
            >
              {header.logo.toUpperCase()}
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
              {footer.desc}
            </p>
          </div>

          {footer.newsletterTitle && (
            <form
              onSubmit={(event) => event.preventDefault()}
              className="md:justify-self-end md:w-full md:max-w-lg"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c44536]">
                {footer.newsletterTitle}
              </p>
              <div className="mt-3 flex border-b border-white/25 transition focus-within:border-white">
                <input
                  type="email"
                  required
                  aria-label={footer.newsletterPlaceholder || "Email address"}
                  placeholder={footer.newsletterPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  aria-label={footer.newsletterButtonLabel || "Subscribe"}
                  className="flex shrink-0 items-center gap-2 px-1 py-3 text-sm font-semibold text-white transition hover:text-[#c44536]"
                >
                  {footer.newsletterButtonLabel}
                  <FaArrowRight className="text-xs" aria-hidden />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Equal navigation groups */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-9 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {column.title}
              </p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <Link
                    key={`${column.title}-${link.label}-${link.href}`}
                    href={withTheme(link.href, THEME)}
                    className="w-fit text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Equal contact cards */}
        <div className="grid border-y border-white/10 sm:grid-cols-3">
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="group flex items-start gap-3 border-b border-white/10 py-5 transition hover:bg-white/3 sm:border-b-0 sm:border-r sm:px-5"
          >
            <FaPhoneAlt className="mt-1 shrink-0 text-[#c44536]" aria-hidden />
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Call an advisor
              </span>
              <span className="mt-1 block text-sm text-white/75 group-hover:text-white">
                {contact.phone}
              </span>
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-start gap-3 border-b border-white/10 py-5 transition hover:bg-white/3 sm:border-b-0 sm:border-r sm:px-5"
          >
            <FaEnvelope className="mt-1 shrink-0 text-[#c44536]" aria-hidden />
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Email us
              </span>
              <span className="mt-1 block break-all text-sm text-white/75 group-hover:text-white">
                {contact.email}
              </span>
            </span>
          </a>
          <div className="group flex items-start gap-3 py-5 transition hover:bg-white/3 sm:px-5">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-[#c44536]" aria-hidden />
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {footer.officeLabel || "Visit us"}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-white/75 transition group-hover:text-white">
                {contact.location}
              </span>
            </span>
          </div>
        </div>

        {/* Compact disclaimer */}
        {footer.disclaimerText && (
          <div className="py-6">
            <p className="max-w-6xl text-[11px] leading-relaxed text-white/35">
              <span className="font-semibold text-white/50">
                {footer.disclaimerTitle || "Disclaimer"}:{" "}
              </span>
              {footer.disclaimerText}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <p>{footer.copyrightText}</p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={`${social.label}-${social.href}`}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center border border-white/15 text-xs text-white/60 transition hover:border-[#c44536] hover:bg-[#c44536] hover:text-white"
                >
                  {getSocialIcon(social.label)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
