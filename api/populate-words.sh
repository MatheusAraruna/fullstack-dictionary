#!/bin/bash

set -e  # Exit on any error

echo "🚀 Starting word list population script..."

# Configuration
WORD_LIST_URL="https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/refs/heads/master/meta/wordList/english.txt"
WORD_LIST_FILE="english.txt"
BATCH_SIZE=1000

# Check if required commands exist
command -v curl >/dev/null 2>&1 || { echo "❌ curl is required but not installed. Aborting." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ node is required but not installed. Aborting." >&2; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "❌ npx is required but not installed. Aborting." >&2; exit 1; }

# Download the word list
echo "📥 Downloading English word list..."
if curl -L "$WORD_LIST_URL" -o "$WORD_LIST_FILE"; then
    echo "✅ Word list downloaded successfully"
else
    echo "❌ Failed to download word list"
    exit 1
fi

# Check if file was downloaded and has content
if [ ! -s "$WORD_LIST_FILE" ]; then
    echo "❌ Downloaded file is empty or doesn't exist"
    exit 1
fi

# Count total words
TOTAL_WORDS=$(wc -l < "$WORD_LIST_FILE")
echo "📊 Found $TOTAL_WORDS words to process"

# Generate Prisma client (in case schema was updated)
echo "🔧 Generating Prisma client..."
npx prisma generate

# Create Node.js script to populate database
cat > populate_db.js << 'EOF'
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function populateWords() {
  try {
    console.log('🗄️  Connecting to database...');
    
    // Read the word list file
    const filePath = path.join(__dirname, 'english.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const words = fileContent.split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .filter(word => /^[a-zA-Z]+$/.test(word)); // Only alphabetic words
    
    console.log(`📝 Processing ${words.length} words...`);
    
    // Clear existing words (optional - remove this if you want to keep existing data)
    console.log('🗑️  Clearing existing words...');
    await prisma.word.deleteMany();
    
    // Insert words in batches
    const batchSize = 1000;
    let inserted = 0;
    
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = words.slice(i, i + batchSize);
      const wordsData = batch.map(word => ({ word: word.toLowerCase() }));
      
      try {
        await prisma.word.createMany({
          data: wordsData,
          skipDuplicates: true
        });
        inserted += batch.length;
        console.log(`✅ Inserted batch ${Math.ceil((i + 1) / batchSize)} - Total: ${inserted}/${words.length}`);
      } catch (error) {
        console.error(`❌ Error inserting batch starting at index ${i}:`, error.message);
      }
    }
    
    // Get final count
    const finalCount = await prisma.word.count();
    console.log(`🎉 Successfully populated database with ${finalCount} words!`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

populateWords();
EOF

# Run the database population script
echo "💾 Populating database with words..."
node populate_db.js

# Clean up temporary files
echo "🧹 Cleaning up temporary files..."
rm -f populate_db.js "$WORD_LIST_FILE"

echo "✨ Script completed successfully!"
echo "🔍 You can verify the data with: npx prisma studio"
