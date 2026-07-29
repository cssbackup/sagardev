"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowUp } from "react-icons/fa6";

/** Portaled to document.body so home section stacking contexts cannot cover it. */
export default function BackToTop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-5 z-[9999] flex h-11 w-11 items-center justify-center rounded-full bg-[var(--snifty-red,#e11d2e)] text-white shadow-[0_10px_24px_rgba(225,29,46,0.35)] transition hover:brightness-110 md:bottom-8 md:right-8"
    >
      <FaArrowUp className="text-sm" />
    </button>,
    document.body
  );
}
