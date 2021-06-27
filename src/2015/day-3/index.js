const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');
const directions = puzzleInput.split('');

let x = 0;
let y = 0;

const visitedLocations = {};

directions.forEach((direction) => {
  const key = `${x},${y}`;
  const count = visitedLocations[key];

  if (count !== 1) {
    visitedLocations[key] = 1;
  }

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

const result = Object.keys(visitedLocations).length;
console.log('result :', result);
