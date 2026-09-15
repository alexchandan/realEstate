import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_listing_detail_${ip}`, 120, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const { id } = await params;
    const listing = await db.getListingById(id);
    if (!listing) {
      return NextResponse.json(apiError('Listing not found'), { status: 404 });
    }
    return NextResponse.json(apiSuccess(listing));
  } catch (error: any) {
    console.error(`Error fetching listing:`, error);
    return NextResponse.json(apiError('Failed to fetch listing detail.'), { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`put_listing_${ip}`, 30, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const { id } = await params;
    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);

    const updated = await db.updateListing(id, sanitizedBody);
    if (!updated) {
      return NextResponse.json(apiError('Listing not found to update.'), { status: 404 });
    }
    return NextResponse.json(apiSuccess(updated, 'Listing updated successfully'));
  } catch (error: any) {
    console.error(`Error updating listing:`, error);
    return NextResponse.json(apiError('Failed to update listing.'), { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`delete_listing_${ip}`, 20, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const { id } = await params;
    const deleted = await db.deleteListing(id);
    if (!deleted) {
      return NextResponse.json(apiError('Listing not found to delete.'), { status: 404 });
    }
    return NextResponse.json(apiSuccess({ deleted: true }, 'Listing removed successfully'));
  } catch (error: any) {
    console.error(`Error deleting listing:`, error);
    return NextResponse.json(apiError('Failed to delete listing.'), { status: 500 });
  }
}
