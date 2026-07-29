"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBriefcase,
  FaEnvelope,
  FaLocationDot,
  FaUserGroup,
} from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, RevealUp, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

const benefitIcons = [FaBriefcase, FaUserGroup, FaLocationDot, FaEnvelope];

export default function Career({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.careerPage;
  const jobs = page.jobs;

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.location)))],
    [jobs]
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.type)))],
    [jobs]
  );

  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeJob, setActiveJob] = useState(0);

  const filtered = jobs.filter((j) => {
    const locOk = locationFilter === "All" || j.location === locationFilter;
    const typeOk = typeFilter === "All" || j.type === typeFilter;
    return locOk && typeOk;
  });

  const selected =
    filtered[Math.min(activeJob, Math.max(filtered.length - 1, 0))] ??
    filtered[0];

  function scrollToJobs() {
    document.getElementById("open-roles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

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
            <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {page.desc2}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToJobs}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-red,#e11d2e)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                View open roles
                <FaArrowRight className="text-[11px]" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-bold text-[var(--snifty-red,#e11d2e)]">
                  {jobs.length}
                </p>
                <p className="mt-1 text-xs text-white/55">Open roles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {locations.length - 1}
                </p>
                <p className="mt-1 text-xs text-white/55">Locations</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {page.benefits.length}
                </p>
                <p className="mt-1 text-xs text-white/55">Benefits</p>
              </div>
            </div>
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
                  Careers
                </p>
                <p className="t3-serif mt-1 text-lg font-bold text-white">
                  Build with a team that cares
                </p>
              </div>
            </RevealUp>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <RevealBlur className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
              Why join us
            </p>
            <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
              Built for people who care about craft
            </h2>
          </RevealBlur>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <StaggerItem key={b.title}>
                  <article className="group relative h-full overflow-hidden rounded-xl border border-[#eef0f3] bg-[#f7f8fa] p-6 transition hover:border-[var(--snifty-red,#e11d2e)]/30 hover:bg-white hover:shadow-[0_14px_36px_rgba(225,29,46,0.1)]">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--snifty-red,#e11d2e)] text-white">
                      <Icon className="text-lg" />
                    </span>
                    <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="t3-serif mt-2 text-lg font-bold text-[#0b1f33]">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5b6572]">
                      {b.desc}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Open roles — interactive board */}
      <section
        id="open-roles"
        className="scroll-mt-28 bg-[#f7f8fa] px-4 py-7 md:px-8 md:py-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <RevealBlur className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
                Hiring now
              </p>
              <h2 className="t3-serif mt-2 text-2xl font-bold text-[#0b1f33] md:text-3xl">
                Open roles
              </h2>
              <p className="mt-2 text-sm text-[#5b6572]">
                Filter by location or type to explore open positions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Location">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocationFilter(loc);
                      setActiveJob(0);
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition md:text-sm ${
                      locationFilter === loc
                        ? "bg-[var(--snifty-navy,#0b1f33)] text-white"
                        : "bg-white text-[#0b1f33] ring-1 ring-[#e8ecf1] hover:ring-[var(--snifty-red,#e11d2e)]/40"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Type">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTypeFilter(t);
                      setActiveJob(0);
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition md:text-sm ${
                      typeFilter === t
                        ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                        : "bg-white text-[#0b1f33] ring-1 ring-[#e8ecf1] hover:ring-[var(--snifty-red,#e11d2e)]/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlur>

          {filtered.length === 0 ? (
            <p className="mt-10 rounded-xl border border-dashed border-[#d5dae3] bg-white px-6 py-10 text-center text-sm text-[#5b6572]">
              No roles match these filters. Try another location or type.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.25fr] lg:gap-8">
              <div className="flex flex-col gap-3">
                {filtered.map((job, i) => {
                  const isActive =
                    selected?.title === job.title &&
                    selected?.location === job.location;
                  return (
                    <button
                      key={`${job.title}-${job.location}`}
                      type="button"
                      onClick={() => setActiveJob(i)}
                      className={`rounded-xl border p-4 text-left transition md:p-5 ${
                        isActive
                          ? "border-[var(--snifty-red,#e11d2e)] bg-white shadow-[0_12px_28px_rgba(225,29,46,0.1)]"
                          : "border-[#e8ecf1] bg-white/80 hover:border-[#d5dae3] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="t3-serif text-lg font-bold text-[#0b1f33]">
                            {job.title}
                          </h3>
                          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5b6572]">
                            <span className="inline-flex items-center gap-1">
                              <FaLocationDot className="text-[var(--snifty-red,#e11d2e)]" />
                              {job.location}
                            </span>
                            <span aria-hidden>·</span>
                            <span className="inline-flex items-center gap-1">
                              <FaBriefcase className="text-[var(--snifty-red,#e11d2e)]" />
                              {job.type}
                            </span>
                          </p>
                        </div>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isActive
                              ? "bg-[var(--snifty-red,#e11d2e)] text-white"
                              : "bg-[#eef1f5] text-[#0b1f33]"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selected && (
                <RevealUp key={`${selected.title}-${selected.location}`}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8ecf1] bg-white shadow-[0_16px_40px_rgba(11,31,51,0.06)]">
                    <div className="border-b border-[#eef0f3] bg-[var(--snifty-navy,#0b1f33)] px-6 py-6 text-white md:px-8 md:py-7">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--snifty-red,#e11d2e)]">
                        Role detail
                      </p>
                      <h3 className="t3-serif mt-2 text-2xl font-bold md:text-[1.85rem]">
                        {selected.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                          <FaLocationDot className="text-[var(--snifty-red,#e11d2e)]" />
                          {selected.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                          <FaBriefcase className="text-[var(--snifty-red,#e11d2e)]" />
                          {selected.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <p className="text-sm leading-relaxed text-[#5b6572] md:text-base">
                        {selected.desc}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-3 pt-8">
                        <Link
                          href={withTheme(selected.href || "/contact", theme)}
                          className="inline-flex items-center gap-2 rounded-md bg-[var(--snifty-navy,#0b1f33)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--snifty-red,#e11d2e)]"
                        >
                          Contact about this role
                          <FaArrowRight className="text-[11px]" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </RevealUp>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
