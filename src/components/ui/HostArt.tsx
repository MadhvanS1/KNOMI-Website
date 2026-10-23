import Image from "next/image";
import type { CSSProperties } from "react";
import { hostArt, type HostPose } from "@/content/site";
import styles from "./HostArt.module.css";

/** Pixel size of each cut-out in public/images/host/, so a box can take the art's own shape. */
const ART_SIZE: Record<string, [number, number]> = {
  "/images/host/lean.webp": [382, 366],
  "/images/host/point.webp": [412, 490],
  "/images/host/peek.webp": [414, 392],
  "/images/host/think.webp": [428, 448],
  "/images/host/pay.webp": [476, 390],
};

/** His warmest portrait, shown for any pose without a cut-out of its own, so he is always the real chef. */
const FALLBACK_ART = "/images/host/think.webp";

/** A `sizes` value is only meaningful for a plain length; anything else falls back to a safe guess. */
const PLAIN_LENGTH = /^\d+(\.\d+)?(px|vw|rem|em)$/;

type HostArtProps = {
  pose: HostPose;
  /** Rendered width in CSS (any length). */
  size?: string;
  className?: string;
  /** Decorative uses (beside a speech bubble that already says it's Host) pass true. */
  decorative?: boolean;
  priority?: boolean;
  /**
   * "square" (default): a square box, art contained inside it.
   * "art": the box takes the cut-out's own proportions, so its edges are his edges
   * (use this to rest his flat bottom exactly on a card or heading edge).
   */
  fit?: "square" | "art";
  /** Where the art sits inside a square box. Bottom keeps his flat edge on the box's floor. */
  align?: "bottom" | "center";
  /** A slow breath (2–3px) a few times after he appears, then still. Off for reduced motion. */
  idle?: boolean;
  /** Overrides the image `sizes` hint. */
  sizes?: string;
};

/**
 * Knomi Host, the chef character from the KNOMI menu. Shows his transparent cut-out for
 * `pose` (see `hostArt` in site.ts). He is never framed: no circle, badge or background,
 * and a pose without art of its own shows his portrait rather than any stand-in.
 */
export default function HostArt({
  pose,
  size = "160px",
  className,
  decorative = false,
  priority,
  fit = "square",
  align = "bottom",
  idle = false,
  sizes,
}: HostArtProps) {
  const src = hostArt[pose] ?? FALLBACK_ART;
  const a11y = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Knomi Host" };
  const dims = ART_SIZE[src];
  const ratio = fit === "art" && dims ? `${dims[0]} / ${dims[1]}` : "1 / 1";
  const hint = sizes ?? (PLAIN_LENGTH.test(size) ? `(max-width: 768px) 40vw, ${size}` : "(max-width: 768px) 40vw, 320px");

  return (
    <span
      className={`${styles.host} ${idle ? styles.idle : ""} ${className ?? ""}`}
      style={{ width: size, aspectRatio: ratio } as CSSProperties}
      data-pose={pose}
      data-align={align}
      {...a11y}
    >
      <Image src={src} alt="" fill sizes={hint} priority={priority} className={styles.art} draggable={false} />
    </span>
  );
}
