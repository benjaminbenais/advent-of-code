const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');
const mainDirections = puzzleInput.split('');

const registerLocations = (directions) => {
  const locations = new Set();
  let x = 0;
  let y = 0;

  directions.forEach((direction) => {
    locations.add(`${x},${y}`);

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

  return locations;
};

const result1 = registerLocations(mainDirections).size;
console.log('result1 :', result1);

const generateDirections = (directions) => {
  const santaDirections = [];
  const robotSantaDirections = [];

  directions.forEach((direction, index) => {
    if (index % 2 === 0) {
      santaDirections.push(direction);
    } else {
      robotSantaDirections.push(direction);
    }
  });

  return { santaDirections, robotSantaDirections };
};

const { santaDirections, robotSantaDirections } =
  generateDirections(mainDirections);

const santaLocations = registerLocations(santaDirections);
const roboSantaLocations = registerLocations(robotSantaDirections);

const mergedLocations = new Set([...santaLocations, ...roboSantaLocations]);

const result2 = mergedLocations.size;
console.log('result2 :', result2);
