import fs from 'fs/promises';
import path from 'path';

function countVowels(text) {
  const matches = text.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

function countWords(text) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

async function analyzeDirectory(dirPath) {
  let totalWords = 0;
  let totalVowels = 0;

  async function recursiveRead(currentPath) {
    const files = await fs.readdir(currentPath, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(currentPath, file.name);

      if (file.isDirectory()) {
        await recursiveRead(fullPath);
      } else if (file.isFile() && path.extname(file.name) === '.txt') {
        const content = await fs.readFile(fullPath, 'utf-8');
        totalWords += countWords(content);
        totalVowels += countVowels(content);
      }
    }
  }

  try {
    await recursiveRead(dirPath);
    console.log(`ანალიზის შედეგი (.txt ფაილებისთვის):`);
    console.log(`სულ სიტყვები: ${totalWords}`);
    console.log(`სულ ხმოვნები: ${totalVowels}`);
  } catch (error) {
    console.error('შეცდომა:', error);
  }
}

analyzeDirectory('.');