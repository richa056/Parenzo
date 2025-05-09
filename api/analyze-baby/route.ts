import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../../config';

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);

export async function POST(req: Request) {
  try {
    const { date, weight, height, feeding, sleep, notes } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze the following baby health data and provide insights and recommendations:
    Date: ${date}
    Weight: ${weight} kg
    Height: ${height} cm
    Feeding Details: ${feeding}
    Sleep Pattern: ${sleep}
    Additional Notes: ${notes || 'None'}

    Please provide:
    1. Growth assessment
    2. Feeding recommendations
    3. Sleep pattern analysis
    4. Overall health status
    5. Any concerns or suggestions`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze baby health',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 