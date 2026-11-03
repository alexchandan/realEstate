'use client';

import React, { useState } from 'react';
import { SEED_LEADS } from '@/lib/seedData';
import { CRMLead } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useToast } from '@/context/ToastContext';
import { exportToCSV } from '@/lib/exportCsv';
import {
  Kanban,
  PlusCircle,
  Download,
} from 'lucide-react';

export default function AgentCrmPage() {
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();
  const [leads, setLeads] = useState<CRMLead[]>(SEED_LEADS);

  const handleExportLeads = () => {
    exportToCSV(leads, `leads-pipeline-${new Date().toISOString().split('T')[0]}.csv`, [
      { key: 'clientName', header: 'Client Name' },
      { key: 'clientPhone', header: 'Phone' },
      { key: 'clientEmail', header: 'Email' },
      { key: 'budget', header: 'Budget (INR)' },
      { key: 'stage', header: 'Pipeline Stage' },
      { key: 'score', header: 'Lead Score' },
      { key: 'propertyInterest', header: 'Property Interest' },
    ]);
    showToast({
      type: 'success',
      title: 'CSV Pipeline Exported',
      message: `${leads.length} active leads downloaded to CSV file.`,
    });
  };

  const stages: CRMLead['stage'][] = [
    'New',
    'Contacted',
    'Interested',
    'Viewing',
    'Negotiating',
    'Closed',
  ];

  const handleStageChange = (leadId: string, newStage: CRMLead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  const totalPipelineValue = leads.reduce((acc, l) => acc + l.budget, 0);
  const estimatedCommission = Math.round(totalPipelineValue * 0.02); // 2% brokerage

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <Kanban className="w-4 h-4" />
              <span>Agent Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Real Estate CRM & Deal Pipeline
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage client inquiries, site visit follow-ups, negotiations, and track projected commissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportLeads}
              className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all inline-flex items-center gap-1.5 shadow-sm"
              title="Download RFC 4180 CSV export of pipeline leads"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                const name = prompt('Client Name:');
                if (!name) return;
                const newLead: CRMLead = {
                  id: `lead-${Date.now()}`,
                  agentId: 'user-default',
                  clientName: name,
                  clientEmail: `${name.toLowerCase().replace(' ', '')}@example.com`,
                  clientPhone: '+91 98000 12345',
                  budget: 20000000,
                  propertyInterest: 'Luxury 3 BHK in Bangalore',
                  stage: 'New',
                  score: 'Hot',
                  lastActivity: 'Added via CRM pipeline',
                  notes: ['Initial client requirement recorded'],
                };
                setLeads([newLead, ...leads]);
                showToast({
                  type: 'success',
                  title: 'New Lead Added',
                  message: `${name} has been enrolled in your pipeline.`,
                });
              }}
              className="px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Deal Lead</span>
            </button>
          </div>
        </div>

        {/* Agency & Performance Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Pipeline Value
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {formatPrice(totalPipelineValue)}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">{leads.length} Active Leads</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Projected Commission (2%)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {formatPrice(estimatedCommission)}
            </div>
            <span className="text-[10px] text-slate-400 block">Based on current active negotiations</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Agent Performance Rating
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">4.95 ★</div>
            <span className="text-[10px] text-slate-400 block">34 Verified Client Reviews</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Agency Team Roster
            </span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">6 Agents</div>
            <span className="text-[10px] text-indigo-600 font-semibold block">Alex & Brickly Advisors</span>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 min-w-[1100px]">
            {stages.map((stage) => {
              const stageLeads = leads.filter((l) => l.stage === stage);

              return (
                <div
                  key={stage}
                  className="rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col justify-between min-h-[500px]"
                >
                  <div>
                    {/* Stage Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                        {stage}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {stageLeads.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="space-y-3">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate">
                              {lead.clientName}
                            </h4>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                lead.score === 'Hot'
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                            >
                              {lead.score}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 line-clamp-2">
                            {lead.propertyInterest}
                          </p>

                          <div className="text-xs font-black text-emerald-600 font-mono">
                            {formatPrice(lead.budget)}
                          </div>

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 space-y-1">
                            <div className="truncate">📞 {lead.clientPhone}</div>
                            <div className="truncate">⏱ {lead.lastActivity}</div>
                          </div>

                          {/* Stage Mover Selector */}
                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Move:</span>
                            <select
                              value={lead.stage}
                              onChange={(e) =>
                                handleStageChange(lead.id, e.target.value as CRMLead['stage'])
                              }
                              className="px-2 py-1 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                            >
                              {stages.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
