import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../legal/LegalPage.module.css";
import callout from "../compare/Callout.module.css";
import { OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | KNOMI | India DPDP Act & IT Act",
  description:
    "KNOMI Privacy Policy. How we collect, use and protect restaurant and diner data under the DPDP Act 2023: no app or login to browse, a phone number only to place an order, and core systems hosted in India.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Privacy Policy | KNOMI Restaurant Intelligence",
    description:
      "How KNOMI handles restaurant and diner data under India's DPDP Act 2023: diner privacy by design, no app download, and a phone number asked for only when a diner places an order.",
    url: "https://www.knomi.in/privacy",
    siteName: "KNOMI",
    type: "website",
    locale: "en_IN",
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy | KNOMI",
  description:
    "Official privacy policy for the KNOMI restaurant guest intelligence platform, under India's Digital Personal Data Protection Act, 2023.",
  url: "https://www.knomi.in/privacy",
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
      contactType: "Grievance Officer",
      email: "grievance@knomi.in",
      telephone: "+91 81237 28574",
    },
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <span className={styles.badge}>Compliance &amp; Data Protection</span>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.subtitle}>
              How KNOMI collects, safeguards, and processes data across our restaurant guest intelligence platform,
              under the Digital Personal Data Protection Act, 2023 (DPDP Act 2023) and the Information Technology
              Act, 2000.
            </p>
            <p className={styles.effectiveMeta}>
              Effective Date: September 1, 2026 | Last Updated: October 16, 2026
            </p>
          </header>

          {/* Legal Navigation Tabs */}
          <nav className={styles.legalNav} aria-label="Legal Documents Navigation">
            <span className={styles.navLabel}>Compliance Docs:</span>
            <Link href="/privacy" className={`${styles.navTab} ${styles.navTabActive} pressable`}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={`${styles.navTab} pressable`}>
              Terms of Service
            </Link>
            <Link href="/refund-policy" className={`${styles.navTab} pressable`}>
              Cancellation &amp; Refund Policy
            </Link>
          </nav>

          {/* Content Card */}
          <article className={styles.card}>
            {/* Section 1 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>1. Introduction and Governance</h2>
              <p className={styles.paragraph}>
                KNOMI (&quot;KNOMI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides a cloud-based restaurant guest
                intelligence, digital QR menu, and self-ordering platform engineered in Bengaluru, Karnataka, India.
                This Privacy Policy articulates our transparent commitments and operational protocols regarding the
                collection, storage, protection, and handling of digital data.
              </p>
              <p className={styles.paragraph}>
                We are committed to full compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act 2023),
                the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices
                and Procedures and Sensitive Personal Data or Information) Rules, 2011. This policy applies to
                restaurant owners and operators (&quot;Subscribers&quot;), restaurant staff users, website visitors,
                and dining guests (&quot;Diners&quot;).
              </p>
            </section>

            {/* Section 2 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>2. Diner Privacy by Design (No App or Login to Browse)</h2>
              <p className={styles.paragraph}>
                KNOMI is designed around a simple principle: <strong>Diner Privacy by Design</strong>. We ask diners
                only for what is needed to take their order.
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>No Login to Browse:</strong> Diners do not need to download an application, create an
                  account, or enter a phone number to open a restaurant&apos;s menu, browse dishes, or view food
                  photographs.
                </li>
                <li className={styles.listItem}>
                  <strong>Phone Number to Place an Order:</strong> To place a dine-in order, a diner enters their name
                  and mobile number. Depending on the restaurant&apos;s settings, the number is confirmed with a one-time
                  password (OTP) sent by SMS. The number is used to confirm the order, link it to the diner&apos;s table
                  session, and recognise the diner and their saved preferences on a later visit. The name and number
                  are shared with the restaurant along with the order and, where the restaurant has connected its POS
                  to KNOMI, passed to that POS with the order.
                </li>
                <li className={styles.listItem}>
                  <strong>Session Tokens:</strong> When a diner scans a table QR code, the browser receives a table
                  session identifier. Until the diner places an order, this session is not linked to their name or phone
                  number. The token is tied to that dining session and expires automatically upon checkout or session closure.
                </li>
                <li className={styles.listItem}>
                  <strong>Voluntary Information:</strong> A diner may choose to tell the menu about a preference (for
                  example, no onion or less sugar) so that it can be remembered. Such information is collected only when
                  the diner chooses to share it and is used solely to serve that diner.
                </li>
              </ul>

              <div className={`${callout.box} ${styles.callout}`}>
                <div className={callout.title}>No Ad-Tech Tracking</div>
                <p className={callout.text}>
                  KNOMI does not embed third-party advertising pixels (such as Meta Pixel or Google Ads Remarketing)
                  on guest ordering screens. We do not use your menu to track your guests across the web.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>3. Restaurant Operator Data Collected</h2>
              <p className={styles.paragraph}>
                To provide restaurant intelligence and fulfill business contracts with dining establishments,
                we collect necessary business and operational data:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Business Entity Information:</strong> Legal entity name, trade name, registered address,
                  GSTIN (Goods and Services Tax Identification Number), and FSSAI food license number.
                </li>
                <li className={styles.listItem}>
                  <strong>Administrative Contact Information:</strong> Name, professional email address, mobile
                  phone number, and role designation of restaurant owners, general managers, and authorized operators.
                </li>
                <li className={styles.listItem}>
                  <strong>Catalog and Operational Data:</strong> Menu items, ingredient tags, prices, tax classifications,
                  table layouts, and kitchen display configurations.
                </li>
                <li className={styles.listItem}>
                  <strong>Billing Credentials:</strong> Invoicing address and transaction history. Credit card and
                  banking details are processed directly by RBI-authorized payment aggregators and are never stored on KNOMI servers.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Technical Telemetry and Behavioral Analytics (Knomi Sense)</h2>
              <p className={styles.paragraph}>
                KNOMI processes technical interaction telemetry to power Knomi Sense and the features built on it: Knomi Host
                recommendations, Knomi Compass menu insights, and Knomi Dash, the live orders view and Kitchen Display System
                (KDS):
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Menu Engagement Telemetry:</strong> Time spent on each dish, scroll depth, pairing suggestions
                  viewed or accepted, and items added to or removed from the basket.
                </li>
                <li className={styles.listItem}>
                  <strong>Operational Insights:</strong> Average order preparation pacing, ticket dispatch timing, and
                  table turnover metrics.
                </li>
                <li className={styles.listItem}>
                  <strong>How Analytics Are Used:</strong> Menu insights shown to restaurants, including Knomi Compass, are
                  presented in aggregate. The underlying interaction events are linked to the dining session (and, once a
                  diner has placed an order, to their account). Telemetry is used exclusively to provide the KNOMI service
                  to the specific restaurant where the visit occurred and to refine algorithm performance.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Cloud Data Residency and Information Security</h2>
              <p className={styles.paragraph}>
                How we host and protect the data we process:
              </p>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Data Residency</div>
                  <div className={styles.infoValue}>Application Servers &amp; Database in India (AWS ap-south-1, Mumbai); Images Delivered via Cloudflare</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>In-Transit Encryption</div>
                  <div className={styles.infoValue}>TLS 1.2 or Higher, with HTTPS Enforced (HSTS)</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>At-Rest Encryption</div>
                  <div className={styles.infoValue}>AES-256-GCM Encryption for Stored Payment Gateway and POS Credentials</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Access Architecture</div>
                  <div className={styles.infoValue}>Strict Permission-Based Access Control (PBAC)</div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Payment Gateway Integration and PCI-DSS Standards</h2>
              <p className={styles.paragraph}>
                For SaaS platform subscription fees paid by restaurant operators, KNOMI uses Reserve Bank of India
                (RBI) regulated payment aggregators, such as Razorpay, Cashfree, or Stripe India.
              </p>
              <p className={styles.paragraph}>
                All financial transactions are conducted directly through PCI-DSS Level 1 compliant secure payment gateways.
                KNOMI does not store, view, or process debit/credit card CVVs, net banking passwords, or UPI PINs.
                Dine-in guest bill settlements are settled directly into the merchant&apos;s own bank account or POS terminal.
              </p>
            </section>

            {/* Section 7 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>7. Data Retention and Erasure</h2>
              <p className={styles.paragraph}>
                We retain personal and business information only for the duration necessary to satisfy commercial agreements,
                resolve disputes, and meet statutory tax obligations under Indian law (such as GST audit trail mandates requiring
                record retention for up to 6 years).
              </p>
              <p className={styles.paragraph}>
                Transient diner ordering sessions are automatically flushed and purged from active cache memory within
                24 hours of table closure. Orders placed during a session, including the name and phone number used to
                place them, are kept as business records as described above.
              </p>
            </section>

            {/* Section 8 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>8. Rights under the DPDP Act 2023</h2>
              <p className={styles.paragraph}>
                Under the Digital Personal Data Protection Act, 2023, data principals are entitled to specific rights:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Right to Access Information:</strong> Request a concise summary of personal data being processed
                  by KNOMI along with identity of third parties with whom data is shared.
                </li>
                <li className={styles.listItem}>
                  <strong>Right to Correction and Erasure:</strong> Request the correction of misleading or inaccurate personal
                  data, or the erasure of obsolete personal records where retention is not required by law.
                </li>
                <li className={styles.listItem}>
                  <strong>Right of Grievance Redressal:</strong> Avail of an accessible grievance redressal mechanism
                  provided by the Data Fiduciary.
                </li>
                <li className={styles.listItem}>
                  <strong>Right to Nominate:</strong> Nominate an authorized representative to exercise data rights in the
                  event of death or incapacity.
                </li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>9. Grievance Redressal Officer</h2>
              <p className={styles.paragraph}>
                In compliance with Rule 5(9) of the Information Technology (Reasonable Security Practices and Procedures
                and Sensitive Personal Data or Information) Rules, 2011, and the DPDP Act 2023, the designated
                Grievance Officer for KNOMI is detailed below:
              </p>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Officer Designation</div>
                  <div className={styles.infoValue}>Grievance Redressal Officer</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Direct Email</div>
                  <div className={styles.infoValue}>grievance@knomi.in</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Physical Address</div>
                  <div className={styles.infoValue}>KNOMI, Bengaluru, Karnataka 560001, India</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Response Time</div>
                  <div className={styles.infoValue}>Acknowledgement: 24 Hours | Resolution: 15 Working Days</div>
                </div>
              </div>

              <p className={styles.paragraph} style={{ marginTop: "16px" }}>
                For general support inquiries or billing assistance, please contact{" "}
                <a href="mailto:support@knomi.in" style={{ color: "var(--color-whiskey-sour)", textDecoration: "underline" }}>
                  support@knomi.in
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
