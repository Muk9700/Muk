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
                { error: "장르, 성격, 컨셉을 모두 입력해주세요." },
                { status: 400 }
            );
        }

        // 유저 인증 확인
        if (!userId) {
            console.error("[Generate Story] Unauthorized: Missing userId");
            return NextResponse.json(
                { error: "로그인이 필요합니다." },
                { status: 401 }
            );
        }

        // 무료 생성 횟수 및 크레딧 체크
        const { data: genData, error: genError } = await supabaseAdmin
            .from("user_generations")
            .select("count, credits")
            .eq("user_id", userId)
            .single();

        if (genError && genError.code !== "PGRST116") {
            console.error("[Generate Story] Error fetching count/credits:", genError);
            return NextResponse.json(
                { error: "사용자 정보를 확인하는 중 오류가 발생했습니다." },
                { status: 500 }
            );
        }

        const currentCount = genData?.count ?? 0;
        const currentCredits = genData?.credits ?? 0;
        const isFreeExceeded = currentCount >= FREE_GENERATION_LIMIT;

        console.log(`[Generate Story] User ${userId}: Count=${currentCount}, Credits=${currentCredits}`);

        if (isFreeExceeded && currentCredits <= 0) {
            console.warn(`[Generate Story] NO REDITS for ${userId}. Out of free limits and 0 credits.`);
            return NextResponse.json(
                {
                    error: "NO_CREDITS",
                    message: "무료 소설 생성 기회를 모두 소진했으며 보유한 크레딧이 없습니다.",
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

The story should be written in Korean, it should be engaging, emotional, and fit the BL genre well. 
Include a title and the full story text.
Structure the output beautifully with proper spacing and paragraphs.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        const generatedText = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
        console.log(`[Generate Story] AI Generation success.`);

        // 생성 성공 후 차감 로직 분기
        let newCount = currentCount;
        let newCredits = currentCredits;

        if (!isFreeExceeded) {
            // 무료 기회 소진
            newCount = currentCount + 1;
            console.log(`[Generate Story] Using free generation for ${userId}`);
        } else {
            // 크레딧 소진
            newCredits = currentCredits - 1;
            console.log(`[Generate Story] Using 1 credit for ${userId}`);
        }

        const { error: updateError } = await supabaseAdmin
            .from("user_generations")
            .upsert(
                {
                    user_id: userId,
                    count: newCount,
                    credits: newCredits,
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
            { error: error.message || "서버 내부 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

