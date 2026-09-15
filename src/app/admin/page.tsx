'use client';

import React, { useState } from 'react';
import { SEED_PROPERTIES, SEED_USERS } from '@/lib/seedData';
import { PropertyListing, UserProfile, AuditLogEntry } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useToast } from '@/context/ToastContext';
import { exportToCSV } from '@/lib/exportCsv';
import {
  ShieldCheck,
  Users,
  Building2,
  AlertTriangle,
  FileCheck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Check,
  X,
  Lock,
  Download,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'moderation' | 'users' | 'reports' | 'audit_logs'>('moderation');

  const [listings, setListings] = useState<PropertyListing[]>(SEED_PROPERTIES);
  const [users, setUsers] = useState<UserProfile[]>(SEED_USERS);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'aud-1',
      actorId: 'admin-super',
      actorName: 'Chandan Admin',
      actorRole: 'super_admin',
      action: 'APPROVE_LISTING',
      entityType: 'PropertyListing',
      entityId: 'prop-1',
      previousValue: 'PENDING_REVIEW',
      newValue: 'ACTIVE',
      timestamp: 'Today at 10:45 AM',
    },
    {
      id: 'aud-2',
      actorId: 'mod-1',
      actorName: 'Priya Moderator',
      actorRole: 'moderator',
      action: 'KYC_VERIFICATION',
      entityType: 'UserProfile',
      entityId: 'user-default',
      previousValue: 'pending',
      newValue: 'verified',
      timestamp: 'Today at 09:30 AM',
    },
  ]);

  const handleApprove = (listingId: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, status: 'APPROVED' } : l))
    );
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      actorId: 'admin-super',
      actorName: 'Chandan Admin',
      actorRole: 'admin',
      action: 'APPROVE_LISTING',
      entityType: 'PropertyListing',
      entityId: listingId,
      previousValue: 'PENDING_REVIEW',
      newValue: 'APPROVED',
      timestamp: 'Just now',
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast({
      type: 'success',
      title: 'Listing Approved & Published',
      message: `Listing ${listingId} is verified and visible to all buyers.`,
    });
  };

  const handleReject = (listingId: string) => {
    const reason = prompt('Rejection Reason:') || 'Incomplete RERA documentation';
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, status: 'REJECTED' } : l))
    );
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      actorId: 'admin-super',
      actorName: 'Chandan Admin',
      actorRole: 'admin',
      action: 'REJECT_LISTING',
      entityType: 'PropertyListing',
      entityId: listingId,
      previousValue: 'PENDING_REVIEW',
      newValue: `REJECTED (${reason})`,
      timestamp: 'Just now',
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast({
      type: 'warning',
      title: 'Listing Rejected',
      message: `Reason: ${reason}`,
    });
  };

  const handleExportAuditTrail = () => {
    exportToCSV(auditLogs, `audit-trail-${new Date().toISOString().split('T')[0]}.csv`, [
      { key: 'timestamp', header: 'Timestamp' },
      { key: 'actorName', header: 'Actor Name' },
      { key: 'actorRole', header: 'Role' },
      { key: 'action', header: 'Action' },
      { key: 'entityType', header: 'Entity Type' },
      { key: 'entityId', header: 'Entity ID' },
      { key: 'previousValue', header: 'Previous Value' },
      { key: 'newValue', header: 'New Value' },
    ]);
    showToast({
      type: 'success',
      title: 'Audit Logs Exported',
      message: `${auditLogs.length} immutable compliance records downloaded.`,
    });
  };

  const handleToggleUserVerification = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isVerified: !u.isVerified } : u))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Executive Platform Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Super Admin & Moderation Queue
            </h1>
            <p className="text-xs text-slate-500">
              Audit property listings, verify agent identities, process user reports, and inspect system audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAuditTrail}
              className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all inline-flex items-center gap-1.5 shadow-sm"
              title="Download RFC 4180 CSV export of platform audit trail"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export Audit Trail</span>
            </button>
          </div>
        </div>

        {/* Platform KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Platform Listings
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {listings.length}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">100% RERA Verified</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pending Moderation
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">2</div>
            <span className="text-[10px] text-slate-400 block">SLA: Under 12 hours</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Registered Users
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {users.length}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">KYC Verified</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Open Flagged Reports
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-500 font-mono">0</div>
            <span className="text-[10px] text-emerald-600 font-semibold block">Queue is clear</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'moderation'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Listing Moderation Queue
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'users'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            User & Agent Verification
          </button>

          <button
            onClick={() => setActiveTab('audit_logs')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'audit_logs'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Immutable Audit Trail ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Moderation Queue */}
        {activeTab === 'moderation' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="p-4">Listing Spec</th>
                    <th className="p-4">Seller & Type</th>
                    <th className="p-4">Fraud Risk</th>
                    <th className="p-4">RERA Badge</th>
                    <th className="p-4">Moderation Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {listings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.media.coverImage}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white truncate block">
                              {item.title}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {formatPrice(item.price)} • {item.location.city}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-slate-900 dark:text-white block">{item.sellerName}</span>
                        <span className="text-[11px] text-slate-400 capitalize">{item.sellerType}</span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            item.fraudAssessment.riskLevel === 'low'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.fraudAssessment.riskLevel} ({item.fraudAssessment.riskScore}/100)
                        </span>
                      </td>

                      <td className="p-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {item.indiaDetails.reraNumber}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: User Governance */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Roles</th>
                    <th className="p-4">KYC Status</th>
                    <th className="p-4">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.username} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{u.username}</span>
                            <span className="text-slate-400 text-[11px]">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {u.roles.map((r) => (
                            <span
                              key={r}
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          {u.kycStatus}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleToggleUserVerification(u.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                            u.isVerified
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.isVerified ? '✓ Verified Agent' : 'Verify Account'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Immutable Audit Trail */}
        {activeTab === 'audit_logs' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs divide-y divide-slate-100 dark:divide-slate-800">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 uppercase">
                      {log.entityType} #{log.entityId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Actor: <strong className="text-slate-600 dark:text-slate-300">{log.actorName}</strong> ({log.actorRole}) • Changed from &quot;{log.previousValue}&quot; to &quot;{log.newValue}&quot;
                  </p>
                </div>

                <div className="text-right text-[11px] text-slate-400 shrink-0">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
