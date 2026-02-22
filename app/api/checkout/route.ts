import { NextRequest, NextResponse } from 'next/server';
import { Polar } from '@polar-sh/sdk';
import { POLAR_PRODUCTS } from '@/lib/polar/config';

// Initialize Polar with the access token from environment variables
const polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN || '',
    server: 'sandbox',
});

export async function POST(req: NextRequest) {
    try {
        const { productId, userId } = await req.json();

        if (!productId || !userId) {
            return NextResponse.json({ error: 'Product ID and User ID are required' }, { status: 400 });
        }

        // Validate the product
        const polarProduct = Object.values(POLAR_PRODUCTS).find(p => p.id === productId);
        if (!polarProduct) {
            return NextResponse.json({ error: 'Invalid product selected' }, { status: 400 });
        }

        // Create the checkout session
        const checkout = await polar.checkouts.create({
            products: [productId],
            successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/store?success=true`,
            metadata: { userId: userId },
        });

        if (!checkout.url) {
            console.error('Polar Checkout Error: No URL returned');
            return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
        }

        // Return the checkout URL to redirect the user
        return NextResponse.json({ checkoutUrl: checkout.url });
    } catch (err: any) {
        console.error('Checkout API Error:', err);
        return NextResponse.json({ error: err.message || 'An unexpected error occurred' }, { status: 500 });
    }
}
