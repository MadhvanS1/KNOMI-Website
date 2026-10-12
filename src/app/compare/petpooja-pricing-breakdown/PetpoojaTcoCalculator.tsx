"use client";

import React, { useState } from "react";
import styles from "./PetpoojaPricing.module.css";
import { pricing } from "@/content/site";

interface AddonOption {
  id: string;
  name: string;
  category: string;
  description: string;
}

// Petpooja does not publish add-on prices. Every add-on starts at the same
// example figure (matching the worked example in the article) and the user
// replaces it with the price on their own quote.
const EXAMPLE_ADDON_PRICE = 4000;

// Reported base licence (SaaSworthy / Techjockey listings, Sept 2026).
const REPORTED_BASE_YEAR_ONE = 10000;
const REPORTED_BASE_RENEWAL = 7500;

const signaturePlan = pricing.plans.find((plan) => plan.id === "signature");
const SIGNATURE_PRICE = signaturePlan ? signaturePlan.priceMin : 250;

// KNOMI's stated goal: around +25% on the average order. A target, not a past result.
const KNOMI_TARGET_LIFT = 0.25;

const AVAILABLE_ADDONS: AddonOption[] = [
  {
    id: "captain",
    name: "Captain Ordering App (Waiter Mobile Terminal)",
    category: "Floor Operations",
    description: "Lets floor staff punch KOTs on Android phones",
  },
  {
    id: "kds",
    name: "Kitchen Display System (KDS)",
    category: "Kitchen",
    description: "Replaces paper thermal chits with kitchen station screens",
  },
  {
    id: "qr_ordering",
    name: "Table Dynamic QR Ordering & Digital Menu",
    category: "Table Ordering",
    description: "Diners scan a table QR to browse and place orders",
  },
  {
    id: "loyalty",
    name: "Customer Loyalty & SMS Marketing CRM",
    category: "Marketing",
    description: "Points engine and transactional SMS",
  },
  {
    id: "website",
    name: "Direct Online Ordering Website",
    category: "Delivery",
    description: "Branded ordering site alongside Zomato/Swiggy",
  },
  {
    id: "feedback",
    name: "Feedback App & Review QR",
    category: "Reputation",
    description: "Digital feedback and review prompt",
  },
  {
    id: "commissary",
    name: "Central Kitchen / Commissary Indent Module",
    category: "Supply Chain",
    description: "Raw material transfers across multiple restaurant branches",
  },
];

const TABLE_OPTIONS = [10, 15, 20, 30];
const REVENUE_OPTIONS = [300000, 600000, 1200000, 2000000];

const buttonStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid var(--color-border-default)",
  backgroundColor: active ? "var(--color-whiskey-sour)" : "var(--color-surface-pressed)",
  color: active ? "#fbf8f3" : "var(--color-text-primary)",
  fontWeight: 700,
  cursor: "pointer",
});

const groupLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--color-text-secondary)",
  marginBottom: "6px",
};

export default function PetpoojaTcoCalculator() {
  const [activeTab, setActiveTab] = useState<"tco" | "coexistence">("tco");
  const [outlets, setOutlets] = useState<number>(1);
  const [isYearOne, setIsYearOne] = useState<boolean>(true);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "captain",
    "kds",
    "qr_ordering",
    "feedback",
  ]);
  const [addonPrices, setAddonPrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(AVAILABLE_ADDONS.map((addon) => [addon.id, EXAMPLE_ADDON_PRICE]))
  );
  const [tablesPerOutlet, setTablesPerOutlet] = useState<number>(20);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1200000);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateAddonPrice = (id: string, value: string) => {
    const parsed = Math.max(0, Math.round(Number(value) || 0));
    setAddonPrices((prev) => ({ ...prev, [id]: parsed }));
  };

  // Base pricing (reported figures)
  const basePricePerOutlet = isYearOne ? REPORTED_BASE_YEAR_ONE : REPORTED_BASE_RENEWAL;
  const totalBasePrice = basePricePerOutlet * outlets;

  // Add-ons sum (the user's own quote figures)
  const addonsTotalPerOutlet = AVAILABLE_ADDONS.filter((addon) =>
    selectedAddons.includes(addon.id)
  ).reduce((sum, addon) => sum + (addonPrices[addon.id] ?? 0), 0);
  const totalAddonsPrice = addonsTotalPerOutlet * outlets;

  // Software Subtotal and GST (18% GST on software services)
  const softwareSubtotal = totalBasePrice + totalAddonsPrice;
  const softwareGst = Math.round(softwareSubtotal * 0.18);
  const totalLandedSoftware = softwareSubtotal + softwareGst;

  // Percentage increase over headline base price
  const markupPercentage =
    totalBasePrice > 0
      ? Math.round(((softwareSubtotal - totalBasePrice) / totalBasePrice) * 100)
      : 0;

  const hasQrOrdering = selectedAddons.includes("qr_ordering");

  // Mode 2: co-existence estimate (arithmetic on the inputs, at KNOMI's +25% target)
  const knomiAnnualFee = SIGNATURE_PRICE * tablesPerOutlet * 12 * outlets;
  const petpoojaBaseRenewal = REPORTED_BASE_RENEWAL * outlets;
  const coexistenceAnnualSoftware = knomiAnnualFee + petpoojaBaseRenewal;
  const extraRevenueAtTarget = Math.round(monthlyRevenue * 12 * KNOMI_TARGET_LIFT * outlets);

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Petpooja Total Cost of Ownership (TCO) Auditor</h3>
        <p className={styles.calcDescription}>
          Estimate your annual software spend by separating the headline POS licence from add-on modules and 18% GST on software. Use the figures from your own quote; results are estimates.
        </p>
      </div>

      <div className={styles.tabGroup}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "tco" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("tco")}
        >
          1. Petpooja Real Add-On &amp; TCO Breakdown
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "coexistence" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("coexistence")}
        >
          2. Co-Existence: Petpooja Base + KNOMI
        </button>
      </div>

      {activeTab === "tco" ? (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
            <div>
              <label style={groupLabelStyle}>
                Number of Outlets:
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    style={buttonStyle(outlets === num)}
                    onClick={() => setOutlets(num)}
                  >
                    {num} {num === 1 ? "Outlet" : "Outlets"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={groupLabelStyle}>
                Licensing Stage (reported base licence):
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  style={buttonStyle(isYearOne)}
                  onClick={() => setIsYearOne(true)}
                >
                  Year 1 (₹10,000 base)
                </button>
                <button
                  type="button"
                  style={buttonStyle(!isYearOne)}
                  onClick={() => setIsYearOne(false)}
                >
                  Year 2+ Renewal (₹7,500 base)
                </button>
              </div>
            </div>
          </div>

          <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
            Select the Add-On Modules in Your Quote:
          </label>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", margin: "0 0 12px" }}>
            Petpooja doesn&apos;t publish add-on prices. Each module starts at an example figure of {formatCurrency(EXAMPLE_ADDON_PRICE)} a year; replace it with the price on your own quote.
          </p>
          <div className={styles.addonGrid}>
            {AVAILABLE_ADDONS.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className={`${styles.addonItem} ${isSelected ? styles.addonItemActive : ""}`}
                  onClick={() => toggleAddon(addon.id)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className={styles.addonCheckbox}
                  />
                  <div className={styles.addonTextGroup}>
                    <span className={styles.addonName}>{addon.name}</span>
                    <span className={styles.addonPrice}>
                      ₹{" "}
                      <input
                        type="number"
                        min="0"
                        step="500"
                        inputMode="numeric"
                        aria-label={`${addon.name} price per year per outlet, from your quote`}
                        value={addonPrices[addon.id] ?? 0}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateAddonPrice(addon.id, e.target.value)}
                        style={{
                          width: "88px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border-default)",
                          font: "inherit",
                        }}
                      />{" "}
                      / yr / outlet (your quote)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summaryBox}>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryVal}>{formatCurrency(totalBasePrice)}</div>
                <div className={styles.summaryLabel}>Reported Base POS Licence ({outlets} {outlets === 1 ? "Outlet" : "Outlets"})</div>
              </div>

              <div className={styles.summaryCard}>
                <div className={`${styles.summaryVal} ${styles.summaryValDanger}`}>
                  +{formatCurrency(totalAddonsPrice)}
                </div>
                <div className={styles.summaryLabel}>
                  Add-Ons Total (+{markupPercentage}% over base)
                </div>
              </div>

              <div className={styles.summaryCard}>
                <div className={styles.summaryVal}>+{formatCurrency(softwareGst)}</div>
                <div className={styles.summaryLabel}>18% Software GST (CGST + SGST, or IGST)</div>
              </div>
            </div>

            <div className={styles.tcoBanner}>
              <div>
                <div className={styles.tcoTitle}>Estimated Annual Software Cost</div>
                <p className={styles.tcoSub}>
                  Base licence plus the add-ons you selected, with 18% GST. An estimate based on reported base figures and your add-on inputs.
                </p>
              </div>
              <div className={styles.tcoNum}>{formatCurrency(totalLandedSoftware)}</div>
            </div>

            {hasQrOrdering && (
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "16px", textAlign: "center" }}>
                Note: if guests pay online through QR ordering, your payment gateway&apos;s MDR applies on top. Check the rate in your gateway agreement.
              </p>
            )}
          </div>
        </>
      ) : (
        <div className={styles.summaryBox}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
              The Co-Existence Math: Keep Petpooja POS + Add KNOMI on the Tables
            </h4>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
              Keep Petpooja&apos;s base licence for cashier billing, GST and accounting, and put KNOMI on the tables for the guest-facing side: the illustrated menu, Knomi Host, ordering and the kitchen display. On the Signature plan, KNOMI orders flow into Petpooja.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
            <div>
              <label style={groupLabelStyle}>Tables per Outlet:</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {TABLE_OPTIONS.map((num) => (
                  <button
                    key={num}
                    type="button"
                    style={buttonStyle(tablesPerOutlet === num)}
                    onClick={() => setTablesPerOutlet(num)}
                  >
                    {num} Tables
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={groupLabelStyle}>Monthly Dine-In Sales per Outlet:</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {REVENUE_OPTIONS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    style={buttonStyle(monthlyRevenue === amount)}
                    onClick={() => setMonthlyRevenue(amount)}
                  >
                    ₹{amount / 100000}L
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryVal}>
                {formatCurrency(knomiAnnualFee)}
              </div>
              <div className={styles.summaryLabel}>
                KNOMI Signature per Year (₹{SIGNATURE_PRICE} × {tablesPerOutlet} tables × 12 × {outlets} {outlets === 1 ? "outlet" : "outlets"})
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={`${styles.summaryVal} ${styles.summaryValSuccess}`}>
                +{formatCurrency(extraRevenueAtTarget)}
              </div>
              <div className={styles.summaryLabel}>
                Extra Revenue per Year at KNOMI&apos;s +25% Target (not a guarantee; estimate)
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryVal}>0%</div>
              <div className={styles.summaryLabel}>Commission on Dine-In Sales with KNOMI</div>
            </div>
          </div>

          <div className={styles.tcoBanner}>
            <div>
              <div className={styles.tcoTitle}>Co-Existence Software Cost per Year (estimate)</div>
              <p className={styles.tcoSub}>
                Petpooja reported base renewal plus KNOMI Signature, before GST. Our goal is to lift your average order by around 25%. In the trial we measure it on your own tables, and you see the numbers.
              </p>
            </div>
            <div className={styles.tcoNum}>
              {formatCurrency(coexistenceAnnualSoftware)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
