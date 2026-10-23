import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { OG_IMAGE, bookHref } from "@/content/site";
import styles from "./Solutions.module.css";

const title = "KNOMI by City | Restaurant Ordering in Bengaluru, Mumbai, Delhi NCR and more";
const description =
  "How KNOMI helps restaurants grow and upsell in six Indian cities: Bengaluru, Mumbai, Hyderabad, Delhi NCR, Chennai and Pune. A warm host at every table, an illustrated menu and Knomi Sense behind them.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions" },
  openGraph: {
    images: [OG_IMAGE],
    title,
    description,
    url: "https://www.knomi.in/solutions",
    siteName: "KNOMI",
    type: "website",
    locale: "en_IN",
  },
};

// copy: city hub
const CITIES = [
  { name: "Bengaluru", href: "/solutions/bangalore-restaurant-self-ordering", line: "Taprooms, specialty cafés and busy tech-lunch dining rooms." },
  { name: "Mumbai", href: "/solutions/mumbai-restaurant-self-ordering", line: "Compact bistros, lounges and bars where every seat has to earn its keep." },
  { name: "Hyderabad", href: "/solutions/hyderabad-restaurant-self-ordering", line: "Biryani houses and restobars built for big groups ordering at once." },
  { name: "Delhi NCR", href: "/solutions/delhi-ncr-restaurant-self-ordering", line: "Gurgaon craft breweries and Connaught Place bistros." },
  { name: "Chennai", href: "/solutions/chennai-restaurant-self-ordering", line: "Tiffin rooms, OMR corporate restaurants and Anna Nagar restobars." },
  { name: "Pune", href: "/solutions/pune-restaurant-self-ordering", line: "Microbreweries, Koregaon Park garden bistros and FC Road cafés." },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knomi.in" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knomi.in/solutions" },
  ],
};

export default function SolutionsHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className={styles.page}>
        <div className="wrap">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Solutions</span>
          </nav>

          <header className={styles.head}>
            <Reveal immediate delay={0.05} y={12}>
              <p className="eyebrow">KNOMI by city</p>
            </Reveal>
            <RevealTitle
              as="h1"
              immediate
              delay={0.12}
              lead="One host, shaped for"
              accent="every city’s tables."
              breakBeforeAccent
              className={`h1 ${styles.title}`}
            />
            <Reveal immediate fade={false} delay={0.35} y={16}>
              <p className="lead">
                Every city eats differently. These guides show how KNOMI, a warm host at every table with Knomi Sense
                behind it, fits the rooms, rushes and rituals of six Indian food cities.
              </p>
            </Reveal>
          </header>

          <Stagger as="ul" className={styles.list}>
            {CITIES.map((city) => (
              <StaggerItem as="li" key={city.href}>
                <Link href={city.href} className={`pressable ${styles.row}`}>
                  <span className={styles.name}>{city.name}</span>
                  <span className={styles.line}>{city.line}</span>
                  <ArrowRight className={styles.arrow} />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <p className={styles.cta}>
            Not in one of these cities? KNOMI works wherever your tables are.{" "}
            <a href={bookHref} className="link">
              Book a walkthrough
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
