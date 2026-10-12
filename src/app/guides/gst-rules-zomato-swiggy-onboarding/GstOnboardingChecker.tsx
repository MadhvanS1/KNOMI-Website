"use client";

import React, { useState } from "react";
import styles from "./GstGuide.module.css";

type Mode = "matrix" | "liability";

type VenueType = "dine_in" | "cloud_kitchen" | "home_baker" | "bar_brewery" | "qsr_kiosk";
type TurnoverType = "under_20" | "over_20";
type ChannelType = "aggregator_only" | "mixed" | "direct_only";
type SchemeType = "unregistered" | "regular" | "composition";

export default function GstOnboardingChecker() {
  const [activeMode, setActiveMode] = useState<Mode>("matrix");

  // Mode 1: Decision Matrix State
  const [venueType, setVenueType] = useState<VenueType>("cloud_kitchen");
  const [turnover, setTurnover] = useState<TurnoverType>("under_20");
  const [channel, setChannel] = useState<ChannelType>("mixed");
  const [scheme, setScheme] = useState<SchemeType>("unregistered");

  // Mode 2: Liability Simulator State
  const [aggregatorSales, setAggregatorSales] = useState<number>(250000);
  const [directSales, setDirectSales] = useState<number>(350000);
  const [commissionRate, setCommissionRate] = useState<number>(22);

  // Mode 1 Logic: Eligibility & Onboarding Realities
  const getMatrixEvaluation = () => {
    // 1. Direct only establishment below 20L
    if (channel === "direct_only" && turnover === "under_20") {
      return {
        status: "GST Registration Optional (Exempt)",
        badgeClass: styles.badgeExempt,
        badgeText: "Exemption Available",
        headline: "Legally exempt under the Section 22 ₹20 Lakh service threshold",
        summary:
          "Because you do not supply food via e-commerce delivery platforms, you are governed purely by standard service thresholds. Until your annual gross revenue crosses ₹20 Lakhs (or ₹10 Lakhs in special category states), you do not need a GSTIN.",
        documents: [
          "FSSAI Basic Registration (turnover up to ₹12 Lakhs) or State License",
          "Proprietor or Business PAN Card",
          "Current Bank Account proof",
          "Trade License / Shop & Establishment Registration",
        ],
        filingImpact: "Zero GST compliance or monthly returns required until threshold is crossed.",
        portalNote: "Not listing on Zomato or Swiggy. Sales you take directly at your own tables or counter, including through your own QR menu, count towards the standard ₹20 Lakh threshold rather than the Section 9(5) rules.",
      };
    }

    // 2. Bar or Brewery serving Alcohol
    if (venueType === "bar_brewery") {
      return {
        status: "Mandatory GSTIN + State Excise Liquor VAT",
        badgeClass: styles.badgeRequired,
        badgeText: "Dual-Tax Mandatory",
        headline: "Dual-Taxation Regime: Alcoholic liquor is outside GST, food is 5% GST",
        summary:
          "Alcohol for human consumption is constitutionally carved out of GST and taxed under State Excise and VAT (rates vary by state). Prepared food and soft drinks attract 5% GST without Input Tax Credit. Zomato and Swiggy list food, and typically ask for a standard GSTIN at onboarding.",
        documents: [
          "State Excise Bar / Microbrewery License",
          "Active 15-Digit GSTIN Certificate (REG-06)",
          "FSSAI State / Central Food Safety License",
          "State Commercial Taxes VAT Registration",
          "Bank Account Cancelled Cheque with matching entity name",
        ],
        filingImpact: "Dual monthly compliance: State VAT returns for alcohol and GSTR-3B/GSTR-1 for food sales.",
        portalNote: "Aggregators typically onboard your food menu against your GSTIN. Liquor cannot be listed on standard food delivery apps in most Indian states.",
      };
    }

    // 3. Home Baker / Small Artisan on Aggregator
    if (venueType === "home_baker" && channel !== "direct_only") {
      return {
        status: "GSTIN Typically Required by Delivery Apps",
        badgeClass: styles.badgeRequired,
        badgeText: "Platform Requirement",
        headline: "Zomato and Swiggy onboarding typically requires a GSTIN",
        summary:
          "While home bakers with under ₹12 Lakhs turnover only need a basic FSSAI registration legally, Zomato and Swiggy partner onboarding typically asks for a valid 15-digit GSTIN for cooked/prepared food delivery. The Notification 34/2023 small-seller relaxation does not cover restaurant or food services.",
        documents: [
          "FSSAI Basic Food Registration (Form A / 14-digit certificate)",
          "Active GSTIN Certificate (Regular Scheme 5% without ITC)",
          "Personal PAN Card (matching proprietor GSTIN)",
          "Cancelled Cheque of current or savings bank account",
          "FSSAI Food Safety & Hygiene Undertaking",
        ],
        filingImpact: "Must file monthly GSTR-1 and GSTR-3B. Delivery sales get reported under Table 3.1.1(ii) with zero output tax payable by you.",
        portalNote: "Packaged-goods storefronts can follow different rules from cooked-food delivery. Check the current requirements in each platform's partner app before you apply.",
      };
    }

    // 4. Over 20 Lakhs (Any setup)
    if (turnover === "over_20") {
      return {
        status: "Mandatory GST Registration",
        badgeClass: styles.badgeRequired,
        badgeText: "Threshold Exceeded",
        headline: "Mandatory registration under Section 22 of the CGST Act",
        summary:
          "Your annual aggregate turnover exceeds ₹20 Lakhs. GST registration is statutory regardless of channel. On Zomato and Swiggy, the platform will remit 5% tax under Section 9(5), while you collect and deposit 5% tax on all dine-in and direct orders.",
        documents: [
          "15-Digit Active GSTIN (REG-06 Certificate)",
          "FSSAI State License",
          "Entity PAN (Proprietorship, Partnership, LLP, or Pvt Ltd)",
          "Commercial Lease Agreement / Electricity Bill for premises",
          "Bank Account Cancelled Cheque / Statement",
        ],
        filingImpact: "Mandatory monthly or quarterly QRMP return filing. Output tax on direct orders, reporting ECO sales in Table 3.1.1.",
        portalNote: "Onboarding tends to go more smoothly when your GSTIN, FSSAI and PAN all carry the same legal entity name.",
      };
    }

    // 5. Under 20 Lakhs selling on Zomato / Swiggy (Standard case)
    return {
      status: "GSTIN Needed in Operational Practice",
      badgeClass: styles.badgeRequired,
      badgeText: "Aggregator Requirement",
      headline: "Section 9(5) supplies exclude you from small e-commerce exemptions",
      summary:
        "Notification 65/2017 Central Tax explicitly excludes Section 9(5) restaurant service providers from small-seller registration exemptions. Even though Section 24(ix) contains legal nuance, Zomato and Swiggy onboarding typically asks for a 15-digit GSTIN before a kitchen goes live.",
      documents: [
        "15-Digit GSTIN (Registered under 5% restaurant service, SAC 996331)",
        "FSSAI Basic or State License",
        "Business / Proprietor PAN",
        "Cancelled Cheque from registered business account",
        "Kitchen Location Geotag & Menu Pricing Sheet",
      ],
      filingImpact: "File monthly GSTR-3B: enter aggregator sales in Table 3.1.1(ii) (tax paid by platform) and direct sales in Table 3.1(a).",
      portalNote: "Registration does not add new tax on app orders because platforms remit the 5%, but having a GSTIN creates monthly filing compliance.",
    };
  };

  const evalResult = getMatrixEvaluation();

  // Mode 2 Calculations
  const totalMonthlyGross = aggregatorSales + directSales;
  const projectedAnnualTurnover = totalMonthlyGross * 12;

  // 5% Food GST on Aggregator (Section 9(5) - Paid by Platform)
  const aggregatorGstPaidByPlatform = Math.round(aggregatorSales * 0.05);

  // 5% Output GST on Direct Dine-in / Takeaway (Paid by Restaurant)
  const directGstPayableByRestaurant = Math.round(directSales * 0.05);

  // Platform Commission & 18% GST (Blocked ITC)
  const commissionAmount = Math.round(aggregatorSales * (commissionRate / 100));
  const gstOnCommissionBlocked = Math.round(commissionAmount * 0.18);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>GST Eligibility & Onboarding Readiness Auditor</h3>
        <p className={styles.calcDescription}>
          Check the statutory registration rules, understand the Section 9(5) onboarding requirement, and estimate your GSTR-3B tax split. General information, not tax advice.
        </p>
      </div>

      <div className={styles.modeTabs}>
        <button
          type="button"
          className={`${styles.modeTab} ${activeMode === "matrix" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("matrix")}
        >
          1. Onboarding Eligibility & Document Matrix
        </button>
        <button
          type="button"
          className={`${styles.modeTab} ${activeMode === "liability" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("liability")}
        >
          2. Section 9(5) Liability & GSTR-3B Split
        </button>
      </div>

      {activeMode === "matrix" ? (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Establishment Type</label>
              <select
                className={styles.selectInput}
                value={venueType}
                onChange={(e) => setVenueType(e.target.value as VenueType)}
              >
                <option value="cloud_kitchen">Cloud Kitchen / Dark Kitchen (Delivery Only)</option>
                <option value="dine_in">Dine-in Restaurant / Cafe / Bistro</option>
                <option value="home_baker">Home Baker / Artisan Food Creator</option>
                <option value="qsr_kiosk">Quick Service Restaurant (QSR) / Food Kiosk</option>
                <option value="bar_brewery">Pub / Microbrewery / Bar (Serving Liquor)</option>
              </select>
              <span className={styles.inputHint}>
                Statutory rules differ for liquor-serving venues and small food artisans.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Expected Annual Turnover</label>
              <select
                className={styles.selectInput}
                value={turnover}
                onChange={(e) => setTurnover(e.target.value as TurnoverType)}
              >
                <option value="under_20">Under ₹20 Lakhs (Below Service Threshold)</option>
                <option value="over_20">Over ₹20 Lakhs (Above Service Threshold)</option>
              </select>
              <span className={styles.inputHint}>
                Section 22 service threshold is ₹20 Lakhs (₹10 Lakhs in special category states).
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Sales Channel Distribution</label>
              <select
                className={styles.selectInput}
                value={channel}
                onChange={(e) => setChannel(e.target.value as ChannelType)}
              >
                <option value="mixed">Mixed (Dine-in / Direct Takeaway + Zomato & Swiggy)</option>
                <option value="aggregator_only">100% Aggregators (Zomato & Swiggy Delivery Only)</option>
                <option value="direct_only">100% Direct Sales (Tabletop Dine-in / Own Website)</option>
              </select>
              <span className={styles.inputHint}>
                Selling through an e-commerce operator triggers special Section 9(5) reporting.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Current Tax Scheme / Status</label>
              <select
                className={styles.selectInput}
                value={scheme}
                onChange={(e) => setScheme(e.target.value as SchemeType)}
              >
                <option value="unregistered">Unregistered (No GSTIN yet)</option>
                <option value="regular">Regular Scheme (5% Restaurant Rate, No ITC)</option>
                <option value="composition">Composition Scheme (Section 10, 5% Flat Rate)</option>
              </select>
              <span className={styles.inputHint}>
                Restaurants under 5% cannot claim Input Tax Credit on capex or commissions.
              </span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>{evalResult.headline}</div>
              <span className={`${styles.statusBadge} ${evalResult.badgeClass}`}>
                {evalResult.badgeText}
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Portal Verification Status:</span>
                <span className={styles.resultValue}>{evalResult.status}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Filing Obligation:</span>
                <span className={styles.resultValue}>{evalResult.filingImpact}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Portal Gate Reality:</span>
                <span className={styles.resultValue}>{evalResult.portalNote}</span>
              </div>
            </div>

            <div className={styles.docChecklist}>
              <div className={styles.checklistTitle}>Typical Onboarding Document Bundle:</div>
              <ul className={styles.checklistItems}>
                {evalResult.documents.map((doc, idx) => (
                  <li key={idx} className={styles.checklistItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Aggregator Sales (Zomato + Swiggy)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(aggregatorSales)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={1500000}
                step={25000}
                value={aggregatorSales}
                onChange={(e) => setAggregatorSales(Number(e.target.value))}
              />
              <span className={styles.inputHint}>
                Gross food order value before aggregator commissions and packaging fees.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Direct Sales (Dine-in + Direct Takeaway)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(directSales)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={2000000}
                step={25000}
                value={directSales}
                onChange={(e) => setDirectSales(Number(e.target.value))}
              />
              <span className={styles.inputHint}>
                Orders taken directly at your tables, takeaway counter, or direct QR ordering.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Your Aggregator Commission Rate</span>
                <span className={styles.inputValueDisplay}>{commissionRate}%</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={15}
                max={30}
                step={1}
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
              />
              <span className={styles.inputHint}>
                Enter the commission rate from your own aggregator contract (excluding GST).
              </span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>Estimated Tax Liability & Return Summary</div>
              <span className={`${styles.statusBadge} ${styles.badgeConditional}`}>
                Annual Turnover: {formatCurrency(projectedAnnualTurnover)}
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Total Combined Monthly Revenue:</span>
                <span className={styles.resultValue}>{formatCurrency(totalMonthlyGross)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>5% Food GST Paid by Aggregator u/s 9(5):</span>
                <span className={styles.resultValueSuccess}>{formatCurrency(aggregatorGstPaidByPlatform)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>5% Output GST Payable by Restaurant:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(directGstPayableByRestaurant)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Unclaimable 18% GST on Commission:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(gstOnCommissionBlocked)}</span>
              </div>
            </div>

            <div className={styles.gstrMapBox}>
              <div className={styles.gstrTitle}>GSTR-3B Table Mapping (Estimate):</div>
              <p className={styles.gstrNote}>
                <strong>Table 3.1(a):</strong> Report direct sales of {formatCurrency(directSales)} with {formatCurrency(directGstPayableByRestaurant)} tax payable in cash.
                <br />
                <strong>Table 3.1.1(ii):</strong> Report aggregator sales of {formatCurrency(aggregatorSales)} with ₹0 liability (tax of {formatCurrency(aggregatorGstPaidByPlatform)} remitted directly by Zomato/Swiggy).
                <br />
                <strong>Table 4 (ITC):</strong> Zero credit claimable. The {formatCurrency(gstOnCommissionBlocked)} paid on commissions is blocked under Notification 46/2017.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
