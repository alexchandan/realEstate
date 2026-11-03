'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950 pt-16 pb-20 md:pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Column 1: Brand & Regulatory Commitment */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center font-bold text-xs tracking-tight shadow-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-lg tracking-tight text-stone-900 dark:text-white font-display">
                  BRICKLY
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500">
                  ESTATES
                </span>
              </div>
            </Link>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              The premier ecosystem for luxury property discovery and acquisition. Facilitating RERA-verified
              due diligence, photorealistic 3D spatial tours, and transparent direct transactions.
            </p>

            <div className="pt-2 flex flex-col gap-1 text-[11px] text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-900 dark:text-emerald-400 shrink-0" />
                <span>RERA Compliant & Legal Due Diligence Verified</span>
              </div>
              <span className="text-[10px] text-stone-400">
                Institutional member of Real Estate Regulatory Standards Framework
              </span>
            </div>
          </div>

          {/* Column 2: Premier Metros */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-4">
              Premier Metros
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/search?city=Bangalore" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Bangalore Residences
                </Link>
              </li>
              <li>
                <Link href="/search?city=Mumbai" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Mumbai Oceanfront
                </Link>
              </li>
              <li>
                <Link href="/search?city=Gurgaon" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Gurgaon & NCR Corridors
                </Link>
              </li>
              <li>
                <Link href="/search?city=Hyderabad" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Hyderabad Financial District
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="text-stone-900 dark:text-white font-semibold hover:underline inline-block pt-1">
                  Micro-Market Intelligence →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Financial & Valuation Suite */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-4">
              Financial Suite
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/calculators?tab=emi" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Mortgage Amortisation
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=affordability" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Affordability Modeling
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=stamp-duty" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  State Stamp Duty Schedule
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=rent-vs-buy" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Rent vs. Buy Analysis
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=roi" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Net Capital Yield & ROI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-4">
              Client Advisory
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/builder-projects" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Institutional Developments
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Property Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/agent-crm" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Private Broker Portal
                </Link>
              </li>
              <li>
                <Link href="/create-listing" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  List Premier Property
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Broker & Developer Plans
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice & Copyright */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 dark:text-stone-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Brickly Estates Technologies India Pvt. Ltd.</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Equal Housing Opportunity</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </div>

          <div className="text-stone-400">
            Institutional RERA Compliance: PRM/KA/RERA/1251/310/PR/180516
          </div>
        </div>
      </div>
    </footer>
  );
}
