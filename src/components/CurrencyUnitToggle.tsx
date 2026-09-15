'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, SupportedCurrency, SupportedUnit } from '@/context/CurrencyContext';
import { Globe, ChevronDown } from 'lucide-react';

export function CurrencyUnitToggle() {
  const { currency, unit, setCurrency, setUnit } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencies: { code: SupportedCurrency; label: string; symbol: string }[] = [
    { code: 'INR', label: 'Indian Rupee (₹)', symbol: '₹' },
    { code: 'USD', label: 'US Dollar ($)', symbol: '$' },
    { code: 'EUR', label: 'Euro (€)', symbol: '€' },
    { code: 'GBP', label: 'British Pound (£)', symbol: '£' },
    { code: 'AED', label: 'UAE Dirham (AED)', symbol: 'AED' },
  ];

  return (
    <div className="relative inline-block shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm shrink-0 min-h-[38px] whitespace-nowrap"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>{currency}</span>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="uppercase text-[11px] text-slate-500 dark:text-slate-400">{unit}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 animate-slide-up">
          <div className="px-2 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Currency
          </div>
          <div className="space-y-0.5">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currency === c.code
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{c.label}</span>
                <span className="font-mono text-xs">{c.symbol}</span>
              </button>
            ))}
          </div>

          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

          <div className="px-2 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Measurement Unit
          </div>
          <div className="grid grid-cols-2 gap-1 px-1">
            <button
              onClick={() => {
                setUnit('sqft');
                setIsOpen(false);
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium text-center transition-colors ${
                unit === 'sqft'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Sq. Ft
            </button>
            <button
              onClick={() => {
                setUnit('sqm');
                setIsOpen(false);
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium text-center transition-colors ${
                unit === 'sqm'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Sq. Metres
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
