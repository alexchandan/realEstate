'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { Calculator, ArrowRight, ChevronRight } from 'lucide-react';

export function MortgageCalculatorPreview() {
  const { formatPrice } = useCurrency();

  const [loanAmount, setLoanAmount] = useState(15000000); // 1.5 Cr
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const { monthlyEmi, totalInterest, totalPayable, principalPercent, interestPercent } =
    useMemo(() => {
      const r = interestRate / 12 / 100;
      const n = tenureYears * 12;
      const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const payable = emi * n;
      const interest = payable - loanAmount;

      const princPct = Math.round((loanAmount / payable) * 100);
      const intPct = 100 - princPct;

      return {
        monthlyEmi: emi,
        totalInterest: interest,
        totalPayable: payable,
        principalPercent: princPct,
        interestPercent: intPct,
      };
    }, [loanAmount, interestRate, tenureYears]);

  const presets = [
    { label: 'Starter Home', amount: 7500000 },
    { label: 'Prime Residence', amount: 15000000 },
    { label: 'Sky Penthouse', amount: 35000000 },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-50/50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-10 lg:p-12 shadow-elevation-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Context & Presets */}
            <div className="lg:col-span-6 space-y-5">
              <div className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                Financial Modeling
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 dark:text-white font-display leading-tight">
                Simulate Amortisation & Borrowing Capacity
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                Structured financial analysis before executing an offer. Model principal amortization schedules,
                interest obligations, and state-level statutory stamp duty liabilities.
              </p>

              {/* Quick Presets */}
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Standard Loan Amounts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLoanAmount(preset.amount)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        loanAmount === preset.amount
                          ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      {preset.label} ({formatPrice(preset.amount)})
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <Link
                  href="/calculators?tab=emi"
                  className="px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Complete Amortisation Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/calculators?tab=stamp-duty"
                  className="px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Stamp Duty by State
                </Link>

                <Link
                  href="/calculators?tab=affordability"
                  className="px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Affordability Estimator
                </Link>
              </div>
            </div>

            {/* Right Column: Clean Financial Sliders & Results */}
            <div className="lg:col-span-6 p-6 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-5">
              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-stone-500">Principal Borrowing:</span>
                    <span className="font-bold text-stone-900 dark:text-white font-mono">
                      {formatPrice(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={100000000}
                    step={500000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-stone-900 dark:accent-white cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-stone-500">Benchmark Interest Rate:</span>
                    <span className="font-bold text-stone-900 dark:text-white font-mono">
                      {interestRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={6.5}
                    max={14}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-stone-900 dark:accent-white cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-stone-500">Loan Tenure:</span>
                    <span className="font-bold text-stone-900 dark:text-white font-mono">
                      {tenureYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-stone-900 dark:accent-white cursor-pointer"
                  />
                </div>
              </div>

              {/* Dual-Tone Breakdown Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-stone-500 mb-1.5">
                  <span>Principal ({principalPercent}%)</span>
                  <span>Interest ({interestPercent}%)</span>
                </div>
                <div className="h-2.5 w-full rounded bg-stone-200 dark:bg-stone-700 overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercent}%` }}
                    className="bg-brand-900 dark:bg-emerald-500 transition-all duration-300"
                  />
                  <div
                    style={{ width: `${interestPercent}%` }}
                    className="bg-stone-400 dark:bg-stone-550 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Result Summary */}
              <div className="p-4 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-bold">
                      Estimated Monthly Outlay
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-display">
                      {formatPrice(monthlyEmi)}
                      <span className="text-xs font-normal text-stone-400">/mo</span>
                    </span>
                  </div>

                  <Link
                    href={`/search?maxPrice=${Math.round(loanAmount * 1.25)}`}
                    className="px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1 self-start sm:self-center"
                  >
                    <span>Homes In Budget</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Total Interest:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-200">
                      {formatPrice(totalInterest)}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Total Amortisation:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-200">
                      {formatPrice(totalPayable)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
