'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListingCard } from '@/components/ListingCard';
import dynamic from 'next/dynamic';
import { ShareModal } from '@/components/ShareModal';
import { SEED_PROPERTIES } from '@/lib/seedData';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useNotifications } from '@/context/NotificationContext';
import { useToast } from '@/context/ToastContext';

const MapView = dynamic(() => import('@/components/MapView').then((mod) => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[400px] flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-3xl animate-pulse border border-slate-200 dark:border-slate-800">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-xs font-semibold text-slate-500">Loading Geospatial Map & POI Layers...</span>
    </div>
  ),
});
import {
  Search,
  SlidersHorizontal,
  Map,
  Grid,
  Sparkles,
  BookmarkPlus,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { addNotification } = useNotifications();
  const { showToast } = useToast();

  // URL state initialization
  const initialSearch = searchParams.get('searchTerm') || '';
  const initialCity = searchParams.get('city') || 'all';
  const initialPurpose = searchParams.get('purpose') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialBhk = searchParams.get('bhk') || 'all';
  const initialMaxPrice = Number(searchParams.get('maxPrice')) || 0;
  const initialSort = searchParams.get('sort') || 'recommended';

  // Filter states
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [propertyType, setPropertyType] = useState(initialType);
  const [selectedBhk, setSelectedBhk] = useState(initialBhk);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || 100000000);
  const [readyToMoveOnly, setReadyToMoveOnly] = useState(false);
  const [reraVerifiedOnly, setReraVerifiedOnly] = useState(false);
  const [parkingOnly, setParkingOnly] = useState(false);
  const [sortOption, setSortOption] = useState(initialSort);

  // View modes: 'split' | 'grid' | 'map'
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | undefined>();
  const [shareListing, setShareListing] = useState<PropertyListing | null>(null);

  // AI Natural Language Query Parser State
  const [extractedAiChips, setExtractedAiChips] = useState<string[]>([]);

  // Parse natural language queries into explainable chips
  useEffect(() => {
    if (!searchTerm) {
      setExtractedAiChips([]);
      return;
    }
    const chips: string[] = [];
    const lower = searchTerm.toLowerCase();

    if (lower.includes('3 bhk')) chips.push('BHK: 3 BHK');
    else if (lower.includes('2 bhk')) chips.push('BHK: 2 BHK');
    else if (lower.includes('4 bhk')) chips.push('BHK: 4 BHK');

    if (lower.includes('bangalore')) chips.push('Location: Bangalore');
    if (lower.includes('mumbai')) chips.push('Location: Mumbai');
    if (lower.includes('gurgaon')) chips.push('Location: Gurgaon');
    if (lower.includes('hyderabad')) chips.push('Location: Hyderabad');

    if (lower.includes('pool')) chips.push('Amenity: Swimming Pool');
    if (lower.includes('gym')) chips.push('Amenity: Gym');
    if (lower.includes('metro')) chips.push('Transit: Near Metro');
    if (lower.includes('villa')) chips.push('Type: Villa');
    if (lower.includes('rent')) chips.push('Purpose: Rent');

    setExtractedAiChips(chips);
  }, [searchTerm]);

  // Sync state to URL params
  const updateUrlState = () => {
    const p = new URLSearchParams();
    if (searchTerm) p.set('searchTerm', searchTerm);
    if (selectedCity !== 'all') p.set('city', selectedCity);
    if (purpose !== 'all') p.set('purpose', purpose);
    if (propertyType !== 'all') p.set('type', propertyType);
    if (selectedBhk !== 'all') p.set('bhk', selectedBhk);
    if (maxPrice > 0 && maxPrice < 100000000) p.set('maxPrice', maxPrice.toString());
    if (sortOption !== 'recommended') p.set('sort', sortOption);
    router.replace(`/search?${p.toString()}`, { scroll: false });
  };

  // Filter listings based on active controls
  const filteredListings = useMemo(() => {
    return SEED_PROPERTIES.filter((p) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTerm =
          p.title.toLowerCase().includes(term) ||
          p.location.locality.toLowerCase().includes(term) ||
          p.location.city.toLowerCase().includes(term) ||
          p.indiaDetails.bhk.toLowerCase().includes(term) ||
          p.indiaDetails.societyName?.toLowerCase().includes(term);
        if (!matchesTerm) return false;
      }

      if (selectedCity !== 'all' && p.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      if (purpose !== 'all' && p.purpose !== purpose) {
        return false;
      }

      if (propertyType !== 'all' && p.propertyType !== propertyType) {
        return false;
      }

      if (selectedBhk !== 'all' && p.indiaDetails.bhk !== selectedBhk) {
        return false;
      }

      if (p.price > maxPrice) {
        return false;
      }

      if (readyToMoveOnly && p.constructionStatus !== 'ready-to-move') {
        return false;
      }

      if (reraVerifiedOnly && p.indiaDetails.reraStatus !== 'verified') {
        return false;
      }

      if (parkingOnly && !p.parking) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'area_desc') return b.indiaDetails.carpetAreaSqFt - a.indiaDetails.carpetAreaSqFt;
      if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // recommended
    });
  }, [
    searchTerm,
    selectedCity,
    purpose,
    propertyType,
    selectedBhk,
    maxPrice,
    readyToMoveOnly,
    reraVerifiedOnly,
    parkingOnly,
    sortOption,
  ]);

  const handleSaveSearch = () => {
    addNotification({
      userId: 'user-default',
      type: 'system',
      title: 'Search Criteria Saved',
      message: `You will receive instant alerts for newly listed properties matching "${searchTerm || selectedCity}".`,
      read: false,
    });
    showToast({
      type: 'success',
      title: 'Search Alert Saved',
      message: `Notifications enabled for ${searchTerm || selectedCity || 'current filters'}.`,
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setPurpose('all');
    setPropertyType('all');
    setSelectedBhk('all');
    setMaxPrice(100000000);
    setReadyToMoveOnly(false);
    setReraVerifiedOnly(false);
    setParkingOnly(false);
    setSortOption('recommended');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Search Header Bar */}
      <section className="sticky top-16 sm:top-20 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Main Search Input */}
          <div className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl px-3.5 py-2 border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-emerald-600 shrink-0" />
            <input
              type="text"
              placeholder="Search by city, locality, project name, or natural language..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updateUrlState();
              }}
              className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters & Controls */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                updateUrlState();
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">All Metros</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            {/* Purpose */}
            <select
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
                updateUrlState();
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">Buy / Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            {/* BHK Filter */}
            <select
              value={selectedBhk}
              onChange={(e) => {
                setSelectedBhk(e.target.value);
                updateUrlState();
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">Any BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Filters</span>
            </button>

            {/* Save Search */}
            <button
              onClick={handleSaveSearch}
              type="button"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
              title="Save search & get alerts"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>Save Alert</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'split' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400'
                }`}
                title="Split Map & List"
              >
                <div className="flex items-center gap-0.5">
                  <Grid className="w-3.5 h-3.5" />
                  <Map className="w-3.5 h-3.5" />
                </div>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400'
                }`}
                title="Grid only"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'map' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400'
                }`}
                title="Map only"
              >
                <Map className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Explainable AI Filter Chips Bar */}
        {extractedAiChips.length > 0 && (
          <div className="max-w-7xl mx-auto flex items-center gap-2 pt-2.5 text-xs overflow-x-auto">
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>AI Extracted Filters:</span>
            </span>
            {extractedAiChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold"
              >
                <span>{chip}</span>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Count & Sort Dropdown */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <div className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredListings.length}</span>{' '}
            properties found
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                updateUrlState();
              }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_desc">Carpet Area: Largest</option>
              <option value="newest">Newest Listed</option>
            </select>
          </div>
        </div>

        {/* View Layouts */}
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-210px)] min-h-[600px]">
            {/* Left Scrollable Listings */}
            <div className="lg:col-span-7 h-full overflow-y-auto pr-2 space-y-4">
              {filteredListings.length === 0 ? (
                <div className="py-20 text-center text-slate-400">
                  <p className="text-base font-semibold">No properties matched your criteria.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredListings.map((listing) => (
                    <div
                      key={listing.id}
                      onMouseEnter={() => setSelectedListingId(listing.id)}
                      className={selectedListingId === listing.id ? 'ring-2 ring-emerald-500 rounded-2xl' : ''}
                    >
                      <ListingCard listing={listing} onShare={(l) => setShareListing(l)} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sticky Map */}
            <div className="lg:col-span-5 h-full rounded-2xl overflow-hidden sticky top-0 border border-slate-200 dark:border-slate-800">
              <MapView
                listings={filteredListings}
                selectedListingId={selectedListingId}
                onSelectListing={(id) => setSelectedListingId(id)}
              />
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onShare={(l) => setShareListing(l)} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[calc(100vh-220px)] min-h-[600px] rounded-2xl overflow-hidden">
            <MapView
              listings={filteredListings}
              selectedListingId={selectedListingId}
              onSelectListing={(id) => setSelectedListingId(id)}
            />
          </div>
        )}

        {/* Mobile Floating Map / List Toggle (Airbnb / Zillow pattern) */}
        <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setViewMode(viewMode === 'map' ? 'split' : 'map')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-700/30"
          >
            {viewMode === 'map' ? (
              <>
                <Grid className="w-4 h-4" />
                <span>Show List</span>
              </>
            ) : (
              <>
                <Map className="w-4 h-4" />
                <span>Show Map</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slide-over Advanced Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col justify-between animate-slide-up">
              <div className="overflow-y-auto space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Advanced Filters
                  </h3>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Price Range Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Max Budget:</span>
                    <span className="text-emerald-600 font-mono">{formatPrice(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={100000000}
                    step={100000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Checkbox Options */}
                <div className="space-y-3 pt-2 text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={readyToMoveOnly}
                      onChange={(e) => setReadyToMoveOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Ready to Move Only
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reraVerifiedOnly}
                      onChange={(e) => setReraVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>RERA Verified Only</span>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parkingOnly}
                      onChange={(e) => setParkingOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Dedicated Covered Parking
                    </span>
                  </label>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <button
                  onClick={resetFilters}
                  type="button"
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    updateUrlState();
                    setIsFilterDrawerOpen(false);
                  }}
                  type="button"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        listing={shareListing}
        isOpen={!!shareListing}
        onClose={() => setShareListing(null)}
      />
    </div>
  );
}
