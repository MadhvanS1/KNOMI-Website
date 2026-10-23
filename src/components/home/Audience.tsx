"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { audience } from "@/content/site";
import SectionHead from "@/components/ui/SectionHead";
import { EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import styles from "./Audience.module.css";

/* ---------------------------------------------------------------------------
   Audience — "For rooms worth lingering in."
   Left: a sticky header above a drawing of receding doorways, one arch per
   kind of room, smallest to largest. Right: the rooms as editorial rows.
   Scrolling (or hovering) a row lights its doorway. The section closes on the
   café sketch, drawn in from the left like the end of a chapter.
   --------------------------------------------------------------------------- */

const segments = audience.segments;
const COUNT = segments.length;

/* ---------- Arcade geometry (viewBox 240 x 280) ---------- */
const VB_W = 240;
const VB_H = 280;
const BASE = 272; // floor line
const CX = VB_W / 2;

const ARCHES = segments.map((_, i) => {
  const t = COUNT === 1 ? 1 : i / (COUNT - 1);
  const w = 76 + t * 144; // 76 → 220
  const h = 120 + t * 144; // 120 → 264
  const r = w / 2;
  const top = BASE - h;
  const spring = top + r;
  const d = `M ${CX - r} ${BASE} V ${spring} A ${r} ${r} 0 0 1 ${CX + r} ${spring} V ${BASE}`;
  return { d, fill: `${d} Z`, starY: top + 18 };
});

/** Four-point star, same silhouette as the global .ornament. */
const STAR = "0,-6 1.35,-1.35 6,0 1.35,1.35 0,6 -1.35,1.35 -6,0 -1.35,-1.35";

const pad = (n: number) => String(n).padStart(2, "0");

/** False on the server and during hydration, true afterwards — keeps the first client render identical to the HTML. */
const subscribeNoop = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

/* Caption swaps are quick and never overlap: the old line leaves in 0.12s, the new one
   arrives in 0.18s, so a hover or a scrolled row is answered within 0.3s. */
const CAPTION_OUT = { duration: 0.12, ease: EASE_OUT };
const CAPTION_IN = { duration: 0.18, ease: EASE_OUT };

function Arcade({ active }: { active: number | null }) {
  return (
    <Reveal className={styles.arcade} delay={0.2}>
      <svg
        className={styles.arcadeSvg}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        aria-hidden="true"
        focusable="false"
      >
        {ARCHES.map((arch, i) => (
          <path key={`fill-${i}`} d={arch.fill} className={styles.archFill} data-on={active === i} />
        ))}
        <path d={`M 0 ${BASE} H ${VB_W}`} className={styles.archFloor} />
        {ARCHES.map((arch, i) => (
          <path key={`line-${i}`} d={arch.d} className={styles.archLine} />
        ))}
        {ARCHES.map((arch, i) => (
          <path key={`lit-${i}`} d={arch.d} className={styles.archLit} data-on={active === i} />
        ))}
        {ARCHES.map((arch, i) => (
          <g key={`star-${i}`} transform={`translate(${CX} ${arch.starY})`}>
            <polygon points={STAR} className={styles.archStar} data-on={active === i} />
          </g>
        ))}
      </svg>

      <div className={styles.caption} aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          {active === null ? (
            <motion.span
              key="rest"
              className={styles.captionRest}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: CAPTION_IN }}
              exit={{ opacity: 0, transition: CAPTION_OUT }}
            >
              <span className="ornament" />
            </motion.span>
          ) : (
            <motion.span
              key={active}
              className={styles.captionText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: CAPTION_IN }}
              exit={{ opacity: 0, y: -4, transition: CAPTION_OUT }}
            >
              <span className={styles.captionIndex}>{pad(active + 1)}</span>
              {segments[active].title}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/** The sketch is "drawn" in from the left, like a pen crossing the page. */
const SKETCH_HIDDEN = { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" };
const SKETCH_SHOWN = { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" };

function Vignette() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const still = hydrated && reduce === true;

  // Observe the unclipped wrapper: a fully clipped element never reports as intersecting.
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [44, -44]);

  return (
    <div ref={ref} className={styles.vignette}>
      <motion.div className={styles.drift} style={{ y: still ? 0 : drift }}>
        <motion.div
          className={styles.sketchReveal}
          initial={SKETCH_HIDDEN}
          animate={inView ? SKETCH_SHOWN : SKETCH_HIDDEN}
          transition={{ duration: still ? 0 : 1, ease: EASE_OUT }}
        >
          {/* Eager but low priority: native lazy-loading never fires inside a fully clipped parent. */}
          <Image
            src="/images/illustrations/skyline-cafe.webp"
            alt=""
            width={854}
            height={360}
            loading="eager"
            fetchPriority="low"
            sizes="(max-width: 1180px) 100vw, 1100px"
            className={styles.sketch}
          />
        </motion.div>
      </motion.div>

      <Reveal className={styles.endmark} y={0} delay={0.3}>
        <span className={styles.endLine} aria-hidden="true" />
        <span className="ornament" aria-hidden="true" />
        <span className={styles.endLine} aria-hidden="true" />
      </Reveal>
    </div>
  );
}

export default function Audience() {
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<number | null>(null);
  const active = hovered ?? scrolled;

  // The row crossing the reading line (just below centre) is the "current" room.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setScrolled(p <= 0 ? null : Math.min(COUNT - 1, Math.floor(p * COUNT)));
  });

  return (
    <section id="for" className={`section section--alt ${styles.section}`}>
      <div className="wrap">
        <div className={styles.layout}>
          <div className={styles.headCol}>
            <div className={styles.sticky}>
              <SectionHead
                eyebrow={audience.eyebrow}
                titleLead={audience.titleLead}
                titleAccent={audience.titleAccent}
                lead={audience.lead}
                breakBeforeAccent
              />
              <Arcade active={active} />
            </div>
          </div>

          <div ref={listRef} className={styles.listCol} onPointerLeave={() => setHovered(null)}>
            <Stagger as="ul" className={styles.list} stagger={0.06}>
              {segments.map((segment, i) => (
                <StaggerItem as="li" key={segment.title} className={styles.item}>
                  <div
                    className={styles.row}
                    data-active={active === i}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setHovered(i);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setHovered((h) => (h === i ? null : h));
                    }}
                  >
                    <span className={styles.index}>{pad(i + 1)}</span>
                    <div className={styles.copy}>
                      <h3 className={styles.title}>{segment.title}</h3>
                      <p className={styles.body}>{segment.body}</p>
                    </div>
                    <span className={styles.mark} aria-hidden="true">
                      <span className={`ornament ${styles.markStar}`} />
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <Vignette />
      </div>
    </section>
  );
}
