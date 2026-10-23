"use client";

import React, { useState } from "react";
import styles from "./PetpoojaReview.module.css";

type VenueType = "cafe" | "casual" | "qsr" | "cloud" | "finedining";
type TrafficType = "rush" | "steady";
type FitLevel = 1 | 2 | 3;

interface VenueProfile {
  name: string;
  backOfficeFit: FitLevel;
  tableFit: FitLevel;
  hazard: string;
  recommendation: string;
}

// Our own qualitative assessment, not measured scores.
const FIT_LABELS: Record<FitLevel, string> = {
  1: "Limited",
  2: "Moderate",
  3: "Strong",
};

const VENUE_PROFILES: Record<VenueType, VenueProfile> = {
  cafe: {
    name: "High-Volume Cafe or Microbrewery",
    backOfficeFit: 3,
    tableFit: 2,
    hazard: "Order-taking becomes the bottleneck during the 8–10 PM surge. Guests struggle to flag down staff for another round, and add-ons depend on how busy the team is.",
    recommendation: "Keep Petpooja at the counter for Tally and GST. Add KNOMI on the dining tables so guests can re-order themselves and Knomi Host can suggest pairings.",
  },
  casual: {
    name: "Casual Dine-In Restaurant",
    backOfficeFit: 3,
    tableFit: 2,
    hazard: "Servers spend much of the shift writing chits and walking them to the cashier terminal rather than looking after guests.",
    recommendation: "Keep Petpooja for cashier and inventory. Add KNOMI on the tables so orders go straight to the kitchen display, and your team spends more of the rush on hospitality.",
  },
  qsr: {
    name: "Quick Service Restaurant (QSR) or Food Kiosk",
    backOfficeFit: 3,
    tableFit: 3,
    hazard: "Little table friction, because customers order directly at the counter. Petpooja is well suited here.",
    recommendation: "Petpooja on its own is a good fit for single-counter QSR operations with fast billing.",
  },
  cloud: {
    name: "Cloud Kitchen / Delivery-Only Kitchen",
    backOfficeFit: 3,
    tableFit: 3,
    hazard: "No dining room to manage; the work is consolidating orders across Zomato and Swiggy, which Petpooja handles well.",
    recommendation: "Petpooja's delivery aggregator integration suits multi-brand cloud kitchens.",
  },
  finedining: {
    name: "Fine Dining / Experiential Lounge",
    backOfficeFit: 3,
    tableFit: 2,
    hazard: "Captains value personal table rapport, but paper-to-POS handoffs can slow dessert and digestif service.",
    recommendation: "Keep white-glove captain service, and use Knomi Host's pairing suggestions on the menu to support wine and dessert choices.",
  },
};

export default function PetpoojaFitmentAuditor() {
  const [activeTab, setActiveTab] = useState<"fitment" | "timeline">("fitment");
  const [venue, setVenue] = useState<VenueType>("cafe");
  const [tableCount, setTableCount] = useState<number>(24);
  const [traffic, setTraffic] = useState<TrafficType>("rush");

  const currentProfile = VENUE_PROFILES[venue];

  // Table fit eases down one step for larger floors under weekend-rush pressure.
  const calculatedTableFit: FitLevel =
    traffic === "rush" && tableCount >= 20 && currentProfile.tableFit > 1
      ? ((currentProfile.tableFit - 1) as FitLevel)
      : currentProfile.tableFit;

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Petpooja Venue Fitment &amp; Bottleneck Auditor</h3>
        <p className={styles.calcDescription}>
          See whether Petpooja on its own covers your venue&apos;s main operational bottleneck, or whether floor service calls for a guest-facing layer. Ratings are our own qualitative assessment.
        </p>
      </div>

      <div className={styles.tabGroup}>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === "fitment" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("fitment")}
        >
          1. Venue Format &amp; Bottleneck Scorecard
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} pressable ${activeTab === "timeline" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          2. Peak-Hour Order Flow (Illustrative)
        </button>
      </div>

      {activeTab === "fitment" ? (
        <>
          <div className={styles.controlsGrid}>
            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Restaurant Format</span>
              </div>
              <select
                value={venue}
                onChange={(e) => setVenue(e.target.value as VenueType)}
                className={styles.selectInput}
              >
                <option value="cafe">High-Volume Cafe / Brewery</option>
                <option value="casual">Casual Dine-In Restaurant</option>
                <option value="qsr">Quick Service (QSR) / Kiosk</option>
                <option value="cloud">Cloud Kitchen (Delivery Only)</option>
                <option value="finedining">Fine Dining / Lounge</option>
              </select>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Peak-Hour Pressure</span>
              </div>
              <select
                value={traffic}
                onChange={(e) => setTraffic(e.target.value as TrafficType)}
                className={styles.selectInput}
              >
                <option value="rush">Weekend Surge (Fri-Sun 8-10 PM Rush)</option>
                <option value="steady">Uniform Steady Flow Throughout Day</option>
              </select>
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Dining Tables</span>
                <span className={styles.controlValue}>{tableCount} Tables</span>
              </div>
              <input
                type="range"
                min="8"
                max="60"
                step="2"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>

            <div className={styles.controlCard}>
              <div className={styles.controlLabelGroup}>
                <span className={styles.controlLabel}>Order-Taking Method</span>
                <span className={styles.controlValue}>Floor Waiter Chits</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: 0 }}>
                Servers visit tables with paper pads or Android captain apps.
              </p>
            </div>
          </div>

          <div className={styles.scoreGrid}>
            <div className={styles.scoreCard}>
              <div className={`${styles.scoreVal} ${styles.scoreValGood}`}>
                {FIT_LABELS[currentProfile.backOfficeFit]}
              </div>
              <div className={styles.scoreLabel}>Back-Office &amp; Billing Fit</div>
              <div className={styles.scoreSub}>Cashier speed, GST reporting, inventory &amp; Tally sync</div>
            </div>

            <div className={styles.scoreCard}>
              <div
                className={`${styles.scoreVal} ${
                  calculatedTableFit === 3 ? styles.scoreValGood : styles.scoreValLow
                }`}
              >
                {FIT_LABELS[calculatedTableFit]}
              </div>
              <div className={styles.scoreLabel}>Table Service &amp; Upselling Fit</div>
              <div className={styles.scoreSub}>How well a POS-only setup handles ordering speed, menu presentation &amp; add-ons</div>
            </div>
          </div>

          <div className={styles.verdictBanner}>
            <div className={styles.verdictTitle}>Primary Operational Bottleneck:</div>
            <p className={styles.verdictText} style={{ marginBottom: "14px" }}>
              {currentProfile.hazard}
            </p>
            <div className={styles.verdictTitle} style={{ color: "#fbf8f3" }}>
              Recommended Architecture:
            </div>
            <p className={styles.verdictText}>{currentProfile.recommendation}</p>
          </div>
        </>
      ) : (
        <div className={styles.timelineGrid}>
          <div className={styles.timelineCard}>
            <div className={styles.timelineCardTitle}>
              <span>Server-Led Floor Flow</span>
              <span className={`${styles.timePill} ${styles.pillSlow}`}>Waits on Staff</span>
            </div>
            <ul className={styles.stepList}>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>⏱</span>
                <span><strong>Step 1:</strong> Guests are seated and wait for a free server during the rush.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>📝</span>
                <span><strong>Step 2:</strong> The server brings a printed menu; guests browse a text list.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>✋</span>
                <span><strong>Step 3:</strong> Guests try to catch a server&apos;s eye to give their order.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>🚶</span>
                <span><strong>Step 4:</strong> The server writes a chit and walks it to the billing counter.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>🖨</span>
                <span><strong>Step 5:</strong> The server queues at the terminal to punch the KOT to the kitchen.</span>
              </li>
            </ul>
          </div>

          <div className={styles.timelineCard} style={{ borderColor: "var(--color-whiskey-sour)" }}>
            <div className={styles.timelineCardTitle}>
              <span>KNOMI Co-Existence Flow</span>
              <span className={`${styles.timePill} ${styles.pillFast}`}>Guest-Led</span>
            </div>
            <ul className={styles.stepList}>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>📱</span>
                <span><strong>Step 1:</strong> Guests scan the QR code on the table stand.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>⚡</span>
                <span><strong>Step 2:</strong> The illustrated menu opens in the browser, with no app and no login.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>✨</span>
                <span><strong>Step 3:</strong> Guests browse the dishes while Knomi Host suggests a pairing.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>🚀</span>
                <span><strong>Step 4:</strong> The guest confirms with a phone number and the order lands on the kitchen display.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>🎉</span>
                <span><strong>Result:</strong> Nobody has to carry the order to the counter, so servers can spend more of the rush with guests.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
