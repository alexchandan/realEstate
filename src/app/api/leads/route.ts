import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';
import { validateLeadInput } from '@/lib/validations';
import { CRMLead } from '@/lib/types';
import { SEED_LEADS } from '@/lib/seedData';

// In-memory CRM leads store initialized from seed
let leadsStore: CRMLead[] = [...SEED_LEADS];

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`get_leads_${ip}`, 80, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Rate limit exceeded.'), { status: 429 });
    }

    const stage = request.nextUrl.searchParams.get('stage');
    const filtered = stage ? leadsStore.filter((l) => l.stage === stage) : leadsStore;

    return NextResponse.json(apiSuccess(filtered, undefined, { count: filtered.length }));
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(apiError('Failed to fetch CRM leads.'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`post_leads_${ip}`, 20, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Too many inquiries submitted. Please wait.'), { status: 429 });
    }

    const rawBody = await request.json();
    const sanitized = sanitizeObject(rawBody);

    const validation = validateLeadInput(sanitized);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const newLead: CRMLead = {
      id: 'lead-' + Math.random().toString(36).substring(2, 9),
      agentId: sanitized.agentId || 'agent-alex',
      clientName: sanitized.name,
      clientEmail: sanitized.email || 'not-provided@example.com',
      clientPhone: sanitized.phone,
      budget: sanitized.budget || 25000000,
      propertyInterest: sanitized.propertyInterest || 'Luxury Residential Property',
      stage: sanitized.stage || 'New',
      score: sanitized.score || 'Hot',
      lastActivity: 'Inquiry received via web direct connect',
      notes: sanitized.notes ? [sanitized.notes] : ['Initial inquiry captured'],
    };

    leadsStore.unshift(newLead);
    return NextResponse.json(apiSuccess(newLead, 'Inquiry submitted to agent successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json(apiError('Failed to record inquiry.'), { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const { id, stage, notes } = sanitizeObject(rawBody);

    const leadIndex = leadsStore.findIndex((l) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json(apiError('Lead not found'), { status: 404 });
    }

    if (stage) leadsStore[leadIndex].stage = stage;
    if (notes) {
      leadsStore[leadIndex].notes = [...(leadsStore[leadIndex].notes || []), notes];
    }
    leadsStore[leadIndex].lastActivity = 'Status updated by agent';

    return NextResponse.json(apiSuccess(leadsStore[leadIndex], 'Lead updated successfully'));
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json(apiError('Failed to update lead.'), { status: 500 });
  }
}
