'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SEED_PROPERTIES } from '@/lib/seedData';
import { PropertyListing, ListingLifecycle } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useNotifications } from '@/context/NotificationContext';
import { PaymentModal } from '@/components/PaymentModal';
import {
  Building,
  Eye,
  Users,
  Calendar,
  Tag,
  PlusCircle,
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  Wrench,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';

export default function DashboardPage() {
  const { formatPrice } = useCurrency();
  const { addNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState<'listings' | 'visits' | 'offers' | 'property_mgmt'>('listings');
  const [myListings, setMyListings] = useState<PropertyListing[]>(SEED_PROPERTIES);
  const [boostListing, setBoostListing] = useState<PropertyListing | null>(null);

  // Status transition handler
  const handleStatusChange = (listingId: string, newStatus: ListingLifecycle) => {
    setMyListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, status: newStatus } : l))
    );
    addNotification({
      userId: 'user-default',
      type: 'system',
      title: 'Listing Status Updated',
      message: `Listing status transitioned to ${newStatus}.`,
      read: false,
    });
  };

  const totalViews = myListings.reduce((acc, l) => acc + l.viewsCount, 0);
  const totalInquiries = myListings.reduce((acc, l) => acc + l.inquiriesCount, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <Building className="w-4 h-4" />
              <span>Seller & Landlord Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Seller Dashboard & Operations
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage inventory, inbound inquiries, negotiation counteroffers, and tenant rental leases.
            </p>
          </div>

          <Link
            href="/create-listing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Property</span>
          </Link>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Inventory
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {myListings.length}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">All RERA Registered</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Impressions & Views
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalViews.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">+18.4% this month</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Direct Buyer Inquiries
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {totalInquiries}
            </div>
            <span className="text-[10px] text-slate-400 block">Avg reply time: 18 mins</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Scheduled Site Tours
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">12</div>
            <span className="text-[10px] text-blue-600 font-semibold block">4 confirmed this week</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'listings'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            My Listings ({myListings.length})
          </button>

          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'visits'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Tour Appointments (2)
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'offers'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Active Offers & Negotiations (1)
          </button>

          <button
            onClick={() => setActiveTab('property_mgmt')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'property_mgmt'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Property Mgmt & Leases
          </button>
        </div>

        {/* Tab 1: Listings Table */}
        {activeTab === 'listings' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="p-4">Property</th>
                    <th className="p-4">Asking Price</th>
                    <th className="p-4">Lifecycle State</th>
                    <th className="p-4">Stats</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {myListings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.media.coverImage}
                            alt={item.title}
                            className="w-14 h-14 rounded-2xl object-cover shrink-0"
                          />
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/listing/${item.id}`}
                              className="font-bold text-slate-900 dark:text-white truncate block hover:text-emerald-600"
                            >
                              {item.title}
                            </Link>
                            <span className="text-slate-400 text-[11px]">
                              {item.location.locality}, {item.location.city} • {item.indiaDetails.bhk}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-black text-emerald-600 font-mono text-sm">
                        {formatPrice(item.price)}
                      </td>

                      <td className="p-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as ListingLifecycle)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="UNDER_OFFER">UNDER_OFFER</option>
                          <option value="SOLD">SOLD</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </td>

                      <td className="p-4 text-[11px] text-slate-500">
                        <div>Views: <strong className="text-slate-900 dark:text-white">{item.viewsCount}</strong></div>
                        <div>Inquiries: <strong className="text-emerald-600">{item.inquiriesCount}</strong></div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setBoostListing(item)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 font-bold flex items-center gap-1 transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Boost</span>
                          </button>

                          <Link
                            href={`/listing/${item.id}`}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Tour Appointments */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                  Confirmed Site Tour
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  The Grand Pavilion - Ultra Luxury 3 BHK
                </h4>
                <p className="text-slate-500">
                  Buyer: Alex Estate User (+91 98765 43210) • In-person Tour
                </p>
                <div className="flex items-center gap-2 text-slate-400 font-semibold pt-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saturday, March 15, 2025 at 11:00 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Tour marked as completed!')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Offers & Negotiations */}
        {activeTab === 'offers' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                  Counteroffer Pending
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  The Grand Pavilion Sky Residence
                </h4>
                <p className="text-slate-400">Buyer: Alex Estate User (chandan@example.com)</p>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[11px] block">Offered Amount:</span>
                <span className="text-base font-black text-emerald-600 font-mono">₹2.38 Cr</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-bold">Contingency:</span>
              <p>Subject to bank loan sanction within 21 days and clear title deed verification.</p>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => alert('Counteroffer accepted!')}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
              >
                Accept ₹2.38 Cr
              </button>
              <button
                onClick={() => alert('Counteroffer sent to buyer at ₹2.42 Cr!')}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50"
              >
                Counter at ₹2.42 Cr
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Property Management & Landlord Portal */}
        {activeTab === 'property_mgmt' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Landlord Property & Tenancy Portal
                </h3>
                <p className="text-slate-400">Track active rental agreements, rent collection, and maintenance</p>
              </div>
              <button
                onClick={() => alert('Lease agreement creation wizard opened')}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
              >
                + New Lease Agreement
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Skyline Heights (Unit 902)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Rent Paid (March)
                  </span>
                </div>
                <p className="text-slate-400">Tenant: Priya Sundaram • ₹45,000 / month</p>
                <div className="pt-2 flex justify-between text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800">
                  <span>Lease ends: Dec 2025</span>
                  <span className="text-emerald-600 font-bold">Deposit: ₹2.5 L held</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Maintenance Ticket #MT-842</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    In Progress
                  </span>
                </div>
                <p className="text-slate-400">Geyser inspection requested by tenant in master bath.</p>
                <div className="pt-2 flex justify-between text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800">
                  <span>Assigned: UrbanPlumber Pro</span>
                  <button onClick={() => alert('Ticket resolved')} className="text-emerald-600 font-bold">
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Boost Featured Payment Modal */}
      {boostListing && (
        <PaymentModal
          itemTitle={`Feature Boost: ${boostListing.title}`}
          itemDescription="Pin listing to top of search results and homepage for 30 days"
          priceInINR={1999}
          isOpen={!!boostListing}
          onClose={() => setBoostListing(null)}
          onSuccess={() => {
            setBoostListing(null);
            alert('Listing boosted to Featured placement for 30 days!');
          }}
        />
      )}
    </div>
  );
}
