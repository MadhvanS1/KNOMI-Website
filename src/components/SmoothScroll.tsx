"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { setLenis } from "@/lib/lenis";

/**
 * Weighted, inertial scrolling on desktop wheels (touch stays native),
 * smooth same-page anchor jumps, and reduced-motion respected throughout:
 * Lenis stops and starts as the visitor's setting changes, not just at load.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        // Header offset comes from `scroll-padding-top` (globals.css), which Lenis honours.
        anchors: true,
        stopInertiaOnNavigate: true,
      });
      setLenis(lenis);
    };

    const stop = () => {
      if (!lenis) return;
      setLenis(null);
      lenis.destroy();
      lenis = null;
    };

    const sync = () => (reduce.matches ? stop() : start());
    sync();
    reduce.addEventListener("change", sync);

    return () => {
      reduce.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
