'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SEED_PROPERTIES } from '@/lib/seedData';
import { UserRole } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import {
  User,
  ShieldCheck,
  Lock,
  Heart,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Settings,
  Building,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, activeRole, setActiveRole, updateProfile, toggle2FA, submitKYC, logout } = useAuth();
  const { formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'favorites' | 'history'>('profile');
  const [username, setUsername] = useState(user?.username || 'alex_estate_user');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [bio, setBio] = useState(user?.bio || 'Real estate enthusiast and developer looking for dream spaces across India.');

  const favoriteListings = SEED_PROPERTIES.slice(0, 2);
  const recentlyViewed = SEED_PROPERTIES.slice(0, 3);

  const availableRoles: { role: UserRole; label: string }[] = [
    { role: 'buyer', label: 'Buyer' },
    { role: 'seller', label: 'Seller / Owner' },
    { role: 'agent', label: 'Real Estate Agent' },
    { role: 'builder', label: 'Builder / Developer' },
    { role: 'landlord', label: 'Landlord' },
    { role: 'moderator', label: 'Moderator' },
    { role: 'admin', label: 'Super Admin' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.username}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {user?.username}
                </h1>
                {user?.isVerified && (
                  <span title="Verified Account">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{user?.email}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Active Persona: {activeRole}
                </span>
                <span className="text-[10px] text-slate-400">KYC: {user?.kycStatus}</span>
              </div>
            </div>
          </div>

          {/* Persona Switcher Buttons */}
          <div className="text-right space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Multi-Role Switcher
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end max-w-xs">
              {availableRoles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => setActiveRole(r.role)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeRole === r.role
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Personal Details
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'security'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Security & KYC
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'favorites'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Saved Collections ({favoriteListings.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Recently Viewed ({recentlyViewed.length})
          </button>
        </div>

        {/* Tab 1: Personal Details */}
        {activeTab === 'profile' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Profile Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Verified Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Bio / Summary</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => {
                updateProfile({ username, phone, bio });
                alert('Profile updated successfully!');
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
            >
              Save Profile Updates
            </button>
          </div>
        )}

        {/* Tab 2: Security & KYC */}
        {activeTab === 'security' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Account Security & Identity Verification (KYC)
            </h3>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                <p className="text-slate-400 text-[11px]">Protect your account with OTP authenticator confirmation</p>
              </div>
              <button
                onClick={toggle2FA}
                className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                  user?.twoFactorEnabled
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* KYC Submission */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Government Identity Verification (KYC)</h4>
                  <p className="text-slate-400 text-[11px]">Aadhaar / Passport / RERA broker registration check</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                  {user?.kycStatus}
                </span>
              </div>

              {user?.kycStatus !== 'verified' && (
                <button
                  onClick={submitKYC}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
                >
                  Submit KYC Verification
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Favorites */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteListings.map((listing) => (
              <div
                key={listing.id}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex gap-3 text-xs"
              >
                <img src={listing.media.coverImage} alt={listing.title} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{listing.title}</h4>
                    <p className="text-slate-400 text-[11px]">{listing.location.locality}, {listing.location.city}</p>
                    <div className="font-bold text-emerald-600 font-mono mt-1">{formatPrice(listing.price)}</div>
                  </div>
                  <Link href={`/listing/${listing.id}`} className="font-bold text-emerald-600 hover:underline">
                    Inspect Property →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Recently Viewed */}
        {activeTab === 'history' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentlyViewed.map((listing) => (
              <div
                key={listing.id}
                className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-2"
              >
                <img src={listing.media.coverImage} alt={listing.title} className="w-full h-28 rounded-2xl object-cover" />
                <h4 className="font-bold text-slate-900 dark:text-white truncate">{listing.title}</h4>
                <div className="text-emerald-600 font-bold font-mono">{formatPrice(listing.price)}</div>
                <Link href={`/listing/${listing.id}`} className="block text-center py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold hover:bg-emerald-600 hover:text-white transition-colors">
                  View Again
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
