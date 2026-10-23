"use client";

import React, { useState } from "react";
import styles from "./ServiceChargeGuide.module.css";

type Mode = "friction" | "compensation";

export default function ServiceChargeCalculator() {
  const [activeMode, setActiveMode] = useState<Mode>("friction");

  // Mode 1: Dispute & Friction State
  const [avgBill, setAvgBill] = useState<number>(1500);
  const [serviceChargeRate, setServiceChargeRate] = useState<number>(10);
  const [monthlyTables, setMonthlyTables] = useState<number>(1000);
  const [refusalRate, setRefusalRate] = useState<number>(25);
  const [disputeMins, setDisputeMins] = useState<number>(4);
  // Pairing upsell alternative: the user's own assumptions
  const [pairingTakeUpPct, setPairingTakeUpPct] = useState<number>(35);
  const [pairingPrice, setPairingPrice] = useState<number>(160);
  const [pairingMarginPct, setPairingMarginPct] = useState<number>(70);

  // Mode 2: Transparent Menu Price State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1500000);
  const [menuUpliftPercent, setMenuUpliftPercent] = useState<number>(7.5);
  const [staffPoolShare, setStaffPoolShare] = useState<number>(70);
  const [staffCount, setStaffCount] = useState<number>(14);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Mode 1 Computations
  const serviceChargePerTable = Math.round(avgBill * (serviceChargeRate / 100));
  const theoreticalTotalBilled = monthlyTables * serviceChargePerTable;
  const refusedTablesCount = Math.round(monthlyTables * (refusalRate / 100));
  const lostToRefusals = refusedTablesCount * serviceChargePerTable;
  const netRealizedCharge = theoreticalTotalBilled - lostToRefusals;

  const totalDisputeMinutes = refusedTablesCount * disputeMins;
  const totalDisputeHours = (totalDisputeMinutes / 60).toFixed(1);

  // Pairing upsell alternative (estimate from the user's own assumptions)
  const upsellingTables = Math.round(monthlyTables * (pairingTakeUpPct / 100));
  const upsellingGross = upsellingTables * pairingPrice;
  const upsellingNetProfit = Math.round(upsellingGross * (pairingMarginPct / 100));

  // Mode 2 Computations
  const additionalRevenueFromMenu = Math.round(monthlyRevenue * (menuUpliftPercent / 100));
  const totalStaffIncentivePool = Math.round(additionalRevenueFromMenu * (staffPoolShare / 100));
  const perStaffMonthlyBonus = staffCount > 0 ? Math.round(totalStaffIncentivePool / staffCount) : 0;

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Service Charge Friction &amp; Menu Absorption Auditor</h3>
        <p className={styles.calcDescription}>
          Estimate the cost of billing arguments and customer pushback, and compare it with transparent menu pricing or a simple pairing upsell, using your own numbers.
        </p>
      </div>

      <div className={styles.modeTabs}>
        <button
          type="button"
          className={`${styles.modeTab} pressable ${activeMode === "friction" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("friction")}
        >
          1. Dispute Friction &amp; Upsell Comparison
        </button>
        <button
          type="button"
          className={`${styles.modeTab} pressable ${activeMode === "compensation" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("compensation")}
        >
          2. Transparent Menu Price Absorption
        </button>
      </div>

      {activeMode === "friction" ? (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Average Food &amp; Beverage Bill</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(avgBill)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={500}
                max={5000}
                step={50}
                value={avgBill}
                onChange={(e) => setAvgBill(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Pre-tax check size per seated dining table.</span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Service Charge Rate Billed</label>
              <select
                className={styles.selectInput}
                value={serviceChargeRate}
                onChange={(e) => setServiceChargeRate(Number(e.target.value))}
              >
                <option value={5}>5% Service Charge</option>
                <option value={7.5}>7.5% Service Charge</option>
                <option value={10}>10% Service Charge</option>
              </select>
              <span className={styles.inputHint}>
                The CCPA 2022 guidelines bar adding it automatically or making it mandatory.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Seated Tables</span>
                <span className={styles.inputValueDisplay}>{monthlyTables} tables</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={200}
                max={3000}
                step={50}
                value={monthlyTables}
                onChange={(e) => setMonthlyTables(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Total dining room covers / tables billed per month.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Customer Refusal / Removal Rate</span>
                <span className={styles.inputValueDisplay}>{refusalRate}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={5}
                max={60}
                step={5}
                value={refusalRate}
                onChange={(e) => setRefusalRate(Number(e.target.value))}
              />
              <span className={styles.inputHint}>
                Your estimate of the share of tables that ask for the charge to be removed.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Average Dispute Time at Billing</span>
                <span className={styles.inputValueDisplay}>{disputeMins} minutes</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={2}
                max={8}
                step={1}
                value={disputeMins}
                onChange={(e) => setDisputeMins(Number(e.target.value))}
              />
              <span className={styles.inputHint}>
                Time spent by waiter and manager reprinting invoices and arguing CCPA rules.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Tables Adding a Pairing (Your Assumption)</span>
                <span className={styles.inputValueDisplay}>{pairingTakeUpPct}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={60}
                step={5}
                value={pairingTakeUpPct}
                onChange={(e) => setPairingTakeUpPct(Number(e.target.value))}
              />
              <span className={styles.inputHint}>
                Your estimate of how many tables would add a suggested dessert or mocktail.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Pairing Price</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(pairingPrice)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={50}
                max={500}
                step={10}
                value={pairingPrice}
                onChange={(e) => setPairingPrice(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Menu price of the suggested add-on.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Gross Margin on the Pairing</span>
                <span className={styles.inputValueDisplay}>{pairingMarginPct}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={30}
                max={90}
                step={5}
                value={pairingMarginPct}
                onChange={(e) => setPairingMarginPct(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Price minus ingredient cost, as a share of price.</span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>The True Cost of Service Charge Friction</div>
              <span className={`${styles.statusBadge} ${styles.badgeRequired}`}>
                {totalDisputeHours} Staff Hours Lost / mo
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Theoretical Service Charge Billed:</span>
                <span className={styles.resultValue}>{formatCurrency(theoreticalTotalBilled)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Cash Lost to Refusals &amp; Removals:</span>
                <span className={styles.resultValueDanger}>-{formatCurrency(lostToRefusals)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Net Realized Charge Retained:</span>
                <span className={styles.resultValue}>{formatCurrency(netRealizedCharge)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Monthly Disputed Tables:</span>
                <span className={styles.resultValueDanger}>{refusedTablesCount} awkward standoffs</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Pairing Upsell Alternative (Estimate):</span>
                <span className={styles.resultValueSuccess}>+{formatCurrency(upsellingNetProfit)} gross profit / mo</span>
              </div>
            </div>

            <div className={styles.analysisBox}>
              <div className={styles.analysisTitle}>The Economic Picture:</div>
              <p className={styles.analysisNote}>
                On your inputs, a {serviceChargeRate}% service charge leads to <strong>{refusedTablesCount} disputed bills</strong> a month
                and about {totalDisputeHours} hours of staff time spent on them. If {pairingTakeUpPct}% of tables added a{" "}
                {formatCurrency(pairingPrice)} pairing (the kind Knomi Host suggests inside the menu), that would be an estimated
                <strong> {formatCurrency(upsellingNetProfit)} in extra gross profit</strong> a month, with nothing to dispute.
                These are estimates from your inputs, not a promised result.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Food &amp; Beverage Sales</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlyRevenue)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={300000}
                max={4000000}
                step={50000}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Total dine-in and counter food sales.</span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Transparent Menu Price Adjustment</label>
              <select
                className={styles.selectInput}
                value={menuUpliftPercent}
                onChange={(e) => setMenuUpliftPercent(Number(e.target.value))}
              >
                <option value={5}>+5% Menu Price Adjustment</option>
                <option value={7.5}>+7.5% Menu Price Adjustment (Recommended)</option>
                <option value={10}>+10% Full Service Charge Roll-In</option>
              </select>
              <span className={styles.inputHint}>
                Baking staff welfare directly into all-inclusive printed menu prices.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Share Allocated to Staff Incentive Pool</span>
                <span className={styles.inputValueDisplay}>{staffPoolShare}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={40}
                max={100}
                step={5}
                value={staffPoolShare}
                onChange={(e) => setStaffPoolShare(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Portion of menu price uplift distributed directly to staff.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Total Team Size (Kitchen + Service)</span>
                <span className={styles.inputValueDisplay}>{staffCount} employees</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={4}
                max={50}
                step={1}
                value={staffCount}
                onChange={(e) => setStaffCount(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Full-time employees sharing the transparent welfare pool.</span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>The Transparent Welfare Pool Model</div>
              <span className={`${styles.statusBadge} ${styles.badgeExempt}`}>
                All-Inclusive Pricing
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Monthly Incremental Revenue:</span>
                <span className={styles.resultValueSuccess}>+{formatCurrency(additionalRevenueFromMenu)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Total Staff Incentive Pool:</span>
                <span className={styles.resultValue}>{formatCurrency(totalStaffIncentivePool)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Retained by Restaurant (Margin):</span>
                <span className={styles.resultValue}>
                  {formatCurrency(additionalRevenueFromMenu - totalStaffIncentivePool)} / mo
                </span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Estimated Monthly Bonus / Employee:</span>
                <span className={styles.resultValueSuccess}>+{formatCurrency(perStaffMonthlyBonus)} / month</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Customer Disputes at Counter:</span>
                <span className={styles.resultValueSuccess}>No service charge line to dispute</span>
              </div>
            </div>

            <div className={styles.analysisBox}>
              <div className={styles.analysisTitle}>Strategic HR &amp; Legal Advantage:</div>
              <p className={styles.analysisNote}>
                By replacing a service charge line with a transparent {menuUpliftPercent}% menu adjustment, and assuming your sales
                volume holds, each staff member would receive an estimated <strong>{formatCurrency(perStaffMonthlyBonus)} monthly bonus</strong>.
                You stay within the CCPA guidelines and remove the service charge argument from the checkout counter.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
