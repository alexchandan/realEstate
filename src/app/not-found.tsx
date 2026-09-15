import React from 'react';
import Link from 'next/link';
import { Compass, Search, Home, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            404 — Property Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Off the Market or Relocated
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            The page or property listing you are seeking might have been leased, sold, or moved to a new address.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Properties</span>
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-all"
          >
            <Calculator className="w-4 h-4" />
            <span>Financial Suite</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-slate-600 dark:text-slate-400 text-xs font-semibold hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
