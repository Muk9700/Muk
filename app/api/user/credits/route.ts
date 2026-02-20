import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ credits: 0, count: 0 }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from("user_generations")
            .select("credits, count")
            .eq("user_id", userId)
            .single();

        if (error && error.code !== "PGRST116") {
            console.error("[Get Credits] Error:", error);
            return NextResponse.json({ error: "Failed to fetch credits" }, { status: 500 });
        }

        const response = NextResponse.json({
            credits: data?.credits ?? 0,
            count: data?.count ?? 0
        });

        // 브라우저 및 CDN 캐싱 강제 방지
        response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;

    } catch (error) {
        return NextResponse.json({ credits: 0, count: 0 }, { status: 500 });
    }
}
