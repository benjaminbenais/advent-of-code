const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const instructions = puzzleInput.split('\n');

/*
  Steps:
  1. Create a two dimensional grid
  2. For each set of instruction, get all the positions within a given range
  3. Set the value in the grid at each position given the set of instruction
  4. Filter the grid to keep only values that are equal to 1
  5. Get the length of the filtered grid
*/

/**
 * Create a two dimensional grid
 * @returns {0[][]>} A two dimensional array filled with zeros
 * The top level array contains 999 rows
 * Each row contains 999 zeros
 * @example
 *  [
 *    [0, 0, 0, 0, ...],
 *    [0, 0, 0, 0, ...],
 *    [0, 0, 0, 0, ...],
 *    ...
 *  ]
 */
const initGrid = () => {
  const grid = [];
  for (let i = 0; i < 999; i++) {
    const row = [];

    for (let j = 0; j < 999; j++) {
      row.push(0);
    }

    grid.push(row);
  }

  return grid;
};

const getPositionsWithinRange = (from, to) => {
  const positions = [];

  const a = to.x + 1 - from.x;
  const b = to.y + 1 - from.y;

  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      positions.push([from.x + i, from.y + j]);
    }
  }

  return positions;
};

const processCoordinate = (str) => {
  const [x, y] = str.split(',');
  return { x: Number(x), y: Number(y) };
};

/**
 * Process an instruction string
 *
 * @param {string} instruction - A string representig an instruction
 * @returns {{action: string,from: string, to: string}}
 * @example
 *  Called with the instruction: 'toggle 461,550 through 564,900'
 *  Will return: { action: 'toggle', from { x: 461, y: 550 }, to: { x 564, y: 900 } }
 */
const processInstruction = (instruction) => {
  const splittedInstruction = instruction.split(' ');

  let action = null;
  let from = null;
  let to = null;

  if (instruction.startsWith('toggle')) {
    action = `${splittedInstruction[0]}`;
    from = processCoordinate(splittedInstruction[1]);
    to = processCoordinate(splittedInstruction[splittedInstruction.length - 1]);
  } else if (instruction.startsWith('turn')) {
    action = `${splittedInstruction[0]}_${splittedInstruction[1]}`;
    from = processCoordinate(splittedInstruction[2]);
    to = processCoordinate(splittedInstruction[splittedInstruction.length - 1]);
  } else {
    console.log('instruction :', instruction);
  }

  return { action, from, to };
};

// eslint-disable-next-line no-shadow
const processInstructions = (instructions, grid) => {
  const gridCopy = [...grid];

  instructions.forEach((instruction) => {
    const { action, from, to } = processInstruction(instruction);
    const positions = getPositionsWithinRange(from, to);

    positions.forEach(([x, y]) => {
      if (action === 'turn_on') {
        gridCopy[x][y] = 1;
      } else if (action === 'turn_off') {
        gridCopy[x][y] = 0;
      } else if (action === 'toggle') {
        gridCopy[x][y] = gridCopy[x][y] === 1 ? 0 : 1;
      }
    });
  });

  return gridCopy;
};

// eslint-disable-next-line no-shadow
const processInstructions2 = (instructions, grid) => {
  const gridCopy = [...grid];

  instructions.forEach((instruction) => {
    const { action, from, to } = processInstruction(instruction);
    const positions = getPositionsWithinRange(from, to);

    positions.forEach(([x, y]) => {
      const currentBrightness = gridCopy[x][y] || 0;
      if (action === 'turn_on') {
        gridCopy[x][y] = currentBrightness + 1;
      } else if (action === 'turn_off' && currentBrightness > 0) {
        gridCopy[x][y] = currentBrightness - 1;
      } else if (action === 'toggle') {
        gridCopy[x][y] = currentBrightness + 2;
      }
    });
  });

  return gridCopy;
};

const grid = initGrid();

const updatedGrid = processInstructions(instructions, grid);
const formattedGrid = updatedGrid.flat().filter((pos) => pos === 1);
const result1 = formattedGrid.length;
console.log('result1 :', result1);

const updatedGrid2 = processInstructions2(instructions, grid);
const result2 = updatedGrid2.flat().reduce((acc, curr) => {
  if (curr > 0) {
    return acc + curr;
  }
  return acc;
}, 0);

console.log('result2 :', result2);
