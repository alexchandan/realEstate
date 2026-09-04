import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PropertyListing } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = 'INR',
  compact: boolean = true
): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '0';

  if (currency === 'INR') {
    if (compact) {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      }
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} L`;
      }
      if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)} K`;
      }
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const symbolMap: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AED: 'AED ',
  };

  const symbol = symbolMap[currency] || `${currency} `;
  if (compact && amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(2)}M`;
  }
  if (compact && amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}k`;
  }

  return `${symbol}${amount.toLocaleString()}`;
}

export function formatArea(areaSqFt: number, unit: 'sqft' | 'sqm' = 'sqft'): string {
  if (!areaSqFt) return '0 sq.ft';
  if (unit === 'sqm') {
    const sqm = Math.round(areaSqFt * 0.092903);
    return `${sqm.toLocaleString()} sq.m`;
  }
  return `${areaSqFt.toLocaleString()} sq.ft`;
}

export function calculateEMI(principal: number, annualInterestRatePercent: number, tenureYears: number) {
  const r = annualInterestRatePercent / 12 / 100;
  const n = tenureYears * 12;

  if (principal <= 0 || r <= 0 || n <= 0) {
    return { monthlyEMI: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
  }

  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyEMI = Math.round(emi);
  const totalPayment = Math.round(emi * n);
  const totalInterest = totalPayment - principal;

  // Yearly breakdown summary
  const schedule = [];
  let balance = principal;
  for (let year = 1; year <= Math.min(tenureYears, 10); year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      const interestForMonth = balance * r;
      const principalForMonth = emi - interestForMonth;
      yearlyInterest += interestForMonth;
      yearlyPrincipal += principalForMonth;
      balance = Math.max(0, balance - principalForMonth);
    }
    schedule.push({
      year,
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      remainingBalance: Math.round(balance),
    });
  }

  return {
    monthlyEMI,
    totalInterest,
    totalPayment,
    schedule,
  };
}

export function calculateAffordability(
  monthlyIncome: number,
  monthlyDebtEMIs: number,
  downPayment: number,
  annualInterestRate: number = 8.5,
  tenureYears: number = 20
) {
  // Safe debt-to-income ratio (DTI) is usually 45-50%
  const maxSafeMonthlyObligation = monthlyIncome * 0.45;
  const availableForHomeEMI = Math.max(0, maxSafeMonthlyObligation - monthlyDebtEMIs);

  const r = annualInterestRate / 12 / 100;
  const n = tenureYears * 12;
  // Principal = EMI * ( (1+r)^n - 1 ) / ( r * (1+r)^n )
  const maxLoan =
    availableForHomeEMI > 0
      ? (availableForHomeEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
      : 0;

  const maxPropertyBudget = Math.round(maxLoan + downPayment);

  return {
    maxBudget: maxPropertyBudget,
    maxLoan: Math.round(maxLoan),
    comfortableEMI: Math.round(availableForHomeEMI),
  };
}

export function calculateStampDuty(
  propertyPrice: number,
  state: string = 'Karnataka',
  buyerGender: 'male' | 'female' | 'joint' = 'male'
) {
  let stampDutyRate = 0.05; // 5% default
  let registrationFeeRate = 0.01; // 1% default

  switch (state.toLowerCase()) {
    case 'maharashtra':
      stampDutyRate = buyerGender === 'female' ? 0.05 : 0.06;
      registrationFeeRate = 0.01;
      break;
    case 'karnataka':
      stampDutyRate = propertyPrice > 4500000 ? 0.05 : 0.03;
      registrationFeeRate = 0.02;
      break;
    case 'delhi':
      stampDutyRate = buyerGender === 'female' ? 0.04 : buyerGender === 'joint' ? 0.05 : 0.06;
      registrationFeeRate = 0.01;
      break;
    case 'tamil nadu':
      stampDutyRate = 0.07;
      registrationFeeRate = 0.04;
      break;
    case 'telangana':
      stampDutyRate = 0.055;
      registrationFeeRate = 0.02;
      break;
    case 'haryana':
      stampDutyRate = buyerGender === 'female' ? 0.05 : 0.07;
      registrationFeeRate = 0.01;
      break;
    default:
      stampDutyRate = 0.05;
      registrationFeeRate = 0.01;
  }

  const stampDutyAmount = Math.round(propertyPrice * stampDutyRate);
  const registrationFee = Math.round(propertyPrice * registrationFeeRate);

  return {
    stampDutyRate: stampDutyRate * 100,
    stampDutyAmount,
    registrationFeeRate: registrationFeeRate * 100,
    registrationFee,
    totalGovtCharges: stampDutyAmount + registrationFee,
  };
}

export function calculateRentalYield(
  annualRent: number,
  propertyPrice: number,
  annualMaintenance: number = 0
) {
  if (!propertyPrice || propertyPrice <= 0) return { grossYield: 0, netYield: 0 };
  const grossYield = ((annualRent / propertyPrice) * 100).toFixed(2);
  const netIncome = Math.max(0, annualRent - annualMaintenance);
  const netYield = ((netIncome / propertyPrice) * 100).toFixed(2);
  return {
    grossYield: parseFloat(grossYield),
    netYield: parseFloat(netYield),
  };
}

export function assessFraudRisk(listing: Partial<PropertyListing>): {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];
} {
  let score = 5;
  const flags: string[] = [];

  // Suspiciously low price check
  if (listing.price && listing.indiaDetails?.carpetAreaSqFt) {
    const rate = listing.price / listing.indiaDetails.carpetAreaSqFt;
    if (listing.location?.city === 'Bangalore' && rate < 3000) {
      score += 35;
      flags.push('Unusually low price per sqft for locality');
    }
  }

  // Media check
  if (!listing.media?.imageUrls || listing.media.imageUrls.length < 2) {
    score += 25;
    flags.push('Insufficient property imagery provided');
  }

  // Seller verification
  if (listing.sellerType === 'owner' && !listing.indiaDetails?.reraNumber) {
    score += 10;
  }

  // Address specificity
  if (!listing.location?.locality || !listing.location?.pinCode) {
    score += 20;
    flags.push('Incomplete physical location details');
  }

  const riskLevel = score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low';
  return {
    riskScore: Math.min(score, 100),
    riskLevel,
    flags,
  };
}
