'use client';

import React, { useState } from 'react';
import { PropertyListing } from '@/lib/types';
import { useNotifications } from '@/context/NotificationContext';
import { useToast } from '@/context/ToastContext';
import { X, Calendar, Clock, Video, MapPin, CheckCircle2, User, Phone, Mail } from 'lucide-react';

interface ScheduleVisitModalProps {
  listing: PropertyListing;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({ listing, isOpen, onClose }: ScheduleVisitModalProps) {
  const { addNotification } = useNotifications();
  const { showToast } = useToast();
  const [mode, setMode] = useState<'in-person' | 'virtual'>('in-person');
  const [date, setDate] = useState('2025-03-15');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [name, setName] = useState('Alex Estate User');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('chandan@example.com');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    addNotification({
      userId: 'user-default',
      type: 'visit',
      title: 'Site Visit Requested',
      message: `Your ${mode} visit for ${listing.title} on ${date} at ${timeSlot} was submitted to ${listing.sellerName}.`,
      read: false,
      link: `/listing/${listing.id}`,
    });

    showToast({
      type: 'success',
      title: 'Tour Confirmed with Agent',
      message: `${mode === 'virtual' ? 'Live Video Tour' : 'Site Walkthrough'} scheduled for ${date} (${timeSlot}).`,
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  const slots = [
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM',
    '04:30 PM - 05:30 PM',
    '06:00 PM - 07:00 PM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Schedule a Property Tour
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
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">Visit Tour Requested!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {listing.sellerName} has been notified and will confirm your {mode} tour for {date} at{' '}
              {timeSlot}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            {/* Mode selection */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Tour Experience
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('in-person')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    mode === 'in-person'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>In-Person Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('virtual')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    mode === 'virtual'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Live Video Tour</span>
                </button>
              </div>
            </div>

            {/* Date and Time slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Select Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                  Special Notes or Requirements (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please arrange access to the rooftop pool and parking bay"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:shadow-glow transition-all"
            >
              Confirm Tour Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
