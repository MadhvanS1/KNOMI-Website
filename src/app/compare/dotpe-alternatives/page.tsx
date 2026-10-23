import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotPeAlternativesCalculator from "./DotPeAlternativesCalculator";
import styles from "./DotPeAlternatives.module.css";
import callout from "../Callout.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Best DotPe Alternatives for Indian Restaurants (Frictionless Dining & 0% Commission) (2026) | KNOMI",
  description:
    "Looking for DotPe alternatives in India? Compare Petpooja, Posist, Thrive and KNOMI: per-order fees vs 0% commission, login-first QR menus vs open browsing, and menus that suggest pairings.",
  alternates: {
    canonical: "/compare/dotpe-alternatives",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Best DotPe Alternatives for Indian Restaurants (Frictionless Dining & 0% Commission) (2026)",
    description:
      "An honest comparison of DotPe alternatives for cafes and restaurants in India. Compare per-order costs, tabletop self-ordering without a login to browse, and menus built to upsell.",
    url: "https://www.knomi.in/compare/dotpe-alternatives",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What are the best alternatives to DotPe in India?",
    a: "The right alternative depends on the job you need done. For counter billing and inventory accounting, Petpooja and Posist (Restroworks) are widely used POS systems. For the guest-facing side of a dine-in restaurant (an illustrated menu guests can open without a login, a host inside the menu that suggests pairings, and orders that go straight to the kitchen display), KNOMI is built for that job.",
  },
  {
    q: "Why do restaurant owners look for DotPe alternatives?",
    a: "Common reasons include platform fees that grow with order volume, a phone number and OTP step that some diners have reported meeting before they can see the menu, and catalogue-style menus that list dishes without suggesting what goes well with them.",
  },
  {
    q: "How much does DotPe charge restaurants per order?",
    a: "It depends on the plan and contract. DotPe's pricing has been reported to combine per-transaction platform charges with payment gateway fees (MDR), which means the cost rises with your order volume. Before you sign, ask for the full fee schedule in writing, including gateway charges.",
  },
  {
    q: "Are there zero-commission alternatives to DotPe?",
    a: "Yes. KNOMI takes 0% commission on orders, so what your guests order is yours. We share pricing on a short walkthrough call, once we understand your restaurant.",
  },
  {
    q: "Why do some diners dislike QR menus that ask for a phone number first?",
    a: "At the table, guests want to see the food. Being asked for a mobile number and an SMS code before the menu appears can feel like a hurdle, and some guests give up and call a server instead, which defeats the point of a table QR. KNOMI's menu opens straight away with no app and no login; guests confirm with their phone number only when they place an order.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Best DotPe Alternatives for Indian Restaurants (Frictionless Dining & 0% Commission) (2026)",
      "description":
        "A comparison of DotPe alternatives for Indian dining venues: per-order fee models vs 0% commission, login-first vs browse-first QR menus, and menus that suggest pairings.",
      "url": "https://www.knomi.in/compare/dotpe-alternatives",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/compare/dotpe-alternatives",
      },
      "author": {
        "@type": "Person",
        "name": "Madhvan Sharma",
        "jobTitle": "Co-Founder",
        "worksFor": {
          "@type": "Organization",
          "name": "KNOMI",
          "url": "https://www.knomi.in",
        },
        "description":
          "Co-Founder of KNOMI, writing about restaurant economics and guest experience.",
      },
      "publisher": {
        "@type": "Organization",
        "name": "KNOMI",
        "url": "https://www.knomi.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.knomi.in/logo.png",
        },
      },
      "datePublished": "2026-09-06T05:00:00+05:30",
      "dateModified": "2026-10-16T12:00:00+05:30",
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
          "item": "https://www.knomi.in/compare/petpooja-alternatives",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "DotPe Alternatives",
          "item": "https://www.knomi.in/compare/dotpe-alternatives",
        },
      ],
    },
  ],
};

const comparisonMatrix = [
  {
    tool: "DotPe",
    type: "QR Ordering & Payments",
    pricing: "Reported per-order fees + gateway MDR",
    otpRequirement: "Phone number + OTP step reported by diners in some setups",
    upsellingEngine: "Catalogue-style menu",
  },
  {
    tool: "Petpooja",
    type: "Billing & Inventory POS",
    pricing: "Annual software licence + add-on modules",
    otpRequirement: "Server-entered orders, or Petpooja's QR ordering add-on",
    upsellingEngine: "Records orders once they are placed",
  },
  {
    tool: "Posist (Restroworks)",
    type: "Enterprise Chain POS",
    pricing: "Enterprise pricing, quoted per outlet",
    otpRequirement: "Server-entered orders; QR options vary",
    upsellingEngine: "Central sales reporting for chains",
  },
  {
    tool: "Thrive (Hashtag Loyalty)",
    type: "Direct Delivery & Pick-up",
    pricing: "Direct-ordering platform plans (check current pricing)",
    otpRequirement: "Customer details captured for delivery orders",
    upsellingEngine: "Online-ordering catalogue",
  },
  {
    tool: "KNOMI",
    type: "Guest Experience Infrastructure: Host, Menu, Ordering & Upselling",
    pricing: "Shared on a walkthrough call · 0% commission",
    otpRequirement: "No app, no login to browse; phone number only to confirm the order",
    upsellingEngine: "Knomi Host suggests pairings as guests choose",
  },
];

export default function DotPeAlternativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main className={styles.pageContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/compare/petpooja-alternatives">Compare</Link>
              <span>/</span>
              <span>DotPe Alternatives</span>
            </nav>
            <h1 className={styles.title}>
              Best DotPe Alternatives in 2026: Frictionless Ordering &amp; 0% Commission
            </h1>
            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>11 Min Read</span>
            </div>
            <p className={styles.subtitle}>
              DotPe helped Indian restaurants launch QR ordering and take orders directly, away from delivery-app commissions. But as dining rooms grow, fees that scale with every order and a phone-number step before the menu can add friction. Here is an honest look at the main DotPe alternatives. (We make KNOMI, one of the options below, so read it with that in mind.)
            </p>

            {/* Answer-First AEO Snippet Box */}
            <div className={`${callout.box} ${styles.aeoBox}`}>
              <span className={callout.label}>Direct Overview (AEO Summary)</span>
              <p className={callout.text}>
                The best DotPe alternative depends on whether you need a billing cashier or a guest-facing menu. For counter accounting, Petpooja and Posist are established POS systems. For the table, KNOMI is guest experience infrastructure built to grow every bill: an illustrated menu guests can open without a login, with Knomi Host inside it suggesting pairings, orders going straight to your kitchen display, and 0% commission on every order.
              </p>
            </div>

            {/* Metric Highlight Cards */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>0 Apps</div>
                <div className={styles.metricLabel}>No app and no login to browse; guests confirm with their phone number only when they order</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>0%</div>
                <div className={styles.metricLabel}>Commission on orders: what your guests order is yours</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>Host</div>
                <div className={styles.metricLabel}>Knomi Host suggests the right pairing at the moment a guest chooses</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>Live</div>
                <div className={styles.metricLabel}>Kitchen display: orders arrive the moment a guest confirms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className={styles.articleBody}>
          <p>
            During the post-pandemic return of dine-in across India, DotPe became one of the best-known names in restaurant QR ordering. It offered operators an attractive promise: tabletop QR ordering and digital payments that let restaurants take orders directly instead of through delivery aggregators.
          </p>
          <p>
            Running a busy casual dining room, craft brewery or neighbourhood cafe in 2026 asks for more than a digital order pad, though. When hungry guests scan a QR code, a mobile number and SMS OTP step before they can see the menu creates friction. And fee models that charge per order grow fastest on your busiest weekend nights.
          </p>

          <h2>1. Why Restaurants Seek DotPe Alternatives</h2>
          <p>
            Three structural issues are worth weighing if you are thinking about replacing or supplementing DotPe:
          </p>

          <h3>A. The Compounding Per-Order Fee Model</h3>
          <p>
            DotPe&apos;s pricing has been reported to combine a per-transaction platform charge with payment gateway fees; confirm the current structure on your own contract. Even when it is lower than delivery-app commissions, a per-order fee grows with your success: the busier your dining room, the higher the software bill. Say a cafe grows from 1,000 to 4,000 orders a month. At a hypothetical ₹3 per order, the platform fee grows from ₹3,000 to ₹12,000 a month for the same software.
          </p>

          <h3>B. Login Before the Menu</h3>
          <p>
            Some diners have reported DotPe-powered QR menus that ask for a phone number and an SMS OTP before showing the menu; how it behaves depends on how each restaurant&apos;s flow is set up, so check it at your own tables. Where a login comes first, it is a front-of-house bottleneck: in basements, heritage buildings with patchy mobile signal, or with privacy-conscious guests, some tables give up on the QR code and ask a busy server for a paper menu.
          </p>

          <h3>C. A Catalogue Is Not a Host</h3>
          <p>
            Catalogue-style menus list dishes well, but a list does not sell. The opportunity at the table is a menu that suggests the right pairing at the moment a guest chooses (a cold coffee with the brownie, garlic bread with the pizza) the way a good server would, so add-ons are not left to chance on a busy night.
          </p>

          {/* Interactive Calculator Component */}
          <h2>2. Audit Your Tech Drag: Per-Order Fees vs OTP Drop-Offs</h2>
          <p>
            Use the calculator below to estimate what per-order fees cost you at your own volume, or what a login step could cost if some tables give up on it. Every figure is your own input, and every result is an estimate.
          </p>

          <DotPeAlternativesCalculator />

          <h2>3. The Four Distinct Categories of DotPe Alternatives</h2>
          <p>
            Before switching, be clear about the operational problem you need to solve. Alternatives to DotPe fall into four functional lanes:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Primary Category</th>
                  <th>Pricing Architecture</th>
                  <th>Diner Login Friction</th>
                  <th>Table Upselling</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row, idx) => {
                  const isKnomi = row.tool === "KNOMI";
                  return (
                    <tr key={idx}>
                      <td><strong>{row.tool}</strong></td>
                      <td>{row.type}</td>
                      <td className={isKnomi ? styles.tableSuccess : ""}>{row.pricing}</td>
                      <td className={isKnomi ? styles.tableSuccess : ""}>{row.otpRequirement}</td>
                      <td className={isKnomi ? styles.tableHighlight : ""}>{row.upsellingEngine}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h3>Category 1: Flat-Fee Cashier POS (Petpooja)</h3>
          <p>
            If your main reason for leaving DotPe is per-transaction pricing and you need dependable back-office accounting, Petpooja is a logical counter alternative. It is licensed annually, connects with Tally, and its phone support is often praised in public reviews. Its QR ordering is a separate add-on to a billing-first product, so check what that module includes and costs in your quote.
          </p>

          <h3>Category 2: Enterprise Multi-Unit POS (Posist / Restroworks)</h3>
          <p>
            For enterprise dining groups, hotel banquets and large multi-location chains, Posist offers multi-branch commissary tracking and recipe variance reporting. It is built for larger operations, so a standalone cafe or bar may find it more system than it needs.
          </p>

          <h3>Category 3: Direct Delivery Ordering (Thrive)</h3>
          <p>
            If your goal is capturing customer details for home delivery and pickup orders, Thrive (formerly Hashtag Loyalty) specialises in direct delivery microsites and WhatsApp campaigns. For in-house dine-in service, a delivery-first checkout is designed for a different moment.
          </p>

          <h3>Category 4: Tabletop Visual Intelligence &amp; Frictionless Self-Ordering (KNOMI)</h3>
          <p>
            If your objective is a warmer guest experience at the table, fewer orders waiting on a free server, and higher table spend without paying per-order commissions, <strong>KNOMI is built for the table</strong>.
          </p>
          <ul>
            <li><strong>No Login to Browse:</strong> Guests scan and the menu opens in Safari or Chrome. No app, no account. They confirm with their phone number only when they place an order.</li>
            <li><strong>0% Commission:</strong> What your guests order is yours. We share pricing on a short <Link href={bookHref} className={styles.inlineLink}>walkthrough call</Link>, once we understand your restaurant, and you can <Link href="/#worth" className={styles.inlineLink}>see what upselling could be worth</Link> on your own numbers first.</li>
            <li><strong>Knomi Host:</strong> A warm host inside your illustrated menu (Knomi Canvas, themed to your restaurant) who suggests the right pairing at the right moment and remembers preferences like no onion or extra spicy.</li>
            <li><strong>Knomi Pulse:</strong> Before the bill, Pulse asks how the meal went. If something wasn&apos;t right, your manager hears about it while the guest is still at the table.</li>
            <li><strong>Invisible Demand Intelligence (Knomi Compass):</strong> Knomi Compass, powered by Knomi Sense, measures how long guests linger on each dish and how often viewing turns into ordering, and places every dish on a 2x2 menu engineering matrix.</li>
          </ul>

          <h2>4. The Best of Both Worlds: The Co-Existence Architecture</h2>
          <p>
            Many owners assume they must &quot;rip and replace&quot; to modernise. Often the simplest path is a combined stack:
          </p>
          <div className={`${callout.box} ${styles.calloutBox}`}>
            <div className={callout.title}>The Co-Existence Blueprint</div>
            <p className={callout.text}>
              • <strong>Counter Billing &amp; GST:</strong> Keep a cashier POS (such as Petpooja) at the front desk for GST invoices and end-of-day cash reconciliation.<br />
              • <strong>Tabletop Ordering &amp; Intelligence:</strong> Put KNOMI on the tables for guest self-ordering, Knomi Host pairings and a Knomi Pulse check-in that alerts your manager before the bill. KNOMI integrates with the POS you already use.
            </p>
          </div>
          <p>
            This gives you 0% commission on table orders, lets guests see the menu before anyone asks for their number, and keeps your accounting exactly where it is.
          </p>

          {/* Author Bio Box */}
          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan co-founded KNOMI in Bengaluru to help restaurants know every guest and grow every table. He writes about restaurant economics and guest experience.
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions Section */}
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions About DotPe Alternatives</h2>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          {/* CTA Conversion Box */}
          <div className={styles.ctaCard}>
            <h3>Ready to Remove the Pre-Browse Login at Your Tables?</h3>
            <p>
              KNOMI helps you grow every table: Knomi Host suggests the right dish inside an illustrated menu themed to your room. No app, no login to browse, and 0% commission. We share pricing on a short walkthrough call, once we understand your restaurant.
            </p>
            <Link href="/compare/dotpe-vs-knomi" className={`${styles.ctaButton} pressable`}>
              Compare DotPe vs KNOMI Head-to-Head
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
