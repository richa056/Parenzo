import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Analyze this ${type} post:
${content}

Please provide:
1. Overall assessment
2. Key points and insights
3. Suggestions for improvement
4. Related resources or recommendations
5. Potential next steps`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        type,
        content
      }
    });

  } catch (error) {
    console.error('Post analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze post' },
      { status: 500 }
    );
  }
} 