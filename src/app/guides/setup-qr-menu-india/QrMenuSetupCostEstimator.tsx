'use client';

import React, { useState } from 'react';
import styles from './QrMenuSetupIndia.module.css';

type HardwareTier = 'stickers' | 'acrylic' | 'wood_nfc';
type PrinterSetup = 'none' | 'single_thermal' | 'dual_thermal' | 'kds_tablet' | 'hybrid_full';

const HARDWARE_PRICES: Record<HardwareTier, { name: string; unitPrice: number; desc: string }> = {
  stickers: {
    name: '3M Vinyl Table Stickers (Waterproof)',
    unitPrice: 45,
    desc: 'Matte laminated vinyl applied directly to table corner. Cost-effective for cafes.',
  },
  acrylic: {
    name: 'A6 Acrylic Tents (Anti-Glare)',
    unitPrice: 130,
    desc: 'Double-sided 4x6 inch acrylic table stand with matte insert to avoid overhead glare.',
  },
  wood_nfc: {
    name: 'Laser-Etched Wood + NTAG213 NFC',
    unitPrice: 380,
    desc: 'Solid beech wood puck with laser QR code and embedded NFC chip for tap-to-open.',
  },
};

const PRINTER_PRICES: Record<PrinterSetup, { name: string; price: number; desc: string }> = {
  none: {
    name: 'Mobile / Tablet KDS Only (No Paper)',
    price: 0,
    desc: 'Staff use existing Android phone or tablet as kitchen display. Zero capex.',
  },
  single_thermal: {
    name: '1x 80mm ESC/POS LAN Thermal Printer',
    price: 4800,
    desc: 'Direct Ethernet wired thermal printer with auto-cutter for kitchen KOT printing.',
  },
  dual_thermal: {
    name: '2x 80mm ESC/POS LAN Printers (Kitchen + Bar)',
    price: 9600,
    desc: 'Independent printers routing food orders to kitchen and drink orders to bar.',
  },
  kds_tablet: {
    name: '1x 10-inch Android Kitchen Display System',
    price: 8900,
    desc: 'Wall-mounted rugged tablet running cloud KDS with color-coded preparation timers.',
  },
  hybrid_full: {
    name: 'Full Hybrid (1x KDS Tablet + 1x LAN Printer)',
    price: 13700,
    desc: 'Digital kitchen workflow with paper backup for dispatch and delivery packaging.',
  },
};

export default function QrMenuSetupCostEstimator() {
  const [activeTab, setActiveTab] = useState<'capex' | 'tco'>('capex');

  // Tab 1: Hardware Capex State
  const [tableCount, setTableCount] = useState<number>(20);
  const [hardwareTier, setHardwareTier] = useState<HardwareTier>('acrylic');
  const [printerSetup, setPrinterSetup] = useState<PrinterSetup>('single_thermal');
  const [includeSpares, setIncludeSpares] = useState<boolean>(true);

  // Tab 2: Commission Comparison State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1200);
  const [averageCheck, setAverageCheck] = useState<number>(950);
  const [aggregatorCommission, setAggregatorCommission] = useState<number>(2.0);

  // Calculations: Capex
  const selectedHardware = HARDWARE_PRICES[hardwareTier];
  const tableHardwareCost = tableCount * selectedHardware.unitPrice;
  const spareCount = includeSpares ? Math.ceil(tableCount * 0.15) : 0;
  const sparesCost = spareCount * selectedHardware.unitPrice;
  const totalTableHardwareCost = tableHardwareCost + sparesCost;

  const selectedPrinter = PRINTER_PRICES[printerSetup];
  const kitchenHardwareCost = selectedPrinter.price;

  const totalCapex = totalTableHardwareCost + kitchenHardwareCost;
  const capexPerTable = Math.round(totalCapex / tableCount);

  // Calculations: the per-order commission the user would stop paying with KNOMI's 0% commission
  // (estimates from the user's inputs, before KNOMI's fee, which is shared on the walkthrough call)
  const monthlyTurnover = monthlyOrders * averageCheck;
  const monthlyAggregatorCommission = Math.round(monthlyTurnover * (aggregatorCommission / 100));
  const annualAggregatorBleed = monthlyAggregatorCommission * 12;

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <span className={styles.calcBadge}>Interactive Rollout Simulator</span>
        <h3 className={styles.calcTitle}>Indian Restaurant QR Menu Setup Cost Estimator</h3>
        <p className={styles.calcSubtitle}>
          Estimate upfront hardware costs for your tables and kitchen, then see the per-order commission you would stop paying with KNOMI&apos;s 0% commission.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'capex' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('capex')}
        >
          1. Upfront Setup &amp; Hardware Capex
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === 'tco' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('tco')}
        >
          2. Per-Order Commission vs 0% Commission
        </button>
      </div>

      {activeTab === 'capex' && (
        <div className={styles.calcGrid}>
          <div className={styles.inputCol}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="table-count-slider">
                <span>Number of Dining Tables:</span>
                <span className={styles.inputVal}>{tableCount} Tables</span>
              </label>
              <input
                id="table-count-slider"
                type="range"
                min="5"
                max="80"
                step="1"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="hardware-tier-select">
                <span>Tabletop QR Hardware Format:</span>
                <span className={styles.inputVal}>₹{selectedHardware.unitPrice}/table</span>
              </label>
              <select
                id="hardware-tier-select"
                value={hardwareTier}
                onChange={(e) => setHardwareTier(e.target.value as HardwareTier)}
                className={styles.selectInput}
              >
                <option value="stickers">3M Matte Vinyl Stickers (₹45/table)</option>
                <option value="acrylic">A6 Acrylic Tents with Anti-Glare (₹130/table)</option>
                <option value="wood_nfc">Laser-Etched Beech Wood + NFC (₹380/table)</option>
              </select>
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                {selectedHardware.desc}
              </small>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="printer-setup-select">
                <span>Kitchen Routing &amp; Printer Hardware:</span>
                <span className={styles.inputVal}>₹{selectedPrinter.price.toLocaleString('en-IN')}</span>
              </label>
              <select
                id="printer-setup-select"
                value={printerSetup}
                onChange={(e) => setPrinterSetup(e.target.value as PrinterSetup)}
                className={styles.selectInput}
              >
                <option value="none">Cloud / Mobile KDS Only (₹0 Capex)</option>
                <option value="single_thermal">1x 80mm ESC/POS LAN Thermal Printer (₹4,800)</option>
                <option value="dual_thermal">2x 80mm LAN Thermal Printers (Kitchen + Bar) (₹9,600)</option>
                <option value="kds_tablet">1x 10-inch Android Wall KDS Tablet (₹8,900)</option>
                <option value="hybrid_full">Full Hybrid: 1x KDS Tablet + 1x LAN Printer (₹13,700)</option>
              </select>
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                {selectedPrinter.desc}
              </small>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="spares-checkbox"
                checked={includeSpares}
                onChange={(e) => setIncludeSpares(e.target.checked)}
                style={{ accentColor: 'var(--color-whiskey-sour)', width: '16px', height: '16px' }}
              />
              <label htmlFor="spares-checkbox" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Include 15% replacement buffer ({spareCount} spare stands for scratches/losses)
              </label>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Upfront Capex Breakdown (INR)</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Active Table Stands ({tableCount} tables):</span>
                <span className={styles.statValue}>₹{tableHardwareCost.toLocaleString('en-IN')}</span>
              </div>
              {includeSpares && (
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>15% Spare Replacement Buffer ({spareCount} units):</span>
                  <span className={styles.statValue}>₹{sparesCost.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Kitchen Routing &amp; Printer Hardware:</span>
                <span className={styles.statValue}>₹{kitchenHardwareCost.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>QR Menu Software:</span>
                <span className={styles.statBenefit}>Not capex (pricing shared on a walkthrough call)</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-default)', paddingTop: '16px', marginTop: '16px' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel} style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Total Upfront Hardware Capex:
                </span>
                <span className={styles.statHighlight}>₹{totalCapex.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Net Capex Per Table:</span>
                <span className={styles.statValue}>₹{capexPerTable.toLocaleString('en-IN')} / table</span>
              </div>
              <p className={styles.resultFooterNote}>
                * Estimate. Table hardware and printer prices are based on bulk Indian B2B rates (Indiamart / Amazon Business) for acrylic fabrication and ESC/POS thermal printers; tablet prices are indicative. Get current quotes before you buy.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tco' && (
        <div className={styles.calcGrid}>
          <div className={styles.inputCol}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="monthly-orders-slider">
                <span>Monthly Table Orders:</span>
                <span className={styles.inputVal}>{monthlyOrders.toLocaleString('en-IN')} Orders</span>
              </label>
              <input
                id="monthly-orders-slider"
                type="range"
                min="300"
                max="4000"
                step="50"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="avg-check-slider">
                <span>Average Check Size:</span>
                <span className={styles.inputVal}>₹{averageCheck.toLocaleString('en-IN')}</span>
              </label>
              <input
                id="avg-check-slider"
                type="range"
                min="400"
                max="2500"
                step="50"
                value={averageCheck}
                onChange={(e) => setAverageCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="aggregator-commission-slider">
                <span>Per-Order Commission You Pay Today:</span>
                <span className={styles.inputVal}>{aggregatorCommission.toFixed(1)}%</span>
              </label>
              <input
                id="aggregator-commission-slider"
                type="range"
                min="1.0"
                max="3.5"
                step="0.1"
                value={aggregatorCommission}
                onChange={(e) => setAggregatorCommission(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                Enter the per-order commission in your current or quoted contract (your input).
              </small>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>KNOMI Commission Model:</span>
                <span className={styles.inputVal}>0% Commission</span>
              </label>
              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--color-bg-surface-elevated, #1c1411)', border: '1px solid var(--color-border-default)' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  KNOMI takes 0% commission, so what your guests order is yours. We share KNOMI&apos;s pricing on a short walkthrough call, once we understand your restaurant.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Commission Comparison (Estimate)</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Monthly Dine-In Volume:</span>
                <span className={styles.statValue}>₹{monthlyTurnover.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Commission at {aggregatorCommission.toFixed(1)}% / Mo:</span>
                <span className={styles.statRisk}>- ₹{monthlyAggregatorCommission.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>KNOMI Commission on Table Orders:</span>
                <span className={styles.statBenefit}>0%</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-default)', paddingTop: '16px', marginTop: '16px' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel} style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Commission You Would Stop Paying:
                </span>
                <span className={styles.statBenefit}>
                  + ₹{annualAggregatorBleed.toLocaleString('en-IN')}/year
                </span>
              </div>
              <p className={styles.resultFooterNote}>
                Figures are before KNOMI&apos;s fee, which we share on a walkthrough call.
              </p>
              <p className={styles.resultFooterNote} style={{ marginTop: '8px' }}>
                * Estimate from your inputs: the commission you enter, over 12 months. It is arithmetic, not a forecast of results.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
