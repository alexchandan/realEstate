import { NextRequest, NextResponse } from 'next/server';
import { apiSuccess, apiError } from '@/lib/security';
import { SEED_PROPERTIES } from '@/lib/seedData';

export async function GET(request: NextRequest) {
  try {
    const totalListings = SEED_PROPERTIES.length;
    const totalGtv = SEED_PROPERTIES.reduce((acc, p) => acc + p.price, 0);
    const avgPrice = Math.round(totalGtv / (totalListings || 1));
    const reraVerifiedCount = SEED_PROPERTIES.filter((p) => p.indiaDetails.reraStatus === 'verified').length;
    const featuredCount = SEED_PROPERTIES.filter((p) => p.isFeatured).length;

    const cityBreakdown = SEED_PROPERTIES.reduce((acc: Record<string, number>, p) => {
      acc[p.location.city] = (acc[p.location.city] || 0) + 1;
      return acc;
    }, {});

    const stats = {
      overview: {
        totalListings,
        activeListings: totalListings,
        grossTransactionValueINR: totalGtv,
        averagePriceINR: avgPrice,
        reraVerifiedRatio: Math.round((reraVerifiedCount / totalListings) * 100),
        featuredCount,
      },
      leadMetrics: {
        totalInquiriesMonth: 428,
        conversionToTour: '38.4%',
        offerClosingRatio: '14.2%',
        avgDaysOnMarket: 28,
      },
      localityDistribution: cityBreakdown,
      marketTrends: [
        { month: 'Jan', volumeCr: 142, inquiries: 320 },
        { month: 'Feb', volumeCr: 185, inquiries: 390 },
        { month: 'Mar', volumeCr: 210, inquiries: 428 },
      ],
    };

    return NextResponse.json(apiSuccess(stats));
  } catch (error: any) {
    console.error('Error computing analytics:', error);
    return NextResponse.json(apiError('Failed to compute analytics.'), { status: 500 });
  }
}
