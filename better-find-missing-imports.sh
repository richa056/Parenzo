#!/bin/bash

# Script to find files that use connectToDatabase but don't import it
echo "Checking for files with missing imports..."

# Find all route.ts files
find ./app/api -name "route.ts" > all_routes.txt

# Check each file for connectToDatabase usage without import
while read file; do
  # Check if file uses connectToDatabase in any way (not just the await pattern)
  if grep -q "connectToDatabase" "$file"; then
    # Check if file imports connectToDatabase
    if ! grep -q "import.*connectToDatabase" "$file"; then
      echo "🔍 Missing import in $file"
      # Add the import at the beginning, after any other imports
      sed -i '' '1a\\
import { connectToDatabase } from "@/lib/mongodb";
' "$file"
      echo "✅ Added import to $file"
    fi
  fi
done < all_routes.txt

# Now check for other patterns that might have been broken
while read file; do
  # Check for db variable used without being defined
  if grep -q "const { db }" "$file" && ! grep -q "connectToDatabase" "$file"; then
    echo "⚠️ File $file uses db but doesn't seem to have connectToDatabase"
  fi
done < all_routes.txt

# Clean up
rm all_routes.txt

echo "Done! ✨" 