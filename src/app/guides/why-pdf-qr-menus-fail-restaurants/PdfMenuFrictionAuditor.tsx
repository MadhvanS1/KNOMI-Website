'use client';

import React, { useState } from 'react';
import styles from './PdfMenuFrictionGuide.module.css';

export default function PdfMenuFrictionAuditor() {
  const [activeTab, setActiveTab] = useState<'latency' | 'revenue'>('latency');

  // Mode 1: Latency & Data Burn State
  const [fileSizeMb, setFileSizeMb] = useState<number>(24);
  const [networkSpeedMbps, setNetworkSpeedMbps] = useState<number>(2); // Congested indoor 4G
  const [monthlyScans, setMonthlyScans] = useState<number>(1500);
  // The share of guests who give up on the PDF is the user's own assumption, not a measured rate.
  const [abandonmentRate, setAbandonmentRate] = useState<number>(20);

  // Mode 2: Labor & Revenue State
  const [monthlyTables, setMonthlyTables] = useState<number>(1500);
  const [averageCheck, setAverageCheck] = useState<number>(950);
  const [paperWaitMins, setPaperWaitMins] = useState<number>(4);
  // Average-order lift to model: the user's assumption. KNOMI's +25% is a target, not a guarantee.
  const [liftPct, setLiftPct] = useState<number>(25);

  // Mode 1 Calculations (arithmetic on the user's inputs)
  const calculateLatency = () => {
    const downloadSeconds = Number(((fileSizeMb * 8) / networkSpeedMbps).toFixed(1));
    const monthlyGigabytesBurned = Number(((monthlyScans * fileSizeMb) / 1024).toFixed(1));
    const abandonedTables = Math.round((monthlyScans * abandonmentRate) / 100);

    return {
      downloadSeconds,
      monthlyGigabytesBurned,
      abandonedTables,
    };
  };

  // Mode 2 Calculations (estimates from the user's inputs)
  const calculateRevenueEstimate = () => {
    const abandonedCount = Math.round((monthlyTables * abandonmentRate) / 100);
    const monthlyHoursBurned = Math.round((abandonedCount * paperWaitMins) / 60);

    const monthlyGross = monthlyTables * averageCheck;
    const monthlyUpside = Math.round(monthlyGross * (liftPct / 100));
    const annualUpside = monthlyUpside * 12;

    return {
      abandonedCount,
      monthlyHoursBurned,
      monthlyUpside,
      annualUpside,
    };
  };

  const lat = calculateLatency();
  const rev = calculateRevenueEstimate();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Interactive PDF Menu Friction & Latency Auditor</h3>
        <p className={styles.calcSubtitle}>
          Estimate download wait, guest mobile data use, waiter time spent rescuing tables, and the value of a higher average order, using your own numbers.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'latency' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('latency')}
        >
          1. 4G Latency & Mobile Bounce Simulator
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'revenue' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          2. Floor Labor & Revenue Estimate
        </button>
      </div>

      {activeTab === 'latency' ? (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Menu PDF File Size: <span className={styles.inputVal}>{fileSizeMb} MB</span>
              </label>
              <input
                type="range"
                min="2"
                max="45"
                step="1"
                value={fileSizeMb}
                onChange={(e) => setFileSizeMb(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Print exports with embedded photos can run to tens of megabytes. Check the size of your own file.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Indoor Cellular / Wi-Fi Network</label>
              <select
                className={styles.selectInput}
                value={networkSpeedMbps}
                onChange={(e) => setNetworkSpeedMbps(Number(e.target.value))}
              >
                <option value="50">Strong 5G signal (50 Mbps)</option>
                <option value="8">Good 4G signal (8 Mbps)</option>
                <option value="2">Congested indoor 4G (2 Mbps): deep indoor seating</option>
                <option value="1">Basement dining / weak Wi-Fi (1 Mbps): severe bottleneck</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Monthly Table Scans: <span className={styles.inputVal}>{monthlyScans.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={monthlyScans}
                onChange={(e) => setMonthlyScans(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Guests Who Give Up on the PDF (your estimate): <span className={styles.inputVal}>{abandonmentRate}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={abandonmentRate}
                onChange={(e) => setAbandonmentRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Your own assumption: the share of tables that ask for a paper menu or a waiter instead.
              </span>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Diner Experience Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Diner Download Wait Time:</span>
                <span className={`${styles.statValue} ${lat.downloadSeconds > 5 ? styles.statRisk : ''}`}>
                  {lat.downloadSeconds} seconds
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Monthly Cellular Data Used:</span>
                <span className={styles.statValue}>{lat.monthlyGigabytesBurned} GB of guest data</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Assumed Table Bounce Rate:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>{abandonmentRate}% of tables</span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated Abandoned Scans:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#a8402f' }}>
                  {lat.abandonedTables.toLocaleString('en-IN')} tables / mo
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(168, 64, 47, 0.08)', border: '1px solid rgba(168, 64, 47, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#a8402f', lineHeight: '1.5' }}>
              <strong>Why seconds matter: </strong>
              The longer a page takes to appear, the more people give up before it does.
              At {lat.downloadSeconds}s of waiting, and with your estimate that {abandonmentRate}% of tables give up, about {lat.abandonedTables.toLocaleString('en-IN')} scans a month end with a paper menu or the simplest safe dish.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Monthly Dining Tables: <span className={styles.inputVal}>{monthlyTables.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={monthlyTables}
                onChange={(e) => setMonthlyTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Average Table Check: <span className={styles.inputVal}>₹{averageCheck.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="400"
                max="3000"
                step="50"
                value={averageCheck}
                onChange={(e) => setAverageCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Waiter Delay to Rescue Table: <span className={styles.inputVal}>{paperWaitMins} Minutes</span>
              </label>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={paperWaitMins}
                onChange={(e) => setPaperWaitMins(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Time spent locating clean paper menus, walking to table, and taking manual order.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Average-Order Lift to Model (your assumption): <span className={styles.inputVal}>{liftPct}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={liftPct}
                onChange={(e) => setLiftPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                KNOMI&apos;s target is around +25% (not a guarantee). Set the lift you want to test.
              </span>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Operational & Financial Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Tables Requiring Paper Rescue ({abandonmentRate}%, set in tab 1):</span>
                <span className={styles.statValue} style={{ color: '#a8402f' }}>
                  {rev.abandonedCount.toLocaleString('en-IN')} tables/mo
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Waiter Hours Spent:</span>
                <span className={styles.statValue} style={{ color: '#a8402f' }}>
                  {rev.monthlyHoursBurned} hours/mo
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Monthly Value of a {liftPct}% Higher Average Order:</span>
                <span className={styles.statValue}>
                  ₹{(rev.monthlyUpside / 1000).toFixed(0)}k/mo
                </span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated Annual Upside:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52', fontSize: '1.25rem' }}>
                  ₹{(rev.annualUpside / 100000).toFixed(2)} Lakhs/yr
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>Reading this estimate: </strong>
              On your inputs, tables that fall back to paper menus take about {rev.monthlyHoursBurned} waiter-hours a month, and a {liftPct}% higher average order would be worth about ₹{(rev.annualUpside / 100000).toFixed(2)} lakhs a year.
              These figures come from your assumptions, not from results. KNOMI&apos;s +25% is a target we measure with you on your own tables, not a guarantee.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
