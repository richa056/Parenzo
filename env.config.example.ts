// Environment Configuration Example
// Copy this file to env.config.ts and replace the values with your actual configuration

export const env = {
  // Authentication
  NEXTAUTH_SECRET: 'your-nextauth-secret',
  NEXTAUTH_URL: 'http://localhost:3000',

  // Database
  MONGODB_URI: 'your-mongodb-connection-string',
  MONGODB_DB: 'your-database-name',

  // Google OAuth
  GOOGLE_CLIENT_ID: 'your-google-client-id',
  GOOGLE_CLIENT_SECRET: 'your-google-client-secret',

  // Firebase
  NEXT_PUBLIC_FIREBASE_API_KEY: 'your-firebase-api-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'your-project.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'your-project-id',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'your-project.appspot.com',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'your-messaging-sender-id',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'your-app-id',
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'your-measurement-id',
  FIREBASE_PRIVATE_KEY: 'your-firebase-private-key',

  // AI Services
  OPENAI_API_KEY: 'your-openai-api-key',
  GOOGLE_AI_API_KEY: 'your-google-ai-api-key',

  // Email Service
  EMAIL_USER: 'your-email@example.com',
  EMAIL_PASSWORD: 'your-email-password',

  // App Configuration
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  NEXT_PUBLIC_APP_NAME: 'Your App Name',
}; 