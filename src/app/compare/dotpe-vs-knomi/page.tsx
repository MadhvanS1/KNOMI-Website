import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./CompareDotpe.module.css";
import callout from "../Callout.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "DotPe vs KNOMI: Restaurant QR Ordering & Intelligence Comparison (2026)",
  description:
    "Compare DotPe and KNOMI for Indian restaurants, cafes and casual dining: login-first vs browse-first QR menus, per-order fees vs 0% commission, menu design and menu intelligence.",
  alternates: {
    canonical: "/compare/dotpe-vs-knomi",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "DotPe vs KNOMI: Restaurant QR Ordering & Intelligence Comparison",
    description:
      "Comparing DotPe and KNOMI: open browsing vs a login before the menu, 0% commission vs per-transaction fees, upselling at every table, and Knomi Compass menu insights.",
    url: "https://www.knomi.in/compare/dotpe-vs-knomi",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const comparisonMatrix = [
  {
    feature: "Core Focus",
    dotpe: "Digital commerce: QR ordering, payments, online store, takeaway & delivery",
    knomi: "Dine-in guest experience infrastructure: Knomi Host upselling at every table, an illustrated menu and ordering, powered by Knomi Sense",
  },
  {
    feature: "Diner Onboarding Friction",
    dotpe: "Phone number + SMS OTP step reported by diners in some setups",
    knomi: "No app, no login to browse; phone number only to confirm the order",
  },
  {
    feature: "Dine-In Commission",
    dotpe: "Pricing reported to include per-transaction fees plus gateway charges",
    knomi: "0% commission; pricing shared on a walkthrough call",
  },
  {
    feature: "Menu Aesthetics & Branding",
    dotpe: "Standard catalogue-style layout",
    knomi: "Illustrated menu themed to your restaurant, dish by dish",
  },
  {
    feature: "Browsing & Demand Analytics",
    dotpe: "Order and sales reporting",
    knomi: "Knomi Compass, powered by Knomi Sense: dwell time, scroll depth and dishes viewed but not ordered",
  },
  {
    feature: "Guest Recognition",
    dotpe: "Phone-linked customer records",
    knomi: "Knomi Host remembers preferences like no onion or extra spicy",
  },
  {
    feature: "Service Flow",
    dotpe: "QR ordering and payments",
    knomi: "Orders go straight to Knomi Dash, the live orders view and kitchen display; guests can call a server from the menu",
  },
  {
    feature: "End-of-Meal Guest Check-In",
    dotpe: "Depends on setup",
    knomi: "Knomi Pulse asks how the meal went before the bill and alerts your manager if something wasn’t right",
  },
];

const faqs = [
  {
    q: "What is the primary difference between DotPe and KNOMI for restaurants?",
    a: "DotPe is a digital commerce platform: QR ordering, payments, online stores, takeaway and delivery. KNOMI is built for seated dining rooms (cafes, breweries and casual dining) where the guest experience at the table matters most: an illustrated menu themed to your restaurant, Knomi Host suggesting pairings, orders going straight to your kitchen display, and 0% commission.",
  },
  {
    q: "Why do diners object to phone OTP steps before viewing menus?",
    a: "When guests sit down at a restaurant, they want to see the food. Being asked for a phone number and an SMS code just to view the lunch specials can irritate guests, delay service and push them to call a busy server instead. KNOMI's menu opens straight away; guests confirm with their phone number only when they place an order.",
  },
  {
    q: "Does KNOMI charge any percentage of our food and beverage sales?",
    a: "No. KNOMI takes 0% commission, so what your guests order is yours. We share pricing on a short walkthrough call, once we understand your restaurant.",
  },
  {
    q: "What does Knomi Compass show that order reports don't?",
    a: "Order reports show what sold. Knomi Compass, powered by Knomi Sense, shows what guests looked at: how long they linger on each dish, how far they scroll, and which dishes they view but don't order. It places every dish on a 2x2 menu engineering matrix (attention vs orders), so you can see what to rename, re-describe, re-position or re-price.",
  },
  {
    q: "Can KNOMI work with our existing kitchen printers?",
    a: "Yes. Orders appear on KNOMI's kitchen display, which runs in a browser on any tablet or screen, and kitchen order tickets can print to ESC/POS-compatible network thermal printers (80mm or 58mm). Orders reach the kitchen without anyone re-keying them.",
  },
  {
    q: "Does KNOMI need a guest's phone number?",
    a: "Only to confirm an order. Guests browse the menu freely with no app and no login; when they order, they confirm with their phone number. Knomi Host remembers preferences such as no onion or extra spicy, so guests only have to say it once.",
  },
  {
    q: "Can our venue switch from DotPe to KNOMI easily?",
    a: "KNOMI needs no special hardware: guests use their own phones and the kitchen display runs in a browser. We theme your menu to your restaurant, set up the table QR codes and connect your kitchen display or network printers. Book a walkthrough and we'll plan the switch around your service.",
  },
];

const comparisonJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.knomi.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Compare",
          item: "https://www.knomi.in/#owners",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "DotPe vs KNOMI",
          item: "https://www.knomi.in/compare/dotpe-vs-knomi",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@type": "Article",
      headline: "DotPe vs KNOMI: Restaurant QR Ordering & Intelligence Comparison (2026)",
      description:
        "A comparison of dine-in QR ordering in India: login-first vs browse-first menus, commission models, dining room branding and menu intelligence.",
      url: "https://www.knomi.in/compare/dotpe-vs-knomi",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/compare/dotpe-vs-knomi",
      },
      datePublished: "2026-09-05T18:00:00+05:30",
      dateModified: "2026-10-16T12:00:00+05:30",
      author: {
        "@type": "Person",
        name: "Yash Garg",
        jobTitle: "Co-Founder",
        worksFor: {
          "@type": "Organization",
          name: "KNOMI",
        },
      },
      publisher: {
        "@type": "Organization",
        name: "KNOMI",
        logo: {
          "@type": "ImageObject",
          url: "https://www.knomi.in/brand/logo.png",
        },
      },
    },
  ],
};

export default function DotpeVsKnomiPage() {
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
              <span>DotPe vs KNOMI</span>
            </nav>

            <p className="section-label">Software Comparison Guide</p>
            <h1 className={styles.title}>
              DotPe vs KNOMI: Restaurant Ordering &amp; Intelligence (2026)
            </h1>
            <p className={styles.subtitle}>
              A comparison of dine-in QR ordering in India: login-first vs browse-first menus, commission
              models, dining room branding and menu intelligence. We make KNOMI, so we&apos;ve kept the
              claims to what each product does.
            </p>

            <div className={styles.postMeta}>
              <span>By Yash Garg, Co-Founder</span>
              <span>•</span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>

            {/* Answer-First AEO Snippet Box */}
            <div className={`${callout.box} ${styles.aeoBox}`}>
              <span className={callout.label}>The Quick Answer</span>
              <p className={callout.text}>
                DotPe is a digital commerce platform suited to takeaway, delivery and counter ordering. Diners have
                reported a phone number and OTP step before the menu in some DotPe setups, and its pricing has been
                reported to include per-transaction fees. <strong>KNOMI is built for seated dining rooms:</strong> an
                illustrated menu guests open without an app or a login, Knomi Host suggesting pairings, orders going
                straight to your kitchen display, 0% commission on every order, and Knomi Compass menu insights,
                powered by Knomi Sense.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLabel}>Logins to Browse the Menu</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0%</div>
                <div className={styles.statLabel}>Commission on Dine-In Sales</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>Host</div>
                <div className={styles.statLabel}>Suggesting a Pairing at Every Table</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>Live</div>
                <div className={styles.statLabel}>Kitchen Display for Every Order</div>
              </div>
            </div>
          </div>
        </section>

        {/* Head-to-Head Comparison Table */}
        <section className="section section--alt">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p className="section-label">Head to Head</p>
              <h2 className="section-heading">DotPe vs KNOMI: Feature Comparison</h2>
              <p className="section-subheading">
                How a commerce platform differs from a guest experience layer built for the dining room.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th style={{ width: "24%" }}>Capability</th>
                    <th style={{ width: "38%" }}>DotPe</th>
                    <th style={{ width: "38%" }} className={styles.colHighlight}>
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

        {/* Deep Dive Feature Pillars */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p className="section-label">Core Differentiators</p>
              <h2 className="section-heading">Why a Dining Room Might Choose KNOMI over DotPe</h2>
              <p className="section-subheading">
                Four operational differences to weigh for your dining tables.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>1. The Pre-Browse Login Gate Dilemma</span>
                  <span className={styles.pillarTag}>Guest UX</span>
                </div>
                <p className={styles.pillarDesc}>
                  Diners have reported some DotPe-powered QR menus asking for a phone number and an SMS code
                  before they can browse; it depends on how each restaurant&apos;s flow is set up. A login before the
                  menu frustrates guests who just want to see the food. KNOMI opens straight to your menu in the
                  phone&apos;s browser, with no app and no login. Guests confirm with their phone number only when they
                  place an order.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>2. 0% Commission vs Fee Erosion</span>
                  <span className={styles.pillarTag}>Floor Economics</span>
                </div>
                <p className={styles.pillarDesc}>
                  On top of base subscriptions, transactional commerce platforms often charge payment
                  gateway spreads or per-order fees on digital orders. In high-volume months, fees that scale
                  with orders eat into thin restaurant margins. KNOMI takes 0% commission on orders, and we share our
                  pricing on a short walkthrough call, once we understand your restaurant.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>3. Dining Ambiance vs E-Commerce Layout</span>
                  <span className={styles.pillarTag}>Brand Identity</span>
                </div>
                <p className={styles.pillarDesc}>
                  A standard catalogue layout works well for shopping. For craft breweries, rooftop lounges and
                  design-led cafes, the menu is part of the room. KNOMI themes the menu to your restaurant,
                  dish by dish (illustrations, colours and type), so it feels like part of your interior.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarTitle}>
                  <span>4. Invisible Demand vs End-of-Day Receipts</span>
                  <span className={styles.pillarTag}>Knomi Compass</span>
                </div>
                <p className={styles.pillarDesc}>
                  Order-based reports show what sold. Knomi Compass, powered by Knomi Sense, shows what guests looked at:
                  how long they linger on your cocktail list, how far they scroll, and which dishes they view but
                  don&apos;t order. That points you to dishes guests are drawn to but hesitate over, perhaps because of
                  the portion description or the price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Guide: When to Pick Which */}
        <section className="section section--alt">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p className="section-label">Honest Guidance</p>
              <h2 className="section-heading">Which Platform Fits Your Model?</h2>
              <p className="section-subheading">
                The right ordering system depends on which channels matter most to you.
              </p>
            </div>

            <div className={styles.decisionGrid}>
              <div className={styles.decisionCard}>
                <div className={styles.decisionCardHeader}>
                  <h3 className={styles.decisionTitle}>Choose DotPe if:</h3>
                </div>
                <ul className={styles.decisionList}>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You run a takeaway counter, quick-service kiosk or retail outlet where building a customer phone list is a priority.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You need a direct-to-consumer delivery catalogue alongside third-party logistics integrations.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want ordering, payments and an online store from one commerce platform.</span>
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
                    <span>You run a cafe, casual dining restaurant, microbrewery or lounge where the seated dining experience is paramount.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want guests to open the menu and explore freely, with no app and no login before they see the food.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want orders to go straight to the kitchen display, so servers spend the rush with guests rather than carrying chits.</span>
                  </li>
                  <li className={styles.decisionItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>You want 0% commission on dine-in orders, and the option of Knomi Compass browsing insights.</span>
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
              <h2 className="section-heading">Got Questions About DotPe vs KNOMI?</h2>
              <p className="section-subheading">
                Key questions Indian restaurant operators ask when evaluating table ordering solutions.
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
                Eliminate Pre-Browse Menu Friction on Your Tables
              </h2>
              <p className={styles.ctaSub}>
                See KNOMI on a menu like yours in a walkthrough with the founding team: an illustrated menu,
                Knomi Host at every table, and orders that go straight to your kitchen.
              </p>
              <div className={styles.ctaActions}>
                <a href={bookHref} className="btn btn--primary btn--large">
                  Book a Walkthrough
                </a>
                <a
                  href="https://wa.me/918123728574?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20KNOMI%20vs%20DotPe%20for%20my%20restaurant."
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
