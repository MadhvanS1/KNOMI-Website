'use client';

import React, { useState } from 'react';
import styles from './PuneSolutions.module.css';

type PuneMarket = 'koregaonPark' | 'balewadiBaner' | 'fcRoadDeccan' | 'vimanNagar' | 'hinjewadi';

// The lift starts at 0%, so every figure comes from the owner. No KNOMI default or target.
const START_LIFT_PCT = 0;

export default function PuneBreweryThroughputAuditor() {
  const [activeTab, setActiveTab] = useState<'outdoorTransitAuditor' | 'breweryUpsellModeler'>('outdoorTransitAuditor');

  // Mode 1 State (all values are the user's own figures or assumptions)
  const [market, setMarket] = useState<PuneMarket>('balewadiBaner');
  const [transitRadius, setTransitRadius] = useState<number>(45); // metres from kitchen/bar pass to tables
  const [tripsPerTurn, setTripsPerTurn] = useState<number>(4);
  const [tripsReplaced, setTripsReplaced] = useState<number>(2);
  const [seatingsPerShift, setSeatingsPerShift] = useState<number>(55);
  const [currentWaiters, setCurrentWaiters] = useState<number>(9);
  const [waiterMonthlyCost, setWaiterMonthlyCost] = useState<number>(22000);
  const [waitersFreed, setWaitersFreed] = useState<number>(1);

  // Mode 2 State
  const [dailyCovers, setDailyCovers] = useState<number>(380);
  const [avgDrinkSpend, setAvgDrinkSpend] = useState<number>(750);
  const [orderLiftPct, setOrderLiftPct] = useState<number>(START_LIFT_PCT);
  const [basketMarginPct, setBasketMarginPct] = useState<number>(65);

  // Mode 1: walking-distance and payroll arithmetic on the user's inputs only
  const calculateTransitEstimate = () => {
    // Each trip is a round trip: pass to table and back.
    const metersPerTableTurn = tripsPerTurn * 2 * transitRadius;
    const teamKmPerShift = Number(((seatingsPerShift * metersPerTableTurn) / 1000).toFixed(1));
    const kmPerServerPerShift = currentWaiters > 0 ? Number((teamKmPerShift / currentWaiters).toFixed(1)) : 0;

    const effectiveTripsReplaced = Math.min(tripsReplaced, tripsPerTurn);
    const kmRemovedPerShift = Number(((seatingsPerShift * effectiveTripsReplaced * 2 * transitRadius) / 1000).toFixed(1));

    const currentLaborCost = currentWaiters * waiterMonthlyCost;
    const effectiveWaitersFreed = Math.min(waitersFreed, currentWaiters);
    const redirectedPayroll = effectiveWaitersFreed * waiterMonthlyCost;

    return {
      metersPerTableTurn,
      teamKmPerShift,
      kmPerServerPerShift,
      effectiveTripsReplaced,
      kmRemovedPerShift,
      currentLaborCost,
      effectiveWaitersFreed,
      redirectedPayroll,
    };
  };

  // Mode 2: average-order lift on the user's own covers and spend
  const calculateBreweryUpsellEstimate = () => {
    const monthlyGuests = dailyCovers * 30;
    const incrementalSpendPerGuest = Math.round(avgDrinkSpend * (orderLiftPct / 100));
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

  const transitResults = calculateTransitEstimate();
  const upsellResults = calculateBreweryUpsellEstimate();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Pune Brewery &amp; Outdoor Dining Throughput Auditor</h2>
        <p className={styles.calcSubtitle}>
          Put in your own layout and floor numbers to estimate how far your team walks across a sprawling garden or taproom, and what a higher average order on craft beer and starters could be worth. Every result is an estimate from your inputs, not a promise.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'outdoorTransitAuditor' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('outdoorTransitAuditor')}
        >
          Mode 1: Outdoor Sprawl &amp; Server Footprint
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'breweryUpsellModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('breweryUpsellModeler')}
        >
          Mode 2: Craft Beer &amp; Basket Order Lift
        </button>
      </div>

      {activeTab === 'outdoorTransitAuditor' ? (
        <div className={styles.calcGrid}>
          <div className={styles.inputPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Example Pune Profile (sets starting values)</span>
              </div>
              <select
                className={styles.selectInput}
                value={market}
                onChange={(e) => {
                  const m = e.target.value as PuneMarket;
                  setMarket(m);
                  if (m === 'koregaonPark') {
                    setTransitRadius(55);
                  } else if (m === 'balewadiBaner') {
                    setTransitRadius(45);
                  } else if (m === 'fcRoadDeccan') {
                    setTransitRadius(25);
                  } else if (m === 'vimanNagar') {
                    setTransitRadius(35);
                  } else if (m === 'hinjewadi') {
                    setTransitRadius(40);
                  }
                }}
              >
                <option value="koregaonPark">Koregaon Park &amp; Kalyani Nagar (Bungalow Cafes &amp; Garden Restobars)</option>
                <option value="balewadiBaner">Balewadi High Street &amp; Baner (Multi-Tap Craft Breweries)</option>
                <option value="fcRoadDeccan">FC Road &amp; JM Road (Deccan Student Quick-Service)</option>
                <option value="vimanNagar">Viman Nagar &amp; Nagar Road (Youth &amp; Campus Casual Dining)</option>
                <option value="hinjewadi">Hinjewadi Phase 1 &amp; 2 (Tech Park Executive Lunch Rushes)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Distance, Pass to Table (your estimate)</span>
                <span className={styles.inputValueBadge}>{transitRadius} Metres</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={transitRadius}
                onChange={(e) => setTransitRadius(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Round Trips per Table Turn Today (your estimate)</span>
                <span className={styles.inputValueBadge}>{tripsPerTurn} Trips</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={tripsPerTurn}
                onChange={(e) => setTripsPerTurn(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Trips QR Ordering Could Replace, e.g. Menu &amp; Order-Taking (your assumption)</span>
                <span className={styles.inputValueBadge}>{transitResults.effectiveTripsReplaced} Trips</span>
              </div>
              <input
                type="range"
                min="0"
                max={tripsPerTurn}
                step="1"
                value={transitResults.effectiveTripsReplaced}
                onChange={(e) => setTripsReplaced(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Table Seatings per Busy Shift (your figure)</span>
                <span className={styles.inputValueBadge}>{seatingsPerShift} Seatings</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={seatingsPerShift}
                onChange={(e) => setSeatingsPerShift(Number(e.target.value))}
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
                <span>Server Roles Moved Off Order-Taking (your assumption)</span>
                <span className={styles.inputValueBadge}>{transitResults.effectiveWaitersFreed} Staff</span>
              </div>
              <input
                type="range"
                min="0"
                max={currentWaiters}
                step="1"
                value={transitResults.effectiveWaitersFreed}
                onChange={(e) => setWaitersFreed(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.highlightRow}>
              <span className={styles.highlightLabel}>Walking QR Ordering Could Take Off the Floor</span>
              <span className={styles.highlightValue}>
                {transitResults.kmRemovedPerShift} km / shift
              </span>
              <span className={styles.highlightSubtext}>
                Estimate from your own layout and assumptions, not a promise
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Walking per Table Turn Today</span>
              <span className={styles.metricValue}>{transitResults.metersPerTableTurn} metres</span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Team Walking per Shift Today</span>
              <span className={styles.metricValue}>
                {transitResults.teamKmPerShift} km ({transitResults.kmPerServerPerShift} km / server)
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Current Monthly Floor Payroll</span>
              <span className={styles.metricValue}>
                ₹{transitResults.currentLaborCost.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Payroll Freed from Order-Taking (estimate)</span>
              <span className={styles.metricValue}>
                ₹{transitResults.redirectedPayroll.toLocaleString('en-IN')} / mo
              </span>
            </div>

            <span className={styles.highlightSubtext}>
              KNOMI does not promise staff reductions or a set number of minutes saved. We measure what actually changes with you, on your own tables. Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.
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
                max="800"
                step="25"
                value={dailyCovers}
                onChange={(e) => setDailyCovers(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span>Average Drink &amp; Starter Spend Per Guest</span>
                <span className={styles.inputValueBadge}>₹{avgDrinkSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1800"
                step="50"
                value={avgDrinkSpend}
                onChange={(e) => setAvgDrinkSpend(Number(e.target.value))}
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
                <span>Your Gross Margin on Beer &amp; Starters (your assumption)</span>
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
              The lift starts at 0%: set your own assumption. It is not a KNOMI result or a guarantee. Knomi Host suggests pairings, such as fries with the next pint; the real effect is something we measure with you on your own tables.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
