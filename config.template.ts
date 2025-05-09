export const config = {
  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET || 'your-nextauth-secret',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },

  // Database
  database: {
    uri: process.env.MONGODB_URI || 'your-mongodb-uri',
    name: process.env.MONGODB_DB || 'parenzo',
  },

  // Google OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
  },

  // Firebase
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'your-firebase-api-key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'your-messaging-sender-id',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'your-app-id',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'your-measurement-id',
  },

  // AI Services
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
    },
    google: {
      apiKey: process.env.GOOGLE_AI_API_KEY || 'your-google-ai-api-key',
    }
  },

  // App Configuration
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Parenzo',
  }
}; 