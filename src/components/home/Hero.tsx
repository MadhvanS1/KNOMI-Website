"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import HostArt from "@/components/ui/HostArt";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { ArrowRight, Check, Plus } from "@/components/ui/Icons";
import { hero, menuChapter, tagline } from "@/content/site";
import styles from "./Hero.module.css";

// copy: micro label beside the scroll cue at the foot of the hero
const SCROLL_LABEL = "Scroll";
// copy: illustrative mock-UI labels for the one-shot "added to the bill" beat (not claims)
const ADDED_LABEL = "Added";
const SLIP_TABLE = "Table 7";
const SLIP_ITEM = "Garlic bread";

/** The price on Host's add button ("Add · ₹120" → "₹120"), reused on the order slip. */
const ADD_PRICE = hero.hostBubble.add.match(/₹\s?[\d,]+/)?.[0] ?? "";

/** The tagline, set like an inscription over a doorway. */
const INSCRIPTION = tagline
  .map((line) => line.replace(/\.$/, ""))
  .join("  ·  ")
  .toUpperCase();

const DISH_ALT = menuChapter.steps[1].alt;

/** Soft, slightly heavy follow for the pointer depth (no overshoot). */
const POINTER_SPRING = { stiffness: 46, damping: 18, mass: 0.9 };

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
/** Stacked (below 1024px) the proof points sit right under the still-life, so its layers
 *  drift about a third as far as you scroll and never slide over them. */
const STACKED_QUERY = "(max-width: 1023px)";
const STACKED_DEPTH = 0.35;

/**
 * Host's "Add" moment, in seconds from when the stage is about 40% on screen (or from
 * first paint, when it already is). He waits for the screen he perches on to land, then:
 * the bubble opens, his line is written in, the guest taps Add, and the slip lands on the
 * table's order, all done by about 2.4s. Durations live in Hero.module.css.
 */
const MOMENT = {
  perch: 0.5,
  bubble: 0.8,
  write: 0.9,
  nod: 0.95,
  addRow: 1.2,
  tap: 1.62,
  added: 1.7,
  slip: 1.9,
};

/** Scroll progress mapped onto [from, to]. `amount` is 1 normally, STACKED_DEPTH on the
 *  stacked layout and 0 for reduced motion, which flattens the range to `from`. */
function useScrollRange(progress: MotionValue<number>, amount: MotionValue<number>, from: number, to: number) {
  return useTransform([progress, amount], ([s, k]: number[]) => from + (to - from) * s * k);
}

/** A layer's offset: its scroll parallax plus the pointer, scaled by how near the layer sits. */
function useDepth(scroll: MotionValue<number>, pointer: MotionValue<number>, reach: number) {
  return useTransform([scroll, pointer], ([s, p]: number[]) => s + p * reach);
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 2.25v9.5m0 0L3 7.75m4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  // Starts true so the server-rendered hero is never paused before hydration.
  const inView = useInView(heroRef, { initial: true });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // 1 for full motion, STACKED_DEPTH when stacked, 0 for reduced. A motion value (set after
  // mount) rather than render state, so the first render is the same on the server and the client.
  const motionOn = useMotionValue(1);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    const stacked = window.matchMedia(STACKED_QUERY);
    const sync = () => {
      motionOn.set(query.matches ? 0 : stacked.matches ? STACKED_DEPTH : 1);
      if (query.matches) {
        pointerX.set(0);
        pointerY.set(0);
      }
    };
    sync();
    query.addEventListener("change", sync);
    stacked.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      stacked.removeEventListener("change", sync);
    };
  }, [motionOn, pointerX, pointerY]);

  // Parallax: every layer leaves at its own pace, so the composition separates into depth as you scroll.
  const archY = useScrollRange(scrollYProgress, motionOn, 0, 70);
  const archScale = useScrollRange(scrollYProgress, motionOn, 1, 1.05);
  const ringY = useScrollRange(scrollYProgress, motionOn, 0, 40);
  const phoneY = useScrollRange(scrollYProgress, motionOn, 0, 110);
  const leftX = useScrollRange(scrollYProgress, motionOn, 0, -44);
  const leftY = useScrollRange(scrollYProgress, motionOn, 0, 70);
  const leftRotate = useScrollRange(scrollYProgress, motionOn, 0, -5);
  const rightX = useScrollRange(scrollYProgress, motionOn, 0, 44);
  const rightY = useScrollRange(scrollYProgress, motionOn, 0, 50);
  const rightRotate = useScrollRange(scrollYProgress, motionOn, 0, 5);
  // Host's bubble rides with Host (who rides with the menu he leans on), and lifts a little more.
  const bubbleY = useScrollRange(scrollYProgress, motionOn, 0, -36);
  const slipY = useScrollRange(scrollYProgress, motionOn, 0, -84);
  // The explicit end keyframe matters: scroll-linked acceleration would otherwise ease back to 1.
  // (The cue is hidden for reduced motion, so this one needs no flattening.)
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [1, 0, 0]);

  // Pointer depth (desktop mouse only): the still-life drifts a few pixels against the cursor,
  // near layers more than far ones, so the doorway reads as a room with depth.
  const px = useSpring(pointerX, POINTER_SPRING);
  const py = useSpring(pointerY, POINTER_SPRING);
  const zero = useMotionValue(0);
  const ringPX = useDepth(zero, px, -8);
  const ringPY = useDepth(ringY, py, -6);
  const archPX = useDepth(zero, px, -12);
  const archPY = useDepth(archY, py, -8);
  const leftPX = useDepth(leftX, px, -22);
  const leftPY = useDepth(leftY, py, -14);
  const rightPX = useDepth(rightX, px, -22);
  const rightPY = useDepth(rightY, py, -14);
  const phonePX = useDepth(zero, px, -16);
  const phonePY = useDepth(phoneY, py, -10);
  // Relative to Host's group, which already carries the left menu's depth.
  const bubblePX = useDepth(zero, px, -8);
  const bubblePY = useDepth(bubbleY, py, -4);
  const slipPX = useDepth(zero, px, -34);
  const slipPY = useDepth(slipY, py, -20);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (motionOn.get() === 0 || e.pointerType !== "mouse") return;
    pointerX.set(e.clientX / window.innerWidth - 0.5);
    pointerY.set(e.clientY / window.innerHeight - 0.5);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  /** Delay for the CSS keyframes in Hero.module.css. The entrance is CSS (not framer)
   *  so the hero composes itself on first paint, before hydration; Host's moment is CSS
   *  too, started by the reveal script rather than by React. */
  const at = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;
  /** Class list for one beat of Host's moment. */
  const beat = (...names: string[]) => [styles.demo, ...names].join(" ");

  return (
    <section
      id="top"
      ref={heroRef}
      className={`${styles.hero} ${inView ? "" : styles.paused}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={`wrap ${styles.inner}`}>
        {/* ---------- Copy ---------- */}
        <div className={styles.copy}>
          <RevealTitle
            as="h1"
            immediate
            words
            delay={0.1}
            lead={hero.titleLead}
            accent={hero.titleAccent}
            breakBeforeAccent
            className={`display ${styles.title}`}
          />

          <Reveal immediate fade={false} delay={0.25}>
            <p className={`lead ${styles.lead}`}>{hero.lead}</p>
          </Reveal>

          <Reveal immediate delay={0.35} className={styles.ctas}>
            <a href={hero.primaryCta.href} className={`btn btn--ink btn--lg ${styles.primary}`}>
              {hero.primaryCta.label}
              <ArrowRight className="btn__arrow" />
            </a>
            <a href={hero.secondaryCta.href} className={`link pressable ${styles.secondary}`}>
              {hero.secondaryCta.label}
              <ArrowDown className={styles.down} />
            </a>
          </Reveal>
        </div>

        {/* ---------- Composition ---------- */}
        <div className={styles.stage}>
          {/* A point 40% down the stage, watched by the reveal script: once it is on
              screen, Host's moment plays (see "Host's Add moment" in the CSS). */}
          <span className={styles.trigger} data-reveal="watch" aria-hidden="true" suppressHydrationWarning />

          {/* Brass orbit behind the doorway */}
          <motion.div className={styles.ringWrap} style={{ x: ringPX, y: ringPY }} aria-hidden="true">
            <svg className={`${styles.ring} ${styles.inRing}`} viewBox="0 0 100 100" style={at(0.3)}>
              <circle cx="50" cy="50" r="49.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>

          {/* The arch: a doorway with the tagline inscribed over it. It rises from the floor:
              its window slides up while the arch inside holds still. */}
          <motion.div
            className={styles.archWrap}
            style={{ x: archPX, y: archPY, scale: archScale }}
            aria-hidden="true"
          >
            <div className={`${styles.archWindow} ${styles.inArchWindow}`} style={at(0.05)}>
              <div className={`${styles.arch} ${styles.inArch}`} style={at(0.05)}>
                <svg className={styles.inscription} viewBox="0 0 144 206">
                  <defs>
                    <path id="hero-arch-inscription" d="M 8.4 72 A 63.6 63.6 0 0 1 135.6 72" />
                  </defs>
                  <text>
                    <textPath href="#hero-arch-inscription" startOffset="50%" textAnchor="middle">
                      {INSCRIPTION}
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Side screens fan out from behind the phone */}
          <motion.div
            className={`${styles.side} ${styles.sideLeft}`}
            style={{ x: leftPX, y: leftPY, rotate: leftRotate }}
            aria-hidden="true"
          >
            <div className={`${styles.sideInner} ${styles.inSideLeft}`} style={at(0.28)}>
              <PhoneFrame src="/images/menu-preview-dishnav.jpg" alt="" sizes="(max-width: 1023px) 36vw, 210px" />
            </div>
          </motion.div>

          <motion.div
            className={`${styles.side} ${styles.sideRight}`}
            style={{ x: rightPX, y: rightPY, rotate: rightRotate }}
            aria-hidden="true"
          >
            <div className={`${styles.sideInner} ${styles.inSideRight}`} style={at(0.34)}>
              <PhoneFrame src="/images/menu-preview-orderlist.jpg" alt="" sizes="(max-width: 1023px) 36vw, 210px" />
            </div>
          </motion.div>

          {/* The hero phone */}
          <motion.div className={styles.phone} style={{ x: phonePX, y: phonePY }}>
            <div className={styles.inPhone} style={at(0.12)}>
              <PhoneFrame
                src="/images/menu-preview-dishpage.webp"
                alt={DISH_ALT}
                priority
                sizes="(max-width: 1023px) 60vw, 330px"
              />
            </div>
          </motion.div>

          {/* Knomi Host, the chef from the menu, lounges on the top edge of the left menu screen.
              His group shares that screen's box and depth exactly, so he stays on its edge while
              the still-life parallaxes; he sits above the hero phone, so his bubble can reach over it. */}
          <motion.div
            className={`${styles.side} ${styles.sideLeft} ${styles.hostGroup}`}
            style={{ x: leftPX, y: leftPY, rotate: leftRotate }}
          >
            <div className={styles.hostTilt} aria-hidden="true">
              <div className={beat(styles.perch, styles.inPerch)} style={at(MOMENT.perch)}>
                <div className={beat(styles.nod, styles.inNod)} style={at(MOMENT.nod)}>
                  <HostArt
                    pose="lean"
                    fit="art"
                    size="100%"
                    decorative
                    idle
                    sizes="(max-width: 600px) 30vw, (max-width: 1023px) 150px, 160px"
                  />
                </div>
              </div>
            </div>

            {/* What he says, hand-lettered on paper, its tail curling back to him; the guest says yes */}
            <motion.div className={styles.bubbleWrap} style={{ x: bubblePX, y: bubblePY }}>
              <div
                className={beat(styles.bubble, styles.inBubble)}
                style={at(MOMENT.bubble)}
                role="img"
                aria-label={`${hero.hostBubble.name}: ${hero.hostBubble.line}`}
              >
                <svg className={styles.tail} viewBox="0 0 30 26" aria-hidden="true">
                  <path className={styles.tailFill} d="M2 0h24C20 7 12 15 1.5 24.5 6 16 6.5 8 2 0Z" />
                  <path className={styles.tailStroke} d="M26 .8C20 7 12 15 1.5 24.5 6 16 6.5 8 2 .8" />
                </svg>
                <p className={styles.bubbleLine}>
                  {hero.hostBubble.line}
                  {/* Paper drawn off the line, left to right, so it reads as written in */}
                  <span className={styles.inkWindow} aria-hidden="true">
                    <span className={beat(styles.ink, styles.inWrite)} style={at(MOMENT.write)} />
                  </span>
                </p>
                <span className={beat(styles.addRow, styles.inAddRow)} style={at(MOMENT.addRow)}>
                  <span className={beat(styles.add, styles.inTap)} style={at(MOMENT.tap)}>
                    <span className={beat(styles.addFill, styles.inAddedFill)} style={at(MOMENT.added)} />
                    <span
                      className={beat(styles.addLabel, styles.offer, styles.inAddOut)}
                      style={at(MOMENT.added)}
                    >
                      <Plus size={12} />
                      {hero.hostBubble.add}
                    </span>
                    <span className={beat(styles.addLabel, styles.inAddedIn)} style={at(MOMENT.added + 0.03)}>
                      <Check size={12} />
                      {ADDED_LABEL}
                    </span>
                  </span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* The order slip: the pairing lands on the table's bill */}
          <motion.div className={styles.slipWrap} style={{ x: slipPX, y: slipPY }} aria-hidden="true">
            <div className={beat(styles.slip, styles.inSlip)} style={at(MOMENT.slip)}>
              <span className={styles.slipMeta}>
                <span className={styles.slipCheck}>
                  <Check size={10} />
                </span>
                {SLIP_TABLE}
              </span>
              <span className={styles.slipLine}>
                <span className={styles.slipItem}>{SLIP_ITEM}</span>
                <span className={`leader ${styles.slipLeader}`} />
                <span className={styles.slipPrice}>+{ADD_PRICE}</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* ---------- Proof: under the copy on desktop, under the picture on phones ---------- */}
        <Reveal as="ul" className={styles.proof}>
          {hero.proof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Reveal>
      </div>

      {/* ---------- Scroll cue ---------- */}
      <div className={`wrap ${styles.cueRow}`} aria-hidden="true">
        <motion.div style={{ opacity: cueOpacity }}>
          <Reveal immediate delay={1.4} y={8}>
            <span className={styles.cueInner}>
              <span className={styles.cueLine}>
                <span />
              </span>
              <span className={styles.cueLabel}>{SCROLL_LABEL}</span>
            </span>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
