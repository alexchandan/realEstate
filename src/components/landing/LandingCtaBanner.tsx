'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

export function LandingCtaBanner() {
  return (
    <section className="py-16 md:py-24 bg-stone-50/50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand-900 dark:bg-stone-900 p-8 sm:p-12 lg:p-16 text-white border border-brand-800 dark:border-stone-800 shadow-elevation-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-200 dark:text-stone-400 block">
                Private Advisory & Transactions
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display">
                Ready to Acquire or Market a Landmark Estate?
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed font-normal">
                Whether you're acquiring a family penthouse in Indiranagar, shortlisting luxury villas in Sarjapur,
                or marketing an institutional development, our licensed advisory team ensures comprehensive legal due diligence.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>100% RERA & Title Due Diligence</span>
                </span>
                <span>•</span>
                <span>Institutional Escrow & Token Protection</span>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/search"
                className="px-6 py-3.5 rounded-lg bg-white text-stone-950 hover:bg-stone-100 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Browse Verified Estates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/create-listing"
                className="px-6 py-3.5 rounded-lg bg-brand-950/80 dark:bg-stone-800 hover:bg-brand-950 dark:hover:bg-stone-750 text-white font-bold text-xs sm:text-sm border border-brand-700/60 dark:border-stone-700 transition-colors flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>List a Property with Brickly</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
