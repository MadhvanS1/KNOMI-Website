"use client";

import React, { useState } from "react";
import styles from "./DiscountGuide.module.css";

export default function DiscountCalculator() {
  const [currentCovers, setCurrentCovers] = useState<number>(40);
  const [aov, setAov] = useState<number>(750);
  const [foodCostPct, setFoodCostPct] = useState<number>(32);
  const [discountPct, setDiscountPct] = useState<number>(20);
  // Upselling lift to compare: the user's own assumption, not a KNOMI figure.
  const [liftPct, setLiftPct] = useState<number>(15);

  // Math
  const grossMarginPct = 100 - foodCostPct;
  const foodCostPerCover = aov * (foodCostPct / 100);
  const currentProfitPerCover = aov - foodCostPerCover;
  const currentTotalProfit = currentCovers * currentProfitPerCover;

  // Discounted scenario
  const discountedAov = aov * (1 - discountPct / 100);
  const discountedProfitPerCover = discountedAov - foodCostPerCover;
  const effectiveFoodCostPct = (foodCostPerCover / discountedAov) * 100;

  // Break-even requirements
  const isLossMaking = discountedProfitPerCover <= 0;
  const requiredCovers = isLossMaking
    ? 0
    : Math.ceil(currentTotalProfit / discountedProfitPerCover);
  const extraCoversNeeded = isLossMaking ? 0 : Math.max(0, requiredCovers - currentCovers);
  const volumeIncreasePct = isLossMaking
    ? 999
    : ((discountPct / (grossMarginPct - discountPct)) * 100);
  const extraFoodSpend = extraCoversNeeded * foodCostPerCover;

  // Upselling scenario: the user's assumed lift on the same covers (estimate)
  const upAov = aov * (1 + liftPct / 100);
  const upProfitPerCover = upAov * (1 - foodCostPct / 100);
  const upTotalProfit = currentCovers * upProfitPerCover;
  const aovGainRs = upTotalProfit - currentTotalProfit;

  return (
    <section className={styles.calculatorSection} id="calculator">
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          Interactive Restaurant Discount & Volume Trap Simulator
        </h2>
        <p className={styles.calcDescription}>
          Enter your slow-day covers, average guest spend (AOV), and food cost to calculate the
          volume increase required to break even on a discount, and compare it with an upselling estimate.
        </p>
      </div>

      <div className={styles.calcLayout}>
        {/* Inputs Panel */}
        <div className={styles.inputsPanel}>
          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Current Covers on Slow Day</label>
              <span className={styles.inputValue}>{currentCovers} covers</span>
            </div>
            <input
              type="range"
              min={15}
              max={150}
              step={5}
              value={currentCovers}
              onChange={(e) => setCurrentCovers(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>15 covers</span>
              <span>150 covers</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Average Order Value (AOV per Guest)</label>
              <span className={styles.inputValue}>₹{aov}</span>
            </div>
            <input
              type="range"
              min={300}
              max={2500}
              step={50}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>₹300 (Cafe/Fast Casual)</span>
              <span>₹2,500 (Premium Dining)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Food Cost Percentage</label>
              <span className={styles.inputValue}>{foodCostPct}%</span>
            </div>
            <input
              type="range"
              min={24}
              max={40}
              step={1}
              value={foodCostPct}
              onChange={(e) => setFoodCostPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>24% (High Margin Menu)</span>
              <span>40% (Protein Heavy)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Proposed Promotional Discount</label>
              <span className={styles.inputValue}>{discountPct}% Off</span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={5}
              value={discountPct}
              onChange={(e) => setDiscountPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>5% (Minor Perk)</span>
              <span>35% (Aggressive Deal)</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelRow}>
              <label className={styles.inputLabel}>Upselling Lift to Compare (Your Assumption)</label>
              <span className={styles.inputValue}>+{liftPct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={liftPct}
              onChange={(e) => setLiftPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>0%</span>
              <span>30%</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <span>Break-Even Volume Arithmetic</span>
          </div>

          <div className={volumeIncreasePct > 35 ? styles.resultCardWarning : styles.resultCardHighlight}>
            <span className={styles.resultLabel}>Required Traffic Surge to Break Even</span>
            <span className={volumeIncreasePct > 35 ? styles.resultValueWarning : styles.resultValue}>
              +{volumeIncreasePct.toFixed(1)}% More Covers
            </span>
            <span className={styles.resultSub}>
              You must seat <strong>{requiredCovers} covers (+{extraCoversNeeded} additional guests)</strong> on
              a quiet shift just to match the ₹{Math.round(currentTotalProfit).toLocaleString("en-IN")} gross profit you already made!
            </span>
          </div>

          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Margin Compression per Cover</span>
            <span className={styles.resultValue}>
              ₹{currentProfitPerCover.toFixed(0)} → ₹{discountedProfitPerCover.toFixed(0)}
            </span>
            <span className={styles.resultSub}>
              Food cost jumps from {foodCostPct}% to {effectiveFoodCostPct.toFixed(1)}% because raw ingredient costs (₹{foodCostPerCover.toFixed(0)}) remain completely unchanged.
            </span>
          </div>

          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Extra Kitchen Cash Burned</span>
            <span className={styles.resultValueWarning}>
              +₹{Math.round(extraFoodSpend).toLocaleString("en-IN")}
            </span>
            <span className={styles.resultSub}>
              Extra wholesale procurement cash spent cooking for {extraCoversNeeded} additional guests without earning a single rupee in extra net profit.
            </span>
          </div>

          <div className={styles.resultCardHighlight}>
            <span className={styles.resultLabel}>The Upselling Alternative: +{liftPct}% Average Spend (Estimate)</span>
            <span className={styles.resultValueGreen}>
              +₹{Math.round(aovGainRs).toLocaleString("en-IN")} Gross Profit
            </span>
            <span className={styles.resultSub}>
              If average spend rose from ₹{aov} to ₹{Math.round(upAov)} on the same {currentCovers} covers, gross profit would rise by about this much at your food cost, with no extra covers to serve. An estimate from your assumption, not a result.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
