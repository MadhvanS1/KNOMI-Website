'use client';

import React, { useState } from 'react';
import styles from './BarOrderingGuide.module.css';

export default function PubRoundVelocityAuditor() {
  const [activeTab, setActiveTab] = useState<'roundVelocity' | 'taxSplitAuditor'>('roundVelocity');

  // Mode 1: Round Velocity State (all values are the user's own inputs or assumptions)
  const [activeTables, setActiveTables] = useState<number>(45); // Peak weekend tables
  const [avgRoundPrice, setAvgRoundPrice] = useState<number>(1200); // Cost of a drink round (4 pints or cocktails)
  const [orderingLagMinutes, setOrderingLagMinutes] = useState<number>(14); // Waiter flag-down + KOT relay delay today
  const [sessionDwellMinutes, setSessionDwellMinutes] = useState<number>(150); // Total dwell time in minutes (2.5 hrs)
  const [drinkCycleMinutes, setDrinkCycleMinutes] = useState<number>(22); // Drinking + pouring time per round
  const [phoneLagMinutes, setPhoneLagMinutes] = useState<number>(3); // User's assumption: lag with phone ordering
  const [pourCostPct, setPourCostPct] = useState<number>(22); // User's own pour cost

  // Mode 2: Dual Tax Bill State
  const [weekendCoversPerTable, setWeekendCoversPerTable] = useState<number>(4);
  const [foodSpendShare, setFoodSpendShare] = useState<number>(35); // % of bill that is food (5% GST)
  const [liquorSpendShare, setLiquorSpendShare] = useState<number>(65); // % of bill that is alcohol (State Liquor VAT)
  const [billTotal, setBillTotal] = useState<number>(4500);
  const [liquorVatPct, setLiquorVatPct] = useState<number>(18); // Varies by state: the user sets their own rate

  // Mode 1 Calculations (estimates from the user's inputs)
  const calculateRounds = () => {
    // Today: every round waits for the ordering lag on top of the drinking + pouring cycle
    const traditionalRoundDuration = drinkCycleMinutes + orderingLagMinutes;
    const traditionalRounds = Number(
      Math.max(1, sessionDwellMinutes / traditionalRoundDuration).toFixed(1)
    );

    // With phone ordering: the user's own assumption for the remaining lag
    const effectivePhoneLag = Math.min(phoneLagMinutes, orderingLagMinutes);
    const digitalRoundDuration = drinkCycleMinutes + effectivePhoneLag;
    const digitalRounds = Number(
      Math.max(traditionalRounds, sessionDwellMinutes / digitalRoundDuration).toFixed(1)
    );

    const extraRoundsPerTable = Number((digitalRounds - traditionalRounds).toFixed(1));
    const incrementalSpendPerTable = Math.round(extraRoundsPerTable * avgRoundPrice);

    // Peak weekend service: activeTables * 2 seatings/night * 3 peak nights (Fri-Sun)
    const weekendTablesServed = activeTables * 2 * 3;
    const weekendRevenueLift = weekendTablesServed * incrementalSpendPerTable;
    const monthlyRevenueLift = Math.round(weekendRevenueLift * 4.2);
    const annualRevenueLift = monthlyRevenueLift * 12;
    const annualContribution = Math.round(annualRevenueLift * (1 - pourCostPct / 100));

    return {
      traditionalRounds,
      digitalRounds,
      extraRoundsPerTable,
      incrementalSpendPerTable,
      weekendTablesServed,
      weekendRevenueLift,
      monthlyRevenueLift,
      annualRevenueLift,
      annualContribution,
    };
  };

  // Mode 2 Calculations (arithmetic on the user's inputs)
  const calculateTaxSplit = () => {
    const foodComponent = Math.round(billTotal * (foodSpendShare / 100));
    const liquorComponent = Math.round(billTotal * (liquorSpendShare / 100));

    // 5% GST on food (no ITC); State Liquor VAT at the rate the user enters
    const foodGst5Pct = Math.round(foodComponent * 0.05);
    const liquorVat = Math.round(liquorComponent * (liquorVatPct / 100));
    const totalTax = foodGst5Pct + liquorVat;
    const totalFinalBill = billTotal + totalTax;

    const perDinerShare = Math.round(totalFinalBill / weekendCoversPerTable);

    return {
      foodComponent,
      liquorComponent,
      foodGst5Pct,
      liquorVat,
      totalTax,
      totalFinalBill,
      perDinerShare,
    };
  };

  const roundResults = calculateRounds();
  const taxResults = calculateTaxSplit();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Bar Round Velocity &amp; Revenue Simulator</h3>
        <p className={styles.calcSubtitle}>
          Estimate how waiter flag-down delays affect drink rounds, and see how a table&apos;s bill splits between food GST and liquor VAT
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'roundVelocity' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('roundVelocity')}
        >
          Mode 1: Round Velocity &amp; Lost Pours
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'taxSplitAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('taxSplitAuditor')}
        >
          Mode 2: Dual Tax Bill &amp; Per-Guest Share
        </button>
      </div>

      {activeTab === 'roundVelocity' ? (
        <div className={styles.calcGrid}>
          {/* Controls Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Active Peak Tables (Fri-Sun Nights)</span>
                <span className={styles.inputVal}>{activeTables} Tables</span>
              </label>
              <input
                type="range"
                min={15}
                max={90}
                step={5}
                value={activeTables}
                onChange={(e) => setActiveTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Price per Drink Round (4 Pints/Cocktails)</span>
                <span className={styles.inputVal}>Rs {avgRoundPrice.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={600}
                max={2500}
                step={100}
                value={avgRoundPrice}
                onChange={(e) => setAvgRoundPrice(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Waiter Flag-Down &amp; Relay Lag Today</span>
                <span className={styles.inputVal}>{orderingLagMinutes} Minutes / round</span>
              </label>
              <input
                type="range"
                min={4}
                max={22}
                step={1}
                value={orderingLagMinutes}
                onChange={(e) => setOrderingLagMinutes(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Table Dwell Time</span>
                <span className={styles.inputVal}>{sessionDwellMinutes} Minutes ({(sessionDwellMinutes / 60).toFixed(1)} hrs)</span>
              </label>
              <input
                type="range"
                min={90}
                max={240}
                step={15}
                value={sessionDwellMinutes}
                onChange={(e) => setSessionDwellMinutes(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Drinking &amp; Pouring Time per Round (Your Estimate)</span>
                <span className={styles.inputVal}>{drinkCycleMinutes} Minutes</span>
              </label>
              <input
                type="range"
                min={10}
                max={40}
                step={1}
                value={drinkCycleMinutes}
                onChange={(e) => setDrinkCycleMinutes(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Ordering Lag with Phone Ordering (Your Assumption)</span>
                <span className={styles.inputVal}>{phoneLagMinutes} Minutes / round</span>
              </label>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={phoneLagMinutes}
                onChange={(e) => setPhoneLagMinutes(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your Beverage Pour Cost</span>
                <span className={styles.inputVal}>{pourCostPct}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={45}
                step={1}
                value={pourCostPct}
                onChange={(e) => setPourCostPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Drink Round Velocity Estimate</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Rounds per Table Today (est.):</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  {roundResults.traditionalRounds} Rounds
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Rounds with Phone Ordering (est.):</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  {roundResults.digitalRounds} Rounds (+{roundResults.extraRoundsPerTable} Extra Rounds)
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Extra Spend per Table:</span>
                <span className={styles.statHighlight}>
                  +Rs {roundResults.incrementalSpendPerTable.toLocaleString('en-IN')} per table
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Extra Weekend Revenue (2 seatings × 3 nights):</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  +Rs {roundResults.weekendRevenueLift.toLocaleString('en-IN')} / weekend
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Extra Pour Revenue:</span>
                <span className={styles.statHighlight}>
                  Rs {(roundResults.monthlyRevenueLift / 100000).toFixed(2)} Lakhs / mo
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Annual Contribution (after {pourCostPct}% pour cost):</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`} style={{ fontSize: '1.2rem' }}>
                  Rs {(roundResults.annualContribution / 100000).toFixed(2)} Lakhs / yr
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '10px 0 0', lineHeight: 1.5 }}>
                These are estimates from your inputs and assumptions, not a promised result.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          {/* Controls Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Table Bill (Pre-Tax)</span>
                <span className={styles.inputVal}>Rs {billTotal.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={2000}
                max={12000}
                step={500}
                value={billTotal}
                onChange={(e) => setBillTotal(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Diners at Table (Splitting Check)</span>
                <span className={styles.inputVal}>{weekendCoversPerTable} Guests</span>
              </label>
              <input
                type="range"
                min={2}
                max={8}
                step={1}
                value={weekendCoversPerTable}
                onChange={(e) => setWeekendCoversPerTable(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Food vs Alcohol Bill Split</span>
                <span className={styles.inputVal}>{foodSpendShare}% Food / {liquorSpendShare}% Alcohol</span>
              </label>
              <input
                type="range"
                min={15}
                max={60}
                step={5}
                value={foodSpendShare}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFoodSpendShare(val);
                  setLiquorSpendShare(100 - val);
                }}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>State Liquor VAT Rate (Check Your State)</span>
                <span className={styles.inputVal}>{liquorVatPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={liquorVatPct}
                onChange={(e) => setLiquorVatPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Dual-Tax Bill Estimate</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Food Component (5% GST):</span>
                <span className={styles.statValue}>
                  Rs {taxResults.foodComponent.toLocaleString('en-IN')} (+Rs {taxResults.foodGst5Pct} GST)
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Liquor Component ({liquorVatPct}% State VAT):</span>
                <span className={styles.statValue}>
                  Rs {taxResults.liquorComponent.toLocaleString('en-IN')} (+Rs {taxResults.liquorVat} VAT)
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Total Bill:</span>
                <span className={styles.statHighlight}>
                  Rs {taxResults.totalFinalBill.toLocaleString('en-IN')}
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Equal Split per Diner:</span>
                <span className={styles.statValue}>
                  Rs {taxResults.perDinerShare.toLocaleString('en-IN')} / person
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                An estimate for illustration. Liquor VAT, excise levies and how they appear on the bill vary by state, so
                confirm the treatment for your licence with your Chartered Accountant.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
