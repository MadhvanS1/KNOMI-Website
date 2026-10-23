'use client';

import React, { useState } from 'react';
import styles from './UpsellingGuide.module.css';

interface CategoryOption {
  id: string;
  name: string;
  price: number;
  baselineRate: number; // user's estimate of today's attach rate (%)
  visualRate: number; // user's assumption of the attach rate with visual prompts (%)
  description: string;
}

// Starting values only. Every rate is editable in the UI and is the user's own assumption.
const DEFAULT_CATEGORIES: CategoryOption[] = [
  {
    id: 'beverage',
    name: 'Craft Cocktails & Artisanal Coolers',
    price: 240,
    baselineRate: 22,
    visualRate: 46,
    description: 'Suggested when guests first open the menu',
  },
  {
    id: 'starter',
    name: 'Signature Starters & Small Plates',
    price: 290,
    baselineRate: 34,
    visualRate: 58,
    description: 'Contextual pairings suggested alongside main courses',
  },
  {
    id: 'modifier',
    name: 'Premium Modifiers & Gourmet Dips',
    price: 110,
    baselineRate: 12,
    visualRate: 36,
    description: 'Truffle oil, artisan cheese crust, and smoked dips',
  },
  {
    id: 'dessert',
    name: 'Post-Entree Desserts & Digestifs',
    price: 210,
    baselineRate: 16,
    visualRate: 35,
    description: 'Suggested near the end of the meal',
  },
];

export default function UpsellingConversionAuditor() {
  const [activeTab, setActiveTab] = useState<'verbalVsVisual' | 'basketModeler'>('verbalVsVisual');

  // Mode 1: Verbal vs Visual Simulator State
  const [tablesPerServer, setTablesPerServer] = useState<number>(6);
  const [hesitationRate, setHesitationRate] = useState<number>(35); // % of tables waiter attempts upselling
  const [verbalConversion, setVerbalConversion] = useState<number>(14); // % who say yes to verbal ask
  const [visualConversion, setVisualConversion] = useState<number>(24); // user's assumption: % who add a visual suggestion
  const [avgUpsellPrice, setAvgUpsellPrice] = useState<number>(240);
  const [monthlyTables, setMonthlyTables] = useState<number>(1500);

  // Mode 2: Multi-Category Modeler State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'beverage',
    'starter',
    'modifier',
    'dessert',
  ]);
  const [categories, setCategories] = useState<CategoryOption[]>(DEFAULT_CATEGORIES);
  const [customMonthlyTables, setCustomMonthlyTables] = useState<number>(1500);
  const [baseCheckAverage, setBaseCheckAverage] = useState<number>(850);

  // Mode 1 Calculations
  const calculateVerbalVsVisual = () => {
    // Under rush pressure, servers skip tables: hesitationRate is presentation %
    const verbalPresentationPct = hesitationRate;
    const verbalAttachPct = Number(((verbalPresentationPct / 100) * (verbalConversion / 100) * 100).toFixed(1));

    // Digital prompts achieve 100% presentation consistency
    const visualPresentationPct = 100;
    const visualAttachPct = Number(((visualPresentationPct / 100) * (visualConversion / 100) * 100).toFixed(1));

    const monthlyVerbalRev = Math.round(monthlyTables * (verbalAttachPct / 100) * avgUpsellPrice);
    const monthlyVisualRev = Math.round(monthlyTables * (visualAttachPct / 100) * avgUpsellPrice);
    const monthlyLift = monthlyVisualRev - monthlyVerbalRev;
    const annualLift = monthlyLift * 12;
    const annualProfit = Math.round(annualLift * 0.72); // 72% contribution margin on high-margin adds

    const effectivenessMultiplier = Number((visualAttachPct / Math.max(0.1, verbalAttachPct)).toFixed(1));

    return {
      verbalPresentationPct,
      verbalAttachPct,
      visualPresentationPct,
      visualAttachPct,
      monthlyVerbalRev,
      monthlyVisualRev,
      monthlyLift,
      annualLift,
      annualProfit,
      effectivenessMultiplier,
    };
  };

  // Mode 2 Calculations
  const calculateCategoryModeler = () => {
    const activeItems = categories.filter((cat) => selectedCategories.includes(cat.id));

    const baselineSpendPerTable = activeItems.reduce(
      (sum, cat) => sum + (cat.baselineRate / 100) * cat.price,
      0
    );

    const visualSpendPerTable = activeItems.reduce(
      (sum, cat) => sum + (cat.visualRate / 100) * cat.price,
      0
    );

    const incrementalSpendPerTable = Math.round(visualSpendPerTable - baselineSpendPerTable);
    const newAov = Math.round(baseCheckAverage + incrementalSpendPerTable);
    const percentageAovLift = Number(((incrementalSpendPerTable / baseCheckAverage) * 100).toFixed(1));

    const monthlyRevenueGain = incrementalSpendPerTable * customMonthlyTables;
    const annualRevenueGain = monthlyRevenueGain * 12;
    const threeYearRevenueGain = annualRevenueGain * 3;

    return {
      baselineSpendPerTable: Math.round(baselineSpendPerTable),
      visualSpendPerTable: Math.round(visualSpendPerTable),
      incrementalSpendPerTable,
      newAov,
      percentageAovLift,
      monthlyRevenueGain,
      annualRevenueGain,
      threeYearRevenueGain,
      activeItemsCount: activeItems.length,
    };
  };

  const mode1Results = calculateVerbalVsVisual();
  const mode2Results = calculateCategoryModeler();

  const updateCategoryRate = (id: string, field: 'baselineRate' | 'visualRate', value: number) => {
    const clamped = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, [field]: clamped } : cat)));
  };

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((item) => item !== id));
      }
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Restaurant Upselling Conversion & Revenue Auditor</h3>
        <p className={styles.calcSubtitle}>
          Simulate verbal waitstaff friction against visual recommendations and estimate the revenue impact with your own assumptions
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'verbalVsVisual' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('verbalVsVisual')}
        >
          Mode 1: Verbal Script vs Visual Simulator
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'basketModeler' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('basketModeler')}
        >
          Mode 2: Multi-Category Basket Modeler
        </button>
      </div>

      {activeTab === 'verbalVsVisual' ? (
        <div className={styles.calcGrid}>
          {/* Controls Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Peak Rush Load (Tables per Waiter)</span>
                <span className={styles.inputVal}>{tablesPerServer} Tables</span>
              </label>
              <input
                type="range"
                min={3}
                max={10}
                step={1}
                value={tablesPerServer}
                onChange={(e) => setTablesPerServer(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Waitstaff Ask Rate (% of tables server pitches)</span>
                <span className={styles.inputVal}>{hesitationRate}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={80}
                step={5}
                value={hesitationRate}
                onChange={(e) => setHesitationRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Verbal Script Conversion Rate (Guest Yes %)</span>
                <span className={styles.inputVal}>{verbalConversion}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={verbalConversion}
                onChange={(e) => setVerbalConversion(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Visual Pairing Conversion Rate (Your Assumption)</span>
                <span className={styles.inputVal}>{visualConversion}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={45}
                step={1}
                value={visualConversion}
                onChange={(e) => setVisualConversion(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Price of Upsell Item</span>
                <span className={styles.inputVal}>Rs {avgUpsellPrice}</span>
              </label>
              <input
                type="range"
                min={100}
                max={500}
                step={10}
                value={avgUpsellPrice}
                onChange={(e) => setAvgUpsellPrice(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Monthly Dining Tables</span>
                <span className={styles.inputVal}>{monthlyTables.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={500}
                max={4000}
                step={100}
                value={monthlyTables}
                onChange={(e) => setMonthlyTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Upsell Efficiency Comparison</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Verbal Presentation Consistency:</span>
                <span className={`${styles.statValue} ${styles.statRisk}`}>
                  {mode1Results.verbalPresentationPct}% of tables
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Visual Presentation Consistency:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  Every guest who views the dish
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Verbal Attach Rate:</span>
                <span className={styles.statValue}>{mode1Results.verbalAttachPct}%</span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Visual Attach Rate:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  {mode1Results.visualAttachPct}% (+{(mode1Results.visualAttachPct - mode1Results.verbalAttachPct).toFixed(1)}%)
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Attach-Rate Multiple:</span>
                <span className={styles.statHighlight}>
                  {mode1Results.effectivenessMultiplier}x
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Monthly Verbal Upsell Revenue:</span>
                <span className={styles.statValue}>Rs {mode1Results.monthlyVerbalRev.toLocaleString()}</span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Monthly Visual Upsell Revenue:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  Rs {mode1Results.monthlyVisualRev.toLocaleString()}
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Revenue Difference:</span>
                <span className={styles.statHighlight}>
                  +Rs {mode1Results.monthlyLift.toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Annual Gross Profit (Assumes 72% Margin on Add-Ons):</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`} style={{ fontSize: '1.2rem' }}>
                  Rs {(mode1Results.annualProfit / 100000).toFixed(2)} Lakhs / yr
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 0' }}>
                Estimate from your inputs, not a KNOMI result.
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
                <span>Monthly Dining Tables</span>
                <span className={styles.inputVal}>{customMonthlyTables.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={500}
                max={4000}
                step={100}
                value={customMonthlyTables}
                onChange={(e) => setCustomMonthlyTables(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Baseline Average Check per Table</span>
                <span className={styles.inputVal}>Rs {baseCheckAverage}</span>
              </label>
              <input
                type="range"
                min={400}
                max={2500}
                step={50}
                value={baseCheckAverage}
                onChange={(e) => setBaseCheckAverage(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 600, margin: '16px 0 8px' }}>
              Active Upsell Modules (attach rates are your assumptions; edit them):
            </p>

            <div className={styles.categoryGrid}>
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <div
                    key={cat.id}
                    className={styles.categoryCard}
                    onClick={() => toggleCategory(cat.id)}
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--color-whiskey-sour)' : 'var(--color-border-default)',
                      backgroundColor: isSelected ? 'rgba(165, 127, 76, 0.08)' : 'var(--color-surface-card)',
                    }}
                  >
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryName}>{cat.name} (Rs {cat.price})</span>
                      <span
                        className={styles.categoryMeta}
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}
                      >
                        <label htmlFor={`rate-today-${cat.id}`}>Today</label>
                        <input
                          id={`rate-today-${cat.id}`}
                          type="number"
                          min={0}
                          max={100}
                          value={cat.baselineRate}
                          onChange={(e) => updateCategoryRate(cat.id, 'baselineRate', Number(e.target.value))}
                          style={{ width: '56px' }}
                        />
                        <span>% &rarr;</span>
                        <label htmlFor={`rate-visual-${cat.id}`}>with prompts</label>
                        <input
                          id={`rate-visual-${cat.id}`}
                          type="number"
                          min={0}
                          max={100}
                          value={cat.visualRate}
                          onChange={(e) => updateCategoryRate(cat.id, 'visualRate', Number(e.target.value))}
                          style={{ width: '56px' }}
                        />
                        <span>%</span>
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      style={{ accentColor: 'var(--color-whiskey-sour)' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Multi-Category Revenue Projection</div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Baseline Upsell Spend per Table:</span>
                <span className={styles.statValue}>Rs {mode2Results.baselineSpendPerTable}</span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Spend per Table with Prompts:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  Rs {mode2Results.visualSpendPerTable}
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Check Lift per Table:</span>
                <span className={styles.statHighlight}>
                  +Rs {mode2Results.incrementalSpendPerTable} (+{mode2Results.percentageAovLift}%)
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Average Order Value:</span>
                <span className={styles.statValue}>Rs {mode2Results.newAov}</span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Incremental Revenue:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`}>
                  +Rs {mode2Results.monthlyRevenueGain.toLocaleString()}
                </span>
              </div>

              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Annual Revenue Added:</span>
                <span className={styles.statHighlight}>
                  Rs {(mode2Results.annualRevenueGain / 100000).toFixed(2)} Lakhs
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated 3-Year Revenue Added:</span>
                <span className={`${styles.statValue} ${styles.statBenefit}`} style={{ fontSize: '1.2rem' }}>
                  Rs {(mode2Results.threeYearRevenueGain / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 0' }}>
                Estimate based on the attach rates you set, not a KNOMI result.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
