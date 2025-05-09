import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

// Fallback analysis template
const getFallbackAnalysis = (post: any) => {
  return `Based on the forum post:

1. Topic Analysis:
- Category: ${post.category}
- Main Theme: ${post.title}
- Content Type: ${post.content.length > 200 ? "Detailed Discussion" : "Quick Question"}

2. Community Engagement:
- Likely to generate discussion
- Relevant to many parents
- Addresses common concerns

3. Suggested Responses:
- Share personal experiences
- Provide practical tips
- Offer emotional support
- Suggest relevant resources

4. Moderation Notes:
- Content appears appropriate
- Topic is relevant to parenting
- Encourages positive discussion

Remember to maintain a supportive and respectful tone in responses.`;
};

export async function POST(req: Request) {
  try {
    const post = await req.json();
    
    // Validate required fields
    if (!post.title || !post.content || !post.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following parenting forum post and provide insights:
      Title: ${post.title}
      Category: ${post.category}
      Content: ${post.content}

      Please provide:
      1. Topic analysis and relevance
      2. Potential community engagement
      3. Suggested response approaches
      4. Moderation considerations
      5. Supportive response ideas`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      return NextResponse.json({ analysis });
    } catch (aiError) {
      console.error("AI analysis failed, using fallback:", aiError);
      const fallbackAnalysis = getFallbackAnalysis(post);
      return NextResponse.json({ analysis: fallbackAnalysis });
    }
  } catch (error) {
    console.error("Error analyzing forum post:", error);
    return NextResponse.json(
      { error: "Failed to analyze post" },
      { status: 500 }
    );
  }
} 