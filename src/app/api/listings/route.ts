import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
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

    return NextResponse.json(listings);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newListing = await db.createListing(body);
    return NextResponse.json(newListing, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
