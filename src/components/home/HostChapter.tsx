"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import HostArt from "@/components/ui/HostArt";
import PhoneFrame from "@/components/ui/PhoneFrame";
import SectionHead from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { hero, hostChapter, hostScreens } from "@/content/site";
import styles from "./HostChapter.module.css";

/*
 * Chapter II — Knomi Host, the character.
 * 1. He leans on the sill of a lamp-lit arch, chin on his hand, and says hello
 *    in his own handwriting.
 * 2. "Host at work": the six real KNOMI menu screens he lives in. On desktop the
 *    reel is pinned and glides sideways as the reader scrolls; elsewhere (and with
 *    reduced motion) it is a swipeable, snapping row.
 */

const { dressed } = hostChapter;
const HOST_NAME = hero.hostBubble.name;
const SCREENS = hostScreens;
const TOTAL = SCREENS.length;

/* His greeting, as on the menu's first screen: "Hey there!" set large, the question below. */
const GREETING = (SCREENS.find((s) => s.id === "greet") ?? SCREENS[0]).line;
const [HELLO, ASK] = (() => {
  const m = GREETING.match(/^(.+?[!?.])\s+(.+)$/);
  return m ? [m[1], m[2]] : [GREETING, ""];
})();
const HELLO_WORDS = HELLO.split(" ");
const ASK_WORDS = ASK ? ASK.split(" ") : [];

const SKYLINE = "/images/illustrations/skyline-cafe.webp";

/* ---------- Media preferences (hydration-safe: the server value renders first) ---------- */

/** Desktop and tall enough for the pinned reel. Keep in sync with the CSS media query. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeTo(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}
const subscribePin = subscribeTo(PIN_QUERY);
const subscribeReduced = subscribeTo(REDUCED_QUERY);
const getServerFalse = () => false;

function usePinned() {
  return useSyncExternalStore(subscribePin, () => window.matchMedia(PIN_QUERY).matches, getServerFalse);
}

function useReduced() {
  return useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED_QUERY).matches, getServerFalse);
}

/* ---------- Line drawings (decorative) ---------- */

/* A brass street lantern, like the one hanging over the KNOMI menu. */
function Lantern() {
  return (
    <svg viewBox="0 0 40 104" fill="none" aria-hidden="true">
      <path d="M20 0v40" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="42.6" r="2.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 54.5 20 45.4l9 9.1Z" fill="currentColor" />
      <path d="M9.5 54.5h21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12.6 56.2h14.8l-2.2 23.4h-10.4Z" className={styles.lanternGlass} />
      <path
        d="M12.6 56.2h14.8l-2.2 23.4h-10.4ZM20 56.2v23.4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M13.4 79.6h13.2l-2 4.6h-9.2Z" fill="currentColor" />
      <circle cx="20" cy="87.2" r="1.8" fill="currentColor" />
    </svg>
  );
}

/* The little "excited" strokes drawn around him in the product. */
function Ticks() {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path
        d="M21.5 10.6 26.8 5.6M18.4 7.8 19.6 1.6M23.6 15.2l5.6-1.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 22" aria-hidden="true">
      <path
        d="M12 20.4S2.2 14.6 2.2 7.9C2.2 4.7 4.6 2.4 7.4 2.4c2 0 3.6 1.1 4.6 2.8 1-1.7 2.6-2.8 4.6-2.8 2.8 0 5.2 2.3 5.2 5.5 0 6.7-9.8 12.5-9.8 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Bubble tail: filled in paper so it covers the bubble's edge, outlined on its two curves only. */
const TAIL_PATH = "M7 0C7 8 5.4 14.6 1.4 20.4 9.4 17.8 15.6 10.6 19 0";

function Tail() {
  return (
    <svg className={styles.tail} viewBox="0 0 20 21" aria-hidden="true">
      <path d={`${TAIL_PATH}Z`} className={styles.tailFill} />
      <path d={TAIL_PATH} className={styles.tailLine} />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <path
        d="M1 6h21M17 1.5 22 6l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One word of his greeting; `n` is its place in the sentence, for the CSS stagger. */
function Word({ text, n }: { text: string; n: number }) {
  return (
    <>
      <span className={styles.word} style={{ "--w": n } as CSSProperties}>
        {text}
      </span>{" "}
    </>
  );
}

/* ---------- 1. Host in his niche ---------- */

/*
 * The entrance is CSS (HostChapter.module.css, "Entrance"), driven by the shared reveal
 * script: everything renders visible, and only while that script is live does the niche
 * wait unseen. Two cues: the niche itself ([data-in] as it nears the screen) brings in
 * the alcove and its lamp; the cue near the sill brings Host up to lean on it and say
 * hello, so he rises where he can be seen rather than below the fold.
 */
function Niche() {
  const ref = useRef<HTMLDivElement>(null);
  // Idle motion (breathing, the lamp's sway) only runs while he is on screen.
  const awake = useInView(ref, { margin: "0px 0px -8% 0px" });

  return (
    <div
      ref={ref}
      className={styles.niche}
      data-awake={awake}
      data-reveal="watch"
      data-motion-safe=""
      suppressHydrationWarning
    >
      <div className={styles.stage}>
        <span className={styles.cue} data-reveal="watch" aria-hidden="true" suppressHydrationWarning />

        {/* The alcove: back wall, lamplight, a sketch of the town, a brass hairline arch. */}
        <div className={styles.alcove} aria-hidden="true">
          <span className={styles.glow} />
          <span className={styles.skyline}>
            <Image src={SKYLINE} alt="" fill sizes="440px" className={styles.skylineImg} />
          </span>
          <span className={styles.shade} />
          <span className={styles.innerArch} />
          <span className={styles.lamp}>
            <span className={styles.lampSway}>
              <Lantern />
            </span>
          </span>
        </div>

        {/* The sill he leans on (drawn), with his name plate on its face. */}
        <div className={styles.sill} aria-hidden="true">
          <span className={styles.sillTop} />
          <span className={styles.sillFront} />
        </div>
        <p className={styles.plaque} aria-hidden="true">
          <span className={styles.screw} />
          <span className={styles.plaqueName}>{HOST_NAME}</span>
          <span className={styles.screw} />
        </p>

        {/* Host, rising from behind the sill to rest his arms on it. */}
        <div className={styles.figureClip}>
          <span className={styles.contact} aria-hidden="true" />
          <div className={styles.figure}>
            <span className={styles.breathe}>
              <HostArt pose="think" size="100%" className={styles.hostArt} />
            </span>
          </div>
        </div>

        <span className={styles.ticks} aria-hidden="true">
          <Ticks />
        </span>
        <span className={styles.heartSpot} aria-hidden="true">
          <span className={styles.heart}>
            <Heart />
          </span>
        </span>

        {/* What he says, in his handwriting. */}
        <div className={styles.bubbleSpot}>
          <div className={styles.bubble}>
            <Tail />
            <p className={styles.say}>
              <span className="sr-only">{GREETING}</span>
              <span className={styles.sayHello} aria-hidden="true">
                {HELLO_WORDS.map((w, i) => (
                  <Word key={`h${i}`} text={w} n={i} />
                ))}
              </span>
              {ASK_WORDS.length > 0 && (
                <span className={styles.sayAsk} aria-hidden="true">
                  {ASK_WORDS.map((w, i) => (
                    <Word key={`a${i}`} text={w} n={HELLO_WORDS.length + i + 1} />
                  ))}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Host at work: the reel of real menu screens ---------- */

type Geo = {
  /** True while the pinned, scroll-driven reel is active. */
  on: boolean;
  /** How far the track travels sideways (px). */
  dist: number;
  /** Width of the visible window (px). */
  vw: number;
  /** Each slide's centre: along the track (pinned) or the rail's scroll content (swipe). */
  centers: number[];
};

const NO_GEO: Geo = { on: false, dist: 0, vw: 0, centers: [] };

/**
 * The reel's focus, along the track: on the first phone when the pin begins and on
 * the last when it ends, so each phone takes its turn standing upright in the light.
 */
function focusAt(g: Geo, shift: number) {
  const first = g.centers[0] ?? 0;
  const last = g.centers[g.centers.length - 1] ?? first;
  const p = g.dist > 0 ? Math.min(1, Math.max(0, -shift / g.dist)) : 0;
  return first + p * (last - first);
}

function Slide({
  item,
  index,
  geo,
  x,
  setRef,
}: {
  item: (typeof SCREENS)[number];
  index: number;
  geo: MotionValue<Geo>;
  x: MotionValue<number>;
  setRef: (el: HTMLLIElement | null) => void;
}) {
  // -1 … 1: where this phone sits relative to the reel's focus.
  // The reel runs along a shallow arc: phones settle upright at the focus and
  // dip and lean a little away from it. Flat (0) outside the pinned reel.
  // (Every input is read on each run: the function form only tracks values it reads.)
  const n = useTransform(() => {
    const g = geo.get();
    const shift = x.get();
    if (!g.on || !g.vw) return 0;
    const d = (g.centers[index] ?? 0) - focusAt(g, shift);
    return Math.max(-1, Math.min(1, d / (g.vw * 0.62)));
  });
  const rotate = useTransform(n, (t) => t * 2.6);
  const y = useTransform(n, (t) => t * t * 26);
  const scale = useTransform(n, (t) => 1 - Math.abs(t) * 0.05);

  return (
    <motion.li ref={setRef} className={styles.slide} style={{ rotate, y, scale }}>
      {/* Rises in turn with the rest of the reel (data-reveal="group" on the rail). */}
      <figure className={styles.shot} data-reveal-item="" style={{ "--i": index } as CSSProperties}>
        <PhoneFrame
          src={item.src}
          alt={item.alt}
          sizes="(max-width: 1023px) 64vw, 300px"
          className={styles.phone}
        />
        <figcaption className={styles.caption}>
          <span className={styles.verb}>{item.verb}</span>{" "}
          <span className={styles.line}>“{item.line}”</span>
        </figcaption>
      </figure>
    </motion.li>
  );
}

function HostAtWork() {
  const pinned = usePinned();
  const reduce = useReduced();

  const workRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { scrollYProgress } = useScroll({ target: workRef, offset: ["start start", "end end"] });
  const geo = useMotionValue<Geo>(NO_GEO);
  const x = useTransform(() => {
    const g = geo.get();
    const p = scrollYProgress.get();
    return g.on ? -p * g.dist : 0;
  });

  const [active, setActive] = useState(0);

  /** The slide whose centre is nearest `pos` (in the same coordinates as `centers`). */
  const pick = useCallback((pos: number) => {
    const { centers } = geo.get();
    if (!centers.length) return;
    let best = 0;
    let bestD = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(c - pos);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  }, [geo]);

  const syncPinned = useCallback(() => {
    const g = geo.get();
    if (g.on) pick(focusAt(g, x.get()));
  }, [geo, pick, x]);

  const syncRail = useCallback(() => {
    const rail = railRef.current;
    const { on, centers } = geo.get();
    if (!rail || on || !centers.length) return;
    // At rest, slide i sits where slide 0 sits at scroll 0 (centred on phones, at the
    // start edge on wider screens), so the reference point is slide 0's resting place.
    pick(rail.scrollLeft + centers[0]);
  }, [geo, pick]);

  useMotionValueEvent(x, "change", syncPinned);

  // Measure the reel: travel distance, window width and where each phone sits.
  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!vp || !track || !rail) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect();
        const railRect = rail.getBoundingClientRect();
        const centers = slideRefs.current.map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          const mid = (r.left + r.right) / 2;
          return pinned ? mid - trackRect.left : mid - railRect.left + rail.scrollLeft;
        });
        geo.set({
          on: pinned,
          dist: pinned ? Math.max(0, track.offsetWidth - vp.clientWidth) : 0,
          vw: pinned ? vp.clientWidth : rail.clientWidth,
          centers,
        });
        if (pinned) syncPinned();
        else syncRail();
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    ro.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [pinned, geo, syncPinned, syncRail]);

  // Swipe mode: follow the rail's own scroll.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || pinned) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncRail);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
    };
  }, [pinned, syncRail]);

  const goTo = (i: number) => {
    const rail = railRef.current;
    const { centers } = geo.get();
    const c = centers[i];
    if (!rail || c === undefined) return;
    rail.scrollTo({ left: c - centers[0], behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={workRef} className={styles.work}>
      <div className={styles.sticky}>
        <div ref={viewportRef} className={styles.viewport}>
          <motion.div ref={trackRef} className={styles.track} style={{ x }}>
            {/* Visible from the first frame: the pinned stage never scrolls in empty. */}
            <div className={styles.workHead}>
              <div className={styles.peekLedge}>
                <span className={styles.peek}>
                  <HostArt pose="peek" size="100%" decorative />
                </span>
              </div>
              <h3 className={styles.workTitle}>Host at work</h3>
              <p className={styles.workHint} aria-hidden="true">
                <span className={styles.hintPinned}>Keep scrolling</span>
                <span className={styles.hintRail}>Swipe through</span>
                <Arrow />
              </p>
            </div>

            <ol
              ref={railRef}
              className={styles.rail}
              aria-label="Knomi Host in six real KNOMI menu screens"
              // Focusable only when it scrolls itself (swipe mode), so keyboards can move it.
              tabIndex={pinned ? undefined : 0}
              data-reveal="group"
              style={{ "--reveal-stagger": "0.06s" } as CSSProperties}
              suppressHydrationWarning
            >
              {SCREENS.map((item, i) => (
                <Slide
                  key={item.id}
                  item={item}
                  index={i}
                  geo={geo}
                  x={x}
                  setRef={(el) => {
                    slideRefs.current[i] = el;
                  }}
                />
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Pinned reel: where you are, and a thin progress line. */}
        <div className={`wrap ${styles.meter}`} aria-hidden="true">
          <span className={styles.count}>
            <span className={styles.countNow}>{active + 1}</span> of {TOTAL}
          </span>
          <span className={styles.bar}>
            <motion.span className={styles.fill} style={{ scaleX: scrollYProgress }} />
          </span>
        </div>

        {/* Swipe mode: dots. */}
        <div className={styles.dots}>
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={styles.dot}
              aria-label={`Screen ${i + 1} of ${TOTAL}: ${s.verb}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function HostChapter() {
  return (
    <section id="host" className={`section section--alt ${styles.section}`}>
      <div className="wrap">
        <div className={styles.intro}>
          <div className={styles.head}>
            <SectionHead
              eyebrow={hostChapter.eyebrow}
              titleLead={hostChapter.titleLead}
              titleAccent={hostChapter.titleAccent}
              lead={hostChapter.lead}
              breakBeforeAccent
              words
            />
          </div>

          <div className={styles.nicheCol}>
            <Niche />
          </div>

          <Reveal className={styles.dressed} delay={0.15}>
            <p className={styles.dressedText}>
              <span className={styles.dressedTitle}>{dressed.title}.</span> {dressed.body}
            </p>
          </Reveal>
        </div>
      </div>

      <HostAtWork />
    </section>
  );
}
