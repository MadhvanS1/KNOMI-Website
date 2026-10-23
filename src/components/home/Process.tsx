"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
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

   Both rails are rendered; CSS shows the one that fits the layout. A stop's
   fill is a short CSS fade from 90% (data-on), never a pop from nothing.
   Reduced motion: CSS pins every rail and stop to its finished state.
   --------------------------------------------------------------------------- */

const STEPS = process.steps;
const COUNT = STEPS.length;

type Step = (typeof STEPS)[number];

/** Marks the element [data-on] while `progress` is at or past `threshold`. It writes the
 *  attribute directly, so scrolling never re-renders the step. */
function useReached<T extends Element>(progress: MotionValue<number>, threshold: number) {
  const ref = useRef<T>(null);
  useMotionValueEvent(progress, "change", (v) => {
    ref.current?.toggleAttribute("data-on", v >= threshold);
  });
  return ref;
}

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);

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
          accentStyle="plain"
        />

        <ol ref={listRef} className={styles.steps}>
          {STEPS.map((step, i) => (
            <StepItem key={step.n} step={step} index={i} row={row} />
          ))}
        </ol>

        <Reveal className={styles.cta} delay={0.1}>
          <a href={hero.primaryCta.href} className="btn btn--ghost">
            {hero.primaryCta.label}
            <ArrowRight className="btn__arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function StepItem({ step, index, row }: { step: Step; index: number; row: MotionValue<number> }) {
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

  const stopH = useReached<HTMLSpanElement>(row, from + 0.012);
  const stopV = useReached<HTMLSpanElement>(self, 0.002);
  const capH = useReached<HTMLSpanElement>(row, 0.985);
  const capV = useReached<HTMLSpanElement>(self, 0.97);

  return (
    <li ref={ref} className={`${styles.step} ${isLast ? styles.last : ""}`}>
      <span className={styles.num} aria-hidden="true">
        {step.n}
      </span>

      <span className={styles.rail} aria-hidden="true">
        <span className={styles.stop}>
          <span ref={stopH} className={`${styles.stopFill} ${styles.wideOnly}`} />
          <span ref={stopV} className={`${styles.stopFill} ${styles.narrowOnly}`} />
        </span>

        <span className={styles.track}>
          <motion.span className={`${styles.seg} ${styles.segH}`} style={{ scaleX: segX }} />
          <motion.span className={`${styles.seg} ${styles.segV}`} style={{ scaleY: self }} />
        </span>

        {isLast && (
          <span className={styles.cap}>
            <span ref={capH} className={`${styles.capFill} ${styles.wideOnly}`} />
            <span ref={capV} className={`${styles.capFill} ${styles.narrowOnly}`} />
          </span>
        )}
      </span>

      <Reveal className={styles.body} delay={0.05 * index}>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.text}>{step.body}</p>
      </Reveal>
    </li>
  );
}
