import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Caveat, Instrument_Sans, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { OG_IMAGE } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-instrument-sans",
});

/* Knomi Host's handwriting, as in the menu's speech bubbles. */
const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-instrument-hand",
});

/* Neither Instrument face has a ₹ glyph. These ₹-only subsets (Noto Serif, Inter; OFL)
   sit first in the font stacks and, thanks to unicode-range, are used for nothing else. */
const rupeeSerif = localFont({
  src: "../fonts/noto-serif-rupee.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-rupee-serif",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

const rupeeSans = localFont({
  src: "../fonts/inter-rupee.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-rupee-sans",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

const title = "KNOMI | Every guest known. Every table grown.";

const description =
  "KNOMI is guest experience infrastructure that helps restaurants grow. Knomi Sense remembers every guest, Knomi Host suggests the right dish at the right moment at every table, and your average bill rises. No app, no login, works alongside your POS, 0% commission.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "guest experience infrastructure",
    "restaurant upselling",
    "restaurant upselling software",
    "QR menu for restaurants",
    "digital menu India",
    "guest experience platform",
    "QR ordering system restaurants",
    "self ordering system India",
    "restaurant kitchen display",
    "menu for cafes",
    "Petpooja alternative",
  ],
  authors: [{ name: "KNOMI" }],
  creator: "KNOMI",
  metadataBase: new URL("https://www.knomi.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description:
      "Guest experience infrastructure that helps restaurants grow, upsell and look after every guest. A warm host at every table, powered by Knomi Sense. No app, no login, 0% commission.",
    url: "https://www.knomi.in",
    siteName: "KNOMI",
    images: [OG_IMAGE],
    locale: "en_IN",
    type: "website",
  },
  // Title and description fall back to each page's own openGraph values (here, the
  // homepage's above). Setting them here would make every page inherit the homepage's.
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru, Karnataka, India",
    "geo.position": "12.9716;77.5946",
    ICBM: "12.9716, 77.5946",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4eee5",
  colorScheme: "light",
};

/* JSON-LD structured data for search and AI answer engines. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "KNOMI",
      legalName: "KNOMI",
      url: "https://www.knomi.in",
      logo: "https://www.knomi.in/logo.png",
      slogan: "Know me. Remember me. Grow with me.",
      description:
        "Guest experience infrastructure for restaurants. KNOMI helps restaurants grow, upsell and look after every guest: Knomi Sense remembers every guest and connects Knomi Canvas, Host, Pulse, Dash and Compass.",
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      telephone: "+91 81237 28574",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 81237 28574",
          contactType: "sales",
          email: "sales@knomi.in",
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          telephone: "+91 81237 28574",
          contactType: "customer support",
          email: "support@knomi.in",
          areaServed: "IN",
        },
      ],
      sameAs: ["https://www.linkedin.com/company/ra-knomi/", "https://www.wikidata.org/wiki/Q141277639"],
      founder: [
        { "@type": "Person", name: "Yash Garg", jobTitle: "Co-Founder" },
        { "@type": "Person", name: "Madhvan Sharma", jobTitle: "Co-Founder" },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "KNOMI",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Restaurant guest experience software",
      operatingSystem: "Web-based",
      description,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "149",
        highPrice: "500",
        description: "Per table, per month. 0% commission on orders.",
      },
      creator: { "@type": "Organization", name: "KNOMI", url: "https://www.knomi.in" },
      featureList: [
        "Knomi Sense: guest experience infrastructure that remembers every guest and connects every part of KNOMI",
        "Knomi Canvas: an illustrated menu themed to each restaurant, with no app download or login for guests",
        "Knomi Host: an in-menu host who greets guests, suggests pairings and remembers preferences",
        "Upselling at the right moment: pairings, desserts and second rounds",
        "Guest self-ordering with phone confirmation",
        "Knomi Pulse: an end-of-meal check-in that alerts the manager",
        "Knomi Dash: live orders, tables and kitchen display",
        "Knomi Compass: insights on which dishes guests view, linger on and skip",
        "Orders flow into the restaurant's existing POS (Petpooja integration)",
        "0% commission",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-B7Q0FDXQ17";

  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${hand.variable} ${rupeeSerif.variable} ${rupeeSans.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {gaId && (
          <>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>
          {children}
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
