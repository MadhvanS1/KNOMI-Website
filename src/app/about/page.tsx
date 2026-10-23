import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHead from "@/components/ui/SectionHead";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { booking, contact, hero, tagline } from "@/content/site";
import styles from "./About.module.css";
import { OG_IMAGE } from "@/content/site";

/* =====================================================================
   About KNOMI
   I.   A doorway: the headline, then an arch that opens onto the city.
   II.  A short letter from the founders on why hospitality should remember.
   III. House rules: three principles, set like a printed menu.
   IV.  The founders, as monograms in arched niches.
   V.   A dark doorway band: the tagline over the door, and the walkthrough.
   ===================================================================== */

// copy: about hero
const HERO_COPY = {
  eyebrow: "About KNOMI",
  titleLead: "We're building hospitality that",
  titleAccent: "remembers you.",
  lead:
    "KNOMI is guest experience infrastructure that helps restaurants grow. Knomi Sense remembers every guest, Knomi Host suggests the right dish at every table, and it all sits alongside the tools you already use. We're a small team in Bengaluru.",
  foundersLink: "Meet the founders",
  skylineAlt: "Hand-drawn sepia sketch of a city skyline and a café table set for two under an umbrella",
};

// copy: why we built it (a short letter, signed by the founders)
const WHY_COPY = {
  eyebrow: "Why we built it",
  titleLead: "Hospitality is",
  titleAccent: "remembered.",
  opening:
    "Great restaurants are remembered for how they made you feel — the table that was ready, the server who knew your order, the dessert you hadn't planned on and were glad you had.",
  menu:
    "The menu is the one thing every guest reads. Yet most digital menus are a PDF of the price list: they look like software, and they forget the guest the moment the phone goes back in a pocket.",
  pullLead: "We want every table to have",
  pullAccent: "your best server",
  pullTail: "— someone who knows what's good, remembers what you like, and suggests what's next.",
  pos:
    "And we want it to sit quietly alongside the POS you already use, not replace it. Nothing to rip out, no new habits for your team — just a warmer conversation at every table, and a bigger bill at the end of it.",
  signature: "Yash & Madhvan",
  signatureRole: "Co-founders, KNOMI",
};

// copy: what we believe
const BELIEFS_COPY = {
  eyebrow: "What we believe",
  titleLead: "Our house",
  titleAccent: "rules.",
  lead: "Three things that decide what we build, and what we leave out.",
};

// copy: the three principles
const PRINCIPLES = [
  {
    numeral: "I",
    lead: "Furniture,",
    accent: "not tech.",
    body: "KNOMI should feel like part of your interior, as considered as the chairs and the lighting — not software bolted onto the table. If a guest notices the technology before the food, we've got it wrong.",
  },
  {
    numeral: "II",
    lead: "Hospitality",
    accent: "first.",
    body: "Every feature has to earn its place by making a guest feel looked after. If it only makes a chart look better, it doesn't ship.",
  },
  {
    numeral: "III",
    lead: "Honest",
    accent: "numbers.",
    body: "We don't quote results we haven't earned. We measure on your own tables, with your own data, and show you exactly what changed.",
  },
];

// copy: the founders
const FOUNDERS_COPY = {
  eyebrow: "The founders",
  titleLead: "Who's at",
  titleAccent: "the table.",
  lead: "The people you'll meet when you book a walkthrough.",
};

const FOUNDERS = [
  {
    initials: ["Y", "G"],
    name: "Yash Garg",
    role: "Co-founder, product & engineering",
    line: "Builds Knomi Sense and everything it powers, from the menu to the host.",
  },
  {
    initials: ["M", "S"],
    name: "Madhvan Sharma",
    role: "Co-founder, business & operations",
    line: "Works with restaurants on rollout, pricing and operations.",
  },
];

export const metadata: Metadata = {
  title: "About KNOMI | Guest experience infrastructure for restaurants",
  description:
    "KNOMI helps restaurants grow, upsell and look after every guest. Knomi Sense remembers every guest and Knomi Host suggests the right dish at every table. Built by a small team in Bengaluru to sit alongside the POS you already use.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "About KNOMI | Guest experience infrastructure for restaurants",
    description:
      "Every guest known, every table grown. Built in Bengaluru, alongside the tools restaurants already use.",
    url: "https://www.knomi.in/about",
    siteName: "KNOMI",
    type: "website",
    locale: "en_IN",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Organization",
    name: "KNOMI",
    legalName: "KNOMI",
    url: "https://www.knomi.in",
    logo: "https://www.knomi.in/logo.png",
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    telephone: "+91 81237 28574",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 81237 28574",
        contactType: "sales",
        email: "sales@knomi.in",
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 81237 28574",
        contactType: "customer support",
        email: "support@knomi.in",
        areaServed: "IN",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/ra-knomi/",
      "https://www.wikidata.org/wiki/Q141277639",
    ],
    description: "Guest experience infrastructure that helps restaurants grow, upsell and look after every guest. Built in Bengaluru.",
    founder: [
      {
        "@type": "Person",
        name: "Yash Garg",
        jobTitle: "Co-Founder",
        description: "Co-founder of KNOMI, leading product and engineering.",
      },
      {
        "@type": "Person",
        name: "Madhvan Sharma",
        jobTitle: "Co-Founder",
        description: "Co-founder of KNOMI, leading business and operations.",
      },
    ],
  },
};

/** The tagline, set like an inscription over a doorway (decorative; the footer carries it as text). */
const INSCRIPTION = tagline
  .map((line) => line.replace(/\.$/, ""))
  .join("  ·  ")
  .toUpperCase();

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 2.25v9.5m0 0L3 7.75m4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />

      <main className={styles.page}>
        {/* ---------- I. Hero: the doorway ---------- */}
        <section className={styles.hero}>
          <div className="wrap">
            <Reveal immediate delay={0.1} y={12}>
              <p className="eyebrow">{HERO_COPY.eyebrow}</p>
            </Reveal>

            <RevealTitle
              as="h1"
              immediate
              delay={0.2}
              lead={HERO_COPY.titleLead}
              accent={HERO_COPY.titleAccent}
              breakBeforeAccent
              className={`h1 ${styles.heroTitle}`}
            />

            <div className={styles.heroMeta}>
              <Reveal immediate delay={0.5} className={styles.heroLeadWrap}>
                <p className={`lead ${styles.heroLead}`}>{HERO_COPY.lead}</p>
              </Reveal>

              <Reveal immediate delay={0.6} y={14} className={styles.heroAside}>
                <p className={styles.place}>{contact.city}</p>
                <div className={styles.heroLinks}>
                  <Link href="/#book" className={`link pressable ${styles.heroLink}`}>
                    {hero.primaryCta.label}
                    <ArrowRight className={styles.heroLinkIcon} />
                  </Link>
                  <a href="#founders" className={`link pressable ${styles.heroLink} ${styles.heroLinkQuiet}`}>
                    {HERO_COPY.foundersLink}
                    <ArrowDown className={styles.heroLinkIconDown} />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* The arch opens onto the next room: its floor is the linen of the section below. */}
            <div className={styles.plate}>
              <div className={styles.arch}>
                <span className={styles.archRule} aria-hidden="true" />
                <span className={`ornament ${styles.archStar}`} aria-hidden="true" />
                <div className={styles.skyline}>
                  <Image
                    src="/images/illustrations/skyline-cafe.webp"
                    alt={HERO_COPY.skylineAlt}
                    width={854}
                    height={360}
                    loading="eager"
                    sizes="(max-width: 640px) 160vw, (max-width: 900px) 100vw, 900px"
                    className={styles.skylineImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- II. Why we built it: a short letter ---------- */}
        <section className={`section section--alt ${styles.why}`}>
          <div className={`wrap ${styles.whyGrid}`}>
            <div className={styles.whyHead}>
              <SectionHead
                eyebrow={WHY_COPY.eyebrow}
                titleLead={WHY_COPY.titleLead}
                titleAccent={WHY_COPY.titleAccent}
                accentStyle="plain"
                breakBeforeAccent
              />
            </div>

            <div className={styles.letter}>
              <Reveal>
                <p className={styles.opening}>{WHY_COPY.opening}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className={styles.body}>{WHY_COPY.menu}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className={styles.pull}>
                  {WHY_COPY.pullLead} <em>{WHY_COPY.pullAccent}</em> {WHY_COPY.pullTail}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className={styles.body}>{WHY_COPY.pos}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={styles.signoff}>
                  <span className={styles.signName}>{WHY_COPY.signature}</span>
                  <span className={styles.signRole}>{WHY_COPY.signatureRole}</span>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- III. What we believe: house rules ---------- */}
        <section className={`section ${styles.beliefs}`}>
          <div className="wrap">
            <SectionHead
              eyebrow={BELIEFS_COPY.eyebrow}
              titleLead={BELIEFS_COPY.titleLead}
              titleAccent={BELIEFS_COPY.titleAccent}
              accentStyle="plain"
              lead={BELIEFS_COPY.lead}
            />

            <ol className={styles.rules}>
              {PRINCIPLES.map((p) => (
                <Reveal as="li" key={p.numeral} className={styles.rule}>
                  <span className={styles.ruleNum} aria-hidden="true">
                    <span className={styles.ruleNumText}>{p.numeral}</span>
                  </span>
                  <h3 className={styles.ruleTitle}>
                    {p.lead} {p.accent}
                  </h3>
                  <p className={styles.ruleBody}>{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- IV. The founders ---------- */}
        <section id="founders" className={`section section--alt ${styles.people}`}>
          <div className="wrap">
            <SectionHead
              eyebrow={FOUNDERS_COPY.eyebrow}
              titleLead={FOUNDERS_COPY.titleLead}
              titleAccent={FOUNDERS_COPY.titleAccent}
              accentStyle="plain"
              lead={FOUNDERS_COPY.lead}
            />

            <Stagger className={styles.founders} stagger={0.06}>
              {FOUNDERS.map((f) => (
                <StaggerItem as="article" key={f.name} className={styles.founder}>
                  <div className={styles.niche} aria-hidden="true">
                    <span className={styles.nicheRule} />
                    <span className={styles.monogram}>
                      {f.initials[0]}
                      <em>{f.initials[1]}</em>
                    </span>
                  </div>
                  <div className={styles.founderText}>
                    <h3 className={styles.founderName}>{f.name}</h3>
                    <p className={styles.founderRole}>{f.role}</p>
                    <p className={styles.founderLine}>{f.line}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- V. Closing: a dark doorway ---------- */}
        <section className={styles.closing}>
          <div className="wrap">
            <Reveal className={`theme-dark ${styles.band}`}>
              {/* A doorway in brass hairline with the tagline carved over it. */}
              <div className={styles.door} aria-hidden="true">
                <svg className={styles.doorSvg} viewBox="0 0 640 700" fill="none">
                  <defs>
                    <path id="about-door-inscription" d="M-17.5 320a337.5 337.5 0 0 1 675 0" />
                  </defs>
                  <path className={styles.doorOuter} pathLength={1} d="M0.5 700V320a319.5 319.5 0 0 1 639 0v380" />
                  <path className={styles.doorInner} pathLength={1} d="M14.5 700V320a305.5 305.5 0 0 1 611 0v380" />
                  <text className={styles.doorText}>
                    <textPath href="#about-door-inscription" startOffset="50%" textAnchor="middle">
                      {INSCRIPTION}
                    </textPath>
                  </text>
                </svg>
              </div>

              <RevealTitle
                lead={booking.titleLead}
                accent={booking.titleAccent}
                accentStyle="plain"
                breakBeforeAccent
                className={styles.bandTitle}
              />

              <p className={styles.bandLead}>{booking.lead}</p>

              <Link href="/#book" className={`btn btn--ink btn--lg ${styles.bandCta}`}>
                {hero.primaryCta.label}
                <ArrowRight className="btn__arrow" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
