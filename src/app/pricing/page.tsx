'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { PaymentModal } from '@/components/PaymentModal';
import { Sparkles, Check, ShieldCheck, Zap, Building } from 'lucide-react';

export default function PricingPage() {
  const { formatPrice } = useCurrency();
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; desc: string; price: number } | null>(
    null
  );

  const plans = [
    {
      name: 'Free Starter',
      badge: 'Individual',
      price: 0,
      description: 'Ideal for individual owners and first-time property sellers.',
      features: [
        'Post up to 2 free listings',
        'Basic search visibility',
        'Standard buyer inquiries via chat',
        'Mobile responsive dashboard',
      ],
      isPopular: false,
    },
    {
      name: 'Pro Real Estate Agent',
      badge: 'Most Popular',
      price: 2499,
      description: 'Built for independent brokers & high-volume top producers.',
      features: [
        'Post up to 25 verified listings',
        'Featured placement on locality landing pages',
        'Full Real Estate Kanban CRM pipeline',
        'Direct WhatsApp & phone lead capture',
        'Interactive 360° virtual tour hosting',
        'Dedicated agent profile badge with reviews',
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise Agency & Builder',
      badge: 'Corporate',
      price: 7999,
      description: 'For corporate brokerages, builders, and developer sales teams.',
      features: [
        'Unlimited master listings & projects',
        'Multi-agent team roster with role permissions',
        'Tower & floor inventory hierarchy manager',
        'Automated CRM lead routing & scoring',
        'API access for inventory feeds',
        'Dedicated 24/7 account manager',
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monetization & Plans</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Transparent Pricing for Agents & Developers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Supercharge your inventory visibility with AI listing distribution, verified badges, and enterprise
            team CRM tools.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-slate-900 to-slate-850 text-white border-2 border-emerald-500 shadow-2xl scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      plan.isPopular ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold tracking-tight">{plan.name}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="my-6">
                  <div className="text-4xl font-black font-mono">
                    {formatPrice(plan.price)}
                    <span className="text-xs font-normal opacity-70"> / month</span>
                  </div>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 text-xs">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-200/20">
                <button
                  onClick={() =>
                    setSelectedPlan({
                      title: plan.name,
                      desc: plan.description,
                      price: plan.price,
                    })
                  }
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all ${
                    plan.isPopular
                      ? 'bg-brand-900 text-white hover:bg-brand-850 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100 shadow-sm'
                      : 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:opacity-90'
                  }`}
                >
                  {plan.price === 0 ? 'Current Free Tier' : 'Upgrade Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <PaymentModal
          itemTitle={selectedPlan.title}
          itemDescription={selectedPlan.desc}
          priceInINR={selectedPlan.price}
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => {
            setSelectedPlan(null);
            alert(`Subscription to ${selectedPlan.title} confirmed!`);
          }}
        />
      )}
    </div>
  );
}
