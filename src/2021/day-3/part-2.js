const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const processInput = (bits, filterBits) => {
  let filteredBits = [...bits];

  for (let i = 0; i < bits[0].length; i++) {
    if (filteredBits.length === 1) {
      return parseInt(filteredBits[0], 2);
    }
    let zeroesCount = 0;
    let onesCount = 0;

    filteredBits.forEach((bit) => {
      if (bit[i] === '0') {
        zeroesCount += 1;
      } else {
        onesCount += 1;
      }
    });

    filteredBits = filterBits(filteredBits, i, zeroesCount, onesCount);
  }

  return parseInt(filteredBits[0], 2);
};

const filterOxygen = (bits, i, zeroesCount, onesCount) => {
  if (zeroesCount > onesCount) {
    return bits.filter((bit) => bit[i] === '0');
  }

  return bits.filter((bit) => bit[i] === '1');
};

const filterCo2 = (bits, i, zeroesCount, onesCount) => {
  if (onesCount < zeroesCount) {
    return bits.filter((bit) => bit[i] === '1');
  }

  return bits.filter((bit) => bit[i] === '0');
};

const oxygenRating = processInput(puzzleInput, filterOxygen);
const co2Rating = processInput(puzzleInput, filterCo2);

const result = oxygenRating * co2Rating;

console.log('result :', result);
