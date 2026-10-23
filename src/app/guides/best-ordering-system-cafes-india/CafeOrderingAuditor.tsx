'use client';

import React, { useState } from 'react';
import styles from './CafeOrderingGuide.module.css';

export default function CafeOrderingAuditor() {
  const [activeTab, setActiveTab] = useState<'queueSimulator' | 'laptopModeler'>('queueSimulator');

  // Mode 1: Counter Queue State
  const [hourlyFootfall, setHourlyFootfall] = useState<number>(85); // Patrons arriving per rush hour
  const [orderLatencySeconds, setOrderLatencySeconds] = useState<number>(75); // Seconds per counter interaction
  const [registersCount, setRegistersCount] = useState<number>(1);
  const [avgTicket, setAvgTicket] = useState<number>(320); // Rs spend per coffee/snack order
  const [walkAwayPct, setWalkAwayPct] = useState<number>(50); // user's assumption: share of the overflow who leave

  // Mode 2: Laptop Table Yield State (rates are the user's own estimates/assumptions)
  const [laptopTables, setLaptopTables] = useState<number>(22); // Seated tables with laptops/work
  const [firstOrderSpend, setFirstOrderSpend] = useState<number>(280);
  const [secondCoffeePrice, setSecondCoffeePrice] = useState<number>(240);
  const [baselineReorderRate, setBaselineReorderRate] = useState<number>(10); // % who reorder today
  const [reorderRateWithTabletop, setReorderRateWithTabletop] = useState<number>(20); // % assumed with table ordering

  // Mode 1 Calculations
  const calculateQueue = () => {
    const maxRegisterCapacityPerHour = Math.floor((3600 / orderLatencySeconds) * registersCount);
    const excessPatrons = Math.max(0, hourlyFootfall - maxRegisterCapacityPerHour);
    const estimatedWalkAways = Math.round(excessPatrons * (walkAwayPct / 100)); // user's assumption

    const servedPatrons = hourlyFootfall - estimatedWalkAways;
    const currentRushRevenuePerHour = servedPatrons * avgTicket;
    const lostRushRevenuePerHour = estimatedWalkAways * avgTicket;

    const dailyLostRevenue = lostRushRevenuePerHour * 3; // assumes 3 peak rush hours per day (morning + afternoon)
    const monthlyLostRevenue = dailyLostRevenue * 30;
    const annualLostRevenue = monthlyLostRevenue * 12;

    return {
      maxRegisterCapacityPerHour,
      estimatedWalkAways,
      servedPatrons,
      currentRushRevenuePerHour,
      lostRushRevenuePerHour,
      dailyLostRevenue,
      monthlyLostRevenue,
      annualLostRevenue,
    };
  };

  // Mode 2 Calculations (estimates from the user's own inputs)
  const calculateLaptopYield = () => {
    const baselineDailySpend =
      laptopTables * (firstOrderSpend + (baselineReorderRate / 100) * secondCoffeePrice);

    // With table ordering: the second round no longer means packing up and queuing again
    const optimizedDailySpend =
      laptopTables * (firstOrderSpend + (reorderRateWithTabletop / 100) * secondCoffeePrice);

    const dailyLift = Math.round(optimizedDailySpend - baselineDailySpend);
    const spendLiftPerTable = Math.round(dailyLift / laptopTables);
    const monthlyLift = dailyLift * 30;
    const annualLift = monthlyLift * 12;

    return {
      baselineDailySpend: Math.round(baselineDailySpend),
      optimizedDailySpend: Math.round(optimizedDailySpend),
      dailyLift,
      spendLiftPerTable,
      monthlyLift,
      annualLift,
    };
  };

  const queueResults = calculateQueue();
  const laptopResults = calculateLaptopYield();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Cafe Queue Throughput &amp; Table Yield Auditor</h3>
        <p className={styles.calcSubtitle}>
          Model morning counter congestion walkaways and calculate laptop table reorder economics
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'queueSimulator' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('queueSimulator')}
        >
          Mode 1: Counter Queue &amp; Rush Walkaways
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'laptopModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('laptopModeler')}
        >
          Mode 2: Remote Worker &amp; Laptop Table Yield
        </button>
      </div>

      {activeTab === 'queueSimulator' ? (
        <div className={styles.calcGrid}>
          {/* Controls Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Peak Rush Footfall (Customers / Hour)</span>
                <span className={styles.inputVal}>{hourlyFootfall} Patrons</span>
              </label>
              <input
                type="range"
                min={30}
                max={160}
                step={5}
                value={hourlyFootfall}
                onChange={(e) => setHourlyFootfall(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>POS Order &amp; Payment Latency</span>
                <span className={styles.inputVal}>{orderLatencySeconds} Seconds / customer</span>
              </label>
              <input
                type="range"
                min={40}
                max={120}
                step={5}
                value={orderLatencySeconds}
                onChange={(e) => setOrderLatencySeconds(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Active Counter Registers</span>
                <span className={styles.inputVal}>{registersCount} POS Terminal{registersCount > 1 ? 's' : ''}</span>
              </label>
              <input
                type="range"
                min={1}
                max={2}
                step={1}
                value={registersCount}
                onChange={(e) => setRegistersCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Order Ticket Size</span>
                <span className={styles.inputVal}>Rs {avgTicket}</span>
              </label>
              <input
                type="range"
                min={180}
                max={600}
                step={20}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Share of Overflow Who Walk Away (Your Assumption)</span>
                <span className={styles.inputVal}>{walkAwayPct}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={walkAwayPct}
                onChange={(e) => setWalkAwayPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Counter Bottleneck Analysis</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Max Register Capacity:</span>
                <span className={styles.statValue}>
                  {queueResults.maxRegisterCapacityPerHour} orders / hour
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Rush Queue Walkaways:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  ~{queueResults.estimatedWalkAways} patrons / rush hour
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Lost Sales per Rush Hour:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  Rs {queueResults.lostRushRevenuePerHour.toLocaleString()}
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Daily Rush Revenue Bleed (3 hrs):</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  Rs {queueResults.dailyLostRevenue.toLocaleString()} / day
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>With Tabletop Self-Ordering:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  Seated guests order in parallel
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Annual Rush Revenue at Stake:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ fontSize: '1.2rem' }}>
                  Rs {(queueResults.annualLostRevenue / 100000).toFixed(2)} Lakhs / yr
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 0' }}>
                Estimate from your inputs, assuming 3 rush hours a day and 30 trading days a month.
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
                <span>Daily Remote Worker / Laptop Tables</span>
                <span className={styles.inputVal}>{laptopTables} Tables</span>
              </label>
              <input
                type="range"
                min={10}
                max={50}
                step={2}
                value={laptopTables}
                onChange={(e) => setLaptopTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Initial Beverage Spend</span>
                <span className={styles.inputVal}>Rs {firstOrderSpend}</span>
              </label>
              <input
                type="range"
                min={180}
                max={450}
                step={10}
                value={firstOrderSpend}
                onChange={(e) => setFirstOrderSpend(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Second-Round Order Value</span>
                <span className={styles.inputVal}>Rs {secondCoffeePrice}</span>
              </label>
              <input
                type="range"
                min={150}
                max={350}
                step={10}
                value={secondCoffeePrice}
                onChange={(e) => setSecondCoffeePrice(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Second-Round Rate Today (Your Estimate)</span>
                <span className={styles.inputVal}>{baselineReorderRate}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={baselineReorderRate}
                onChange={(e) => setBaselineReorderRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Second-Round Rate with Table Ordering (Your Assumption)</span>
                <span className={styles.inputVal}>{reorderRateWithTabletop}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={reorderRateWithTabletop}
                onChange={(e) => setReorderRateWithTabletop(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Laptop Table Yield Expansion</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Baseline Daily Spend (Counter Queue):</span>
                <span className={styles.statValue}>Rs {laptopResults.baselineDailySpend.toLocaleString()}</span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Spend with Table Ordering:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  Rs {laptopResults.optimizedDailySpend.toLocaleString()}
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Lift per Laptop Table:</span>
                <span className={styles.statHighlight}>
                  +Rs {laptopResults.spendLiftPerTable} per session
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Daily Incremental Revenue:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  +Rs {laptopResults.dailyLift.toLocaleString()} / day
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Incremental Revenue:</span>
                <span className={styles.statHighlight}>
                  Rs {(laptopResults.monthlyLift / 100000).toFixed(2)} Lakhs / mo
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Annual Incremental Revenue:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`} style={{ fontSize: '1.2rem' }}>
                  Rs {(laptopResults.annualLift / 100000).toFixed(2)} Lakhs / yr
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 0' }}>
                Estimate based on your own rates above, not a KNOMI result.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
