'use client';

import React, { useState } from 'react';
import { PropertyListing } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useToast } from '@/context/ToastContext';
import { X, Copy, Check, MessageCircle, Twitter, Linkedin, QrCode } from 'lucide-react';

interface ShareModalProps {
  listing: PropertyListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ listing, isOpen, onClose }: ShareModalProps) {
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen || !listing) return null;

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/listing/${listing.id}` : '';
  const shareText = `Check out this verified property on Brickly AlexEstate: ${listing.title} for ${formatPrice(listing.price)} located at ${listing.location.locality}, ${listing.location.city}!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast({
      type: 'success',
      title: 'Link Copied to Clipboard',
      message: 'Share URL ready to paste.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            Share this Property
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Property Card Snapshot */}
          <div className="flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <img
              src={listing.media.coverImage}
              alt={listing.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">{listing.title}</h4>
              <p className="text-slate-400 text-[11px] truncate">{listing.location.formattedAddress}</p>
              <p className="font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {formatPrice(listing.price)}
              </p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-semibold hover:scale-105 transition-transform"
            >
              <Twitter className="w-5 h-5 text-sky-500" />
              <span>Twitter / X</span>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold hover:scale-105 transition-transform"
            >
              <Linkedin className="w-5 h-5 text-blue-600" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => setShowQr(!showQr)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold hover:scale-105 transition-transform"
            >
              <QrCode className="w-5 h-5 text-purple-600" />
              <span>QR Code</span>
            </button>
          </div>

          {showQr && (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-2 animate-fade-in">
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-inner">
                {/* SVG QR Code Simulation */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-slate-900 rounded">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${(i * 7) % 3 === 0 ? 'bg-white' : 'bg-transparent'} rounded-sm`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500">Scan with your phone to open instantly</p>
            </div>
          )}

          {/* Copy Direct Link */}
          <div className="flex items-center gap-2 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent border-none text-xs text-slate-600 dark:text-slate-300 focus:outline-none px-2 truncate"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
