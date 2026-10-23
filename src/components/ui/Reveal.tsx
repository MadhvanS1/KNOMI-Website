import { Fragment, type CSSProperties, type ReactNode } from "react";
import styles from "./Reveal.module.css";

/* Motion curves for framer-motion. They match the CSS tokens in globals.css. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

/*
 * How reveals work
 * ----------------
 * Everything here renders on the server as plain, visible HTML: no client JavaScript,
 * no framer-motion, no waiting for hydration. REVEAL_SCRIPT (inlined in <head> by
 * layout.tsx) adds `js` to <html> before first paint, watches every [data-reveal]
 * element and sets [data-in] on it as it nears the viewport. The CSS in globals.css
 * (and Reveal.module.css for headline words) hides waiting elements only under
 * html.js and plays the entrance once [data-in] lands. Without JavaScript nothing
 * is hidden; if the observer never reports, a CSS failsafe shows everything by 2.5s.
 */

/** The largest rise any entrance uses, in px: one small, quiet movement site-wide. */
const RISE = 16;

/** Stagger between list items, in seconds. Requests outside this range are clamped. */
const STAGGER_MIN = 0.04;
const STAGGER_MAX = 0.06;

const seconds = (n: number) => `${Math.round(n * 1000) / 1000}s`;

/** Inline custom properties, emitted only when they differ from the CSS defaults. */
function timing(delay: number, rise: number): CSSProperties | undefined {
  const vars: Record<string, string> = {};
  if (delay > 0) vars["--reveal-delay"] = seconds(delay);
  if (rise !== RISE) vars["--reveal-y"] = `${rise}px`;
  return Object.keys(vars).length ? (vars as CSSProperties) : undefined;
}

type RevealTag =
  | "div"
  | "section"
  | "li"
  | "p"
  | "span"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "ul"
  | "ol"
  | "figure"
  | "blockquote";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  /** Seconds before the reveal starts once in view. */
  delay?: number;
  /** Starting vertical offset in px (capped at 16; 0 fades without moving). */
  y?: number;
  /** @deprecated Accepted for older call sites and ignored: every reveal starts just as it enters. */
  amount?: number;
  as?: RevealTag;
  /** Animate on first paint instead of on scroll (use above the fold). Pure CSS. */
  immediate?: boolean;
  /** With `immediate`: false keeps the element visible from first paint and only lifts it
   *  (use for the page's largest text, so it counts as painted straight away). */
  fade?: boolean;
};

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Reduced-motion visitors get a short fade with no movement.
 */
export function Reveal({
  children,
  className,
  id,
  style,
  delay = 0,
  y = RISE,
  as: Tag = "div",
  immediate = false,
  fade = true,
}: RevealProps) {
  const rise = Math.max(0, Math.min(y, RISE));
  const vars = timing(delay, rise);
  const css = vars || style ? { ...vars, ...style } : undefined;

  // Above the fold the entrance is pure CSS, so it plays on first paint.
  if (immediate) {
    const mode = !fade ? "lift" : rise === 0 ? "fade" : "rise";
    return (
      <Tag id={id} className={className} style={css} data-reveal-now={mode}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} style={css} data-reveal={rise === 0 ? "fade" : "rise"} suppressHydrationWarning>
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child (kept within 40-60ms). */
  stagger?: number;
  delay?: number;
  /** @deprecated Accepted and ignored, as on Reveal. */
  amount?: number;
  as?: RevealTag;
};

/** Parent for a list whose children reveal one after another. Pair with <StaggerItem>. */
export function Stagger({ children, className, stagger = 0.05, delay = 0, as: Tag = "div" }: StaggerProps) {
  const step = Math.min(Math.max(stagger, STAGGER_MIN), STAGGER_MAX);
  const vars: Record<string, string> = { "--reveal-stagger": seconds(step) };
  if (delay > 0) vars["--reveal-group-delay"] = seconds(delay);
  return (
    <Tag className={className} style={vars as CSSProperties} data-reveal="group" suppressHydrationWarning>
      {children}
    </Tag>
  );
}

/** One step of a <Stagger>. Its place in the queue comes from its position among its
 *  siblings; pass `index` when items are not siblings of one another. */
export function StaggerItem({
  children,
  className,
  as: Tag = "div",
  index,
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  index?: number;
}) {
  return (
    <Tag
      className={className}
      style={index === undefined ? undefined : ({ "--i": Math.max(0, index) } as CSSProperties)}
      data-reveal-item=""
    >
      {children}
    </Tag>
  );
}

type TitleTag = "h1" | "h2" | "h3" | "p";

type RevealTitleProps = {
  /** Plain words. */
  lead: string;
  /** Words rendered after `lead`, by default in the italic serif accent. */
  accent?: string;
  as?: TitleTag;
  className?: string;
  delay?: number;
  immediate?: boolean;
  /** Put the accent on its own line. */
  breakBeforeAccent?: boolean;
  /** Words rise out of a mask one by one, like type being set. Keep it for the hero
   *  and the three chapter openers; every other headline rises as one quick line. */
  words?: boolean;
  /** "plain" sets the accent words in the headline's own roman ink. */
  accentStyle?: "italic" | "plain";
};

/**
 * A headline that rises into place. By default the whole line rises at once; with
 * `words`, each word rises out of its own mask. In that mode screen readers get the
 * plain sentence and the animated copy is aria-hidden.
 */
export function RevealTitle({
  lead,
  accent,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
  breakBeforeAccent = false,
  words = false,
  accentStyle = "italic",
}: RevealTitleProps) {
  const plain = accentStyle === "plain";

  if (!words) {
    const style = timing(delay, RISE);
    const body = (
      <>
        {lead}
        {accent && (breakBeforeAccent ? <br /> : " ")}
        {accent && (plain ? accent : <em>{accent}</em>)}
      </>
    );
    return immediate ? (
      <Tag className={className} style={style} data-reveal-now="rise">
        {body}
      </Tag>
    ) : (
      <Tag className={className} style={style} data-reveal="rise" suppressHydrationWarning>
        {body}
      </Tag>
    );
  }

  const leadWords = lead.split(" ").filter(Boolean);
  const accentWords = accent ? accent.split(" ").filter(Boolean) : [];
  const style = delay > 0 ? ({ "--title-delay": seconds(delay) } as CSSProperties) : undefined;

  // The space sits outside the clipping span: trailing whitespace inside an
  // inline-block collapses and the words would run together.
  const word = (w: string, index: number, em: boolean) => (
    <Fragment key={index}>
      <span className={styles.mask}>
        <span className={styles.word} style={{ "--i": index } as CSSProperties}>
          {em ? <em>{w}</em> : w}
        </span>
      </span>{" "}
    </Fragment>
  );

  const content = (
    <>
      <span className="sr-only">{accent ? `${lead} ${accent}` : lead}</span>
      <span aria-hidden="true" className={styles.line}>
        {leadWords.map((w, k) => word(w, k, false))}
        {breakBeforeAccent && accentWords.length > 0 && <br />}
        {accentWords.map((w, k) => word(w, leadWords.length + k, !plain))}
      </span>
    </>
  );

  return immediate ? (
    <Tag className={className} style={style} data-reveal-now="words">
      {content}
    </Tag>
  ) : (
    <Tag className={className} style={style} data-reveal="words" suppressHydrationWarning>
      {content}
    </Tag>
  );
}

export { REVEAL_SCRIPT } from "./revealScript";
