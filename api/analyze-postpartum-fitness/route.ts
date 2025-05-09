import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze the following postpartum fitness record and provide insights:
    Date: ${record.date}
    Exercise Type: ${record.exerciseType}
    Duration: ${record.duration} minutes
    Intensity: ${record.intensity}
    Notes: ${record.notes}

    Please provide:
    1. Overall fitness assessment
    2. Progress tracking
    3. Recommendations for next steps
    4. Safety considerations
    5. When to increase intensity`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing postpartum fitness record:", error);
    return NextResponse.json(
      { error: "Failed to analyze record" },
      { status: 500 }
    );
  }
} 