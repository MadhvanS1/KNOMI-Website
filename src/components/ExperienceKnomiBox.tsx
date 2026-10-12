import Link from "next/link";
import styles from "./ExperienceKnomiBox.module.css";
import { bookHref } from "@/content/site";

export interface ExperienceKnomiBoxProps {
  city: string;
  title?: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export default function ExperienceKnomiBox({
  city,
  title,
  description,
  buttonText,
  buttonHref = bookHref,
  className,
}: ExperienceKnomiBoxProps) {
  const displayTitle = title || ('Experience KNOMI on Your ' + city + ' Dining Floor');
  const displayButtonText = buttonText || 'Book a walkthrough →';

  return (
    <div className={(styles.ctaBox + (className ? ' ' + className : '')).trim()}>
      <h2 className={styles.ctaTitle}>{displayTitle}</h2>
      <p className={styles.ctaText}>{description}</p>
      <Link href={buttonHref} className={styles.ctaButton}>
        {displayButtonText}
      </Link>
    </div>
  );
}
