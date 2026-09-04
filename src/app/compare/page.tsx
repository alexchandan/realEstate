'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Scale,
  X,
  Plus,
  ShieldCheck,
  Bed,
  Bath,
  Maximize2,
  Compass,
  Check,
  Minus,
  ArrowRight,
} from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { formatPrice, formatPropertyArea } = useCurrency();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <Scale className="w-4 h-4" />
              <span>Decision Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Side-by-Side Property Comparison
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Compare specifications, price per sq.ft, RERA status, and amenities across selected homes.
            </p>
          </div>

          {compareList.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={clearCompare}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                Clear All
              </button>
              <Link
                href="/search"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add More</span>
              </Link>
            </div>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
              <Scale className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No properties selected for comparison</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click the comparison icon on any property card to compare up to 4 homes side-by-side.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:shadow-glow transition-all"
            >
              <span>Explore Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-6">
            <table className="w-full border-collapse bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 text-left font-extrabold text-slate-400 uppercase tracking-wider w-48 bg-slate-50 dark:bg-slate-850">
                    Property Specs
                  </th>
                  {compareList.map((item) => (
                    <th key={item.id} className="p-4 min-w-[260px] text-left align-top">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                          title="Remove from compare"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={item.media.coverImage}
                          alt={item.title}
                          className="w-full h-36 rounded-2xl object-cover mb-3"
                        />
                        <Link href={`/listing/${item.id}`}>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-emerald-600 transition-colors">
                            {item.title}
                          </h4>
                        </Link>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.location.locality}, {item.location.city}</p>
                        <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-2">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {/* RERA */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">RERA Registration</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4">
                      {item.indiaDetails.reraStatus === 'verified' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{item.indiaDetails.reraNumber}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Exempt / Unregistered</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* BHK & Layout */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">BHK / Layout</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4 font-semibold">
                      {item.indiaDetails.bhk} ({item.bedrooms} Beds, {item.bathrooms} Baths)
                    </td>
                  ))}
                </tr>

                {/* Carpet Area */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">Carpet Area</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4 font-bold text-slate-900 dark:text-white">
                      {formatPropertyArea(item.indiaDetails.carpetAreaSqFt)}
                    </td>
                  ))}
                </tr>

                {/* Price per sq.ft */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">Price per Sq.Ft</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4 font-mono font-bold text-emerald-600">
                      ₹{Math.round(item.price / item.indiaDetails.carpetAreaSqFt)}/sq.ft
                    </td>
                  ))}
                </tr>

                {/* Vastu */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">Vastu Orientation</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4">
                      {item.indiaDetails.vastuFacing || 'East'} Facing
                    </td>
                  ))}
                </tr>

                {/* Parking */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">Car Parking</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4">
                      {item.parking ? `${item.parkingSpots || 1} Covered Spots` : 'Street Parking'}
                    </td>
                  ))}
                </tr>

                {/* Maintenance */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">Maintenance</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4 font-mono">
                      ₹{item.indiaDetails.maintenanceMonthly || 4000}/month
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4 font-bold bg-slate-50 dark:bg-slate-850 text-slate-500">Actions</td>
                  {compareList.map((item) => (
                    <td key={item.id} className="p-4">
                      <Link
                        href={`/listing/${item.id}`}
                        className="block w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-center hover:bg-emerald-700 transition-colors"
                      >
                        Inspect Listing
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
