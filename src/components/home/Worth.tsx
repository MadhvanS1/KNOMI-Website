"use client";

import { useInView } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
} from "react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import HostArt from "@/components/ui/HostArt";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { bookHref, hero, worth } from "@/content/site";
import styles from "./Worth.module.css";

/* ---------------------------------------------------------------------------
   Worth — "What could it be worth?"
   The owner's own sum, worked out live: orders a day × the share that add one
   suggested dish × that dish's price × days open. Left: four numbers, each a
   slider with an editable figure. Right: the sum as an itemised bill, every step
   shown, with Knomi Host leaning on its top edge and a waiter's tally of the
   extra dishes. Below 1024px the bill follows the inputs, and a slim running
   total stays in view while the numbers are changed.

   It is arithmetic on the visitor's inputs, never a forecast or a KNOMI result:
   "Example only" sits on the bill itself, the disclaimer directly under it.
   The first render always equals the defaults (static export, no hydration drift).
   Entrances use the site's reveal system (Reveal / Stagger); Host comes up to the
   bill a beat after it lands. Every reaction to the visitor's numbers is 0.3s or less.
   --------------------------------------------------------------------------- */

const IDS = ["orders", "share", "price", "days"] as const;
type Id = (typeof IDS)[number];
type Values = Record<Id, number>;
type Input = (typeof worth.inputs)[number];

const isId = (id: string): id is Id => (IDS as readonly string[]).includes(id);

/** The inputs in the order site.ts lists them, each tied to its place in the sum. */
const INPUTS = worth.inputs.flatMap((input) => (isId(input.id) ? [{ ...input, id: input.id }] : []));
const DEFAULTS = Object.fromEntries(INPUTS.map((i) => [i.id, i.initial])) as Values;

const inr = new Intl.NumberFormat("en-IN");
const inr1 = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });
const rupees = (n: number) => `₹${inr.format(n)}`;
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
/** A typed figure's whole part ("12.5" → 12); NaN when there is none yet. */
const wholeOf = (raw: string | null) => (raw ? parseInt(raw, 10) : NaN);

/* ---------- The sum (whole-number maths, so the bill always adds up) ---------- */

type Sum = {
  /** Extra dishes a day × 100: orders × share% is exact in hundredths. */
  hundredths: number;
  month: number;
  year: number;
};

function work(v: Values): Sum {
  const hundredths = v.orders * v.share;
  // Money comes from the exact count, rounded once, to the rupee.
  const month = Math.round((hundredths * v.price * v.days) / 100);
  // The year is the month on the bill × 12, so an owner can check it.
  return { hundredths, month, year: month * 12 };
}

/** 26 → "26"; 2.6 → "2.6"; 2.55 → "≈2.6" (the bill never hides a rounding). */
function dishesText(hundredths: number) {
  if (hundredths % 100 === 0) return inr.format(hundredths / 100);
  if (hundredths % 10 === 0) return inr1.format(hundredths / 100);
  return `≈${inr1.format(Math.round(hundredths / 10) / 10)}`;
}

/** "about ₹11.2 lakh" / "about ₹1.3 crore" for big figures; nothing below a lakh. */
function gloss(n: number) {
  const { about, lakh, crore } = worth.bill;
  if (n >= 99.95e5) return `${about} ₹${inr1.format(n / 1e7)} ${crore}`;
  if (n >= 1e5) return `${about} ₹${inr1.format(n / 1e5)} ${lakh}`;
  return "";
}

/** Knomi Host's line, from the live number: whole, fractional, or less than one a day. */
function hostLine(hundredths: number) {
  const h = worth.host;
  if (hundredths % 100 === 0) {
    const n = hundredths / 100;
    return n === 1 ? h.one : h.many.replace("{n}", inr.format(n));
  }
  if (hundredths >= 100) {
    const n = Math.round(hundredths / 100);
    return n === 1 ? h.aboutOne : h.aboutMany.replace("{n}", inr.format(n));
  }
  const every = Math.round(100 / Math.max(1, hundredths));
  return every <= 1 ? h.aboutOne : h.every.replace("{n}", inr.format(every));
}

const liveText = (s: Sum) => worth.live.replace("{month}", rupees(s.month)).replace("{year}", rupees(s.year));

/* ---------- The waiter's tally: one mark per extra dish, in groups of five ---------- */

const TALLY_CAP = 30;
const tallyOf = (hundredths: number) => Math.round(hundredths / 100);

/** Deterministic pseudo-random, so server and client draw identical marks. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Each group: four bars, then the slash. Slightly bowed and uneven, like a pen on a pad. */
const TALLY_GROUPS = Array.from({ length: TALLY_CAP / 5 }, (_, g) => {
  const rnd = seeded(97 + g * 31);
  const j = (spread: number) => +((rnd() - 0.5) * spread).toFixed(2);
  const bars = [4.5, 10, 15.5, 21].map((x) => {
    const x1 = x + j(1.4);
    const y1 = 3 + j(1.8);
    const x2 = x + j(1.8);
    const y2 = 19 + j(1.6);
    return `M${x1} ${y1}Q${+((x1 + x2) / 2 + j(1.6)).toFixed(2)} ${+((y1 + y2) / 2).toFixed(2)} ${x2} ${y2}`;
  });
  const slash = `M${1 + j(1)} ${16 + j(1.6)}Q${13 + j(1.4)} ${11.5 + j(1.4)} ${25.5 + j(1)} ${5.5 + j(1.6)}`;
  return [...bars, slash];
});

function Tally({ hundredths, freshFrom }: { hundredths: number; freshFrom: number }) {
  const count = tallyOf(hundredths);
  const marks = Math.min(count, TALLY_CAP);
  const groups = Math.ceil(marks / 5);
  const extra = count - marks;

  return (
    <span className={styles.tally} aria-hidden="true">
      {TALLY_GROUPS.slice(0, groups).map((strokes, g) => (
        <svg key={g} className={styles.tallyGroup} viewBox="0 0 26 22">
          {strokes.slice(0, Math.min(5, marks - g * 5)).map((d, k) => (
            <path key={k} d={d} pathLength={1} className={styles.mark} data-fresh={g * 5 + k >= freshFrom || undefined} />
          ))}
        </svg>
      ))}
      {extra > 0 && <span className={styles.tallyMore}>{`+${inr.format(extra)}`}</span>}
    </span>
  );
}

/* ---------- One input: label, editable figure, slider ---------- */

function NumberRow({
  input,
  value,
  onChange,
  cueRef,
}: {
  input: Input;
  value: number;
  onChange: (n: number) => void;
  /** Set on the first row: its last line tells the running total when to appear. */
  cueRef?: RefObject<HTMLParagraphElement | null>;
}) {
  const uid = useId();
  const fieldRef = useRef<HTMLInputElement>(null);
  const labelId = `${uid}-label`;
  const fieldId = `${uid}-field`;
  const hintId = `${uid}-hint`;

  // While typing, the field shows exactly what was typed; the sum follows whenever
  // the draft is a usable number. Blur or Enter settles it into range.
  const [draft, setDraft] = useState<string | null>(null);
  // What the figure was when the field took focus, so Escape can put it back.
  const atFocus = useRef(value);

  const { min, max, step, prefix, suffix } = input;
  const sliderMax = Math.min(input.sliderMax, max);
  const onSlider = clamp(value, min, sliderMax);
  const fill = (onSlider - min) / (sliderMax - min);
  const chars = inr.format(max).length;
  const scaleEnd = (n: number) => `${prefix}${inr.format(n)}${suffix === "%" ? "%" : ""}`;

  const settle = (raw: string | null) => {
    setDraft(null);
    const n = wholeOf(raw);
    if (Number.isNaN(n)) return; // empty: keep the last good number
    onChange(clamp(n, min, max));
  };

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    // Whole numbers only. A decimal point stays on screen until the figure settles, so the
    // next keystroke can't turn 12.5 into 125; only the part before it counts.
    const [whole, ...rest] = e.currentTarget.value.replace(/[^\d.]/g, "").split(".");
    const digits = whole.slice(0, 6);
    setDraft(rest.length ? `${digits}.${rest.join("").slice(0, 2)}` : digits);
    if (!digits) return;
    const n = Number(digits);
    // Below the minimum it may still be on its way somewhere (1 → 15 → 150), so wait.
    if (n >= min) onChange(Math.min(n, max));
  };

  const onFieldKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      settle(draft);
    } else if (e.key === "Escape") {
      setDraft(null);
      onChange(atFocus.current);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const typed = wholeOf(draft);
      const base = Number.isNaN(typed) ? value : clamp(typed, min, max);
      setDraft(null);
      onChange(clamp(base + (e.key === "ArrowUp" ? step : -step), min, max));
    }
  };

  return (
    <StaggerItem className={styles.row}>
      <div className={styles.rowHead}>
        <div className={styles.rowText}>
          <label id={labelId} htmlFor={fieldId} className={styles.label}>
            {input.label}
            {input.srUnit && <span className="sr-only">{` (${input.srUnit})`}</span>}
          </label>
          <p id={hintId} className={styles.hint}>
            {input.hint}
          </p>
        </div>

        {/* Pressing anywhere on the frame (the ₹ or the unit) puts the caret in the figure. */}
        <div
          className={styles.field}
          onMouseDown={(e) => {
            if (e.target === fieldRef.current) return;
            e.preventDefault();
            fieldRef.current?.focus();
          }}
        >
          {prefix && (
            <span className={styles.prefix} aria-hidden="true">
              {prefix}
            </span>
          )}
          <input
            ref={fieldRef}
            id={fieldId}
            className={styles.num}
            style={{ "--chars": chars } as CSSProperties}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            enterKeyHint="done"
            spellCheck={false}
            value={draft ?? inr.format(value)}
            onChange={onType}
            onFocus={(e) => {
              atFocus.current = value;
              e.currentTarget.select();
            }}
            onBlur={() => settle(draft)}
            onKeyDown={onFieldKey}
            aria-describedby={hintId}
          />
          {suffix && (
            <span className={styles.suffix} aria-hidden="true">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        className={styles.range}
        style={{ "--fill": fill } as CSSProperties}
        min={min}
        max={sliderMax}
        step={step}
        value={onSlider}
        onChange={(e) => {
          setDraft(null);
          onChange(Number(e.currentTarget.value));
        }}
        aria-labelledby={labelId}
        aria-describedby={hintId}
        aria-valuetext={input.spoken.replace("{v}", inr.format(value))}
      />
      <p ref={cueRef} className={styles.scale} aria-hidden="true">
        <span>{scaleEnd(min)}</span>
        <span>{`${scaleEnd(sliderMax)}${sliderMax < max ? "+" : ""}`}</span>
      </p>
    </StaggerItem>
  );
}

/* ---------- Host's speech bubble tail (the same hand-cut tail as the menu's) ---------- */

function Tail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 20" aria-hidden="true">
      <path d="M1 0h18C14.5 6.5 10.5 12.5 5 19.2 6.2 12 4.6 5.6 1 0Z" className={styles.tailFill} />
      <path d="M19 .6C14.5 6.5 10.5 12.5 5 19.2 6.2 12 4.6 5.6 1 .6" className={styles.tailStroke} />
    </svg>
  );
}

/* ---------- The running total's cue ---------- */

/** True once `ref`'s element sits wholly above the bottom `inset` px of the viewport:
 *  scrolled past the slip's spot, or further up and gone. False while it is still
 *  below that line, and on the server and first render (no layout to read yet). */
function usePassed<T extends Element>(ref: RefObject<T | null>, inset: number) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const floor = entry.rootBounds?.bottom ?? window.innerHeight - inset;
        setPassed(entry.boundingClientRect.bottom <= floor);
      },
      { rootMargin: `0px 0px -${inset}px 0px`, threshold: [0, 1] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref, inset]);

  return passed;
}

/** Room the running total takes at the bottom of the screen (its height and offset). */
const READOUT_ROOM = 96;

/* ---------- Section ---------- */

const SETTLE_MS = 700;
/** The figures roll to a new value in step with the visitor's input, never behind it. */
const ROLL_S = 0.3;

export default function Worth() {
  const [values, setValues] = useState<Values>(DEFAULTS);
  // Tally marks from this index on draw themselves in: the ones added since the numbers last settled.
  const [freshFrom, setFreshFrom] = useState(() => tallyOf(work(DEFAULTS).hundredths));
  // Once the numbers settle: the polite announcement, and a nod from Host.
  const [announcement, setAnnouncement] = useState("");
  const [nods, setNods] = useState(0);
  const settleTimer = useRef<number | undefined>(undefined);
  // The values as last rendered, for handlers and timers that outlive a render.
  const latest = useRef(values);
  useEffect(() => {
    latest.current = values;
  });

  // The running total waits until the first number has scrolled up past its spot (so it
  // never sits on the row being read as the calculator arrives), and steps aside once
  // the bill's own monthly figure is in view.
  const cueRef = useRef<HTMLParagraphElement>(null);
  const firstPassed = usePassed(cueRef, READOUT_ROOM);
  const totalRef = useRef<HTMLParagraphElement>(null);
  const totalInView = useInView(totalRef, { amount: 0.9 });
  const readoutHidden = !firstPassed || totalInView;

  const sum = work(values);
  const { bill } = worth;
  const yearGloss = gloss(sum.year);

  const change = (id: Id, n: number) => {
    if (!Number.isFinite(n) || latest.current[id] === n) return;
    const before = tallyOf(work(latest.current).hundredths);
    setFreshFrom((f) => Math.min(f, before));
    setValues((prev) => ({ ...prev, [id]: n }));
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const settled = work(latest.current);
      setFreshFrom(tallyOf(settled.hundredths));
      setAnnouncement(liveText(settled));
      setNods((k) => k + 1);
    }, SETTLE_MS);
  };

  useEffect(() => {
    const timer = settleTimer;
    return () => window.clearTimeout(timer.current);
  }, []);

  const nod = nods ? String(nods % 2) : undefined;

  return (
    <section id="worth" className={`section ${styles.section}`}>
      <div className={`wrap ${styles.layout}`}>
        <SectionHead
          className={styles.head}
          eyebrow={worth.eyebrow}
          titleLead={worth.titleLead}
          titleAccent={worth.titleAccent}
          lead={worth.lead}
          breakBeforeAccent
        />

        {/* ---------- The owner's numbers ---------- */}
        <div className={styles.inputs}>
          <Stagger className={styles.rows}>
            {INPUTS.map((input, i) => (
              <NumberRow
                key={input.id}
                input={input}
                value={values[input.id]}
                onChange={(n) => change(input.id, n)}
                cueRef={i === 0 ? cueRef : undefined}
              />
            ))}
          </Stagger>

          {/* Phones and tablets: the month stays in sight while the numbers change. */}
          <div className={styles.readout} data-hide={readoutHidden || undefined} aria-hidden="true">
            <span className={styles.readoutLabel}>
              {worth.readout.label}
              <span className={styles.readoutStamp}>{worth.readout.stamp}</span>
            </span>
            <AnimatedNumber value={sum.month} prefix="₹" duration={ROLL_S} className={styles.readoutFig} />
          </div>
        </div>

        {/* ---------- The bill, with Host leaning on it ---------- */}
        <div className={styles.billCol}>
          {/* Its [data-in] (from the reveal script) is also Host's cue to come up to the bill. */}
          <Reveal className={styles.bill}>
            <div className={styles.perch}>
              <span className={styles.host}>
                <span className={styles.nod} data-nod={nod}>
                  <HostArt
                    pose="pay"
                    fit="art"
                    size="100%"
                    decorative
                    sizes="(max-width: 1023px) 45vw, 200px"
                    className={styles.hostArt}
                  />
                </span>
              </span>
              <div className={styles.bubble}>
                <Tail className={styles.tail} />
                <p className={styles.say}>
                  <span className="sr-only">{`${hero.hostBubble.name}: `}</span>
                  <span className={styles.sayLine}>{hostLine(sum.hundredths)}</span>{" "}
                  <span className={styles.sayLine}>{worth.host.close}</span>
                </p>
              </div>
            </div>

            <div className={styles.paper}>
              <div className={styles.receipt}>
                <p className={styles.rHead}>
                  <span>{bill.title}</span>
                  <span className={styles.stamp}>{bill.stamp}</span>
                </p>
                <span className={styles.rDash} aria-hidden="true" />

                <ul className={styles.rLines}>
                  <li className={styles.rItem}>
                    <span className={styles.rLine}>
                      <span className={styles.op} aria-hidden="true" />
                      <span className={styles.rName}>{bill.dishes}</span>
                      <span className="leader" aria-hidden="true" />
                      <span className={styles.rVal}>{dishesText(sum.hundredths)}</span>
                    </span>
                    <span className={styles.rWorking}>
                      {bill.working
                        .replace("{orders}", inr.format(values.orders))
                        .replace("{share}", inr.format(values.share))}
                    </span>
                    <Tally hundredths={sum.hundredths} freshFrom={freshFrom} />
                  </li>
                  <li className={styles.rItem}>
                    <span className={styles.rLine}>
                      <span className={styles.op} aria-hidden="true">
                        ×
                      </span>
                      <span className="sr-only">{`${bill.times} `}</span>
                      <span className={styles.rName}>{bill.price}</span>
                      <span className="leader" aria-hidden="true" />
                      <span className={styles.rVal}>{rupees(values.price)}</span>
                    </span>
                  </li>
                  <li className={styles.rItem}>
                    <span className={styles.rLine}>
                      <span className={styles.op} aria-hidden="true">
                        ×
                      </span>
                      <span className="sr-only">{`${bill.times} `}</span>
                      <span className={styles.rName}>{bill.days}</span>
                      <span className="leader" aria-hidden="true" />
                      <span className={styles.rVal}>{inr.format(values.days)}</span>
                    </span>
                  </li>
                </ul>

                <div className={styles.rTotal}>
                  <p className={styles.rTotalLabel}>
                    <span className={styles.op} aria-hidden="true">
                      =
                    </span>
                    <span className="sr-only">{`${bill.equals} `}</span>
                    {bill.month}
                  </p>
                  <p ref={totalRef} className={styles.rHero}>
                    <AnimatedNumber value={sum.month} prefix="₹" duration={ROLL_S} />
                  </p>
                </div>

                <span className={styles.rDash} aria-hidden="true" />

                <p className={styles.rYear}>
                  <span className={styles.op} aria-hidden="true" />
                  <span className={styles.rName}>{bill.year}</span>
                  <span className="leader" aria-hidden="true" />
                  <AnimatedNumber value={sum.year} prefix="₹" duration={ROLL_S} className={styles.rVal} />
                </p>
                <p className={styles.rGloss}>{yearGloss}</p>

                <p className={styles.rSign}>
                  <span className={`ornament ${styles.rSignStar}`} aria-hidden="true" />
                  {bill.signoff}
                </p>
              </div>
            </div>

            <p className={styles.disclaimer}>{worth.disclaimer}</p>
          </Reveal>
        </div>

        {/* ---------- Next step: the call, where pricing is shared ---------- */}
        <Reveal className={styles.cta}>
          <a href={bookHref} className="btn btn--ink">
            {hero.primaryCta.label}
            <ArrowRight className="btn__arrow" />
          </a>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaNote}>{worth.cta.note}</p>
            <p className={styles.founding}>
              <span className={`ornament ${styles.foundingStar}`} aria-hidden="true" />
              {worth.cta.founding}
            </p>
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}
