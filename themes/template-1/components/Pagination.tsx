"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 text-[#141414] transition hover:border-[#141414]/40 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <FaArrowLeft className="text-xs" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
          className={`h-10 w-10 rounded-full text-sm font-medium transition ${
            n === page
              ? "bg-[#141414] text-white"
              : "border border-[#141414]/15 text-[#141414] hover:border-[#141414]/40"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 text-[#141414] transition hover:border-[#141414]/40 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <FaArrowRight className="text-xs" />
      </button>
    </nav>
  );
}
