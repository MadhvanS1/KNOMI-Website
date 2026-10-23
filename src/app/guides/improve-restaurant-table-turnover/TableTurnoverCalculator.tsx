'use client';

import React, { useState } from 'react';
import styles from './TableTurnoverGuide.module.css';

const hintStyle: React.CSSProperties = {
  display: 'block',
  marginTop: '6px',
  fontSize: '0.8rem',
  color: 'var(--color-text-muted)',
  lineHeight: 1.4,
};

export default function TableTurnoverCalculator() {
  const [activeTab, setActiveTab] = useState<'deadtime' | 'revpash'>('deadtime');

  // Mode 1: Service Cycle Breakdown (Minutes)
  const [waterWaitMins, setWaterWaitMins] = useState<number>(4);
  const [orderWaitMins, setOrderWaitMins] = useState<number>(8);
  const [kitchenPrepMins, setKitchenPrepMins] = useState<number>(15);
  const [diningEnjoyMins, setDiningEnjoyMins] = useState<number>(30);
  const [billWaitMins, setBillWaitMins] = useState<number>(9);
  const [busResetMins, setBusResetMins] = useState<number>(4);
  // The user's own assumption: how much of the order + bill waiting they could remove
  const [waitCutPct, setWaitCutPct] = useState<number>(50);

  // Mode 2: RevPASH Modeler
  const [seatCount, setSeatCount] = useState<number>(60);
  const [rushHours, setRushHours] = useState<number>(3);
  const [spendPerSeat, setSpendPerSeat] = useState<number>(650);
  const [currentTurns, setCurrentTurns] = useState<number>(2.2);
  // The user's own assumptions for the "what if" scenario
  const [extraTurns, setExtraTurns] = useState<number>(0.3);
  const [spendLiftPct, setSpendLiftPct] = useState<number>(10);

  // Mode 1 Calculations
  const calculateDeadTime = () => {
    const totalDuration =
      waterWaitMins +
      orderWaitMins +
      kitchenPrepMins +
      diningEnjoyMins +
      billWaitMins +
      busResetMins;

    const deadTimeMinutes = waterWaitMins + orderWaitMins + billWaitMins + busResetMins;
    const deadTimePercent = Number(((deadTimeMinutes / totalDuration) * 100).toFixed(1));

    const rushMinutes = 180; // 3-Hour Dinner Rush
    const currentRushTurns = Number((rushMinutes / totalDuration).toFixed(2));

    // Estimate only: remove the user's assumed share of the order and bill waiting
    const minutesRemoved = Math.round((orderWaitMins + billWaitMins) * (waitCutPct / 100));
    const optimizedDuration = totalDuration - minutesRemoved;
    const optimizedRushTurns = Number((rushMinutes / optimizedDuration).toFixed(2));
    const turnIncreasePercent = Number(
      (((optimizedRushTurns - currentRushTurns) / currentRushTurns) * 100).toFixed(1)
    );

    return {
      totalDuration,
      deadTimeMinutes,
      deadTimePercent,
      currentRushTurns,
      minutesRemoved,
      optimizedDuration,
      optimizedRushTurns,
      turnIncreasePercent,
    };
  };

  // Mode 2 Calculations (RevPASH)
  const calculateRevpash = () => {
    const totalSeatHours = seatCount * rushHours;
    const currentDailyRushRevenue = Math.round(seatCount * currentTurns * spendPerSeat);
    const currentRevpash = Number((currentDailyRushRevenue / totalSeatHours).toFixed(2));

    // Estimate only: apply the user's own assumptions for extra turns and spend per seat
    const optimizedTurns = Number((currentTurns + extraTurns).toFixed(2));
    const optimizedSpendPerSeat = Math.round(spendPerSeat * (1 + spendLiftPct / 100));
    const optimizedDailyRushRevenue = Math.round(seatCount * optimizedTurns * optimizedSpendPerSeat);
    const optimizedRevpash = Number((optimizedDailyRushRevenue / totalSeatHours).toFixed(2));

    const dailyRevenueLift = optimizedDailyRushRevenue - currentDailyRushRevenue;
    const monthlyRevenueLift = dailyRevenueLift * 30;

    return {
      totalSeatHours,
      currentDailyRushRevenue,
      currentRevpash,
      optimizedTurns,
      optimizedSpendPerSeat,
      optimizedDailyRushRevenue,
      optimizedRevpash,
      dailyRevenueLift,
      monthlyRevenueLift,
    };
  };

  const cycle = calculateDeadTime();
  const rev = calculateRevpash();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Interactive Table Turnover & RevPASH Calculator</h3>
        <p className={styles.calcSubtitle}>
          Audit service cycle bottlenecks, see how much of each seating is dead time, and estimate peak-rush RevPASH with your own numbers.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'deadtime' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('deadtime')}
        >
          1. Service Cycle Dead-Time Auditor
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'revpash' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('revpash')}
        >
          2. RevPASH & Rush Revenue Modeler
        </button>
      </div>

      {activeTab === 'deadtime' ? (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Wait for Water / Paper Menus: <span className={styles.inputVal}>{waterWaitMins} mins</span>
              </label>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={waterWaitMins}
                onChange={(e) => setWaterWaitMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Wait to Wave Waiter & Punch Order: <span className={styles.inputVal}>{orderWaitMins} mins</span>
              </label>
              <input
                type="range"
                min="2"
                max="15"
                step="1"
                value={orderWaitMins}
                onChange={(e) => setOrderWaitMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Kitchen Cooking & Plating: <span className={styles.inputVal}>{kitchenPrepMins} mins</span>
              </label>
              <input
                type="range"
                min="10"
                max="25"
                step="1"
                value={kitchenPrepMins}
                onChange={(e) => setKitchenPrepMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Unhurried Dining & Enjoyment: <span className={styles.inputVal}>{diningEnjoyMins} mins</span>
              </label>
              <input
                type="range"
                min="20"
                max="50"
                step="5"
                value={diningEnjoyMins}
                onChange={(e) => setDiningEnjoyMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Wait for Bill, Cashier Print & UPI: <span className={styles.inputVal}>{billWaitMins} mins</span>
              </label>
              <input
                type="range"
                min="3"
                max="16"
                step="1"
                value={billWaitMins}
                onChange={(e) => setBillWaitMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Table Bussing & Reset: <span className={styles.inputVal}>{busResetMins} mins</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={busResetMins}
                onChange={(e) => setBusResetMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Order & Bill Waiting You Could Remove (Your Assumption): <span className={styles.inputVal}>{waitCutPct}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="80"
                step="10"
                value={waitCutPct}
                onChange={(e) => setWaitCutPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={hintStyle}>
                Your own estimate of how much of the order and bill wait could go, for example with tabletop ordering and UPI at the table.
              </span>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Service Bottleneck Audit</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total Seating Duration:</span>
                <span className={styles.statValue}>{cycle.totalDuration} minutes</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total Service Dead Time:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  {cycle.deadTimeMinutes} mins ({cycle.deadTimePercent}%)
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Current Turns (3-Hour Rush):</span>
                <span className={styles.statValue}>{cycle.currentRushTurns} turns/table</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Table Duration After the Change:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  {cycle.optimizedDuration} minutes
                </span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated Rush Cover Expansion:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52', fontSize: '1.25rem' }}>
                  +{cycle.turnIncreasePercent}% more covers
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>The Golden Rule of Pacing: </strong>
              Guests still spend the full {diningEnjoyMins} minutes enjoying their meal. In this estimate, the extra capacity comes only from removing {cycle.minutesRemoved} minutes of waiting before and after the food, based on your own assumption above. It is an estimate from your inputs, not a promised result.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Dining Room Total Seats: <span className={styles.inputVal}>{seatCount} Seats</span>
              </label>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={seatCount}
                onChange={(e) => setSeatCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Peak Dinner Window: <span className={styles.inputVal}>{rushHours} Hours</span>
              </label>
              <input
                type="range"
                min="2"
                max="4"
                step="0.5"
                value={rushHours}
                onChange={(e) => setRushHours(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Current Average Spend Per Seat: <span className={styles.inputVal}>Rs {spendPerSeat.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="300"
                max="1500"
                step="50"
                value={spendPerSeat}
                onChange={(e) => setSpendPerSeat(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Current Rush Turns Per Table: <span className={styles.inputVal}>{currentTurns} Turns</span>
              </label>
              <input
                type="range"
                min="1.5"
                max="3.2"
                step="0.1"
                value={currentTurns}
                onChange={(e) => setCurrentTurns(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Extra Turns Per Table (Your Assumption): <span className={styles.inputVal}>+{extraTurns.toFixed(1)} Turns</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={extraTurns}
                onChange={(e) => setExtraTurns(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={hintStyle}>
                Use the dead-time auditor to sense-check this against your own service cycle.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Spend Per Seat Lift (Your Assumption): <span className={styles.inputVal}>+{spendLiftPct}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={spendLiftPct}
                onChange={(e) => setSpendLiftPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={hintStyle}>
                Your own assumption: set your own figure here.
              </span>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>RevPASH (Revenue Per Available Seat-Hour)</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total Seat-Hours Available:</span>
                <span className={styles.statValue}>{rev.totalSeatHours} seat-hours</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Current RevPASH:</span>
                <span className={styles.statValue}>Rs {rev.currentRevpash} / seat-hour</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated RevPASH (Your Assumptions):</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`} style={{ fontSize: '1.05rem' }}>
                  Rs {rev.optimizedRevpash} / seat-hour
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Extra Rush Revenue:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  + Rs {rev.dailyRevenueLift.toLocaleString('en-IN')} / night
                </span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated Monthly Revenue Lift (30 Nights):</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52', fontSize: '1.25rem' }}>
                  + Rs {(rev.monthlyRevenueLift / 100000).toFixed(2)} Lakhs/mo
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>The RevPASH Multiplier: </strong>
              If both of your assumptions hold (+{extraTurns.toFixed(1)} turns per table and +{spendLiftPct}% spend per seat), the same chairs and kitchen would bring in an estimated extra Rs {(rev.monthlyRevenueLift / 100000).toFixed(2)} Lakhs in rush-hour revenue over 30 nights. This is an estimate from your inputs, not a promised result.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
