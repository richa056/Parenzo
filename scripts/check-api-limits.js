const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('./config');

async function checkOpenAILimits() {
  if (!config.ai.openai.apiKey) {
    console.log('OpenAI API key not found');
    return;
  }

  const openai = new OpenAI({
    apiKey: config.ai.openai.apiKey
  });

  try {
    // Test API connection and get model list
    const models = await openai.models.list();
    console.log('OpenAI API Connection:', 'Success');
    console.log('Available Models:', models.data.map(m => m.id).join(', '));

    // Note: Detailed usage statistics are available in the OpenAI dashboard
    console.log('\nPlease check https://platform.openai.com/account/usage for detailed usage statistics');
  } catch (error) {
    console.error('Error checking OpenAI limits:', error);
  }
}

async function checkGeminiLimits() {
  if (!config.ai.google.apiKey) {
    console.log('Google AI API key not found');
    return;
  }

  const genAI = new GoogleGenerativeAI(config.ai.google.apiKey);
  
  try {
    // Note: Gemini API doesn't provide direct quota information
    // We'll test the connection
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Test connection");
    console.log('Gemini API Connection Test:', 'Success');
    
    console.log('\nPlease check https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas for quota information');
  } catch (error) {
    console.error('Error checking Gemini limits:', error);
  }
}

async function main() {
  console.log('Checking API Limits...\n');

  console.log('=== OpenAI ===');
  await checkOpenAILimits();

  console.log('\n=== Google Gemini ===');
  await checkGeminiLimits();
}

main().catch(console.error); 