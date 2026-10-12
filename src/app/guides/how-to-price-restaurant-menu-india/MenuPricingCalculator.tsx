"use client";

import React, { useState } from "react";
import styles from "./MenuPricingGuide.module.css";

export default function MenuPricingCalculator() {
  const [rawCost, setRawCost] = useState<number>(75);
  const [targetFoodCostPct, setTargetFoodCostPct] = useState<number>(30);
  const [prepShrinkagePct, setPrepShrinkagePct] = useState<number>(10);
  const [packCost, setPackCost] = useState<number>(12);
  const [aggCommissionPct, setAggCommissionPct] = useState<number>(22);
  const [fundedDiscountPct, setFundedDiscountPct] = useState<number>(15);

  // Effective ingredient cost with yield shrinkage
  const effectiveCost = rawCost * (1 + prepShrinkagePct / 100);

  // Baseline mathematical Dine-In price
  const rawDineIn = effectiveCost / (targetFoodCostPct / 100);

  // Psychological charm rounding: round up to nearest clean ending (e.g. ₹289 or ₹295)
  const roundToCharm = (price: number): number => {
    const tens = Math.ceil(price / 10) * 10;
    // Check if ending in 9 makes sense, or 5
    if (tens - price <= 2) {
      return tens - 1; // e.g., 280 -> 279
    }
    return Math.ceil(price / 5) * 5; // e.g., 285
  };

  const dineInPrice = roundToCharm(rawDineIn);
  const dineInProfitRs = dineInPrice - effectiveCost;
  const dineInFoodCostActual = (effectiveCost / dineInPrice) * 100;

  // Swiggy / Zomato calculations if listed at the same Dine-In price
  const discountedPriceSame = dineInPrice * (1 - fundedDiscountPct / 100);
  const commAmountSame = discountedPriceSame * (aggCommissionPct / 100);
  const gstOnCommSame = commAmountSame * 0.18;
  const paymentFeeSame = discountedPriceSame * 0.0236; // 2% + 18% GST
  const tdsSame = discountedPriceSame * 0.001; // 0.1% TDS
  const netSettlementSame =
    discountedPriceSame - commAmountSame - gstOnCommSame - paymentFeeSame - tdsSame;
  const deliveryCogs = effectiveCost + packCost;
  const deliveryProfitSame = netSettlementSame - deliveryCogs;
  const deliveryFoodCostSame = (deliveryCogs / netSettlementSame) * 100;

  // Calculation to preserve the exact same rupee margin on Aggregators:
  // Target Net Settlement = dineInProfitRs + deliveryCogs
  const targetSettlement = dineInProfitRs + deliveryCogs;
  // Net settlement factor per rupee of listed price:
  const discountFactor = 1 - fundedDiscountPct / 100;
  const deductionRateOnDiscounted =
    (aggCommissionPct / 100) * 1.18 + 0.0236 + 0.001;
  const netFactor = discountFactor * (1 - deductionRateOnDiscounted);
  const idealAggPriceRaw = targetSettlement / netFactor;
  const recommendedAggPrice = roundToCharm(idealAggPriceRaw);
  const aggUpliftPct = Math.round(
    ((recommendedAggPrice - dineInPrice) / dineInPrice) * 100
  );
  // Actual figures at the rounded listing price (charm rounding can move it slightly).
  const optimizedSettlement = recommendedAggPrice * netFactor;
  const optimizedProfit = optimizedSettlement - deliveryCogs;

  const formatSignedRs = (value: number): string =>
    `${value < 0 ? "-" : "+"}₹${Math.abs(value).toFixed(1)}`;

  return (
    <section className={styles.calculatorSection} id="calculator">
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          Interactive Indian Menu Pricing & Aggregator Margin Simulator
        </h2>
        <p className={styles.calcDescription}>
          Enter your raw ingredient cost, target food cost percentage, portion shrinkage, and the
          aggregator terms in your own contract to estimate dine-in and delivery prices. Results are estimates.
        </p>
      </div>

      <div className={styles.calcLayout}>
        {/* Controls Panel */}
        <div className={styles.inputsPanel}>
          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Raw Ingredient Cost per Portion</label>
              <span className={styles.inputValue}>₹{rawCost}</span>
            </div>
            <input
              type="range"
              min={25}
              max={350}
              step={5}
              value={rawCost}
              onChange={(e) => setRawCost(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>₹25 (Sides / Starters)</span>
              <span>₹350 (Premium Platters)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Target Food Cost Percentage</label>
              <span className={styles.inputValue}>{targetFoodCostPct}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={42}
              step={1}
              value={targetFoodCostPct}
              onChange={(e) => setTargetFoodCostPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>20% (High Margin Drinks/Starters)</span>
              <span>42% (Heavy Proteins)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>
                Yield Shrinkage & Prep Waste (Trimming/Water Loss)
              </label>
              <span className={styles.inputValue}>{prepShrinkagePct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={prepShrinkagePct}
              onChange={(e) => setPrepShrinkagePct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>0% (Dry Goods)</span>
              <span>25% (Poultry / Seafood)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Delivery Packaging & Container Cost</label>
              <span className={styles.inputValue}>₹{packCost}</span>
            </div>
            <input
              type="range"
              min={0}
              max={35}
              step={1}
              value={packCost}
              onChange={(e) => setPackCost(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>₹0 (None)</span>
              <span>₹35 (Eco-Friendly Containers)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Aggregator Base Commission (Your Contract)</label>
              <span className={styles.inputValue}>{aggCommissionPct}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={35}
              step={1}
              value={aggCommissionPct}
              onChange={(e) => setAggCommissionPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>10%</span>
              <span>35%</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Restaurant-Funded In-App Discount</label>
              <span className={styles.inputValue}>{fundedDiscountPct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              step={5}
              value={fundedDiscountPct}
              onChange={(e) => setFundedDiscountPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>0% (No Discount)</span>
              <span>30% (Deep Offer)</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <span>Menu Pricing Estimates</span>
          </div>

          <div className={styles.resultCardHighlight}>
            <span className={styles.resultLabel}>Suggested Dine-In Menu Price</span>
            <span className={styles.resultValueGreen}>₹{dineInPrice}</span>
            <span className={styles.resultSub}>
              True raw cost: ₹{effectiveCost.toFixed(1)} (includes {prepShrinkagePct}% shrinkage).
              Yields ₹{dineInProfitRs.toFixed(1)} gross profit per plate ({dineInFoodCostActual.toFixed(1)}% food cost).
            </span>
          </div>

          <div className={styles.resultCardWarning}>
            <span className={styles.resultLabel}>
              The Single-Price Trap: If Listed on Apps at ₹{dineInPrice}
            </span>
            <span className={styles.resultValueWarning}>
              ₹{netSettlementSame.toFixed(1)} Net Payout
            </span>
            <span className={styles.resultSub}>
              After {fundedDiscountPct}% discount, commission, GST, packaging (₹{packCost}), and payment fees
              (assumed 2% + GST, plus 0.1% TDS): profit falls to {formatSignedRs(deliveryProfitSame)} and food cost rises to {deliveryFoodCostSame.toFixed(1)}%.
            </span>
          </div>

          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>
              Suggested Aggregator Listing Price (+{aggUpliftPct}%)
            </span>
            <span className={styles.resultValue}>₹{recommendedAggPrice}</span>
            <span className={styles.resultSub}>
              Estimated price that keeps roughly your ₹{dineInProfitRs.toFixed(1)} dine-in gross profit per plate after packaging and the delivery deductions above.
            </span>
          </div>

          <div className={styles.tableWrapper} style={{ margin: "8px 0 0" }}>
            <table className={styles.waterfallTable}>
              <thead>
                <tr>
                  <th>Channel</th>
                  <th>Menu Price</th>
                  <th>Net Payout</th>
                  <th>Gross Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Dine-In</strong></td>
                  <td>₹{dineInPrice}</td>
                  <td>₹{dineInPrice}</td>
                  <td><strong>+₹{dineInProfitRs.toFixed(1)}</strong></td>
                </tr>
                <tr>
                  <td>App (No Uplift)</td>
                  <td>₹{dineInPrice}</td>
                  <td>₹{netSettlementSame.toFixed(1)}</td>
                  <td style={{ color: "#a8402f" }}>
                    {formatSignedRs(deliveryProfitSame)}
                  </td>
                </tr>
                <tr className={styles.highlightRow}>
                  <td><strong>App (Optimized)</strong></td>
                  <td><strong>₹{recommendedAggPrice}</strong></td>
                  <td>₹{optimizedSettlement.toFixed(1)}</td>
                  <td style={{ color: "#3f7a52" }}>
                    <strong>{formatSignedRs(optimizedProfit)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
