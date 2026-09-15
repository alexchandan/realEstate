import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';
import { validateOfferInput } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_offers_${ip}`, 60, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const userId = request.nextUrl.searchParams.get('userId') || undefined;
    const offers = await db.getOffers(userId);
    return NextResponse.json(apiSuccess(offers, undefined, { count: offers.length }));
  } catch (error: any) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(apiError('Failed to fetch offers.'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`post_offers_${ip}`, 15, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Too many offers submitted. Please wait.'), { status: 429 });
    }

    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);

    const validation = validateOfferInput(sanitizedBody);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const offer = await db.createOffer(sanitizedBody);
    return NextResponse.json(apiSuccess(offer, 'Digital offer submitted successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Error creating offer:', error);
    return NextResponse.json(apiError('Failed to create offer.'), { status: 500 });
  }
}
