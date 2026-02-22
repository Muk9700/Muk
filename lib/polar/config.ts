// Version: 0.7 - Approved Organization Update
export const POLAR_PRODUCTS = {
    STARTER: {
        id: "47f3c180-bb8d-4f57-bbca-2994a19a33c2",
        name: "Basic Package",
        credits: 10,
        priceUSD: 2.49,
    },
    AUTHORS_CHOICE: {
        id: "2279ffc1-1ad5-40e3-8f62-25ae0f83869e",
        name: "Premium Bundle",
        credits: 35,
        priceUSD: 7.49,
    },
} as const;

export type PolarProductType = keyof typeof POLAR_PRODUCTS;

// Environment variables required:
// POLAR_ACCESS_TOKEN
// POLAR_WEBHOOK_SECRET
// POLAR_ORGANIZATION_ID (optional, can be inferred from products but good to have)
