import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';
import { SavedSearch } from '@/lib/types';

let savedSearchesStore: SavedSearch[] = [
  {
    id: 'search-1',
    userId: 'u-current',
    name: 'Bangalore 3+ BHK Villas Under ₹6 Cr',
    queryParams: {
      city: 'Bangalore',
      bhk: '3 BHK',
      propertyType: 'villa',
      maxPrice: '60000000',
    },
    alertFrequency: 'instant',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_saved_searches_${ip}`, 60, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    return NextResponse.json(apiSuccess(savedSearchesStore));
  } catch (error: any) {
    console.error('Error fetching saved searches:', error);
    return NextResponse.json(apiError('Failed to fetch saved searches.'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const sanitized = sanitizeObject(rawBody);

    if (!sanitized.name) {
      return NextResponse.json(apiError('Search query name is required'), { status: 400 });
    }

    const newSearch: SavedSearch = {
      id: 'search-' + Math.random().toString(36).substring(2, 9),
      userId: sanitized.userId || 'u-current',
      name: sanitized.name,
      queryParams: sanitized.queryParams || {},
      alertFrequency: sanitized.alertFrequency || 'daily',
      createdAt: new Date().toISOString(),
    };

    savedSearchesStore.unshift(newSearch);
    return NextResponse.json(apiSuccess(newSearch, 'Search alert saved successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Error saving search:', error);
    return NextResponse.json(apiError('Failed to save search.'), { status: 500 });
  }
}
