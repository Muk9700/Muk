import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { genre, personality, concept } = await request.json();

        if (!genre || !personality || !concept) {
            return NextResponse.json(
                { error: "Genre, personality, and concept are all required" },
                { status: 400 }
            );
        }

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

        return NextResponse.json({
            success: true,
            story: generatedText,
        });
    } catch (error: any) {
        console.error("Error generating story:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate story" },
            { status: 500 }
        );
    }
}
