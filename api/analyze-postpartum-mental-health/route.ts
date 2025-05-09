import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '@/config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (record: any) => {
  return `Based on your mental health record:

1. Mental Health Assessment:
- Mood: ${record.mood}
- Anxiety Level: ${record.anxietyLevel}/10
- Sleep Quality: ${record.sleepQuality}/10
- Energy Level: ${record.energyLevel}/10
- Support System: ${record.supportSystem}

2. General Recommendations:
- Practice self-care daily
- Get adequate rest when possible
- Stay connected with your support system
- Consider gentle exercise
- Maintain a regular sleep schedule
- Eat balanced meals
- Stay hydrated

3. When to Seek Help:
- If anxiety persists or worsens
- If sleep problems continue
- If mood changes are severe
- If you feel overwhelmed
- If you have thoughts of harming yourself or others

Remember that it's normal to experience mood changes during the postpartum period. Don't hesitate to reach out for help when needed.`;
};

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    // Validate required fields
    if (!record.date || !record.mood || record.anxietyLevel === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following postpartum mental health record and provide insights:
      Date: ${record.date}
      Mood: ${record.mood}
      Anxiety Level: ${record.anxietyLevel}/10
      Sleep Quality: ${record.sleepQuality}/10
      Energy Level: ${record.energyLevel}/10
      Support System: ${record.supportSystem}
      Notes: ${record.notes}

      Please provide:
      1. Overall mental health assessment
      2. Signs of postpartum depression or anxiety
      3. Recommendations for self-care
      4. When to seek professional help
      5. Support system suggestions`;

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
    console.error("Error analyzing postpartum mental health record:", error);
    return NextResponse.json(
      { error: "Failed to analyze record" },
      { status: 500 }
    );
  }
}