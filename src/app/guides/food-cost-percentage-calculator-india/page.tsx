import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCostCalculator from "./FoodCostCalculator";
import styles from "./FoodCostGuide.module.css";
import { GOAL, OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Food Cost Percentage: Formula, Benchmarks & Calculator for Indian Restaurants (2026) | KNOMI",
  description:
    "Master food cost percentage calculation in India. Understand the COGS formula, actual vs theoretical variance leaks, illustrative category targets, and model your numbers with our interactive calculator.",
  alternates: {
    canonical: "/guides/food-cost-percentage-calculator-india",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Food Cost Percentage: Formula, Benchmarks & Calculator for Indian Restaurants (2026)",
    description:
      "A complete guide to calculating and cutting food cost percentage in Indian restaurants. Learn the period COGS formula, how to set category targets, and how to stop monthly inventory leaks.",
    url: "https://www.knomi.in/guides/food-cost-percentage-calculator-india",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is an ideal food cost percentage for Indian restaurants?",
    a: "There is no single correct number; set a target for your format and check it against your own period food cost. As illustrative planning ranges (not survey data): around 28% to 32% blended for casual dining and cafes, leaner for high-volume quick service, and higher for menus built on expensive proteins like mutton and seafood. The way to hold a healthy average is to balance higher-cost curries with low-cost, high-margin items such as breads and mocktails.",
  },
  {
    q: "How do you calculate food cost percentage for a restaurant?",
    a: "To calculate period food cost percentage: take your Cost of Goods Sold (Opening Inventory plus Purchases minus Closing Inventory), divide by your Total Food Sales for the same period, and multiply by 100. For an individual dish recipe: divide the total raw ingredient cost per portion by the dish menu selling price, and multiply by 100.",
  },
  {
    q: "Why is actual food cost always higher than recipe theoretical cost?",
    a: "The gap between recipe theoretical cost and actual monthly food cost is called variance leakage. Even a gap of a few percentage points of sales adds up to serious money over a year. It is caused by kitchen prep shrinkage, unmeasured over-portioning (a heavy hand with paneer or cheese), walk-in spoilage, free-poured liquor pegs, and unrecorded staff meals.",
  },
  {
    q: "What is the benchmark pour cost for an Indian bar?",
    a: "Set your own target from your bar menu: spirits, cocktails and draught beer usually carry a lower cost percentage than food. Free-pouring erodes that margin quickly. If a 45ml peg drifts to 60ml, you pour a third more spirit for the same price, so a 20% pour cost becomes about 27%.",
  },
  {
    q: "How often should an Indian restaurant conduct physical inventory counts?",
    a: "High-value, perishable items (chicken, mutton, paneer, imported cheese, cooking oil, and liquor) should be counted weekly. Dry grains, spices, and non-perishables can be audited on a monthly cycle. Measuring weekly stops margin drift before small daily leaks turn into large quarterly losses.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Food Cost Percentage: Formula, Benchmarks & Calculator for Indian Restaurants (2026)",
      description:
        "Master food cost percentage calculation in India. Understand the COGS formula, actual vs theoretical variance leaks, illustrative category targets, and model your numbers with our interactive calculator.",
      url: "https://www.knomi.in/guides/food-cost-percentage-calculator-india",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/food-cost-percentage-calculator-india",
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
          "Co-Founder of KNOMI. Writes about restaurant unit economics, kitchen cost control and front-of-house operations.",
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
      datePublished: "2026-09-05T23:00:00+05:30",
      dateModified: "2026-09-05T23:00:00+05:30",
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
          name: "Food Cost Percentage Guide",
          item: "https://www.knomi.in/guides/food-cost-percentage-calculator-india",
        },
      ],
    },
  ],
};

export default function FoodCostGuidePage() {
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
              <span>Food Cost Percentage Guide</span>
            </nav>

            <h1 className={styles.title}>
              Food Cost Percentage: How to Calculate It, Benchmark It & Cut It
            </h1>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Finance & Operations</span>
              <span>•</span>
              <span>Updated September 2026</span>
            </div>

            <p className={styles.subtitle}>
              Food cost percentage is the single clearest operational pulse of your kitchen.
              Many restaurateurs believe their food cost is whatever their recipe cards say,
              while the month-end stock count can tell a very different story. Here is the exact
              formula, how to set your own benchmarks, and how to stop the bleed.
            </p>

            {/* Answer-First Snippet for AEO & AI Overviews */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>Quick Answer: The Food Cost Equation</span>
              <p className={styles.aeoText}>
                Food cost percentage measures total ingredient consumption against food revenue.
                Period food cost equals (Opening Stock + Purchases - Closing Stock) divided by Total
                Food Sales, multiplied by 100. As a starting point, full-service dining can plan around a
                28% to 32% blended target, then refine it from its own numbers. Any persistent gap between your
                per-dish theoretical recipe cost and your physical period count is known as variance leakage,
                resulting from over-portioning, trim shrinkage, and unlogged kitchen waste.
              </p>
            </div>

            {/* Benchmark Highlights Grid */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>28% - 32%</div>
                <div className={styles.metricLabel}>Illustrative Starting Target for Full-Service Dining</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>7.7 pts</div>
                <div className={styles.metricLabel}>Actual vs Theoretical Gap in Our Worked Example (₹11 Lakh a Year)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>12% - 16%</div>
                <div className={styles.metricLabel}>Illustrative Tandoor & Bread Target (High-Margin Anchor)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>&lt; 2.0%</div>
                <div className={styles.metricLabel}>Suggested Alert Threshold for Kitchen Variance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <article className={styles.articleBody}>
          <p>
            In restaurant management, food cost is either an active steering wheel or an autopsy.
            Operators who only look at food cost at the end of the financial quarter are conducting
            an autopsy on money that has already vanished into bins, over-filled pans, and unbilled
            plates.
          </p>

          <p>
            To run a tight, profitable kitchen in India, you must master two separate equations:
            your <strong>Period Food Cost</strong> (the macroscopic operational check) and your
            <strong>Dish Food Cost</strong> (the microscopic menu pricing check).
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>1. Period Food Cost Formula (Actual Kitchen Spend)</div>
            <div className={styles.formulaEquation}>
              Period Food Cost % = [(Opening Stock + Purchases - Closing Stock) ÷ Food Sales] × 100
            </div>
            <p className={styles.formulaNote}>
              Where Opening Stock + Purchases - Closing Stock equals Cost of Goods Sold (COGS).
            </p>
          </div>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>2. Single Dish Recipe Formula (Theoretical Target)</div>
            <div className={styles.formulaEquation}>
              Dish Food Cost % = [Effective Ingredient Cost per Portion ÷ Menu Selling Price] × 100
            </div>
            <p className={styles.formulaNote}>
              Where ingredient cost must include butchery trim, prep shrinkage, garnishes, and cooking fats.
            </p>
          </div>

          <h2>1. A Worked Bengaluru Example (The ₹11 Lakh Leak)</h2>

          <p>
            To see how quietly food cost leaks, take a hypothetical 45-seat casual dining restaurant in
            Bengaluru generating ₹12,00,000 in monthly net food sales.
          </p>

          <p>
            On paper, the head chef designed an attractive, well-costed menu. Dishes were costed to
            average <strong>29% theoretical food cost</strong>. If every guest ordered exactly as
            modeled, the kitchen should consume ₹3,48,000 in raw ingredients.
          </p>

          <p>
            Now examine the month-end physical stock audit:
          </p>

          <ul>
            <li><strong>Opening Inventory (1st of month):</strong> ₹1,80,000</li>
            <li><strong>Mandi, Dairy & Vendor Purchases:</strong> ₹4,20,000</li>
            <li><strong>Closing Inventory (30th of month):</strong> ₹1,60,000</li>
            <li><strong>Actual Cost of Goods Sold (COGS):</strong> ₹1,80,000 + ₹4,20,000 - ₹1,60,000 = <strong>₹4,40,000</strong></li>
          </ul>

          <p>
            Divide ₹4,40,000 by ₹12,00,000 in food sales, and the actual food cost is <strong>36.67%</strong>.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>
              <span>The 7.67% Variance Gap: What It Means in Cash</span>
            </div>
            <p className={styles.calloutText}>
              The menu promised 29%, but the kitchen burned 36.67%. That 7.67 percentage point gap
              represents exactly <strong>₹92,000 in cash lost every single month</strong>. Over a
              calendar year, that single restaurant leaks <strong>₹11,04,000 in net profit</strong>.
              The menu was never broken: the execution had five silent leaks.
            </p>
          </div>

          <h2>2. Category Food Cost Benchmarks for Indian Menus</h2>

          <p>
            Expecting every category on your menu to hit 30% is a fundamental management flaw.
            Vegetarian ingredients, dairy, imported proteins, and beverages carry completely
            different economics in India. The ranges below are illustrative planning targets to
            show how categories differ, not survey data; set your own from your recipes and prices.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Illustrative Target %</th>
                  <th>Role in Menu Engineering</th>
                  <th>Key Operational Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Tandoor Breads & Roti</strong></td>
                  <td>12% - 16%</td>
                  <td>The Ultimate Margin Anchor</td>
                  <td>Flour spoilage, excessive tandoor coal ash waste</td>
                </tr>
                <tr>
                  <td><strong>Mocktails & Shakes</strong></td>
                  <td>15% - 22%</td>
                  <td>High Cash Contribution</td>
                  <td>Unmeasured syrups, melting ice dilution, fruit spoilage</td>
                </tr>
                <tr>
                  <td><strong>Veg Starters & Dals</strong></td>
                  <td>18% - 24%</td>
                  <td>Volume Profit Builder</td>
                  <td>Discarded dal batch souring, onion-tomato gravy burn</td>
                </tr>
                <tr>
                  <td><strong>Chicken & Egg Curries</strong></td>
                  <td>28% - 32%</td>
                  <td>Core Driver of Guest Footfalls</td>
                  <td>Over-portioning protein pieces, butchery trim shrinkage</td>
                </tr>
                <tr>
                  <td><strong>Mutton & Seafood Platters</strong></td>
                  <td>36% - 44%</td>
                  <td>Prestige Items (Rupee Margin Driver)</td>
                  <td>High spoilage risk, theft, over-cooking weight loss</td>
                </tr>
                <tr>
                  <td><strong>Bar Spirits (Pour Cost)</strong></td>
                  <td>18% - 24%</td>
                  <td>Floor Cash Cow</td>
                  <td>Free-pouring without jiggers, unrecorded bottle breakage</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Calculator Section */}
          <FoodCostCalculator />

          <h2>3. The 5 Culprits Behind the Actual vs Theoretical (AvT) Gap</h2>

          <p>
            When your actual food cost exceeds your recipe theoretical cost by more than 2%, you
            usually do not have a pricing problem; you have a floor control problem. The leakage
            tends to come from five specific areas:
          </p>

          <ol>
            <li>
              <strong>Free-Hand Over-Portioning:</strong> In busy rush hours, line cooks may not
              use digital scales or calibrated ladles. Giving 240 grams of chicken instead of the
              standard 200 grams increases protein cost by 20% on that dish instantly.
            </li>
            <li>
              <strong>Unrecorded Prep Waste:</strong> Prep cooks peeling onions, trimming mutton,
              or thawing frozen seafood can discard usable meat or let produce sit in warm
              prep basins until it wilts.
            </li>
            <li>
              <strong>Walk-In Spoilage & Batch Overproduction:</strong> Simmering 30 liters of makhani
              gravy on a Tuesday when the dining room only seats 40 covers leads to souring and bin
              discards by Thursday afternoon.
            </li>
            <li>
              <strong>The Free-Pour Bar Leak:</strong> Bartenders free-pouring spirits by eye
              can easily pour 60ml instead of a measured 45ml peg. That 15ml drift turns a 20% pour
              cost into about 27% overnight.
            </li>
            <li>
              <strong>Unaccounted Staff Food & Kitchen Graze:</strong> In unmetered kitchens,
              kitchen and floor staff can consume raw protein, cheese, and beverages without ringing in
              authorized staff meal tickets.
            </li>
          </ol>

          <h2>4. The 5-Step Protocol to Lower Food Cost</h2>

          <p>
            You do not need to cut portion sizes or buy lower-quality ingredients to lower your food
            cost. Implement these five operational disciplines:
          </p>

          <h3>Step 1: Calibrate Tools and Standardize Every Ladle</h3>
          <p>
            Remove ambiguity from the line. Assign color-coded ladles for gravy dishes (e.g., green
            for 150ml, yellow for 200ml) and mandate digital bench scales at the protein station.
            If a chef cannot eyeball 200 grams within 5 grams of precision, they must weigh the bowl.
          </p>

          <h3>Step 2: Place a Transparent Waste Bin and Waste Sheet</h3>
          <p>
            Place a clear waste sheet next to the main kitchen trash station. Every burnt naan,
            dropped fish cutlet, or soured sauce batch must be written down before hitting the bin.
            When staff know that waste is reviewed daily, careless discards become visible, and
            visible waste is far easier to bring down.
          </p>

          <h3>Step 3: Buy to Par Levels, Not Vendor Deals</h3>
          <p>
            Suppliers often offer bulk discounts (e.g., 10% off on 50 kg of paneer). If your kitchen
            only uses 20 kg before quality degrades, the other 30 kg is a loss that dwarfs the 10% you
            saved. Establish strict weekly minimum-maximum par levels based on actual weekend vs
            weekday covers.
          </p>

          <h3>Step 4: Audit High-Value Proteins Weekly</h3>
          <p>
            Do not wait for end-of-month stock takes to discover missing stock. Conduct a weekly
            sheet-to-floor count on your top 5 volatile commodities: Chicken, Mutton, Paneer,
            Cheese, and Cooking Oil.
          </p>

          <h3>Step 5: Shift Your Sales Mix with Visual Self-Ordering</h3>
          <p>
            Your blended food cost is heavily influenced by what guests order. Say a table orders only
            a Mutton Biryani at ₹350 with a 42% food cost (₹147 of ingredients): the table runs at 42%.
            If they also order a Garlic Naan at ₹100 (14%, ₹14) and an Iced Hibiscus Cooler at ₹250
            (16%, ₹40), the bill rises to ₹700 and the table&apos;s blended food cost falls to under 29%
            (₹201 on ₹700).
          </p>

          {/* Promotional Banner */}
          <div className={styles.calcBanner}>
            <h3 className={styles.calcBannerTitle}>
              Shape Your Sales Mix by Guiding What Guests Order
            </h3>
            <p className={styles.calcBannerSub}>
              Waiters can forget to suggest sides, breads, and pairings during a busy service.
              Knomi Host, the host inside every KNOMI menu, suggests the pairing as guests order: the
              naan with the curry, a cooler with the biryani. {GOAL}
            </p>
            <Link href="/#book" className={styles.calcBtn}>
              Book a walkthrough
            </Link>
          </div>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>Madhvan Sharma</span>
              <span className={styles.authorTitle}>Co-Founder, KNOMI</span>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, based in Bengaluru. He writes about restaurant unit
                economics, kitchen cost control, and front-of-house operations for owners who want to
                find silent cash leaks and protect their operating margins.
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions About Restaurant Food Cost</h2>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
