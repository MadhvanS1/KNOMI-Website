"use client";

import React, { useState } from "react";
import styles from "./PayoutGuide.module.css";

export default function PayoutReconciliationAuditor() {
  const [activeTab, setActiveTab] = useState<"auditor" | "cashflow">("auditor");

  // Mode 1: Weekly Settlement Discrepancy Auditor State
  const [posGrossSales, setPosGrossSales] = useState<number>(120000);
  const [platformGmv, setPlatformGmv] = useState<number>(118200);
  const [contractTakeRatePct, setContractTakeRatePct] = useState<number>(24);
  const [customerRefunds, setCustomerRefunds] = useState<number>(3400);
  const [adSpend, setAdSpend] = useState<number>(4500);
  const [actualBankCredit, setActualBankCredit] = useState<number>(78500);

  // Calculations for Mode 1
  const posMislatch = posGrossSales - platformGmv;
  const contractualTake = platformGmv * (contractTakeRatePct / 100);
  const theoreticalPayout = Math.max(
    0,
    platformGmv - contractualTake - customerRefunds - adSpend
  );
  const unexplainedLeakage = theoreticalPayout - actualBankCredit;
  const leakagePct = theoreticalPayout > 0 ? (unexplainedLeakage / theoreticalPayout) * 100 : 0;

  // Mode 2: Daily vs Weekly Cashflow Buffer State (all values are the user's own inputs/assumptions)
  const [weeklyGmv, setWeeklyGmv] = useState<number>(150000);
  const [netPayoutPct, setNetPayoutPct] = useState<number>(65);
  const [dailyCashOutflow, setDailyCashOutflow] = useState<number>(9000);
  const [floatDays, setFloatDays] = useState<number>(10);

  // Calculations for Mode 2 (estimates)
  const netWeeklyPayoutEst = weeklyGmv * (netPayoutPct / 100);
  const dailyRollingPayoutEst = netWeeklyPayoutEst / 7;
  // Cash you fund yourself before the first weekly credit for those orders lands.
  const selfFundedFloat = dailyCashOutflow * floatDays;

  return (
    <section className={styles.calculatorSection} id="calculator">
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          Interactive Settlement Reconciliation & Dispute Auditor
        </h2>
        <p className={styles.calcDescription}>
          Audit your weekly Zomato and Swiggy NEFT bank credits against your internal POS ledger,
          or model your working capital float between daily rolling payouts and weekly batch cycles.
        </p>

        {/* Tab Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
          <button
            className="pressable"
            type="button"
            onClick={() => setActiveTab("auditor")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "auditor" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "auditor" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "background-color 150ms ease, color 150ms ease, var(--press-transition)",
            }}
          >
            Mode 1: Weekly Settlement Discrepancy Auditor
          </button>
          <button
            className="pressable"
            type="button"
            onClick={() => setActiveTab("cashflow")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "cashflow" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "cashflow" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "background-color 150ms ease, color 150ms ease, var(--press-transition)",
            }}
          >
            Mode 2: Daily vs Weekly Cashflow Simulator
          </button>
        </div>
      </div>

      {activeTab === "auditor" ? (
        <div className={styles.calcLayout}>
          {/* Inputs Panel */}
          <div className={styles.inputsPanel}>
            {/* POS Logged Sales */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Internal POS Gross Sales (This Cycle)</span>
                <span className={styles.inputValue}>₹{posGrossSales.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={400000}
                step={5000}
                value={posGrossSales}
                onChange={(e) => setPosGrossSales(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹20,000 (Small Cloud Kitchen)</span>
                <span>₹4,00,000 (High-Volume Multi-Brand)</span>
              </div>
            </div>

            {/* Platform Reported GMV */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Platform Reported Gross Order Value</span>
                <span className={styles.inputValue}>₹{platformGmv.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={400000}
                step={5000}
                value={platformGmv}
                onChange={(e) => setPlatformGmv(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>From Platform Merchant App</span>
                <span>Should match POS count</span>
              </div>
            </div>

            {/* Expected Blended Take Rate */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Contract Take Rate % (Commission + GST + PG)</span>
                <span className={styles.inputValue}>{contractTakeRatePct}%</span>
              </div>
              <input
                type="range"
                min={18}
                max={35}
                step={1}
                value={contractTakeRatePct}
                onChange={(e) => setContractTakeRatePct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>18%</span>
                <span>Use the blended rate from your agreement</span>
                <span>35%</span>
              </div>
            </div>

            {/* Customer Refunds & Penalties */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Customer Refunds & Spillage Clawbacks</span>
                <span className={styles.inputValue}>₹{customerRefunds.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={0}
                max={15000}
                step={200}
                value={customerRefunds}
                onChange={(e) => setCustomerRefunds(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹0 (Zero Complaints)</span>
                <span>₹15,000 (Heavy Dispute Week)</span>
              </div>
            </div>

            {/* Platform Ads Deductions */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Platform In-App Ads & CPC Deductions</span>
                <span className={styles.inputValue}>₹{adSpend.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={0}
                max={25000}
                step={500}
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹0 (Organic Reach)</span>
                <span>₹25,000 (Aggressive Bidding)</span>
              </div>
            </div>

            {/* Actual Bank NEFT Amount */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Actual Net Bank Credit Received (NEFT)</span>
                <span className={styles.inputValue}>₹{actualBankCredit.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={300000}
                step={2500}
                value={actualBankCredit}
                onChange={(e) => setActualBankCredit(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>From Bank Passbook / SMS</span>
                <span>Final net settlement credited</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>Settlement Reconciliation Audit</div>

            <div className={styles.waterfallCard}>
              <div className={styles.waterfallRow}>
                <span>Platform Reported GMV</span>
                <span>₹{platformGmv.toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.waterfallRow}>
                <span style={{ color: "#a8402f" }}>
                  Contract Take Rate ({contractTakeRatePct}%)
                </span>
                <span style={{ color: "#a8402f" }}>
                  -₹{Math.round(contractualTake).toLocaleString("en-IN")}
                </span>
              </div>
              {customerRefunds > 0 && (
                <div className={styles.waterfallRow}>
                  <span style={{ color: "#a8402f" }}>Refunds & Penalties</span>
                  <span style={{ color: "#a8402f" }}>
                    -₹{customerRefunds.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              {adSpend > 0 && (
                <div className={styles.waterfallRow}>
                  <span style={{ color: "#a8402f" }}>In-App Advertising Pre-Deduction</span>
                  <span style={{ color: "#a8402f" }}>
                    -₹{adSpend.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className={styles.waterfallRowBold}>
                <span>Estimated Expected Bank Payout</span>
                <span>₹{Math.round(theoreticalPayout).toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.waterfallRow}>
                <span>Actual NEFT Bank Credit</span>
                <span style={{ color: "var(--color-whiskey-sour)", fontWeight: 700 }}>
                  ₹{actualBankCredit.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div
              className={
                unexplainedLeakage > 1500
                  ? styles.resultCardWarning
                  : unexplainedLeakage > 300
                  ? styles.resultCardHighlight
                  : styles.resultCardSuccess
              }
            >
              <span className={styles.resultLabel}>Unexplained Difference (Estimate)</span>
              <span
                className={
                  unexplainedLeakage > 1500
                    ? styles.resultValueWarning
                    : unexplainedLeakage > 300
                    ? styles.resultValue
                    : styles.resultValueGreen
                }
              >
                {unexplainedLeakage > 0
                  ? `₹${Math.round(unexplainedLeakage).toLocaleString("en-IN")} Shortfall`
                  : `₹${Math.round(Math.abs(unexplainedLeakage)).toLocaleString("en-IN")} Surplus`}
              </span>
              <span className={styles.resultNote}>
                {unexplainedLeakage > 1500
                  ? `Large difference: about ${leakagePct.toFixed(1)}% of your estimated payout is unexplained. Check the order-level CSV and raise a dispute with evidence.`
                  : unexplainedLeakage > 300
                  ? "Minor difference: possibly timing on weekend cut-offs or round-off adjustments."
                  : "Clean reconciliation: the credit is within ₹300 of your estimate."}
              </span>
            </div>

            {posMislatch > 1000 && (
              <div
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  padding: "12px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(168, 64, 47, 0.1)",
                  color: "#a8402f",
                  fontWeight: 600,
                }}
              >
                POS MISMATCH: Your POS logged ₹{posGrossSales.toLocaleString("en-IN")} while the
                platform reported ₹{platformGmv.toLocaleString("en-IN")} (a ₹{posMislatch.toLocaleString("en-IN")} gap).
                Check for cancelled orders where food was prepared but not reflected in the platform statement.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          {/* Mode 2: Inputs Panel */}
          <div className={styles.inputsPanel}>
            {/* Weekly GMV */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Weekly Aggregator Delivery Sales (GMV)</span>
                <span className={styles.inputValue}>₹{weeklyGmv.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={30000}
                max={500000}
                step={10000}
                value={weeklyGmv}
                onChange={(e) => setWeeklyGmv(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹30,000 / week</span>
                <span>₹5,00,000 / week</span>
              </div>
            </div>

            {/* Net payout share (user assumption) */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Net Payout as % of GMV (Your Assumption)</span>
                <span className={styles.inputValue}>{netPayoutPct}%</span>
              </div>
              <input
                type="range"
                min={40}
                max={90}
                step={1}
                value={netPayoutPct}
                onChange={(e) => setNetPayoutPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>40%</span>
                <span>Take it from your own statements</span>
                <span>90%</span>
              </div>
            </div>

            {/* Daily Cash Outflows */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Daily Vendor & Mandi Cash Outflow</span>
                <span className={styles.inputValue}>₹{dailyCashOutflow.toLocaleString("en-IN")} / day</span>
              </div>
              <input
                type="range"
                min={2000}
                max={30000}
                step={1000}
                value={dailyCashOutflow}
                onChange={(e) => setDailyCashOutflow(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹2,000 / day</span>
                <span>₹30,000 / day</span>
              </div>
            </div>

            {/* Float days (user input) */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Days From Cycle Start to Weekly Credit</span>
                <span className={styles.inputValue}>{floatDays} days</span>
              </div>
              <input
                type="range"
                min={7}
                max={14}
                step={1}
                value={floatDays}
                onChange={(e) => setFloatDays(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>7 days</span>
                <span>Check your statement dates</span>
                <span>14 days</span>
              </div>
            </div>

            <div className={styles.formulaCard} style={{ margin: "10px 0 0" }}>
              <div className={styles.formulaTitle}>The Working Capital Float</div>
              <div className={styles.formulaEquation} style={{ fontSize: "1.05rem" }}>
                Cash to Float = Daily Outflow × Days Until the Weekly Credit
              </div>
              <p className={styles.formulaNote}>
                With weekly batch payouts, you fund mandi produce and staff wages yourself for several days
                before that week&apos;s delivery revenue reaches your bank.
              </p>
            </div>
          </div>

          {/* Mode 2: Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>Working Capital Float Comparison</div>

            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Estimated Weekly Net Cash Inflow</span>
              <span className={styles.resultValue}>
                ₹{Math.round(netWeeklyPayoutEst).toLocaleString("en-IN")}
              </span>
              <span className={styles.resultNote}>
                Estimated weekly net bank credit at {netPayoutPct}% of GMV (your assumption)
              </span>
            </div>

            <div className={styles.resultCardHighlight}>
              <span className={styles.resultLabel}>If Paid Daily (Where Eligible)</span>
              <span className={styles.resultValue} style={{ color: "#3f7a52" }}>
                ₹{Math.round(dailyRollingPayoutEst).toLocaleString("en-IN")} / day
              </span>
              <span className={styles.resultNote}>
                Estimated daily credit that would track daily mandi purchases. Eligibility is set by the
                platform; check your partner app.
              </span>
            </div>

            <div
              className={
                selfFundedFloat > 0 ? styles.resultCardWarning : styles.resultCardSuccess
              }
            >
              <span className={styles.resultLabel}>Self-Funded Float (Estimate)</span>
              <span
                className={
                  selfFundedFloat > 0 ? styles.resultValueWarning : styles.resultValueGreen
                }
              >
                ₹{Math.round(selfFundedFloat).toLocaleString("en-IN")}
              </span>
              <span className={styles.resultNote}>
                Working capital to keep in reserve to pay vendors before the weekly credit lands.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
