# KNOMI Website

The marketing site for [knomi.in](https://www.knomi.in): KNOMI is guest experience infrastructure for restaurants. *Know me. Remember me. Grow with me.*

Next.js 16 (App Router, static export), React 19, TypeScript and CSS Modules, with framer-motion for animation and Lenis for smooth scrolling.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

`npm run lint` runs ESLint; `npx tsc --noEmit` type-checks.

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | All homepage copy, pricing, FAQ and contact details. Edit words here, not in components. |
| `src/app/globals.css` | The design system: colours, type scale, spacing, buttons and shared utilities. |
| `src/components/home/` | Homepage sections (Hero, the three chapters, Pricing, FAQ, Booking, …). |
| `src/components/ui/` | Shared pieces: reveals, section header, phone frame, wordmark, icons. |
| `src/app/guides`, `compare`, `solutions` | Long-form SEO pages and their calculators. |
| `public/images/` | Menu screenshots, logos and the café sketch. |

## Copy rules

Every claim on the site follows the **KNOMI Brain** (Drive › KNOMI HQ): no customer counts, results, testimonials or unsourced statistics until real data exists; the +25% average-order lift appears only as a target; pricing is ₹149 / ₹250 / ₹500–600 per table per month with 0% commission.

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_FORMSPREE_URL`: the booking form endpoint. Without it, the form shows an error on submit.
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 measurement ID.

## Deploy

Static export (`output: "export"`), set up for Vercel with clean URLs (`vercel.json`). Any static host that serves `about.html` at `/about` works too.
