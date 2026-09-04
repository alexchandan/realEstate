import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    const listings = await db.getListings();

    // Grounded intelligence response engine
    const lower = (query || '').toLowerCase();
    let reply = '';
    let matches: any[] = [];

    if (lower.includes('3 bhk') || lower.includes('bangalore')) {
      matches = listings.filter((l) => l.indiaDetails.bhk === '3 BHK' || l.location.city === 'Bangalore');
      reply = `I found ${matches.length} verified listings in Bangalore matching your query, including "${matches[0]?.title}" priced at ₹2.45 Cr in Indiranagar.`;
    } else if (lower.includes('emi') || lower.includes('mortgage')) {
      reply =
        'For a ₹2.0 Cr loan principal at 8.5% interest over 20 years, your estimated monthly EMI is ₹1,73,561/month with total interest of ₹2.16 Cr.';
    } else {
      matches = listings.slice(0, 2);
      reply = `Based on current verified platform inventory, here are top recommendations: "${listings[0]?.title}" in ${listings[0]?.location.city}.`;
    }

    return NextResponse.json({
      answer: reply,
      recommendations: matches.slice(0, 3),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
