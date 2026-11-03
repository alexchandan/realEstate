'use client';

import React from 'react';
import { ShieldCheck, TrendingUp, Building2, Star } from 'lucide-react';

export function StatsRibbon() {
  const stats = [
    {
      value: '4,800+',
      label: 'Active Verified Listings',
      caption: '100% legal title clearance',
      icon: ShieldCheck,
    },
    {
      value: '₹2,400 Cr+',
      label: 'Transacted Volume',
      caption: 'Annual institutional completions',
      icon: TrendingUp,
    },
    {
      value: '100%',
      label: 'RERA Registered Inventory',
      caption: 'Zero unapproved developments',
      icon: Building2,
    },
    {
      value: '4.92 / 5',
      label: 'Verified Buyer Rating',
      caption: '1,200+ authenticated transactions',
      icon: Star,
    },
  ];

  return (
    <section className="border-b border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-stone-200 dark:lg:divide-stone-800">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col ${idx !== 0 ? 'lg:pl-8' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2 text-stone-400 dark:text-stone-500">
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-display tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {item.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
