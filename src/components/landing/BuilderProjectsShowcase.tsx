'use client';

import React from 'react';
import Link from 'next/link';
import { BuilderProject } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface BuilderProjectsShowcaseProps {
  projects: BuilderProject[];
}

export function BuilderProjectsShowcase({ projects }: BuilderProjectsShowcaseProps) {
  const { formatPrice } = useCurrency();

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-1">
              Institutional Developments
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight font-display">
              RERA-Approved Master Developments
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl leading-relaxed">
              Direct developer allocations from Grade-A institutional builders with verified construction
              milestones and certified completion schedules.
            </p>
          </div>

          <Link
            href="/builder-projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-white hover:underline shrink-0"
          >
            <span>View All Developments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl bg-stone-50/50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-elevation-subtle hover:shadow-elevation-card transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Developer Name & RERA Tag */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      {proj.developerName}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white font-display">
                      {proj.projectName}
                    </h3>
                  </div>

                  <span className="flex items-center gap-1 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-900 dark:text-emerald-400" />
                    <span>RERA Approved</span>
                  </span>
                </div>

                {/* Location & Starting Price */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Location</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">{proj.location}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Starting Price</span>
                    <span className="font-bold text-stone-900 dark:text-white text-sm font-display">
                      {formatPrice(proj.startingPrice)}
                    </span>
                  </div>
                </div>

                {/* Construction Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-stone-500">Construction Progress</span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {proj.constructionProgressPercent}% Certified
                    </span>
                  </div>
                  <div className="h-2 w-full rounded bg-stone-200 dark:bg-stone-700 overflow-hidden">
                    <div
                      style={{ width: `${proj.constructionProgressPercent}%` }}
                      className="h-full bg-brand-900 dark:bg-emerald-500 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Execution Milestones:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {proj.milestones.slice(0, 4).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`flex items-center gap-2 p-2 rounded border ${
                          m.completed
                            ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-750 text-stone-800 dark:text-stone-200'
                            : 'bg-stone-100/50 dark:bg-stone-800/40 border-stone-200/50 dark:border-stone-800 text-stone-400'
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 ${
                            m.completed ? 'text-brand-900 dark:text-emerald-400' : 'text-stone-400'
                          }`}
                        />
                        <span className="truncate text-[11px] font-medium">{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specs metadata */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span>{proj.totalTowers} Towers</span>
                  <span>{proj.totalUnits} Total Units</span>
                  <span className="font-semibold text-stone-900 dark:text-white">
                    {proj.availableUnits} Units Available
                  </span>
                  <span>Target: {proj.completionDate}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
                <Link
                  href="/builder-projects"
                  className="w-full py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-white text-stone-900 dark:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Inspect Master Plan & Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
