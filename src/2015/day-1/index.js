const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const getNextFloor = (currentFloor, direction) => {
  switch (direction) {
    case '(':
      return currentFloor + 1;
    case ')':
      return currentFloor - 1;
    default:
      return currentFloor;
  }
};

let basementPosition;

const instructions = puzzleInput.split('');

const finalFloor = instructions.reduce((currentFloor, instruction, index) => {
  if (!basementPosition && currentFloor === -1) {
    basementPosition = index;
  }

  const nextFloor = getNextFloor(currentFloor, instruction);
  return nextFloor;
}, 0);

console.log(finalFloor);
console.log(basementPosition);
