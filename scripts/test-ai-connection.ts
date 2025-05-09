import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { secureConfig } from '../config/secure';

async function testOpenAI() {
  console.log('\n1️⃣ Testing OpenAI connection...');
  
  const openai = new OpenAI({
    apiKey: secureConfig.ai.openai.apiKey
  });

  try {
    const models = await openai.models.list();
    console.log('✅ OpenAI Connection: SUCCESS');
    console.log('Available Models:', models.data.map(m => m.id).join(', '));
  } catch (error: any) {
    console.log('❌ OpenAI Connection: FAILED');
    console.error('Error:', error.message);
  }
}

async function testGemini() {
  console.log('\n2️⃣ Testing Google AI (Gemini) connection...');
  
  try {
    const genAI = new GoogleGenerativeAI(secureConfig.ai.google.apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const result = await model.generateContent("Hello, can you hear me?");
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Successfully connected to Google AI!');
    console.log('Response:', text);
  } catch (error: any) {
    console.error('❌ Failed to connect to Google AI:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
}

async function testLocal() {
  console.log('\n3️⃣ Testing local response...');
  try {
    // Simulate a local response
    const response = "This is a local response test - working correctly!";
    console.log('✅ Local Response: SUCCESS');
    console.log('Response:', response);
  } catch (error) {
    console.log('❌ Local Response: FAILED');
    console.error('Error:', error);
  }
}

async function main() {
  console.log('🚀 Starting AI Services Test...\n');
  await testOpenAI();
  await testGemini();
  await testLocal();
  console.log('\n✨ All tests completed!');
}

main().catch(console.error); 