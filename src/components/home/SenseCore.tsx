"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import SectionHead from "@/components/ui/SectionHead";
import HostArt from "@/components/ui/HostArt";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { getLenis } from "@/lib/lenis";
import { sense } from "@/content/site";
import SenseFallback from "./sense/SenseFallback";
import type { AstrolabeHandle } from "./sense/astrolabe";
import styles from "./SenseCore.module.css";

// copy: small UI labels (not claims)
const MODULES_LABEL = "What Knomi Sense connects";
const SEE_IT = "See it";
const PAUSE_LABEL = "Pause the instrument’s motion";

const { modules } = sense;
const COUNT = modules.length;

const DESKTOP_QUERY = "(min-width: 1024px)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* Reduced-motion preference, hydration-safe: the server value (false) first,
   the real one straight after hydration. */
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

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4.5 3v8M9.5 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4.5 2.8v8.4L11 7 4.5 2.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

type SenseModule = (typeof modules)[number];

/** A module's description, its quiet link to the section, and (for Host) the man himself. */
function ModuleDetail({
  module: m,
  className,
  focusable = true,
}: {
  module: SenseModule;
  className?: string;
  focusable?: boolean;
}) {
  const host = m.id === "host";
  return (
    <div className={`${styles.detail} ${host ? styles.detailHost : ""} ${className ?? ""}`}>
      <p className={styles.body}>{m.body}</p>
      <a href={m.href} className={`pressable ${styles.see}`} tabIndex={focusable ? undefined : -1}>
        {SEE_IT}
        <span className="sr-only">: {m.name}</span>
        <ArrowRight size={14} className={styles.seeArrow} />
      </a>
      {/* Host himself, peeking over the ledge under his description, as he peeks over a dish's title in the menu */}
      {host && (
        <span className={styles.hostPerch} aria-hidden="true">
          <HostArt pose="peek" fit="art" size="100%" decorative sizes="110px" className={styles.hostArt} />
        </span>
      )}
    </div>
  );
}

/*
 * Knomi Sense, the centrepiece. A brass instrument with a glowing core and one
 * ring per module. Desktop: the instrument holds still while the five modules
 * are read one by one; scrolling (or choosing a module) brings its ring into
 * focus. Mobile & tablet: the instrument, then a row of module cards to swipe or tap.
 */
export default function SenseCore() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "ready" | "failed">("idle");
  const [paused, setPaused] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const instrumentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const astroRef = useRef<AstrolabeHandle | null>(null);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const reduceRef = useRef(false);
  const scrollRef = useRef(0.5);
  /* While a chosen module glides into place, scroll positions passing by don't override it. */
  const lockRef = useRef<number | null>(null);
  const requestSyncRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
    astroRef.current?.setActive(active);
  }, [active]);

  useEffect(() => {
    pausedRef.current = paused;
    astroRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    reduceRef.current = reduce;
    astroRef.current?.setReducedMotion(reduce);
    requestSyncRef.current();
  }, [reduce]);

  /* Load the instrument when the section is about a screen away. three.js lives
     in its own chunk and never weighs on the first load. */
  useEffect(() => {
    const box = instrumentRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;

    let cancelled = false;
    let handle: AstrolabeHandle | null = null;
    let visibility: IntersectionObserver | null = null;

    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        near.disconnect();
        import("./sense/astrolabe")
          .then(({ createAstrolabe }) => {
            if (cancelled) return;
            handle = createAstrolabe({
              canvas,
              label: labelRef.current,
              reducedMotion: reduceRef.current,
              onContextLost: () => setStatus("failed"),
            });
            if (!handle) {
              setStatus("failed");
              return;
            }
            astroRef.current = handle;
            handle.setActive(activeRef.current);
            handle.setPaused(pausedRef.current);
            handle.setScroll(scrollRef.current);
            visibility = new IntersectionObserver(
              ([entry]) => handle?.setVisible(entry.isIntersecting, entry.intersectionRatio),
              { threshold: [0, 0.2, 0.4] },
            );
            visibility.observe(box);
            setStatus("ready");
          })
          .catch(() => {
            if (!cancelled) setStatus("failed");
          });
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    near.observe(box);

    return () => {
      cancelled = true;
      near.disconnect();
      visibility?.disconnect();
      handle?.dispose();
      astroRef.current = null;
    };
  }, []);

  /* Scroll: the instrument turns across the whole section; on desktop the pinned
     list advances one module per stretch of scroll. */
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let pinTop = 0;
    let frame = 0;

    const measure = () => {
      const pin = pinRef.current;
      pinTop = pin ? parseFloat(getComputedStyle(pin).top) || 0 : 0;
    };

    const sync = () => {
      frame = 0;
      const panel = panelRef.current;
      if (!panel) return;
      const vh = window.innerHeight;
      const rect = panel.getBoundingClientRect();
      const progress = reduceRef.current ? 0.5 : clamp01((vh - rect.top) / (rect.height + vh));
      scrollRef.current = progress;
      astroRef.current?.setScroll(progress);

      if (!desktop.matches) return;
      const marker = markerRef.current;
      if (!marker) return;
      const m = marker.getBoundingClientRect();
      if (m.height <= 0) return;
      const p = clamp01((pinTop - m.top) / m.height);
      if (railRef.current) railRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
      if (lockRef.current !== null) return;
      const index = Math.min(COUNT - 1, Math.floor(p * COUNT));
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    const remeasure = () => {
      measure();
      request();
    };
    requestSyncRef.current = request;

    measure();
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", remeasure);
    desktop.addEventListener("change", remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", remeasure);
      desktop.removeEventListener("change", remeasure);
      requestSyncRef.current = () => {};
    };
  }, []);

  /* Pointer parallax (desktop mice only). */
  useEffect(() => {
    const panel = panelRef.current;
    const box = instrumentRef.current;
    if (!panel || !box) return;
    const fine = window.matchMedia(FINE_POINTER_QUERY);

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || reduceRef.current || event.pointerType !== "mouse") return;
      const r = box.getBoundingClientRect();
      if (r.width === 0) return;
      const x = (event.clientX - (r.left + r.width / 2)) / (r.width * 0.75);
      const y = (event.clientY - (r.top + r.height / 2)) / (r.height * 0.75);
      astroRef.current?.setPointer(x, y);
    };
    const onLeave = () => astroRef.current?.setPointer(0, 0);

    panel.addEventListener("pointermove", onMove, { passive: true });
    panel.addEventListener("pointerleave", onLeave);
    return () => {
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* Mobile & tablet: the card nearest the middle of the row is the one in focus. */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;

    const sync = () => {
      frame = 0;
      if (desktop.matches || lockRef.current !== null) return;
      const box = scroller.getBoundingClientRect();
      const centre = box.left + box.width / 2;
      let best = activeRef.current;
      let bestDistance = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - centre);
        if (d < bestDistance) {
          bestDistance = d;
          best = i;
        }
      });
      if (best !== activeRef.current) {
        activeRef.current = best;
        setActive(best);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  const unlockTimer = useRef(0);

  /* Choosing a module. Desktop: glide the page to that module's stretch of the
     scroll, so the scroll position and the instrument always agree. Mobile:
     bring its card to the middle of the row. */
  const select = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
    window.clearTimeout(unlockTimer.current);

    const unlock = () => {
      window.clearTimeout(unlockTimer.current);
      lockRef.current = null;
      requestSyncRef.current();
    };
    const lockFor = (ms: number) => {
      lockRef.current = index;
      unlockTimer.current = window.setTimeout(unlock, ms);
    };
    const instant = reduceRef.current;

    if (window.matchMedia(DESKTOP_QUERY).matches) {
      const marker = markerRef.current;
      const pin = pinRef.current;
      if (!marker || !pin) return;
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const m = marker.getBoundingClientRect();
      const target = window.scrollY + m.top - pinTop + ((index + 0.5) / COUNT) * m.height;
      const distance = Math.abs(target - window.scrollY);
      if (distance < 4) return;
      const duration = Math.min(1.6, 0.9 + distance / 2600);
      const lenis = getLenis();
      lockFor(instant ? 120 : duration * 1000 + 400);
      if (lenis && !instant) {
        lenis.scrollTo(target, { duration, easing: easeInOutCubic, onComplete: unlock });
      } else {
        window.scrollTo({ top: target, behavior: instant ? "auto" : "smooth" });
      }
      return;
    }

    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const box = scroller.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    const left = scroller.scrollLeft + (r.left + r.width / 2) - (box.left + box.width / 2);
    lockFor(instant ? 120 : 900);
    scroller.scrollTo({ left, behavior: instant ? "auto" : "smooth" });
  }, []);

  useEffect(() => () => window.clearTimeout(unlockTimer.current), []);

  const ready = status === "ready";

  return (
    <section id="sense" className={styles.section}>
      <div
        ref={panelRef}
        className={`theme-dark ${styles.panel} ${ready ? styles.isReady : ""}`}
        style={{ "--count": COUNT } as CSSProperties}
      >
        <div className={`wrap ${styles.story}`}>
          <div className={styles.headArea}>
            <SectionHead
              eyebrow={sense.eyebrow}
              titleLead={sense.titleLead}
              titleAccent={sense.titleAccent}
              lead={sense.lead}
            />
          </div>

          {/* The instrument */}
          <div className={styles.stageArea}>
            <div className={styles.stage}>
              <span className={styles.glow} aria-hidden="true" />
              <div ref={instrumentRef} className={styles.instrument}>
                <SenseFallback active={active} className={styles.fallback} />
                <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
                <span ref={labelRef} className={styles.beadLabel} aria-hidden="true" data-flip="false">
                  <span className={styles.beadDot} />
                  <span className={styles.beadStem} />
                  <span className={styles.beadTag} data-tag>
                    {modules[active].name}
                  </span>
                </span>
                {ready && !reduce && (
                  <button
                    type="button"
                    className={`pressable ${styles.pause}`}
                    aria-pressed={paused}
                    aria-label={PAUSE_LABEL}
                    onClick={() => setPaused((p) => !p)}
                  >
                    {paused ? <PlayIcon /> : <PauseIcon />}
                  </button>
                )}
              </div>

              {/* The instrument's plate. The section's label above already names it, so only its line. */}
              <Reveal className={styles.plaque} y={12}>
                <p className={styles.plaqueLine}>{sense.core.line}</p>
              </Reveal>

            </div>
          </div>

          {/* The modules */}
          <div className={styles.listArea}>
            <div className={styles.track}>
              <div ref={markerRef} className={styles.marker} aria-hidden="true" />
              <div ref={pinRef} className={styles.pin}>
                {/* The rows rise in turn, then the description beneath them. */}
                <Stagger className={styles.listBox}>
                  <span className={styles.rail} aria-hidden="true">
                    <span ref={railRef} className={styles.railFill} />
                  </span>

                  <div ref={scrollerRef} className={styles.scroller} role="group" aria-label={MODULES_LABEL}>
                    <span className={styles.indicator} aria-hidden="true" style={{ "--at": active } as CSSProperties} />
                    <ul className={styles.modules}>
                      {modules.map((m, i) => {
                        const on = i === active;
                        return (
                          <StaggerItem as="li" key={m.id} className={styles.item} index={i}>
                            <div
                              ref={(el) => {
                                cardRefs.current[i] = el;
                              }}
                              className={`${styles.card} ${on ? styles.on : ""}`}
                            >
                              <h3 className={styles.itemHead}>
                                <button
                                  type="button"
                                  className={styles.itemBtn}
                                  aria-pressed={on}
                                  onClick={() => select(i)}
                                >
                                  <span className={styles.name}>{m.name}</span>
                                  <span className={`leader ${styles.leader}`} aria-hidden="true" />
                                  <span className={styles.role}>{m.role}</span>
                                </button>
                              </h3>
                              {/* Mobile & tablet: each card carries its own description. */}
                              <ModuleDetail module={m} className={styles.cardDetail} />
                            </div>
                          </StaggerItem>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Desktop: one description at a time, all five stacked in a single grid
                      cell so the slot always fits the longest and the rows never move. */}
                  <StaggerItem className={styles.detailStack} index={COUNT}>
                    {modules.map((m, i) => (
                      <ModuleDetail
                        key={m.id}
                        module={m}
                        className={i === active ? styles.detailOn : undefined}
                        focusable={i === active}
                      />
                    ))}
                  </StaggerItem>

                  <div className={styles.ticks} aria-hidden="true">
                    {modules.map((m, i) => (
                      <span key={m.id} className={`${styles.tick} ${i === active ? styles.tickOn : ""}`} />
                    ))}
                  </div>
                </Stagger>

                <Reveal className={styles.noteWrap} delay={0.1} y={12}>
                  <p className={styles.note}>{sense.note}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
