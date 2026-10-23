'use client';

import React, { useState } from 'react';
import styles from './CloudKitchenGuide.module.css';

type KitchenModel = 'singleBrand' | 'multiBrand' | 'kaasPod';
type CityTier = 'tier1' | 'tier2';
type EquipmentGrade = 'standardCommercial' | 'heavyDutySS304';

export default function CloudKitchenCapexAuditor() {
  const [activeTab, setActiveTab] = useState<'capexRunway' | 'aggregatorVsDirect'>('capexRunway');

  // Mode 1: Capex & 90-Day Runway State
  const [kitchenModel, setKitchenModel] = useState<KitchenModel>('singleBrand');
  const [cityTier, setCityTier] = useState<CityTier>('tier1');
  const [equipmentGrade, setEquipmentGrade] = useState<EquipmentGrade>('standardCommercial');
  const [targetedOrders, setTargetedOrders] = useState<number>(1800); // Day-90 monthly orders (~60/day)

  // Mode 2: Aggregator vs Direct Channel Simulator State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1800);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(420); // Indian delivery AOV
  const [foodCostPct] = useState<number>(30); // Illustrative 30% COGS assumption
  const [packagingPct] = useState<number>(9); // Illustrative 9% packaging and sealing assumption
  const [aggregatorCommissionPct, setAggregatorCommissionPct] = useState<number>(24); // User's commission rate (default is a placeholder)
  const [platformAdSpendPct, setPlatformAdSpendPct] = useState<number>(7); // User's ad spend as % of sales (placeholder)
  const [directChannelTargetPct, setDirectChannelTargetPct] = useState<number>(30); // User's direct ordering share assumption

  // Mode 1: Capex & Runway Calculation
  const calculateCapex = () => {
    // Space footprint benchmark
    let spaceSqFt = 250;
    let baseMonthlyRent = cityTier === 'tier1' ? 32000 : 18000;
    let depositMonths = cityTier === 'tier1' ? 10 : 4; // Illustrative deposit assumption: 10 months Tier 1, 4 months Tier 2

    if (kitchenModel === 'multiBrand') {
      spaceSqFt = 450;
      baseMonthlyRent = cityTier === 'tier1' ? 55000 : 30000;
    } else if (kitchenModel === 'kaasPod') {
      spaceSqFt = 180;
      baseMonthlyRent = cityTier === 'tier1' ? 65000 : 40000; // Shared KaaS includes base rent + maintenance
      depositMonths = 2; // KaaS usually charges 2-3 months security deposit
    }

    const realEstateDeposit = baseMonthlyRent * depositMonths;

    // Civil, Ventilation & Ducting (Centrifugal Blower, Fresh Air, Hood, Grease Traps)
    let civilAndVentilation = 0;
    if (kitchenModel === 'kaasPod') {
      // In shared pods (Kitchens@ / shared facility), central exhaust and civil work are pre-installed
      civilAndVentilation = 15000; // Minor prep connections
    } else if (kitchenModel === 'singleBrand') {
      civilAndVentilation = equipmentGrade === 'heavyDutySS304' ? 145000 : 105000;
    } else {
      // Multi-brand needs heavy 5,000+ CFM exhaust and multiple gas lines
      civilAndVentilation = equipmentGrade === 'heavyDutySS304' ? 220000 : 165000;
    }

    // Core Kitchen Equipment & Cold Chain (Commercial Ranges, Upright SS Chillers, Freezers, Work Tables)
    let equipmentCapex = 0;
    if (kitchenModel === 'kaasPod') {
      equipmentCapex = equipmentGrade === 'heavyDutySS304' ? 120000 : 85000;
    } else if (kitchenModel === 'singleBrand') {
      equipmentCapex = equipmentGrade === 'heavyDutySS304' ? 240000 : 175000;
    } else {
      equipmentCapex = equipmentGrade === 'heavyDutySS304' ? 420000 : 310000;
    }

    // Statutory Licenses & Setup
    // FSSAI Basic or State, Municipal Trade License, Shop & Establishment, GST filing, Fire NOC compliance
    const statutoryLicenses = cityTier === 'tier1' ? 28000 : 18000;
    const initialPackagingStock = kitchenModel === 'multiBrand' ? 45000 : 25000;
    const techAndPosSetup = 15000;

    const totalUpfrontCapex = civilAndVentilation + equipmentCapex + statutoryLicenses + initialPackagingStock + techAndPosSetup;

    // 90-Day Operational Runway Buffer (Crucial to prevent shutdown during the cold-start phase)
    // Monthly Fixed Opex: Rent + Kitchen Labor (1 Head Cook + 1 Assistant + 1 Utility) + Gas/Power + Initial Marketing
    const monthlyStaffCost = kitchenModel === 'multiBrand' ? 75000 : 45000;
    const monthlyUtilities = kitchenModel === 'multiBrand' ? 30000 : 18000;
    const monthlyColdStartMarketing = 25000; // Initial platform bidding to trigger order volume

    const monthlyFixedOpex = baseMonthlyRent + monthlyStaffCost + monthlyUtilities + monthlyColdStartMarketing;
    const ninetyDayRunwayBuffer = monthlyFixedOpex * 3;

    const totalOpeningCapitalRequired = totalUpfrontCapex + realEstateDeposit + ninetyDayRunwayBuffer;

    return {
      spaceSqFt,
      baseMonthlyRent,
      depositMonths,
      realEstateDeposit,
      civilAndVentilation,
      equipmentCapex,
      statutoryLicenses,
      totalUpfrontCapex,
      monthlyFixedOpex,
      ninetyDayRunwayBuffer,
      totalOpeningCapitalRequired,
    };
  };

  // Mode 2: Aggregator vs Direct Channel Margin Calculations
  const calculateMargins = () => {
    const grossRevenue = monthlyOrders * avgOrderValue;
    const allInAggregatorRate = aggregatorCommissionPct + platformAdSpendPct + 2; // Base commission + Ads + assumed 2% PG fee

    // Pure Aggregator Waterfall (100% orders on Swiggy / Zomato)
    const pureAggregatorDeduction = Math.round(grossRevenue * (allInAggregatorRate / 100));
    const foodCostAmount = Math.round(grossRevenue * (foodCostPct / 100));
    const packagingCostAmount = Math.round(grossRevenue * (packagingPct / 100));
    const estimatedFixedOpex = 95000; // Illustrative fixed costs: kitchen labor, rent, utility share

    const pureAggregatorNetProfit = grossRevenue - pureAggregatorDeduction - foodCostAmount - packagingCostAmount - estimatedFixedOpex;
    const pureAggregatorNetMarginPct = Number(((pureAggregatorNetProfit / grossRevenue) * 100).toFixed(1));

    // Hybrid Direct Ordering Waterfall (user's assumed share of orders moved to the kitchen's own direct channel)
    const directOrdersCount = Math.round(monthlyOrders * (directChannelTargetPct / 100));
    const aggregatorOrdersCount = monthlyOrders - directOrdersCount;

    const directRevenue = directOrdersCount * avgOrderValue;
    const remainingAggregatorRevenue = aggregatorOrdersCount * avgOrderValue;

    // On direct orders: no aggregator commission or platform ad spend; assumed 2% payment gateway fee. Own delivery costs are not modelled.
    const directDeductions = Math.round(directRevenue * 0.02);
    const remainingAggregatorDeductions = Math.round(remainingAggregatorRevenue * (allInAggregatorRate / 100));

    const totalHybridDeductions = directDeductions + remainingAggregatorDeductions;
    const hybridNetProfit = grossRevenue - totalHybridDeductions - foodCostAmount - packagingCostAmount - estimatedFixedOpex;
    const hybridNetMarginPct = Number(((hybridNetProfit / grossRevenue) * 100).toFixed(1));

    const monthlyMarginReclaimed = hybridNetProfit - pureAggregatorNetProfit;
    const annualMarginReclaimed = monthlyMarginReclaimed * 12;

    return {
      grossRevenue,
      allInAggregatorRate,
      pureAggregatorDeduction,
      pureAggregatorNetProfit,
      pureAggregatorNetMarginPct,
      directOrdersCount,
      aggregatorOrdersCount,
      directRevenue,
      monthlyMarginReclaimed,
      annualMarginReclaimed,
      hybridNetProfit,
      hybridNetMarginPct,
    };
  };

  const capexResults = calculateCapex();
  const marginResults = calculateMargins();

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>Interactive Cloud Kitchen Capex & Margin Auditor</h2>
        <p className={styles.calcSubtitle}>
          Estimate fitout and licensing costs for your city using illustrative defaults, then model the impact of direct ordering vs aggregator commissions. All results are estimates, not quotes.
        </p>
      </div>

      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'capexRunway' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('capexRunway')}
        >
          Mode 1: Capex & 90-Day Runway
        </button>
        <button
          className={`${styles.tabBtn} pressable ${activeTab === 'aggregatorVsDirect' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('aggregatorVsDirect')}
        >
          Mode 2: Aggregator vs Direct Channel Margins
        </button>
      </div>

      {activeTab === 'capexRunway' ? (
        <div className={styles.calcGrid}>
          {/* Inputs Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Kitchen Operating Format</span>
              </label>
              <select
                className={styles.selectInput}
                value={kitchenModel}
                onChange={(e) => setKitchenModel(e.target.value as KitchenModel)}
              >
                <option value="singleBrand">Single Independent Kitchen (250 sq.ft)</option>
                <option value="multiBrand">Multi-Brand Virtual House (450 sq.ft, 3-4 Brands)</option>
                <option value="kaasPod">Shared Cloud Pod / KaaS (Kitchens@ 180 sq.ft)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>City Location & Rental Tier</span>
              </label>
              <select
                className={styles.selectInput}
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value as CityTier)}
              >
                <option value="tier1">Tier 1 Metro (Bangalore, Mumbai, Delhi NCR)</option>
                <option value="tier2">Tier 2 City (Pune, Jaipur, Ahmedabad, Lucknow)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Kitchen Equipment & Fabrication Grade</span>
              </label>
              <select
                className={styles.selectInput}
                value={equipmentGrade}
                onChange={(e) => setEquipmentGrade(e.target.value as EquipmentGrade)}
              >
                <option value="standardCommercial">Standard Commercial Grade</option>
                <option value="heavyDutySS304">Heavy Duty SS304 Food Grade Fabrication</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Target Orders / Month (Day 90)</span>
                <span className={styles.inputVal}>{targetedOrders} orders (~{Math.round(targetedOrders / 30)}/day)</span>
              </label>
              <input
                type="range"
                min={600}
                max={4000}
                step={100}
                value={targetedOrders}
                onChange={(e) => setTargetedOrders(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Estimated Capital & Runway Breakdown</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Kitchen Footprint & Monthly Rent:</span>
                <span className={styles.statVal}>{capexResults.spaceSqFt} sq.ft | ₹{capexResults.baseMonthlyRent.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Exhaust, Ducting & Civil Fitout:</span>
                <span className={styles.statVal}>₹{capexResults.civilAndVentilation.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Commercial Cooking & Cold Chain:</span>
                <span className={styles.statVal}>₹{capexResults.equipmentCapex.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>FSSAI, Trade License & Approvals:</span>
                <span className={styles.statVal}>₹{capexResults.statutoryLicenses.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total Upfront Hardware Fitout:</span>
                <span className={styles.statVal}>₹{capexResults.totalUpfrontCapex.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Real Estate Security Deposit ({capexResults.depositMonths} mos):</span>
                <span className={styles.statVal}>₹{capexResults.realEstateDeposit.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>90-Day Operational Runway Buffer:</span>
                <span className={styles.greenVal}>₹{capexResults.ninetyDayRunwayBuffer.toLocaleString('en-IN')}</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Estimated Bank Capital Needed on Day 1:</span>
                <span className={styles.highlightVal}>₹{capexResults.totalOpeningCapitalRequired.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              Founder note: these figures are estimates built from illustrative defaults (rent, deposit months, equipment and staff costs), not quotes. Replace them with your own numbers, and never launch without about three months of fixed costs in the bank.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.calcGrid}>
          {/* Inputs Column */}
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Monthly Delivery Orders</span>
                <span className={styles.inputVal}>{monthlyOrders.toLocaleString('en-IN')} orders</span>
              </label>
              <input
                type="range"
                min={600}
                max={5000}
                step={100}
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Average Order Value (AOV)</span>
                <span className={styles.inputVal}>₹{avgOrderValue}</span>
              </label>
              <input
                type="range"
                min={250}
                max={900}
                step={25}
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your Aggregator Commission Rate</span>
                <span className={styles.inputVal}>{aggregatorCommissionPct}%</span>
              </label>
              <input
                type="range"
                min={18}
                max={30}
                step={1}
                value={aggregatorCommissionPct}
                onChange={(e) => setAggregatorCommissionPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Your Platform Ad Spend / Sponsored CPC</span>
                <span className={styles.inputVal}>{platformAdSpendPct}%</span>
              </label>
              <input
                type="range"
                min={3}
                max={15}
                step={1}
                value={platformAdSpendPct}
                onChange={(e) => setPlatformAdSpendPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span>Direct Ordering Share (your assumption)</span>
                <span className={styles.inputVal}>{directChannelTargetPct}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={directChannelTargetPct}
                onChange={(e) => setDirectChannelTargetPct(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {/* Results Column */}
          <div className={styles.resultBox}>
            <div>
              <div className={styles.resultTitle}>Aggregator vs Direct Channel Economics (Estimate)</div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Gross Delivery Sales:</span>
                <span className={styles.statVal}>₹{marginResults.grossRevenue.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total Aggregator Take-Rate (Cut + Ads + 2% PG):</span>
                <span className={styles.redVal}>{marginResults.allInAggregatorRate}%</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Pure Aggregator Net Profit (est.):</span>
                <span className={styles.statVal}>₹{marginResults.pureAggregatorNetProfit.toLocaleString('en-IN')}/mo ({marginResults.pureAggregatorNetMarginPct}%)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Direct Channel Orders Captured:</span>
                <span className={styles.statVal}>{marginResults.directOrdersCount} orders (₹{marginResults.directRevenue.toLocaleString('en-IN')})</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Hybrid Model Net Profit (est.):</span>
                <span className={styles.greenVal}>₹{marginResults.hybridNetProfit.toLocaleString('en-IN')}/mo ({marginResults.hybridNetMarginPct}%)</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Estimated Monthly Margin Difference:</span>
                <span className={styles.greenVal}>+₹{marginResults.monthlyMarginReclaimed.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className={`${styles.statRow} ${styles.highlightRow}`}>
                <span className={styles.statLabel}>Estimated Annual Margin Difference:</span>
                <span className={styles.highlightVal}>+₹{marginResults.annualMarginReclaimed.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className={styles.calcNotice}>
              Estimate only: this assumes a 2% payment gateway fee on direct orders, 30% food cost, 9% packaging and ₹95,000 a month of fixed costs, and it leaves out the cost of delivering direct orders yourself. The default commission and ad-spend values are placeholders, not platform rates: set them to the figures on your own payout statement. On these inputs, moving {directChannelTargetPct}% of orders to your own direct channel changes annual operating profit by about ₹{(marginResults.annualMarginReclaimed / 100000).toFixed(2)} Lakhs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
