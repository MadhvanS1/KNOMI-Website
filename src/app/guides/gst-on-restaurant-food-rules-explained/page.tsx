import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantGstBillAuditor from "./RestaurantGstBillAuditor";
import styles from "./GstFoodGuide.module.css";
import { OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "GST on Restaurant Food in India: 5% vs 18% & Liquor VAT (2026) | KNOMI",
  description:
    "Master restaurant GST rates in India. Learn the 5% no-ITC standalone rule, the 18% hotel specified premises threshold (room tariff > ₹7,500), State Liquor VAT splits, and the 2025-2026 tax overhaul.",
  alternates: {
    canonical: "/guides/gst-on-restaurant-food-rules-explained",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "GST on Restaurant Food in India: 5% vs 18% & Liquor VAT (2026)",
    description:
      "A complete guide to restaurant GST rates in India. Learn how 5% standalone rules, 18% hotel thresholds, State Liquor VAT, and service charges appear on a compliant tax invoice.",
    url: "https://www.knomi.in/guides/gst-on-restaurant-food-rules-explained",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is the standard GST rate on restaurant food in India?",
    a: "The standard GST rate on restaurant food is 5% with zero Input Tax Credit (ITC) for the vast majority of establishments, including standalone dine-in restaurants, cafes, food trucks, takeaway counters, and delivery-only cloud kitchens. This 5% is split equally into 2.5% Central GST (CGST) and 2.5% State GST (SGST) on intra-state supplies under SAC Code 996331.",
  },
  {
    q: "When does a restaurant charge 18% GST instead of 5%?",
    a: "A restaurant charges 18% GST (with full Input Tax Credit) only if it is situated inside a hotel classified as a 'specified premises.' Under Notification 05/2025 Central Tax (Rate), effective 1 April 2025, an establishment qualifies as a specified premises if any hotel room had an actual transaction value exceeding ₹7,500 per night in the preceding financial year. Standalone restaurants outside such hotels cannot charge 18%.",
  },
  {
    q: "Does air conditioning (AC) affect the restaurant GST rate?",
    a: "No. The distinction between air-conditioned and non-air-conditioned restaurants was completely abolished by the GST Council in November 2017. Whether your dining room has split ACs, central air conditioning, open-air garden seating, or ceiling fans, the tax rate for a standalone restaurant is identical: 5% without Input Tax Credit.",
  },
  {
    q: "How is alcohol taxed on a restaurant bill that also includes food?",
    a: "Alcoholic beverages for human consumption are constitutionally excluded from the GST framework under Article 366(12A) and are taxed under State Excise and State Value Added Tax (VAT). On a bill containing both food and alcoholic drinks, two separate tax systems apply: the food subtotal attracts 5% GST, while the beer, wine, and spirits subtotal attracts State Liquor VAT (typically between 18% and 35% depending on the state).",
  },
  {
    q: "Is GST charged on the restaurant service charge?",
    a: "Yes. Under Section 15 of the CGST Act, the taxable value for GST includes any incidental expenses and charges linked to the supply. If a restaurant levies a discretionary service charge, that service charge forms part of the food service value and attracts the same 5% food GST rate on the final customer invoice.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "GST on Restaurant Food in India: 5% vs 18% & Liquor VAT Explained (2026)",
      description:
        "Master restaurant GST rates in India. Learn the 5% no-ITC standalone rule, the 18% hotel specified premises threshold (room tariff > ₹7,500), State Liquor VAT splits, and the 2025-2026 tax overhaul.",
      url: "https://www.knomi.in/guides/gst-on-restaurant-food-rules-explained",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/gst-on-restaurant-food-rules-explained",
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
      datePublished: "2026-09-06T02:00:00+05:30",
      dateModified: "2026-09-06T02:00:00+05:30",
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
          name: "GST on Restaurant Food in India",
          item: "https://www.knomi.in/guides/gst-on-restaurant-food-rules-explained",
        },
      ],
    },
  ],
};

export default function GstFoodRatesGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span>GST on Restaurant Food in India</span>
          </div>
          <h1 className={styles.title}>
            GST on Restaurant Food in India: 5% vs 18% Rates &amp; Liquor VAT (2026)
          </h1>
          <div className={styles.postMeta}>
            <span>By Madhvan Sharma, Co-Founder</span>
            <span>•</span>
            <span>Updated September 2026</span>
            <span>•</span>
            <span>13 Min Read</span>
          </div>
          <p className={styles.subtitle}>
            An exhaustive operational and legal guide to restaurant taxation across India. Understand why 5%
            without ITC governs standalone dining, when 18% hotel thresholds apply, how to bill State Liquor VAT,
            and the hidden cost of the blocked ITC squeeze.
          </p>

          <div className={styles.aeoBox}>
            <span className={styles.aeoLabel}>Answer-First Executive Summary</span>
            <p className={styles.aeoText}>
              Standalone restaurants, cafes, cloud kitchens, and takeaway outlets in India charge a flat 5% GST on
              prepared food without Input Tax Credit, split equally as 2.5% CGST and 2.5% SGST. The 18% rate applies
              exclusively to restaurants situated in hotels where room rates exceed ₹7,500 per night. Alcoholic
              beverages sit completely outside GST and attract State Liquor VAT.
            </p>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>5% Flat Rate</div>
              <div className={styles.metricLabel}>Standalone Food GST (2.5% CGST + 2.5% SGST)</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>0% ITC</div>
              <div className={styles.metricLabel}>Blocked Tax on Rent, Capex &amp; Commissions</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>₹7,500 Night</div>
              <div className={styles.metricLabel}>Hotel Room Tariff Threshold for 18% GST</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>18% to 35%</div>
              <div className={styles.metricLabel}>State Liquor VAT on Alcoholic Beverages</div>
            </div>
          </div>
        </section>

        <RestaurantGstBillAuditor />

        <article className={styles.articleBody}>
          <h2>1. The Foundation: Rates, SAC Codes &amp; The AC Myth</h2>
          <p>
            Under Indian tax legislation, the preparation and serving of food or beverages is classified as a
            <strong> composite supply of services</strong> under Schedule II, Paragraph 6(b) of the Central Goods
            and Services Tax (CGST) Act. The statutory Service Accounting Code (SAC) governing this supply is
            <strong> SAC 996331</strong> (Restaurant and catering services).
          </p>
          <p>
            For the vast majority of food service establishments across the country, the applicable tax rate is straightforward:
          </p>
          <ul>
            <li><strong>Total Food GST:</strong> 5.0%</li>
            <li><strong>Central GST (CGST):</strong> 2.5%</li>
            <li><strong>State / UT GST (SGST):</strong> 2.5%</li>
            <li><strong>Input Tax Credit (ITC):</strong> 0% (Strictly blocked under Notification 46/2017 Central Tax Rate)</li>
          </ul>
          <p>
            This 5% rate applies identically whether the customer is dining at a table, carrying food away in a parcel
            from your counter, or ordering delivery to their residence. The tax follows the commercial classification
            of the kitchen, not the physical location where the meal is consumed.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>Debunking the Persistent Air-Conditioning (AC) Myth</div>
            <p className={styles.calloutText}>
              Between July 2017 and November 2017, the initial GST framework imposed an 18% tax on air-conditioned
              restaurants and a 12% tax on non-air-conditioned restaurants. <strong>The GST Council eliminated this split
              in November 2017</strong> (via Notification 46/2017), establishing a flat 5% rate for all standalone restaurants.
              If an online billing guide or POS vendor claims that turning on an air conditioner increases your tax rate,
              they are relying on statutory provisions that were abolished nearly a decade ago.
            </p>
          </div>

          <h2>2. When Does 18% Apply? The &ldquo;Specified Premises&rdquo; Hotel Threshold</h2>
          <p>
            The primary statutory exception where restaurant dining attracts <strong>18% GST (with full Input Tax Credit)</strong>
            concerns dining rooms operating within high-tariff hotels.
          </p>
          <p>
            For several years, this threshold was determined by the hotel room&apos;s &ldquo;declared tariff&rdquo; of
            ₹7,500 per day, which could differ from the price rooms actually sold for. The 2025 change ties the test to
            the actual transaction value instead.
          </p>

          <div className={styles.legalCard}>
            <div className={styles.legalTitle}>Statutory Overhaul: Notification 05/2025 Central Tax (Rate)</div>
            <div className={styles.legalStatute}>The Actual Transaction Value Rule (Effective 1 April 2025)</div>
            <p className={styles.legalText}>
              A hotel or guest house is classified as a &ldquo;specified premises&rdquo; for an entire financial year if any room
              or unit of accommodation was supplied at an actual transaction value exceeding ₹7,500 per night at any
              time during the preceding financial year. Below this threshold, all dining outlets located
              within the hotel charge the standard 5% rate without Input Tax Credit.
            </p>
          </div>

          <h3>The Standalone Restaurant Lockout</h3>
          <p>
            Some independent restaurant owners with high capital expenditure (say, a microbrewery with crores invested
            in imported fermentation tanks, or a fine-dining bistro paying several lakhs a month in commercial rent) would
            prefer to pay 18% GST so they could claim Input Tax Credit on their equipment and leases.
          </p>
          <p>
            The rate notifications do not offer that choice: <strong>a standalone restaurant cannot opt into the 18% regime</strong>.
            The 5% rate without ITC is mandatory for standalone food outlets. The 18% rate is restricted to restaurants
            in hotels that qualify as specified premises.
          </p>

          <h2>3. The Dual-Taxation Tightrope: Splitting Food GST and State Liquor VAT</h2>
          <p>
            The most complex compliance challenge in Indian hospitality occurs at pubs, microbreweries, and dining bars.
            When a guest orders a wood-fired pizza and two craft beers, their single receipt bridges two constitutionally
            separate taxation regimes.
          </p>
          <p>
            Under <strong>Article 366(12A) of the Constitution of India</strong>, alcoholic liquor for human consumption
            was intentionally excluded from the definition of Goods and Services Tax. State governments retained exclusive
            sovereignty over alcohol taxation, levying State Excise Duties and State Value Added Tax (VAT).
          </p>
          <p>
            The rates below are indicative and change with state budgets and excise policy. Confirm the current
            rate for your outlet with your state excise or commercial tax department, or your chartered accountant.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>State / Union Territory</th>
                  <th>State Liquor VAT Rate</th>
                  <th>Food Tax Rate</th>
                  <th>Billing Separation Mandate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Karnataka</strong></td>
                  <td className={styles.tableDanger}>18.5% State VAT</td>
                  <td className={styles.tableSuccess}>5% GST (2.5% + 2.5%)</td>
                  <td>Mandatory distinct subtotal lines on POS receipt</td>
                </tr>
                <tr>
                  <td><strong>Maharashtra</strong></td>
                  <td className={styles.tableDanger}>20.0% State VAT</td>
                  <td className={styles.tableSuccess}>5% GST (2.5% + 2.5%)</td>
                  <td>Strict separation under MVAT Act and CGST Act</td>
                </tr>
                <tr>
                  <td><strong>Delhi (NCT)</strong></td>
                  <td className={styles.tableDanger}>25.0% State VAT</td>
                  <td className={styles.tableSuccess}>5% GST (2.5% + 2.5%)</td>
                  <td>Separate food GST and liquor VAT subtotals on the bill</td>
                </tr>
                <tr>
                  <td><strong>Telangana</strong></td>
                  <td className={styles.tableDanger}>35.0% State VAT</td>
                  <td className={styles.tableSuccess}>5% GST (2.5% + 2.5%)</td>
                  <td>Separate food GST and liquor VAT subtotals on the bill</td>
                </tr>
                <tr>
                  <td><strong>Goa</strong></td>
                  <td className={styles.tableDanger}>22.0% State VAT</td>
                  <td className={styles.tableSuccess}>5% GST (2.5% + 2.5%)</td>
                  <td>Separate food GST and liquor VAT subtotals on the bill</td>
                </tr>
                <tr>
                  <td><strong>West Bengal</strong></td>
                  <td className={styles.tableDanger}>30.0% State VAT</td>
                  <td className={styles.tableSuccess}>5% GST (2.5% + 2.5%)</td>
                  <td>Separate food GST and liquor VAT subtotals on the bill</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.dangerBox}>
            <div className={styles.dangerTitle}>The Bar Pour Cost Multiplier Trap</div>
            <p className={styles.dangerText}>
              Because liquor VAT sits outside GST, <strong>a bar cannot offset the VAT paid on commercial liquor purchases
              against its food GST liabilities</strong>, nor can it claim input credit for excise duties built into wholesale
              bottle costs. Excise and liquor VAT must be treated as a direct component of raw pour cost rather than a
              balance-sheet pass-through.
            </p>
          </div>

          <h2>4. Service Charges, Packaging &amp; Bottled Goods: Mandatory Tax Math</h2>

          <h3>Does the Service Charge Attract GST?</h3>
          <p>
            Yes. While the consumer legality of voluntary service charges continues to be debated in High Courts, the tax
            treatment is completely settled under statutory tax law.
          </p>
          <p>
            Under <strong>Section 15(2)(c) of the CGST Act</strong>, the value of supply includes &ldquo;incidental expenses,
            including commission and packing, charged by the supplier to the recipient.&rdquo; Because a service charge is an
            additional fee levied for the overall dining experience, it is added to the taxable subtotal before computing
            the 5% food GST. You cannot levy a service charge tax-free.
          </p>

          <h3>Container and Packaging Fees on Parcel Orders</h3>
          <p>
            When a restaurant charges, say, ₹30 to ₹50 for plastic containers, tamper-evident tape, or thermal paper bags on
            takeaway orders, that packaging fee is classified as an ancillary supply bundled with the principal service of
            providing cooked food. Consequently, <strong>packaging fees attract the identical 5% restaurant GST rate</strong>,
            not the 18% rate that applies to standalone plastic manufacturing.
          </p>

          <h3>Packaged MRP Goods Sold Inside Dining Rooms</h3>
          <p>
            In the landmark 2017 ruling in <em>Federation of Hotel and Restaurant Associations of India (FHRAI) v. Union of India</em>,
            the Supreme Court affirmed that restaurants can charge prices higher than the printed Maximum Retail Price (MRP)
            for bottled mineral water and soft drinks consumed inside the dining room, because the diner is purchasing a
            bundled hospitality service (glassware, air conditioning, seating, and service staff) rather than a simple retail commodity.
          </p>
          <p>
            Under GST, this distinction is critical:
          </p>
          <ul>
            <li>
              <strong>Served at the Table:</strong> The bottled drink is part of composite restaurant service and attracts
              <strong> 5% GST</strong>.
            </li>
            <li>
              <strong>Sold Sealed at the Counter:</strong> If a customer buys an unopened cold drink to go without dining,
              it is treated as a retail sale of goods, attracting the product&apos;s printed GST rate (typically 28% plus 12%
              compensation cess for aerated drinks), and cannot legally exceed the printed MRP.
            </li>
          </ul>

          <h2>5. The Composition Scheme: When the Bill Displays Zero GST</h2>
          <p>
            Small restaurants and roadside cafes with annual turnover below ₹1.5 Crores (or ₹75 Lakhs in northeastern states)
            have the statutory option to register under the <strong>GST Composition Scheme</strong> (Section 10 of the CGST Act).
          </p>
          <p>
            The financial mechanics of composition dining differ fundamentally from regular registration:
          </p>
          <ul>
            <li>
              <strong>No Tax Collected from Diners:</strong> A composition dealer is legally prohibited from collecting GST
              from their customers. The customer bill must contain zero tax lines.
            </li>
            <li>
              <strong>Bill of Supply:</strong> The restaurant issues a &ldquo;Bill of Supply&rdquo; bearing the mandatory text:
              <em>&ldquo;Composition taxable person, not eligible to collect tax on supplies.&rdquo;</em>
            </li>
            <li>
              <strong>Flat 5% Outflow:</strong> The restaurant pays a flat 5% tax on its gross quarterly turnover directly
              to the government via Form CMP-08, funded entirely out of operational cash margins.
            </li>
            <li>
              <strong>Strict Alcohol Disqualification:</strong> Under Section 10(2)(a), any establishment supplying non-taxable
              goods (including alcoholic beverages) is disqualified from the composition scheme. A restaurant serving beer
              must operate under the regular GST regime.
            </li>
          </ul>

          <h2>6. The 5% vs 18% &ldquo;ITC Paradox&rdquo; in Restaurant Unit Economics</h2>
          <p>
            When the government slashed restaurant GST from 18% to 5% in November 2017, diners celebrated the lower check
            totals. For restaurant operators, however, the reform introduced a structural financial distortion known as
            the <strong>Blocked ITC Squeeze</strong>.
          </p>
          <p>
            Under Notification 46/2017, the 5% rate was granted on one strict condition: <strong>Input Tax Credit is completely
            denied</strong>. Standalone restaurants cannot claim a single rupee of credit on:
          </p>
          <ul>
            <li><strong>Commercial Space Leases:</strong> Commercial landlords levy 18% GST on monthly rent.</li>
            <li><strong>Food Delivery Commissions:</strong> Zomato and Swiggy charge 18% GST on all service commissions.</li>
            <li><strong>Kitchen Capital Investments:</strong> Commercial ovens, refrigeration units, and POS terminals typically carry 18% GST.</li>
            <li><strong>Marketing &amp; Tech Subscriptions:</strong> Software SaaS platforms and digital agencies bill 18% GST.</li>
          </ul>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Monthly Expense Line Item</th>
                  <th>Illustrative Monthly Cost (Excl. Tax)</th>
                  <th>GST Rate Billed</th>
                  <th>Monthly Unclaimable Dead Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Commercial Rent (Metro High Street)</td>
                  <td>₹2,00,000</td>
                  <td>18% GST</td>
                  <td className={styles.tableDanger}>₹36,000 / month</td>
                </tr>
                <tr>
                  <td>Aggregator Platform Commissions</td>
                  <td>₹2,20,000</td>
                  <td>18% GST</td>
                  <td className={styles.tableDanger}>₹39,600 / month</td>
                </tr>
                <tr>
                  <td>Kitchen Capex &amp; Maintenance</td>
                  <td>₹80,000</td>
                  <td>18% GST</td>
                  <td className={styles.tableDanger}>₹14,400 / month</td>
                </tr>
                <tr>
                  <td>Disposable Packaging Materials</td>
                  <td>₹50,000</td>
                  <td>18% GST</td>
                  <td className={styles.tableDanger}>₹9,000 / month</td>
                </tr>
                <tr>
                  <td><strong>Total Monthly Blocked Credit</strong></td>
                  <td><strong>₹5,50,000</strong></td>
                  <td><strong>18% Blended</strong></td>
                  <td className={styles.tableDanger}><strong>₹99,000 / month (₹11.88L / yr)</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Take the illustrative figures above for a restaurant with ₹10 Lakhs in monthly revenue: it pays <strong>₹99,000
            every month</strong> in GST it cannot claim back. That is nearly 10% of gross revenue surrendered to
            unrecoverable indirect taxes.
          </p>

          <h2>7. Where KNOMI Fits: Zero Commission on Dine-In Orders</h2>
          <p>
            Because standalone restaurants cannot change the statutory 5% no-ITC regime, one practical lever for
            protecting net profitability is to <strong>reduce the operating expenses that carry GST you cannot claim back</strong>.
          </p>
          <p>
            In the illustrative table above, the largest single line is aggregator commission: ₹2,20,000 a month in
            commission carries another ₹39,600 in GST that cannot be recovered.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>The Direct Tabletop Option: KNOMI Visual QR Self-Ordering</div>
            <p className={styles.calloutText}>
              For guests already sitting in your dining room, <strong>KNOMI self-ordering</strong> keeps orders off
              commission-charging platforms:
              <br /><br />
              1. <strong>0% Commission:</strong> Orders placed from the KNOMI menu at your tables carry no commission,
              so there is no commission GST on them either. Like any software subscription, include KNOMI&apos;s own
              fee in your costs.
              <br />
              2. <strong>Works Alongside Your POS:</strong> KNOMI does not replace your billing. Your existing POS keeps
              handling GST invoices and bar billing, orders reach your kitchen display, and on the Signature plan KNOMI
              integrates with the POS you already use.
              <br />
              3. <strong>Simple Per-Table Pricing:</strong> Menu ₹149, Signature ₹250 (our recommended plan, including
              guest self-ordering and integration with your existing POS) and Ecosystem ₹500–600 (including Knomi Sense), per table, per
              month. <Link href="/#pricing">See pricing</Link>.
            </p>
          </div>

          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, guest experience infrastructure for restaurants. This guide is
                general information, not tax advice: confirm how these rules apply to your restaurant with your
                chartered accountant.
              </p>
            </div>
          </div>

          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions: GST Rates on Restaurant Food</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          <div className={styles.ctaCard}>
            <h3>Take Dine-In Orders With Zero Commission</h3>
            <p>
              KNOMI turns the QR on your table into an illustrated menu guests order from directly, with no app and no
              login. Orders go to your kitchen display, billing stays on the POS you already use, and we take 0%
              commission.
            </p>
            <Link href="/#book" className={styles.ctaButton}>
              Book a walkthrough
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
