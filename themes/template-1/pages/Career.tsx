"use client";

import { useMemo, useState } from "react";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaBriefcase,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const inputClass =
  "mt-2 w-full rounded-lg border border-[#141414]/12 bg-white px-3.5 py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#c44536]";

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "1–2 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
];

export default function Career({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.careerPage;
  const contact = data.footer.footerContact;
  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;
  const applyLabel = page.applyLabel || "Submit application";
  const jobs = page.jobs;

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))),
    [jobs]
  );

  const [activeJob, setActiveJob] = useState(0);
  const selected = jobs[Math.min(activeJob, Math.max(jobs.length - 1, 0))] ?? jobs[0];

  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [coverName, setCoverName] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: locations[0] ?? "",
    position: jobs[0]?.title ?? "",
    experience: EXPERIENCE_OPTIONS[0],
    employmentType: "Full-time",
    message: "",
  });

  function selectJob(index: number) {
    const job = jobs[index];
    if (!job) return;
    setActiveJob(index);
    setValues((p) => ({
      ...p,
      position: job.title,
      location: job.location,
      employmentType: EMPLOYMENT_TYPES.includes(
        job.type as (typeof EMPLOYMENT_TYPES)[number]
      )
        ? job.type
        : p.employmentType,
    }));
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#141414]">
        {page.sideImage && (
          <div className="absolute inset-0 opacity-30">
            <MediaImage
              themeId={theme}
              src={page.sideImage}
              alt={page.sideImageTitle || page.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/88 to-[#141414]/55" />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#c44536]" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14 lg:px-10">
          <Breadcrumb items={page.breadcrumb} theme={theme} variant="light" />
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-none tracking-[-0.02em] text-white md:text-[3.25rem]">
            {page.pretitle || "Career"}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
            {page.desc}
          </p>
        </div>
      </section>

      {/* Main: sidebar + form */}
      <section className="px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[0.9fr_1.35fr] lg:gap-8">
          {/* Left sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {/* Job card */}
            <div className="rounded-2xl border border-[#141414]/10 bg-[#faf8f4] p-5 md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c44536] text-white">
                <FaBriefcase className="text-base" aria-hidden />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#141414]">
                {selected?.title}
              </h2>
              {selected && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#c44536]">
                  <FaMapMarkerAlt className="text-[11px]" aria-hidden />
                  {selected.location}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/60">
                {selected?.desc}
              </p>

              {jobs.length > 1 && (
                <div className="mt-5 space-y-2 border-t border-[#141414]/8 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#141414]/45">
                    Open roles
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {jobs.map((job, i) => {
                      const isActive = i === activeJob;
                      return (
                        <button
                          key={`${job.title}-${job.location}`}
                          type="button"
                          onClick={() => selectJob(i)}
                          className={`rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            isActive
                              ? "bg-white font-semibold text-[#141414] shadow-sm"
                              : "text-[#141414]/65 hover:bg-white/70 hover:text-[#141414]"
                          }`}
                        >
                          <span className="block">{job.title}</span>
                          <span className="mt-0.5 block text-xs text-[#141414]/45">
                            {job.location} · {job.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

        

     
          </aside>

          {/* Application form */}
          <div className="rounded-2xl border border-[#141414]/10 bg-white p-5 md:p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c44536]">
                  Application received
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#141414]">
                  Thanks — we&apos;ll reach out soon.
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#141414]/65">
                  This demo form only shows a success state. Connect an API for live
                  submissions.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setResumeName("");
                    setCoverName("");
                    setValues({
                      fullName: "",
                      email: "",
                      phone: "",
                      location: selected?.location ?? locations[0] ?? "",
                      position: selected?.title ?? "",
                      experience: EXPERIENCE_OPTIONS[0],
                      employmentType: "Full-time",
                      message: "",
                    });
                  }}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#141414]/90"
                >
                  Apply another role
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-[1.65rem] font-semibold tracking-[-0.02em] text-[#141414] md:text-[1.85rem]">
                  Application Form
                </h2>
                <p className="mt-2 text-sm text-[#141414]/55">
                  Fill in your details for{" "}
                  <span className="font-medium text-[#141414]">
                    {values.position || "the selected role"}
                  </span>
                  .
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[#141414]">
                      Full Name <span className="text-[#c44536]">*</span>
                    </label>
                    <input
                      required
                      value={values.fullName}
                      onChange={(e) =>
                        setValues((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#141414]">
                      Email Address <span className="text-[#c44536]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="Enter your email"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#141414]">
                      Phone <span className="text-[#c44536]">*</span>
                    </label>
                    <input
                      required
                      value={values.phone}
                      onChange={(e) =>
                        setValues((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="Enter your phone number"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#141414]">
                      Location
                    </label>
                    <select
                      value={values.location}
                      onChange={(e) =>
                        setValues((p) => ({ ...p, location: e.target.value }))
                      }
                      className={inputClass}
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#141414]">
                      Position Applied For <span className="text-[#c44536]">*</span>
                    </label>
                    <select
                      required
                      value={values.position}
                      onChange={(e) => {
                        const title = e.target.value;
                        const idx = jobs.findIndex((j) => j.title === title);
                        if (idx >= 0) selectJob(idx);
                        else setValues((p) => ({ ...p, position: title }));
                      }}
                      className={inputClass}
                    >
                      {jobs.map((job) => (
                        <option key={job.title} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#141414]">
                      Experience
                    </label>
                    <select
                      value={values.experience}
                      onChange={(e) =>
                        setValues((p) => ({ ...p, experience: e.target.value }))
                      }
                      className={inputClass}
                    >
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Employment type */}
                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold text-[#141414]">
                    Employment Type
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
                    {EMPLOYMENT_TYPES.map((type) => (
                      <label
                        key={type}
                        className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#141414]/75"
                      >
                        <input
                          type="radio"
                          name="employmentType"
                          value={type}
                          checked={values.employmentType === type}
                          onChange={() =>
                            setValues((p) => ({ ...p, employmentType: type }))
                          }
                          className="h-4 w-4 accent-[#c44536]"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Uploads */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c44536]/45 bg-[#c44536]/4 px-4 py-7 text-center transition hover:bg-[#c44536]/7">
                    <FaCloudUploadAlt
                      className="text-2xl text-[#c44536]"
                      aria-hidden
                    />
                    <span className="mt-3 text-sm font-semibold text-[#141414]">
                      Upload Resume <span className="text-[#c44536]">*</span>
                    </span>
                    <span className="mt-1 text-xs text-[#141414]/50">
                      {resumeName || "Click to upload or drag and drop"}
                    </span>
                    <span className="mt-1 text-[11px] text-[#141414]/40">
                      PDF, DOC, DOCX · Max 5MB
                    </span>
                    <input
                      required
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) =>
                        setResumeName(e.target.files?.[0]?.name ?? "")
                      }
                    />
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c44536]/45 bg-[#c44536]/4 px-4 py-7 text-center transition hover:bg-[#c44536]/7">
                    <FaCloudUploadAlt
                      className="text-2xl text-[#c44536]"
                      aria-hidden
                    />
                    <span className="mt-3 text-sm font-semibold text-[#141414]">
                      Cover Letter (Optional)
                    </span>
                    <span className="mt-1 text-xs text-[#141414]/50">
                      {coverName || "Click to upload or drag and drop"}
                    </span>
                    <span className="mt-1 text-[11px] text-[#141414]/40">
                      PDF, DOC, DOCX · Max 5MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) =>
                        setCoverName(e.target.files?.[0]?.name ?? "")
                      }
                    />
                  </label>
                </div>

           

                <button
                  type="submit"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#141414]/90 sm:w-auto"
                >
                  {applyLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
