const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const processInput = (data) => {
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const prev = data[i - 1];

    if (current > prev) {
      count += 1;
    }
  }

  return count;
};

const result = processInput(puzzleInput.map((el) => Number(el)));
console.log('result :', result);
