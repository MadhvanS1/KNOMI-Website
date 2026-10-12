"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ribbon } from "@/content/site";
import styles from "./Ribbon.module.css";

/** Identical groups laid end to end. Each slides by its own width, so two always cover the widest screen. */
const COPIES = 3;

export default function Ribbon() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px 0px" });
  const [stopped, setStopped] = useState(false);

  return (
    <div ref={ref} className={`${styles.ribbon} ${inView && !stopped ? "" : styles.paused}`}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul key={copy} className={styles.group} aria-hidden={copy > 0 ? true : undefined}>
              {ribbon.map((item) => (
                <li key={item} className={styles.item}>
                  <span>{item}</span>
                  <span className={`ornament ${styles.star}`} aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {/* Moving text must be pausable (WCAG 2.2.2), not only on mouse hover. */}
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={stopped}
        aria-label="Pause scrolling text"
        onClick={() => setStopped((v) => !v)}
      >
        {stopped ? (
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3.5 2.2v7.6L9.6 6z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3.6 2.4v7.2M8.4 2.4v7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
