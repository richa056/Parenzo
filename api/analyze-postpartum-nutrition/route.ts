import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '@/config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (record: any) => {
  return `Based on your nutrition record:

1. Nutrition Assessment:
- Meal Type: ${record.mealType}
- Food Items: ${record.foodItems}
- Calories: ${record.calories} kcal
- Protein: ${record.protein}g
- Hydration: ${record.hydration} glasses

2. General Recommendations:
- Aim for balanced meals with protein, complex carbs, and healthy fats
- Stay hydrated throughout the day
- Include iron-rich foods for postpartum recovery
- Consume calcium-rich foods for bone health
- Eat regular meals and snacks
- Include fiber-rich foods for digestive health

3. Postpartum-Specific Tips:
- Focus on nutrient-dense foods
- Include foods rich in omega-3 fatty acids
- Consider foods that support milk production if breastfeeding
- Stay hydrated to support recovery and milk production
- Listen to your hunger and fullness cues

Remember that your nutritional needs are unique during the postpartum period. Consult with a healthcare provider for personalized advice.`;
};

export async function POST(req: Request) {
  try {
    const record = await req.json();
    
    // Validate required fields
    if (!record.date || !record.mealType || !record.foodItems) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following postpartum nutrition record and provide insights:
      Date: ${record.date}
      Meal Type: ${record.mealType}
      Food Items: ${record.foodItems}
      Calories: ${record.calories} kcal
      Protein: ${record.protein}g
      Hydration: ${record.hydration} glasses
      Notes: ${record.notes}

      Please provide:
      1. Overall nutrition assessment
      2. Nutrient balance analysis
      3. Recommendations for improvement
      4. Postpartum-specific nutrition tips
      5. Hydration recommendations`;

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
    console.error("Error analyzing postpartum nutrition record:", error);
    return NextResponse.json(
      { error: "Failed to analyze record" },
      { status: 500 }
    );
  }
} 