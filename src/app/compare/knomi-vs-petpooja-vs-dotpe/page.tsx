import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceKnomiBox from "@/components/ExperienceKnomiBox";
import styles from "./KnomiPetpoojaDotpe.module.css";
import { OG_IMAGE, bookHref, pricing } from "@/content/site";

const [menuPlan, signaturePlan, ecosystemPlan] = pricing.plans;
const PRICE_LADDER = `Menu at ₹${menuPlan.priceMin}, Signature at ₹${signaturePlan.priceMin} (our recommended plan) and Ecosystem at ₹${ecosystemPlan.priceMin}–${ecosystemPlan.priceMax}, per table, per month`;

// Illustrative 20-table example used in the cost section and FAQ.
const EXAMPLE_TABLES = 20;
const EXAMPLE_SIGNATURE_MONTHLY = EXAMPLE_TABLES * signaturePlan.priceMin;
const EXAMPLE_SIGNATURE_ANNUAL = EXAMPLE_SIGNATURE_MONTHLY * 12;
const inr = (val: number) => val.toLocaleString("en-IN");

export const metadata: Metadata = {
  title: "KNOMI vs Petpooja vs DotPe: 3-Way Restaurant QR Ordering Comparison (2026)",
  description:
    "Compare KNOMI, Petpooja and DotPe for Indian restaurant dine-in ordering: 0% commission vs add-on and per-order pricing, login-first vs browse-first QR menus, and menu intelligence.",
  alternates: {
    canonical: "/compare/knomi-vs-petpooja-vs-dotpe",
  },
  openGraph: {
    title: "KNOMI vs Petpooja vs DotPe: 3-Way Restaurant QR Ordering Comparison",
    description:
      "A 3-way comparison of restaurant ordering systems in India: dine-in experience, login friction, commission and fees, and menu intelligence.",
    url: "https://www.knomi.in/compare/knomi-vs-petpooja-vs-dotpe",
    siteName: "KNOMI",
    images: [
      {
        url: OG_IMAGE.url,
        width: 1200,
        height: 630,
        alt: "KNOMI vs Petpooja vs DotPe Comparison",
      },
    ],
    type: "article",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "KNOMI vs Petpooja vs DotPe: 3-Way Restaurant QR Ordering Comparison",
    description:
      "Compare dine-in ordering platforms in India: 0% commission vs per-order fees, open browsing vs a login before the menu, and kitchen display routing.",
    images: [OG_IMAGE.url],
  },
};

const faqs = [
  {
    q: "What is the key difference between KNOMI, Petpooja and DotPe?",
    a: "Petpooja is a billing-first restaurant POS, with QR ordering available as an add-on module. DotPe is a digital commerce platform for QR ordering, payments and online stores, with pricing reported to include per-transaction fees. KNOMI is guest experience infrastructure for dining rooms: an illustrated menu guests open without an app or a login, Knomi Host suggesting pairings, orders going straight to your kitchen display, 0% commission, and Knomi Sense menu intelligence on the Ecosystem plan.",
  },
  {
    q: "Can we use KNOMI alongside Petpooja without disrupting our current setup?",
    a: "Yes. KNOMI is built to sit alongside your POS, not replace it. Keep Petpooja for billing, GST and accounting, and put KNOMI on the tables. On the Signature plan, KNOMI integrates with Petpooja so orders placed at the table flow into it, and orders also appear on KNOMI's kitchen display or print to network thermal printers.",
  },
  {
    q: "Why do Indian diners dislike QR menus that ask for a phone OTP before browsing?",
    a: "Diners come to restaurants to relax, not to fill in forms. Being asked for a phone number and an SMS OTP just to see the menu can lead some guests to give up and call a server instead. KNOMI's menu opens straight away with no app and no login; guests confirm with their phone number only when they place an order.",
  },
  {
    q: "How does KNOMI help servers during busy peak shifts?",
    a: "In a server-led dining room, much of the rush goes on reciting the menu, writing orders and walking them to the counter. With KNOMI, guests browse, order and re-order drinks or desserts from their own phones, and the order goes straight to the kitchen display. Guests can also call a server from the menu when they need one, so your team spends more of the evening on hospitality.",
  },
  {
    q: "Which system costs less for a 20-table restaurant?",
    a: `KNOMI is a flat fee per table with 0% commission: on Signature, 20 tables cost ₹${inr(EXAMPLE_SIGNATURE_MONTHLY)} a month. Petpooja is priced as an annual licence plus add-on modules, quoted on request. DotPe's pricing has been reported to include per-transaction fees on top of payment gateway charges, so its cost moves with your sales. Ask each vendor for a written quote at your volume.`,
  },
  {
    q: "Does KNOMI require proprietary touchscreen hardware or tablets?",
    a: "No. Guests use their own smartphones, and your kitchen team can view the live kitchen display in a browser on an existing iPad, Android tablet or laptop.",
  },
  {
    q: "How do we get started with KNOMI?",
    a: "Book a walkthrough. We learn about your room, menu and service, theme the menu to your restaurant dish by dish, set up the table QR codes and kitchen display, and show your team how it works.",
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
          name: "KNOMI vs Petpooja vs DotPe",
          item: "https://www.knomi.in/compare/knomi-vs-petpooja-vs-dotpe",
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
      headline: "KNOMI vs Petpooja vs DotPe: 3-Way Restaurant QR Ordering Comparison (2026)",
      description:
        "A 3-way comparison of dine-in restaurant technology in India: login friction, commission and fees, the guest-facing menu and kitchen routing.",
      url: "https://www.knomi.in/compare/knomi-vs-petpooja-vs-dotpe",
      datePublished: "2026-09-06T00:00:00+05:30",
      dateModified: "2026-10-11T12:00:00+05:30",
      author: {
        "@type": "Organization",
        name: "KNOMI",
        url: "https://www.knomi.in",
      },
      publisher: {
        "@type": "Organization",
        name: "KNOMI",
        url: "https://www.knomi.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.knomi.in/images/knomi-logo-light-2.png",
        },
      },
    },
  ],
};

export default function KnomiPetpoojaDotpeComparisonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#owners">Compare</Link>
              <span>/</span>
              <span>KNOMI vs Petpooja vs DotPe</span>
            </nav>

            <h1 className={styles.title}>
              KNOMI vs Petpooja vs DotPe
            </h1>
            <p className={styles.subtitle}>
              A 3-way comparison of how restaurant QR ordering systems in India are built and priced.
              Compare diner onboarding friction, commissions and fees, menu presentation and menu intelligence.
            </p>

            <div className={styles.postMeta}>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Written by the KNOMI team (we make one of the three)</span>
            </div>

            {/* Answer-First AEO Snippet */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>Executive Summary &amp; Key Finding</span>
              <h2 className={styles.aeoHeading}>How Do These Three Platforms Fundamentally Differ?</h2>
              <p className={styles.aeoText}>
                <strong>Petpooja</strong> is a billing-first restaurant POS with QR ordering available as an add-on;{" "}
                <strong>DotPe</strong> is a digital commerce platform for QR ordering, payments and online stores, with
                pricing reported to include per-transaction fees; <strong>KNOMI</strong> is guest experience infrastructure
                for dining rooms: an illustrated menu guests open without an app or a login, Knomi Host suggesting pairings,
                orders going straight to your kitchen display, 0% commission, and Knomi Sense menu intelligence on the Ecosystem plan.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Matrix Table */}
        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="section-label">Head-to-Head Evaluation</p>
              <h2 className={styles.sectionTitle}>3-Way Feature &amp; Capability Matrix</h2>
              <p className={styles.sectionDesc}>
                A point-by-point comparison of dine-in workflows across all three. Competitor details are based on
                public information and operator reports; check current plans with each vendor.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th>Evaluation Dimension</th>
                    <th className={styles.highlightCol}>KNOMI</th>
                    <th>Petpooja (QR Module)</th>
                    <th>DotPe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className={styles.featureName}>Primary Architecture</span>
                      <span className={styles.featureSub}>Core platform focus</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <strong>Dine-In Guest Experience</strong>
                      <br />
                      Built for tables &amp; dining rooms
                    </td>
                    <td>
                      <strong>Billing POS</strong>
                      <br />
                      Counter billing, inventory &amp; accounting
                    </td>
                    <td>
                      <strong>Omni-Channel Commerce</strong>
                      <br />
                      QR ordering, pickup, delivery &amp; online store
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Diner Onboarding Friction</span>
                      <span className={styles.featureSub}>Guest access to menu &amp; order</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.statusCheck}>Browse First</span>
                      <br />
                      No app, no login to browse; phone number to confirm the order
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Web Link</span>
                      <br />
                      Menu linked to the POS; depends on your QR add-on setup
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Varies by Setup</span>
                      <br />
                      Diners report a phone + OTP step before the menu in some setups
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Order Commission / Rev-Share</span>
                      <span className={styles.featureSub}>Take-rate on food sales</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.statusCheck}>0% Commission</span>
                      <br />
                      Flat fee per table, per month
                    </td>
                    <td>
                      <span className={styles.statusCheck}>Licence-Based</span>
                      <br />
                      Base POS licence + add-on modules
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Per-Transaction Fees</span>
                      <br />
                      Reported per-order fees + gateway charges
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Visual Menu Quality</span>
                      <span className={styles.featureSub}>Design &amp; appetite appeal</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <strong>Illustrated Dish Pages</strong>
                      <br />
                      Themed to your restaurant, dish by dish
                    </td>
                    <td>
                      <strong>List-Style Menu</strong>
                      <br />
                      Item names, prices &amp; options
                    </td>
                    <td>
                      <strong>Catalogue Grid</strong>
                      <br />
                      Product-catalogue layout
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Kitchen Display Routing (KDS)</span>
                      <span className={styles.featureSub}>Order dispatch to chefs</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.statusCheck}>Live Kitchen Display</span>
                      <br />
                      Browser-based; network KOT printing too
                    </td>
                    <td>
                      <span className={styles.statusCheck}>KOT Prints + KDS Add-on</span>
                      <br />
                      Counter printing; KDS sold as an add-on
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Varies by Plan</span>
                      <br />
                      Orders via the merchant dashboard and app; ask about KDS options
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Behavioral Demand Analytics</span>
                      <span className={styles.featureSub}>Dwell time &amp; drop-off telemetry</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.statusCheck}>Knomi Sense</span>
                      <br />
                      Dwell time, scroll depth &amp; dishes viewed but not ordered (Ecosystem plan)
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Sales-Based</span>
                      <br />
                      Reports built on billed items
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Order-Based</span>
                      <br />
                      Order and sales reporting
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Guest Memory &amp; Loyalty</span>
                      <span className={styles.featureSub}>Returning guest personalization</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <strong>Knomi Host Remembers</strong>
                      <br />
                      Preferences like no onion or extra spicy
                    </td>
                    <td>
                      <strong>CRM Add-on Module</strong>
                      <br />
                      Customer records captured at billing
                    </td>
                    <td>
                      <strong>Phone-Linked CRM</strong>
                      <br />
                      Customer list &amp; messaging
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Hardware Requirements</span>
                      <span className={styles.featureSub}>Terminal &amp; server dependencies</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.statusCheck}>No Special Hardware</span>
                      <br />
                      Guests use their phones; kitchen display runs in a browser
                    </td>
                    <td>
                      <span className={styles.statusCheck}>Standard Hardware</span>
                      <br />
                      Counter device (PC or tablet) for billing
                    </td>
                    <td>
                      <span className={styles.statusCheck}>Cloud / Smartphone</span>
                      <br />
                      Merchant dashboard via mobile app
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Guest Data (DPDP Act 2023)</span>
                      <span className={styles.featureSub}>When contact details are asked for</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.statusCheck}>At Order Only</span>
                      <br />
                      Phone number asked when the guest confirms an order
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Depends on Setup</span>
                      <br />
                      Review consent terms for CRM modules
                    </td>
                    <td>
                      <span className={styles.statusWarn}>Depends on Setup</span>
                      <br />
                      Review consent and messaging terms
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={styles.featureName}>Pricing Model</span>
                      <span className={styles.featureSub}>Billing structure</span>
                    </td>
                    <td className={styles.highlightCol}>
                      <strong>Flat per Table</strong>
                      <br />
                      ₹{menuPlan.priceMin} / ₹{signaturePlan.priceMin} / ₹{ecosystemPlan.priceMin}–{ecosystemPlan.priceMax} per table, per month; 0% commission
                    </td>
                    <td>
                      <strong>Annual Licence + Add-ons</strong>
                      <br />
                      Quoted on request
                    </td>
                    <td>
                      <strong>Plan Fees + Per-Order Charges</strong>
                      <br />
                      Reported to scale with transactions
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Deep Dive Cards */}
        <section className={styles.contentSectionAlt}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="section-label">In-Depth Analysis</p>
              <h2 className={styles.sectionTitle}>Detailed Platform Breakdown</h2>
              <p className={styles.sectionDesc}>
                The origins and design choices that shape how each tool works on a restaurant floor.
              </p>
            </div>

            <div className={styles.platformGrid}>
              {/* KNOMI */}
              <div className={`${styles.platformCard} ${styles.platformCardKnomi}`}>
                <span className={styles.recommendedTag}>Built for Dining Rooms</span>
                <h3 className={styles.platformName}>KNOMI</h3>
                <p className={styles.platformArchetype}>Guest Experience Infrastructure</p>
                <p className={styles.platformSummary}>
                  Made in Bengaluru for dining rooms. KNOMI turns the QR on your table into an illustrated menu with
                  Knomi Host inside it, sends orders straight to your kitchen display, and on the Ecosystem plan shows
                  the &quot;invisible demand&quot; a billing POS can&apos;t see: dishes guests look at but don&apos;t order.
                </p>

                <div className={styles.prosConsBlock}>
                  <p className={`${styles.listTitle} ${styles.prosTitle}`}>Key Advantages</p>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Open browsing; phone confirmation only when ordering
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      0% commission on dine-in food &amp; beverage sales
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Knomi Host suggests pairings and remembers preferences
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Orders go straight to the kitchen display
                    </li>
                  </ul>

                  <p className={`${styles.listTitle} ${styles.consTitle}`}>Trade-Offs</p>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Not built for warehouse or central-kitchen supply chain
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Focused on dine-in hospitality rather than third-party delivery dispatch
                    </li>
                  </ul>
                </div>
              </div>

              {/* Petpooja */}
              <div className={styles.platformCard}>
                <h3 className={styles.platformName}>Petpooja</h3>
                <p className={styles.platformArchetype}>Billing &amp; Inventory POS</p>
                <p className={styles.platformSummary}>
                  One of India&apos;s most widely used restaurant billing systems. Strong at inventory tracking, recipe
                  costing and GST billing at the cashier desk.
                </p>

                <div className={styles.prosConsBlock}>
                  <p className={`${styles.listTitle} ${styles.prosTitle}`}>Key Advantages</p>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Established inventory and recipe cost control
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Integrations with Swiggy and Zomato
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Offline billing capability
                    </li>
                  </ul>

                  <p className={`${styles.listTitle} ${styles.consTitle}`}>Trade-Offs</p>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      QR ordering is an add-on to a billing-first product
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Reports are built on billed orders, not on browsing
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Add-on modules are priced separately
                    </li>
                  </ul>
                </div>
              </div>

              {/* DotPe */}
              <div className={styles.platformCard}>
                <h3 className={styles.platformName}>DotPe</h3>
                <p className={styles.platformArchetype}>Omni-Channel Commerce &amp; CRM</p>
                <p className={styles.platformSummary}>
                  Built to help merchants, food courts and takeaway outlets sell digitally through QR, WhatsApp and
                  online stores. Strong for quick takeaway, pickup and building a customer list.
                </p>

                <div className={styles.prosConsBlock}>
                  <p className={`${styles.listTitle} ${styles.prosTitle}`}>Key Advantages</p>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      WhatsApp-led ordering and customer messaging
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Convenient for quick counter takeaway and pickup
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCheck}>✓</span>
                      Integrates multiple payment collection options
                    </li>
                  </ul>

                  <p className={`${styles.listTitle} ${styles.consTitle}`}>Trade-Offs</p>
                  <ul className={styles.bulletList}>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Diners report a phone/OTP step before the menu in some setups
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Pricing reported to include per-transaction fees
                    </li>
                    <li className={styles.bulletItem}>
                      <span className={styles.statusCross}>✗</span>
                      Built for commerce first, rather than the seated dining experience
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12-Month Financial ROI Breakdown */}
        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="section-label">Financial Comparison</p>
              <h2 className={styles.sectionTitle}>12-Month Total Cost of Ownership (₹ INR)</h2>
              <p className={styles.sectionDesc}>
                An illustrative example: a 20-table casual dining restaurant doing ₹12,00,000 a month in dine-in sales
                (₹1.44 crore a year).
              </p>
            </div>

            <div className={styles.costBox}>
              <div className={styles.costGrid}>
                <div className={`${styles.costItem} ${styles.costItemKnomi}`}>
                  <p className={styles.costLabel}>KNOMI Signature ({EXAMPLE_TABLES} Tables)</p>
                  <p className={styles.costAmount}>₹{inr(EXAMPLE_SIGNATURE_ANNUAL)} / yr</p>
                  <p className={styles.costNote}>
                    ₹{signaturePlan.priceMin} per table, per month × {EXAMPLE_TABLES} tables = ₹{inr(EXAMPLE_SIGNATURE_MONTHLY)} a month.{" "}
                    <strong>₹0 commission</strong> on the ₹1.44 crore of sales. The fee stays the same however busy the year is.
                  </p>
                </div>

                <div className={styles.costItem}>
                  <p className={styles.costLabel}>Petpooja + QR Add-on</p>
                  <p className={styles.costAmount}>Quote on Request</p>
                  <p className={styles.costNote}>
                    Annual base licence plus add-on modules such as QR ordering, plus hardware. Petpooja doesn&apos;t publish
                    rupee prices; see our <Link href="/compare/petpooja-pricing-breakdown">Petpooja pricing breakdown</Link> for reported figures.
                  </p>
                </div>

                <div className={styles.costItem}>
                  <p className={styles.costLabel}>DotPe</p>
                  <p className={styles.costAmount}>Varies with Volume</p>
                  <p className={styles.costNote}>
                    Pricing has been reported to combine per-transaction fees with payment gateway charges, so the cost
                    rises with your sales. Ask for the full fee schedule in writing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Choose Which */}
        <section className={styles.contentSectionAlt}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="section-label">Operator Decision Framework</p>
              <h2 className={styles.sectionTitle}>Which System Should You Choose?</h2>
              <p className={styles.sectionDesc}>
                Choose the platform that fits your restaurant concept, your guests and your operational goals.
              </p>
            </div>

            <div className={styles.decisionGrid}>
              <div className={styles.decisionCard}>
                <h3 className={styles.decisionHeader}>Choose Petpooja If:</h3>
                <ul className={styles.decisionList}>
                  <li>You need detailed raw-ingredient recipe mapping and multi-store inventory control.</li>
                  <li>Your servers take every order and you mainly need a cashier billing terminal.</li>
                  <li>Offline counter billing matters more to you than guest-facing digital ordering.</li>
                </ul>
              </div>

              <div className={styles.decisionCard}>
                <h3 className={styles.decisionHeader}>Choose DotPe If:</h3>
                <ul className={styles.decisionList}>
                  <li>You run a high-volume takeaway counter or cloud kitchen where customers order ahead.</li>
                  <li>Building a customer list for WhatsApp marketing is a primary objective.</li>
                  <li>You&apos;re comfortable with fees that scale with your order volume.</li>
                </ul>
              </div>

              <div className={styles.decisionCard}>
                <h3 className={styles.decisionHeader}>Choose KNOMI If:</h3>
                <ul className={styles.decisionList}>
                  <li>You run a cafe, brewery, casual dining or fine dining venue where guest experience is paramount.</li>
                  <li>You want guests to open the menu with no app and no login, and confirm with a phone number only when they order.</li>
                  <li>You want 0% commission on a flat, predictable fee per table.</li>
                  <li>You want Knomi Host suggesting pairings at every table, and the option of Knomi Sense menu intelligence.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="section-label">Frequently Asked Questions</p>
              <h2 className={styles.sectionTitle}>Answers for Restaurant Operators</h2>
            </div>

            <div className={styles.faqContainer}>
              {faqs.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion Section */}
        <section style={{ padding: "40px 0 80px" }}>
          <div className="container">
            <ExperienceKnomiBox
              city="India"
              title="Experience Frictionless QR Ordering for Your Restaurant"
              description={`An illustrated menu with Knomi Host inside it, orders straight to your kitchen display, and 0% commission. Plans are ${PRICE_LADDER}.`}
              buttonText="Book a Walkthrough"
              buttonHref={bookHref}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
