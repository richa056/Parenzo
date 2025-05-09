console.log('AI DEBUG: /api/ai/chat route called');

import { NextResponse } from 'next/server';
import { getLocalResponse } from './local-responses';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Get local response
    const response = getLocalResponse(message);
    
    // Return the response
    return NextResponse.json({
      content: response,
      source: 'local',
      model: 'local'
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 