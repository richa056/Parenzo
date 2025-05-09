# Parenzo - Pregnancy and Parenting Companion App

A comprehensive web application designed to support expecting parents and new parents throughout their journey.

## Features

- **Health Tracking**
  - Mother's health metrics
  - Baby's growth tracking
  - Development milestones
  - Medical history

- **AI-Powered Insights**
  - Growth analysis
  - Health recommendations
  - Development tracking
  - Personalized insights

- **User Roles**
  - Mom
  - Dad
  - Medical Monitor

## Tech Stack

- Next.js 14
- TypeScript
- MongoDB
- NextAuth.js
- Tailwind CSS
- shadcn/ui
- Recharts
- Google AI

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/parenzo.git
cd parenzo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=your-mongodb-uri
MONGODB_DB=parenzo

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Parenzo
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for the beautiful components
- MongoDB for the database
- Google AI for the AI capabilities 