import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HyperpureProcurementAuditor from "./HyperpureProcurementAuditor";
import styles from "./HyperpureGuide.module.css";
import { OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Zomato Hyperpure Review: Wholesale Mandi vs B2B Delivery (2026) | KNOMI",
  description:
    "An operational review of Zomato Hyperpure for Indian restaurants and cloud kitchens: what to buy and what to check at the door, mandi vs B2B delivery, the reported revenue drop explained, and supplier concentration risk.",
  alternates: {
    canonical: "/guides/zomato-hyperpure-restaurant-review",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Zomato Hyperpure Review: Wholesale Mandi vs B2B Delivery (2026)",
    description:
      "Is Zomato Hyperpure worth it for your restaurant? A category-by-category look at wholesale mandi vs B2B delivery, receiving checks for chilled goods, and the risk of relying on one supplier group.",
    url: "https://www.knomi.in/guides/zomato-hyperpure-restaurant-review",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is Zomato Hyperpure and who owns it?",
    a: "Hyperpure is the B2B wholesale supply business of Eternal Limited (formerly Zomato Limited), operating under the legal entity Zomato Hyperpure Private Limited. It supplies fresh vegetables, poultry, seafood, dairy, bulk staples, and delivery packaging to restaurants, cloud kitchens, and caterers across many Indian cities.",
  },
  {
    q: "Do I need an FSSAI license and GSTIN to buy from Hyperpure?",
    a: "Yes to FSSAI, but GST is optional for small buyers. Because Hyperpure is a commercial B2B procurement platform, you must upload an active 14-digit FSSAI registration or State Food Safety License matching your kitchen delivery address. A GSTIN is optional for micro-kitchens below the threshold, but registered restaurants need it to receive GST-compliant tax invoices.",
  },
  {
    q: "Is Zomato Hyperpure cheaper than local wholesale mandis?",
    a: "It depends on the category and your city, so compare your own invoices. Dry packaging, branded cooking oils and bulk grains are where a bulk B2B supplier is most likely to compete on price. On chilled poultry and paneer, compare the drained, usable weight rather than the listed rate. For fresh vegetables and herbs, a good local APMC mandi vendor may offer better grading and freshness. The auditor in this guide lets you run the comparison with your own numbers.",
  },
  {
    q: "Did Hyperpure's revenue drop by 55% in 2026?",
    a: "As explained in Eternal Limited's filings, the reported year-on-year fall reflects a change in how sales linked to Blinkit are counted, not a collapse in restaurant supply. Goods sold into Blinkit's marketplace were previously booked as Hyperpure B2B sales; when Blinkit shifted to an inventory-led model, those sales became intra-group and no longer appeared in Hyperpure's reported revenue. The same filings show revenue rising about 6% quarter-on-quarter in the latest quarter covered here.",
  },
  {
    q: "What is the biggest operational risk of using Hyperpure?",
    a: "Two things deserve attention. First, as with any chilled delivery, check the temperature and drained weight of poultry and dairy at the door, especially in summer. Second, if you also sell heavily on Zomato, relying on Hyperpure for supply concentrates both your demand and your supply in one corporate group (Eternal Limited), so a dispute or delay on one side can affect the other.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Zomato Hyperpure Review: Wholesale Mandi vs B2B Delivery (2026)",
      description:
        "An operational review of Zomato Hyperpure for Indian restaurants and cloud kitchens: what to buy and what to check at the door, mandi vs B2B delivery, the reported revenue drop explained, and supplier concentration risk.",
      url: "https://www.knomi.in/guides/zomato-hyperpure-restaurant-review",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/zomato-hyperpure-restaurant-review",
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
          "Co-Founder of KNOMI. Writes about restaurant unit economics, purchasing and operations.",
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
      datePublished: "2026-09-06T02:30:00+05:30",
      dateModified: "2026-09-06T02:30:00+05:30",
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
          name: "Zomato Hyperpure Review",
          item: "https://www.knomi.in/guides/zomato-hyperpure-restaurant-review",
        },
      ],
    },
  ],
};

export default function HyperpureReviewGuidePage() {
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
            <span>Zomato Hyperpure Review</span>
          </div>
          <h1 className={styles.title}>
            Zomato Hyperpure Review: Wholesale Mandi vs B2B Delivery (2026)
          </h1>
          <div className={styles.postMeta}>
            <span>By Madhvan Sharma, Co-Founder</span>
            <span>-</span>
            <span>Updated September 2026</span>
            <span>-</span>
            <span>12 Min Read</span>
          </div>
          <p className={styles.subtitle}>
            A practical operational evaluation of Zomato Hyperpure for Indian restaurants and cloud kitchens.
            Compare wholesale mandi and B2B delivery category by category, learn what to check when chilled goods
            arrive, and weigh the strategic risk of single-supplier concentration.
          </p>

          <div className={styles.aeoBox}>
            <span className={styles.aeoLabel}>Answer-First Executive Summary</span>
            <p className={styles.aeoText}>
              Zomato Hyperpure can be a good fit for shelf-stable staples, bulk cooking oils, and delivery packaging,
              where doorstep delivery saves early-morning mandi runs. For chilled poultry and delicate fresh produce,
              inspect every delivery at the door and compare drained, usable weight with your local suppliers. And if
              you also sell heavily on Zomato, weigh the risk of relying on one corporate group, Eternal Limited, for
              both demand and supply.
            </p>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Dry Goods</div>
              <div className={styles.metricLabel}>Packaging, Oils &amp; Staples: Where Bulk B2B Supply Is Most Likely to Compete</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>4°C / -18°C</div>
              <div className={styles.metricLabel}>Receiving Check: Chilled Below 4°C, Frozen Below -18°C</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Drained Weight</div>
              <div className={styles.metricLabel}>Compare Chilled Meat on Usable Weight, Not Listed Rate</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>One Group</div>
              <div className={styles.metricLabel}>Check How Much of Your Demand and Supply Runs Through One Corporate Group</div>
            </div>
          </div>
        </section>

        <HyperpureProcurementAuditor />

        <article className={styles.articleBody}>
          <h2>1. What Is Zomato Hyperpure &amp; Who Owns It?</h2>
          <p>
            For decades, restaurant procurement in urban India meant early mornings. Executive chefs,
            head cooks, or purchasing managers woke up before dawn to visit regional Agricultural Produce Market
            Committee (APMC) wholesale mandis (such as Azadpur in Delhi, APMC Vashi in Mumbai, or Yeshwanthpur in
            Bengaluru) to inspect crates, haggle over fluctuating prices, arrange auto-rickshaw logistics, and haul
            sacks back to the kitchen before morning service.
          </p>
          <p>
            <strong>Zomato Hyperpure</strong> set out to organise and digitise this supply chain.
            Following Zomato Limited&apos;s corporate renaming to <strong>Eternal Limited</strong> in 2025, Hyperpure
            operates as a subsidiary under the legal entity <strong>Zomato Hyperpure Private Limited</strong>.
          </p>
          <p>
            Today, Hyperpure runs warehouses and delivery logistics across many Indian cities, supplying
            restaurants, cloud kitchens, cafes, and hotels. Its digital catalogue spans:
          </p>
          <ul>
            <li><strong>Fresh Produce:</strong> Potatoes, onions, tomatoes, exotic vegetables, and culinary herbs.</li>
            <li><strong>Poultry, Meat &amp; Seafood:</strong> Fresh chilled chicken, mutton, and frozen seafood.</li>
            <li><strong>Dairy &amp; Frozen Prep:</strong> Malai paneer, butter, mozzarella, pre-shaped burger patties, and frozen bakery.</li>
            <li><strong>Dry Groceries &amp; Staples:</strong> Basmati rice, wheat flour (atta), pulses, bulk spices, and commercial cooking oils.</li>
            <li><strong>Packaging &amp; Disposables:</strong> Tamper-evident delivery boxes, paper bags, foil containers, and cutlery.</li>
          </ul>

          <div className={styles.reviewCard}>
            <div className={styles.reviewTitle}>B2B Registration Gate: FSSAI License Mandatory</div>
            <div className={styles.reviewSubtitle}>Why Retail Consumers Cannot Order on Hyperpure</div>
            <p className={styles.reviewText}>
              Unlike quick-commerce consumer apps like Blinkit or Zepto, Hyperpure operates as a business-to-business
              wholesale platform. To register an account, every buyer must provide a valid 14-digit FSSAI food business
              registration or state license matching the kitchen delivery address. GSTIN registration is optional for
              micro-enterprises, but registered businesses require it to claim GST-compliant expense invoices.
            </p>
          </div>

          <h2>2. The 55% Revenue Drop, Explained: Dissecting the Financial Filings</h2>
          <p>
            In 2026, financial headlines reported a roughly <strong>55% year-on-year fall</strong> in Zomato Hyperpure&apos;s
            revenue, and the number naturally raised questions among restaurant buyers.
          </p>
          <p>
            The explanation is in Eternal Limited&apos;s public filings with the Bombay Stock Exchange (BSE).
            According to those filings, the drop reflects <strong>a change in how sales linked to Blinkit are counted</strong> rather than a fall in restaurant supply:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Financial Reporting Quarter</th>
                  <th>Hyperpure Reported Revenue</th>
                  <th>Segment Operating Result (as Reported)</th>
                  <th>Context in the Filings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Q1 FY26 (Jun 2025)</strong></td>
                  <td>₹2,295 Crores</td>
                  <td className={styles.tableDanger}>Operating Loss of ₹5 Crores</td>
                  <td>Included wholesale sales of goods supplied into Blinkit&apos;s marketplace.</td>
                </tr>
                <tr>
                  <td><strong>Q4 FY26 (Mar 2026)</strong></td>
                  <td>₹978 Crores</td>
                  <td className={styles.tableSuccess}>Operating Profit of ₹13 Crores</td>
                  <td>Blinkit switched to an inventory model; those sales became intra-group.</td>
                </tr>
                <tr>
                  <td><strong>Q1 FY27 (Jun 2026)</strong></td>
                  <td>₹1,034 Crores</td>
                  <td className={styles.tableSuccess}>Operating Profit of ₹14 Crores</td>
                  <td>Revenue up about 6% on the previous quarter.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When Blinkit moved from a third-party marketplace to an inventory-led quick-commerce model, goods that
            Hyperpure previously routed into Blinkit were no longer booked as external wholesale revenue.
            On the reported figures, revenue then rose about 6% quarter-on-quarter and the segment posted an operating
            profit in both of the later quarters shown. For a buyer, the practical takeaway is simple: judge Hyperpure
            on the service you receive at your kitchen door, not on the headline.
          </p>

          <h2>3. Category-by-Category Procurement Breakdown: What to Buy vs What to Avoid</h2>
          <p>
            Every seasoned executive chef knows that no single vendor should supply 100% of a restaurant&apos;s pantry.
            Hyperpure&apos;s catalogue fits some categories better than others, and the right answer depends on
            your city, your volumes, and how carefully you receive deliveries.
          </p>

          <h3>Category 1: Delivery Packaging &amp; Disposables (Definite WIN for Hyperpure)</h3>
          <p>
            Packaging is where a B2B supplier like Hyperpure is most likely to help. Buying from local packaging
            markets (such as Chawri Bazar in Delhi or Kalbadevi in Mumbai) can mean inconsistent plastic micron
            thickness, supply stockouts, and cash transactions without GST invoices.
          </p>
          <ul>
            <li><strong>Price Check:</strong> Compare per-piece rates for your standard containers (for example 500ml and 750ml microwaveable rounds) on Hyperpure against your local trader, including GST and delivery.</li>
            <li><strong>What to Look For:</strong> Consistent lid seal tightness (fewer dal and curry spillage refunds on delivery orders), tamper-evident closures, GST invoices, and zero spoilage risk in ambient storage.</li>
          </ul>

          <h3>Category 2: Bulk Groceries, Grains &amp; Cooking Oil (Strong WIN for Hyperpure)</h3>
          <p>
            For shelf-stable, branded commodity staples (such as large tins of refined sunflower oil, 30kg sacks of
            aged Biryani Basmati rice, Maida, sugar, and whole spices), a large B2B buyer&apos;s purchasing power
            can undercut local wholesale merchants. Check your own invoices category by category.
          </p>
          <p>
            Furthermore, having heavy 50kg grain sacks and large oil barrels delivered directly inside your store room
            removes the need to hire temporary manual porters or maintain a company delivery vehicle.
          </p>

          <h3>Category 3: Fresh Poultry &amp; Meat (CONDITIONAL: Watch Cold-Chain &amp; Thaw Loss)</h3>
          <p>
            Poultry is one of the largest cost lines for most casual dining and QSR kitchens, so the listed rate gets
            a lot of attention. Say a B2B listing offers boneless chicken breast at <strong>₹280 per kg</strong> against
            your butcher&apos;s ₹350 per kg. On paper, that is a 20% saving.
          </p>

          <div className={styles.dangerBox}>
            <div className={styles.dangerTitle}>The Ice Glazing &amp; Defrosting Shrinkage Trap</div>
            <p className={styles.dangerText}>
              In commercial poultry supply, from any supplier, chicken is sometimes lightly ice-glazed or chilled with moisture
              to protect it in transit. Say a 10 kg crate yields <strong>8.7 kg of usable meat after draining</strong>: you
              have paid for 13% water, and the cost of usable meat rises from ₹280 to about ₹322 per kg, which narrows a
              20% headline saving to about 8%. Always weigh drained meat after thawing before calculating your plate cost!
            </p>
          </div>

          <h3>Category 4: Fresh Vegetables &amp; Daily Herbs (MANDI STRONGLY PREFERRED)</h3>
          <p>
            Fresh produce is the hardest category for any centralised delivery model in India&apos;s hot climate.
          </p>
          <ul>
            <li><strong>Transit Bruising:</strong> Vegetables sorted in a distant warehouse, packed into plastic crates, and hauled through traffic can suffer crushing damage on lower layers.</li>
            <li><strong>Herbs &amp; Leafy Greens:</strong> Fresh coriander, mint, spinach, and methi leaves wilt quickly in non-aerated plastic crates. At a local subzi mandi you can pick the crispest bunches from the morning&apos;s arrivals yourself.</li>
            <li><strong>The Verdict:</strong> Buy onions, potatoes, and garlic in 50kg sacks from Hyperpure; source green vegetables, tomatoes, and herbs from your local market.</li>
          </ul>

          <h2>4. The Kitchen Door Receiving Protocol: Inspect or Lose Money</h2>
          <p>
            The single biggest difference between ordering on a consumer app and running a commercial kitchen is
            <strong> the receiving protocol</strong>. If an owner or chef accepts crates passively without inspection,
            any supplier&apos;s savings can quickly turn into operational losses.
          </p>

          <ol>
            <li>
              <strong>Calibrated Scale at the Receiving Gate:</strong> Never allow the delivery driver to drop crates
              and leave. Every sack of onions and every crate of chicken should be placed on a calibrated platform scale
              before signing the delivery manifest.
            </li>
            <li>
              <strong>Temperature Probe on Chilled Proteins:</strong> Chilled fresh meat must register below <strong>4°C</strong>;
              frozen prep (burger patties, mozzarella) must register below <strong>-18°C</strong>. If frozen goods arrive soft
              or chicken smells warm, reject the crate immediately.
            </li>
            <li>
              <strong>Immediate On-Van Rejection:</strong> A crate rejected at the delivery van is a simple line-item
              deduction from your invoice. Raising a return ticket in a partner app hours after the driver
              departs usually needs photo evidence, approvals, and a credit note, which disrupts your kitchen prep.
            </li>
          </ol>

          <h2>5. The Strategic Concentration Risk: Relying on One Corporate Group</h2>
          <p>
            Beyond unit economics and vegetable freshness lies a strategic question that few restaurant
            owners put on their spreadsheets: <strong>supplier and demand concentration</strong>.
          </p>
          <p>
            Consider a hypothetical restaurant that uses the whole Eternal ecosystem:
          </p>
          <ul>
            <li><strong>Delivery Channel:</strong> Zomato handles a large share of its delivery orders, and the commissions and ad spend come out of its payouts.</li>
            <li><strong>Dine-in Floor:</strong> Zomato Pay or District processes some of its table payments.</li>
            <li><strong>Kitchen Procurement:</strong> Hyperpure supplies a large share of its chicken, cooking oil, rice, and packaging materials.</li>
          </ul>
          <p>
            In that setup, <strong>a large share of the restaurant&apos;s cash flow touches one corporate group</strong>.
            If a dispute temporarily pauses the delivery merchant account, delivery revenue stops; if a settlement is
            delayed, working capital tightens just as supplier invoices fall due. The auditor above lets you estimate
            your own share.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>The Iron Law of Restaurant Vendor Diversification</div>
            <p className={styles.calloutText}>
              Our rule of thumb: never let a single distributor capture more than about 40% of your raw ingredient supply.
              Treat Hyperpure as a useful price-check benchmark, but always maintain active credit relationships with
              at least one local poultry butcher, one APMC grain merchant, and one regional packaging distributor.
              Redundancy is the best insurance policy for service on a Saturday night.
            </p>
          </div>

          <h2>6. Direct Tabletop Ordering (KNOMI): Reducing Ecosystem Dependence</h2>
          <p>
            One way to reduce concentration risk is to <strong>keep your dining room floor direct</strong>.
          </p>
          <p>
            Food delivery apps may remain important for off-premise reach, but there is a strong case for keeping
            the relationship with guests already seated at your tables in your own hands.
          </p>
          <p>
            With <strong>KNOMI&apos;s QR menu</strong> in your dining room:
          </p>
          <ul>
            <li><strong>0% Commission:</strong> KNOMI charges a flat fee per table, per month and takes nothing from your orders. What your guests order is yours.</li>
            <li><strong>No App, No Login:</strong> Diners scan the table QR and browse an illustrated menu themed to your restaurant in their phone&apos;s browser, then confirm an order with their phone number.</li>
            <li><strong>Works Alongside Your POS:</strong> Billing stays with the POS you already use; on the Signature plan, KNOMI integrates with it.</li>
            <li><strong>Simple Pricing:</strong> Menu ₹149, Signature ₹250 (recommended) or Ecosystem ₹500, per table, per month. See <Link href="/#pricing">pricing</Link>.</li>
          </ul>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Procurement Source</th>
                  <th>Best For</th>
                  <th>Key Strength</th>
                  <th>Primary Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zomato Hyperpure</strong></td>
                  <td>Packaging, cooking oils, staples, frozen prep</td>
                  <td className={styles.tableSuccess}>Doorstep delivery, GST invoicing, wide packaging range</td>
                  <td className={styles.tableDanger}>Check chilled goods on arrival; concentration if you also rely on Zomato</td>
                </tr>
                <tr>
                  <td><strong>Local APMC Mandi</strong></td>
                  <td>Fresh vegetables, daily culinary herbs, tomatoes</td>
                  <td className={styles.tableSuccess}>Hands-on quality grading, daily freshness, credit flexibility</td>
                  <td className={styles.tableDanger}>Early morning staff labor, lack of GST invoices</td>
                </tr>
                <tr>
                  <td><strong>METRO Wholesale (Reliance)</strong></td>
                  <td>Branded dairy, imported cheeses, bulk confectionery</td>
                  <td className={styles.tableSuccess}>Wide institutional catalog, cash-and-carry transparency</td>
                  <td className={styles.tableDanger}>Requires store visit, self-managed transport</td>
                </tr>
                <tr>
                  <td><strong>Direct Mill / Poultry Farmer</strong></td>
                  <td>High-volume chicken, basmati rice, eggs</td>
                  <td className={styles.tableSuccess}>Lowest possible per-kg base rates</td>
                  <td className={styles.tableDanger}>Requires large, regular order volumes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, based in Bengaluru. He writes about restaurant unit economics,
                purchasing, and operations, including vendor diversification and inventory control.
              </p>
            </div>
          </div>

          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions: Zomato Hyperpure</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          <div className={styles.ctaCard}>
            <h3>Protect Your Margins Across Kitchen &amp; Floor</h3>
            <p>
              Strengthen kitchen purchasing with dual-vendor sourcing, then keep your floor direct with KNOMI:
              an illustrated menu with Knomi Host inside, orders straight to your kitchen display, and 0% commission.
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
