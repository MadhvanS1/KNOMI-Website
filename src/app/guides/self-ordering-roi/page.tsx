import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoiCalculator from "./RoiCalculator";
import styles from "./SelfOrderingRoi.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Self-Ordering System ROI Calculator for Restaurants (2026) | KNOMI",
  description:
    "Estimate the staffing and average-order effects of table QR self-ordering in an Indian restaurant, using your own wages, tables, bill sizes and assumptions.",
  alternates: {
    canonical: "/guides/self-ordering-roi",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Self-Ordering System ROI Calculator for Restaurants | KNOMI",
    description:
      "Interactive ROI calculator for restaurant owners. Model staffing, table turns and average-order assumptions for QR self-ordering with your own numbers.",
    url: "https://www.knomi.in/guides/self-ordering-roi",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is the ROI of a self-ordering system for an Indian restaurant?",
    a: "It depends on your floor, so model it with your own numbers. The return comes from two places: staff time (when guests place their own orders, servers spend less time taking orders and more time running food and looking after guests) and average order (a menu that suggests pairings at every table). Weigh those against the cost: KNOMI's Signature plan is ₹250 per table, per month, which is ₹5,000 a month for 20 tables, with 0% commission. Our goal is to lift your average order by around 25%. In the trial we measure it on your own tables, and you see the numbers.",
  },
  {
    q: "Does self-ordering completely replace human restaurant staff?",
    a: "No. Self-ordering takes over the repetitive work of writing down orders and explaining the menu. Your floor staff move from taking orders to running food, checking on tables and looking after guests, which is the part of hospitality guests remember.",
  },
  {
    q: "How does self-ordering reduce kitchen order errors?",
    a: "Guests place orders on their own phones, and each order goes straight to the Kitchen Display System (KDS) or a KOT printer with the table number and preferences (no onion, extra spicy) on the ticket. There is no handwritten slip to misread and no verbal relay to mishear.",
  },
  {
    q: "How does digital QR ordering accelerate table turnover?",
    a: "Part of every table's time goes on waiting: for a menu, for someone to take the order, for the bill. When guests can open the menu and order the moment they sit down, and add another round without flagging down staff, some of that waiting disappears. How much it changes your table turns depends on your service, so time a few tables before and after to find out.",
  },
];

const roiJsonLd = {
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
          name: "Guides",
          item: "https://www.knomi.in/#owners",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Self-Ordering ROI Calculator",
          item: "https://www.knomi.in/guides/self-ordering-roi",
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
      headline: "Restaurant Self-Ordering ROI Calculator",
      description:
        "Estimate what QR self-ordering could mean for your staffing, table time and average bill, using your own numbers and assumptions.",
      url: "https://www.knomi.in/guides/self-ordering-roi",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/self-ordering-roi",
      },
      datePublished: "2026-09-05T18:00:00+05:30",
      dateModified: "2026-09-05T20:00:00+05:30",
      author: {
        "@type": "Person",
        name: "Madhvan Sharma",
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

export default function SelfOrderingRoiPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roiJsonLd) }}
      />

      <Navbar />

      <main className={styles.pageContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#owners">Guides</Link>
              <span>/</span>
              <span style={{ color: "var(--color-text-primary)" }}>
                Self-Ordering ROI Calculator
              </span>
            </nav>

            <h1 className={styles.title}>
              Restaurant Self-Ordering ROI Calculator
            </h1>
            <p className={styles.subtitle}>
              Estimate what QR self-ordering could mean for your staffing, table time and
              average bill, using your own numbers and assumptions.
            </p>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated September 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>

            {/* Answer-First AEO Snippet Box */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>The Quick Answer</span>
              <p className={styles.aeoText}>
                The return on a self-ordering system comes from three places: staff time (guests place
                their own orders, so servers spend less time order-taking), table time (less waiting to
                order or to add another round) and average order (a menu that suggests pairings at every
                table). Set those against what the system costs. Use the calculator below with your own
                wages, tables and bill size; the results are estimates, not promises.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Calculator Section */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <RoiCalculator />
          </div>
        </section>

        {/* Labor Economics Breakdown Section */}
        <section className={styles.mathSection}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <p className="section-label">Operational Economics</p>
              <h2 className="section-heading">How Self-Ordering Changes Restaurant Overhead</h2>
              <p className="section-subheading">
                What changes on the floor when guests in Bangalore, Mumbai or Delhi place their own
                orders instead of waiting for an order-taker.
              </p>
            </div>

            <div className={styles.mathGrid}>
              <div className={styles.mathCard}>
                <h3 className={styles.mathCardTitle}>1. Softening the Cost of Waiter Churn</h3>
                <p className={styles.mathCardDesc}>
                  Front-of-house turnover is a familiar problem in Indian metros, and every new
                  order-taker has to learn the menu before they can describe it well. KNOMI&apos;s
                  illustrated menu presents every dish the same way, every day, however new the
                  team on the floor is.
                </p>
              </div>

              <div className={styles.mathCard}>
                <h3 className={styles.mathCardTitle}>2. Direct KOT Firing</h3>
                <p className={styles.mathCardDesc}>
                  Manual order pads introduce miscommunication, illegible notes, and delay.
                  With KNOMI self-ordering, the order goes straight to your kitchen display the
                  moment the guest confirms, with no walk to the kitchen and no handwritten ticket.
                </p>
              </div>

              <div className={styles.mathCard}>
                <h3 className={styles.mathCardTitle}>3. Faster Table Turnaround</h3>
                <p className={styles.mathCardDesc}>
                  Cutting the time diners spend waiting for paper menus, waiting to flag down staff
                  for another drink, and waiting for the bill can free up table time during peak
                  Friday and Saturday service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`section section--alt ${styles.faqSection}`}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <p className="section-label">Common Inquiries</p>
              <h2 className="section-heading">Frequently Asked Questions</h2>
              <p className="section-subheading">
                Key questions Indian restaurant operators ask before modernizing their dining rooms.
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

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaHeading}>Ready to Transform Your Dining Room?</h2>
              <p className={styles.ctaSub}>
                Book a walkthrough with the founding team. We&apos;ll show you KNOMI on a menu
                like yours and work through the numbers for your floor.
              </p>
              <div className={styles.ctaActions}>
                <a href={bookHref} className="btn btn--primary">
                  Book a walkthrough
                </a>
                <a href="tel:+918123728574" className="btn btn--secondary">
                  Call Sales: +91 81237 28574
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
