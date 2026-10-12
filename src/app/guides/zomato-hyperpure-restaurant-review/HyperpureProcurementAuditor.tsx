"use client";

import React, { useState } from "react";
import styles from "./HyperpureGuide.module.css";

type Mode = "basket" | "concentration";

type CategoryType = "poultry" | "staples_oil" | "fresh_veggies" | "dairy_paneer" | "packaging";

export default function HyperpureProcurementAuditor() {
  const [activeMode, setActiveMode] = useState<Mode>("basket");

  // Mode 1: Basket Auditor State
  const [category, setCategory] = useState<CategoryType>("poultry");
  const [monthlySpendMandi, setMonthlySpendMandi] = useState<number>(120000);
  const [mandiWastagePercent, setMandiWastagePercent] = useState<number>(8);
  const [mandiLogisticsCost, setMandiLogisticsCost] = useState<number>(6000);
  // The user's own comparison of Hyperpure quotes vs mandi invoices (negative = Hyperpure cheaper).
  const [hyperpurePriceDelta, setHyperpurePriceDelta] = useState<number>(0);

  // Mode 2: Concentration Risk State
  const [monthlyGrossRevenue, setMonthlyGrossRevenue] = useState<number>(1200000);
  const [aggregatorSharePercent, setAggregatorSharePercent] = useState<number>(50);
  const [aggregatorTakeRate, setAggregatorTakeRate] = useState<number>(26);
  const [cogsPercent, setCogsPercent] = useState<number>(32);
  const [hyperpureProcurementShare, setHyperpureProcurementShare] = useState<number>(60);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Mode 1 Calculations
  const wastageShrinkageCost = Math.round(monthlySpendMandi * (mandiWastagePercent / 100));
  const totalTrueMandiCost = monthlySpendMandi + mandiLogisticsCost + wastageShrinkageCost;

  const hyperpureBaseRate = Math.round(monthlySpendMandi * (1 + hyperpurePriceDelta / 100));
  // The user's quote is expected to include any delivery fee and any drained-weight difference.
  const hyperpureDeliveredCost = hyperpureBaseRate;
  const netMonthlySavings = totalTrueMandiCost - hyperpureDeliveredCost;
  const savingsPercent = ((netMonthlySavings / totalTrueMandiCost) * 100).toFixed(1);

  // Mode 2 Calculations (Eternal Concentration Risk)
  const monthlyAggregatorSales = Math.round(monthlyGrossRevenue * (aggregatorSharePercent / 100));
  const monthlyAggregatorDeductions = Math.round(monthlyAggregatorSales * (aggregatorTakeRate / 100));

  const totalMonthlyCogs = Math.round(monthlyGrossRevenue * (cogsPercent / 100));
  const monthlyHyperpureSupplySpend = Math.round(totalMonthlyCogs * (hyperpureProcurementShare / 100));

  const totalEternalCashflow = monthlyAggregatorDeductions + monthlyHyperpureSupplySpend;
  const eternalControlPercent = ((totalEternalCashflow / monthlyGrossRevenue) * 100).toFixed(1);

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Hyperpure Procurement &amp; Concentration Risk Auditor</h3>
        <p className={styles.calcDescription}>
          Estimate true procurement costs (including mandi shrinkage &amp; early morning logistics) and how much of your cash flow runs through one corporate group (Eternal Limited), using your own numbers.
        </p>
      </div>

      <div className={styles.modeTabs}>
        <button
          type="button"
          className={`${styles.modeTab} ${activeMode === "basket" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("basket")}
        >
          1. Mandi vs Hyperpure Basket Auditor
        </button>
        <button
          type="button"
          className={`${styles.modeTab} ${activeMode === "concentration" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("concentration")}
        >
          2. Supplier Concentration Check
        </button>
      </div>

      {activeMode === "basket" ? (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Procurement Category</label>
              <select
                className={styles.selectInput}
                value={category}
                onChange={(e) => {
                  const val = e.target.value as CategoryType;
                  setCategory(val);
                  // Illustrative starting values for mandi-side wastage only; adjust to your kitchen.
                  if (val === "poultry") {
                    setMandiWastagePercent(8);
                  } else if (val === "packaging") {
                    setMandiWastagePercent(2);
                  } else if (val === "fresh_veggies") {
                    setMandiWastagePercent(12);
                  } else if (val === "staples_oil") {
                    setMandiWastagePercent(3);
                  } else {
                    setMandiWastagePercent(6);
                  }
                }}
              >
                <option value="poultry">Poultry &amp; Fresh Meat (Boneless Breast, Curry Cut)</option>
                <option value="packaging">Delivery Packaging (Boxes, Containers, Carry Bags)</option>
                <option value="staples_oil">Bulk Staples &amp; Cooking Oil (Rice, Atta, Oil, Spices)</option>
                <option value="dairy_paneer">Dairy &amp; Frozen Prep (Paneer, Cheese, Frozen Patties)</option>
                <option value="fresh_veggies">Fresh Vegetables &amp; Herbs (Onions, Tomatoes, Coriander)</option>
              </select>
              <span className={styles.inputHint}>
                The right supplier can differ between dry packaging and cold-chain produce. Wastage starts at an illustrative value; adjust it.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Category Spend (Wholesale Mandi)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlySpendMandi)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={20000}
                max={500000}
                step={10000}
                value={monthlySpendMandi}
                onChange={(e) => setMonthlySpendMandi(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Invoice value of goods bought directly from local suppliers.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Mandi Wastage, Trimming &amp; Shrinkage</span>
                <span className={styles.inputValueDisplay}>{mandiWastagePercent}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={20}
                step={1}
                value={mandiWastagePercent}
                onChange={(e) => setMandiWastagePercent(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Spoilage, sorting loss, blood weight loss, and damaged outer layers.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Mandi Travel &amp; Early Morning Logistics</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(mandiLogisticsCost)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={25000}
                step={1000}
                value={mandiLogisticsCost}
                onChange={(e) => setMandiLogisticsCost(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Auto-rickshaw/tempo rentals, fuel, driver tips, and staff overtime.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Hyperpure Price vs Mandi Rate</span>
                <span className={styles.inputValueDisplay}>
                  {hyperpurePriceDelta > 0 ? `+${hyperpurePriceDelta}%` : `${hyperpurePriceDelta}%`}
                </span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={-25}
                max={15}
                step={1}
                value={hyperpurePriceDelta}
                onChange={(e) => setHyperpurePriceDelta(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Your input: the difference between your Hyperpure quotes (including any delivery fee and any drained-weight or wastage difference) and your mandi invoices. Negative means Hyperpure is cheaper.</span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>Procurement Cost Comparison (Estimate)</div>
              <span
                className={`${styles.statusBadge} ${
                  netMonthlySavings >= 0 ? styles.badgeExempt : styles.badgeRequired
                }`}
              >
                {netMonthlySavings >= 0 ? `Net Saving: ${savingsPercent}%` : `Mandi Cheaper by ${Math.abs(Number(savingsPercent))}%`}
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Raw Mandi Goods Billing:</span>
                <span className={styles.resultValue}>{formatCurrency(monthlySpendMandi)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Shrinkage &amp; Spoilage Overhead:</span>
                <span className={styles.resultValueDanger}>+{formatCurrency(wastageShrinkageCost)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Logistics &amp; Travel Expenses:</span>
                <span className={styles.resultValueDanger}>+{formatCurrency(mandiLogisticsCost)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>True Landed Mandi Cost:</span>
                <span className={styles.resultValueHighlight}>{formatCurrency(totalTrueMandiCost)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Hyperpure Delivered Billing:</span>
                <span className={styles.resultValue}>{formatCurrency(hyperpureDeliveredCost)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Net Monthly Financial Delta:</span>
                <span
                  className={
                    netMonthlySavings >= 0 ? styles.resultValueSuccess : styles.resultValueDanger
                  }
                >
                  {netMonthlySavings >= 0
                    ? `Save ${formatCurrency(netMonthlySavings)} / mo`
                    : `Pay ${formatCurrency(Math.abs(netMonthlySavings))} extra / mo`}
                </span>
              </div>
            </div>

            <div className={styles.analysisBox}>
              <div className={styles.analysisTitle}>Category Operational Verdict:</div>
              <p className={styles.analysisNote}>
                {category === "packaging" || category === "staples_oil"
                  ? "LIKELY FIT FOR HYPERPURE: Dry goods and packaging carry little spoilage risk, and doorstep delivery saves your team the early-morning mandi run. Compare your own invoices."
                  : category === "poultry" || category === "dairy_paneer"
                  ? "CONDITIONAL: Compare on drained, usable weight rather than the listed rate, and check the temperature of every crate on arrival."
                  : "LOCAL MANDI PREFERRED: Fresh herbs, tomatoes, and leafy greens can suffer more transit damage in centralised delivery. Local vendors offer same-day negotiation and immediate replacements."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Total Monthly Restaurant Gross Sales</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlyGrossRevenue)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={300000}
                max={3000000}
                step={50000}
                value={monthlyGrossRevenue}
                onChange={(e) => setMonthlyGrossRevenue(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Total revenue across dine-in, takeaway, and delivery.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Zomato Delivery Share</span>
                <span className={styles.inputValueDisplay}>{aggregatorSharePercent}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={10}
                max={90}
                step={5}
                value={aggregatorSharePercent}
                onChange={(e) => setAggregatorSharePercent(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Portion of your total sales that comes through Zomato.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Blended Platform Take Rate</span>
                <span className={styles.inputValueDisplay}>{aggregatorTakeRate}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={10}
                max={45}
                step={1}
                value={aggregatorTakeRate}
                onChange={(e) => setAggregatorTakeRate(Number(e.target.value))}
              />
              <span className={styles.inputHint}>From your statement: commissions, gateway fees, ad spend, and 18% GST.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Food Cost (Purchases as % of Sales)</span>
                <span className={styles.inputValueDisplay}>{cogsPercent}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={20}
                max={45}
                step={1}
                value={cogsPercent}
                onChange={(e) => setCogsPercent(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Your total ingredient purchases as a share of gross sales.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Hyperpure Share of Kitchen Procurement</span>
                <span className={styles.inputValueDisplay}>{hyperpureProcurementShare}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={100}
                step={5}
                value={hyperpureProcurementShare}
                onChange={(e) => setHyperpureProcurementShare(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Percentage of raw ingredients purchased from Zomato Hyperpure.</span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>Exposure to One Corporate Group (Estimate)</div>
              <span
                className={`${styles.statusBadge} ${
                  Number(eternalControlPercent) > 30 ? styles.badgeRequired : styles.badgeConditional
                }`}
              >
                {Number(eternalControlPercent) > 30 ? "High Concentration Risk" : "Moderate Exposure"}
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Monthly Sales on Zomato:</span>
                <span className={styles.resultValue}>{formatCurrency(monthlyAggregatorSales)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Delivery Platform Commission Cash:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(monthlyAggregatorDeductions)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Hyperpure Raw Material Purchases:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(monthlyHyperpureSupplySpend)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Total Monthly Cash Flowing to One Group:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(totalEternalCashflow)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Share of Gross Revenue to One Group:</span>
                <span className={styles.resultValueHighlight}>{eternalControlPercent}% of Gross Sales</span>
              </div>
            </div>

            <div className={styles.analysisBox}>
              <div className={styles.analysisTitle}>Strategic Risk Advisory:</div>
              <p className={styles.analysisNote}>
                On your inputs, about <strong>{eternalControlPercent}% of your gross sales</strong> flows to one corporate group (Eternal Limited)
                across delivery deductions and supply purchases. That is not a problem in itself, but a merchant-account dispute or a delayed
                settlement would then affect your demand and your supply at the same time.
                <strong> Our rule of thumb:</strong> keep any single supplier below about 40% of total procurement, and maintain verified offline vendors for meat and produce.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
