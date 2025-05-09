import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    
    const prompt = `Analyze the following therapy session and provide insights:
    Date: ${session.date}
    Time: ${session.time}
    Therapist: ${session.therapist}
    Type: ${session.type}
    Goals: ${session.goals}
    Notes: ${session.notes}

    Please provide:
    1. Session preparation recommendations
    2. Potential discussion topics based on goals
    3. Therapeutic techniques that might be helpful
    4. Progress tracking suggestions
    5. Follow-up actions and homework ideas`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an experienced family therapist specializing in parent-child relationships. Provide detailed, practical advice for therapy sessions while maintaining a supportive and encouraging tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing therapy session:", error);
    return NextResponse.json(
      { error: "Failed to analyze session" },
      { status: 500 }
    );
  }
} 