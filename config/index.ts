import { developmentConfig } from './development';
import { secureConfig } from './secure';

interface Config {
  auth: {
    secret: string;
    url: string;
  };
  database: {
    uri: string;
    name: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    privateKey: string;
  };
  ai: {
    openai: {
      apiKey: string;
    };
    google: {
      apiKey: string;
    };
  };
}

// Override development config with secure config values
export const config: Config = {
  auth: {
    secret: secureConfig.auth.secret,
    url: process.env.NEXTAUTH_URL || developmentConfig.auth.url,
  },
  database: {
    uri: secureConfig.database.uri,
    name: secureConfig.database.name,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || developmentConfig.google.clientId,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || developmentConfig.google.clientSecret,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || developmentConfig.firebase.apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || developmentConfig.firebase.authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || developmentConfig.firebase.projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || developmentConfig.firebase.storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || developmentConfig.firebase.messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || developmentConfig.firebase.appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || developmentConfig.firebase.measurementId,
    privateKey: secureConfig.firebase.privateKey,
  },
  ai: {
    openai: {
      apiKey: secureConfig.ai.openai.apiKey,
    },
    google: {
      apiKey: secureConfig.ai.google.apiKey,
    },
  },
}; 