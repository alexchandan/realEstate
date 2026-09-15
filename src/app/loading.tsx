import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Top Hero Skeleton */}
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-5 w-96 bg-slate-200 dark:bg-slate-800 rounded-xl" />

        {/* Filter Bar Skeleton */}
        <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />

        {/* Card Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="h-48 w-full bg-slate-200 dark:bg-slate-800" />
              <div className="p-5 space-y-3 flex-1">
                <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg pt-2" />
                <div className="pt-4 flex gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
