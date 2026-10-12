"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { menuChapter } from "@/content/site";
import styles from "./MenuChapter.module.css";

const { steps } = menuChapter;
type Step = (typeof steps)[number];
const TOTAL = String(steps.length).padStart(2, "0");
const SKYLINE = "/images/illustrations/skyline-cafe.webp";

// copy: illustrative status-bar clock inside the phone mock (UI label, not a claim)
const STATUS_TIME = "9:41";

/* Each screenshot gets a status bar in its own top colour, so the device's
   camera island sits in the bar instead of over the menu's title.
   (Sampled from the screenshots; unknown images fall back to cream.) */
const SCREEN_TONE: Record<string, { bg: string; ink: string }> = {
  "/images/menu-preview-dishnav.jpg": { bg: "#f8f0e6", ink: "var(--ink)" },
  "/images/menu-preview-dishpage.webp": { bg: "#fbefe1", ink: "var(--ink)" },
  "/images/menu-preview-orderlist.jpg": { bg: "#615c56", ink: "var(--paper)" },
};
const DEFAULT_TONE = { bg: "#f3ebdd", ink: "var(--ink)" };

/* Inside the arch, the view pans along the street sketch as the chapter scrolls:
   arriving in the city on "Scan", at the café table by "Order". Values are the
   translateX of a strip 180% as wide as the arch, so -44% shows its right edge. */
const DRIFT_END = -44;

/*
 * Screen layers. All three shots stay mounted (so they are decoded before they
 * are needed); the incoming one settles in on top while the outgoing one holds
 * underneath and fades only once it is covered. No blank frame, no flicker.
 * Its scale/offset reset happens after it is invisible.
 */
const layerVariants: Variants = {
  on: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
      default: { duration: 0.9, ease: EASE_OUT },
    },
  },
  off: {
    opacity: 0,
    scale: 1.04,
    y: 10,
    transition: {
      opacity: { duration: 0.4, delay: 0.45, ease: "easeOut" },
      scale: { duration: 0, delay: 0.9 },
      y: { duration: 0, delay: 0.9 },
    },
  },
};

const layerVariantsReduced: Variants = {
  on: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  off: { opacity: 0, scale: 1, y: 0, transition: { duration: 0.3, delay: 0.3, ease: "easeOut" } },
};

/*
 * Reduced-motion preference, hydration-safe. framer's useReducedMotion() reads
 * matchMedia during the first client render, which then disagrees with the
 * server HTML (class names, styles) and React does not patch the difference.
 * This renders the server value first and switches straight after hydration.
 */
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

/** Phone screen contents: a status bar, then the menu screenshot below the camera island. */
function Screen({ step, sizes }: { step: Step; sizes: string }) {
  const tone = SCREEN_TONE[step.image] ?? DEFAULT_TONE;
  return (
    <div className={styles.scr} style={{ "--bar-bg": tone.bg, "--bar-ink": tone.ink } as CSSProperties}>
      <span className={styles.statusBar} aria-hidden="true">
        <span>{STATUS_TIME}</span>
        <svg className={styles.statusIcons} viewBox="0 0 34 11" fill="none">
          <rect x="0" y="7" width="2.6" height="4" rx="0.8" fill="currentColor" />
          <rect x="4.2" y="5" width="2.6" height="6" rx="0.8" fill="currentColor" />
          <rect x="8.4" y="2.6" width="2.6" height="8.4" rx="0.8" fill="currentColor" />
          <rect x="12.6" y="0.4" width="2.6" height="10.6" rx="0.8" fill="currentColor" />
          <rect x="19.5" y="0.9" width="12" height="9.2" rx="2.6" stroke="currentColor" strokeOpacity="0.45" />
          <rect x="21" y="2.4" width="7.6" height="6.2" rx="1.4" fill="currentColor" />
          <path d="M32.6 4.2v2.6" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className={styles.shot}>
        <Image src={step.image} alt={step.alt} fill sizes={sizes} className={styles.shotImg} />
      </span>
    </div>
  );
}

/** A rolling micro-caps value for the stage caption. */
function Ticker({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`${styles.tick} ${className ?? ""}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          className={styles.tickInner}
          initial={{ y: "110%" }}
          animate={{ y: "0%", transition: { duration: 0.45, ease: EASE_OUT } }}
          exit={{ y: "-110%", transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function MenuChapter() {
  const reduce = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thresholds = useRef<number[]>([]);

  /* How many step markers the reading line (viewport centre) has passed.
     The active step is the last one passed — the first until then, the last
     until the section ends. */
  const [reached, setReached] = useState(0);
  const active = Math.max(0, reached - 1);
  const dotsShown = reduce ? steps.length : reached;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", `${DRIFT_END}%`]);

  const sync = useCallback((progress: number) => {
    const marks = thresholds.current;
    if (!marks.length) return;
    let passed = 0;
    for (const mark of marks) if (progress >= mark) passed += 1;
    setReached(passed);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", sync);

  /* Each marker's position as a fraction of the list height, so the rail fill,
     the dots and the active step all switch on the same scroll position. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = list.offsetHeight;
        const marks: number[] = [];
        dotRefs.current.forEach((dot) => {
          if (!dot) return;
          // The dot is centred on its own top edge (translate -50%), so offsetTop is its centre.
          const y = offsetWithin(dot, list);
          if (y !== null && height > 0) marks.push(y / height);
        });
        // Markers are hidden below the desktop breakpoint; there is no active state there.
        thresholds.current = marks.length === steps.length ? marks : [];
        sync(scrollYProgress.get());
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [scrollYProgress, sync]);

  const current = steps[active];

  return (
    <section id="menu" className={`section ${styles.root}`}>
      <div className="wrap">
        <SectionHead
          numeral={menuChapter.numeral}
          eyebrow={menuChapter.eyebrow}
          titleLead={menuChapter.titleLead}
          titleAccent={menuChapter.titleAccent}
          lead={menuChapter.lead}
        />

        <div className={styles.story}>
          {/* Desktop: one phone that stays put while the story scrolls past it. */}
          <div className={styles.stageCol}>
            <div className={styles.stage}>
              <div className={styles.arch} aria-hidden="true">
                <motion.div className={styles.skyline} style={{ x: reduce ? `${DRIFT_END / 2}%` : drift }}>
                  <Image src={SKYLINE} alt="" width={854} height={360} sizes="800px" className={styles.skylineImg} />
                </motion.div>
              </div>
              <span className={styles.ground} aria-hidden="true" />

              <div className={styles.stagePhone}>
                <PhoneFrame src={steps[0].image} alt="" sizes="300px">
                  <div className={styles.layers}>
                    {steps.map((step, i) => {
                      const on = i === active;
                      return (
                        <motion.div
                          key={step.image}
                          className={styles.layer}
                          variants={reduce ? layerVariantsReduced : layerVariants}
                          initial={false}
                          animate={on ? "on" : "off"}
                          style={{ zIndex: on ? 1 : 0 }}
                          aria-hidden={!on}
                        >
                          <Screen step={step} sizes="300px" />
                        </motion.div>
                      );
                    })}
                  </div>
                </PhoneFrame>
              </div>

              <p className={styles.caption} aria-hidden="true">
                <Ticker value={current.n} className={styles.capNum} />
                <span className={styles.capTotal}>/ {TOTAL}</span>
                <span className={styles.capDash}>&mdash;</span>
                <Ticker value={current.title} />
              </p>
            </div>
          </div>

          <div className={styles.stepsCol}>
            <span className={styles.rail} aria-hidden="true">
              <motion.span className={styles.railFill} style={{ scaleY: reduce ? 1 : scrollYProgress }} />
            </span>

            <ol className={styles.steps} ref={listRef}>
              {steps.map((step, i) => (
                <li key={step.n} className={`${styles.step} ${i === active ? styles.isActive : ""}`}>
                  <Reveal className={styles.stepBody} amount={0.35}>
                    <span
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className={`${styles.dot} ${i < dotsShown ? styles.dotOn : ""}`}
                      aria-hidden="true"
                    />
                    <div className={styles.stepText}>
                      <div className={styles.numRow} aria-hidden="true">
                        <span className={styles.num}>{step.n}</span>
                        <span className={styles.numLine} />
                      </div>
                      <h3 className={styles.title}>{step.title}</h3>
                      <p className={styles.body}>{step.body}</p>
                    </div>
                  </Reveal>

                  {/* Mobile & tablet: each step carries its own phone. */}
                  <Reveal as="figure" className={styles.figure} delay={0.12} amount={0.2}>
                    <div className={styles.arch} aria-hidden="true">
                      <div
                        className={`${styles.skyline} ${styles.skylineStatic}`}
                        style={{ "--shift": `${(DRIFT_END * i) / (steps.length - 1)}%` } as CSSProperties}
                      >
                        <Image src={SKYLINE} alt="" width={854} height={360} sizes="560px" className={styles.skylineImg} />
                      </div>
                    </div>
                    <span className={styles.ground} aria-hidden="true" />
                    <PhoneFrame src={step.image} alt="" sizes="(max-width: 699px) 64vw, 250px" className={styles.figPhone}>
                      <div className={styles.layers}>
                        <div className={styles.layer}>
                          <Screen step={step} sizes="(max-width: 699px) 64vw, 250px" />
                        </div>
                      </div>
                    </PhoneFrame>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
