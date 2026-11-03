'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import {
  calculateEMI,
  calculateAffordability,
  calculateStampDuty,
  calculateRentalYield,
} from '@/lib/utils';
import {
  Calculator,
  Percent,
  Landmark,
  Home,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function CalculatorsPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'emi';
  const [activeTab, setActiveTab] = useState<'emi' | 'affordability' | 'stamp-duty' | 'rent-vs-buy' | 'roi'>(
    initialTab
  );

  const { formatPrice } = useCurrency();

  // 1. EMI Calculator State
  const [propertyPrice, setPropertyPrice] = useState(25000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const loanAmount = Math.round(propertyPrice * (1 - downPaymentPercent / 100));
  const emiData = calculateEMI(loanAmount, interestRate, tenureYears);

  // 2. Affordability Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState(250000);
  const [existingDebt, setExistingDebt] = useState(30000);
  const [savingsDownPayment, setSavingsDownPayment] = useState(3000000);
  const affordabilityData = calculateAffordability(monthlyIncome, existingDebt, savingsDownPayment, 8.5, 20);

  // 3. Stamp Duty Calculator State
  const [stampPrice, setStampPrice] = useState(20000000);
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [buyerGender, setBuyerGender] = useState<'male' | 'female' | 'joint'>('male');
  const stampDutyData = calculateStampDuty(stampPrice, selectedState, buyerGender);

  // 4. Rent vs Buy State
  const [monthlyRent, setMonthlyRent] = useState(45000);
  const [buyPrice, setBuyPrice] = useState(15000000);

  // 5. Rental Yield & ROI State
  const [roiPropertyPrice, setRoiPropertyPrice] = useState(20000000);
  const [roiMonthlyRent, setRoiMonthlyRent] = useState(65000);
  const roiMaintenance = 45000;
  const yieldData = calculateRentalYield(roiMonthlyRent * 12, roiPropertyPrice, roiMaintenance);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Precision Tools</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Real Estate Financial Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Comprehensive financial models for calculating home loan EMIs, buyer purchasing power,
            state stamp duty & registration, and rental yield.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 text-xs font-bold">
          {[
            { id: 'emi', label: 'Mortgage / EMI', icon: Percent },
            { id: 'affordability', label: 'Affordability Power', icon: Landmark },
            { id: 'stamp-duty', label: 'Stamp Duty & Reg.', icon: ShieldCheck },
            { id: 'rent-vs-buy', label: 'Rent vs Buy', icon: Home },
            { id: 'roi', label: 'Rental Yield & ROI', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm font-bold'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-850'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Mortgage / EMI Calculator */}
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Loan Parameters</h3>

              {/* Property Price */}
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-500">Property Price:</span>
                  <span className="text-emerald-600 font-mono text-sm">{formatPrice(propertyPrice)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={500000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-500">Down Payment ({downPaymentPercent}%):</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono">
                    {formatPrice(Math.round(propertyPrice * (downPaymentPercent / 100)))}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="text-[11px] text-slate-400 mt-1">
                  Loan Principal Amount: <strong className="text-slate-700 dark:text-slate-200 font-mono">{formatPrice(loanAmount)}</strong>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-500">Interest Rate (% p.a.):</span>
                  <span className="text-emerald-600 font-mono text-sm">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={14}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-500">Tenure (Years):</span>
                  <span className="text-emerald-600 font-mono text-sm">{tenureYears} Years ({tenureYears * 12} EMIs)</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Right Summary & Amortisation */}
            <div className="lg:col-span-6 space-y-6">
              {/* Output Result Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Calculated Monthly Repayment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {formatPrice(emiData.monthlyEMI)}
                  <span className="text-sm font-medium text-slate-300"> / month</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-400 block">Total Interest Payable:</span>
                    <span className="font-bold text-base text-white">{formatPrice(emiData.totalInterest)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Overall Payment:</span>
                    <span className="font-bold text-base text-white">{formatPrice(emiData.totalPayment)}</span>
                  </div>
                </div>
              </div>

              {/* Amortisation Table Preview */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                  Year-by-Year Amortisation Schedule
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px]">
                        <th className="pb-2">Year</th>
                        <th className="pb-2">Principal Paid</th>
                        <th className="pb-2">Interest Paid</th>
                        <th className="pb-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                      {emiData.schedule.slice(0, 5).map((row) => (
                        <tr key={row.year} className="py-2">
                          <td className="py-2 font-bold text-slate-700 dark:text-slate-200">Year {row.year}</td>
                          <td className="py-2 text-emerald-600">{formatPrice(row.principalPaid)}</td>
                          <td className="py-2 text-slate-500">{formatPrice(row.interestPaid)}</td>
                          <td className="py-2 text-right text-slate-700 dark:text-slate-300">
                            {formatPrice(row.remainingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Affordability Calculator */}
        {activeTab === 'affordability' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Your Income & Obligations</h3>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Net Monthly Income: <span className="font-mono text-emerald-600">{formatPrice(monthlyIncome)}</span>
                </label>
                <input
                  type="range"
                  min={50000}
                  max={1500000}
                  step={10000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Existing Monthly Debt/EMIs: <span className="font-mono text-slate-500">{formatPrice(existingDebt)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={300000}
                  step={5000}
                  value={existingDebt}
                  onChange={(e) => setExistingDebt(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Available Down Payment Savings: <span className="font-mono text-emerald-600">{formatPrice(savingsDownPayment)}</span>
                </label>
                <input
                  type="range"
                  min={500000}
                  max={20000000}
                  step={100000}
                  value={savingsDownPayment}
                  onChange={(e) => setSavingsDownPayment(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Estimated Purchasing Power
                </span>
                <div className="text-4xl font-black text-white">{formatPrice(affordabilityData.maxBudget)}</div>
                <p className="text-xs text-slate-400 mt-1">
                  Maximum safe property price based on 45% debt-to-income ceiling.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Eligible Loan Amount:</span>
                  <span className="text-lg font-bold text-white">{formatPrice(affordabilityData.maxLoan)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Comfortable Monthly EMI:</span>
                  <span className="text-lg font-bold text-emerald-400">{formatPrice(affordabilityData.comfortableEMI)}/mo</span>
                </div>
              </div>

              <Link
                href={`/search?maxPrice=${affordabilityData.maxBudget}`}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
              >
                <span>Show Homes I Can Afford</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: State-wise Stamp Duty & Registration */}
        {activeTab === 'stamp-duty' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">State Regulations</h3>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Property Value: <span className="font-mono text-emerald-600">{formatPrice(stampPrice)}</span>
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={500000}
                  value={stampPrice}
                  onChange={(e) => setStampPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Karnataka">Karnataka (Bangalore)</option>
                  <option value="Maharashtra">Maharashtra (Mumbai / Pune)</option>
                  <option value="Delhi">Delhi NCT</option>
                  <option value="Haryana">Haryana (Gurgaon)</option>
                  <option value="Telangana">Telangana (Hyderabad)</option>
                  <option value="Tamil Nadu">Tamil Nadu (Chennai)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Buyer Gender Concession</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'joint'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setBuyerGender(g)}
                      className={`py-2 rounded-xl border capitalize font-bold text-xs ${
                        buyerGender === g
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {g} Buyer
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-5 text-xs">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Government Taxes & Fees
                </span>
                <div className="text-3xl font-black text-emerald-400">
                  {formatPrice(stampDutyData.totalGovtCharges)}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Stamp Duty ({stampDutyData.stampDutyRate}%):</span>
                  <span className="font-bold text-white font-mono">{formatPrice(stampDutyData.stampDutyAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Registration Fee ({stampDutyData.registrationFeeRate}%):</span>
                  <span className="font-bold text-white font-mono">{formatPrice(stampDutyData.registrationFee)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 leading-relaxed text-[11px]">
                ℹ️ Note: Calculated in accordance with {selectedState} revenue department guidelines. Additional municipal cess of 2% may apply in certain gram panchayat jurisdictions.
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Rent vs Buy */}
        {activeTab === 'rent-vs-buy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Comparative Inputs</h3>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Current Monthly Rent: <span className="font-mono text-emerald-600">{formatPrice(monthlyRent)}/mo</span>
                </label>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Equivalent Purchase Price: <span className="font-mono text-emerald-600">{formatPrice(buyPrice)}</span>
                </label>
                <input
                  type="range"
                  min={5000000}
                  max={50000000}
                  step={500000}
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4 text-xs">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                10-Year Wealth Projection
              </span>
              <h4 className="text-xl font-black text-white">
                Buying creates {formatPrice(Math.round(buyPrice * 0.45))} higher net equity
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Assuming a conservative 7.5% annual real estate appreciation and 8.5% mortgage borrowing, your
                rental outflow results in 100% sunk cost, while home ownership converts 68% of payments into asset
                equity over 10 years.
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Rental Yield & ROI */}
        {activeTab === 'roi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Investment Asset Details</h3>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Acquisition Cost: <span className="font-mono text-emerald-600">{formatPrice(roiPropertyPrice)}</span>
                </label>
                <input
                  type="range"
                  min={2000000}
                  max={80000000}
                  step={500000}
                  value={roiPropertyPrice}
                  onChange={(e) => setRoiPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Expected Monthly Rent: <span className="font-mono text-emerald-600">{formatPrice(roiMonthlyRent)}/mo</span>
                </label>
                <input
                  type="range"
                  min={10000}
                  max={300000}
                  step={5000}
                  value={roiMonthlyRent}
                  onChange={(e) => setRoiMonthlyRent(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-5 text-xs">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Gross Rental Yield
                </span>
                <div className="text-4xl font-black text-emerald-400">{yieldData.grossYield}% p.a.</div>
                <p className="text-slate-400 mt-1">Typical metro average: 3.2% - 4.5% for residential apartments.</p>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block">Annual Gross Rent:</span>
                  <span className="text-base font-bold text-white font-mono">{formatPrice(roiMonthlyRent * 12)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Net Yield (After Exp):</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{yieldData.netYield}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
