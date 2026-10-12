import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarginCalculator from "./MarginCalculator";
import styles from "./MarginGuide.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Restaurant Profit Margin in India: An Honest P&L Breakdown (2026) | KNOMI",
  description:
    "An honest, worked P&L for an Indian restaurant: how prime cost, metro rent, and the aggregator channel mix decide what is left as net profit, with a simulator for your own numbers.",
  alternates: {
    canonical: "/guides/restaurant-profit-margin-benchmarks-india",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Restaurant Profit Margin in India: An Honest P&L Breakdown (2026)",
    description:
      "A bottom-up, worked breakdown of restaurant profit margins in India. Understand prime cost, occupancy, and the impact of aggregator commissions.",
    url: "https://www.knomi.in/guides/restaurant-profit-margin-benchmarks-india",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is a good profit margin for an Indian restaurant?",
    a: "Published figures vary widely, so build yours from your own P&L. In the worked example in this guide, a ₹10 Lakh-a-month casual dining room with 32% food cost, 22% labour, and 12% rent ends up with a 9% net profit. Your own figure depends far more on rent and channel mix (dine-in vs delivery) than on cuisine type.",
  },
  {
    q: "Why do some sources quote much higher restaurant profit margins?",
    a: "Usually because they quote gross margin (revenue minus raw food cost) instead of net profit. A 30% food cost leaves a 70% gross margin, which is easy to mistake for profit. True net profit only counts what remains after paying rent, staff salaries, electricity, licensing, and equipment depreciation.",
  },
  {
    q: "What is prime cost in an Indian restaurant and why does it matter?",
    a: "Prime cost is the combined total of food cost and total front-of-house and kitchen labour cost, expressed as a percentage of revenue. In the worked example in this guide it is 54% (food 32% + labour 22%). Because food and labour are the biggest costs you can manage week to week, tracking prime cost weekly is essential to protecting monthly cashflow.",
  },
  {
    q: "How much of restaurant revenue should go toward rent in Indian metros?",
    a: "There is no single rule, but rent is fixed from the day you sign the lease. In the worked example in this guide, moving rent from 12% to 18% of revenue cuts net profit from 9% to 3%. If occupancy is high relative to revenue, cost-cutting on food or napkins cannot close the gap: operators need more revenue from the same room, through table turnover and average order value.",
  },
  {
    q: "Do food delivery aggregator orders make money for dine-in restaurants?",
    a: "They can reduce net margins more than the headline commission suggests. Once you add 18% GST on the commission, discounts you fund, and other platform fees, the effective cost is well above the headline rate, so check your own payout statements. For guests already seated in your dining room, 0% commission direct QR ordering keeps the full menu margin.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Restaurant Profit Margin in India: An Honest P&L Breakdown (2026)",
      description:
        "A bottom-up, worked breakdown of restaurant profit margins in India: how prime cost, metro rent, and the aggregator channel mix decide what is left as net profit.",
      url: "https://www.knomi.in/guides/restaurant-profit-margin-benchmarks-india",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/restaurant-profit-margin-benchmarks-india",
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
          url: "https://www.knomi.in/logo.png",
        },
      },
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
          name: "Restaurant Profit Margin Benchmarks India",
          item: "https://www.knomi.in/guides/restaurant-profit-margin-benchmarks-india",
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
  ],
};

export default function ProfitMarginGuidePage() {
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
              <Link href="/guides">Guides</Link>
              <span>/</span>
              <span>Profit Margin Benchmarks</span>
            </nav>

            <h1 className={styles.title}>
              Restaurant Profit Margin in India: An Honest P&L Breakdown (2026)
            </h1>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated September 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>

            <p className={styles.subtitle}>
              A bottom-up operational breakdown of Indian dining economics: what a worked ₹10 Lakh-a-month
              P&L leaves as net profit, how rent squeezes it, and what aggregator delivery cuts do to margin.
            </p>

            {/* Answer-First AEO Snippet Box */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>The Quick Answer</span>
              <p className={styles.aeoText}>
                Net margins in Indian restaurants are thinner than most people expect. Very high profit figures usually
                quote gross margin (sales minus raw food) before rent, staff wages, electricity, and taxes. In our worked
                example, a ₹10 Lakh-a-month metro dining room spends 54% of sales on prime cost (food + labour) and 12% on
                rent, and nets 9%. Route 40% of its sales through delivery aggregators at an assumed 30% effective cut,
                and that 9% turns into a 3% loss.
              </p>
            </div>

            {/* Key Benchmark Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>9%</div>
                <div className={styles.metricLabel}>Net Profit in the Worked ₹10 Lakh Example</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>54%</div>
                <div className={styles.metricLabel}>Prime Cost in the Example (Food 32% + Labour 22%)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>3%</div>
                <div className={styles.metricLabel}>Net Profit in the Example if Rent Rises from 12% to 18%</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>-3%</div>
                <div className={styles.metricLabel}>Net Result in the Example with 40% of Sales via Aggregators</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className={styles.articleBody}>
          <p>
            Net margins in Indian restaurants are thin, and many rooms run much closer to break-even than their
            busy dining rooms suggest. Where a restaurant lands depends on a handful of lines in its P&L: food,
            labour, rent, and the channels its orders come through.
          </p>
          <p>
            If you have read that restaurants make very high profits, check whether the figure is gross margin
            wearing a net-margin label. This guide explains why published figures conflict so wildly, builds a
            worked ₹10 Lakhs monthly P&L from the bottom up, and highlights the channel decision that can decide
            whether a room is profitable or losing money.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>Key Takeaways for Indian Restaurateurs</div>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li>
                <strong>Realistic Net Margin:</strong> In our worked example, a well-run ₹10 Lakh-a-month room nets 9%.
                Build your own number from your P&L rather than trusting a headline figure.
              </li>
              <li>
                <strong>Gross vs Net Confusion:</strong> High published figures often reflect gross
                margin (revenue minus food purchases) before deducting staff salaries, rent, and power.
              </li>
              <li>
                <strong>Prime Cost Discipline:</strong> Food plus labour is the largest block of cost.
                It is the only expense category that can be managed weekly rather than after the month has closed.
              </li>
              <li>
                <strong>The Rent Trap:</strong> In the example, rent rising from 12% to 18% of revenue cuts net profit
                from 9% to 3%, and no amount of kitchen ingredient bargaining will win that back.
              </li>
              <li>
                <strong>Channel Mix Decides Fate:</strong> In the same example, a restaurant netting 9% on direct dine-in
                orders swings to a -3% loss if 40% of its volume goes through aggregators at an assumed 30% effective cut.
              </li>
            </ul>
          </div>

          <h2>Why Every Source Gives a Different Number</h2>
          <p>
            Search for Indian restaurant profit margins and you will see numbers that vary wildly.
            Here is why different kinds of sources disagree:
          </p>

          <div className={styles.tableContainer}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th>Source Type</th>
                  <th>Typical Figure Quoted</th>
                  <th>Reality Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Marketing Content</strong></td>
                  <td>Often high</td>
                  <td>Frequently gross margin (sales minus raw food) before rent and payroll</td>
                </tr>
                <tr>
                  <td><strong>General Business Portals</strong></td>
                  <td>Wide ranges across categories</td>
                  <td>Blending dhabas with prime metro fine dining without P&L expense detail</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Accountants&apos; P&L Statements</strong></td>
                  <td>Usually much lower</td>
                  <td>Net income after all operational overhead, depreciation, and tax</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Two factors explain why this gap exists:
          </p>
          <p>
            <strong>1. Gross margin and net margin get conflated:</strong> Gross margin is revenue minus
            the direct cost of food and beverage. If your food cost is 32%, your gross margin is 68%.
            That is a real operational metric, but it is not profit: it has not paid rent, staff salaries,
            power, gas, GST liabilities, or owner draws. Net margin is what remains after every single bill is cleared.
          </p>
          <p>
            <strong>2. Who is writing matters:</strong> Accountants see the full P&L; marketing content often does not.
            KNOMI makes software for restaurants too, which is exactly why we show our working below and let you
            plug in your own numbers.
          </p>

          <h2>The Complete Bottom-Up P&L of a ₹10 Lakh/Month Restaurant</h2>
          <p>
            Say a 20-table casual dining restaurant or cafe in an Indian metro (Bangalore, Mumbai, Delhi NCR, or Pune)
            generates ₹10,00,000 in gross monthly turnover. The percentages below are assumptions for this worked
            example, not industry benchmarks; replace them with your own in the simulator further down:
          </p>

          <div className={styles.tableContainer}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th>P&L Expense Line</th>
                  <th>% of Revenue (Assumed)</th>
                  <th>Monthly Amount</th>
                  <th>Operational Function</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Food & Beverage Cost</td>
                  <td>32%</td>
                  <td>₹3,20,000</td>
                  <td>Raw ingredients, produce, dairy, protein, packaging</td>
                </tr>
                <tr>
                  <td>Labour & Staff Expenses</td>
                  <td>22%</td>
                  <td>₹2,20,000</td>
                  <td>Waiters, kitchen staff, PF/ESI, duty meals, uniforms</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Prime Cost Total</strong></td>
                  <td><strong>54%</strong></td>
                  <td><strong>₹5,40,000</strong></td>
                  <td><strong>Core controllable operational cost (Food + Labour)</strong></td>
                </tr>
                <tr>
                  <td>Rent & Common Area Maintenance (CAM)</td>
                  <td>12%</td>
                  <td>₹1,20,000</td>
                  <td>Dining room lease, outdoor patio, maintenance</td>
                </tr>
                <tr>
                  <td>Utilities (Electricity, Gas, Water)</td>
                  <td>6%</td>
                  <td>₹60,000</td>
                  <td>Commercial power tariff, kitchen gas banks, diesel generator</td>
                </tr>
                <tr>
                  <td>Marketing & Social Promotion</td>
                  <td>4%</td>
                  <td>₹40,000</td>
                  <td>Local promotions, photography, influencer dining, listings</td>
                </tr>
                <tr>
                  <td>Consumables & Repairs</td>
                  <td>5%</td>
                  <td>₹50,000</td>
                  <td>Napkins, sanitizer, kitchen equipment upkeep, pest control</td>
                </tr>
                <tr>
                  <td>Licenses, Software, Professional Fees</td>
                  <td>3%</td>
                  <td>₹30,000</td>
                  <td>FSSAI, music license, accounting, POS, table tech</td>
                </tr>
                <tr>
                  <td>Payment Gateway & Card Fees</td>
                  <td>1%</td>
                  <td>₹10,000</td>
                  <td>Credit card MDR, POS machine rental, UPI handling</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Total Operating Expenses</strong></td>
                  <td><strong>85%</strong></td>
                  <td><strong>₹8,50,000</strong></td>
                  <td><strong>Sum of day-to-day operational cash outflow</strong></td>
                </tr>
                <tr>
                  <td><strong>Operating EBITDA</strong></td>
                  <td><strong>15%</strong></td>
                  <td><strong>₹1,50,000</strong></td>
                  <td>Earnings Before Interest, Taxes, Depreciation & Amortization</td>
                </tr>
                <tr>
                  <td>Interior Fit-Out Depreciation & Loan Interest</td>
                  <td>6%</td>
                  <td>₹60,000</td>
                  <td>Kitchen equipment write-down, fit-out debt service</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Net Profit (True Bottom Line)</strong></td>
                  <td><strong>9%</strong></td>
                  <td><strong>₹90,000</strong></td>
                  <td><strong>Owner earnings on ₹10 Lakhs monthly sales in this example</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Nine percent. On ₹10 Lakhs of sales, that represents ₹90,000 in true net profit in this example. It shows
            why operators can feel exhausted and busy while wondering where the money went: 91% of incoming cash is
            spoken for before the owner takes a distribution.
          </p>

          <h2>Interactive P&L Simulator: Calculate Your True Net Margin</h2>
          <p>
            Use our interactive simulator below to model your restaurant P&L, evaluate the impact of metro
            rent, and see how aggregator channel cuts change your bottom line:
          </p>

          <MarginCalculator />

          <h2>Rent: The Line That Quietly Decides Profitability</h2>
          <p>
            Occupancy cost is a common margin killer in Indian metros. While restaurant operators
            often obsess over kitchen vegetable costs, rent is fixed on the day the lease is signed.
          </p>
          <p>
            In prime corridors such as Indiranagar or Koramangala (Bangalore), Bandra West (Mumbai), or
            Cyber Hub (Gurgaon), commercial rents can push occupancy well above the 12% in our example.
          </p>
          <p>
            Run the ₹10 Lakh P&L again with rent at 18% instead of 12%:
          </p>
          <ul>
            <li>Total operating costs rise from 85% to 91%.</li>
            <li>EBITDA drops from 15% to 9%.</li>
            <li>After fit-out depreciation (6%), net profit falls from 9% to just 3% (₹30,000/month).</li>
          </ul>
          <p>
            Same food menu, same kitchen team, same customer reviews, but two thirds of net profit vanished
            into the lease agreement. When rent is high relative to revenue, you cannot fix it through food
            purchasing. The viable path is growing revenue against that fixed cost: more covers from the same tables,
            and a higher average order from each one.
          </p>

          <h2>The Aggregator Trap: The Swing That Dwarfs Food Cost</h2>
          <p>
            Hospitality operators routinely spend hours negotiating tomato and chicken prices to save a few thousand
            rupees a month. Yet many overlook the channel mix through which orders are taken.
          </p>
          <p>
            When orders flow through food delivery aggregators, the headline commission is only the starting point.
            Once you add:
          </p>
          <ul>
            <li>18% GST levied on the aggregator commission</li>
            <li>Payment gateway deductions</li>
            <li>Merchant-funded discounts and coupon codes</li>
            <li>Platform operational fees and delivery packaging</li>
          </ul>
          <p>
            the effective take can end up <strong>well above the headline rate</strong>. Check your own payout
            statements to find yours.
          </p>
          <p>
            Consider what happens to our ₹10 Lakh room if 40% of orders are routed through delivery aggregators
            at an effective 30% deduction (an assumption for this example):
          </p>

          <div className={styles.tableContainer}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th>Financial Parameter</th>
                  <th>100% Direct Dine-In</th>
                  <th>40% Routed via Aggregators</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Menu Sales</td>
                  <td>₹10,00,000</td>
                  <td>₹10,00,000</td>
                </tr>
                <tr>
                  <td>Net Cash Received</td>
                  <td>₹10,00,000</td>
                  <td>₹8,80,000 (₹1,20,000 lost to platform fees)</td>
                </tr>
                <tr>
                  <td>Total Costs (incl. Depreciation &amp; Interest)</td>
                  <td>₹9,10,000</td>
                  <td>₹9,10,000 (Salaries and rent do not decrease)</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Final Net Result</strong></td>
                  <td><strong>+₹90,000 (+9% Profit)</strong></td>
                  <td><strong>-₹30,000 (-3% Net Monthly Loss)</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The exact same kitchen, the exact same ingredient cost, the exact same rent, yet in this example the room
            moves from a healthy 9% net profit to losing ₹30,000 every month purely because of where
            the order was placed.
          </p>
          <p>
            Aggregators provide valuable top-of-funnel customer acquisition for home delivery. But when
            guests are already seated inside your dining room, sending them through aggregator apps or
            failing to capture repeat dine-in visits leaks your most profitable revenue stream.
          </p>

          <h2>Five Practical Rules to Protect Indian Restaurant Margins</h2>
          <ol>
            <li>
              <strong>Prioritize direct table self-ordering:</strong> Dine-in guests should order directly
              from your own QR menu at 0% commission. Never direct table guests to third-party delivery platforms.
            </li>
            <li>
              <strong>Review Prime Cost weekly:</strong> Do not wait for monthly accountant books. Check food
              purchases and payroll every Monday morning to catch cost creep before it compounds. Read our detailed{" "}
              <Link href="/guides/restaurant-labour-cost-benchmarks-india">
                Indian restaurant labour cost benchmarks
              </Link>{" "}
              to right-size your staffing ratios.
            </li>
            <li>
              <strong>Expand average ticket size at the moment of ordering:</strong> Fixed overhead (rent, staff,
              power) does not increase when a seated diner adds a dessert or beverage. In KNOMI,{" "}
              <strong>Knomi Host</strong>, the host inside the menu, suggests the pairing while the guest is choosing:
              garlic bread with the pizza, a cold coffee with the brownie. Our goal is to lift your average order by
              around 25%. In the trial we measure it on your own tables, and you see the numbers.
            </li>
            <li>
              <strong>Model your front-of-house workload:</strong> When orders go straight from the guest&apos;s phone
              to the kitchen display, staff spend less time transcribing orders and more time looking after tables. Use our{" "}
              <Link href="/guides/self-ordering-roi">
                Self-Ordering ROI Calculator
              </Link>{" "}
              to model it with your own staffing numbers.
            </li>
            <li>
              <strong>Treat lease renewals as financial pivots:</strong> High occupancy cost is the hardest line
              to fix later. Negotiate rent-free periods or revenue-share caps during lease renegotiations.
            </li>
          </ol>
        </article>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitle}>
              Practical answers on Indian restaurant profitability, prime cost, and channel margins.
            </p>

            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Ready to protect your restaurant net margin?</h2>
            <p className={styles.ctaDesc}>
              KNOMI gives your tables an illustrated QR menu with Knomi Host inside it: guests order from their phone,
              orders land on your kitchen display, and you pay 0% commission. One flat price per table, per month:
              Menu ₹149, Signature ₹250 (our recommendation), or Ecosystem ₹500–600.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={bookHref} className="btn btn--primary btn--large">
                Book a walkthrough
              </Link>
              <a
                href="https://wa.me/918123728574?text=Hi%2C%20I%20want%20to%20see%20KNOMI%20demo%20for%20my%20restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--large"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
