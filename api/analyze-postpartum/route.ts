import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (record: any) => {
  return `Based on your postpartum health record:

1. Overall Health Assessment:
- Your blood pressure is ${record.bloodPressure}
- Temperature is ${record.temperature}
- Pain level is ${record.painLevel}/10
- Mood is ${record.mood}

2. Recommendations:
- Continue monitoring your vital signs
- Stay hydrated and rest when possible
- Keep track of your mood changes
- Follow up with your healthcare provider regularly

3. When to Seek Help:
- If pain level increases significantly
- If you notice unusual bleeding
- If you experience severe mood changes
- If you have a fever above 100.4°F

Remember to take care of yourself during this important recovery period.`;
};

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    // Validate required fields
    if (!record.date || !record.bloodPressure || !record.temperature) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following postpartum health record and provide insights:
      Date: ${record.date}
      Blood Pressure: ${record.bloodPressure}
      Temperature: ${record.temperature}
      Bleeding: ${record.bleeding}
      Pain Level: ${record.painLevel}/10
      Mood: ${record.mood}
      Notes: ${record.notes}

      Please provide:
      1. Overall health assessment
      2. Any concerning symptoms to watch for
      3. Recommendations for care
      4. When to seek medical attention`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      return NextResponse.json({ analysis });
    } catch (aiError) {
      console.error("AI analysis failed, using fallback:", aiError);
      const fallbackAnalysis = getFallbackAnalysis(record);
      return NextResponse.json({ analysis: fallbackAnalysis });
    }
  } catch (error) {
    console.error("Error analyzing postpartum record:", error);
    return NextResponse.json(
      { error: "Failed to analyze record" },
      { status: 500 }
    );
  }
} 