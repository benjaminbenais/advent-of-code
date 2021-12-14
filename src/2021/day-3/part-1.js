const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const processInput = (bits) => {
  const numberOfBitsPerLine = bits[0].length;

  // Initiate empty strings for `gama` and `epsilon` bits
  let gama = '';
  let epsilon = '';

  // Iterate over the `bits` array n time the length of the lines
  for (let i = 0; i < numberOfBitsPerLine; i++) {
    // Number of `1` per column
    let onesCount = 0;
    // Number of `0` per column
    let zeroesCount = 0;

    bits.forEach((line) => {
      const currentBit = line.split('')[i];

      if (currentBit === '0') {
        zeroesCount += 1;
      } else {
        onesCount += 1;
      }
    });

    if (onesCount > zeroesCount) {
      gama = `${gama}1`;
    }

    if (zeroesCount > onesCount) {
      gama = `${gama}0`;
    }

    if (onesCount < zeroesCount) {
      epsilon = `${epsilon}1`;
    }

    if (zeroesCount < onesCount) {
      epsilon = `${epsilon}0`;
    }
  }

  const parsedGama = parseInt(gama, 2);
  const parsedEpsilon = parseInt(epsilon, 2);

  return parsedGama * parsedEpsilon;
};

const result = processInput(puzzleInput);

console.log('result :', result);
