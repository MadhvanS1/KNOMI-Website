import Link from "next/link";
import { bookHref, navLabels } from "@/content/site";
import { ArrowRight } from "./ui/Icons";
import styles from "./ExperienceKnomiBox.module.css";

export interface ExperienceKnomiBoxProps {
  city: string;
  title?: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

/** The closing call to action on guide, compare and city pages, in the homepage's own style:
 *  serif headline, short line, ink button. A trailing "→" in `buttonText` becomes the button's arrow. */
export default function ExperienceKnomiBox({
  city,
  title,
  description,
  buttonText,
  buttonHref = bookHref,
  className,
}: ExperienceKnomiBoxProps) {
  const displayTitle = title || `Experience KNOMI on your ${city} dining floor`;
  const label = (buttonText || navLabels.book).replace(/\s*→\s*$/, "");

  return (
    <div className={`${styles.ctaBox} ${className ?? ""}`.trim()}>
      <h2 className={styles.ctaTitle}>{displayTitle}</h2>
      <p className={styles.ctaText}>{description}</p>
      <Link href={buttonHref} className={`btn btn--ink ${styles.ctaButton}`}>
        {label}
        <ArrowRight className="btn__arrow" />
      </Link>
    </div>
  );
}
