import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceKnomiBox from '@/components/ExperienceKnomiBox';
import BehavioralVsPosSimulator from './BehavioralVsPosSimulator';
import styles from './PosVsBehavioral.module.css';
import { OG_IMAGE, bookHref, pricing } from "@/content/site";

const ecosystemPlan = pricing.plans[2];
const ECOSYSTEM_PRICE = `₹${ecosystemPlan.priceMin}–${ecosystemPlan.priceMax}`;

export const metadata: Metadata = {
  title: 'Why a POS Is Not Enough: Behavioral Intelligence vs Legacy Restaurant Software (2026) | KNOMI',
  description:
    'Traditional restaurant POS systems only track completed transactions. See how behavioral intelligence measures invisible demand, pre-order hesitation and dish dwell time, and how Knomi Sense puts it on a 2x2 menu matrix.',
  alternates: {
    canonical: '/compare/pos-vs-behavioral-intelligence',
  },
  openGraph: {
    title: 'Why a POS Is Not Enough: Behavioral Intelligence vs Legacy Restaurant Software',
    description:
      'A traditional POS records sales after the fact. Explore why dining floors benefit from browsing data too: invisible demand, dish dwell time and attention-to-order conversion.',
    url: 'https://www.knomi.in/compare/pos-vs-behavioral-intelligence',
    siteName: 'KNOMI',
    images: [
      {
        url: OG_IMAGE.url,
        width: 1200,
        height: 630,
        alt: 'POS vs Behavioral Intelligence Comparison',
      },
    ],
    type: 'article',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why a POS Is Not Enough: Behavioral Intelligence vs Legacy Restaurant Software',
    description:
      'Sales reports show what sold. Behavioral intelligence shows what guests looked at, lingered on and left. Here is how the two fit together.',
    images: [OG_IMAGE.url],
  },
};

const faqs = [
  {
    q: 'What is the primary difference between a restaurant POS and behavioral intelligence?',
    a: 'A traditional POS is a record-keeping system that logs transactions after a guest has chosen and paid. Behavioral intelligence measures what guests do before they order: which dishes they open, how long they linger on each one, how far down the menu they scroll, and which dishes they view but skip.',
  },
  {
    q: 'What is invisible demand in a restaurant menu?',
    a: 'Invisible demand is interest that never turns into an order: dishes guests open and spend noticeably longer reading, then leave, perhaps because of price uncertainty, an unclear portion size or a description that doesn\'t sell the dish. A POS records nothing for these moments, so they never show up in your sales reports.',
  },
  {
    q: 'Does KNOMI replace my existing Petpooja or Posist POS system?',
    a: 'No. KNOMI is designed to sit alongside your billing POS. Petpooja, Posist or ShawMan keep handling back-office accounting, inventory, GST filing and cashier settlement. KNOMI replaces the paper or PDF menu on the table as the guest-facing layer, sending orders to your kitchen display. On the Signature plan, KNOMI integrates with your existing POS (Petpooja integration is available), so orders flow into it.',
  },
  {
    q: 'How does tracking diner dwell time increase restaurant revenue?',
    a: 'Item-level dwell time shows which dishes attract a lot of interest but few orders. Clarifying the portion, rewriting the description or pairing the dish with a drink gives hesitant guests a reason to say yes, without raising menu prices. Our goal is to lift your average order by around 25%. In the trial we measure it on your own tables, and you see the numbers.',
  },
  {
    q: 'How does the 2x2 Attention-to-Order matrix differ from the classic menu engineering matrix?',
    a: 'The classic menu engineering matrix (Kasavana and Smith, 1982, adapted from the Boston Consulting Group growth-share matrix) sorts dishes by sales volume and gross margin (Stars, Plowhorses, Puzzles, Dogs), which only reflects past purchases. Knomi Sense plots attention (how long guests linger on a dish) against conversion (how often viewing turns into adding it to the order), which reveals high-interest dishes that a volume-only view can mistake for dead items.',
  },
  {
    q: 'Can KNOMI help catch slow service before guests write a negative online review?',
    a: 'It gives your team more to go on. Orders appear on the live orders dashboard and kitchen display the moment guests confirm, and guests can call a server from the menu instead of waiting to catch someone\'s eye. Near the end of the meal, Knomi Host invites guests to leave a Google review.',
  },
];

export default function PosVsBehavioralPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why a POS Is Not Enough: Behavioral Intelligence vs Legacy Restaurant Software',
    description:
      'Why traditional restaurant point-of-sale systems can\'t see pre-order behaviour, and how browsing data such as dwell time and attention-to-order conversion fills the gap.',
    datePublished: '2026-06-28T08:00:00+05:30',
    dateModified: '2026-10-11T12:00:00+05:30',
    author: [
      {
        '@type': 'Person',
        name: 'Yash Garg',
        jobTitle: 'Co-Founder',
        worksFor: {
          '@type': 'Organization',
          name: 'KNOMI',
          url: 'https://www.knomi.in',
        },
      },
      {
        '@type': 'Person',
        name: 'Madhvan Sharma',
        jobTitle: 'Co-Founder',
        worksFor: {
          '@type': 'Organization',
          name: 'KNOMI',
          url: 'https://www.knomi.in',
        },
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'KNOMI',
      url: 'https://www.knomi.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.knomi.in/images/knomi-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.knomi.in/compare/pos-vs-behavioral-intelligence',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.knomi.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: 'https://www.knomi.in/#owners',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'POS vs Behavioral Intelligence',
        item: 'https://www.knomi.in/compare/pos-vs-behavioral-intelligence',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#owners">Compare</Link>
            <span>/</span>
            <span>POS vs Behavioral Intelligence</span>
          </div>

          <h1 className={styles.title}>
            Why a POS Is Not Enough: Behavioral Intelligence vs Legacy Restaurant Software
          </h1>

          <div className={styles.postMeta}>
            <span>By Yash Garg &amp; Madhvan Sharma, Co-Founders</span>
            <span>·</span>
            <span>Published June 2026</span>
            <span>·</span>
            <span>Updated October 2026</span>
            <span>·</span>
            <span>12 Min Read</span>
          </div>

          <p className={styles.subtitle}>
            A traditional POS is a digital cash register that records what diners bought after they made their choices.
            Here is why it helps to pair your billing system with data on what guests look at before they order: the invisible demand
            your sales reports never show.
          </p>
        </section>

        {/* Answer-First AEO Box */}
        <section className={styles.quickAnswerBox}>
          <span className={styles.quickAnswerBadge}>Executive Summary for Restaurateurs</span>
          <p className={styles.quickAnswerText}>
            A traditional restaurant POS is an accounting tool that records completed sales, so it can&apos;t see what happens
            before the bill is printed. Behavioral intelligence measures what guests do on the menu: which dishes they open, how long
            they linger, and which ones they view but don&apos;t order. Knomi Sense, part of KNOMI&apos;s Ecosystem plan, puts that on a
            2x2 attention-to-order matrix, while Knomi Host suggests pairings at the moment of choice. It all runs alongside your existing POS.
          </p>
        </section>

        {/* Quick Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>2x2</div>
            <div className={styles.statLabel}>Knomi Sense matrix: attention vs orders, for every dish</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>+25%</div>
            <div className={styles.statLabel}>KNOMI&apos;s target lift in average order: a goal we measure in the trial, not a past result</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Pre-order browsing data recorded by a traditional billing POS</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>0%</div>
            <div className={styles.statLabel}>Commission on orders; KNOMI is a flat fee per table</div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.contentBody}>
            <h2>The POS Blindspot: Why Modern Restaurants Fly Blind on Dining Intent</h2>
            <p>
              For decades, restaurant technology has revolved around one central appliance:
              the Point of Sale (POS) terminal. Whether it is desktop software like Micros, Indian billing suites
              like <Link href="/compare/petpooja-alternatives">Petpooja</Link> or Posist (Restroworks), or QR commerce platforms like{' '}
              <Link href="/compare/dotpe-vs-knomi">DotPe</Link>, these systems are built around the transaction.
            </p>
            <p>
              A POS accepts an order entered by a server, prints a Kitchen Order Ticket (KOT), calculates 5% GST and prints the final tax bill.
              At midnight, it produces an end-of-day sales summary, for example: <em>140 Butter Chickens sold, 82 Garlic Naans sold, 18 Tiramisus sold. Gross Revenue: ₹1,42,000.</em>
            </p>
            <p>
              Owners study these summaries every morning as a picture of demand. In reality, they are
              looking in the rearview mirror. <strong>A POS records what guests settled on; it tells you nothing about what else they considered.</strong>
            </p>

            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                &ldquo;Imagine an online store that only tracked completed checkouts and ignored page views, abandoned carts
                and scroll depth. It would be flying blind. Yet restaurants have long tried to run multi-crore
                dining floors using little more than the checkout receipt.&rdquo;
              </div>
              <div className={styles.quoteAuthor}>Yash Garg, Co-Founder at KNOMI</div>
            </div>

            <h2>What Is Invisible Demand? The Anatomy of the 40-Second Dish View</h2>
            <p>
              Take an illustrative Friday-night diner at Table 6. They scan the QR menu on their phone,
              scroll to your chef&apos;s specials and tap on the <em>Pan-Seared Sea Bass with Lemon Caper Butter (₹850)</em>.
            </p>
            <p>
              They stay on that dish for 42 seconds and read the description twice. They are intrigued by the flavours.
              Then doubt creeps in: <em>Is ₹850 too steep? Is the portion big enough to share? Will it be too salty?</em>
            </p>
            <p>
              With no picture of the dish, no pairing suggestion and no server nearby to answer the question,
              the diner closes the card and plays it safe with the <em>Classic Chicken Tikka (₹420)</em>.
            </p>
            <p>
              Here is the divide between a billing record and behavioral intelligence:
            </p>

            <div className={styles.contrastGrid}>
              <div className={`${styles.contrastCard} ${styles.contrastCardPos}`}>
                <div className={styles.contrastHeader}>
                  <h3 className={styles.contrastTitle}>What Your Billing POS Sees</h3>
                  <span className={styles.contrastBadgePos}>Lagging Record</span>
                </div>
                <ul className={styles.contrastList}>
                  <li className={styles.contrastListItem}>Logs 1x Chicken Tikka sold for ₹420.</li>
                  <li className={styles.contrastListItem}>Has no way to know the guest wanted something else.</li>
                  <li className={styles.contrastListItem}>Records nothing about the Sea Bass.</li>
                  <li className={styles.contrastListItem}>The chef assumes the Sea Bass is unpopular and drops it next quarter.</li>
                </ul>
              </div>

              <div className={`${styles.contrastCard} ${styles.contrastCardKnomi}`}>
                <div className={styles.contrastHeader}>
                  <h3 className={styles.contrastTitle}>What Knomi Sense Sees</h3>
                  <span className={styles.contrastBadgeKnomi}>Leading Telemetry</span>
                </div>
                <ul className={styles.contrastList}>
                  <li className={styles.contrastListItem}>The Sea Bass was opened and read for 42 seconds.</li>
                  <li className={styles.contrastListItem}>Across the week, how many guests opened it compared with how many ordered it.</li>
                  <li className={styles.contrastListItem}>The dish lands in the high-attention, low-order quadrant of the matrix.</li>
                  <li className={styles.contrastListItem}>The next move is yours: clarify the portion, rewrite the description, or have Knomi Host suggest a white wine with it.</li>
                </ul>
              </div>
            </div>

            {/* Interactive Simulator */}
            <BehavioralVsPosSimulator />

            <h2>Upgrading Beyond 1982: The Attention-to-Order 2x2 Matrix</h2>
            <p>
              In 1982, Michael Kasavana and Donald Smith developed the foundational Menu Engineering framework at Michigan State University,
              adapting the Boston Consulting Group (BCG) matrix to restaurant menus. Since then, operators have sorted dishes
              into four quadrants based on sales volume and gross margin:
            </p>
            <ul>
              <li><strong>Stars:</strong> High Volume, High Margin.</li>
              <li><strong>Plowhorses:</strong> High Volume, Low Margin.</li>
              <li><strong>Puzzles:</strong> Low Volume, High Margin.</li>
              <li><strong>Dogs:</strong> Low Volume, Low Margin.</li>
            </ul>
            <p>
              The limitation of a volume-only view is that it treats <em>Low Volume</em> as <em>Low Guest Interest</em>.
              When a POS report shows that an artisanal appetiser sold only 12 portions in a month, the usual advice is:{' '}
              <em>&ldquo;It&apos;s a Dog. Take it off the menu.&rdquo;</em>
            </p>
            <p>
              Knomi Sense adds the missing signal, <strong>attention</strong>: how long guests linger on each dish, set against how often
              viewing turns into an order. That gives four practical quadrants:
            </p>

            {/* Visual 2x2 Matrix Box */}
            <div className={styles.matrixBox}>
              <div className={styles.matrixTitle}>The KNOMI Attention-to-Order Behavioral Matrix</div>
              <div className={styles.matrixSubtitle}>
                Mapping digital engagement (dwell time &amp; dish views) against actual order conversion
              </div>

              <div className={styles.matrixGrid}>
                <div className={styles.matrixQuadrant}>
                  <div className={styles.quadrantHeader}>
                    <span className={styles.quadrantName}>1. True Stars</span>
                    <span className={`${styles.tagHighHigh} ${styles.quadrantTag}`}>High Attention · High Order</span>
                  </div>
                  <div className={styles.quadrantBody}>
                    Dishes guests look at and order with little hesitation. Your crowd favourites.
                  </div>
                  <div className={styles.quadrantAction}>
                    Strategy: Keep them prominent in their categories. Avoid discounting. Protect margins.
                  </div>
                </div>

                <div className={styles.matrixQuadrant}>
                  <div className={styles.quadrantHeader}>
                    <span className={styles.quadrantName}>2. High-Interest Drop-offs</span>
                    <span className={`${styles.tagHighLow} ${styles.quadrantTag}`}>High Attention · Low Order</span>
                  </div>
                  <div className={styles.quadrantBody}>
                    Dishes guests linger on but leave at the last moment, often because of price doubts or an unclear description.
                  </div>
                  <div className={styles.quadrantAction}>
                    Strategy: Clarify the portion size, sharpen the description, or pair it with a drink.
                  </div>
                </div>

                <div className={styles.matrixQuadrant}>
                  <div className={styles.quadrantHeader}>
                    <span className={styles.quadrantName}>3. Overlooked Gems</span>
                    <span className={`${styles.tagLowHigh} ${styles.quadrantTag}`}>Low Attention · High Order</span>
                  </div>
                  <div className={styles.quadrantBody}>
                    Dishes that are rarely discovered, perhaps because they sit low on the menu, but order well when guests do find them.
                  </div>
                  <div className={styles.quadrantAction}>
                    Strategy: Move them higher in their category or add a badge so more guests see them.
                  </div>
                </div>

                <div className={styles.matrixQuadrant}>
                  <div className={styles.quadrantHeader}>
                    <span className={styles.quadrantName}>4. True Deadweight</span>
                    <span className={`${styles.tagLowLow} ${styles.quadrantTag}`}>Low Attention · Low Order</span>
                  </div>
                  <div className={styles.quadrantBody}>
                    Dishes guests scroll straight past and rarely order. They crowd the menu and tie up inventory.
                  </div>
                  <div className={styles.quadrantAction}>
                    Strategy: Consider removing them to simplify the menu and reduce inventory holding.
                  </div>
                </div>
              </div>
            </div>

            <h2>Lagging Records vs Real-Time Telemetry: 10-Point Comparison Table</h2>
            <p>
              To see what browsing data adds to a restaurant tech stack, compare a traditional billing POS with KNOMI and
              Knomi Sense:
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Capability / Operational Dimension</th>
                    <th>Traditional Billing POS</th>
                    <th>KNOMI with Knomi Sense</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Primary Operational Goal</strong></td>
                    <td>Billing compliance, KOT printing and tax accounting</td>
                    <td>The guest-facing menu, ordering, upselling and menu intelligence</td>
                  </tr>
                  <tr>
                    <td><strong>Pre-Order Telemetry</strong></td>
                    <td>None: the POS sees the order once it is entered</td>
                    <td>Dish views, dwell time and scroll depth by category</td>
                  </tr>
                  <tr>
                    <td><strong>Menu Dwell-Time Tracking</strong></td>
                    <td>None (paper or PDF menu)</td>
                    <td>Per-dish dwell time</td>
                  </tr>
                  <tr>
                    <td><strong>Invisible Demand Detection</strong></td>
                    <td>Not possible (no record of dishes viewed but not ordered)</td>
                    <td>Flags high-attention, low-order dishes on the matrix</td>
                  </tr>
                  <tr>
                    <td><strong>Menu Engineering Model</strong></td>
                    <td>Classic menu engineering (1982): sales volume vs margin</td>
                    <td>Attention-to-order matrix: dwell time vs order rate</td>
                  </tr>
                  <tr>
                    <td><strong>Diner Onboarding Friction</strong></td>
                    <td>Waiting for a server, or whatever flow your QR vendor uses</td>
                    <td>Menu opens in the browser with no app or login; phone number only to confirm the order</td>
                  </tr>
                  <tr>
                    <td><strong>Contextual Sensory Upselling</strong></td>
                    <td>Depends on staff remembering during busy shifts</td>
                    <td>Knomi Host suggests pairings at the moment of choice</td>
                  </tr>
                  <tr>
                    <td><strong>Table Service Requests</strong></td>
                    <td>Guests wait to catch a server&apos;s eye</td>
                    <td>Guests call a server from the menu; orders show on the live dashboard</td>
                  </tr>
                  <tr>
                    <td><strong>Guest Recognition Memory</strong></td>
                    <td>Customer records, where the POS has a CRM module</td>
                    <td>Knomi Host remembers preferences (no onion, extra spicy)</td>
                  </tr>
                  <tr>
                    <td><strong>Check Size Impact</strong></td>
                    <td>Neutral (passive ledger)</td>
                    <td>Built to lift it: pairings suggested on every dish page</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Seeing the Floor in Real Time: Catching Slow Service Before It Becomes a Review</h2>
            <p>
              Every restaurant manager dreads a 1-star Google review that reads something like this:{' '}
              <em>&ldquo;Food was decent, but we waited ages for someone to take our order, and again to pay.&rdquo;</em>
            </p>
            <p>
              When this happens, the owner talks to the floor manager, who talks to the captains. But the root cause is structural:{' '}
              <strong>a POS has no awareness of time passing on your dining floor.</strong> It doesn&apos;t know that Table 14 is
              waiting for a water refill, or that Table 9 finished dessert a while ago and is trying to catch a server&apos;s eye.
            </p>
            <p>
              KNOMI gives your team a clearer view of the floor through the meal:
            </p>
            <ol>
              <li><strong>Seated &amp; Exploring:</strong> Guests open the illustrated menu and browse, with no app and no login.</li>
              <li><strong>Ordering:</strong> Knomi Host suggests pairings, and guests confirm the order with their phone number.</li>
              <li><strong>Kitchen Line Active:</strong> The order appears on the kitchen display and the live orders dashboard the moment it is confirmed.</li>
              <li><strong>Dining &amp; Enjoying:</strong> Guests can add another round or a dessert from the menu without waiting for a server.</li>
              <li><strong>Asking for Help:</strong> Guests can ask for a server, water or cutlery from the menu instead of waving.</li>
              <li><strong>Before They Leave:</strong> Near the end of the meal, Knomi Host invites guests to leave a Google review.</li>
            </ol>

            <div className={styles.calloutBox}>
              <div className={styles.calloutTitle}>The Labour Equation: Time Back on the Floor</div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                When guests order from the menu themselves, the order goes straight to the kitchen display, so servers spend less of
                the rush carrying chits and more of it looking after guests. What that is worth depends on your floor and your team;
                our <Link href="/guides/self-ordering-roi">self-ordering ROI guide</Link> lets you run the numbers with your own figures.
              </p>
            </div>

            <h2>Co-Existence Architecture: Why KNOMI Replaces Your Menu, Not Your Billing Engine</h2>
            <p>
              A question restaurant operators often ask is: <em>&ldquo;Do I have to rip out my existing billing POS to use KNOMI?&rdquo;</em>
            </p>
            <p>
              The answer is <strong>no</strong>. Ripping out your billing software disrupts cashier operations, breaks Tally accounting sync
              and makes kitchen staff learn a new interface.
            </p>
            <p>
              KNOMI is designed to sit alongside your existing stack as the guest-facing layer:
            </p>
            <ul>
              <li>
                <strong>Your Existing POS (Petpooja, Posist, Micros):</strong> Keeps handling the back-office ledger, inventory,
                purchasing and statutory GST filing.
              </li>
              <li>
                <strong>KNOMI:</strong> Replaces the paper or PDF menu on the tables with an illustrated menu and Knomi Host. It sends orders
                to your kitchen display or to ESC/POS network thermal printers, and on the Signature plan integrates with your existing POS
                (Petpooja integration is available).
              </li>
              <li>
                <strong>Knomi Sense:</strong> On the Ecosystem plan ({ECOSYSTEM_PRICE} per table, per month), adds the attention-to-order
                matrix and browsing insights to your dashboard, with no disruption to your cashier or back-office accounting.
              </li>
            </ul>

            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                &ldquo;You do not replace your accounting software to improve your sales pitch. Similarly, you do not replace your back-office billing POS
                to improve table hospitality. You give your guests a dining interface that understands what they want to eat.&rdquo;
              </div>
              <div className={styles.quoteAuthor}>Madhvan Sharma, Co-Founder at KNOMI</div>
            </div>

            {/* Conversion CTA Box */}
            <ExperienceKnomiBox
              city="Dining Floor"
              title="See What Your Billing POS Is Missing"
              description="See invisible demand, let Knomi Host suggest the pairing at every table, and keep your existing POS. Book a walkthrough with the founding team."
              buttonText="Book a Walkthrough →"
              buttonHref={bookHref}
            />

            {/* FAQ Section */}
            <div className={styles.faqSection}>
              <h2>Frequently Asked Questions</h2>

              {faqs.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <div className={styles.faqQuestion}>{faq.q}</div>
                  <div className={styles.faqAnswer}>{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Related Reading Links */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border-default)' }}>
              <h3>Related Operational &amp; Comparison Guides</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/compare/knomi-vs-petpooja-vs-dotpe">KNOMI vs Petpooja vs DotPe: 3-Way Restaurant QR Ordering Comparison</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/compare/petpooja-alternatives">Petpooja Alternatives for Cafes &amp; Restaurants (2026 Comparison)</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/compare/dotpe-vs-knomi">DotPe vs KNOMI: Comparison for Indian Restaurant Operators</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/setup-qr-menu-india">How to Set Up a QR Digital Menu for Your Restaurant in India (2026 Guide)</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/self-ordering-roi">Restaurant Self-Ordering ROI Calculator</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/why-pdf-qr-menus-fail-restaurants">Why PDF QR Menus Fail Restaurants in India</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
