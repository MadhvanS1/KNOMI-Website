"use client";

import { useState } from "react";
import { bookHref, pricing } from "@/content/site";
import styles from "./SelfOrderingRoi.module.css";

// KNOMI Signature plan, per table per month (source: content/site.ts, KNOMI Brain §2).
const SIGNATURE_PRICE = pricing.plans.find((plan) => plan.id === "signature")?.priceMin ?? 250;

export default function RoiCalculator() {
  const [tables, setTables] = useState<number>(20);
  const [salary, setSalary] = useState<number>(22000);
  const [tablesPerWaiter, setTablesPerWaiter] = useState<number>(5);
  // The user's own assumptions (not KNOMI results). Starts at today's ratio, so no staffing
  // change is assumed until the user chooses one.
  const [tablesPerServerSelfOrder, setTablesPerServerSelfOrder] = useState<number>(5);
  const [turnsPerDay, setTurnsPerDay] = useState<number>(2.5);
  const [aov, setAov] = useState<number>(1200);
  const [aovLiftPct, setAovLiftPct] = useState<number>(25);

  // Staffing estimate: order-taking ratio today vs the ratio the user assumes with self-ordering
  const currentWaiters = Math.ceil(tables / tablesPerWaiter);
  const selfOrderWaiters = Math.max(1, Math.ceil(tables / tablesPerServerSelfOrder));
  const staffDifference = Math.max(0, currentWaiters - selfOrderWaiters);
  const monthlyStaffingDifference = staffDifference * salary;
  const annualStaffingDifference = monthlyStaffingDifference * 12;

  // Average-order estimate: applies the user's assumed lift (KNOMI's target is +25%, not a guarantee)
  const estimatedMonthlyBills = tables * turnsPerDay * 30;
  const estimatedMonthlyRevenue = estimatedMonthlyBills * aov;
  const estimatedExtraRevenue = Math.round(estimatedMonthlyRevenue * (aovLiftPct / 100));

  // Cost of KNOMI on the recommended Signature plan
  const knomiMonthlyFee = tables * SIGNATURE_PRICE;
  const estimatedMonthlyEffect = monthlyStaffingDifference + estimatedExtraRevenue - knomiMonthlyFee;

  return (
    <div className={styles.calcContainer}>
      <div className={styles.calcGrid}>
        {/* Controls Column */}
        <div className={styles.controlsCol}>
          <div>
            <h3 className={styles.calcHeading}>Interactive Venue Parameters</h3>
            <p className={styles.calcSub}>
              Enter your own numbers and assumptions. Every result is an estimate, not a promise.
            </p>
          </div>

          {/* Slider 1: Table Count */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-tables" className={styles.inputLabel}>
                Number of Dining Tables
              </label>
              <span className={styles.inputValueBadge}>{tables} Tables</span>
            </div>
            <input
              id="input-tables"
              type="range"
              min={6}
              max={60}
              step={2}
              value={tables}
              onChange={(e) => setTables(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>6 Tables (Small Cafe)</span>
              <span>20 Tables (Casual Dining)</span>
              <span>60 Tables (Brewery)</span>
            </div>
          </div>

          {/* Slider 2: Monthly Staff Salary */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-salary" className={styles.inputLabel}>
                Waiter Monthly Cost (Salary + Meals)
              </label>
              <span className={styles.inputValueBadge}>
                ₹{salary.toLocaleString("en-IN")}/mo
              </span>
            </div>
            <input
              id="input-salary"
              type="range"
              min={14000}
              max={35000}
              step={1000}
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>₹14,000</span>
              <span>₹22,000</span>
              <span>₹35,000</span>
            </div>
          </div>

          {/* Slider 3: Tables per Waiter Currently */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-ratio" className={styles.inputLabel}>
                Current Tables per Waiter (Order-Taking)
              </label>
              <span className={styles.inputValueBadge}>
                1 Staff per {tablesPerWaiter} Tables
              </span>
            </div>
            <input
              id="input-ratio"
              type="range"
              min={4}
              max={8}
              step={1}
              value={tablesPerWaiter}
              onChange={(e) => setTablesPerWaiter(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>4 Tables (High Touch)</span>
              <span>5 Tables</span>
              <span>8 Tables (Stretched)</span>
            </div>
          </div>

          {/* Slider 4: Tables per server with self-ordering (assumption) */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-ratio-self" className={styles.inputLabel}>
                Tables per Server with Self-Ordering (Your Assumption)
              </label>
              <span className={styles.inputValueBadge}>
                1 Staff per {tablesPerServerSelfOrder} Tables
              </span>
            </div>
            <input
              id="input-ratio-self"
              type="range"
              min={4}
              max={12}
              step={1}
              value={tablesPerServerSelfOrder}
              onChange={(e) => setTablesPerServerSelfOrder(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>4 Tables</span>
              <span>Your call: staffing is a choice</span>
              <span>12 Tables</span>
            </div>
          </div>

          {/* Slider 5: Average Order Value */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-aov" className={styles.inputLabel}>
                Average Bill Size per Table
              </label>
              <span className={styles.inputValueBadge}>
                ₹{aov.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              id="input-aov"
              type="range"
              min={500}
              max={3500}
              step={100}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>₹500 (Quick Bites)</span>
              <span>₹1,200 (Casual Dine)</span>
              <span>₹3,500 (Microbrewery)</span>
            </div>
          </div>

          {/* Slider 6: Table turns per day */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-turns" className={styles.inputLabel}>
                Bills per Table per Day
              </label>
              <span className={styles.inputValueBadge}>{turnsPerDay} Bills</span>
            </div>
            <input
              id="input-turns"
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={turnsPerDay}
              onChange={(e) => setTurnsPerDay(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>1 Bill</span>
              <span>Use your own POS data</span>
              <span>6 Bills</span>
            </div>
          </div>

          {/* Slider 7: Assumed lift in average order */}
          <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
              <label htmlFor="input-lift" className={styles.inputLabel}>
                Lift in Average Order (Your Assumption)
              </label>
              <span className={styles.inputValueBadge}>+{aovLiftPct}%</span>
            </div>
            <input
              id="input-lift"
              type="range"
              min={0}
              max={40}
              step={1}
              value={aovLiftPct}
              onChange={(e) => setAovLiftPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>0% (No Change)</span>
              <span>25% (KNOMI&apos;s Target, Not a Guarantee)</span>
              <span>40%</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className={styles.resultsCol}>
          <div className={styles.resultsHeader}>
            <h4 className={styles.resultsTitle}>Your Estimate</h4>
            <p className={styles.resultsSub}>
              Based only on the inputs and assumptions you set. Not a KNOMI result or guarantee.
            </p>
          </div>

          {/* Big Estimate Block */}
          <div className={styles.mainSavingsBlock}>
            <div className={styles.mainSavingsLabel}>Estimated Monthly Effect</div>
            <div className={styles.mainSavingsValue}>
              {estimatedMonthlyEffect < 0 ? "-" : ""}₹{Math.abs(estimatedMonthlyEffect).toLocaleString("en-IN")}
            </div>
            <div className={styles.mainSavingsSubtext}>
              Staffing difference + extra revenue − KNOMI fee, before food cost on the extra orders
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className={styles.metricsList}>
            <div className={styles.metricRow}>
              <span className={styles.metricName}>FOH Staff at Today&apos;s Ratio:</span>
              <span className={styles.metricValue}>{currentWaiters} staff</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricName}>FOH Staff at Your Assumed Ratio:</span>
              <span className={styles.metricHighlight}>{selfOrderWaiters} staff</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricName}>Estimated Staffing Difference:</span>
              <span className={styles.metricHighlight}>
                ₹{monthlyStaffingDifference.toLocaleString("en-IN")}/mo (₹{annualStaffingDifference.toLocaleString("en-IN")}/yr)
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricName}>Estimated Extra Revenue at +{aovLiftPct}%:</span>
              <span className={styles.metricValue}>
                +₹{estimatedExtraRevenue.toLocaleString("en-IN")}/mo
              </span>
            </div>
            <div className={styles.metricRow} style={{ borderBottom: "none" }}>
              <span className={styles.metricName}>
                KNOMI Signature (₹{SIGNATURE_PRICE} × {tables} tables):
              </span>
              <span className={styles.metricValue}>
                −₹{knomiMonthlyFee.toLocaleString("en-IN")}/mo
              </span>
            </div>
          </div>

          <a href={bookHref} className={`btn btn--primary ${styles.calcCtaBtn}`}>
            Book a walkthrough
          </a>
        </div>
      </div>
    </div>
  );
}
