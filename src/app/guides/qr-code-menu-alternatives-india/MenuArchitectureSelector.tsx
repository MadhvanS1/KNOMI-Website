'use client';

import React, { useState } from 'react';
import styles from './MenuAlternativesGuide.module.css';

// How KNOMI shapes spend, in words: no figure, since any lift depends on the restaurant.
const KNOMI_SPEND_IMPACT = 'Pairing suggestions from Knomi Host as guests order';

export default function MenuArchitectureSelector() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'capex'>('matrix');

  // Mode 1: Fitment Matrix State
  const [restaurantType, setRestaurantType] = useState<string>('casual');
  const [primaryGoal, setPrimaryGoal] = useState<string>('upsell');

  // Mode 2: 5-Year Capex State
  const [tableCount, setTableCount] = useState<number>(20);
  const [monthlyTables, setMonthlyTables] = useState<number>(1800);
  const [averageCheck, setAverageCheck] = useState<number>(1100);
  // The owner's own assumed lift in average order: starts modest, never a KNOMI figure.
  const [liftPct, setLiftPct] = useState<number>(10);

  // Mode 1 Logic
  const getFitmentData = () => {
    let architecture = 'Hybrid: Tactile Paper Menus + KNOMI Frictionless Visual Ordering';
    let hardwareCapex = "No table hardware (runs on guests' phones)";
    let tableTurnSpeed = 'No wait to place an order';
    let spendImpact = KNOMI_SPEND_IMPACT;
    let strategicAdvice = 'Provide 1-2 curated physical menus per table for tactile warmth, while placing engraved QR tokens for instant visual browsing, drink re-orders, and ordering without waiting for a waiter.';

    if (restaurantType === 'fine_dining') {
      architecture = 'Tactile Leather-Bound Paper Menus + Sommelier Digital Companion';
      hardwareCapex = 'Low (premium binding & print only)';
      tableTurnSpeed = 'Deliberate, unhurried pacing';
      spendImpact = 'Driven by server wine pairing upsells';
      strategicAdvice = 'In fine dining, guests pay for human theatre and sensory escapism. Avoid imposing mandatory self-service tech; preserve beautiful heavyweight paper menus and use digital tools strictly for cellar inventories or allergen queries.';
    } else if (restaurantType === 'bar_pub') {
      architecture = 'KNOMI Frictionless Tabletop Visual Web Ordering';
      hardwareCapex = "No table hardware (runs in the guest's browser)";
      tableTurnSpeed = 'Re-order from the table without flagging staff';
      spendImpact = KNOMI_SPEND_IMPACT;
      strategicAdvice = 'Busy pubs lose sales when guests cannot flag a bartender for round two. A frictionless web ordering flow lets guests re-order drinks from the table without waiting for staff.';
    } else if (restaurantType === 'qsr') {
      architecture = 'Self-Service Counter Kiosks + Express Pickup Screen';
      hardwareCapex = 'High (kiosk terminals)';
      tableTurnSpeed = 'Faster queue clearance';
      spendImpact = 'Combo prompts before the counter';
      strategicAdvice = 'Counter service benefits from large touch screens that break customer queues and visually merchandise meal combos before guests reach the pickup counter.';
    } else if (restaurantType === 'buffet') {
      architecture = 'Live Counter Display Boards + Table Beverage QR';
      hardwareCapex = 'Low (chalkboards or digital screens)';
      tableTurnSpeed = 'Fixed seating duration';
      spendImpact = 'Beverage and dessert add-ons at the table';
      strategicAdvice = 'Food is self-service at buffet counters. The primary revenue opportunity is table-side beverage and dessert ordering via zero-friction tabletop web tokens.';
    }

    return {
      architecture,
      hardwareCapex,
      tableTurnSpeed,
      spendImpact,
      strategicAdvice,
    };
  };

  // Mode 2 Calculations (5-Year Comparison). Paper, tablet and kiosk costs are illustrative assumptions, not quotes.
  const calculateCapex = () => {
    // 1. Physical Paper Menus (20 tables * 3 menus each = 60 menus, reprint 3x/year at Rs 250 each + seasonal specials)
    const annualPrintingCost = tableCount * 3 * 250 * 3 + 15000;
    const fiveYearPaperCost = annualPrintingCost * 5;

    // 2. Dedicated Tabletop Hardware Tablets (1 tablet per table at Rs 14,000 + docks + replacement reserves)
    const initialTabletCapex = tableCount * 14000 + tableCount * 1500;
    const annualTabletMaintenance = tableCount * 2500; // Breakage, battery swaps, cables
    const fiveYearTabletCost = initialTabletCapex + annualTabletMaintenance * 5;

    // 3. Self-Service Kiosks (2 kiosks for a 20-30 table restaurant)
    const initialKioskCapex = 2 * 180000;
    const annualKioskUpkeep = 2 * 18000;
    const fiveYearKioskCost = initialKioskCapex + annualKioskUpkeep * 5;

    // 4. KNOMI (runs on guests' phones, no table hardware). Extra sales at the lift the
    // owner assumes, before KNOMI's fee, which is shared on the walkthrough call.
    const annualGross = monthlyTables * averageCheck * 12;
    const fiveYearUpsellGain = Math.round(annualGross * (liftPct / 100) * 5);

    return {
      fiveYearPaperCost,
      fiveYearTabletCost,
      fiveYearKioskCost,
      fiveYearUpsellGain,
    };
  };

  const fit = getFitmentData();
  const cpx = calculateCapex();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Interactive Menu Architecture & ROI Selector</h3>
        <p className={styles.calcSubtitle}>
          Compare paper, dedicated tablets, self-serve kiosks, and frictionless visual web ordering for your venue typology.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'matrix' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('matrix')}
        >
          1. Format & Hospitality Fitment Matrix
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'capex' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('capex')}
        >
          2. 5-Year Capex & Revenue Estimator
        </button>
      </div>

      {activeTab === 'matrix' ? (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Restaurant Typology</label>
              <select
                className={styles.selectInput}
                value={restaurantType}
                onChange={(e) => setRestaurantType(e.target.value)}
              >
                <option value="fine_dining">Fine Dining / Chef-Led Tasting Room</option>
                <option value="casual">Casual Dining & Bistro (15 to 35 Tables)</option>
                <option value="bar_pub">High-Volume Bar, Pub or Microbrewery</option>
                <option value="qsr">Quick Service (QSR) / Fast Casual Counter</option>
                <option value="buffet">Buffet / Family Banquet Format</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Primary Business Objective</label>
              <select
                className={styles.selectInput}
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
              >
                <option value="upsell">Maximize Check Size & Pairing Upsells</option>
                <option value="speed">Accelerate Table Turns & Reduce Waiter Floor Drag</option>
                <option value="capex">Minimize Upfront Hardware & Setup Costs</option>
                <option value="hospitality">Preserve Warm Human Touch & Brand Ambience</option>
              </select>
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: '16px' }}>
              <strong>Operational Philosophy:</strong>
              <br />
              The goal of menu design is not merely listing food items; it is guiding guest attention toward high-margin preparations while removing mechanical friction from the dining room.
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Recommended Architecture</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Optimal Strategy:</span>
                <span className={styles.statValue} style={{ color: 'var(--color-whiskey-sour)', fontSize: '1rem' }}>
                  {fit.architecture}
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Hardware Capex:</span>
                <span className={styles.statValue}>{fit.hardwareCapex}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Ordering Speed:</span>
                <span className={styles.statValue} style={{ color: '#3f7a52' }}>{fit.tableTurnSpeed}</span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Spend Impact:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52' }}>
                  {fit.spendImpact}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Architectural Recommendation: </strong>
              {fit.strategicAdvice}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Dining Tables: <span className={styles.inputVal}>{tableCount} Tables</span>
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Monthly Table Volume: <span className={styles.inputVal}>{monthlyTables.toLocaleString('en-IN')} tables served</span>
              </label>
              <input
                type="range"
                min="600"
                max="4000"
                step="100"
                value={monthlyTables}
                onChange={(e) => setMonthlyTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Average Table Spend: <span className={styles.inputVal}>Rs {averageCheck.toLocaleString('en-IN')}</span>
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
              <label htmlFor="menu-lift" className={styles.inputLabel}>
                Lift in Average Order (Your Assumption): <span className={styles.inputVal}>+{liftPct}%</span>
              </label>
              <input
                id="menu-lift"
                type="range"
                min="0"
                max="40"
                step="1"
                value={liftPct}
                onChange={(e) => setLiftPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>5-Year Cost vs Sales Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Physical Paper Menus (Reprints & Wear, illustrative):</span>
                <span className={styles.statValue}>Rs {(cpx.fiveYearPaperCost / 100000).toFixed(2)} Lakhs (Expense)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Tabletop Tablets (Hardware + Upkeep, illustrative):</span>
                <span className={styles.statValue} style={{ color: '#a8402f' }}>Rs {(cpx.fiveYearTabletCost / 100000).toFixed(2)} Lakhs (Capex)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Floor-Standing Self-Service Kiosks (illustrative):</span>
                <span className={styles.statValue} style={{ color: '#a8402f' }}>Rs {(cpx.fiveYearKioskCost / 100000).toFixed(2)} Lakhs (Capex)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>KNOMI Hardware Capex:</span>
                <span className={styles.statValue} style={{ color: '#3f7a52' }}>No table devices (runs on guests&apos; phones)</span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>5-Yr Extra Sales at Your Assumed +{liftPct}% (example only):</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem' }}>
                  + Rs {(cpx.fiveYearUpsellGain / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.
              </p>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>Estimate only: </strong>
              Paper, tablet and kiosk figures use illustrative assumptions (three menus per table reprinted three times a year at Rs 250 each plus Rs 15,000 for specials; about Rs 15,500 per tablet and dock plus Rs 2,500 a year in upkeep; two kiosks at Rs 1.8 Lakhs each plus Rs 18,000 a year in upkeep); replace them with your own quotes. KNOMI runs on guests&apos; phones, so there are no table devices to buy. The lift is your own assumption, not a KNOMI result or guarantee. Extra sales are revenue, not profit, so food cost still applies.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
