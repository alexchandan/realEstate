import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';
import { validateVisitInput } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_visits_${ip}`, 60, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const userId = request.nextUrl.searchParams.get('userId') || undefined;
    const visits = await db.getVisits(userId);
    return NextResponse.json(apiSuccess(visits, undefined, { count: visits.length }));
  } catch (error: any) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(apiError('Failed to fetch scheduled visits.'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`post_visits_${ip}`, 15, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Too many appointment requests. Please wait.'), { status: 429 });
    }

    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);

    const validation = validateVisitInput(sanitizedBody);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const visit = await db.createVisit(sanitizedBody);
    return NextResponse.json(apiSuccess(visit, 'Property visit booked successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Error creating visit:', error);
    return NextResponse.json(apiError('Failed to schedule visit.'), { status: 500 });
  }
}
