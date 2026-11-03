'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  RotateCw,
  Scale,
  TrendingUp,
  ArrowRight,
  Check,
} from 'lucide-react';

export function EcosystemFeatures() {
  const pillars = [
    {
      label: 'Regulatory Clearance',
      title: 'Institutional RERA Due Diligence',
      description:
        'Every listed property undergoes automated RERA registry verification, Encumbrance Certificate (EC) validation, and legal title deed audits before publication.',
      icon: ShieldCheck,
      actionText: 'Explore Verification Standards',
      actionHref: '/search?reraVerified=true',
      points: ['RERA status tracking', 'Automated title risk score', 'Verified developer records'],
    },
    {
      label: 'Spatial Technology',
      title: 'High-Fidelity 3D Virtual Tours',
      description:
        'Inspect architectural finishes, true room dimensions, and ceiling clearances from anywhere in the world before scheduling an on-site visit.',
      icon: RotateCw,
      actionText: 'Launch Spatial Preview',
      actionHref: '#virtual-tour-spotlight',
      points: ['Panoramic multi-room views', 'Accurate architectural scale', 'Natural light orientation'],
    },
    {
      label: 'Market Analytics',
      title: 'Micro-Market Price Comps',
      description:
        'Access institutional-grade capital appreciation analytics, historical transaction comps, and state-level stamp duty schedules for informed decision making.',
      icon: TrendingUp,
      actionText: 'View Micro-Markets',
      actionHref: '/neighborhoods',
      points: ['Quarterly YoY price indices', 'Transit & livability ratings', 'Amortisation schedules'],
    },
    {
      label: 'Transaction Security',
      title: 'Direct Negotiation & Token Escrow',
      description:
        'Bypass unverified intermediaries. Submit formal counter-bids, negotiate directly with verified owners or builders, and secure residences with digital token receipts.',
      icon: Scale,
      actionText: 'Compare Properties',
      actionHref: '/compare',
      points: ['Direct owner/builder messaging', 'Transparent counter-offers', 'Side-by-side estate comparison'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-50/60 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
            The Brickly Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight font-display">
            Built for Transparency, Due Diligence, and Precision.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
            Eliminating opaque markups and unverified inventory. We provide institutional legal frameworks,
            spatial walkthroughs, and verified transaction transparency.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-elevation-subtle hover:shadow-elevation-card transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white flex items-center justify-center mb-5 border border-stone-200 dark:border-stone-700">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                    {item.label}
                  </span>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-stone-600 dark:text-stone-400">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-brand-900 dark:text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                  <Link
                    href={item.actionHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-white hover:underline transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
