"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { hero, process } from "@/content/site";
import styles from "./Process.module.css";

/* ---------------------------------------------------------------------------
   Process — "From first call to first order."
   Four courses on one rail. On wide screens the rail runs across the row and
   draws itself left to right as the row scrolls up; each stop fills the moment
   the line reaches it, and the line ends on a star. Below 1024px the rail turns
   vertical down the left edge, and each step owns its own stretch of it, so the
   tip of the line always sits at the same height in the viewport.

   Both rails are rendered; CSS shows the one that fits the layout. Reduced
   motion: CSS pins every rail and stop to its finished state, and the pops
   below jump instead of springing.
   --------------------------------------------------------------------------- */

const STEPS = process.steps;
const COUNT = STEPS.length;

type Step = (typeof STEPS)[number];

const POP_IN = { type: "spring", stiffness: 520, damping: 24, mass: 0.7 } as const;
const POP_OUT = { duration: 0.28, ease: EASE_OUT };

/** Springs `target` to 1 when `progress` crosses `threshold`, and back to 0 below it. */
function usePop(progress: MotionValue<number>, threshold: number, reduce: boolean) {
  const target = useMotionValue(0);
  const on = useRef(false);

  useMotionValueEvent(progress, "change", (v) => {
    const next = v >= threshold;
    if (next === on.current) return;
    on.current = next;
    animate(target, next ? 1 : 0, reduce ? { duration: 0 } : next ? POP_IN : POP_OUT);
  });

  return target;
}

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = Boolean(useReducedMotion());

  // Wide layout: the rail starts as the row rises past 90% of the viewport and
  // is complete once its bottom edge reaches 55%.
  const { scrollYProgress: row } = useScroll({
    target: listRef,
    offset: ["start 0.9", "end 0.55"],
  });

  return (
    <section id="begin" className="section section--alt">
      <div className={`wrap ${styles.layout}`}>
        <SectionHead
          className={styles.head}
          eyebrow={process.eyebrow}
          titleLead={process.titleLead}
          titleAccent={process.titleAccent}
        />

        <ol ref={listRef} className={styles.steps}>
          {STEPS.map((step, i) => (
            <StepItem key={step.n} step={step} index={i} row={row} reduce={reduce} />
          ))}
        </ol>

        <Reveal className={styles.cta} y={14} delay={0.2} amount={0.6}>
          <a href={hero.primaryCta.href} className="btn btn--ghost">
            {hero.primaryCta.label}
            <ArrowRight className="btn__arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  row,
  reduce,
}: {
  step: Step;
  index: number;
  row: MotionValue<number>;
  reduce: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const isLast = index === COUNT - 1;

  // Narrow layout: this step's stretch of the vertical rail grows while the
  // step passes the 62% line of the viewport.
  const { scrollYProgress: self } = useScroll({
    target: ref,
    offset: ["start 0.62", "end 0.62"],
  });

  // Wide layout: the shared row progress is split into four equal stretches.
  // Steps sit in gapless columns, so stop i is exactly at i / COUNT.
  const from = index / COUNT;
  const to = (index + 1) / COUNT;
  const segX = useTransform(row, [from, to], [0, 1]);

  const stopH = usePop(row, from + 0.012, reduce);
  const stopV = usePop(self, 0.002, reduce);
  const capH = usePop(row, 0.985, reduce);
  const capV = usePop(self, 0.97, reduce);

  return (
    <li ref={ref} className={`${styles.step} ${isLast ? styles.last : ""}`}>
      <span className={styles.num} aria-hidden="true">
        {step.n}
      </span>

      <span className={styles.rail} aria-hidden="true">
        <span className={styles.stop}>
          <motion.span className={`${styles.stopFill} ${styles.wideOnly}`} style={{ scale: stopH }} />
          <motion.span className={`${styles.stopFill} ${styles.narrowOnly}`} style={{ scale: stopV }} />
        </span>

        <span className={styles.track}>
          <motion.span className={`${styles.seg} ${styles.segH}`} style={{ scaleX: segX }} />
          <motion.span className={`${styles.seg} ${styles.segV}`} style={{ scaleY: self }} />
        </span>

        {isLast && (
          <span className={styles.cap}>
            <motion.span className={`${styles.capFill} ${styles.wideOnly}`} style={{ scale: capH }} />
            <motion.span className={`${styles.capFill} ${styles.narrowOnly}`} style={{ scale: capV }} />
          </span>
        )}
      </span>

      <Reveal className={styles.body} y={18} delay={0.08 * index} amount={0.5}>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.text}>{step.body}</p>
      </Reveal>
    </li>
  );
}
