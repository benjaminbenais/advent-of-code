const crypto = require('crypto-js');

const puzzleInput = 'bgvyzdsv';

const generateHash = (base, n) => crypto.MD5(`${base}${n}`).toString();

const findHash = (str) => {
  let n = 0;
  let hash = generateHash(puzzleInput, n);

  while (!hash.startsWith(str)) {
    n++;
    hash = generateHash(puzzleInput, n);
  }

  return n;
};

const result1 = findHash('00000');
console.log('result1 :', result1);
const result2 = findHash('000000');
console.log('result2 :', result2);
