"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { ArrowRight, Check, Minus } from "@/components/ui/Icons";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { ownersChapter, pricing, sense } from "@/content/site";
import styles from "./Pricing.module.css";

// copy: small interface labels that are not in site.ts (CTA labels approved in the brief).
const COPY = {
  notIncluded: "Not included",
  ctaRecommended: "Book a walkthrough",
  ctaDefault: "Talk to us",
  planLabel: "Plan",
  totalLabel: "Monthly total",
  perMonth: "/ month",
  tables: "tables",
} as const;

const COMMISSION = ownersChapter.features.find((f) => f.key === "commission")?.title ?? "0% commission";

type Plan = (typeof pricing.plans)[number];

const inr = new Intl.NumberFormat("en-IN");
const isRange = (p: Plan) => p.priceMin !== p.priceMax;
const priceText = (p: Plan) =>
  isRange(p) ? `${inr.format(p.priceMin)}–${inr.format(p.priceMax)}` : inr.format(p.priceMin);

const DEFAULT_PLAN = pricing.plans.find((p) => p.recommended) ?? pricing.plans[0];

const BY_PRICE = [...pricing.plans].sort((a, b) => a.priceMin - b.priceMin);
/** The basic plan: listed clearly, but set quieter than the plans we recommend. */
const BASIC_ID = BY_PRICE[0].recommended ? null : BY_PRICE[0].id;
/** The plan with the whole of Knomi Sense: its card draws the full system. */
const FULL_ID = BY_PRICE[BY_PRICE.length - 1].id;

export default function Pricing() {
  return (
    <section id="pricing" className={`section ${styles.pricing}`}>
      <div className="wrap">
        <div className={styles.headWrap}>
          <Vault />
          <SectionHead
            align="center"
            eyebrow={pricing.eyebrow}
            titleLead={pricing.titleLead}
            titleAccent={pricing.titleAccent}
            lead={pricing.lead}
            className={styles.sectionHead}
          />
        </div>

        <ul className={styles.plans}>
          {pricing.plans.map((plan, i) => (
            <Reveal
              key={plan.id}
              as="li"
              amount={0.15}
              delay={i * 0.12}
              className={`${styles.plan} ${plan.recommended ? styles.planFeatured : ""}`}
            >
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </ul>

        <Reveal y={32} amount={0.2}>
          <Calculator />
        </Reveal>

        <Founding />

        <Reveal y={12} amount={0.8}>
          <p className={styles.footnote}>
            <span className={`ornament ${styles.footOrnament}`} aria-hidden="true" />
            {pricing.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* A hairline vault drawn over the heading: the whole price list sits inside one arch.
   The outer box is observed (a fully clipped element never registers as visible);
   the inner box opens from the keystone outwards. */
const VAULT_CLOSED = "inset(0% 50% 100% 50%)";
const VAULT_OPEN = "inset(0% 0% 0% 0%)";

function Vault() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const gradientId = `vault-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div ref={ref} className={styles.vault} aria-hidden="true">
      <motion.div
        className={styles.vaultInner}
        initial={{ clipPath: VAULT_CLOSED }}
        animate={{ clipPath: inView ? VAULT_OPEN : VAULT_CLOSED }}
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: EASE_OUT }}
      >
        <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMin meet" fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="560" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="currentColor" stopOpacity="1" />
              <stop offset="0.72" stopColor="currentColor" stopOpacity="0.75" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M1 560V500A499 499 0 0 1 999 500V560"
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M19 560V500A481 481 0 0 1 981 500V560"
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
            strokeOpacity="0.55"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className={`ornament ${styles.keystone}`} />
      </motion.div>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const nameId = `${useId()}-name`;
  const featured = Boolean(plan.recommended);
  const basic = plan.id === BASIC_ID;
  const ranged = isRange(plan);
  const excludesId = `${nameId}-excludes`;
  const tone = featured ? `theme-dark ${styles.featured}` : basic ? styles.basic : "";

  return (
    <article className={`${styles.card} ${tone}`} aria-labelledby={nameId}>
      {featured && plan.badge && <p className={styles.badge}>{plan.badge}</p>}

      <div className={styles.head}>
        <span className={styles.course} aria-hidden="true">
          {plan.course}
        </span>
        <h3 id={nameId} className={styles.name}>
          {plan.name}
        </h3>
        <p className={styles.price}>
          <span className={ranged ? styles.amountRange : undefined}>
            <span className={styles.currency}>₹</span>
            {inr.format(plan.priceMin)}
            {ranged && (
              <>
                <span className={styles.dash}>–</span>
                {inr.format(plan.priceMax)}
              </>
            )}
          </span>
        </p>
        <p className={styles.unit}>{pricing.unit}</p>
      </div>

      <div className={styles.body}>
        <p className={styles.summary}>{plan.summary}</p>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.rule} />
          <span className="ornament" />
          <span className={styles.rule} />
        </div>

        <ul className={styles.includes}>
          {plan.includes.map((item) => {
            const inherits = item.startsWith("Everything in");
            return (
              <li key={item} className={inherits ? styles.inherits : undefined}>
                <Check className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>

        {plan.id === FULL_ID && <SenseArch />}

        {plan.excludes.length > 0 && (
          <div className={styles.excludes}>
            <p id={excludesId} className={styles.excludesLabel}>
              {COPY.notIncluded}
            </p>
            <ul aria-labelledby={excludesId}>
              {plan.excludes.map((item: string) => (
                <li key={item}>
                  <Minus className={styles.minusIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.cta}>
          <a href="#book" className={`btn ${basic ? "btn--ghost" : "btn--ink"}`} aria-describedby={nameId}>
            {featured ? COPY.ctaRecommended : COPY.ctaDefault}
            <ArrowRight className="btn__arrow" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   The whole of Knomi Sense, drawn as an arch: every module on one curve, each
   wired to the core at its threshold. Desktop only, where it also balances the
   Ecosystem card against Signature's longer list. Decorative: the list says it.
   --------------------------------------------------------------------------- */

const ARCH = { w: 240, h: 150, cx: 120, cy: 120, r: 94 };
const round = (n: number) => Math.round(n * 100) / 100;
const ARCH_NODES = sense.modules.map((m, i, all) => {
  // Spread from 160° to 20°, so the end nodes stay clear of the threshold.
  const deg = all.length > 1 ? 160 - (i * 140) / (all.length - 1) : 90;
  const a = (deg * Math.PI) / 180;
  return {
    id: m.id,
    label: m.name.replace(/^Knomi\s+/, ""),
    x: round(ARCH.cx + ARCH.r * Math.cos(a)),
    y: round(ARCH.cy - ARCH.r * Math.sin(a)),
  };
});
const STAR = "M0 -7 1.6 -1.6 7 0 1.6 1.6 0 7 -1.6 1.6 -7 0 -1.6 -1.6Z";
const ARCH_OPEN = `circle(140% at 50% ${round((ARCH.cy / ARCH.h) * 100)}%)`;
const ARCH_SHUT = `circle(0% at 50% ${round((ARCH.cy / ARCH.h) * 100)}%)`;

function SenseArch() {
  const reduce = useReducedMotion();
  const still = { duration: 0 };
  const draw: Variants = {
    hidden: { clipPath: ARCH_SHUT },
    show: { clipPath: ARCH_OPEN, transition: reduce ? still : { duration: 1.6, ease: EASE_OUT } },
  };
  const label: Variants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      opacity: 1,
      transition: reduce ? still : { duration: 0.9, ease: EASE_OUT, delay: 0.45 + i * 0.09 },
    }),
  };

  return (
    <motion.div
      className={styles.arch}
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.svg className={styles.archArt} viewBox={`0 0 ${ARCH.w} ${ARCH.h}`} fill="none" variants={draw}>
        <path
          className={styles.archRule}
          d={`M${ARCH.cx - ARCH.r} ${ARCH.cy}A${ARCH.r} ${ARCH.r} 0 0 1 ${ARCH.cx + ARCH.r} ${ARCH.cy}`}
        />
        <path
          className={styles.archInner}
          d={`M${ARCH.cx - ARCH.r * 0.6} ${ARCH.cy}A${ARCH.r * 0.6} ${ARCH.r * 0.6} 0 0 1 ${ARCH.cx + ARCH.r * 0.6} ${ARCH.cy}`}
        />
        <path className={styles.archFloor} d={`M${ARCH.cx - ARCH.r - 12} ${ARCH.cy}H${ARCH.cx + ARCH.r + 12}`} />
        {ARCH_NODES.map((n) => (
          <line key={`ray-${n.id}`} className={styles.archRay} x1={ARCH.cx} y1={ARCH.cy} x2={n.x} y2={n.y} />
        ))}
        {ARCH_NODES.map((n) => (
          <circle key={`node-${n.id}`} className={styles.archNode} cx={n.x} cy={n.y} r="4" />
        ))}
        <circle className={styles.archHalo} cx={ARCH.cx} cy={ARCH.cy} r="13" />
        <path className={styles.archCore} d={STAR} transform={`translate(${ARCH.cx} ${ARCH.cy})`} />
      </motion.svg>

      {ARCH_NODES.map((n, i) => (
        <motion.span
          key={n.id}
          className={styles.archLabel}
          style={{ left: `${(n.x / ARCH.w) * 100}%`, top: `${(n.y / ARCH.h) * 100}%` }}
          variants={label}
          custom={i}
        >
          {n.label}
        </motion.span>
      ))}
      <motion.span
        className={`${styles.archLabel} ${styles.archCoreLabel}`}
        style={{ top: `${(ARCH.cy / ARCH.h) * 100}%` }}
        variants={label}
        custom={ARCH_NODES.length}
      >
        {sense.core.name}
      </motion.span>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Founding partners: a quiet note in a brass frame, a hint rather than an
   offer. The terms are shared on the walkthrough.
   --------------------------------------------------------------------------- */

const FRAME_SHUT = "inset(0% 50% 0% 50% round 28px)";
const FRAME_OPEN = "inset(0% 0% 0% 0% round 28px)";

function Founding() {
  const { eyebrow, title, body, cta } = pricing.founding;
  const titleId = `${useId()}-founding`;
  const reduce = useReducedMotion();
  const still = { duration: 0 };
  // The aside is observed, not the frame: a fully clipped element never counts as in view.
  const frame: Variants = {
    shut: { clipPath: FRAME_SHUT },
    open: { clipPath: FRAME_OPEN, transition: reduce ? still : { duration: 1.5, ease: EASE_OUT, delay: 0.15 } },
  };
  const star: Variants = {
    shut: { rotate: -90, scale: 0.4, opacity: 0 },
    open: { rotate: 0, scale: 1, opacity: 1, transition: reduce ? still : { duration: 1.2, ease: EASE_OUT, delay: 0.5 } },
  };

  return (
    <Reveal y={24} amount={0.4} className={styles.foundingWrap}>
      <motion.aside
        className={styles.founding}
        aria-labelledby={titleId}
        initial="shut"
        whileInView="open"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span className={styles.frame} aria-hidden="true" variants={frame} />

        <span className={styles.seal} aria-hidden="true">
          <motion.span className={`ornament ${styles.sealStar}`} variants={star} />
        </span>

        <div className={styles.foundingHead}>
          <p className={`eyebrow ${styles.foundingEyebrow}`}>{eyebrow}</p>
          <h3 id={titleId} className={styles.foundingTitle}>
            {title}
          </h3>
        </div>

        <div className={styles.foundingSide}>
          <p className={styles.foundingBody}>{body}</p>
          <a href="#book" className={`link ${styles.foundingLink}`}>
            {cta}
            <ArrowRight className={styles.foundingArrow} />
          </a>
        </div>
      </motion.aside>
    </Reveal>
  );
}

function Calculator() {
  const { min, max, initial, label } = pricing.calculator;
  const [tables, setTables] = useState(initial);
  const [planId, setPlanId] = useState(DEFAULT_PLAN.id);
  const radios = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();
  const labelId = `${uid}-label`;
  const planLabelId = `${uid}-plan`;

  const plans = pricing.plans;
  const index = Math.max(
    0,
    plans.findIndex((p) => p.id === planId),
  );
  const plan = plans[index];
  const ranged = isRange(plan);
  const totalMin = tables * plan.priceMin;
  const totalMax = tables * plan.priceMax;
  const frac = (tables - min) / (max - min);

  // Ruler ticks: the largest friendly step that divides the range evenly.
  const span = max - min;
  const tickStep = [5, 4, 2].find((s) => span % s === 0 && span / s <= 20) ?? 1;
  const ticks = span / tickStep;

  // The separator is glued to the line before it so a wrap never starts a line with "·".
  const breakdown = `${tables} ${COPY.tables} × ₹${priceText(plan)} ${pricing.unit} · ${COMMISSION}`;
  const spoken = ranged
    ? `₹${inr.format(totalMin)}–₹${inr.format(totalMax)}`
    : `₹${inr.format(totalMin)}`;

  const select = (next: number) => {
    const n = plans.length;
    const i = (next + n) % n;
    setPlanId(plans[i].id);
    radios.current[i]?.focus();
  };

  const onRadioKey = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        select(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        select(index - 1);
        break;
      case "Home":
        select(0);
        break;
      case "End":
        select(plans.length - 1);
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <div className={styles.calc}>
      <div className={styles.calcInput}>
        <h3 id={labelId} className={styles.calcTitle}>
          {label}
        </h3>

        <p className={styles.count} aria-hidden="true">
          <span className={styles.countNum}>{tables}</span>
          <span className={styles.countWord}>{COPY.tables}</span>
        </p>

        <div className={styles.rangeWrap} style={{ "--frac": frac, "--ticks": ticks } as CSSProperties}>
          <input
            type="range"
            className={styles.range}
            min={min}
            max={max}
            step={1}
            value={tables}
            onChange={(e) => setTables(Number(e.currentTarget.value))}
            aria-labelledby={labelId}
            aria-valuetext={`${tables} ${COPY.tables}`}
          />
          <span className={styles.ruler} aria-hidden="true" />
          <span className={styles.scale} aria-hidden="true">
            <span>{min}</span>
            <span>{max}</span>
          </span>
        </div>

        <div className={styles.pick}>
          <p id={planLabelId} className={styles.pickLabel}>
            {COPY.planLabel}
          </p>
          <div
            role="radiogroup"
            aria-labelledby={planLabelId}
            className={styles.segmented}
            style={{ "--i": index, "--n": plans.length } as CSSProperties}
            onKeyDown={onRadioKey}
          >
            <span className={styles.segThumb} aria-hidden="true" />
            {plans.map((p, i) => {
              const active = p.id === plan.id;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    radios.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  className={styles.segBtn}
                  onClick={() => setPlanId(p.id)}
                >
                  <span className={styles.segName}>{p.name}</span>
                  <span className={styles.segPrice}>₹{priceText(p)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.check}>
        <div className={styles.checkHead} aria-hidden="true">
          <p className={styles.checkLabel}>{COPY.totalLabel}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={plan.id}
              className={styles.checkPlan}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              {plan.name}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className={`${styles.total} ${ranged ? styles.totalRange : ""}`} aria-hidden="true">
          <span className={styles.totalFig}>
            <span className={styles.currency}>₹</span>
            <AnimatedNumber value={totalMin} />
          </span>
          {ranged && (
            <>
              <span className={styles.totalDash}>–</span>
              <span className={styles.totalFig}>
                <span className={styles.currency}>₹</span>
                <AnimatedNumber value={totalMax} />
              </span>
            </>
          )}
          <span className={styles.perMonth}>{COPY.perMonth}</span>
        </p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {`${COPY.totalLabel}: ${spoken} ${COPY.perMonth}`}
        </p>

        <div className={styles.perf} aria-hidden="true" />

        <p className={styles.breakdown}>{breakdown}</p>

        <a href="#book" className={`btn btn--ink ${styles.checkCta}`}>
          {COPY.ctaRecommended}
          <ArrowRight className="btn__arrow" />
        </a>
      </div>
    </div>
  );
}
