"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { ArrowRight, Plus } from "@/components/ui/Icons";
import { hero, menuChapter, tagline } from "@/content/site";
import styles from "./Hero.module.css";

// copy: micro label beside the scroll cue at the foot of the hero
const SCROLL_LABEL = "Scroll";

/** The tagline, set like an inscription over a doorway. */
const INSCRIPTION = tagline
  .map((line) => line.replace(/\.$/, ""))
  .join("  ·  ")
  .toUpperCase();

const DISH_ALT = menuChapter.steps[1].alt;

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
  const reduce = useReducedMotion();
  // Starts true so the server-rendered hero is never paused before hydration.
  const inView = useInView(heroRef, { initial: true });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Parallax: every layer leaves at its own pace, so the composition separates into depth as you scroll.
  // Reduced motion flattens each range to its start value (always bound, so SSR and client markup match).
  const range = (out: number[]) => (reduce ? out.map(() => out[0]) : out);
  const archY = useTransform(scrollYProgress, [0, 1], range([0, 70]));
  const archScale = useTransform(scrollYProgress, [0, 1], range([1, 1.05]));
  const ringY = useTransform(scrollYProgress, [0, 1], range([0, 40]));
  const phoneY = useTransform(scrollYProgress, [0, 1], range([0, 110]));
  const leftX = useTransform(scrollYProgress, [0, 1], range([0, -44]));
  const leftY = useTransform(scrollYProgress, [0, 1], range([0, 70]));
  const leftRotate = useTransform(scrollYProgress, [0, 1], range([0, -5]));
  const rightX = useTransform(scrollYProgress, [0, 1], range([0, 44]));
  const rightY = useTransform(scrollYProgress, [0, 1], range([0, 50]));
  const rightRotate = useTransform(scrollYProgress, [0, 1], range([0, 5]));
  const bubbleY = useTransform(scrollYProgress, [0, 1], range([0, -130]));
  // The explicit end keyframe matters: scroll-linked acceleration would otherwise ease back to 1.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12, 1], range([1, 0, 0]));

  /** Entrance delay for the CSS keyframes in Hero.module.css. The entrance is CSS
   *  (not framer) so the hero composes itself on first paint, before hydration. */
  const at = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

  return (
    <section id="top" ref={heroRef} className={`${styles.hero} ${inView ? "" : styles.paused}`}>
      <div className={`wrap ${styles.inner}`}>
        {/* ---------- Copy ---------- */}
        <div className={styles.copy}>
          <Reveal immediate delay={0.2} y={14}>
            <p className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</p>
          </Reveal>

          <RevealTitle
            as="h1"
            immediate
            delay={0.3}
            lead={hero.titleLead}
            accent={hero.titleAccent}
            breakBeforeAccent
            className={`display ${styles.title}`}
          />

          <Reveal immediate fade={false} delay={0.6} y={20}>
            <p className={`lead ${styles.lead}`}>{hero.lead}</p>
          </Reveal>

          <Reveal immediate delay={0.75} y={20} className={styles.ctas}>
            <a href={hero.primaryCta.href} className={`btn btn--ink btn--lg ${styles.primary}`}>
              {hero.primaryCta.label}
              <ArrowRight className="btn__arrow" />
            </a>
            <a href={hero.secondaryCta.href} className={`link ${styles.secondary}`}>
              {hero.secondaryCta.label}
              <ArrowDown className={styles.down} />
            </a>
          </Reveal>

          <Reveal immediate delay={0.9} y={14} as="ul" className={styles.proof}>
            {hero.proof.map((item) => (
              <li key={item}>
                <span className={`ornament ${styles.proofStar}`} aria-hidden="true" />
                {item}
              </li>
            ))}
          </Reveal>
        </div>

        {/* ---------- Composition ---------- */}
        <div className={styles.stage}>
          {/* Brass orbit behind the doorway */}
          <motion.div className={styles.ringWrap} style={{ y: ringY }} aria-hidden="true">
            <svg className={`${styles.ring} ${styles.inRing}`} viewBox="0 0 100 100" style={at(0.5)}>
              <circle cx="50" cy="50" r="49.6" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={`ornament ${styles.ringStar} ${styles.inPop}`} style={at(1.4)} />
          </motion.div>

          {/* The arch: a doorway with the tagline inscribed over it */}
          <motion.div
            className={styles.archWrap}
            style={{ y: archY, scale: archScale }}
            aria-hidden="true"
          >
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
          </motion.div>

          {/* Side screens fan out from behind the phone */}
          <motion.div
            className={`${styles.side} ${styles.sideLeft}`}
            style={{ x: leftX, y: leftY, rotate: leftRotate }}
            aria-hidden="true"
          >
            <div className={`${styles.sideInner} ${styles.inSideLeft}`} style={at(0.6)}>
              <PhoneFrame src="/images/menu-preview-dishnav.jpg" alt="" sizes="(max-width: 1023px) 36vw, 210px" />
            </div>
          </motion.div>

          <motion.div
            className={`${styles.side} ${styles.sideRight}`}
            style={{ x: rightX, y: rightY, rotate: rightRotate }}
            aria-hidden="true"
          >
            <div className={`${styles.sideInner} ${styles.inSideRight}`} style={at(0.68)}>
              <PhoneFrame src="/images/menu-preview-orderlist.jpg" alt="" sizes="(max-width: 1023px) 36vw, 210px" />
            </div>
          </motion.div>

          {/* The hero phone */}
          <motion.div className={styles.phone} style={{ y: phoneY }}>
            <div className={styles.inPhone} style={at(0.25)}>
              <PhoneFrame
                src="/images/menu-preview-dishpage.webp"
                alt={DISH_ALT}
                priority
                sizes="(max-width: 1023px) 60vw, 330px"
              />
            </div>
          </motion.div>

          {/* Knomi Host, mid-suggestion */}
          <motion.div className={styles.bubbleWrap} style={{ y: bubbleY }}>
            <div className={`${styles.bubblePop} ${styles.inBubble}`} style={at(1.3)}>
              <div className={styles.float}>
                <div
                  className={styles.bubble}
                  role="img"
                  aria-label={`${hero.hostBubble.name}: ${hero.hostBubble.line}`}
                >
                  <div className={styles.bubbleHead}>
                    <span className={styles.avatar}>K</span>
                    <span className={styles.bubbleName}>{hero.hostBubble.name}</span>
                    <span className={styles.live} />
                  </div>
                  <div className={styles.message}>
                    <span className={`${styles.typing} ${styles.inTypingOut}`} style={at(2.05)}>
                      <span />
                      <span />
                      <span />
                    </span>
                    <div className={styles.inLine} style={at(2.15)}>
                      <p className={styles.bubbleLine}>{hero.hostBubble.line}</p>
                      <span className={styles.add}>
                        <Plus size={12} />
                        {hero.hostBubble.add}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <span
            className={`ornament ${styles.star} ${styles.starFloor} ${styles.inPop}`}
            style={at(1.6)}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ---------- Scroll cue ---------- */}
      <div className={`wrap ${styles.cueRow}`} aria-hidden="true">
        <motion.div className={styles.cue} style={{ opacity: cueOpacity }}>
          <Reveal immediate delay={1.8} y={8}>
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
