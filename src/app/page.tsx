'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ListingCard } from '@/components/ListingCard';
import { ShareModal } from '@/components/ShareModal';
import { SEED_PROPERTIES } from '@/lib/seedData';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Building,
  TrendingUp,
  Award,
  ArrowRight,
  Compass,
  Calculator,
  RotateCw,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [purposeTab, setPurposeTab] = useState<'sale' | 'rent' | 'all'>('sale');
  const [aiSearchInput, setAiSearchInput] = useState('');
  const [shareListing, setShareListing] = useState<PropertyListing | null>(null);

  // Quick EMI Teaser state
  const [teaserLoan, setTeaserLoan] = useState(15000000);
  const [teaserRate, setTeaserRate] = useState(8.5);
  const [teaserYears, setTeaserYears] = useState(20);

  const r = teaserRate / 12 / 100;
  const n = teaserYears * 12;
  const teaserEMI = Math.round((teaserLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (aiSearchInput.trim()) params.set('searchTerm', aiSearchInput.trim());
    if (purposeTab !== 'all') params.set('purpose', purposeTab);
    router.push(`/search?${params.toString()}`);
  };

  const featuredListings = SEED_PROPERTIES.filter((p) => p.isFeatured);
  const offerListings = SEED_PROPERTIES.filter((p) => p.originalPrice && p.originalPrice > p.price);
  const rentalListings = SEED_PROPERTIES.filter((p) => p.purpose === 'rent');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent dark:from-emerald-950/20">
        {/* Glow orbs in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/40 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-fade-in shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Full-Stack Real Estate Ecosystem</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Find your next <span className="text-emerald-600 dark:text-emerald-400">perfect</span>{' '}
              place with ease.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Discover RERA-verified luxury penthouses, contemporary villas, and prime rentals. Experience
              interactive 360° virtual tours, transparent negotiations, and smart financial calculators.
            </p>

            {/* Natural Language Search Box */}
            <div className="mt-8 p-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl mx-auto">
              {/* Tabs */}
              <div className="flex items-center gap-1 mb-2.5 px-2">
                <button
                  onClick={() => setPurposeTab('sale')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    purposeTab === 'sale'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Buy Home
                </button>
                <button
                  onClick={() => setPurposeTab('rent')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    purposeTab === 'rent'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Rent
                </button>
                <button
                  onClick={() => setPurposeTab('all')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    purposeTab === 'all'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  All Properties
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl">
                  <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={aiSearchInput}
                    onChange={(e) => setAiSearchInput(e.target.value)}
                    placeholder="e.g. 3 BHK in Bangalore under ₹2.5 Cr with pool near metro..."
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm font-bold shadow-glow hover:opacity-95 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-400">Try:</span>
                <button
                  onClick={() => setAiSearchInput('3 BHK Indiranagar Bangalore')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Indiranagar 3 BHK
                </button>
                <button
                  onClick={() => setAiSearchInput('Luxury Villa in Sarjapur')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Sarjapur Villa
                </button>
                <button
                  onClick={() => setAiSearchInput('Sea Facing Worli Mumbai')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Worli Sea Facing
                </button>
                <button
                  onClick={() => setAiSearchInput('CyberCity Gurgaon')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Gurgaon Sector 65
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Metric Statistics Bar */}
      <section className="py-8 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">4,800+</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Active Verified Listings
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                RERA Registered Inventory
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">₹2,400 Cr+</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Transacted Volume
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                4.92 / 5
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Verified Buyer Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Curated Residences</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Featured Verified Properties
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Handpicked premium estates with high appreciation potential and clear legal documentation.
              </p>
            </div>

            <Link
              href="/search"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>View all properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onShare={(l) => setShareListing(l)} />
            ))}
          </div>
        </div>
      </section>

      {/* Price Drops & Special Offers Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Exclusive Deals
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                Recent Offers & Price Reductions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Motivated sellers and limited-time developer pricing discounts.
              </p>
            </div>

            <Link
              href="/search?purpose=sale"
              className="mt-4 sm:mt-0 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onShare={(l) => setShareListing(l)} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Financial Calculator Preview Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left explanation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Real Estate Financial Suite</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Calculate Your Exact Home Loan EMI & Affordability
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Understand your net borrowing capacity, amortisation schedule, and state-level stamp duty
                  rules before making an offer.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/calculators?tab=emi"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Full EMI Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/calculators?tab=stamp-duty"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    Stamp Duty by State
                  </Link>

                  <Link
                    href="/calculators?tab=affordability"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    Affordability Checker
                  </Link>
                </div>
              </div>

              {/* Right Interactive Mini Calculator */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md space-y-5">
                {/* Loan Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400">Loan Amount:</span>
                    <span className="text-emerald-400 font-mono text-sm">{formatPrice(teaserLoan)}</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={100000000}
                    step={500000}
                    value={teaserLoan}
                    onChange={(e) => setTeaserLoan(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Interest Rate Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400">Interest Rate:</span>
                    <span className="text-emerald-400 font-mono text-sm">{teaserRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min={6.5}
                    max={14}
                    step={0.1}
                    value={teaserRate}
                    onChange={(e) => setTeaserRate(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Tenure Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400">Loan Tenure:</span>
                    <span className="text-emerald-400 font-mono text-sm">{teaserYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={teaserYears}
                    onChange={(e) => setTeaserYears(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Result Card */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Estimated Monthly EMI
                    </span>
                    <span className="text-2xl font-black text-white">{formatPrice(teaserEMI)}/mo</span>
                  </div>
                  <Link
                    href={`/search?maxPrice=${Math.round(teaserLoan * 1.25)}`}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold transition-colors"
                  >
                    Show Homes In Budget →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Localities & Hotspots */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              City Intelligence
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Prime Investment Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore livability scores, transit connectivity, and capital appreciation trends across India's top metros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: 'Bangalore',
                locality: 'Indiranagar & Whitefield',
                rate: '₹12,800/sqft',
                appreciation: '+9.4% YoY',
                image:
                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
              },
              {
                city: 'Mumbai',
                locality: 'Worli & Bandra West',
                rate: '₹42,500/sqft',
                appreciation: '+8.1% YoY',
                image:
                  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
              },
              {
                city: 'Gurgaon',
                locality: 'Golf Course Extension',
                rate: '₹15,200/sqft',
                appreciation: '+12.6% YoY',
                image:
                  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
              },
              {
                city: 'Hyderabad',
                locality: 'Gachibowli & Financial Dist',
                rate: '₹11,400/sqft',
                appreciation: '+11.2% YoY',
                image:
                  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
              },
            ].map((spot, i) => (
              <Link
                key={i}
                href={`/search?city=${spot.city}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
              >
                <img
                  src={spot.image}
                  alt={spot.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600">
                    {spot.city}
                  </span>
                  <h3 className="font-extrabold text-base mt-1">{spot.locality}</h3>
                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/20 text-slate-200">
                    <span>Avg {spot.rate}</span>
                    <span className="text-emerald-400 font-bold">{spot.appreciation}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Share Modal */}
      <ShareModal
        listing={shareListing}
        isOpen={!!shareListing}
        onClose={() => setShareListing(null)}
      />
    </div>
  );
}
