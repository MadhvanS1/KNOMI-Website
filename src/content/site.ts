/**
 * Single source of copy for the marketing site.
 *
 * Business facts here (pricing, claims, positioning) must match the live
 * "KNOMI Brain — Source of Truth & Decision Log" (Drive > KNOMI HQ):
 * Pricing, What we can and can't claim, and the Decision Log (read 13 Oct 2026).
 * Describe what the product does; never quote results, customer counts or
 * testimonials we don't have. The +25% lift is always a target.
 * Until Yash fixes the review routing (Brain, Open decisions), the Google review
 * prompt is not mentioned anywhere on the site.
 */

/** The Brain's approved +25% sentence. Use it verbatim, at most once per page. */
export const GOAL =
  "We expect to lift your average order by about 25%, and in the trial we’ll show you the numbers from your own tables.";

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
  alt: "KNOMI: every guest known, every table grown",
};

export const tagline = ["Know me.", "Remember me.", "Grow with me."] as const;

export const nav = [
  { label: "Knomi Sense", href: "/#sense" },
  { label: "Knomi Host", href: "/#host" },
  { label: "Upselling", href: "/#upsell" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Journal", href: "/guides" },
];

/**
 * Knomi Host, the chef character from the KNOMI menu. Transparent cut-outs of his real
 * poses live in public/images/host/ (cut from the product's own screens).
 * "sit" has no clean cut-out yet (the chair overlaps him), so it shows the peeking pose.
 */
export type HostPose = "greet" | "lean" | "point" | "peek" | "pay" | "sit" | "think";
export const hostArt: Record<HostPose, string | null> = {
  greet: "/images/host/think.webp", // chin on hand, smiling: his warmest portrait
  lean: "/images/host/lean.webp", // leaning on the dish, dreamy
  point: "/images/host/point.webp", // hugging the add button
  peek: "/images/host/peek.webp", // peeking over a heading
  pay: "/images/host/pay.webp", // presenting the bill, rupee pouch beside him
  sit: "/images/host/peek.webp", // stand-in until a clean sitting pose exists
  think: "/images/host/think.webp",
};

/** Host at work: real KNOMI menu screens, each with one of his moments. */
export const hostScreens = [
  { id: "greet", verb: "Greets every guest", line: "Hey there! Craving something specific today?", src: "/images/host/screens/greet.webp", alt: "KNOMI menu: Knomi Host, a cheerful chef, leans on a plate of spaghetti and offers choices: something spicy, veg options or the chef’s special" },
  { id: "suggest", verb: "Suggests the dish", line: "Add this to your order? It’s a crowd favourite!", src: "/images/host/screens/suggest.webp", alt: "KNOMI menu: Knomi Host hugs the add button and suggests adding the spaghetti, a crowd favourite" },
  { id: "guide", verb: "Guides the way", line: "Explore more delicious pasta here!", src: "/images/host/screens/guide.webp", alt: "KNOMI menu: Knomi Host sits on the pasta category button and points guests to more dishes" },
  { id: "story", verb: "Tells the story", line: "A classic straight from Italy!", src: "/images/host/screens/story.webp", alt: "KNOMI menu: Knomi Host peeks over the dish name and tells guests where it comes from" },
  { id: "history", verb: "Keeps the order", line: "Here’s your order history!", src: "/images/host/screens/history.webp", alt: "KNOMI menu: Knomi Host rests his chin on his hand above the guest’s order history" },
  { id: "bill", verb: "Brings the bill", line: "How would you like to pay?", src: "/images/host/screens/bill.webp", alt: "KNOMI menu: Knomi Host presents the itemised bill with a rupee pouch beside him" },
];

export const hero = {
  eyebrow: "Guest experience infrastructure for restaurants",
  // Two lines; the second renders in the italic accent.
  titleLead: "Every guest known.",
  titleAccent: "Every table grown.",
  lead:
    "KNOMI helps restaurants grow. It remembers every guest, puts a warm host at every table and suggests the right dish at the right moment — so guests feel looked after, and your average bill rises.",
  primaryCta: { label: "Book a walkthrough", href: "#book" },
  secondaryCta: { label: "See how it works", href: "#sense" },
  proof: ["No app. No login.", "Works alongside your POS", "0% commission"],
  hostBubble: {
    name: "Knomi Host",
    line: "Garlic bread is lovely with this. Shall I add one?",
    add: "Add · ₹120",
  },
};

export const ribbon = [
  "Grow every bill",
  "A host at every table",
  "No app, no login",
  "0% commission",
  "Orders flow into your POS",
  "Themed to your room",
  "Powered by Knomi Sense",
];

/** The owner's problem, before the fix (problem → agitate → solve). */
export const problem = {
  eyebrow: "The problem",
  titleLead: "Your best server can’t be at",
  titleAccent: "every table.",
  lead:
    "On a full night, the moments that grow a bill slip past. Nobody offers the starter, the pairing or the dessert. Regulars are treated like strangers. And a guest who had a bad evening leaves without a word.",
  pains: [
    { title: "The upsell nobody makes", body: "Busy staff take orders. They rarely have time to suggest the pairing, the second round or the dessert." },
    { title: "Regulars treated like strangers", body: "When a good server leaves, everything they knew about your guests leaves with them." },
    { title: "Bad nights you never hear about", body: "Unhappy guests rarely complain at the table. You find out later, or never." },
    { title: "Decisions on gut feel", body: "Your POS shows what sold. It can’t show what guests looked at, wanted and skipped." },
  ],
  turn: "KNOMI puts your best server’s instincts at every table.",
};

/**
 * Knomi Sense: the guest experience infrastructure at the centre of KNOMI.
 * Plans (Brain): Signature includes a limited part of Sense; Ecosystem has all of it.
 */
export const sense = {
  eyebrow: "Knomi Sense",
  titleLead: "One intelligence behind",
  titleAccent: "every table.",
  lead:
    "Knomi Sense is the guest experience infrastructure underneath KNOMI. It remembers every guest, learns from every table and tells every part of KNOMI what to do next: what the menu shows, what Host suggests, who needs attention, and what you should change.",
  core: { name: "Knomi Sense", line: "Remembers. Learns. Guides." },
  modules: [
    {
      id: "canvas",
      name: "Knomi Canvas",
      role: "The menu",
      body: "Your menu, illustrated and themed to your room, on every guest’s phone. No app, no login.",
      href: "#menu",
    },
    {
      id: "host",
      name: "Knomi Host",
      role: "The host",
      body: "A warm character inside the menu who greets every guest, suggests the right pairing and remembers what they like.",
      href: "#host",
    },
    {
      id: "pulse",
      name: "Knomi Pulse",
      role: "The check-in",
      body: "Asks how the meal went before the bill, and alerts your manager while there’s still time to make it right.",
      href: "#owners",
    },
    {
      id: "dash",
      name: "Knomi Dash",
      role: "The pass",
      body: "Live orders, tables and the kitchen display in one calm view, built for a busy service.",
      href: "#owners",
    },
    {
      id: "compass",
      name: "Knomi Compass",
      role: "The insight",
      body: "Shows which dishes guests look at, linger on and skip, so you know what to rename, re-price or re-photograph.",
      href: "#owners",
    },
  ],
  planNote: "Signature includes the essentials of Knomi Sense. Ecosystem unlocks all of it.",
};

export const manifesto = {
  eyebrow: "Why KNOMI",
  text:
    "Great restaurants are remembered for how they made you feel. Most menus forget you the moment you look up. KNOMI is a menu that behaves like your best server — it knows what’s good, remembers what you like, and always knows what to suggest next.",
};

export const chapters = [
  { numeral: "I", title: "Know me", href: "#menu", line: "A menu as beautiful as your room." },
  { numeral: "II", title: "Remember me", href: "#host", line: "A host who remembers every guest." },
  { numeral: "III", title: "Grow with me", href: "#upsell", line: "Bigger bills, happier tables." },
];

export const menuChapter = {
  numeral: "I",
  eyebrow: "Chapter I — Know me · Knomi Canvas",
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

/** Chapter II: Knomi Host as a character, not a chatbot. */
export const hostChapter = {
  numeral: "II",
  eyebrow: "Chapter II — Remember me · Knomi Host",
  titleLead: "Not a chatbot.",
  titleAccent: "A host.",
  lead:
    "Knomi Host is a character who lives inside your menu, drawn to match your restaurant. He greets every guest, suggests what’s good, remembers what they like and thanks them on the way out. Your best server’s instincts, at every table, all night.",
  // His real lines from the KNOMI menu.
  persona: [
    { verb: "Greets", line: "Hey there! Craving something specific today?", chips: ["Something spicy", "Veg options", "Chef’s special"], pose: "lean" },
    { verb: "Suggests", line: "Add this to your order? It’s a crowd favourite!", pose: "point" },
    { verb: "Guides", line: "Explore more delicious pasta here!", pose: "sit" },
    { verb: "Remembers", line: "No onion again tonight? I’ve kept it in mind.", pose: "peek" },
    { verb: "Thanks", line: "Thank you for dining with us. See you soon!", pose: "pay" },
  ],
  dressed: {
    title: "Dressed for your restaurant",
    body: "An Italian chef for a trattoria, a barista for a café. Host is drawn to suit your menu’s theme, so he feels like part of your team.",
  },
  behaviours: [
    {
      title: "Suggests the pairing",
      body: "Garlic bread with the pizza, a cold coffee with the brownie. Gentle, well-timed, never pushy.",
    },
    {
      title: "Remembers preferences",
      body: "No onion, extra spicy, less sugar. Guests say it once and Knomi Sense keeps it in mind.",
    },
    {
      title: "Thanks every guest",
      body: "Every guest is thanked on the way out, and remembered for next time.",
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
  // Brain-approved wording. Keep verbatim.
  goal: GOAL,
  goalNote: "Illustrative example. +25% is our target, not a past result.",
};

/** Chapter III, part one: the upsell, told as one guest's meal. */
export const upsell = {
  numeral: "III",
  eyebrow: "Chapter III — Grow with me · Upselling",
  titleLead: "The upsell,",
  titleAccent: "done like hospitality.",
  lead:
    "Guests spend more when someone guides them well. Knomi Host does it at every table, at the moments that matter, and never pushes. Knomi Sense decides what to suggest, to whom, and when.",
  moments: [
    {
      id: "arrive",
      label: "Arrive",
      line: "Hey there! Craving something specific today?",
      chips: ["Something spicy", "Veg options", "Chef’s special"],
      body: "Guests who don’t know the menu get a starting point, so nobody settles for the safe choice.",
      bill: 0,
      pose: "lean",
    },
    {
      id: "choose",
      label: "Choose",
      line: "Add this to your order? It’s a crowd favourite!",
      body: "Host points guests to the dishes you want to sell: your specials and your best margins.",
      add: { name: "Margherita", price: 200 },
      bill: 200,
      pose: "point",
    },
    {
      id: "pair",
      label: "Pair",
      line: "Guests love garlic bread with the Margherita. Add one?",
      body: "The pairing a great server would suggest, offered every time instead of forgotten.",
      add: { name: "Garlic bread", price: 50 },
      bill: 250,
      pose: "peek",
    },
    {
      id: "dessert",
      label: "Dessert",
      line: "Saved room for something sweet? The tiramisu is made in-house.",
      body: "The dessert and the second round, offered at the right moment, not when the plates are cleared.",
      bill: 250,
      pose: "sit",
    },
    {
      id: "goodbye",
      label: "Goodbye",
      line: "Thank you for dining with us. See you soon!",
      body: "Every guest is thanked, and Knomi Sense remembers what they loved for next time.",
      bill: 250,
      pose: "pay",
    },
  ],
  baseBill: 200,
  goal: GOAL,
  goalNote: "Illustrative example. +25% is our target, not a past result.",
};

/** Chapter III, part two: what the owner sees. No chapter numeral (the upsell journey opens Chapter III). */
export const ownersChapter = {
  numeral: "",
  eyebrow: "For owners · Knomi Dash, Pulse & Compass",
  titleLead: "Everything",
  titleAccent: "behind the pass.",
  lead:
    "The guest sees a beautiful menu. You see what’s happening at every table, in a dashboard built for a busy service, not a boardroom.",
  features: [
    {
      key: "kds",
      title: "Knomi Dash: live orders & kitchen display",
      body: "Orders land on the kitchen display the moment a guest confirms. Every ticket, every table, in order.",
      tag: "From Signature",
    },
    {
      key: "pos",
      title: "Orders flow into your POS",
      body: "On Signature, guest orders go through KNOMI straight into the POS you already use (Petpooja today). Billing stays exactly as it is.",
    },
    {
      key: "reviews",
      title: "Knomi Pulse: the check-in",
      body: "Before the bill, Pulse asks how the meal went. If something wasn’t right, your manager hears about it while the guest is still at the table.",
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
      title: "Knomi Compass: what to change next",
      body: "Powered by Knomi Sense. See which dishes guests linger on but don’t order, so you know what to rename, re-photograph or re-price.",
      tag: "Full in Ecosystem",
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

/**
 * Brain, Pricing (13 Oct 2026). Per table, per month. Signature (₹250) is the plan we sell;
 * Menu (₹149) stays listed but isn't pushed; Ecosystem is one price, ₹500.
 */
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
      summary: "Your illustrated menu on every table.",
      includes: ["Knomi Canvas menu, themed to your restaurant", "No app, no login for guests", "Menu changes live in seconds"],
      excludes: ["Guest self-ordering", "Knomi Host", "POS integration", "Knomi Sense"],
    },
    {
      id: "signature",
      name: "Signature",
      course: "II",
      priceMin: 250,
      priceMax: 250,
      recommended: true,
      badge: "House recommendation",
      summary: "The full guest experience, flowing straight into the POS you already use.",
      includes: [
        "Knomi Canvas: your customised menu",
        "Knomi Host recommendations",
        "Knomi Pulse end-of-meal check-in",
        "Guest self-ordering",
        "Orders flow into your POS (Petpooja)",
        "Knomi Dash: live orders & kitchen display",
        "Knomi Sense essentials",
      ],
      excludes: ["Knomi POS", "Full Knomi Sense & Compass"],
    },
    {
      id: "ecosystem",
      name: "Ecosystem",
      course: "III",
      priceMin: 500,
      priceMax: 500,
      summary: "Everything KNOMI does, including our own POS and the full Knomi Sense.",
      includes: ["Everything in Signature", "Knomi’s own POS", "The full Knomi Sense", "Knomi Compass insights"],
      excludes: [],
    },
  ],
  calculator: {
    label: "How many tables do you have?",
    min: 4,
    max: 60,
    initial: 14,
  },
  // Brain: hint at the founding partner programme; terms are shared on the call.
  founding: {
    eyebrow: "Founding partners",
    title: "A few founding restaurants, on special terms.",
    body: "We’re opening KNOMI to a small group of founding restaurants first. Ask about the founding partner terms on your walkthrough.",
    cta: "Ask about founding terms",
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
    { n: "03", title: "Live on your tables", body: "Live within 48 hours of a yes: QR codes on the tables, orders flowing to your kitchen and your POS. Your team learns it in about ten minutes." },
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
    a: "No. KNOMI works alongside your existing POS. On Signature, guest orders go through KNOMI straight into the POS you already use (Petpooja today), so billing stays as it is.",
  },
  {
    q: "How much does KNOMI cost?",
    a: "We recommend Signature at ₹250 per table, per month — about ₹2,500 a month for a 10-table restaurant. Ecosystem, with Knomi’s own POS and the full Knomi Sense, is ₹500 per table. There is also a basic Menu plan at ₹149. We take 0% commission on orders.",
  },
  {
    q: "What is Knomi Host?",
    a: "Knomi Host is a character who lives inside your menu, drawn to suit your restaurant. He greets guests, suggests pairings, remembers what they like and thanks them on the way out — the things your best server does, at every table.",
  },
  {
    q: "How will I know if it’s working?",
    a: "We measure it with you, on your own tables. We compare your average bill with KNOMI against your numbers from before, straight from your own POS, and you see every figure.",
  },
  {
    q: "Will the menu match my restaurant’s look?",
    a: "Yes. Every KNOMI menu is themed to the restaurant — illustrations, colours and type — so it feels like part of your interior, not a generic template.",
  },
  {
    q: "What is Knomi Sense?",
    a: "Knomi Sense is the guest experience infrastructure underneath KNOMI. It remembers every guest and learns from every table, and it tells Canvas, Host, Pulse, Dash and Compass what to do next. Signature includes its essentials; Ecosystem includes all of it.",
  },
  {
    q: "Is there a trial?",
    a: "We’re opening KNOMI to a small group of founding restaurants on special terms, including a trial on your own tables. Ask us about it on your walkthrough.",
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
    { label: "Knomi Sense", href: "/#sense" },
    { label: "Knomi Host", href: "/#host" },
    { label: "Upselling", href: "/#upsell" },
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
