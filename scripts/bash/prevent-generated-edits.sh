#!/bin/bash
# Pre-commit hook to prevent direct edits to generated files
# Add to .git/hooks/pre-commit

GENERATED_DIRS=(
    "sites/*/config.json"
    "sites/*/main.tsx"
    "sites/*/index.html"
    "sites/*/shopify.html"
)

echo "🔍 Checking for direct edits to generated files..."

for pattern in "${GENERATED_DIRS[@]}"; do
    for file in $(git diff --cached --name-only -- "$pattern" 2>/dev/null); do
        if [ -n "$file" ]; then
            echo "❌ ERROR: Direct edit detected: $file"
            echo "   This file is generated from config/sites/*.json"
            echo "   Make changes in: config/sites/[brand]/[service].json"
            echo "   Then regenerate: npx tsx scripts/generate-site.ts --brand [brand] --service [service]"
            exit 1
        fi
    done
done

echo "✅ No direct edits to generated files"
exit 0