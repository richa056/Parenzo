import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '@/config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (record: any) => {
  return `Based on your baby's health record:

1. Health Assessment:
- Temperature: ${record.temperature}°C
- Weight: ${record.weight} kg
- Height: ${record.height} cm
- Feeding Pattern: ${record.feedingPattern}
- Sleep Pattern: ${record.sleepPattern}
- Diaper Changes: ${record.diaperChanges} times

2. General Recommendations:
- Monitor temperature regularly
- Track growth patterns
- Maintain feeding schedule
- Ensure adequate sleep
- Keep vaccination records updated
- Practice good hygiene

3. When to Seek Medical Attention:
- Fever above 38°C
- Significant weight loss
- Poor feeding
- Excessive sleepiness
- Unusual crying patterns
- Signs of dehydration

Remember to consult with your pediatrician for any concerns about your baby's health.`;
};

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    // Validate required fields
    if (!record.date || !record.temperature || !record.weight) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following baby health record and provide insights:
      Date: ${record.date}
      Temperature: ${record.temperature}°C
      Weight: ${record.weight} kg
      Height: ${record.height} cm
      Feeding Pattern: ${record.feedingPattern}
      Sleep Pattern: ${record.sleepPattern}
      Diaper Changes: ${record.diaperChanges} times
      Notes: ${record.notes}

      Please provide:
      1. Overall health assessment
      2. Growth and development analysis
      3. Feeding and sleep recommendations
      4. Warning signs to watch for
      5. When to consult a pediatrician`;

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
    console.error("Error analyzing baby health record:", error);
    return NextResponse.json(
      { error: "Failed to analyze record" },
      { status: 500 }
    );
  }
} 