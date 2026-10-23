"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { RevealTitle, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { problem } from "@/content/site";
import styles from "./Problem.module.css";

/* ---------------------------------------------------------------------------
   Problem: the owner's night, before KNOMI (problem → agitate → solve).
   A hairline drawing of a table late in service draws itself in as you
   scroll: the wall clock runs on, and the suggestion nobody made hangs over
   the table and fades. Four pains follow as a ruled list, then the turn,
   whose plumb line falls into the dark Knomi Sense section below.
   --------------------------------------------------------------------------- */

/* Reduced-motion preference, hydration-safe: false on the server and during
   hydration (matching the HTML), the real preference straight after. */
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

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

/* False on the server and during hydration, true straight after. The drawing is sent
   finished (so it shows without JavaScript) and only becomes scroll-linked once live. */
const subscribeNothing = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

/* ---------- The drawing (viewBox 440 x 320) ---------- */

const CLOCK = { cx: 96, cy: 82, r: 40 };
const TICKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const major = i % 3 === 0;
  const r1 = CLOCK.r - 9;
  const r2 = CLOCK.r - (major ? 17 : 13);
  const p = (r: number) => `${(CLOCK.cx + r * Math.sin(a)).toFixed(2)} ${(CLOCK.cy - r * Math.cos(a)).toFixed(2)}`;
  return `M ${p(r1)} L ${p(r2)}`;
}).join(" ");

/** A bentwood bistro chair facing right; the other side is the same path mirrored about the table. */
const CHAIR =
  "M 186 302 C 190 282 193 264 194 247 C 195 228 186 207 188 193 C 190 182 200 182 201 192 " +
  "C 202 210 201 230 202 247 M 238 250 C 240 268 242 286 245 302 M 214 251 L 215 300";
const CHAIR_SEAT = { cx: 216, cy: 247, rx: 25, ry: 4.5 };
const CHAIR_RING = { cx: 215, cy: 280, rx: 22, ry: 3.4 };

/** Table top (with a hint of thickness), pedestal and tripod foot, centred on x = 300. */
const TABLE =
  "M 222 214 A 78 11 0 0 1 378 214 A 78 11 0 0 1 222 214 Z M 222 214 V 217 A 78 11 0 0 0 378 217 V 214 " +
  "M 300 228 V 290 M 300 290 L 276 302 M 300 290 L 324 302";

/** A second table further back, smaller and fainter: every table, not just this one. */
const FAR = "translate(-91 114.76) scale(0.62)";

type Draw = MotionValue<number>;

function Drawing({ progress, night, still }: { progress: MotionValue<number>; night: MotionValue<number>; still: boolean }) {
  // Each group draws across its own window of the scroll, so the picture assembles in order.
  const floor = useTransform(progress, [0, 0.3], [0, 1]);
  const lamp = useTransform(progress, [0.04, 0.34], [0, 1]);
  const clock = useTransform(progress, [0.08, 0.4], [0, 1]);
  const table = useTransform(progress, [0.14, 0.48], [0, 1]);
  const chairs = useTransform(progress, [0.22, 0.58], [0, 1]);
  const far = useTransform(progress, [0.3, 0.62], [0, 1]);
  const setting = useTransform(progress, [0.36, 0.64], [0, 1]);
  const glow = useTransform(progress, [0.3, 0.7], [0, 1]);
  // The suggestion appears over the table... then slips past as the night goes on.
  const bubble = useTransform(progress, [0.5, 0.64, 0.86, 1], [0, 1, 1, 0.32]);
  const bubbleY = useTransform(progress, [0.5, 0.64], [8, 0]);
  const dot1 = useTransform(progress, [0.6, 0.66], [0, 1]);
  const dot2 = useTransform(progress, [0.64, 0.7], [0, 1]);
  const dot3 = useTransform(progress, [0.68, 0.74], [0, 1]);
  const farBubble = useTransform(progress, [0.62, 0.74, 0.9, 1], [0, 0.75, 0.75, 0.24]);

  // The clock runs from half past eight to half past ten across the section.
  const minute = useTransform(night, [0, 1], [180, 900]);
  const hour = useTransform(night, [0, 1], [255, 315]);

  const len = (v: Draw) => (still ? 1 : v);
  const fade = (v: Draw) => (still ? 1 : v);

  return (
    <svg className={styles.drawing} viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="problem-lamp-glow" cx="50%" cy="0%" r="100%">
          <stop offset="0%" style={{ stopColor: "var(--brass-light)", stopOpacity: 0.38 }} />
          <stop offset="100%" style={{ stopColor: "var(--brass-light)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Lamp light pooling on the table */}
      <motion.path
        d="M 284 96 L 316 96 L 384 214 Q 300 232 216 214 Z"
        fill="url(#problem-lamp-glow)"
        style={{ opacity: fade(glow) }}
      />

      {/* Floor */}
      <motion.path className={styles.faint} d="M 14 302 H 426" style={{ pathLength: len(floor) }} />

      {/* Pendant lamp */}
      <motion.path
        className={styles.brass}
        d="M 300 0 V 66 M 276 94 C 278 76 287 67 300 67 C 313 67 322 76 324 94 Z M 270 94 H 330 M 293 94 A 7 7 0 0 0 307 94"
        style={{ pathLength: len(lamp) }}
      />

      {/* Wall clock */}
      <motion.circle
        className={styles.ink}
        cx={CLOCK.cx}
        cy={CLOCK.cy}
        r={CLOCK.r}
        style={{ pathLength: len(clock), rotate: -90 }}
      />
      <motion.circle
        className={styles.faint}
        cx={CLOCK.cx}
        cy={CLOCK.cy}
        r={CLOCK.r - 5}
        style={{ pathLength: len(clock), rotate: -90 }}
      />
      <motion.path className={styles.ink} d={TICKS} style={{ opacity: fade(clock) }} />
      <motion.g style={{ opacity: fade(clock) }}>
        <motion.line
          className={styles.hand}
          x1={CLOCK.cx}
          y1={CLOCK.cy}
          x2={CLOCK.cx}
          y2={CLOCK.cy - 17}
          style={{ rotate: still ? 290 : hour, originX: 0.5, originY: 1 }}
        />
        <motion.line
          className={styles.handThin}
          x1={CLOCK.cx}
          y1={CLOCK.cy}
          x2={CLOCK.cx}
          y2={CLOCK.cy - 27}
          style={{ rotate: still ? 240 : minute, originX: 0.5, originY: 1 }}
        />
        <circle className={styles.pin} cx={CLOCK.cx} cy={CLOCK.cy} r={2.2} />
      </motion.g>

      {/* A table further back */}
      <g transform={FAR}>
        <motion.path className={styles.far} d={TABLE} style={{ pathLength: len(far) }} />
        <motion.path className={styles.far} d={CHAIR} style={{ pathLength: len(far) }} />
        <motion.ellipse className={styles.far} {...CHAIR_SEAT} style={{ pathLength: len(far) }} />
        <g transform="translate(600 0) scale(-1 1)">
          <motion.path className={styles.far} d={CHAIR} style={{ pathLength: len(far) }} />
          <motion.ellipse className={styles.far} {...CHAIR_SEAT} style={{ pathLength: len(far) }} />
        </g>
      </g>

      {/* Table */}
      <motion.path className={styles.ink} d={TABLE} style={{ pathLength: len(table) }} />

      {/* Chairs, pulled in to an empty table */}
      <motion.path className={styles.ink} d={CHAIR} style={{ pathLength: len(chairs) }} />
      <motion.ellipse className={styles.ink} {...CHAIR_SEAT} style={{ pathLength: len(chairs) }} />
      <motion.ellipse className={styles.faint} {...CHAIR_RING} style={{ pathLength: len(chairs) }} />
      <g transform="translate(600 0) scale(-1 1)">
        <motion.path className={styles.ink} d={CHAIR} style={{ pathLength: len(chairs) }} />
        <motion.ellipse className={styles.ink} {...CHAIR_SEAT} style={{ pathLength: len(chairs) }} />
        <motion.ellipse className={styles.faint} {...CHAIR_RING} style={{ pathLength: len(chairs) }} />
      </g>

      {/* The setting: an empty plate, a glass, the QR stand */}
      <motion.path
        className={styles.ink}
        d="M 272 210 A 17 3 0 0 1 306 210 A 17 3 0 0 1 272 210 Z M 318 184 C 318 197 334 197 334 184 Z M 326 195 V 209 M 320 210 H 332 M 245 210 V 194 Q 245 192 247 192 H 257 Q 259 192 259 194 V 210"
        style={{ pathLength: len(setting) }}
      />
      <motion.rect
        className={styles.brass}
        x={249}
        y={197}
        width={6}
        height={6}
        rx={0.6}
        style={{ opacity: fade(setting) }}
      />

      {/* ...and at the table further back */}
      <motion.path
        className={styles.bubble}
        d="M 66 196 Q 66 188 74 188 H 118 Q 126 188 126 196 V 206 Q 126 214 118 214 H 104 L 98 223 L 96 214 H 74 Q 66 214 66 206 Z"
        style={{ opacity: fade(farBubble) }}
      />

      {/* The suggestion nobody made */}
      <motion.g style={{ opacity: fade(bubble), y: still ? 0 : bubbleY }}>
        <path
          className={styles.bubble}
          d="M 156 124 Q 156 112 168 112 H 244 Q 256 112 256 124 V 142 Q 256 154 244 154 H 228 L 218 168 L 214 154 H 168 Q 156 154 156 142 Z"
        />
        <motion.circle className={styles.dot} cx={192} cy={133} r={2.6} style={{ opacity: fade(dot1) }} />
        <motion.circle className={styles.dot} cx={206} cy={133} r={2.6} style={{ opacity: fade(dot2) }} />
        <motion.circle className={styles.dot} cx={220} cy={133} r={2.6} style={{ opacity: fade(dot3) }} />
      </motion.g>
    </svg>
  );
}

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const drawingRef = useRef<HTMLDivElement>(null);
  const turnRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const live = useHydrated();

  // The drawing assembles as it rises through the lower part of the screen.
  const { scrollYProgress: drawProgress } = useScroll({ target: drawingRef, offset: ["start 0.92", "end 0.3"] });
  // The clock runs across the whole time the section is on screen.
  const { scrollYProgress: night } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // The plumb line lengthens toward the next section as the turn is read.
  const { scrollYProgress: drop } = useScroll({ target: turnRef, offset: ["start 0.85", "end 0.55"] });

  return (
    <section ref={sectionRef} id="problem" className={`section section--alt ${styles.section}`}>
      <div className="wrap">
        <div className={styles.top}>
          <SectionHead
            eyebrow={problem.eyebrow}
            titleLead={problem.titleLead}
            titleAccent={problem.titleAccent}
            accentStyle="plain"
            lead={problem.lead}
            className={styles.head}
          />
          {/* With JavaScript it waits unseen (Problem.module.css) until live, then draws in with the
              scroll; without it, the finished drawing is simply there. */}
          <div ref={drawingRef} className={styles.drawingWrap} data-live={live ? "" : undefined}>
            <Drawing progress={drawProgress} night={night} still={still || !live} />
          </div>
        </div>

        {/* The pains, in turn: a ruled list, no numbering (the order carries nothing). */}
        <Stagger className={styles.painsWrap}>
          <ul role="list" className={styles.pains}>
            {problem.pains.map((pain) => (
              <StaggerItem as="li" key={pain.title} className={styles.pain}>
                <h3 className={styles.painTitle}>{pain.title}</h3>
                <p className={styles.painBody}>{pain.body}</p>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>

        <div ref={turnRef} className={styles.turn}>
          <RevealTitle as="p" lead={problem.turn} className={styles.turnText} />
          <span className={styles.dropTrack} aria-hidden="true">
            <motion.span className={styles.drop} style={{ scaleY: still ? 1 : drop }} />
          </span>
        </div>
      </div>
    </section>
  );
}
