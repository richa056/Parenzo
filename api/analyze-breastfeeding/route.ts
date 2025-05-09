import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '@/config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (record: any) => {
  return `Based on your breastfeeding session:

1. Session Assessment:
- Duration: ${record.duration} minutes
- Side: ${record.side}
- Latch Quality: ${record.latchQuality}/10
- Comfort Level: ${record.comfortLevel}/10
- Milk Output: ${record.milkOutput} ml

2. General Recommendations:
- Ensure proper positioning and latch
- Stay hydrated throughout the day
- Maintain a comfortable nursing environment
- Take breaks when needed
- Use nursing pillows for support
- Practice relaxation techniques

3. Postpartum-Specific Tips:
- Monitor baby's weight gain
- Watch for signs of proper milk transfer
- Keep track of feeding patterns
- Stay nourished and rested
- Seek help for persistent pain
- Consider pumping if needed

Remember that every breastfeeding journey is unique. Consult with a lactation consultant or healthcare provider for personalized advice.`;
};

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    // Validate required fields
    if (!record.date || !record.duration || !record.side) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following breastfeeding session and provide insights:
      Date: ${record.date}
      Duration: ${record.duration} minutes
      Side: ${record.side}
      Latch Quality: ${record.latchQuality}/10
      Comfort Level: ${record.comfortLevel}/10
      Milk Output: ${record.milkOutput} ml
      Notes: ${record.notes}

      Please provide:
      1. Overall session assessment
      2. Latch and positioning analysis
      3. Comfort and pain management tips
      4. Milk supply considerations
      5. When to seek professional help`;

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
    console.error("Error analyzing breastfeeding session:", error);
    return NextResponse.json(
      { error: "Failed to analyze session" },
      { status: 500 }
    );
  }
} 