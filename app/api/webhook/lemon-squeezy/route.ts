import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { LEMON_SQUEEZY_PRODUCTS } from "@/lib/lemonsqueezy/config";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
    try {
        // Clone the request text to compute the HMAC
        const text = await req.text();
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");

        // Get the signature from headers
        const signatureHeader = req.headers.get("x-signature") || "";
        const signature = Buffer.from(signatureHeader, "utf8");

        // Verify the signature
        if (digest.length !== signature.length || !crypto.timingSafeEqual(digest, signature)) {
            console.error("Invalid Lemon Squeezy webhook signature.");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const body = JSON.parse(text);
        const eventName = body.meta.event_name;

        if (eventName === "order_created") {
            const data = body.data.attributes;
            const customData = body.meta.custom_data || {};
            const userId = customData.user_id;

            if (!userId) {
                console.error("No user_id found in custom_data. Cannot assign credits.");
                return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
            }

            const orderId = body.data.id;
            const variantId = data.first_order_item.variant_id.toString();
            const amountTotal = data.total;

            // Find matching product to get credits
            let creditsToAdd = 0;
            const products = Object.values(LEMON_SQUEEZY_PRODUCTS);
            const matchedProduct = products.find(p => p.id === variantId);

            if (matchedProduct) {
                creditsToAdd = matchedProduct.credits;
            } else {
                console.error(`Unknown variant ID received: ${variantId}`);
                // fallback or handle unknown products if necessary
                return NextResponse.json({ error: "Unknown variant" }, { status: 400 });
            }

            console.log(`[Webhook] Order ${orderId} created for user ${userId}. Adding ${creditsToAdd} credits.`);

            // 1. Insert into orders table
            const { error: insertError } = await supabaseAdmin.from("orders").insert({
                user_id: userId,
                lemon_squeezy_id: orderId,
                variant_id: variantId,
                credits_added: creditsToAdd,
                amount: amountTotal,
            });

            if (insertError) {
                console.error("[Webhook] Failed to insert order:", insertError);
                // Duplicate order processing usually throws here due to UNIQUE constraint
                if (insertError.code === "23505") { // unique_violation
                    return NextResponse.json({ message: "Order already processed" }, { status: 200 });
                }
                throw insertError;
            }

            // 2. Fetch current user_generations, or create if missing, then add credits
            const { data: userRecord, error: fetchError } = await supabaseAdmin
                .from("user_generations")
                .select("credits")
                .eq("user_id", userId)
                .single();

            if (fetchError && fetchError.code !== "PGRST116") {
                console.error("[Webhook] Error fetching user_generations:", fetchError);
                throw fetchError;
            }

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

            if (updateError) {
                console.error("[Webhook] Failed to update credits:", updateError);
                throw updateError;
            }

            console.log(`[Webhook] Successfully added ${creditsToAdd} credits to user ${userId}.`);
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Webhook processing error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
