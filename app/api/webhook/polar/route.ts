import { NextRequest, NextResponse } from "next/server";
import { Webhooks } from "@polar-sh/nextjs";
import { createClient } from "@supabase/supabase-js";
import { POLAR_PRODUCTS } from "@/lib/polar/config";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const handler = Webhooks({
            webhookSecret: process.env.POLAR_WEBHOOK_SECRET || "",
            onOrderCreated: async ({ payload: order }: any) => {
                console.log(`[Polar Webhook] Order created: ${order.id}`);

                const userId = order.customer_external_id || order.customerExternalId || order.metadata?.userId || order.custom_field_data?.userId || order.customer_id;

                if (!userId) {
                    console.error("No customer external ID found. Order keys:", Object.keys(order), "Metadata:", order.metadata);
                    return;
                }

                const productId = order.product_id || order.productId;
                const matchedProduct = Object.values(POLAR_PRODUCTS).find(p => p.id === productId);

                if (!matchedProduct) {
                    console.error(`Unknown product ID: ${productId}`);
                    return;
                }

                const creditsToAdd = matchedProduct.credits;
                const amount = order.amount;
                const currency = order.currency;

                // 1. Insert into polar_orders table
                const { error: insertError } = await supabaseAdmin.from("polar_orders").insert({
                    user_id: userId,
                    polar_order_id: order.id,
                    product_id: productId,
                    credits_added: creditsToAdd,
                    amount: amount,
                    currency: currency.toUpperCase(),
                    status: 'paid'
                });

                if (insertError) {
                    console.error("[Polar Webhook] Failed to insert order:", insertError);
                    if (insertError.code === "23505") return; // Already processed
                    throw insertError;
                }

                // 2. Add credits to user_generations
                const { data: userRecord, error: fetchError } = await supabaseAdmin
                    .from("user_generations")
                    .select("credits")
                    .eq("user_id", userId)
                    .single();

                if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

                const currentCredits = userRecord?.credits ?? 0;

                const { error: updateError } = await supabaseAdmin
                    .from("user_generations")
                    .upsert(
                        {
                            user_id: userId,
                            credits: currentCredits + creditsToAdd,
                            updated_at: new Date().toISOString()
                        },
                        { onConflict: 'user_id' }
                    );

                if (updateError) throw updateError;

                console.log(`[Polar Webhook] Successfully added ${creditsToAdd} credits to user ${userId}.`);
            },
        });

        return await (handler as any)(req);
    } catch (err: any) {
        console.error("Polar Webhook processing error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
