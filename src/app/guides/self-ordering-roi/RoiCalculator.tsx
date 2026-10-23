"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { ArrowRight } from "@/components/ui/Icons";
import { bookHref } from "@/content/site";
import styles from "./SelfOrderingRoi.module.css";

/* ---------------------------------------------------------------------------
   Self-ordering ROI, worked out as a bill (the homepage calculator's language).
   Left: the owner's seven numbers, each a ruled row with a slider. Right: the
   sum line by line on paper, stamped "Example only", with the fee line under it.
   Below 1024px the bill follows the inputs, and a slim running total stays in
   view while the numbers change.

   Every figure is the owner's own assumption, never a KNOMI result. The lift in
   average order starts at 0% and carries no KNOMI marker or target, so the first
   figure only moves once the owner sets their own assumptions.
   The first render always equals the defaults (static export, no hydration drift).
   --------------------------------------------------------------------------- */

const inr = new Intl.NumberFormat("en-IN");
const rupees = (n: number) => `₹${inr.format(n)}`;

type Id = "tables" | "salary" | "tablesPerWaiter" | "tablesPerServer" | "aov" | "turns" | "lift";
type Values = Record<Id, number>;

type Input = {
  id: Id;
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  /** The figure beside the label. */
  show: (v: number) => string;
  /** Read out with the slider's value. */
  spoken: (v: number) => string;
  /** Under the slider: low end, a note, high end. */
  scale: [string, string, string];
};

const INPUTS: Input[] = [
  {
    id: "tables",
    label: "Number of dining tables",
    min: 6,
    max: 60,
    step: 2,
    initial: 20,
    show: (v) => `${v} tables`,
    spoken: (v) => `${v} tables`,
    scale: ["6 (small cafe)", "20 (casual dining)", "60 (brewery)"],
  },
  {
    id: "salary",
    label: "Waiter monthly cost (salary + meals)",
    min: 14000,
    max: 35000,
    step: 1000,
    initial: 22000,
    show: (v) => rupees(v),
    spoken: (v) => `${rupees(v)} a month`,
    scale: ["₹14,000", "₹22,000", "₹35,000"],
  },
  {
    id: "tablesPerWaiter",
    label: "Current tables per waiter (order-taking)",
    min: 4,
    max: 8,
    step: 1,
    initial: 5,
    show: (v) => `1 per ${v}`,
    spoken: (v) => `1 waiter per ${v} tables`,
    scale: ["4 (high touch)", "5", "8 (stretched)"],
  },
  {
    id: "tablesPerServer",
    // Starts at today's ratio, so no staffing change is assumed until the owner chooses one.
    label: "Tables per server with self-ordering (your assumption)",
    min: 4,
    max: 12,
    step: 1,
    initial: 5,
    show: (v) => `1 per ${v}`,
    spoken: (v) => `1 server per ${v} tables`,
    scale: ["4", "Your call: staffing is a choice", "12"],
  },
  {
    id: "aov",
    label: "Average bill size per table",
    min: 500,
    max: 3500,
    step: 100,
    initial: 1200,
    show: (v) => rupees(v),
    spoken: (v) => rupees(v),
    scale: ["₹500 (quick bites)", "₹1,200 (casual dine)", "₹3,500 (microbrewery)"],
  },
  {
    id: "turns",
    label: "Bills per table per day",
    min: 1,
    max: 6,
    step: 0.5,
    initial: 2.5,
    show: (v) => `${v}`,
    spoken: (v) => `${v} bills a day`,
    scale: ["1", "Use your own POS data", "6"],
  },
  {
    id: "lift",
    label: "Lift in average order (your assumption)",
    min: 0,
    max: 40,
    step: 1,
    initial: 0,
    show: (v) => `+${v}%`,
    spoken: (v) => `${v} percent`,
    scale: ["0% (no change)", "Your own estimate", "40%"],
  },
];

const DEFAULTS = Object.fromEntries(INPUTS.map((i) => [i.id, i.initial])) as Values;

/** The polite read-out waits until the owner stops moving a slider. */
const SETTLE_MS = 700;
/** The total rolls to its new figure in UI time. */
const ROLL_S = 0.3;

function work(v: Values) {
  // Staffing: order-taking ratio today vs the ratio the owner assumes with self-ordering.
  const staffToday = Math.ceil(v.tables / v.tablesPerWaiter);
  const staffAssumed = Math.max(1, Math.ceil(v.tables / v.tablesPerServer));
  const fewer = Math.max(0, staffToday - staffAssumed);
  const staffingMonth = fewer * v.salary;

  // Average order: the owner's assumed lift on their own monthly bills.
  const bills = v.tables * v.turns * 30;
  const extraRevenue = Math.round(bills * v.aov * (v.lift / 100));

  // Combined, before food cost on the extra orders and before KNOMI's fee.
  return { staffToday, staffAssumed, fewer, staffingMonth, bills, extraRevenue, month: staffingMonth + extraRevenue };
}

const liveText = (s: ReturnType<typeof work>) =>
  `Example only: an estimated monthly effect of ${rupees(s.month)}, before food cost on the extra orders and before KNOMI's fee.`;

export default function RoiCalculator() {
  const [values, setValues] = useState<Values>(DEFAULTS);
  const [announcement, setAnnouncement] = useState("");
  const latest = useRef(values);
  const settleTimer = useRef<number | undefined>(undefined);

  const sum = work(values);

  const change = (id: Id, n: number) => {
    if (!Number.isFinite(n) || latest.current[id] === n) return;
    const next = { ...latest.current, [id]: n };
    latest.current = next;
    setValues(next);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => setAnnouncement(liveText(work(latest.current))), SETTLE_MS);
  };

  useEffect(() => {
    const timer = settleTimer;
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <div className={styles.calc} data-float-clear>
      {/* ---------- The owner's numbers ---------- */}
      <div className={styles.inputs}>
        <div className={styles.calcHead}>
          <h2 className={styles.calcHeading}>Your numbers</h2>
          <p className={styles.calcSub}>
            Enter your own numbers and assumptions. Every result is an estimate, not a promise.
          </p>
        </div>

        <div className={styles.rows}>
          {INPUTS.map((input) => {
            const v = values[input.id];
            const fill = (v - input.min) / (input.max - input.min);
            const inputId = `roi-${input.id}`;
            return (
              <div key={input.id} className={styles.row}>
                <div className={styles.rowHead}>
                  <label htmlFor={inputId} className={styles.label}>
                    {input.label}
                  </label>
                  <output htmlFor={inputId} className={styles.figure} aria-hidden="true">
                    {input.show(v)}
                  </output>
                </div>
                <input
                  id={inputId}
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={v}
                  aria-valuetext={input.spoken(v)}
                  onChange={(e) => change(input.id, Number(e.target.value))}
                  className={styles.range}
                  style={{ "--fill": fill } as CSSProperties}
                />
                <div className={styles.scale} aria-hidden="true">
                  {input.scale.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Phones and tablets: the month stays in sight while the numbers change. */}
        <div className={styles.readout} aria-hidden="true">
          <span className={styles.readoutLabel}>
            A month
            <span className={styles.readoutStamp}>Example</span>
          </span>
          <AnimatedNumber value={sum.month} prefix="₹" duration={ROLL_S} className={styles.readoutFig} />
        </div>
      </div>

      {/* ---------- The sum, as a bill ---------- */}
      <div className={styles.billCol}>
        <div className={styles.paper}>
          <div className={styles.receipt}>
            <p className={styles.rHead}>
              <span>Your estimate</span>
              <span className={styles.stamp}>Example only</span>
            </p>
            <span className={styles.rDash} aria-hidden="true" />

            <ul className={styles.rLines}>
              <li className={styles.rItem}>
                <span className={styles.rLine}>
                  <span className={styles.op} aria-hidden="true" />
                  <span className={styles.rName}>Floor staff today</span>
                  <span className="leader" aria-hidden="true" />
                  <span className={styles.rVal}>{sum.staffToday}</span>
                </span>
                <span className={styles.rWorking}>
                  {values.tables} tables, 1 waiter per {values.tablesPerWaiter}
                </span>
              </li>
              <li className={styles.rItem}>
                <span className={styles.rLine}>
                  <span className={styles.op} aria-hidden="true" />
                  <span className={styles.rName}>Floor staff, your ratio</span>
                  <span className="leader" aria-hidden="true" />
                  <span className={styles.rVal}>{sum.staffAssumed}</span>
                </span>
                <span className={styles.rWorking}>
                  {values.tables} tables, 1 server per {values.tablesPerServer}
                </span>
              </li>
              <li className={styles.rItem}>
                <span className={styles.rLine}>
                  <span className={styles.op} aria-hidden="true" />
                  <span className={styles.rName}>Staffing difference</span>
                  <span className="leader" aria-hidden="true" />
                  <span className={styles.rVal}>{rupees(sum.staffingMonth)}</span>
                </span>
                <span className={styles.rWorking}>
                  {sum.fewer > 0
                    ? `${sum.fewer} fewer on the floor × ${rupees(values.salary)}, so ${rupees(sum.staffingMonth * 12)} a year`
                    : "No change at the ratio you assumed"}
                </span>
              </li>
              <li className={styles.rItem}>
                <span className={styles.rLine}>
                  <span className={styles.op} aria-hidden="true">
                    +
                  </span>
                  <span className="sr-only">plus </span>
                  <span className={styles.rName}>Extra revenue at +{values.lift}%</span>
                  <span className="leader" aria-hidden="true" />
                  <span className={styles.rVal}>{rupees(sum.extraRevenue)}</span>
                </span>
                <span className={styles.rWorking}>
                  {inr.format(sum.bills)} bills a month × {rupees(values.aov)} × {values.lift}%
                </span>
              </li>
            </ul>

            <div className={styles.rTotal}>
              <p className={styles.rTotalLabel}>
                <span className={styles.op} aria-hidden="true">
                  =
                </span>
                <span className="sr-only">equals </span>
                Estimated monthly effect
              </p>
              <p className={styles.rHero}>
                <AnimatedNumber value={sum.month} prefix="₹" duration={ROLL_S} />
              </p>
            </div>

            <span className={styles.rDash} aria-hidden="true" />

            <p className={styles.rNote}>Staffing difference + extra revenue, before food cost on the extra orders.</p>
            <p className={styles.rNote}>Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.</p>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Based only on the inputs and assumptions you set. Not a KNOMI result or guarantee.
        </p>

        <a href={bookHref} className={`btn btn--ink ${styles.calcCta}`}>
          Book a walkthrough
          <ArrowRight className="btn__arrow" />
        </a>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
