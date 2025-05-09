#!/bin/bash

# Script to fix duplicate connectToDatabase imports

# Find all route.ts files with duplicate connectToDatabase imports
echo "Checking for duplicate imports..."
grep -l "import { connectToDatabase } from \"@/lib/mongodb\"" --include="*.ts" -r ./app/api | xargs grep -l "import { connectToDatabase } from \"@/lib/mongodb\"" > duplicate_files.txt

# Remove duplicate imports
if [ -s duplicate_files.txt ]; then
  echo "Found files with duplicate imports. Fixing..."
  while read file; do
    echo "🔄 Fixing duplicate imports in $file"
    # Use sed to remove the second occurrence of the import statement
    sed -i '' '2s/import { connectToDatabase } from "@\/lib\/mongodb";//g' "$file"
  done < duplicate_files.txt
else
  echo "No files with duplicate imports found."
fi

# Cleanup
rm -f duplicate_files.txt

echo "Done! ✨" 