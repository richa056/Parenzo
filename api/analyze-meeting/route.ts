import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { title, date, time, type, notes } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a parenting and healthcare expert. Provide detailed suggestions and preparation tips for parent meetings, therapy sessions, and doctor visits."
        },
        {
          role: "user",
          content: `Analyze this meeting:
          Title: ${title}
          Date: ${date}
          Time: ${time}
          Type: ${type}
          Notes: ${notes}
          
          Please provide:
          1. Preparation checklist
          2. Questions to ask
          3. Documents to bring
          4. Follow-up actions`
        }
      ],
    });

    return NextResponse.json({ suggestions: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to analyze meeting' }, { status: 500 });
  }
} 