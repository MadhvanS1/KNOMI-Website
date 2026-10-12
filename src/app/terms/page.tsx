import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../legal/LegalPage.module.css";
import { OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service | KNOMI Restaurant SaaS Agreement",
  description:
    "KNOMI Terms of Service. Review our SaaS subscription terms, flat per-table pricing with 0% commission on orders, trial terms, and our 99.9% uptime target.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Terms of Service | KNOMI Restaurant Platform",
    description:
      "Official SaaS terms for KNOMI: flat per-table pricing, 0% commission on orders, and how billing, uptime and support work.",
    url: "https://www.knomi.in/terms",
    siteName: "KNOMI",
    type: "website",
    locale: "en_IN",
  },
};

const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service | KNOMI",
  description:
    "Official Terms of Service and Software-as-a-Service agreement for the KNOMI restaurant guest intelligence platform.",
  url: "https://www.knomi.in/terms",
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
      contactType: "Customer Support",
      email: "support@knomi.in",
      telephone: "+91 81237 28574",
    },
  },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <span className={styles.badge}>SaaS Service Agreement</span>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.subtitle}>
              The commercial and operational terms governing your subscription to the KNOMI restaurant guest
              intelligence and self-ordering platform.
            </p>
            <p className={styles.effectiveMeta}>
              Effective Date: September 1, 2026 | Last Updated: September 6, 2026
            </p>
          </header>

          {/* Legal Navigation Tabs */}
          <nav className={styles.legalNav} aria-label="Legal Documents Navigation">
            <span className={styles.navLabel}>Compliance Docs:</span>
            <Link href="/privacy" className={styles.navTab}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={`${styles.navTab} ${styles.navTabActive}`}>
              Terms of Service
            </Link>
            <Link href="/refund-policy" className={styles.navTab}>
              Cancellation &amp; Refund Policy
            </Link>
          </nav>

          {/* Content Card */}
          <article className={styles.card}>
            {/* Section 1 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>1. Acceptance of Terms</h2>
              <p className={styles.paragraph}>
                These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding agreement
                between KNOMI (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and the restaurant
                business entity or authorized proprietor (&quot;Subscriber&quot;, &quot;Merchant&quot;, &quot;you&quot;,
                or &quot;your&quot;) accessing or using the KNOMI platform.
              </p>
              <p className={styles.paragraph}>
                By creating an account, deploying KNOMI table QR codes at your dining establishment, accessing our
                management dashboard, or paying a subscription fee, you acknowledge that you have read, understood,
                and agree to be bound by these Terms and our Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>2. Service Description and License Grant</h2>
              <p className={styles.paragraph}>
                KNOMI delivers a specialized Software-as-a-Service (SaaS) platform tailored for hospitality venues.
                Depending on your plan, the service comprises an illustrated QR digital menu themed to your restaurant,
                Knomi Host in-menu recommendations, a Google review prompt, contactless dine-in ordering, Kitchen Display
                System (KDS) real-time dispatch, a live orders dashboard, integration with your existing POS, and, on the
                Ecosystem plan, behavioral menu intelligence (Knomi Sense).
              </p>
              <p className={styles.paragraph}>
                Subject to timely payment of applicable subscription dues and compliance with this Agreement, KNOMI grants
                you a non-exclusive, non-transferable, revocable, worldwide license to access and operate the software
                for your designated restaurant outlet(s) and table counts.
              </p>
            </section>

            {/* Section 3 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>3. 0% Transaction Commission</h2>
              <p className={styles.paragraph}>
                KNOMI operates on a pure, transparent subscription software model. We do not take a percentage cut
                from your dining room revenue:
              </p>
              <div className={styles.callout}>
                <div className={styles.calloutTitle}>Zero Commission on Dine-In Orders</div>
                <p className={styles.calloutText}>
                  KNOMI charges 0% commission on all food and beverage orders processed through our digital menus.
                  Your subscription is a flat fee per table, per month, set by your plan and table count, so it does not
                  change whether your restaurant bills ₹50,000 or ₹50,00,000 in monthly dine-in orders. Guest payments
                  route directly into your own merchant POS terminal or payment settlement account.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Trials</h2>
              <p className={styles.paragraph}>
                Where KNOMI offers a trial, its length, the tables it covers, and any fees are confirmed with you in
                writing before it begins.
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>No Proprietary Hardware:</strong> KNOMI runs in a web browser on the smartphones, tablets, and
                  computers you already use, without proprietary hardware mandates.
                </li>
                <li className={styles.listItem}>
                  <strong>Trial Features:</strong> During a trial, you receive the features of the plan agreed for that
                  trial.
                </li>
                <li className={styles.listItem}>
                  <strong>Unconditional Cancellation:</strong> If you elect not to continue at any point during the agreed
                  trial period, you may terminate with zero cancellation fees or continuing commitments.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Subscription Billing, GST Invoicing, and Payment Terms</h2>
              <p className={styles.paragraph}>
                Subscription pricing is denominated in Indian Rupees (INR), charged per table, per month according to your
                plan (current plans and prices are listed on our{" "}
                <Link href="/#pricing" style={{ color: "var(--color-whiskey-sour)", textDecoration: "underline" }}>
                  pricing page
                </Link>
                ), and billed on a recurring monthly or prepaid annual schedule based on your active plan tier and table volume:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Tax Invoicing:</strong> All subscription charges are subject to statutory Goods and Services
                  Tax (GST) at prevailing rates (currently 18% for cloud SaaS software in India). KNOMI issues compliant
                  GST tax invoices detailing your provided GSTIN, for input tax credit claims where you are eligible.
                </li>
                <li className={styles.listItem}>
                  <strong>Recurring Payments:</strong> Subscriptions renew automatically at the conclusion of each billing
                  interval unless formally cancelled prior to the renewal date.
                </li>
                <li className={styles.listItem}>
                  <strong>Payment Methods:</strong> Payments are processed securely via RBI-authorized payment aggregators
                  (such as Razorpay, Cashfree, or Stripe India), which support methods such as Corporate Credit Cards, UPI
                  Autopay, Debit Cards, and Net Banking.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Service Level Agreement (SLA) and 99.9% Uptime Target</h2>
              <p className={styles.paragraph}>
                We recognize that dine-in ordering is mission-critical to your lunch and dinner table turnover:
              </p>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Uptime Target</div>
                  <div className={styles.infoValue}>99.9% Monthly Core Availability</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Infrastructure</div>
                  <div className={styles.infoValue}>Hosted on AWS in Mumbai (ap-south-1)</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Maintenance Windows</div>
                  <div className={styles.infoValue}>Off-Peak Hours (02:00 AM to 06:00 AM IST)</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Support Response</div>
                  <div className={styles.infoValue}>Outages Handled Ahead of All Other Requests</div>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>7. Restaurant Operator Responsibilities and FSSAI Compliance</h2>
              <p className={styles.paragraph}>
                As an operating food service provider, you agree to:
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Regulatory Food Safety:</strong> Maintain a valid Food Safety and Standards Authority of
                  India (FSSAI) license and clearly show the mandatory vegetarian and non-vegetarian symbols, along with any
                  other dietary markers you use (such as Egg or Vegan), on your menu items.
                </li>
                <li className={styles.listItem}>
                  <strong>Menu and Price Accuracy:</strong> Ensure that food prices, taxes, service charges (if applied in
                  compliance with CCPA guidelines), and allergen notices presented to diners are accurate and updated.
                </li>
                <li className={styles.listItem}>
                  <strong>Account Security:</strong> Guard the confidentiality of staff and manager login credentials,
                  and immediately alert us in the event of suspected credential compromise.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>8. Intellectual Property and Data Ownership</h2>
              <p className={styles.paragraph}>
                <strong>KNOMI IP:</strong> The software, frontend interfaces, source code, visual branding, algorithmic
                intelligence models, documentation, and database schemas remain the sole and exclusive intellectual
                property of KNOMI.
              </p>
              <p className={styles.paragraph}>
                <strong>Merchant IP:</strong> You retain complete and exclusive ownership over your restaurant trade name,
                registered trademarks, food photography, proprietary recipe descriptions, and customer records. You grant
                KNOMI a limited license to display these brand assets exclusively for rendering your restaurant menus.
              </p>
            </section>

            {/* Section 9 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>9. Limitation of Liability</h2>
              <p className={styles.paragraph}>
                To the maximum extent permitted by applicable Indian law, neither KNOMI nor its founders, officers,
                or affiliates shall be liable for any indirect, incidental, consequential, special, or exemplary damages,
                including but not limited to loss of restaurant profits, business interruption, or spoiled food inventory.
              </p>
              <p className={styles.paragraph}>
                In no event shall KNOMI&apos;s total aggregate liability arising out of or related to this Agreement
                exceed the total subscription fees actually paid by you to KNOMI in the three (3) months immediately
                preceding the incident giving rise to liability.
              </p>
            </section>

            {/* Section 10 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>10. Termination</h2>
              <p className={styles.paragraph}>
                Either party may terminate a monthly subscription at any time prior to the next billing renewal.
                Upon termination, your right to use the platform ceases at the conclusion of the active paid period.
                KNOMI will provide a 30-day export window in which you can download your order history and request an
                export of your menu catalog and analytics reports in standard formats (such as CSV or JSON).
              </p>
            </section>

            {/* Section 11 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>11. Governing Law and Dispute Resolution</h2>
              <p className={styles.paragraph}>
                This Agreement shall be governed by, construed, and enforced in accordance with the laws of the Republic of India.
                In the event of any dispute or controversy arising out of or relating to these Terms, the parties shall first
                attempt amicable resolution in good faith. If unresolved within 30 days, the courts located in
                <strong> Bengaluru, Karnataka, India</strong> shall have sole and exclusive jurisdiction.
              </p>
            </section>

            {/* Section 12 */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>12. Contact and Commercial Notices</h2>
              <p className={styles.paragraph}>
                For official legal notices or contractual inquiries, please contact:
              </p>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Legal &amp; Contracts</div>
                  <div className={styles.infoValue}>legal@knomi.in</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Billing Inquiries</div>
                  <div className={styles.infoValue}>billing@knomi.in</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Operational Support</div>
                  <div className={styles.infoValue}>support@knomi.in</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Headquarters</div>
                  <div className={styles.infoValue}>KNOMI, Bengaluru, Karnataka 560001, India</div>
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
