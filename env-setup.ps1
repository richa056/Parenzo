# Create .env file with default values
$envContent = @"
# Authentication
NEXTAUTH_SECRET=your-development-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/parenzo
MONGODB_DB=parenzo

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id

# AI Services
OPENAI_API_KEY=your-openai-api-key
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Email Service
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Parenzo
"@

# Write to .env file
Set-Content -Path .env -Value $envContent -Force

# Set file attributes
attrib -R .env

Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host "Please update the values in .env with your actual credentials." -ForegroundColor Yellow 