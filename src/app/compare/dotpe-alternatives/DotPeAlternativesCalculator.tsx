"use client";

import React, { useState } from "react";
import styles from "./DotPeAlternatives.module.css";
import { pricing } from "@/content/site";

const signaturePlan = pricing.plans.find((plan) => plan.id === "signature");
const SIGNATURE_PRICE = signaturePlan ? signaturePlan.priceMin : 250;

export default function DotPeAlternativesCalculator() {
  const [activeTab, setActiveTab] = useState<"commission" | "otp">("commission");

  // Tab 1: Per-order fee inputs (all the user's own figures)
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1200);
  const [aov, setAov] = useState<number>(950);
  const [perOrderFee, setPerOrderFee] = useState<number>(3.5);
  const [mdrRate, setMdrRate] = useState<number>(1.8);

  // Tab 2: Login drop-off inputs (all the user's own assumptions)
  const [monthlyTables, setMonthlyTables] = useState<number>(1000);
  const [avgBill, setAvgBill] = useState<number>(1400);
  const [otpDropOffRate, setOtpDropOffRate] = useState<number>(10);
  const [serverMinutes, setServerMinutes] = useState<number>(4);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Tab 1 Computations (arithmetic on the inputs above)
  const monthlyVolume = monthlyOrders * aov;
  const monthlyFixedFee = Math.round(monthlyOrders * perOrderFee);
  const monthlyMdrFee = Math.round(monthlyVolume * (mdrRate / 100));
  const annualFixedFee = monthlyFixedFee * 12;

  // Tab 2 Computations (arithmetic on the inputs above)
  const abandonedTablesCount = Math.round(monthlyTables * (otpDropOffRate / 100));
  const waiterMinutesBurned = abandonedTablesCount * serverMinutes;
  const waiterHoursBurned = (waiterMinutesBurned / 60).toFixed(1);
  const affectedBillValue = abandonedTablesCount * avgBill;

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>DotPe Fee Drag &amp; Pre-Browse Drop-Off Auditor</h3>
        <p className={styles.calcDescription}>
          Estimate the cost of per-transaction fees, payment gateway charges and a login step before the menu, using your own numbers. Results are estimates, not quotes.
        </p>
      </div>

      <div className={styles.tabGroup}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "commission" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("commission")}
        >
          1. Per-Order Fee &amp; Commission Drag Auditor
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "otp" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("otp")}
        >
          2. Phone OTP Drop-Off Simulator
        </button>
      </div>

      {activeTab === "commission" ? (
        <>
          <div className={styles.controlsGrid}>
            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Monthly Table Orders</span>
                <span className={styles.controlValue}>{monthlyOrders.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Average Order Value (AOV)</span>
                <span className={styles.controlValue}>{formatCurrency(aov)}</span>
              </div>
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Per-Order Platform Fee (from your contract)</span>
                <span className={styles.controlValue}>₹{perOrderFee.toFixed(1)} / order</span>
              </div>
              <input
                type="range"
                min="0"
                max="6.0"
                step="0.5"
                value={perOrderFee}
                onChange={(e) => setPerOrderFee(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginTop: "4px" }}>
                The starting value is a placeholder, not a published DotPe rate. Set it to the fee in your contract.
              </span>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Payment Gateway MDR (from your contract)</span>
                <span className={styles.controlValue}>{mdrRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={mdrRate}
                onChange={(e) => setMdrRate(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginTop: "4px" }}>
                A placeholder; use the rate in your payment gateway agreement.
              </span>
            </div>
          </div>

          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <div className={`${styles.resultVal} ${styles.resultValDanger}`}>
                {formatCurrency(monthlyFixedFee)}
              </div>
              <div className={styles.resultLabel}>Monthly Per-Order Platform Fees (estimate)</div>
            </div>

            <div className={styles.resultCard}>
              <div className={`${styles.resultVal} ${styles.resultValDanger}`}>
                {formatCurrency(monthlyMdrFee)}
              </div>
              <div className={styles.resultLabel}>Monthly Gateway MDR (estimate; set by your payment provider)</div>
            </div>

            <div className={styles.resultCard}>
              <div className={`${styles.resultVal} ${styles.resultValSuccess}`}>₹0</div>
              <div className={styles.resultLabel}>KNOMI Commission per Order</div>
            </div>
          </div>

          <div className={styles.comparisonBanner}>
            <div>
              <div className={styles.bannerTitle}>The Flat-Fee Difference</div>
              <p className={styles.bannerSub}>
                Per-order fees rise with every busy month. KNOMI charges a flat fee per table instead (Signature is ₹{SIGNATURE_PRICE} per table, per month) with 0% commission, so the fee stays the same however many orders you take. Gateway MDR on digital payments is set by your payment provider and usually applies whichever menu you use.
              </p>
            </div>
            <div>
              <div className={styles.bannerNum}>{formatCurrency(annualFixedFee)}</div>
              <span style={{ fontSize: "0.75rem", color: "#b3a493", display: "block" }}>
                a year in per-order platform fees at your inputs (estimate)
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.controlsGrid}>
            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Monthly Dining Tables</span>
                <span className={styles.controlValue}>{monthlyTables.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="400"
                max="3000"
                step="100"
                value={monthlyTables}
                onChange={(e) => setMonthlyTables(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Average Bill Value</span>
                <span className={styles.controlValue}>{formatCurrency(avgBill)}</span>
              </div>
              <input
                type="range"
                min="600"
                max="3000"
                step="100"
                value={avgBill}
                onChange={(e) => setAvgBill(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Tables That Give Up at the Login (your assumption)</span>
                <span className={styles.controlValue}>{otpDropOffRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="1"
                value={otpDropOffRate}
                onChange={(e) => setOtpDropOffRate(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginTop: "4px" }}>
                Your estimate of tables that close the QR when asked for a phone number before the menu
              </span>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Server Minutes per Stalled Table (your assumption)</span>
                <span className={styles.controlValue}>{serverMinutes} min</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={serverMinutes}
                onChange={(e) => setServerMinutes(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginTop: "4px" }}>
                Time a server spends fetching a paper menu and taking the order by hand
              </span>
            </div>
          </div>

          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <div className={`${styles.resultVal} ${styles.resultValDanger}`}>
                {abandonedTablesCount} Tables
              </div>
              <div className={styles.resultLabel}>Monthly Tables Giving Up on the QR (estimate)</div>
            </div>

            <div className={styles.resultCard}>
              <div className={`${styles.resultVal} ${styles.resultValDanger}`}>
                {waiterHoursBurned} Hours
              </div>
              <div className={styles.resultLabel}>Server Hours a Month Spent on Stalled Tables (estimate)</div>
            </div>

            <div className={styles.resultCard}>
              <div className={styles.resultVal}>
                {formatCurrency(affectedBillValue)}
              </div>
              <div className={styles.resultLabel}>Monthly Bill Value at Those Tables (estimate)</div>
            </div>
          </div>

          <div className={styles.comparisonBanner}>
            <div>
              <div className={styles.bannerTitle}>Why Open Browsing Matters</div>
              <p className={styles.bannerSub}>
                When diners scan a QR code hungry, a phone number and SMS code before they see any food is a hurdle. KNOMI opens straight to your menu with no app and no login; guests confirm with their phone number only when they place an order.
              </p>
            </div>
            <div>
              <div className={styles.bannerNum}>Browse First</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
