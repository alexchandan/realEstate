'use client';

import React, { useState } from 'react';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useNotifications } from '@/context/NotificationContext';
import { useToast } from '@/context/ToastContext';
import { X, Tag, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface MakeOfferModalProps {
  listing: PropertyListing;
  isOpen: boolean;
  onClose: () => void;
}

export function MakeOfferModal({ listing, isOpen, onClose }: MakeOfferModalProps) {
  const { formatPrice } = useCurrency();
  const { addNotification } = useNotifications();
  const { showToast } = useToast();

  const [offerPrice, setOfferPrice] = useState<number>(Math.round(listing.price * 0.95));
  const [tokenDeposit, setTokenDeposit] = useState<number>(Math.round(listing.price * 0.02));
  const [contingency, setContingency] = useState(
    'Subject to clear title deed verification, bank loan sanction within 21 days, and structural inspection.'
  );
  const [expiresDays, setExpiresDays] = useState(7);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    addNotification({
      userId: 'user-default',
      type: 'offer',
      title: 'Formal Offer Submitted',
      message: `Your offer of ${formatPrice(offerPrice)} for ${listing.title} was submitted to ${listing.sellerName}.`,
      read: false,
      link: '/dashboard',
    });

    showToast({
      type: 'success',
      title: 'Offer Submitted to Seller',
      message: `Dispatched binding offer of ${formatPrice(offerPrice)} with escrow token deposit.`,
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  const discountPercent = (((listing.price - offerPrice) / listing.price) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>Make a Formal Offer</span>
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">{listing.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">Offer Recorded in Pipeline!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your binding offer of {formatPrice(offerPrice)} has been transmitted to {listing.sellerName}.
              You can track negotiation counteroffers in your dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            {/* Price Comparison Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Listed Asking Price</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {formatPrice(listing.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Proposed Price</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  {formatPrice(offerPrice)}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">
                  ({discountPercent}% below asking)
                </span>
              </div>
            </div>

            {/* Offer Price Input */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Offer Amount (in INR)
              </label>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                min={10000}
                required
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Earnest Money Deposit */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Earnest Money Deposit (Booking Token)
              </label>
              <input
                type="number"
                value={tokenDeposit}
                onChange={(e) => setTokenDeposit(Number(e.target.value))}
                min={10000}
                required
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
              />
            </div>

            {/* Contingencies */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Contingencies & Conditions
              </label>
              <textarea
                rows={2}
                value={contingency}
                onChange={(e) => setContingency(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed text-xs"
              />
            </div>

            {/* Expiration */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Offer Validity Window
              </label>
              <select
                value={expiresDays}
                onChange={(e) => setExpiresDays(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              >
                <option value={3}>3 Days (Urgent Decision)</option>
                <option value={7}>7 Days (Standard Market Practice)</option>
                <option value={14}>14 Days (Extended Due Diligence)</option>
              </select>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                All submitted offers are tracked with an immutable audit record and remain confidential
                between the buyer and seller.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:shadow-glow transition-all"
            >
              Transcribe & Submit Offer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
