"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaHouse,
  FaPhone,
  FaXmark,
} from "react-icons/fa6";
import BackToTop from "@/themes/template-3/BackToTop";
import { withTheme } from "@/lib/theme";
import type { LinkItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isGroupActive(pathname: string, item: LinkItem) {
  if (isActivePath(pathname, item.href)) return true;
  return (item.children ?? []).some((child) => isActivePath(pathname, child.href));
}

function NavDropdown({ item }: { item: LinkItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const children = item.children ?? [];
  const active = isGroupActive(pathname, item);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition ${
          active ? "text-[var(--snifty-red,#e11d2e)]" : "text-white hover:text-white/80"
        }`}
      >
        {item.label}
        <FaChevronDown className={`text-[0.55rem] transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[180px] pt-3">
          <div className="rounded-md bg-white py-2 shadow-[0_16px_40px_rgba(11,31,51,0.18)]">
            {children.map((child) => (
              <Link
                key={`${child.label}-${child.href}`}
                href={withTheme(child.href, THEME)}
                className={`block px-4 py-2.5 text-sm transition ${
                  isActivePath(pathname, child.href)
                    ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                    : "text-[#0b1f33] hover:bg-[#f5f6f8]"
                }`}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({
  data,
}: {
  data: ResolvedSiteData;
  variant?: "overlay" | "solid";
}) {
  const { header, topbar, footer } = data;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  const phone = topbar.phone || footer.footerContact.phone;
  const email = topbar.email || footer.footerContact.email;
  const logoText = header.logo || data.template.title;
  const cta = header.buttons?.[0];

  const menu = useMemo(
    () =>
      header.menu
        .map((item) => ({
          ...item,
          children: item.children?.filter(
            (child) => !child.href.toLowerCase().includes("/team")
          ),
        }))
        .filter((item) => !item.href.toLowerCase().includes("/team")),
    [header.menu]
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full shadow-[0_8px_24px_rgba(11,31,51,0.08)]">
      {/* Top white bar */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-8 lg:px-10">
          <Link href={withTheme("/", THEME)} className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--snifty-red,#e11d2e)] text-white">
              <FaHouse className="text-base" aria-hidden />
            </span>
            <span className="t3-serif text-xl font-bold tracking-tight text-[#0b1f33] md:text-[1.35rem]">
              {logoText}
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0b1f33] transition hover:text-[var(--snifty-red,#e11d2e)]"
              >
                <FaEnvelope className="text-[var(--snifty-red,#e11d2e)]" aria-hidden />
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0b1f33] transition hover:text-[var(--snifty-red,#e11d2e)]"
              >
                <FaPhone className="text-[var(--snifty-red,#e11d2e)]" aria-hidden />
                {phone}
              </a>
            )}
            {cta && (
              <Link
                href={withTheme(cta.href || "/contact", THEME)}
                className="rounded-md bg-[var(--snifty-red,#e11d2e)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {cta.label}
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e5e7eb] text-[#0b1f33] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Navy nav */}
      <div className="bg-[var(--snifty-navy,#0b1f33)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8 lg:px-10">
          <nav className="hidden items-center gap-7 py-3.5 lg:flex xl:gap-8">
            {menu.map((item) =>
              item.children?.length ? (
                <NavDropdown key={`${item.label}-${item.href}`} item={item} />
              ) : (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={withTheme(item.href, THEME)}
                  className={`text-[13px] font-medium transition ${
                    isActivePath(pathname, item.href)
                      ? "text-[var(--snifty-red,#e11d2e)]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      {open && (
        <div className="border-b border-[#e5e7eb] bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 md:px-8">
            {menu.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const expanded = mobileGroup === item.href;
              return (
                <div key={`${item.label}-${item.href}`}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-2.5 text-left text-sm font-semibold text-[#0b1f33]"
                        onClick={() =>
                          setMobileGroup((cur) => (cur === item.href ? null : item.href))
                        }
                      >
                        {item.label}
                        <FaChevronDown
                          className={`text-[0.65rem] transition ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      {expanded && (
                        <div className="mb-2 space-y-1 border-l border-[#e5e7eb] pl-3">
                          {item.children!.map((child) => (
                            <Link
                              key={`${child.label}-${child.href}`}
                              href={withTheme(child.href, THEME)}
                              className="block py-1.5 text-sm text-[#5b6572]"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={withTheme(item.href, THEME)}
                      className="block py-2.5 text-sm font-semibold text-[#0b1f33]"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
            {cta && (
              <Link
                href={withTheme(cta.href || "/contact", THEME)}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[var(--snifty-red,#e11d2e)] px-4 py-3 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      )}
      </header>
      {/* Reserves space so fixed header does not cover page content */}
      <div className="h-[7rem]" aria-hidden />
      <BackToTop />
    </>
  );
}
