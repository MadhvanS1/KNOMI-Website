"use client";

import { Fragment, useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { chapters, manifesto } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import styles from "./Manifesto.module.css";

/* ---------------------------------------------------------------------------
   Manifesto — the statement reads itself as you scroll.
   Each word warms from a faint pencil grey to full ink across the section;
   two phrases are set in italic, like a hand underlining them. Below it, the
   three chapters, as a printed table of contents that also navigates.
   --------------------------------------------------------------------------- */

/** Phrases set in italic, matched word-by-word (punctuation and case ignored). */
const HIGHLIGHTS: string[][] = [
  ["best", "server"],
  ["suggest", "next"],
];

/** Resting opacity of a word that has not been "read" yet. */
// Unread words stay at >= 3:1 against the page (large text), so the line is always legible.
const FLOOR = 0.5;
/** Share of the scroll range each word spends fading in. Overlap gives a soft reading edge. */
const WINDOW = 0.14;

type Token = { core: string; trail: string; accent: boolean };

const normalise = (word: string) => word.toLowerCase().replace(/[^a-z0-9]/g, "");

function tokenise(text: string): Token[] {
  const words = text.split(/\s+/).filter(Boolean);
  const keys = words.map(normalise);
  const accent = words.map(() => false);

  for (const phrase of HIGHLIGHTS) {
    for (let i = 0; i + phrase.length <= keys.length; i++) {
      if (phrase.every((p, j) => keys[i + j] === p)) {
        phrase.forEach((_, j) => {
          accent[i + j] = true;
        });
      }
    }
  }

  return words.map((word, i) => {
    // Keep trailing punctuation out of the italic so "next." reads as <em>next</em>.
    const match = word.match(/^(.*?)([^A-Za-z0-9]*)$/);
    const core = match?.[1] || word;
    const trail = match && match[1] ? match[2] : "";
    return { core, trail, accent: accent[i] };
  });
}

const TOKENS = tokenise(manifesto.text);

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

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [FLOOR, 1]);
  return (
    <motion.span className={styles.word} style={{ opacity }}>
      {children}
    </motion.span>
  );
}

function renderToken(token: Token) {
  if (!token.accent) return token.core + token.trail;
  return (
    <>
      <em>{token.core}</em>
      {token.trail}
    </>
  );
}

export default function Manifesto() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const still = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const count = TOKENS.length;

  return (
    <section id="story" className={`section ${styles.section}`}>
      <div className="wrap">
        <div className={styles.inner}>
          <Reveal as="p" className="eyebrow" y={10}>
            {manifesto.eyebrow}
          </Reveal>

          <h2 ref={textRef} className={styles.statement}>
            <span className="sr-only">{manifesto.text}</span>
            <span aria-hidden="true">
              {TOKENS.map((token, i) => {
                const start = (i / Math.max(1, count - 1)) * (1 - WINDOW);
                const content = renderToken(token);
                return (
                  <Fragment key={i}>
                    {still ? (
                      <span className={styles.word}>{content}</span>
                    ) : (
                      <Word progress={scrollYProgress} range={[start, start + WINDOW]}>
                        {content}
                      </Word>
                    )}
                    {i < count - 1 ? " " : null}
                  </Fragment>
                );
              })}
            </span>
          </h2>

          {/* The chapter index doubles as navigation to the three chapters below. */}
          <nav aria-label="Chapters" className={styles.chaptersNav}>
            <Stagger as="ul" className={styles.chapters}>
              {chapters.map((chapter) => (
                <StaggerItem as="li" key={chapter.numeral} className={styles.item}>
                  <a href={chapter.href} className={`pressable ${styles.chapter}`}>
                    <span className={styles.numeral} aria-hidden="true">
                      {chapter.numeral}
                    </span>
                    <span className={`leader ${styles.leader}`} aria-hidden="true" />
                    <span className={styles.arrow} aria-hidden="true">
                      <ArrowRight className={styles.arrowOut} />
                      <ArrowRight className={styles.arrowIn} />
                    </span>
                    <h3 className={styles.title}>{chapter.title}</h3>
                    <p className={styles.line}>{chapter.line}</p>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </nav>
        </div>
      </div>
    </section>
  );
}
