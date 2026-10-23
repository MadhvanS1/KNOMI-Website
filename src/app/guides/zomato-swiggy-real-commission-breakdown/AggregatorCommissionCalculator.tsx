"use client";

import React, { useState } from "react";
import styles from "./AggregatorGuide.module.css";

export default function AggregatorCommissionCalculator() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "monthly">("waterfall");

  // Mode 1: Single Order Settlement Waterfall State
  const [menuPrice, setMenuPrice] = useState<number>(500);
  const [commissionPct, setCommissionPct] = useState<number>(22);
  const [discountPct, setDiscountPct] = useState<number>(20);
  const [packagingCost, setPackagingCost] = useState<number>(15);
  const [foodCostPct, setFoodCostPct] = useState<number>(30);
  // Payment fees are the user's own contract terms / estimates, not built-in platform rates.
  const [pgFeePct, setPgFeePct] = useState<number>(1.84);
  const [directPaymentPct, setDirectPaymentPct] = useState<number>(1.0);

  // Calculations for Mode 1
  const discountAmount = menuPrice * (discountPct / 100);
  const netOrderValue = menuPrice - discountAmount;
  const commissionAmount = netOrderValue * (commissionPct / 100);
  const gstOnCommission = commissionAmount * 0.18;
  const paymentFee = netOrderValue * (pgFeePct / 100);
  const gstOnPaymentFee = paymentFee * 0.18;
  const totalPaymentFee = paymentFee + gstOnPaymentFee;
  const tdsSec194O = netOrderValue * 0.001;

  const netPayout = netOrderValue - commissionAmount - gstOnCommission - totalPaymentFee - tdsSec194O;
  const totalAggregatorDeductions = menuPrice - netPayout;
  const effectiveTakeRatePct = menuPrice > 0 ? (totalAggregatorDeductions / menuPrice) * 100 : 0;

  const rawFoodCost = menuPrice * (foodCostPct / 100);
  const aggregatorNetProfit = netPayout - rawFoodCost - packagingCost;

  // Dine-in direct comparison (zero commission, the user's direct payment cost, zero packaging)
  const dineInPgFee = menuPrice * (directPaymentPct / 100);
  const dineInNetProfit = menuPrice - dineInPgFee - rawFoodCost;
  const profitDifference = dineInNetProfit - aggregatorNetProfit;

  // Mode 2: Monthly Volume Leak Simulator State
  const [monthlyGmv, setMonthlyGmv] = useState<number>(600000);
  const [blendedTakeRate, setBlendedTakeRate] = useState<number>(34);
  const [conversionTargetPct, setConversionTargetPct] = useState<number>(25);

  // Calculations for Mode 2
  const monthlyAggregatorCut = monthlyGmv * (blendedTakeRate / 100);
  const annualAggregatorCut = monthlyAggregatorCut * 12;
  const monthlyConvertedVolume = monthlyGmv * (conversionTargetPct / 100);
  const monthlyRetainedCash = monthlyConvertedVolume * (Math.max(0, blendedTakeRate - directPaymentPct) / 100);
  const annualRetainedCash = monthlyRetainedCash * 12;

  return (
    <section className={styles.calculatorSection} id="calculator">
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          Interactive Zomato & Swiggy Net Payout Calculator
        </h2>
        <p className={styles.calcDescription}>
          Estimate the full deduction waterfall on an individual order, or what your restaurant pays
          aggregators in a year compared with direct-to-table dining, using your own contract terms.
        </p>

        {/* Tab Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
          <button
            className="pressable"
            type="button"
            onClick={() => setActiveTab("waterfall")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "waterfall" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "waterfall" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "background-color 150ms ease, color 150ms ease, var(--press-transition)",
            }}
          >
            Mode 1: Single Order Settlement Waterfall
          </button>
          <button
            className="pressable"
            type="button"
            onClick={() => setActiveTab("monthly")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "monthly" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "monthly" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "background-color 150ms ease, color 150ms ease, var(--press-transition)",
            }}
          >
            Mode 2: Monthly Storefront Volume Auditor
          </button>
        </div>
      </div>

      {activeTab === "waterfall" ? (
        <div className={styles.calcLayout}>
          {/* Inputs Panel */}
          <div className={styles.inputsPanel}>
            {/* Menu Price */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Listed Menu Price (Pre-Discount)</span>
                <span className={styles.inputValue}>₹{menuPrice}</span>
              </div>
              <input
                type="range"
                min={150}
                max={2000}
                step={25}
                value={menuPrice}
                onChange={(e) => setMenuPrice(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹150 (QSR Snack)</span>
                <span>₹2,000 (Family Platter)</span>
              </div>
            </div>

            {/* Agreed Headline Commission */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Agreed Contract Commission</span>
                <span className={styles.inputValue}>{commissionPct}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={35}
                step={1}
                value={commissionPct}
                onChange={(e) => setCommissionPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>10%</span>
                <span>35%</span>
              </div>
            </div>

            {/* Restaurant-Funded Discount */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Restaurant-Funded Discount</span>
                <span className={styles.inputValue}>{discountPct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={35}
                step={5}
                value={discountPct}
                onChange={(e) => setDiscountPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>0% (Full Price)</span>
                <span>35% (Deep Promo)</span>
              </div>
            </div>

            {/* Food Cost % */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Raw Ingredient Food Cost</span>
                <span className={styles.inputValue}>{foodCostPct}% of Menu Price</span>
              </div>
              <input
                type="range"
                min={20}
                max={40}
                step={1}
                value={foodCostPct}
                onChange={(e) => setFoodCostPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>20% (Veg / Breads)</span>
                <span>40% (Mutton / Seafood)</span>
              </div>
            </div>

            {/* Packaging Cost */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Packaging & Delivery Container Cost</span>
                <span className={styles.inputValue}>₹{packagingCost}</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={2}
                value={packagingCost}
                onChange={(e) => setPackagingCost(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹0 (Paper Pouch)</span>
                <span>₹40 (Sealed Containers & Bags)</span>
              </div>
            </div>

            {/* Payment Gateway Fee */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Aggregator Payment Fee (Your Contract)</span>
                <span className={styles.inputValue}>{pgFeePct.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={0.01}
                value={pgFeePct}
                onChange={(e) => setPgFeePct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>0%</span>
                <span>3% (plus 18% GST)</span>
              </div>
            </div>

            {/* Direct Payment Cost */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Your Direct Payment Cost on Dine-In (Your Estimate)</span>
                <span className={styles.inputValue}>{directPaymentPct.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={0.1}
                value={directPaymentPct}
                onChange={(e) => setDirectPaymentPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>0%</span>
                <span>3% (Card-Heavy)</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>Settlement Statement Waterfall</div>

            <div className={styles.waterfallCard}>
              <div className={styles.waterfallRow}>
                <span>Listed Menu Price</span>
                <span>₹{menuPrice.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className={styles.waterfallRow}>
                  <span style={{ color: "#a8402f" }}>
                    Funded Discount ({discountPct}%)
                  </span>
                  <span style={{ color: "#a8402f" }}>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.waterfallRowBold}>
                <span>Net Order Value (Commission Base)</span>
                <span>₹{netOrderValue.toFixed(2)}</span>
              </div>
              <div className={styles.waterfallRow}>
                <span style={{ color: "#a8402f" }}>
                  Platform Commission ({commissionPct}%)
                </span>
                <span style={{ color: "#a8402f" }}>-₹{commissionAmount.toFixed(2)}</span>
              </div>
              <div className={styles.waterfallRow}>
                <span style={{ color: "#a8402f" }}>
                  18% GST on Commission (No ITC)
                </span>
                <span style={{ color: "#a8402f" }}>-₹{gstOnCommission.toFixed(2)}</span>
              </div>
              <div className={styles.waterfallRow}>
                <span style={{ color: "#a8402f" }}>
                  Payment Gateway Fee + 18% GST
                </span>
                <span style={{ color: "#a8402f" }}>-₹{totalPaymentFee.toFixed(2)}</span>
              </div>
              <div className={styles.waterfallRow}>
                <span style={{ color: "#a8402f" }}>Section 194-O TDS (0.1%)</span>
                <span style={{ color: "#a8402f" }}>-₹{tdsSec194O.toFixed(2)}</span>
              </div>
              <div
                className={styles.waterfallRowBold}
                style={{ color: "var(--color-whiskey-sour)", fontSize: "1.05rem" }}
              >
                <span>Net Bank Settlement Received</span>
                <span>₹{netPayout.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.resultCardWarning}>
              <span className={styles.resultLabel}>Real Blended Take Rate</span>
              <span className={styles.resultValueWarning}>
                {effectiveTakeRatePct.toFixed(1)}% of Menu Price
              </span>
              <span className={styles.resultNote}>
                Headline commission was {commissionPct}%, but GST, payment fees, and funded discounts
                take the total to {effectiveTakeRatePct.toFixed(1)}% before kitchen overheads (estimate on your inputs).
              </span>
            </div>

            {/* Comparison Grid: Aggregator vs Direct Dine-in */}
            <div className={styles.comparisonGrid}>
              <div className={`${styles.comparisonBox} ${styles.comparisonBoxZomato}`}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#a8402f" }}>
                  Aggregator Net Profit
                </span>
                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#a8402f" }}>
                  ₹{aggregatorNetProfit.toFixed(1)}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  After food (₹{rawFoodCost.toFixed(0)}) & packaging (₹{packagingCost})
                </span>
              </div>

              <div className={`${styles.comparisonBox} ${styles.comparisonBoxKnomi}`}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#3f7a52" }}>
                  Direct Table Net Profit (Estimate)
                </span>
                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#3f7a52" }}>
                  ₹{dineInNetProfit.toFixed(1)}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  No commission, no packaging, {directPaymentPct.toFixed(1)}% payment cost
                </span>
              </div>
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.5,
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: "rgba(63, 122, 82, 0.1)",
                color: "#3f7a52",
                fontWeight: 600,
              }}
            >
              ESTIMATE: On these inputs, the same plate served in your own dining room leaves about ₹
              {profitDifference.toFixed(0)} more before overheads (
              {aggregatorNetProfit > 0 ? `${(dineInNetProfit / aggregatorNetProfit).toFixed(1)}x` : "far more than"} the aggregator
              figure).
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          {/* Mode 2: Inputs Panel */}
          <div className={styles.inputsPanel}>
            {/* Monthly Aggregator GMV */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Aggregator Sales (GMV)</span>
                <span className={styles.inputValue}>₹{(monthlyGmv / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input
                type="range"
                min={100000}
                max={2000000}
                step={50000}
                value={monthlyGmv}
                onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹1.0 Lakh (Small Kitchen)</span>
                <span>₹20.0 Lakhs (Multi-Cloud Brand)</span>
              </div>
            </div>

            {/* Real Blended Take Rate */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Real Blended Take Rate (From Statement)</span>
                <span className={styles.inputValue}>{blendedTakeRate}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={1}
                value={blendedTakeRate}
                onChange={(e) => setBlendedTakeRate(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Direct Dine-In Shift Target */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Sales Moved to Direct Channels (Your Assumption)</span>
                <span className={styles.inputValue}>{conversionTargetPct}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={conversionTargetPct}
                onChange={(e) => setConversionTargetPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>10% (Modest Floor Focus)</span>
                <span>50% (Strong Dine-In Shift)</span>
              </div>
            </div>

            <div className={styles.formulaCard} style={{ margin: "10px 0 0" }}>
              <div className={styles.formulaTitle}>The Channel Recapture Math</div>
              <div className={styles.formulaEquation} style={{ fontSize: "1.05rem" }}>
                Kept Cash = Moved Sales x (Take Rate - Your Direct Payment Cost)
              </div>
              <p className={styles.formulaNote}>
                Each rupee of sales moved from an aggregator to a direct channel (dine-in or your own pickup) keeps
                the deduction you would otherwise have paid, minus your own payment cost. Fixed costs of serving
                guests directly (for example KNOMI&apos;s fee, which we share on a walkthrough call) are not
                included, so treat the result as an estimate.
                Your direct payment cost ({directPaymentPct.toFixed(1)}%) is set in Mode 1.
              </p>
            </div>
          </div>

          {/* Mode 2: Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>Monthly Deductions & Direct-Channel Estimate</div>

            <div className={styles.resultCardWarning}>
              <span className={styles.resultLabel}>Monthly Cash Paid to Aggregators</span>
              <span className={styles.resultValueWarning}>
                ₹{Math.round(monthlyAggregatorCut).toLocaleString("en-IN")} / mo
              </span>
              <span className={styles.resultNote}>
                Over a year: ₹{Math.round(annualAggregatorCut).toLocaleString("en-IN")}
              </span>
            </div>

            <div className={styles.resultCardSuccess}>
              <span className={styles.resultLabel}>
                Estimated Cash Kept at {conversionTargetPct}% Direct Shift
              </span>
              <span className={styles.resultValueGreen}>
                +₹{Math.round(monthlyRetainedCash).toLocaleString("en-IN")} / mo
              </span>
              <span className={styles.resultNote}>
                Estimate on your assumptions, before the fixed costs of your direct channel
              </span>
            </div>

            <div className={styles.resultCardHighlight}>
              <span className={styles.resultLabel}>Estimated Annual Difference</span>
              <span className={styles.resultValue}>
                +₹{Math.round(annualRetainedCash).toLocaleString("en-IN")} / yr
              </span>
              <span className={styles.resultNote}>
                Arithmetic on your inputs, not a forecast of results
              </span>
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.5,
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: "rgba(169, 71, 47, 0.1)",
                color: "var(--color-whiskey-sour)",
                fontWeight: 600,
              }}
            >
              STRATEGIC RECOMMENDATION: Keep aggregators for what they do well, finding new customers, and keep
              guests already at your tables on a direct menu. KNOMI takes 0% commission on dine-in orders: what your
              guests order is yours.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
