'use client';

import React, { useState } from 'react';
import styles from './AovExpansionGuide.module.css';

export default function AovExpansionCalculator() {
  const [activeTab, setActiveTab] = useState<'basket' | 'matrix'>('basket');

  // Mode 1: Basket Attachments State
  const [baseCheck, setBaseCheck] = useState<number>(850);
  const [starterRate, setStarterRate] = useState<number>(35);
  const [starterPrice] = useState<number>(280); // Illustrative starter price
  const [beverageRate, setBeverageRate] = useState<number>(25);
  const [beveragePrice] = useState<number>(220); // Illustrative beverage price
  const [dessertRate, setDessertRate] = useState<number>(15);
  const [dessertPrice] = useState<number>(180); // Illustrative dessert price
  const [monthlyTables, setMonthlyTables] = useState<number>(1500);
  // The user's own assumption: percentage points added to each attachment rate
  const [attachmentUplift, setAttachmentUplift] = useState<number>(10);

  // Mode 2: Menu Matrix State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1800);
  const [plowhorseVolume, setPlowhorseVolume] = useState<number>(45); // % of orders
  const [marginShiftPercent, setMarginShiftPercent] = useState<number>(15); // % shifted to Stars

  // Mode 1 Calculations
  const calculateBasket = () => {
    const currentStarterContribution = (starterRate / 100) * starterPrice;
    const currentBeverageContribution = (beverageRate / 100) * beveragePrice;
    const currentDessertContribution = (dessertRate / 100) * dessertPrice;

    const currentAov = Math.round(
      baseCheck +
        currentStarterContribution +
        currentBeverageContribution +
        currentDessertContribution
    );

    // Optimized: attachment rates raised by the user's assumed uplift (capped)
    const optimizedStarterRate = Math.min(85, starterRate + attachmentUplift);
    const optimizedBeverageRate = Math.min(80, beverageRate + attachmentUplift);
    const optimizedDessertRate = Math.min(65, dessertRate + attachmentUplift);

    const optStarterContrib = (optimizedStarterRate / 100) * starterPrice;
    const optBeverageContrib = (optimizedBeverageRate / 100) * beveragePrice;
    const optDessertContrib = (optimizedDessertRate / 100) * dessertPrice;

    const optimizedAov = Math.round(
      baseCheck + optStarterContrib + optBeverageContrib + optDessertContrib
    );

    const liftPerTable = optimizedAov - currentAov;
    const liftPercentage = Number(((liftPerTable / currentAov) * 100).toFixed(1));

    const monthlyGrossLift = liftPerTable * monthlyTables;
    const annualGrossLift = monthlyGrossLift * 12;

    return {
      currentAov,
      optimizedAov,
      liftPerTable,
      liftPercentage,
      monthlyGrossLift,
      annualGrossLift,
      optimizedStarterRate,
      optimizedBeverageRate,
      optimizedDessertRate,
    };
  };

  // Mode 2 Calculations
  const calculateMatrix = () => {
    // Illustrative assumptions, not benchmarks:
    // Baseline staple: Rs 380 price, 36% food cost -> Rs 243 contribution margin
    // High-margin Star dish: Rs 460 price, 26% food cost -> Rs 340 contribution margin
    const marginDeltaPerDish = 340 - 243; // Rs 97 extra gross margin per converted dish
    const convertedOrdersPerMonth = Math.round(
      monthlyOrders * (plowhorseVolume / 100) * (marginShiftPercent / 100)
    );
    const monthlyMarginGain = convertedOrdersPerMonth * marginDeltaPerDish;
    const threeYearMarginGain = monthlyMarginGain * 36;

    return {
      convertedOrdersPerMonth,
      marginDeltaPerDish,
      monthlyMarginGain,
      threeYearMarginGain,
    };
  };

  const bsk = calculateBasket();
  const mtx = calculateMatrix();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Interactive Restaurant AOV Expansion Auditor</h3>
        <p className={styles.calcSubtitle}>
          Model dining basket attachment rates and contribution margin on your own assumptions. All results are estimates.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'basket' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('basket')}
        >
          1. Dining Basket Item-Attachment Auditor
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'matrix' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('matrix')}
        >
          2. Menu Engineering Margin Simulator
        </button>
      </div>

      {activeTab === 'basket' ? (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Base Main Course Check: <span className={styles.inputVal}>Rs {baseCheck}</span>
              </label>
              <input
                type="range"
                min="400"
                max="2000"
                step="50"
                value={baseCheck}
                onChange={(e) => setBaseCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Starter Attachment Rate: <span className={styles.inputVal}>{starterRate}% of tables</span>
              </label>
              <input
                type="range"
                min="15"
                max="75"
                step="5"
                value={starterRate}
                onChange={(e) => setStarterRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Beverage / Cocktail Rate: <span className={styles.inputVal}>{beverageRate}% of tables</span>
              </label>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={beverageRate}
                onChange={(e) => setBeverageRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Dessert Attachment Rate: <span className={styles.inputVal}>{dessertRate}% of tables</span>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={dessertRate}
                onChange={(e) => setDessertRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Monthly Dining Tables: <span className={styles.inputVal}>{monthlyTables.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="400"
                max="3500"
                step="100"
                value={monthlyTables}
                onChange={(e) => setMonthlyTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Attachment Rate Increase (your assumption): <span className={styles.inputVal}>+{attachmentUplift} points</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={attachmentUplift}
                onChange={(e) => setAttachmentUplift(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>AOV Growth Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Current Realized AOV:</span>
                <span className={styles.statValue}>Rs {bsk.currentAov} / table</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Optimized AOV:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  Rs {bsk.optimizedAov} / table
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Check Lift Per Table:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  +Rs {bsk.liftPerTable} (+{bsk.liftPercentage}%)
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Extra Sales:</span>
                <span className={styles.statValue}>
                  +Rs {(bsk.monthlyGrossLift / 1000).toFixed(0)}k / month
                </span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated Annual Extra Sales:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52', fontSize: '1.25rem' }}>
                  +Rs {(bsk.annualGrossLift / 100000).toFixed(2)} Lakhs/yr
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>Estimate only: </strong>
              This uses your attachment rates, your assumed increase and illustrative item prices (starter Rs {starterPrice}, drink Rs {beveragePrice}, dessert Rs {dessertPrice}). The +Rs {(bsk.annualGrossLift / 100000).toFixed(2)} Lakhs is extra sales, not profit: because rent, payroll and utilities stay fixed, what reaches the bottom line is that figure minus the food cost of the extra items.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Monthly Food Orders: <span className={styles.inputVal}>{monthlyOrders.toLocaleString('en-IN')} orders</span>
              </label>
              <input
                type="range"
                min="600"
                max="4000"
                step="100"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Plowhorse Share (High volume, low margin): <span className={styles.inputVal}>{plowhorseVolume}% of orders</span>
              </label>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={plowhorseVolume}
                onChange={(e) => setPlowhorseVolume(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Volume Shift to High-Margin Stars (your assumption): <span className={styles.inputVal}>{marginShiftPercent}% converted</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={marginShiftPercent}
                onChange={(e) => setMarginShiftPercent(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: '16px' }}>
              <strong>Menu Engineering Dynamic:</strong>
              <br />
              Illustrative assumption: a Rs 380 staple at 36% food cost versus a Rs 460 signature dish at 26% food cost, so each order shifted earns about Rs 97 more gross margin.
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Menu Contribution Matrix Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Orders Converted Per Month:</span>
                <span className={styles.statValue}>{mtx.convertedOrdersPerMonth} dishes/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Margin Per Conversion:</span>
                <span className={styles.statValue} style={{ color: '#3f7a52' }}>+Rs {mtx.marginDeltaPerDish} / dish</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Margin Gain:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  +Rs {(mtx.monthlyMarginGain / 1000).toFixed(0)}k / month
                </span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated 3-Year Margin Gain:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52', fontSize: '1.25rem' }}>
                  +Rs {(mtx.threeYearMarginGain / 100000).toFixed(2)} Lakhs
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>No Price Increase Modelled: </strong>
              This +Rs {(mtx.threeYearMarginGain / 100000).toFixed(2)} Lakhs estimate models a shift in what guests choose, not an across-the-board price rise. Whether guests shift, and by how much, depends on your menu design, badges and pairing suggestions.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
