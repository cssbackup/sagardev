"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

const socialIcon: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  x: <FaXTwitter />,
  pinterest: <FaPinterestP />,
};

function getSocialIcon(label: string) {
  return socialIcon[label.toLowerCase()] ?? label.charAt(0).toUpperCase();
}

export default function Footer({ data }: { data: ResolvedSiteData }) {
  const { footer, topbar, banner } = data;
  const contact = footer.footerContact;
  const socialLinks = footer.socialLinks?.length
    ? footer.socialLinks
    : topbar.socialLinks;

  const exploreLinks =
    footer.footerColumns.find((c) => /explore/i.test(c.title))?.links ??
    footer.footerColumns[0]?.links ??
    [];
  const companyLinks =
    footer.footerColumns.find((c) => /company/i.test(c.title))?.links ??
    footer.footerColumns[1]?.links ??
    [];
  const legalLinks =
    footer.footerColumns.find((c) => /legal/i.test(c.title))?.links?.length
      ? footer.footerColumns.find((c) => /legal/i.test(c.title))!.links
      : footer.footerLegalLinks;

  const logoText = (data.template.title || "re/room").toLowerCase();
  const disclaimerTitle = footer.disclaimerTitle || "Disclaimer";
  const disclaimerText = footer.disclaimerText;

  return (
    <footer className="bg-[#141414] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:px-8 md:py-16 lg:px-10">
        <div className="sm:col-span-2 md:col-span-1">
          <Link
            href={withTheme("/", THEME)}
            className="inline-flex items-center border border-white px-3 py-1.5 text-sm font-semibold lowercase tracking-tight"
          >
            {logoText}
            <span>.</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            {footer.desc || banner.desc}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-base text-white/80">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="transition hover:text-[var(--reroom-accent,#ff6b00)]"
              >
                {getSocialIcon(s.label)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">
            {footer.footerColumns[0]?.title || "Explore"}
          </p>
          <nav className="mt-4 flex flex-col gap-2.5">
            {exploreLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={withTheme(link.href, THEME)}
                className="text-sm text-white/55 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold">
            {footer.footerColumns[1]?.title || "Company"}
          </p>
          <nav className="mt-4 flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={withTheme(link.href, THEME)}
                className="text-sm text-white/55 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold">
            {footer.legalTitle || "Legal"}
          </p>
          <nav className="mt-4 flex flex-col gap-2.5">
            {legalLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={withTheme(link.href, THEME)}
                className="text-sm text-white/55 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 space-y-2.5 text-sm text-white/55">
            <p className="text-sm font-semibold text-white">
              {footer.contactLabel || "Contact"}
            </p>
            <p>{contact.location}</p>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="block transition hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="block transition hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {disclaimerText && (
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--reroom-accent,#ff6b00)]">
              {disclaimerTitle}
            </p>
            <p className="mt-2 max-w-4xl text-xs leading-relaxed text-white/40">
              {disclaimerText}
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-10">
          <p>{footer.copyrightText}</p>
          <div className="flex flex-wrap items-center gap-2">
            {(footer.footerLegalLinks.length
              ? footer.footerLegalLinks
              : legalLinks
            ).map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-white/25">|</span>}
                <Link
                  href={withTheme(link.href, THEME)}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
