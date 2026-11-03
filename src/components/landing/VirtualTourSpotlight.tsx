'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VirtualTour360 } from '@/components/VirtualTour360';
import { RotateCw, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export function VirtualTourSpotlight() {
  const rooms = [
    {
      id: 'living',
      name: 'Double-Height Living & Dining Lounge',
      subtitle: 'Italian marble flooring with wrap-around outdoor terrace',
      imageUrl:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80',
    },
    {
      id: 'master',
      name: 'Primary Suite & Private Dressing Room',
      subtitle: 'Herringbone timber floor and floor-to-ceiling panoramic glass',
      imageUrl:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    },
    {
      id: 'lounge',
      name: 'Rooftop Sky Terrace & Plunge Pool Deck',
      subtitle: 'Unobstructed western skyline sightlines over urban canopy',
      imageUrl:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    },
  ];

  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const activeRoom = rooms[activeRoomIdx];

  return (
    <section
      id="virtual-tour-spotlight"
      className="py-16 md:py-24 bg-stone-900 text-white border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
              Spatial Immersion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white">
              Inspect Architecture in Photorealistic 360°
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl leading-relaxed">
              Examine spatial volume, material specifications, and sightlines from any device before
              confirming a private on-site inspection.
            </p>
          </div>

          {/* Property Reference Badge */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850 border border-stone-750">
            <div className="w-9 h-9 rounded-lg bg-brand-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">The Grand Pavilion Sky Residence</div>
              <div className="text-[11px] text-stone-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>Indiranagar, Bangalore • 18th Floor</span>
              </div>
            </div>
          </div>
        </div>

        {/* 360 Cinema Frame Box */}
        <div className="rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-elevation-modal p-2 sm:p-4 space-y-4">
          {/* Room Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {rooms.map((room, idx) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setActiveRoomIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    idx === activeRoomIdx
                      ? 'bg-white text-stone-900 font-bold'
                      : 'bg-stone-850 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {room.name.split('&')[0].trim()}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-stone-400 flex items-center gap-1.5 px-2 py-1">
              <RotateCw className="w-3.5 h-3.5 text-stone-400" />
              <span>Click & drag to rotate • Scroll to zoom</span>
            </div>
          </div>

          {/* 360 Canvas Player */}
          <div className="rounded-xl overflow-hidden border border-stone-850">
            <VirtualTour360
              imageUrl={activeRoom.imageUrl}
              propertyTitle={activeRoom.name}
            />
          </div>

          {/* Bottom Bar Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-2 text-xs">
            <div>
              <span className="font-bold text-white">{activeRoom.name}: </span>
              <span className="text-stone-400">{activeRoom.subtitle}</span>
            </div>

            <Link
              href="/listing/prop-1"
              className="px-4 py-2 rounded-lg bg-white text-stone-900 font-bold hover:bg-stone-200 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Full Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
