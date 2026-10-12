"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const inr = new Intl.NumberFormat("en-IN");

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
};

/** Rolls smoothly from its previous value to `value`, formatted the Indian way (2,50,000). */
export default function AnimatedNumber({ value, prefix = "", suffix = "", duration = 0.8, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const render = (n: number) => {
      node.textContent = `${prefix}${inr.format(Math.round(n))}${suffix}`;
    };
    if (reduce) {
      render(value);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: render,
    });
    from.current = value;
    return () => controls.stop();
  }, [value, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {`${prefix}${inr.format(value)}${suffix}`}
    </span>
  );
}
