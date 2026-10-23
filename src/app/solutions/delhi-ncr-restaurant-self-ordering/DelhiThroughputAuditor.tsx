'use client';

import React, { useState } from 'react';
import styles from './DelhiSolutions.module.css';

type DelhiMarket = 'cyberHubGurgaon' | 'connaughtPlace' | 'hauzKhasGk' | 'noidaExpressway' | 'rajouriGarden';

// The lift starts at 0%, so every figure comes from the owner. No KNOMI default or target.
const START_LIFT_PCT = 0;

export default function DelhiThroughputAuditor() {
  const [activeTab, setActiveTab] = useState<'delhiTurnoverAuditor' | 'cocktailTandooriBasketModeler'>('delhiTurnoverAuditor');

  // Mode 1 State (all values are the user's own figures or assumptions)
  const [market, setMarket] = useState<DelhiMarket>('cyberHubGurgaon');
  const [currentWaiters, setCurrentWaiters] = useState<number>(11);
  const [avgTableCheck, setAvgTableCheck] = useState<number>(1850);
  const [waiterMonthlyCost, setWaiterMonthlyCost] = useState<number>(26000);
  const [waitersFreed, setWaitersFreed] = useState<number>(1);
  const [extraTurnsPerWeek, setExtraTurnsPerWeek] = useState<number>(10);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);

  // Mode 2 State
  const [dailyCovers, setDailyCovers] = useState<number>(420);
  const [avgSpend, setAvgSpend] = useState<number>(950);
  const [orderLiftPct, setOrderLiftPct] = useState<number>(START_LIFT_PCT);
  const [basketMarginPct, setBasketMarginPct] = useState<number>(65);

  // Mode 1: arithmetic on the user's inputs only
  const calculateTurnoverEstimate = () => {
    const currentLaborCost = currentWaiters * waiterMonthlyCost;
    const effectiveWaitersFreed = Math.min(waitersFreed, currentWaiters);
    const redirectedPayroll = effectiveWaitersFreed * waiterMonthlyCost;

    const extraMonthlyTurns = Math.round(extraTurnsPerWeek * 4.3);
    const monthlyTurnoverMargin = Math.round(extraMonthlyTurns * avgTableCheck * (grossMarginPct / 100));

    const totalMonthlyEstimate = redirectedPayroll + monthlyTurnoverMargin;

    return {
      currentLaborCost,
      effectiveWaitersFreed,
      redirectedPayroll,
      extraMonthlyTurns,
      monthlyTurnoverMargin,
      totalMonthlyEstimate,
    };
  };

  // Mode 2: average-order lift on the user's own covers and spend
  const calculateUpsellEstimate = () => {
    const monthlyGuests = dailyCovers * 30;
    const incrementalSpendPerGuest = Math.round(avgSpend * (orderLiftPct / 100));
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
  const upsellResults = calculateUpsellEstimate();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Delhi NCR High-Volume Lounge &amp; Dining Throughput Auditor</h2>
        <p className={styles.calcSubtitle}>
          Put in your own floor numbers and assumptions to estimate what freeing your servers from order-taking, a few extra table turns, or a higher average order on cocktails and tandoori starters could be worth. Every result is an estimate from your inputs, not a promise.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'delhiTurnoverAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('delhiTurnoverAuditor')}
        >
          Mode 1: Floor Labor &amp; Table Turns
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'cocktailTandooriBasketModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('cocktailTandooriBasketModeler')}
        >
          Mode 2: Cocktail &amp; Tandoori Order Lift
        </button>
      </div>

      {activeTab === 'delhiTurnoverAuditor' ? (
        <div className={styles.calcGrid}>
          <div className={styles.inputPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Example Delhi NCR Profile (sets starting values)</span>
              </div>
              <select
                className={styles.selectInput}
                value={market}
                onChange={(e) => {
                  const m = e.target.value as DelhiMarket;
                  setMarket(m);
                  if (m === 'cyberHubGurgaon') {
                    setAvgTableCheck(2200);
                  } else if (m === 'connaughtPlace') {
                    setAvgTableCheck(1800);
                  } else if (m === 'hauzKhasGk') {
                    setAvgTableCheck(1650);
                  } else if (m === 'noidaExpressway') {
                    setAvgTableCheck(1250);
                  } else if (m === 'rajouriGarden') {
                    setAvgTableCheck(1500);
                  }
                }}
              >
                <option value="cyberHubGurgaon">Cyber Hub &amp; Sector 29 Gurgaon (Microbreweries &amp; Corporate Bars)</option>
                <option value="connaughtPlace">Connaught Place &amp; Khan Market (High-Rent Heritage Dining &amp; Bistros)</option>
                <option value="hauzKhasGk">Hauz Khas &amp; Greater Kailash (Boutique Cafes, Lounges &amp; Restobars)</option>
                <option value="noidaExpressway">Noida Sector 18 &amp; Advant Navis (Tech Corridors &amp; Family Dining)</option>
                <option value="rajouriGarden">Rajouri Garden &amp; Punjabi Bagh (Multi-Tier Family Banquet &amp; Tandoor)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Current Floor Waiters on Duty</span>
                <span className={styles.inputValueBadge}>{currentWaiters} Servers</span>
              </div>
              <input
                type="range"
                min="4"
                max="18"
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
                min="800"
                max="4500"
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
                max="45000"
                step="500"
                value={waiterMonthlyCost}
                onChange={(e) => setWaiterMonthlyCost(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Server Roles Moved Off Order-Taking (your assumption)</span>
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
                max="80"
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
              <span className={styles.highlightLabel}>Estimated Monthly Value</span>
              <span className={styles.highlightValue}>
                ₹{turnoverResults.totalMonthlyEstimate.toLocaleString('en-IN')}
              </span>
              <span className={styles.highlightSubtext}>
                Figures are before KNOMI&apos;s fee, which we share on a walkthrough call. An estimate from your own figures and assumptions, not a promise.
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Current Monthly Floor Payroll</span>
              <span className={styles.metricValue}>
                ₹{turnoverResults.currentLaborCost.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Payroll Freed from Order-Taking (estimate)</span>
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
                max="1000"
                step="25"
                value={dailyCovers}
                onChange={(e) => setDailyCovers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Spend Per Guest</span>
                <span className={styles.inputValueBadge}>₹{avgSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="2500"
                step="50"
                value={avgSpend}
                onChange={(e) => setAvgSpend(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Order Lift to Model (your assumption)</span>
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
                <span>Your Gross Margin on Drinks &amp; Starters (your assumption)</span>
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
                ₹{upsellResults.monthlyUpsellMargin.toLocaleString('en-IN')}
              </span>
              <span className={styles.highlightSubtext}>
                About ₹{(upsellResults.annualUpsellMargin / 100000).toFixed(1)} Lakhs a year at a {orderLiftPct}% lift (estimate)
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Guests per Month</span>
              <span className={styles.metricValue}>
                {upsellResults.monthlyGuests.toLocaleString('en-IN')} Diners
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Extra Spend per Guest</span>
              <span className={styles.metricValue}>
                +₹{upsellResults.incrementalSpendPerGuest.toLocaleString('en-IN')}
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Extra Monthly Revenue (estimate)</span>
              <span className={styles.metricValue}>
                ₹{upsellResults.monthlyUpsellRevenue.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <span className={styles.highlightSubtext}>
              The lift starts at 0%: set your own assumption. It is not a KNOMI result or a guarantee. Knomi Host suggests pairings, such as kebabs with the beers; the real effect is something we measure with you on your own tables.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
