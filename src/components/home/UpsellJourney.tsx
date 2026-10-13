"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import SectionHead from "@/components/ui/SectionHead";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import HostArt from "@/components/ui/HostArt";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { Check, Plus } from "@/components/ui/Icons";
import { GOAL, upsell, type HostPose } from "@/content/site";
import styles from "./UpsellJourney.module.css";

// copy: mock-UI labels inside the guest's menu card and the order ticket (not claims)
const TABLE_LABEL = "Table 7";
const TICKET_TITLE = "Order";
const TOTAL_LABEL = "Total";
const ADDED_LABEL = "Added to the order:";
const CATEGORY: Record<string, string> = {
  arrive: "Pizza",
  choose: "Pizza",
  pair: "Sides",
  dessert: "Desserts",
  goodbye: "Your bill",
};
// copy: the seal states the goal, never a result. It always sits beside GOAL + goalNote.
const SEAL_VALUE = "+25%";
const SEAL_RING = "Our goal · average order";

/* ---------------------------------------------------------------------
   The journey, derived once from site.ts
   --------------------------------------------------------------------- */

const MOMENTS = upsell.moments;
const LAST = MOMENTS.length - 1;
const STEP_TOTAL = String(MOMENTS.length).padStart(2, "0");
const pad = (n: number) => String(n).padStart(2, "0");

const POSES: readonly HostPose[] = ["greet", "lean", "point", "peek", "pay", "sit", "think"];
const toPose = (p: string): HostPose => ((POSES as readonly string[]).includes(p) ? (p as HostPose) : "greet");

const inr = new Intl.NumberFormat("en-IN");
const rupees = (n: number) => `₹${inr.format(n)}`;

/** Every dish Host adds to the order, with the moment it lands on the ticket. */
const ADDS = MOMENTS.flatMap((m, i) => (m.add ? [{ name: m.add.name, price: m.add.price, at: i }] : []));
const FINAL_BILL = MOMENTS[LAST].bill;
const ORDER_SUMMARY = `${TICKET_TITLE}: ${ADDS.map((a) => `${a.name} ${rupees(a.price)}`).join(", ")}. ${TOTAL_LABEL} ${rupees(FINAL_BILL)}.`;

type DishKind = "margherita" | "garlic" | "tiramisu" | "bill";
const DISH: Record<string, DishKind> = {
  arrive: "margherita",
  choose: "margherita",
  pair: "garlic",
  dessert: "tiramisu",
  goodbye: "bill",
};

type Strip = { name: string; price: number | null; added: boolean };

/** What the dish label on the menu card says at each moment. null: no label — at the bill,
 *  and at dessert, where Host's bubble sits over it. */
const STRIPS: (Strip | null)[] = MOMENTS.map((m, i) => {
  if (m.id === "goodbye" || m.id === "dessert") return null;
  if (m.add) return { name: m.add.name, price: m.add.price, added: true };
  const next = MOMENTS.slice(i + 1).find((n) => n.add)?.add;
  return next ? { name: next.name, price: next.price, added: false } : null;
});
/* While the label fades out, it keeps showing what it last said. */
const STRIP_SHOWN: Strip[] = (() => {
  let last: Strip = STRIPS.find(Boolean) ?? { name: "", price: null, added: false };
  return STRIPS.map((s) => (s ? (last = s) : last));
})();

const SKYLINE = "/images/illustrations/skyline-cafe.webp";
/* The street sketch at the foot of the card drifts from the city to the café table. */
const DRIFT_END = -36;

/* ---------------------------------------------------------------------
   Motion
   --------------------------------------------------------------------- */

/* Gentle overshoot for small pops (chips, the add button) and the seal landing. */
const EASE_POP: [number, number, number, number] = [0.34, 1.35, 0.64, 1];

/* Plates glide along the table: in from the right, out to the left. */
const plateV: Variants = {
  hidden: { opacity: 0, x: "34%", rotate: 38, scale: 0.86 },
  shown: {
    opacity: 1,
    x: "0%",
    rotate: 0,
    scale: 1,
    transition: { duration: 1.15, ease: EASE_OUT, opacity: { duration: 0.6, ease: EASE_OUT } },
  },
  gone: {
    opacity: 0,
    x: "-30%",
    rotate: -26,
    scale: 0.88,
    transition: { duration: 0.85, ease: EASE_OUT, opacity: { duration: 0.5, delay: 0.1 } },
  },
};

/* Host rises into his place from just below it (he rests on an edge, so he comes up to it),
   and sinks back the same way when the moment passes. */
const hostV: Variants = {
  hidden: { opacity: 0, y: "18%", scale: 0.94, rotate: -2 },
  shown: {
    opacity: 1,
    y: "0%",
    scale: 1,
    rotate: 0,
    transition: { duration: 1.15, delay: 0.2, ease: EASE_OUT, opacity: { duration: 0.6, delay: 0.2, ease: EASE_OUT } },
  },
  gone: { opacity: 0, y: "10%", scale: 0.97, transition: { duration: 0.55, ease: EASE_OUT } },
};

/* The add button he hugs turns to "added" once he has settled. */
const hugV: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.75, delay: 1.25, ease: EASE_POP } },
  gone: {},
};

const marksV: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.85, ease: EASE_POP } },
  gone: { opacity: 0, transition: { duration: 0.2 } },
};

const bubbleV: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, delay: 0.38, ease: EASE_OUT, staggerChildren: 0.08, delayChildren: 0.55 },
  },
  gone: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.45, ease: EASE_OUT } },
};

/* The line is "written" left to right. Negative insets leave room for italic overhangs. */
const writeV: Variants = {
  hidden: { clipPath: "inset(-12% 100% -18% -4%)" },
  shown: { clipPath: "inset(-12% -6% -18% -4%)", transition: { duration: 0.95, ease: EASE_OUT } },
  gone: {},
};

const chipV: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.86 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.45, ease: EASE_POP } },
  gone: {},
};

const arrowV: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 },
  shown: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition: { duration: 0.8, delay: 1.05, ease: EASE_OUT } },
  gone: { opacity: 0, transition: { duration: 0.3 } },
};

const lineV: Variants = {
  off: { opacity: 0, y: -10, transition: { duration: 0.45, ease: EASE_OUT } },
  on: { opacity: 1, y: 0, transition: { duration: 0.85, delay: 0.35, ease: EASE_OUT } },
};

const washV: Variants = {
  off: { scaleX: 0, opacity: 0, transition: { duration: 0.2 } },
  on: {
    scaleX: [0, 1, 1],
    opacity: [1, 1, 0],
    transition: { duration: 1.7, delay: 0.45, times: [0, 0.42, 1], ease: EASE_OUT },
  },
};

/* ---------------------------------------------------------------------
   Reduced motion, hydration-safe: the server value (false) on the first
   render, the real preference straight after hydration.
   --------------------------------------------------------------------- */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** Distance from `el` down to `ancestor` along the offsetParent chain (ignores transforms). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement): number | null {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return node === ancestor ? y : null;
}

/* ---------------------------------------------------------------------
   Illustration: plates drawn in the house palette (top-down, 200 x 200)
   --------------------------------------------------------------------- */

/** Deterministic pseudo-random, so server and client draw identical plates. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A soft, irregular blob (melted mozzarella, a dusting of cocoa). */
function blob(cx: number, cy: number, r: number, seed: number, points = 7, wobble = 0.5) {
  const rnd = seeded(seed);
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2 + rnd() * 0.4 * wobble * 2;
    const rr = r * (1 - wobble * 0.56 + rnd() * wobble);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  // Closed Catmull-Rom through the points, as cubic Béziers.
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

/** Scattered specks inside a circle. */
function specks(cx: number, cy: number, r: number, n: number, seed: number) {
  const rnd = seeded(seed);
  return Array.from({ length: n }, () => {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * r;
    return { x: +(cx + Math.cos(a) * d).toFixed(1), y: +(cy + Math.sin(a) * d).toFixed(1), s: +(0.6 + rnd() * 0.9).toFixed(2), a: Math.round(rnd() * 180) };
  });
}

const tone = (token: string, extra?: CSSProperties): CSSProperties => ({ fill: `var(--${token})`, ...extra });

const CHEESE = [
  blob(82, 78, 13, 3),
  blob(118, 74, 11, 7),
  blob(126, 112, 14, 11),
  blob(88, 120, 12, 19),
  blob(102, 98, 9, 23),
  blob(70, 102, 8, 29),
  blob(110, 136, 7, 31),
];
const BASIL = [
  { x: 98, y: 82, a: -30 },
  { x: 74, y: 88, a: 40 },
  { x: 132, y: 96, a: 110 },
  { x: 102, y: 122, a: 20 },
];
const PEPPER = specks(100, 100, 56, 22, 41);
const CHAR = specks(100, 100, 69, 16, 53).map((p) => {
  // pushed onto the crust ring
  const dx = p.x - 100;
  const dy = p.y - 100;
  const len = Math.hypot(dx, dy) || 1;
  return { x: +(100 + (dx / len) * 66).toFixed(1), y: +(100 + (dy / len) * 66).toFixed(1), s: p.s };
});
const HERBS = specks(100, 92, 44, 26, 61);
const COCOA = specks(100, 100, 42, 60, 73);
const SAUNF = specks(138, 136, 13, 22, 83);

function PlateBase({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" className={styles.dishSvg} aria-hidden="true">
      <circle cx="100" cy="100" r="97" style={tone("paper", { stroke: "var(--sand)", strokeWidth: 1.4 })} />
      <circle
        cx="100"
        cy="100"
        r="91.5"
        style={{ fill: "none", stroke: "var(--terracotta)", strokeWidth: 1.4, strokeDasharray: "0.1 5.4", strokeLinecap: "round", opacity: 0.6 }}
      />
      <circle cx="100" cy="100" r="83" style={tone("bone", { stroke: "var(--sand)", strokeWidth: 1 })} />
      {children}
    </svg>
  );
}

function Margherita() {
  return (
    <PlateBase>
      <circle cx="100" cy="100" r="72" style={tone("brass-light")} />
      <circle cx="100" cy="100" r="72" style={{ fill: "none", stroke: "var(--brass)", strokeWidth: 2.2, opacity: 0.55 }} />
      {CHAR.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.s * 1.6} style={tone("cocoa", { opacity: 0.3 })} />
      ))}
      <circle cx="100" cy="100" r="61" style={tone("terracotta")} />
      <circle cx="100" cy="100" r="61" style={{ fill: "none", stroke: "var(--russet)", strokeWidth: 3, opacity: 0.25 }} />
      {CHEESE.map((d, i) => (
        <path key={i} d={d} style={tone("paper", { opacity: 0.94 })} />
      ))}
      {BASIL.map((b, i) => (
        <g key={i} transform={`rotate(${b.a} ${b.x} ${b.y})`}>
          <ellipse cx={b.x} cy={b.y} rx="9.5" ry="5" style={tone("olive")} />
          <path d={`M${b.x - 8} ${b.y}h16`} style={{ stroke: "var(--paper)", strokeWidth: 0.7, opacity: 0.45 }} />
        </g>
      ))}
      {PEPPER.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.s * 0.7} style={tone("walnut", { opacity: 0.45 })} />
      ))}
    </PlateBase>
  );
}

const SLICES = [
  { x: 70, y: 84, a: -34 },
  { x: 97, y: 70, a: -10 },
  { x: 126, y: 78, a: 16 },
  { x: 140, y: 106, a: 44 },
];

function GarlicBread() {
  return (
    <PlateBase>
      {SLICES.map((s, i) => (
        <g key={i} transform={`rotate(${s.a} ${s.x} ${s.y})`}>
          <rect x={s.x - 17} y={s.y - 27} width="34" height="54" rx="15" style={tone("brass", { opacity: 0.9 })} />
          <rect x={s.x - 13} y={s.y - 23} width="26" height="46" rx="11.5" style={tone("brass-light")} />
          <rect x={s.x - 9} y={s.y - 18} width="18" height="30" rx="8" style={tone("sand", { opacity: 0.85 })} />
        </g>
      ))}
      {HERBS.map((p, i) => (
        <ellipse
          key={i}
          cx={p.x}
          cy={p.y}
          rx={p.s * 1.3}
          ry={p.s * 0.6}
          transform={`rotate(${p.a} ${p.x} ${p.y})`}
          style={tone(i % 3 === 0 ? "paper" : "olive", { opacity: i % 3 === 0 ? 0.8 : 0.85 })}
        />
      ))}
      <circle cx="82" cy="134" r="17" style={tone("linen", { stroke: "var(--sand)", strokeWidth: 1.4 })} />
      <circle cx="82" cy="134" r="12.5" style={tone("paper")} />
      <path d={blob(82, 134, 6, 97, 6)} style={tone("brass-light", { opacity: 0.55 })} />
      <circle cx="79" cy="131" r="1.4" style={tone("olive")} />
    </PlateBase>
  );
}

function Tiramisu() {
  return (
    <PlateBase>
      <path
        d="M141 151c6-6 12-14 15-22 2-5 7-6 9-2 2 5-2 10-8 14-6 4-11 9-14 14z"
        style={tone("sand", { stroke: "var(--oat)", strokeWidth: 1 })}
      />
      {/* A glass of tiramisu from above: mascarpone at the rim, cocoa on top, a stencilled star. */}
      <circle cx="98" cy="98" r="57" style={tone("linen", { stroke: "var(--sand)", strokeWidth: 1.6 })} />
      <circle cx="98" cy="98" r="51" style={tone("bone")} />
      <path d={blob(98, 98, 46, 5, 12, 0.08)} style={tone("cocoa")} />
      {COCOA.map((p, i) => (
        <circle key={i} cx={p.x - 2} cy={p.y - 2} r={p.s * 0.75} style={tone(i % 2 ? "bark" : "taupe", { opacity: 0.55 })} />
      ))}
      <path
        d="M98 76l5.2 16.8L120 98l-16.8 5.2L98 120l-5.2-16.8L76 98l16.8-5.2Z"
        style={tone("brass-light", { opacity: 0.5 })}
      />
      <path d={blob(118, 78, 9, 15, 6)} style={tone("paper", { opacity: 0.95 })} />
      <ellipse cx="121" cy="72" rx="8" ry="4" transform="rotate(-35 121 72)" style={tone("olive")} />
      <ellipse cx="128" cy="79" rx="7.5" ry="3.8" transform="rotate(25 128 79)" style={tone("olive", { opacity: 0.85 })} />
      <g transform="rotate(30 76 116)">
        <ellipse cx="76" cy="116" rx="6.5" ry="4.5" style={tone("espresso")} />
        <path d="M70.5 116h11" style={{ stroke: "var(--cocoa)", strokeWidth: 1 }} />
      </g>
      <g transform="rotate(-20 88 126)">
        <ellipse cx="88" cy="126" rx="6" ry="4.2" style={tone("espresso")} />
        <path d="M83 126h10" style={{ stroke: "var(--cocoa)", strokeWidth: 1 }} />
      </g>
    </PlateBase>
  );
}

function BillTray() {
  return (
    <PlateBase>
      <circle cx="100" cy="100" r="83" style={tone("brass-light", { opacity: 0.22 })} />
      <g transform="rotate(-9 92 96)">
        <rect x="60" y="52" width="64" height="88" rx="3" style={tone("paper", { stroke: "var(--sand)", strokeWidth: 1.2 })} />
        <path d="M60 62h64" style={{ stroke: "var(--terracotta)", strokeWidth: 2, opacity: 0.7 }} />
        {[76, 86, 96, 106].map((y, i) => (
          <g key={y}>
            <rect x="68" y={y} width={i === 3 ? 20 : 30} height="3" rx="1.5" style={tone("linen")} />
            <rect x="104" y={y} width="12" height="3" rx="1.5" style={tone("sand")} />
          </g>
        ))}
        <path d="M68 118h48" style={{ stroke: "var(--sand)", strokeWidth: 1, strokeDasharray: "2 2" }} />
        <rect x="96" y="124" width="20" height="5" rx="2.5" style={tone("taupe", { opacity: 0.5 })} />
      </g>
      <circle cx="138" cy="136" r="21" style={tone("linen", { stroke: "var(--sand)", strokeWidth: 1.4 })} />
      <circle cx="138" cy="136" r="16.5" style={tone("bone")} />
      {SAUNF.map((p, i) =>
        i % 4 === 0 ? (
          <rect key={i} x={p.x - 2} y={p.y - 2} width="4" height="4" rx="0.8" style={tone("paper", { stroke: "var(--sand)", strokeWidth: 0.6 })} />
        ) : (
          <ellipse key={i} cx={p.x} cy={p.y} rx="2.2" ry="1" transform={`rotate(${p.a} ${p.x} ${p.y})`} style={tone("olive", { opacity: 0.8 })} />
        ),
      )}
    </PlateBase>
  );
}

function DishArt({ kind }: { kind: DishKind }) {
  switch (kind) {
    case "garlic":
      return <GarlicBread />;
    case "tiramisu":
      return <Tiramisu />;
    case "bill":
      return <BillTray />;
    default:
      return <Margherita />;
  }
}

/* ---------------------------------------------------------------------
   Small pieces
   --------------------------------------------------------------------- */

/** A rolling value: the new one rises into a mask as the old one leaves. */
function Ticker({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`${styles.tick} ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className={styles.tickInner}
          initial={{ y: "115%" }}
          animate={{ y: "0%", transition: { duration: 0.8, ease: EASE_OUT } }}
          exit={{ y: "-115%", transition: { duration: 0.55, ease: EASE_OUT } }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** The bubble's tail: filled to cover the bubble's border where they meet, stroked on its two outer sides. */
function Tail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 20" aria-hidden="true">
      <path d="M1 0h18C14.5 6.5 10.5 12.5 5 19.2 6.2 12 4.6 5.6 1 0Z" className={styles.tailFill} />
      <path d="M19 .6C14.5 6.5 10.5 12.5 5 19.2 6.2 12 4.6 5.6 1 .6" className={styles.tailStroke} />
    </svg>
  );
}

/** Three hand-drawn strokes: "look here". */
function Marks() {
  return (
    <svg className={styles.marksSvg} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 14.5 1.2 16.4M8.6 7.6 7.4 4.1M15 6.4l2.4-2.9" />
    </svg>
  );
}

const CHIP_TONES = ["terracotta", "olive", "brass"] as const;

/* ---------- The +25% seal ---------- */

/* A gently scalloped rosette, like a brass bottle seal. Built once. */
const SEAL_PATH = (() => {
  const n = 30;
  const c = 60;
  const inner = 55.5;
  const outer = 60.5;
  const pt = (r: number, a: number) => `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 0.5) / n) * Math.PI * 2;
    const a2 = ((i + 1) / n) * Math.PI * 2;
    if (i === 0) d += `M${pt(inner, a0)}`;
    d += ` Q${pt(outer, a1)} ${pt(inner, a2)}`;
  }
  return `${d}Z`;
})();

const RING_R = 44.5;
const RING_LENGTH = Math.round(2 * Math.PI * RING_R);
const RING_TEXT = `${SEAL_RING} · `.toUpperCase();
const SEAL_IDS = { fill: "knomi-upsell-seal-fill", arc: "knomi-upsell-seal-arc" };

function Seal() {
  return (
    <motion.div
      className={styles.seal}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.6, rotate: -34 }}
      animate={{ opacity: 1, scale: 1, rotate: -10 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35, ease: EASE_OUT } }}
      transition={{
        scale: { duration: 0.8, delay: 0.75, ease: EASE_POP },
        rotate: { duration: 0.95, delay: 0.75, ease: EASE_OUT },
        opacity: { duration: 0.3, delay: 0.75 },
      }}
    >
      <motion.span
        className={styles.sealPulse}
        initial={{ opacity: 0.7, scale: 1 }}
        animate={{ opacity: 0, scale: 1.6 }}
        transition={{ duration: 1.1, delay: 1.1, ease: EASE_OUT }}
      />
      <svg className={styles.sealSvg} viewBox="0 0 120 120">
        <defs>
          <linearGradient id={SEAL_IDS.fill} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className={styles.sealStopA} />
            <stop offset="1" className={styles.sealStopB} />
          </linearGradient>
          <path
            id={SEAL_IDS.arc}
            d={`M60 60 m-${RING_R} 0 a${RING_R} ${RING_R} 0 1 1 ${RING_R * 2} 0 a${RING_R} ${RING_R} 0 1 1 -${RING_R * 2} 0`}
          />
        </defs>
        <path d={SEAL_PATH} fill={`url(#${SEAL_IDS.fill})`} />
        <circle cx="60" cy="60" r="52" className={styles.sealRing} />
        <circle cx="60" cy="60" r="34" className={styles.sealDash} />
        <text className={styles.sealText}>
          <textPath href={`#${SEAL_IDS.arc}`} textLength={RING_LENGTH} lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <span className={styles.sealValue}>{SEAL_VALUE}</span>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------
   Section
   --------------------------------------------------------------------- */

export default function UpsellJourney() {
  const reduce = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thresholds = useRef<number[]>([]);

  /* How many moment markers the reading line (viewport centre) has passed.
     null: no scroll story (server render, below desktop) — the finished meal is shown. */
  const [reached, setReached] = useState<number | null>(null);
  const story = reached !== null && !reduce;
  const active = story ? Math.max(0, reached - 1) : LAST;
  const lit = story ? reached : MOMENTS.length;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });

  /* Scroll-linked values are always bound; outside the story they rest on their final value. */
  const railFill = useTransform(scrollYProgress, (v) => (story ? v : 1));
  const plateTurn = useTransform(scrollYProgress, (v) => (story ? v * 54 : 0));
  const drift = useTransform(scrollYProgress, (v) => `${(story ? v : 1) * DRIFT_END}%`);
  const ticketY = useTransform(scrollYProgress, (v) => (story ? (0.5 - v) * 30 : 0));

  const sync = useCallback((progress: number) => {
    const marks = thresholds.current;
    if (!marks.length) return;
    let passed = 0;
    for (const mark of marks) if (progress >= mark) passed += 1;
    setReached(passed);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", sync);

  /* Each marker's position as a fraction of the list's height, so the rail fill,
     the dots and the active moment all switch on the same scroll position. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = list.offsetHeight;
        const marks: number[] = [];
        if (desktop.matches && height > 0) {
          dotRefs.current.forEach((dot) => {
            if (!dot) return;
            // The dot is centred on its own top edge (translate -50%), so offsetTop is its centre.
            const y = offsetWithin(dot, list);
            if (y !== null) marks.push(y / height);
          });
        }
        thresholds.current = marks.length === MOMENTS.length ? marks : [];
        if (!thresholds.current.length) {
          setReached(null);
          return;
        }
        sync(scrollYProgress.get());
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    desktop.addEventListener("change", measure);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", measure);
    };
  }, [scrollYProgress, sync]);

  const moment = MOMENTS[active];
  const pose = toPose(moment.pose);
  const dish = DISH[moment.id] ?? "margherita";
  const strip = STRIPS[active];
  const shown = STRIP_SHOWN[active];
  const total = moment.bill;
  const sealOn = total > upsell.baseBill;
  const goalOn = !story || sealOn;

  return (
    <section id="upsell" className={`section ${styles.root}`} data-mode={story ? "story" : "static"}>
      <div className="wrap">
        <SectionHead
          numeral={upsell.numeral}
          eyebrow={upsell.eyebrow}
          titleLead={upsell.titleLead}
          titleAccent={upsell.titleAccent}
          lead={upsell.lead}
        />

        <div className={styles.story}>
          {/* ---------- The five moments ---------- */}
          <div className={styles.listCol}>
            <span className={styles.rail} aria-hidden="true">
              <motion.span className={styles.railFill} style={{ scaleY: railFill }} />
            </span>

            <ol className={styles.moments} ref={listRef}>
              {MOMENTS.map((m, i) => {
                const mPose = toPose(m.pose);
                return (
                  <li
                    key={m.id}
                    className={`${styles.moment} ${i === active ? styles.isActive : ""} ${i < lit ? styles.isLit : ""}`}
                  >
                    <Reveal className={styles.momentInner} amount={0.3} y={24}>
                      <span
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        className={styles.dot}
                        aria-hidden="true"
                      />
                      <div className={styles.momentHead}>
                        <span className={styles.momentNum} aria-hidden="true">
                          {pad(i + 1)}
                        </span>
                        <span className={styles.momentRule} aria-hidden="true" />
                        <h3 className={styles.momentLabel}>{m.label}</h3>
                      </div>

                      <div className={styles.say} data-pose={mPose}>
                        <span className={styles.sayHost} data-pose={mPose}>
                          <HostArt
                            pose={mPose}
                            fit="art"
                            size="100%"
                            decorative
                            sizes="130px"
                            className={styles.hostArt}
                          />
                        </span>
                        <div className={styles.bubble}>
                          <Tail className={styles.bubbleTail} />
                          <p className={styles.line}>{m.line}</p>
                          {m.chips && (
                            <ul className={styles.chips}>
                              {m.chips.map((c, k) => (
                                <li key={c} className={styles.chip} data-tone={CHIP_TONES[k % CHIP_TONES.length]}>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className={styles.momentText}>
                        <p className={styles.body}>{m.body}</p>
                        {m.add && (
                          <p className={styles.added}>
                            <Plus size={14} className={styles.addedIcon} />
                            <span className="sr-only">{ADDED_LABEL} </span>
                            <span>{m.add.name}</span>
                            <span className="leader" aria-hidden="true" />
                            <span className={styles.addedPrice}>{rupees(m.add.price)}</span>
                          </p>
                        )}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---------- The stage (desktop: sticky; below desktop: the final bill) ---------- */}
          <div className={styles.stageCol}>
            <div className={styles.stage}>
              <div className={styles.scene}>
                {/* The guest's menu card, with Host at the moment that matters. */}
                <div className={styles.cardWrap} data-pose={pose} aria-hidden="true">
                  <div className={styles.card}>
                    <div className={styles.screen}>
                      <div className={styles.crown}>
                        <span className={`ornament ${styles.crownStar}`} />
                        <span className={styles.tableLabel}>{TABLE_LABEL}</span>
                      </div>

                      <motion.div className={styles.skyline} style={{ x: drift }}>
                        <Image src={SKYLINE} alt="" width={854} height={360} sizes="420px" className={styles.skylineImg} />
                      </motion.div>

                      <div className={styles.plateZone}>
                        <span className={styles.plateShadow} />
                        <motion.div className={styles.plateSpin} style={{ rotate: plateTurn }}>
                          <AnimatePresence initial={false}>
                            <motion.div key={dish} className={styles.plate} variants={plateV} initial="hidden" animate="shown" exit="gone">
                              <DishArt kind={dish} />
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>
                      </div>

                      <span className={styles.pill}>
                        <Ticker value={CATEGORY[moment.id] ?? moment.label} />
                        <svg className={styles.pillChevron} viewBox="0 0 12 12" aria-hidden="true">
                          <path d="m3 4.5 3 3 3-3" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Host, in the pose for this moment. */}
                  <AnimatePresence initial={false}>
                    <motion.div key={pose} className={styles.host} data-pose={pose} variants={hostV} initial="hidden" animate="shown" exit="gone">
                      <HostArt
                        pose={pose}
                        fit="art"
                        size="100%"
                        decorative
                        idle
                        sizes="170px"
                        className={styles.hostArt}
                      />
                      {/* At "choose" the button he hugs is the dish's add button: it turns to added. */}
                      {pose === "point" && (
                        <motion.span className={styles.hugAdded} variants={hugV}>
                          <Check size={18} />
                        </motion.span>
                      )}
                      <motion.span className={styles.marks} variants={marksV}>
                        <Marks />
                      </motion.span>
                    </motion.div>
                  </AnimatePresence>

                  {/* The dish label he peeks over and the add button he points at. */}
                  <motion.div
                    className={styles.strip}
                    data-hug={pose === "point"}
                    initial={false}
                    animate={{ opacity: strip ? 1 : 0, y: strip ? 0 : 10 }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                  >
                    <span className={styles.stripRule} />
                    <span className={styles.dishName}>
                      <Ticker value={shown.name} />
                    </span>
                    <span className={styles.dishPrice}>
                      <Ticker value={shown.price !== null ? rupees(shown.price) : " "} />
                    </span>
                    <span className={styles.addBtn} data-added={shown.added}>
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={shown.added ? "added" : "add"}
                          className={styles.addIcon}
                          initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, delay: 0.5, ease: EASE_POP } }}
                          exit={{ opacity: 0, scale: 0.4, rotate: 90, transition: { duration: 0.3 } }}
                        >
                          {shown.added ? <Check size={16} /> : <Plus size={16} />}
                        </motion.span>
                      </AnimatePresence>
                      <AnimatePresence initial={false}>
                        {strip?.added && (
                          <motion.span
                            key={moment.id}
                            className={styles.addPulse}
                            initial={{ opacity: 0.75, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.9, transition: { duration: 1.1, delay: 0.55, ease: EASE_OUT } }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.div>

                  {/* A hand-drawn arrow from the pairing suggestion to the add button. */}
                  <AnimatePresence initial={false}>
                    {pose === "peek" && (
                      <motion.span key="arrow" className={styles.arrow} variants={arrowV} initial="hidden" animate="shown" exit="gone">
                        <svg viewBox="0 0 40 64" aria-hidden="true">
                          <path d="M8 3c14 6 22 18 21 33-.5 8-2.5 14-5 21" />
                          <path d="m16.5 50.5 7.5 7.8 6.8-8.6" />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* What Host says. */}
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={moment.id}
                      className={styles.sb}
                      data-pose={pose}
                      variants={bubbleV}
                      initial="hidden"
                      animate="shown"
                      exit="gone"
                    >
                      <Tail className={styles.sbTail} />
                      <motion.p className={styles.sbLine} variants={writeV}>
                        {moment.line}
                      </motion.p>
                      {moment.chips && (
                        <span className={styles.sbChips}>
                          {moment.chips.map((c, k) => (
                            <motion.span key={c} className={styles.chip} data-tone={CHIP_TONES[k % CHIP_TONES.length]} variants={chipV}>
                              {c}
                            </motion.span>
                          ))}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* The running bill. */}
                <div className={styles.side}>
                  <p className={styles.caption} aria-hidden="true">
                    <Ticker value={pad(active + 1)} className={styles.capNum} />
                    <span className={styles.capTotal}>/ {STEP_TOTAL}</span>
                    <span className={styles.capDash}>&mdash;</span>
                    <Ticker value={moment.label} />
                  </p>

                  <motion.div className={styles.ticketWrap} style={{ y: ticketY }} aria-hidden="true">
                    <div className={styles.ticket}>
                      <div className={styles.tHead}>
                        <span>{TABLE_LABEL}</span>
                        <span className={styles.tHeadDot} />
                        <span>{TICKET_TITLE}</span>
                      </div>
                      <div className={styles.tRule} />
                      <ul className={styles.tLines}>
                        {ADDS.map((item) => {
                          const on = active >= item.at;
                          return (
                            <li key={item.name} className={styles.tLine}>
                              <motion.span
                                className={styles.tPlaceholder}
                                initial={false}
                                animate={{ opacity: on ? 0 : 1 }}
                                transition={{ duration: 0.5, ease: EASE_OUT }}
                              />
                              <motion.span className={styles.tItem} initial={false} animate={on ? "on" : "off"} variants={lineV}>
                                <motion.span className={styles.tWash} variants={washV} />
                                <span className={styles.tName}>{item.name}</span>
                                <span className="leader" />
                                <span className={styles.tPrice}>{rupees(item.price)}</span>
                              </motion.span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className={styles.tTotal}>
                        <span className={styles.tTotalLabel}>{TOTAL_LABEL}</span>
                        <span className="leader" />
                        <AnimatedNumber value={total} prefix="₹" duration={1} className={styles.tTotalValue} />
                      </div>
                    </div>
                    <AnimatePresence initial={false}>{sealOn && <Seal key="seal" />}</AnimatePresence>
                  </motion.div>

                  <p className="sr-only">{ORDER_SUMMARY}</p>

                  <div className={styles.goal} data-on={goalOn}>
                    <p className={styles.goalText}>{GOAL}</p>
                    <p className={styles.goalNote}>
                      <span className="ornament" aria-hidden="true" />
                      {upsell.goalNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
