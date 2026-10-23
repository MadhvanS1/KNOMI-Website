"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Phone, WhatsApp } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { contact, faqs } from "@/content/site";
import styles from "./FAQ.module.css";

/* ---------------------------------------------------------------------------
   FAQ — "Asked, and answered."
   Left: a sticky header with a small arched note for anyone still curious.
   Right: the questions as a printed list. The order carries no meaning, so
   the rows are not numbered. Every row is independent (several can be open
   at once); arrow keys, Home and End move between questions.
   An answer opens in 0.25s and closes in 0.15s, by fading: its height is never
   animated, so the rows below simply make room.
   --------------------------------------------------------------------------- */

// copy: section header and aside (approved in the brief).
const COPY = {
  eyebrow: "Questions",
  title: "Asked, and answered.",
  asideTitle: "Still curious?",
  whatsapp: "WhatsApp us",
  newTab: "(opens in a new tab)",
} as const;

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
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
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
          <SectionHead className={styles.head} eyebrow={COPY.eyebrow} titleLead={COPY.title} />
          <Reveal className={styles.asideWrap} delay={0.1}>
            <Aside />
          </Reveal>
        </div>

        {/* Keys bubble up from the question buttons to this wrapper. data-motion-safe: the
            answers keep their short fades under reduced motion (FAQ.module.css drops the movement). */}
        <div className={styles.listWrap} onKeyDown={onKeyDown} data-motion-safe="">
          <Stagger as="ul" className={styles.list}>
            {faqs.map((f) => (
              <StaggerItem key={f.q} as="li" className={styles.item}>
                <Item q={f.q} a={f.a} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Item({ q, a }: { q: string; a: string }) {
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
          <span className={styles.qText}>{q}</span>
          <span className={styles.icon} aria-hidden="true">
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barV}`} />
          </span>
        </button>
      </h3>

      {/* Always in the HTML (so answers are indexed and match the FAQ schema),
          hidden by CSS and kept out of focus order while closed. */}
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!open}>
        <div className={styles.answer}>
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

function Aside() {
  return (
    <aside className={styles.aside} aria-labelledby="faq-aside-title">
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
