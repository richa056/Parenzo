import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

export async function POST(req: Request) {
  try {
    const { event } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze the following calendar event and provide insights:
    Title: ${event.title}
    Date: ${event.date}
    Time: ${event.time}
    Type: ${event.type}
    Description: ${event.description}

    Please provide:
    1. Event importance and priority assessment
    2. Suggested preparation steps
    3. Potential conflicts or overlaps with other events
    4. Recommendations for optimal timing
    5. Follow-up actions if needed`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing calendar event:", error);
    return NextResponse.json(
      { error: "Failed to analyze event" },
      { status: 500 }
    );
  }
} 