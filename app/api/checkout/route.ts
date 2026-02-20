import { NextRequest, NextResponse } from 'next/server';
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { LEMON_SQUEEZY_PRODUCTS, ProductType } from '@/lib/lemonsqueezy/config';

// Initialize Lemon Squeezy with the API key from environment variables
const apiKey = process.env.LEMON_SQUEEZY_API_KEY;

export async function POST(req: NextRequest) {
    if (!apiKey) {
        return NextResponse.json({ error: 'Lemon Squeezy API key is missing' }, { status: 500 });
    }

    try {
        const { productId, userId } = await req.json();

        if (!productId || !userId) {
            return NextResponse.json({ error: 'Product ID and User ID are required' }, { status: 400 });
        }

        // Validate the product to ensure it matches our predefined variants
        const productIds = Object.values(LEMON_SQUEEZY_PRODUCTS).map(p => p.id);
        if (!productIds.includes(productId)) {
            return NextResponse.json({ error: 'Invalid product selected' }, { status: 400 });
        }

        // Must dynamically import inside the function after setting API keys, or use setup function.
        const ls = await import('@lemonsqueezy/lemonsqueezy.js');
        ls.lemonSqueezySetup({ apiKey });

        const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
        if (!storeId) {
            console.error('LEMON_SQUEEZY_STORE_ID is missing');
            return NextResponse.json({ error: 'Store configuration is missing' }, { status: 500 });
        }

        // Create the checkout URL
        const { data, error } = await ls.createCheckout(storeId, productId, {
            checkoutData: {
                custom: {
                    user_id: userId,
                },
            },
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Expires in 24 hours
        });

        if (error) {
            console.error('Lemon Squeezy Checkout Error:', error);
            return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
        }

        // Return the checkout URL to redirect the user
        return NextResponse.json({ checkoutUrl: data?.data?.attributes?.url });
    } catch (err: any) {
        console.error('Checkout API Error:', err);
        return NextResponse.json({ error: err.message || 'An unexpected error occurred' }, { status: 500 });
    }
}
