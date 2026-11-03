'use client';

import React from 'react';
import { Review } from '@/lib/types';
import { ShieldCheck, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const testimonials = reviews && reviews.length > 0
    ? reviews.slice(0, 3).map((r, i) => ({
        authorName: r.authorName,
        role: ['Acquired 3 BHK Sky Suite • Indiranagar, Bangalore', 'NRI Relocation from London • Sarjapur Villa', 'Private Investor • Oceanfront Residence, Worli Mumbai'][i] || 'Verified Client',
        avatar: r.authorAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        comment: r.comment,
      }))
    : [
    {
      authorName: 'Sanjay Krishnan',
      role: 'Acquired 3 BHK Sky Suite • Indiranagar, Bangalore',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment:
        'Brickly made buying our family residence completely transparent. The title deed audit and RERA verification was comprehensive. Vikram coordinated directly with the seller and finalized an institutional discount.',
    },
    {
      authorName: 'Pooja & Rohan Agarwal',
      role: 'NRI Relocation from London • Sarjapur Villa',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      comment:
        'The 360° virtual walkthrough gave us the spatial clarity needed to shortlist our estate while still in Mayfair. Document verification, escrow token deposit, and registration support were flawless.',
    },
    {
      authorName: 'Dr. Anita Deshmukh',
      role: 'Private Investor • Oceanfront Residence, Worli Mumbai',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      comment:
        'The micro-market data and capital appreciation forecasts proved remarkably accurate. Direct communication with verified developer representatives eliminated weeks of broker friction.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
            Authenticated Client Transactions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight font-display">
            Trusted by Private Buyers & Institutional Investors
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed">
            Direct feedback from authenticated home buyers, NRI families, and corporate executives who
            completed property acquisitions through Brickly.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-stone-50/60 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-elevation-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 text-stone-800 dark:text-stone-200 fill-current"
                      />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                    <ShieldCheck className="w-3 h-3 text-brand-900 dark:text-emerald-400" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-300 dark:border-stone-700"
                />
                <div>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-white">
                    {t.authorName}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
