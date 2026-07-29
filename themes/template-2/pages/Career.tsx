"use client";

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

function scrollToReachUs() {
  document.getElementById("reach-us")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function Career({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.careerPage;
  const phone =
    data.footer.footerContact.phone || data.topbar.phone || "";
  const email =
    data.footer.footerContact.email || data.topbar.email || "";
  const location =
    data.footer.footerContact.location || data.topbar.location || "";
  const applyLabel = page.applyLabel || "Apply now";

  return (
    <div className="bg-white text-[#141414]">
      <section className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Breadcrumb items={page.breadcrumb} theme={theme} className="mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {page.pretitle}
            </p>
            <h1 className="mt-2 text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
              {page.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#141414]/55 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-2 text-sm leading-relaxed text-[#141414]/45">
                {page.desc2}
              </p>
            )}
            <button
              type="button"
              onClick={scrollToReachUs}
              className="mt-6 inline-flex items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              {applyLabel}
              <FaArrowRight className="text-xs" />
            </button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed]">
            <MediaImage
              src={page.sideImage}
              alt={page.sideImageTitle}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              themeId={theme}
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em]">Why join us</h2>
          <span className="mt-3 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)]" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.map((b) => (
              <div
                key={b.title}
                className="border border-[#141414]/10 bg-[#faf9f7] p-5"
              >
                <h3 className="text-base font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f7] px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em]">Open roles</h2>
          <p className="mt-2 text-sm text-[#141414]/50">
            Click Apply now and reach us by email or phone below.
          </p>
          <div className="mt-8 space-y-3">
            {page.jobs.map((job) => (
              <article
                key={job.title}
                className="flex flex-col gap-4 bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold">{job.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#141414]/50">
                    <span className="inline-flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-[var(--reroom-accent,#ff6b00)]" />
                      {job.location}
                    </span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                    {job.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToReachUs}
                  className="inline-flex shrink-0 items-center gap-2 bg-[var(--reroom-accent,#ff6b00)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  {applyLabel}
                  <FaArrowRight className="text-xs" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reach us — Apply now scrolls here */}
      <section
        id="reach-us"
        className="scroll-mt-28 bg-[#141414] px-4 py-12 text-white md:px-8 md:py-16 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
            Reach us
          </p>
          <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.15rem]">
            Ready to apply? Get in touch.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
            Share your role interest and a short note — our hiring team will
            reply with next steps.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 transition hover:border-[var(--reroom-accent,#ff6b00)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--reroom-accent,#ff6b00)] text-white">
                  <FaEnvelope className="text-sm" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                    Email
                  </span>
                  <span className="mt-1 block text-sm font-bold">{email}</span>
                </span>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 transition hover:border-[var(--reroom-accent,#ff6b00)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--reroom-accent,#ff6b00)] text-white">
                  <FaPhoneAlt className="text-sm" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                    Phone
                  </span>
                  <span className="mt-1 block text-sm font-bold">{phone}</span>
                </span>
              </a>
            )}
            {location && (
              <div className="flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 sm:col-span-2 lg:col-span-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--reroom-accent,#ff6b00)] text-white">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                    Location
                  </span>
                  <span className="mt-1 block text-sm font-bold">{location}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
