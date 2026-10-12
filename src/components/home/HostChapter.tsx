"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import SectionHead from "@/components/ui/SectionHead";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Plus } from "@/components/ui/Icons";
import { hero, hostChapter } from "@/content/site";
import styles from "./HostChapter.module.css";

// copy: illustrative UI labels inside the mock order sheet (not claims)
const TABLE_LABEL = "Table 7";
const SHEET_TITLE = "My order";
const TOTAL_LABEL = "Total";
const DECLINE_LABEL = "No thanks";
// copy: the seal states the goal, never a result (Brain §5). It always sits beside goal + goalNote.
const SEAL_VALUE = "+25%";
const SEAL_RING = "Our goal · average order";

const { demo } = hostChapter;
const HOST_NAME = hero.hostBubble.name;

const inr = new Intl.NumberFormat("en-IN");
const rupees = (n: number) => `₹${inr.format(n)}`;
const BASE_TOTAL = demo.item.price;
const UPSOLD_TOTAL = demo.item.price + demo.suggestion.price;

/*
 * The upsell moment, as a little play in five beats:
 *   idle -> typing (host is "writing") -> suggesting -> added -> settled
 * plus "declined" when the guest says no. Times are ms from the first beat.
 */
type Phase = "idle" | "typing" | "suggesting" | "added" | "settled" | "declined";

const BEAT = { suggest: 700, tap: 1850, accept: 2300, settle: 3100 };
const AUTOPLAY_DELAY = 900;
const REPLAY_DELAY = 350;
const SETTLE_AFTER_ACCEPT = 800;

/* Spring-like overshoot for small pops and the seal landing. */
const EASE_POP: [number, number, number, number] = [0.34, 1.35, 0.64, 1];

/* false on the server and during hydration, true afterwards. Lets reduced-motion
   users get the settled state without a hydration mismatch. */
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* ---------- Icons (1.5px line, currentColor) ---------- */

function PairingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="12" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="12" r="5.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MemoryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.25 3.75h9.5c.55 0 1 .45 1 1v15.1L12 15.9l-5.75 3.95V4.75c0-.55.45-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m12 3.6 2.55 5.2 5.7.83-4.13 4.02.98 5.68L12 16.65l-5.1 2.68.98-5.68L3.75 9.63l5.7-.83L12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M12.6 8a4.6 4.6 0 1 1-1.35-3.25M11.4 2.1v2.8H8.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BEHAVIOUR_ICONS = [PairingIcon, MemoryIcon, ReviewIcon];

/* ---------- The seal ---------- */

/* A gently scalloped rosette, like a brass bottle seal. Built once. */
const SEAL_PATH = (() => {
  const n = 30;
  const cx = 60;
  const inner = 55.5;
  const outer = 60.5;
  const pt = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(2)} ${(cx + r * Math.sin(a)).toFixed(2)}`;
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

function Seal() {
  return (
    <motion.div
      className={styles.seal}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.25, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25, ease: EASE_OUT } }}
      transition={{
        scale: { duration: 0.55, ease: EASE_POP },
        rotate: { duration: 0.6, ease: EASE_OUT },
        opacity: { duration: 0.18 },
      }}
    >
      <motion.span
        className={styles.sealPulse}
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0, scale: 1.55 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
      />
      <svg className={styles.sealSvg} viewBox="0 0 120 120">
        <defs>
          <linearGradient id="knomi-seal-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className={styles.sealStopA} />
            <stop offset="1" className={styles.sealStopB} />
          </linearGradient>
          <path id="knomi-seal-arc" d={`M60 60 m-${RING_R} 0 a${RING_R} ${RING_R} 0 1 1 ${RING_R * 2} 0 a${RING_R} ${RING_R} 0 1 1 -${RING_R * 2} 0`} />
        </defs>
        <path d={SEAL_PATH} fill="url(#knomi-seal-fill)" />
        <circle cx="60" cy="60" r="52" className={styles.sealRing} />
        <circle cx="60" cy="60" r="34" className={styles.sealDash} />
        <text className={styles.sealText}>
          <textPath href="#knomi-seal-arc" textLength={RING_LENGTH} lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <span className={styles.sealValue}>{SEAL_VALUE}</span>
    </motion.div>
  );
}

/* ---------- The interactive upsell demo ---------- */

function UpsellDemo() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const focusReplayNext = useRef(false);

  const [phase, setPhase] = useState<Phase>("idle");
  const [tapping, setTapping] = useState(false);
  const [touched, setTouched] = useState(false);
  // Bumped on replay so the total resets to ₹200 instead of rolling back down.
  const [round, setRound] = useState(0);

  const hydrated = useHydrated();
  const prefersReduced = useReducedMotion();
  const reduce = hydrated && prefersReduced === true;
  const inView = useInView(sheetRef, { once: true, amount: 0.5 });

  // Reduced motion: no autoplay. Show the finished moment until the guest asks to replay it.
  const view: Phase = reduce && !touched ? "settled" : phase;

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const schedule = useCallback(
    (delay: number) => {
      later(delay, () => setPhase("typing"));
      later(delay + BEAT.suggest, () => setPhase("suggesting"));
      later(delay + BEAT.tap, () => setTapping(true));
      later(delay + BEAT.accept, () => {
        const active = document.activeElement;
        if (active && active !== sheetRef.current && sheetRef.current?.contains(active)) focusReplayNext.current = true;
        setTapping(false);
        setPhase("added");
      });
      later(delay + BEAT.settle, () => setPhase("settled"));
    },
    [later],
  );

  // First time the sheet is properly in view, play the moment once.
  useEffect(() => {
    if (!inView || reduce) return;
    schedule(AUTOPLAY_DELAY);
    return clearTimers;
  }, [inView, reduce, schedule, clearTimers]);

  // Never leave a timer running after unmount.
  useEffect(() => clearTimers, [clearTimers]);

  // Keyboard users who answered the host land on Replay, not on <body>.
  useEffect(() => {
    if ((view === "settled" || view === "declined") && focusReplayNext.current) {
      focusReplayNext.current = false;
      replayRef.current?.focus({ preventScroll: true });
    }
  }, [view]);

  const accept = (e: MouseEvent<HTMLButtonElement>) => {
    clearTimers();
    setTapping(false);
    if (e.detail === 0) focusReplayNext.current = true;
    if (reduce) {
      setPhase("settled");
      return;
    }
    setPhase("added");
    later(SETTLE_AFTER_ACCEPT, () => setPhase("settled"));
  };

  // Keyboard and switch users get as long as they need: once focus reaches the
  // host's buttons the scripted tap is cancelled and the question waits.
  const takeOver = () => {
    if (phase !== "suggesting") return;
    clearTimers();
    setTapping(false);
  };

  const decline = (e: MouseEvent<HTMLButtonElement>) => {
    clearTimers();
    setTapping(false);
    if (e.detail === 0) focusReplayNext.current = true;
    setPhase("declined");
  };

  const replay = (e: MouseEvent<HTMLButtonElement>) => {
    clearTimers();
    setTapping(false);
    setTouched(true);
    setRound((r) => r + 1);
    if (e.detail === 0) sheetRef.current?.focus({ preventScroll: true });
    if (reduce) {
      setPhase("suggesting");
      return;
    }
    setPhase("idle");
    if (e.detail === 0) {
      later(REPLAY_DELAY, () => setPhase("typing"));
      later(REPLAY_DELAY + BEAT.suggest, () => setPhase("suggesting"));
      return;
    }
    schedule(REPLAY_DELAY);
  };

  const showHost = view === "typing" || view === "suggesting";
  const ready = view === "suggesting";
  const upsold = view === "added" || view === "settled";
  const total = upsold ? UPSOLD_TOTAL : BASE_TOTAL;
  const canReplay = view === "settled" || view === "declined";

  return (
    <div className={styles.demo}>
      <Reveal y={36} amount={0.3} delay={0.1}>
        <div className={styles.sheetWrap}>
          <span className={styles.arch} aria-hidden="true">
            <span className={`ornament ${styles.archStar}`} />
          </span>
          <span className={styles.glow} aria-hidden="true" />
          <span className={styles.backSheet} aria-hidden="true" />

          <div ref={sheetRef} className={styles.sheet} role="group" aria-label={demo.label} tabIndex={-1}>
            <div className={styles.sheetHead}>
              <span>{demo.label}</span>
              <span className={styles.table}>{TABLE_LABEL}</span>
            </div>
            <div className={styles.rule} aria-hidden="true" />

            <p className={styles.sheetTitle}>{SHEET_TITLE}</p>

            <ul className={styles.lines}>
              <li>
                <div className={styles.line}>
                  <span className={styles.lineName}>{demo.item.name}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className={styles.linePrice}>{rupees(demo.item.price)}</span>
                </div>
              </li>
              <AnimatePresence initial={false}>
                {upsold && (
                  <motion.li
                    key="suggestion"
                    className={styles.lineClip}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.6, ease: EASE_OUT },
                      opacity: { duration: 0.4, delay: 0.08 },
                    }}
                  >
                    <motion.div
                      className={styles.line}
                      initial={{ y: 16 }}
                      animate={{ y: 0 }}
                      exit={{ y: 8 }}
                      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.06 }}
                    >
                      <motion.span
                        className={styles.lineWash}
                        aria-hidden="true"
                        initial={{ scaleX: 0, opacity: 1 }}
                        animate={{ scaleX: 1, opacity: 0 }}
                        transition={{
                          scaleX: { duration: 0.75, delay: 0.15, ease: EASE_OUT },
                          opacity: { duration: 0.9, delay: 1.1, ease: "easeOut" },
                        }}
                      />
                      <span className={styles.lineName}>
                        {demo.suggestion.name}
                        <span className={styles.hostMark} aria-hidden="true">
                          K
                        </span>
                      </span>
                      <span className="leader" aria-hidden="true" />
                      <span className={styles.linePrice}>{rupees(demo.suggestion.price)}</span>
                    </motion.div>
                  </motion.li>
                )}
              </AnimatePresence>
            </ul>

            <AnimatePresence initial={false}>
              {showHost && (
                <motion.div
                  key="host"
                  className={styles.hostClip}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.55, ease: EASE_OUT },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className={styles.host}
                    initial={{ y: 12, scale: 0.96 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: -6, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: EASE_POP }}
                  >
                    <motion.span
                      className={styles.avatar}
                      aria-hidden="true"
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.05, ease: EASE_POP }}
                    >
                      K
                    </motion.span>
                    <div className={styles.hostBody}>
                      <span className={styles.hostName}>{HOST_NAME}</span>
                      <div className={styles.bubble} data-ready={ready}>
                        <span className={styles.dots} aria-hidden="true">
                          <span />
                          <span />
                          <span />
                        </span>
                        <p className={styles.bubbleText}>{demo.bubble}</p>
                      </div>
                      <div className={styles.actions} data-ready={ready} onFocus={takeOver}>
                        <button
                          type="button"
                          className={styles.accept}
                          data-pressing={tapping}
                          onClick={accept}
                        >
                          <Plus size={14} className={styles.acceptIcon} />
                          <span>
                            {demo.accept}
                            <span className={styles.acceptPrice}>
                              {" · "}
                              {rupees(demo.suggestion.price)}
                            </span>
                          </span>
                          <AnimatePresence>
                            {tapping && (
                              <motion.span
                                key="ripple"
                                className={styles.ripple}
                                aria-hidden="true"
                                initial={{ opacity: 0.85, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.4 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: EASE_OUT }}
                              />
                            )}
                          </AnimatePresence>
                          <AnimatePresence>
                            {tapping && (
                              <motion.span
                                key="tap"
                                className={styles.tapDot}
                                aria-hidden="true"
                                initial={{ opacity: 0, scale: 0.4 }}
                                animate={{ opacity: [0, 0.55, 0], scale: [0.4, 1, 1.15] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: EASE_OUT }}
                              />
                            )}
                          </AnimatePresence>
                        </button>
                        <button type="button" className={styles.decline} onClick={decline}>
                          {DECLINE_LABEL}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.total} aria-hidden="true">
              <span className={styles.totalLabel}>{TOTAL_LABEL}</span>
              <span className="leader" />
              <AnimatedNumber key={round} value={total} prefix="₹" duration={0.9} className={styles.totalValue} />
            </div>
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {ready ? `${HOST_NAME}: ${demo.bubble}` : `${TOTAL_LABEL} ${rupees(total)}`}
            </span>
          </div>

          <AnimatePresence>{view === "settled" && <Seal key="seal" />}</AnimatePresence>
        </div>
      </Reveal>

      <div className={styles.controls}>
        <AnimatePresence>
          {canReplay && (
            <motion.div
              key="replay"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: view === "declined" ? 0.35 : 0.55, ease: EASE_OUT }}
            >
              <button
                ref={replayRef}
                type="button"
                className={`btn btn--ghost btn--sm ${styles.replay}`}
                onClick={replay}
              >
                <ReplayIcon />
                {demo.replay}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal className={styles.goal} delay={0.15} amount={0.4} y={20}>
        <p className={styles.goalText}>{hostChapter.goal}</p>
        <p className={styles.goalNote}>
          <span className="ornament" aria-hidden="true" />
          {hostChapter.goalNote}
        </p>
      </Reveal>
    </div>
  );
}

/* ---------- Section ---------- */

export default function HostChapter() {
  return (
    <section id="host" className={styles.section}>
      <div className={`theme-dark ${styles.panel}`}>
        <div className={`wrap ${styles.grid}`}>
          <div className={styles.head}>
            <SectionHead
              numeral={hostChapter.numeral}
              eyebrow={hostChapter.eyebrow}
              titleLead={hostChapter.titleLead}
              titleAccent={hostChapter.titleAccent}
              lead={hostChapter.lead}
            />
          </div>

          <div className={styles.stage}>
            <UpsellDemo />
          </div>

          <Stagger as="ul" className={styles.list} stagger={0.1} amount={0.25}>
            {hostChapter.behaviours.map((b, i) => {
              const Icon = BEHAVIOUR_ICONS[i % BEHAVIOUR_ICONS.length];
              return (
                <StaggerItem as="li" key={b.title} className={styles.item}>
                  <span className={styles.iconArch}>
                    <Icon />
                  </span>
                  <div className={styles.itemText}>
                    <h3 className={styles.itemTitle}>{b.title}</h3>
                    <p className={styles.itemBody}>{b.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
