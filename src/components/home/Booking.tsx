"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { ArrowRight, ArrowUpRight, Mail, Phone, WhatsApp } from "@/components/ui/Icons";
import { EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Wordmark from "@/components/ui/Wordmark";
import { booking, contact, whatsappLink } from "@/content/site";
import styles from "./Booking.module.css";

/* ---------------------------------------------------------------------------
   Booking — "Let's set a table for you."
   Left: the header and the direct lines, set large like a menu's address
   block. Right: a reservation card standing in a hairline archway — a ticket
   with a perforated stub, whose form gives way to an arched seal once sent.

   The form never dead-ends:
   - With NEXT_PUBLIC_FORMSPREE_URL set (on the hosting platform, inlined at
     build time), requests post to Formspree. If sending fails, the visitor is
     offered the same request on WhatsApp, or the sales email.
   - Without it (or with a placeholder), the form sends through WhatsApp: it
     opens a chat with KNOMI with the details typed in, and the confirmation
     says honestly that the visitor still has to press send.
   Validation is the form's own (noValidate): errors in words under each field,
   focus on the first one. Only the four fields we need are shown; email, tables
   and notes wait behind "Add details (optional)".
   --------------------------------------------------------------------------- */

const ENDPOINT = (process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "").trim();
/** Same answer on the server and in the browser: the value is fixed at build time. */
const HAS_ENDPOINT = /^https:\/\/\S+$/.test(ENDPOINT) && !ENDPOINT.includes("YOUR_") && !ENDPOINT.includes("<");

type Status = "idle" | "submitting" | "sent" | "whatsapp" | "error";

// copy: card flourish, field labels, button and status lines (labels approved in the brief).
const COPY = {
  cardLabel: "Reservation",
  whatsapp: "WhatsApp us",
  newTab: "(opens in a new tab)",
  submit: "Request a walkthrough",
  sending: "Sending…",
} as const;

type FieldName = "name" | "restaurant" | "phone" | "city" | "email" | "tables" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

type FieldDef = {
  name: FieldName;
  label: string;
  required?: boolean;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  multiline?: boolean;
};

/** Always shown: what we need to call back. */
const NEED: FieldDef[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "restaurant", label: "Restaurant", required: true, autoComplete: "organization" },
  { name: "phone", label: "Phone", required: true, type: "tel", autoComplete: "tel", inputMode: "tel" },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
];

/** Behind "Add details (optional)". */
const MORE: FieldDef[] = [
  { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "tables", label: "Number of tables", autoComplete: "off", inputMode: "numeric" },
  { name: "message", label: "Anything we should know?", multiline: true },
];

/** Page order, so focus lands on the first problem a visitor would meet. */
const ORDER: FieldName[] = [...NEED, ...MORE].map((f) => f.name);
const MORE_NAMES = new Set<FieldName>(MORE.map((f) => f.name));

const EMPTY: Values = { name: "", restaurant: "", phone: "", city: "", email: "", tables: "", message: "" };

const PHONE_DIGITS = 10;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The message under a field, or undefined when it is fine. Optional fields are only
 *  checked once something has been typed in them. */
function check(name: FieldName, raw: string): string | undefined {
  const v = raw.trim();
  const e = booking.errors;
  switch (name) {
    case "name":
    case "restaurant":
    case "city":
      return v ? undefined : e[name];
    case "phone":
      if (!v) return e.phone;
      return v.replace(/\D/g, "").length < PHONE_DIGITS ? e.phoneInvalid : undefined;
    case "email":
      return !v || EMAIL_SHAPE.test(v) ? undefined : e.email;
    case "tables":
      return !v || (/^\d{1,4}$/.test(v) && Number(v) > 0) ? undefined : e.tables;
    default:
      return undefined;
  }
}

function checkAll(values: Values): Errors {
  const found: Errors = {};
  for (const name of ORDER) {
    const message = check(name, values[name]);
    if (message) found[name] = message;
  }
  return found;
}

const trimmed = (values: Values) =>
  Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()])) as Values;

/** The WhatsApp message: the greeting, then "Label: value" for each field filled in. */
function messageFrom(values: Values) {
  const { greeting, lines } = booking.whatsapp;
  const rows = (Object.keys(lines) as (keyof typeof lines)[])
    .filter((key) => values[key].trim())
    .map((key) => `${lines[key]}: ${values[key].trim()}`);
  return [greeting, "", ...rows].join("\n");
}

/* Reduced-motion preference, hydration-safe: false on the server and while hydrating,
   the real value straight after. */
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

const CONTACTS = [
  { key: "phone", href: contact.phoneHref, label: contact.phoneDisplay, icon: <Phone size={18} />, external: false },
  { key: "whatsapp", href: contact.whatsappHref, label: COPY.whatsapp, icon: <WhatsApp size={16} />, external: true },
  { key: "mail", href: `mailto:${contact.salesEmail}`, label: contact.salesEmail, icon: <Mail size={18} />, external: false },
];

export default function Booking() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [more, setMore] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // The chat link last opened, so the confirmation can offer it again.
  const [chatHref, setChatHref] = useState<string>(contact.whatsappHref);
  const reduce = usePrefersReducedMotion();
  const uid = useId();
  const fieldId = (name: FieldName) => `${uid}-${name}`;
  const moreId = `${uid}-more`;
  const done = status === "sent" || status === "whatsapp";

  const update = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Typing only ever clears a message; a new one waits until the visitor moves on.
    setErrors((prev) => (prev[name] && !check(name, value) ? { ...prev, [name]: undefined } : prev));
  };

  const leave = (name: FieldName, value: string) => {
    // Check on the way out once there is something to check, or after a first attempt.
    if (!attempted && !value.trim()) return;
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const openChat = (href: string) => {
    setChatHref(href);
    setStatus("whatsapp");
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = checkAll(values);
    const first = ORDER.find((name) => found[name]);
    if (first) {
      // Render the messages (and open the details if one is in there) before moving focus,
      // so the field is announced together with its message.
      flushSync(() => {
        setAttempted(true);
        setErrors(found);
        if ([...MORE_NAMES].some((name) => found[name])) setMore(true);
      });
      document.getElementById(fieldId(first))?.focus();
      return;
    }
    setErrors({});

    // No endpoint: send the request through WhatsApp. Opened straight from the submit,
    // so the browser treats it as the visitor's own action.
    if (!HAS_ENDPOINT) {
      const href = whatsappLink(messageFrom(values));
      window.open(href, "_blank", "noopener,noreferrer");
      openChat(href);
      return;
    }

    setStatus("submitting");
    const honeypot = new FormData(e.currentTarget).get("_gotcha") ?? "";
    const payload = { ...trimmed(values), _gotcha: honeypot };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("sent");
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

  const fieldProps = (def: FieldDef) => ({
    def,
    id: fieldId(def.name),
    value: values[def.name],
    error: errors[def.name],
    onChange: (v: string) => update(def.name, v),
    onBlur: (v: string) => leave(def.name, v),
  });

  return (
    <section id="book" className={`section ${styles.booking}`}>
      <span id="demo" aria-hidden="true" />
      <div className={`wrap ${styles.divider}`} aria-hidden="true">
        <span className={styles.dividerLine} />
      </div>

      <div className={`wrap ${styles.layout}`}>
        <SectionHead
          className={styles.head}
          eyebrow={booking.eyebrow}
          titleLead={booking.titleLead}
          titleAccent={booking.titleAccent}
          accentStyle="plain"
          lead={booking.lead}
        />

        <div className={styles.direct}>
          <Stagger as="ul" className={styles.contacts} stagger={0.06}>
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
          <Reveal as="p" className={styles.city} y={10} delay={0.15}>
            {contact.city}
          </Reveal>
        </div>

        <div className={styles.stage}>
          {/* A hairline archway behind the card. */}
          <Reveal className={styles.vault} y={0} delay={0.1}>
            <span className={styles.vaultLine} aria-hidden="true" />
            <span className={`${styles.vaultLine} ${styles.vaultLineInner}`} aria-hidden="true" />
          </Reveal>

          <Reveal className={styles.cardReveal}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.brand}>
                  <Wordmark className={styles.wordmark} />
                  <span className={styles.cardLabel}>{COPY.cardLabel}</span>
                </span>
              </div>

              <div className={styles.perf} aria-hidden="true">
                <span className={`${styles.notch} ${styles.notchL}`} />
                <span className={`${styles.notch} ${styles.notchR}`} />
              </div>

              <div className={styles.cardBody}>
                {/* data-motion-safe: under reduced motion the form keeps its short fades
                    (Booking.module.css drops their movement) instead of snapping. */}
                <motion.form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  inert={done}
                  data-motion-safe=""
                  initial={false}
                  animate={done ? { opacity: 0, y: reduce ? 0 : -8 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <div className={styles.honeypot} aria-hidden="true">
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className={styles.fields}>
                    {NEED.map((def) => (
                      <Field key={def.name} {...fieldProps(def)} />
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`pressable ${styles.moreToggle}`}
                    aria-expanded={more}
                    aria-controls={moreId}
                    onClick={() => setMore((v) => !v)}
                  >
                    <span className={styles.moreIcon} aria-hidden="true">
                      <span className={styles.moreBar} />
                      <span className={`${styles.moreBar} ${styles.moreBarV}`} />
                    </span>
                    {more ? booking.more.hide : booking.more.show}
                  </button>

                  <div id={moreId} className={styles.more} hidden={!more}>
                    <div className={styles.fields}>
                      {MORE.map((def) => (
                        <Field key={def.name} {...fieldProps(def)} />
                      ))}
                    </div>
                  </div>

                  {status === "error" && (
                    <div role="alert" className={styles.error}>
                      <p>{booking.error.body}</p>
                      <a
                        href={whatsappLink(messageFrom(values))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn btn--ghost btn--sm ${styles.errorWhatsapp}`}
                        onClick={(e) => openChat(e.currentTarget.href)}
                      >
                        <WhatsApp size={15} />
                        {booking.error.whatsapp}
                        <span className="sr-only"> {COPY.newTab}</span>
                      </a>
                      <p className={styles.errorEmail}>
                        {booking.error.email} <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn btn--ink btn--lg ${styles.submit}`}
                    disabled={status === "submitting"}
                  >
                    {HAS_ENDPOINT ? (
                      <>
                        <span>{status === "submitting" ? COPY.sending : COPY.submit}</span>
                        <ArrowRight className="btn__arrow" />
                      </>
                    ) : (
                      <>
                        <WhatsApp size={17} />
                        <span>{booking.whatsapp.submit}</span>
                        <span className="sr-only"> {COPY.newTab}</span>
                      </>
                    )}
                  </button>
                  {!HAS_ENDPOINT && <p className={styles.submitNote}>{booking.whatsapp.note}</p>}

                  <p className="sr-only" role="status" aria-live="polite">
                    {status === "submitting" ? COPY.sending : ""}
                  </p>
                </motion.form>

                {status === "sent" && (
                  <Confirmation kind="sent" reduce={reduce} title={booking.success.title} body={booking.success.body} />
                )}
                {status === "whatsapp" && (
                  <Confirmation
                    kind="whatsapp"
                    reduce={reduce}
                    title={booking.whatsapp.sent.title}
                    body={booking.whatsapp.sent.body}
                  >
                    <p className={styles.confirmMore}>
                      <a href={chatHref} target="_blank" rel="noopener noreferrer" className="link">
                        {booking.whatsapp.sent.retry}
                        <span className="sr-only"> {COPY.newTab}</span>
                      </a>
                    </p>
                    <p className={styles.confirmNote}>
                      {booking.error.email} <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>.
                    </p>
                  </Confirmation>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  def,
  id,
  value,
  error,
  onChange,
  onBlur,
}: {
  def: FieldDef;
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}) {
  const { name, label, required, type = "text", autoComplete, inputMode, multiline } = def;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    autoComplete,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

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
          <textarea
            {...shared}
            rows={3}
            className={`${styles.input} ${styles.textarea}`}
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={(e) => onBlur(e.currentTarget.value)}
          />
        ) : (
          <input
            {...shared}
            type={type}
            inputMode={inputMode}
            spellCheck={type === "text" && name !== "tables" ? undefined : false}
            className={styles.input}
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={(e) => onBlur(e.currentTarget.value)}
          />
        )}
      </span>
      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

/* Arched seal, drawn: outer arch, inner rule, then the mark. A check once the request has
   arrived; an arrow out when it is waiting in WhatsApp, since only the visitor can send it. */
const SEAL_OUTER = "M8 114V50a40 40 0 0 1 80 0v64Z";
const SEAL_INNER = "M15.5 106.5V50a32.5 32.5 0 0 1 65 0v56.5Z";
const SEAL_MARK = {
  sent: "M33 74l10.5 10.5L64 62",
  whatsapp: "M38 82L60 60M45 60h15v15",
} as const;
const SEAL_STAR = "48,24 49.6,30.4 56,32 49.6,33.6 48,40 46.4,33.6 40,32 46.4,30.4";

function Confirmation({
  kind,
  reduce,
  title,
  body,
  children,
}: {
  kind: keyof typeof SEAL_MARK;
  reduce: boolean;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // The form is now inert, so move focus to the confirmation instead of losing it.
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  // The seal is the moment: drawn in about a second and a half, once per request.
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
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: EASE_OUT },
        };

  return (
    <motion.div
      className={styles.success}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      // Starts as the form finishes leaving, so the two never show at once.
      transition={{ duration: 0.3, delay: reduce ? 0 : 0.22, ease: EASE_OUT }}
    >
      <svg className={styles.seal} viewBox="0 0 96 118" fill="none" aria-hidden="true">
        <motion.path
          d={SEAL_OUTER}
          className={styles.sealWash}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.8, duration: 0.6, ease: EASE_OUT }}
        />
        <motion.path d={SEAL_OUTER} className={styles.sealLine} {...draw(0.3, 1)} />
        <motion.path d={SEAL_INNER} className={styles.sealRule} {...draw(0.5, 0.9)} />
        <motion.path d={SEAL_MARK[kind]} className={styles.sealCheck} {...draw(1, 0.45)} />
        <motion.polygon
          points={SEAL_STAR}
          className={styles.sealStar}
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : 1.3, duration: 0.4, ease: EASE_OUT }}
        />
      </svg>

      <motion.h3 ref={titleRef} tabIndex={-1} className={styles.successTitle} {...rise(0.45)}>
        {title}
      </motion.h3>
      <motion.p className={styles.successBody} {...rise(0.55)}>
        {body}
      </motion.p>
      {children && <motion.div {...rise(0.65)}>{children}</motion.div>}
    </motion.div>
  );
}
