const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

/**
 * Returns the number of vowels in a string (minus the 'y')
 * @param {string} str - The string to check
 * @return {number} n - Number of vowels
 */
const vowelCount = (str) => {
  const regex = /[aeiou]/;
  return str.split('').filter((char) => regex.test(char)).length;
};

// Returns true if a string contains a character that is repeated twice in a row
const hasRepeatingChars = (str) => {
  const splittedStr = str.split('');
  return splittedStr.some((char, i) => char === splittedStr[i + 1]);
};

// Returns true if a string contains the forbidden characters
const hasForbiddenChars = (str) => {
  const regex = /ab|cd|pq|xy/;
  return regex.test(str);
};

// Returns true if a string contains a pair of characters that is repeated at least twice
const hasRepeatingPairs = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    const pair = str.substring(i, i + 2);
    const rest = str.substring(i + 2);
    if (rest.includes(pair)) {
      return true;
    }
  }

  return false;
};

// Returns true if a string contains a character that is repeated at least twice but are not next to each other
const hasRepeatingCharsBetween = (str) => {
  const splittedStr = str.split('');
  return splittedStr.some((char, i) => char === splittedStr[i + 2]);
};

const isNiceString1 = (str) =>
  vowelCount(str) >= 3 && hasRepeatingChars(str) && !hasForbiddenChars(str);

const isNiceString2 = (str) =>
  hasRepeatingPairs(str) && hasRepeatingCharsBetween(str);

const getNiceStrings = (strings, condition) => {
  const niceStrings = [];

  strings.forEach((str) => {
    if (condition(str)) {
      niceStrings.push(str);
    }
  });

  return niceStrings;
};

const niceStrings1 = getNiceStrings(puzzleInput.split('\n'), isNiceString1);
const result1 = niceStrings1.length;
console.log('result1 :', result1);

const niceStrings2 = getNiceStrings(puzzleInput.split('\n'), isNiceString2);
const result2 = niceStrings2.length;
console.log('result2 :', result2);
