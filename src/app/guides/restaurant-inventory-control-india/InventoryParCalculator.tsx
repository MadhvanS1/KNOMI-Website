"use client";

import React, { useState } from "react";
import styles from "./InventoryGuide.module.css";

export default function InventoryParCalculator() {
  const [activeTab, setActiveTab] = useState<"par" | "variance">("par");

  // Mode 1: Par Level & Reorder Optimizer State
  const [dailyUsage, setDailyUsage] = useState<number>(24);
  const [leadTimeDays, setLeadTimeDays] = useState<number>(2);
  const [safetyBufferPct, setSafetyBufferPct] = useState<number>(25);
  const [currentStock, setCurrentStock] = useState<number>(18);

  // Calculations for Mode 1
  const cycleStock = dailyUsage * leadTimeDays;
  const safetyStock = cycleStock * (safetyBufferPct / 100);
  const parLevel = Math.ceil(cycleStock + safetyStock);
  const reorderPoint = Math.ceil(dailyUsage * leadTimeDays + safetyStock * 0.5);
  const recommendedOrder = Math.max(0, parLevel - currentStock);

  // Mode 2: Weekly Sheet-to-Floor Variance Auditor State
  const [theoreticalUsage, setTheoreticalUsage] = useState<number>(54);
  const [actualUsage, setActualUsage] = useState<number>(62);
  const [commodityPrice, setCommodityPrice] = useState<number>(240);

  // Calculations for Mode 2
  const varianceKg = actualUsage - theoreticalUsage;
  const variancePct = theoreticalUsage > 0 ? (varianceKg / theoreticalUsage) * 100 : 0;
  const weeklyLeakRs = Math.max(0, varianceKg * commodityPrice);
  const annualLeakRs = weeklyLeakRs * 52;

  return (
    <section className={styles.calculatorSection} id="calculator">
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          Interactive Par Level & Kitchen Variance Auditor
        </h2>
        <p className={styles.calcDescription}>
          Simulate optimal reorder thresholds to prevent weekend 86-ing and spoilage, or quantify your
          weekly sheet-to-floor food cost leakage in Indian rupees.
        </p>

        {/* Tab Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("par")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "par" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "par" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "all 0.15s ease",
            }}
          >
            Mode 1: Par Level & Reorder Optimizer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("variance")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              border: "1px solid var(--color-whiskey-sour)",
              backgroundColor: activeTab === "variance" ? "var(--color-whiskey-sour)" : "transparent",
              color: activeTab === "variance" ? "#fbf8f3" : "var(--color-text-primary)",
              transition: "all 0.15s ease",
            }}
          >
            Mode 2: Sheet-to-Floor Variance Auditor
          </button>
        </div>
      </div>

      {activeTab === "par" ? (
        <div className={styles.calcLayout}>
          {/* Inputs Panel */}
          <div className={styles.inputsPanel}>
            {/* Daily Usage */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Average Daily Usage Rate</span>
                <span className={styles.inputValue}>{dailyUsage} kg / day</span>
              </div>
              <input
                type="range"
                min={2}
                max={150}
                step={1}
                value={dailyUsage}
                onChange={(e) => setDailyUsage(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>2 kg (Boutique Cafe)</span>
                <span>150 kg (High-Volume Biryani)</span>
              </div>
            </div>

            {/* Delivery Lead Time */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Supplier Lead Time (Days to Restock)</span>
                <span className={styles.inputValue}>
                  {leadTimeDays} {leadTimeDays === 1 ? "day" : "days"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>1 day (Daily Mandi / Local Kirana)</span>
                <span>7 days (Frozen Bulk / Specialty)</span>
              </div>
            </div>

            {/* Safety Buffer Stock */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Safety Buffer Stock (Weekend Surge & Delays)</span>
                <span className={styles.inputValue}>{safetyBufferPct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={safetyBufferPct}
                onChange={(e) => setSafetyBufferPct(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>0% (Just In Time)</span>
                <span>60% (High Weekend Variance)</span>
              </div>
            </div>

            {/* Current Physical Stock on Hand */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Current Counted Stock on Hand</span>
                <span className={styles.inputValue}>{currentStock} kg</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(100, parLevel * 1.5)}
                step={1}
                value={currentStock}
                onChange={(e) => setCurrentStock(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>0 kg (Empty Walk-in)</span>
                <span>{Math.round(Math.max(100, parLevel * 1.5))} kg (Fully Stocked)</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>Calculated Par & Purchase Order</div>

            <div className={styles.resultCardHighlight}>
              <span className={styles.resultLabel}>Target Minimum Par Level</span>
              <span className={styles.resultValue}>{parLevel} kg</span>
              <span className={styles.resultNote}>
                Base cycle requirement ({cycleStock} kg) plus {Math.round(safetyStock)} kg safety buffer
              </span>
            </div>

            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Reorder Trigger Point</span>
              <span className={styles.resultValue} style={{ fontSize: "1.4rem" }}>
                {reorderPoint} kg
              </span>
              <span className={styles.resultNote}>
                When stock dips to this level, dispatch WhatsApp PO immediately
              </span>
            </div>

            <div
              className={
                recommendedOrder > 0 ? styles.resultCardWarning : styles.resultCardSuccess
              }
            >
              <span className={styles.resultLabel}>Recommended Purchase Order</span>
              <span
                className={recommendedOrder > 0 ? styles.resultValueWarning : styles.resultValueGreen}
              >
                {recommendedOrder > 0 ? `${recommendedOrder} kg` : "0 kg (Stocked)"}
              </span>
              <span className={styles.resultNote}>
                {recommendedOrder > 0
                  ? `Order ${recommendedOrder} kg today to return walk-in to full par`
                  : "Current stock exceeds minimum par. No purchase required today."}
              </span>
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.5,
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: currentStock < reorderPoint ? "rgba(168, 64, 47, 0.1)" : "rgba(63, 122, 82, 0.1)",
                color: currentStock < reorderPoint ? "#a8402f" : "#3f7a52",
                fontWeight: 600,
              }}
            >
              {currentStock < safetyStock
                ? "CRITICAL ALERT: Current stock is below safety buffer! Extreme risk of running 86 on high-margin dishes tonight."
                : currentStock < reorderPoint
                ? "PO ACTION NEEDED: Stock has breached reorder threshold. Send PO to supplier before 4 PM cutoff."
                : "HEALTHY INVENTORY: Stock levels are well within safe operating limits."}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          {/* Mode 2: Inputs Panel */}
          <div className={styles.inputsPanel}>
            {/* Theoretical Usage */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Theoretical Recipe Usage (Sales x Portion)</span>
                <span className={styles.inputValue}>{theoreticalUsage} kg</span>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                step={2}
                value={theoreticalUsage}
                onChange={(e) => setTheoreticalUsage(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>10 kg (Light Prep Item)</span>
                <span>300 kg (High-Volume Core Item)</span>
              </div>
            </div>

            {/* Actual Usage */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Actual Physical Depletion (Opening + In - Close)</span>
                <span className={styles.inputValue}>{actualUsage} kg</span>
              </div>
              <input
                type="range"
                min={10}
                max={350}
                step={2}
                value={actualUsage}
                onChange={(e) => setActualUsage(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>10 kg (Matched Usage)</span>
                <span>350 kg (Severe Variance)</span>
              </div>
            </div>

            {/* Wholesale Commodity Price */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Raw Wholesale Cost per kg (INR)</span>
                <span className={styles.inputValue}>₹{commodityPrice} / kg</span>
              </div>
              <input
                type="range"
                min={40}
                max={1200}
                step={10}
                value={commodityPrice}
                onChange={(e) => setCommodityPrice(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.rangeLimits}>
                <span>₹40/kg (Potatoes / Mandi Veg)</span>
                <span>₹1,200/kg (Mutton / Premium Seafood)</span>
              </div>
            </div>

            <div className={styles.formulaCard} style={{ margin: "10px 0 0" }}>
              <div className={styles.formulaTitle}>Sheet-to-Floor Variance Formula</div>
              <div className={styles.formulaEquation} style={{ fontSize: "1.05rem" }}>
                Variance % = [(Actual kg - Theoretical kg) / Theoretical kg] x 100
              </div>
              <p className={styles.formulaNote}>
                Theoretical usage = Total dish covers sold multiplied by standardized recipe raw ingredient weight.
              </p>
            </div>
          </div>

          {/* Mode 2: Results Panel */}
          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>AvT Kitchen Variance & Loss Report</div>

            <div
              className={
                variancePct > 5
                  ? styles.resultCardWarning
                  : variancePct > 2.5
                  ? styles.resultCardHighlight
                  : styles.resultCardSuccess
              }
            >
              <span className={styles.resultLabel}>Unaccounted Variance Gap</span>
              <span
                className={
                  variancePct > 5
                    ? styles.resultValueWarning
                    : variancePct > 2.5
                    ? styles.resultValue
                    : styles.resultValueGreen
                }
              >
                {varianceKg > 0 ? `+${varianceKg.toFixed(1)} kg` : `${varianceKg.toFixed(1)} kg`} ({variancePct.toFixed(1)}%)
              </span>
              <span className={styles.resultNote}>
                {variancePct <= 2.5
                  ? "Within the suggested 2.5% starting tolerance for trim and moisture loss."
                  : variancePct <= 5
                  ? "Likely over-portioning or prep trim waste (2.5% to 5.0%)."
                  : "Serious kitchen leakage (above 5.0%). Audit the line this week."}
              </span>
            </div>

            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Estimated Weekly Rupee Drain (This Item Only)</span>
              <span className={styles.resultValue} style={{ fontSize: "1.5rem" }}>
                ₹{weeklyLeakRs.toLocaleString("en-IN")} / week
              </span>
              <span className={styles.resultNote}>
                Direct cash evaporating before reaching diner plates
              </span>
            </div>

            <div className={styles.resultCardHighlight}>
              <span className={styles.resultLabel}>Estimated Annualized Loss</span>
              <span className={styles.resultValue} style={{ color: "#a8402f" }}>
                ₹{annualLeakRs.toLocaleString("en-IN")} / year
              </span>
              <span className={styles.resultNote}>
                For this item alone, if the variance holds for 52 weeks. Repeat for each Category A item to see the full picture.
              </span>
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.5,
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor:
                  variancePct > 5
                    ? "rgba(168, 64, 47, 0.1)"
                    : variancePct > 2.5
                    ? "rgba(169, 71, 47, 0.1)"
                    : "rgba(63, 122, 82, 0.1)",
                color:
                  variancePct > 5
                    ? "#a8402f"
                    : variancePct > 2.5
                    ? "var(--color-whiskey-sour)"
                    : "#3f7a52",
                fontWeight: 600,
              }}
            >
              {variancePct > 5
                ? "ACTION REQUIRED: Over 5% variance points to unlogged batch spoilage, heavy ladle portioning, or staff unauthorized consumption. Conduct a Tuesday morning prep station weighing audit."
                : variancePct > 2.5
                ? "WATCHLIST: 2.5% to 5% variance represents minor over-portioning. Recalibrate prep portion ladles and check butcher yield cuts."
                : "IN CONTROL: Cooking yields and prep trimmings are in line with your standardized recipes."}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
