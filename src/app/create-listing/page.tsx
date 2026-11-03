'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/context/NotificationContext';
import { assessFraudRisk } from '@/lib/utils';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bot,
} from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const { addNotification } = useNotifications();

  // Basic Info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState<'sale' | 'rent' | 'lease'>('sale');
  const [propertyType, setPropertyType] = useState('apartment');
  const [price, setPrice] = useState<number>(18500000);

  // Specifications
  const [bhk, setBhk] = useState('3 BHK');
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState(1650);
  const builtUpAreaSqFt = 1950;
  const [superBuiltUpAreaSqFt, setSuperBuiltUpAreaSqFt] = useState(2150);

  // Location
  const [city, setCity] = useState('Bangalore');
  const [locality, setLocality] = useState('Indiranagar');
  const neighborhood = 'Defence Colony';
  const [pinCode, setPinCode] = useState('560038');
  const [landmark, setLandmark] = useState('Near Metro Station');
  const formattedAddress = '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038';

  // India Specifics
  const [reraNumber, setReraNumber] = useState('PRM/KA/RERA/1251/310/PR/230101/005678');
  const [vastuFacing, setVastuFacing] = useState('East');
  const [societyName, setSocietyName] = useState('Prestige Signature Enclave');
  const [maintenanceMonthly, setMaintenanceMonthly] = useState(6500);

  // Amenities Selection
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'High-speed Elevators',
    '24/7 Security',
    'CCTV Surveillance',
    '100% Power Backup',
    'Gym',
    'Swimming Pool',
    'Covered EV Charging Bays',
    'Piped Gas Connection',
  ]);

  // AI Assistant Drafter prompt
  const [aiDraftPrompt, setAiDraftPrompt] = useState(
    'Luxury 3 BHK in Indiranagar Bangalore, Italian marble, East facing Vastu, clubhouse with heated pool, walking distance to metro'
  );
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Photos with AI Room Classification & Quality Score simulation
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      roomType: 'Exterior & Architecture',
      qualityScore: 98,
    },
    {
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      roomType: 'Living Lounge',
      qualityScore: 95,
    },
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      roomType: 'Master Suite',
      qualityScore: 92,
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI Listing Drafter
  const handleAiDraft = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setTitle('The Sovereign Residences - Ultra Luxury 3 BHK Vastu Sky Home');
      setDescription(
        'Step into elevated refinement at The Sovereign Residences. This east-facing, 100% Vastu-compliant 3 BHK home features Italian Bottochino marble flooring, double-glazed soundproof acoustic windows, an imported European modular kitchen, and a private wraparound deck overlooking manicured clubhouse gardens. Walking distance to Indiranagar metro station.'
      );
      setIsGeneratingAi(false);
    }, 1000);
  };

  const handleToggleAmenity = (name: string) => {
    if (selectedAmenities.includes(name)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== name));
    } else {
      setSelectedAmenities([...selectedAmenities, name]);
    }
  };

  const handleSubmit = (status: 'PENDING_REVIEW' | 'DRAFT') => {
    setIsSubmitting(true);

    const fraud = assessFraudRisk({
      price,
      indiaDetails: { carpetAreaSqFt, reraNumber, reraStatus: 'verified', bhk, builtUpAreaSqFt, superBuiltUpAreaSqFt },
      location: { city, locality, pinCode, country: 'India', state: 'Karnataka', neighborhood, street: '', landmark, lat: 12.97, lng: 77.64, formattedAddress },
      media: { imageUrls: photos.map((p) => p.url), coverImage: photos[0]?.url || '' },
      sellerType: 'owner',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      addNotification({
        userId: 'user-default',
        type: 'moderation',
        title: status === 'PENDING_REVIEW' ? 'Listing Submitted for Review' : 'Listing Saved as Draft',
        message: `"${title || 'Your property'}" was saved with fraud risk assessment score: ${fraud.riskScore}/100 (${fraud.riskLevel} risk).`,
        read: false,
        link: '/dashboard',
      });
      alert(`Property listing successfully recorded in lifecycle status: ${status}!`);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Listing Lifecycle Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Post & Publish Real Estate Listing
          </h1>
          <p className="text-xs text-slate-500">
            Create a rich, verified property listing with RERA compliance, taxonomy amenities, and AI drafting.
          </p>
        </div>

        {/* AI Listing Drafter Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-xl mb-8 border border-emerald-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm">AI Listing Drafter</h3>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300">
              Generative AI
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Enter key bullet points or facts about your property, and let AI generate an optimized title, rich
            sales description, and SEO metadata.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aiDraftPrompt}
              onChange={(e) => setAiDraftPrompt(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={handleAiDraft}
              disabled={isGeneratingAi}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGeneratingAi ? 'Drafting...' : 'Auto-Generate'}</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              1. Basic Information & Purpose
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Listing Purpose</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="lease">Commercial Lease</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="apartment">Apartment / Flat</option>
                  <option value="villa">Independent Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="house">Builder Floor</option>
                  <option value="commercial">Commercial Office</option>
                  <option value="plot">Residential Plot</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Price (in INR)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Listing Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Grand Pavilion - Ultra Luxury 3 BHK Sky Residence"
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                Comprehensive Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key selling features, Italian marble flooring, deck view, clubhouse amenities, etc."
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: India-Specific RERA & Area Dimensions */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Dimensions & RERA Compliance (India Requirements)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">BHK Terminology</label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="5+ BHK">5+ BHK / Penthouse</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Carpet Area (Sq.Ft)</label>
                <input
                  type="number"
                  value={carpetAreaSqFt}
                  onChange={(e) => setCarpetAreaSqFt(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Super Built-up (Sq.Ft)</label>
                <input
                  type="number"
                  value={superBuiltUpAreaSqFt}
                  onChange={(e) => setSuperBuiltUpAreaSqFt(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Vastu Facing</label>
                <select
                  value={vastuFacing}
                  onChange={(e) => setVastuFacing(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="East">East</option>
                  <option value="North">North</option>
                  <option value="North-East">North-East</option>
                  <option value="West">West</option>
                  <option value="South">South</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  RERA Registration Number
                </label>
                <input
                  type="text"
                  value={reraNumber}
                  onChange={(e) => setReraNumber(e.target.value)}
                  placeholder="e.g. PRM/KA/RERA/1251/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Society / Project Name</label>
                <input
                  type="text"
                  value={societyName}
                  onChange={(e) => setSocietyName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  Monthly Maintenance (INR)
                </label>
                <input
                  type="number"
                  value={maintenanceMonthly}
                  onChange={(e) => setMaintenanceMonthly(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Hierarchical Location */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              3. Hierarchical Location Details
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Locality</label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">PIN Code</label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Nearest Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Amenities Taxonomy Checklist */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              4. Taxonomy Amenities & Features
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {[
                'High-speed Elevators',
                '24/7 Security',
                'CCTV Surveillance',
                '100% Power Backup',
                'Gym',
                'Swimming Pool',
                'Clubhouse & Banquet',
                'Children Play Zone',
                'Covered EV Charging Bays',
                'Piped Gas Connection',
                '24h Treated Water',
                'Rooftop Terrace',
                'Pet Friendly',
                'Wheelchair Ramp',
              ].map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isChecked
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <span>{amenity}</span>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Media & AI Image Classification */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                5. Media & AI Image Intelligence
              </h3>
              <span className="text-[11px] text-emerald-600 font-semibold">Auto-tagged with room classification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {photos.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-800/60 p-2 space-y-2"
                >
                  <img src={p.url} alt={`Upload ${idx}`} className="w-full h-28 object-cover rounded-xl" />
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{p.roomType}</span>
                    <span className="font-bold text-emerald-600">Score: {p.qualityScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleSubmit('DRAFT')}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 transition-colors"
            >
              Save as Draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit('PENDING_REVIEW')}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors shadow-sm"
            >
              {isSubmitting ? 'Validating Listing...' : 'Submit for Verification & Publication'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
