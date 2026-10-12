"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import styles from "./Reveal.module.css";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealTag = "div" | "section" | "li" | "p" | "span" | "article" | "header" | "ul" | "figure";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the reveal starts once in view. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  as?: RevealTag;
  /** Animate on mount instead of on scroll (use above the fold). */
  immediate?: boolean;
  /** With `immediate`: false keeps the element visible from first paint and only lifts it
   *  (use for the page's largest text, so it counts as painted straight away). */
  fade?: boolean;
};

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Reduced-motion users get the final state (see MotionConfig in layout).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.25,
  as = "div",
  immediate = false,
  fade = true,
}: RevealProps) {
  // Above the fold, the entrance is pure CSS so it plays on first paint,
  // without waiting for JavaScript to hydrate.
  if (immediate) {
    const Plain = as;
    return (
      <Plain
        className={`${fade ? styles.enter : styles.lift} ${className ?? ""}`}
        style={{ "--d": `${delay}s`, "--y": `${y}px` } as CSSProperties}
      >
        {children}
      </Plain>
    );
  }

  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.95, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: RevealTag;
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

/** Parent for a list whose children reveal one after another. Pair with <StaggerItem>. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, amount = 0.2, as = "div" }: StaggerProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}

type TitleTag = "h1" | "h2" | "h3" | "p";

type RevealTitleProps = {
  /** Plain words. */
  lead: string;
  /** Words rendered in the italic serif accent, after `lead`. */
  accent?: string;
  as?: TitleTag;
  className?: string;
  delay?: number;
  immediate?: boolean;
  /** Put the accent on its own line. */
  breakBeforeAccent?: boolean;
};

const wordVariants: Variants = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE_OUT } },
};

/**
 * Headline whose words rise out of a mask one by one, like type being set.
 * Screen readers get the plain sentence; the animated copy is aria-hidden.
 */
export function RevealTitle({
  lead,
  accent,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
  breakBeforeAccent = false,
}: RevealTitleProps) {
  const Tag = as;
  const leadWords = lead.split(" ").filter(Boolean);
  const accentWords = accent ? accent.split(" ").filter(Boolean) : [];
  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  // The space sits outside the clipping span: trailing whitespace inside an
  // inline-block collapses and the words would run together.
  const word = (w: string, i: number, em: boolean) => (
    <Fragment key={`${em ? "a" : "l"}-${i}`}>
      <span className={styles.mask}>
        <motion.span className={styles.word} variants={wordVariants}>
          {em ? <em>{w}</em> : w}
        </motion.span>
      </span>{" "}
    </Fragment>
  );

  if (immediate) {
    let i = 0;
    const cssWord = (w: string, em: boolean) => {
      const index = i++;
      return (
        <Fragment key={`${em ? "a" : "l"}-${index}`}>
          <span className={styles.mask}>
            <span
              className={`${styles.word} ${styles.wordEnter}`}
              style={{ "--d": `${delay + index * 0.055}s` } as CSSProperties}
            >
              {em ? <em>{w}</em> : w}
            </span>
          </span>{" "}
        </Fragment>
      );
    };
    return (
      <Tag className={className}>
        <span className="sr-only">{accent ? `${lead} ${accent}` : lead}</span>
        <span aria-hidden="true" className={styles.line}>
          {leadWords.map((w) => cssWord(w, false))}
          {breakBeforeAccent && accentWords.length > 0 && <br />}
          {accentWords.map((w) => cssWord(w, true))}
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{accent ? `${lead} ${accent}` : lead}</span>
      <motion.span
        aria-hidden="true"
        className={styles.line}
        initial="hidden"
        variants={parent}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        {leadWords.map((w, i) => word(w, i, false))}
        {breakBeforeAccent && accentWords.length > 0 && <br />}
        {accentWords.map((w, i) => word(w, i, true))}
      </motion.span>
    </Tag>
  );
}
