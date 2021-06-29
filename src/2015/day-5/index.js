const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const vowelCount = (str) => {
  const vowelRegex = /[aeiou]/;
  return str.split('').filter((char) => vowelRegex.test(char)).length;
};

const hasRepeatingChars = (str) => {
  const splittedStr = str.split('');
  return splittedStr.some((char, i) => char === splittedStr[i - 1]);
};

const hasForbiddenChars = (str, regex) => regex.test(str);

// Contains at least three vowels (aeiou only)
// It does not contain the strings ab, cd, pq, or xy
// It contains at least one letter that appears twice in a row
const isNiceString = (str) =>
  vowelCount(str) >= 3 &&
  hasRepeatingChars(str) &&
  !hasForbiddenChars(str, /ab|cd|pq|xy/);

const getNiceStrings = (strings) => {
  const niceStrings = [];

  strings.forEach((str) => {
    if (isNiceString(str)) {
      niceStrings.push(str);
    }
  });

  return niceStrings;
};

const niceStrings = getNiceStrings(puzzleInput.split('\n'));

const result = niceStrings.length;
console.log('result :', result);
