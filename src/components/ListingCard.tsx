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
  Sparkles,
  Share2,
  Compass,
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

  return (
    <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={listing.media.coverImage || listing.media.imageUrls[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${
              listing.purpose === 'rent' ? 'bg-indigo-600' : 'bg-emerald-600'
            }`}
          >
            {listing.purpose === 'rent' ? 'For Rent' : 'For Sale'}
          </span>

          {listing.indiaDetails.reraStatus === 'verified' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-3 h-3" />
              <span>RERA</span>
            </span>
          )}

          {listing.isFeatured && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Action Buttons (Save, Compare, Share) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            type="button"
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
              inCompare
                ? 'bg-emerald-600 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
            }`}
            title={inCompare ? 'Remove from comparison' : 'Compare property'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleShareClick}
            type="button"
            className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white backdrop-blur-md transition-colors shadow-sm"
            title="Share listing"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFavoriteClick}
            type="button"
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
              isSaved
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Price in Cover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <div className="text-xl font-black tracking-tight drop-shadow-md">
              {formatPrice(listing.price)}
              {listing.purpose === 'rent' && <span className="text-xs font-medium opacity-90">/mo</span>}
            </div>
            {listing.originalPrice && listing.originalPrice > listing.price && (
              <div className="flex items-center gap-1.5 text-[11px] opacity-80">
                <span className="line-through">{formatPrice(listing.originalPrice)}</span>
                <span className="text-emerald-300 font-bold">
                  Save {formatPrice(listing.originalPrice - listing.price)}
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-[11px] px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm font-semibold">
              {listing.indiaDetails.bhk}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Address & Locality */}
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              {listing.location.locality}, {listing.location.city}
            </span>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`}>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {listing.title}
            </h3>
          </Link>

          {/* Society name if present */}
          {listing.indiaDetails.societyName && (
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {listing.indiaDetails.societyName}
            </p>
          )}

          {/* Specifications Pills */}
          <div className="grid grid-cols-3 gap-2 my-3 py-2.5 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{listing.bedrooms} Beds</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{listing.bathrooms} Baths</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatPropertyArea(listing.indiaDetails.carpetAreaSqFt)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Seller Snippet */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {listing.indiaDetails.vastuFacing && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <Compass className="w-3 h-3 text-emerald-600" />
                <span>{listing.indiaDetails.vastuFacing}</span>
              </span>
            )}
            <span className="text-[10px] text-slate-400 capitalize">
              • {listing.constructionStatus.replace('-', ' ')}
            </span>
          </div>

          <Link
            href={`/listing/${listing.id}`}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Details</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
