import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.knomi.in";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-11T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date("2026-10-11T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-11T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/petpooja-alternatives`,
      lastModified: new Date("2026-09-05T14:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/dotpe-vs-knomi`,
      lastModified: new Date("2026-09-05T15:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/dotpe-alternatives`,
      lastModified: new Date("2026-09-06T05:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/petpooja-pricing-breakdown`,
      lastModified: new Date("2026-09-06T04:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/petpooja-review-for-restaurants`,
      lastModified: new Date("2026-09-06T04:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/knomi-vs-petpooja-vs-dotpe`,
      lastModified: new Date("2026-09-06T15:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/pos-vs-behavioral-intelligence`,
      lastModified: new Date("2026-09-06T16:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-09-05T22:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/self-ordering-roi`,
      lastModified: new Date("2026-09-05T16:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-labour-cost-benchmarks-india`,
      lastModified: new Date("2026-09-05T20:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-profit-margin-benchmarks-india`,
      lastModified: new Date("2026-09-05T21:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-break-even-calculator-india`,
      lastModified: new Date("2026-09-05T22:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/how-to-price-restaurant-menu-india`,
      lastModified: new Date("2026-09-05T22:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/food-cost-percentage-calculator-india`,
      lastModified: new Date("2026-09-05T23:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-discounting-traps-india`,
      lastModified: new Date("2026-09-06T01:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-inventory-control-india`,
      lastModified: new Date("2026-09-06T01:45:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/zomato-swiggy-real-commission-breakdown`,
      lastModified: new Date("2026-09-06T02:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/zomato-swiggy-payout-audit-guide`,
      lastModified: new Date("2026-09-06T02:15:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/gst-rules-zomato-swiggy-onboarding`,
      lastModified: new Date("2026-09-06T02:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/gst-on-restaurant-food-rules-explained`,
      lastModified: new Date("2026-09-06T02:45:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/zomato-hyperpure-restaurant-review`,
      lastModified: new Date("2026-09-06T03:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-service-charge-legal-rules-india`,
      lastModified: new Date("2026-09-06T03:15:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/best-restaurant-billing-software-india`,
      lastModified: new Date("2026-09-06T05:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/why-pdf-qr-menus-fail-restaurants`,
      lastModified: new Date("2026-09-06T06:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/qr-code-menu-alternatives-india`,
      lastModified: new Date("2026-09-06T06:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/setup-qr-menu-india`,
      lastModified: new Date("2026-09-06T08:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/improve-restaurant-table-turnover`,
      lastModified: new Date("2026-09-06T07:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/increase-restaurant-average-order-value`,
      lastModified: new Date("2026-09-06T07:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-upselling-techniques-guide`,
      lastModified: new Date("2026-09-06T08:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/restaurant-no-show-deposit-policy-india`,
      lastModified: new Date("2026-09-06T08:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/best-ordering-system-cafes-india`,
      lastModified: new Date("2026-09-06T09:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/ordering-system-bars-breweries-india`,
      lastModified: new Date("2026-09-06T09:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/how-to-start-cloud-kitchen-india`,
      lastModified: new Date("2026-09-06T10:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/bangalore-restaurant-self-ordering`,
      lastModified: new Date("2026-09-06T10:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/mumbai-restaurant-self-ordering`,
      lastModified: new Date("2026-09-06T11:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/hyderabad-restaurant-self-ordering`,
      lastModified: new Date("2026-09-06T11:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/pune-restaurant-self-ordering`,
      lastModified: new Date("2026-09-06T12:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/chennai-restaurant-self-ordering`,
      lastModified: new Date("2026-09-06T12:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/delhi-ncr-restaurant-self-ordering`,
      lastModified: new Date("2026-09-06T13:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-09-06T14:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-09-06T14:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date("2026-09-06T14:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}



