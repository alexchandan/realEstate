'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsRibbon } from '@/components/landing/StatsRibbon';
import { EcosystemFeatures } from '@/components/landing/EcosystemFeatures';
import { CuratedPropertiesSection } from '@/components/landing/CuratedPropertiesSection';
import { VirtualTourSpotlight } from '@/components/landing/VirtualTourSpotlight';
import { MortgageCalculatorPreview } from '@/components/landing/MortgageCalculatorPreview';
import { BuilderProjectsShowcase } from '@/components/landing/BuilderProjectsShowcase';
import { InvestmentCorridorsSection } from '@/components/landing/InvestmentCorridorsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { LandingCtaBanner } from '@/components/landing/LandingCtaBanner';
import { ShareModal } from '@/components/ShareModal';
import { SEED_PROPERTIES, SEED_BUILDER_PROJECTS, SEED_REVIEWS } from '@/lib/seedData';
import { PropertyListing } from '@/lib/types';

export default function HomePage() {
  const [shareListing, setShareListing] = useState<PropertyListing | null>(null);

  // Spotlight properties for the hero card (luxury featured homes)
  const spotlightProperties = SEED_PROPERTIES.filter(
    (p) => p.isFeatured || p.isPromoted
  );

  return (
    <div className="flex flex-col min-h-screen bg-stone-50/30 dark:bg-stone-950">
      {/* 1. Hero Section with Structured Filter Hub & Luxury Spotlight Card */}
      <HeroSection spotlightProperties={spotlightProperties} />

      {/* 2. Trust Metrics & Transacted Volume Ribbon */}
      <StatsRibbon />

      {/* 3. Core Ecosystem Architectural Pillars (Why Brickly) */}
      <EcosystemFeatures />

      {/* 4. Curated Verified Properties with Dynamic Category Tabs */}
      <CuratedPropertiesSection
        allProperties={SEED_PROPERTIES}
        onShareListing={(listing) => setShareListing(listing)}
      />

      {/* 5. Live Interactive 360° Virtual Tour Experience Spotlight */}
      <VirtualTourSpotlight />

      {/* 6. Smart Financial Intelligence & Mortgage Breakdown Simulator */}
      <MortgageCalculatorPreview />

      {/* 7. Mega Builder Projects & Live Milestone Construction Progress */}
      <BuilderProjectsShowcase projects={SEED_BUILDER_PROJECTS} />

      {/* 8. Prime Investment Corridors & Micro-Market Heatmaps */}
      <InvestmentCorridorsSection />

      {/* 9. Authenticated Buyer & NRI Testimonials */}
      <TestimonialsSection reviews={SEED_REVIEWS} />

      {/* 10. High-Impact Closing Advisory & Listing CTA */}
      <LandingCtaBanner />

      {/* Shared Social Share Modal */}
      <ShareModal
        listing={shareListing}
        isOpen={!!shareListing}
        onClose={() => setShareListing(null)}
      />
    </div>
  );
}
