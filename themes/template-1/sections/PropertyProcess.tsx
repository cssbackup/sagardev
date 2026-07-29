"use client";

import type { ReactNode } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import { FaHouseChimney } from "react-icons/fa6";

function ConnectArrow() {
  return (
    <div
      className="pointer-events-none absolute top-14 left-[calc(50%+3.25rem)] hidden w-[calc(100%-6.5rem)] items-center lg:flex"
      aria-hidden
    >
      <svg
        viewBox="0 0 120 28"
        className="h-7 w-full text-[#141414]/25"
        fill="none"
      >
        <path
          d="M2 18 C28 4, 44 26, 60 14 S92 2, 112 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M104 8 L114 14 L104 20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Inspect & Analyse — clipboard + house + magnifier */
function IconInspect({ id }: { id: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id={`${id}-board`}
          x1="12"
          y1="8"
          x2="48"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient
          id={`${id}-lens`}
          x1="34"
          y1="28"
          x2="58"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <rect
        x="12"
        y="10"
        width="30"
        height="40"
        rx="5"
        fill={`url(#${id}-board)`}
        opacity="0.9"
      />
      <rect x="18" y="8" width="18" height="6" rx="2" fill="#fff" opacity="0.9" />
      <path
        d="M20 28h10M20 34h14M20 40h8"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M27 18l-5 5h4v7l6-8h-4v-4z"
        fill="#525252"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="44"
        cy="40"
        r="11"
        fill={`url(#${id}-lens)`}
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="44" cy="40" r="5" stroke="#fff" strokeWidth="2" fill="none" />
      <path
        d="M51 48l7 7"
        stroke={`url(#${id}-lens)`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M51 48l7 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Quote & Supply — document + rupee coin + house */
function IconQuote({ id }: { id: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id={`${id}-doc`}
          x1="8"
          y1="6"
          x2="42"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient
          id={`${id}-coin`}
          x1="34"
          y1="30"
          x2="58"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <path
        d="M14 8h22l10 10v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
        fill={`url(#${id}-doc)`}
        opacity="0.92"
      />
      <path d="M36 8v10h10" fill="#fff" opacity="0.35" />
      <path
        d="M16 28h16M16 34h12M16 40h14"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle
        cx="46"
        cy="44"
        r="12"
        fill={`url(#${id}-coin)`}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x="46"
        y="49"
        textAnchor="middle"
        fill="#fff"
        fontSize="14"
        fontWeight="700"
      >
        ₹
      </text>
      <path
        d="M28 16l-4 4h3v5l5-6h-3v-3z"
        fill="#525252"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Clean Up & Finish — house + sparkles + broom */
function IconClean({ id }: { id: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id={`${id}-home`}
          x1="10"
          y1="14"
          x2="48"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient
          id={`${id}-tool`}
          x1="36"
          y1="8"
          x2="58"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <path
        d="M12 30L30 14l18 16v22a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V30z"
        fill={`url(#${id}-home)`}
        opacity="0.9"
        stroke="#fff"
        strokeWidth="1.5"
      />
      <rect x="24" y="36" width="12" height="16" rx="2" fill="#fff" opacity="0.85" />
      <path
        d="M44 12l2.2 5.2L52 20l-5.2 2.2L44 28l-2.2-5.8L36 20l5.8-2.8L44 12z"
        fill={`url(#${id}-tool)`}
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M48 34c0 0 2 10 2 14h8c0-4 0-10-2-14h-8z"
        fill={`url(#${id}-tool)`}
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M51 18v16"
        stroke={`url(#${id}-tool)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M51 18v16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Quality Improve — trend bars + lightning */
function IconQuality({ id }: { id: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id={`${id}-chart`}
          x1="10"
          y1="10"
          x2="54"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient
          id={`${id}-bolt`}
          x1="20"
          y1="12"
          x2="44"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#525252" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="38"
        width="8"
        height="16"
        rx="3"
        fill={`url(#${id}-chart)`}
        opacity="0.3"
      />
      <rect
        x="22"
        y="28"
        width="8"
        height="26"
        rx="3"
        fill={`url(#${id}-chart)`}
        opacity="0.45"
      />
      <rect
        x="34"
        y="20"
        width="8"
        height="34"
        rx="3"
        fill={`url(#${id}-chart)`}
        opacity="0.6"
      />
      <rect
        x="46"
        y="10"
        width="8"
        height="44"
        rx="3"
        fill={`url(#${id}-chart)`}
        opacity="0.85"
      />
      <path
        d="M38 8L18 32H32L26 56L48 28H32L38 8Z"
        fill={`url(#${id}-bolt)`}
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STEP_ICONS: Array<(props: { id: string }) => ReactNode> = [
  IconInspect,
  IconQuote,
  IconClean,
  IconQuality,
];

export default function PropertyProcess({ data }: { data: ResolvedSiteData }) {
  const section = data.propertyProcess;
  const steps = (section?.steps ?? []).slice(0, 4);

  if (!section || steps.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 80%22 fill=%22%23141414%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M0 80V48l40-12 50 18 60-22 70 16 55-20 80 24 90-18 70 14 60-22 80 20 90-16 70 18 85-20 90 22 100-14V80z%22/%3E%3C/svg%3E')] bg-cover bg-bottom bg-no-repeat"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            <FaHouseChimney className="text-[10px]" aria-hidden />
            {section.pretitle || "Our Process"}
            <FaHouseChimney className="text-[10px]" aria-hidden />
          </p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-tight tracking-[-0.02em] text-[#141414] sm:text-[2.25rem] md:text-[2.6rem]">
            {section.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            const number = step.step || String(i + 1).padStart(2, "0");
            const iconId = `pp-${i}`;

            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && <ConnectArrow />}

                <div className="relative mb-5 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
                  <span className="absolute -top-1 left-1 text-4xl font-semibold leading-none text-[#141414]/15 sm:text-5xl">
                    {number}
                  </span>

                  <div className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border-2 border-[#141414]/35 bg-white sm:h-20 sm:w-20">
                    <div className="flex h-[3.85rem] w-[3.85rem] items-center justify-center rounded-full border border-dashed border-[#141414]/45 sm:h-16 sm:w-16">
                      <Icon id={iconId} />
                    </div>
                  </div>
                </div>

                <span className="mb-3 h-0.5 w-10 rounded-full bg-[#141414]/55" />

                <h3 className="text-base font-semibold text-[#141414] sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-[#141414]/55">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
