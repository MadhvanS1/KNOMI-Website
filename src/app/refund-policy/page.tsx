import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../legal/LegalPage.module.css";
import callout from "../compare/Callout.module.css";
import { OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | KNOMI SaaS Subscriptions",
  description:
    "KNOMI Cancellation & Refund Policy. Review terms for trial cancellations, monthly plan cancellations, annual plan refunds, and refund timelines (typically 5-7 business days to reach your bank).",
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Cancellation & Refund Policy | KNOMI Restaurant Platform",
    description:
      "Transparent cancellation and refund terms for KNOMI subscribers: no cancellation fees during an agreed trial, and refunds returned to the original payment method.",
    url: "https://www.knomi.in/refund-policy",
    siteName: "KNOMI",
    type: "website",
    locale: "en_IN",
  },
};

const refundJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cancellation & Refund Policy | KNOMI",
  description:
    "Official Cancellation and Refund Policy for KNOMI restaurant software subscriptions, written to align with Indian payment gateway requirements.",
  url: "https://www.knomi.in/refund-policy",
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: "KNOMI",
    url: "https://www.knomi.in",
    logo: "https://www.knomi.in/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Billing Support",
      email: "billing@knomi.in",
      telephone: "+91 81237 28574",
    },
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refundJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <span className={styles.badge}>Billing &amp; Payment Compliance</span>
            <h1 className={styles.title}>Cancellation &amp; Refund Policy</h1>
            <p className={styles.subtitle}>
              Clear, transparent guidelines regarding subscription cancellations, billing adjustments, and refund
              procedures for KNOMI restaurant software services.
            </p>
            <p className={styles.effectiveMeta}>
              Effective Date: September 1, 2026 | Last Updated: September 6, 2026
            </p>
          </header>

          {/* Legal Navigation Tabs */}
          <nav className={styles.legalNav} aria-label="Legal Documents Navigation">
            <span className={styles.navLabel}>Compliance Docs:</span>
            <Link href="/privacy" className={`${styles.navTab} pressable`}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={`${styles.navTab} pressable`}>
              Terms of Service
            </Link>
            <Link href="/refund-policy" className={`${styles.navTab} ${styles.navTabActive} pressable`}>
              Cancellation &amp; Refund Policy
            </Link>
          </nav>

          {/* Content Card */}
          <article className={styles.card}>
            {/* Section 1 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>1. Purpose and Scope</h2>
              <p className={styles.paragraph}>
                At KNOMI, we prioritize open, fair, and transparent commercial relationships with every restaurant we work with.
                This Cancellation and Refund Policy governs software subscriptions, onboarding fees, and billing dispute
                resolutions across our business-to-business (B2B) hospitality platform.
              </p>
              <p className={styles.paragraph}>
                This policy is written to align with Reserve Bank of India (RBI) guidelines, consumer protection
                regulations, and the standard merchant requirements of Indian payment aggregators such as Razorpay,
                Cashfree, and Stripe India.
              </p>
            </section>

            {/* Section 2 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>2. Trial Cancellation</h2>
              <p className={styles.paragraph}>
                Where KNOMI offers a trial, its length, the tables it covers, and any fees are confirmed with you in
                writing before it begins:
              </p>
              <div className={`${callout.box} ${styles.callout}`}>
                <div className={callout.title}>Trial Commitment</div>
                <p className={callout.text}>
                  Any fees for a trial are set out in the written trial terms. If an operator concludes that KNOMI does
                  not match their operational flow, they may discontinue at any point before the agreed trial period ends.
                  No cancellation penalties, hidden fees, or clawbacks will apply.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>3. Monthly Subscription Cancellation Terms</h2>
              <p className={styles.paragraph}>
                Monthly subscriptions provide hospitality operators maximum flexibility without multi-year commitments:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>How to Cancel:</strong> You may initiate cancellation at any time by emailing{" "}
                  <a href="mailto:billing@knomi.in" style={{ color: "var(--color-whiskey-sour)", textDecoration: "underline" }}>
                    billing@knomi.in
                  </a>{" "}
                  with your registered restaurant name and outlet ID.
                </li>
                <li className={styles.listItem}>
                  <strong>Notice Period:</strong> Cancellation requests should be submitted at least 2 business days prior
                  to your scheduled monthly billing date to prevent automated recurring debits.
                </li>
                <li className={styles.listItem}>
                  <strong>Service Continuance:</strong> Upon cancellation, your account remains active and operational
                  through the end of the currently paid monthly billing cycle. No further recurring deductions will occur.
                </li>
                <li className={styles.listItem}>
                  <strong>Partial Month Usage:</strong> Subscription payments already disbursed for the current active
                  billing cycle are non-refundable for partial month usage.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Annual Subscription Cancellation and Pro-Rata Refunds</h2>
              <p className={styles.paragraph}>
                Where KNOMI and an operator agree a prepaid annual plan, the following cancellation terms apply:
              </p>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Cancellation Window</th>
                      <th className={styles.th}>Refund Eligibility</th>
                      <th className={styles.th}>Calculation Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.tr}>
                      <td className={styles.td}>Within First 30 Days</td>
                      <td className={styles.td}>Eligible for Pro-Rata Refund</td>
                      <td className={styles.td}>
                        Full refund of the remaining 11 unused calendar months, minus payment gateway processing fees.
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>After 30 Days</td>
                      <td className={styles.td}>No Mid-Term Cash Refund</td>
                      <td className={styles.td}>
                        Service remains operational until the 12-month term expires; automatic renewal is deactivated.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Billing Errors, Duplicate Deductions, and SLA Downtime</h2>
              <p className={styles.paragraph}>
                If we make a billing error, we will put it right:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Duplicate Transactions:</strong> If technical synchronization errors cause your account to be billed
                  multiple times for the same subscription period, KNOMI will refund the duplicate charge in full once it
                  is verified.
                </li>
                <li className={styles.listItem}>
                  <strong>Dispute Reporting:</strong> Please notify us of any perceived billing error within 7 calendar days
                  of receiving the electronic invoice or debit alert by writing to{" "}
                  <a href="mailto:billing@knomi.in" style={{ color: "var(--color-whiskey-sour)", textDecoration: "underline" }}>
                    billing@knomi.in
                  </a>
                  .
                </li>
                <li className={styles.listItem}>
                  <strong>SLA Downtime Credits:</strong> If KNOMI does not meet its 99.9% monthly availability target for core
                  ordering services, impacted operators are granted pro-rated service credits towards their next renewal cycle.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Refund Processing Timeline and RBI Method Directives</h2>
              <p className={styles.paragraph}>
                In line with Reserve Bank of India (RBI) regulations and merchant banking standards:
              </p>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Internal Processing</div>
                  <div className={styles.infoValue}>Approved refunds are initiated within 24 to 48 business hours</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Bank Settlement Window</div>
                  <div className={styles.infoValue}>Funds typically credit back within 5 to 7 business days, depending on your bank</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Reversal Method</div>
                  <div className={styles.infoValue}>Strictly to original payment source (Card / UPI / Net Banking)</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Cash Prohibition</div>
                  <div className={styles.infoValue}>No physical cash disbursements or third-party transfers</div>
                </div>
              </div>

              <p className={styles.paragraph} style={{ marginTop: "16px" }}>
                Once KNOMI initiates a refund, you will receive an automated payment gateway reference ID (e.g. Razorpay
                or Cashfree refund ARN) to track the reversal directly with your banking institution.
              </p>
            </section>

            {/* Section 7 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>7. Non-Refundable Items</h2>
              <p className={styles.paragraph}>
                Where KNOMI provides physical or custom work for your restaurant, it is non-refundable once produced or delivered:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Custom-made physical table QR stands, tags, or plaques once manufactured and shipped.
                </li>
                <li className={styles.listItem}>
                  Bespoke illustration, design, or photography work once it has been delivered.
                </li>
                <li className={styles.listItem}>
                  Custom software development or third-party POS integration work delivered to an agreed specification.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>8. Billing Support Contact</h2>
              <p className={styles.paragraph}>
                If you have questions regarding an invoice, subscription renewal, or wish to request a cancellation,
                our team is available to assist you:
              </p>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Direct Billing Desk</div>
                  <div className={styles.infoValue}>billing@knomi.in</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Customer Support</div>
                  <div className={styles.infoValue}>support@knomi.in</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Helpline Telephone</div>
                  <div className={styles.infoValue}>+91 81237 28574</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Desk Hours</div>
                  <div className={styles.infoValue}>Monday to Saturday, 9:30 AM to 6:30 PM IST</div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
