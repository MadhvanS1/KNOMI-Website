import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InventoryParCalculator from "./InventoryParCalculator";
import styles from "./InventoryGuide.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Restaurant Inventory Management in India: Par Levels, Waste & The Variance Audit (2026) | KNOMI",
  description:
    "Stop kitchen margin leaks in Indian restaurants. Master weekly ABC inventory counts, calculate exact par levels, audit sheet-to-floor variance, and cut food waste.",
  alternates: {
    canonical: "/guides/restaurant-inventory-control-india",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Restaurant Inventory Management in India: Par Levels, Waste & The Variance Audit (2026)",
    description:
      "A practical operational guide to restaurant inventory management in India. Learn the ABC classification rule, calculate dynamic par levels, and audit sheet-to-floor variance.",
    url: "https://www.knomi.in/guides/restaurant-inventory-control-india",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "How often should an Indian restaurant take physical inventory?",
    a: "Run two separate counting cycles: count your Category A high-value items (chicken, mutton, paneer, cooking oil, dairy, and bar liquor) once every week on a fixed day before new deliveries arrive. Count your Category B and C bulk items (flour, rice, lentils, dry spices, and packaging) once a month to balance accounting books. Trying to count all 300 kitchen ingredients weekly causes staff burnout, rushed estimates, and abandoned audits.",
  },
  {
    q: "What is theoretical versus actual food inventory usage (AvT)?",
    a: "Theoretical usage is the exact ingredient volume your kitchen should have consumed based on POS sales multiplied by standardized recipe portion weights. Actual usage is the physical stock that depleted from your storage (Opening Stock + Deliveries Received - Closing Stock). The gap between them is your variance. A small variance is normal (trim and moisture loss), so set a tolerance for your kitchen; we suggest starting at 2.5%. An unexplained variance above it points to over-portioning, unlogged kitchen waste, prep spoilage, or theft.",
  },
  {
    q: "How do you manage kitchen inventory without scannable barcodes in India?",
    a: "Indian restaurant supply chains rely on APMC mandis, local kirana suppliers, and WhatsApp orders where produce arrives loose without scannable barcodes. Instead of chasing scannable SKUs, standardize by physical weight (kg/grams) and pack counts (tins/crates). Weigh every incoming delivery crate on a calibrated digital platform scale, verify weights against handwritten delivery challans before signing, and pick one consistent valuation rule (such as Last Purchase Price).",
  },
  {
    q: "How do you calculate restaurant par level and reorder points?",
    a: "The par level formula is: Par Level = (Average Daily Usage x Delivery Lead Time Days) + Safety Buffer Stock. For example, if your kitchen uses 20 kg of chicken daily, your supplier takes 2 days to deliver, and you want a 25% safety buffer: Base Cycle Stock is 40 kg, Safety Stock is 10 kg, making your minimum par level 50 kg. Reorder quantity is simply Par Level minus Current Counted Stock.",
  },
  {
    q: "Why does inventory counting alone fail to reduce restaurant food cost?",
    a: "Counting stock tells you what sits on your shelves, but it does not save a single rupee by itself. Food cost only drops when managers reconcile the count against recipe sales to locate the variance, followed by line intervention: recalibrating prep portion ladles, inspecting butcher yield trims, and locking walk-in freezers during shift changeovers. A restaurant that counts diligently but never acts on variance gains zero financial benefit.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Restaurant Inventory Management in India: Par Levels, Waste & The Variance Audit (2026)",
      description:
        "Stop kitchen margin leaks in Indian restaurants. Master weekly ABC inventory counts, calculate exact par levels, audit sheet-to-floor variance, and cut food waste.",
      url: "https://www.knomi.in/guides/restaurant-inventory-control-india",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/restaurant-inventory-control-india",
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
          "Co-Founder of KNOMI, writing about restaurant unit economics and operations in India.",
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
          name: "Restaurant Inventory Management India",
          item: "https://www.knomi.in/guides/restaurant-inventory-control-india",
        },
      ],
    },
  ],
};

export default function RestaurantInventoryGuidePage() {
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
            <span>Restaurant Inventory Management India</span>
          </div>

          <h1 className={styles.title}>
            Restaurant Inventory Management in India: What Actually Works (2026)
          </h1>

          <div className={styles.postMeta}>
            <span>By Madhvan Sharma, Co-Founder</span>
            <span>:</span>
            <span>Published September 2026</span>
            <span>:</span>
            <span>11 Min Read</span>
            <span>:</span>
            <span>Kitchen Economics</span>
          </div>

          <p className={styles.subtitle}>
            Forget Western textbook advice about scannable barcodes and automated supplier portals.
            Here is a practical way for Indian kitchens to control raw mandi stock, calculate dynamic
            par levels, and audit weekly sheet-to-floor variance to find hidden profit leaks.
          </p>

          {/* Answer-First AEO Callout Box */}
          <div className={styles.aeoBox}>
            <span className={styles.aeoLabel}>Operational Rule of Thumb (AEO Summary)</span>
            <p className={styles.aeoText}>
              Restaurant inventory management in India is not an exhaustive daily stock count. It is a
              weekly audit comparing theoretical ingredient usage (sales multiplied by recipe portions)
              against actual physical stock depletion. The unexplained difference is your variance leak.
              By maintaining dynamic par levels and auditing your top 20 high-value items, kitchens
              can avoid panic retail purchases and cut food waste.
            </p>
          </div>

          {/* Takeaway Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Top 20</div>
              <div className={styles.metricLabel}>
                Vital Few Items: The handful that carry most of your stock value (Proteins, Oil, Paneer, Spirits), per the Pareto principle.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>≤ 2.5%</div>
              <div className={styles.metricLabel}>
                Suggested Starting Tolerance: For prep trimming and natural cooking moisture loss. Tune it to your kitchen.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Zero</div>
              <div className={styles.metricLabel}>
                Panic Retail Buys: The goal of dynamic par levels, so nobody pays full retail price at a local kirana at 7 PM.
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>₹99,840</div>
              <div className={styles.metricLabel}>
                One Dish, One Leak: The annual cost of the 8 kg weekly chicken variance in the worked example below.
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className={styles.articleBody}>
          <h2>What Restaurant Inventory Management Actually Is (And What It Is Not)</h2>
          <p>
            The textbook definition of inventory management tells you that anything costing the restaurant
            money must be tracked, logged, and counted. In reality, that definition leads Indian restaurants
            straight into operational failure: an exhaustive count of every ingredient that eats up a Sunday
            night, exhausts the sous chef, produces guessed numbers, and gets abandoned within a couple of months.
          </p>
          <p>
            A functional inventory control system does not attempt to create an immaculate ledger of every
            bay leaf and gram of jeera. Instead, it executes four tightly focused operational loops:
          </p>
          <ul>
            <li>
              <strong>1. Controlled Receiving:</strong> Verifying incoming physical deliveries against the vendor
              challan on a calibrated digital platform scale before the delivery van leaves. Skipping this step
              can mean paying for 20 kg of poultry while receiving 18.2 kg.
            </li>
            <li>
              <strong>2. Storage and First-In, First-Out (FIFO):</strong> Dating every prepped batch container
              so older stock is consumed before it spoils in the bottom racks of the walk-in chiller.
            </li>
            <li>
              <strong>3. High-Frequency Selective Counting:</strong> Counting only the 20 to 30 high-value
              ingredients that carry the financial weight of the restaurant on a fixed weekly cycle.
            </li>
            <li>
              <strong>4. AvT Reconciliation (Theoretical vs Actual):</strong> Comparing what your POS sales
              say you should have consumed against what physically disappeared from storage.
            </li>
          </ul>
          <p>
            If you only perform the first three steps, you possess a stock register: a catalog of what sits on
            your shelves. Only when you execute step four do you possess inventory control: the visibility to
            know exactly where your cash is evaporating.
          </p>

          <h2>Why Western Barcode and SKU Advice Fails Spectacularly in Indian Kitchens</h2>
          <p>
            Almost every global restaurant management guide assumes a supply chain that simply does not exist
            in India. They tell operators to scan barcodes on delivery boxes, integrate EDI supplier portals,
            and order standardized catalog SKUs at locked annual contract prices.
          </p>
          <p>
            An Indian restaurant kitchen operates in a completely different reality:
          </p>
          <ul>
            <li>
              <strong>Unbarcoded Loose Produce:</strong> Onions, tomatoes, ginger, and garlic arrive from the local
              APMC mandi in gunny sacks with varying moisture levels and zero scannable tags.
            </li>
            <li>
              <strong>Volatile Daily Pricing:</strong> Raw commodity prices fluctuate weekly. Fresh coriander or
              green chillies can swing sharply in price within days, depending on the monsoon.
            </li>
            <li>
              <strong>WhatsApp Vendor Workflows:</strong> Fresh poultry, goat mutton, paneer, and seafood are
              ordered via evening WhatsApp messages with local vendors, who drop off handwritten paper challans
              the following morning.
            </li>
            <li>
              <strong>Butchery and Cleaning Yields:</strong> Whole bone-in chicken loses a significant share of its
              weight during cleaning, portioning, and trimming before it ever touches a tandoor skewer.
            </li>
          </ul>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>
              <span>The Ironclad Indian Inventory Rule: Adopt One Valuation Method</span>
            </div>
            <p className={styles.calloutText}>
              Because mandi prices shift constantly, you must pick one inventory valuation methodology: either
              <strong> Last Purchase Price (LPP)</strong> or <strong>Weighted Average Cost (WAC)</strong>: and
              stick with it for the entire fiscal year. Switching rules halfway through the year creates artificial
              paper variances that mask real kitchen theft or over-portioning.
            </p>
          </div>

          <h2>The &ldquo;Vital Few&rdquo; ABC Inventory Rule: Stop Counting Cumin</h2>
          <p>
            The single biggest reason inventory tracking dies in Indian standalone restaurants and regional
            chains is fatigue. Kitchen managers try to count all 300 ingredients in the dry store, get bogged
            down weighing half-empty bottles of vinegar and jars of garam masala, and end up guessing numbers.
          </p>
          <p>
            To build a sustainable inventory process that staff will actually maintain, apply the classical
            Pareto principle through an <strong>ABC Inventory Classification</strong>:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value Share (ABC Convention)</th>
                  <th>Item Count (ABC Convention)</th>
                  <th>Typical Kitchen Ingredients</th>
                  <th>Counting Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableHighlight}>Category A (Vital Few)</td>
                  <td className={styles.tableHighlight}>70% to 80%</td>
                  <td>15% to 20%</td>
                  <td>Fresh chicken, mutton, prawns, paneer, dairy cream, cooking oil tins, premium liquor</td>
                  <td>Weekly (Every Tuesday morning before restock)</td>
                </tr>
                <tr>
                  <td>Category B (Intermediate)</td>
                  <td>15% to 20%</td>
                  <td>30%</td>
                  <td>Dairy milk, butter blocks, pre-made frozen gravies, coffee beans, imported sauces</td>
                  <td>Bi-weekly (Twice per month)</td>
                </tr>
                <tr>
                  <td>Category C (Bulk & Dry)</td>
                  <td>5% to 10%</td>
                  <td>50%</td>
                  <td>Basmati rice, atta, maida, lentils, dry whole spices, sugar, salt, takeaway packaging</td>
                  <td>Monthly (End of month for accounting)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            A weekly count of your 20 Category A items is short enough to actually happen every week. It catches
            leaks while they are still this week&apos;s problem: when the head chef can still recall which cook
            over-portioned the butter chicken or why three tins of oil vanished between Thursday and Saturday.
          </p>

          {/* Interactive Simulator Component */}
          <InventoryParCalculator />

          <h2>The Par Level Formula: How to Stop 86-ing Dishes on Saturday Night</h2>
          <p>
            A <strong>Par Level (Periodic Automatic Replenishment)</strong> represents the minimum quantity of an
            item you must hold in stock at the beginning of a service cycle so that you do not run out of
            dishes (the dreaded &ldquo;86&rdquo; on your menu) while preventing over-ordering that turns into walk-in slime.
          </p>
          <p>
            When Indian restaurants fail to set mathematical par levels, they fall victim to two destructive
            habits:
          </p>
          <ol>
            <li>
              <strong>The Emergency Retail Run:</strong> Running out of paneer or heavy cream at 8 PM on a
              packed Saturday night, forcing a runner to buy supplies from a local retail supermarket at full MRP
              with zero input tax credit, demolishing the dish&apos;s gross margin.
            </li>
            <li>
              <strong>The Over-Ordering Rot:</strong> Ordering too much perishable stock ahead of a slow monsoon
              weekday, resulting in slimy coriander, sour cream, and bruised vegetables getting dumped in the bin
              by Thursday afternoon.
            </li>
          </ol>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Standard Restaurant Par Level Formula</div>
            <div className={styles.formulaEquation}>
              Par Level = (Average Daily Usage x Delivery Lead Time Days) + Safety Buffer Stock
            </div>
            <p className={styles.formulaNote}>
              Where Safety Buffer Stock is a margin you choose to absorb unpredictable weekend rushes or vendor
              delays; 20% to 30% of your cycle stock is a sensible starting point to tune from.
            </p>
          </div>

          <h3>Worked Par Level Example: Casual Dining Restro-Bar</h3>
          <p>
            Say a 70-seat casual dining restaurant in Indiranagar, Bengaluru, is calculating its par level for
            fresh boneless chicken breast:
          </p>
          <ul>
            <li><strong>Average Daily Usage:</strong> 24 kg per day across curries, starters, and biryani.</li>
            <li><strong>Supplier Lead Time:</strong> 2 days (Order placed Monday afternoon arrives Wednesday morning).</li>
            <li><strong>Cycle Requirement:</strong> 24 kg x 2 days = 48 kg.</li>
            <li><strong>Safety Buffer (25%):</strong> 48 kg x 0.25 = 12 kg (protection against sudden corporate bookings).</li>
            <li><strong>Target Par Level:</strong> 48 kg + 12 kg = <strong>60 kg</strong>.</li>
          </ul>
          <p>
            On Monday morning, the kitchen supervisor weighs the walk-in storage and finds 18 kg on hand.
            The purchase order calculation is effortless and objective: 60 kg (Par Level) minus 18 kg (Current Stock)
            = <strong>42 kg</strong>. No guessing, no gut feelings, and no panicked calls to the butcher on Friday night.
          </p>

          <h2>Theoretical vs Actual (AvT) Variance: A Worked Bengaluru Example</h2>
          <p>
            Here is the fundamental operational principle every restaurateur must understand: <strong>counting
            physical inventory does not save you money. Investigating the variance is what saves money.</strong>
          </p>
          <p>
            Every dish on your menu has a standardized recipe card. By multiplying dish sales by individual portion
            weights, your POS or billing system calculates <strong>Theoretical Usage</strong>: the exact volume of raw
            material that should have exited your storage.
          </p>
          <p>
            Your physical stock audit reveals <strong>Actual Usage</strong> using the standard COGS formula:
          </p>

          <div className={styles.formulaCard}>
            <div className={styles.formulaTitle}>Actual Kitchen Stock Depletion Formula</div>
            <div className={styles.formulaEquation}>
              Actual Consumption = Opening Physical Stock + Received Purchases - Closing Physical Stock
            </div>
          </div>

          <h3>The 8 kg Chicken Curry Leak</h3>
          <p>
            Here is a worked example of a weekly audit at a hypothetical North Indian restaurant in Koramangala, Bengaluru:
          </p>
          <ul>
            <li><strong>Sales Data:</strong> The restaurant sold 300 portions of Murgh Tikka Masala over the week.</li>
            <li><strong>Standardized Recipe:</strong> 180 grams of raw trimmed boneless chicken per portion.</li>
            <li><strong>Theoretical Usage:</strong> 300 portions x 0.180 kg = <strong>54.0 kg</strong>.</li>
            <li><strong>Opening Stock (Tuesday):</strong> 20.0 kg.</li>
            <li><strong>Purchases Received:</strong> 70.0 kg.</li>
            <li><strong>Closing Stock (Following Tuesday):</strong> 28.0 kg.</li>
            <li><strong>Actual Physical Depletion:</strong> 20.0 + 70.0 - 28.0 = <strong>62.0 kg</strong>.</li>
          </ul>
          <p>
            The difference is startling: 62.0 kg actual minus 54.0 kg theoretical leaves an unaccounted variance
            of <strong>8.0 kg (14.81%)</strong>.
          </p>
          <p>
            At a raw commodity price of ₹240/kg, that 8 kg gap represents <strong>₹1,920 lost in a single week on
            one menu item alone</strong>. Annualized over 52 weeks, this single chicken curry dish silently leaks
            <strong> ₹99,840</strong> directly out of the owner&apos;s net profit.
          </p>
          <p>
            Now imagine three more Category A items (mutton gravies, biryani rice, paneer blocks, or cooking oil)
            leaking at the same rate. In this example, the unmonitored variance would add up to about
            <strong> ₹4,00,000 a year</strong>.
          </p>

          <h2>The 4-Step Tuesday Morning Audit Protocol</h2>
          <p>
            When your weekly AvT variance goes above your tolerance, where did the ingredients go? Raw protein and dairy
            do not simply evaporate into thin air. An unexplained variance usually traces back to one of four
            specific operational breakdowns:
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Audit Step</th>
                  <th>Suspected Breakdown</th>
                  <th>Where the Rupee Leak Hides</th>
                  <th>Actionable Line Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Step 1: Receiving Dock</strong></td>
                  <td>Vendor Under-delivery</td>
                  <td>Challan says 25 kg; the supplier delivered 22.5 kg, and nobody weighed it at the door.</td>
                  <td>Mandate that all deliveries be placed on the receiving platform scale before signing challans.</td>
                </tr>
                <tr>
                  <td><strong>Step 2: Line Portioning</strong></td>
                  <td>Heavy Ladles / Over-portioning</td>
                  <td>Cooks plating 210g of chicken instead of 180g because they eyeball portions without portion cups.</td>
                  <td>Introduce color-coded volumetric portion ladles and random digital scale line checks during rush.</td>
                </tr>
                <tr>
                  <td><strong>Step 3: Unlogged Waste</strong></td>
                  <td>Kitchen Spoilage & Drops</td>
                  <td>Burnt gravies, dropped pans, and spoiled cream tossed directly into bins without a waste log.</td>
                  <td>Hang a physical laminated &ldquo;Waste Sheet&rdquo; near the bin. Every tossed pan must be initialed by the chef.</td>
                </tr>
                <tr>
                  <td><strong>Step 4: Unrecorded Sales</strong></td>
                  <td>Freebies & Shrinkage</td>
                  <td>Staff meals using prime proteins, complimentary bites to friends, or unauthorized takeout bags.</td>
                  <td>Require all staff meals and complimentary dishes to be rung into the POS under a dedicated zero-price KOT.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How Digital Self-Ordering Closes the Inventory Loop Automatically</h2>
          <p>
            The biggest friction point in traditional restaurant inventory management is the manual gap
            between your billing software and the storeroom. Line cooks focus on cooking, managers get buried in
            service rushes, and nobody has time to manually enter dozens of recipe depletions after every service.
          </p>
          <p>
            Guest-led ordering can close that gap by turning each confirmed order into an inventory event. Here is how
            it works in KNOMI, once your recipes are set up:
          </p>
          <ul>
            <li>
              <strong>Recipe-Based Depletion:</strong> When a guest orders a Dum Biryani from the KNOMI menu and the
              order is confirmed, it goes to the kitchen display and KNOMI deducts the recipe&apos;s ingredients (say
              220g of chicken, 150g of basmati rice, and 25g of ghee) from your stock.
            </li>
            <li>
              <strong>Automated 86-ing Protection:</strong> When there is no longer enough stock to make a portion, KNOMI
              can mark the dish as sold out on the guest menu automatically, and bring it back once you restock, so a
              guest is not disappointed by an order the kitchen cannot fulfil.
            </li>
            <li>
              <strong>AvT Variance from Your Counts:</strong> When you run a stock count in KNOMI, it compares what you
              counted against the theoretical balance from recorded sales and shows the variance item by item, instead
              of leaving you to discover at month-end that food cost has crept up.
            </li>
          </ul>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, where he works on restaurant unit economics and the owner&apos;s side of
                the product. He writes these guides for owners who want practical, honest numbers on running a kitchen in India.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions: Restaurant Inventory in India</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          {/* Bottom CTA Card */}
          <div className={styles.ctaCard}>
            <h3>Stop Kitchen Margin Leaks with Automated Recipe Depletion</h3>
            <p>
              See how KNOMI connects guest orders to your recipes: confirmed orders deduct ingredients from stock, dishes
              can sell out automatically when stock runs out, and your counts show the variance. We will walk you through
              it on a menu like yours.
            </p>
            <Link href={bookHref} className={`${styles.ctaButton} pressable`}>
              Book a walkthrough &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
