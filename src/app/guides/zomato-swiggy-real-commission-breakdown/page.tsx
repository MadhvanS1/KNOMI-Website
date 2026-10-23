import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AggregatorCommissionCalculator from "./AggregatorCommissionCalculator";
import styles from "./AggregatorGuide.module.css";
import { GOAL, OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Zomato & Swiggy Commission 2026: The Real Settlement Math | KNOMI",
  description:
    "Understand every deduction between your Zomato or Swiggy menu price and your bank settlement in 2026: the settlement waterfall, unclaimable 18% GST on commission, and delivery markup math.",
  alternates: {
    canonical: "/guides/zomato-swiggy-real-commission-breakdown",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Zomato & Swiggy Commission 2026: The Real Settlement Math",
    description:
      "A complete breakdown of Zomato and Swiggy restaurant deductions in 2026. Explore the settlement waterfall, GST on commissions, and dual-menu pricing formulas.",
    url: "https://www.knomi.in/guides/zomato-swiggy-real-commission-breakdown",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "How much does Zomato and Swiggy charge a restaurant in 2026?",
    a: "Commission rates are set in each restaurant's contract and vary with format, city, volume and the services you opt into, so read the rate on your own agreement. What matters is the total deducted: once 18% GST on the commission, payment-gateway fees and any restaurant-funded discounts are added, the cash deducted is well above the headline commission. In this guide's worked example (22% commission, 20% funded discount), a ₹500 order settles at about ₹287, a deduction of about 43% of the menu price.",
  },
  {
    q: "Why is the real deduction higher than the contract commission?",
    a: "Several deductions stack. Restaurant-funded discounts are borne entirely by the restaurant. The commission is charged on the order value (check your settlement statement for the exact base; in this guide's worked example it is the value after the funded discount). On top of that, the restaurant pays 18% GST on the commission and on payment-gateway fees, which standalone restaurants on the 5% scheme cannot claim back. Together, these push the net bank settlement well below the original menu price.",
  },
  {
    q: "Can a standalone Indian restaurant claim back the 18% GST charged on aggregator commissions?",
    a: "No. The vast majority of standalone Indian restaurants operate under the mandatory 5% GST rate without Input Tax Credit (ITC). Because these restaurants cannot claim ITC, the 18% GST charged by Zomato and Swiggy on their commissions, payment gateway fees and any other service fees is a fully unrecoverable operating cost.",
  },
  {
    q: "Did Zomato and Swiggy increase restaurant commissions in March 2026?",
    a: "The March 2026 reports were about consumer-facing platform fees, not restaurant commissions: Zomato's fee was reported at ₹14.90 per order before tax and Swiggy's at ₹17.58 including GST. That fee is charged to the diner at checkout and is not deducted from restaurant payouts, though a higher total bill can make diners more price-sensitive.",
  },
  {
    q: "What is the formula to mark up delivery menu prices to preserve dine-in margins?",
    a: "To receive the same net amount from a food aggregator as you do in your dining room, use the formula: Delivery Listing Price = Dine-In Price divided by (1 minus Effective Take Rate). For example, if a dish is ₹300 for dine-in and your effective aggregator deduction is 30%: ₹300 divided by 0.70 ≈ ₹429. Listing the dish at ₹430, where your contract allows channel-specific pricing, means your net bank settlement covers the delivery deductions without eating into your profit.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Zomato and Swiggy Commission in 2026: The Real Settlement Waterfall",
      description:
        "Understand every deduction between your Zomato or Swiggy menu price and your bank settlement in 2026: the settlement waterfall, unclaimable 18% GST on commission, and delivery markup math.",
      url: "https://www.knomi.in/guides/zomato-swiggy-real-commission-breakdown",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/zomato-swiggy-real-commission-breakdown",
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
        description:
          "Co-Founder of KNOMI. Writes about restaurant unit economics, aggregator economics and operations.",
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
          name: "Zomato and Swiggy Commission Breakdown",
          item: "https://www.knomi.in/guides/zomato-swiggy-real-commission-breakdown",
        },
      ],
    },
  ],
};

export default function AggregatorCommissionGuidePage() {
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
            <span>Zomato & Swiggy Commission Breakdown</span>
          </div>

          <h1 className={styles.title}>
            Zomato & Swiggy Commission 2026: The Real Settlement Math
          </h1>

          <div className={styles.postMeta}>
            <span>By Madhvan Sharma, Co-Founder</span>
            <span>:</span>
            <span>Published September 2026</span>
            <span>:</span>
            <span>12 Min Read</span>
            <span>:</span>
            <span>Aggregator Economics</span>
          </div>

          <p className={styles.subtitle}>
            The commission rate on your contract is only part of the story. Once unclaimable GST, payment-gateway
            fees, and restaurant-funded discounts stack up, the cash deducted from an order can be far higher.
            Here is the settlement math, step by step, and how to protect your floor.
          </p>

          {/* Answer-First AEO Callout Box */}
          <div className={styles.aeoBox}>
            <span className={styles.aeoLabel}>Aggregator Settlement Reality (AEO Summary)</span>
            <p className={styles.aeoText}>
              Zomato and Swiggy deduct more than the headline commission. On top of the contract rate come 18% GST
              on that commission, payment-gateway fees, and any restaurant-funded promotional discounts. In this
              guide&apos;s worked example (22% commission, 20% funded discount), a ₹500 order settles at about ₹287,
              about 43% less than the menu price. Standalone restaurants under the 5% GST scheme cannot reclaim
              input tax credit on the GST they pay.
            </p>
          </div>

          {/* Takeaway Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>22%</div>
              <div className={styles.metricLabel}>
                Commission Assumed in Our Worked Example: use the rate on your own contract.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>42.6%</div>
              <div className={styles.metricLabel}>
                Total Deducted from a ₹500 Order in the Worked Example, after discount, GST, and gateway fees.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>18% Dead GST</div>
              <div className={styles.metricLabel}>
                Unclaimable GST on the Commission: a sunk cost for standalone restaurants on the 5% GST scheme.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>+39%</div>
              <div className={styles.metricLabel}>
                Markup Needed at a 28% Effective Deduction to Receive Your Dine-In Price (₹320 → ₹445).
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className={styles.articleBody}>
          <h2>The 2026 Deduction Map: Headline Rate vs Settlement Reality</h2>
          <p>
            Most restaurant owners remember signing on: the reach, the delivery fleet, and a commission rate
            that looked manageable on paper.
          </p>
          <p>
            Then the settlement statements start arriving. Say you sold ₹1,00,000 worth of food at menu prices
            and ₹63,000 reached your bank account. Where did the other ₹37,000 go?
          </p>
          <p>
            The gap comes from the difference between the <strong>Headline Commission Rate</strong> (the rate
            on your contract) and the <strong>Blended Settlement Take Rate</strong> (everything deducted before
            cash reaches your bank).
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Deduction Item</th>
                  <th>How It Is Set</th>
                  <th>Who Pays It?</th>
                  <th>Operational Impact on Restaurant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableHighlight}>Base Delivery Commission</td>
                  <td>A % set in your contract</td>
                  <td>Deducted from Restaurant</td>
                  <td>Check your statement for the base; in our worked example it is charged on order value after restaurant-funded discounts.</td>
                </tr>
                <tr>
                  <td>Chain / Volume Negotiated Rate</td>
                  <td>Negotiated</td>
                  <td>Deducted from Restaurant</td>
                  <td>Larger, high-volume brands can negotiate their own terms.</td>
                </tr>
                <tr>
                  <td className={styles.tableDanger}>18% GST on Commission</td>
                  <td>18% of Commission</td>
                  <td>Deducted from Restaurant</td>
                  <td>
                    <strong>Unclaimable cost</strong> for restaurants under the 5% no-ITC regime.
                  </td>
                </tr>
                <tr>
                  <td>Payment Gateway Collection Fee</td>
                  <td>A % per prepaid order (see your contract)</td>
                  <td>Deducted from Restaurant</td>
                  <td>Levied on prepaid online UPI, credit card, and net banking orders, plus 18% GST.</td>
                </tr>
                <tr>
                  <td className={styles.tableDanger}>Restaurant-Funded Discounts</td>
                  <td>Your choice, per campaign</td>
                  <td>100% Borne by Restaurant</td>
                  <td>Can be the largest line on the statement; weigh each campaign against the orders it brings in.</td>
                </tr>
                <tr>
                  <td>Zomato Gold / Swiggy One Subsidies</td>
                  <td>Co-funded discounts</td>
                  <td>Partially Borne by Restaurant</td>
                  <td>Terms vary; read the participation terms before opting in.</td>
                </tr>
                <tr>
                  <td>Section 194-O TDS</td>
                  <td>0.1%</td>
                  <td>Withheld by Platform</td>
                  <td>Minor tax withholding adjustable against your annual advance income tax return.</td>
                </tr>
                <tr>
                  <td className={styles.tableSuccess}>Consumer Platform Fee (March 2026)</td>
                  <td>Reported at ₹14.90 to ₹17.58 / order</td>
                  <td>Paid by Consumer</td>
                  <td>Charged directly to the customer at checkout; NOT deducted from your payout.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>The ₹500 Order Settlement Waterfall: Step-by-Step Math</h2>
          <p>
            To see how a 22% commission becomes a much larger deduction, let us trace a hypothetical ₹500 order
            for a Chicken Dum Biryani on an aggregator platform. The worked example assumes a 22% commission,
            a 20% restaurant-funded discount, and a 1.84% payment-gateway fee; replace them with your own terms.
          </p>

          <div className={styles.waterfallList}>
            <div className={styles.waterfallItem}>
              <span>1. Listed Menu Price</span>
              <strong>₹500.00</strong>
            </div>
            <div className={`${styles.waterfallItem} ${styles.waterfallItemDeduct}`}>
              <span>2. Less: Restaurant-Funded Promo Discount (20%)</span>
              <span>-₹100.00</span>
            </div>
            <div className={styles.waterfallItem} style={{ fontWeight: 600 }}>
              <span>3. Net Order Value (The Base for Commission)</span>
              <span>₹400.00</span>
            </div>
            <div className={`${styles.waterfallItem} ${styles.waterfallItemDeduct}`}>
              <span>4. Less: Base Commission (22% on ₹400)</span>
              <span>-₹88.00</span>
            </div>
            <div className={`${styles.waterfallItem} ${styles.waterfallItemDeduct}`}>
              <span>5. Less: 18% GST on Commission (18% of ₹88)</span>
              <span>-₹15.84</span>
            </div>
            <div className={`${styles.waterfallItem} ${styles.waterfallItemDeduct}`}>
              <span>6. Less: Payment Gateway Fee + 18% GST (~2.17% of ₹400)</span>
              <span>-₹8.68</span>
            </div>
            <div className={`${styles.waterfallItem} ${styles.waterfallItemDeduct}`}>
              <span>7. Less: Section 194-O TDS (0.1% of ₹400)</span>
              <span>-₹0.40</span>
            </div>
            <div className={`${styles.waterfallItem} ${styles.waterfallItemFinal}`}>
              <span>8. Net Bank Payout Remitted to Restaurant</span>
              <span style={{ color: "var(--color-whiskey-sour)" }}>₹287.08</span>
            </div>
          </div>

          <p>
            Look at that final number: <strong>₹287.08</strong> deposited in your bank account from a dish you
            priced at ₹500.00. That is a total deduction of <strong>₹212.92, or 42.58% of your menu price</strong>.
          </p>
          <p>
            Now consider the kitchen expenses required to produce that biryani:
          </p>
          <ul>
            <li><strong>Raw Food Cost (30% of ₹500):</strong> ₹150.00 (Chicken, basmati rice, ghee, spices).</li>
            <li><strong>Packaging & Container:</strong> ₹15.00 (Microwave-safe container, tamper-proof tape, carry bag).</li>
            <li><strong>Total Direct Variable Expense:</strong> ₹165.00.</li>
          </ul>
          <p>
            Subtract that ₹165.00 from your ₹287.08 net payout, and the restaurant is left with
            <strong> ₹122.08</strong> to pay kitchen staff salaries, store rent, electricity, commercial gas, and taxes.
          </p>

          {/* Interactive Calculator Component */}
          <AggregatorCommissionCalculator />

          <h2>The 18% GST Trap That Sinks Standalone Kitchens</h2>
          <p>
            One cost in Indian food delivery that is easy to miss is the 18% Goods and Services Tax
            levied on platform commissions.
          </p>
          <p>
            Under Indian GST law, standalone restaurant food service is taxed at a concessional rate of <strong>5% without
            Input Tax Credit (ITC)</strong>. This means when your restaurant purchases chicken from the butcher or
            vegetables from the mandi, you cannot claim credit for taxes paid.
          </p>
          <p>
            The commission charged by Zomato and Swiggy, by contrast, is a service taxed at the standard rate
            of <strong>18%</strong>.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>
              <span>The Asymmetric Tax Squeeze</span>
            </div>
            <p className={styles.calloutText}>
              Because your standalone restaurant has no Input Tax Credit eligibility, you cannot offset that 18%
              tax against your output liabilities. On an 18% base commission, you pay an extra 3.24% of the net order
              value as dead tax. On a 25% commission, you pay an extra 4.5%. Say you do ₹50 lakh a year in delivery
              sales at a 22% commission: the GST on that commission alone is about ₹1,98,000 a year, none of which you
              can claim back.
            </p>
          </div>

          <h2>Section 9(5) CGST Act: Demystifying TCS and TDS Rules</h2>
          <p>
            Some outdated blog posts and legacy accounting software still state that food aggregators deduct
            1% Tax Collected at Source (TCS) under GST. This has been obsolete since January 2022.
          </p>
          <ul>
            <li>
              <strong>Section 9(5) Deemed Supplier Status:</strong> Under Notification No. 17/2021-Central Tax (Rate),
              electronic commerce operators (ECOs) like Zomato and Swiggy are legally deemed the suppliers of
              restaurant services. The platform collects the 5% GST directly from the consumer and deposits it directly
              with the central and state governments.
            </li>
            <li>
              <strong>Zero TCS on Food Delivery:</strong> The Central Board of Indirect Taxes and Customs (CBIC)
              Circular No. 167/23/2021 clarified that because aggregators pay GST under Section 9(5),
              they are <strong>not required to collect 1% TCS</strong> on these restaurant services. If your accountant is looking
              for TCS credits on GSTR-2A for delivery sales, they are chasing a ghost.
            </li>
            <li>
              <strong>Section 194-O Income Tax TDS (0.1%):</strong> Platforms are required to withhold 0.1% under
              Section 194-O of the Income Tax Act (reduced from 1.0% in October 2024). This is visible on
              your Form 26AS / AIS and can be credited against your year-end income tax liability.
            </li>
          </ul>

          <h2>The March 2026 Consumer Platform Fee Hike: Separating Fact from Fiction</h2>
          <p>
            In March 2026, business headlines across India reported that Zomato had raised its platform fee to ₹14.90
            per order (before tax) and that Swiggy&apos;s stood at ₹17.58 (inclusive of GST). It is easy to read this as
            a commission increase. It is not.
          </p>
          <p>
            It is critical to distinguish consumer charges from merchant deductions:
          </p>
          <ul>
            <li>
              <strong>Consumer Fee, Not Restaurant Cut:</strong> The platform fee is added to the customer&apos;s bill
              at the checkout screen. It is paid by the diner to the platform and is not deducted from
              your restaurant settlement statement.
            </li>
            <li>
              <strong>The Indirect Friction Impact:</strong> While not a direct deduction, a fixed fee is a noticeable
              share of a small order. On a ₹250 roll, the platform fee plus delivery charges and taxes lift the total
              well above the menu price, which can make diners more price-sensitive and tempt restaurants into
              deeper discounts.
            </li>
          </ul>

          <h2>The Dine-In Question: Should You Pay a Platform for Table 4?</h2>
          <p>
            Paying a commission on a delivery order buys real services: a digital storefront, marketing reach,
            a rider, and doorstep fulfilment.
          </p>
          <p>
            The dine-in case is different. When a guest walks through your door, sits at your table, and drinks
            water poured by your staff, think carefully before paying a platform a share of that bill.
          </p>
          <p>
            Dine-in programmes such as <strong>Zomato Pay, Swiggy Dineout, and District</strong> bring discovery
            and offers to your tables. Before you join or renew, check what each one costs you per bill:
          </p>
          <ul>
            <li>
              <strong>The Offer:</strong> The guest pays through the app and may receive a discount. Check how much
              of that discount your restaurant funds.
            </li>
            <li>
              <strong>The Fee:</strong> Check the commission or processing fee charged to the restaurant on each
              transaction.
            </li>
            <li>
              <strong>The Net Effect:</strong> Add the funded discount and the fee together and compare that with the
              cost of taking the same payment directly (UPI to your own account, or your card terminal), for a guest
              who may already have been planning to pay full price.
            </li>
          </ul>

          <h2>The Dual-Menu Markup Formula: Preserving Dine-In Margins</h2>
          <p>
            List identical prices on delivery apps and in your dining room, and the deductions come straight out of
            your margin. To offset your effective delivery deduction, set an intentional delivery markup, where your
            platform contract allows channel-specific pricing.
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Delivery Menu Pricing Formula</div>
            <div className={styles.formulaEquation}>
              Delivery Listing Price = Dine-In Price / (1 - Effective Take Rate)
            </div>
            <p className={styles.formulaNote}>
              Where Effective Take Rate includes base commission, unclaimable 18% GST, and packaging buffer.
            </p>
          </div>

          <p>
            If your Butter Chicken is priced at <strong>₹320 on your dine-in menu</strong>, and your effective
            aggregator deduction rate is 28%:
          </p>
          <p>
            <code>₹320 / (1 - 0.28) = ₹320 / 0.72 = ₹444.44</code>
          </p>
          <p>
            Listing that Butter Chicken at <strong>₹445 or ₹450 on Zomato and Swiggy</strong> means that after
            an effective 28% deduction, your bank receives the ₹320 required to maintain your baseline
            kitchen food cost and operational contribution.
          </p>

          <h2>How Direct QR Self-Ordering Closes the Margin Leak</h2>
          <p>
            Aggregators are exceptional discovery engines for customers you have never served. But once a guest
            is sitting inside your restaurant, the order can stay entirely yours.
          </p>
          <p>
            KNOMI gives your dining room its own browser-based menu and ordering:
          </p>
          <ul>
            <li>
              <strong>No App, No Login:</strong> Guests scan the QR on the table and browse an illustrated menu
              themed to your restaurant in their phone&apos;s browser. They confirm an order with their phone number.
            </li>
            <li>
              <strong>0% Commission:</strong> Nothing is taken from your orders. What your guests order is yours.
              We share KNOMI&apos;s pricing on a short <Link href="/#book" className={styles.inlineLink}>walkthrough call</Link>, once we
              understand your restaurant.
            </li>
            <li>
              <strong>Knomi Host at Every Table:</strong> Knomi Host suggests the pairing as guests order, the way
              your best server would. {GOAL}
            </li>
          </ul>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, based in Bengaluru. He writes about restaurant unit economics,
                aggregator economics, and floor operations for independent restaurateurs who want to find hidden
                costs and protect their margins.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions: Zomato & Swiggy Commissions</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          {/* Bottom CTA Card */}
          <div className={styles.ctaCard}>
            <h3>Keep Your Dining Room Direct: 0% Commission on Every Dine-In Order</h3>
            <p>
              Your guests are already at your tables. See how KNOMI gives them an illustrated menu with a warm host
              inside, sends orders straight to your kitchen display, and takes 0% commission.
            </p>
            <Link href="/#book" className={`${styles.ctaButton} pressable`}>
              Book a walkthrough &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
