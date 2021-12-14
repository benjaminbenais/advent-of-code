const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const processInput = (commands) => {
  let horizontal = 0;
  let depth = 0;

  commands.forEach((command) => {
    const [movement, value] = command.split(' ');

    if (movement === 'forward') {
      horizontal += Number(value);
    }

    if (movement === 'down') {
      depth += Number(value);
    }

    if (movement === 'up') {
      depth -= Number(value);
    }
  });

  return horizontal * depth;
};

const result = processInput(puzzleInput);

console.log('result :', result);
