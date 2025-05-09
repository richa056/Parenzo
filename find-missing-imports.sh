#!/bin/bash

# Script to find files that use connectToDatabase but don't import it
echo "Checking for files with missing imports..."

# Find all route.ts files
find ./app/api -name "route.ts" > all_routes.txt

# Check each file for connectToDatabase usage without import
while read file; do
  # Check if file uses connectToDatabase
  if grep -q "await connectToDatabase()" "$file"; then
    # Check if file imports connectToDatabase
    if ! grep -q "import.*connectToDatabase" "$file"; then
      echo "🔍 Missing import in $file"
      # Add the import
      sed -i '' '1s/^/import { connectToDatabase } from "@\/lib\/mongodb";\n/' "$file"
      echo "✅ Added import to $file"
    fi
  fi
done < all_routes.txt

# Clean up
rm all_routes.txt

echo "Done! ✨" 