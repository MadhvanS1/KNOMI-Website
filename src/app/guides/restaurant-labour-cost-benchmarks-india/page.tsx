import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./LabourCostGuide.module.css";
import { OG_IMAGE, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Restaurant Labour Cost in India: Why the US 30% Rule Misleads | KNOMI",
  description:
    "How to calculate restaurant labour cost in India properly, why the US 30% rule misleads Indian operators, the Prime Cost formula, and the hidden cost of staff attrition.",
  alternates: {
    canonical: "/guides/restaurant-labour-cost-benchmarks-india",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Restaurant Labour Cost in India: Why the US 30% Rule Misleads | KNOMI",
    description:
      "A labour cost guide for Indian restaurant owners. Understand true staff costs, why the US 30% rule misfires in India, and how tabletop self-ordering frees your floor team for hospitality.",
    url: "https://www.knomi.in/guides/restaurant-labour-cost-benchmarks-india",
    siteName: "KNOMI",
    type: "article",
    locale: "en_IN",
  },
};

const faqs = [
  {
    q: "What is a good labour cost percentage for a restaurant in India?",
    a: "Build your target from your own P&L rather than borrowing one. As an illustration, a full-service restaurant with ₹10 lakh of monthly revenue and ₹2.2 lakh of total employee cost runs at 22%. Lower base wages and fixed monthly salaries mean the US rule of thumb of around 30% is a poor guide in India; track your own months against each other and judge labour together with food cost as Prime Cost.",
  },
  {
    q: "How do you accurately calculate restaurant labour cost in India?",
    a: "Divide your total employee expenses by gross revenue and multiply by 100. Total employee cost must include staff meals, employer PF and ESI contributions, shared accommodation rent, staff transport, uniforms, and festival bonuses. Leaving these hidden items out makes your numbers look better than they are.",
  },
  {
    q: "Why is restaurant attrition so damaging to Indian dining room profits?",
    a: "The National Restaurant Association of India (NRAI) reports food service employee attrition between 10% and 40% every month. Constantly rehiring and retraining servers can easily cost more in recruitment fees, kitchen mistakes, and slow service than you save by underpaying staff.",
  },
  {
    q: "What is Prime Cost and what should it be in an Indian restaurant?",
    a: "Prime Cost is the sum of Cost of Goods Sold (food and beverage cost) plus total labour cost as a percentage of revenue. As a working ceiling, we suggest keeping Prime Cost under about 60% to 65% of revenue, so there is room left for commercial rent, electricity, and taxes. Your own ceiling depends on your rent and format.",
  },
  {
    q: "How does table QR self-ordering reduce waiter labour overhead?",
    a: "Self-ordering removes the repetitive trip of walking to the table, noting dishes on a paper KOT, and walking to the POS terminal. With KNOMI, guests browse and order from their phones and the order goes straight to the kitchen display, so servers can spend their time running food and looking after guests. How much that changes your roster depends on your floor, so model it with your own numbers rather than relying on a promised saving.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Restaurant Labour Cost in India: Why the US 30% Rule Misleads",
      description:
        "A practical guide to calculating Indian restaurant labour costs, the hidden cost of staff attrition, and how to structure a floor team.",
      image: `https://www.knomi.in${OG_IMAGE.url}`,
      datePublished: "2026-09-05T20:00:00+05:30",
      dateModified: "2026-09-05T20:00:00+05:30",
      author: {
        "@type": "Person",
        name: "Madhvan Sharma",
        jobTitle: "Co-Founder",
        worksFor: {
          "@type": "Organization",
          name: "KNOMI",
          url: "https://www.knomi.in",
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.knomi.in/guides/restaurant-labour-cost-benchmarks-india",
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
          name: "Restaurant Labour Cost Benchmarks India",
          item: "https://www.knomi.in/guides/restaurant-labour-cost-benchmarks-india",
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

export default function LabourCostGuidePage() {
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
              <span>Labour Cost Benchmarks</span>
            </nav>

            <h1 className={styles.title}>
              Restaurant Labour Cost in India: Why the US 30% Rule Misleads
            </h1>

            <div className={styles.postMeta}>
              <span>By Madhvan Sharma, Co-Founder</span>
              <span>•</span>
              <span>Updated September 2026</span>
              <span>•</span>
              <span>8 Min Read</span>
            </div>

            <p className={styles.subtitle}>
              Why American hospitality benchmarks mislead Indian restaurant operators, where your
              payroll actually goes, and how to structure a high-margin floor team.
            </p>

            {/* Answer-First AEO Snippet Box */}
            <div className={styles.aeoBox}>
              <span className={styles.aeoLabel}>Quick Answer for Operators</span>
              <p className={styles.aeoText}>
                Indian restaurants should not borrow the US rule of thumb of around 30% labour cost:
                wages, salaried contracts and headcounts work differently here. Calculate your full
                employee cost (including meals, PF/ESI, housing and bonuses) as a share of revenue, and
                judge it together with food cost as Prime Cost. A leak that is easy to miss is attrition:
                the NRAI reports monthly staff churn of 10% to 40% across Indian food service. As a working
                ceiling, we suggest keeping Prime Cost (Food + Labour) below about 60% to 65%.
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>22%</div>
                <div className={styles.metricLabel}>Worked Example: ₹2.2 Lakh Staff Cost on ₹10 Lakh Revenue</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>&lt; 65%</div>
                <div className={styles.metricLabel}>Suggested Prime Cost Ceiling (Food Cost + Total Labour)</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>10% to 40%</div>
                <div className={styles.metricLabel}>Monthly Staff Churn in Indian Food Service, as Reported by the NRAI</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>All-In</div>
                <div className={styles.metricLabel}>Count Meals, PF/ESI, Housing, Uniforms and Bonuses as Labour</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Section */}
        <section className={styles.contentSection}>
          <div className="container">
            <article className={styles.articleLayout}>
              <p>
                Search online for restaurant labour cost benchmarks and many articles will tell
                you 30%, sometimes 35%. That advice is imported from the United States, where
                minimum wage mandates and hourly rosters create a completely different cost
                structure.
              </p>
              <p>
                Borrowing that 30% rule in India is hazardous. It leads restaurant operators to target
                the wrong metrics, trim rosters during peak revenue windows, and overlook one of the
                largest financial drains in Indian hospitality: <strong>staff attrition</strong>.
              </p>

              <h2>How to Calculate True Labour Cost in India</h2>
              <p>
                The textbook formula looks simple: total employee expenses divided by gross revenue,
                multiplied by 100.
              </p>

              <div className={styles.formulaBox}>
                <span className={styles.formulaCode}>
                  Labour Cost % = (Total Employee Cost ÷ Gross Revenue) × 100
                </span>
                <span className={styles.formulaCaption}>
                  Standardised formula for full-service restaurants, bars, and cloud kitchens in India.
                </span>
              </div>

              <p>
                The trap lies in what owners leave out. If you only tally bank salaries, you flatter
                your P&amp;L. A complete Indian restaurant employee cost must factor in:
              </p>
              <ul>
                <li><strong>Base Take-Home Salaries:</strong> Kitchen staff, captains, commis, and dishwashers.</li>
                <li><strong>Statutory Contributions:</strong> Employer PF (Provident Fund) and ESI contributions where applicable.</li>
                <li><strong>Staff Accommodation:</strong> Shared room rentals paid by the restaurant for outstation kitchen workers.</li>
                <li><strong>Staff Meals and Ration:</strong> Daily breakfast, lunch, and dinner provisions for on-duty staff.</li>
                <li><strong>Recruitment Commissions:</strong> Fees paid to manpower agencies or local scout referral bonuses.</li>
                <li><strong>Uniforms and Laundry:</strong> Upfront apron, shirt, and weekly commercial wash expenses.</li>
                <li><strong>Festival Bonuses:</strong> Annual Diwali or festive incentive allowances.</li>
              </ul>

              <p>
                Say a restaurant has ₹10,00,000 of monthly revenue and total employee outlays of ₹2,20,000:
                that is a 22% labour cost. Whether 22% is healthy depends on your format, rent and food cost,
                which is why Prime Cost matters more than labour on its own.
              </p>

              <h2>Why the American 30% Benchmark Misfires in India</h2>
              <p>
                In the United States, hourly wages are far higher and servers work hourly schedules.
                If a rainy Tuesday evening turns quiet at 8:00 PM, the floor manager can clock three
                servers out and send them home.
              </p>
              <p>
                Indian hospitality largely runs on monthly salaried contracts. Your tandoor chef, captains,
                and commis do not get sent home when the dining room is slow. Many live near the restaurant,
                eat their dinner there, and draw a fixed monthly salary. Trimming two hours from a shift
                saves almost nothing.
              </p>
              <p>
                Because base wages are lower relative to sales, Indian labour percentages tend to sit
                below the US rule of thumb. But what operators save on base wage rates, they can
                surrender to <strong>constant staff turnover</strong>.
              </p>

              <h2>The Real Indian Profit Bleed: 10% to 40% Monthly Churn</h2>
              <p>
                According to the National Restaurant Association of India (NRAI), staff turnover across
                Indian food service runs between <strong>10% and 40% every single month</strong>.
                Many quick-service employees move on within their first few years.
              </p>

              <div className={styles.calloutBox}>
                <p>
                  A restaurant running a 20% labour cost with 30% monthly staff churn can be in worse financial
                  health than one running 25% labour with a stable, loyal team, even though the P&amp;L suggests the
                  opposite.
                </p>
              </div>

              <p>
                The true financial damage of churn never appears on the salary line of an accounting ledger:
              </p>
              <ul>
                <li><strong>Agency and Replacement Costs:</strong> Paying recruiter advances or transport allowances every few weeks.</li>
                <li><strong>Training Lag:</strong> A newly hired waiter takes weeks to learn the menu, allergens, and bar pairings.</li>
                <li><strong>Kitchen Billing Errors:</strong> New staff mishear orders, fail to relay Jain or spice modifications, and punch incorrect table numbers.</li>
                <li><strong>Senior Team Burnout:</strong> Your top captain spends the rush double-checking junior trainees instead of attending to VIP guests.</li>
              </ul>

              <h2>The Prime Cost Rule: Food + Labour Under 65%</h2>
              <p>
                Never review labour in isolation. Look at <strong>Prime Cost</strong>,
                which combines Cost of Goods Sold (raw food and liquor) with total labour outlays.
                The scenarios below are illustrative, to show how the two interact.
              </p>

              <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th>Food Cost %</th>
                      <th>Labour Cost %</th>
                      <th>Prime Cost %</th>
                      <th>Financial Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Optimal Efficiency</strong></td>
                      <td>30%</td>
                      <td>21%</td>
                      <td><strong>51%</strong></td>
                      <td>High margin: generous buffer for rent and profit.</td>
                    </tr>
                    <tr>
                      <td><strong>Acceptable Balance</strong></td>
                      <td>32%</td>
                      <td>25%</td>
                      <td><strong>57%</strong></td>
                      <td>Workable for full service: sustainable cash flow.</td>
                    </tr>
                    <tr>
                      <td><strong>Danger Zone</strong></td>
                      <td>36%</td>
                      <td>28%</td>
                      <td><strong>64%</strong></td>
                      <td>Vulnerable: commercial rent spikes will eliminate profits.</td>
                    </tr>
                    <tr>
                      <td><strong>Critical Loss</strong></td>
                      <td>38%</td>
                      <td>32%</td>
                      <td><strong>70%</strong></td>
                      <td>Severe cash bleed: restaurant will deplete reserves quickly.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>The Two Levers That Actually Lower Indian Labour Costs</h2>
              <p>
                Since you cannot flex monthly salaries by the hour, how do you bring employee
                expenses down?
              </p>

              <h3>Lever 1: Staff Retention Over Roster Trimming</h3>
              <p>
                Retaining existing employees is substantially cheaper than replacing them. Paying market-rate
                wages with predictable weekly off-days, dignified staff meals, and clear promotion ladders
                reduces how often you have to hire at all.
              </p>

              <h3>Lever 2: Freeing Server Time with KNOMI Self-Ordering</h3>
              <p>
                In a traditional setup, floor servers spend much of their shift walking back and
                forth: delivering paper menus, returning to write down dishes, walking to the POS
                counter to punch KOTs, and walking back with card machines.
              </p>
              <p>
                With <Link href="/compare/dotpe-vs-knomi">KNOMI&apos;s QR menu</Link>, guests scan, browse
                an illustrated menu themed to your restaurant, and send their order straight to your kitchen display.
              </p>
              <p>
                Your servers do not disappear. Instead of running paper tickets, they focus on hospitality,
                food running, and guest engagement, which can let the same team look after more tables on a
                busy night. How far that goes depends on your floor, so model it with your own numbers.
              </p>

              {/* Interactive ROI Banner */}
              <div className={styles.calcBanner}>
                <div className={styles.calcBannerTitle}>
                  Model Your Restaurant&apos;s Payroll Scenarios
                </div>
                <p className={styles.calcBannerSub}>
                  Use our interactive Self-Ordering ROI Calculator to estimate how the numbers could look
                  with your own table count, waiter salaries, and shift ratios.
                </p>
                <Link href="/guides/self-ordering-roi" className={`${styles.calcButton} pressable`}>
                  Open Interactive ROI Calculator →
                </Link>
              </div>

              <h2>Summary Checklist for Indian Restaurant Operators</h2>
              <ol>
                <li>Calculate your <strong>all-in labour cost</strong> every month and track it against your own history.</li>
                <li>Add staff accommodation, meals, PF/ESI, and uniforms into your total employee calculation.</li>
                <li>Monitor your <strong>Prime Cost weekly</strong>: we suggest keeping Food Cost plus Labour under about 60% to 65%.</li>
                <li>Audit your monthly turnover: if you are replacing more than 2 staff members per month, solve retention before cutting pay.</li>
                <li>Consider tabletop ordering so your existing staff spend less time taking orders and more time looking after guests.</li>
              </ol>

              {/* FAQ Section */}
              <div className={styles.faqSection}>
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <div className={styles.faqQuestion}>{faq.q}</div>
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Bottom CTA Box */}
              <div className={styles.ctaBox}>
                <div className={styles.ctaTitle}>
                  Cut Waiter Bottlenecks Without Sacrificing Hospitality
                </div>
                <p className={styles.ctaSubtitle}>
                  See KNOMI on a menu like yours: an illustrated menu with Knomi Host inside, orders straight
                  to your kitchen display, alongside the POS you already use, at 0% commission.
                </p>
                <div className={styles.ctaActions}>
                  <Link href="/#book" className={`${styles.primaryCta} pressable`}>
                    Book a walkthrough
                  </Link>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.whatsappCta} pressable`}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
