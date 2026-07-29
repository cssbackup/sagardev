"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { withTheme } from "@/lib/theme";
import type { LinkItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;

function hrefMatches(
  href: string,
  pathname: string,
  searchParams: URLSearchParams
) {
  try {
    const url = new URL(href, "http://local");
    if (url.pathname !== pathname) return false;
    if ([...url.searchParams.keys()].length === 0) return true;
    for (const [key, value] of url.searchParams) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  } catch {
    return false;
  }
}

function isItemActive(
  item: LinkItem,
  pathname: string,
  searchParams: URLSearchParams
) {
  if (hrefMatches(item.href, pathname, searchParams)) return true;
  return (
    item.children?.some((child) =>
      hrefMatches(child.href, pathname, searchParams)
    ) ?? false
  );
}

function navLinkClass(active: boolean) {
  return [
    "inline-flex items-center gap-1.5 border-b-2 pb-0.5 transition",
    active
      ? "border-[#141414] font-semibold text-[#141414]"
      : "border-transparent text-[#141414]/75 hover:border-[#141414]/35 hover:text-[#141414]",
  ].join(" ");
}

function NavDropdown({
  item,
  active,
}: {
  item: LinkItem;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const children = item.children ?? [];

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
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen((v) => !v)}
        className={navLinkClass(active)}
      >
        {item.label}
        <FaChevronDown
          className={`text-[0.55rem] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[13.5rem] pt-3 md:left-1/2 md:-translate-x-1/2">
          <div className="max-h-[70vh] overflow-y-auto border border-[#141414]/10 bg-white py-2 shadow-[0_16px_40px_rgba(20,20,20,0.1)]">
            {children.map((child) => (
              <Link
                key={`${child.label}-${child.href}`}
                href={withTheme(child.href, THEME)}
                className="block whitespace-nowrap px-4 py-2.5 text-sm text-[#141414] transition hover:bg-[#141414] hover:text-white"
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

function HeaderInner({ data }: { data: ResolvedSiteData }) {
  const { header } = data;
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cta = header.buttons[0];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#141414]/12 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-4 md:px-8 md:py-3.5 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <Link
            href={withTheme("/", THEME)}
            className="truncate text-sm font-bold tracking-[0.12em] text-[#141414] sm:text-base md:text-[1.05rem]"
          >
            {header.logo.toUpperCase()}
          </Link>

          <nav className="hidden items-center justify-center gap-6 text-[0.92rem] font-medium xl:gap-7 lg:flex">
            {header.menu.map((item, i) => {
              const active = isItemActive(item, pathname, searchParams);
              return item.children && item.children.length > 0 ? (
                <NavDropdown
                  key={`${item.label}-${i}`}
                  item={item}
                  active={active}
                />
              ) : (
                <Link
                  key={`${item.label}-${i}`}
                  href={withTheme(item.href, THEME)}
                  aria-current={active ? "page" : undefined}
                  className={navLinkClass(active)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2">
            {cta && (
              <Link
                href={withTheme(cta.href, THEME)}
                className="hidden rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black lg:inline-flex"
              >
                {cta.label}
              </Link>
            )}

            <button
              type="button"
              aria-label="Toggle menu"
              className="rounded-md p-2 text-[#141414] lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {open && (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#141414]/10 bg-white px-4 py-4 md:px-8 lg:hidden lg:px-10">
            <nav className="flex flex-col gap-1 text-sm font-medium text-[#141414]">
              {header.menu.map((item, i) => {
                const hasChildren = Boolean(item.children?.length);
                const groupKey = `${item.label}-${i}`;
                const expanded = mobileGroup === groupKey;
                const active = isItemActive(item, pathname, searchParams);

                if (!hasChildren) {
                  return (
                    <Link
                      key={groupKey}
                      href={withTheme(item.href, THEME)}
                      aria-current={active ? "page" : undefined}
                      className={`py-2.5 ${
                        active ? "font-semibold text-[#141414]" : "text-[#141414]/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={groupKey}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between py-2.5 text-left ${
                        active ? "font-semibold text-[#141414]" : "text-[#141414]/80"
                      }`}
                      aria-expanded={expanded}
                      aria-current={active ? "page" : undefined}
                      onClick={() =>
                        setMobileGroup(expanded ? null : groupKey)
                      }
                    >
                      {item.label}
                      <FaChevronDown
                        className={`text-[0.6rem] transition ${expanded ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    {expanded && (
                      <div className="flex flex-col gap-1 pb-2 pl-3">
                        {item.children!.map((child) => {
                          const childActive = hrefMatches(
                            child.href,
                            pathname,
                            searchParams
                          );
                          return (
                            <Link
                              key={`${child.label}-${child.href}`}
                              href={withTheme(child.href, THEME)}
                              aria-current={childActive ? "page" : undefined}
                              className={`py-2 ${
                                childActive
                                  ? "font-semibold text-[#141414]"
                                  : "text-[#141414]/70"
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {cta && (
                <Link
                  href={withTheme(cta.href, THEME)}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-5 py-3 text-center text-sm font-semibold text-white lg:mt-4"
                  onClick={() => setOpen(false)}
                >
                  {cta.label}
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <div className="h-16 md:h-[4.25rem]" aria-hidden />
    </>
  );
}

export default function Header({
  data,
}: {
  data: ResolvedSiteData;
  variant?: "overlay" | "solid";
}) {
  return (
    <Suspense
      fallback={
        <>
          <header className="fixed inset-x-0 top-0 z-50 border-b border-[#141414]/12 bg-white">
            <div className="h-16 md:h-[4.25rem]" />
          </header>
          <div className="h-16 md:h-[4.25rem]" aria-hidden />
        </>
      }
    >
      <HeaderInner data={data} />
    </Suspense>
  );
}
