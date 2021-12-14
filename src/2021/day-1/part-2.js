const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const getSum = (...args) => args.reduce((total, n) => Number(n) + total, 0);

const processInput = (data) => {
  let count = 0;
  let prevWindow = 0;

  for (let i = 0; i < data.length; i++) {
    // Get current element and the two following elements
    const first = data[i];
    const second = data[i + 1];
    const third = data[i + 2];

    // Check if the second and third elements exist
    if (second === undefined || third === undefined) {
      break;
    }

    // Add the three elements
    const currentWindow = getSum(first, second, third);

    // If the current window is greater than the previous window, increment `count`
    if (i > 0 && currentWindow > prevWindow) {
      count += 1;
    }

    prevWindow = currentWindow;
  }

  return count;
};

const result = processInput(puzzleInput.split('\n'));
console.log('result :', result);
