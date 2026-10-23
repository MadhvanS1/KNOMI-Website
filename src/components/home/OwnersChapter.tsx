"use client";

import { useEffect, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView, usePageInView } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import HostArt from "@/components/ui/HostArt";
import { EASE_IN_OUT, EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icons";
import { ownersChapter } from "@/content/site";
import styles from "./OwnersChapter.module.css";

/* ---------------------------------------------------------------------------
   For owners — "Everything behind the pass."
   One picture: Knomi Dash, the live ticket board, set large. Beside it (below
   on phones) the rest of the owner's side as a plain ruled list, with Knomi
   Host peeking over the Pulse check-in. The board and the check-in idle while
   offscreen or in a hidden tab, and hold a finished frame for visitors who
   prefer reduced motion.
   --------------------------------------------------------------------------- */

/** The feature drawn as the section's one picture, and the one Host peeks into. */
const DASH_KEY = "kds";
const PULSE_KEY = "pulse";

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
// copy: the Knomi Pulse check-in a guest answers before the bill, and the alert the manager gets (illustrative)
const PULSE_COPY = {
  question: "How was everything tonight?",
  chips: ["Loved it", "It was fine", "Something wasn’t right"],
  table: "Table 7",
  alert: "Manager notified",
} as const;

/* ---------- Shared: reduced motion, hydration-safe ---------- */

/* The server value (false) is used while hydrating, then the real one straight after.
   framer's useReducedMotion() would read matchMedia during the first client render. */
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

/* ---------- Shared: run only while it can be seen ---------- */

/* Each run is capped at five seconds and then holds its last frame (WCAG 2.2.2:
   moving content must stop on its own or be pausable). Scrolling back into view
   gives it a fresh run. */
const LIVE_BUDGET_MS = 5000;

function useLive<T extends Element>(amount = 0.35) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount });
  const pageVisible = usePageInView();
  const reduced = usePrefersReducedMotion();
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

/* ===========================================================================
   Knomi Dash — tickets arrive, cook and leave in a gentle cascade.
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
  { table: 14, dishes: [[1, "Penne alfredo"]], note: "Extra cheese" },
  { table: 5, dishes: [[2, "Lemon iced tea"], [1, "Bruschetta"]] },
  { table: 10, dishes: [[1, "Panna cotta"], [1, "Espresso"]] },
];

/* Four tickets a lane. ORDERS outnumbers the tickets on screen, so no order shows twice. */
const LANE_CAP = 4;
const KDS_CYCLE_MS = 2200;
/** One cycle, as a cascade: the oldest ready ticket is served, then everything shuffles right, then a new order lands. */
const KDS_SEQUENCE: [BoardStep, number][] = [
  ["serve", 0],
  ["fire", 200],
  ["start", 400],
  ["arrive", 700],
];

/* Ready: the four oldest. Preparing: the next four. New: the latest four. */
const INITIAL_BOARD: Board = {
  tickets: Array.from({ length: LANE_CAP * 3 }, (_, i) => ({
    id: i,
    stage: (2 - Math.floor(i / LANE_CAP)) as Stage,
    born: i,
  })),
  next: LANE_CAP * 3,
  tick: LANE_CAP * 3 - 1,
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

/* A ticket arrives and leaves with a short fade; moving between lanes is movement on
   screen, so it eases in and out. */
const TICKET_TRANSITION = { duration: 0.45, ease: EASE_OUT, layout: { duration: 0.5, ease: EASE_IN_OUT } };
const TICKET_EXIT = { opacity: 0, x: 12, transition: { duration: 0.25, ease: EASE_OUT } };

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={TICKET_EXIT}
      transition={TICKET_TRANSITION}
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

function KdsBoard() {
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
          <span className={styles.liveDot} />
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
   Knomi Pulse — before the bill, Host asks how it went. He rises over the
   check-in's top edge as it comes into view; the guest taps "Something wasn’t
   right", and the manager's alert slides in while there is still time to make
   it right. Runs once per visit, then rests.
   =========================================================================== */

/** The answer this guest gives. */
const PULSE_PICK = 2;
/** Steps: 0 = the question, 1 = the answer, 2 = the alert (the resting frame). */
const PULSE_REST = 2;
/** How long each step holds before the next, in ms. */
const PULSE_HOLD = [1500, 1000];

function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.25 11.25V7.5a3.75 3.75 0 0 1 7.5 0v3.75l1 1.25h-9.5Z" />
      <path d="M6.75 14h2.5" />
      <path d="M8 2.25v1.5" />
    </svg>
  );
}

function PulseCheckin() {
  const { ref, live } = useLive<HTMLDivElement>();
  // Any part on screen. Once it is fully out of sight it rewinds, so the next
  // visit plays from the question again without anyone seeing the reset.
  const onScreen = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [wasOnScreen, setWasOnScreen] = useState(onScreen);
  if (onScreen !== wasOnScreen) {
    setWasOnScreen(onScreen);
    if (!onScreen) setStep(0);
  }

  useEffect(() => {
    if (!live || step >= PULSE_REST) return;
    const id = window.setTimeout(() => setStep((s) => Math.min(s + 1, PULSE_REST)), PULSE_HOLD[step]);
    return () => window.clearTimeout(id);
  }, [live, step]);

  const shown = reduced ? PULSE_REST : step;

  return (
    // "watch": the reveal script marks it [data-in] as it nears the viewport, which is Host's cue to rise.
    <div
      ref={ref}
      className={styles.pulse}
      data-step={shown}
      data-reveal="watch"
      aria-hidden="true"
      suppressHydrationWarning
    >
      <div className={styles.checkin}>
        {/* Host peeks over the check-in's top edge, hands on it, as he does on the menu */}
        <span className={styles.pulseHost}>
          <HostArt pose="peek" fit="art" size="100%" decorative sizes="88px" />
        </span>
        <div className={styles.checkinCard}>
          <p className={styles.checkinAsk}>{PULSE_COPY.question}</p>
          <span className={styles.chips}>
            {PULSE_COPY.chips.map((chip, i) => (
              <span key={chip} className={styles.chip}>
                {i === PULSE_PICK && (
                  <>
                    <span className={styles.chipTap} />
                    <span className={styles.chipFill} />
                  </>
                )}
                <span className={styles.chipLabel}>{chip}</span>
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className={`theme-dark ${styles.alert}`}>
        <span className={styles.alertBell}>
          <BellIcon />
        </span>
        <span>
          <span className={styles.alertTable}>{PULSE_COPY.table}</span>
          <span className={styles.alertDot}>·</span>
          {PULSE_COPY.alert}
        </span>
      </div>
    </div>
  );
}

/* ===========================================================================
   The section
   =========================================================================== */

export default function OwnersChapter() {
  const { eyebrow, titleLead, titleAccent, lead, features } = ownersChapter;
  const dash = features.find((f) => f.key === DASH_KEY);
  const rest = features.filter((f) => f.key !== DASH_KEY);

  return (
    <section id="owners" className={`section ${styles.section}`}>
      <div className="wrap">
        <SectionHead eyebrow={eyebrow} titleLead={titleLead} titleAccent={titleAccent} accentStyle="plain" lead={lead} />

        <div className={styles.layout}>
          {dash && (
            <Reveal className={styles.dash}>
              <div className={styles.dashCopy}>
                <h3 className={styles.dashTitle}>{dash.title}</h3>
                <p className={styles.body}>{dash.body}</p>
              </div>
              <div className={styles.screen} aria-hidden="true">
                <KdsBoard />
              </div>
            </Reveal>
          )}

          <Stagger as="ul" className={styles.list}>
            {rest.map((feature) => (
              <StaggerItem as="li" key={feature.key} className={styles.item}>
                <h3 className={styles.title}>{feature.title}</h3>
                <div className={styles.detail}>
                  <p className={styles.body}>{feature.body}</p>
                  {feature.key === PULSE_KEY && <PulseCheckin />}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
