const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const processInput = (commands) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  commands.forEach((command) => {
    const [movement, value] = command.split(' ');

    if (movement === 'forward') {
      horizontal += Number(value);
      // It increases your depth by your aim multiplied by X.
      depth += aim * Number(value);
    }

    if (movement === 'down') {
      aim += Number(value);
    }

    if (movement === 'up') {
      aim -= Number(value);
    }
  });

  return horizontal * depth;
};

const result = processInput(puzzleInput);

console.log('result :', result);
