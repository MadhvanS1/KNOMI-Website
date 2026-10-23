import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetpoojaTcoCalculator from "./PetpoojaTcoCalculator";
import styles from "./PetpoojaPricing.module.css";
import callout from "../Callout.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Petpooja Pricing: The Real Cost, Add-On Modules & Total TCO (2026) | KNOMI",
  description:
    "How much does Petpooja POS cost in 2026? Reported base licence fees, add-on modules (KDS, Captain App, QR ordering), hardware choices and a total-cost-of-ownership calculator you fill with your own quote.",
  alternates: {
    canonical: "/compare/petpooja-pricing-breakdown",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Petpooja Pricing: The Real Cost, Add-On Modules & Total TCO (2026)",
    description:
      "A practical look at Petpooja POS pricing: reported base licences, add-on modules, hardware costs and co-existence setups.",
    url: "https://www.knomi.in/compare/petpooja-pricing-breakdown",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "How much does Petpooja POS cost per year in India?",
    a: "Petpooja does not publish rupee prices on its website. Operator reports and software directories such as SaaSworthy and Techjockey put the entry-tier licence at roughly ₹10,000 for the first year per outlet, renewing at roughly ₹7,500 a year. Higher tiers and multi-outlet setups are priced on request, so ask for a written quote.",
  },
  {
    q: "Is tabletop QR code ordering included in Petpooja's base plan?",
    a: "Petpooja's own plan comparison lists table QR ordering and digital menus as add-on modules. They are quoted separately from the base licence, and if guests pay online through the QR flow, your payment gateway's MDR applies on top.",
  },
  {
    q: "Does Petpooja require proprietary hardware terminals?",
    a: "According to Petpooja's documentation, no. The POS runs on standard hardware, including Windows laptops, Android tablets, iPads and smartphones, and connects to standard thermal receipt printers over USB, LAN, Wi-Fi or Bluetooth. You don't need to buy proprietary billing machines.",
  },
  {
    q: "What are the most expensive Petpooja add-on modules?",
    a: "Add-ons commonly quoted alongside the base licence include the Captain Ordering App, Kitchen Display System, QR ordering, customer loyalty and SMS CRM, an online ordering website, feedback, and central commissary modules. Prices are quoted per outlet, so ask for each one as a separate line item and add 18% GST to compare totals.",
  },
  {
    q: "Is Petpooja pricing negotiable for restaurant owners?",
    a: "As with most quote-based software, it is worth asking. Operators with multiple outlets, those ready to commit to longer renewals, or those comparing competing proposals are in a better position to ask for setup fees to be waived or add-ons to be bundled.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Petpooja Pricing: The Real Cost, Add-On Modules & Total TCO (2026)",
      "description":
        "A financial breakdown of Petpooja POS pricing: reported base licences, add-on modules, hardware choices and co-existence setups.",
      "url": "https://www.knomi.in/compare/petpooja-pricing-breakdown",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/compare/petpooja-pricing-breakdown",
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
      "datePublished": "2026-09-06T04:00:00+05:30",
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
          "name": "Petpooja Pricing Breakdown",
          "item": "https://www.knomi.in/compare/petpooja-pricing-breakdown",
        },
      ],
    },
  ],
};

export default function PetpoojaPricingPage() {
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
              <span>Petpooja Pricing</span>
            </nav>
            <h1 className={styles.title}>
              Petpooja Pricing in 2026: What It Costs, Add-On Modules &amp; Real TCO
            </h1>
            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>11 Min Read</span>
            </div>
            <p className={styles.subtitle}>
              Petpooja&apos;s pricing page lists its plans but asks you to book a demo for rates. Here is what operators report paying, how add-on modules change the total, and how to plan the budget. We make KNOMI, which runs alongside POS systems like Petpooja, so read it with that in mind.
            </p>

            {/* Answer-First AEO Snippet Box */}
            <div className={`${callout.box} ${styles.aeoBox}`}>
              <span className={callout.label}>Direct Pricing Summary (AEO Answer)</span>
              <p className={callout.text}>
                Petpooja uses quote-on-request pricing with no public rupee rates. Software directories such as SaaSworthy and Techjockey report an entry-level licence of roughly ₹10,000 for Year 1 per outlet and ₹7,500 for annual renewals. Table QR Ordering, Kitchen Display Systems (KDS), Captain Apps and SMS CRM are sold as add-on modules, so your real annual software spend depends on which modules you add, plus 18% GST.
              </p>
            </div>

            {/* Metric Highlight Cards */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>₹10,000</div>
                <div className={styles.metricLabel}>Base POS Licence: reported Year 1 entry cost per outlet (SaaSworthy, Techjockey)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>₹7,500</div>
                <div className={styles.metricLabel}>Annual Renewal: reported base fee from Year 2 onwards (SaaSworthy)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>+ Add-ons</div>
                <div className={styles.metricLabel}>KDS, Captain App &amp; QR Ordering: quoted separately per outlet</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>0%</div>
                <div className={styles.metricLabel}>KNOMI Commission on dine-in orders: what your guests order is yours</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className={styles.articleBody}>
          <p>
            When researching restaurant billing software in India, nearly every restaurateur comes across Petpooja. It is one of the most widely used restaurant POS systems in the country and, for many owners, the default choice for the front desk.
          </p>
          <p>
            At the time of writing, Petpooja&apos;s website shows four plans (Basic, Core, Growth and Scale) with a &quot;Book A Demo&quot; button rather than a published rupee price, and notes that pricing can vary by region.
          </p>
          <p>
            When you are planning a technology budget, you need numbers, not just a demo booking. Below is what operators report paying, where add-on modules come in, and how to structure your restaurant tech stack to keep recurring software costs in check.
          </p>

          <h2>1. What Petpooja Actually Costs: Reported Market Benchmarks</h2>
          <p>
            Because Petpooja does not publish prices, owners rely on figures reported on business software directories and peer forums. As listed in September 2026, the main directories report similar baseline numbers:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Reporting Source</th>
                  <th>Reported Pricing Structure</th>
                  <th>Notes &amp; Scope</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Techjockey India</strong></td>
                  <td>From ₹10,000 / year</td>
                  <td>Entry single-outlet billing licence</td>
                </tr>
                <tr>
                  <td><strong>SaaSworthy</strong></td>
                  <td>₹10,000 (Year 1) / ₹7,500 (Renewal)</td>
                  <td>Core POS cloud subscription per outlet</td>
                </tr>
                <tr>
                  <td><strong>SoftwareSuggest</strong></td>
                  <td>$139 / user / year (approx ₹11,600)</td>
                  <td>Converted international listing rate</td>
                </tr>
                <tr>
                  <td><strong>G2 Crowd</strong></td>
                  <td>$50 to $135 / month depending on tier</td>
                  <td>Enterprise tier multi-store setups</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The reported baseline: <strong>roughly ₹10,000 for your first year, and roughly ₹7,500 a year to renew.</strong> Your own quote may differ.
          </p>
          <p>
            That baseline is for the core billing licence. What each tier includes depends on the plan you are quoted, and the front-of-house tools that busy dining rooms often want, such as a captain app, kitchen display or QR ordering, are listed as add-ons.
          </p>

          <h2>2. The 4 Official Tiers Explained</h2>
          <p>
            Petpooja lists four plans. Broadly, they step up like this; exact features per plan change over time, so ask for the feature list for the plan you are quoted:
          </p>
          <ul>
            <li>
              <strong>Basic Plan:</strong> The entry plan, aimed at simpler counter billing.
            </li>
            <li>
              <strong>Core Plan:</strong> Aimed at standalone dine-in restaurants.
            </li>
            <li>
              <strong>Growth Plan:</strong> Aimed at busier, multi-station outlets.
            </li>
            <li>
              <strong>Scale Plan:</strong> Aimed at multi-outlet chains with central operations.
            </li>
          </ul>

          <div className={`${callout.box} ${styles.calloutBox}`}>
            <div className={callout.title}>A Genuine Advantage: Per-Outlet Licensing</div>
            <p className={callout.text}>
              One operational advantage operators report with Petpooja is licensing per outlet rather than per terminal. Where some systems charge for each additional till, a Petpooja licence is reported to cover multiple billing screens (for example, the front counter, a first-floor bar and a delivery desk) under one store subscription. Confirm this in your quote.
            </p>
          </div>

          <h2>3. Add-On Modules: How the Total Grows</h2>
          <p>
            The biggest budget surprise for many owners is that customer-facing and kitchen tools are unbundled from the base POS. At the time of writing, Petpooja&apos;s own feature comparison table classifies the following as <strong>Add-Ons</strong>:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Add-On Module</th>
                  <th>Pricing</th>
                  <th>Why Operators Need It</th>
                  <th>What Else to Budget For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Waiter Captain App</strong></td>
                  <td className={styles.tableHighlight}>Quoted separately</td>
                  <td>Servers take orders on mobile phones at tables</td>
                  <td>Android phones for your servers</td>
                </tr>
                <tr>
                  <td><strong>Kitchen Display System (KDS)</strong></td>
                  <td className={styles.tableHighlight}>Quoted separately</td>
                  <td>Replaces paper chits with kitchen station screens</td>
                  <td>Kitchen tablets and mounts</td>
                </tr>
                <tr>
                  <td><strong>Table QR Ordering &amp; Digital Menu</strong></td>
                  <td className={styles.tableHighlight}>Quoted separately</td>
                  <td>Guests scan a QR code to browse and order</td>
                  <td>Payment gateway MDR if guests pay online</td>
                </tr>
                <tr>
                  <td><strong>Customer Loyalty &amp; SMS CRM</strong></td>
                  <td>Quoted separately</td>
                  <td>Points tracking and promotional SMS</td>
                  <td>DLT-registered SMS packs</td>
                </tr>
                <tr>
                  <td><strong>Direct Online Ordering Site</strong></td>
                  <td>Quoted separately</td>
                  <td>Branded website to take orders without aggregator commissions</td>
                  <td>Marketing to bring customers to it</td>
                </tr>
                <tr>
                  <td><strong>Feedback App &amp; Review QR</strong></td>
                  <td>Quoted separately</td>
                  <td>Collects table ratings before the bill is settled</td>
                  <td>Staff time to prompt guests</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Here is how quickly it adds up, as a hypothetical worked example. Say your quote lists the reported ₹10,000 base licence plus four add-ons (Captain App, KDS, QR Ordering and Feedback) at ₹4,000 each. That is <strong>₹26,000 a year per outlet</strong> before tax. Adding 18% GST on software (₹4,680) brings it to <strong>₹30,680</strong>: about three times the headline figure. Use your own quote in the calculator below.
          </p>

          {/* Interactive Calculator Component */}
          <h2>4. Calculate Your Total Cost of Ownership (TCO)</h2>
          <p>
            Use the calculator below to estimate your annual Petpooja software cost from your own quote, or to see what adding KNOMI alongside it could be worth at your sales. Results are estimates.
          </p>

          <PetpoojaTcoCalculator />

          <h2>5. The Hardware Myth: Do You Need Expensive Billing Terminals?</h2>
          <p>
            Some hardware bundles include all-in-one touchscreen billing machines. You may not need one.
          </p>
          <p>
            Petpooja&apos;s technical documentation says the POS application runs on standard devices and operating systems:
          </p>
          <ul>
            <li><strong>Laptops &amp; Desktops:</strong> Windows machines meeting Petpooja&apos;s stated minimum specification.</li>
            <li><strong>Tablets:</strong> Standard Android tablets or Apple iPads.</li>
            <li><strong>Receipt Printers:</strong> Standard 80mm or 58mm thermal printers connected via USB, LAN, Wi-Fi or Bluetooth, from brands such as TVS, Epson, NGX and Posiflex, widely available from online stores and local IT distributors.</li>
          </ul>
          <p>
            You do <em>not</em> need to invest in closed proprietary terminals that lock you into one hardware vendor.
          </p>

          <h2>6. Three Negotiation Rules When Speaking With Petpooja Sales</h2>
          <p>
            Because Petpooja does not publish fixed rates, you are in a quote-based negotiation. Keep these three principles in mind:
          </p>
          <ol>
            <li>
              <strong>Demand Itemized Add-On Pricing in Writing:</strong> Don&apos;t accept a single lump-sum quote. Ask for the base POS licence, each add-on module, and installation or training fees as separate line items.
            </li>
            <li>
              <strong>Lock In Your Renewal Rate in the Initial Contract:</strong> First-year discounts are common in software, and renewal rates can rise once you are settled in. Ask for your renewal rate to be written into the initial contract.
            </li>
            <li>
              <strong>Separate Hardware from Software:</strong> If you are offered a &quot;complete hardware bundle&quot;, compare it with buying thermal printers and tablets yourself. Buying independently is often cheaper.
            </li>
          </ol>

          <h2>7. The Co-Existence Financial Equation: Why You Might Skip the POS QR Add-On</h2>
          <p>
            Many restaurateurs assume they must choose between Petpooja and tabletop self-ordering. A <strong>co-existence stack</strong> lets you keep both jobs where they belong:
          </p>
          <ul>
            <li>
              <strong>Keep Petpooja at the Counter (reported ₹7,500/yr renewal):</strong> Use Petpooja for what it does best: cashier reconciliation, GST bill printing, raw ingredient inventory and Tally accounting sync.
            </li>
            <li>
              <strong>Consider KNOMI Instead of a POS QR Add-On:</strong> A billing-first QR module lists your menu. KNOMI is built to sell it: an illustrated menu themed to your restaurant that guests open with no app and no login.
            </li>
            <li>
              <strong>Deploy KNOMI on Tables:</strong> Knomi Host suggests the pairing at the moment a guest chooses, orders go to your kitchen display, and KNOMI integrates with Petpooja so orders flow into it. Knomi Compass, powered by Knomi Sense, shows the dishes guests look at but don&apos;t order.
            </li>
          </ul>
          <p>
            KNOMI takes 0% commission on your orders. We share pricing on a short <Link href={bookHref} className={styles.inlineLink}>walkthrough call</Link>, once we understand your restaurant, and you can <Link href="/#worth" className={styles.inlineLink}>see what upselling could be worth</Link> on your own numbers first.
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
            <h2>Frequently Asked Questions About Petpooja Pricing</h2>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          {/* CTA Conversion Box */}
          <div className={styles.ctaCard}>
            <h3>Looking for a Menu That Sells, Alongside Petpooja?</h3>
            <p>
              Keep Petpooja for billing and put KNOMI on your tables: an illustrated menu, Knomi Host suggesting pairings, and orders that flow into Petpooja, with 0% commission.
            </p>
            <Link href="/compare/petpooja-alternatives" className={`${styles.ctaButton} pressable`}>
              Compare Petpooja vs KNOMI
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
