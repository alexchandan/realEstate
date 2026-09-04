'use client';

import React, { useState } from 'react';
import { SEED_BUILDER_PROJECTS } from '@/lib/seedData';
import { BuilderProject } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PlusCircle,
  BarChart3,
  Layers,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export default function BuilderProjectsPage() {
  const { formatPrice } = useCurrency();
  const [projects, setProjects] = useState<BuilderProject[]>(SEED_BUILDER_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<BuilderProject>(SEED_BUILDER_PROJECTS[0]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <Building2 className="w-4 h-4" />
              <span>Enterprise Builder Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Developer Projects & Tower Inventory
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage developer master projects, tower structural milestones, unit inventory, and RERA disclosures.
            </p>
          </div>

          <button
            onClick={() => alert('New Developer Project Creation Modal Opened')}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:shadow-glow transition-all inline-flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Master Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Active Developer Projects
            </h3>
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer text-xs space-y-2 ${
                  selectedProject.id === proj.id
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                    {proj.projectName}
                  </span>
                  <span className="font-bold text-emerald-600">
                    {proj.constructionProgressPercent}% Done
                  </span>
                </div>

                <p className="text-slate-500 text-[11px]">{proj.developerName} • {proj.location}</p>

                <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="truncate">{proj.reraNumber}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${proj.constructionProgressPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Project Tower & Floor Hierarchy */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs">
            {/* Top Specs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                  {selectedProject.developerName}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedProject.projectName}
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">{selectedProject.location}</p>
              </div>

              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Starting From</span>
                <span className="text-xl font-black text-emerald-600 font-mono">
                  {formatPrice(selectedProject.startingPrice)}
                </span>
              </div>
            </div>

            {/* Hierarchy Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Towers / Wings</span>
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                  {selectedProject.totalTowers} Towers
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Total Units</span>
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                  {selectedProject.totalUnits}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Available Units</span>
                <span className="text-lg font-black text-emerald-600 font-mono">
                  {selectedProject.availableUnits} Available
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Possession</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {selectedProject.completionDate}
                </span>
              </div>
            </div>

            {/* Construction Progress Milestones */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Construction Milestone Tracking (RERA Audited)
              </h4>

              <div className="space-y-3">
                {selectedProject.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          m.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {m.completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{m.title}</h5>
                        <span className="text-[11px] text-slate-400">{m.date}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        m.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {m.completed ? 'Completed' : 'Scheduled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
