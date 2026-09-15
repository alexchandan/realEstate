import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';
import { validateListingInput } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_listings_${ip}`, 120, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        apiError('Rate limit exceeded. Please try again shortly.'),
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rateCheck.resetMs / 1000)) } }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get('searchTerm') || undefined;
    const city = searchParams.get('city') || undefined;
    const locality = searchParams.get('locality') || undefined;
    const purpose = searchParams.get('purpose') || undefined;
    const propertyType = searchParams.get('propertyType') || undefined;
    const bhk = searchParams.get('bhk') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const parking = searchParams.get('parking') === 'true' ? true : undefined;
    const readyToMove = searchParams.get('readyToMove') === 'true' ? true : undefined;
    const reraVerified = searchParams.get('reraVerified') === 'true' ? true : undefined;
    const sort = searchParams.get('sort') || undefined;

    const listings = await db.getListings({
      searchTerm,
      city,
      locality,
      purpose,
      propertyType,
      bhk,
      minPrice,
      maxPrice,
      parking,
      readyToMove,
      reraVerified,
      sort,
    });

    return NextResponse.json(apiSuccess(listings, undefined, { total: listings.length }));
  } catch (error: any) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(apiError('Failed to fetch listings.'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`post_listings_${ip}`, 20, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        apiError('Too many submissions. Please slow down.'),
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);

    const validation = validateListingInput(sanitizedBody);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const newListing = await db.createListing(sanitizedBody);
    return NextResponse.json(apiSuccess(newListing, 'Listing created successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Error creating listing:', error);
    return NextResponse.json(apiError('Failed to create listing.'), { status: 500 });
  }
}
