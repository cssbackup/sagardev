"use client";

import Link from "next/link";
import {
  FaAward,
  FaEnvelope,
  FaFacebookF,
  FaHouse,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import { withTheme } from "@/lib/theme";
import type { LinkItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

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

function uniqueLinks(lists: LinkItem[][]) {
  const seen = new Set<string>();
  const out: LinkItem[] = [];
  for (const list of lists) {
    for (const link of list) {
      const key = link.href.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(link);
    }
  }
  return out;
}

export default function Footer({ data }: { data: ResolvedSiteData }) {
  const { footer, topbar, header } = data;
  const contact = footer.footerContact;
  const socialLinks = footer.socialLinks?.length
    ? footer.socialLinks
    : topbar.socialLinks;
  const logoText = header.logo || data.template.title;

  const exploreColumn =
    footer.footerColumns.find((c) => /explore|quick/i.test(c.title)) ??
    footer.footerColumns[0];
  const companyColumn =
    footer.footerColumns.find((c) => /company/i.test(c.title)) ??
    footer.footerColumns[1];
  const legalColumn =
    footer.footerColumns.find((c) => /legal/i.test(c.title)) ??
    footer.footerColumns[2];

  const extraRoutes: LinkItem[] = [
    { label: "Mission", href: "/mission" },
    { label: "Services", href: "/services" },
    { label: "Awards", href: "/awards" },
    { label: "Gallery", href: "/gallery" },
    { label: "Careers", href: "/careers" },
    { label: "Community", href: "/community" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  const exploreLinks = uniqueLinks([
    exploreColumn?.links ?? [],
    header.menu.map((m) => ({ label: m.label, href: m.href })),
    extraRoutes.slice(0, 4),
  ]).slice(0, 8);

  const companyLinks = uniqueLinks([
    companyColumn?.links ?? [],
    extraRoutes.slice(4),
  ]).slice(0, 8);

  const legalLinks = uniqueLinks([
    legalColumn?.links ?? [],
    footer.footerLegalLinks,
  ]);

  const disclaimerTitle = footer.disclaimerTitle || "Disclaimer";
  const disclaimerText = footer.disclaimerText;

  return (
    <footer className="bg-[var(--snifty-navy,#0b1f33)] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2 md:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-10">
        <div className="lg:col-span-3">
          <Link href={withTheme("/", THEME)} className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--snifty-red,#e11d2e)]">
              <FaHouse aria-hidden />
            </span>
            <span className="t3-serif text-xl font-bold">{logoText}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {footer.desc}
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={`${s.label}-${s.href}`}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm transition hover:bg-[var(--snifty-red,#e11d2e)]"
                >
                  {getSocialIcon(s.label)}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold">
            {exploreColumn?.title || "Explore"}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link
                  href={withTheme(link.href, THEME)}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold">
            {companyColumn?.title || "Company"}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link
                  href={withTheme(link.href, THEME)}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold">
            {legalColumn?.title || "Legal"}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link
                  href={withTheme(link.href, THEME)}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={withTheme("/awards", THEME)}
                className="inline-flex items-center gap-1.5 text-sm text-white/65 transition hover:text-white"
              >
                <FaAward className="text-[var(--snifty-red,#e11d2e)]" />
                Awards
              </Link>
            </li>
          </ul>

         
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-base font-semibold">
            {footer.contactLabel || "Contact Info"}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li className="flex gap-2.5">
              <FaLocationDot className="mt-0.5 shrink-0 text-[var(--snifty-red,#e11d2e)]" />
              {contact.location}
            </li>
            <li className="flex gap-2.5">
              <FaPhone className="mt-0.5 shrink-0 text-[var(--snifty-red,#e11d2e)]" />
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-white"
              >
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <FaEnvelope className="mt-0.5 shrink-0 text-[var(--snifty-red,#e11d2e)]" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      {disclaimerText && (
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-10">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
              {disclaimerTitle}
            </h4>
            <p className="mt-2 max-w-5xl text-[12px] leading-relaxed text-white/45 md:text-[13px]">
              {disclaimerText}
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-white/50 md:flex-row md:items-center md:px-8 lg:px-10">
          <p>{footer.copyrightText}</p>
          <div className="flex flex-wrap gap-4">
            {footer.footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={withTheme(link.href, THEME)}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
