import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (record: any) => {
  return `Based on your exercise session:

1. Session Details:
- Exercise Type: ${record.exerciseType}
- Duration: ${record.duration} minutes
- Intensity: ${record.intensity}/10
- Energy Level: ${record.energyLevel}/10
- Discomfort Level: ${record.discomfortLevel}/10

2. Safety Assessment:
- Monitor your body's response
- Stay hydrated
- Listen to your body's signals
- Take breaks as needed
- Focus on proper form

3. Postpartum Exercise Tips:
- Start slowly and gradually increase intensity
- Focus on core and pelvic floor exercises
- Include gentle stretching
- Consider low-impact activities
- Rest when needed

Remember to consult with your healthcare provider about exercise recommendations specific to your postpartum recovery.`;
};

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    // Validate required fields
    if (!record.date || !record.exerciseType || !record.duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following postpartum exercise session and provide insights:
      Date: ${record.date}
      Exercise Type: ${record.exerciseType}
      Duration: ${record.duration} minutes
      Intensity: ${record.intensity}/10
      Energy Level: ${record.energyLevel}/10
      Discomfort Level: ${record.discomfortLevel}/10
      Notes: ${record.notes}

      Please provide:
      1. Safety assessment
      2. Recommendations for future sessions
      3. Warning signs to watch for
      4. Postpartum-specific exercise tips
      5. Encouragement and motivation`;

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
    console.error("Error analyzing exercise record:", error);
    return NextResponse.json(
      { error: "Failed to analyze record" },
      { status: 500 }
    );
  }
} 