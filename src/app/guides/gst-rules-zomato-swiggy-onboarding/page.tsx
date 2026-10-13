import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GstOnboardingChecker from "./GstOnboardingChecker";
import styles from "./GstGuide.module.css";
import { OG_IMAGE, bookHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Do You Need GST for Zomato & Swiggy? (Section 9(5) Rules 2026) | KNOMI",
  description:
    "Master GST registration rules for selling on Zomato and Swiggy in India. Learn the Section 9(5) mechanics, Section 24(ix) legal nuance, GSTR-3B Table 3.1.1 reporting, and onboarding document requirements.",
  alternates: {
    canonical: "/guides/gst-rules-zomato-swiggy-onboarding",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Do You Need GST for Zomato & Swiggy? Section 9(5) Rules (2026)",
    description:
      "A complete legal and operational guide to GST requirements on Zomato and Swiggy. Understand portal onboarding gates, small-seller exemptions, and GSTR-3B filing mechanics.",
    url: "https://www.knomi.in/guides/gst-rules-zomato-swiggy-onboarding",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "Can I sell on Zomato or Swiggy without a GST registration?",
    a: "In practical operational terms, no. While a normal business supplying services below ₹20 Lakhs annual turnover is legally exempt from GST registration under Section 22, restaurant food delivered through an e-commerce platform is classified as a Section 9(5) supply. Notification 65/2017 Central Tax specifically excludes Section 9(5) supplies from small-seller registration exemptions. On top of that, Zomato and Swiggy partner onboarding typically asks for a 15-digit GSTIN before a restaurant account can go live, so in practice you should plan to register.",
  },
  {
    q: "Does my restaurant pay the 5% GST on Zomato and Swiggy delivery orders?",
    a: "No, the platform collects and remits the 5% food GST directly to the government under Section 9(5) of the CGST Act. On food delivery orders placed via Zomato or Swiggy, the aggregator is treated as the deemed supplier liable for output tax. You must record these sales in your monthly GSTR-3B under Table 3.1.1(ii) with zero tax payable by you, while continuing to collect and remit 5% GST on your direct dine-in and takeaway sales under Table 3.1(a).",
  },
  {
    q: "Does the October 2023 small online seller relaxation (Notification 34/2023) apply to restaurants?",
    a: "No. Notification 34/2023 Central Tax allows small unregistered sellers to operate via e-commerce operators using an Enrolment ID without a GSTIN, but this relaxation applies exclusively to suppliers of goods (such as handicrafts or apparel). Under Schedule II, Paragraph 6(b) of the CGST Act, the supply of food and drinks by a restaurant or cloud kitchen is statutorily classified as a composite supply of services, rendering restaurants ineligible for this relaxation.",
  },
  {
    q: "Can a restaurant operating under the GST Composition Scheme sell on Zomato or Swiggy?",
    a: "Legally, yes, but operational hurdles exist. Section 10(2)(d) prohibits composition dealers from supplying through an e-commerce operator required to collect Tax Collected at Source (TCS) under Section 52. However, because food delivery platforms pay tax directly under Section 9(5) and do not collect Section 52 TCS on restaurant orders, tax experts conclude composition restaurants can lawfully list. In practice, you must ensure your portal tax settings correctly reflect your composition status.",
  },
  {
    q: "Do Zomato and Swiggy delivery sales count toward my ₹20 Lakh GST turnover threshold?",
    a: "Yes. Even though Zomato and Swiggy deposit the 5% GST directly into the government treasury on your delivery sales, the gross transaction value of those orders counts toward your aggregate turnover under Section 2(6) of the CGST Act. If your combined revenue from dine-in, takeaway, and aggregators exceeds ₹20 Lakhs in a financial year, mandatory registration applies under standard statutory provisions.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Do You Need GST for Zomato & Swiggy? (Section 9(5) Rules & Onboarding Guide 2026)",
      description:
        "Master GST registration rules for selling on Zomato and Swiggy in India. Learn the Section 9(5) mechanics, Section 24(ix) legal nuance, GSTR-3B Table 3.1.1 reporting, and onboarding document requirements.",
      url: "https://www.knomi.in/guides/gst-rules-zomato-swiggy-onboarding",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/gst-rules-zomato-swiggy-onboarding",
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
          name: "Do You Need GST for Zomato & Swiggy?",
          item: "https://www.knomi.in/guides/gst-rules-zomato-swiggy-onboarding",
        },
      ],
    },
  ],
};

export default function GstZomatoSwiggyGuidePage() {
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
            <span>Do You Need GST for Zomato & Swiggy?</span>
          </div>
          <h1 className={styles.title}>
            Do You Need GST to Sell on Zomato & Swiggy? (Section 9(5) Rules Explained)
          </h1>
          <div className={styles.postMeta}>
            <span>By Madhvan Sharma, Co-Founder</span>
            <span>-</span>
            <span>Updated September 2026</span>
            <span>-</span>
            <span>12 Min Read</span>
          </div>
          <p className={styles.subtitle}>
            An operational and legal breakdown of GST registration rules for Indian restaurants, cloud kitchens,
            and home bakers. Learn the Section 9(5) tax shift, Section 24(ix) nuances, and how to avoid costly
            GSTR-3B audit notices.
          </p>

          <div className={styles.aeoBox}>
            <span className={styles.aeoLabel}>Answer-First Executive Summary</span>
            <p className={styles.aeoText}>
              In practice, yes: a restaurant or cloud kitchen should expect to need an active GSTIN to onboard and sell
              on Zomato or Swiggy, even if your annual turnover is below the standard ₹20 Lakh threshold.
              While Section 9(5) mandates that platforms pay the 5% food GST, aggregator onboarding typically asks
              for a validated GSTIN so the platform can meet its own e-commerce reporting obligations.
            </p>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>₹20 Lakhs</div>
              <div className={styles.metricLabel}>Statutory Service Threshold (Excluded for Aggregators)</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>5% Food GST</div>
              <div className={styles.metricLabel}>Remitted by Platform Directly u/s 9(5)</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>0% ITC</div>
              <div className={styles.metricLabel}>Blocked Credit on Kitchen Capex & Commissions</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Table 3.1.1(ii)</div>
              <div className={styles.metricLabel}>Mandatory GSTR-3B Reporting Row for Delivery</div>
            </div>
          </div>
        </section>

        <GstOnboardingChecker />

        <article className={styles.articleBody}>
          <h2>1. The Core Conflict: Legal Exemption vs Aggregator Portal Reality</h2>
          <p>
            Almost every aspiring restaurateur and cloud kitchen entrepreneur in India encounters a bewildering
            contradiction when preparing to launch on Zomato and Swiggy:
          </p>
          <ul>
            <li>
              <strong>The Statutory Baseline:</strong> Under Section 22 of the Central Goods and Services Tax (CGST) Act,
              a supplier of services is only required to register for GST if their aggregate annual turnover exceeds
              ₹20 Lakhs (or ₹10 Lakhs in designated special-category hill and northeastern states).
            </li>
            <li>
              <strong>The Onboarding Gate:</strong> When completing the digital onboarding forms on the Zomato Partner or
              Swiggy partner apps, the 15-digit GSTIN field is typically marked as required. In practice, you should
              expect to provide a validated GSTIN alongside your kitchen location, bank details, and food menu before
              the listing goes live.
            </li>
          </ul>
          <p>
            Why does this divergence exist? Does the law mandate registration for micro-kitchens with very small monthly
            sales, or is the requirement a practical one on the platforms&apos; side?
            The answer lies in the interaction between <strong>Section 9(5)</strong>, <strong>Notification 65/2017</strong>,
            and the compliance obligations that e-commerce operators carry themselves.
          </p>

          <div className={styles.legalCard}>
            <div className={styles.legalTitle}>Statutory Anchor: Section 9(5) of the CGST Act</div>
            <div className={styles.legalStatute}>Deemed Supplier Liability for Food Delivery Platforms</div>
            <p className={styles.legalText}>
              &ldquo;The Government may notify categories of services the tax on intra-State supplies of which shall be paid
              by the electronic commerce operator as if such services are supplied through it, and all the provisions
              of this Act shall apply to such electronic commerce operator as if he is the supplier liable for paying
              the tax in relation to the supply of such services.&rdquo; (Effective 1 January 2022 via Notification 17/2021
              Central Tax Rate).
            </p>
          </div>

          <h2>2. The Section 24(ix) Carve-Out Debate: What Most Guides Miss</h2>
          <p>
            General business advice often quotes Section 24(ix) of the CGST Act, which mandates compulsory GST
            registration for anyone who supplies goods or services through an Electronic Commerce Operator (ECO),
            regardless of turnover. In traditional e-commerce (such as selling electronics or apparel on Amazon),
            compulsory registration has historically applied from Rupee One.
          </p>
          <p>
            However, Section 24(ix) contains a specific statutory exclusion:
          </p>
          <blockquote>
            <p>
              &ldquo;Persons who supply goods or services or both, <strong>other than supplies specified under sub-section (5)
              of section 9</strong>, through such electronic commerce operator who is required to collect tax at source
              under section 52.&rdquo;
            </p>
          </blockquote>
          <p>
            Because restaurant food delivery was shifted under Section 9(5) starting January 2022, several legal analysts
            and Chartered Accountants argue that a pure cloud kitchen supplying 100% of its meals through Zomato or Swiggy
            is statutorily carved out of Section 24(ix). Under this interpretation, such an establishment should drop back
            to the general Section 22 threshold of ₹20 Lakhs.
          </p>
          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>The Catch: No CBIC Circular, and the Platforms Need Your GSTIN</div>
            <p className={styles.calloutText}>
              While the Section 24(ix) carve-out argument is legally grounded, the Central Board of Indirect Taxes and
              Customs (CBIC) has not issued a formal circular confirming that unregistered micro-restaurants can supply
              under Section 9(5). More practically, <strong>the platforms use your GSTIN in their own compliance</strong>:
              to map vendor payouts, issue Tax Invoices for their platform commission, and report vendor-level supplies in
              their returns (GSTR-8 / GSTR-1 Table 14). In day-to-day practice, expect to need a GSTIN to onboard.
            </p>
          </div>

          <h2>3. Why the October 2023 E-Commerce Relaxation Fails for Food Sellers</h2>
          <p>
            In October 2023, the GST Council announced a widely celebrated reform (implemented via Notification 34/2023
            Central Tax) allowing small unregistered sellers to list on e-commerce platforms without a GSTIN, using a
            special <strong>Enrolment ID</strong> generated on the GST portal.
          </p>
          <p>
            Some new restaurant owners try to use this Enrolment ID to register on Zomato or Swiggy, only to find that
            it does not apply to them. Here is why:
          </p>
          <ul>
            <li>
              <strong>Applies Exclusively to Goods:</strong> Notification 34/2023 explicitly restricts the Enrolment ID
              mechanism to suppliers of <em>goods</em> engaged in intra-state e-commerce transactions (such as packaged
              dry groceries, artisanal crafts, or home decor).
            </li>
            <li>
              <strong>Restaurants Supply Services:</strong> Under Schedule II, Paragraph 6(b) of the CGST Act, the
              provision of prepared food or drink in a restaurant, cloud kitchen, or takeaway counter is defined as a
              <em>composite supply of services</em>.
            </li>
            <li>
              <strong>Legal Ineligibility:</strong> Because cooked food delivery is statutorily classified as a service
              rather than a sale of goods, Notification 34/2023 does not apply to restaurant menus.
            </li>
          </ul>

          <h2>4. Can a Composition Scheme Restaurant Sell on Zomato or Swiggy?</h2>
          <p>
            The GST Composition Scheme (governed by Section 10 of the CGST Act) offers small restaurants with annual
            turnover under ₹1.5 Crores a simplified compliance regime: paying a flat 5% tax on turnover with quarterly
            statements (CMP-08) rather than complex monthly invoicing.
          </p>
          <p>
            Historically, Section 10(2)(d) barred composition dealers from supplying goods or services through an
            e-commerce operator that is required to collect Tax Collected at Source (TCS) under Section 52. Because of this
            clause, many blogs incorrectly assert that composition restaurants cannot sell on food delivery apps.
          </p>
          <p>
            <strong>The critical legal distinction:</strong> Under Section 9(5), Zomato and Swiggy do <em>not</em> collect
            TCS under Section 52 on restaurant services. Instead, the platform steps into the shoes of the supplier and pays
            the 5% tax directly. Because the Section 52 trigger never occurs, a composition restaurant is legally eligible
            to list on aggregators.
          </p>
          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>Operational Reality for Composition Dealers</div>
            <p className={styles.calloutText}>
              While legally permissible, you must verify that your partner app listing indicates your composition status.
              On direct counter takeaway and dine-in tables, a composition dealer cannot collect GST from the customer or
              issue a Tax Invoice (they must issue a &ldquo;Bill of Supply&rdquo;). On Zomato and Swiggy orders, however, the platform
              charges the customer 5% GST directly and remits it to the exchequer.
            </p>
          </div>

          <h2>5. Step-by-Step Reporting Protocol: GSTR-1 & GSTR-3B Mechanics</h2>
          <p>
            Once your restaurant is registered and operational on Zomato or Swiggy, filing your monthly GST returns
            requires following a precise protocol. Mistakes here are easy to make and costly, either paying tax
            twice on aggregator orders or triggering automated scrutiny notices from the tax department.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Return Form</th>
                  <th>Reporting Table</th>
                  <th>Data Field Required</th>
                  <th>Tax Liability Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>GSTR-1</strong></td>
                  <td>Table 14(a)</td>
                  <td>Gross supplies made through ECO u/s 9(5)</td>
                  <td>Information only. Discloses gross GMV routed through aggregator GSTINs.</td>
                </tr>
                <tr>
                  <td><strong>GSTR-3B</strong></td>
                  <td>Table 3.1(a)</td>
                  <td>Direct Dine-in & Counter Takeaway Gross</td>
                  <td className={styles.tableDanger}>5% Output GST payable by restaurant in cash ledger.</td>
                </tr>
                <tr>
                  <td><strong>GSTR-3B</strong></td>
                  <td>Table 3.1.1(ii)</td>
                  <td>Supplies made through ECO u/s 9(5)</td>
                  <td className={styles.tableSuccess}>₹0 tax payable by restaurant. Platform remits 5% tax.</td>
                </tr>
                <tr>
                  <td><strong>GSTR-3B</strong></td>
                  <td>Table 4 (ITC)</td>
                  <td>Input Tax Credit on Purchases</td>
                  <td className={styles.tableHighlight}>Zero credit eligible. Blocked under Notification 46/2017.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>The Three Fatal Return Filing Mistakes to Avoid:</h3>
          <ol>
            <li>
              <strong>Reporting Aggregator Sales in Table 3.1(a):</strong> If your accountant accidentally bundles your
              Zomato and Swiggy sales into Table 3.1(a) along with your dine-in sales, the GST portal will calculate a 5%
              cash tax liability on those delivery orders. You will end up paying tax twice: once through the platform, and
              once out of your own bank account.
            </li>
            <li>
              <strong>Reporting Aggregator Sales in Table 3.1(c) (Exempt Supplies):</strong> Some practitioners place
              delivery sales in Table 3.1(c) thinking they are &ldquo;tax-free&rdquo; for the restaurant. Doing so can trigger automated
              Form ASMT-10 notices because GSTR-1 Table 14 reflects taxable supplies under Section 9(5), creating an
              unreconciled discrepancy against your GSTR-3B exempt turnover.
            </li>
            <li>
              <strong>Failing to Report Aggregator Sales Altogether:</strong> Omitting delivery sales because &ldquo;Zomato
              handles the tax&rdquo; invites mismatch warnings. The GST department can compare your GSTR-3B Table 3.1.1(ii)
              against the returns filed by Zomato and Swiggy for the same supplies.
            </li>
          </ol>

          <h2>6. The Input Tax Credit (ITC) Trap & 18% Commission Leakage</h2>
          <p>
            Under Notification 46/2017 Central Tax (Rate), standalone restaurants (not located in commercial hotel
            premises charging ₹7,500 or more per room night) are taxed at a concessional rate of <strong>5% GST without
            Input Tax Credit (ITC)</strong>.
          </p>
          <p>
            This zero-ITC rule introduces significant hidden tax leakage when operating on food delivery platforms:
          </p>

          <div className={styles.dangerBox}>
            <div className={styles.dangerTitle}>The 18% GST Dead-Loss Trap on Platform Commissions</div>
            <p className={styles.dangerText}>
              Delivery platforms charge for their services: a commission on each order, payment gateway fees, and
              optional in-app advertising. Under SAC Code 9983, <strong>platforms levy an 18% GST on their commission invoices</strong>.
              <br /><br />
              Because restaurants operate under the 5% no-ITC regime, <em>you cannot claim credit for this 18% GST</em>.
              It becomes a non-recoverable operating expense on top of the commission itself. As simple arithmetic: if
              your contract carries a 20% commission, the GST on it adds another 3.6% of the order value.
            </p>
          </div>

          <h3>Worked Example: ₹10,00,000 Monthly Cloud Kitchen Sales</h3>
          <p>
            Say a cloud kitchen in Bengaluru does ₹10,00,000 in monthly gross sales, all through Zomato and Swiggy.
            For the arithmetic, assume a 22% commission and a 2% payment gateway fee. These are assumptions for the
            example, not quoted platform rates; use the figures from your own contract.
          </p>
          <ul>
            <li><strong>Gross Customer Billing (GMV):</strong> ₹10,00,000</li>
            <li><strong>5% Food GST Remitted by Aggregators u/s 9(5):</strong> ₹50,000 (Paid to government)</li>
            <li><strong>Commission (assumed 22% on ₹10 Lakhs):</strong> ₹2,20,000</li>
            <li><strong>18% GST Billed on that Commission:</strong> ₹39,600 (Not claimable by the kitchen)</li>
            <li><strong>Payment Gateway Fee (assumed 2% + 18% GST):</strong> ₹23,600</li>
            <li>
              <strong>Total Deducted from Payouts in this Example:</strong> ₹2,83,200 (28.32% of gross sales)
            </li>
          </ul>
          <p>
            In this example, the kitchen pays ₹39,600 a month in unclaimable GST on commissions alone. Over 12 months,
            that is <strong>₹4,75,200 in non-creditable GST</strong> paid straight out of operating margins.
          </p>

          <h2>7. Home Bakers, Cloud Kitchens & FSSAI Requirements</h2>
          <p>
            Many independent home bakers, artisanal sauce makers, and micro-chefs operate out of residential kitchens.
            What are the statutory requirements for listing on delivery platforms?
          </p>
          <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Compliance Item</th>
                  <th>Turnover Under ₹12 Lakhs</th>
                  <th>Turnover ₹12 Lakhs to ₹20 Lakhs</th>
                  <th>Turnover Above ₹20 Lakhs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>FSSAI Category</strong></td>
                  <td>Basic Registration (Form A)</td>
                  <td>State Food Safety License (Form B)</td>
                  <td>State Food Safety License (Form B)</td>
                </tr>
                <tr>
                  <td><strong>Statutory GST Obligation</strong></td>
                  <td>Legally Exempt (below ₹20L)</td>
                  <td>Legally Exempt (below ₹20L)</td>
                  <td className={styles.tableDanger}>Compulsory Registration</td>
                </tr>
                <tr>
                  <td><strong>Aggregator Portal Requirement</strong></td>
                  <td className={styles.tableDanger}>15-Digit GSTIN typically requested</td>
                  <td className={styles.tableDanger}>15-Digit GSTIN typically requested</td>
                  <td className={styles.tableDanger}>15-Digit GSTIN typically requested</td>
                </tr>
                <tr>
                  <td><strong>Commercial Kitchen Zoning</strong></td>
                  <td>Depends on municipal and state norms</td>
                  <td>Depends on municipal and state norms</td>
                  <td>Depends on municipal and state norms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Platforms commonly ask home kitchens for the following; check the current list in each partner app before
            you apply:
          </p>
          <ol>
            <li>FSSAI 14-digit registration certificate showing residential address.</li>
            <li>Proprietor PAN card matching the registration application exactly.</li>
            <li>A GSTIN registration obtained under SAC 996331 (Restaurant and food pickup services).</li>
            <li>Cancelled bank cheque from a current account or savings account in the proprietor name.</li>
            <li>Kitchen photo showing clean prep surfaces, fire extinguisher, and pest control verification.</li>
          </ol>

          <h2>8. Direct Tabletop Ordering (KNOMI) vs Aggregator Multi-Tax Friction</h2>
          <p>
            Aggregator commissions are only part of the cost of delivery. The other part is the compliance work of
            running several tax flows side by side. A restaurant that also delivers ends up managing three:
          </p>
          <ul>
            <li><strong>Aggregator Delivery Orders:</strong> Invoiced by platforms u/s 9(5), requiring Table 3.1.1(ii) reconciliation.</li>
            <li><strong>Dine-in Food Bills:</strong> Invoiced directly at 5% GST without ITC, reported under Table 3.1(a).</li>
            <li><strong>Bar & Alcohol Tickets:</strong> Outside GST and subject to State Excise and Liquor VAT (rates and structure vary by state), requiring state commercial tax filings.</li>
          </ul>
          <p>
            Keeping these flows apart takes care at month-end: bills have to be classified correctly, combo items need the
            right tax treatment, and someone has to reconcile platform settlement reports against your own books.
          </p>

          <div className={styles.calloutBox}>
            <div className={styles.calloutTitle}>The Direct Tabletop Alternative: 0% Commission on Dine-In</div>
            <p className={styles.calloutText}>
              KNOMI is built for the guests already at your tables, not for delivery. Guests scan the QR on the table,
              browse an illustrated menu themed to your restaurant, and order from their phone, with no app download and
              no login. Knomi Host, the host inside the menu, suggests pairings along the way, and orders go straight to
              your kitchen display.
              <br /><br />
              Dine-in sales stay direct. KNOMI works alongside the POS you already use, so your GST billing stays where it
              is, and we charge 0% commission: one flat price per table, per month. Menu (₹149) is the illustrated menu
              on its own; Signature (₹250, our recommended plan) adds Knomi Host, Knomi Pulse, guest ordering, Knomi Dash
              (live orders and the kitchen display), integration with your existing POS and the essentials of Knomi Sense;
              Ecosystem (₹500) adds Knomi&apos;s own POS, the full Knomi Sense and Knomi Compass insights.
              See <Link href="/#pricing">plans and pricing</Link>.
            </p>
          </div>

          <div className={styles.authorBox}>
            <div className={styles.authorAvatar}>MS</div>
            <div className={styles.authorInfo}>
              <h4>Madhvan Sharma</h4>
              <div className={styles.authorRole}>Co-Founder, KNOMI</div>
              <p className={styles.authorBio}>
                Madhvan is a co-founder of KNOMI, where he works on restaurant unit economics and the owner&apos;s side of
                the product. He writes these guides to explain the rules and numbers behind running a restaurant in India.
                This guide is general information, not tax advice: confirm your own position with your Chartered Accountant.
              </p>
            </div>
          </div>

          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions: GST on Zomato & Swiggy</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </section>

          <div className={styles.ctaCard}>
            <h3>Keep Your Dining Room Commission-Free</h3>
            <p>
              Aggregators are built for doorstep delivery, not your dining room tables. For the guests already seated,
              KNOMI helps you grow every table: Knomi Host suggests the right pairing inside an illustrated menu, orders
              go straight to your kitchen display, and you pay 0% commission.
            </p>
            <Link href={bookHref} className={styles.ctaButton}>
              Book a walkthrough
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
