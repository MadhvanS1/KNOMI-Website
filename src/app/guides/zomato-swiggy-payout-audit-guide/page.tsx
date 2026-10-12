import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PayoutReconciliationAuditor from "./PayoutReconciliationAuditor";
import styles from "./PayoutGuide.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Zomato & Swiggy Payout Cycles: How to Audit Deductions (2026) | KNOMI",
  description:
    "Master Zomato and Swiggy weekly payout cycles, audit bank settlements against POS sales, reconcile customer refund clawbacks, and raise evidence-backed disputes.",
  alternates: {
    canonical: "/guides/zomato-swiggy-payout-audit-guide",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Zomato & Swiggy Payout Cycles: How to Audit Deductions (2026)",
    description:
      "A complete operational guide to auditing Zomato and Swiggy payout cycles. Learn how weekly and daily payouts work, spot easy-to-miss deductions, and reconcile bank settlements.",
    url: "https://www.knomi.in/guides/zomato-swiggy-payout-audit-guide",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "How often do Zomato and Swiggy pay restaurants?",
    a: "Both platforms generally settle restaurant payouts on a weekly cycle by default, paid into your registered bank account with an itemised settlement statement in the partner portal. The exact cut-off and credit day depend on your partner agreement and on bank holidays, so note the day your credits usually land and check it every week.",
  },
  {
    q: "Who qualifies for Zomato's daily payout option and how does it work?",
    a: "Zomato announced daily payouts for restaurant partners in late 2023. As reported at the time, the option was aimed at smaller partners and settles on a rolling basis, with each day's payout covering orders from a few days earlier (reported as T+3). Eligibility and terms can change, so check the current details in your partner app. Larger restaurants are generally on the standard weekly cycle.",
  },
  {
    q: "Why is my weekly Zomato or Swiggy bank payout lower than expected?",
    a: "The gap is usually a set of line-item deductions rather than a calculation error: commission, 18% GST on that commission (which a standalone restaurant on 5% GST cannot claim back), payment gateway fees, customer refunds for reported spillage or missing items, cancellation charges, and in-app advertising spend if you run campaigns. Comparing your POS gross sales directly to your bank credit without subtracting these line items creates false alarms.",
  },
  {
    q: "How do customer refunds and cancellations get deducted from restaurant payouts?",
    a: "When a customer reports spillage, incorrect packaging, or cold food, the platform may issue a full or partial refund. Depending on the complaint and your partner agreement, that amount can be deducted from your upcoming settlement. If an order is cancelled after your kitchen prepared it because a rider was delayed, check whether the cancellation was charged to your account; if it was, disputing it with evidence, within the platform's dispute window, is how you contest it.",
  },
  {
    q: "What is the step-by-step process to dispute a deduction on the partner app?",
    a: "To dispute a deduction you believe is wrong: 1) Download the itemized order-level CSV from the Merchant Partner portal; 2) Filter for negative adjustment rows (refunds, penalties, cancellations); 3) Collect hard evidence (Kitchen Order Ticket timestamp, dispatch packaging photos, or CCTV footage showing dispatch); 4) Raise a specific dispute ticket in the Partner App citing the exact Order ID, within the dispute window set in your partner agreement; 5) If the ticket is rejected and you have an assigned account manager, escalate it to them.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Zomato and Swiggy Payout Cycles: How to Audit Deductions (2026)",
      description:
        "Master Zomato and Swiggy weekly payout cycles, audit bank settlements against POS sales, reconcile customer refund clawbacks, and raise evidence-backed disputes.",
      url: "https://www.knomi.in/guides/zomato-swiggy-payout-audit-guide",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/zomato-swiggy-payout-audit-guide",
      },
      author: {
        "@type": "Person",
        name: "Madhvan Sharma",
        jobTitle: "Co-Founder",
        worksFor: {
          "@type": "Organization",
          name: "KNOMI",
          url: "https://www.knomi.in",
        },
        description: "Co-Founder of KNOMI.",
      },
      publisher: {
        "@type": "Organization",
        name: "KNOMI",
        url: "https://www.knomi.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.knomi.in/logo.png",
        },
      },
      datePublished: "2026-09-06T01:30:00+05:30",
      dateModified: "2026-09-06T01:30:00+05:30",
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
          item: "https://www.knomi.in/guides",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Zomato & Swiggy Payout Cycles & Audit",
          item: "https://www.knomi.in/guides/zomato-swiggy-payout-audit-guide",
        },
      ],
    },
  ],
};

export default function AggregatorPayoutGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageContainer}>
        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span>Zomato & Swiggy Payout Audit Guide</span>
          </div>

          <h1 className={styles.title}>
            Zomato & Swiggy Payout Cycles: How to Audit Weekly Deductions (2026)
          </h1>

          <div className={styles.postMeta}>
            <span>By Madhvan Sharma, Co-Founder</span>
            <span>•</span>
            <span>Published September 2026</span>
            <span>•</span>
            <span>11 Min Read</span>
            <span>•</span>
            <span>Financial Operations</span>
          </div>

          <p className={styles.subtitle}>
            Waiting for your delivery money to hit the bank is only half the battle. Discover how weekly
            settlement cycles work, decode easy-to-miss deductions and customer refund clawbacks, and use a
            3-tier audit protocol so every deduction on your statement is one you understand.
          </p>

          {/* Answer-First AEO Callout Box */}
          <div className={styles.aeoBox}>
            <span className={styles.aeoLabel}>Weekly Settlement Protocol (AEO Summary)</span>
            <p className={styles.aeoText}>
              Zomato and Swiggy generally settle restaurant partner accounts on a weekly cycle by default, and
              Zomato announced a daily payout option for smaller partners in late 2023. Weekly payouts can be
              reduced by line items that are easy to miss: customer refunds, cancellation charges and in-app
              advertising spend. Reconcile your own POS order log against the platform settlement file every week
              to find anything you can&apos;t explain.
            </p>
          </div>

          {/* Takeaway Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Weekly</div>
              <div className={styles.metricLabel}>
                Default Settlement Cycle: your partner agreement sets the exact cut-off and credit day.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Daily Option</div>
              <div className={styles.metricLabel}>
                Zomato Daily Payouts: announced in late 2023 for smaller partners (reported as T+3).
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Line by Line</div>
              <div className={styles.metricLabel}>
                How to Audit: check every refund and penalty row against your own POS and KOT records.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Time-Limited</div>
              <div className={styles.metricLabel}>
                Dispute Window: platforms accept deduction disputes only for a limited period. Check your agreement.
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className={styles.articleBody}>
          <h2>The Payout Calendar: When Your Delivery Money Actually Arrives</h2>
          <p>
            For any independent restaurant or cloud kitchen in India, cash flow is oxygen. You purchase raw
            vegetables and poultry from the mandi every morning in cash, pay your cooks on the 1st of the month,
            and pay commercial LPG cylinder vendors on delivery.
          </p>
          <p>
            Yet food aggregators do not operate in cash: they operate on institutional settlement batches.
            Understanding the exact calendar mechanics of when your money lands is vital to preventing weekend
            working capital crunches:
          </p>
          <ul>
            <li>
              <strong>The Default Weekly Cycle:</strong> On both Zomato and Swiggy, the default settlement period is
              generally a week of orders. The statement is prepared after the week closes and the bank transfer
              follows <strong>a few days later</strong>. Your partner agreement and past statements tell you the
              exact cut-off and the day credits usually land.
            </li>
            <li>
              <strong>Bank Holiday Delays:</strong> Because payouts move through standard banking channels, public
              holidays and bank holidays (including second and fourth Saturdays) can push a credit back.
            </li>
            <li>
              <strong>The Settlement Float:</strong> Say your weekly cycle closes on Sunday night and the credit lands
              the following Thursday. A ₹1,200 family dinner order dispatched on Friday night then reaches your bank
              <strong>six days after the food was eaten</strong>, and an order from the Monday before waits ten days.
            </li>
          </ul>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Platform Feature</th>
                  <th>Zomato Settlement Terms</th>
                  <th>Swiggy Settlement Terms</th>
                  <th>What to Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableHighlight}>Default Settlement Cycle</td>
                  <td>Weekly (see your agreement)</td>
                  <td>Weekly (see your agreement)</td>
                  <td>The cut-off day and the day credits usually land.</td>
                </tr>
                <tr>
                  <td>Daily Payout Option</td>
                  <td>Announced late 2023 for smaller partners (reported as T+3)</td>
                  <td>Check your partner app</td>
                  <td>Whether you are eligible at your order volume.</td>
                </tr>
                <tr>
                  <td className={styles.tableDanger}>Refund Clawback Policy</td>
                  <td>Can be deducted from a later settlement</td>
                  <td>Can be deducted from a later settlement</td>
                  <td>Which complaints are charged to you, and how to contest them.</td>
                </tr>
                <tr>
                  <td>In-App Ad Charge Deduction</td>
                  <td>Usually deducted from payouts</td>
                  <td>Usually deducted from payouts</td>
                  <td>Weekly campaign spend against the statement line.</td>
                </tr>
                <tr>
                  <td className={styles.tableSuccess}>Dispute Resolution Window</td>
                  <td>Time-limited (see your agreement)</td>
                  <td>Time-limited (see your agreement)</td>
                  <td>The exact number of days. Raise disputes early.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Daily Payouts vs Weekly Cycles: Eligibility & T+3 Mechanics</h2>
          <p>
            In late 2023, Zomato announced daily payouts for its restaurant partners. Before you plan your cash
            flow around a daily credit, check two details in your partner app:
          </p>
          <ol>
            <li>
              <strong>Eligibility:</strong> As reported at the time of the announcement, the daily option was aimed
              at smaller restaurant partners. If your delivery volume is higher, assume you are on the weekly batch
              unless your partner app shows otherwise.
            </li>
            <li>
              <strong>The Rolling T+3 Delay:</strong> Daily payouts do not mean same-day cash. As reported, each
              payout covers orders from <strong>three days earlier</strong> (T+3), so Monday&apos;s orders would
              arrive on Thursday.
            </li>
          </ol>

          {/* Interactive Auditor Simulator */}
          <PayoutReconciliationAuditor />

          <h2>The Anatomy of an Aggregator Deduction: Where Your Payout Shrinks</h2>
          <p>
            When restaurant operators say their payout was &ldquo;short,&rdquo; the cause is rarely a banking
            error. Usually the difference is a stack of line-item deductions inside the platform&apos;s weekly
            statement:
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Net Bank Settlement Calculation Formula</div>
            <div className={styles.formulaEquation}>
              Net Bank Credit = Gross Sales - Commissions - GST on Commission - Gateway Fees - Refunds - Ad Spend - TDS
            </div>
            <p className={styles.formulaNote}>
              Where Customer Refunds, Cancellation Charges, and CPC Ad Spend are variable deductions that can
              change from week to week.
            </p>
          </div>

          <h2>The 4 Most Commonly Missed Deductions to Check</h2>
          <p>
            If you do not audit your weekly CSV settlement report line by line, four recurring categories of
            deduction are easy to miss:
          </p>

          <h3>1. &ldquo;Spillage &amp; Packaging&rdquo; Customer Refunds</h3>
          <p>
            When a diner reports in the app that their dal makhani leaked or their burger arrived cold, the platform
            may refund all or part of the order. Depending on the complaint and your partner agreement, that refund
            can be charged back to the restaurant and deducted from your upcoming payout. Check every refund row on
            your statement against your own packing records.
          </p>

          <h3>2. Late Rider Cancellations</h3>
          <p>
            During peak dinner hours or heavy monsoon rain, a rider can take longer than usual to reach you. Say your
            kitchen marks the food &ldquo;Ready for Pickup&rdquo; in 14 minutes, but no rider arrives for 45 minutes,
            and the hungry customer cancels.
          </p>
          <p>
            Have your staff mark the order as prepared on the merchant tablet and keep photographic evidence. If the
            cancellation is then charged to your account, you have what you need to contest it.
          </p>

          <h3>3. In-App Sponsored Ad Spend Pre-Deductions</h3>
          <p>
            If your marketing manager turned on Cost-Per-Click (CPC) keyword bidding or banner visibility campaigns
            inside the Zomato or Swiggy merchant app, the spend is usually deducted from your payout rather than
            billed separately, so it shows up as a deduction on the weekly statement before the bank transfer.
          </p>

          <h3>4. Section 194-O TDS & Reconciliation Mismatch</h3>
          <p>
            Under Section 194-O of the Income Tax Act, platforms withhold 0.1% TDS on gross sales. While small,
            mismatches can appear between the gross sales the platform reports, the TDS credited in your Form 26AS,
            and the sales in your own books. If these numbers differ by even a few thousand rupees, your accountant
            will have to reconcile the difference at year end.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>
              <span>The Golden Rule of Delivery Accounting</span>
            </div>
            <p className={styles.calloutText}>
              Never audit the platform&apos;s statement using the platform&apos;s numbers alone. If your only record
              of what you sold is the CSV downloaded from Zomato or Swiggy, you are checking their math against their
              own math. Keep an independent, tamper-proof POS log of every delivery ticket dispatched from your pass.
            </p>
          </div>

          <h2>The 3-Tier Reconciliation Protocol: A 20-Minute Weekly Workflow</h2>
          <p>
            You do not need to spend four hours cross-checking 800 individual orders by hand. Aim for a structured,
            tiered workflow of about 20 minutes, run on the same morning each week, once your credit has landed:
          </p>
          <ul>
            <li>
              <strong>Tier 1 (High-Level Cycle Audit, about 3 minutes):</strong> Compare total order count and total
              gross sales from your POS against the top-line figures in the platform settlement summary. If both
              match within 1%, your orders were logged correctly.
            </li>
            <li>
              <strong>Tier 2 (Deduction Categorization, about 7 minutes):</strong> Check the total deductions column.
              Subtract your contractual commission (the rate in your agreement), 18% GST on that commission, and
              payment gateway fees. Any remaining negative balance represents refunds, cancellations, and ad spend.
            </li>
            <li>
              <strong>Tier 3 (Discrepancy Investigation, about 10 minutes):</strong> Filter your settlement spreadsheet
              for negative line items over ₹200. Cross-reference the specific Order IDs against your kitchen KOT
              records and prepare evidence for dispute.
            </li>
          </ul>

          <h2>The Dispute Window: How to File Evidence-Backed Claims</h2>
          <p>
            Platforms accept disputes on a settlement only for <strong>a limited period</strong> after the statement
            is issued; the exact window is in your partner agreement. Once it has passed, a dispute is likely to be
            rejected, so treat your weekly reconciliation as the deadline.
          </p>
          <p>
            When filing a dispute ticket inside the Merchant Partner portal, avoid generic complaints like &ldquo;my
            payout is less.&rdquo; Instead, back your claim with clear, objective operational evidence:
          </p>
          <ul>
            <li><strong>Specific Order ID:</strong> Always quote the exact platform transaction ID.</li>
            <li><strong>Timestamped KOT:</strong> Proof that the order was received, accepted, and prepped on time.</li>
            <li><strong>CCTV / Packaging Proof:</strong> Photo of the tamper-proof sealed bag showing correct item counts.</li>
            <li><strong>Rider Delay Evidence:</strong> Screenshot showing that your kitchen marked the order &ldquo;Food
            Ready&rdquo; at 20:15, but the rider did not arrive at the counter until 20:55.</li>
          </ul>

          <h2>How Direct Dine-In Self-Ordering Keeps Settlement Delays Off Your Dining Room</h2>
          <p>
            Third-party aggregators play an important role in bringing in new delivery customers. For guests who
            are already sitting in your dining room, though, there is no reason for their orders to pass through a
            third-party settlement cycle.
          </p>
          <p>
            That is where KNOMI fits:
          </p>
          <ul>
            <li>
              <strong>No Platform in the Middle:</strong> Guests scan the QR on the table and order from an
              illustrated KNOMI menu in their phone&apos;s browser, with no app and no login. KNOMI is not a
              marketplace: the bill is settled with your restaurant directly, so there is no weekly platform batch to
              wait for.
            </li>
            <li>
              <strong>0% Commission:</strong> KNOMI charges one flat monthly fee per table: ₹149 on Menu (the
              illustrated menu, without ordering), ₹250 on Signature (our recommended plan, with guest self-ordering)
              and ₹500–600 on Ecosystem. Nothing is deducted from your dine-in sales,
              and with no commission there is no GST on commission either.
            </li>
            <li>
              <strong>Cleaner Reconciliation:</strong> Orders go straight to your kitchen display, and on the Signature
              plan KNOMI integrates with the POS you already use, so dine-in orders sit in the same records you
              reconcile every week.
            </li>
          </ul>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, guest experience infrastructure for restaurants, where he works
                on the product and on the economics of running a restaurant floor.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions: Aggregator Payout Cycles</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          {/* Bottom CTA Card */}
          <div className={styles.ctaCard}>
            <h3>Own Your Dining Room Revenue</h3>
            <p>
              Keep orders from your own dining room off the weekly settlement cycle. KNOMI turns the QR on your table
              into an illustrated menu guests order from directly, with 0% commission and one flat price per table,
              per month.
            </p>
            <a href={bookHref} className={styles.ctaButton}>
              Book a walkthrough &rarr;
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
