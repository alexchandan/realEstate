'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SEED_PROPERTIES } from '@/lib/seedData';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useCompare } from '@/context/CompareContext';
import { calculateEMI, calculateStampDuty } from '@/lib/utils';
import { VirtualTour360 } from '@/components/VirtualTour360';
import { MapView } from '@/components/MapView';
import { ScheduleVisitModal } from '@/components/ScheduleVisitModal';
import { MakeOfferModal } from '@/components/MakeOfferModal';
import { ShareModal } from '@/components/ShareModal';
import { ReportModal } from '@/components/ReportModal';
import { ListingCard } from '@/components/ListingCard';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ShieldCheck,
  Calendar,
  Tag,
  Share2,
  Heart,
  Scale,
  Phone,
  MessageCircle,
  Mail,
  Download,
  AlertTriangle,
  RotateCw,
  Compass,
  CheckCircle2,
  Clock,
  TrendingUp,
  Car,
  Train,
  Sparkles,
} from 'lucide-react';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;
  const { formatPrice, formatPropertyArea } = useCurrency();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [listing, setListing] = useState<PropertyListing | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'tour360' | 'floorplan' | 'map' | 'valuation'>('overview');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Commute calculator state
  const [commuteDestination, setCommuteDestination] = useState('Indiranagar Metro Station');
  const [commuteMode, setCommuteMode] = useState<'car' | 'transit' | 'bike' | 'walk'>('car');

  useEffect(() => {
    const found = SEED_PROPERTIES.find((p) => p.id === listingId);
    if (found) {
      setListing(found);
    } else {
      setListing(SEED_PROPERTIES[0]);
    }
  }, [listingId]);

  if (!listing) {
    return (
      <div className="py-32 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto" />
        <p className="text-xs text-slate-500 mt-2">Loading property specifications...</p>
      </div>
    );
  }

  const inCompare = isInCompare(listing.id);
  const emiInfo = calculateEMI(Math.round(listing.price * 0.8), 8.5, 20);
  const stampDutyInfo = calculateStampDuty(listing.price, listing.location.state, 'male');
  const pricePerSqFt = Math.round(listing.price / listing.indiaDetails.carpetAreaSqFt);

  const similarListings = SEED_PROPERTIES.filter(
    (p) => p.id !== listing.id && (p.location.city === listing.location.city || p.purpose === listing.purpose)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 md:pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span>/</span>
        <Link href={`/search?city=${listing.location.city}`} className="hover:text-emerald-600">
          {listing.location.city}
        </Link>
        <span>/</span>
        <Link href={`/search?locality=${listing.location.locality}`} className="hover:text-emerald-600">
          {listing.location.locality}
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">{listing.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Title & Quick Actions Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-600 text-white">
                {listing.purpose === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {listing.indiaDetails.bhk} {listing.propertyType}
              </span>
              {listing.indiaDetails.reraStatus === 'verified' && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  <span>RERA Verified: {listing.indiaDetails.reraNumber}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {listing.title}
            </h1>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{listing.location.formattedAddress}</span>
              {listing.location.landmark && (
                <span className="text-slate-400 font-medium">• Near {listing.location.landmark}</span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (inCompare) removeFromCompare(listing.id);
                else addToCompare(listing);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                inCompare
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{inCompare ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-600'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
              title="Bookmark property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition-colors"
              title="Report listing"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media & Interactive Viewer Section */}
        <div className="space-y-4 mb-8">
          {/* Navigation sub-tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Gallery Photos ({listing.media.imageUrls.length})
            </button>

            <button
              onClick={() => setActiveTab('tour360')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'tour360'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>360° Virtual Walkthrough</span>
            </button>

            <button
              onClick={() => setActiveTab('floorplan')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'floorplan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Floor Plans
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'map'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Location & Transit Map
            </button>
          </div>

          {/* Tab Views */}
          {activeTab === 'overview' ? (
            <div className="space-y-3">
              {/* Hero Image */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
                <img
                  src={listing.media.imageUrls[activeImageIndex] || listing.media.coverImage}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {listing.media.imageUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-emerald-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : activeTab === 'tour360' ? (
            <VirtualTour360
              imageUrl={listing.media.virtualTour360Url}
              propertyTitle={listing.title}
            />
          ) : activeTab === 'floorplan' ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Architectural Floor Plan & Unit Blueprint
              </h3>
              <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                <img
                  src={listing.media.floorPlanUrls?.[0] || 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'}
                  alt="Floor plan"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs text-slate-500">
                Carpet Area: {listing.indiaDetails.carpetAreaSqFt} sq.ft | Super Built-up: {listing.indiaDetails.superBuiltUpAreaSqFt} sq.ft
              </p>
            </div>
          ) : (
            <div className="h-[480px] rounded-3xl overflow-hidden">
              <MapView listings={[listing]} />
            </div>
          )}
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Specs, Amenities, Description, Commute, History */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Specs Grid */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block">Carpet Area</span>
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {formatPropertyArea(listing.indiaDetails.carpetAreaSqFt)}
                </span>
                <span className="text-[10px] text-slate-400">({pricePerSqFt}/sq.ft)</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block">Bedrooms / Baths</span>
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {listing.bedrooms} Beds, {listing.bathrooms} Baths
                </span>
                <span className="text-[10px] text-slate-400">{listing.indiaDetails.bhk} Layout</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block">Vastu Orientation</span>
                <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{listing.indiaDetails.vastuFacing || 'East'} Facing</span>
                </span>
                <span className="text-[10px] text-slate-400">100% Vastu Compliant</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block">Possession Status</span>
                <span className="font-black text-sm text-slate-900 dark:text-white capitalize">
                  {listing.constructionStatus.replace('-', ' ')}
                </span>
                <span className="text-[10px] text-slate-400">Floor {listing.floor} of {listing.totalFloors}</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">About this Home</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Amenities Taxonomy */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Taxonomy Amenities & Infrastructure
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Building */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Building & Security
                  </h4>
                  <ul className="space-y-1.5">
                    {listing.amenities.building.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lifestyle */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Lifestyle & Wellness
                  </h4>
                  <ul className="space-y-1.5">
                    {listing.amenities.lifestyle.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Utility */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Utility & Utilities Grid
                  </h4>
                  <ul className="space-y-1.5">
                    {listing.amenities.utility.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outdoor */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Outdoor & Accessibility
                  </h4>
                  <ul className="space-y-1.5">
                    {listing.amenities.outdoor.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Commute Time Calculator */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Commute & Travel Time
                  </h3>
                  <p className="text-xs text-slate-500">Calculate estimated door-to-door transit time</p>
                </div>
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setCommuteMode('car')}
                    className={`p-1.5 rounded-lg ${commuteMode === 'car' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow' : 'text-slate-400'}`}
                  >
                    <Car className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCommuteMode('transit')}
                    className={`p-1.5 rounded-lg ${commuteMode === 'transit' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow' : 'text-slate-400'}`}
                  >
                    <Train className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <input
                  type="text"
                  value={commuteDestination}
                  onChange={(e) => setCommuteDestination(e.target.value)}
                  placeholder="Enter office, airport, or tech park..."
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <span className="font-bold text-emerald-600 shrink-0">~ 14 mins ({commuteMode})</span>
              </div>
            </div>

            {/* Price History Transparency */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Price History & Appreciation Trend
                </h3>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+13.9% Appreciation</span>
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {listing.priceHistory.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-2">({item.date})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 font-mono">₹{item.pricePerSqFt}/sq.ft</span>
                      {item.note && <span className="text-[10px] text-slate-400 block">{item.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing, Financial Breakdown, Agent Card & CTAs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Main Pricing Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 sticky top-28">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Listed Price</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {formatPrice(listing.price)}
                  {listing.purpose === 'rent' && <span className="text-sm font-semibold opacity-80">/mo</span>}
                </div>
                <span className="text-xs text-slate-500 font-mono block mt-1">
                  ≈ {formatPrice(pricePerSqFt)} per sq.ft carpet
                </span>
              </div>

              {/* Financial mini-table */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Est. Monthly EMI (8.5%, 20y):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatPrice(emiInfo.monthlyEMI)}/mo
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Govt. Stamp Duty & Reg:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200 font-bold">
                    {formatPrice(stampDutyInfo.totalGovtCharges)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Maintenance Charges:</span>
                  <span className="font-mono">₹{listing.indiaDetails.maintenanceMonthly || 4500}/mo</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-glow transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Site Visit</span>
                </button>

                <button
                  onClick={() => setIsOfferModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Tag className="w-4 h-4" />
                  <span>Make an Offer</span>
                </button>
              </div>

              {/* Seller / Agent Profile Snippet */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={listing.sellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={listing.sellerName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">
                      {listing.sellerName}
                    </h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-400 capitalize">{listing.sellerType} • Rating {listing.sellerRating || 4.9} ★</p>
                </div>
              </div>

              {/* Direct Connect Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${listing.sellerPhone || '+919845012345'}`}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://api.whatsapp.com/send?phone=919845012345&text=${encodeURIComponent(
                    `Hi, I am interested in ${listing.title} on Brickly AlexEstate.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-center font-bold hover:bg-emerald-100 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Recommendation Module */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Personalized Recommendations
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              Similar Properties in {listing.location.city}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarListings.map((sim) => (
              <ListingCard key={sim.id} listing={sim} onShare={() => setIsShareModalOpen(true)} />
            ))}
          </div>
        </section>
      </div>

      {/* Modals */}
      <ScheduleVisitModal
        listing={listing}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
      <MakeOfferModal
        listing={listing}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
      <ShareModal
        listing={listing}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      <ReportModal
        listing={listing}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
