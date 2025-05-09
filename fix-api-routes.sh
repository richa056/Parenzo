#!/bin/bash

# Script to fix common issues in Next.js route handlers
# This script finds all route.ts files in the app/api directory and applies common fixes:
# 1. Updates import paths for authOptions
# 2. Modernizes MongoDB connection with connectToDatabase
# 3. Fixes route handler parameter signatures
# 4. Standardizes error messages

# Find all route.ts files in the app/api directory
find ./app/api -name "route.ts" > routes.txt

echo "Found the following route.ts files:"
cat routes.txt

echo "Updating MongoDB imports and connections..."
# Replace MongoDB client imports with connectToDatabase
for file in $(cat routes.txt); do
  # Skip files that are already updated
  if grep -q "connectToDatabase" "$file"; then
    echo "✅ $file already uses connectToDatabase"
  else
    echo "🔄 Updating MongoDB connection in $file"
    sed -i '' 's/import { MongoClient.*/import { connectToDatabase } from "@\/lib\/mongodb";/g' "$file" || true
    sed -i '' 's/import clientPromise.*/import { connectToDatabase } from "@\/lib\/mongodb";/g' "$file" || true
    sed -i '' '/const uri = process.env.MONGODB_URI/d' "$file" || true
    sed -i '' '/const client = new MongoClient/d' "$file" || true
    sed -i '' 's/await client.connect();.*const db = client.db("parenzo");/const { db } = await connectToDatabase();/g' "$file" || true
    sed -i '' 's/const client = await clientPromise;.*const db = client.db("parenzo");/const { db } = await connectToDatabase();/g' "$file" || true
    sed -i '' '/await client.close()/d' "$file" || true
    sed -i '' 's/client.db("parenzo")/db/g' "$file" || true
  fi
done

echo "Updating authOptions imports..."
# Fix authOptions import path
for file in $(cat routes.txt); do
  if grep -q "import { authOptions } from '../auth/\[...nextauth\]/route'" "$file"; then
    echo "🔄 Updating authOptions import in $file"
    sed -i '' "s/import { authOptions } from '..\/auth\/\[...nextauth\]\/route'/import { authOptions } from '@\/lib\/auth'/g" "$file"
  fi
done

echo "Fixing route handler parameter types..."
# Fix route handler parameter signatures for dynamic routes
for file in $(cat routes.txt); do
  # Check if file contains context parameter
  if grep -q "context: { params:" "$file"; then
    echo "🔄 Fixing context parameter in $file"
    sed -i '' 's/\(req: Request,\) context: { params: { \([a-zA-Z]*\): string } }/\1\{ params \}: { params: { \2: string } }/g' "$file"
    sed -i '' 's/\(request: Request,\) context: { params: { \([a-zA-Z]*\): string } }/\1\{ params \}: { params: { \2: string } }/g' "$file"
  fi
done

echo "Standardizing error messages..."
# Standardize error messages
for file in $(cat routes.txt); do
  echo "🔄 Standardizing error messages in $file"
  sed -i '' 's/Failed to fetch/Something went wrong/g' "$file"
  sed -i '' 's/Failed to create/Something went wrong/g' "$file"
  sed -i '' 's/Failed to update/Something went wrong/g' "$file"
  sed -i '' 's/Failed to delete/Something went wrong/g' "$file"
done

echo "Done! ✨"
echo "Please review the changes and fix any remaining TypeScript errors manually."
echo "Run 'npm run build' to check for remaining TypeScript errors."

# Cleanup
rm routes.txt 