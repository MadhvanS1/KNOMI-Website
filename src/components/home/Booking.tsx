"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type FormEvent, type HTMLAttributes } from "react";
import { ArrowRight, ArrowUpRight, Mail, Phone, WhatsApp } from "@/components/ui/Icons";
import { EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Wordmark from "@/components/ui/Wordmark";
import { booking, contact } from "@/content/site";
import styles from "./Booking.module.css";

/* ---------------------------------------------------------------------------
   Booking — "Let's set a table for you."
   Left: the header and the direct lines, set large like a menu's address
   block. Right: a reservation card standing in a hairline archway — a ticket
   with a perforated stub, whose form gives way to an arched seal on success.
   Submission goes to Formspree (NEXT_PUBLIC_FORMSPREE_URL).
   --------------------------------------------------------------------------- */

type FormStatus = "idle" | "submitting" | "success" | "error";

// copy: card flourish, field labels, button and status lines (labels approved in the brief).
const COPY = {
  cardLabel: "Reservation",
  cardNo: "No. 001",
  whatsapp: "WhatsApp us",
  newTab: "(opens in a new tab)",
  submit: "Request a walkthrough",
  sending: "Sending…",
  error: "Something went wrong sending your request. Please try again, or write to us at",
} as const;

type FieldDef = {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "tel" | "email" | "number";
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: number;
  multiline?: boolean;
};

const FIELDS: FieldDef[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "restaurant", label: "Restaurant", required: true, autoComplete: "organization" },
  { name: "phone", label: "Phone", required: true, type: "tel", autoComplete: "tel", inputMode: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "tables", label: "Number of tables", type: "number", min: 1, inputMode: "numeric" },
  { name: "message", label: "Anything we should know?", multiline: true },
];

const CONTACTS = [
  { key: "phone", href: contact.phoneHref, label: contact.phoneDisplay, icon: <Phone size={18} />, external: false },
  { key: "whatsapp", href: contact.whatsappHref, label: COPY.whatsapp, icon: <WhatsApp size={16} />, external: true },
  { key: "mail", href: `mailto:${contact.salesEmail}`, label: contact.salesEmail, icon: <Mail size={18} />, external: false },
];

export default function Booking() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const reduce = Boolean(useReducedMotion());
  const uid = useId();
  const done = status === "success";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/YOUR_FORM_ID";

    if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
      console.error(
        "[KNOMI Contact Form Error]: NEXT_PUBLIC_FORMSPREE_URL is not set or still contains placeholder 'YOUR_FORM_ID'. Please update .env.local or Vercel Environment Variables and restart/rebuild.",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const errorData = await res.json().catch(() => null);
        console.error("[KNOMI Contact Form Error]: Formspree returned non-OK response:", res.status, errorData);
        setStatus("error");
      }
    } catch (err) {
      console.error("[KNOMI Contact Form Error]: Network or fetch error:", err);
      setStatus("error");
    }
  }

  return (
    <section id="book" className={`section ${styles.booking}`}>
      <span id="demo" aria-hidden="true" />
      <div className={`wrap ${styles.divider}`} aria-hidden="true">
        <span className={styles.dividerLine} />
        <span className="ornament" />
        <span className={styles.dividerLine} />
      </div>

      <div className={`wrap ${styles.layout}`}>
        <SectionHead
          className={styles.head}
          eyebrow={booking.eyebrow}
          titleLead={booking.titleLead}
          titleAccent={booking.titleAccent}
          lead={booking.lead}
        />

        <div className={styles.direct}>
          <Stagger as="ul" className={styles.contacts} stagger={0.09} amount={0.4}>
            {CONTACTS.map((c) => (
              <StaggerItem as="li" key={c.key} className={styles.contactItem}>
                <a
                  href={c.href}
                  className={styles.contact}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.contactIcon} aria-hidden="true">
                    {c.icon}
                  </span>
                  <span className={styles.contactValue}>
                    {c.label}
                    {c.external && <span className="sr-only"> {COPY.newTab}</span>}
                  </span>
                  <ArrowUpRight size={16} className={styles.contactArrow} />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal y={10} delay={0.3} amount={0.8}>
            <p className={styles.city}>
              <span className="ornament" aria-hidden="true" />
              {contact.city}
            </p>
          </Reveal>
        </div>

        <div className={styles.stage}>
          <Vault reduce={reduce} />

          <Reveal className={styles.cardReveal} y={36} amount={0.12}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.brand}>
                  <Wordmark className={styles.wordmark} />
                  <span className={styles.cardLabel}>{COPY.cardLabel}</span>
                </span>
                <span className={styles.cardNo} aria-hidden="true">
                  {COPY.cardNo}
                </span>
              </div>

              <div className={styles.perf} aria-hidden="true">
                <span className={`${styles.notch} ${styles.notchL}`} />
                <span className={`${styles.notch} ${styles.notchR}`} />
              </div>

              <div className={styles.cardBody}>
                <motion.form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  inert={done}
                  initial={false}
                  animate={done ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <div className={styles.honeypot} aria-hidden="true">
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className={styles.fields}>
                    {FIELDS.map((f) => (
                      <Field key={f.name} def={f} id={`${uid}-${f.name}`} />
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {status === "error" && (
                      <motion.p
                        key="error"
                        role="alert"
                        className={styles.error}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      >
                        {COPY.error}{" "}
                        <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className={`btn btn--ink btn--lg ${styles.submit}`}
                    disabled={status === "submitting"}
                  >
                    <span>{status === "submitting" ? COPY.sending : COPY.submit}</span>
                    <ArrowRight className="btn__arrow" />
                  </button>

                  <p className="sr-only" role="status" aria-live="polite">
                    {status === "submitting" ? COPY.sending : ""}
                  </p>
                </motion.form>

                <AnimatePresence>{done && <Success key="success" reduce={reduce} />}</AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ def, id }: { def: FieldDef; id: string }) {
  const { name, label, required, type = "text", autoComplete, inputMode, min, multiline } = def;

  return (
    <div className={`${styles.field} ${multiline ? styles.wide : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.req} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <span className={styles.control}>
        {multiline ? (
          <textarea id={id} name={name} rows={3} className={`${styles.input} ${styles.textarea}`} />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            inputMode={inputMode}
            min={min}
            step={type === "number" ? 1 : undefined}
            spellCheck={type === "text" ? undefined : false}
            className={styles.input}
          />
        )}
      </span>
    </div>
  );
}

/* A hairline archway behind the card. It opens from the keystone outwards. */
const ARCH_CLOSED = "inset(0% 50% 100% 50%)";
const ARCH_OPEN = "inset(0% 0% 0% 0%)";

function Vault({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const open = inView || reduce;

  return (
    <div ref={ref} className={styles.vault} aria-hidden="true">
      <motion.div
        className={styles.vaultInner}
        initial={reduce ? false : { clipPath: ARCH_CLOSED }}
        animate={{ clipPath: open ? ARCH_OPEN : ARCH_CLOSED }}
        transition={{ duration: 1.5, ease: EASE_OUT }}
      >
        <span className={styles.vaultLine} />
        <span className={`${styles.vaultLine} ${styles.vaultLineInner}`} />
      </motion.div>
      <motion.span
        className={`ornament ${styles.keystone}`}
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.7, delay: reduce ? 0 : 0.2, ease: EASE_OUT }}
      />
    </div>
  );
}

/* Arched seal, drawn: outer arch, inner rule, then the check. */
const SEAL_OUTER = "M8 114V50a40 40 0 0 1 80 0v64Z";
const SEAL_INNER = "M15.5 106.5V50a32.5 32.5 0 0 1 65 0v56.5Z";
const SEAL_CHECK = "M33 74l10.5 10.5L64 62";
const SEAL_STAR = "48,24 49.6,30.4 56,32 49.6,33.6 48,40 46.4,33.6 40,32 46.4,30.4";

function Success({ reduce }: { reduce: boolean }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // The form is now inert, so move focus to the confirmation instead of losing it.
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  const draw = (delay: number, duration: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { delay, duration, ease: EASE_OUT },
            opacity: { delay, duration: 0.01 },
          },
        };

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease: EASE_OUT },
        };

  return (
    <motion.div
      className={styles.success}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: reduce ? 0 : 0.2, ease: EASE_OUT }}
    >
      <svg className={styles.seal} viewBox="0 0 96 118" fill="none" aria-hidden="true">
        <motion.path
          d={SEAL_OUTER}
          className={styles.sealWash}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.9, duration: 0.8, ease: EASE_OUT }}
        />
        <motion.path d={SEAL_OUTER} className={styles.sealLine} {...draw(0.3, 1.2)} />
        <motion.path d={SEAL_INNER} className={styles.sealRule} {...draw(0.55, 1.1)} />
        <motion.path d={SEAL_CHECK} className={styles.sealCheck} {...draw(1.15, 0.55)} />
        <motion.polygon
          points={SEAL_STAR}
          className={styles.sealStar}
          initial={reduce ? false : { opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : 1.5, duration: 0.6, ease: EASE_OUT }}
        />
      </svg>

      <motion.h3 ref={titleRef} tabIndex={-1} className={styles.successTitle} {...rise(0.55)}>
        {booking.success.title}
      </motion.h3>
      <motion.p className={styles.successBody} {...rise(0.7)}>
        {booking.success.body}
      </motion.p>
    </motion.div>
  );
}
