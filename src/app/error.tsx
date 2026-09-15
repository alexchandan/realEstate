'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, report to monitoring service (e.g., Sentry)
    console.error('Captured by global error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Something unexpected occurred
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our team has been notified. You can retry the current operation or return safely to the home page.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-left text-[11px] font-mono text-rose-600 dark:text-rose-400 overflow-x-auto mt-3">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
