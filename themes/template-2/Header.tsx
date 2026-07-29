"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaChevronDown, FaTimes, FaPhoneAlt } from "react-icons/fa";
import {
  FaBath,
  FaBuilding,
  FaHouse,
  FaKitchenSet,
  FaTreeCity,
} from "react-icons/fa6";
import { withTheme } from "@/lib/theme";
import type { LinkItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const categoryIcons = [FaKitchenSet, FaBath, FaTreeCity, FaBuilding, FaHouse];

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
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition ${
          active
            ? "bg-[var(--reroom-accent,#ff6b00)] text-white"
            : "hover:bg-[#faf9f7] hover:text-[var(--reroom-accent,#ff6b00)]"
        }`}
      >
        {item.label}
        <FaChevronDown
          className={`text-[0.55rem] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 pt-2">
          <div className="bg-white py-2 shadow-[0_16px_40px_rgba(20,20,20,0.1)]">
            {children.map((child) => {
              const childActive = isActivePath(pathname, child.href);
              return (
                <Link
                  key={`${child.label}-${child.href}`}
                  href={withTheme(child.href, THEME)}
                  className={`block px-4 py-2.5 text-sm transition ${
                    childActive
                      ? "bg-[var(--reroom-accent,#ff6b00)] text-white"
                      : "text-[#141414] hover:bg-[#faf9f7]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              );
            })}
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
  const { header, topbar, properties } = data;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const phone = topbar.phone || data.footer.footerContact.phone;
  const logoText = (data.template.title || "re/room").toLowerCase();
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

  const categories = useMemo(() => {
    const slides = properties.listings ?? [];
    if (slides.length > 0) {
      return slides.slice(0, 5).map((slide, i) => ({
        label: slide.title,
        href: "/properties",
        Icon: categoryIcons[i % categoryIcons.length],
      }));
    }
    return (properties.categories ?? []).slice(0, 5).map((item, i) => ({
      label: item.title,
      href: "/properties",
      Icon: categoryIcons[i % categoryIcons.length],
    }));
  }, [properties.listings, properties.categories]);

  return (
    <header className="sticky top-0 z-50 bg-white text-[#141414]">
      <div>
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-5 md:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-10 lg:py-6">
          <Link
            href={withTheme("/", THEME)}
            className="inline-flex w-fit items-center border-[1.5px] border-[#141414] px-3 py-1.5 text-[0.95rem] font-semibold lowercase leading-none tracking-tight md:text-[1.05rem]"
          >
            {logoText}
            <span>.</span>
          </Link>

          <nav className="hidden items-center justify-center gap-2 text-[0.88rem] font-medium lg:flex xl:gap-3">
            {menu.map((item, i) =>
              item.children && item.children.length > 0 ? (
                <NavDropdown key={`${item.label}-${i}`} item={item} />
              ) : (
                <Link
                  key={`${item.label}-${i}`}
                  href={withTheme(item.href, THEME)}
                  className={`px-3 py-1.5 transition ${
                    isActivePath(pathname, item.href)
                      ? "bg-[var(--reroom-accent,#ff6b00)] text-white"
                      : "hover:bg-[#faf9f7] hover:text-[var(--reroom-accent,#ff6b00)]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2.5 text-[0.95rem] font-medium text-[var(--reroom-accent,#ff6b00)] transition hover:opacity-80 md:inline-flex"
            >
              <FaPhoneAlt className="text-sm" />
              <span>{phone}</span>
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              className="p-2 lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="hidden bg-[#141414] lg:block">
          <nav className="mx-auto flex max-w-7xl items-center justify-center gap-8 overflow-x-auto px-4 py-3.5 md:px-8 lg:gap-10 lg:px-10">
            {categories.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={withTheme(href, THEME)}
                className="inline-flex shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:text-[var(--reroom-accent,#ff6b00)] md:text-[11px]"
              >
                <Icon className="text-[14px]" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {open && (
        <div className="border-b border-[#141414]/10 bg-white px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {menu.map((item, i) => {
              const hasChildren = Boolean(item.children?.length);
              const groupKey = `${item.label}-${i}`;
              const expanded = mobileGroup === groupKey;

              if (!hasChildren) {
                return (
                  <Link
                    key={groupKey}
                    href={withTheme(item.href, THEME)}
                    className={`px-3 py-2.5 text-[0.95rem] font-medium ${
                      isActivePath(pathname, item.href)
                        ? "bg-[var(--reroom-accent,#ff6b00)] text-white"
                        : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={groupKey} className="border-b border-[#141414]/8 last:border-b-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2.5 text-left text-[0.95rem] font-medium"
                    onClick={() =>
                      setMobileGroup(expanded ? null : groupKey)
                    }
                    aria-expanded={expanded}
                  >
                    {item.label}
                    <FaChevronDown
                      className={`text-[0.6rem] transition ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expanded && (
                    <div className="mb-3 flex flex-col gap-2 pl-3">
                      {item.children!.map((child) => (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={withTheme(child.href, THEME)}
                          className="py-1 text-sm text-[#141414]/65"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="mt-3 inline-flex items-center gap-2 text-[0.95rem] font-medium text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaPhoneAlt className="text-sm" />
              {phone}
            </a>
          </nav>
          {categories.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#141414]/10 pt-4">
              {categories.map(({ label, href, Icon }) => (
                <Link
                  key={`c-${label}`}
                  href={withTheme(href, THEME)}
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em]"
                  onClick={() => setOpen(false)}
                >
                  <Icon
                    className="text-sm text-[var(--reroom-accent,#ff6b00)]"
                    aria-hidden
                  />
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
