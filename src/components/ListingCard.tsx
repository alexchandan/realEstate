'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useCompare } from '@/context/CompareContext';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ShieldCheck,
  Heart,
  Scale,
  Share2,
  ChevronRight,
} from 'lucide-react';

interface ListingCardProps {
  listing: PropertyListing;
  onShare?: (listing: PropertyListing) => void;
}

export function ListingCard({ listing, onShare }: ListingCardProps) {
  const { formatPrice, formatPropertyArea } = useCurrency();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [isSaved, setIsSaved] = useState(false);
  const inCompare = isInCompare(listing.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(listing.id);
    } else {
      addToCompare(listing);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) onShare(listing);
  };

  const pricePerSqFt =
    listing.indiaDetails.carpetAreaSqFt > 0
      ? Math.round(listing.price / listing.indiaDetails.carpetAreaSqFt)
      : null;

  return (
    <div className="group relative rounded-xl border border-stone-200 dark:border-stone-800/90 bg-white dark:bg-stone-900 overflow-hidden shadow-elevation-subtle hover:shadow-elevation-hover transition-all duration-300 flex flex-col">
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-850">
        <img
          src={listing.media.coverImage || listing.media.imageUrls[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle vignette for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/10" />

        {/* Top Minimalist Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {listing.purpose === 'rent' ? 'For Lease' : 'For Sale'}
          </span>

          {listing.indiaDetails.reraStatus === 'verified' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/95 dark:bg-stone-900/90 text-brand-900 dark:text-emerald-400 text-[10px] font-bold backdrop-blur-md shadow-sm border border-stone-200 dark:border-stone-700">
              <ShieldCheck className="w-3 h-3 text-brand-900 dark:text-emerald-400" />
              <span>RERA Verified</span>
            </span>
          )}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            type="button"
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors shadow-sm ${
              inCompare
                ? 'bg-brand-900 text-white dark:bg-white dark:text-stone-900'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:bg-white'
            }`}
            title={inCompare ? 'Remove from comparison' : 'Compare property'}
            aria-label="Compare property"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleShareClick}
            type="button"
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:bg-white backdrop-blur-md transition-colors shadow-sm flex items-center justify-center"
            title="Share listing"
            aria-label="Share listing"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFavoriteClick}
            type="button"
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors shadow-sm ${
              isSaved
                ? 'bg-rose-600 text-white'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:bg-white'
            }`}
            title="Save to favorites"
            aria-label="Save to favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Price in Cover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm font-display">
              {formatPrice(listing.price)}
              {listing.purpose === 'rent' && (
                <span className="text-xs font-normal text-stone-300">/mo</span>
              )}
            </div>
            {pricePerSqFt && (
              <span className="text-[11px] text-stone-300 font-medium">
                ₹{pricePerSqFt.toLocaleString('en-IN')}/sq.ft
              </span>
            )}
          </div>

          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-stone-200 border border-white/10">
            {listing.indiaDetails.bhk}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Address & Locality */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">
              {listing.location.locality}, {listing.location.city}
            </span>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`}>
            <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white line-clamp-1 group-hover:text-brand-900 dark:group-hover:text-emerald-400 transition-colors">
              {listing.title}
            </h3>
          </Link>

          {/* Society or Developer */}
          {listing.indiaDetails.societyName && (
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5 font-medium">
              {listing.indiaDetails.societyName}
            </p>
          )}

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-stone-400" />
              <span>{listing.bedrooms} Beds</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-stone-400" />
              <span>{listing.bathrooms} Baths</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <span>{formatPropertyArea(listing.indiaDetails.carpetAreaSqFt)}</span>
            </div>
          </div>
        </div>

        {/* Footer Meta & Explore CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
          <span className="capitalize font-medium text-[11px]">
            {listing.constructionStatus.replace('-', ' ')}
            {listing.indiaDetails.vastuFacing && ` • ${listing.indiaDetails.vastuFacing} Facing`}
          </span>

          <Link
            href={`/listing/${listing.id}`}
            className="font-bold text-brand-900 dark:text-emerald-400 hover:underline flex items-center gap-0.5 text-xs"
          >
            <span>View Estate</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
