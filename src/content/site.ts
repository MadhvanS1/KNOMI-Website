/**
 * Single source of copy for the marketing site.
 *
 * Business facts here (pricing, claims, positioning) must match the
 * "KNOMI Brain — Source of Truth & Decision Log" (Drive > KNOMI HQ).
 *   §2 Pricing · §3 Target customers · §4 Brand · §5 Claims
 * Rule of thumb from §5: describe what the product does; never quote results,
 * customer counts or testimonials we don't have. The +25% lift is a target.
 */

export const contact = {
  phoneDisplay: "+91 81237 28574",
  phoneHref: "tel:+918123728574",
  whatsappHref:
    "https://wa.me/918123728574?text=" +
    encodeURIComponent("Hi, I’d like to see KNOMI for my restaurant."),
  salesEmail: "sales@knomi.in",
  supportEmail: "support@knomi.in",
  linkedin: "https://www.linkedin.com/company/ra-knomi/",
  city: "Bengaluru, India",
};

/** Booking anchor. A plain <a> (not next/link) so Lenis can glide to it on the
 *  homepage; from other pages it loads the homepage at the form. */
export const bookHref = "/#book";

/** Social share card. Pages that set their own `openGraph` must include it,
 *  because Next replaces (rather than merges) the parent's openGraph object. */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "KNOMI: the menu that knows your guests",
};

export const tagline = ["Know me.", "Remember me.", "Grow with me."] as const;

export const nav = [
  { label: "The Menu", href: "/#menu" },
  { label: "Knomi Host", href: "/#host" },
  { label: "For Owners", href: "/#owners" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Journal", href: "/guides" },
];

export const hero = {
  eyebrow: "Guest experience infrastructure for restaurants",
  // Rendered with the last two words in italic accent.
  titleLead: "The menu that",
  titleAccent: "knows your guests.",
  lead:
    "KNOMI turns the QR on your table into a beautifully illustrated menu with a warm host inside it — guiding every guest to the dish they’ll love, and the one they didn’t know they wanted.",
  primaryCta: { label: "Book a walkthrough", href: "#book" },
  secondaryCta: { label: "See the menu", href: "#menu" },
  proof: ["No app. No login.", "Works alongside your POS", "0% commission"],
  hostBubble: {
    name: "Knomi Host",
    line: "Garlic bread is lovely with this. Shall I add one?",
    add: "Add · ₹120",
  },
};

export const ribbon = [
  "No app download",
  "No login",
  "0% commission",
  "Works alongside your POS",
  "Live kitchen display",
  "Google review prompt",
  "Themed to your room",
];

export const manifesto = {
  eyebrow: "Why KNOMI",
  text:
    "Great restaurants are remembered for how they made you feel. Most menus forget you the moment you look up. KNOMI is a menu that behaves like your best server — it knows what’s good, remembers what you like, and always knows what to suggest next.",
};

export const chapters = [
  { numeral: "I", title: "Know me", href: "#menu", line: "A menu as beautiful as your room." },
  { numeral: "II", title: "Remember me", href: "#host", line: "A host at every table, all night." },
  { numeral: "III", title: "Grow with me", href: "#owners", line: "Everything behind the pass." },
];

export const menuChapter = {
  numeral: "I",
  eyebrow: "Chapter I — Know me",
  titleLead: "A menu as beautiful as",
  titleAccent: "your room.",
  lead:
    "Your guests already have their phones out. KNOMI gives them something worth looking at — a menu that feels like part of your interior, not a PDF of your price list.",
  steps: [
    {
      n: "01",
      title: "Scan",
      body:
        "Guests scan the QR on the table and the menu opens in their browser. No app to download, no login, no waiting to catch a waiter’s eye.",
      image: "/images/menu-preview-dishnav.jpg",
      alt: "KNOMI guest menu: an illustrated 'Explore our menu' screen with a pizza and a hand-drawn street scene",
    },
    {
      n: "02",
      title: "Browse",
      body:
        "Every dish gets its own stage — hand-illustrated and themed to your restaurant. Guests move through it like a story, not a spreadsheet.",
      image: "/images/menu-preview-dishpage.webp",
      alt: "KNOMI guest menu: a dish page showing a pizza with an illustrated host character and an add button",
    },
    {
      n: "03",
      title: "Order",
      body:
        "They add dishes, note preferences — no onion, extra spicy — and confirm with their phone number. The order goes straight to your kitchen display.",
      image: "/images/menu-preview-orderlist.jpg",
      alt: "KNOMI guest menu: the 'My Order' card with quantities, preferences and phone confirmation",
    },
  ],
};

export const hostChapter = {
  numeral: "II",
  eyebrow: "Chapter II — Remember me",
  titleLead: "Meet",
  titleAccent: "Knomi Host.",
  lead:
    "A warm voice inside your menu. It suggests the pairing, remembers what a guest likes, and offers dessert at exactly the right moment — the way your best server would, at every table, all night.",
  behaviours: [
    {
      title: "Suggests the pairing",
      body: "Garlic bread with the pizza, a cold coffee with the brownie. Gentle, well-timed, never pushy.",
    },
    {
      title: "Remembers preferences",
      body: "No onion, extra spicy, less sugar. Guests say it once and the menu keeps it in mind.",
    },
    {
      title: "Asks at the right moment",
      body: "Near the end of the meal, it invites guests to leave a Google review before they go.",
    },
  ],
  demo: {
    label: "The upsell moment",
    item: { name: "Margherita", price: 200 },
    suggestion: { name: "Garlic bread", price: 50 },
    bubble: "Guests love garlic bread with the Margherita. Add one?",
    accept: "Add it",
    replay: "Replay",
  },
  // Brain §5 approved wording. Keep verbatim.
  goal:
    "Our goal is to lift your average order by around 25%. In the trial we measure it on your own tables, and you see the numbers.",
  goalNote: "Illustrative example. +25% is our target, not a past result.",
};

export const ownersChapter = {
  numeral: "III",
  eyebrow: "Chapter III — Grow with me",
  titleLead: "Everything",
  titleAccent: "behind the pass.",
  lead:
    "The guest sees a beautiful menu. You see what’s happening at every table — in a dashboard built for a busy service, not a boardroom.",
  features: [
    {
      key: "kds",
      title: "Live orders & kitchen display",
      body: "Orders land on the kitchen display the moment a guest confirms. Every ticket, every table, in order.",
      tag: "From Signature",
    },
    {
      key: "pos",
      title: "Works alongside your POS",
      body: "KNOMI sits next to the POS you already use. Nothing to rip out, no new billing habits for your team.",
    },
    {
      key: "reviews",
      title: "Google reviews, gently",
      body: "Guests are invited to review you on Google while the meal is still fresh in their mind.",
    },
    {
      key: "commission",
      title: "0% commission",
      body: "A flat monthly fee per table. What your guests order is yours.",
    },
    {
      key: "updates",
      title: "Your menu, updated in seconds",
      body: "Change a price, mark a dish sold out or add tonight’s special — every table sees it straight away.",
    },
    {
      key: "sense",
      title: "Knomi Sense",
      body: "See which dishes guests linger on but don’t order, so you know what to rename, re-photograph or re-price.",
      tag: "Ecosystem plan",
    },
  ],
};

export const audience = {
  eyebrow: "Who it’s for",
  titleLead: "For rooms worth",
  titleAccent: "lingering in.",
  lead:
    "KNOMI is made for design-led spaces where guests sit, browse and stay a while. If your room has a sense of place, your menu should too.",
  segments: [
    { title: "Owner-led restaurants", body: "Single outlets and small groups where the owner still walks the floor." },
    { title: "Cafés with character", body: "Owner-run or chain — anywhere the ambience is part of the order." },
    { title: "Franchise cafés & restaurants", body: "One standard menu experience across every outlet." },
    { title: "Restaurant chains", body: "Consistent hospitality at every table, in every city." },
  ],
};

/** Brain §2. Per table, per month. Default selling plan is "Signature". */
export const pricing = {
  eyebrow: "Pricing",
  titleLead: "A simple",
  titleAccent: "prix fixe.",
  lead: "One flat price per table, per month. 0% commission on every order.",
  unit: "per table / month",
  plans: [
    {
      id: "menu",
      name: "Menu",
      course: "I",
      priceMin: 149,
      priceMax: 149,
      summary: "Your illustrated digital menu, with a gentle nudge to Google reviews.",
      includes: ["Illustrated menu themed to your restaurant", "No app, no login for guests", "Google review prompt"],
      excludes: ["Self-ordering", "POS integration", "Knomi Sense"],
    },
    {
      id: "signature",
      name: "Signature",
      course: "II",
      priceMin: 250,
      priceMax: 250,
      recommended: true,
      badge: "House recommendation",
      summary: "The full guest experience, connected to the POS you already use.",
      includes: [
        "Everything in Menu",
        "Knomi Host recommendations",
        "Guest self-ordering",
        "Kitchen display",
        "Integration with your existing POS",
        "Live orders dashboard",
      ],
      excludes: ["Knomi Sense"],
    },
    {
      id: "ecosystem",
      name: "Ecosystem",
      course: "III",
      priceMin: 500,
      priceMax: 600,
      summary: "The whole KNOMI ecosystem, including Knomi Sense menu intelligence.",
      includes: ["Everything in Signature", "Knomi Sense", "The complete KNOMI ecosystem"],
      excludes: [],
    },
  ],
  calculator: {
    label: "How many tables do you have?",
    min: 4,
    max: 60,
    initial: 14,
  },
  footnote: "Prices are per table, per month. We’ll confirm the right plan for your floor on a walkthrough.",
};

export const process = {
  eyebrow: "How we begin",
  titleLead: "From first call to",
  titleAccent: "first order.",
  steps: [
    { n: "01", title: "A walkthrough", body: "A short call — or a visit — to understand your room, your menu and your service." },
    { n: "02", title: "Your menu, illustrated", body: "We theme the menu to your restaurant, dish by dish, so it feels like it belongs on your tables." },
    { n: "03", title: "Live on your tables", body: "QR codes on the tables, orders on your kitchen display, and KNOMI running alongside your POS." },
    { n: "04", title: "The numbers, together", body: "We sit down with you and look at what changed — on your own tables, with your own data." },
  ],
};

export const faqs = [
  {
    q: "Do guests need to download an app or log in?",
    a: "No. Guests scan the QR on the table and the menu opens in their phone’s browser. To place an order they confirm with their phone number — nothing to install, no account to create.",
  },
  {
    q: "Do I need to replace my POS?",
    a: "No. KNOMI works alongside your existing POS. Orders reach your kitchen display, and on the Signature plan KNOMI integrates with the POS you already use.",
  },
  {
    q: "How much does KNOMI cost?",
    a: "We recommend Signature at ₹250 per table, per month — about ₹2,500 a month for a 10-table restaurant. There is also Menu at ₹149 per table and the full Ecosystem at ₹500–600 per table. We take 0% commission on orders.",
  },
  {
    q: "What is Knomi Host?",
    a: "Knomi Host is the friendly host inside your menu. It suggests pairings, remembers guest preferences and invites guests to leave a Google review — the things your best server does, at every table.",
  },
  {
    q: "How will I know if it’s working?",
    a: "Our goal is to lift your average order by around 25%. In the trial we measure it on your own tables, and you see the numbers.",
  },
  {
    q: "Will the menu match my restaurant’s look?",
    a: "Yes. Every KNOMI menu is themed to the restaurant — illustrations, colours and type — so it feels like part of your interior, not a generic template.",
  },
  {
    q: "What is Knomi Sense?",
    a: "Knomi Sense shows which dishes guests look at, linger on and leave — demand your POS never sees. It is part of the Ecosystem plan.",
  },
];

export const booking = {
  eyebrow: "Reservations",
  titleLead: "Let’s set a table",
  titleAccent: "for you.",
  lead: "Tell us about your restaurant and we’ll show you KNOMI on a menu like yours. You’ll talk to the founding team directly.",
  success: {
    title: "Thank you — your table is set.",
    body: "We’ll be in touch shortly to arrange your walkthrough.",
  },
};

export const footer = {
  statement: "Know me. Remember me. Grow with me.",
  blurb: "Guest experience infrastructure for restaurants. Made in Bengaluru.",
  product: [
    { label: "The Menu", href: "/#menu" },
    { label: "Knomi Host", href: "/#host" },
    { label: "For Owners", href: "/#owners" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "About", href: "/about" },
  ],
  compare: [
    { label: "KNOMI vs Petpooja vs DotPe", href: "/compare/knomi-vs-petpooja-vs-dotpe" },
    { label: "POS vs Behavioural", href: "/compare/pos-vs-behavioral-intelligence" },
    { label: "Petpooja Alternatives", href: "/compare/petpooja-alternatives" },
    { label: "DotPe vs KNOMI", href: "/compare/dotpe-vs-knomi" },
    { label: "Petpooja Pricing", href: "/compare/petpooja-pricing-breakdown" },
    { label: "DotPe Alternatives", href: "/compare/dotpe-alternatives" },
  ],
  guides: [
    { label: "QR Menu Setup India", href: "/guides/setup-qr-menu-india" },
    { label: "Upselling Techniques", href: "/guides/restaurant-upselling-techniques-guide" },
    { label: "Average Order Value", href: "/guides/increase-restaurant-average-order-value" },
    { label: "Menu Pricing", href: "/guides/how-to-price-restaurant-menu-india" },
    { label: "Profit Margin Benchmarks", href: "/guides/restaurant-profit-margin-benchmarks-india" },
  ],
  cities: [
    { label: "Bengaluru", href: "/solutions/bangalore-restaurant-self-ordering" },
    { label: "Mumbai", href: "/solutions/mumbai-restaurant-self-ordering" },
    { label: "Hyderabad", href: "/solutions/hyderabad-restaurant-self-ordering" },
    { label: "Pune", href: "/solutions/pune-restaurant-self-ordering" },
    { label: "Chennai", href: "/solutions/chennai-restaurant-self-ordering" },
    { label: "Delhi NCR", href: "/solutions/delhi-ncr-restaurant-self-ordering" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cancellation & Refunds", href: "/refund-policy" },
  ],
};
