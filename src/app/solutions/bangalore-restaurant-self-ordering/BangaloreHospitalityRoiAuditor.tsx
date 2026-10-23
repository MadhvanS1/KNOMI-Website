'use client';

import React, { useState } from 'react';
import styles from './BangaloreSolutions.module.css';

type MicroMarket = 'indiranagar' | 'koramangala' | 'hsrLayout' | 'churchStreet' | 'whitefield';

// The lift starts at 0%, so every figure comes from the owner. No KNOMI default or target.
const START_LIFT_PCT = 0;

export default function BangaloreHospitalityRoiAuditor() {
  const [activeTab, setActiveTab] = useState<'microMarketAuditor' | 'breweryBasketModeler'>('microMarketAuditor');

  // Mode 1 State (all values are the user's own figures or assumptions)
  const [market, setMarket] = useState<MicroMarket>('indiranagar');
  const [avgTableCheck, setAvgTableCheck] = useState<number>(1650);
  const [currentServers, setCurrentServers] = useState<number>(8);
  const [serverMonthlyCost, setServerMonthlyCost] = useState<number>(24000);
  const [serversFreed, setServersFreed] = useState<number>(1);
  const [extraTurnsPerWeek, setExtraTurnsPerWeek] = useState<number>(8);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);

  // Mode 2 State
  const [dailyCovers, setDailyCovers] = useState<number>(350);
  const [avgSpendPerGuest, setAvgSpendPerGuest] = useState<number>(1100);
  const [orderLiftPct, setOrderLiftPct] = useState<number>(START_LIFT_PCT);
  const [basketMarginPct, setBasketMarginPct] = useState<number>(65);

  // Mode 1: arithmetic on the user's inputs only
  const calculateMarketEstimate = () => {
    const currentLaborCost = currentServers * serverMonthlyCost;
    const effectiveServersFreed = Math.min(serversFreed, currentServers);
    const redirectedPayroll = effectiveServersFreed * serverMonthlyCost;

    const monthlyExtraTurns = Math.round(extraTurnsPerWeek * 4.3);
    const monthlyTurnoverRevenue = monthlyExtraTurns * avgTableCheck;
    const monthlyTurnoverMargin = Math.round(monthlyTurnoverRevenue * (grossMarginPct / 100));

    const totalMonthlyEstimate = redirectedPayroll + monthlyTurnoverMargin;

    return {
      currentLaborCost,
      effectiveServersFreed,
      redirectedPayroll,
      monthlyExtraTurns,
      monthlyTurnoverMargin,
      totalMonthlyEstimate,
    };
  };

  // Mode 2: average-order lift on the user's own covers and spend
  const calculateBasketEstimate = () => {
    const monthlyGuests = dailyCovers * 30;
    const extraSpendPerGuest = Math.round(avgSpendPerGuest * (orderLiftPct / 100));
    const monthlyExtraRevenue = monthlyGuests * extraSpendPerGuest;
    const monthlyExtraMargin = Math.round(monthlyExtraRevenue * (basketMarginPct / 100));
    const annualExtraMargin = monthlyExtraMargin * 12;

    return {
      monthlyGuests,
      extraSpendPerGuest,
      monthlyExtraRevenue,
      monthlyExtraMargin,
      annualExtraMargin,
    };
  };

  const marketResults = calculateMarketEstimate();
  const basketResults = calculateBasketEstimate();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Bangalore Hospitality ROI &amp; Labor Auditor</h2>
        <p className={styles.calcSubtitle}>
          Put in your own floor numbers and assumptions to estimate what freeing your team from order-taking, a few extra table turns, or a higher average order could be worth. Every result is an estimate from your inputs, not a promise.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'microMarketAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('microMarketAuditor')}
        >
          Mode 1: Floor Labor &amp; Table Turns
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'breweryBasketModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('breweryBasketModeler')}
        >
          Mode 2: Average Order Lift
        </button>
      </div>

      {activeTab === 'microMarketAuditor' ? (
        <div className={styles.calcGrid}>
          {/* Inputs */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Example Bangalore Profile (sets starting values)</span>
              </label>
              <select
                className={styles.selectInput}
                value={market}
                onChange={(e) => {
                  const val = e.target.value as MicroMarket;
                  setMarket(val);
                  if (val === 'indiranagar') {
                    setAvgTableCheck(2200);
                    setCurrentServers(10);
                  } else if (val === 'koramangala') {
                    setAvgTableCheck(1100);
                    setCurrentServers(7);
                  } else if (val === 'hsrLayout') {
                    setAvgTableCheck(750);
                    setCurrentServers(5);
                  } else if (val === 'churchStreet') {
                    setAvgTableCheck(1400);
                    setCurrentServers(6);
                  } else if (val === 'whitefield') {
                    setAvgTableCheck(2600);
                    setCurrentServers(14);
                  }
                }}
              >
                <option value="indiranagar">Indiranagar &amp; 100 Feet Rd (Taprooms &amp; Cocktail Bars)</option>
                <option value="koramangala">Koramangala 4th/5th Block (Startup Tech Casual Dining)</option>
                <option value="hsrLayout">HSR Layout (Specialty Coffee, Remote Work &amp; QSR)</option>
                <option value="churchStreet">Church Street &amp; MG Rd (High-Density Walk-In Dining)</option>
                <option value="whitefield">Whitefield &amp; ORR (Large Format Breweries &amp; Corporate Tabs)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Table Bill (Pre-Tax):</span>
                <span className={styles.inputVal}>₹{avgTableCheck.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={500}
                max={3500}
                step={50}
                value={avgTableCheck}
                onChange={(e) => setAvgTableCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Current Floor Servers:</span>
                <span className={styles.inputVal}>{currentServers} staff</span>
              </label>
              <input
                type="range"
                min={3}
                max={18}
                step={1}
                value={currentServers}
                onChange={(e) => setCurrentServers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Monthly Cost per Server (your figure):</span>
                <span className={styles.inputVal}>₹{serverMonthlyCost.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={12000}
                max={45000}
                step={500}
                value={serverMonthlyCost}
                onChange={(e) => setServerMonthlyCost(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Server Roles Moved Off Order-Taking (your assumption):</span>
                <span className={styles.inputVal}>{marketResults.effectiveServersFreed} staff</span>
              </label>
              <input
                type="range"
                min={0}
                max={currentServers}
                step={1}
                value={marketResults.effectiveServersFreed}
                onChange={(e) => setServersFreed(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Extra Table Turns per Week (your assumption):</span>
                <span className={styles.inputVal}>{extraTurnsPerWeek} turns</span>
              </label>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={extraTurnsPerWeek}
                onChange={(e) => setExtraTurnsPerWeek(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your Gross Margin (your assumption):</span>
                <span className={styles.inputVal}>{grossMarginPct}%</span>
              </label>
              <input
                type="range"
                min={30}
                max={85}
                step={1}
                value={grossMarginPct}
                onChange={(e) => setGrossMarginPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Bangalore Floor Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Current Monthly Floor Payroll:</span>
                <span className={styles.statVal}>₹{marketResults.currentLaborCost.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Payroll Freed from Order-Taking (estimate):</span>
                <span className={styles.greenVal}>₹{marketResults.redirectedPayroll.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Table Turns per Month:</span>
                <span className={styles.statVal}>+{marketResults.monthlyExtraTurns} turns/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Margin from Extra Turns (estimate):</span>
                <span className={styles.greenVal}>+₹{marketResults.monthlyTurnoverMargin.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Estimated Monthly Value:</span>
                <span className={styles.highlightVal}>₹{marketResults.totalMonthlyEstimate.toLocaleString('en-IN')}/mo</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              Figures are before KNOMI&apos;s fee, which we share on a walkthrough call. Estimate only, built entirely from the figures and assumptions you entered. KNOMI does not promise staff reductions or extra turns; we measure what actually changes with you, on your own tables.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          {/* Inputs */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Daily Covers:</span>
                <span className={styles.inputVal}>{dailyCovers} guests/day</span>
              </label>
              <input
                type="range"
                min={50}
                max={800}
                step={10}
                value={dailyCovers}
                onChange={(e) => setDailyCovers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Spend per Guest:</span>
                <span className={styles.inputVal}>₹{avgSpendPerGuest.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={200}
                max={3000}
                step={50}
                value={avgSpendPerGuest}
                onChange={(e) => setAvgSpendPerGuest(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Order Lift to Model (your assumption):</span>
                <span className={styles.inputVal}>{orderLiftPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={orderLiftPct}
                onChange={(e) => setOrderLiftPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your Gross Margin on Add-ons (your assumption):</span>
                <span className={styles.inputVal}>{basketMarginPct}%</span>
              </label>
              <input
                type="range"
                min={30}
                max={85}
                step={1}
                value={basketMarginPct}
                onChange={(e) => setBasketMarginPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Bangalore Average Order Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Guests per Month:</span>
                <span className={styles.statVal}>{basketResults.monthlyGuests.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Spend per Guest at {orderLiftPct}% Lift:</span>
                <span className={styles.greenVal}>+₹{basketResults.extraSpendPerGuest.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Monthly Revenue (estimate):</span>
                <span className={styles.greenVal}>+₹{basketResults.monthlyExtraRevenue.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Extra Monthly Gross Margin (estimate):</span>
                <span className={styles.highlightVal}>+₹{basketResults.monthlyExtraMargin.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Annualised (estimate):</span>
                <span className={styles.greenVal}>+₹{basketResults.annualExtraMargin.toLocaleString('en-IN')}/yr</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              The lift starts at 0%: set your own assumption. It is not a KNOMI result or a guarantee. Knomi Host suggests pairings, such as a snack with the next round; the real effect is something we measure with you on your own tables.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
