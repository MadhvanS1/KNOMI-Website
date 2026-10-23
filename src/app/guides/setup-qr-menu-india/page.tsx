import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceKnomiBox from '@/components/ExperienceKnomiBox';
import QrMenuSetupCostEstimator from './QrMenuSetupCostEstimator';
import styles from './QrMenuSetupIndia.module.css';
import { OG_IMAGE } from "@/content/site";

export const metadata: Metadata = {
  title: 'How to Set Up a QR Digital Menu for Your Restaurant in India (2026 Operator Guide) | KNOMI',
  description:
    'Complete step-by-step 2026 guide to setting up a restaurant QR digital menu in India: FSSAI veg non-veg compliance, 5% GST rules, dynamic UPI QR integration, ESC/POS thermal printer setup, and hardware capex calculator.',
  alternates: {
    canonical: '/guides/setup-qr-menu-india',
  },
  openGraph: {
    images: [OG_IMAGE],
    title: 'How to Set Up a QR Digital Menu for Your Restaurant in India (2026 Operator Guide) | KNOMI',
    description:
      'The complete deployment framework for Indian restaurant QR menus: FSSAI green/brown dot regulations, 5% food GST vs liquor VAT, dynamic table UPI, and thermal printer setup.',
    url: 'https://www.knomi.in/guides/setup-qr-menu-india',
    siteName: 'KNOMI',
    type: 'article',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Set Up a QR Digital Menu in India: Complete 2026 Operator Guide',
    description:
      'Step-by-step operational and technical manual for Indian restaurant QR menus. Hardware capex, FSSAI compliance, dynamic UPI, and kitchen printer routing.',
  },
};

export default function SetupQrMenuIndiaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Set Up a QR Digital Menu for Your Restaurant in India (2026 Operator Guide)',
    description:
      'An operational and technical blueprint for Indian restaurant owners and F&B managers to deploy a fast digital QR menu with FSSAI compliance, 5% GST invoicing, dynamic UPI payments, and kitchen display or thermal KOT printing.',
    datePublished: '2026-06-25T08:00:00+05:30',
    dateModified: '2026-09-06T00:00:00+05:30',
    author: {
      '@type': 'Person',
      name: 'Yash Garg',
      jobTitle: 'Co-Founder',
      worksFor: {
        '@type': 'Organization',
        name: 'KNOMI',
        url: 'https://www.knomi.in',
      },
    },
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
      '@id': 'https://www.knomi.in/guides/setup-qr-menu-india',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Set Up a QR Code Digital Menu in an Indian Restaurant',
    description:
      'A step-by-step technical and operational guide for Indian restaurant operators to deploy a digital QR menu with dynamic UPI, FSSAI compliance, and kitchen order routing.',
    totalTime: 'PT4H',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '7500',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'A6 Acrylic Table Tents or Laser-Engraved NFC Wood Pucks',
      },
      {
        '@type': 'HowToSupply',
        name: 'Thermal Receipt Paper Rolls (80mm BPA-Free)',
      },
      {
        '@type': 'HowToSupply',
        name: '3M Double-Sided Heavy Duty Acrylic Mounting Foam Tape',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: '80mm ESC/POS Ethernet Thermal Receipt Printer or Android KDS Tablet',
      },
      {
        '@type': 'HowToTool',
        name: 'CAT-6 Ethernet Network Cable and Wi-Fi Access Point',
      },
      {
        '@type': 'HowToTool',
        name: 'Cloud QR Menu Management Dashboard (KNOMI)',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Deploy a Zero-Download Responsive Web Architecture (Avoid Heavy PDFs)',
        text: 'Configure a web-based menu that uses modern image formats like WebP or AVIF. Avoid uploading static PDF files so the menu loads quickly on indoor mobile networks, without forcing app downloads or a phone number OTP gate before guests can browse.',
        url: 'https://www.knomi.in/guides/setup-qr-menu-india#step-1-architecture',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Ensure FSSAI Statutory Compliance for Digital Food Menus',
        text: 'Add the FSSAI green-circle-in-square (vegetarian) and brown-triangle-in-square (non-vegetarian) indicators to every dish. Include allergen warnings for the 8 major allergens and display calorie information if you hold a central licence or operate 10 or more outlets.',
        url: 'https://www.knomi.in/guides/setup-qr-menu-india#step-2-fssai',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Configure Restaurant GST and Dual Invoicing Rules',
        text: 'Set up the correct GST rates: 5% without Input Tax Credit for standalone restaurants, or 18% with Input Tax Credit for restaurants in hotel premises with room tariffs above 7,500 rupees. Bill alcoholic beverages separately under state excise and VAT rules.',
        url: 'https://www.knomi.in/guides/setup-qr-menu-india#step-3-gst',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Procure and Install Durable Anti-Glare Tabletop QR Hardware',
        text: 'Order commercial-grade tabletop QR hardware such as A6 double-sided acrylic stands with matte inserts or laser-engraved beech wood blocks with embedded NTAG213 NFC chips. Generate QR codes with Level M or Level Q Reed-Solomon error correction.',
        url: 'https://www.knomi.in/guides/setup-qr-menu-india#step-4-hardware',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Set Up Kitchen Order Routing (KDS vs 80mm ESC/POS Thermal Printers)',
        text: 'Connect an 80mm ESC/POS thermal printer via wired Ethernet (CAT-6) to your kitchen prep station, or wall-mount a 10-inch Android tablet running a cloud Kitchen Display System so digital orders arrive without lost paper tickets.',
        url: 'https://www.knomi.in/guides/setup-qr-menu-india#step-5-kitchen-routing',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Implement Table-Specific Dynamic UPI Payment Integration',
        text: 'Link your merchant Virtual Payment Address (VPA) to a dynamic UPI QR that carries the exact bill amount and a table reference. Diners can pay in one tap via Google Pay, PhonePe, or Paytm, and staff can match each payment to its table.',
        url: 'https://www.knomi.in/guides/setup-qr-menu-india#step-6-dynamic-upi',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does it cost to set up a QR menu for a 20-table restaurant in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On the indicative bulk prices used in the estimator in this guide, 20 anti-glare A6 acrylic table tents (about 2,600 rupees) plus one 80mm ESC/POS Ethernet kitchen thermal printer (about 4,800 rupees) come to roughly 7,400 rupees, a little more with spare stands. Wooden NFC stands or a KDS tablet raise the total. Software is a separate cost: KNOMI takes 0% commission, and we share its pricing on a short walkthrough call, once we understand your restaurant.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do Indian diners hate scanning PDF QR code menus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Diners dislike PDF QR menus because designers often export heavy, print-ready files meant for paper. In concrete dining rooms with weak indoor mobile signal, these files can take a long time to load, use personal mobile data, force double-pinch zooming on small screens, and do not let guests send orders to the kitchen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are FSSAI Veg and Non-Veg logos mandatory on digital QR menus in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under FSSAI Food Safety and Standards regulations, food business operators in India must clearly identify vegetarian dishes with a green filled circle inside a green square border, and non-vegetarian dishes with a brown filled triangle inside a brown square border. In 2021, FSSAI clarified that these labeling standards apply equally to electronic menus, e-commerce displays, and physical boards.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is GST applied on food ordered through a digital QR menu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standalone restaurants in India charge 5% GST (2.5% CGST + 2.5% SGST) on food and non-alcoholic beverages without Input Tax Credit (ITC). If your restaurant is located within hotel premises where declared room tariffs exceed 7,500 rupees per day, the applicable GST rate is 18% with ITC. Alcoholic drinks for human consumption are outside GST and are taxed under state excise and VAT rules, so they must be billed separately on the invoice.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a static counter UPI QR code and a dynamic table UPI QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A static counter UPI QR code only encodes the merchant UPI ID (VPA). The customer must type the bill amount into their payment app, and the cashier must cross-check payments by hand during busy dinner rushes. A dynamic table UPI QR code encodes the exact bill amount and a table or order reference, so the guest pays in one tap and staff can match the payment to the right table. Where your payment provider sends payment confirmations, your system can mark the table paid automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do diners need to download an app or pass login gates to view the menu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. KNOMI opens as a web page in the phone’s browser: guests point the camera at the table QR and the menu opens, with no app to install and no login to browse. A phone number is asked for only when the guest confirms an order. Asking diners to install an app or pass an SMS OTP gate before they can even see the menu adds friction at exactly the wrong moment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I keep my existing POS billing software while using KNOMI QR ordering?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. KNOMI works alongside the POS you already use, so your cashier workflow stays the same. Orders reach your kitchen display (and can print as KOTs on a kitchen thermal printer), and KNOMI can send table orders straight into your existing POS (Petpooja today).',
        },
      },
    ],
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
        name: 'Guides',
        item: 'https://www.knomi.in/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Set Up a QR Digital Menu in India',
        item: 'https://www.knomi.in/guides/setup-qr-menu-india',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span>QR Menu Setup India</span>
          </div>

          <h1 className={styles.title}>
            How to Set Up a QR Digital Menu for Your Restaurant in India (2026 Operator Guide)
          </h1>

          <div className={styles.postMeta}>
            <span>By Yash Garg, Co-Founder</span>
            <span>·</span>
            <span>Published June 2026</span>
            <span>·</span>
            <span>Updated September 2026</span>
            <span>·</span>
            <span>14 Min Read</span>
          </div>

          <p className={styles.subtitle}>
            A practical operational blueprint: avoiding the heavy-PDF trap, navigating FSSAI green/brown dot regulations,
            configuring 5% food GST vs liquor VAT, setting up wired ESC/POS kitchen printers, and implementing table-specific dynamic UPI settlement.
          </p>
        </section>

        {/* Answer-First AEO Box */}
        <section className={styles.quickAnswerBox}>
          <span className={styles.quickAnswerBadge}>Executive Summary for F&amp;B Operators</span>
          <p className={styles.quickAnswerText}>
            To set up a QR digital menu in India in 2026, restaurants need lightweight web-based menu software (avoiding heavy print PDFs),
            anti-glare table QR stands (A6 acrylic or laser-engraved wood pucks, from a few dozen to a few hundred rupees per table), and kitchen routing via
            a kitchen display or 80mm ESC/POS LAN thermal printers. A sound Indian rollout also needs FSSAI Veg/Non-Veg symbol compliance, correct 5% GST billing,
            and dynamic UPI QR generation, so guests can browse, order and pay from the table without waiting.
          </p>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.contentBody}>
            <h2>The New Standard for Tabletop Dining in India</h2>
            <p>
              Over the last five years, Indian dining rooms have experienced two contrasting waves of digital technology.
              The first wave was the hasty rollout of static PDF QR codes during 2020. While well-intentioned, putting a heavy
              print catalogue behind a laminated barcode led to widespread diner frustration: long buffering on congested 4G connections,
              uncomfortable pinch-zooming, and guests waving down waiters just to place an initial order.
            </p>
            <p>
              The second wave is <strong>interactive tabletop intelligence</strong>. In a well-run modern dining room, guests scan a table QR code
              and see a responsive, visual menu built for the phone. They see clear veg and non-veg markers, read chef recommendations, note
              preferences like spice level, and send orders straight to the kitchen without waiting to catch a server&apos;s eye.
            </p>
            <p>
              Setting up this system does not require expensive proprietary hardware or technical engineering teams. This guide
              breaks down the step-by-step process for Indian hospitality operators, covering regulatory compliance, physical capex,
              taxation, and kitchen hardware integration.
            </p>

            {/* Interactive Simulator Component */}
            <QrMenuSetupCostEstimator />

            <h2 id="step-1-architecture">Step 1: Choose a Zero-Download Responsive Web Architecture (Avoid Heavy PDFs)</h2>
            <p>
              The single biggest mistake Indian restaurateurs make when launching a digital menu is uploading their existing
              graphic design file (PDF or high-resolution JPEG) to Google Drive or a generic hosting service.
            </p>
            <p>
              As detailed in our breakdown on <Link href="/guides/why-pdf-qr-menus-fail-restaurants">why PDF QR menus fail restaurants</Link>,
              commercial print files are designed for offset printing at 300 DPI. The arithmetic on a weak indoor connection is unforgiving:
              a 35MB document over a congested 2 Mbps link takes 35 &times; 8 &divide; 2 = 140 seconds to download. Long before that,
              guests start asking for a physical paper card.
            </p>

            <div className={styles.calloutBox}>
              <div className={styles.calloutTitle}>Open Menu Browsing: Avoid Upfront Login Walls</div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Some QR ordering products ask diners to enter a 10-digit mobile number and verify an SMS OTP before they can even
                view dish prices. In India, where diners are increasingly protective of their personal data under the Digital Personal
                Data Protection (DPDP) Act 2023, an upfront OTP gate gives guests a reason to put the phone down. Make sure your QR menu
                opens straight away, and ask for a phone number only when the guest is ready to order. That is how KNOMI works.
              </p>
            </div>

            <p>
              To keep table performance fast, your digital menu should meet the following technical criteria:
            </p>
            <ul>
              <li>
                <strong>Modern Image Compression:</strong> All dish imagery should be compressed into next-generation WebP or AVIF formats,
                keeping individual food previews small (we suggest under 120KB) without compromising visual quality.
              </li>
              <li>
                <strong>Browser-Native PWA:</strong> The menu must function directly in standard mobile browsers (Safari, Chrome, Samsung Internet)
                without requiring app downloads from Google Play or Apple App Store.
              </li>
              <li>
                <strong>Instant Category Navigation:</strong> Diners should be able to switch between Starters, Mains, Cocktails, and Desserts
                without full page reloads.
              </li>
            </ul>

            <h2 id="step-2-fssai">Step 2: Ensure FSSAI Statutory Compliance for Digital Food Menus</h2>
            <p>
              In India, restaurant menus, including digital ones, are consumer-facing food information regulated by the Food Safety and
              Standards Authority of India (FSSAI). Operating an electronic menu without the required markings exposes your establishment to
              penalties under the Food Safety and Standards (Labelling and Display) Regulations.
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>FSSAI Compliance Requirement</th>
                    <th>Mandatory Specification</th>
                    <th>Applicable Establishments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Vegetarian Logo</strong></td>
                    <td>Green filled circle inside a green square outline (Ratio: diameter of circle is 50% to 60% of square edge)</td>
                    <td>All restaurants and eateries serving vegetarian preparations</td>
                  </tr>
                  <tr>
                    <td><strong>Non-Vegetarian Logo</strong></td>
                    <td>Brown filled equilateral triangle inside a brown square outline (pointing upward)</td>
                    <td>All restaurants serving meat, poultry, seafood, or egg items</td>
                  </tr>
                  <tr>
                    <td><strong>Major Food Allergens</strong></td>
                    <td>Explicit declaration for 8 recognized allergens: Gluten, Crustaceans, Fish, Eggs, Peanuts, Soybeans, Dairy/Milk, Tree Nuts</td>
                    <td>Mandatory for all dine-in food service establishments</td>
                  </tr>
                  <tr>
                    <td><strong>Caloric &amp; Nutritional Info</strong></td>
                    <td>Caloric value per portion (in kcal) displayed adjacent to dish description</td>
                    <td>Establishments with Central FSSAI License or operating 10+ chain outlets</td>
                  </tr>
                  <tr>
                    <td><strong>FSSAI License Display</strong></td>
                    <td>14-digit FSSAI registration/license number visible on the digital menu footer</td>
                    <td>All commercial food service operators in India</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              When designing your digital menu categories, make sure your software platform lets you tag every dish with the official FSSAI
              indicators. Dishes containing eggs (ovo-vegetarian) must be tagged with the brown non-veg symbol under current Indian food safety norms,
              though many modern menus also show a distinct egg marker for diner clarity. KNOMI dishes can be tagged veg, non-veg, egg, Jain or vegan.
            </p>

            <h2 id="step-3-gst">Step 3: Configure Restaurant GST and Dual Invoicing Rules</h2>
            <p>
              Correct tax configuration prevents audit problems with the Central Board of Indirect Taxes and Customs (CBIC).
              Indian restaurant taxation depends on the type of premises, hotel tariff classification,
              and liquor licensing.
            </p>
            <p>
              For a detailed walkthrough on input tax credit restrictions and hotel room thresholds, refer to our comprehensive guide on{' '}
              <Link href="/guides/gst-on-restaurant-food-rules-explained">GST on restaurant food in India</Link>.
            </p>

            <h3>The Three Primary Tax Configurations</h3>
            <ul>
              <li>
                <strong>Standalone Restaurants (5% GST):</strong> Standalone eateries, cafes, quick-service venues, and cloud kitchens
                charge 5% GST (2.5% CGST + 2.5% SGST). Under this scheme, restaurants cannot claim Input Tax Credit (ITC) on commercial rent,
                kitchen capex, or vendor purchases.
              </li>
              <li>
                <strong>Hotel-Based Restaurants (18% GST):</strong> If your restaurant is located inside a hotel premises where the declared room tariff
                of any unit exceeds 7,500 rupees per night, food and beverages are taxed at 18% GST (9% CGST + 9% SGST) with full Input Tax Credit eligibility.
              </li>
              <li>
                <strong>Dual Billing for Alcoholic Beverages (5% Food GST + State Liquor VAT):</strong> Alcoholic drinks for human consumption fall outside
                GST and are governed by state excise laws. In cities like Bangalore, Mumbai, or Delhi, drinks attract State VAT ranging from 18% to 25%.
                Your billing system should generate separate tax lines for food and liquor on the guest invoice, without manual cashier math.
              </li>
            </ul>

            <h2 id="step-4-hardware">Step 4: Procure and Install Durable Anti-Glare Tabletop QR Hardware</h2>
            <p>
              A good software system will still struggle if diners cannot scan the physical code on their tables.
              Indian restaurant dining rooms present unique environmental challenges: harsh overhead halogen spotlights, condensation from
              chilled beer and water glasses, sticky curry spills, and curious children peeling off adhesives.
            </p>
            <p>
              The costs below are indicative bulk rates, in line with the estimator above (based on Indiamart and Amazon Business B2B listings).
              Get current quotes before you order.
            </p>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepBadge}>A</div>
                  <h3 className={styles.stepTitle}>A6 Clear Acrylic Table Tents (Double-Sided)</h3>
                </div>
                <div className={styles.stepContent}>
                  <p>
                    <strong>Indicative cost:</strong> 110 to 140 rupees per unit (bulk order of 20+ units).<br />
                    <strong>Best For:</strong> Casual dining bistros, cafes, and rooftop restaurants.<br />
                    <strong>Key Advice:</strong> Print the insert card on 300 GSM cardstock with a <em>matte velvet lamination</em>.
                    Glossy paper inserts reflect ambient ceiling lighting, creating glare that stops smartphone cameras from focusing on the QR code.
                  </p>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepBadge}>B</div>
                  <h3 className={styles.stepTitle}>Laser-Etched Wood Blocks with Embedded NFC (NTAG213)</h3>
                </div>
                <div className={styles.stepContent}>
                  <p>
                    <strong>Indicative cost:</strong> 320 to 420 rupees per unit.<br />
                    <strong>Best For:</strong> Fine dining, cocktail lounges, and artisanal breweries.<br />
                    <strong>Key Advice:</strong> Solid beech or teak wood pucks laser-engraved with the table number and QR code.
                    An embedded NTAG213 or NTAG215 chip lets iPhone and Android users simply tap the top of the wood block to open the menu,
                    with no camera scanning needed in low-lit bar environments.
                  </p>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepBadge}>C</div>
                  <h3 className={styles.stepTitle}>Heavy-Duty 3M Matte Vinyl Table Edge Stickers</h3>
                </div>
                <div className={styles.stepContent}>
                  <p>
                    <strong>Indicative cost:</strong> 35 to 55 rupees per unit.<br />
                    <strong>Best For:</strong> High-turnover quick service restaurants (QSRs), food courts, and outdoor dhabas.<br />
                    <strong>Key Advice:</strong> Use waterproof outdoor-grade vinyl with high-tack 3M adhesive. Apply to the top right corner of the table
                    surface. Avoid center table placement where hot sizzler plates or heavy cast iron cookware could scorch the vinyl.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.calloutBox}>
              <div className={styles.calloutTitle}>Engineering Rule: Use Level M or Level Q Error Correction</div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                When generating your QR code vector images, configure the Reed-Solomon Error Correction parameter to <strong>Level M (15%)</strong> or{' '}
                <strong>Level Q (25%)</strong>. Even if a table stand picks up scratches, grease stains, or water droplets over part of the code,
                smartphones can usually still read it.
              </p>
            </div>

            <h2 id="step-5-kitchen-routing">Step 5: Set Up Kitchen Order Routing (KDS vs 80mm ESC/POS Thermal Printers)</h2>
            <p>
              When a guest places an order on their phone, it should reach the kitchen line within seconds.
              There are two primary methods for routing digital orders to your culinary team:
            </p>

            <h3>Option A: Wired 80mm ESC/POS Thermal Receipt Printers</h3>
            <p>
              For traditional Indian kitchens used to physical Kitchen Order Tickets (KOT), thermal printers remain the workhorse.
              Commonly used models in India include the <strong>Epson TM-T82III</strong>, <strong>TVS RP 3200 Star</strong>, or <strong>Posiflex Aura</strong>.
              KNOMI can also print KOTs on a kitchen thermal printer.
            </p>
            <ul>
              <li>
                <strong>Always Use Ethernet (LAN / CAT-6):</strong> Avoid Bluetooth printers in a commercial kitchen.
                Microwave ovens, stainless steel refrigerators, and kitchen exhaust fans can interfere with Bluetooth and cause connections to drop.
                A hardwired CAT-6 Ethernet cable from your network router to the printer is far more reliable.
              </li>
              <li>
                <strong>Auto-Cutter Mechanism:</strong> Choose a printer with an automatic cutter so cooks can grab individual paper tickets without tearing paper rolls.
              </li>
              <li>
                <strong>Buzzer Alerts:</strong> Enable the printer&apos;s audio buzzer so kitchen staff hear when a new digital order prints over ambient cooking noise.
              </li>
            </ul>

            <h3>Option B: Wall-Mounted Android Kitchen Display System (KDS)</h3>
            <p>
              Many modern venues are moving from thermal paper rolls to cloud-based Kitchen Display Systems.
              A wall-mounted 10-inch Android tablet (such as a Lenovo Tab M10 or Samsung Galaxy Tab A9)
              on an articulating arm displays incoming orders on a digital tile grid.
            </p>
            <p>
              A digital KDS offers three clear operational advantages:
            </p>
            <ol>
              <li>
                <strong>Color-Coded Ageing:</strong> Tickets can change colour as they age (for example green when fresh, amber as they wait, red once they pass
                your target time), giving your head chef clear visibility into preparation bottlenecks.
              </li>
              <li>
                <strong>Zero Consumable Costs:</strong> Removes the ongoing cost of thermal paper rolls for that station.
              </li>
              <li>
                <strong>Item-Level Bumping:</strong> Kitchen staff can mark individual dishes ready as they come off the wok or tandoor, alerting floor staff to deliver food hot.
              </li>
            </ol>

            <h2 id="step-6-dynamic-upi">Step 6: Implement Table-Specific Dynamic UPI Payment Integration</h2>
            <p>
              In India, UPI is how a large share of diners prefer to pay.
              However, many restaurants still place a single static merchant QR stand on their billing counter.
            </p>
            <p>
              Static counter QR codes create confusion during peak Friday and Saturday dinner rushes.
              When three different tables pay an identical bill amount of 1,240 rupees at the same time, the cashier must spend
              several minutes cross-verifying transaction reference IDs on their soundbox or banking screen while a queue forms at the door.
            </p>

            <div className={styles.calloutBox}>
              <div className={styles.calloutTitle}>How Dynamic NPCI UPI QR Strings Work</div>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Under National Payments Corporation of India (NPCI) specifications, a dynamic UPI intent string encodes the exact payable amount and a unique table reference:
              </p>
              <pre style={{ margin: 0, padding: '12px', background: 'var(--color-surface-pressed)', borderRadius: '6px', overflowX: 'auto', fontSize: '0.85rem' }}>
                <code>upi://pay?pa=restaurant@icici&amp;pn=RoyalBistro&amp;tr=TBL07_INV8921&amp;am=1450.00&amp;cu=INR</code>
              </pre>
            </div>

            <p>
              When a diner scans the table QR code to settle their bill:
            </p>
            <ul>
              <li>Their smartphone opens Google Pay, PhonePe, or Paytm with the exact check total (including 5% GST and tip) pre-filled.</li>
              <li>The diner does not have to type the amount, so there is nothing to mistype.</li>
              <li>If your setup receives payment confirmations (through your payment provider or bank), the table can be marked settled and the tax receipt printed straight away; otherwise staff confirm the credit against the table reference.</li>
              <li>Funds go straight to the bank account linked to your UPI ID, with no aggregator in between.</li>
            </ul>
            <p>
              KNOMI can show guests a tableside UPI QR with the exact bill amount, paid to your own UPI ID.
            </p>

            <h2>Comparing QR Menu Architectures in India</h2>
            <p>
              Before launching your system, evaluate how different technology approaches compare across setup cost, ongoing operational fees,
              and diner experience:
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Feature / Metric</th>
                    <th>Static PDF QR Code</th>
                    <th>Commission-Based QR Platform</th>
                    <th>KNOMI Responsive SaaS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Initial Setup Capex</strong></td>
                    <td>Minimal (printed codes only)</td>
                    <td>Varies by provider</td>
                    <td>Your table stands and any kitchen hardware (see estimator)</td>
                  </tr>
                  <tr>
                    <td><strong>Recurring Software Cost</strong></td>
                    <td>Free (Google Drive / Hosting)</td>
                    <td>A commission on each order</td>
                    <td>Shared on a walkthrough call · 0% commission</td>
                  </tr>
                  <tr>
                    <td><strong>Menu Delivery</strong></td>
                    <td>Whole PDF must download first</td>
                    <td>Varies by provider</td>
                    <td>Web page with compressed WebP/AVIF images</td>
                  </tr>
                  <tr>
                    <td><strong>Diner Onboarding Friction</strong></td>
                    <td>None (View only, no ordering)</td>
                    <td>Some ask for a mobile number &amp; OTP before browsing</td>
                    <td>No app, no login to browse; phone number to confirm an order</td>
                  </tr>
                  <tr>
                    <td><strong>Kitchen Order Routing</strong></td>
                    <td>None (Must wave down waiter)</td>
                    <td>Varies by provider</td>
                    <td>Kitchen display, plus KOT printing on a kitchen thermal printer</td>
                  </tr>
                  <tr>
                    <td><strong>UPI Payment Settlement</strong></td>
                    <td>Manual counter soundbox</td>
                    <td>Through the platform&apos;s payment flow</td>
                    <td>Tableside UPI QR with the exact bill amount, paid to your own UPI ID</td>
                  </tr>
                  <tr>
                    <td><strong>Upselling at the Table</strong></td>
                    <td>None (static text)</td>
                    <td>Varies by provider</td>
                    <td>Knomi Host suggests pairings at every table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Pre-Launch Operational Readiness Checklist</h2>
            <p>
              Before welcoming guests to your newly digitised dining room, run through this 6-point pre-launch verification check:
            </p>

            <div className={styles.checklistGrid}>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>&#10003;</span>
                <div className={styles.checkText}>
                  <strong>Cellular Dead-Zone Audit:</strong> Test scanning table QR codes from your dining room corners and basement seating on both Airtel and Jio 4G SIM cards.
                </div>
              </div>

              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>&#10003;</span>
                <div className={styles.checkText}>
                  <strong>FSSAI Indicator Review:</strong> Verify that every vegetarian dish has a crisp green dot and all non-veg items display the official brown triangle.
                </div>
              </div>

              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>&#10003;</span>
                <div className={styles.checkText}>
                  <strong>Thermal Printer LAN Ping:</strong> Confirm that your 80mm ESC/POS printer has a static local IP address assigned on your Wi-Fi router to prevent IP drops.
                </div>
              </div>

              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>&#10003;</span>
                <div className={styles.checkText}>
                  <strong>Table Mapping Accuracy:</strong> Place a live 10-rupee test order from Table 4 and Table 12 to verify that printed KOT tickets reflect the correct table numbers.
                </div>
              </div>

              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>&#10003;</span>
                <div className={styles.checkText}>
                  <strong>GST Line Item Separation:</strong> Verify that trial bills correctly calculate 2.5% CGST + 2.5% SGST and segregate State Liquor VAT for bar items.
                </div>
              </div>

              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>&#10003;</span>
                <div className={styles.checkText}>
                  <strong>Staff Hospitality Training:</strong> Train floor stewards to welcome guests with: <em>&ldquo;You can scan the table stand to see the menu and place orders, or I would be delighted to assist you directly.&rdquo;</em>
                </div>
              </div>
            </div>

            {/* Conversion CTA Box */}
            <ExperienceKnomiBox
              city="Restaurant"
              title="Transform Your Dining Floor with KNOMI QR Ordering"
              description="An illustrated menu themed to your restaurant, Knomi Host suggesting the pairing at every table, orders straight to your kitchen display, and 0% commission. We share pricing on a short walkthrough call, once we understand your restaurant."
              buttonText="Book a walkthrough →"
              buttonHref="/#book"
            />

            {/* FAQ Section */}
            <div className={styles.faqSection}>
              <h2>Frequently Asked Questions</h2>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How much does it cost to set up a QR menu for a 20-table restaurant in India?
                </div>
                <div className={styles.faqAnswer}>
                  On the indicative bulk prices used in the estimator in this guide, 20 anti-glare A6 acrylic table tents (about 2,600 rupees) plus one 80mm ESC/POS Ethernet kitchen thermal printer (about 4,800 rupees)
                  come to roughly 7,400 rupees, a little more with spare stands. Wooden NFC stands or a KDS tablet raise the total. Software is a separate cost: KNOMI takes 0% commission,
                  and we share its pricing on a short walkthrough call, once we understand your restaurant.
                </div>
              </div>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Why do Indian diners hate scanning PDF QR code menus?
                </div>
                <div className={styles.faqAnswer}>
                  Diners dislike PDF QR menus because designers often export heavy, print-ready files meant for paper. In concrete dining rooms with weak
                  indoor mobile signal, these files can take a long time to load, use personal mobile data, force double-pinch zooming on small screens,
                  and do not let guests send orders to the kitchen.
                </div>
              </div>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Are FSSAI Veg and Non-Veg logos mandatory on digital QR menus in India?
                </div>
                <div className={styles.faqAnswer}>
                  Yes. Under FSSAI Food Safety and Standards regulations, food business operators in India must clearly identify vegetarian dishes with a green filled circle
                  inside a green square border, and non-vegetarian dishes with a brown filled triangle inside a brown square border. In 2021, FSSAI clarified that these labeling
                  standards apply equally to electronic menus, e-commerce displays, and physical boards.
                </div>
              </div>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How is GST applied on food ordered through a digital QR menu?
                </div>
                <div className={styles.faqAnswer}>
                  Standalone restaurants in India charge 5% GST (2.5% CGST + 2.5% SGST) on food and non-alcoholic beverages without Input Tax Credit (ITC).
                  If your restaurant is located within hotel premises where declared room tariffs exceed 7,500 rupees per day, the applicable GST rate is 18% with ITC.
                  Alcoholic drinks for human consumption are outside GST and are taxed under state excise and VAT rules, so they must be billed separately on the invoice.
                </div>
              </div>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  What is the difference between a static counter UPI QR code and a dynamic table UPI QR code?
                </div>
                <div className={styles.faqAnswer}>
                  A static counter UPI QR code only encodes the merchant UPI ID (VPA). The customer must type the bill amount into their payment app,
                  and the cashier must cross-check payments by hand during busy dinner rushes. A dynamic table UPI QR code encodes the exact bill amount
                  and a table or order reference, so the guest pays in one tap and staff can match the payment to the right table. Where your payment
                  provider sends payment confirmations, your system can mark the table paid automatically.
                </div>
              </div>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Do diners need to download an app or pass login gates to view the menu?
                </div>
                <div className={styles.faqAnswer}>
                  No. KNOMI opens as a web page in the phone&rsquo;s browser: guests point the camera at the table QR and the menu opens, with no app to install
                  and no login to browse. A phone number is asked for only when the guest confirms an order. Asking diners to install an app or pass an SMS OTP
                  gate before they can even see the menu adds friction at exactly the wrong moment.
                </div>
              </div>

              <div className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Can I keep my existing POS billing software while using KNOMI QR ordering?
                </div>
                <div className={styles.faqAnswer}>
                  Yes. KNOMI works alongside the POS you already use, so your cashier workflow stays the same. Orders reach your kitchen display
                  (and can print as KOTs on a kitchen thermal printer), and KNOMI can send table orders straight into your existing POS (Petpooja today).
                </div>
              </div>
            </div>

            {/* Related Reading Links */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border-default)' }}>
              <h3>Related Operational &amp; Financial Guides</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/why-pdf-qr-menus-fail-restaurants">The Heavy PDF Menu Problem: Why Diners Hate QR Codes in India</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/compare/petpooja-alternatives">Top 5 Petpooja Alternatives for Modern Indian Restaurants (2026 Comparison)</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/compare/dotpe-vs-knomi">DotPe vs KNOMI: Honest Comparison for Indian Restaurant Operators</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/self-ordering-roi">Restaurant Self-Ordering ROI: Labor Savings &amp; Upsell Economics</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/gst-on-restaurant-food-rules-explained">GST on Restaurant Food in India: 5% vs 18% &amp; Liquor VAT Explained</Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  &rarr; <Link href="/guides/best-restaurant-billing-software-india">Best Restaurant Billing Software in India: 6 POS Systems Compared</Link>
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
