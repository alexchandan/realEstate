'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import { PropertyListing } from '@/lib/types';
import {
  Search,
  ArrowRight,
  MapPin,
  Building2,
  ShieldCheck,
  RotateCw,
  Bed,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';

interface HeroSectionProps {
  spotlightProperties: PropertyListing[];
  onSelectProperty?: (listing: PropertyListing) => void;
}

export function HeroSection({ spotlightProperties }: HeroSectionProps) {
  const router = useRouter();
  const { formatPrice, formatPropertyArea } = useCurrency();

  // Search state
  const [purposeTab, setPurposeTab] = useState<'sale' | 'rent' | 'all'>('sale');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('');
  const [naturalQuery, setNaturalQuery] = useState('');

  // Spotlight active index
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const currentSpotlight = spotlightProperties[activeSpotlightIdx] || spotlightProperties[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (naturalQuery.trim()) {
      params.set('searchTerm', naturalQuery.trim());
    }
    if (purposeTab !== 'all') {
      params.set('purpose', purposeTab);
    }
    if (selectedCity) {
      params.set('city', selectedCity);
    }
    if (selectedType) {
      params.set('propertyType', selectedType);
    }
    if (selectedBhk) {
      params.set('bhk', selectedBhk);
    }
    if (selectedBudget) {
      if (selectedBudget === 'under-1.5cr') params.set('maxPrice', '15000000');
      else if (selectedBudget === '1.5cr-3cr') {
        params.set('minPrice', '15000000');
        params.set('maxPrice', '30000000');
      } else if (selectedBudget === '3cr-5cr') {
        params.set('minPrice', '30000000');
        params.set('maxPrice', '50000000');
      } else if (selectedBudget === 'above-5cr') {
        params.set('minPrice', '50000000');
      }
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleQuickPillClick = (query: string, city?: string) => {
    setNaturalQuery(query);
    if (city) setSelectedCity(city);
  };

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-stone-200 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Unified Architectural Search Hub */}
          <div className="lg:col-span-7 space-y-6">
            {/* Minimalist Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-900 dark:text-emerald-400" />
              <span>Institutional RERA Due Diligence • 4,800+ Verified Prime Estates</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-white leading-[1.1] font-display">
                Curated Luxury Real Estate Across India's Premier Metros.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-normal">
                Discover authenticated penthouses, contemporary villas, and prime developments.
                Backed by title verification, photorealistic 3D virtual tours, and direct negotiation transparency.
              </p>
            </div>

            {/* Unified Architectural Search Filter Container */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-elevation-card">
              {/* Purpose Switcher Tabs */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setPurposeTab('sale')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    purposeTab === 'sale'
                      ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Buy Residences
                </button>
                <button
                  type="button"
                  onClick={() => setPurposeTab('rent')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    purposeTab === 'rent'
                      ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Lease Luxury
                </button>
                <Link
                  href="/builder-projects"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>Developments</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setPurposeTab('all')}
                  className={`hidden sm:block px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    purposeTab === 'all'
                      ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  All Inventory
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="space-y-3">
                {/* Search Input Bar */}
                <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700/80 focus-within:border-stone-400 dark:focus-within:border-stone-600 transition-colors">
                  <div className="pl-2 sm:pl-3 text-stone-400 shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={naturalQuery}
                    onChange={(e) => setNaturalQuery(e.target.value)}
                    placeholder="Search by neighborhood, developer, or keyword (e.g. 3 BHK Indiranagar near Metro)..."
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs sm:text-sm font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Segmented Selector Filters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {/* City Select */}
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full appearance-none px-3 py-2 sm:py-2.5 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 focus:outline-none focus:border-stone-400 cursor-pointer"
                    >
                      <option value="">All Metros</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Gurgaon">Gurgaon (NCR)</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                    </select>
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Property Type Select */}
                  <div className="relative">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full appearance-none px-3 py-2 sm:py-2.5 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 focus:outline-none focus:border-stone-400 cursor-pointer"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Sky Apartment</option>
                      <option value="villa">Luxury Villa</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="duplex">Duplex Estate</option>
                    </select>
                    <Building2 className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Budget Select */}
                  <div className="relative">
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full appearance-none px-3 py-2 sm:py-2.5 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 focus:outline-none focus:border-stone-400 cursor-pointer"
                    >
                      <option value="">Any Budget</option>
                      <option value="under-1.5cr">Under ₹1.5 Cr</option>
                      <option value="1.5cr-3cr">₹1.5 Cr - ₹3 Cr</option>
                      <option value="3cr-5cr">₹3 Cr - ₹5 Cr</option>
                      <option value="above-5cr">₹5 Cr+ (Ultra)</option>
                    </select>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* BHK Select */}
                  <div className="relative">
                    <select
                      value={selectedBhk}
                      onChange={(e) => setSelectedBhk(e.target.value)}
                      className="w-full appearance-none px-3 py-2 sm:py-2.5 rounded-lg bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 focus:outline-none focus:border-stone-400 cursor-pointer"
                    >
                      <option value="">Any BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5+ BHK">5+ BHK Estate</option>
                    </select>
                    <Bed className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Minimalist Locality Quick Links */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-400">Popular Corridors:</span>
                  <button
                    type="button"
                    onClick={() => handleQuickPillClick('Indiranagar 3 BHK', 'Bangalore')}
                    className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    Indiranagar, BLR
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPillClick('Sarjapur Luxury Villa', 'Bangalore')}
                    className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    Sarjapur, BLR
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPillClick('Worli Oceanfront', 'Mumbai')}
                    className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    Worli, MUM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPillClick('Golf Course Extension', 'Gurgaon')}
                    className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    Golf Course Rd, GGN
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Editorial Property Showcase Monograph */}
          <div className="lg:col-span-5">
            {currentSpotlight && (
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-elevation-card hover:shadow-elevation-hover transition-all duration-300">
                {/* Media Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src={currentSpotlight.media.coverImage || currentSpotlight.media.imageUrls[0]}
                    alt={currentSpotlight.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

                  {/* Top Status Tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      Featured Monograph
                    </span>

                    {currentSpotlight.indiaDetails.reraStatus === 'verified' && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/95 text-stone-900 text-[10px] font-bold backdrop-blur-md shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-brand-900" />
                        <span>RERA Verified</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Price in Cover */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight font-display">
                      {formatPrice(currentSpotlight.price)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-300 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-300" />
                        <span>
                          {currentSpotlight.location.locality}, {currentSpotlight.location.city}
                        </span>
                      </span>
                      <span>•</span>
                      <span>{currentSpotlight.indiaDetails.bhk}</span>
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 dark:text-white line-clamp-1">
                      {currentSpotlight.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                      {currentSpotlight.description}
                    </p>
                  </div>

                  {/* Specs Strip */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-100 dark:border-stone-800 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                        Carpet Area
                      </span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">
                        {formatPropertyArea(currentSpotlight.indiaDetails.carpetAreaSqFt)}
                      </span>
                    </div>
                    <div className="border-x border-stone-200 dark:border-stone-700">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                        Status
                      </span>
                      <span className="font-bold text-stone-800 dark:text-stone-200 capitalize">
                        {currentSpotlight.constructionStatus.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                        Facing
                      </span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">
                        {currentSpotlight.indiaDetails.vastuFacing}
                      </span>
                    </div>
                  </div>

                  {/* Switcher & View Details CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {spotlightProperties.slice(0, 4).map((prop, idx) => (
                        <button
                          key={prop.id}
                          type="button"
                          onClick={() => setActiveSpotlightIdx(idx)}
                          aria-label={`Preview ${prop.title}`}
                          className={`w-9 h-9 rounded-lg overflow-hidden border transition-all ${
                            idx === activeSpotlightIdx
                              ? 'border-stone-900 dark:border-white scale-105 shadow-sm'
                              : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={prop.media.coverImage || prop.media.imageUrls[0]}
                            alt={prop.title}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <Link
                      href={`/listing/${currentSpotlight.id}`}
                      className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors flex items-center gap-1.5"
                    >
                      <span>View Residence</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
