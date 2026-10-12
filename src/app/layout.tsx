import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
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

const description =
  "KNOMI turns the QR on your table into an illustrated menu with a warm host inside it. Guests order without an app or login, Knomi Host suggests the perfect pairing, and it all works alongside your existing POS. 0% commission.";

export const metadata: Metadata = {
  title: "KNOMI | The menu that knows your guests",
  description,
  keywords: [
    "QR menu for restaurants",
    "digital menu India",
    "restaurant upselling",
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
    title: "KNOMI | The menu that knows your guests",
    description:
      "An illustrated QR menu with a warm host inside it. No app, no login, 0% commission, and it works alongside your POS.",
    url: "https://www.knomi.in",
    siteName: "KNOMI",
    images: [OG_IMAGE],
    locale: "en_IN",
    type: "website",
  },
  // Title and description fall back to each page's own openGraph values.
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
      description: "Guest experience infrastructure for restaurants: an intelligent, illustrated QR menu with an in-menu host.",
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
        highPrice: "600",
        description: "Per table, per month. 0% commission on orders.",
      },
      creator: { "@type": "Organization", name: "KNOMI", url: "https://www.knomi.in" },
      featureList: [
        "Illustrated QR menu themed to each restaurant",
        "No app download or login for guests",
        "Knomi Host in-menu recommendations",
        "Guest self-ordering with phone confirmation",
        "Kitchen display system",
        "Works alongside the restaurant's existing POS",
        "Google review prompt",
        "Knomi Sense menu intelligence (Ecosystem plan)",
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
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${rupeeSerif.variable} ${rupeeSans.variable}`} suppressHydrationWarning>
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
