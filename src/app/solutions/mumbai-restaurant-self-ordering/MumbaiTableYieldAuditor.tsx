'use client';

import React, { useState } from 'react';
import styles from './MumbaiSolutions.module.css';

type MumbaiMarket = 'bandra' | 'lowerParel' | 'bkc' | 'fortColaba' | 'andheriJuhu';

// The lift starts at 0%, so every figure comes from the owner. No KNOMI default or target.
const START_LIFT_PCT = 0;

export default function MumbaiTableYieldAuditor() {
  const [activeTab, setActiveTab] = useState<'revpashAuditor' | 'bambaiyaBasketModeler'>('revpashAuditor');

  // Mode 1 State (all values are the user's own figures or assumptions)
  const [market, setMarket] = useState<MumbaiMarket>('bandra');
  const [tableCount, setTableCount] = useState<number>(24);
  const [monthlyRent, setMonthlyRent] = useState<number>(400000);
  const [openHoursPerDay, setOpenHoursPerDay] = useState<number>(10);
  const [seatingsPerTablePerDay, setSeatingsPerTablePerDay] = useState<number>(3);
  const [minutesSavedPerSeating, setMinutesSavedPerSeating] = useState<number>(5);

  // Mode 2 State
  const [dailyCovers, setDailyCovers] = useState<number>(320);
  const [avgCoverSpend, setAvgCoverSpend] = useState<number>(850);
  const [orderLiftPct, setOrderLiftPct] = useState<number>(START_LIFT_PCT);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);

  // Mode 1: rent and table-time arithmetic on the user's inputs only
  const calculateRevpash = () => {
    const tableHoursPerMonth = tableCount * openHoursPerDay * 30;
    const rentCostPerTableHour = tableHoursPerMonth > 0 ? Math.round(monthlyRent / tableHoursPerMonth) : 0;
    const rentCostOfWaitPerSeating = Math.round(rentCostPerTableHour * (minutesSavedPerSeating / 60));

    const tableHoursFreed = Math.round((tableCount * seatingsPerTablePerDay * 30 * minutesSavedPerSeating) / 60);
    const rentValueOfFreedTime = tableHoursFreed * rentCostPerTableHour;

    return {
      rentCostPerTableHour,
      rentCostOfWaitPerSeating,
      tableHoursFreed,
      rentValueOfFreedTime,
    };
  };

  // Mode 2: average-order lift on the user's own covers and spend
  const calculateBasketUpsell = () => {
    const monthlyGuests = dailyCovers * 30;
    const incrementalSpendPerGuest = Math.round(avgCoverSpend * (orderLiftPct / 100));
    const monthlyExtraRevenue = monthlyGuests * incrementalSpendPerGuest;
    const monthlyExtraMargin = Math.round(monthlyExtraRevenue * (grossMarginPct / 100));
    const annualExtraMargin = monthlyExtraMargin * 12;

    return {
      monthlyGuests,
      incrementalSpendPerGuest,
      monthlyExtraRevenue,
      monthlyExtraMargin,
      annualExtraMargin,
    };
  };

  const revpashResults = calculateRevpash();
  const basketResults = calculateBasketUpsell();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Mumbai Restaurant Rent &amp; Table Yield Auditor</h2>
        <p className={styles.calcSubtitle}>
          Put in your own rent and floor numbers to see what an hour of table time costs you, and what a higher average order could be worth. Every result is an estimate from your inputs, not a promise.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'revpashAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('revpashAuditor')}
        >
          Mode 1: Rent &amp; Table-Time Yield
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'bambaiyaBasketModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('bambaiyaBasketModeler')}
        >
          Mode 2: Average Order Lift
        </button>
      </div>

      {activeTab === 'revpashAuditor' ? (
        <div className={styles.calcGrid}>
          {/* Inputs */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Example Mumbai Profile (sets starting values)</span>
              </label>
              <select
                className={styles.selectInput}
                value={market}
                onChange={(e) => {
                  const val = e.target.value as MumbaiMarket;
                  setMarket(val);
                  if (val === 'bandra') {
                    setTableCount(24);
                    setSeatingsPerTablePerDay(3);
                  } else if (val === 'lowerParel') {
                    setTableCount(45);
                    setSeatingsPerTablePerDay(2);
                  } else if (val === 'bkc') {
                    setTableCount(50);
                    setSeatingsPerTablePerDay(2);
                  } else if (val === 'fortColaba') {
                    setTableCount(20);
                    setSeatingsPerTablePerDay(4);
                  } else if (val === 'andheriJuhu') {
                    setTableCount(35);
                    setSeatingsPerTablePerDay(3);
                  }
                }}
              >
                <option value="bandra">Bandra West &amp; Pali Hill (Bistros &amp; Restobars)</option>
                <option value="lowerParel">Lower Parel &amp; Kamala Mills (High-Volume Lounges)</option>
                <option value="bkc">BKC (Corporate Fine Dining)</option>
                <option value="fortColaba">Fort, Kala Ghoda &amp; Colaba (Heritage Bistros)</option>
                <option value="andheriJuhu">Andheri West &amp; Juhu (Late-Night Dining)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Active Dine-in Tables:</span>
                <span className={styles.inputVal}>{tableCount} tables</span>
              </label>
              <input
                type="range"
                min={10}
                max={70}
                step={1}
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Monthly Rent (your figure):</span>
                <span className={styles.inputVal}>₹{monthlyRent.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={50000}
                max={1500000}
                step={10000}
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Open Hours per Day (your figure):</span>
                <span className={styles.inputVal}>{openHoursPerDay} hours</span>
              </label>
              <input
                type="range"
                min={4}
                max={18}
                step={1}
                value={openHoursPerDay}
                onChange={(e) => setOpenHoursPerDay(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Seatings per Table per Day (your figure):</span>
                <span className={styles.inputVal}>{seatingsPerTablePerDay} seatings</span>
              </label>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={seatingsPerTablePerDay}
                onChange={(e) => setSeatingsPerTablePerDay(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Minutes of Waiting Removed per Seating (your assumption):</span>
                <span className={styles.inputVal}>{minutesSavedPerSeating} min</span>
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={minutesSavedPerSeating}
                onChange={(e) => setMinutesSavedPerSeating(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Mumbai Table-Time Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Monthly Rent (your figure):</span>
                <span className={styles.statVal}>₹{monthlyRent.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Rent per Table-Hour:</span>
                <span className={styles.statVal}>₹{revpashResults.rentCostPerTableHour.toLocaleString('en-IN')} / table-hr</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Rent Cost of the Wait, per Seating:</span>
                <span className={styles.statVal}>₹{revpashResults.rentCostOfWaitPerSeating.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Table-Hours Freed per Month (estimate):</span>
                <span className={styles.greenVal}>{revpashResults.tableHoursFreed.toLocaleString('en-IN')} table-hrs</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Rent Value of That Table Time (estimate):</span>
                <span className={styles.highlightVal}>₹{revpashResults.rentValueOfFreedTime.toLocaleString('en-IN')}/mo</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              Estimate only, built from the figures and assumptions you entered. Freed table time turns into revenue only if you can seat more guests in it; KNOMI does not promise a set number of minutes, and we measure what actually changes with you, on your own tables. Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.
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
                <span className={styles.inputVal}>{dailyCovers} diners/day</span>
              </label>
              <input
                type="range"
                min={50}
                max={900}
                step={10}
                value={dailyCovers}
                onChange={(e) => setDailyCovers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Spend per Diner:</span>
                <span className={styles.inputVal}>₹{avgCoverSpend.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={200}
                max={3000}
                step={50}
                value={avgCoverSpend}
                onChange={(e) => setAvgCoverSpend(Number(e.target.value))}
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
              <div className={styles.resultTitle}>Mumbai Average Order Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Diners per Month:</span>
                <span className={styles.statVal}>{basketResults.monthlyGuests.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Spend per Diner at {orderLiftPct}% Lift:</span>
                <span className={styles.statVal}>+₹{basketResults.incrementalSpendPerGuest.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Monthly Revenue (estimate):</span>
                <span className={styles.statVal}>+₹{basketResults.monthlyExtraRevenue.toLocaleString('en-IN')}/mo</span>
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
              The lift starts at 0%: set your own assumption. It is not a KNOMI result or a guarantee. Knomi Host suggests pairings, such as a signature cocktail with small plates; the real effect is something we measure with you on your own tables.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
