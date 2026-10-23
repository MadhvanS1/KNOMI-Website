"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "./Reveal";

const inr = new Intl.NumberFormat("en-IN");

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
};

/** Rolls smoothly from its previous value to `value`, formatted the Indian way (2,50,000).
 *  A change mid-roll carries on from the figure on screen, so a dragged slider never jumps.
 *  Reduced motion: the new figure is set at once. */
export default function AnimatedNumber({ value, prefix = "", suffix = "", duration = 0.6, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // The number currently on screen (mid-roll, it sits between two targets).
  const shown = useRef(value);
  // React renders the first figure (server HTML and hydration agree); the effect owns it after that.
  const [first] = useState(() => `${prefix}${inr.format(Math.round(value))}${suffix}`);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const render = (n: number) => {
      shown.current = n;
      node.textContent = `${prefix}${inr.format(Math.round(n))}${suffix}`;
    };
    if (reduce || shown.current === value) {
      render(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: render,
    });
    return () => controls.stop();
  }, [value, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {first}
    </span>
  );
}
