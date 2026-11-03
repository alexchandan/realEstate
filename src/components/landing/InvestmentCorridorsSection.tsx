'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Map } from 'lucide-react';

export function InvestmentCorridorsSection() {
  const corridors = [
    {
      city: 'Bangalore',
      locality: 'Indiranagar & Whitefield',
      rate: '₹12,800/sqft',
      appreciation: '+9.4% YoY',
      livability: '9.3/10',
      tag: 'Silicon Corridor',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      city: 'Mumbai',
      locality: 'Worli & Bandra West',
      rate: '₹42,500/sqft',
      appreciation: '+8.1% YoY',
      livability: '9.6/10',
      tag: 'Oceanfront Luxury',
      image:
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    },
    {
      city: 'Gurgaon',
      locality: 'Golf Course Extension',
      rate: '₹15,200/sqft',
      appreciation: '+12.6% YoY',
      livability: '9.1/10',
      tag: 'Financial Node',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      city: 'Hyderabad',
      locality: 'Gachibowli & Financial Dist',
      rate: '₹11,400/sqft',
      appreciation: '+11.2% YoY',
      livability: '9.2/10',
      tag: 'Tech Growth Zone',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-50/50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
              Micro-Market Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight font-display">
              Prime Investment Corridors
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl leading-relaxed">
              Quarterly capital appreciation benchmarking, livability scores, and transit proximity across India's
              highest-demand metropolitan micro-markets.
            </p>
          </div>

          <Link
            href="/neighborhoods"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-white hover:underline shrink-0"
          >
            <span>Explore All 25+ Micro-Markets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Corridors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corridors.map((spot, i) => (
            <Link
              key={i}
              href={`/search?city=${spot.city}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] border border-stone-200 dark:border-stone-800 shadow-elevation-subtle hover:shadow-elevation-hover transition-all duration-300 flex flex-col justify-end"
            >
              <img
                src={spot.image}
                alt={spot.city}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              {/* Top Tags */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-stone-900 shadow-sm">
                  {spot.city}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-stone-200 border border-white/10">
                  {spot.tag}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-5 text-white space-y-2">
                <h3 className="font-bold text-base font-display">
                  {spot.locality}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/20">
                  <div>
                    <span className="text-[10px] text-stone-300 block font-normal">Avg Rate</span>
                    <span className="font-bold">{spot.rate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-300 block font-normal">Appreciation</span>
                    <span className="font-bold text-emerald-400">{spot.appreciation}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-stone-300">
                  <span>Livability: {spot.livability}</span>
                  <span className="font-bold group-hover:underline flex items-center gap-0.5 text-white">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Map Explorer Callout Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-xl bg-stone-900 text-white border border-stone-800 shadow-elevation-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-white shrink-0">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display">Geospatial POI & Infrastructure Mapping</h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-0.5 font-normal">
                Inspect property clusters, metro proximity, school districts, and arterial highway access on our interactive map.
              </p>
            </div>
          </div>

          <Link
            href="/search"
            className="px-5 py-2.5 rounded-lg bg-white text-stone-950 font-bold text-xs sm:text-sm hover:bg-stone-200 transition-colors shrink-0"
          >
            Launch Interactive Map
          </Link>
        </div>
      </div>
    </section>
  );
}
