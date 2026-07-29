"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

function RouteScrollReset() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();
  const search = searchParams.toString();

  useEffect(() => {
    if (!lenis) return;
    // Theme switches / route changes — jump to top without easing
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, search, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.075,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
        wheelMultiplier: 0.95,
        anchors: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
