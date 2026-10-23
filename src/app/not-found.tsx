import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found | KNOMI",
  robots: { index: false, follow: true },
};

// copy: 404 page
const COPY = {
  eyebrow: "Error 404",
  titleLead: "This table isn’t on",
  titleAccent: "our floor plan.",
  lead: "The page you were looking for has moved, or was never here. Let us show you back to your seat.",
  home: "Back to the homepage",
  journal: "Browse the journal",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={`wrap ${styles.inner}`}>
          <div className={styles.doorway} aria-hidden="true">
            <span className={styles.numeral}>404</span>
          </div>

          <div className={styles.copy}>
            <Reveal immediate delay={0.1} y={12}>
              <p className="eyebrow">{COPY.eyebrow}</p>
            </Reveal>
            <RevealTitle
              as="h1"
              immediate
              delay={0.2}
              lead={COPY.titleLead}
              accent={COPY.titleAccent}
              breakBeforeAccent
              className={`h1 ${styles.title}`}
            />
            <Reveal immediate fade={false} delay={0.45} y={16}>
              <p className="lead">{COPY.lead}</p>
            </Reveal>
            <Reveal immediate delay={0.6} y={16} className={styles.actions}>
              <Link href="/" className="btn btn--ink btn--lg">
                {COPY.home}
                <ArrowRight className="btn__arrow" />
              </Link>
              <Link href="/guides" className={`link pressable ${styles.journal}`}>
                {COPY.journal}
              </Link>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
