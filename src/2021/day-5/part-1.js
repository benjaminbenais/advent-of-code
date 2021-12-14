const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const parseInstruction = (instruction) => {
  const [left, right] = instruction.split(' -> ');

  const fromX = Math.min(left.split(',')[0], right.split(',')[0]);
  const toX = Math.max(left.split(',')[0], right.split(',')[0]);

  const fromY = Math.min(left.split(',')[1], right.split(',')[1]);
  const toY = Math.max(left.split(',')[1], right.split(',')[1]);

  return {
    from: {
      x: fromX,
      y: fromY
    },
    to: {
      x: toX,
      y: toY
    }
  };
};

const initMap = (instructions) => {
  const allXs = instructions.reduce((acc, { to }) => {
    acc.push(to.x);
    return acc;
  }, []);

  const allYs = instructions.reduce((acc, { to }) => {
    acc.push(to.y);
    return acc;
  }, []);

  const greaterX = Math.max(...allXs);
  const greaterY = Math.max(...allYs);

  const map = [];

  for (let i = 0; i < greaterY + 1; i++) {
    const row = [];
    for (let j = 0; j < greaterX + 1; j++) {
      row.push(0);
    }

    map.push(row);
  }

  return map;
};

const processInput = (instructions) => {
  // eslint-disable-next-line
  const map = initMap(instructions);

  instructions.forEach(({ from, to }) => {
    if (from.x === to.x || from.y === to.y) {
      console.log('from :', from);
      console.log('to :', to);

      const xPath = to.x - from.x;
      console.log('xPath :', xPath);

      for (let i = 0; i < xPath; i++) {
        //
      }
    }
  });
};

const result = processInput(
  puzzleInput.map((instruction) => parseInstruction(instruction))
);
console.log('result :', result);
