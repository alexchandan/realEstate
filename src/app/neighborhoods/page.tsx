'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Train,
  Wind,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface LocalityData {
  id: string;
  name: string;
  city: string;
  avgBuyRate: string;
  avgRentRate: string;
  yoyGrowth: string;
  livabilityScore: number;
  safetyScore: number;
  greenCoverPercent: number;
  aqi: number;
  highlights: string[];
  metroLine: string;
  topSchools: string[];
  topHospitals: string[];
  image: string;
}

const LOCALITIES: LocalityData[] = [
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    city: 'Bangalore',
    avgBuyRate: '₹14,200/sqft',
    avgRentRate: '₹48/sqft',
    yoyGrowth: '+9.8%',
    livabilityScore: 9.4,
    safetyScore: 9.2,
    greenCoverPercent: 28,
    aqi: 42,
    highlights: ['Purple Line Metro Corridor', 'High-street 100ft Road Cafes', 'Tree-lined Defence Colony avenues'],
    metroLine: 'Purple Line (Indiranagar / CMH Road stations)',
    topSchools: ['National Public School (NPS)', 'The Frank Anthony Public School'],
    topHospitals: ['Manipal Hospital Old Airport Rd', 'Chinmaya Mission Hospital'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sarjapur',
    name: 'Sarjapur Road',
    city: 'Bangalore',
    avgBuyRate: '₹9,800/sqft',
    avgRentRate: '₹34/sqft',
    yoyGrowth: '+12.4%',
    livabilityScore: 8.8,
    safetyScore: 8.9,
    greenCoverPercent: 35,
    aqi: 38,
    highlights: ['Carmelaram Rail & Upcoming Metro', 'RGA Tech Park & Wipro Campus', 'Gated Villa Communities'],
    metroLine: 'Upcoming Phase 3 Metro Line & Peripheral Ring Road',
    topSchools: ['Indus International School', 'Inventure Academy', 'Greenwood High'],
    topHospitals: ['Motherhood Hospital', 'Columbia Asia / Manipal Sarjapur'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'worli',
    name: 'Worli & Sea Face',
    city: 'Mumbai',
    avgBuyRate: '₹48,000/sqft',
    avgRentRate: '₹115/sqft',
    yoyGrowth: '+8.6%',
    livabilityScore: 9.6,
    safetyScore: 9.7,
    greenCoverPercent: 18,
    aqi: 54,
    highlights: ['Bandra-Worli Sea Link Entrance', 'Mumbai Coastal Road Connectivity', 'Unobstructed Arabian Sea View'],
    metroLine: 'Underground Metro Line 3 (Aqua Line)',
    topSchools: ['Podar International School', 'Aditya Birla World Academy'],
    topHospitals: ['Hinduja Healthcare', 'Breach Candy Hospital'],
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'golf-course-ext',
    name: 'Golf Course Extension',
    city: 'Gurgaon',
    avgBuyRate: '₹15,400/sqft',
    avgRentRate: '₹42/sqft',
    yoyGrowth: '+14.1%',
    livabilityScore: 9.1,
    safetyScore: 9.0,
    greenCoverPercent: 30,
    aqi: 68,
    highlights: ['Sector 65 & WorldMark Retail', 'Direct Connectivity to Cyber City', 'Aravalli Hills Mountain Air'],
    metroLine: 'Sector 55-56 Rapid Metro Station',
    topSchools: ['The Heritage School', 'St. Xavier’s High School'],
    topHospitals: ['Medanta The Medicity', 'Artemis Hospital'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'financial-district',
    name: 'Financial District / Gachibowli',
    city: 'Hyderabad',
    avgBuyRate: '₹10,900/sqft',
    avgRentRate: '₹38/sqft',
    yoyGrowth: '+13.5%',
    livabilityScore: 9.3,
    safetyScore: 9.4,
    greenCoverPercent: 26,
    aqi: 45,
    highlights: ['Waverock & US Consulate SEZ', 'Outer Ring Road (ORR) 8-Lane Expressway', 'High-rise Luxury Penthouses'],
    metroLine: 'Phase 2 Airport Metro Express Corridor',
    topSchools: ['Oakridge International', 'Delhi Public School'],
    topHospitals: ['Continental Hospitals', 'AIG Hospitals'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
];

export default function NeighborhoodsPage() {
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredLocalities =
    selectedCity === 'All' ? LOCALITIES : LOCALITIES.filter((l) => l.city === selectedCity);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Macro Neighborhood Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Neighborhood Intelligence & Livability Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Real-time market analytics, transit accessibility, school ratings, and air quality indices to help
            you pick the right neighborhood.
          </p>
        </div>

        {/* City Filter Chips */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto text-xs font-bold">
          {['All', 'Bangalore', 'Mumbai', 'Gurgaon', 'Hyderabad'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                selectedCity === city
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Locality Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocalities.map((loc) => (
            <div
              key={loc.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600">
                        {loc.city}
                      </span>
                      <h3 className="text-lg font-black mt-1">{loc.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-300 uppercase block">Livability</span>
                      <span className="text-base font-black text-emerald-400">{loc.livabilityScore} / 10</span>
                    </div>
                  </div>
                </div>

                {/* Rates & YoY Growth */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Avg Purchase</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{loc.avgBuyRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Avg Rental</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{loc.avgRentRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">YoY Trend</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{loc.yoyGrowth}</span>
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5 text-blue-600" />
                      <span>Transit:</span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px]">
                      {loc.metroLine}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Air Quality:</span>
                    </span>
                    <span className="font-semibold text-emerald-600 font-mono">AQI {loc.aqi} (Good)</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Safety Rating:</span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">
                      {loc.safetyScore} / 10
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Locality Perks:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {loc.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  href={`/search?city=${loc.city}&locality=${loc.name}`}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Explore Homes in {loc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
