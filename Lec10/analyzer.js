import fs from 'fs/promises';

async function analyzeText() {
  try {
    const text = await fs.readFile('random.txt', 'utf-8');

    // 1. სიტყვების დათვლა
    const wordsArray = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = wordsArray.length;

    // 2. ხმოვნების დათვლა (A, E, I, O, U)
    const vowelsMatch = text.match(/[aeiouaeiou]/gi);
    const vowelCount = vowelsMatch ? vowelsMatch.length : 0;

    // 3. ყველა სიმბოლოს/ასოს დათვლა (სფეისების ჩათვლით)
    const charCount = text.length;

    const result = {
      word: wordCount,
      vowel: vowelCount,
      chars: charCount
    };

    await fs.writeFile('result.json', JSON.stringify(result, null, 2));
    console.log('ანალიზი დასრულდა! შედეგი ჩაიწერა result.json-ში:', result);

  } catch (error) {
    console.error('შეცდომა ფაილის წაკითხვისას. დარწმუნდით, რომ random.txt არსებობს:', error.message);
  }
}

analyzeText();