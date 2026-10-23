'use client';

import React, { useState } from 'react';
import styles from './NoShowPolicyGuide.module.css';

const formatLakhs = (value: number) => {
  const sign = value < 0 ? '-' : '+';
  return `${sign}Rs ${(Math.abs(value) / 100000).toFixed(2)} Lakhs`;
};

export default function NoShowPolicyAuditor() {
  const [activeTab, setActiveTab] = useState<'bleedAuditor' | 'policySimulator'>('bleedAuditor');

  // Mode 1: Table Bleed State (the user's own inputs)
  const [weekendTables, setWeekendTables] = useState<number>(45); // Prime weekend reservation slots
  const [coversPerTable, setCoversPerTable] = useState<number>(4);
  const [spendPerCover, setSpendPerCover] = useState<number>(750);
  const [noShowRate, setNoShowRate] = useState<number>(18); // % of reservations that ghost
  const [walkinBackfillRate, setWalkinBackfillRate] = useState<number>(40); // % of ghosted tables saved by walk-ins

  // Mode 2: Policy Comparison State (the user's own inputs and assumptions)
  const [monthlyBookings, setMonthlyBookings] = useState<number>(200);
  const [avgTicketPerTable, setAvgTicketPerTable] = useState<number>(3000);
  const [currentNoShowPct, setCurrentNoShowPct] = useState<number>(18);
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [penaltyDropoffPct, setPenaltyDropoffPct] = useState<number>(35);
  const [penaltyNoShowPct, setPenaltyNoShowPct] = useState<number>(2);
  const [creditDropoffPct, setCreditDropoffPct] = useState<number>(4);
  const [creditNoShowPct, setCreditNoShowPct] = useState<number>(3);

  // Mode 1 Calculations (arithmetic on the user's inputs)
  const calculateBleed = () => {
    const tableRevenue = coversPerTable * spendPerCover;
    const potentialWeekendRevenue = weekendTables * tableRevenue;
    const ghostedTables = Math.round(weekendTables * (noShowRate / 100));
    const unfilledTables = Math.round(ghostedTables * (1 - walkinBackfillRate / 100));
    const backfilledTables = ghostedTables - unfilledTables;

    const weekendLostRevenue = unfilledTables * tableRevenue;
    const monthlyLostRevenue = weekendLostRevenue * 4.2; // 4.2 weekends per month
    const annualLostRevenue = monthlyLostRevenue * 12;

    return {
      tableRevenue,
      potentialWeekendRevenue,
      ghostedTables,
      unfilledTables,
      backfilledTables,
      weekendLostRevenue,
      monthlyLostRevenue: Math.round(monthlyLostRevenue),
      annualLostRevenue: Math.round(annualLostRevenue),
    };
  };

  // Mode 2 Calculations (estimates from the user's assumptions)
  const calculatePolicies = () => {
    // Policy A: Zero Deposit (Status Quo)
    const policyABookings = monthlyBookings;
    const policyANoShows = Math.round(policyABookings * (currentNoShowPct / 100));
    const policyASeated = policyABookings - policyANoShows;
    const policyARevenue = policyASeated * avgTicketPerTable;

    // Policy B: Blanket Non-Refundable Penalty (user's assumptions for drop-off and no-shows)
    const policyBBookings = Math.round(monthlyBookings * (1 - penaltyDropoffPct / 100));
    const policyBNoShows = Math.round(policyBBookings * (penaltyNoShowPct / 100));
    const policyBSeated = policyBBookings - policyBNoShows;
    const policyBRevenue = policyBSeated * avgTicketPerTable + policyBNoShows * depositAmount;

    // Policy C: Redeemable Cover Credit on prime slots (user's assumptions for drop-off and no-shows)
    const policyCBookings = Math.round(monthlyBookings * (1 - creditDropoffPct / 100));
    const policyCNoShows = Math.round(policyCBookings * (creditNoShowPct / 100));
    const policyCSeated = policyCBookings - policyCNoShows;
    const policyCRevenue = policyCSeated * avgTicketPerTable + policyCNoShows * depositAmount;

    const monthlyDeltaAtoC = policyCRevenue - policyARevenue;
    const annualDeltaAtoC = monthlyDeltaAtoC * 12;

    return {
      policyA: {
        bookings: policyABookings,
        noShows: policyANoShows,
        seated: policyASeated,
        revenue: policyARevenue,
      },
      policyB: {
        bookings: policyBBookings,
        noShows: policyBNoShows,
        seated: policyBSeated,
        revenue: policyBRevenue,
      },
      policyC: {
        bookings: policyCBookings,
        noShows: policyCNoShows,
        seated: policyCSeated,
        revenue: policyCRevenue,
      },
      monthlyDeltaAtoC,
      annualDeltaAtoC,
    };
  };

  const bleedResults = calculateBleed();
  const policyResults = calculatePolicies();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Restaurant No-Show Bleed &amp; Policy Auditor</h3>
        <p className={styles.calcSubtitle}>
          Estimate unrecoverable table evaporation during peak rush hours and compare deposit models using your own assumptions
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'bleedAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('bleedAuditor')}
        >
          Mode 1: Table Bleed &amp; Revenue Attrition
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'policySimulator' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('policySimulator')}
        >
          Mode 2: Deposit Policy Comparison
        </button>
      </div>

      {activeTab === 'bleedAuditor' ? (
        <div className={styles.calcGrid}>
          {/* Controls Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Weekend Prime-Time Tables (Fri-Sun)</span>
                <span className={styles.inputVal}>{weekendTables} Tables</span>
              </label>
              <input
                type="range"
                min={15}
                max={100}
                step={5}
                value={weekendTables}
                onChange={(e) => setWeekendTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Covers per Reservation</span>
                <span className={styles.inputVal}>{coversPerTable} Diners</span>
              </label>
              <input
                type="range"
                min={2}
                max={8}
                step={1}
                value={coversPerTable}
                onChange={(e) => setCoversPerTable(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Dining Spend per Cover</span>
                <span className={styles.inputVal}>Rs {spendPerCover.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={350}
                max={2000}
                step={50}
                value={spendPerCover}
                onChange={(e) => setSpendPerCover(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your No-Show &amp; Ghosting Rate</span>
                <span className={styles.inputVal}>{noShowRate}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={35}
                step={1}
                value={noShowRate}
                onChange={(e) => setNoShowRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Walk-in Backfill Rate (% tables saved)</span>
                <span className={styles.inputVal}>{walkinBackfillRate}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={80}
                step={5}
                value={walkinBackfillRate}
                onChange={(e) => setWalkinBackfillRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Table Evaporation Estimate</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Revenue Potential per Table:</span>
                <span className={styles.statValue}>Rs {bleedResults.tableRevenue.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Ghosted Reservations / Weekend:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  {bleedResults.ghostedTables} Tables
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Re-seated by Walk-ins:</span>
                <span className={styles.statHighlight}>
                  {bleedResults.backfilledTables} Tables / weekend
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Net Unrecoverable Empty Tables:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  {bleedResults.unfilledTables} Tables / weekend
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Revenue Bleed:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  Rs {bleedResults.monthlyLostRevenue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Annual Revenue Lost:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`} style={{ fontSize: '1.2rem' }}>
                  Rs {(bleedResults.annualLostRevenue / 100000).toFixed(2)} Lakhs / yr
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Monthly Prime Reservations</span>
                <span className={styles.inputVal}>{monthlyBookings} Bookings</span>
              </label>
              <input
                type="range"
                min={50}
                max={600}
                step={25}
                value={monthlyBookings}
                onChange={(e) => setMonthlyBookings(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Spend per Table</span>
                <span className={styles.inputVal}>Rs {avgTicketPerTable.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={1200}
                max={6000}
                step={200}
                value={avgTicketPerTable}
                onChange={(e) => setAvgTicketPerTable(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your No-Show Rate Today (Policy A)</span>
                <span className={styles.inputVal}>{currentNoShowPct}%</span>
              </label>
              <input
                type="range"
                min={2}
                max={35}
                step={1}
                value={currentNoShowPct}
                onChange={(e) => setCurrentNoShowPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Deposit per Booking (Kept on a No-Show)</span>
                <span className={styles.inputVal}>Rs {depositAmount.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={200}
                max={3000}
                step={100}
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Policy B: Bookings Lost to the Fee (Your Assumption)</span>
                <span className={styles.inputVal}>{penaltyDropoffPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={penaltyDropoffPct}
                onChange={(e) => setPenaltyDropoffPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Policy B: No-Show Rate with Fee (Your Assumption)</span>
                <span className={styles.inputVal}>{penaltyNoShowPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={penaltyNoShowPct}
                onChange={(e) => setPenaltyNoShowPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Policy C: Bookings Lost to the Credit (Your Assumption)</span>
                <span className={styles.inputVal}>{creditDropoffPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={creditDropoffPct}
                onChange={(e) => setCreditDropoffPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Policy C: No-Show Rate with Credit (Your Assumption)</span>
                <span className={styles.inputVal}>{creditNoShowPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={creditNoShowPct}
                onChange={(e) => setCreditNoShowPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <div className={styles.policyComparisonGrid}>
            {/* Policy A */}
            <div className={styles.policyCard}>
              <div className={styles.policyTitle}>Policy A: Zero Deposit</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Traditional frictionless booking; full no-show exposure.
              </p>
              <div className={styles.policyStat}>
                <span>No-Show Rate:</span>
                <span style={{ color: '#a8402f', fontWeight: 700 }}>{currentNoShowPct}%</span>
              </div>
              <div className={styles.policyStat}>
                <span>Actual Seated Tables:</span>
                <span>{policyResults.policyA.seated} / {policyResults.policyA.bookings}</span>
              </div>
              <div className={styles.policyStat}>
                <span>Estimated Monthly Revenue:</span>
                <span style={{ fontWeight: 700 }}>Rs {policyResults.policyA.revenue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Policy B */}
            <div className={styles.policyCard}>
              <div className={styles.policyTitle}>Policy B: Blanket Penalty Fee</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Non-refundable fee on every booking; some guests book elsewhere.
              </p>
              <div className={styles.policyStat}>
                <span>Booking Drop-off:</span>
                <span style={{ color: '#a8402f', fontWeight: 700 }}>-{penaltyDropoffPct}% bookings</span>
              </div>
              <div className={styles.policyStat}>
                <span>Actual Seated Tables:</span>
                <span>{policyResults.policyB.seated} / {policyResults.policyB.bookings}</span>
              </div>
              <div className={styles.policyStat}>
                <span>Estimated Monthly Revenue:</span>
                <span style={{ fontWeight: 700 }}>Rs {policyResults.policyB.revenue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Policy C */}
            <div className={`${styles.policyCard} ${styles.policyCardHighlighted}`}>
              <div className={styles.policyTitle} style={{ color: 'var(--color-whiskey-sour)' }}>
                Policy C: Dynamic Cover Credit
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                100% bill-adjusted credit; weekend prime-time &amp; 5+ groups only.
              </p>
              <div className={styles.policyStat}>
                <span>Booking Drop-off:</span>
                <span style={{ color: '#3f7a52', fontWeight: 700 }}>-{creditDropoffPct}% bookings</span>
              </div>
              <div className={styles.policyStat}>
                <span>Actual Seated Tables:</span>
                <span style={{ color: '#3f7a52', fontWeight: 700 }}>
                  {policyResults.policyC.seated} / {policyResults.policyC.bookings}
                </span>
              </div>
              <div className={styles.policyStat}>
                <span>Estimated Monthly Revenue:</span>
                <span style={{ color: '#3f7a52', fontWeight: 700 }}>
                  Rs {policyResults.policyC.revenue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--color-surface-pressed)', borderRadius: '8px', border: '1px solid var(--color-border-default)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ color: 'var(--color-text-primary)' }}>Policy C vs Zero Deposit:</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                  An estimate based on your inputs and assumptions above, not a promised result.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>Estimated Annual Difference</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-whiskey-sour)' }}>
                  {formatLakhs(policyResults.annualDeltaAtoC)} / yr
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
