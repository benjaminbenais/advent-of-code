const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');
const directions = puzzleInput.split('');

let x = 0;
let y = 0;

const visitedLocations = new Set();

directions.forEach((direction) => {
  visitedLocations.add(`${x},${y}`);

  if (direction === '^') {
    y += 1;
  } else if (direction === '>') {
    x += 1;
  } else if (direction === 'v') {
    y -= 1;
  } else {
    x -= 1;
  }
});

const result = visitedLocations.size;
console.log('result :', result);
