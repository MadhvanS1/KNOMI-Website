"use client";

import React, { useState } from "react";
import styles from "./PetpoojaMigrationAuditor.module.css";
import { pricing } from "@/content/site";

type TabMode = "roi" | "coexistence";
type ScenarioKey = "status_quo" | "rip_replace" | "coexistence";

const signaturePlan = pricing.plans.find((plan) => plan.id === "signature");
const SIGNATURE_PRICE = signaturePlan ? signaturePlan.priceMin : 250;

// KNOMI's stated goal (KNOMI Brain §1, §5): around +25% on the average order.
// A target to be measured in the trial, not a past result.
const KNOMI_TARGET_LIFT = 0.25;

export default function PetpoojaMigrationAuditor() {
  const [activeTab, setActiveTab] = useState<TabMode>("roi");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("coexistence");

  // Mode 1: Estimate inputs (the user's own figures)
  const [tableCount, setTableCount] = useState<number>(20);
  const [monthlyCovers, setMonthlyCovers] = useState<number>(1200);
  const [avgCheck, setAvgCheck] = useState<number>(1400);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Mode 1 Computations (arithmetic on the inputs, at KNOMI's +25% target)
  const monthlyKnomiFee = tableCount * SIGNATURE_PRICE;
  const avgCheckAtTarget = Math.round(avgCheck * (1 + KNOMI_TARGET_LIFT));
  const monthlyExtraRevenueAtTarget = Math.round(monthlyCovers * avgCheck * KNOMI_TARGET_LIFT);

  return (
    <div className={styles.auditorContainer}>
      <div className={styles.auditorHeader}>
        <h3 className={styles.auditorTitle}>Petpooja Migration &amp; Co-Existence Auditor</h3>
        <p className={styles.auditorSubtitle}>
          Weigh whether swapping your cashier POS is necessary, or whether adding a guest-facing layer alongside Petpooja is the better fit. Results are estimates based on your inputs.
        </p>
      </div>

      <div className={styles.tabGroup}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "roi" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("roi")}
        >
          1. Table Intelligence ROI Calculator
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "coexistence" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("coexistence")}
        >
          2. Co-Existence Architecture Guide
        </button>
      </div>

      {activeTab === "roi" ? (
        <>
          <div className={styles.controlsGrid}>
            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Dine-In Tables</span>
                <span className={styles.controlValue}>{tableCount} Tables</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="2"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span className={styles.controlHint}>Floor dining tables in active service</span>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Monthly Bills</span>
                <span className={styles.controlValue}>{monthlyCovers.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={monthlyCovers}
                onChange={(e) => setMonthlyCovers(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span className={styles.controlHint}>Dine-in bills settled per month</span>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Average Bill Today</span>
                <span className={styles.controlValue}>{formatCurrency(avgCheck)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={avgCheck}
                onChange={(e) => setAvgCheck(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span className={styles.controlHint}>Average food and beverage bill subtotal</span>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Average-Order Lift</span>
                <span className={styles.controlValue}>+25%</span>
              </div>
              <span className={styles.controlHint}>
                KNOMI&apos;s target (not a guarantee). It hasn&apos;t been measured on a live restaurant yet.
              </span>
            </div>
          </div>

          <div className={styles.resultsSection}>
            <div className={styles.resultsGrid}>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{formatCurrency(avgCheckAtTarget)}</div>
                <div className={styles.resultLabel}>
                  Average Bill at the +25% Target (estimate)
                </div>
              </div>

              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{formatCurrency(monthlyExtraRevenueAtTarget)}</div>
                <div className={styles.resultLabel}>
                  Extra Monthly Revenue at the Target (estimate)
                </div>
              </div>

              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{formatCurrency(monthlyKnomiFee)}</div>
                <div className={styles.resultLabel}>
                  KNOMI Signature for {tableCount} Tables, per Month (0% commission)
                </div>
              </div>
            </div>

            <div className={styles.bottomLineBanner}>
              <div>
                <div className={styles.bannerTitle}>What the Target Would Mean for You</div>
                <p className={styles.bannerSubtitle}>
                  Our goal is to lift your average order by around 25%. In the trial we measure it on your own tables, and you see the numbers. This is an estimate on your inputs, not a forecast.
                </p>
              </div>
              <div>
                <div className={styles.bannerNumber}>{formatCurrency(monthlyExtraRevenueAtTarget)}</div>
                <span className={styles.bannerSuffix}>extra revenue a month at the target (estimate)</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.archGrid}>
            <div
              className={`${styles.archCard} ${selectedScenario === "status_quo" ? styles.archCardSelected : ""}`}
              onClick={() => setSelectedScenario("status_quo")}
            >
              <span className={`${styles.archTag} ${styles.tagDanger}`}>Option A: Till Only</span>
              <div className={styles.archName}>Keep Petpooja Standalone</div>
              <p className={styles.archDescription}>
                Keep Petpooja for billing, with servers taking all orders on paper or captain apps.
              </p>
              <ul className={styles.archFeatureList}>
                <li className={styles.archFeatureItem}>✕ Orders wait for a free server at peak</li>
                <li className={styles.archFeatureItem}>✕ No view of what guests browse</li>
                <li className={styles.archFeatureItem}>✕ Upselling depends on how busy staff are</li>
              </ul>
            </div>

            <div
              className={`${styles.archCard} ${selectedScenario === "rip_replace" ? styles.archCardSelected : ""}`}
              onClick={() => setSelectedScenario("rip_replace")}
            >
              <span className={`${styles.archTag} ${styles.tagWarning}`}>Option B: Rip &amp; Replace</span>
              <div className={styles.archName}>Migrate to Another POS</div>
              <p className={styles.archDescription}>
                Discard Petpooja and move accounting, inventory and billing to another till software.
              </p>
              <ul className={styles.archFeatureList}>
                <li className={styles.archFeatureItem}>✕ Menu, recipes and staff habits all move at once</li>
                <li className={styles.archFeatureItem}>✕ Retraining during live service</li>
                <li className={styles.archFeatureItem}>✕ Billing changes, but table service may not</li>
              </ul>
            </div>

            <div
              className={`${styles.archCard} ${selectedScenario === "coexistence" ? styles.archCardSelected : ""}`}
              onClick={() => setSelectedScenario("coexistence")}
            >
              <span className={`${styles.archTag} ${styles.tagSuccess}`}>Option C: Our Recommendation</span>
              <div className={styles.archName}>The Co-Existence Stack</div>
              <p className={styles.archDescription}>
                Keep Petpooja for back-office GST and cashier billing. Add KNOMI on the tables for guest self-ordering and Knomi Host.
              </p>
              <ul className={styles.archFeatureList}>
                <li className={styles.archFeatureItem}>✓ No POS migration; billing stays as it is</li>
                <li className={styles.archFeatureItem}>✓ Illustrated menu opens in the browser, no app or login</li>
                <li className={styles.archFeatureItem}>✓ Knomi Sense shows dishes viewed but not ordered (Ecosystem plan)</li>
              </ul>
            </div>
          </div>

          <div className={styles.archDetailBox}>
            {selectedScenario === "status_quo" && (
              <>
                <div className={styles.archDetailTitle}>The Till-Only Ceiling</div>
                <p className={styles.archDetailText}>
                  Petpooja is a capable billing system, but a cash register can&apos;t take orders or suggest a dessert. When the Friday crowd arrives, two servers can&apos;t be at twenty tables at once. Tables wait to place their first order, the bill takes longer to arrive, and guests feel it. In a till-only setup, service speed at peak is set by how fast your servers can get around the room.
                </p>
              </>
            )}

            {selectedScenario === "rip_replace" && (
              <>
                <div className={styles.archDetailTitle}>Why POS Migrations Are Often Traps</div>
                <p className={styles.archDetailText}>
                  Swapping Petpooja for another till means re-entering your whole menu, re-mapping recipes, retraining floor staff and risking disruption during dinner service. And you would be trading one billing system for another: servers still spend the rush writing orders, and the guest-facing menu may not change at all.
                </p>
              </>
            )}

            {selectedScenario === "coexistence" && (
              <>
                <div className={styles.archDetailTitle}>The Modern Co-Existence Strategy</div>
                <p className={styles.archDetailText}>
                  Keep what already works. Petpooja stays at the counter for daily cash reconciliation, Tally exports and GST filing. KNOMI QR stands go on the tables: guests open an illustrated menu with no app and no login, Knomi Host suggests pairings, and guests confirm their order with a phone number. Orders go to your kitchen display and, on the Signature plan (₹{SIGNATURE_PRICE} per table, per month), into Petpooja. On the Ecosystem plan, Knomi Sense adds menu intelligence to your dashboard.
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
