import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from '../../../../config'

const genAI = new GoogleGenerativeAI(config.ai.google.apiKey)

export async function POST(req: Request) {
  try {
    const { focus, goals, notes } = await req.json()

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Prepare the prompt
    const prompt = `Analyze this therapy session and provide insights:
    Focus Area: ${focus}
    Goals: ${goals.join(', ')}
    Notes: ${notes}
    
    Please provide:
    1. Progress assessment
    2. Goal achievement analysis
    3. Recommendations for next steps
    4. Potential areas of concern
    5. Suggested techniques or exercises`

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const analysis = response.text()

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('Error in therapy analysis:', error)
    return NextResponse.json(
      { error: 'Failed to analyze therapy session' },
      { status: 500 }
    )
  }
} 