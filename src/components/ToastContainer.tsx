'use client';

import React from 'react';
import { useToast, ToastType } from '@/context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const BORDERS: Record<ToastType, string> = {
  success: 'border-emerald-500/30 dark:border-emerald-500/20 bg-white/95 dark:bg-slate-900/95',
  error: 'border-rose-500/30 dark:border-rose-500/20 bg-white/95 dark:bg-slate-900/95',
  warning: 'border-amber-500/30 dark:border-amber-500/20 bg-white/95 dark:bg-slate-900/95',
  info: 'border-blue-500/30 dark:border-blue-500/20 bg-white/95 dark:bg-slate-900/95',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <div className="sr-only" aria-live="polite">
        {toasts[toasts.length - 1]?.title}
      </div>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md animate-toast transition-all ${
            BORDERS[toast.type]
          }`}
        >
          {ICONS[toast.type]}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
}
