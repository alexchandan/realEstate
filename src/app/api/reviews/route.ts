import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';
import { validateReviewInput } from '@/lib/validations';
import { Review } from '@/lib/types';

// In-memory runtime review store
const reviewsStore: Review[] = [
  {
    id: 'rev-1',
    targetId: 'prop-1',
    targetType: 'project',
    authorId: 'u-101',
    authorName: 'Rohan Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    categories: {
      communication: 5,
      responsiveness: 5,
      transparency: 5,
      marketKnowledge: 5,
    },
    comment: 'The attention to detail in the Italian marble flooring and the private plunge pool is unparalleled. RERA documentation was crystal clear.',
    verifiedBuyer: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'rev-2',
    targetId: 'prop-1',
    targetType: 'project',
    authorId: 'u-102',
    authorName: 'Ananya Rao',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    categories: {
      communication: 5,
      responsiveness: 4.5,
      transparency: 5,
      marketKnowledge: 4.8,
    },
    comment: 'Smooth virtual tour experience and prompt response from the agent. Vastu compliance is accurately mapped.',
    verifiedBuyer: true,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_reviews_${ip}`, 100, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const targetId = request.nextUrl.searchParams.get('targetId');
    const filtered = targetId ? reviewsStore.filter((r) => r.targetId === targetId) : reviewsStore;

    return NextResponse.json(apiSuccess(filtered, undefined, { count: filtered.length }));
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(apiError('Failed to fetch reviews.'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`post_review_${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Too many reviews submitted. Please wait.'), { status: 429 });
    }

    const rawBody = await request.json();
    const sanitized = sanitizeObject(rawBody);

    const validation = validateReviewInput(sanitized);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const newReview: Review = {
      id: 'rev-' + Math.random().toString(36).substring(2, 9),
      targetId: sanitized.targetId,
      targetType: sanitized.targetType || 'project',
      authorId: sanitized.userId || 'u-anon',
      authorName: sanitized.userName,
      authorAvatar: sanitized.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: sanitized.rating,
      categories: {
        communication: 5,
        responsiveness: 5,
        transparency: 5,
        marketKnowledge: 5,
      },
      comment: sanitized.comment,
      verifiedBuyer: true,
      createdAt: new Date().toISOString(),
    };

    reviewsStore.unshift(newReview);
    return NextResponse.json(apiSuccess(newReview, 'Review submitted successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return NextResponse.json(apiError('Failed to submit review.'), { status: 500 });
  }
}
