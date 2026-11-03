'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PropertyListing } from '@/lib/types';
import { ListingCard } from '@/components/ListingCard';
import { ArrowRight } from 'lucide-react';

interface CuratedPropertiesSectionProps {
  allProperties: PropertyListing[];
  onShareListing: (listing: PropertyListing) => void;
}

type TabKey = 'all' | 'penthouses' | 'villas' | 'ready' | 'rent';

export function CuratedPropertiesSection({
  allProperties,
  onShareListing,
}: CuratedPropertiesSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All Curated' },
    { key: 'penthouses', label: 'Penthouses & Sky Suites' },
    { key: 'villas', label: 'Contemporary Villas' },
    { key: 'ready', label: 'Ready for Possession' },
    { key: 'rent', label: 'Prime Leasehold' },
  ];

  const filteredProperties = useMemo(() => {
    switch (activeTab) {
      case 'penthouses':
        return allProperties.filter(
          (p) => p.propertyType === 'penthouse' || (p.floor && p.floor >= 15)
        );
      case 'villas':
        return allProperties.filter((p) => p.propertyType === 'villa');
      case 'ready':
        return allProperties.filter((p) => p.constructionStatus === 'ready-to-move');
      case 'rent':
        return allProperties.filter((p) => p.purpose === 'rent');
      case 'all':
      default:
        return allProperties.filter((p) => p.isFeatured || p.isPromoted);
    }
  }, [allProperties, activeTab]);

  const viewAllUrl = useMemo(() => {
    switch (activeTab) {
      case 'penthouses':
        return '/search?propertyType=penthouse';
      case 'villas':
        return '/search?propertyType=villa';
      case 'ready':
        return '/search?constructionStatus=ready-to-move';
      case 'rent':
        return '/search?purpose=rent';
      default:
        return '/search';
    }
  }, [activeTab]);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
              Curated Residences
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight font-display">
              Verified Luxury Portfolios
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl leading-relaxed">
              Handpicked residences verified for clear title documentation, architectural standards, and high
              capital appreciation potential.
            </p>
          </div>

          <Link
            href={viewAllUrl}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-white hover:underline shrink-0"
          >
            <span>View All in Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Minimalist Typographic Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-stone-200 dark:border-stone-800 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onShare={(l) => onShareListing(l)}
            />
          ))}
        </div>

        {/* Catalog Link */}
        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-white text-stone-900 dark:text-white text-xs font-bold transition-colors"
          >
            <span>Explore All 4,800+ Verified Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
