"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MarginGuide.module.css";
import { bookHref } from "@/content/site";

export default function MarginCalculator() {
  const [monthlySales, setMonthlySales] = useState<number>(1000000);
  const [foodCostPct, setFoodCostPct] = useState<number>(32);
  const [laborCostPct, setLaborCostPct] = useState<number>(22);
  const [rentPct, setRentPct] = useState<number>(12);
  const [aggregatorSharePct, setAggregatorSharePct] = useState<number>(40);
  const [aggregatorCutPct, setAggregatorCutPct] = useState<number>(30);
  // "What if" input: the user's own assumption
  const [dineInOrderLiftPct, setDineInOrderLiftPct] = useState<number>(10);

  // Financial Math Calculations
  const primeCostPct = foodCostPct + laborCostPct;
  const primeCostAmount = Math.round((monthlySales * primeCostPct) / 100);
  const rentAmount = Math.round((monthlySales * rentPct) / 100);
  // Other costs, as in the worked example: utilities (6%), marketing (4%), consumables (5%), software/licenses (3%), gateway (1%), depreciation (6%) = 25%
  const otherOpexAmount = Math.round((monthlySales * 25) / 100);

  // Scenario 1: All Direct Dine-In
  const totalBaseExpenses = primeCostAmount + rentAmount + otherOpexAmount;
  const dineInNetProfit = monthlySales - totalBaseExpenses;
  const dineInNetMarginPct = ((dineInNetProfit / monthlySales) * 100).toFixed(1);

  // Scenario 2: With Food Delivery Aggregators
  const aggregatorSalesVolume = Math.round((monthlySales * aggregatorSharePct) / 100);
  const aggregatorDeductionLoss = Math.round((aggregatorSalesVolume * aggregatorCutPct) / 100);
  const actualNetProfit = dineInNetProfit - aggregatorDeductionLoss;
  const actualNetMarginPct = ((actualNetProfit / monthlySales) * 100).toFixed(1);

  // Scenario 3 (estimate): the user's assumed lift in dine-in average order, before KNOMI's fee
  // (shared on the walkthrough call). Extra dine-in sales only add food cost; rent, labour and
  // other overheads stay the same.
  const dineInSales = monthlySales - aggregatorSalesVolume;
  const extraDineInSales = Math.round((dineInSales * dineInOrderLiftPct) / 100);
  const extraContribution = Math.round(extraDineInSales * (1 - foodCostPct / 100));
  const whatIfProfit = actualNetProfit + extraContribution;
  const whatIfMarginPct = ((whatIfProfit / (monthlySales + extraDineInSales)) * 100).toFixed(1);

  return (
    <div className={styles.calcContainer}>
      <div className={styles.calcGrid}>
        {/* Controls Column */}
        <div className={styles.controlsCol}>
          <div>
            <h3 className={styles.calcHeading}>Interactive P&L Simulator</h3>
            <p className={styles.calcSub}>
              Adjust your monthly metrics to see how Prime Cost, rent, and delivery aggregator cuts affect your bottom line.
              Other costs are held at 25% of sales, as in the worked example.
            </p>
          </div>

          {/* Slider 1: Monthly Gross Sales */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-sales" className={styles.inputLabel}>
                Monthly Sales (Gross Revenue)
              </label>
              <span className={styles.inputValueBadge}>
                ₹{(monthlySales / 100000).toFixed(1)} Lakhs
              </span>
            </div>
            <input
              id="input-sales"
              type="range"
              min={300000}
              max={3000000}
              step={50000}
              value={monthlySales}
              onChange={(e) => setMonthlySales(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>₹3 Lakhs (Small Cafe)</span>
              <span>₹10 Lakhs (Worked Example)</span>
              <span>₹30 Lakhs (High Volume)</span>
            </div>
          </div>

          {/* Slider 2: Food & Beverage Cost % */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-food" className={styles.inputLabel}>
                Food & Beverage Cost %
              </label>
              <span className={styles.inputValueBadge}>{foodCostPct}%</span>
            </div>
            <input
              id="input-food"
              type="range"
              min={24}
              max={42}
              step={1}
              value={foodCostPct}
              onChange={(e) => setFoodCostPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>24%</span>
              <span>32% (Worked Example)</span>
              <span>42%</span>
            </div>
          </div>

          {/* Slider 3: Labour Cost % */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-labor" className={styles.inputLabel}>
                Labour Cost % (Wages + Meals)
              </label>
              <span className={styles.inputValueBadge}>{laborCostPct}%</span>
            </div>
            <input
              id="input-labor"
              type="range"
              min={14}
              max={30}
              step={1}
              value={laborCostPct}
              onChange={(e) => setLaborCostPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>14%</span>
              <span>22% (Worked Example)</span>
              <span>30%</span>
            </div>
          </div>

          {/* Slider 4: Rent & CAM % */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-rent" className={styles.inputLabel}>
                Occupancy / Rent & CAM %
              </label>
              <span className={styles.inputValueBadge}>{rentPct}%</span>
            </div>
            <input
              id="input-rent"
              type="range"
              min={6}
              max={22}
              step={1}
              value={rentPct}
              onChange={(e) => setRentPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>6%</span>
              <span>12% (Worked Example)</span>
              <span>22%</span>
            </div>
          </div>

          {/* Slider 5: Delivery Aggregator Share % */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-agg-share" className={styles.inputLabel}>
                Delivery Aggregator Sales Share %
              </label>
              <span className={styles.inputValueBadge}>{aggregatorSharePct}%</span>
            </div>
            <input
              id="input-agg-share"
              type="range"
              min={0}
              max={70}
              step={5}
              value={aggregatorSharePct}
              onChange={(e) => setAggregatorSharePct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>0% (100% Dine-In)</span>
              <span>40% (Worked Example)</span>
              <span>70% (Delivery Heavy)</span>
            </div>
          </div>

          {/* Slider 6: Effective Aggregator Take % */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-agg-cut" className={styles.inputLabel}>
                Your Aggregator Take (Commission + GST + Discounts)
              </label>
              <span className={styles.inputValueBadge}>{aggregatorCutPct}%</span>
            </div>
            <input
              id="input-agg-cut"
              type="range"
              min={10}
              max={40}
              step={1}
              value={aggregatorCutPct}
              onChange={(e) => setAggregatorCutPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>10%</span>
              <span>30% (Worked Example)</span>
              <span>40%</span>
            </div>
          </div>

          {/* Slider 7: What-if dine-in average order lift (user's assumption) */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-order-lift" className={styles.inputLabel}>
                What If: Dine-In Average Order Lift (Your Assumption)
              </label>
              <span className={styles.inputValueBadge}>+{dineInOrderLiftPct}%</span>
            </div>
            <input
              id="input-order-lift"
              type="range"
              min={0}
              max={30}
              step={1}
              value={dineInOrderLiftPct}
              onChange={(e) => setDineInOrderLiftPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>0%</span>
              <span>Your own estimate</span>
              <span>30%</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className={styles.resultsCol}>
          <div>
            <div className={styles.resultsHeader}>
              <h4 className={styles.resultsTitle}>P&L Breakdown & True Margin</h4>
              <p className={styles.resultsSubtitle}>
                Estimate based on ₹{monthlySales.toLocaleString("en-IN")} monthly gross revenue
              </p>
            </div>

            <div className={styles.resultsMetrics}>
              <div className={styles.metricRow}>
                <span className={styles.metricName}>Prime Cost (Food + Labour):</span>
                <span className={styles.metricVal}>
                  {primeCostPct}% (₹{primeCostAmount.toLocaleString("en-IN")})
                </span>
              </div>

              <div className={styles.metricRow}>
                <span className={styles.metricName}>Rent & Occupancy:</span>
                <span className={styles.metricVal}>
                  {rentPct}% (₹{rentAmount.toLocaleString("en-IN")})
                </span>
              </div>

              <div className={styles.metricRow}>
                <span className={styles.metricName}>All Dine-In Baseline Margin:</span>
                <span className={styles.metricVal} style={{ color: "var(--color-honey-garlic)" }}>
                  {dineInNetMarginPct}% (₹{dineInNetProfit.toLocaleString("en-IN")})
                </span>
              </div>

              <div className={styles.metricRow}>
                <span className={styles.metricName}>Monthly Aggregator Deductions:</span>
                <span className={styles.metricVal} style={{ color: "#a8402f" }}>
                  -₹{aggregatorDeductionLoss.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Current Net Profit Result */}
              <div className={actualNetProfit >= 0 ? styles.highlightMetric : styles.lossMetric}>
                <span className={styles.metricName}>
                  {actualNetProfit >= 0 ? "Estimated Current Net Profit:" : "Estimated Current Monthly Loss:"}
                </span>
                <div className={styles.metricVal}>
                  {actualNetMarginPct}% (₹{actualNetProfit.toLocaleString("en-IN")}/mo)
                </div>
              </div>

              {/* What-if with the user's assumed dine-in lift, before KNOMI's fee */}
              <div className={styles.gainMetric}>
                <span className={styles.metricName}>
                  What If: +{dineInOrderLiftPct}% Dine-In Average Order (Estimate)
                </span>
                <div className={styles.metricVal}>
                  {whatIfMarginPct}% (₹{whatIfProfit.toLocaleString("en-IN")}/mo)
                </div>
                <p style={{ fontSize: "0.8rem", color: "#2f5e3e", marginTop: "4px", marginBottom: 0 }}>
                  +₹{extraDineInSales.toLocaleString("en-IN")} in dine-in sales, or +₹{extraContribution.toLocaleString("en-IN")}/mo after
                  food cost. An estimate from your inputs, not a promised result.
                </p>
                <p style={{ fontSize: "0.8rem", color: "#2f5e3e", marginTop: "4px", marginBottom: 0 }}>
                  Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.calcCta}>
            <Link href={bookHref} className="btn btn--primary btn--large" style={{ width: "100%" }}>
              Book a walkthrough
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
