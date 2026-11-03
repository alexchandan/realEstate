'use client';

import React, { useState } from 'react';
import { PropertyListing } from '@/lib/types';
import { useNotifications } from '@/context/NotificationContext';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ReportModalProps {
  listing: PropertyListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ listing, isOpen, onClose }: ReportModalProps) {
  const { addNotification } = useNotifications();
  const [reason, setReason] = useState('wrong_price');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addNotification({
      userId: 'user-default',
      type: 'moderation',
      title: 'Report Submitted',
      message: `Your report for ${listing.title} has been logged in the moderation queue (SLA: 24h).`,
      read: false,
    });

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Report Listing</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Report Received</h4>
            <p className="text-xs text-slate-500">
              Our moderation team will review this listing within 24 hours under ticket #REP-
              {Date.now().toString().slice(-5)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              >
                <option value="fake_listing">Fake or Scam Listing</option>
                <option value="wrong_price">Inaccurate or Misleading Price</option>
                <option value="already_sold">Property Already Sold / Unavailable</option>
                <option value="duplicate">Duplicate Listing</option>
                <option value="misleading_photos">Misleading or Copyrighted Photos</option>
                <option value="agent_behavior">Unprofessional Agent Conduct</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                Additional Details
              </label>
              <textarea
                rows={3}
                required
                placeholder="Please describe why this listing should be reviewed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors"
            >
              Submit Report for Moderation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
