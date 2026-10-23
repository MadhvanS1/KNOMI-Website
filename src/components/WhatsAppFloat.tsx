"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";
import { WhatsApp } from "./ui/Icons";
import styles from "./WhatsAppFloat.module.css";

/** Sections that carry their own way to reach us, or fields the button would sit on
 *  ([data-float-clear] marks one on another page, such as the ROI guide's calculator). */
const CLEAR_OF = "#worth, #faq, #book, #footer, [data-float-clear]";

/** What counts as content under the button's spot: words, pictures and controls. Section
 *  backgrounds and layout boxes don't, so it can still sit in a margin or a gap. */
const CONTENT = "p, h1, h2, h3, h4, h5, h6, li, dt, dd, blockquote, figure, img, picture, svg, canvas, video, a, button, input, select, textarea, label, table";

/** It appears only once its spot has stayed clear this long, so it never flickers in the gaps
 *  between lines while the page moves; it leaves at once when content arrives under it. */
const SETTLE_MS = 180;
const RECHECK_MS = 400;

/** True when nothing but background sits under the button's spot (its box plus a small margin). */
function spotIsClear(button: HTMLElement): boolean {
  const r = button.getBoundingClientRect();
  const m = 6;
  const xs = [r.left - m, r.left + r.width / 2, r.right + m];
  const ys = [r.top - m, r.top + r.height / 2, r.bottom + m];
  for (const x of xs) {
    for (const y of ys) {
      for (const el of document.elementsFromPoint(x, y)) {
        if (button.contains(el)) continue;
        if (el.closest(CONTENT)) return false;
        break; // only the topmost element under this point matters
      }
    }
  }
  return true;
}

/**
 * A quiet way to start a WhatsApp chat, there only when it covers nothing that matters:
 * it waits until the visitor is past the hero (which has its own button), steps aside
 * while the calculator, FAQ, booking form or footer is on screen, and shows only while its
 * spot is clear of words, pictures and controls. On wide screens it is parked in the side
 * margin beside the content column (WhatsAppFloat.module.css), so that is nearly always;
 * on phones it also tucks away while the visitor reads down the page.
 * The first render is always hidden, so server and client agree.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    const hero = document.getElementById("top");
    const narrow = window.matchMedia("(max-width: 768px)");
    const onScreen = new Set<Element>();
    let pastHero = false;
    let tucked = false;
    let lastY = window.scrollY;
    let frame = 0;
    let settle: number | undefined;
    let visible = false;

    const show = (on: boolean) => {
      visible = on;
      setShown(on);
    };

    const sync = () => {
      window.clearTimeout(settle);
      if (!pastHero || tucked || onScreen.size > 0 || !spotIsClear(button)) {
        show(false);
        return;
      }
      settle = window.setTimeout(() => show(spotIsClear(button)), SETTLE_MS);
    };

    // Content can also arrive without a scroll (an entrance finishing its rise, a carousel
    // moving on), so while it is shown it keeps checking its spot.
    const watch = window.setInterval(() => {
      if (visible && !spotIsClear(button)) show(false);
    }, RECHECK_MS);

    const zones = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      sync();
    });
    document.querySelectorAll(CLEAR_OF).forEach((el) => zones.observe(el));

    // Homepage: past the hero once its bottom edge leaves the screen. Elsewhere: past 60% of the first screen.
    let heroWatch: IntersectionObserver | undefined;
    if (hero) {
      heroWatch = new IntersectionObserver(([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        sync();
      });
      heroWatch.observe(hero);
    }

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (!hero) pastHero = y > window.innerHeight * 0.6;
      if (Math.abs(y - lastY) > 6) {
        tucked = narrow.matches && y > lastY;
        lastY = y;
      }
      sync();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.clearInterval(watch);
      zones.disconnect();
      heroWatch?.disconnect();
    };
  }, [pathname]);

  return (
    <a
      ref={buttonRef}
      href={contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`pressable ${styles.floatButton} ${shown ? styles.shown : ""}`}
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      data-motion-safe
    >
      <WhatsApp className={styles.icon} size={22} />
      <span className={styles.label} aria-hidden="true">
        Chat with us
      </span>
    </a>
  );
}
