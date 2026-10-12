"use client";

import { useState } from "react";
import { bookHref, pricing } from "@/content/site";
import styles from "./BreakEvenGuide.module.css";

// KNOMI Signature plan, per table per month (source: content/site.ts, KNOMI Brain §2).
const SIGNATURE_PRICE = pricing.plans.find((plan) => plan.id === "signature")?.priceMin ?? 250;

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<number>(440000);
  const [variableCostPct, setVariableCostPct] = useState<number>(42);
  const [guestSpend, setGuestSpend] = useState<number>(650);
  const [desiredProfit, setDesiredProfit] = useState<number>(150000);
  const [openDays, setOpenDays] = useState<number>(30);
  // What-if inputs: the user's own assumptions, not KNOMI results.
  const [tables, setTables] = useState<number>(15);
  const [spendLiftPct, setSpendLiftPct] = useState<number>(25);

  // Core Cost-Volume-Profit Math
  const contributionMarginRatio = (100 - variableCostPct) / 100;
  const breakEvenSalesMonthly = Math.round(fixedCosts / contributionMarginRatio);
  const breakEvenSalesDaily = Math.round(breakEvenSalesMonthly / openDays);
  const dailyGuestsNeeded = Math.ceil(breakEvenSalesDaily / guestSpend);

  // Target Sales for Desired Profit
  const targetSalesMonthly = Math.round((fixedCosts + desiredProfit) / contributionMarginRatio);
  const dailyTargetSales = Math.round(targetSalesMonthly / openDays);
  const dailyTargetGuests = Math.ceil(dailyTargetSales / guestSpend);

  // What-if scenario (estimate): add the KNOMI Signature fee to fixed costs, and apply the
  // user's own assumed lift in average spend per guest. KNOMI's +25% is a target, not a guarantee.
  const knomiMonthlyFee = tables * SIGNATURE_PRICE;
  const scenarioFixedCosts = fixedCosts + knomiMonthlyFee;
  const scenarioBreakEvenMonthly = Math.round(scenarioFixedCosts / contributionMarginRatio);
  const scenarioGuestSpend = guestSpend * (1 + spendLiftPct / 100);
  const scenarioDailyGuests = Math.ceil(scenarioBreakEvenMonthly / openDays / scenarioGuestSpend);

  return (
    <div className={styles.calcContainer}>
      <div className={styles.calcGrid}>
        {/* Controls Column */}
        <div className={styles.controlsCol}>
          <div>
            <h3 className={styles.calcHeading}>Interactive Break Even Simulator</h3>
            <p className={styles.calcSub}>
              Enter your monthly overhead and margin metrics to determine your survival baseline and daily guest target.
            </p>
          </div>

          {/* Slider 1: Total Monthly Fixed Costs */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-fixed" className={styles.inputLabel}>
                Total Monthly Fixed Costs (Rent + Salaries + Admin)
              </label>
              <span className={styles.inputValueBadge}>
                ₹{(fixedCosts / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            <input
              id="input-fixed"
              type="range"
              min={150000}
              max={1500000}
              step={10000}
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>₹1.5 Lakhs (Small Cafe)</span>
              <span>₹4.4 Lakhs (60-Seat Example)</span>
              <span>₹15 Lakhs (Prime Metro)</span>
            </div>
          </div>

          {/* Slider 2: Variable Cost % */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-variable" className={styles.inputLabel}>
                Variable Cost % (e.g. Food 30% + Packaging 4% + Aggregator 8%)
              </label>
              <span className={styles.inputValueBadge}>{variableCostPct}%</span>
            </div>
            <input
              id="input-variable"
              type="range"
              min={25}
              max={60}
              step={1}
              value={variableCostPct}
              onChange={(e) => setVariableCostPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>25% (High Margin Bar)</span>
              <span>42% (Worked Example)</span>
              <span>60% (Heavy Delivery Cut)</span>
            </div>
          </div>

          {/* Slider 3: Average Spend per Guest */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-spend" className={styles.inputLabel}>
                Average Spend per Guest (AOV)
              </label>
              <span className={styles.inputValueBadge}>₹{guestSpend}</span>
            </div>
            <input
              id="input-spend"
              type="range"
              min={250}
              max={2500}
              step={50}
              value={guestSpend}
              onChange={(e) => setGuestSpend(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>₹250 (QSR / Chai Cafe)</span>
              <span>₹650 (Worked Example)</span>
              <span>₹2,500 (Fine Dining / Brewery)</span>
            </div>
          </div>

          {/* Slider 4: Desired Monthly Profit */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-profit" className={styles.inputLabel}>
                Desired Monthly Operating Profit Target
              </label>
              <span className={styles.inputValueBadge}>
                ₹{(desiredProfit / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            <input
              id="input-profit"
              type="range"
              min={0}
              max={1000000}
              step={25000}
              value={desiredProfit}
              onChange={(e) => setDesiredProfit(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>₹0 (Pure Break Even)</span>
              <span>₹1.5 Lakhs (Worked Example)</span>
              <span>₹10 Lakhs (High Volume)</span>
            </div>
          </div>

          {/* Slider 5: Open Days per Month */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-days" className={styles.inputLabel}>
                Operating Days per Month
              </label>
              <span className={styles.inputValueBadge}>{openDays} Days</span>
            </div>
            <input
              id="input-days"
              type="range"
              min={24}
              max={30}
              step={1}
              value={openDays}
              onChange={(e) => setOpenDays(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>24 Days</span>
              <span>26 Days (Closed Mondays)</span>
              <span>30 Days (Open Daily)</span>
            </div>
          </div>

          {/* What-if inputs: user assumptions */}
          <div>
            <h3 className={styles.calcHeading}>What-If: Your KNOMI Assumptions</h3>
            <p className={styles.calcSub}>
              Optional. Adds the KNOMI Signature fee (₹{SIGNATURE_PRICE} per table, per month) to your fixed costs
              and applies the spend lift you choose. These are your assumptions, not KNOMI results.
            </p>
          </div>

          {/* Slider 6: Tables (for the subscription fee) */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-tables" className={styles.inputLabel}>
                Number of Tables (for the KNOMI Fee)
              </label>
              <span className={styles.inputValueBadge}>{tables} Tables</span>
            </div>
            <input
              id="input-tables"
              type="range"
              min={4}
              max={60}
              step={1}
              value={tables}
              onChange={(e) => setTables(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>4 Tables</span>
              <span>₹{knomiMonthlyFee.toLocaleString("en-IN")}/mo Fee</span>
              <span>60 Tables</span>
            </div>
          </div>

          {/* Slider 7: Assumed lift in average spend */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-lift" className={styles.inputLabel}>
                Lift in Average Spend per Guest (Your Assumption)
              </label>
              <span className={styles.inputValueBadge}>+{spendLiftPct}%</span>
            </div>
            <input
              id="input-lift"
              type="range"
              min={0}
              max={40}
              step={1}
              value={spendLiftPct}
              onChange={(e) => setSpendLiftPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>0% (No Change)</span>
              <span>25% (KNOMI&apos;s Target, Not a Guarantee)</span>
              <span>40%</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className={styles.resultsCol}>
          <div>
            <div className={styles.resultsHeader}>
              <h4 className={styles.resultsTitle}>Break Even Targets</h4>
              <p className={styles.resultsSubtitle}>
                Contribution Margin Ratio: {(contributionMarginRatio * 100).toFixed(0)}%
              </p>
            </div>

            <div className={styles.resultsMetrics}>
              <div className={styles.metricRow}>
                <span className={styles.metricName}>Monthly Break Even Sales:</span>
                <span className={styles.metricVal} style={{ color: "var(--color-honey-garlic)" }}>
                  ₹{breakEvenSalesMonthly.toLocaleString("en-IN")}
                </span>
              </div>

              <div className={styles.metricRow}>
                <span className={styles.metricName}>Daily Break Even Sales ({openDays} Days):</span>
                <span className={styles.metricVal}>
                  ₹{breakEvenSalesDaily.toLocaleString("en-IN")}/day
                </span>
              </div>

              <div className={styles.metricRow}>
                <span className={styles.metricName}>Daily Guests Needed (at ₹{guestSpend}/cover):</span>
                <span className={styles.metricVal} style={{ color: "var(--color-whiskey-sour)" }}>
                  {dailyGuestsNeeded} Guests/Day
                </span>
              </div>

              {/* Profit Target Box */}
              {desiredProfit > 0 && (
                <div className={styles.highlightMetric}>
                  <span className={styles.metricName}>
                    Target Sales for ₹{(desiredProfit / 100000).toFixed(2)}L Profit:
                  </span>
                  <div className={styles.metricVal}>
                    ₹{targetSalesMonthly.toLocaleString("en-IN")}/mo
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "4px", marginBottom: 0 }}>
                    Requires ₹{dailyTargetSales.toLocaleString("en-IN")}/day or {dailyTargetGuests} covers daily.
                  </p>
                </div>
              )}

              {/* What-if estimate with the user's assumptions */}
              <div className={styles.gainMetric}>
                <span className={styles.metricName}>
                  What-If Estimate (Incl. ₹{knomiMonthlyFee.toLocaleString("en-IN")}/mo KNOMI Fee):
                </span>
                <div className={styles.metricVal}>
                  {scenarioDailyGuests} Guests/Day
                </div>
                <p style={{ fontSize: "0.85rem", color: "#2f5e3e", marginTop: "4px", marginBottom: 0 }}>
                  Estimate: break-even sales of ₹{scenarioBreakEvenMonthly.toLocaleString("en-IN")}/month at
                  ₹{Math.round(scenarioGuestSpend).toLocaleString("en-IN")} average spend, versus {dailyGuestsNeeded} guests/day
                  today. Based on your assumptions, not a guaranteed result.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.calcCta}>
            <a href={bookHref} className="btn btn--primary btn--large" style={{ width: "100%" }}>
              Book a walkthrough
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
