export const POLAR_PRODUCTS = {
    STARTER: {
        id: "056545bf-e8d4-4af0-afef-75f580adef4b",
        name: "Basic Package",
        credits: 10,
        priceUSD: 2.49,
    },
    AUTHORS_CHOICE: {
        id: "a44f4c54-726e-4aac-b574-41c39e3cfc86",
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
