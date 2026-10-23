"use client";

import React, { useState } from "react";
import styles from "./FoodCostGuide.module.css";

export default function FoodCostCalculator() {
  const [activeTab, setActiveTab] = useState<"period" | "dish">("period");

  // Tab 1: Period Food Cost & Variance Simulator
  const [sales, setSales] = useState<number>(1200000);
  const [openingStock, setOpeningStock] = useState<number>(180000);
  const [purchases, setPurchases] = useState<number>(420000);
  const [closingStock, setClosingStock] = useState<number>(160000);
  const [targetCostPct, setTargetCostPct] = useState<number>(29);

  // Math for Period check
  const actualCogs = openingStock + purchases - closingStock;
  const actualCostPct = (actualCogs / sales) * 100;
  const theoreticalCogs = sales * (targetCostPct / 100);
  const variancePct = actualCostPct - targetCostPct;
  const monthlyLeakRs = Math.max(0, actualCogs - theoreticalCogs);
  const annualLeakRs = monthlyLeakRs * 12;

  // Tab 2: Single Dish Cost Calculator
  const [rawCost, setRawCost] = useState<number>(75);
  const [menuPrice, setMenuPrice] = useState<number>(260);
  const [shrinkagePct, setShrinkagePct] = useState<number>(10);

  // Math for Single Dish
  const effectiveCost = rawCost * (1 + shrinkagePct / 100);
  const dishCostPct = (effectiveCost / menuPrice) * 100;
  const dishProfitRs = menuPrice - effectiveCost;

  return (
    <section className={styles.calculatorSection} id="calculator">
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          Interactive Food Cost & Margin Leak Calculator
        </h2>
        <p className={styles.calcDescription}>
          Estimate your monthly kitchen Cost of Goods Sold (COGS), the gap between actual and theoretical
          food cost, or the food cost percentage of a single dish, using your own numbers.
        </p>

        {/* Tab Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
          <button
            className="pressable"
            type="button"
            onClick={() => setActiveTab("period")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "period" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "period" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "background-color 150ms ease, color 150ms ease, var(--press-transition)",
            }}
          >
            1. Monthly Period COGS & Leakage Simulator
          </button>
          <button
            className="pressable"
            type="button"
            onClick={() => setActiveTab("dish")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "dish" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "dish" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "background-color 150ms ease, color 150ms ease, var(--press-transition)",
            }}
          >
            2. Single Dish Recipe Costing
          </button>
        </div>
      </div>

      {activeTab === "period" ? (
        <div className={styles.calcLayout}>
          {/* Period Inputs Panel */}
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Monthly Food Sales (Excl. Tax)</label>
                <span className={styles.inputValue}>₹{(sales / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input
                type="range"
                min={300000}
                max={3500000}
                step={50000}
                value={sales}
                onChange={(e) => setSales(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹3 Lakhs</span>
                <span>₹35 Lakhs</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Opening Inventory (Start of Month)</label>
                <span className={styles.inputValue}>₹{(openingStock / 1000).toFixed(0)}k</span>
              </div>
              <input
                type="range"
                min={50000}
                max={600000}
                step={10000}
                value={openingStock}
                onChange={(e) => setOpeningStock(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹50k</span>
                <span>₹6 Lakhs</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Total Procurement & Mandi Purchases</label>
                <span className={styles.inputValue}>₹{(purchases / 1000).toFixed(0)}k</span>
              </div>
              <input
                type="range"
                min={100000}
                max={1400000}
                step={20000}
                value={purchases}
                onChange={(e) => setPurchases(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹1 Lakh</span>
                <span>₹14 Lakhs</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Closing Inventory (Physical Stock Count)</label>
                <span className={styles.inputValue}>₹{(closingStock / 1000).toFixed(0)}k</span>
              </div>
              <input
                type="range"
                min={50000}
                max={600000}
                step={10000}
                value={closingStock}
                onChange={(e) => setClosingStock(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹50k</span>
                <span>₹6 Lakhs</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Target / Theoretical Menu Cost %</label>
                <span className={styles.inputValue}>{targetCostPct}%</span>
              </div>
              <input
                type="range"
                min={24}
                max={36}
                step={1}
                value={targetCostPct}
                onChange={(e) => setTargetCostPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>24% (Optimized)</span>
                <span>36% (Heavy Proteins)</span>
              </div>
            </div>
          </div>

          {/* Period Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <span>Kitchen Audit & Variance Estimate</span>
            </div>

            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Actual Cost of Goods Sold (COGS)</span>
              <span className={styles.resultValue}>₹{actualCogs.toLocaleString("en-IN")}</span>
              <span className={styles.resultSub}>
                Opening (₹{openingStock.toLocaleString("en-IN")}) + Purchases (₹{purchases.toLocaleString("en-IN")}) - Closing (₹{closingStock.toLocaleString("en-IN")}).
              </span>
            </div>

            <div className={variancePct > 2.5 ? styles.resultCardWarning : styles.resultCardHighlight}>
              <span className={styles.resultLabel}>Actual Kitchen Food Cost %</span>
              <span className={variancePct > 2.5 ? styles.resultValueWarning : styles.resultValueGreen}>
                {actualCostPct.toFixed(1)}%
              </span>
              <span className={styles.resultSub}>
                Your target menu design is {targetCostPct}%. Actual cost is running{" "}
                {variancePct > 0 ? `+${variancePct.toFixed(1)}% higher` : `${variancePct.toFixed(1)}% lower`}.
              </span>
            </div>

            <div className={variancePct > 2.0 ? styles.resultCardWarning : styles.resultCardHighlight}>
              <span className={styles.resultLabel}>Estimated Food Cost Leakage</span>
              <span className={variancePct > 2.0 ? styles.resultValueWarning : styles.resultValueGreen}>
                ₹{Math.round(monthlyLeakRs).toLocaleString("en-IN")} / month
              </span>
              <span className={styles.resultSub}>
                About <strong>₹{Math.round(annualLeakRs).toLocaleString("en-IN")} per year</strong> on your
                inputs: an estimate of what over-portioning, prep spoilage, unrecorded waste, and raw shrinkage may be costing you.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          {/* Dish Inputs Panel */}
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Raw Ingredient Procurement Cost</label>
                <span className={styles.inputValue}>₹{rawCost}</span>
              </div>
              <input
                type="range"
                min={20}
                max={350}
                step={5}
                value={rawCost}
                onChange={(e) => setRawCost(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹20 (Appetizers/Sides)</span>
                <span>₹350 (Heavy Seafood/Platters)</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Menu Selling Price (Dine-In)</label>
                <span className={styles.inputValue}>₹{menuPrice}</span>
              </div>
              <input
                type="range"
                min={80}
                max={800}
                step={10}
                value={menuPrice}
                onChange={(e) => setMenuPrice(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹80</span>
                <span>₹800</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <label className={styles.inputLabel}>Cooking & Butchery Shrinkage Buffer</label>
                <span className={styles.inputValue}>{shrinkagePct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={shrinkagePct}
                onChange={(e) => setShrinkagePct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>0% (Dry Breads)</span>
                <span>25% (Poultry/Seafood)</span>
              </div>
            </div>
          </div>

          {/* Dish Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <span>Per-Plate Recipe Economics</span>
            </div>

            <div className={dishCostPct > 35 ? styles.resultCardWarning : styles.resultCardHighlight}>
              <span className={styles.resultLabel}>Dish Food Cost %</span>
              <span className={dishCostPct > 35 ? styles.resultValueWarning : styles.resultValueGreen}>
                {dishCostPct.toFixed(1)}%
              </span>
              <span className={styles.resultSub}>
                True cooked ingredient cost is ₹{effectiveCost.toFixed(1)} (includes {shrinkagePct}% shrinkage).
                {dishCostPct > 35
                  ? " High food cost! Consider standardizing portions or testing charm price points."
                  : " Below the 35% alert line used in this calculator."}
              </span>
            </div>

            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Gross Profit per Plate</span>
              <span className={styles.resultValueGreen}>₹{dishProfitRs.toFixed(1)}</span>
              <span className={styles.resultSub}>
                Rupees contributed to cover kitchen payroll, rent, power, and net operational profit.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
