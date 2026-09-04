'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Train,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Wind,
  Layers,
  Search,
  ExternalLink,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface MapViewProps {
  listings: PropertyListing[];
  selectedListingId?: string;
  onSelectListing?: (id: string) => void;
}

export function MapView({ listings, selectedListingId, onSelectListing }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const { formatPrice } = useCurrency();
  const { resolvedTheme } = useTheme();

  const [activeLayers, setActiveLayers] = useState<{
    metro: boolean;
    schools: boolean;
    hospitals: boolean;
    markets: boolean;
    airQuality: boolean;
  }>({
    metro: true,
    schools: false,
    hospitals: false,
    markets: false,
    airQuality: false,
  });

  const [activeListing, setActiveListing] = useState<PropertyListing | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize map with dynamic Leaflet
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Default center on Bangalore (or first listing)
      const centerLat = listings[0]?.location.lat || 12.9716;
      const centerLng = listings[0]?.location.lng || 77.5946;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Tile layer: CartoDB Positron for light, Dark Matter for dark
      const tileUrl =
        resolvedTheme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      if (isMounted) setIsMapLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [resolvedTheme]);

  // Update property markers
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapLoaded) return;

    async function updateMarkers() {
      const L = (await import('leaflet')).default;
      const map = mapInstanceRef.current;

      // Clear existing markers
      Object.values(markersRef.current).forEach((m: any) => m.remove());
      markersRef.current = {};

      const bounds = L.latLngBounds([]);

      listings.forEach((listing) => {
        if (!listing.location.lat || !listing.location.lng) return;

        const isSelected = selectedListingId === listing.id;

        // Custom HTML marker element
        const icon = L.divIcon({
          className: 'bg-transparent',
          html: `
            <div class="custom-leaflet-marker ${isSelected ? 'active !bg-slate-950 !scale-125' : ''}">
              ${formatPrice(listing.price)}
            </div>
          `,
          iconSize: [64, 28],
          iconAnchor: [32, 14],
        });

        const marker = L.marker([listing.location.lat, listing.location.lng], { icon }).addTo(map);

        marker.on('click', () => {
          setActiveListing(listing);
          if (onSelectListing) onSelectListing(listing.id);
        });

        markersRef.current[listing.id] = marker;
        bounds.extend([listing.location.lat, listing.location.lng]);
      });

      if (listings.length > 0 && bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }

    updateMarkers();
  }, [listings, selectedListingId, isMapLoaded, formatPrice]);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[450px]" />

      {/* Top Map POI Layers Toolbar */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-slate-500">
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Layers</span>
        </div>

        <button
          type="button"
          onClick={() => toggleLayer('metro')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
            activeLayers.metro
              ? 'bg-blue-600 text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Train className="w-3 h-3" />
          <span>Metro</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('schools')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
            activeLayers.schools
              ? 'bg-amber-600 text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <GraduationCap className="w-3 h-3" />
          <span>Schools</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('hospitals')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
            activeLayers.hospitals
              ? 'bg-rose-600 text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Hospital className="w-3 h-3" />
          <span>Hospitals</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('airQuality')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
            activeLayers.airQuality
              ? 'bg-emerald-600 text-white font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Wind className="w-3 h-3" />
          <span>AQI 42 (Good)</span>
        </button>
      </div>

      {/* Floating Property Preview Popup */}
      {activeListing && (
        <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-80 z-[1000] p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-slide-up">
          <div className="relative">
            <button
              onClick={() => setActiveListing(null)}
              className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3">
              <img
                src={activeListing.media.coverImage}
                alt={activeListing.title}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {activeListing.indiaDetails.bhk}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-1">
                  {activeListing.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {activeListing.location.locality}, {activeListing.location.city}
                </p>
                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatPrice(activeListing.price)}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{activeListing.indiaDetails.carpetAreaSqFt} sq.ft</span>
              <Link
                href={`/listing/${activeListing.id}`}
                className="font-bold text-emerald-600 flex items-center gap-1 hover:underline"
              >
                <span>View Home</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
