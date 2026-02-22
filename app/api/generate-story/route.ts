import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Admin Client (서버사이드 - service_role 키 필요)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FREE_GENERATION_LIMIT = 1;

export async function POST(request: NextRequest) {
    try {
        const { genre, personality, concept, userId } = await request.json();

        console.log(`[Generate Story] Start - User: ${userId}`);

        if (!genre || !personality || !concept) {
            return NextResponse.json(
                { error: "Genre, personality, and concept are required fields." },
                { status: 400 }
            );
        }

        // Verify user authentication
        if (!userId) {
            console.error("[Generate Story] Unauthorized: Missing userId");
            return NextResponse.json(
                { error: "Sign in required." },
                { status: 401 }
            );
        }

        // Check free generation limits and credits (Real-time DB check)
        const { data: genData, error: genError } = await supabaseAdmin
            .from("user_generations")
            .select("count, credits, user_id")
            .eq("user_id", userId)
            .maybeSingle();

        if (genError && genError.code !== "PGRST116") {
            console.error("[Generate Story] Error fetching count/credits:", genError);
            return NextResponse.json(
                { error: "An error occurred while verifying user data." },
                { status: 500 }
            );
        }

        const currentCount = genData?.count ?? 0;
        const currentCredits = genData?.credits ?? 0;
        const isFreeExceeded = currentCount >= FREE_GENERATION_LIMIT;

        // [v0.5] IP-based abuse prevention (only for free generation attempts)
        const forwarded = request.headers.get("x-forwarded-for");
        const clientIp = forwarded ? forwarded.split(',')[0] : (request as any).ip || "127.0.0.1";

        if (!isFreeExceeded) {
            // Check if this IP has already been used to claim a free story by another user
            const { data: ipData, error: ipError } = await supabaseAdmin
                .from("user_generations")
                .select("user_id")
                .eq("last_ip", clientIp)
                .gt("count", 0) // Already claimed at least 1 free story
                .neq("user_id", userId) // Different user than current
                .limit(1)
                .maybeSingle();

            if (ipData) {
                console.warn(`[Generate Story] IP_ABUSE detected: IP ${clientIp} already used for free gen by ${ipData.user_id}`);
                return NextResponse.json(
                    {
                        error: "IP_ABUSE",
                        message: "A free story has already been generated from this device or network. Please purchase credits to continue.",
                    },
                    { status: 403 }
                );
            }
        }

        console.log(`[Generate Story] User ${userId} (IP: ${clientIp}): Count=${currentCount}, Credits=${currentCredits}`);

        const REQUIRED_CREDITS = 3;

        if (isFreeExceeded && currentCredits < REQUIRED_CREDITS) {
            console.warn(`[Generate Story] NO REDITS for ${userId}. Out of free limits and < ${REQUIRED_CREDITS} credits.`);
            return NextResponse.json(
                {
                    error: "NO_CREDITS",
                    message: "You've used your free story credit and have no remaining credits. Please top up!",
                    usedCount: currentCount,
                    limit: FREE_GENERATION_LIMIT,
                    credits: currentCredits
                },
                { status: 403 }
            );
        }

        console.log(`[Generate Story] AI Generation starting...`);
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
                { status: 500 }
            );
        }

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are a professional BL (Boys Love) web novel writer. 
Generate a high-quality BL short story based on the following details:
- Genre: ${genre}
- Protagonist Personality: ${personality}
- Concept: ${concept}

The story should be written in natural, engaging English. It should be emotional and fit the BL genre well. 
Include a title and the full story text.
Structure the output beautifully with proper spacing and paragraphs.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        const generatedText = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
        console.log(`[Generate Story] AI Generation success.`);

        // Credit deduction logic
        let newCount = currentCount;
        let newCredits = currentCredits;

        if (!isFreeExceeded) {
            // Use free credit
            newCount = currentCount + 1;
            console.log(`[Generate Story] Using free generation for ${userId}`);
        } else {
            // Deduct purchased credit
            newCredits = currentCredits - REQUIRED_CREDITS;
            console.log(`[Generate Story] Using ${REQUIRED_CREDITS} credit for ${userId}`);
        }

        const { error: updateError } = await supabaseAdmin
            .from("user_generations")
            .upsert(
                {
                    user_id: userId,
                    count: newCount,
                    credits: newCredits,
                    last_ip: clientIp, // Record IP
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'user_id' }
            );

        if (updateError) {
            console.error("[Generate Story] DB Update Error:", updateError);
        } else {
            console.log(`[Generate Story] Record updated for ${userId}: Count=${newCount}, Credits=${newCredits}`);
        }

        return NextResponse.json({
            success: true,
            story: generatedText,
            usedCount: newCount,
            limit: FREE_GENERATION_LIMIT,
            credits: newCredits
        });
    } catch (error: any) {
        console.error("[Generate Story] Uncaught Error:", error);
        return NextResponse.json(
            { error: error.message || "An internal server error occurred." },
            { status: 500 }
        );
    }
}

