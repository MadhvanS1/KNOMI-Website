"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { setLenis } from "@/lib/lenis";

/**
 * Weighted, inertial scrolling on desktop wheels (touch stays native),
 * smooth same-page anchor jumps, and reduced-motion respected throughout.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // Header offset comes from `scroll-padding-top` (globals.css), which Lenis honours.
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
