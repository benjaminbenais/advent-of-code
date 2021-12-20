const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const formatInstruction = (instruction) => {
  const [from, to] = instruction.split(' -> ');
  const fromX = Number(from.split(',')[0]);
  const fromY = Number(from.split(',')[1]);
  const toX = Number(to.split(',')[0]);
  const toY = Number(to.split(',')[1]);

  return [
    [fromX, fromY],
    [toX, toY]
  ];
};

const formatInstructions = (instructions) =>
  instructions.map(formatInstruction);

const initMap = (instructions) => {
  const map = [];

  const numberOfCols = Math.max(
    ...instructions.map(([from, to]) => Math.max(from[0], to[0]))
  );
  const numberOfRows = Math.max(
    ...instructions.map(([from, to]) => Math.max(from[1], to[1]))
  );

  for (let i = 0; i <= numberOfRows; i++) {
    const row = [];
    for (let j = 0; j <= numberOfCols; j++) {
      row.push(0);
    }
    map.push(row);
  }

  return map;
};

// const logMap = (map) => {
//   const parsedMap = map
//     .map((row) => row.map((el) => (el === 0 ? '.' : String(el))).join(''))
//     .join('\n');

//   console.log(parsedMap);
// };

const getResult = (map) =>
  map.flat().reduce((acc, curr) => (curr > 1 ? acc + 1 : acc), 0);

const processInput = (instructions) => {
  const map = initMap(instructions);

  instructions.forEach((instruction) => {
    const [[fromX, fromY], [toX, toY]] = instruction;

    // Process horizontal or vertical lines
    if (fromX === toX || fromY === toY) {
      // Process horizontal lines
      if (fromX !== toX) {
        const min = Math.min(fromX, toX);
        const max = Math.max(fromX, toX);

        for (let i = min; i <= max; i++) {
          map[fromY][i] += 1;
        }
      }

      if (fromY !== toY) {
        const min = Math.min(fromY, toY);
        const max = Math.max(fromY, toY);

        for (let i = min; i <= max; i++) {
          map[i][fromX] += 1;
        }
      }
    } else {
      // Process diagonal lines
      const tmpInstruction = instruction.sort((a, b) => a[0] - b[0]);
      let tmpY = tmpInstruction[0][1];

      for (let i = tmpInstruction[0][0]; i <= tmpInstruction[1][0]; i++) {
        map[tmpY][i] += 1;

        if (tmpInstruction[0][1] < tmpInstruction[1][1]) {
          tmpY += 1;
        } else {
          tmpY -= 1;
        }
      }
    }
  });

  return getResult(map);
};

const result = processInput(formatInstructions(puzzleInput));
console.log('result :', result);
