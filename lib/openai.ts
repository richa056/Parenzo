import OpenAI from 'openai';
import { config } from '@/config';

export const openai = new OpenAI({
  apiKey: config.ai.openai.apiKey,
});

export async function getParentingAdvice(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable parenting assistant. Provide evidence-based, supportive advice while being empathetic and understanding. Always encourage parents to consult healthcare professionals for medical concerns."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get parenting advice');
  }
}

export default openai;