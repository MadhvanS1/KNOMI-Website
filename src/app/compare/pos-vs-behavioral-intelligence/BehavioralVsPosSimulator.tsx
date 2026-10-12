'use client';

import React, { useState } from 'react';
import styles from './PosVsBehavioral.module.css';

export default function BehavioralVsPosSimulator() {
  // Every input is the user's own figure or assumption.
  const [monthlyViewers, setMonthlyViewers] = useState<number>(1400);
  const [signatureDishPrice, setSignatureDishPrice] = useState<number>(650);
  const [abandonmentRate, setAbandonmentRate] = useState<number>(32);
  const [recoveryRate, setRecoveryRate] = useState<number>(10);

  // Arithmetic on the inputs above
  const ordersPlaced = Math.round(monthlyViewers * (1 - abandonmentRate / 100));
  const posVisibleRevenue = ordersPlaced * signatureDishPrice;

  const hesitantAbandoners = monthlyViewers - ordersPlaced;
  const invisibleDemandValue = hesitantAbandoners * signatureDishPrice;

  const recoveredMonthlyRevenue = Math.round(hesitantAbandoners * (recoveryRate / 100) * signatureDishPrice);
  const recoveredAnnualRevenue = recoveredMonthlyRevenue * 12;

  return (
    <div className={styles.simulatorSection}>
      <div className={styles.simHeader}>
        <span className={styles.simBadge}>Interactive Audit Simulator</span>
        <h3 className={styles.simTitle}>The Invisible Demand Calculator</h3>
        <p className={styles.simSubtitle}>
          Estimate the gap between what your billing POS logs and what guests actually consider, using your own numbers for one dish.
          Knomi Sense measures the real views and orders, so you can replace these guesses with data.
        </p>
      </div>

      <div className={styles.simGrid}>
        <div className={styles.inputCol}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="monthly-viewers-slider">
              <span>Guests Who Open This Dish per Month (your estimate):</span>
              <span className={styles.inputVal}>{monthlyViewers.toLocaleString('en-IN')} Diners</span>
            </label>
            <input
              id="monthly-viewers-slider"
              type="range"
              min="100"
              max="5000"
              step="100"
              value={monthlyViewers}
              onChange={(e) => setMonthlyViewers(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="dish-price-slider">
              <span>Signature Dish / High-Margin Item Price:</span>
              <span className={styles.inputVal}>₹{signatureDishPrice.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="dish-price-slider"
              type="range"
              min="250"
              max="1600"
              step="25"
              value={signatureDishPrice}
              onChange={(e) => setSignatureDishPrice(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="abandonment-slider">
              <span>Viewers Who Don&apos;t Order It (your estimate):</span>
              <span className={styles.inputVal}>{abandonmentRate}% Drop-off</span>
            </label>
            <input
              id="abandonment-slider"
              type="range"
              min="0"
              max="90"
              step="1"
              value={abandonmentRate}
              onChange={(e) => setAbandonmentRate(Number(e.target.value))}
              className={styles.rangeSlider}
            />
            <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
              Guests who read the dish but leave it, perhaps because of the price, the portion or an unclear description.
            </small>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="recovery-slider">
              <span>Share You Could Win Back (your assumption):</span>
              <span className={styles.inputVal}>{recoveryRate}% Recaptured</span>
            </label>
            <input
              id="recovery-slider"
              type="range"
              min="0"
              max="45"
              step="5"
              value={recoveryRate}
              onChange={(e) => setRecoveryRate(Number(e.target.value))}
              className={styles.rangeSlider}
            />
            <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
              Your assumption for how many hesitant guests a clearer description, a better position or a pairing suggestion would convert.
            </small>
          </div>
        </div>

        <div className={styles.simResults}>
          <div>
            <div className={styles.resultHeader}>POS vs Behavioral Intelligence Output (estimate)</div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>Guests Considering the Dish:</span>
              <span className={styles.statValue}>{monthlyViewers.toLocaleString('en-IN')} Diners</span>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>What the POS Sees (Sold):</span>
              <span className={styles.statValue}>
                {ordersPlaced.toLocaleString('en-IN')} Sold (₹{posVisibleRevenue.toLocaleString('en-IN')})
              </span>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>Invisible Demand (Hesitant Browsers):</span>
              <span className={styles.statRisk}>
                {hesitantAbandoners.toLocaleString('en-IN')} Diners (₹{invisibleDemandValue.toLocaleString('en-IN')})
              </span>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>POS Visibility Into Abandonment:</span>
              <span className={styles.statRisk}>None (Lagging Blindspot)</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-default)', paddingTop: '16px', marginTop: '16px' }}>
            <div className={styles.statRow}>
              <span className={styles.statLabel} style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Revenue if You Win Back That Share:
              </span>
              <span className={styles.statBenefit}>+ ₹{recoveredMonthlyRevenue.toLocaleString('en-IN')}/month</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Annualised (estimate):</span>
              <span className={styles.statHighlight}>+ ₹{recoveredAnnualRevenue.toLocaleString('en-IN')}/year</span>
            </div>

            <div className={styles.simInsightBox}>
              <strong>The Diagnostic:</strong> On these inputs, your POS would show {ordersPlaced.toLocaleString('en-IN')} portions sold. It can&apos;t show the {hesitantAbandoners.toLocaleString('en-IN')} other guests who looked at this dish and left it. If you won back {recoveryRate}% of them, that would be about ₹{recoveredAnnualRevenue.toLocaleString('en-IN')} a year from the same footfall. This is an estimate on your assumptions, not a KNOMI result.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
