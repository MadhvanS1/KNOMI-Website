import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Lets parallel local previews use separate build folders (NEXT_DIST_DIR=.next-x). Defaults to .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
