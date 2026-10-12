import Link from "next/link";
import { bookHref, contact, footer, tagline } from "@/content/site";
import { ArrowRight, ArrowUpRight } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import Wordmark from "./ui/Wordmark";
import styles from "./Footer.module.css";

const columns = [
  { title: "KNOMI", links: footer.product, label: "Product" },
  { title: "Compare", links: footer.compare, label: "Comparisons" },
  { title: "Journal", links: footer.guides, label: "Guides", more: { label: "All guides & tools", href: "/guides" } },
];

export default function Footer() {
  return (
    <footer className={`theme-dark ${styles.footer}`} id="footer">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.top}>
          <Reveal className={styles.statement} amount={0.4}>
            <p className={styles.statementText}>
              {tagline.map((line, i) => (
                <span key={line} className={i === 1 ? styles.statementAccent : undefined}>
                  {line}{" "}
                </span>
              ))}
            </p>
            <a href={bookHref} className="btn btn--ink btn--lg">
              Book a walkthrough
              <ArrowRight className="btn__arrow" />
            </a>
          </Reveal>

          <div className={styles.grid}>
            {columns.map((col) => (
              <nav key={col.title} className={styles.col} aria-label={col.label}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul className={styles.list}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={styles.link}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  {col.more && (
                    <li>
                      <Link href={col.more.href} className={`${styles.link} ${styles.more}`}>
                        {col.more.label}
                        <ArrowRight size={13} />
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            ))}

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Talk to us</h2>
              <ul className={styles.list}>
                <li>
                  <a href={contact.phoneHref} className={styles.link}>
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.salesEmail}`} className={styles.link}>
                    {contact.salesEmail}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.supportEmail}`} className={styles.link}>
                    {contact.supportEmail}
                  </a>
                </li>
                <li>
                  <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    WhatsApp <ArrowUpRight />
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    LinkedIn <ArrowUpRight />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav className={styles.cities} aria-label="KNOMI by city">
          <Link href="/solutions" className={styles.citiesLabel}>
            Restaurant ordering by city
          </Link>
          <ul className={styles.citiesList}>
            {footer.cities.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={styles.cityLink}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bottom}>
          <p className={styles.meta}>
            © {new Date().getFullYear()} KNOMI · {footer.blurb}
          </p>
          <ul className={styles.legal}>
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.signature} aria-hidden="true">
        <Wordmark className={styles.signatureMark} title="" />
      </div>
    </footer>
  );
}
