import { google } from 'googleapis';
import { config } from '@/config';

const oauth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  `${config.app.url}/api/auth/callback/google`
);

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
};

export const getTokens = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

export const setCredentials = (tokens: any) => {
  oauth2Client.setCredentials(tokens);
};

export async function createCalendarEvent(event: {
  summary: string;
  description: string;
  start: { dateTime: string };
  end: { dateTime: string };
}) {
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    throw error;
  }
}

export { oauth2Client };