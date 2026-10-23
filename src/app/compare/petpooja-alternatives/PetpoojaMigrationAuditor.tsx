"use client";

import React, { useState } from "react";
import styles from "./PetpoojaMigrationAuditor.module.css";
import { GOAL } from "@/content/site";

type TabMode = "roi" | "coexistence";
type ScenarioKey = "status_quo" | "rip_replace" | "coexistence";

// The lift is the owner's own assumption and starts at 0%: no KNOMI default or target.
const START_LIFT_PCT = 0;

export default function PetpoojaMigrationAuditor() {
  const [activeTab, setActiveTab] = useState<TabMode>("roi");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("coexistence");

  // Mode 1: Estimate inputs (the user's own figures)
  const [monthlyCovers, setMonthlyCovers] = useState<number>(1200);
  const [avgCheck, setAvgCheck] = useState<number>(1400);
  const [liftPct, setLiftPct] = useState<number>(START_LIFT_PCT);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Mode 1 Computations (arithmetic on the inputs, at the owner's own lift)
  const avgCheckWithLift = Math.round(avgCheck * (1 + liftPct / 100));
  const monthlyExtraRevenue = Math.round(monthlyCovers * avgCheck * (liftPct / 100));
  const annualExtraRevenue = monthlyExtraRevenue * 12;

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
          className={`${styles.tabBtn} pressable ${activeTab === "roi" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("roi")}
        >
          1. What a Higher Average Order Could Be Worth
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === "coexistence" ? styles.tabBtnActive : ""}`}
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

            <div className={`${styles.controlCard} ${styles.controlCardWide}`}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Average-Order Lift (your assumption)</span>
                <span className={styles.controlValue}>+{liftPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={liftPct}
                aria-label="Average-order lift, your assumption"
                onChange={(e) => setLiftPct(Number(e.target.value))}
                className={styles.sliderInput}
              />
              <span className={styles.controlHint}>Starts at 0%: set your own estimate. Not a KNOMI result or guarantee.</span>
            </div>
          </div>

          <div className={styles.resultsSection}>
            <div className={styles.resultsGrid}>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{formatCurrency(avgCheckWithLift)}</div>
                <div className={styles.resultLabel}>
                  Average Bill at a {liftPct}% Lift (estimate)
                </div>
              </div>

              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{formatCurrency(monthlyExtraRevenue)}</div>
                <div className={styles.resultLabel}>
                  Extra Monthly Revenue (estimate)
                </div>
              </div>

              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{formatCurrency(annualExtraRevenue)}</div>
                <div className={styles.resultLabel}>
                  Extra Yearly Revenue (estimate)
                </div>
              </div>
            </div>

            <div className={styles.bottomLineBanner}>
              <div>
                <div className={styles.bannerTitle}>What Your Lift Would Mean</div>
                <p className={styles.bannerSubtitle}>
                  {GOAL} This is an estimate on your inputs, not a forecast. Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.
                </p>
              </div>
              <div>
                <div className={styles.bannerNumber}>{formatCurrency(monthlyExtraRevenue)}</div>
                <span className={styles.bannerSuffix}>extra revenue a month at your {liftPct}% lift (estimate)</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.archGrid}>
            <div
              className={`${styles.archCard} pressable ${selectedScenario === "status_quo" ? styles.archCardSelected : ""}`}
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
              className={`${styles.archCard} pressable ${selectedScenario === "rip_replace" ? styles.archCardSelected : ""}`}
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
              className={`${styles.archCard} pressable ${selectedScenario === "coexistence" ? styles.archCardSelected : ""}`}
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
                <li className={styles.archFeatureItem}>✓ Knomi Compass shows dishes viewed but not ordered</li>
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
                  Keep what already works. Petpooja stays at the counter for daily cash reconciliation, Tally exports and GST filing. KNOMI QR stands go on the tables: guests open an illustrated menu with no app and no login, Knomi Host suggests pairings, and guests confirm their order with a phone number. Orders go to your kitchen display and into Petpooja, and Knomi Compass, powered by Knomi Sense, adds menu insights to your dashboard.
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
