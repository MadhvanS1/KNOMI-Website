'use client';

import React, { useState } from 'react';
import { pricing } from '@/content/site';
import styles from './ChennaiSolutions.module.css';

type ChennaiMarket = 'tNagar' | 'mylaporeTriplicane' | 'omrCorridor' | 'annaNagar' | 'nungambakkamAlwarpet';

// KNOMI Signature plan price per table per month (KNOMI Brain §2), read from the approved site copy.
const SIGNATURE_PRICE_PER_TABLE = pricing.plans.find((p) => p.id === 'signature')?.priceMin ?? 250;

// KNOMI's stated target for average-order lift. A target, not a past result or a guarantee.
const KNOMI_TARGET_LIFT_PCT = 25;

export default function ChennaiTiffinThroughputAuditor() {
  const [activeTab, setActiveTab] = useState<'tiffinTurnoverAuditor' | 'degreeCoffeeBasketModeler'>('tiffinTurnoverAuditor');

  // Mode 1 State (all values are the user's own figures or assumptions)
  const [market, setMarket] = useState<ChennaiMarket>('tNagar');
  const [tableCount, setTableCount] = useState<number>(35);
  const [currentWaiters, setCurrentWaiters] = useState<number>(8);
  const [avgTableCheck, setAvgTableCheck] = useState<number>(650);
  const [waiterMonthlyCost, setWaiterMonthlyCost] = useState<number>(21000);
  const [waitersFreed, setWaitersFreed] = useState<number>(1);
  const [extraTurnsPerWeek, setExtraTurnsPerWeek] = useState<number>(15);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(60);

  // Mode 2 State
  const [dailyCovers, setDailyCovers] = useState<number>(550);
  const [avgFoodSpend, setAvgFoodSpend] = useState<number>(320);
  const [orderLiftPct, setOrderLiftPct] = useState<number>(KNOMI_TARGET_LIFT_PCT);
  const [basketMarginPct, setBasketMarginPct] = useState<number>(65);

  // Mode 1: arithmetic on the user's inputs only
  const calculateTurnoverEstimate = () => {
    const currentLaborCost = currentWaiters * waiterMonthlyCost;
    const effectiveWaitersFreed = Math.min(waitersFreed, currentWaiters);
    const redirectedPayroll = effectiveWaitersFreed * waiterMonthlyCost;

    const extraMonthlyTurns = Math.round(extraTurnsPerWeek * 4.3);
    const monthlyTurnoverMargin = Math.round(extraMonthlyTurns * avgTableCheck * (grossMarginPct / 100));

    const knomiMonthlyCost = tableCount * SIGNATURE_PRICE_PER_TABLE;
    const netOfKnomi = redirectedPayroll + monthlyTurnoverMargin - knomiMonthlyCost;

    return {
      currentLaborCost,
      effectiveWaitersFreed,
      redirectedPayroll,
      extraMonthlyTurns,
      monthlyTurnoverMargin,
      knomiMonthlyCost,
      netOfKnomi,
    };
  };

  // Mode 2: average-order lift on the user's own covers and spend
  const calculateCoffeeEstimate = () => {
    const monthlyGuests = dailyCovers * 30;
    const incrementalSpendPerGuest = Math.round(avgFoodSpend * (orderLiftPct / 100));
    const monthlyUpsellRevenue = monthlyGuests * incrementalSpendPerGuest;
    const monthlyUpsellMargin = Math.round(monthlyUpsellRevenue * (basketMarginPct / 100));
    const annualUpsellMargin = monthlyUpsellMargin * 12;

    return {
      monthlyGuests,
      incrementalSpendPerGuest,
      monthlyUpsellRevenue,
      monthlyUpsellMargin,
      annualUpsellMargin,
    };
  };

  const turnoverResults = calculateTurnoverEstimate();
  const coffeeResults = calculateCoffeeEstimate();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Chennai Tiffin &amp; Corporate Dining Throughput Auditor</h2>
        <p className={styles.calcSubtitle}>
          Put in your own floor numbers and assumptions to estimate what freeing your team from slip-writing, a few extra morning turns, or a higher average order on filter coffee and sweets could be worth. Every result is an estimate from your inputs, not a promise.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'tiffinTurnoverAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('tiffinTurnoverAuditor')}
        >
          Mode 1: Tiffin Floor Labor &amp; Table Turns
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'degreeCoffeeBasketModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('degreeCoffeeBasketModeler')}
        >
          Mode 2: Degree Coffee &amp; Sweet Order Lift
        </button>
      </div>

      {activeTab === 'tiffinTurnoverAuditor' ? (
        <div className={styles.calcGrid}>
          <div className={styles.inputPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Example Chennai Profile (sets starting values)</span>
              </div>
              <select
                className={styles.selectInput}
                value={market}
                onChange={(e) => {
                  const m = e.target.value as ChennaiMarket;
                  setMarket(m);
                  if (m === 'tNagar') {
                    setAvgTableCheck(650);
                    setTableCount(35);
                  } else if (m === 'mylaporeTriplicane') {
                    setAvgTableCheck(400);
                    setTableCount(25);
                  } else if (m === 'omrCorridor') {
                    setAvgTableCheck(950);
                    setTableCount(45);
                  } else if (m === 'annaNagar') {
                    setAvgTableCheck(1200);
                    setTableCount(40);
                  } else if (m === 'nungambakkamAlwarpet') {
                    setAvgTableCheck(1850);
                    setTableCount(35);
                  }
                }}
              >
                <option value="tNagar">T. Nagar &amp; Panagal Park (High-Density Retail &amp; Vegetarian Tiffin)</option>
                <option value="mylaporeTriplicane">Mylapore &amp; Triplicane (Heritage Tiffin Rooms &amp; Coffee Bars)</option>
                <option value="omrCorridor">OMR IT Express Highway (Tech Park Corporate Lunch Rushes)</option>
                <option value="annaNagar">Anna Nagar &amp; Kilpauk (Upscale Family Dining &amp; Cafes)</option>
                <option value="nungambakkamAlwarpet">Nungambakkam &amp; Alwarpet (Fine Dining &amp; Craft Restobars)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Total Dining Tables</span>
                <span className={styles.inputValueBadge}>{tableCount} Tables</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="5"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Current Floor Waiters on Duty</span>
                <span className={styles.inputValueBadge}>{currentWaiters} Servers</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                step="1"
                value={currentWaiters}
                onChange={(e) => setCurrentWaiters(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Table Bill Size</span>
                <span className={styles.inputValueBadge}>₹{avgTableCheck.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="250"
                max="2500"
                step="50"
                value={avgTableCheck}
                onChange={(e) => setAvgTableCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Monthly Cost per Server (your figure)</span>
                <span className={styles.inputValueBadge}>₹{waiterMonthlyCost.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="12000"
                max="40000"
                step="500"
                value={waiterMonthlyCost}
                onChange={(e) => setWaiterMonthlyCost(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Server Roles Moved Off Slip-Writing (your assumption)</span>
                <span className={styles.inputValueBadge}>{turnoverResults.effectiveWaitersFreed} Staff</span>
              </div>
              <input
                type="range"
                min="0"
                max={currentWaiters}
                step="1"
                value={turnoverResults.effectiveWaitersFreed}
                onChange={(e) => setWaitersFreed(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Extra Table Turns per Week (your assumption)</span>
                <span className={styles.inputValueBadge}>{extraTurnsPerWeek} Turns</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={extraTurnsPerWeek}
                onChange={(e) => setExtraTurnsPerWeek(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Your Gross Margin (your assumption)</span>
                <span className={styles.inputValueBadge}>{grossMarginPct}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="85"
                step="1"
                value={grossMarginPct}
                onChange={(e) => setGrossMarginPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.highlightRow}>
              <span className={styles.highlightLabel}>Estimated Monthly Value, Net of KNOMI</span>
              <span className={styles.highlightValue}>
                ₹{turnoverResults.netOfKnomi.toLocaleString('en-IN')}
              </span>
              <span className={styles.highlightSubtext}>
                Estimate from your own figures and assumptions, not a promise
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Current Monthly Floor Payroll</span>
              <span className={styles.metricValue}>
                ₹{turnoverResults.currentLaborCost.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Payroll Freed from Slip-Writing (estimate)</span>
              <span className={styles.metricValue}>
                ₹{turnoverResults.redirectedPayroll.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Margin from {turnoverResults.extraMonthlyTurns} Extra Turns / Month (estimate)</span>
              <span className={styles.metricValue}>
                +₹{turnoverResults.monthlyTurnoverMargin.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>KNOMI Signature for {tableCount} Tables</span>
              <span className={styles.metricValue}>
                ₹{turnoverResults.knomiMonthlyCost.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <span className={styles.highlightSubtext}>
              KNOMI does not promise staff reductions or extra turns. We measure what actually changes with you, on your own tables.
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          <div className={styles.inputPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Daily Covers (Diners Served)</span>
                <span className={styles.inputValueBadge}>{dailyCovers} Guests / Day</span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="25"
                value={dailyCovers}
                onChange={(e) => setDailyCovers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Meal / Food Spend Per Guest</span>
                <span className={styles.inputValueBadge}>₹{avgFoodSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="25"
                value={avgFoodSpend}
                onChange={(e) => setAvgFoodSpend(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Order Lift to Model (default: KNOMI&apos;s target, not a guarantee)</span>
                <span className={styles.inputValueBadge}>{orderLiftPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={orderLiftPct}
                onChange={(e) => setOrderLiftPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Your Gross Margin on Coffee &amp; Sweets (your assumption)</span>
                <span className={styles.inputValueBadge}>{basketMarginPct}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="85"
                step="1"
                value={basketMarginPct}
                onChange={(e) => setBasketMarginPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.highlightRow}>
              <span className={styles.highlightLabel}>Extra Monthly Gross Margin (estimate)</span>
              <span className={styles.highlightValue}>
                ₹{coffeeResults.monthlyUpsellMargin.toLocaleString('en-IN')}
              </span>
              <span className={styles.highlightSubtext}>
                About ₹{(coffeeResults.annualUpsellMargin / 100000).toFixed(1)} Lakhs a year at a {orderLiftPct}% lift (estimate)
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Guests per Month</span>
              <span className={styles.metricValue}>
                {coffeeResults.monthlyGuests.toLocaleString('en-IN')} Diners
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Extra Spend per Guest</span>
              <span className={styles.metricValue}>
                +₹{coffeeResults.incrementalSpendPerGuest.toLocaleString('en-IN')}
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Extra Monthly Revenue (estimate)</span>
              <span className={styles.metricValue}>
                ₹{coffeeResults.monthlyUpsellRevenue.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <span className={styles.highlightSubtext}>
              The {KNOMI_TARGET_LIFT_PCT}% default is KNOMI&apos;s target for average-order lift, not a guarantee or a past result. Knomi Host suggests pairings, such as a degree filter coffee with the dosa; the real effect is something we measure with you on your own tables.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
