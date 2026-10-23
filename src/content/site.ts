/**
 * Single source of copy for the marketing site.
 *
 * Business facts here (claims, positioning) must match the live
 * "KNOMI Brain — Source of Truth & Decision Log" (Drive > KNOMI HQ):
 * What we can and can't claim, and the Decision Log (read 13 Oct 2026).
 * Describe what the product does; never quote results, customer counts or
 * testimonials we don't have. The +25% lift is always a target.
 * Until Yash fixes the review routing (Brain, Open decisions), the Google review
 * prompt is not mentioned anywhere on the site.
 *
 * Pricing (decided 16 Oct 2026): KNOMI's prices are shared only on the walkthrough
 * call. No KNOMI price, plan name, per-table fee or fee structure appears anywhere on
 * the site. "0% commission" stays: it is how the business works, not a price.
 *
 * Say each idea once (design review, 22 Oct 2026): "every table" and "best server" are
 * rationed to the hero, Problem, Sense, the Manifesto and Audience. Check before adding
 * either phrase anywhere else.
 */

/** The Brain's approved +25% sentence. Use it verbatim, at most once per page. */
export const GOAL =
  "We expect to lift your average order by about 25%, and in the trial we’ll show you the numbers from your own tables.";

const WHATSAPP_NUMBER = "918123728574";

/** A wa.me link that opens a chat with KNOMI with `message` already typed in. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const contact = {
  phoneDisplay: "+91 81237 28574",
  phoneHref: "tel:+918123728574",
  whatsappHref: whatsappLink("Hi, I’d like to see KNOMI for my restaurant."),
  salesEmail: "sales@knomi.in",
  supportEmail: "support@knomi.in",
  linkedin: "https://www.linkedin.com/company/ra-knomi/",
  city: "Bengaluru, India",
};

/** Booking anchor. A plain <a> (not next/link) so Lenis can glide to it on the
 *  homepage; from other pages it loads the homepage at the form. */
export const bookHref = "/#book";

/** The homepage's "What it's worth" calculator, linked the same way from other pages, where
 *  an owner can try a lift on their own numbers. */
export const worthHref = "/#worth";

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
  { label: "What it’s worth", href: "/#worth" },
  { label: "Journal", href: "/guides" },
];

/** Navbar buttons. On phones the bar shows `bookShort` once the visitor is past the hero.
 *  The section list opens from `sections`, not "Menu", which is confusing on a site about menus. */
export const navLabels = {
  book: "Book a walkthrough",
  bookShort: "Book",
  sections: "Sections",
  close: "Close",
};

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

/**
 * The copy every section header shares (SectionHead and the headers built like it).
 * - `eyebrow`: at most one small label above the headline. Left out where the headline says enough.
 * - `titleAccent`: the italic russet second line. Only three headlines keep one: the hero, the
 *   Host chapter and Worth (Audience keeps its own, unchanged). Everywhere else the whole
 *   headline is `titleLead`, set in plain ink.
 * Headings carry no numeral; chapter order lives in the label and in `chapters`.
 */
export type SectionCopy = {
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  lead?: string;
};

/** Types a section's copy so its header fields read as optional, keeping every other field as written. */
const sectionCopy = <T extends SectionCopy>(copy: T): T & SectionCopy => copy;

export const hero = {
  // Two lines; the second renders in the italic accent.
  titleLead: "Every guest known.",
  titleAccent: "Every table grown.",
  lead:
    "An illustrated QR menu with a chef, Knomi Host, who suggests the right dish at the right moment. Guests feel looked after, and your average bill rises.",
  primaryCta: { label: "Book a walkthrough", href: "#book" },
  secondaryCta: { label: "See how it works", href: "#sense" },
  proof: ["No app. No login.", "Works alongside your POS", "0% commission"],
  hostBubble: {
    name: "Knomi Host",
    line: "Garlic bread is lovely with this. Shall I add one?",
    add: "Add · ₹120",
  },
};

/** The owner's problem, before the fix (problem → agitate → solve). */
export const problem = sectionCopy({
  titleLead: "Your best server can’t be everywhere.",
  lead: "On a full night, the small moments that grow a bill and bring guests back slip past unnoticed.",
  pains: [
    { title: "The upsell nobody makes", body: "Busy staff take orders. They rarely have time to suggest the pairing, the second round or the dessert." },
    { title: "Regulars treated like strangers", body: "When a good server leaves, everything they knew about your guests leaves with them." },
    { title: "Bad nights you never hear about", body: "Unhappy guests rarely complain at the table. You find out later, or never." },
    { title: "Decisions on gut feel", body: "Your POS shows what sold. It can’t show what guests looked at, wanted and skipped." },
  ],
  // The answer to the headline, set large before the dark Knomi Sense section.
  turn: "KNOMI can.",
});

/** Knomi Sense: the guest experience infrastructure at the centre of KNOMI. */
export const sense = sectionCopy({
  eyebrow: "Knomi Sense",
  titleLead: "One intelligence behind every table.",
  lead:
    "The guest experience infrastructure underneath KNOMI. It remembers every guest, learns from each visit and tells each part what to do next.",
  // The line on the plate under the instrument (the eyebrow above already names it).
  core: { line: "Remembers. Learns. Guides." },
  modules: [
    {
      id: "canvas",
      name: "Knomi Canvas",
      role: "The menu",
      body: "Your menu, illustrated and themed to your room, on every guest’s phone.",
      href: "#menu",
    },
    {
      id: "host",
      name: "Knomi Host",
      role: "The host",
      body: "The character inside your menu, who welcomes guests and suggests what to add.",
      href: "#host",
    },
    {
      id: "pulse",
      name: "Knomi Pulse",
      role: "The check-in",
      body: "Asks how the meal went before the bill, so anything that went wrong can be put right.",
      href: "#owners",
    },
    {
      id: "dash",
      name: "Knomi Dash",
      role: "The pass",
      body: "Live orders, tables and the kitchen display in one calm view.",
      href: "#owners",
    },
    {
      id: "compass",
      name: "Knomi Compass",
      role: "The insight",
      body: "Turns what guests look at and skip into what you should change next.",
      href: "#owners",
    },
  ],
  // Sentence case, under the module list.
  note: "Five parts, one shared memory of your guests.",
});

export const manifesto = {
  eyebrow: "Why KNOMI",
  // 24 words. "best server" and "suggest next" are the phrases Manifesto.tsx sets in italics.
  text:
    "Most menus forget you the moment you look up. Like your best server, KNOMI remembers what you love and knows what to suggest next.",
};

export const chapters = [
  { numeral: "I", title: "Know me", href: "#menu", line: "Knomi Canvas: your menu, illustrated." },
  { numeral: "II", title: "Remember me", href: "#host", line: "Knomi Host: the chef inside your menu." },
  { numeral: "III", title: "Grow with me", href: "#upsell", line: "Upselling: bigger bills, happier tables." },
];

export const menuChapter = sectionCopy({
  eyebrow: "Chapter I · Know me",
  titleLead: "A menu as beautiful as your room.",
  lead:
    "Your guests already have their phones out. Knomi Canvas gives them something worth looking at, not a PDF of your price list.",
  // Numbered because the order matters: scan, browse, order.
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
        "Every dish gets its own stage, hand-illustrated and themed to your restaurant. Guests move through it like a story, not a spreadsheet.",
      image: "/images/menu-preview-dishpage.webp",
      alt: "KNOMI guest menu: a dish page showing a pizza with an illustrated host character and an add button",
    },
    {
      n: "03",
      title: "Order",
      body:
        "They add dishes, note preferences (no onion, extra spicy) and confirm with their phone number. The order goes straight to your kitchen display.",
      image: "/images/menu-preview-orderlist.jpg",
      alt: "KNOMI guest menu: the 'My Order' card with quantities, preferences and phone confirmation",
    },
  ],
});

/** Chapter II: Knomi Host as a character, not a chatbot. */
export const hostChapter = sectionCopy({
  eyebrow: "Chapter II · Remember me",
  titleLead: "Not a chatbot.",
  titleAccent: "A host.",
  lead:
    "Knomi Host is a character who lives inside your menu. He greets every guest, suggests what’s good, remembers what they like and thanks them on the way out.",
  dressed: {
    title: "Dressed for your restaurant",
    body: "An Italian chef for a trattoria, a barista for a café. Host is drawn to suit your menu’s theme, so he feels like part of your team.",
  },
});

/** Chapter III, part one: the upsell, told as one guest's meal. */
export const upsell = sectionCopy({
  eyebrow: "Chapter III · Grow with me",
  titleLead: "The upsell, done like hospitality.",
  lead:
    "Guests spend more when someone guides them well. Knomi Host does it at the moments that matter, and Knomi Sense decides what to offer, to whom and when.",
  /**
   * One guest's meal, in order. `bill` is the running total after the moment.
   * `add`: the dish Host suggests and the guest accepts; it lands on the order ticket.
   * `declined` (dessert only): the dish Host suggests and the guest turns down. It shows on
   * the ticket as a faded, struck-through line ("Tiramisu ₹380 · maybe next time") and is
   * never added to `bill`. Host offers once and never pushes.
   */
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
      add: { name: "Margherita", price: 480 },
      bill: 480,
      pose: "point",
    },
    {
      id: "pair",
      label: "Pair",
      line: "Guests love garlic bread with the Margherita. Add one?",
      body: "The pairing a great server would suggest, offered every time instead of forgotten.",
      add: { name: "Garlic bread", price: 120 },
      bill: 600,
      pose: "peek",
    },
    {
      id: "dessert",
      label: "Dessert",
      line: "Saved room for something sweet? The tiramisu is made in-house.",
      body: "Dessert, offered before the plates are cleared. If the guest says no, Host doesn’t push.",
      declined: { name: "Tiramisu", price: 380, note: "maybe next time" },
      bill: 600,
      pose: "sit",
    },
    {
      id: "goodbye",
      label: "Goodbye",
      line: "Thank you for dining with us. See you soon!",
      body: "Every guest is thanked, and Knomi Sense remembers what they loved for next time.",
      bill: 600,
      pose: "pay",
    },
  ],
  /** The bill before Host's pairing. ₹480 → ₹600 is exactly the +25% on the seal. */
  baseBill: 480,
  goal: GOAL,
  goalNote: "Illustrative example. +25% is our target, not a past result.",
});

/** Chapter III, part two: what the owner sees (the upsell journey opens Chapter III). */
export const ownersChapter = sectionCopy({
  eyebrow: "For owners",
  titleLead: "Everything behind the pass.",
  lead:
    "The guest sees a beautiful menu. You see the whole floor, in a dashboard built for a busy service, not a boardroom.",
  features: [
    {
      key: "kds",
      title: "Knomi Dash",
      body: "Live orders and the kitchen display in one calm view. Each ticket lands the moment a guest confirms, table by table.",
    },
    {
      key: "pos",
      title: "Orders flow into your POS",
      body: "Guest orders go through KNOMI straight into the POS you already use (Petpooja today). Billing stays exactly as it is.",
    },
    {
      key: "pulse",
      title: "Knomi Pulse: the check-in",
      body: "Before the bill, Pulse asks how the meal went. If something wasn’t right, your manager hears about it while the guest is still at the table.",
    },
    {
      key: "commission",
      title: "0% commission",
      body: "We take no cut of your orders. What your guests order is yours.",
    },
    {
      key: "updates",
      title: "Your menu, updated in seconds",
      body: "Change a price, mark a dish sold out or add tonight’s special, and guests see it straight away.",
    },
    {
      key: "sense",
      title: "Knomi Compass: what to change next",
      body: "Powered by Knomi Sense. See which dishes guests linger on but don’t order, so you know what to rename, re-photograph or re-price.",
    },
  ],
});

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
 * "What could it be worth?" — the upselling calculator that replaced the Pricing
 * section (16 Oct 2026). Plain arithmetic on the owner's own numbers, the same sum the
 * sales playbooks do on calls: orders a day × the share that add one suggested dish ×
 * that dish's price × days open. The defaults (130 · 20% · ₹120 · 30) give ₹93,600 a
 * month and ₹11,23,200 a year; 20% is the playbooks' "one in five".
 * Never a forecast, a guarantee or a KNOMI result, and never set against KNOMI's fee.
 * "Example only" always sits beside the figure.
 */
export const worth = {
  eyebrow: "Upselling, in rupees",
  titleLead: "What could it be",
  titleAccent: "worth?",
  lead:
    "At the right moment, Knomi Host suggests one more dish: the dessert, the second drink, the side. Put in your own numbers and see what it could add up to.",
  /** `step` is the slider's step; the number field takes any whole number from min to max.
   *  `sliderMax` (when lower than max) is where the slider stops; bigger numbers are typed.
   *  `srUnit` is read out with the label, since the ₹ and % beside the figure are visual only. */
  inputs: [
    {
      id: "orders",
      label: "Orders per day",
      hint: "A normal day, all services together.",
      prefix: "",
      suffix: "a day",
      min: 10,
      max: 1500,
      sliderMax: 600,
      step: 5,
      initial: 130,
      spoken: "{v} orders a day",
    },
    {
      id: "share",
      label: "Orders that add one suggested dish",
      hint: "Your best guess. One in five is 20%.",
      prefix: "",
      suffix: "%",
      srUnit: "percent",
      min: 1,
      max: 60,
      sliderMax: 60,
      step: 1,
      initial: 20,
      spoken: "{v} percent of orders",
    },
    {
      id: "price",
      label: "Average price of the added dish",
      hint: "A dessert, a second drink or a side.",
      prefix: "₹",
      suffix: "",
      srUnit: "in rupees",
      min: 20,
      max: 1500,
      sliderMax: 1500,
      step: 10,
      initial: 120,
      spoken: "₹{v}",
    },
    {
      id: "days",
      label: "Days open per month",
      hint: "Closed on Mondays? Try 26.",
      prefix: "",
      suffix: "days",
      min: 1,
      max: 31,
      sliderMax: 31,
      step: 1,
      initial: 30,
      spoken: "{v} days",
    },
  ],
  /** The itemised bill: the sum, line by line, so an owner can check every step. */
  bill: {
    title: "Your numbers",
    stamp: "Example only",
    dishes: "Extra dishes a day",
    working: "{orders} orders × {share}%",
    price: "Price of the dish",
    days: "Days open",
    month: "Extra revenue a month",
    year: "A year",
    about: "about",
    lakh: "lakh",
    crore: "crore",
    times: "times",
    equals: "equals",
    signoff: "One well-timed suggestion, every service.",
  },
  /** Knomi Host's line above the bill, hand-lettered. {n} is the live number, always
   *  tied to the visitor's own inputs so it never reads as a promise. */
  host: {
    one: "On your numbers, one more dish a day.",
    many: "On your numbers, {n} more dishes a day.",
    aboutOne: "On your numbers, about one more dish a day.",
    aboutMany: "On your numbers, about {n} more dishes a day.",
    every: "On your numbers, about one more dish every {n} days.",
    close: "I’ll do the suggesting!",
  },
  /** The slim running total that stays in view while the inputs are adjusted on phones. */
  readout: { label: "A month", stamp: "Example" },
  /** Read out (politely) once the visitor stops changing a number. */
  live: "Example only: {month} extra revenue a month, {year} a year.",
  disclaimer:
    "Example only, worked out from your numbers. It isn’t a forecast or a guarantee: the real figure depends on your menu, guests and prices, and once you’re live we measure it with you from your own POS. Figures are before KNOMI’s fee.",
  cta: {
    note: "We share pricing on the call, once we understand your restaurant. There’s 0% commission on every order.",
    // Brain: hint at the founding partner programme, never its terms.
    founding: "Founding partner terms for our first restaurants, explained on the call.",
  },
};

export const process = sectionCopy({
  titleLead: "From first call to first order.",
  // Numbered because the order matters.
  steps: [
    { n: "01", title: "A walkthrough", body: "A short call — or a visit — to understand your room, your menu and your service. It’s also where we share pricing." },
    { n: "02", title: "Your menu, illustrated", body: "We theme the menu to your restaurant, dish by dish, so it feels like it belongs on your tables." },
    { n: "03", title: "Live on your tables", body: "Live within 48 hours of a yes: QR codes on the tables, orders flowing to your kitchen and your POS. Your team learns it in about ten minutes." },
    { n: "04", title: "The numbers, together", body: "We sit down with you and look at what changed — on your own tables, with your own data." },
  ],
});

export const faqs = [
  {
    q: "Do guests need to download an app or log in?",
    a: "No. Guests scan the QR on the table and the menu opens in their phone’s browser. To place an order they confirm with their phone number — nothing to install, no account to create.",
  },
  {
    q: "Do I need to replace my POS?",
    a: "No. KNOMI works alongside the POS you already use (Petpooja today): guest orders flow straight into it, and billing stays as it is.",
  },
  {
    q: "How much does KNOMI cost?",
    a: "We share pricing on a short walkthrough call, once we understand your restaurant. We take 0% commission on your orders.",
  },
  {
    q: "What is Knomi Host?",
    a: "Knomi Host is a character who lives inside your menu, drawn to suit your restaurant. He greets guests, suggests pairings, remembers what they like and thanks them on the way out.",
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
    a: "Knomi Sense is the guest experience infrastructure underneath KNOMI. It remembers every guest, learns from each visit and tells Canvas, Host, Pulse, Dash and Compass what to do next.",
  },
  {
    q: "Is there a trial?",
    a: "We’re opening KNOMI to a small group of founding restaurants on special terms, including a trial on your own tables. Ask us about it on your walkthrough.",
  },
];

export const booking = sectionCopy({
  eyebrow: "Book a walkthrough",
  titleLead: "Let’s set a table for you.",
  lead: "Tell us about your restaurant and we’ll show you KNOMI on a menu like yours. You’ll talk to the founding team directly.",
  /** Shown in words under the field (never the browser's bubble), keyed by the form's field
   *  names; focus moves to the first field with a problem. `phoneInvalid` is for a number
   *  with fewer than 10 digits; `email` and `tables` apply only when something was typed. */
  errors: {
    name: "Please add your name.",
    restaurant: "Please add your restaurant’s name.",
    phone: "Please add a phone number we can reach you on.",
    phoneInvalid: "Please check the number. It should have at least 10 digits.",
    email: "Please check the email address. It should look like name@example.com.",
    city: "Please add your restaurant’s city.",
    tables: "Please enter a whole number, like 12.",
  },
  /** Email, tables and notes stay tucked behind this toggle until the visitor asks for them. */
  more: { show: "Add details (optional)", hide: "Hide details" },
  success: {
    title: "Thank you — your table is set.",
    body: "We’ll be in touch shortly to arrange your walkthrough.",
  },
  /** When sending fails: say so, and offer WhatsApp so a request never dead-ends. */
  error: {
    body: "We couldn’t send your request just now.",
    whatsapp: "Send it on WhatsApp instead",
    email: "or write to us at",
  },
  /**
   * The WhatsApp route, used when the form has no endpoint (NEXT_PUBLIC_FORMSPREE_URL is
   * missing or a placeholder) and offered when sending fails. Submitting opens a chat with
   * KNOMI (`whatsappLink`) with the details typed in; the visitor still presses send, so the
   * confirmation says so rather than claiming we've received it.
   * The message is `greeting`, then one "Label: value" line per filled-in field in the order
   * of `lines` (keys are the form's field names); empty fields are left out.
   */
  whatsapp: {
    submit: "Send on WhatsApp",
    note: "Opens WhatsApp with your details filled in. You just press send.",
    greeting: "Hi KNOMI, I’d like a walkthrough.",
    lines: {
      name: "Name",
      restaurant: "Restaurant",
      city: "City",
      phone: "Phone",
      email: "Email",
      tables: "Tables",
      message: "Notes",
    },
    sent: {
      title: "Almost there: press send in WhatsApp.",
      body: "Your details are waiting in a chat with us. Once you send it, we’ll reply to arrange your walkthrough.",
      retry: "WhatsApp didn’t open? Open it again",
    },
  },
});

export const footer = {
  statement: "Know me. Remember me. Grow with me.",
  blurb: "Guest experience infrastructure for restaurants. Made in Bengaluru.",
  product: [
    { label: "Knomi Sense", href: "/#sense" },
    { label: "Knomi Host", href: "/#host" },
    { label: "Upselling", href: "/#upsell" },
    { label: "For Owners", href: "/#owners" },
    { label: "What it’s worth", href: "/#worth" },
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
