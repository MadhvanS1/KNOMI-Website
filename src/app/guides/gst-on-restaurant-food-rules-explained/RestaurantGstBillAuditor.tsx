"use client";

import React, { useState } from "react";
import styles from "./GstFoodGuide.module.css";

type Mode = "splitter" | "itc_paradox";

type EstablishmentType = "standalone" | "hotel_specified" | "composition";

export default function RestaurantGstBillAuditor() {
  const [activeMode, setActiveMode] = useState<Mode>("splitter");

  // Mode 1: Multi-Tax Bill Splitter State
  const [establishmentType, setEstablishmentType] = useState<EstablishmentType>("standalone");
  const [foodAmount, setFoodAmount] = useState<number>(1200);
  const [alcoholAmount, setAlcoholAmount] = useState<number>(800);
  const [stateVatRate, setStateVatRate] = useState<number>(18.5); // Default Karnataka
  const [serviceChargePercent, setServiceChargePercent] = useState<number>(5);
  const [packagingCharge, setPackagingCharge] = useState<number>(50);

  // Mode 2: ITC Paradox State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1000000);
  const [monthlyRent, setMonthlyRent] = useState<number>(150000);
  const [monthlyCommission, setMonthlyCommission] = useState<number>(200000);
  const [monthlyOtherExpenses, setMonthlyOtherExpenses] = useState<number>(100000);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Mode 1 Computations
  const totalFoodSubtotal = foodAmount + packagingCharge;
  const serviceChargeOnFood = Math.round(totalFoodSubtotal * (serviceChargePercent / 100));
  const serviceChargeOnAlcohol = Math.round(alcoholAmount * (serviceChargePercent / 100));
  const totalServiceCharge = serviceChargeOnFood + serviceChargeOnAlcohol;

  const taxableFoodBase = totalFoodSubtotal + serviceChargeOnFood;
  const taxableAlcoholBase = alcoholAmount + serviceChargeOnAlcohol;

  let cgstRate = 0.025;
  let sgstRate = 0.025;

  if (establishmentType === "hotel_specified") {
    cgstRate = 0.09;
    sgstRate = 0.09;
  } else if (establishmentType === "composition") {
    cgstRate = 0;
    sgstRate = 0;
  }

  const cgstAmount = Math.round(taxableFoodBase * cgstRate);
  const sgstAmount = Math.round(taxableFoodBase * sgstRate);
  const totalFoodGst = cgstAmount + sgstAmount;

  const liquorVatAmount = Math.round(taxableAlcoholBase * (stateVatRate / 100));

  const grandTotal =
    taxableFoodBase +
    taxableAlcoholBase +
    totalFoodGst +
    liquorVatAmount;

  const totalTaxes = totalFoodGst + liquorVatAmount;
  const preTaxSubtotal = totalFoodSubtotal + alcoholAmount + totalServiceCharge;
  const effectiveTaxRate =
    preTaxSubtotal > 0 ? ((totalTaxes / preTaxSubtotal) * 100).toFixed(1) : "0.0";

  // Mode 2 Computations (ITC Paradox)
  const gstOnRent = Math.round(monthlyRent * 0.18);
  const gstOnCommission = Math.round(monthlyCommission * 0.18);
  const gstOnOther = Math.round(monthlyOtherExpenses * 0.18);
  const totalBlockedItcMonthly = gstOnRent + gstOnCommission + gstOnOther;
  const totalBlockedItcAnnual = totalBlockedItcMonthly * 12;

  // Realized revenue under 5% regime
  const netRetained5 = monthlyRevenue - totalBlockedItcMonthly;

  return (
    <div className={styles.calculatorSection}>
      <div className={styles.calcHeader}>
        <h3 className={styles.calcTitle}>Restaurant Multi-Tax Bill & ITC Paradox Auditor</h3>
        <p className={styles.calcDescription}>
          Split food GST (5% vs 18%), State Liquor VAT, and service charges on a live bill receipt, or calculate blocked ITC leakage.
        </p>
      </div>

      <div className={styles.modeTabs}>
        <button
          type="button"
          className={`${styles.modeTab} ${activeMode === "splitter" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("splitter")}
        >
          1. Multi-Tax Bill Splitter & Receipt Generator
        </button>
        <button
          type="button"
          className={`${styles.modeTab} ${activeMode === "itc_paradox" ? styles.modeTabActive : ""}`}
          onClick={() => setActiveMode("itc_paradox")}
        >
          2. The 5% vs 18% ITC Paradox Auditor
        </button>
      </div>

      {activeMode === "splitter" ? (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Establishment Category</label>
              <select
                className={styles.selectInput}
                value={establishmentType}
                onChange={(e) => setEstablishmentType(e.target.value as EstablishmentType)}
              >
                <option value="standalone">Standalone Restaurant / Cafe / Cloud Kitchen (5% GST, No ITC)</option>
                <option value="hotel_specified">Hotel Restaurant with Rooms &gt; ₹7,500/night (18% GST, With ITC)</option>
                <option value="composition">Composition Scheme Dealer (Bill of Supply, No Tax Charged to Diner)</option>
              </select>
              <span className={styles.inputHint}>
                Notification 05/2025: 18% applies only if hotel has rooms with transaction value &gt; ₹7,500/night.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Food &amp; Soft Beverage Items</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(foodAmount)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={100}
                max={5000}
                step={50}
                value={foodAmount}
                onChange={(e) => setFoodAmount(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Prepared food, mocktails, coffee, desserts (SAC 996331).</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Alcoholic Beverages (Beer, Wine, Spirits)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(alcoholAmount)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={5000}
                step={50}
                value={alcoholAmount}
                onChange={(e) => setAlcoholAmount(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Alcohol sits outside GST and is taxed under State Excise VAT.</span>
            </div>

            {alcoholAmount > 0 && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>State for Liquor VAT Rate</label>
                <select
                  className={styles.selectInput}
                  value={stateVatRate}
                  onChange={(e) => setStateVatRate(Number(e.target.value))}
                >
                  <option value={18.5}>Karnataka (18.5% VAT)</option>
                  <option value={20.0}>Maharashtra (20.0% VAT)</option>
                  <option value={25.0}>Delhi (25.0% VAT)</option>
                  <option value={35.0}>Telangana (35.0% VAT)</option>
                  <option value={22.0}>Goa (22.0% VAT)</option>
                  <option value={30.0}>West Bengal (30.0% VAT)</option>
                  <option value={15.0}>Custom State Rate (15.0% VAT)</option>
                </select>
                <span className={styles.inputHint}>State VAT rates vary between 18% and 35% across India.</span>
              </div>
            )}

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Service Charge Rate</label>
              <select
                className={styles.selectInput}
                value={serviceChargePercent}
                onChange={(e) => setServiceChargePercent(Number(e.target.value))}
              >
                <option value={0}>0% (No Service Charge)</option>
                <option value={5}>5% (Discretionary Service Charge)</option>
                <option value={7.5}>7.5% (Discretionary Service Charge)</option>
                <option value={10}>10% (Discretionary Service Charge)</option>
              </select>
              <span className={styles.inputHint}>
                Service charge attracts GST as part of taxable service under Section 15 of CGST Act.
              </span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Packaging / Container Charge</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(packagingCharge)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={200}
                step={10}
                value={packagingCharge}
                onChange={(e) => setPackagingCharge(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Takeaway parcel containers attract the same GST rate as the food.</span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>Sample GST Tax Invoice (Illustrative)</div>
              <span className={`${styles.statusBadge} ${styles.badgeConditional}`}>
                Effective Tax: {effectiveTaxRate}%
              </span>
            </div>

            <div className={styles.billReceipt}>
              <div className={styles.billHeader}>
                <div className={styles.billRestaurantName}>Your Restaurant (Sample)</div>
                <div className={styles.billGstin}>GSTIN: SAMPLE-GSTIN | SAC: 996331</div>
                <div className={styles.billGstin}>SAMPLE TAX INVOICE #0001</div>
              </div>

              <div className={styles.billItemRow}>
                <span>Prepared Food &amp; Beverages:</span>
                <span>{formatCurrency(foodAmount)}</span>
              </div>
              {packagingCharge > 0 && (
                <div className={styles.billItemRow}>
                  <span>Container / Packaging Charge:</span>
                  <span>{formatCurrency(packagingCharge)}</span>
                </div>
              )}
              {alcoholAmount > 0 && (
                <div className={styles.billItemRow}>
                  <span>Alcoholic Beverages (Bar):</span>
                  <span>{formatCurrency(alcoholAmount)}</span>
                </div>
              )}
              {totalServiceCharge > 0 && (
                <div className={styles.billItemRow}>
                  <span>Service Charge ({serviceChargePercent}%):</span>
                  <span>{formatCurrency(totalServiceCharge)}</span>
                </div>
              )}

              <div className={styles.billDivider} />

              <div className={styles.billSubtotalRow}>
                <span>Taxable Subtotal:</span>
                <span>{formatCurrency(preTaxSubtotal)}</span>
              </div>

              {establishmentType === "composition" ? (
                <div className={styles.billTaxRow}>
                  <span>Composition Dealer (No tax collected):</span>
                  <span>₹0</span>
                </div>
              ) : (
                <>
                  <div className={styles.billTaxRow}>
                    <span>CGST ({cgstRate * 100}% on food):</span>
                    <span>{formatCurrency(cgstAmount)}</span>
                  </div>
                  <div className={styles.billTaxRow}>
                    <span>SGST ({sgstRate * 100}% on food):</span>
                    <span>{formatCurrency(sgstAmount)}</span>
                  </div>
                </>
              )}

              {alcoholAmount > 0 && (
                <div className={styles.billTaxRow}>
                  <span>State Liquor VAT ({stateVatRate}% on bar):</span>
                  <span>{formatCurrency(liquorVatAmount)}</span>
                </div>
              )}

              <div className={styles.billTotalRow}>
                <span>GRAND TOTAL:</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>

              <div className={styles.billNote}>
                {establishmentType === "composition" ? (
                  "Composition Taxable Person. Not eligible to collect tax on supplies."
                ) : (
                  <>
                    Total Taxes Collected: {formatCurrency(totalTaxes)} (Food GST: {formatCurrency(totalFoodGst)} | Liquor VAT: {formatCurrency(liquorVatAmount)})
                  </>
                )}
              </div>
            </div>

            <div className={styles.gstrMapBox}>
              <div className={styles.gstrTitle}>Statutory Remittance Split:</div>
              <p className={styles.gstrNote}>
                <strong>Central Govt (CGST):</strong> {formatCurrency(cgstAmount)} deposited in GSTR-3B Table 3.1(a).
                <br />
                <strong>State Govt (SGST):</strong> {formatCurrency(sgstAmount)} deposited in GSTR-3B Table 3.1(a).
                <br />
                <strong>State Commercial Taxes (VAT):</strong> {formatCurrency(liquorVatAmount)} deposited under separate State Excise/VAT Return.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.calcLayout}>
          <div className={styles.inputsPanel}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Food Gross Revenue</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlyRevenue)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={200000}
                max={3000000}
                step={50000}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Total dine-in, takeaway, and delivery food billing.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Commercial Rent (18% GST)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlyRent)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={25000}
                max={500000}
                step={25000}
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Commercial landlords charge 18% GST on lease agreements.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Monthly Aggregator Commissions (18% GST)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlyCommission)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={0}
                max={600000}
                step={25000}
                value={monthlyCommission}
                onChange={(e) => setMonthlyCommission(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Zomato and Swiggy levy 18% GST on all commission invoices.</span>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabelRow}>
                <span className={styles.inputLabel}>Capex, Equipment &amp; Packaging (18% GST)</span>
                <span className={styles.inputValueDisplay}>{formatCurrency(monthlyOtherExpenses)}</span>
              </div>
              <input
                type="range"
                className={styles.sliderInput}
                min={10000}
                max={300000}
                step={10000}
                value={monthlyOtherExpenses}
                onChange={(e) => setMonthlyOtherExpenses(Number(e.target.value))}
              />
              <span className={styles.inputHint}>Kitchen appliances, POS hardware, marketing, and packaging.</span>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsTitle}>The &ldquo;Blocked ITC Squeeze&rdquo; Analysis</div>
              <span className={`${styles.statusBadge} ${styles.badgeRequired}`}>
                Estimated Annual Blocked ITC: {formatCurrency(totalBlockedItcAnnual)}
              </span>
            </div>

            <div className={styles.resultsList}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>18% GST on Commercial Rent:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(gstOnRent)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>18% GST on Aggregator Commission:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(gstOnCommission)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>18% GST on Capex &amp; Packaging:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(gstOnOther)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Total Non-Creditable Cash Loss:</span>
                <span className={styles.resultValueDanger}>{formatCurrency(totalBlockedItcMonthly)} / mo</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Realized Revenue After Blocked Tax:</span>
                <span className={styles.resultValue}>{formatCurrency(netRetained5)} / mo</span>
              </div>
            </div>

            <div className={styles.gstrMapBox}>
              <div className={styles.gstrTitle}>The Financial Reality of 5% vs 18%:</div>
              <p className={styles.gstrNote}>
                On these inputs, the 5% regime costs you an estimated <strong>{formatCurrency(totalBlockedItcMonthly)} every month</strong> in
                blocked credits. A standalone restaurant cannot opt into 18%, and at the same menu prices an 18% rate would
                make the guest&apos;s bill about 12.4% higher anyway. The lever you control is the expense itself: for example,
                orders placed from your own tables through a <strong>0% commission menu (KNOMI)</strong> carry no commission GST.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
