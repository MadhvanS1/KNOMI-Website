import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./GuidesHub.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Restaurant Operations & Financial Intelligence Guides | KNOMI",
  description:
    "Free interactive calculators, labor cost benchmarks, P&L models, and unit economics frameworks for Indian restaurant owners and F&B operators.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Restaurant Operations & Financial Intelligence Guides | KNOMI",
    description:
      "Operational benchmarks, labor ratios, and financial models engineered for Indian restaurants. Includes interactive calculators and formulas.",
    url: "https://www.knomi.in/guides",
    siteName: "KNOMI",
    type: "website",
    locale: "en_IN",
  },
};

interface GuideItem {
  slug: string;
  title: string;
  snippet: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  hasCalculator: boolean;
}

const guides: GuideItem[] = [
  {
    slug: "/guides/how-to-start-cloud-kitchen-india",
    title: "How to Start a Cloud Kitchen in India: Setup & Licenses (2026)",
    snippet:
      "Calculate real equipment capex, commercial exhaust CFM formulas, 2026 FSSAI and municipal licensing, and model aggregator commissions vs direct channel economics.",
    category: "Financials & Unit Economics",
    readTime: "15 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/ordering-system-bars-breweries-india",
    title: "Ordering System for Bars, Pubs & Microbreweries in India (2026)",
    snippet:
      "Why guests wait to flag down a server for the next round, how tabletop ordering makes the next drink easy to order, how to handle split bills, and how 5% food GST and State Liquor VAT apply to the same tab.",
    category: "Operations & Floor Management",
    readTime: "13 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/best-ordering-system-cafes-india",
    title: "Best Ordering System for Cafes & Coffee Shops in India (2026)",
    snippet:
      "Shorten the counter queue, make the second coffee easy to order for guests working on laptops, and get beverage modifiers (oat milk, extra shot, less sugar) to the barista exactly as the guest asked.",
    category: "Operations & Floor Management",
    readTime: "13 min read",
    author: "Yash Garg",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-no-show-deposit-policy-india",
    title: "Restaurant No-Shows in India: Should You Charge Booking Deposits? (2026)",
    snippet:
      "Audit the triple economic loss of no-shows in India, Section 74 legal rules, Zomato and District cover charges, and discover the hybrid redeemable credit model.",
    category: "Operations & Floor Management",
    readTime: "12 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-upselling-techniques-guide",
    title: "Restaurant Upselling Techniques: Visual Cues vs Rushed Waiters (2026)",
    snippet:
      "Why verbal upselling gets dropped during a peak rush, how visual cues on the menu make a pairing easy to say yes to, and an interactive auditor to estimate what better attachment could add to your multi-course baskets.",
    category: "Guest Experience & Psychology",
    readTime: "11 min read",
    author: "Yash Garg",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/increase-restaurant-average-order-value",
    title: "How to Increase Restaurant Average Order Value (AOV) in India (2026)",
    snippet:
      "Practical ways to grow table check sizes without raising prices. Audit dining basket attachments, model menu contribution margins, and see how tabletop pairing suggestions work.",
    category: "Revenue & Pricing",
    readTime: "16 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/improve-restaurant-table-turnover",
    title: "How to Improve Table Turnover Rate Without Rushing Guests (2026)",
    snippet:
      "Find the dead time in your service cycle. Calculate RevPASH, audit the six stages of a table's visit for bottlenecks, and see where tabletop ordering can remove waiting without rushing anyone.",
    category: "Operations & Floor Management",
    readTime: "15 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/qr-code-menu-alternatives-india",
    title: "QR Code Menu Alternatives: 6 Smarter Ordering Systems for Indian Restaurants (2026)",
    snippet:
      "Explore 6 alternatives to static QR menus in India, from tactile paper and tabletop tablets to self-serve kiosks, aggregator apps and responsive visual web ordering, with an interactive ROI selector.",
    category: "Guest Experience & UX",
    readTime: "14 min read",
    author: "Yash Garg",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/setup-qr-menu-india",
    title: "How to Set Up a QR Digital Menu for Your Restaurant in India (2026)",
    snippet:
      "A complete operational guide: avoid the heavy PDF trap, show FSSAI veg and non-veg symbols correctly, configure 5% GST vs liquor VAT, and set up 80mm ESC/POS thermal printers and dynamic UPI QR payments.",
    category: "Operations & Floor Management",
    readTime: "14 min read",
    author: "Yash Garg",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/why-pdf-qr-menus-fail-restaurants",
    title: "The Heavy PDF Menu Problem: Why Diners Hate QR Codes in India (2026)",
    snippet:
      "Why do diners hate QR menus? Audit the heavy print-PDF trap, slow indoor mobile data, pinch-to-zoom fatigue, and what a fast, responsive visual menu does differently.",
    category: "Guest Experience & UX",
    readTime: "12 min read",
    author: "Yash Garg",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/best-restaurant-billing-software-india",
    title: "Best Restaurant Billing Software in India: 6 POS Systems Compared (2026)",
    snippet:
      "A side-by-side look at restaurant billing software in India, including Petpooja, Restroworks (Posist), DotPe, LimeTray and SlickPOS, plus where KNOMI fits alongside the POS you already use. Includes a 3-year cost-of-ownership simulator, GST compliance rules and hardware considerations.",
    category: "POS & Billing",
    readTime: "15 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-service-charge-legal-rules-india",
    title: "Restaurant Service Charge Legal Rules India: CCPA, Court Rulings & Menu Math (2026)",
    snippet:
      "Is service charge mandatory in India? Audit the CCPA 2022 guidelines, the Delhi High Court's March 2025 ruling, Section 15 GST taxability, and model how to absorb the charge into menu prices.",
    category: "Legal & Compliance",
    readTime: "12 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/zomato-hyperpure-restaurant-review",
    title: "Zomato Hyperpure Review: Wholesale Mandi vs B2B Delivery (2026)",
    snippet:
      "Compare your real procurement costs: wholesale APMC mandi prices against B2B delivery from Hyperpure, thaw loss on frozen goods, cold-chain handling, and how much of your supply sits with one vendor.",
    category: "Procurement & Supply Chain",
    readTime: "12 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/gst-on-restaurant-food-rules-explained",
    title: "GST on Restaurant Food in India: 5% vs 18% & Liquor VAT (2026)",
    snippet:
      "Master food GST rates, decode the 18% hotel specified premises threshold (room tariff > ₹7,500), split State Liquor VAT, and audit the blocked ITC squeeze on commercial rent and commissions.",
    category: "Taxation & Compliance",
    readTime: "13 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/gst-rules-zomato-swiggy-onboarding",
    title: "Do You Need GST for Zomato & Swiggy? (Section 9(5) Rules 2026)",
    snippet:
      "Understand why GST is practically mandatory on food delivery apps, unpack the Section 24(ix) nuance, master GSTR-3B Table 3.1.1 reporting, and verify onboarding document checklists.",
    category: "Taxation & Compliance",
    readTime: "12 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/zomato-swiggy-payout-audit-guide",
    title: "Zomato & Swiggy Payout Cycles: How to Audit Deductions (2026)",
    snippet:
      "Understand how weekly and faster settlement cycles typically work, spot customer refund deductions in your payout statements, and reconcile POS orders against bank statements.",
    category: "Financial Operations",
    readTime: "11 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/zomato-swiggy-real-commission-breakdown",
    title: "Zomato & Swiggy Commission 2026: The Real Settlement Math",
    snippet:
      "Unpack the full aggregator settlement waterfall: base commissions, unclaimable 18% GST, payment fees, and funded discounts, with our interactive payout calculator.",
    category: "Aggregator Economics",
    readTime: "12 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-inventory-control-india",
    title: "Restaurant Inventory Management in India: Par Levels, Waste & The Variance Audit (2026)",
    snippet:
      "Master the ABC inventory rule for Indian kitchens, calculate exact par levels to prevent stockouts, and audit weekly sheet-to-floor variance in rupees.",
    category: "Inventory Control",
    readTime: "11 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-discounting-traps-india",
    title: "Why Flat 20% Restaurant Discounts Destroy Margins: The 42% Volume Trap (2026)",
    snippet:
      "The maths behind discounting: at an example 32% food cost, a flat 20% discount needs about 42% more covers just to earn the same gross profit. Plus how to fill slow days with higher-margin alternatives.",
    category: "Revenue Strategy",
    readTime: "8 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/food-cost-percentage-calculator-india",
    title: "Food Cost Percentage: Formula, Benchmarks & Calculator for Indian Restaurants (2026)",
    snippet:
      "Master the period COGS formula, compare food cost across restaurant categories, and find the silent gap between your actual and theoretical food cost.",
    category: "Cost Control",
    readTime: "9 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/how-to-price-restaurant-menu-india",
    title: "How to Price Menu Items in an Indian Restaurant: Formula, Psychology & Calculator (2026)",
    snippet:
      "Calculate your true ingredient cost with yield shrinkage, balance dine-in vs aggregator delivery margins, and avoid single-price margin collapse.",
    category: "Menu Engineering",
    readTime: "10 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-break-even-calculator-india",
    title: "Restaurant Break Even Point: Formula, Indian Example & Calculator (2026)",
    snippet:
      "Master the break even sales formula, classify fixed vs variable costs, convert monthly targets to daily covers, and simulate the economics of an example 60-seat floor.",
    category: "Unit Economics",
    readTime: "8 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-profit-margin-benchmarks-india",
    title: "Restaurant Profit Margin in India: An Honest P&L Breakdown (2026)",
    snippet:
      "Explore how net margins differ across cafes, casual dining, and QSRs with a bottom-up P&L for an example ₹10 Lakh-a-month restaurant, rent thresholds, and the cost of leaning on aggregators.",
    category: "Financial Modeling",
    readTime: "10 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/restaurant-labour-cost-benchmarks-india",
    title: "Restaurant Labour Cost in India: Why the US 30% Rule Misleads",
    snippet:
      "Benchmark your front-of-house payroll ratio, think through waiter-to-table staffing and the real cost of attrition, and model what self-ordering could change using your own numbers.",
    category: "Operations & Staffing",
    readTime: "9 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
  {
    slug: "/guides/self-ordering-roi",
    title: "Self-Ordering System ROI Calculator for Restaurants (2026)",
    snippet:
      "Estimate what QR self-ordering could mean for your floor: front-of-house time, table turns and average check, worked out from your own numbers and clearly labelled assumptions.",
    category: "Technology & Psychology",
    readTime: "8 min read",
    author: "Madhvan Sharma",
    authorRole: "Co-Founder",
    hasCalculator: true,
  },
];

const hubJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.knomi.in/guides",
      url: "https://www.knomi.in/guides",
      name: "Restaurant Operations & Financial Intelligence Guides | KNOMI",
      description:
        "Free interactive calculators, labor cost benchmarks, P&L models, and unit economics frameworks for Indian restaurant owners.",
      publisher: {
        "@type": "Organization",
        name: "KNOMI",
        url: "https://www.knomi.in",
      },
      hasPart: guides.map((g) => ({
        "@type": "Article",
        headline: g.title,
        url: `https://www.knomi.in${g.slug}`,
        author: {
          "@type": "Person",
          name: g.author,
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
          name: "Guides & Calculators",
          item: "https://www.knomi.in/guides",
        },
      ],
    },
  ],
};

export default function GuidesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
      />
      <Navbar />

      <main className={styles.pageWrapper}>
        <div className="container">
          <header className={styles.hero}>
            <div className={styles.badge}>KNOMI Intelligence Library</div>
            <h1 className={styles.title}>
              Restaurant Calculators, Benchmarks & Operational Playbooks
            </h1>
            <p className={styles.subtitle}>
              Data-driven financial models, labor efficiency ratios, and unit economics
              engineered specifically for restaurant founders and F&B operators in India.
            </p>
          </header>

          <div className={styles.grid}>
            {guides.map((guide) => (
              <Link key={guide.slug} href={guide.slug} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.categoryTag}>{guide.category}</span>
                  <span className={styles.readTime}>
                    {guide.hasCalculator ? "Interactive Tool • " : ""}
                    {guide.readTime}
                  </span>
                </div>
                <h2 className={styles.cardTitle}>{guide.title}</h2>
                <p className={styles.cardSnippet}>{guide.snippet}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.authorMeta}>
                    <span className={styles.authorName}>{guide.author}</span>
                    <span className={styles.authorRole}>{guide.authorRole}</span>
                  </div>
                  <span className={styles.actionLink}>
                    {guide.hasCalculator ? "Open Tool & Guide →" : "Read Guide →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <section className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>
              Give Every Table a Host Who Knows Your Menu
            </h2>
            <p className={styles.ctaSubtitle}>
              KNOMI helps restaurants grow every table. Knomi Host, the host inside your
              illustrated menu, suggests the right pairing at the right moment and Knomi Sense
              remembers what every guest likes. Orders reach Knomi Dash, your kitchen display,
              and KNOMI works alongside the POS you already use, at 0% commission.
            </p>
            <Link href={bookHref} className={styles.ctaBtn}>
              Book a walkthrough
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
