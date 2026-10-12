"use client";

import { motion, type Variants } from "framer-motion";
import { useId, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Phone, WhatsApp } from "@/components/ui/Icons";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { contact, faqs } from "@/content/site";
import styles from "./FAQ.module.css";

/* ---------------------------------------------------------------------------
   FAQ — "Asked, and answered."
   Left: a sticky header with a small arched note for anyone still curious.
   Right: the questions as a printed list, each numbered in roman numerals.
   Every row is independent (several can be open at once); arrow keys, Home
   and End move between questions.
   --------------------------------------------------------------------------- */

// copy: section header and aside (approved in the brief).
const COPY = {
  eyebrow: "Questions",
  titleLead: "Asked, and",
  titleAccent: "answered.",
  asideTitle: "Still curious?",
  whatsapp: "WhatsApp us",
  newTab: "(opens in a new tab)",
} as const;

const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const PANEL: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.6, ease: EASE_OUT },
      opacity: { duration: 0.45, delay: 0.12, ease: EASE_OUT },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.45, ease: EASE_OUT },
      opacity: { duration: 0.2, ease: EASE_OUT },
    },
  },
};

function toRoman(n: number) {
  let out = "";
  let rest = n;
  for (const [value, glyph] of ROMAN) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}

/* Structured data from the same source as the visible answers, so the two can never drift. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const TRIGGER = "[data-faq-trigger]";

export default function FAQ() {
  // Roving focus between the question buttons (WAI-ARIA accordion pattern).
  function onKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    const target = e.target as HTMLElement;
    if (!target.matches(TRIGGER)) return;
    const triggers = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>(TRIGGER));
    const i = triggers.indexOf(target as HTMLButtonElement);
    let next = -1;
    if (e.key === "ArrowDown") next = (i + 1) % triggers.length;
    else if (e.key === "ArrowUp") next = (i - 1 + triggers.length) % triggers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = triggers.length - 1;
    if (next < 0) return;
    e.preventDefault();
    triggers[next]?.focus();
  }

  return (
    <section id="faq" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      <div className={`wrap ${styles.layout}`}>
        <div className={styles.side}>
          <SectionHead
            className={styles.head}
            eyebrow={COPY.eyebrow}
            titleLead={COPY.titleLead}
            titleAccent={COPY.titleAccent}
          />
          <Reveal className={styles.asideWrap} y={20} delay={0.2} amount={0.4}>
            <Aside />
          </Reveal>
        </div>

        <ul className={styles.list} onKeyDown={onKeyDown}>
          {faqs.map((f, i) => (
            <Reveal key={f.q} as="li" className={styles.item} y={16} delay={Math.min(i, 6) * 0.05} amount={0.4}>
              <Item q={f.q} a={f.a} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const buttonId = `${uid}-q`;
  const panelId = `${uid}-a`;

  return (
    <div className={styles.row} data-open={open}>
      <h3 className={styles.q}>
        <button
          id={buttonId}
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          data-faq-trigger=""
        >
          <span className={styles.idx} aria-hidden="true">
            {toRoman(index + 1)}
          </span>
          <span className={styles.qText}>{q}</span>
          <span className={styles.icon} aria-hidden="true">
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barV}`} />
          </span>
        </button>
      </h3>

      {/* Always in the HTML (so answers are indexed and match the FAQ schema),
          collapsed visually and kept out of focus order while closed. */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.panel}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={PANEL}
        inert={!open}
      >
        <div className={styles.answer}>
          <p>{a}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Aside() {
  return (
    <aside className={styles.aside} aria-labelledby="faq-aside-title">
      <span className={`ornament ${styles.asideStar}`} aria-hidden="true" />
      <p id="faq-aside-title" className={styles.asideTitle}>
        {COPY.asideTitle}
      </p>
      <ul className={styles.asideLinks}>
        <li>
          <a href={contact.phoneHref} className={styles.asideLink}>
            <span className={styles.asideIcon} aria-hidden="true">
              <Phone size={16} />
            </span>
            <span className={styles.asideLabel}>{contact.phoneDisplay}</span>
            <ArrowUpRight className={styles.asideArrow} />
          </a>
        </li>
        <li>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.asideLink}>
            <span className={styles.asideIcon} aria-hidden="true">
              <WhatsApp size={15} />
            </span>
            <span className={styles.asideLabel}>
              {COPY.whatsapp}
              <span className="sr-only"> {COPY.newTab}</span>
            </span>
            <ArrowUpRight className={styles.asideArrow} />
          </a>
        </li>
      </ul>
    </aside>
  );
}
