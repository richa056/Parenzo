import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { AuthOptions, NextAuthOptions, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import { config } from "@/config";
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export type UserRole = "mom" | "dad" | "medical_monitor";

export interface ExtendedUser extends Omit<User, 'id' | 'name'> {
  role: UserRole;
  id: string;
  name: string;
}

export interface ExtendedSession extends Omit<Session, 'user'> {
  user: ExtendedUser;
  accessToken?: string;
}

export const signInWithGoogle = async (role?: UserRole): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    if (!result.user.email) {
      throw new Error('No email found in Google account');
    }

    const db = await client.connect();
    
    await db.collection("users").updateOne(
      { email: result.user.email },
      { 
        $set: { 
          role: role || "mom",
          name: result.user.displayName || '',
          email: result.user.email,
          lastLogin: new Date()
        } 
      },
      { upsert: true }
    );
    
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to sign in with Google. Please try again.');
  } finally {
    await client.close();
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to sign out. Please try again.');
  }
};

export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, (error) => {
      console.error('Error getting current user:', error);
      reject(new Error(error instanceof Error ? error.message : 'Failed to get current user. Please try again.'));
    });
  });
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        try {
          const { db } = await connectToDatabase();
          const user = await db.collection('users').findOne({ email: credentials.email });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      try {
        const { db } = await connectToDatabase();
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (!existingUser) {
          // If user doesn't exist, create a new user
          await db.collection("users").insertOne({
            email: user.email,
            name: user.name || profile?.name || '',
            role: "mom", // Default role
            createdAt: new Date(),
            lastLogin: new Date()
          });
        } else {
          // Update last login
          await db.collection("users").updateOne(
            { email: user.email },
            { 
              $set: { 
                lastLogin: new Date(),
                name: user.name || profile?.name || ''
              } 
            }
          );
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as ExtendedSession).user.id = token.id as string;
        (session as ExtendedSession).user.role = token.role as UserRole;
        (session as ExtendedSession).accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow callback URLs
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};