import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeObject, apiSuccess, apiError } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`payment_create_${ip}`, 15, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(apiError('Too many payment attempts. Please wait.'), { status: 429 });
    }

    const rawBody = await request.json();
    const { amount, currency = 'INR', description, method = 'card', customerEmail, customerName } =
      sanitizeObject(rawBody);

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(apiError('Valid payment amount is required.'), { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if live or sandbox gateway is active
    let gateway = 'mock_sandbox';
    let orderId = `ord_${Date.now()}`;
    let clientSecret = `pi_mock_${Math.random().toString(36).substring(2, 15)}`;

    // Razorpay Integration (if real keys provided)
    if (
      currency === 'INR' &&
      razorpayKeyId &&
      razorpayKeySecret &&
      !razorpayKeyId.includes('mock')
    ) {
      try {
        const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64');
        const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(amount * 100), // amount in paise
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: { description: description || 'Real estate earnest deposit' },
          }),
        });
        if (rzpRes.ok) {
          const rzpData = await rzpRes.json();
          orderId = rzpData.id;
          gateway = 'razorpay_live';
        }
      } catch (err: any) {
        console.warn('Razorpay order creation fallback:', err.message);
      }
    }

    // Stripe Integration (if real keys provided)
    if (
      gateway === 'mock_sandbox' &&
      stripeKey &&
      !stripeKey.includes('Mock') &&
      !stripeKey.includes('test_51Mock')
    ) {
      try {
        const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            amount: String(Math.round(amount * 100)),
            currency: currency.toLowerCase(),
            description: description || 'Brickly AlexEstate transaction',
          }).toString(),
        });
        if (stripeRes.ok) {
          const stripeData = await stripeRes.json();
          orderId = stripeData.id;
          clientSecret = stripeData.client_secret;
          gateway = 'stripe_live';
        }
      } catch (err: any) {
        console.warn('Stripe intent creation fallback:', err.message);
      }
    }

    return NextResponse.json(
      apiSuccess(
        {
          orderId,
          clientSecret,
          amount,
          currency,
          gateway,
          status: 'ready',
          timestamp: new Date().toISOString(),
        },
        'Payment order initialized successfully'
      )
    );
  } catch (error: any) {
    console.error('Error initiating payment order:', error);
    return NextResponse.json(apiError('Failed to initialize payment session.'), { status: 500 });
  }
}
