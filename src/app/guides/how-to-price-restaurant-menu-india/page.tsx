import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuPricingCalculator from "./MenuPricingCalculator";
import styles from "./MenuPricingGuide.module.css";
import { GOAL, OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: "How to Price Menu Items in an Indian Restaurant: Formula, Psychology & Calculator (2026) | KNOMI",
  description:
    "Master menu pricing for Indian restaurants. Calculate target food cost percentage, adjust for yield shrinkage, price delivery menus separately, and model margins with our interactive calculator.",
  alternates: {
    canonical: "/guides/how-to-price-restaurant-menu-india",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "How to Price Menu Items in an Indian Restaurant: Formula, Psychology & Calculator (2026)",
    description:
      "A complete guide to menu pricing for Indian restaurants. Includes portion yield math, delivery channel separate pricing, psychological price thresholds, and an interactive simulator.",
    url: "https://www.knomi.in/guides/how-to-price-restaurant-menu-india",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "How do you calculate the price of a menu item in an Indian restaurant?",
    a: "The foundational formula is: Menu Price = Effective Ingredient Cost per portion divided by Target Food Cost Percentage. For example, if a portion of Paneer Butter Masala costs ₹84 to make after factoring in prep shrinkage, and your target food cost is 30%, your base dine-in price is ₹84 divided by 0.30 = ₹280. This number should serve as your floor price, which you then round up to psychological price points (such as ₹289 or ₹295).",
  },
  {
    q: "What is an ideal food cost percentage for Indian restaurants?",
    a: "Set it from your own menu rather than borrowing one number. As an illustrative planning range (not survey data), a full-service menu might aim for a blended target near 30%, with high-protein items (mutton, seafood, paneer) above it and beverages, rice dishes and vegetarian starters below it. Balancing these categories across your menu is what keeps the blended figure where you want it.",
  },
  {
    q: "Should Zomato and Swiggy menu prices be higher than dine-in prices?",
    a: "Usually, yes, where your platform contract allows channel-specific prices. Restaurant-funded discounts, the platform commission, 18% GST on that commission, payment fees and delivery packaging all come out of the order value. In this guide's worked example, a ₹250 dish listed at the same price on an aggregator ends up with an effective food cost of about 57% instead of about 30% at dine-in. Work out the uplift you need from your own contract terms using the calculator.",
  },
  {
    q: "Do Indian restaurant menu prices include GST?",
    a: "Typically, Indian restaurant menus show prices exclusive of GST, with 5% GST added at checkout on the final food bill (provided the restaurant does not claim Input Tax Credit). If you serve alcohol, the food and beverage portions are billed separately under state excise and VAT rules. When setting charm prices (like ₹199 or ₹299), remember that 5% GST will make the final guest payment ₹209 or ₹314.",
  },
  {
    q: "How often should an Indian restaurant reprice its menu?",
    a: "Indian restaurants should audit ingredient costs every quarter and reprice select items when wholesale commodity shifts dictate it. Essential staples like dairy, edible oil, onions, and poultry fluctuate significantly throughout the year. Relying on a menu priced 12 to 18 months ago quietly degrades your net margin even if footfalls remain constant.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Price Menu Items in an Indian Restaurant: Formula, Psychology & Calculator (2026)",
      description:
        "Master menu pricing for Indian restaurants. Calculate target food cost percentage, adjust for yield shrinkage, price delivery menus separately, and model margins with our interactive calculator.",
      url: "https://www.knomi.in/guides/how-to-price-restaurant-menu-india",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/how-to-price-restaurant-menu-india",
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
          "Co-Founder of KNOMI. Writes about restaurant unit economics, menu pricing and front-of-house operations.",
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
      datePublished: "2026-09-05T22:30:00+05:30",
      dateModified: "2026-09-05T22:30:00+05:30",
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
          name: "How to Price Menu Items in India",
          item: "https://www.knomi.in/guides/how-to-price-restaurant-menu-india",
        },
      ],
    },
  ],
};

export default function MenuPricingGuidePage() {
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
              <span>Menu Pricing Guide</span>
            </nav>

            <h1 className={styles.title}>
              How to Price Menu Items in an Indian Restaurant: The Real Formula
            </h1>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Finance & Operations</span>
              <span>•</span>
              <span>Updated September 2026</span>
            </div>

            <p className={styles.subtitle}>
              Menu price equals ingredient cost divided by your target food cost percentage,
              but that textbook formula collapses in India unless you account for raw ingredient
              yield shrinkage, tax nuances, and the reality of aggregator commission leakage.
            </p>

            {/* Answer-First Snippet for AEO & AI Overviews */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>Quick Answer: The Real Pricing Equation</span>
              <p className={styles.aeoText}>
                To price a menu item in India accurately: first, calculate your true raw ingredient
                cost per portion adjusted for prep shrinkage and trim loss. Next, divide this by
                your target food cost percentage (for example, a 28% to 32% target for full-service
                dining) to establish your dine-in floor price. Finally, where your platform contract
                allows, set a separate aggregator price with an uplift calculated from your own
                commission, discount and packaging costs, so delivery orders do not destroy your
                kitchen margins.
              </p>
            </div>

            {/* Benchmark Highlights Grid */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>28% - 32%</div>
                <div className={styles.metricLabel}>Illustrative Food Cost Target for Full-Service Dining</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>₹180 → ₹240</div>
                <div className={styles.metricLabel}>Chicken per kg at a 75% Usable Yield (Worked Example)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>57%</div>
                <div className={styles.metricLabel}>Effective Food Cost When a ₹250 Dish Is Listed on an App at the Same Price (Worked Example)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>+20%</div>
                <div className={styles.metricLabel}>Aggregator Price Uplift Tested in the Worked Example</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <article className={styles.articleBody}>
          <p>
            Every culinary school textbook and online pricing guide gives you the exact same
            formula: calculate what the ingredients cost, divide by your desired food cost
            percentage, and put that number on your menu. If a plate of Butter Chicken costs
            ₹90 to prepare and you want to run a 30% food cost, you price it at ₹300.
          </p>

          <p>
            The arithmetic is flawless. But when applied in the real world of Indian food service,
            that simplistic formula quietly bleeds cash. It assumes you buy trimmed, ready-to-cook
            ingredients with zero shrinkage; it assumes every category should carry the exact same
            margin; and worst of all, it assumes a guest who orders on Swiggy or Zomato pays the
            restaurant the same net proceeds as a guest seated at Table 4.
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Standard Food Cost Pricing Formula</div>
            <div className={styles.formulaEquation}>
              Dine-In Menu Price = Effective Ingredient Cost ÷ Target Food Cost %
            </div>
            <p className={styles.formulaNote}>
              Where Effective Ingredient Cost includes raw procurement, portion shrinkage, cooking
              oil, spices, garnishes, and prep gas.
            </p>
          </div>

          <h2>1. The Yield & Trimming Leak: The Invisible Cost</h2>

          <p>
            One of the most common mistakes in Indian restaurant menu costing is calculating raw
            food cost based on purchase invoices rather than cooked yield.
          </p>

          <p>
            Say you purchase 1 kilogram of raw chicken curry cut from the mandi or wholesale
            vendor at ₹180/kg. That does not translate into 1 kilogram of cooked chicken on the plate:
            between fat trimming, bone discard, and moisture loss during tandoor or pot braising,
            some of the weight never reaches the guest. If your usable cooked yield is 75%, your true
            raw protein cost is not ₹180/kg, but ₹240/kg (₹180 ÷ 0.75).
          </p>

          <p>
            The yields below are illustrative, to show the method. Measure your own by weighing
            ingredients before and after prep, then divide the purchase price by your measured yield.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Ingredient Category</th>
                  <th>Wholesale State</th>
                  <th>Illustrative Usable Yield</th>
                  <th>True Cost Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Chicken (Curry Cut)</strong></td>
                  <td>Raw bone-in with skin/fat</td>
                  <td>70% - 75%</td>
                  <td>Multiply purchase price by about 1.33x to 1.43x</td>
                </tr>
                <tr>
                  <td><strong>Mutton (Biryani Cut)</strong></td>
                  <td>Bone, marrow, excess fat</td>
                  <td>60% - 68%</td>
                  <td>Multiply purchase price by about 1.47x to 1.67x</td>
                </tr>
                <tr>
                  <td><strong>Fresh Paneer (Malai)</strong></td>
                  <td>Block in whey/brine</td>
                  <td>85% - 90%</td>
                  <td>Multiply purchase price by about 1.11x to 1.18x</td>
                </tr>
                <tr>
                  <td><strong>Onions & Root Vegetables</strong></td>
                  <td>Unpeeled whole mandi bags</td>
                  <td>82% - 88%</td>
                  <td>Multiply purchase price by about 1.14x to 1.22x</td>
                </tr>
                <tr>
                  <td><strong>Leafy Greens (Palak/Methi)</strong></td>
                  <td>Uncleaned stems and roots</td>
                  <td>55% - 65%</td>
                  <td>Multiply purchase price by about 1.54x to 1.82x</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            If you cost your dishes using raw wholesale invoices without a yield factor, your
            pricing foundation is under-costed by exactly that yield gap before your chefs even
            ignite the burners.
          </p>

          <h2>2. The Two-Channel Dilemma: Why One Price Destroys Margins</h2>

          <p>
            Before you set channel-specific prices, check your platform contract for any
            price-parity terms. Where you are free to price each channel separately, doing so is
            essential to protect your margin.
          </p>

          <p>
            Consider a paneer main dish engineered for dine-in:
          </p>

          <ul>
            <li><strong>Raw Portion Cost:</strong> ₹75 (yield-adjusted)</li>
            <li><strong>Target Food Cost:</strong> 30%</li>
            <li><strong>Dine-In Menu Price:</strong> ₹250 (Gross Profit: ₹175, Food Cost: 30%)</li>
          </ul>

          <p>
            Now say that exact same ₹250 item is listed on an aggregator app without a
            channel-specific markup. The table assumes a 22% commission, a 15% restaurant-funded
            discount and about 2.5% in payment fees and TDS. These are illustrative terms; use the
            figures from your own contract.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Step in Settlement Waterfall</th>
                  <th>Dine-In Channel</th>
                  <th>Aggregator (Same Price)</th>
                  <th>Aggregator (+20% Uplift)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Listed Menu Price</td>
                  <td>₹250</td>
                  <td>₹250</td>
                  <td>₹300</td>
                </tr>
                <tr>
                  <td>Customer Discount (15% Funded)</td>
                  <td>₹0</td>
                  <td>-₹37.50</td>
                  <td>-₹45.00</td>
                </tr>
                <tr>
                  <td>Net Order Value</td>
                  <td>₹250</td>
                  <td>₹212.50</td>
                  <td>₹255.00</td>
                </tr>
                <tr>
                  <td>Platform Commission (22%)</td>
                  <td>₹0</td>
                  <td>-₹46.75</td>
                  <td>-₹56.10</td>
                </tr>
                <tr>
                  <td>18% GST on Commission</td>
                  <td>₹0</td>
                  <td>-₹8.42</td>
                  <td>-₹10.10</td>
                </tr>
                <tr>
                  <td>Payment Gateway & TDS (~2.5%)</td>
                  <td>-₹3.75 (EDC)</td>
                  <td>-₹5.31</td>
                  <td>-₹6.38</td>
                </tr>
                <tr>
                  <td><strong>Net Restaurant Payout</strong></td>
                  <td><strong>₹246.25</strong></td>
                  <td><strong>₹152.02</strong></td>
                  <td><strong>₹182.42</strong></td>
                </tr>
                <tr>
                  <td>Total COGS (Food + Packaging ₹12)</td>
                  <td>₹75.00</td>
                  <td>₹87.00</td>
                  <td>₹87.00</td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Net Contribution Profit (₹)</strong></td>
                  <td><strong>+₹171.25</strong></td>
                  <td><strong>+₹65.02</strong></td>
                  <td><strong>+₹95.42</strong></td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>Effective Food Cost %</strong></td>
                  <td><strong>30.5%</strong></td>
                  <td><strong>57.2%</strong></td>
                  <td><strong>47.7%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            When listed at identical prices, your ₹171 dine-in contribution shrinks to just
            ₹65.02 on the aggregator. Even with a 20% price uplift (pricing the dish at ₹300),
            the net contribution is still lower than dine-in, but you recover ₹95.42 per order
            instead of running a 57% effective food cost.
          </p>

          {/* Interactive Calculator Section */}
          <MenuPricingCalculator />

          <h2>3. The 3 Core Pricing Methodologies for Indian Menus</h2>

          <p>
            Successful restaurant operators combine three distinct pricing techniques across their
            menus rather than adhering dogmatically to a single formula:
          </p>

          <h3>A. Factor / Markup Pricing</h3>
          <p>
            The simplest method. You divide 100 by your target food cost percentage to generate a
            pricing multiplier factor. For a 28% food cost, your factor is 100 ÷ 28 = 3.57. You
            simply multiply your portion ingredient cost by 3.57. This method is ideal for
            standardizing pricing across side orders, breads, and appetizers.
          </p>

          <h3>B. The Prime Cost Method</h3>
          <p>
            Prime cost combines both Cost of Goods Sold (COGS) and Direct Kitchen Labor. Instead
            of only looking at ingredients, you factor in the kitchen preparation time required.
            A tandoori roti takes seconds of chef time; a slow-simmered Dal Bukhara or Dum
            Biryani takes hours of labor, prep watch, and specialized staging. Factoring in kitchen
            labor ensures labor-intensive culinary showstoppers are priced adequately to absorb their
            real line costs.
          </p>

          <h3>C. Value-Based and Psychological Charm Pricing</h3>
          <p>
            Guests do not know or care what your raw ingredients cost. They anchor on perceived
            value and local market references:
          </p>

          <ul>
            <li>
              <strong>Left-Digit Anchoring:</strong> Pricing an appetizer at ₹289 or ₹295 can feel
              noticeably cheaper than ₹300 or ₹310, even though the difference is less than 5%.
            </li>
            <li>
              <strong>Dropping Rupee Symbols on Premium Menus:</strong> Many menu designers drop the
              currency symbol (printing &ldquo;340&rdquo; instead of &ldquo;₹340&rdquo;) to keep the guest&apos;s attention on
              the dish rather than the price.
            </li>
            <li>
              <strong>The Decoy Anchor:</strong> Placing a high-margin premium platter at the top
              of a category (e.g., a Royal Kebab Platter at ₹680) makes the ₹360 signature chicken
              kebab directly below it look like an accessible, reasonable choice.
            </li>
          </ul>

          <h2>4. The Menu Engineering Matrix: Managing Rupee Margin vs Percentage</h2>

          <p>
            A fatal trap in restaurant finance is managing purely by percentage instead of rupees.
            You bank rupees, not percentages.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>
              <span>The Rupee Margin Paradox</span>
            </div>
            <p className={styles.calloutText}>
              A bowl of steamed rice costing ₹15 and selling for ₹90 delivers an extraordinary
              16.7% food cost and generates ₹75 in gross margin. A slow-cooked Raan or whole sea bass
              costing ₹350 and selling for ₹750 runs a 46.7% food cost, but delivers ₹400 in gross
              margin. One covers overhead; the other pads your food cost ratio. A well-engineered
              menu balances both.
            </p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Popularity</th>
                  <th>Contribution Margin</th>
                  <th>Actionable Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Stars</strong></td>
                  <td>High Order Volume</td>
                  <td>High Rupee Margin</td>
                  <td>Protect recipe consistency. Feature as visual heroes in your digital menu.</td>
                </tr>
                <tr>
                  <td><strong>Plowhorses</strong></td>
                  <td>High Order Volume</td>
                  <td>Low Rupee Margin</td>
                  <td>Carefully increase price by ₹15 to ₹25, or re-engineer portion garnishes to reduce COGS.</td>
                </tr>
                <tr>
                  <td><strong>Puzzles</strong></td>
                  <td>Low Order Volume</td>
                  <td>High Rupee Margin</td>
                  <td>Promote actively via waiter suggestions or visual upselling on digital QR menus.</td>
                </tr>
                <tr>
                  <td><strong>Dogs</strong></td>
                  <td>Low Order Volume</td>
                  <td>Low Rupee Margin</td>
                  <td>Eliminate from menu to reduce mis-en-place clutter and kitchen inventory waste.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Promotional Banner */}
          <div className={styles.calcBanner}>
            <h3 className={styles.calcBannerTitle}>
              Grow Your Check Sizes Without Alienating Guests
            </h3>
            <p className={styles.calcBannerSub}>
              Raising dish prices across the board can trigger customer backlash. KNOMI&apos;s
              illustrated menu gives every dish its own page, and Knomi Host suggests the pairing as
              guests order. {GOAL}
            </p>
            <Link href="/#book" className={`${styles.calcBtn} pressable`}>
              Book a walkthrough
            </Link>
          </div>

          <h2>5. A Step-by-Step Menu Pricing Checklist for Operators</h2>

          <ol>
            <li>
              <strong>Standardize Portion Recipes:</strong> Measure every gram of protein, sauce,
              garnish, and cooking oil for every single item on your menu.
            </li>
            <li>
              <strong>Apply Yield Factors:</strong> Adjust raw purchase costs by your measured kitchen
              yield (e.g., divide the raw chicken price by the share that reaches the plate).
            </li>
            <li>
              <strong>Calculate Base Floor Price:</strong> Divide your effective ingredient cost by
              your target category food cost (e.g., 25% for starters, 32% for curries, 18% for mocktails).
            </li>
            <li>
              <strong>Apply Psychological Rounding:</strong> Set retail prices ending in charm numbers
              (e.g., ₹249, ₹289, ₹345).
            </li>
            <li>
              <strong>Price Aggregators Separately:</strong> Where your contract allows, calculate a
              channel markup for Swiggy and Zomato from your own commission, discount, and packaging
              costs (the calculator above does this).
            </li>
            <li>
              <strong>Audit Every Quarter:</strong> Review ingredient costs against mandi fluctuations
              every 90 days to prevent silent margin erosion.
            </li>
          </ol>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>Madhvan Sharma</span>
              <span className={styles.authorTitle}>Co-Founder, KNOMI</span>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, based in Bengaluru. He writes about restaurant unit
                economics, menu pricing, and front-of-house operations for owners who want leaner,
                more profitable floors.
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions About Restaurant Menu Pricing</h2>
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
