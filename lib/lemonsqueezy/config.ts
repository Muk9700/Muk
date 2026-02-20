export const LEMON_SQUEEZY_PRODUCTS = {
    TASTER: {
        id: "1327318",
        name: "맛보기 팩",
        credits: 10,
        priceKRW: 3300,
    },
    BESTSELLER: {
        id: "1327335",
        name: "베스트셀러 팩",
        credits: 35,
        priceKRW: 9900,
    },
} as const;

export type ProductType = keyof typeof LEMON_SQUEEZY_PRODUCTS;

// Webhook Secret은 .env.local에 LEMON_SQUEEZY_WEBHOOK_SECRET 으로 저장됩니다.
// API Key는 .env.local에 LEMON_SQUEEZY_API_KEY 로 저장됩니다.
