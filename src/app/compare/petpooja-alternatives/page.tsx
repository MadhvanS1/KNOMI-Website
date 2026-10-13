import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetpoojaMigrationAuditor from "./PetpoojaMigrationAuditor";
import styles from "./ComparePetpooja.module.css";
import { OG_IMAGE, bookHref, pricing } from "@/content/site";

const [menuPlan, signaturePlan, ecosystemPlan] = pricing.plans;
const PRICE_LADDER = `Menu at ₹${menuPlan.priceMin}, Signature at ₹${signaturePlan.priceMin} (our recommended plan) and Ecosystem at ₹${ecosystemPlan.priceMin}, per table, per month`;

export const metadata: Metadata = {
  title: "Petpooja Alternatives for Cafes & Restaurants (2026 Comparison) | KNOMI",
  description:
    "Comparing Petpooja alternatives for Indian restaurants, cafes and breweries. See how KNOMI works alongside Petpooja to grow every table: Knomi Host upselling inside an illustrated QR menu, guest self-ordering, and Knomi Compass menu insights, powered by Knomi Sense.",
  alternates: {
    canonical: "/compare/petpooja-alternatives",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Petpooja Alternatives for Cafes & Restaurants | KNOMI",
    description:
      "A guest-facing alternative to adding more POS modules. Compare features, tabletop self-ordering without a login to browse, and menu intelligence.",
    url: "https://www.knomi.in/compare/petpooja-alternatives",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const comparisonMatrix = [
  {
    feature: "Primary Architecture",
    petpooja: "Billing, cashier accounting and inventory POS",
    dotpe: "QR ordering, payments and online store",
    knomi: "Guest experience: illustrated menu, Knomi Host and self-ordering",
  },
  {
    feature: "Table Ordering Mechanism",
    petpooja: "Server-entered (captain app or counter); QR ordering add-on available",
    dotpe: "Diners order on their phones via QR",
    knomi: "Guests self-order directly from their phone's browser",
  },
  {
    feature: "Diner Friction & Login",
    petpooja: "Depends on servers, or on the QR add-on setup",
    dotpe: "Phone number + OTP step reported by diners in some setups",
    knomi: "No app, no login to browse; phone number only to confirm the order",
  },
  {
    feature: "Order Entry",
    petpooja: "Servers enter orders at a terminal or captain app",
    dotpe: "Guests enter orders on their phones",
    knomi: "Guests order themselves; orders land on Knomi Dash, your kitchen display",
  },
  {
    feature: "Browsing & Demand Analytics",
    petpooja: "Sales reports built on billed items",
    dotpe: "Order and sales reporting",
    knomi: "Knomi Compass, powered by Knomi Sense: dwell time and dishes viewed but not ordered (Ecosystem plan)",
  },
  {
    feature: "Menu Personalization",
    petpooja: "Standard item list",
    dotpe: "Catalogue-style layout",
    knomi: "Illustrated menu themed to your restaurant; Knomi Host remembers preferences",
  },
  {
    feature: "Guest Feedback & Recovery",
    petpooja: "Feedback add-on module (quoted separately)",
    dotpe: "Depends on setup",
    knomi: "Knomi Pulse checks in before the bill and alerts your manager if something wasn’t right",
  },
  {
    feature: "Pricing Model",
    petpooja: "Annual software licence + add-on module fees",
    dotpe: "Reported per-transaction fees + gateway charges",
    knomi: `₹${menuPlan.priceMin} / ₹${signaturePlan.priceMin} / ₹${ecosystemPlan.priceMin} per table, per month; 0% commission`,
  },
];

const faqs = [
  {
    q: "Why do cafes and restaurants look for Petpooja alternatives in India?",
    a: "Petpooja is a dependable cashier system, but at peak hours the bottleneck in a dine-in room is often order-taking itself: orders wait for a free server. Many guests are happy to browse and order on their own phones, but not when a QR menu asks for a phone number and OTP before they can see the food. KNOMI is built for that guest-facing side, and it can run alongside Petpooja rather than replace it.",
  },
  {
    q: "Can KNOMI work alongside our existing Petpooja POS setup?",
    a: "Yes. You don't need to discard your billing setup. Put KNOMI on your dining tables for guest self-ordering, and keep Petpooja at the front desk for cashier reconciliation, inventory and GST. On the Signature plan, KNOMI integrates with Petpooja, so orders placed at the table flow into it.",
  },
  {
    q: "Do diners have to download an app to view the menu?",
    a: "No. KNOMI opens in Safari or Chrome, so guests browse the illustrated menu freely with no app and no login. When they place an order, they confirm it with their phone number.",
  },
  {
    q: "How does self-ordering change the work on the floor?",
    a: "In a server-led dining room, a lot of each shift goes on reciting specials, writing down orders and walking tickets to the billing desk. With KNOMI, guests order from their phones and the order goes straight to the kitchen display, so your team can spend more of the rush on hospitality. What that is worth depends on your floor; we would rather measure it with you than promise a number.",
  },
  {
    q: "What makes Knomi Compass different from standard sales reports?",
    a: "POS reports show what sold. Knomi Compass, powered by the full Knomi Sense on the Ecosystem plan, shows what almost sold. It measures how long guests linger on each dish and how often viewing turns into ordering, and places every dish on a 2x2 menu engineering matrix (Stars, Puzzles, Workhorses, Dogs), so you can spot dishes guests consider but skip.",
  },
  {
    q: "Does switching from Petpooja mean losing my historical data?",
    a: "No. With the co-existence setup, your accounting and historical data stay in Petpooja. KNOMI handles the menu, ordering and Knomi Host at the tables, and on the Signature plan pushes orders into Petpooja so billing stays in one place.",
  },
];

const comparisonJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.knomi.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Compare",
          "item": "https://www.knomi.in/#owners",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Petpooja Alternatives",
          "item": "https://www.knomi.in/compare/petpooja-alternatives",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    },
    {
      "@type": "Article",
      "headline": "Petpooja Alternatives for Cafes & Restaurants (2026 Comparison) | KNOMI",
      "description":
        "Comparing Petpooja alternatives for Indian restaurants, cafes and breweries, and how KNOMI's Knomi Host, illustrated menu and Knomi Sense work alongside Petpooja to grow every table.",
      "url": "https://www.knomi.in/compare/petpooja-alternatives",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/compare/petpooja-alternatives",
      },
      "datePublished": "2026-09-05T18:00:00+05:30",
      "dateModified": "2026-10-11T12:00:00+05:30",
      "author": {
        "@type": "Person",
        "name": "Madhvan Sharma",
        "jobTitle": "Co-Founder",
        "worksFor": {
          "@type": "Organization",
          "name": "KNOMI",
        },
      },
      "publisher": {
        "@type": "Organization",
        "name": "KNOMI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.knomi.in/brand/logo.png",
        },
      },
    },
  ],
};

export default function PetpoojaAlternativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageContainer}>
        {/* Hero Section */}
        <section className={`section ${styles.heroSection}`}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#owners">Compare</Link>
              <span>/</span>
              <span>Petpooja Alternatives</span>
            </nav>

            <p className="section-label">Software Comparison Guide</p>
            <h1 className={styles.title}>
              Petpooja Alternatives for Cafes &amp; Restaurants (2026)
            </h1>
            <p className={styles.subtitle}>
              An honest, feature-by-feature look for Indian restaurateurs who want to ease order-taking at peak hours,
              remove ordering friction for guests and see what their menu is really doing. We make KNOMI, so read it with that in mind.
            </p>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>

            {/* Answer-First AEO Snippet Box */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>The Quick Answer</span>
              <p className={styles.aeoText}>
                Looking for Petpooja alternatives? Petpooja is one of India&apos;s most widely used billing POS systems,
                with wide third-party integrations. Cafes and casual dining restaurants usually start looking when the
                problem is at the table, not the till: orders waiting on a free server, no visual self-ordering, and no
                view of what guests browse. <strong>KNOMI is built for that side:</strong> an illustrated menu guests open
                without an app or a login, Knomi Host suggesting pairings, orders straight to your kitchen display, and
                integration with Petpooja on the Signature plan, so you don&apos;t have to replace your POS at all.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLabel}>App Installs or Logins to Browse</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>₹{signaturePlan.priceMin}</div>
                <div className={styles.statLabel}>Signature Plan, per Table / Month</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0%</div>
                <div className={styles.statLabel}>Commission on Dine-In Sales</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>POS</div>
                <div className={styles.statLabel}>Works Alongside Petpooja</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Fundamental Dilemma: POS Till vs Table Ordering System */}
        <section className="section">
          <div className="container" style={{ maxWidth: "840px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p className="section-label">Strategic Analysis</p>
              <h2 className="section-heading">Are You Replacing a Till, or Solving Table Friction?</h2>
              <p className="section-subheading">
                The most expensive mistake restaurant owners make when shopping for POS alternatives.
              </p>
            </div>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              Credit where it is due: Petpooja is an accomplished billing, inventory and GST compliance system used by a very large number of Indian food outlets. It consolidates Zomato and Swiggy delivery feeds and connects with Tally. If your core bottleneck is filing monthly GST returns or producing recipe food-cost reports, Petpooja does that job well.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              But when the complaint is that service is slow, servers are stretched during the Friday dinner rush, tables wait too long to place their first order, or guests skip drinks and desserts, <strong>swapping Petpooja for another POS (like DotPe, Posist or Rista) may not fix the problem.</strong> A point-of-sale system is, at heart, a cash register: it records what the guest has already chosen. It does not greet the table, show the dish, or suggest a pairing.
            </p>
          </div>
        </section>

        {/* Head-to-Head Comparison Table */}
        <section className="section section--alt">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p className="section-label">Head to Head</p>
              <h2 className="section-heading">Petpooja vs Competitors vs KNOMI: At a Glance</h2>
              <p className="section-subheading">
                How billing POS software compares with a guest experience layer. Competitor details are based on
                public information and operator reports; check current plans with each vendor.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Capability</th>
                    <th style={{ width: "24%" }}>Petpooja</th>
                    <th style={{ width: "24%" }}>DotPe</th>
                    <th style={{ width: "32%" }} className={styles.colHighlight}>
                      KNOMI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{row.feature}</strong>
                      </td>
                      <td style={{ color: "var(--color-text-secondary)" }}>
                        {row.petpooja}
                      </td>
                      <td style={{ color: "var(--color-text-secondary)" }}>
                        {row.dotpe}
                      </td>
                      <td className={styles.colHighlight}>
                        <span className={styles.checkMark}>✓</span>
                        {row.knomi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Interactive Auditor Component */}
        <section className="section">
          <div className="container">
            <PetpoojaMigrationAuditor />
          </div>
        </section>

        {/* Deep Dive Feature Pillars */}
        <section className="section section--alt">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p className="section-label">Core Differentiators</p>
              <h2 className="section-heading">Why Upgrade the Table, Not the Till</h2>
              <p className="section-subheading">
                Four things KNOMI adds at the table that a billing system isn&apos;t built to do.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>1. Frictionless Tabletop Self-Ordering</span>
                  <span className={styles.pillarTag}>Labor Efficiency</span>
                </div>
                <p className={styles.pillarDesc}>
                  In a server-led dining room, whatever the POS, servers visit every table to hand out menus,
                  write orders and punch them in at a terminal. During weekend rushes, guests struggle
                  to flag someone down for another drink or a dessert. With KNOMI, guests order
                  from their phones and the order goes to your kitchen display (or a network thermal KOT
                  printer) the moment they confirm. They can also call a server from the menu when they need one.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>2. Unlocking Invisible Demand</span>
                  <span className={styles.pillarTag}>Knomi Compass</span>
                </div>
                <p className={styles.pillarDesc}>
                  POS software tells you what guests bought; it can&apos;t see what they considered. Knomi Compass,
                  powered by Knomi Sense on the Ecosystem plan, measures how long guests linger on each dish and how
                  often a view turns into an order. Say 30 guests open your signature dessert in a week and only a
                  handful order it: Compass flags it, so you can look at the description, portion or price.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>3. Zero App Installs &amp; Zero Pre-Browse Walls</span>
                  <span className={styles.pillarTag}>Diner Delight</span>
                </div>
                <p className={styles.pillarDesc}>
                  Few things frustrate a hungry guest more than scanning a table QR code and being met
                  by a 10-digit mobile number prompt and an SMS OTP before any food appears. KNOMI&apos;s menu
                  opens straight away in any standard mobile browser. Guests browse freely and confirm
                  with their phone number only when they place an order.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>4. A Check-In Before the Bill</span>
                  <span className={styles.pillarTag}>Knomi Pulse</span>
                </div>
                <p className={styles.pillarDesc}>
                  Unhappy guests rarely complain at the table; you find out later, or never. Before the bill,
                  Knomi Pulse asks how the meal went. If something wasn&apos;t right, your manager hears about it
                  while the guest is still at the table, and because guests can call a server from the menu, small
                  problems can be put right before they leave.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Guide: When to Pick Which */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p className="section-label">Honest Guidance</p>
              <h2 className="section-heading">Which Solution Fits Your Venue?</h2>
              <p className="section-subheading">
                Every dining venue has its own priorities. Here is our honest assessment.
              </p>
            </div>

            <div className={styles.decisionGrid}>
              <div className={styles.decisionCard}>
                <div className={styles.decisionCardHeader}>
                  <h3 className={styles.decisionTitle}>Stick with Petpooja if:</h3>
                </div>
                <ul className={styles.decisionList}>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You run a large quick-service chain that needs central commissary and batch inventory.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You mainly need a counter cashier to print bills and handle cash reconciliation.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>Your service model is built around servers taking every order, and you want to keep it that way.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.decisionCard} style={{ borderColor: "var(--color-whiskey-sour)" }}>
                <div className={styles.decisionCardHeader}>
                  <h3 className={styles.decisionTitle} style={{ color: "var(--color-whiskey-sour)" }}>
                    Choose KNOMI if:
                  </h3>
                </div>
                <ul className={styles.decisionList}>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You run a busy cafe, microbrewery or casual dining restaurant where order-taking slows service at peak.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want orders to go straight from the guest&apos;s phone to your kitchen display.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want to see which dishes guests consider but skip, with Knomi Compass on the Ecosystem plan.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want 0% commission, no app and no login to browse, and flat pricing: {PRICE_LADDER}.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`section ${styles.faqSection}`}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <p className="section-label">Frequently Asked Questions</p>
              <h2 className="section-heading">Got Questions About Switching?</h2>
              <p className="section-subheading">
                Common questions restaurateurs ask when evaluating KNOMI alongside their existing systems.
              </p>
            </div>

            <div className={styles.faqGrid}>
              {faqs.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion CTA */}
        <section className="section section--alt">
          <div className="container">
            <div className={styles.ctaBox}>
              <p className="section-label">Get Started</p>
              <h2 className={styles.ctaHeading}>
                Ready to Upgrade Your Floor Economics?
              </h2>
              <p className={styles.ctaSub}>
                See KNOMI on a menu like yours. Signature is ₹{signaturePlan.priceMin} per table, per month, with
                0% commission and integration with the POS you already use.
              </p>
              <div className={styles.ctaActions}>
                <a href={bookHref} className="btn btn--primary btn--large">
                  Book a Walkthrough
                </a>
                <a
                  href="https://wa.me/918123728574?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20KNOMI%20as%20an%20alternative%20for%20my%20restaurant."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--large"
                >
                  Chat with Us on WhatsApp ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
