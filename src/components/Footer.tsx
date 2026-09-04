'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Mail, Phone, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 pt-16 pb-24 md:pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-glow">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Brickly <span className="text-emerald-600 font-bold">AlexEstate</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The full-stack real estate discovery & transaction ecosystem. Powering intelligent property
              searches, verified RERA documentation, AI-assisted valuations, and transparent negotiations.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% RERA & Title Deed Verified Listings</span>
            </div>
          </div>

          {/* Column 2: Top Cities */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/search?city=Bangalore" className="hover:text-emerald-600 transition-colors">
                  Properties in Bangalore
                </Link>
              </li>
              <li>
                <Link href="/search?city=Mumbai" className="hover:text-emerald-600 transition-colors">
                  Luxury Flats in Mumbai
                </Link>
              </li>
              <li>
                <Link href="/search?city=Gurgaon" className="hover:text-emerald-600 transition-colors">
                  CyberCity & Gurgaon
                </Link>
              </li>
              <li>
                <Link href="/search?city=Hyderabad" className="hover:text-emerald-600 transition-colors">
                  Gachibowli, Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="text-emerald-600 font-semibold hover:underline">
                  View Neighborhood Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Calculators */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Financial Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/calculators?tab=emi" className="hover:text-emerald-600 transition-colors">
                  Home Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=affordability" className="hover:text-emerald-600 transition-colors">
                  Affordability Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=stamp-duty" className="hover:text-emerald-600 transition-colors">
                  State Stamp Duty Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=rent-vs-buy" className="hover:text-emerald-600 transition-colors">
                  Rent vs Buy Analyzer
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=roi" className="hover:text-emerald-600 transition-colors">
                  Rental Yield & ROI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & CRM */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/agent-crm" className="hover:text-emerald-600 transition-colors">
                  Agent CRM & Pipeline
                </Link>
              </li>
              <li>
                <Link href="/builder-projects" className="hover:text-emerald-600 transition-colors">
                  Builder Projects & Towers
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-600 transition-colors">
                  Seller & Property Mgmt
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-600 transition-colors">
                  Subscriptions & Pro Boosts
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-600 transition-colors">
                  Admin Moderation Queue
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            Disclaimer: All property descriptions, pricing estimates, carpet areas, and RERA registration
            numbers are compiled for informational and demonstration purposes. Always verify original title
            deeds, encumbrance certificates, and RERA government portals prior to concluding purchase contracts.
          </p>
          <div className="flex items-center gap-1 font-medium text-slate-500">
            <span>© {new Date().getFullYear()} Brickly AlexEstate. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
