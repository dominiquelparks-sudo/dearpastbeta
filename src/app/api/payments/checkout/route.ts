import { NextRequest, NextResponse } from 'next/server';
import stripe, { createCheckoutSession } from '@/lib/stripe';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, email, planType } = body;
        if (!userId || !email) {
            return NextResponse.json({ error: 'userId and email are required' }, { status: 400 });
        }
        const session = await createCheckoutSession(userId, planType, email);
        if (!session) {
            return NextResponse.json({ message: 'Free plan selected' }, { status: 200 });
        }
        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
}