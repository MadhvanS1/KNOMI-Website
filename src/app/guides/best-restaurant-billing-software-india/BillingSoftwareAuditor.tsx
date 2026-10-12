'use client';

import React, { useState } from 'react';
import styles from './BillingSoftwareGuide.module.css';

// KNOMI Signature list price per table, per month (KNOMI Brain §2).
const KNOMI_SIGNATURE_PER_TABLE = 250;
// KNOMI's average-order target. A target, not a guarantee or a past result.
const KNOMI_TARGET_LIFT = 0.25;
// Illustrative per-order fee for the per-transaction pricing comparison. Not a vendor quote.
const ILLUSTRATIVE_PER_ORDER_FEE = 3;

export default function BillingSoftwareAuditor() {
  const [activeTab, setActiveTab] = useState<'fitment' | 'tco'>('fitment');

  // Mode 1: Fitment Matrix State
  const [venueFormat, setVenueFormat] = useState<string>('casual');
  const [monthlyBills, setMonthlyBills] = useState<number>(2000);
  const [hardwareChoice, setHardwareChoice] = useState<string>('existing_pc');
  const [needKds, setNeedKds] = useState<boolean>(true);
  const [needCaptainApp, setNeedCaptainApp] = useState<boolean>(true);
  const [needInventory, setNeedInventory] = useState<boolean>(true);
  // The user's own quotes (defaults are placeholders, not vendor prices)
  const [baseLicence, setBaseLicence] = useState<number>(10000);
  const [addOnPrice, setAddOnPrice] = useState<number>(4000);

  // Mode 2: Cost & Upsell Estimate State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1500);
  const [averageCheck, setAverageCheck] = useState<number>(850);
  const [tableCount, setTableCount] = useState<number>(15);

  // Mode 1 Calculations
  const getFitmentResults = () => {
    let recommendedPos = 'Petpooja';
    let hardwareCost = 0;
    let strategicRecommendation = '';
    let categoryTitle = 'Casual Dining & Bistro';

    // Illustrative hardware budgets, not quotes
    if (hardwareChoice === 'new_terminal') {
      hardwareCost = 35000;
    } else if (hardwareChoice === 'tablet') {
      hardwareCost = 16000;
    } else {
      hardwareCost = 3500; // Thermal receipt printer only
    }

    const addOnCount = [needKds, needCaptainApp, needInventory].filter(Boolean).length;
    const addOnCost = addOnCount * addOnPrice;

    if (venueFormat === 'cafe') {
      categoryTitle = 'Single-Outlet Cafe / Quick Bites';
      recommendedPos = 'Petpooja or SlickPOS';
      strategicRecommendation = 'For single-outlet cafes, keep your counter till minimal. A basic Windows or tablet POS handles thermal receipts and GST. Avoid paying for multi-store ERP modules you will not use.';
    } else if (venueFormat === 'casual') {
      categoryTitle = 'Casual Dining (15 to 30 Tables)';
      recommendedPos = 'Petpooja (Cashier Till) + KNOMI (Tabletop Self-Ordering)';
      strategicRecommendation = 'Keep Petpooja on the counter for GST and accounting sync. Add KNOMI to the dining tables so guests can browse an illustrated menu and order from their own phones, with Knomi Host suggesting pairings, instead of waiting for a captain at peak hours.';
    } else if (venueFormat === 'bar') {
      categoryTitle = 'Bar, Pub & Microbrewery';
      recommendedPos = 'Petpooja or Posist (Restroworks)';
      strategicRecommendation = 'Requires strict dual-tax composite billing: 5% GST on food items and 18% to 25% State VAT on liquor. Pair with digital tabletop ordering so guests can re-order drinks without flagging busy bartenders.';
    } else if (venueFormat === 'enterprise') {
      categoryTitle = 'Enterprise Multi-Outlet Chain';
      recommendedPos = 'Restroworks (formerly Posist)';
      strategicRecommendation = 'High-volume chains with central commissaries need enterprise inventory control, recipe yield tracking, and multi-store reporting. Restroworks is built for this kind of multi-unit governance.';
    } else if (venueFormat === 'cloud_kitchen') {
      categoryTitle = 'Cloud Kitchen / Delivery-First Brand';
      recommendedPos = 'Petpooja or UrbanPiper';
      strategicRecommendation = 'Focus on aggregator order injection (Zomato and Swiggy order auto-acceptance) and centralized KDS dispatch. Tabletop ordering is unnecessary here; prioritize menu syncing and delivery driver tracking.';
    }

    const year1Total = baseLicence + addOnCost + hardwareCost;
    const gstAmount = Math.round((baseLicence + addOnCost) * 0.18);

    return {
      categoryTitle,
      recommendedPos,
      baseAnnualCost: baseLicence,
      addOnCost,
      hardwareCost,
      gstAmount,
      year1Total: year1Total + gstAmount,
      strategicRecommendation,
    };
  };

  const fitment = getFitmentResults();

  // Mode 2 Calculations (3-Year cost comparison, all figures excluding GST)
  const calculateTco = () => {
    const monthlyGrossRevenue = monthlyOrders * averageCheck;
    const annualGrossRevenue = monthlyGrossRevenue * 12;

    // Option A: Flat-fee POS using the user's licence and add-on inputs from Mode 1
    const posAThreeYearTotalCost = (fitment.baseAnnualCost + fitment.addOnCost) * 3;

    // Option B: Per-order pricing at an illustrative fee per order
    const posBThreeYearTotalCost = monthlyOrders * 12 * 3 * ILLUSTRATIVE_PER_ORDER_FEE;

    // KNOMI Signature list price, 0% commission
    const knomiThreeYearFee = tableCount * KNOMI_SIGNATURE_PER_TABLE * 36;

    // Extra sales if KNOMI's +25% average-order target is met (target, not a guarantee)
    const threeYearTargetSales = Math.round(annualGrossRevenue * KNOMI_TARGET_LIFT * 3);
    const threeYearSalesAfterFee = threeYearTargetSales - knomiThreeYearFee;

    return {
      monthlyGrossRevenue,
      posAThreeYearTotalCost,
      posBThreeYearTotalCost,
      knomiThreeYearFee,
      threeYearTargetSales,
      threeYearSalesAfterFee,
    };
  };

  const tco = calculateTco();
  const lakhs = (value: number) => (value / 100000).toFixed(2);

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Interactive Indian Restaurant POS Auditor</h3>
        <p className={styles.calcSubtitle}>
          Evaluate format fitment and hardware capex, and compare estimated 3-year costs across billing models using your own quotes.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'fitment' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('fitment')}
        >
          1. Format & Hardware Fitment Matrix
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'tco' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('tco')}
        >
          2. 3-Year Cost & Upsell Estimate
        </button>
      </div>

      {activeTab === 'fitment' ? (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Restaurant Format</label>
              <select
                className={styles.selectInput}
                value={venueFormat}
                onChange={(e) => setVenueFormat(e.target.value)}
              >
                <option value="cafe">Single-Outlet Cafe / Quick Bites</option>
                <option value="casual">Casual Dining Restaurant (15 to 30 Tables)</option>
                <option value="bar">Bar, Pub or Microbrewery (Food + Liquor VAT)</option>
                <option value="enterprise">Enterprise Multi-Outlet Chain / Franchise</option>
                <option value="cloud_kitchen">Cloud Kitchen / Delivery-First Brand</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Estimated Monthly Bills: <span className={styles.inputVal}>{monthlyBills.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={monthlyBills}
                onChange={(e) => setMonthlyBills(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Base Licence Quote (your figure, per year): <span className={styles.inputVal}>Rs {baseLicence.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="0"
                max="60000"
                step="1000"
                value={baseLicence}
                onChange={(e) => setBaseLicence(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Hardware Terminal Strategy (illustrative costs)</label>
              <select
                className={styles.selectInput}
                value={hardwareChoice}
                onChange={(e) => setHardwareChoice(e.target.value)}
              >
                <option value="existing_pc">Use Existing Laptop / Windows PC + Printer (approx. Rs 3,500)</option>
                <option value="tablet">Commercial Android / iOS Tablet Setup (approx. Rs 16,000)</option>
                <option value="new_terminal">Buy Reseller Touch POS Terminal (approx. Rs 35,000)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Price per Add-On Module (your quote, per year): <span className={styles.inputVal}>Rs {addOnPrice.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="0"
                max="12000"
                step="500"
                value={addOnPrice}
                onChange={(e) => setAddOnPrice(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Required Add-On Modules:
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={needKds}
                  onChange={(e) => setNeedKds(e.target.checked)}
                />
                Kitchen Display System (KDS)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={needCaptainApp}
                  onChange={(e) => setNeedCaptainApp(e.target.checked)}
                />
                Captain Handheld App
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={needInventory}
                  onChange={(e) => setNeedInventory(e.target.checked)}
                />
                Advanced Inventory & Recipe Costing
              </label>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Fitment Assessment: {fitment.categoryTitle}</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Suggested Core Till:</span>
                <span className={styles.statValue} style={{ color: 'var(--color-whiskey-sour)' }}>{fitment.recommendedPos}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Base Software License (your quote):</span>
                <span className={styles.statValue}>Rs {fitment.baseAnnualCost.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Selected Add-On Modules (your quote):</span>
                <span className={styles.statValue}>Rs {fitment.addOnCost.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Hardware Setup Capex (illustrative):</span>
                <span className={styles.statValue}>Rs {fitment.hardwareCost.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Applicable Software GST (18%):</span>
                <span className={styles.statValue}>Rs {fitment.gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated Year 1 Outlay:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`}>Rs {fitment.year1Total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Architectural Note: </strong>
              {fitment.strategicRecommendation} Software amounts come from your inputs and hardware amounts are illustrative; neither is a vendor quote.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Monthly Dine-In Orders: <span className={styles.inputVal}>{monthlyOrders.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Average Check Size (AOV): <span className={styles.inputVal}>Rs {averageCheck.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={averageCheck}
                onChange={(e) => setAverageCheck(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Dining Tables: <span className={styles.inputVal}>{tableCount} Tables</span>
              </label>
              <input
                type="range"
                min="4"
                max="60"
                step="1"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
              <p style={{ margin: 0 }}>
                <strong>Baseline Monthly Revenue:</strong> Rs {tco.monthlyGrossRevenue.toLocaleString('en-IN')}
                <br />
                Option A uses your licence and add-on inputs from tab 1. The KNOMI fee uses the Signature list price of Rs {KNOMI_SIGNATURE_PER_TABLE} per table, per month. All figures exclude GST.
              </p>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>3-Year Cost & Upsell Estimate</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Option A (Flat-Fee POS + Add-ons, your quote):</span>
                <span className={styles.statValue}>Rs {lakhs(tco.posAThreeYearTotalCost)} Lakhs (Expense)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Option B (Per-Order Pricing, illustrative Rs {ILLUSTRATIVE_PER_ORDER_FEE}/order):</span>
                <span className={styles.statValue} style={{ color: '#a8402f' }}>Rs {lakhs(tco.posBThreeYearTotalCost)} Lakhs (Expense)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>KNOMI Signature Fee ({tableCount} tables, 3 yrs):</span>
                <span className={styles.statValue}>Rs {lakhs(tco.knomiThreeYearFee)} Lakhs (Expense)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>KNOMI Dine-In Order Commission:</span>
                <span className={styles.statValue} style={{ color: '#3f7a52' }}>0% (Zero Take-Rate)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>3-Yr Extra Sales at KNOMI&apos;s +25% Target (not a guarantee):</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>+ Rs {lakhs(tco.threeYearTargetSales)} Lakhs</span>
              </div>
              <div className={styles.statRow} style={{ borderBottom: 'none', paddingTop: '12px' }}>
                <span className={styles.statLabel} style={{ fontWeight: 700 }}>Estimated 3-Yr Extra Sales After KNOMI Fee:</span>
                <span className={`${styles.statValue} ${styles.statHighlight}`} style={{ color: '#3f7a52', fontSize: '1.25rem' }}>
                  {tco.threeYearSalesAfterFee >= 0 ? '+ ' : '- '}Rs {lakhs(Math.abs(tco.threeYearSalesAfterFee))} Lakhs
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63, 122, 82, 0.08)', border: '1px solid rgba(63, 122, 82, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#3f7a52', lineHeight: '1.5' }}>
              <strong>Estimate only: </strong>
              Swapping one cashier POS for another mostly changes software fees. A table-ordering layer is about what guests order. The +25% is KNOMI&apos;s target, not a guarantee or a past result. Extra sales are revenue, not profit, so food cost still applies, and payment-gateway charges (which apply under any model) are left out.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
