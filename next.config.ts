import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig: NextConfig = {
  output: "export",
  // Lets parallel local previews use separate build folders (NEXT_DIST_DIR=.next-x). Defaults to .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    unoptimized: true,
  },
};

/* The booking form posts to Formspree only when NEXT_PUBLIC_FORMSPREE_URL is set on the
   hosting platform (never in a file). Without it the form still works, through WhatsApp,
   so a missing value would go unnoticed: say so plainly at build time. */
function warnIfNoFormspree() {
  const url = process.env.NEXT_PUBLIC_FORMSPREE_URL?.trim() ?? "";
  const missing = !url || url.includes("YOUR_") || url.includes("<");
  // Build workers inherit the environment, so the warning prints once per build.
  if (!missing || process.env.KNOMI_FORMSPREE_WARNED) return;
  process.env.KNOMI_FORMSPREE_WARNED = "1";
  console.warn(
    [
      "",
      "Warning: NEXT_PUBLIC_FORMSPREE_URL is " + (url ? "still a placeholder" : "not set") + ".",
      "  The booking form will fall back to WhatsApp: each request opens a WhatsApp chat with",
      "  KNOMI instead of arriving through Formspree. To receive requests by email, set it to the",
      "  form's https://formspree.io/f/... address in the hosting platform's environment variables",
      "  and rebuild.",
      "",
    ].join("\n"),
  );
}

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) warnIfNoFormspree();
  return nextConfig;
}
