"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type Variants } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import PhoneFrame, { PhoneScreen, screenRatioOf } from "@/components/ui/PhoneFrame";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { menuChapter } from "@/content/site";
import styles from "./MenuChapter.module.css";

const { steps } = menuChapter;
const LAST = steps.length - 1;
const SKYLINE = "/images/illustrations/skyline-cafe.webp";

/* One device for all three screens. It takes the tallest screenshot's shape, so each
   screenshot shows whole inside it (PhoneScreen adds a status bar and a home-bar strip
   around the shorter ones). Nothing is cropped. */
const DEVICE_SRC = steps.reduce((tallest, s) => (screenRatioOf(s.image) < screenRatioOf(tallest) ? s.image : tallest), steps[0].image);
const SCREEN_RATIO = screenRatioOf(DEVICE_SRC);

/* Inside the arch, the view pans along the street sketch as the chapter moves on:
   arriving in the city on "Scan", at the café table by "Order". Values are the
   translateX of a strip 180% as wide as the arch, so -44% shows its right edge. */
const DRIFT_END = -44;
const driftAt = (i: number) => `${(DRIFT_END * i) / LAST}%`;

/* A swipe on the phone (below desktop) changes step once it travels this far, or on a
   quick flick: anything faster than this many px per ms, however short. */
const SWIPE_PX = 40;
const FLICK_SPEED = 0.11;
const FLICK_MIN_PX = 12;
/* How far the screen follows the finger: closely within the steps, damped past either end. */
const FOLLOW = 0.6;
const FOLLOW_PAST_END = 0.12;

/*
 * Desktop screen layers. All three shots stay mounted (so they are decoded before
 * they are needed); the incoming one settles in on top while the outgoing one holds
 * underneath and fades only once it is covered. No blank frame, no flicker.
 * Its scale/offset reset happens after it is invisible.
 */
const layerVariants: Variants = {
  on: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3, ease: EASE_OUT },
      default: { duration: 0.45, ease: EASE_OUT },
    },
  },
  off: {
    opacity: 0,
    scale: 1.03,
    y: 8,
    transition: {
      opacity: { duration: 0.15, delay: 0.3, ease: EASE_OUT },
      scale: { duration: 0, delay: 0.45 },
      y: { duration: 0, delay: 0.45 },
    },
  },
};

const layerVariantsReduced: Variants = {
  on: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } },
  off: { opacity: 0, scale: 1, y: 0, transition: { duration: 0.15, delay: 0.25, ease: EASE_OUT } },
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

/* ---------------------------------------------------------------------
   Below desktop: one phone in its doorway, and a Scan / Browse / Order
   stepper (tabs, arrow keys, or a swipe across the phone).
   --------------------------------------------------------------------- */

const PHONE_SIZES = "(max-width: 639px) 60vw, 250px";

function MenuStepper({ reduce }: { reduce: boolean }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; t: number; dx: number; horizontal: boolean | null } | null>(null);

  const go = (i: number, focus = false) => {
    const next = Math.min(LAST, Math.max(0, i));
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  /* Arrow keys move along the tabs (wrapping), Home and End jump to either end. */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let to: number;
    if (e.key === "ArrowRight") to = active === LAST ? 0 : active + 1;
    else if (e.key === "ArrowLeft") to = active === 0 ? LAST : active - 1;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = LAST;
    else return;
    e.preventDefault();
    go(to, true);
  };

  /* While a finger drags sideways, the screen follows it closely (with resistance past
     either end). The offset is written straight to the viewer, so React never re-renders
     mid-drag; vertical drags are left to the page (touch-action: pan-y). */
  const follow = (px: number | null) => {
    const el = viewerRef.current;
    if (!el) return;
    if (px === null) {
      el.removeAttribute("data-dragging");
      el.style.removeProperty("--drag");
    } else {
      el.setAttribute("data-dragging", "");
      el.style.setProperty("--drag", `${px.toFixed(1)}px`);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, dx: 0, horizontal: null };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (d.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      d.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!d.horizontal) {
        drag.current = null;
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    d.dx = dx;
    if (reduce) return;
    const pastEnd = (dx > 0 && active === 0) || (dx < 0 && active === LAST);
    follow(dx * (pastEnd ? FOLLOW_PAST_END : FOLLOW));
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    follow(null);
    if (!d || d.id !== e.pointerId || !d.horizontal || e.type === "pointercancel") return;
    const dist = Math.abs(d.dx);
    const speed = dist / Math.max(1, e.timeStamp - d.t);
    if (dist >= SWIPE_PX || (dist >= FLICK_MIN_PX && speed >= FLICK_SPEED)) go(active + (d.dx < 0 ? 1 : -1));
  };

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;

  return (
    <div className={styles.stepper} data-motion-safe="">
      <div
        role="tablist"
        aria-label={steps.map((s) => s.title).join(", ")}
        className={styles.tabs}
        style={{ "--active": active, "--count": steps.length } as CSSProperties}
        onKeyDown={onKeyDown}
      >
        {steps.map((step, i) => (
          <button
            key={step.n}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabId(i)}
            aria-selected={i === active}
            aria-controls={panelId(i)}
            tabIndex={i === active ? 0 : -1}
            className={`pressable ${styles.tab}`}
            onClick={() => go(i)}
          >
            <span className={styles.tabNum} aria-hidden="true">
              {step.n}
            </span>
            {step.title}
          </button>
        ))}
        <span className={styles.tabBar} aria-hidden="true" />
      </div>

      {/* Every panel shares one grid cell, so the block keeps its height as the text changes. */}
      <div className={styles.panels}>
        {steps.map((step, i) => (
          <div
            key={step.n}
            role="tabpanel"
            id={panelId(i)}
            aria-labelledby={tabId(i)}
            tabIndex={i === active ? 0 : undefined}
            className={styles.panel}
            data-on={i === active}
          >
            <p className={styles.panelBody}>{step.body}</p>
          </div>
        ))}
      </div>

      <figure
        ref={viewerRef}
        className={styles.viewer}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div className={styles.arch} aria-hidden="true">
          <div className={`${styles.skyline} ${styles.skylineStep}`} style={{ "--shift": driftAt(active) } as CSSProperties}>
            <Image src={SKYLINE} alt="" width={854} height={360} sizes="560px" className={styles.skylineImg} />
          </div>
        </div>
        <span className={styles.ground} aria-hidden="true" />
        {/* The device sits in a box of its own width: its bezel is a % padding, which the
            browser takes from the parent's width, so the parent must be the phone's width. */}
        <div className={styles.viewerPhone}>
          <PhoneFrame src={DEVICE_SRC} alt="" sizes={PHONE_SIZES}>
            <div className={styles.layers}>
              {steps.map((step, i) => {
                const on = i === active;
                return (
                  <div
                    key={step.image}
                    className={styles.stepLayer}
                    data-on={on}
                    style={{ "--side": i < active ? -1 : i > active ? 1 : 0 } as CSSProperties}
                    aria-hidden={!on}
                  >
                    <PhoneScreen src={step.image} alt={step.alt} sizes={PHONE_SIZES} screenRatio={SCREEN_RATIO} />
                  </div>
                );
              })}
            </div>
          </PhoneFrame>
        </div>
      </figure>
    </div>
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
        // The scroll story is desktop-only (the list is hidden below it): no active state there.
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

  return (
    <section id="menu" className={`section ${styles.root}`}>
      <div className="wrap">
        <SectionHead
          eyebrow={menuChapter.eyebrow}
          titleLead={menuChapter.titleLead}
          titleAccent={menuChapter.titleAccent}
          lead={menuChapter.lead}
          words
        />

        {/* Desktop: one phone that stays put while the story scrolls past it. */}
        <div className={styles.story}>
          <div className={styles.stageCol}>
            <div className={styles.stage}>
              <div className={styles.arch} aria-hidden="true">
                <motion.div className={styles.skyline} style={{ x: reduce ? driftAt(1) : drift }}>
                  <Image src={SKYLINE} alt="" width={854} height={360} sizes="800px" className={styles.skylineImg} />
                </motion.div>
              </div>
              <span className={styles.ground} aria-hidden="true" />

              <div className={styles.stagePhone}>
                <PhoneFrame src={DEVICE_SRC} alt="" sizes="300px">
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
                          <PhoneScreen src={step.image} alt={step.alt} sizes="300px" screenRatio={SCREEN_RATIO} />
                        </motion.div>
                      );
                    })}
                  </div>
                </PhoneFrame>
              </div>
            </div>
          </div>

          <div className={styles.stepsCol}>
            <span className={styles.rail} aria-hidden="true">
              <motion.span className={styles.railFill} style={{ scaleY: reduce ? 1 : scrollYProgress }} />
            </span>

            <ol className={styles.steps} ref={listRef}>
              {steps.map((step, i) => (
                <li key={step.n} className={`${styles.step} ${i === active ? styles.isActive : ""}`}>
                  <Reveal className={styles.stepBody}>
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
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Phones and tablets: one phone and a three-step stepper, instead of three phones. */}
        <Reveal className={styles.stepperWrap}>
          <MenuStepper reduce={reduce} />
        </Reveal>
      </div>
    </section>
  );
}
