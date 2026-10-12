import { Reveal, RevealTitle } from "./Reveal";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent?: string;
  lead?: string;
  /** Large roman numeral shown beside the heading (chapters). */
  numeral?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  breakBeforeAccent?: boolean;
  className?: string;
};

/** Eyebrow + serif headline (with italic accent) + lead. The one header pattern for every section. */
export default function SectionHead({
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  numeral,
  align = "left",
  as = "h2",
  breakBeforeAccent,
  className,
}: SectionHeadProps) {
  return (
    <header className={`${styles.head} ${align === "center" ? styles.center : ""} ${className ?? ""}`}>
      {numeral && (
        <Reveal className={styles.numeral} y={16} amount={0.6}>
          <span aria-hidden="true">{numeral}</span>
        </Reveal>
      )}
      <Reveal y={12} amount={0.6}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <RevealTitle
        as={as}
        lead={titleLead}
        accent={titleAccent}
        className={`h2 ${styles.title}`}
        breakBeforeAccent={breakBeforeAccent}
        delay={0.1}
      />
      {lead && (
        <Reveal delay={0.25} amount={0.5}>
          <p className={`lead ${styles.lead}`}>{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
