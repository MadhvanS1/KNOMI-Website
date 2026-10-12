'use client';

import React, { useState } from 'react';
import { pricing } from '@/content/site';
import styles from './HyderabadSolutions.module.css';

type HyderabadMarket = 'madhapurHitec' | 'jubileeHills' | 'gachibowli' | 'banjaraHills' | 'oldCityCharminar';

// KNOMI Signature plan price per table per month (KNOMI Brain §2), read from the approved site copy.
const SIGNATURE_PRICE_PER_TABLE = pricing.plans.find((p) => p.id === 'signature')?.priceMin ?? 250;

// KNOMI's stated target for average-order lift. A target, not a past result or a guarantee.
const KNOMI_TARGET_LIFT_PCT = 25;

export default function HyderabadVolumeThroughputAuditor() {
  const [activeTab, setActiveTab] = useState<'biryaniVolumeAuditor' | 'dakhniBasketModeler'>('biryaniVolumeAuditor');

  // Mode 1 State (all values are the user's own figures or assumptions)
  const [market, setMarket] = useState<HyderabadMarket>('madhapurHitec');
  const [tableCount, setTableCount] = useState<number>(40);
  const [avgTableCheck, setAvgTableCheck] = useState<number>(1450);
  const [currentServers, setCurrentServers] = useState<number>(10);
  const [serverMonthlyCost, setServerMonthlyCost] = useState<number>(22000);
  const [serversFreed, setServersFreed] = useState<number>(1);
  const [extraTurnsPerWeek, setExtraTurnsPerWeek] = useState<number>(10);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);

  // Mode 2 State
  const [dailyCovers, setDailyCovers] = useState<number>(450);
  const [avgCoverSpend, setAvgCoverSpend] = useState<number>(550);
  const [orderLiftPct, setOrderLiftPct] = useState<number>(KNOMI_TARGET_LIFT_PCT);
  const [basketMarginPct, setBasketMarginPct] = useState<number>(65);

  // Mode 1: arithmetic on the user's inputs only
  const calculateVolumeEstimate = () => {
    const currentLaborCost = currentServers * serverMonthlyCost;
    const effectiveServersFreed = Math.min(serversFreed, currentServers);
    const redirectedPayroll = effectiveServersFreed * serverMonthlyCost;

    const extraMonthlyTurns = Math.round(extraTurnsPerWeek * 4.3);
    const monthlyTurnoverMargin = Math.round(extraMonthlyTurns * avgTableCheck * (grossMarginPct / 100));

    const knomiMonthlyCost = tableCount * SIGNATURE_PRICE_PER_TABLE;
    const totalMonthlyEstimate = redirectedPayroll + monthlyTurnoverMargin;
    const netOfKnomi = totalMonthlyEstimate - knomiMonthlyCost;

    return {
      currentLaborCost,
      effectiveServersFreed,
      redirectedPayroll,
      extraMonthlyTurns,
      monthlyTurnoverMargin,
      knomiMonthlyCost,
      netOfKnomi,
    };
  };

  // Mode 2: average-order lift on the user's own covers and spend
  const calculateUpsellEstimate = () => {
    const monthlyGuests = dailyCovers * 30;
    const incrementalSpendPerGuest = Math.round(avgCoverSpend * (orderLiftPct / 100));
    const monthlyExtraRevenue = monthlyGuests * incrementalSpendPerGuest;
    const monthlyExtraMargin = Math.round(monthlyExtraRevenue * (basketMarginPct / 100));
    const annualExtraMargin = monthlyExtraMargin * 12;

    return {
      monthlyGuests,
      incrementalSpendPerGuest,
      monthlyExtraRevenue,
      monthlyExtraMargin,
      annualExtraMargin,
    };
  };

  const volumeResults = calculateVolumeEstimate();
  const upsellResults = calculateUpsellEstimate();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Hyderabad High-Volume Biryani &amp; Lounge Throughput Auditor</h2>
        <p className={styles.calcSubtitle}>
          Put in your own floor numbers and assumptions to estimate what taking order-taking off your captains, a few extra table turns, or a higher average order on starters and desserts could be worth. Every result is an estimate from your inputs, not a promise.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'biryaniVolumeAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('biryaniVolumeAuditor')}
        >
          Mode 1: Peak Rush Labor &amp; Table Turns
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'dakhniBasketModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('dakhniBasketModeler')}
        >
          Mode 2: Appetizer &amp; Dessert Order Lift
        </button>
      </div>

      {activeTab === 'biryaniVolumeAuditor' ? (
        <div className={styles.calcGrid}>
          {/* Inputs */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Example Hyderabad Profile (sets starting values)</span>
              </label>
              <select
                className={styles.selectInput}
                value={market}
                onChange={(e) => {
                  const val = e.target.value as HyderabadMarket;
                  setMarket(val);
                  if (val === 'madhapurHitec') {
                    setTableCount(40);
                    setAvgTableCheck(1350);
                    setCurrentServers(10);
                  } else if (val === 'jubileeHills') {
                    setTableCount(56);
                    setAvgTableCheck(2400);
                    setCurrentServers(14);
                  } else if (val === 'gachibowli') {
                    setTableCount(46);
                    setAvgTableCheck(1600);
                    setCurrentServers(11);
                  } else if (val === 'banjaraHills') {
                    setTableCount(50);
                    setAvgTableCheck(2100);
                    setCurrentServers(12);
                  } else if (val === 'oldCityCharminar') {
                    setTableCount(80);
                    setAvgTableCheck(1100);
                    setCurrentServers(18);
                  }
                }}
              >
                <option value="madhapurHitec">Madhapur &amp; HITEC City (High-Density Tech Lunch Rushes)</option>
                <option value="jubileeHills">Jubilee Hills &amp; Rd 36 (Luxury Restobars &amp; Lounges)</option>
                <option value="gachibowli">Gachibowli Financial District (Corporate Team Lunches)</option>
                <option value="banjaraHills">Banjara Hills (Multi-Cuisine Heritage Dining)</option>
                <option value="oldCityCharminar">Charminar &amp; Abids (High-Volume Biryani Houses)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Active Dine-in Tables:</span>
                <span className={styles.inputVal}>{tableCount} tables</span>
              </label>
              <input
                type="range"
                min={20}
                max={90}
                step={2}
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Pre-Tax Table Spend:</span>
                <span className={styles.inputVal}>₹{avgTableCheck.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={600}
                max={3500}
                step={50}
                value={avgTableCheck}
                onChange={(e) => setAvgTableCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Current Floor Captains / Waiters:</span>
                <span className={styles.inputVal}>{currentServers} staff</span>
              </label>
              <input
                type="range"
                min={4}
                max={22}
                step={1}
                value={currentServers}
                onChange={(e) => setCurrentServers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Monthly Cost per Captain (your figure):</span>
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
                <span>Roles Moved Off Order-Taking (your assumption):</span>
                <span className={styles.inputVal}>{volumeResults.effectiveServersFreed} staff</span>
              </label>
              <input
                type="range"
                min={0}
                max={currentServers}
                step={1}
                value={volumeResults.effectiveServersFreed}
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
                max={80}
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
              <div className={styles.resultTitle}>Hyderabad Floor Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Current Monthly Floor Payroll:</span>
                <span className={styles.statVal}>₹{volumeResults.currentLaborCost.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Payroll Freed from Order-Taking (estimate):</span>
                <span className={styles.greenVal}>₹{volumeResults.redirectedPayroll.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Table Turns per Month:</span>
                <span className={styles.statVal}>+{volumeResults.extraMonthlyTurns} turns/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Margin from Extra Turns (estimate):</span>
                <span className={styles.greenVal}>+₹{volumeResults.monthlyTurnoverMargin.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>KNOMI Signature for {tableCount} Tables:</span>
                <span className={styles.statVal}>₹{volumeResults.knomiMonthlyCost.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Estimated Monthly Value, Net of KNOMI:</span>
                <span className={styles.highlightVal}>₹{volumeResults.netOfKnomi.toLocaleString('en-IN')}/mo</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              Estimate only, built entirely from the figures and assumptions you entered. With self-ordering every table can order at once instead of waiting for a captain, but KNOMI does not promise staff reductions or extra turns; we measure what actually changes with you, on your own tables.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          {/* Inputs */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Daily Dining Covers:</span>
                <span className={styles.inputVal}>{dailyCovers} guests/day</span>
              </label>
              <input
                type="range"
                min={50}
                max={1200}
                step={25}
                value={dailyCovers}
                onChange={(e) => setDailyCovers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Plate Spend per Diner:</span>
                <span className={styles.inputVal}>₹{avgCoverSpend.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={200}
                max={1500}
                step={25}
                value={avgCoverSpend}
                onChange={(e) => setAvgCoverSpend(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Order Lift to Model (default: KNOMI&apos;s target, not a guarantee):</span>
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
                <span>Your Gross Margin on Starters &amp; Desserts (your assumption):</span>
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
              <div className={styles.resultTitle}>Hyderabad Average Order Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Diners per Month:</span>
                <span className={styles.statVal}>{upsellResults.monthlyGuests.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Spend per Diner at {orderLiftPct}% Lift:</span>
                <span className={styles.statVal}>+₹{upsellResults.incrementalSpendPerGuest.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Extra Monthly Revenue (estimate):</span>
                <span className={styles.statVal}>+₹{upsellResults.monthlyExtraRevenue.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Extra Monthly Gross Margin (estimate):</span>
                <span className={styles.highlightVal}>+₹{upsellResults.monthlyExtraMargin.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Annualised (estimate):</span>
                <span className={styles.greenVal}>+₹{upsellResults.annualExtraMargin.toLocaleString('en-IN')}/yr</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              The {KNOMI_TARGET_LIFT_PCT}% default is KNOMI&apos;s target for average-order lift, not a guarantee or a past result. Knomi Host suggests pairings, such as Apollo Fish with the biryani or Double ka Meetha to finish; the real effect is something we measure with you on your own tables.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
