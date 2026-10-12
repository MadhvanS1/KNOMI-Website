"use client";

import { useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, usePageInView, useReducedMotion } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Check } from "@/components/ui/Icons";
import Wordmark from "@/components/ui/Wordmark";
import { ownersChapter } from "@/content/site";
import styles from "./OwnersChapter.module.css";

/* ---------------------------------------------------------------------------
   Chapter III — Grow with me. "Everything behind the pass."
   A bento of six tiles, each carrying a small working model of the feature.
   Every model idles while offscreen or in a hidden tab, and holds a finished
   still frame for visitors who prefer reduced motion.
   --------------------------------------------------------------------------- */

// copy: illustrative labels inside the mock interfaces below (UI furniture, not claims)
const KDS_COPY = {
  live: "Live",
  service: "Dinner service",
  lanes: ["New", "Preparing", "Ready"],
  table: "Table",
  now: "Now",
  min: "min",
  item: "item",
  items: "items",
} as const;
// copy: node label in the POS diagram (the KNOMI node uses the wordmark)
const POS_LABEL = "Your POS";
// copy: the review prompt a guest sees inside the menu
const REVIEW_COPY = { settled: "Table 7 · Bill settled", lead: "Thanks for dining with us.", action: "Review us on Google" } as const;
// copy: a dish row in the menu editor, with its neighbours
const UPDATE_COPY = {
  dish: "Tiramisu",
  price: "₹380",
  on: "Available",
  off: "Sold out",
  before: { dish: "Panna cotta", price: "₹320" },
  after: { dish: "Affogato", price: "₹260" },
} as const;
// copy: Knomi Sense legend
const SENSE_COPY = { looked: "Looked at", ordered: "Ordered" } as const;

/* ---------- Shared: run only while it can be seen ---------- */

/* Each run is capped at five seconds and then holds its last frame (WCAG 2.2.2:
   moving content must stop on its own or be pausable). Scrolling a tile back
   into view gives it a fresh run. */
const LIVE_BUDGET_MS = 5000;

function useLive<T extends Element>(amount = 0.35) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount });
  const pageVisible = usePageInView();
  const reduced = useReducedMotion();
  const [spent, setSpent] = useState(false);
  // Coming back into view earns a fresh run (React's "adjust state on change" pattern).
  const [prevInView, setPrevInView] = useState(inView);
  if (inView !== prevInView) {
    setPrevInView(inView);
    if (inView) setSpent(false);
  }
  const active = inView && pageVisible && !reduced;

  useEffect(() => {
    if (!active || spent) return;
    const id = window.setTimeout(() => setSpent(true), LIVE_BUDGET_MS);
    return () => window.clearTimeout(id);
  }, [active, spent]);

  return { ref, live: active && !spent };
}

/* ---------- Line icons (1.5px, currentColor) ---------- */

function TerminalIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 7V3.75h9V7" />
      <path d="M11.5 5.5h5" />
      <rect x="6" y="7" width="16" height="17.5" rx="2.75" />
      <rect x="9" y="10" width="10" height="4.5" rx="1" />
      <path d="M10.25 18.25h.01M14 18.25h.01M17.75 18.25h.01M10.25 21.25h.01M14 21.25h.01M17.75 21.25h.01" strokeWidth="2" />
    </svg>
  );
}

function MenuArchIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 24.5V11.5a7 7 0 0 1 14 0v13Z" />
      <path d="M10.75 18.5h6.5M10.75 21.25h4" />
      <path d="M14 8.9l.75 1.85 1.85.75-1.85.75L14 14.1l-.75-1.85-1.85-.75 1.85-.75Z" fill="currentColor" strokeWidth="1" />
    </svg>
  );
}


/* ===========================================================================
   I. Kitchen display — tickets arrive, cook and leave in a gentle cascade.
   =========================================================================== */

type Stage = 0 | 1 | 2;
type Ticket = { id: number; stage: Stage; born: number };
type Board = { tickets: Ticket[]; next: number; tick: number };
type BoardStep = "serve" | "fire" | "start" | "arrive";
type Order = { table: number; dishes: [number, string][]; note?: string };

// copy: illustrative tickets (table, dishes, preference notes)
const ORDERS: Order[] = [
  { table: 4, dishes: [[1, "Margherita"], [1, "Garlic bread"]], note: "Extra spicy" },
  { table: 7, dishes: [[1, "Burrata"], [1, "Pesto pizza"], [1, "Cold coffee"]] },
  { table: 12, dishes: [[1, "Tiramisu"]], note: "Less sugar" },
  { table: 2, dishes: [[2, "Arrabbiata"]], note: "No onion" },
  { table: 9, dishes: [[2, "Truffle fries"], [1, "Affogato"]] },
  { table: 15, dishes: [[1, "Cold coffee"]] },
  { table: 6, dishes: [[1, "Pesto pizza"], [1, "Tiramisu"]] },
  { table: 11, dishes: [[2, "Margherita"], [1, "Garlic bread"]] },
  { table: 3, dishes: [[1, "Burrata"]], note: "No onion" },
  { table: 8, dishes: [[1, "Bruschetta"], [1, "Truffle fries"]] },
];

const LANE_CAP = 3;
const KDS_CYCLE_MS = 2200;
/** One cycle, as a cascade: the oldest ready ticket is served, then everything shuffles right, then a new order lands. */
const KDS_SEQUENCE: [BoardStep, number][] = [
  ["serve", 0],
  ["fire", 240],
  ["start", 480],
  ["arrive", 880],
];

const INITIAL_BOARD: Board = {
  tickets: [
    { id: 0, stage: 2, born: 0 },
    { id: 1, stage: 2, born: 1 },
    { id: 2, stage: 2, born: 2 },
    { id: 3, stage: 1, born: 3 },
    { id: 4, stage: 1, born: 4 },
    { id: 5, stage: 1, born: 5 },
    { id: 6, stage: 0, born: 6 },
    { id: 7, stage: 0, born: 7 },
    { id: 8, stage: 0, born: 8 },
  ],
  next: 9,
  tick: 8,
};

/* Tickets stay in arrival order, so the first one in a lane is always the oldest. */
const inLane = (tickets: Ticket[], stage: Stage) => tickets.filter((t) => t.stage === stage);

function promote(board: Board, from: 0 | 1): Board {
  const lane = inLane(board.tickets, from);
  if (lane.length < LANE_CAP) return board;
  const id = lane[0].id;
  const to: Stage = from === 0 ? 1 : 2;
  return { ...board, tickets: board.tickets.map((t) => (t.id === id ? { ...t, stage: to } : t)) };
}

function boardReducer(board: Board, step: BoardStep): Board {
  switch (step) {
    case "serve": {
      const ready = inLane(board.tickets, 2);
      if (ready.length < LANE_CAP) return board;
      return { ...board, tickets: board.tickets.filter((t) => t.id !== ready[0].id) };
    }
    case "fire":
      return promote(board, 1);
    case "start":
      return promote(board, 0);
    case "arrive": {
      const tick = board.tick + 1;
      return {
        tickets: [...board.tickets, { id: board.next, stage: 0, born: tick }],
        next: board.next + 1,
        tick,
      };
    }
  }
}

function KdsTicket({ ticket, row, tick }: { ticket: Ticket; row: number; tick: number }) {
  const order = ORDERS[ticket.id % ORDERS.length];
  const items = order.dishes.reduce((sum, [qty]) => sum + qty, 0);
  const minutes = (tick - ticket.born) * 2;

  return (
    <motion.div
      layout
      className={styles.ticket}
      data-stage={ticket.stage}
      style={{ gridColumn: ticket.stage + 1, gridRow: row + 2 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 18, transition: { duration: 0.45, ease: EASE_OUT } }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
    >
      <span className={styles.ticketHead}>
        <span className={styles.ticketTable}>
          {KDS_COPY.table} {order.table}
        </span>
        <span className={styles.ticketTime}>
          {ticket.stage === 2 && <Check size={11} className={styles.ticketCheck} />}
          {minutes === 0 ? KDS_COPY.now : `${minutes} ${KDS_COPY.min}`}
        </span>
      </span>
      <span className={styles.ticketCount}>
        {items} {items === 1 ? KDS_COPY.item : KDS_COPY.items}
      </span>
      <span className={styles.ticketDishes}>
        {order.dishes.map(([qty, dish]) => (
          <span key={dish} className={styles.ticketDish}>
            <span className={styles.ticketQty}>{qty}</span>
            {dish}
          </span>
        ))}
        {order.note && <span className={styles.ticketNote}>{order.note}</span>}
      </span>
    </motion.div>
  );
}

function KdsVisual() {
  const { ref, live } = useLive<HTMLDivElement>(0.3);
  const [board, dispatch] = useReducer(boardReducer, INITIAL_BOARD);

  useEffect(() => {
    if (!live) return;
    let steps: number[] = [];
    const cycle = window.setInterval(() => {
      steps = KDS_SEQUENCE.map(([step, at]) => window.setTimeout(() => dispatch(step), at));
    }, KDS_CYCLE_MS);
    return () => {
      window.clearInterval(cycle);
      steps.forEach((id) => window.clearTimeout(id));
    };
  }, [live]);

  const rows = new Map<number, number>();
  const counts = [0, 0, 0];
  for (const t of board.tickets) rows.set(t.id, counts[t.stage]++);

  return (
    <div ref={ref} className={`theme-dark ${styles.kds}`} data-live={live || undefined}>
      <div className={styles.kdsBar}>
        <span className={styles.kdsLive}>
          <span className={styles.pulse} />
          {KDS_COPY.live}
        </span>
        <span>{KDS_COPY.service}</span>
      </div>

      <div className={styles.board}>
        {KDS_COPY.lanes.map((lane, i) => (
          <span key={`lane-${lane}`} className={styles.lane} data-stage={i} />
        ))}
        {KDS_COPY.lanes.map((lane, i) => (
          <span key={`head-${lane}`} className={styles.laneHead} data-stage={i}>
            <span className={styles.lanePill}>
              <span className={styles.laneDot} />
              {lane}
            </span>
            <span className={styles.laneCount}>{counts[i]}</span>
          </span>
        ))}
        <AnimatePresence initial={false}>
          {board.tickets.map((t) => (
            <KdsTicket key={t.id} ticket={t} row={rows.get(t.id) ?? 0} tick={board.tick} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===========================================================================
   II. Alongside your POS — two doorways, one quiet line between them.
   =========================================================================== */

function PosVisual() {
  const { ref, live } = useLive<HTMLDivElement>();

  return (
    <div ref={ref} className={`${styles.stage} ${styles.pos}`} data-live={live || undefined}>
      <div className={styles.posRow}>
        <div className={`${styles.node} ${styles.nodeStart}`}>
          <span className={`${styles.nodeArch} ${styles.nodePos}`}>
            <TerminalIcon />
          </span>
          <span className={styles.nodeLabel}>{POS_LABEL}</span>
        </div>

        <div className={styles.wire}>
          <span className={styles.wireLine} />
          <span className={`${styles.runner} ${styles.runnerOut}`}>
            <span className={styles.runnerDot} />
          </span>
          <span className={`${styles.runner} ${styles.runnerIn}`}>
            <span className={styles.runnerDot} />
          </span>
        </div>

        <div className={`${styles.node} ${styles.nodeEnd}`}>
          <span className={`theme-dark ${styles.nodeArch} ${styles.nodeKnomi}`}>
            <MenuArchIcon />
          </span>
          <span className={styles.nodeLabel}>
            <Wordmark className={styles.nodeMark} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   III. Google reviews — the bill is settled, then the gentle ask. The prompt
   never depends on a rating: every guest sees the same invitation.
   =========================================================================== */

/* Steps: 0 = bill settled, 1 = the ask (also the resting frame). ms to wait before moving on. */
const REVIEW_HOLD = [1200, 2800];
const REVIEW_ASK = 1;

function ReviewsVisual() {
  const { ref, live } = useLive<HTMLDivElement>();
  const [step, setStep] = useState(REVIEW_ASK);

  useEffect(() => {
    if (!live) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % REVIEW_HOLD.length), REVIEW_HOLD[step]);
    return () => window.clearTimeout(id);
  }, [live, step]);

  const asking = step === REVIEW_ASK;

  return (
    <div ref={ref} className={`${styles.stage} ${styles.reviews}`}>
      <div className={styles.receipt}>
        <span className={styles.receiptCheck}>
          <Check size={12} />
        </span>
        {REVIEW_COPY.settled}
      </div>

      <motion.div
        className={`theme-dark ${styles.bubble}`}
        initial={false}
        animate={asking ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: asking ? 0.7 : 0.35, ease: EASE_OUT }}
      >
        <span className={styles.bubbleLead}>{REVIEW_COPY.lead}</span>
        <span className={styles.bubbleAction}>
          {REVIEW_COPY.action}
          <ArrowUpRight size={12} />
        </span>
      </motion.div>
    </div>
  );
}

/* ===========================================================================
   IV. 0% commission — a figure, a seal, nothing else.
   =========================================================================== */

function CommissionVisual() {
  const { ref, live } = useLive<HTMLDivElement>();

  return (
    <div ref={ref} className={styles.zero} data-live={live || undefined}>
      <span className={styles.zeroFigure}>
        <span className={styles.zeroDigit}>
          <span className={styles.ring} />
          <span className={styles.orbit}>
            <span className={`ornament ${styles.orbitStar}`} />
          </span>
          0
        </span>
        <span className={styles.zeroPct}>%</span>
      </span>
    </div>
  );
}

/* ===========================================================================
   V. Menu updates — Tiramisu goes off and comes back, every table sees it.
   =========================================================================== */

function UpdatesVisual() {
  const { ref, live } = useLive<HTMLDivElement>();
  const [soldOut, setSoldOut] = useState(false);

  useEffect(() => {
    if (!live) return;
    const id = window.setTimeout(() => setSoldOut((v) => !v), soldOut ? 2400 : 3200);
    return () => window.clearTimeout(id);
  }, [live, soldOut]);

  return (
    <div ref={ref} className={`${styles.stage} ${styles.updates}`} data-sold={soldOut || undefined}>
      <div className={styles.menuGhost}>
        <span>{UPDATE_COPY.before.dish}</span>
        <span className="leader" />
        <span>{UPDATE_COPY.before.price}</span>
      </div>

      <div className={styles.menuCard}>
        <div className={styles.menuRow}>
          <span className={styles.menuDish}>
            {UPDATE_COPY.dish}
            <span className={styles.strike} />
          </span>
          <span className="leader" />
          <span className={styles.menuPrice}>{UPDATE_COPY.price}</span>
        </div>
        <div className={styles.menuControl}>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            <span className={styles.statusLabels}>
              <span className={styles.labelOn}>{UPDATE_COPY.on}</span>
              <span className={styles.labelOff}>{UPDATE_COPY.off}</span>
            </span>
          </span>
          <span className={styles.switch}>
            <span className={styles.switchOn} />
            <span className={styles.knob} />
          </span>
        </div>
      </div>

      <div className={styles.menuGhost}>
        <span>{UPDATE_COPY.after.dish}</span>
        <span className="leader" />
        <span>{UPDATE_COPY.after.price}</span>
      </div>
    </div>
  );
}

/* ===========================================================================
   VI. Knomi Sense — what guests linger on versus what they order.
   Bars only: shapes, not figures, so nothing reads as real data.
   =========================================================================== */

type SenseRow = { dish: string; looked: [number, number]; ordered: [number, number]; linger?: boolean };

// copy: illustrative dish names for the Sense bars
const SENSE_ROWS: SenseRow[] = [
  { dish: "Burrata", looked: [0.64, 0.58], ordered: [0.5, 0.44] },
  { dish: "Truffle fries", looked: [0.94, 0.88], ordered: [0.2, 0.27], linger: true },
  { dish: "Tiramisu", looked: [0.52, 0.6], ordered: [0.43, 0.51] },
];

const BAR_KINDS = ["looked", "ordered"] as const;

/** A bar is a clip-path wipe, so its rounded ends never squash. */
const barClip = (v: number) => `inset(0% ${((1 - v) * 100).toFixed(1)}% 0% 0% round 999px)`;

function SenseVisual() {
  const { ref, live } = useLive<HTMLDivElement>(0.4);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<0 | 1>(0);

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), 3600);
    return () => window.clearInterval(id);
  }, [live]);

  return (
    <div ref={ref} className={`${styles.stage} ${styles.sense}`}>
      <div className={styles.senseGrid}>
        {SENSE_ROWS.map((row, i) => (
          <div key={row.dish} className={styles.senseRow} data-linger={row.linger || undefined}>
            <span className={styles.senseDish}>
              {row.dish}
              {row.linger && <span className={`ornament ${styles.senseMark}`} />}
            </span>
            <span className={styles.bars}>
              {BAR_KINDS.map((kind, k) => (
                <span key={kind} className={styles.track}>
                  <motion.span
                    className={`${styles.fill} ${kind === "looked" ? styles.fillLooked : styles.fillOrdered}`}
                    initial={{ clipPath: barClip(0) }}
                    animate={{ clipPath: barClip(seen ? row[kind][phase] : 0) }}
                    transition={reduced ? { duration: 0 } : { duration: 1.1, ease: EASE_OUT, delay: i * 0.09 + k * 0.12 }}
                  />
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.fillLooked}`} />
          {SENSE_COPY.looked}
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.fillOrdered}`} />
          {SENSE_COPY.ordered}
        </span>
      </div>
    </div>
  );
}

/* ===========================================================================
   The bento
   =========================================================================== */

type Feature = (typeof ownersChapter.features)[number];

const TILE_LAYOUT: Record<string, { className: string; delay: number }> = {
  kds: { className: styles.tileKds, delay: 0 },
  pos: { className: styles.tilePos, delay: 0.08 },
  reviews: { className: styles.tileReviews, delay: 0.16 },
  commission: { className: `theme-dark ${styles.tileCommission}`, delay: 0.16 },
  updates: { className: styles.tileUpdates, delay: 0 },
  sense: { className: styles.tileSense, delay: 0.08 },
};

function FeatureVisual({ id }: { id: string }) {
  switch (id) {
    case "kds":
      return <KdsVisual />;
    case "pos":
      return <PosVisual />;
    case "reviews":
      return <ReviewsVisual />;
    case "commission":
      return <CommissionVisual />;
    case "updates":
      return <UpdatesVisual />;
    case "sense":
      return <SenseVisual />;
    default:
      return null;
  }
}

function Tile({ feature, className, delay, children }: { feature: Feature; className: string; delay: number; children: ReactNode }) {
  return (
    <Reveal as="article" className={`${styles.tile} ${className}`} delay={delay} y={32} amount={0.2}>
      <div className={styles.visual} aria-hidden="true">
        {children}
      </div>
      <div className={styles.copy}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{feature.title}</h3>
          {feature.tag && (
            <span className={styles.tag}>
              <span className={`ornament ${styles.tagMark}`} aria-hidden="true" />
              {feature.tag}
            </span>
          )}
        </div>
        <p className={styles.body}>{feature.body}</p>
      </div>
    </Reveal>
  );
}

export default function OwnersChapter() {
  const { numeral, eyebrow, titleLead, titleAccent, lead, features } = ownersChapter;

  return (
    <section id="owners" className={`section ${styles.section}`}>
      <div className="wrap">
        <SectionHead
          numeral={numeral}
          eyebrow={eyebrow}
          titleLead={titleLead}
          titleAccent={titleAccent}
          lead={lead}
          breakBeforeAccent
        />

        <div className={styles.grid}>
          {features.map((feature) => {
            const layout = TILE_LAYOUT[feature.key];
            if (!layout) return null;
            return (
              <Tile key={feature.key} feature={feature} className={layout.className} delay={layout.delay}>
                <FeatureVisual id={feature.key} />
              </Tile>
            );
          })}
        </div>
      </div>
    </section>
  );
}
