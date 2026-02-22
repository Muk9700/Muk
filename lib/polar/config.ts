export const POLAR_PRODUCTS = {
    STARTER: {
        id: "8dbb52bf-7d59-4881-bac7-2d338d928dfb",
        name: "Starter Kit",
        credits: 10,
        priceUSD: 2.49,
    },
    AUTHORS_CHOICE: {
        id: "4b7b032a-a623-4b08-9e93-3530cb4003f2",
        name: "Author's Choice",
        credits: 35,
        priceUSD: 7.49,
    },
} as const;

export type PolarProductType = keyof typeof POLAR_PRODUCTS;

// Environment variables required:
// POLAR_ACCESS_TOKEN
// POLAR_WEBHOOK_SECRET
// POLAR_ORGANIZATION_ID (optional, can be inferred from products but good to have)
