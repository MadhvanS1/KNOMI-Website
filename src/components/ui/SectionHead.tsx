import { Reveal, RevealTitle } from "./Reveal";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  /** One small label above the headline. Optional: most heads read better without one. */
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  lead?: string;
  /** @deprecated Chapter numerals are no longer drawn. Accepted and ignored. */
  numeral?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  breakBeforeAccent?: boolean;
  className?: string;
  /** Word-by-word headline rise. Reserved for the three chapter openers. */
  words?: boolean;
  /** "plain" sets the accent words in roman ink instead of the italic russet accent. */
  accentStyle?: "italic" | "plain";
  /** "auto" (default) sets the lead beside the headline when the head is wide (1024px+
   *  and at least 880px across); "stack" keeps it underneath at every width. */
  layout?: "auto" | "stack";
};

/** Optional eyebrow + serif headline + lead. The one header pattern for every section. */
export default function SectionHead({
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  align = "left",
  as = "h2",
  breakBeforeAccent,
  className,
  words,
  accentStyle,
  layout = "auto",
}: SectionHeadProps) {
  const split = Boolean(lead) && layout === "auto" && align === "left";
  const classes = [styles.head, align === "center" && styles.center, split && styles.split, className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className={styles.inner}>
        <div className={styles.main}>
          {eyebrow && (
            <Reveal as="p" className="eyebrow" y={10}>
              {eyebrow}
            </Reveal>
          )}
          <RevealTitle
            as={as}
            lead={titleLead}
            accent={titleAccent}
            className={`h2 ${styles.title}`}
            breakBeforeAccent={breakBeforeAccent}
            words={words}
            accentStyle={accentStyle}
            delay={0.04}
          />
        </div>
        {lead && (
          <Reveal as="p" className={`lead ${styles.lead}`} delay={0.1}>
            {lead}
          </Reveal>
        )}
      </div>
    </header>
  );
}
