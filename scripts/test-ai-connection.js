const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const fs = require('fs');

// Replace these with your actual API keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'your-google-api-key';

// Load secure config
const secureConfigPath = path.join(__dirname, '../config/secure.ts');
if (!fs.existsSync(secureConfigPath)) {
  console.error('❌ Error: secure.ts file not found. Please make sure it exists in the config directory.');
  process.exit(1);
}

const { secureConfig } = require('../config/secure');

async function testOpenAI() {
  console.log('Testing OpenAI connection...');
  
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });

  try {
    const models = await openai.models.list();
    console.log('OpenAI Connection: SUCCESS');
    console.log('Available Models:', models.data.map(m => m.id).join(', '));
  } catch (error) {
    console.log('OpenAI Connection: FAILED');
    console.error('Error:', error.message);
  }
}

async function testConnection() {
  try {
    console.log('🔍 Testing connection to Google AI...');
    
    const genAI = new GoogleGenerativeAI(secureConfig.ai.google.apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Hello");
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Successfully connected to Google AI!');
    console.log('Response:', text);
  } catch (error) {
    console.error('❌ Failed to connect to Google AI:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
}

async function main() {
  await testOpenAI();
  await testConnection();
}

main().catch(console.error); 