'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { formatCurrency, formatArea } from '@/lib/utils';

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
export type SupportedUnit = 'sqft' | 'sqm';

interface CurrencyContextType {
  currency: SupportedCurrency;
  unit: SupportedUnit;
  setCurrency: (currency: SupportedCurrency) => void;
  setUnit: (unit: SupportedUnit) => void;
  formatPrice: (priceInINR: number, compact?: boolean) => string;
  formatPropertyArea: (areaInSqFt: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates relative to INR (approximate baseline)
const RATES: Record<SupportedCurrency, number> = {
  INR: 1,
  USD: 0.0116,
  EUR: 0.0108,
  GBP: 0.0092,
  AED: 0.0426,
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('INR');
  const [unit, setUnitState] = useState<SupportedUnit>('sqft');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('brickly-currency') as SupportedCurrency | null;
    const savedUnit = localStorage.getItem('brickly-unit') as SupportedUnit | null;
    if (savedCurrency && RATES[savedCurrency]) setCurrencyState(savedCurrency);
    if (savedUnit && ['sqft', 'sqm'].includes(savedUnit)) setUnitState(savedUnit);
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    localStorage.setItem('brickly-currency', c);
  };

  const setUnit = (u: SupportedUnit) => {
    setUnitState(u);
    localStorage.setItem('brickly-unit', u);
  };

  const formatPrice = (priceInINR: number, compact: boolean = true) => {
    const rate = RATES[currency] || 1;
    const convertedAmount = Math.round(priceInINR * rate);
    return formatCurrency(convertedAmount, currency, compact);
  };

  const formatPropertyArea = (areaInSqFt: number) => {
    return formatArea(areaInSqFt, unit);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        unit,
        setCurrency,
        setUnit,
        formatPrice,
        formatPropertyArea,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
}
