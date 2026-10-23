import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreakEvenCalculator from "./BreakEvenCalculator";
import styles from "./BreakEvenGuide.module.css";
import { GOAL, OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Restaurant Break Even Point: Formula, Indian Example & Calculator (2026) | KNOMI",
  description:
    "Learn how to calculate your restaurant break even point in India. Master the formula, classify fixed vs variable costs, convert monthly sales to daily covers, and use our interactive calculator.",
  alternates: {
    canonical: "/guides/restaurant-break-even-calculator-india",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Restaurant Break Even Point: Formula, Indian Example & Calculator (2026)",
    description:
      "A complete guide to calculating your restaurant break-even point in India. Includes the step-by-step formula, a worked 60-seat Bengaluru example, and an interactive simulator.",
    url: "https://www.knomi.in/guides/restaurant-break-even-calculator-india",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is the break even point for an Indian restaurant?",
    a: "The restaurant break even point is the sales volume at which total gross revenue exactly equals the sum of all fixed and variable operating costs, leaving exactly zero profit. It is not an arbitrary industry percentage: your specific rent, staff wages, raw food cost, menu pricing, and aggregator delivery mix determine your exact figure.",
  },
  {
    q: "What is the formula to calculate restaurant break even sales in India?",
    a: "The formula is: Break Even Sales = Total Fixed Costs divided by Contribution Margin Ratio. The contribution margin ratio equals (Gross Sales minus Variable Costs) divided by Gross Sales. For example, if monthly fixed costs are ₹4,40,000 and the contribution margin ratio is 58%, the monthly break even sales target is ₹7,58,621 (roughly ₹7.59 Lakhs).",
  },
  {
    q: "Should restaurant staff salaries be treated as fixed or variable costs?",
    a: "Regular monthly front-of-house and kitchen salaries are treated as fixed costs because they do not fluctuate directly with day-to-day dish sales. However, sales-linked incentives, banquet-specific casual shifts, and overtime pay should be classified as variable costs.",
  },
  {
    q: "How do you convert a monthly break even number into daily operational targets?",
    a: "Divide the monthly break even sales by your active operating days in the month (e.g. 30 days for continuous service, or 26 days if closing on Mondays). Then divide that daily sales target by your Average Order Value (AOV) per guest. For a ₹7.59 Lakh target across 30 days at ₹650 average spend per guest, the floor team must seat at least 39 covers per day to break even.",
  },
  {
    q: "How does direct QR self-ordering lower a restaurant's break even point?",
    a: "Direct tabletop ordering can touch both sides of the formula. On the margin side, orders placed on your own QR menu carry no third-party commission (KNOMI takes 0% commission), so if some of your dine-in bills currently pass through third-party apps or platform-funded discount programmes, those sales keep more of their contribution margin. On the cost side, when guests place their own orders, servers spend less time taking orders and more time running food and looking after tables, which may change how you staff a busy shift. Remember that any software you add is a cost too, so include it in your fixed costs. The size of each effect depends on your own sales mix and floor, so test it with your own numbers in the calculator.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Restaurant Break Even Point: Formula, Indian Example & Calculator (2026)",
      description:
        "Learn how to calculate your restaurant break even point in India. Master the formula, classify fixed vs variable costs, convert monthly sales to daily covers, and use our interactive simulator.",
      url: "https://www.knomi.in/guides/restaurant-break-even-calculator-india",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/restaurant-break-even-calculator-india",
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
          name: "Restaurant Break Even Calculator India",
          item: "https://www.knomi.in/guides/restaurant-break-even-calculator-india",
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

export default function BreakEvenGuidePage() {
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
              <span>Break Even Calculator</span>
            </nav>

            <h1 className={styles.title}>
              Restaurant Break Even Point: Formula, Indian Example & Calculator (2026)
            </h1>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated September 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>

            <p className={styles.subtitle}>
              How to calculate the exact monthly revenue and daily covers your restaurant requires
              to cover all fixed overhead and variable costs before earning your first rupee of operating profit.
            </p>

            {/* Answer-First AEO Snippet Box */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>The Quick Answer</span>
              <p className={styles.aeoText}>
                The restaurant break even point formula is: Fixed Costs divided by Contribution Margin Ratio.
                Contribution margin ratio is calculated as (Gross Sales minus Variable Costs) divided by Gross Sales.
                Say a 60-seat casual dining restaurant has ₹4,40,000 in monthly fixed overhead (rent, salaries,
                utilities) and a 42% variable cost ratio (a 58% contribution margin). Its break-even sales are
                ₹7,58,621 per month: about ₹25,300 per day, or 39 guests a day at ₹650 average spend.
              </p>
            </div>

            {/* Key Benchmark Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>₹7.59 Lakhs</div>
                <div className={styles.metricLabel}>Monthly Break Even (Worked 60-Seat Example)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>58%</div>
                <div className={styles.metricLabel}>Contribution Margin Ratio in the Example</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>39 Covers</div>
                <div className={styles.metricLabel}>Daily Guests at ₹650 Average Spend</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>0%</div>
                <div className={styles.metricLabel}>KNOMI Commission on Table Orders</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className={styles.articleBody}>
          <p>
            Your <strong>restaurant break even point</strong> is the operational line in the sand:
            the precise monthly revenue where your gross intake pays for every kilo of paneer, every
            waiter wage, your commercial power tariff, and your landlord lease, leaving exactly zero profit.
          </p>
          <p>
            Below this number, you are subsidizing dining guests out of your bank account. Above it,
            every additional plate of biryani or craft cocktail contributes straight to your net margin.
            For many restaurateurs, that distinction is sobering: having a crowded dining room on Friday
            night does not automatically guarantee the month broke even.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>Key Takeaways for Indian Restaurant Operators</div>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li>
                <strong>The Core Formula:</strong> Divide total monthly fixed costs by your contribution margin ratio.
              </li>
              <li>
                <strong>Audit Real Numbers:</strong> Use actual trailing expense records from the last 60 to 90 days
                instead of generic rules of thumb.
              </li>
              <li>
                <strong>Convert to Daily Floor Targets:</strong> Translate the monthly number into daily sales and
                daily guest covers so floor staff have an actionable metric.
              </li>
              <li>
                <strong>Break Even is the Floor, Not Success:</strong> Paying every bill and earning nothing for the
                founder is a survival metric. Always add a desired profit target to establish a healthy milestone.
              </li>
              <li>
                <strong>Recalculate Dynamically:</strong> Rerun your numbers whenever lease rentals, waiter salaries,
                ingredient pricing, or food delivery aggregator shares change.
              </li>
            </ul>
          </div>

          <h2>The Restaurant Break Even Point Formula</h2>
          <p>
            Standard cost-volume-profit (CVP) accounting dictates the fundamental formula for restaurant revenue:
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Primary Sales Break Even Formula</div>
            <div className={styles.formulaEquation}>
              Break Even Sales = Total Fixed Costs ÷ Contribution Margin Ratio
            </div>
            <p className={styles.formulaNote}>
              Where Contribution Margin Ratio = (Gross Sales - Variable Costs) ÷ Gross Sales
            </p>
          </div>

          <p>
            Because restaurants sell hundreds of different items at widely varying gross margins (say, a mocktail
            at an 18% food cost and a tiger prawn curry at 38%), calculating
            break-even in total sales rupees is infinitely more practical than attempting to determine
            individual break-even unit quantities for naan, coffee, or dessert. Your sales-weighted product
            mix is already captured inside your blended variable cost ratio.
          </p>

          <h2>Which Restaurant Expenses Are Fixed vs Variable?</h2>
          <p>
            To calculate your break even point accurately, every line item on your profit and loss statement
            must be assigned to either fixed costs or variable costs. The classification depends on how the
            cost behaves as dining volume changes:
          </p>

          <div className={styles.tableContainer}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th>Expense Category</th>
                  <th>Classification</th>
                  <th>Operational Accounting Rule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Rent & Common Area Maintenance (CAM)</strong></td>
                  <td>Fixed</td>
                  <td>Use your contracted monthly lease plus base maintenance dues</td>
                </tr>
                <tr>
                  <td><strong>Salaried Restaurant Staff</strong></td>
                  <td>Fixed</td>
                  <td>Core managers, head chefs, and full-time floor servers</td>
                </tr>
                <tr>
                  <td><strong>Raw Food & Beverage Ingredients</strong></td>
                  <td>Variable</td>
                  <td>Actual consumption (Opening Stock + Purchases - Closing Stock)</td>
                </tr>
                <tr>
                  <td><strong>Takeaway Packaging & Disposables</strong></td>
                  <td>Variable</td>
                  <td>Directly scales with the volume of orders packaged</td>
                </tr>
                <tr>
                  <td><strong>Credit Card & Payment Gateway Fees</strong></td>
                  <td>Variable</td>
                  <td>Percentage fees charged per processed transaction (check your gateway agreement)</td>
                </tr>
                <tr>
                  <td><strong>Aggregator Commissions & Funded Discounts</strong></td>
                  <td>Variable</td>
                  <td>Commission, fees and funded discounts deducted from platform payouts (use your own statements)</td>
                </tr>
                <tr>
                  <td><strong>Software, POS & Music Licenses</strong></td>
                  <td>Fixed</td>
                  <td>Convert annual subscriptions and compliance licenses into monthly sums</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Commercial Power & Kitchen Gas</strong></td>
                  <td>Mixed</td>
                  <td>Base connection load is fixed; kitchen cooking hours scale with volume</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Note on food costs:</strong> Food purchases do not equal food used. If you bought extra
            spices or bulk dairy before a festive weekend, treating the entire purchase invoice as that month&apos;s
            variable cost artificially inflates your break-even point. Use consumption accounting, matching the
            standard method in our guide to{" "}
            <Link href="/guides/restaurant-profit-margin-benchmarks-india">
              Indian restaurant profit margin benchmarks
            </Link>.
          </p>

          <h2>A Worked Indian Example: 60-Seat Casual Room in Bengaluru</h2>
          <p>
            Consider a hypothetical independent 60-seat casual dining restaurant in Bengaluru (e.g. HSR Layout or
            Koramangala), open 30 days a month. The figures below are illustrative; replace them with your own
            trailing 90-day averages:
          </p>

          <h3>Step 1: Calculate Total Monthly Fixed Costs</h3>
          <div className={styles.tableContainer}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th>Fixed Expense Item</th>
                  <th>Monthly Cash Outflow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Commercial Lease & CAM Dues</td>
                  <td>₹1,40,000</td>
                </tr>
                <tr>
                  <td>Base Staff Salaries & Employee Meals</td>
                  <td>₹2,30,000</td>
                </tr>
                <tr>
                  <td>Base Utilities (Base Power Load, Diesel Generator Maintenance)</td>
                  <td>₹45,000</td>
                </tr>
                <tr>
                  <td>Software Subscriptions, Accounting & Legal Licenses</td>
                  <td>₹25,000</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Total Monthly Fixed Overhead</strong></td>
                  <td><strong>₹4,40,000</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Step 2: Determine Blended Variable Cost Ratio</h3>
          <p>
            In this example, across the trailing three months the kitchen consumed raw food and beverages equal to 30% of gross sales.
            Packaging, merchant payment fees, and cleaning consumables accounted for 4%. Delivery aggregator
            deductions and customer discount subsidies accounted for 8% across their blended order mix.
          </p>
          <ul>
            <li><strong>Total Variable Cost Ratio:</strong> 30% + 4% + 8% = <strong>42%</strong></li>
            <li><strong>Contribution Margin Ratio:</strong> 100% - 42% = <strong>58% (0.58)</strong></li>
          </ul>

          <h3>Step 3: Calculate Monthly & Daily Break Even Targets</h3>
          <p>
            Dividing fixed costs by the contribution margin ratio gives:
          </p>
          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Worked Bengaluru Break Even Calculation</div>
            <div className={styles.formulaEquation}>
              ₹4,40,000 ÷ 0.58 = ₹7,58,621 per month
            </div>
            <p className={styles.formulaNote}>
              Rounded to an actionable target: ₹7.59 Lakhs per month
            </p>
          </div>

          <p>
            Now convert that monthly financial number into operational targets that your floor managers can run:
          </p>
          <ul>
            <li><strong>Daily Sales Target (30 Open Days):</strong> ₹7,58,621 ÷ 30 = <strong>₹25,287/day</strong></li>
            <li><strong>Daily Sales Target (26 Open Days, Closed Mondays):</strong> ₹7,58,621 ÷ 26 = <strong>₹29,178/day</strong></li>
            <li>
              <strong>Daily Covers Needed (at ₹650 Average Guest Spend):</strong> ₹25,287 ÷ ₹650 = <strong>39 Guests/Day</strong>
            </li>
          </ul>
          <p>
            With that number on the board, your floor manager can tell by 8:30 PM on a Tuesday whether the room is
            on track for 39 guests, or whether today will fall short of its share of rent and payroll.
          </p>

          <h2>Interactive Simulator: Calculate Your Exact Break Even Point</h2>
          <p>
            Use our interactive calculator below to model your restaurant&apos;s break-even targets, calculate
            daily covers, and test a what-if scenario with your own assumptions:
          </p>

          <BreakEvenCalculator />

          <h2>Turning Break Even into an Operating Profit Target</h2>
          <p>
            A break-even point is merely an operational safety threshold. Paying every bill and earning ₹0 for
            the founding team is not a sustainable business. To calculate the revenue required to hit a specific
            monthly profit goal, add the desired profit to your fixed overhead:
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Target Profit Sales Formula</div>
            <div className={styles.formulaEquation}>
              Target Sales = (Fixed Costs + Desired Profit) ÷ Contribution Margin Ratio
            </div>
          </div>

          <p>
            If our Bengaluru restaurant owner wants to generate ₹1,50,000 in monthly operating profit:
          </p>
          <div className={styles.formulaCard}>
            <div className={styles.formulaEquation}>
              (₹4,40,000 + ₹1,50,000) ÷ 0.58 = ₹10,17,241 (~₹10.17 Lakhs)
            </div>
            <p className={styles.formulaNote}>
              Requires ₹33,908 per day, or 53 dining covers at ₹650 per guest across 30 days.
            </p>
          </div>

          <p>
            The difference between ₹7.59 Lakhs and ₹10.17 Lakhs is the difference between mere survival and
            generating the investment returns you entered the hospitality industry to build.
          </p>

          <h2>How to Lower Your Restaurant Break Even Point</h2>
          <p>
            You can reduce your restaurant break even point in two ways: lowering fixed overhead, or expanding
            your contribution margin ratio. Here are five high-leverage steps:
          </p>
          <ol>
            <li>
              <strong>Reclaim dine-in orders from aggregators:</strong> Platform commissions, fees and funded discounts
              come straight out of your contribution margin. For guests already sitting in your room,{" "}
              <Link href="/compare/dotpe-vs-knomi">direct tabletop QR ordering</Link> means no third-party commission:
              KNOMI takes 0% commission. Check how much of your dine-in
              revenue currently passes through third-party apps or discount programmes, then rerun the formula without it.
            </li>
            <li>
              <strong>Cut front-of-house waiter bottlenecks:</strong> When guests order from their phones, servers
              spend less time writing orders and more time running food and looking after tables. Whether that
              changes your staffing is your call; our{" "}
              <Link href="/guides/self-ordering-roi">Self-Ordering ROI Calculator</Link> lets you model it with your
              own wages and table counts.
            </li>
            <li>
              <strong>Grow the average ticket:</strong> A higher average spend per guest lowers the number of covers
              you need to break even, without adding a rupee of rent. <strong>Knomi Host</strong>, the host inside
              the KNOMI menu, suggests pairings at every table: a drink with the starter, dessert near the end of the
              meal. {GOAL}
            </li>
            <li>
              <strong>Track actual vs theoretical food consumption:</strong> Recipe costing and weekly pantry
              audits prevent kitchen over-portioning and ingredient pilferage, keeping raw food cost close to the
              target you set when you costed the menu.
            </li>
            <li>
              <strong>Right-size staffing ratios:</strong> Read our detailed{" "}
              <Link href="/guides/restaurant-labour-cost-benchmarks-india">
                Indian restaurant labour cost benchmarks
              </Link>{" "}
              to check whether your front-of-house payroll is in proportion to your sales.
            </li>
          </ol>
        </article>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitle}>
              Key guidelines on break even formulas, cost classification, and daily cover targets in India.
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
            <h2 className={styles.ctaTitle}>See how KNOMI fits your break-even math</h2>
            <p className={styles.ctaDesc}>
              KNOMI helps you grow every table. Guests order directly from an illustrated menu, with no app and no
              login, and Knomi Host suggests the right pairing as they choose. Orders go straight to your kitchen
              display, and we take 0% commission. We share pricing on a short walkthrough call, once we
              understand your restaurant.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={bookHref} className="btn btn--primary btn--large">
                Book a walkthrough
              </a>
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
